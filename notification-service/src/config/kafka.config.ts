import { kafka , logLevel} from 'kafkajs';
import config from './server.config';

//create kafka client or Instance of Kafka
const kafka = new Kafka({
    clientId: config.KAFKA_CLIENT_ID,
    brokers: [config.KAFKA_BROKER || 'localhost:9093'],
    logLevel: logLevel.ERROR,
   retry:{
     initialRetryTime: 300,
     retries: 10,
     maxRetryTime: 30000,
     multiplyBy: 2,
   }
});

const consume = kafka.consumer({
    groupId: 'notification-service',
    sessionTimeout:30000,
    heartbeatInterval:3000,
});


const shutdown = async()=>{
    logger.info("Shutting down Kafka Consumer");
    await kafka.disconnect();
    process.exit(0);
}

process.on("SIGINT",shutdown);
process.on("SIGTERM",shutdown);

export default kafka;
    
