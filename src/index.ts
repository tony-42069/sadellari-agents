# Create new index.ts with UTF8 encoding
@'
import { initializeSlack } from './shared/slack';
import { config } from './config/settings';
import { CEOAgent } from './agents/ceo/CEOAgent';
import { CFOAgent } from './agents/cfo/CFOAgent';
import { CTOAgent } from './agents/cto/CTOAgent';
import { CLOAgent } from './agents/clo/CLOAgent';

const start = async () => {
  try {
    // Start with CEO Agent first
    const ceoAgent = new CEOAgent();
    await ceoAgent.start();
    console.log("CEO Agent started successfully");

    // Other agents will be added later
    console.log("All agents initialized successfully");
  } catch (error) {
    console.error("Error starting agents:", error);
    process.exit(1);
  }
};

start().catch(console.error);
'@ | Out-File -Encoding UTF8 .\src\index.ts