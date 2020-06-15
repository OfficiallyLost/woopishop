module.exports = 
{

    name: "blacklist",

    async execute(client, successEmote, errorEmote, message, args, userManagement)
    {

        if(!(client.guilds.get("719805331252707389").members.get(message.author.id).roles.includes("719805556688289896"))) return message.channel.createMessage(`${errorEmote} You cannot use this command, silly.`);
        let userSpecified = args[1];

        let blacklistHelpEmbed = 
        {

            color: 1002625,
            title: "Blacklist Command",
            fields:
            [

                { name: "Command Usage", value: "``s!blacklist [user]``" },
                { name: "Usage Example:", value: "``s!blacklist 556938379875319844``" }

            ]

        }

        if(!userSpecified) return message.channel.createMessage({ embed: blacklistHelpEmbed });
        else if(userSpecified)
        {

            let findUser = message.channel.guild.members.find(m => m.id === userSpecified) || message.channel.guild.members.find(m => m.nick === userSpecified) || message.channel.guild.members.find(m => m.user.username === userSpecified) || message.channel.guild.members.get(message.mentions[0].id);
            if(!findUser) return message.channel.createMessage(`${errorEmote} Unable to find user specified.`);
            if(client.guilds.get("719805331252707389").members.get(findUser.id) && !(client.guilds.get("719805331252707389").members.get(findUser.id).roles.includes("719805556688289896"))) return message.channel.createMessage(`${errorEmote} **You cannot blacklist a shop manager.**`);

            else
            {

                let findUserSpecifiedDoc = await userManagement.findOne({ userID: findUser.id });

                if(!findUserSpecifiedDoc)
                {
                    let newBlacklistedUserDoc = new userManagement({
                        userID: findUser.id,
                        blacklisted: true
                    })
                    await newBlacklistedUserDoc.save();

                    client.createMessage('720524562365939752', { embed: {
                        color: 16711680,
                        title: "User Blacklisted",
                        fields:
                        [

                            { name: "Moderator:", value: `${message.author.username}#${message.author.discriminator}\n(${message.author.id})`, inline: true },
                            { name: "User:", value: `${findUser.user.username}#${findUser.user.discriminator}\n(${findUser.user.id})`, inline: true },

                        ]
                    }});

                    return message.channel.createMessage(`${successEmote} ***${findUser.user.username}#${findUser.user.discriminator} has been blacklisted.***`);
                }

                else if(findUserSpecifiedDoc)
                {
                    await userManagement.updateOne({ userID: findUser.id }, { blacklisted: true });

                    client.createMessage('720524562365939752', { embed: {
                        color: 16711680,
                        title: "User Blacklisted",
                        fields:
                        [

                            { name: "Moderator:", value: `${message.author.username}#${message.author.discriminator}\n(${message.author.id})`, inline: true },
                            { name: "User:", value: `${findUser.user.username}#${findUser.user.discriminator}\n(${findUser.user.id})`, inline: true },

                        ]
                    }});

                    return message.channel.createMessage(`${successEmote} ***${findUser.user.username}#${findUser.user.discriminator} has been blacklisted.***`);
                }

            }

        }

    }

}