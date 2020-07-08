// Dependencies
require('dotenv').config({ path: `${__dirname}/.env` })
const Discord = require('discord.js')

// Queue Managment
const { removeOfflinePlayerFromQueue } = require('./utils/managePlayerQueues')

// On Listeners
const { voiceStateUpdateHandler, messageHandler } = require('./onHandlers')

// Discord Bot
const bot = new Discord.Client()
// Bot User Info
let botUser = {}

// Environment Variables
const { token, channelName } = process.env

bot.on('ready', e => {
  const { username, id } = bot.user

  botUser.username = username
  botUser.id = id

  console.log(`Logged in as: ${username} - ${id}`)
  console.log(`I will be listening for messages on your text-channel: ${channelName}`)

  bot.user.setActivity('Warzone QC')
})

// Handle 6man commands when a user sends the message
bot.on('message', eventObj => messageHandler(eventObj, botUser))

// Remove players from the queue if they go offline
bot.on('presenceUpdate', (oldMember, newMember) => {
  if (newMember.setStatus === 'offline') {
    // Remove this player from the queue if they are in one
    removeOfflinePlayerFromQueue({ playerId: newMember.user.id, playerChannels: newMember.client.channels })
  }
})

// Delete team voice channels and queues
bot.on('voiceStateUpdate', voiceStateUpdateHandler)

bot.on('disconnect', e => {
  console.log('Bot disconnected:', e)
})

async function login() {
  try {
    await bot.login(process.env.token)
  } catch (err) {
    console.error('The bot failed to login:', err)
  }
}

const PREFIX = '!';

bot.on('message', async message =>  { 1

  let args = message.content.substring(PREFIX.length).split(" ");

  switch(args[0]){//toutes les commandes

      case 'tag'://si !tag -> utilise 2e argument placer danbs la commande
            if(!args[1]) return message.reply('Erreur veuillez entrez un deuxième arguments!')
                message.channel.send(args[1] + ' est yeeeet en TABARNAK');//envoie un message PAS tagger @FlamZ
      break;

      case 'clear':
            if(!args[1]) return message.reply('Erreur veuillez entrez un deuxième arguments!')
                message.channel.bulkDelete(args[1]);//Supprime les message
      break;
  }

})
login()
module.exports = bot
