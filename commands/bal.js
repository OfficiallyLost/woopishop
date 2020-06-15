module.exports = 
{

    name: "balance",

    async execute(client, coinEmote, errorEmote, economy, message, args, commandAvailability)
    {

        try
        {

        let userSpecified = args[1];

        if(!userSpecified)
        {

            let findUserEconomy = await economy.findOne({ userID: message.author.id });
            if(!findUserEconomy)
            {

                let createUserEco = new economy({

                    userID: message.author.id,
                    cashAmount: 0,
                    nextWorkTP: message.timestamp,
                    nextStealTP: message.timestamp,
                    nextDlyTP: message.timestamp,
                    nextCrimeTP: message.timestamp

                })

                createUserEco.save();

            }

            if(!findUserEconomy) userBalance = 0;
            if(findUserEconomy) userBalance = findUserEconomy.cashAmount
            return message.channel.createMessage({ embed: {

                color: 8235519,
                title: `${message.author.username}#${message.author.discriminator}'s Wallet`,
                fields:
                [

                    { name: 'Cash:', value: `${coinEmote} ${userBalance}` }

                ]

            }})

        }

        else if(userSpecified)
        {

            let findUser = message.channel.guild.members.find(m => m.id === userSpecified) || message.channel.guild.members.find(m => m.nick === userSpecified) || message.channel.guild.members.find(m => m.user.username === userSpecified);
            if(!findUser) return message.channel.createMessage({ embed: { description: `${errorEmote} Unable to find user with ID/Username/Nickname/Mention given.` }});
            else if(findUser.bot) return message.channel.createMessage({ embed: { description: `${errorEmote} Bots do not have income.` }});

            else
            {

                let findUserEconomy = await economy.findOne({ userID: findUser.id });
                if(!findUserEconomy)
                {

                    let createUserEco = new economy({

                        userID: findUser.id,
                        cashAmount: 0,
                        nextWorkTP: message.timestamp,
                        nextStealTP: message.timestamp,
                        nextDlyTP: message.timestamp,
                        nextCrimeTP: message.timestamp

                    });

                    createUserEco.save();

                }

                if(!findUserEconomy) userBalance = 0;
                if(findUserEconomy) userBalance = findUserEconomy.cashAmount

                return message.channel.createMessage({ embed: {

                    color: 8235519,
                    title: `${findUser.user.username}#${findUser.user.discriminator}'s Wallet`,
                    fields:
                    [

                        { name: "Cash:", value: `${coinEmote} ${userBalance}` }

                    ]

                }})

            }

        }

        }
        catch(err)
        {

            console.log(err);
            await commandAvailability.updateOne({ commandName: "bal" }, { availability: false });
            message.channel.createMessage("***An error occured and this command has been disabled. Please wait for a staff to fix this issue.***");
            client.createMessage('720183380301447170', { embed: {

                color: 16711680,
                title: "Command Automatically Disabled",
                description: `**Error:** \`\`\`js\n${err}\`\`\``,
                fields:
                [

                    { name: "User:", value: `${message.author.username}#${message.author.discriminator}\n(${message.author.id})`, inline: true },
                    { name: "Command:", value: "bal", inline: true }

                ]

            }})

        }

    }

}