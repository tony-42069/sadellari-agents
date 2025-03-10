# Slack Integration API

The `SlackIntegration` class provides a unified interface for interacting with the Slack API. This document outlines the public API, usage patterns, and implementation details.

## Overview

`SlackIntegration` handles all Slack-related operations, including:

- Connection and authentication with Slack
- Sending messages to channels and users
- Receiving and routing incoming messages
- Handling mentions and direct messages
- Event subscription management

## Class Definition

Located in `src/shared/SlackIntegration.ts`, the `SlackIntegration` class provides the following public interface:

```typescript
class SlackIntegration {
  constructor(botToken: string, appToken: string, signingSecret: string);
  async connect(): Promise<void>;
  async onMention(callback: (event: SlackEvent) => Promise<void>): Promise<void>;
  async onMessage(channelId: string, callback: (message: SlackMessage) => Promise<void>): Promise<void>;
  async onDirectMessage(callback: (message: SlackMessage) => Promise<void>): Promise<void>;
  async sendMessage(channel: string, text: string): Promise<any>;
}
```

## Initialization

To initialize the `SlackIntegration` class:

```typescript
const slackIntegration = new SlackIntegration(
  process.env.SLACK_BOT_TOKEN || '',
  process.env.SLACK_APP_TOKEN || '',
  process.env.SLACK_SIGNING_SECRET || ''
);
```

The constructor takes three parameters:
- `botToken`: The Slack Bot User OAuth Token (starts with `xoxb-`)
- `appToken`: The Slack App-level Token for Socket Mode (starts with `xapp-`)
- `signingSecret`: The Slack Signing Secret for request verification

## Methods

### connect()

Establishes a connection to the Slack API and verifies authentication.

```typescript
async connect(): Promise<void>
```

**Usage:**
```typescript
try {
  await slackIntegration.connect();
  console.log('Successfully connected to Slack');
} catch (error) {
  console.error('Failed to connect to Slack:', error);
}
```

**Implementation Details:**
- Uses the Web API client to make an `auth.test` call
- Verifies that the provided tokens are valid
- Throws an error if connection fails

### onMention()

Registers a callback function to be called when the bot is mentioned in any channel.

```typescript
async onMention(callback: (event: SlackEvent) => Promise<void>): Promise<void>
```

**Parameters:**
- `callback`: Function to be called when mention is received

**SlackEvent Interface:**
```typescript
interface SlackEvent {
  user: string;    // ID of the user who mentioned the bot
  text: string;    // Text content of the message
  channel: string; // ID of the channel where mention occurred
  ts: string;      // Timestamp of the message
}
```

**Usage:**
```typescript
await slackIntegration.onMention(async (event) => {
  console.log(`Mentioned by ${event.user} in ${event.channel}: ${event.text}`);
  await slackIntegration.sendMessage(event.channel, `Hello <@${event.user}>!`);
});
```

### onMessage()

Registers a callback function to be called when a message is posted in a specific channel.

```typescript
async onMessage(channelId: string, callback: (message: SlackMessage) => Promise<void>): Promise<void>
```

**Parameters:**
- `channelId`: ID of the channel to monitor (e.g., `"C12345678"`)
- `callback`: Function to be called when a message is received

**SlackMessage Interface:**
```typescript
interface SlackMessage {
  user: string;      // ID of the user who sent the message
  text: string;      // Text content of the message
  channel: string;   // ID of the channel where message was posted
  ts: string;        // Timestamp of the message
  thread_ts?: string; // Timestamp of parent message if in a thread
}
```

**Usage:**
```typescript
const CHANNEL_ID = process.env.CSUITE_CHANNEL_ID || '';
await slackIntegration.onMessage(CHANNEL_ID, async (message) => {
  console.log(`Message in channel ${message.channel}: ${message.text}`);
  // Process channel message
});
```

### onDirectMessage()

Registers a callback function to be called when a direct message is sent to the bot.

```typescript
async onDirectMessage(callback: (message: SlackMessage) => Promise<void>): Promise<void>
```

**Parameters:**
- `callback`: Function to be called when a direct message is received

**Usage:**
```typescript
await slackIntegration.onDirectMessage(async (message) => {
  console.log(`Direct message from ${message.user}: ${message.text}`);
  await slackIntegration.sendMessage(message.channel, "Thanks for your message!");
});
```

### sendMessage()

Sends a message to a specified channel or user.

```typescript
async sendMessage(channel: string, text: string): Promise<any>
```

**Parameters:**
- `channel`: ID of the channel or user to send the message to
- `text`: Content of the message to send

**Returns:**
- Promise that resolves to the Slack API response

**Usage:**
```typescript
// Send to channel
await slackIntegration.sendMessage('C12345678', 'Hello channel!');

// Send to user (direct message)
await slackIntegration.sendMessage('U12345678', 'Hello user!');

// Send to thread
await slackIntegration.sendMessage('C12345678', 'Hello thread!', '1234567890.123456');
```

**Implementation Details:**
- Uses the `chat.postMessage` method of the Slack Web API
- Handles rate limiting automatically
- Returns the full API response which includes the message timestamp and other metadata

## Socket Mode Implementation

The current implementation uses Slack's Socket Mode for receiving events without exposing a public HTTP endpoint. This is particularly useful for development and testing.

Socket Mode:
- Doesn't require a public URL for events
- Uses WebSockets for real-time communication
- Requires an app-level token with the `connections:write` scope

## Error Handling

The `SlackIntegration` class includes basic error handling:

- Connection errors are caught and logged
- Message processing errors are caught and logged in the handler methods
- Send failures are propagated to the caller

## Testing

The `SlackIntegration` class has unit tests in `src/__tests__/SlackIntegration.test.ts` that verify:

- Initialization with tokens
- Basic operation of event handlers
- Message sending functionality

## Future Enhancements

Planned enhancements to the `SlackIntegration` class include:

1. Support for rich message formatting (blocks, attachments)
2. Thread support for conversations
3. Reaction handling (emoji reactions to messages)
4. File upload and sharing
5. Interactive components (buttons, menus)
6. More granular error handling and retry logic
