import { Connection } from 'amqplib';
import connect from './utils/amqp.handler';
import logger from './utils/logger';
import init from './producer';

connect()
  .then((connection: Connection) => {
    logger.info('Producer Started');
    init(connection);
  })
  .catch(() => {
    logger.error('Exiting');
  });
