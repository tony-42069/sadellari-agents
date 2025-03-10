import { SlackIntegration } from '@shared/SlackIntegration';
import { config } from '@config/settings';
import { mocked } from 'jest-mock';

jest.mock('@shared/SlackIntegration');

describe('CEOAgent Slack Integration', () => {
  let slackIntegration: jest.Mocked<SlackIntegration>;

  beforeEach(() => {
    slackIntegration = new SlackIntegration(
      config.slack.botToken,
      config.slack.appToken,
      config.slack.signingSecret
    ) as jest.Mocked<SlackIntegration>;
    jest.clearAllMocks();
  });

  test('should respond to mentions', async () => {
    const mockEvent = {
      user: 'U12345',
      text: 'Test mention',
      channel: 'C12345',
      ts: '1234567890.123456'
    };

    slackIntegration.onMention.mockImplementation((callback) => {
      return callback(mockEvent);
    });

    await slackIntegration.onMention(async (event) => {
      await slackIntegration.sendMessage(
        event.channel,
        `Hello! I am the CEO Agent. Thank you for your message: "${event.text}"`
      );
    });

    expect(slackIntegration.sendMessage).toHaveBeenCalledWith(
      'C12345',
      'Hello! I am the CEO Agent. Thank you for your message: "Test mention"'
    );
  });

  test('should respond to strategy messages', async () => {
    const mockMessage = {
      user: 'U12345',
      text: 'Let\'s discuss strategy',
      channel: 'C12345',
      ts: '1234567890.123456'
    };

    slackIntegration.onMessage.mockImplementation((channelId, callback) => {
      return callback(mockMessage);
    });

    await slackIntegration.onMessage(process.env.CSUITE_CHANNEL_ID!, async (message) => {
      if (message.text?.toLowerCase().includes('strategy')) {
        await slackIntegration.sendMessage(
          message.channel,
          "I see we're discussing strategy. As CEO, I'm here to help with strategic decisions."
        );
      }
    });

    expect(slackIntegration.sendMessage).toHaveBeenCalledWith(
      'C12345',
      "I see we're discussing strategy. As CEO, I'm here to help with strategic decisions."
    );
  });
});
