module.exports = 
{

    name: "work",

    async execute(client, coinEmote, errorEmote, economy, economySettings, message, commandAvailability)
    {

        try
        {

        let successMessages = ["You worked as a delivery man and earned [payout]."];

        if(!economy.exists({ userID: message.author.id }))
        {

            let createUserEconomy = new economy({

                userID: message.author.id,
                cashAmount: 0,
                nextWorkTP: message.timestamp,
                nextStealTP: message.timestamp,
                nextDlyTP: message.timestamp,
                nextCrimeTP: message.timestamp

            })

            createUserEconomy.save();

        }

        else
        {

            let findUserEconomy = await economy.findOne({ userID: message.author.id });

            if(message.timestamp >= findUserEconomy.nextWorkTP)
            {

                let findEconomySettings = await economySettings.findOne({  });
                let workPayoutRange = findEconomySettings.workPayRange;
                let workCooldown = findEconomySettings.workCooldown;

                let payout = Math.floor(Math.random() * Math.floor(workPayoutRange));
                let successMessage = successMessages[Math.floor(Math.random() * successMessages.length)].replace("[payout]", `${coinEmote} ${payout}`);
                let newAmount = findUserEconomy.cashAmount + payout;
                let nextWorkTP = message.timestamp + workCooldown;

                message.channel.createMessage({ embed: {

                    color: 8235519,
                    description: successMessage

                }})

                await economy.updateOne({ userID: message.author.id }, { cashAmount: newAmount, nextWorkTP: nextWorkTP });

            }

            else if(message.timestamp < findUserEconomy.nextWorkTP)
            {

                let remainingTimeInMs = findUserEconomy.nextWorkTP - message.timestamp;
                let totalSeconds = (remainingTimeInMs / 1000);
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);

                return message.channel.createMessage({ embed: {

                    color: 15761536,
                    description: `${errorEmote} You can work again in \`${hours} hours ${minutes} minutes\`.`

                }})

            }

        }

    }
    catch(err)
    {

        await commandAvailability.updateOne({ commandName: "work" }, { availability: false });
        message.channel.createMessage("***An error occured and this command has been disabled. Please wait for a staff to fix this issue.***");
        client.createMessage('720183380301447170', { embed: {

            color: 16711680,
            title: "Command Automatically Disabled",
            description: `**Error:** \`\`\`js\n${err}\`\`\``,
            fields:
            [

                { name: "User:", value: `${message.author.username}#${message.author.discriminator}\n(${message.author.id})`, inline: true },
                { name: "Command:", value: "work", inline: true }

            ]

        }})

    }

    }

}