import { SlackIntegration } from '@shared/SlackIntegration';
import { WebClient } from '@slack/web-api';
import { mocked } from 'jest-mock';

jest.mock('@slack/web-api');

describe('SlackIntegration', () => {
  let slackIntegration: SlackIntegration;
  let mockClient: jest.Mocked<typeof WebClient.prototype>;

  beforeEach(() => {
    mockClient = {
      chat: {
        postMessage: jest.fn().mockResolvedValue({ ok: true })
      }
    } as unknown as jest.Mocked<typeof WebClient.prototype>;
    slackIntegration = new SlackIntegration(
      'test-bot-token',
      'test-app-token', 
      'test-signing-secret'
    );
    slackIntegration['client'] = mockClient;
  });

  test('should initialize with token', () => {
    expect(slackIntegration).toBeInstanceOf(SlackIntegration);
  });

  test('should handle mentions', async () => {
    const mockCallback = jest.fn();
    await slackIntegration.onMention(mockCallback);
    
    expect(mockCallback).toHaveBeenCalledTimes(0); // No events yet
  });

  test('should handle channel messages', async () => {
    const mockCallback = jest.fn();
    await slackIntegration.onMessage('C12345', mockCallback);
    
    expect(mockCallback).toHaveBeenCalledTimes(0); // No messages yet
  });

  test('should send messages', async () => {
    await slackIntegration.sendMessage('C12345', 'Test message');
    
    expect(mockClient.chat.postMessage).toHaveBeenCalledWith({
      channel: 'C12345',
      text: 'Test message'
    });
  });
});
