# Configuration Guide

This guide details the configuration options for the Sadellari Agents system, including environment variables, settings files, and runtime configurations.

## Environment Variables

Sadellari Agents uses environment variables for sensitive configuration like API tokens and connection details. These should be set in a `.env` file in the project root (for development) or as environment variables in your production environment.

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SLACK_BOT_TOKEN` | Slack Bot OAuth token | `xoxb-YOUR_BOT_TOKEN_VALUE` |
| `SLACK_APP_TOKEN` | Slack App-level token (for Socket Mode) | `xapp-YOUR_APP_TOKEN_VALUE` |
| `SLACK_SIGNING_SECRET` | Slack signing secret | `YOUR_SIGNING_SECRET_VALUE` |
| `CSUITE_CHANNEL_ID` | ID of the Slack channel for C-suite communication | `C12345678` |

### Optional Environment Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `NODE_ENV` | Environment (development/production) | `development` | `production` |
| `LOG_LEVEL` | Logging verbosity | `info` | `debug`, `info`, `warn`, `error` |
| `PORT` | Port for HTTP services (if applicable) | `3000` | `8080` |

## Configuration File

The system uses a central configuration file (`src/config/settings.ts`) that loads environment variables and provides them to the application. This file can be extended with additional configuration options as needed.

Current configuration structure:

```typescript
export const config = {
  slack: {
    botToken: process.env.SLACK_BOT_TOKEN || '',
    appToken: process.env.SLACK_APP_TOKEN || '',
    signingSecret: process.env.SLACK_SIGNING_SECRET || '',
    csuiteChannelId: process.env.CSUITE_CHANNEL_ID || ''
  }
};
```

## Slack Configuration

### Bot Token Scopes

The Slack bot token requires specific permissions (scopes) to function correctly:

| Scope | Purpose |
|-------|---------|
| `channels:history` | Read messages in public channels |
| `channels:read` | View basic information about public channels |
| `chat:write` | Send messages as the bot |
| `im:history` | View direct messages |
| `im:read` | View basic information about direct messages |
| `im:write` | Start direct message conversations |
| `users:read` | View basic information about users |

### Event Subscriptions

The following Slack events need to be subscribed to:

| Event | Purpose |
|-------|---------|
| `message.channels` | Receive messages posted in channels |
| `message.im` | Receive direct messages |
| `app_mention` | Receive mentions of the bot |

## Agent Configuration

Each agent can be configured with specific behaviors and response patterns:

### CEO Agent Configuration

The CEO Agent currently responds to specific keywords in messages:

- Messages containing "strategy" trigger strategic decision-making responses
- Direct mentions are always responded to
- Messages in the C-suite channel are monitored for relevant keywords

To modify these behaviors, update the handlers in `src/agents/ceo/CEOAgent.ts`:

```typescript
private async handleCsuiteMessage(message: any) {
  try {
    // Add or modify keywords here
    if (message.text.toLowerCase().includes("strategy") || 
        message.text.toLowerCase().includes("decision")) {
      const response = await this.processMessage(message.text);
      await this.slack.sendMessage(message.channel, response);
    }
  } catch (error) {
    console.error("Error handling c-suite message:", error);
  }
}
```

### CFO Agent Configuration

The CFO Agent is currently in a skeleton state. Future configuration options will include:

- Financial thresholds for automated decisions
- Reporting frequency and formats
- Budget allocation parameters

## Inter-Agent Communication Configuration

As the inter-agent communication system is developed, configuration options will include:

- Message routing rules
- Decision workflow definitions
- Collaboration patterns
- Authorization levels for different types of decisions

## Advanced Configuration

### Custom Response Templates

To create custom response templates for agents, you'll need to:

1. Define template strings in a separate file (e.g., `src/templates/responses.ts`)
2. Import and use these templates in agent message processing
3. Use a templating system to populate dynamic content

### Persistence Configuration

When implementing persistence for agent state and decisions:

1. Define a database connection in the configuration file
2. Configure entity models for storing agent data
3. Implement repository patterns for data access

### Logging Configuration

The logging system can be configured with:

```typescript
// Example logging configuration
export const loggingConfig = {
  level: process.env.LOG_LEVEL || 'info',
  format: 'json',
  transports: [
    // Console output
    { type: 'console' },
    // File output (if needed)
    { type: 'file', filename: 'logs/sadellari-agents.log' }
  ]
};
```

## Configuration Best Practices

1. **Security**: Never commit secrets or tokens to version control. Use `.env` files locally and secure environment variables in production.

2. **Validation**: Implement validation for all configuration values to ensure the system fails fast if misconfigured.

3. **Documentation**: Keep this configuration guide updated when adding new options.

4. **Defaults**: Provide sensible defaults when possible, but require critical configuration like tokens.

5. **Environment-specific**: Use different configurations for development, testing, and production environments.
