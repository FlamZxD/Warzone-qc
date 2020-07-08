const randomNumber = require('../utils/randomNumber')
const createLobbyInfo = require('./createLobbyInfo')

module.exports = (eventObj, queue) => {
  const { lobby, players, teams } = queue
  const channel = eventObj.author.lastMessage.channel
  queue.votingInProgress = false
  queue.creatingTeamsInProgress = true

  // Tell the server that random mode was chosen
  channel.send({
    embed: {
      color: 3066993,
      title: `Lobby ${lobby.name} - Structure aléatoire`,
      description: 'Le vote à abouti à une structure aléatoire. Vous recevrez un DM lorsque les équipes seront automatiquement créées.',
    },
  })

  // Create blue team
  while (teams.blue.players.length !== 3) {
    const randomIndex = randomNumber(players.length - 1)
    teams.blue.players.push(players[randomIndex])
    players.splice(randomIndex, 1)
  }

  // Create orange team
  while (teams.orange.players.length !== 3) {
    const randomIndex = randomNumber(players.length - 1)
    teams.orange.players.push(players[randomIndex])
    players.splice(randomIndex, 1)
  }

  // Create the lobby
  createLobbyInfo(eventObj, queue)
}
