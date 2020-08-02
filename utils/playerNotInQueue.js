const { commandToString } = require('./commands')

module.exports = ({ playerId, channel, queue }) => {
  const { playerIdsIndexed } = queue

  if (!playerIdsIndexed[playerId]) {
    if (channel) {
      channel.send(`Vous devez avoir rejoint la queue <@${playerId}>. Tappez ${commandToString.queue} pour rejoindre!`)
    }

    return true
  } else {
    return false
  }
}
