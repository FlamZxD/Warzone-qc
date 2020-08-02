const { deletePlayerQueue } = require('../utils/managePlayerQueues')
const playerNotInQueue = require('../utils/playerNotInQueue')

module.exports = (eventObj, queue) => {
  let { players, playerIdsIndexed, lobby } = queue
  const channel = eventObj.author.lastMessage.channel
  const playerId = eventObj.author.id
  const playerIndexInQueue = players.findIndex(playerObj => playerObj.id === playerId)
  const remainingPlayersRequired = 6 - players.length

  // Player is not in the queue
  if (playerNotInQueue({ playerId, channel, queue })) return

  // Player is in the queue
  players.splice(playerIndexInQueue, 1)
  delete playerIdsIndexed[playerId]

  channel.send({
    embed: {
      color: 15158332,
      title: `Vous avez à quitté la queue!`,
      description: `${remainingPlayersRequired + 1} autre(s) joueur(s) nécéssaire(s) pour débuter!`,
      timestamp: new Date(),
        footer: {
          icon_url: 'https://cdn.discordapp.com/avatars/727015369910517772/1d6bbe7ec5d602c5dad8bc878cfaf479.png',
          text: "Robot 6mans"
        }
    },
  })

  if (Object.keys(playerIdsIndexed).length === 0) {
    deletePlayerQueue(lobby.id)
  }
}
