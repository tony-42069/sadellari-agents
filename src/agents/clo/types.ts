export interface ICLOAgent {
  handleMessage(message: string): Promise<void>;
}
