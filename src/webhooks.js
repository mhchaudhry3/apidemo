const {WebhookClient, MessageEmbed} = require('discord.js')

module.exports = {
    name: 'webhook',
    run: async(client, message, args) => {
        const wc = WebhookClient('976526855647670383', 'hq0Q8wixkcTWlSsITAqKKiVgsl5NiVdD2B-efRg-g3k6EiJuuPKJoKsarLwDmMR3bB9h')
        const embed = new MessageEmbed()
            .setTitle("this is an imbed")
        wc.send({
            username : message.author.tag,
            avatarURL : message.author.displayAvatarURL({ dynamic : true})
        })
    }
}
console.log('hello')
