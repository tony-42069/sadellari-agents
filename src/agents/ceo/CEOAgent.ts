import { ICEOAgent } from "./types";

export class CEOAgent implements ICEOAgent {
  constructor() {
    console.log("CEO Agent Initialized"); 
  }

  async processMessage(message: string): Promise<string> {
    if (message.toLowerCase().includes("strategy")) {
      return "I see we're discussing strategy. As CEO, I'm here to help with strategic decisions.";
    }
    return "Hello! I am the CEO Agent. Thank you for your message.";
  }

  async handleMessage(message: string): Promise<void> {
    console.log(`CEOAgent received message: ${message}`);
    // const response = await this.processMessage(message);
    // console.log(`CEOAgent response: ${response}`);
  }
}
