import { App, LogLevel, CodedError } from "@slack/bolt";
import { ICEOAgent } from "./types";

export class CEOAgent implements ICEOAgent {
  private app: App;
  private csuiteChatId: string;

  constructor() {
    try {
      console.log("Initializing Slack App with Socket Mode...");
      console.log("Using BOT_TOKEN:", process.env.SLACK_BOT_TOKEN ? "***" : "MISSING");
      console.log("Using APP_TOKEN:", process.env.SLACK_APP_TOKEN ? "***" : "MISSING");
      
      this.app = new App({
        token: process.env.SLACK_BOT_TOKEN,
        appToken: process.env.SLACK_APP_TOKEN,
        socketMode: true,
        logLevel: LogLevel.DEBUG
      });

      this.app.error(async (error: CodedError) => {
        console.error('Slack App Error:', error);
        return Promise.resolve();
      });

      console.log("Slack App initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Slack App:", error);
      throw error;
    }
    this.csuiteChatId = process.env.CSUITE_CHANNEL_ID || "";
    this.initializeEventListeners();
  }

  private initializeEventListeners() {
    // Respond to mentions
    this.app.event("app_mention", async ({ event, say }) => {
      try {
        console.log(`Received mention from ${event.user}: ${event.text}`);
        await say({
          text: `Hello! I am the CEO Agent. Thank you for your message: "${event.text}"`,
          thread_ts: event.ts
        });
      } catch (error) {
        console.error(`Error handling mention: ${error}`);
      }
    });

    // Listen for messages in c-suite channel with proper type checking
    this.app.message(async ({ message, say }) => {
      // Narrowing the type with a custom type guard
      const isValidMessage = (msg: any): msg is { text: string; channel: string; ts: string } => {
        return typeof msg.text === "string" && typeof msg.channel === "string" && typeof msg.ts === "string";
      };

      if (isValidMessage(message) && message.channel === this.csuiteChatId) {
        try {
          console.log(`Received message in c-suite channel: ${message.text}`);
          if (message.text.toLowerCase().includes("strategy") || 
              message.text.toLowerCase().includes("decision")) {
            await say({
              text: "I see we're discussing strategy. As CEO, I'm here to help with strategic decisions.",
              thread_ts: message.ts
            });
          }
        } catch (error) {
          console.error(`Error handling message: ${error}`);
        }
      }
    });
  }

  async handleMessage(message: string): Promise<void> {
    // Implementation from the interface
  }
}
