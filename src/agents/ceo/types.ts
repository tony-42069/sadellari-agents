export interface ICEOAgent {
  handleMessage(message: string): Promise<void>;
}
