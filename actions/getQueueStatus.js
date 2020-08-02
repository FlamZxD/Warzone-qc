const playerNotInQueue = require('../utils/playerNotInQueue')
const playerIdsIndexedToMentions = require('../utils/playerIdsIndexedToMentions')

module.exports = (eventObj, queue) => {
  const { players, playerIdsIndexed, lobby, votingInProgress, creatingTeamsInProgress, readyToJoin } = queue
  const channel = eventObj.author.lastMessage.channel
  const playerId = eventObj.author.id
  const remainingPlayersRequired = players.length

  // Player is not in the queue
  if (playerNotInQueue({ playerId, channel, queue })) return

  // Player is in the queue
  channel.send({
    embed: {
      color: 3066993,
      description: `${remainingPlayersRequired}/6 joueur(s) présent(s) dans la queue`,
      fields: [
        { name: 'Joueur dans la queue: ', value: playerIdsIndexedToMentions(playerIdsIndexed) },
      ],
      timestamp: new Date(),
        footer: {
          icon_url: 'https://cdn.discordapp.com/avatars/727015369910517772/1d6bbe7ec5d602c5dad8bc878cfaf479.png',
          text: "Robot 6mans"
        }
    },
  })
}
