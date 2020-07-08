const { commandToString } = require('./commands')

module.exports = ({ playerId, channel, queue }) => {
  const { playerIdsIndexed } = queue

  if (!playerIdsIndexed[playerId]) {
    if (channel) {
      channel.send(`Vous n'avez pas rejoint la queue <@${playerId}>. Tapper ${commandToString.queue} pour rejoindre!`)
    }

    return true
  } else {
    return false
  }
}
