const { determinePlayerQueue, deletePlayerQueue } = require('../utils/managePlayerQueues')

module.exports = (oldMember, newMember) => {
  const queue = determinePlayerQueue(newMember.id, undefined)
  const guild = newMember.guild

  // Player is not in a queue
  if (!queue) return

  // Player is in a queue
  const {
    teams: { blue, orange },
    lobby,
  } = queue

  // Track how many users joined the voice channels
  if (newMember.voiceChannelID === blue.voiceChannelID) {
    blue.voiceChannelHistory[newMember.id] = true
  }

  if (newMember.voiceChannelID === orange.voiceChannelID) {
    orange.voiceChannelHistory[newMember.id] = true
  }

  console.log('blue voice channel history', blue.voiceChannelHistory)
  console.log('orange voice channel history', orange.voiceChannelHistory)

  // Automatically delete the channels after all players have left their voice channels
  if (
    (oldMember.voiceChannelID === blue.voiceChannelID || oldMember.voiceChannelID === orange.voiceChannelID) &&
    (newMember.voiceChannelID !== blue.voiceChannelID || newMember.voiceChannelID !== orange.voiceChannelID)
  ) {
    console.log('tout les joueurs on quitter les canaux vocaux !!!')
    // Check that all 3 members have joined the orange and blue voice channels
    if (Object.keys(blue.voiceChannelHistory).length >= 3 && Object.keys(orange.voiceChannelHistory).length >= 3) {
      const blueVoiceChannel = guild.channels.get(blue.voiceChannelID)
      const orangeVoiceChannel = guild.channels.get(orange.voiceChannelID)

      console.log('Tout le monde est connecter!')

      if (blueVoiceChannel.members.size === 0 && orangeVoiceChannel.members.size === 0) {
        console.log('delete les voices channels')
        // Delete the voice channels
        blueVoiceChannel.delete()
        orangeVoiceChannel.delete()
        generalVoiceChannel.delete()
        invitationTextChannel.delete()
        categoryChannel.delete()

        // Delete the player queue
        deletePlayerQueue(lobby.id)
      }
    }
  }
}
