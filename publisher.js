const amqp = require('amqplib')

const task = {number: process.argv[2]};

publishTask()

async function publishTask()
{
     try {

          // establish connection with rabbitmq server
          const connection = await amqp.connect('amqp://localhost:5672')

          const channel = await connection.createChannel()

          const result = await channel.assertQueue('tasks')
          // console.log(result)

          await channel.sendToQueue('tasks',Buffer.from(JSON.stringify(task)))

          console.log(`Task sent successfully with input : ${task.number}`)

     } catch (error) { console.error(error) }
}