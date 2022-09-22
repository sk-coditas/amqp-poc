import AMQP, { Connection } from 'amqplib';
import environments from './env';
import logger from './logger';

const connect = async (): Promise<Connection> => {
  try {
    const connection = await AMQP.connect({
      protocol: environments.MQ_PROTOCOL,
      hostname: environments.MQ_HOST,
      port: environments.MQ_PORT,
      username: environments.MQ_USERNAME,
      password: environments.MQ_PASSWORD,
    });
    logger.info('Connection with MQTT Server Success');
    return connection;
  } catch (err: any) {
    logger.error('Connection to MQTT Server Failed');
    logger.error(err);
    process.exit();
  }
};

export default connect;
