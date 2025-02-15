import { App } from '@slack/bolt';
export const initializeSlack = (token: string, signingSecret: string) => {
  return new App({
    token,
    signingSecret
  });
};
