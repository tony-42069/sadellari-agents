export interface ICTOAgent {
  handleMessage(message: string): Promise<void>;
}
