import { SlackIntegration } from "@shared/SlackIntegration";
import { ICEOAgent } from "./types";
import { SlackEvent, SlackMessage } from "@shared/types";

export class CEOAgent implements ICEOAgent {
  private slack: SlackIntegration;
  private csuiteChatId: string;

  constructor() {
    this.slack = new SlackIntegration(
      process.env.SLACK_BOT_TOKEN || "",
      process.env.SLACK_APP_TOKEN || "",
      process.env.SLACK_SIGNING_SECRET || ""
    );
    this.csuiteChatId = process.env.CSUITE_CHANNEL_ID || "";
    this.initialize();
  }

  private initialize() {
    this.slack.connect().catch((error: Error) => {
      console.error("Failed to connect to Slack:", error);
    });

    this.slack.onMention(async (event: SlackEvent) => {
      await this.handleMention(event);
    });

    this.slack.onMessage(this.csuiteChatId, async (message: SlackMessage) => {
      await this.handleCsuiteMessage(message);
    });

    // Add direct message handling
    this.slack.onDirectMessage(async (message: SlackMessage) => {
      await this.handleDirectMessage(message);
    });
  }

  private async handleDirectMessage(message: SlackMessage) {
    try {
      console.log(`Received direct message from ${message.user}: ${message.text}`);
      const response = await this.processMessage(message.text);
      await this.slack.sendMessage(message.channel, response);
    } catch (error) {
      console.error("Error handling direct message:", error);
    }
  }

  private async handleMention(event: SlackEvent) {
    try {
      console.log(`Received mention from ${event.user}: ${event.text}`);
      const response = await this.processMessage(event.text);
      await this.slack.sendMessage(event.channel, response);
    } catch (error) {
      console.error("Error handling mention:", error);
    }
  }

  private async handleCsuiteMessage(message: any) {
    try {
      console.log(`Received message in c-suite channel: ${message.text}`);
      if (message.text.toLowerCase().includes("strategy") || 
          message.text.toLowerCase().includes("decision")) {
        const response = await this.processMessage(message.text);
        await this.slack.sendMessage(message.channel, response);
      }
    } catch (error) {
      console.error("Error handling c-suite message:", error);
    }
  }

  async processMessage(message: string): Promise<string> {
    if (message.toLowerCase().includes("strategy")) {
      return "I see we're discussing strategy. As CEO, I'm here to help with strategic decisions.";
    }
    return "Hello! I am the CEO Agent. Thank you for your message.";
  }

  async handleMessage(message: string): Promise<void> {
    // Implementation from the interface
  }
}
