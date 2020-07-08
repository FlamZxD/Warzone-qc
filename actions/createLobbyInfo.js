const randomNumber = require('../utils/randomNumber')
const createVoiceChannels = require('./createVoiceChannels')

module.exports = async (eventObj, queue) => {
  const { teams, lobby } = queue
  const channel = eventObj.author.lastMessage.channel

  const randomTeam = randomNumber(1) === 0 ? 'blue' : 'orange'
  const randomPlayer = randomNumber(2)
  let creatorId = teams[randomTeam].players[randomPlayer].id

  const readyEmbed = {
    embed: {
      color: 3066993,
      title: `Lobby ${lobby.name} - Prêt`,
      description: 'Veuillez rejoindre le salon vocal correspondant à votre équipe prédéfini',
      fields: [
        {
          name: 'Bleu',
          value: teams.blue.players.map(playerObj => `<@${playerObj.id}>`).join(', '),
        },
        {
          name: 'Orange',
          value: teams.orange.players.map(playerObj => `<@${playerObj.id}>`).join(', '),
        },
        {
          name: 'Création du lobby',
          value: `<@${creatorId}>`,
        },
      ],
    },
  }

 function sendLobbyInfo(players) {
    players.forEach(player => {
      player.dmPlayer(readyEmbed)
    })
 }

  // Create Voice Channels for each team
  await createVoiceChannels(eventObj, queue)
  console.log(`createVoiceChannel finished, queue:`, queue)

  // DM Blue Team
  sendLobbyInfo(teams.blue.players)
  // DM Orange Team
  sendLobbyInfo(teams.orange.players)

  // Inform the channel that everything is ready
  channel.send(readyEmbed)

  // Set the ready to go flag to true
  queue.votingInProgress = false
  queue.creatingTeamsInProgress = false
  queue.readyToJoin = true
}
