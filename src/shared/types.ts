declare module "@shared/types" {
  export interface SlackEvent {
    user: string;
    text: string;
    channel: string;
    ts: string;
  }

  export interface SlackMessage {
    text: string;
    channel: string;
    ts: string;
    user: string;
  }

  export interface SlackIntegration {
    connect(): Promise<void>;
    sendMessage(channel: string, message: string): Promise<void>;
    onMention(callback: (event: SlackEvent) => Promise<void>): void;
    onMessage(channel: string, callback: (message: SlackMessage) => Promise<void>): void;
  }
}
