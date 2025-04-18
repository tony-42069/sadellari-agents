import dotenv from 'dotenv';
dotenv.config();

export const config = {
  logLevel: process.env.LOG_LEVEL || 'info',
  csuiteChannelId: process.env.CSUITE_CHANNEL_ID || '',
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
};
