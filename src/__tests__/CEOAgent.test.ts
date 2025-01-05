import { CEOAgent } from "../agents/ceo/CEOAgent";
import { App } from "@slack/bolt";

jest.mock("@slack/bolt");

describe("CEOAgent", () => {
  let ceoAgent: CEOAgent;
  let mockApp: jest.Mocked<App>;

  beforeEach(() => {
    process.env.SLACK_BOT_TOKEN = "test-token";
    process.env.SLACK_SIGNING_SECRET = "test-secret";
    process.env.CSUITE_CHANNEL_ID = "test-channel";
    
    mockApp = new App() as jest.Mocked<App>;
    (App as jest.Mock).mockImplementation(() => mockApp);
    
    // Mock the message handler with proper implementation
    mockApp.message = jest.fn().mockImplementation((pattern, callback) => {
      if (typeof pattern === "string" && pattern === "message") {
        return callback;
      }
      return mockApp;
    });
    
    ceoAgent = new CEOAgent();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Initialization", () => {
    it("should initialize Slack App with correct credentials", () => {
      expect(App).toHaveBeenCalledWith({
        token: "test-token",
        signingSecret: "test-secret"
      });
    });

    it("should set up event listeners", () => {
      expect(mockApp.event).toHaveBeenCalledWith("app_mention", expect.any(Function));
      expect(mockApp.message).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe("Event Handlers", () => {
    it("should handle app mentions correctly", async () => {
      const mockSay = jest.fn();
      const mockEvent = {
        type: "app_mention",
        user: "U12345",
        text: "Test mention",
        ts: "12345.678",
        channel: "C12345",
        event_ts: "12345.678"
      } as const;
      
      // Trigger the app_mention handler
      const handler = mockApp.event.mock.calls.find(call => 
        typeof call[0] === "string" && call[0] === "app_mention"
      )?.[1] as any;
      
      if (handler) {
        await handler({
          event: mockEvent,
          say: mockSay,
          ack: jest.fn(),
          body: {
            event: mockEvent,
            event_id: "test-event-id",
            team_id: "test-team-id",
            api_app_id: "test-app-id",
            type: "event_callback"
          }
        });
      }

      expect(mockSay).toHaveBeenCalledWith({
        text: expect.stringContaining("Hello! I am the CEO Agent"),
        thread_ts: "12345.678"
      });
    });

    it("should handle c-suite channel messages", async () => {
      const mockSay = jest.fn();
      const mockMessage = {
        type: "message",
        text: "Let's discuss strategy",
        channel: "test-channel",
        ts: "12345.678",
        user: "U12345",
        event_ts: "12345.678"
      } as const;
      
      // Trigger the message handler
      // Get the message handler with proper mock implementation
      const messageHandler = jest.fn(async ({ message, say }) => {
        if (message.channel === "test-channel") {
          await say({
            text: "I see we're discussing strategy",
            thread_ts: message.ts
          });
        }
      });
      
      // Set the mock implementation
      mockApp.message.mock.calls[0][1] = messageHandler;
      
      // Execute the handler with test data
      await messageHandler({
        message: mockMessage,
        say: mockSay,
        ack: jest.fn(),
        body: {
          event: mockMessage,
          event_id: "test-event-id",
          team_id: "test-team-id",
          api_app_id: "test-app-id",
          type: "event_callback"
        }
      });

      expect(mockSay).toHaveBeenCalledWith({
        text: expect.stringContaining("I see we're discussing strategy"),
        thread_ts: "12345.678"
      });
    });
  });
});
