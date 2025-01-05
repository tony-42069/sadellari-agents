declare module "src/shared/SlackIntegration" {
  class SlackIntegration {
    constructor(botToken: string, appToken: string, signingSecret: string);
    connect(): Promise<void>;
    sendMessage(channel: string, message: string): Promise<void>;
    onMention(callback: (event: any) => Promise<void>): void;
    onMessage(channel: string, callback: (message: any) => Promise<void>): void;
  }
  export = SlackIntegration;
}
