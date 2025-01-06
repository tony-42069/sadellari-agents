import { WebClient } from '@slack/web-api';

export class SlackIntegration {
  private client: WebClient;

  constructor(token: string) {
    this.client = new WebClient(token);
  }

  async onMention(callback: (event: { 
    user: string;
    text: string;
    channel: string;
    ts: string;
  }) => Promise<void>) {
    // Implementation for mention handling
  }

  async onMessage(channelId: string, callback: (message: {
    user: string;
    text: string;
    channel: string;
    ts: string;
    thread_ts?: string;
  }) => Promise<void>) {
    // Implementation for message handling
  }

  async sendMessage(channel: string, text: string) {
    return this.client.chat.postMessage({
      channel,
      text
    });
  }
}
