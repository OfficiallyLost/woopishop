module.exports = 
{

    name: "daily",

    async execute(client, coinEmote, errorEmote, economy, economySettings, message, commandAvailability)
    {

        try
        {

        let successMessages = ["You successfully claimed your dailies and earned [payout]."];

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

            if(message.timestamp >= findUserEconomy.nextDlyTP)
            {

                let findEconomySettings = await economySettings.findOne({  });
                let dailyPayoutRange = findEconomySettings.dlyPayRange;
                let dailyCooldown = findEconomySettings.dlyCooldown;

                let payout = Math.floor(Math.random() * Math.floor(dailyPayoutRange));
                let successMessage = successMessages[Math.floor(Math.random() * successMessages.length)].replace("[payout]", `${coinEmote} ${payout}`);
                let newAmount = findUserEconomy.cashAmount + payout;
                let nextDailyTP = message.timestamp + dailyCooldown;

                message.channel.createMessage({ embed: {

                    color: 8235519,
                    description: successMessage

                }})

                await economy.updateOne({ userID: message.author.id }, { cashAmount: newAmount, nextDlyTP: nextDailyTP });

            }

            else if(message.timestamp < findUserEconomy.nextDlyTP)
            {

                let remainingTimeInMs = findUserEconomy.nextDlyTP - message.timestamp;
                let totalSeconds = (remainingTimeInMs / 1000);
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);

                return message.channel.createMessage({ embed: {

                    color: 15761536,
                    description: `${errorEmote} You can claim your dailies again in \`${hours} hours ${minutes} minutes\`.`

                }})

            }

        }

    }
    catch(err)
    {

        await commandAvailability.updateOne({ commandName: "daily" }, { availability: false });
        message.channel.createMessage("***An error occured and this command has been disabled. Please wait for a staff to fix this issue.***");
        client.createMessage('720183380301447170', { embed: {

            color: 16711680,
            title: "Command Automatically Disabled",
            description: `**Error:** \`\`\`js\n${err}\`\`\``,
            fields:
            [

                { name: "User:", value: `${message.author.username}#${message.author.discriminator}\n(${message.author.id})`, inline: true },
                { name: "Command:", value: "daily", inline: true }

            ]

        }})

    }

    }

}