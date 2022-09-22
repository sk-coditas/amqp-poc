import dotenv from 'dotenv';
import { Channel, Connection } from 'amqplib';

dotenv.config();

type EnvironmentSchema = {
  APP_NAME: string;
  LOG_LEVEL: string;
  MQ_HOST: string;
  MQ_PORT: number;
  MQ_USERNAME: string;
  MQ_PASSWORD: string;
  MQ_PROTOCOL: string;
  MQ_CONNECTION?: Connection;
  MQ_CHANNEL?: Channel;
};

const EnvironmentDefaults: EnvironmentSchema = {
  APP_NAME: 'string',
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  MQ_HOST: '',
  MQ_PORT: 5672,
  MQ_USERNAME: '',
  MQ_PASSWORD: '',
  MQ_PROTOCOL: 'amqp',
};

const getEnv = (): any => {
  const env: any = {};
  Object.keys(EnvironmentDefaults).forEach(key => {
    if (process.env[key]) {
      env[key] = process.env[key];
    }
  });
  return env;
};

const environments: EnvironmentSchema = { ...EnvironmentDefaults, ...getEnv() };
const requiredEnvs: Array<keyof EnvironmentSchema> = ['MQ_HOST', 'MQ_PORT', 'MQ_USERNAME', 'MQ_PASSWORD', 'MQ_PROTOCOL'];

requiredEnvs.forEach(key => {
  if (!environments[key]) {
    // eslint-disable-next-line no-console
    console.log(`[Error] Missing Environment Config: ${key}`);
    return process.exit(1);
  }
});

export default environments;
