export const AMQP_EXCHANGES: Record<string, string> = {
  POST_ACTION_EXCHANGE: 'post_action.exchange',
};

export const EXCHANGE_TO_EVENT: Record<string, string> = {
  UPVOTE_POST: AMQP_EXCHANGES.POST_ACTION_EXCHANGE,
  DOWNVOTE_POST: AMQP_EXCHANGES.POST_ACTION_EXCHANGE,
  REPORT_POST: AMQP_EXCHANGES.POST_ACTION_EXCHANGE,
  LIKE_POST: AMQP_EXCHANGES.POST_ACTION_EXCHANGE,
  VIEW_POST: AMQP_EXCHANGES.POST_ACTION_EXCHANGE,
};
