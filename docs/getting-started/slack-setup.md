# Slack Integration Setup

This guide provides detailed instructions for setting up and configuring the Slack workspace and app required for Sadellari Agents.

## Creating a Slack App

### Step 1: Create a New Slack App

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps)
2. Click the "Create New App" button
3. Select "From scratch"
4. Enter an App Name (e.g., "Sadellari Agents")
5. Select the workspace where you want to install the app
6. Click "Create App"

### Step 2: Configure Basic Information

1. From your app's management page, go to "Basic Information"
2. Under "Display Information":
   - Upload an App Icon (optional)
   - Set a background color (optional)
   - Add a short description of your app
3. Save your changes

## Setting Up Bot Features

### Step 1: Enable Socket Mode

Socket Mode allows your app to receive events without exposing a public HTTP endpoint:

1. From the left sidebar, click on "Socket Mode"
2. Toggle the switch to enable Socket Mode
3. Click "Generate" to create an app-level token
4. Name your token (e.g., "Sadellari Socket Token")
5. Ensure the token has the `connections:write` scope
6. Copy the generated token starting with `xapp-` - you'll need this for your `.env` file as `SLACK_APP_TOKEN`

### Step 2: Configure Bot Token Scopes

1. From the left sidebar, click on "OAuth & Permissions"
2. Scroll down to "Scopes" and "Bot Token Scopes"
3. Add the following scopes:
   - `channels:history`
   - `channels:read`
   - `chat:write`
   - `im:history`
   - `im:read`
   - `im:write`
   - `users:read`

### Step 3: Install App to Workspace

1. Scroll to the top of the "OAuth & Permissions" page
2. Click "Install to Workspace"
3. Review the permissions being requested
4. Click "Allow"
5. Copy the "Bot User OAuth Token" that starts with `xoxb-` - you'll need this for your `.env` file as `SLACK_BOT_TOKEN`

### Step 4: Configure Event Subscriptions

1. From the left sidebar, click on "Event Subscriptions"
2. Toggle the switch to enable events
3. Since you're using Socket Mode, you don't need to provide a request URL
4. Scroll down to "Subscribe to bot events" and click "Add Bot User Event"
5. Add the following events:
   - `message.channels` - When messages are posted in a channel
   - `message.im` - When messages are posted in a direct message
   - `app_mention` - When the app is mentioned
6. Click "Save Changes"

### Step 5: Configure App Home

1. From the left sidebar, click on "App Home"
2. Under "Show Tabs", enable the "Messages Tab"
3. Toggle "Allow users to send Slash commands and messages from the messages tab"
4. Click "Save Changes"

## Setting Up the C-Suite Channel

### Step 1: Create a New Channel

1. In your Slack workspace, click the "+" button next to "Channels"
2. Click "Create a channel"
3. Name the channel (e.g., "c-suite" or "executive-team")
4. Add a description (e.g., "Channel for executive team communication and decision-making")
5. Set privacy as needed (public or private)
6. Click "Create"

### Step 2: Add the Bot to the Channel

1. Open the newly created channel
2. Click on the channel name at the top to open the details panel
3. Click "Integrations" > "Add apps"
4. Find and add your Sadellari Agents app

### Step 3: Get the Channel ID

1. Open Slack in a web browser
2. Navigate to the C-suite channel
3. Look at the URL in your browser - it will have a format like:
   `https://app.slack.com/client/TXXXXXXXX/CXXXXXXXX`
4. The part after the last slash is your channel ID (starts with `C`)
5. Copy this ID - you'll need it for your `.env` file as `CSUITE_CHANNEL_ID`

## Configuring App Credentials

Add the following to your `.env` file:

```
SLACK_BOT_TOKEN=xoxb-YOUR_BOT_TOKEN_VALUE
SLACK_APP_TOKEN=xapp-YOUR_APP_TOKEN_VALUE
SLACK_SIGNING_SECRET=YOUR_SIGNING_SECRET_VALUE
CSUITE_CHANNEL_ID=C12345678
```

To find your Signing Secret:
1. Go to your app's "Basic Information" page
2. Scroll down to "App Credentials"
3. Copy the "Signing Secret" value

## Testing the Integration

After completing the setup and starting your application:

1. Go to your C-suite channel in Slack
2. Type a message containing the word "strategy" (e.g., "Let's discuss our strategy for the next quarter")
3. The CEO agent should respond with a message about strategy
4. Try @mentioning the bot with a message to test direct mentions

## Troubleshooting

### Bot Not Responding

If the bot isn't responding to messages:

1. Check the console logs for any connection errors
2. Verify that the bot has been added to the channel
3. Ensure that all required scopes have been granted
4. Confirm that event subscriptions are properly configured
5. Verify that the app is active and running

### Permission Errors

If you see permission-related errors:

1. Review the scopes you've added to your bot token
2. Reinstall the app to your workspace after adding new scopes
3. Ensure the bot has been invited to any private channels you're testing with

### Connection Issues

If the app cannot connect to Slack:

1. Verify that Socket Mode is enabled
2. Check that your `SLACK_APP_TOKEN` starts with `xapp-`
3. Confirm that your `SLACK_BOT_TOKEN` starts with `xoxb-`
4. Ensure that your tokens have not expired or been revoked

## Next Steps

After completing the Slack setup:

1. Review the [configuration guide](/docs/getting-started/configuration.md) for additional settings
2. Customize agent behaviors based on your specific requirements
3. Set up additional channels for specific functional areas if needed
