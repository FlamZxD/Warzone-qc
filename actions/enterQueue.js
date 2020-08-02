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
    channel.send({
      embed: {
        color: 3066993,
        title: `${remainingPlayersRequired - 1} joueurs nécéssaires pour débuter!`,
        description: `<@${playerId}> à rejoint la queue!`,
        timestamp: new Date(),
          footer: {
            icon_url: 'https://cdn.discordapp.com/avatars/727015369910517772/1d6bbe7ec5d602c5dad8bc878cfaf479.png',
            text: "Robot 6mans"
          }
      },
    })
  }else if(remainingPlayersRequired <=5){
    channel.send({
      embed: {
        color: 3066993,
        title: `${remainingPlayersRequired - 1} joueurs nécéssaires pour débuter!`,
        description: `<@${playerId}> à rejoint la queue!`,
        timestamp: new Date(),
          footer: {
            icon_url: 'https://cdn.discordapp.com/avatars/727015369910517772/1d6bbe7ec5d602c5dad8bc878cfaf479.png',
            text: "Robot 6mans"
          }
      },
    })
  }

  // Check to see if 6 players have queued now
  if (Object.keys(playerIdsIndexed).length === 6) {
    // 6 players queued, start the voting phase
    startVote(eventObj, queue)
  }
}
