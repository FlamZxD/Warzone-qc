const startVote = require('./startVote')

module.exports = (eventObj, queue) => {
  const { players, playerIdsIndexed } = queue
  const channel = eventObj.author.lastMessage.channel
  const playerId = eventObj.author.id
  const username = eventObj.author.username
  const dmPlayer = async msg => await eventObj.author.send(msg)
  const playerIdsIndexedToMentions = require('../utils/playerIdsIndexedToMentions')
  const remainingPlayersRequired = 6 - players.length

  // Check to see if the player is already in the queue
  const isInQueue = playerIdsIndexed[playerId]

  // The player is already in the queue
  if (isInQueue) return channel.send(`Vous êtes déjà dans la queue <@${playerId}>`)

  // The player is not in the queue
  players.push({ id: playerId, username, dmPlayer })
  playerIdsIndexed[playerId] = true

  // Notify the player that they have joined the queue

  if(remainingPlayersRequired == 6){
    channel.send(`@here`)
  }

  channel.send({
    embed: {
      color: 3066993,
      title: `Vous avez à rejoint la queue!`,
      description: `${remainingPlayersRequired - 1} joueur(s) nécéssaire(s) pour débuter!`,
      fields: [
        { name: 'Joueur(s) dans la queue', value: playerIdsIndexedToMentions(playerIdsIndexed) },
      ],
    },
  })

  // Check to see if 6 players have queued now
  if (Object.keys(playerIdsIndexed).length === 6) {
    // 6 players queued, start the voting phase
    startVote(eventObj, queue)
  }
}
