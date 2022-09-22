import connect from './utils/amqp.handler';
import logger from './utils/logger';
import init from './consumer';
import { Connection } from 'amqplib';

connect()
  .then((connection: Connection) => {
    logger.info('Consumer Started');
    init(connection);
  })
  .catch(() => {
    logger.error('Exiting');
  });
