export interface ICFOAgent {
  handleMessage(message: string): Promise<void>;
}
