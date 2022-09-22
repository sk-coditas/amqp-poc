import { Connection, Channel, ConsumeMessage } from 'amqplib';
import { AMQP_QUEUES } from './utils/constants';
import environments from './utils/env';
import logger from './utils/logger';

const init = async (connection: Connection) => {
  try {
    /* To perform any operation in RabbitMQ a channel needs to be created first */
    const channel = await connection.createChannel();
    logger.debug(`AMQP channel created`);

    /* Here we will assert queues to our channel, this will also create the queues if it does not exists */
    Object.values(AMQP_QUEUES).forEach(async queue => {
      logger.debug(`Asserting Queue ${queue}`);
      await channel.assertQueue(queue, { durable: true });

      /* Whenever a message is received in the queue, the message handler will be called */
      channel.consume(queue, (msg: ConsumeMessage | any) => {
        messageHandler(msg, channel);
      });
    });
  } catch (err: any) {
    logger.error('Error while initializing producer');
    logger.error(err);
  }
};

const messageHandler = (message: ConsumeMessage | any, channel: Channel): void => {
  /* Messages published in RabbitMQ are in Buffer format, so converting it back to string */
  const msg = message.content.toString('utf8');
  logger.debug(`${environments.APP_NAME} | Received Message | ${msg}`);
  /* Ack the message once the consuming logic is done, so that it can be dropped from the MQ */
  channel.ack(message);
};

export default init;
