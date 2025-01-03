export interface Message {
  type: string;
  content: string;
  sender: string;
  timestamp: Date;
}
export interface AgentResponse {
  content: string;
  status: 'success' | 'error';
}
