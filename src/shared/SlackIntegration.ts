import { App, LogLevel, CodedError } from "@slack/bolt";

export class SlackIntegration {
  private app: App;
  private botToken: string;
  private appToken: string;

  constructor(botToken: string, appToken: string, signingSecret: string) {
    this.botToken = botToken;
    this.appToken = appToken;
    this.app = new App({
      token: this.botToken,
      appToken: this.appToken,
      signingSecret: signingSecret,
      socketMode: true,
      logLevel: LogLevel.DEBUG
    });

    this.app.error(async (error: CodedError) => {
      console.error('Slack App Error:', error);
      return Promise.resolve();
    });
  }

  async connect(): Promise<void> {
    try {
      console.log("Initializing Slack App with Socket Mode...");
      await this.app.start();
      console.log("Slack App initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Slack App:", error);
      throw error;
    }
  }

  async sendMessage(channel: string, message: string): Promise<void> {
    try {
      await this.app.client.chat.postMessage({
        channel,
        text: message
      });
    } catch (error) {
      console.error(`Error sending message to channel ${channel}:`, error);
      throw error;
    }
  }

  onMention(callback: (event: any) => Promise<void>): void {
    this.app.event("app_mention", async ({ event, say }) => {
      try {
        await callback(event);
        await say({
          text: "Message received",
          thread_ts: event.ts
        });
      } catch (error) {
        console.error("Error handling mention:", error);
      }
    });
  }

  onMessage(channel: string, callback: (message: any) => Promise<void>): void {
    this.app.message(async ({ message, say }) => {
      if (message.channel === channel) {
        try {
          await callback(message);
        } catch (error) {
          console.error("Error handling message:", error);
        }
      }
    });
  }
}
