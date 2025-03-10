# Installation Guide

This guide walks through the process of setting up the Sadellari Agents system for development or production use.

## Prerequisites

Before installing Sadellari Agents, ensure you have the following prerequisites:

1. **Node.js**: Version 16 or higher
   ```bash
   # Check your Node.js version
   node --version
   ```

2. **npm**: Usually installed with Node.js
   ```bash
   # Check your npm version
   npm --version
   ```

3. **Slack Workspace**: Admin access to a Slack workspace where you'll deploy the agents

4. **TypeScript**: Version 4.5 or higher
   ```bash
   # Install TypeScript globally if not already installed
   npm install -g typescript
   
   # Check TypeScript version
   tsc --version
   ```

## Setup Process

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/sadellari-agents.git
cd sadellari-agents
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Slack Integration

You'll need to create a Slack app with the appropriate permissions:

1. Go to [Slack API](https://api.slack.com/apps) and click "Create New App"
2. Choose "From scratch" and provide an app name (e.g., "Sadellari Agents")
3. Select the workspace where you want to install the app

#### Required Bot Token Scopes

Under "OAuth & Permissions", add the following Bot Token Scopes:
- `channels:history` - View messages in channels
- `channels:read` - View basic channel information
- `chat:write` - Send messages as the app
- `im:history` - View direct messages
- `im:read` - View basic direct message information
- `im:write` - Start direct messages with users
- `users:read` - View basic user information

#### Install the App to Workspace

1. Click "Install to Workspace" and authorize the requested permissions
2. Copy the "Bot User OAuth Token" (starts with `xoxb-`)

#### Enable Socket Mode

1. Go to "Socket Mode" in the sidebar
2. Enable Socket Mode
3. Generate an app-level token with the `connections:write` scope
4. Copy the app-level token (starts with `xapp-`)

#### Configure Event Subscriptions

1. Go to "Event Subscriptions" in the sidebar
2. Enable events
3. Subscribe to bot events:
   - `message.channels` - When messages are posted in a channel
   - `message.im` - When messages are posted in a direct message
   - `app_mention` - When the app is mentioned

### 4. Environment Configuration

Create a `.env` file in the project root with the following variables:

```
# Slack Configuration
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token
SLACK_SIGNING_SECRET=your-signing-secret
CSUITE_CHANNEL_ID=C12345678 # ID of your c-suite channel

# Other Configuration
NODE_ENV=development
LOG_LEVEL=info
```

To find the Channel ID:
1. Open Slack in a browser
2. Navigate to the channel
3. The channel ID is in the URL after the `...messages/` part

### 5. Build the Project

```bash
npm run build
```

### 6. Start the System

For development:
```bash
npm run dev
```

For production:
```bash
npm run start
```

## Verification

To verify your installation is working correctly:

1. Check that the system connects to Slack without errors
   ```
   Successfully connected to Slack
   ```

2. Send a test message in your C-suite channel mentioning "strategy" to trigger the CEO agent
   ```
   Let's discuss our strategy for Q4
   ```

3. The CEO agent should respond with a message about strategy

## Troubleshooting

### Connection Issues

If you encounter Slack connection issues:

1. Verify your tokens are correct in the `.env` file
2. Ensure your Slack app has all the required scopes
3. Check that Socket Mode is enabled
4. Verify the app is installed to your workspace

### Message Handling Issues

If agents don't respond to messages:

1. Check the console logs for errors
2. Verify the channel ID is correct in your `.env` file
3. Ensure the app is subscribed to the appropriate events
4. Verify the app has the required permissions in the channel

### Build Issues

If you encounter build errors:

1. Make sure TypeScript is installed correctly
2. Check for any TypeScript errors in the codebase
3. Verify your Node.js version meets the requirements

## Next Steps

After successfully installing the system, you may want to:

1. Review the [configuration guide](/docs/getting-started/configuration.md) for advanced settings
2. Learn about the [system architecture](/docs/architecture/overview.md)
3. Explore the [agent model](/docs/architecture/agent-model.md)
