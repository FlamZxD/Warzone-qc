module.exports = async (eventObj, queue) => {
  const { lobby, teams } = queue
  const channel = eventObj.author.lastMessage.channel
  const guild = eventObj.guild
  const everyoneRole = guild.roles.cache.find(roleObj => roleObj.name === '@everyone')

  if (guild.available) {

    ///////////////////////////////////////////////////////////////////

    async function createChannelCategory () {

      const categoryChannel =  await guild.channels.create(`Lobby-${lobby.name}`, {
        topic: 'Lobby',
        type: 'category',
        permissionOverwrites: [
          {
            id: everyoneRole.id,
            deny: ['CONNECT', 'SPEAK', 'CREATE_INSTANT_INVITE', 'VIEW_CHANNEL'],
          },
          ...teams.blue.players.map(playerObj => {
            return {
              id: playerObj.id,
              allow: ['CONNECT', 'SPEAK', 'VIEW_CHANNEL'],
            }
          }),
          ...teams.orange.players.map(playerObj => {
            return {
              id: playerObj.id,
              allow: ['CONNECT', 'SPEAK', 'VIEW_CHANNEL'],
            }
          })
        ],
      });

      const invitationTextChannel = await guild.channels.create(`Invitation`, {
        parent: categoryChannel.id,
        topic: `Invitation`,
        userLimit: 6,
        type: 'text',
        permissionOverwrites: [
          {
            id: everyoneRole.id,
            deny: ['CONNECT', 'SPEAK', 'CREATE_INSTANT_INVITE', 'VIEW_CHANNEL'],
          },
          ...teams.blue.players.map(playerObj => {
            return {
              id: playerObj.id,
              allow: ['CONNECT', 'SPEAK', 'VIEW_CHANNEL'],
            }
          }),
          ...teams.orange.players.map(playerObj => {
            return {
              id: playerObj.id,
              allow: ['CONNECT', 'SPEAK', 'VIEW_CHANNEL'],
            }
          })
        ],
      })

      const generalVoiceChannel = await guild.channels.create(`Générale`, {
        parent: categoryChannel.id,
        topic: `Générale`,
        userLimit: 6,
        type: 'voice',
        permissionOverwrites: [
          {
            id: everyoneRole.id,
            deny: ['CONNECT', 'SPEAK', 'CREATE_INSTANT_INVITE', 'VIEW_CHANNEL'],
          },
          ...teams.blue.players.map(playerObj => {
            return {
              id: playerObj.id,
              allow: ['CONNECT', 'SPEAK', 'VIEW_CHANNEL'],
            }
          }),
          ...teams.orange.players.map(playerObj => {
            return {
              id: playerObj.id,
              allow: ['CONNECT', 'SPEAK', 'VIEW_CHANNEL'],
            }
          })
        ],
      })

      const blueVoiceChannel = await guild.channels.create(`Team-Bleu`, {
        parent: categoryChannel.id,
        topic: `${lobby.name} - Team Blue Coms`,
        userLimit: 3,
        type: 'voice',
        permissionOverwrites: [
          {
            id: everyoneRole.id,
            deny: ['CONNECT', 'SPEAK', 'CREATE_INSTANT_INVITE', 'VIEW_CHANNEL'],
          },
          ...teams.blue.players.map(playerObj => {
            return {
              id: playerObj.id,
              allow: ['CONNECT', 'SPEAK', 'VIEW_CHANNEL'],
            }
          }),
          ...teams.orange.players.map(playerObj => {
            return {
              id: playerObj.id,
              allow: ['VIEW_CHANNEL'],
            }
          }),
        ],
      })
      

      const orangeVoiceChannel = await guild.channels.create(`Team-Orange`, {
        parent: categoryChannel.id,
        topic: `${lobby.name} - Team Orange Coms`,
        userLimit: 3,
        type: 'voice',
        permissionOverwrites: [
          {
            id: everyoneRole.id,
            deny: ['CONNECT', 'SPEAK', 'CREATE_INSTANT_INVITE', 'VIEW_CHANNEL'],
          },
          ...teams.orange.players.map(playerObj => {
            return {
              id: playerObj.id,
              allow: ['CONNECT', 'SPEAK', 'VIEW_CHANNEL'],
            }
          }),
          ...teams.blue.players.map(playerObj => {
            return {
              id: playerObj.id,
              allow: ['VIEW_CHANNEL'],
            }
          }),
        ],
      })
    
    teams.blue.voiceChannelID = blueVoiceChannel.id
    teams.orange.voiceChannelID = orangeVoiceChannel.id
  }

  createChannelCategory();
    
  } else {
    channel.send('Je ne possède pas la persmission de créer des channel')
  }
}
