const createRandomTeams = require('./createRandomTeams')
const createCaptainTeams = require('./createCaptainTeams')
const randomNumber = require('../utils/randomNumber')
const playerNotInQueue = require('../utils/playerNotInQueue')

module.exports = (eventObj, queue) => {
  const { votes, votingInProgress } = queue
  const channel = eventObj.author.lastMessage.channel
  const playerId = eventObj.author.id

  // Player is not in the queue
  if (playerNotInQueue({ playerId, channel, queue })) return

  // The voting phase has not started yet
  if (!votingInProgress) {
    return channel.send(`Vous ne pouvez pas voter car la phase de vote n'est pas en cours <@${playerId}>`)
  }

  // The voting phase has started
  // Player is in the queue
  const vote = eventObj.content
    .toLowerCase()
    .trim()
    .split('!')[1]
    .split('-')[1]

  if (!votes.playersWhoVoted[playerId]) {
    // The player has not voted yet
    votes[vote]++
    votes.playersWhoVoted[playerId] = true

    // Check to see if majority of the votes are for 1 team structure
    // This saves time of waiting for all 6 voters
    const numberOfVoters = Object.keys(votes.playersWhoVoted).length

    if (numberOfVoters >= 4 && numberOfVoters < 6) {
      if (votes.r >= 4) {
        // Random Structure has the majority
        createRandomTeams(eventObj, queue)
      } else if (votes.c >= 4) {
        // Captain Structure has the majority
        createCaptainTeams(eventObj, queue)
      }
    }
  } else {
    // The player has already voted
    channel.send(`Vous ne pouvez pas voter car vous avez déjà voté <@${playerId}>`)
  }

  // Check to see if all 6 votes have been set and then determine the team structure
  if (votes.c + votes.r === 6) {
    if (votes.r > votes.c) {
      createRandomTeams(eventObj, queue)
    } else if (votes.c > votes.r) {
      createCaptainTeams(eventObj, queue)
    } else {
      const random = randomNumber(1)

      channel.send(`Le résultat du vote est égalité. Je vais choisir la structure des équipe aléatoirement.`)

      if (random === 0) {
        createRandomTeams(eventObj, queue)
      } else if (random === 1) {
        createCaptainTeams(eventObj, queue)
      } else {
        channel.send(`L'univers vien d'exploser...`)
      }
    }
  }
}
