import { config } from '@config/settings';
import { CEOAgent } from '../agents/ceo/CEOAgent';

describe('CEOAgent', () => {
  let ceoAgent: CEOAgent;

  beforeEach(() => {
    ceoAgent = new CEOAgent();
  });

  test('should process strategy messages correctly', async () => {
    const response = await ceoAgent.processMessage("Let's discuss strategy");
    expect(response).toContain('strategic decisions');
  });

  test('should return default message for other messages', async () => {
    const response = await ceoAgent.processMessage("Hello agent");
    expect(response).toContain('Hello! I am the CEO Agent.');
  });
});
