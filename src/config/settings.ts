export const config = {
  slack: {
    signingSecret: process.env.SLACK_SIGNING_SECRET || '',
    token: process.env.SLACK_BOT_TOKEN || ''
  }
};
