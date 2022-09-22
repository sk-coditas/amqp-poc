import { Connection } from 'amqplib';
import MockData from './mock.json';
import { AMQP_EXCHANGES, EXCHANGE_TO_EVENT } from './utils/constants';
import environments from './utils/env';
import { sleep } from './utils/helpers';
import logger from './utils/logger';

const init = async (connection: Connection) => {
  try {
    /* To perform any operation in RabbitMQ a channel needs to be created first */
    const channel = await connection.createChannel();
    logger.debug(`AMQP channel created`);

    /* Here we will assert the exchange to our channel, this will also create the exchange if it does not exists */
    Object.values(AMQP_EXCHANGES).forEach(async exchange => {
      logger.debug(`Asserting Exchange ${exchange}`);
      await channel.assertExchange(exchange, 'fanout', { durable: true });
    });

    /* Data Publishing Logic */
    const { objects: records = [] } = MockData;

    for (let i = 0; i < records.length; i += 1) {
      const record = records[i];
      const { event } = record;
      /* Publishing data to the exchange */
      channel.publish(EXCHANGE_TO_EVENT[event], '', Buffer.from(JSON.stringify(record)));
      logger.debug(`${environments.APP_NAME} | Event at index ${i}, ${event} published`);
      await sleep(5000);
    }
    logger.info('All events published successfully');
  } catch (err: any) {
    logger.error('Error while initializing producer');
    logger.error(err);
  }
};

export default init;
