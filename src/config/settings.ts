export const config = {
  slack: {
    token: process.env.SLACK_BOT_TOKEN || '',
    csuiteChannelId: process.env.CSUITE_CHANNEL_ID || ''
  }
};
