const { commandToString } = require('../utils/commands')

module.exports = eventObj => {
  const channel = eventObj.author.lastMessage.channel

  channel.send({
    embed: {
      color: 3066993,
      title: 'Liste de commandes pour les 6mans',
      description: 'Toutes les commandes possibles pour les 6mans',
      fields: [
        { name: commandToString.queue, value: 'Entrez dans un queue existe ou une nouvelle' },
        { name: commandToString.leave, value: 'Quitter votre queue' },
        {
          name: commandToString.status,
          value: 'Voir combien de personnes sont présentements dans la queue',
        },
        {
          name: commandToString.votestatus,
          value: 'Voir combien de personnes on voté et pour le type de structure des équipes',
        },
        {
          name: commandToString.r,
          value: 'Voter pour des équipes aléatoires pendant la phase de vote',
        },
        {
          name: commandToString.c,
          value: 'Voter pour des équipes avec des capitaines pendant la phase de vote',
        },
        {
          name: commandToString.help,
          value: 'Voir toutes les commandes que le bot offre',
        },
      ],
    },
  })
}
