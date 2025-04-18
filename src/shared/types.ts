export namespace SharedTypes {
}

export namespace AgentCommunication {
  export interface AgentMessage {
    sender: string;
    recipient: string;
    content: any;
    timestamp: Date;
  }

  export interface Task {
    id: string;
    description: string;
    assignedTo: string;
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
    result?: any;
    createdAt: Date;
    updatedAt: Date;
  }
}
