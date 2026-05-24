import {kafka, logLevel} from 'kafkajs';
import config from './server.config';
import logger from './logger.config';

export const kafkaConfig = {
  clientId: config.KAFKA_CLIENT_ID,
  brokers: [config.KAFKA_BROKER || 'localhost:9093'],
  logLevel: logLevel.ERROR,
   retry:{
     initialRetryTime: 300,
     retries: 10,
     maxRetryTime: 30000,
   }
};

export const producer = kafka.producer({
    allowAutoTopicCreation: true,
    transcationTimeout:30000,
    idempotent:true,
    maxInFlightRequests:5,
    retry:{
        retries:5,
    },

});

let isConnected = false;
export const connectProducer= async()=>{
    if(!isConnected){
        await producer.connect();
        isConnected = true;
        logger.info('Connected to Kafka');
    }
}

export const disconnectProducer = async()=>{
    if(isConnected){
        await producer.disconnect();
        isConnected = false;
        logger.info('Disconnected from Kafka');
    }
}

//Graceful shutdown
process.on("SIGALRM",disconnectProducer);
process.on("SIGINT",disconnectProducer);



   

