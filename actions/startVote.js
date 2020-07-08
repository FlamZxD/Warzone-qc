const playerIdsIndexedToMentions = require('../utils/playerIdsIndexedToMentions')
const { commandToString } = require('../utils/commands')

module.exports = (eventObj, queue) => {
  const { playerIdsIndexed, lobby } = queue
  const channel = eventObj.author.lastMessage.channel
  queue.votingInProgress = true

  channel.send(playerIdsIndexedToMentions(playerIdsIndexed))

  channel.send({
    embed: {
      color: 2201331,
      title: `Lobby ${lobby.name} - 6 joueurs trouvés`,
      description: 'Veuillez voter pour le type de structure que vous souhaitez',
      fields: [
        { name: 'Voter pour des équipes aléatoires', value: commandToString.r, inline: true },
        { name: 'Voter pour des capitaines', value: commandToString.c, inline: true },
        {
          name: 'Status du vote',
          value: `Vous pouvez vérifier le status du vote en tappant __**${commandToString.votestatus}**__`,
        },
      ],
    },
  })
}
