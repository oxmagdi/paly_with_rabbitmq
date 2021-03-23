const amqp = require('amqplib')

consumeTask()

async function consumeTask()
{
     try {

          const connection = await amqp.connect('amqp://localhost:5672')

          const channel = await connection.createChannel()
          
          const result = await channel.assertQueue('tasks')
          // console.log(result)

          channel.consume('tasks', message =>{
               const input = JSON.parse(message.content.toString())

               console.log(`Recived task with input: ${input.number}`)

               channel.ack(message)
               console.log(`ack: ${input.number} `)

          })

          console.log('Wating for messages ...')

     } catch (error) { console.error(error) }
}