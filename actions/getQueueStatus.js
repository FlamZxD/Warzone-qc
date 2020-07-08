const playerNotInQueue = require('../utils/playerNotInQueue')
const playerIdsIndexedToMentions = require('../utils/playerIdsIndexedToMentions')

module.exports = (eventObj, queue) => {
  const { players, playerIdsIndexed, lobby, votingInProgress, creatingTeamsInProgress, readyToJoin } = queue
  const channel = eventObj.author.lastMessage.channel
  const playerId = eventObj.author.id
  const remainingPlayersRequired = 6 - players.length

  // Player is not in the queue
  if (playerNotInQueue({ playerId, channel, queue })) return

  // Player is in the queue
  channel.send({
    embed: {
      color: 3066993,
      title: `Lobby ${lobby.name} - Status`,
      description: `${remainingPlayersRequired} joueur(s) nécéssaire(s)`,
      fields: [
        { name: 'Joueur dans la queue: ', value: playerIdsIndexedToMentions(playerIdsIndexed) },
        /*{ name: 'Vote', value: votingInProgress, inline: true },
        { name: 'Création des équipes', value: creatingTeamsInProgress, inline: true },
        { name: 'Lobby prêt', value: readyToJoin, inline: true },*/
      ],
    },
  })
}
