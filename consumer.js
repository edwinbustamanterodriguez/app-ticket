/**
 * Kafka consumer code based on Kafka JS
 */

console.log("Clarity: Kafka consumer");
const { Kafka } = require('kafkajs');

module.exports = async function consumer(broker, group, topicName, io) {
    console.log("Clarity: Starting Kafka consumer with " + broker + " topic as " + topicName + " group as " + group);

    //setup
    const kafka = new Kafka({
        clientId: 'clarity-talking',
        brokers: [broker]
    });

    const consumer = kafka.consumer({ groupId: group });

    //connect
    try
    {
        await consumer.connect();
        io.sockets.emit('connected', "Connected");
    }
    catch (error)
    {
        console.log("Error: *** Clarity Consumer Couldn't connect to Kafka broker");
        io.sockets.emit('error', "Error: Consumer couldn't connect to Kafka broker");
        return;
    }
    console.log("Clarity: Kafka consumer connected");

    //subscribe
    try
    {
        await consumer.subscribe({ topic: topicName, fromBeginning: true });
        io.sockets.emit('status', "Subscribed");
    }
    catch (error)
    {
        console.log("Error: *** Clarity Consumer couldn't subscribe to topic");
        io.sockets.emit('error', "Error: Consumer couldn't subscribe to topic");
        return;
    }

    console.log("Clarity: Kafka consumer subscribed");
    console.log("Clarity: consuming...");

    //consuming
    try
    {
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {

                console.log("Clarity: consumer received message - " + message.value.toString());

                const ticket = JSON.parse(message.value.toString());

                io.sockets.emit('message', ticket);
            },
        });

    }
    catch (error)
    {
        console.log("Error: *** Clarity Consumer couldn't consume message");
        io.sockets.emit('error', "Error: Consumer couldn't consume message");
    }

}
