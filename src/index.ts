import dotenv from 'dotenv';
dotenv.config();

import { config } from './config/settings';
import { CEOAgent } from './agents/ceo/CEOAgent';
// import { CFOAgent } from './agents/cfo/CFOAgent';
// import { CTOAgent } from './agents/cto/CTOAgent';
// import { CLOAgent } from './agents/clo/CLOAgent';

async function main() {
  console.log('Initializing Sadellari Agents...');

  // Initialize Agents
  const ceo = new CEOAgent();
  // const cfo = new CFOAgent();
  // const cto = new CTOAgent();
  // const clo = new CLOAgent();

  console.log('Agents Initialized.');

  // Start agents
  // TODO: Implement start method in CEOAgent
  // await ceo.start(); 
  // await cfo.start();
  // await cto.start();
  // await clo.start();

  console.log('Sadellari Agents are running.');
}

main().catch((error) => {
  console.error('Failed to start Sadellari Agents:', error);
  process.exit(1);
});