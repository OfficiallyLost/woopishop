module.exports = 
{

    name: "crime",

    async execute(client, coinEmote, errorEmote, economy, economySettings, message, commandAvailability)
    {

        try
        {

        let successMessages = ["You robbed a bank and earned [payout]."];
        let failMessages = ["You were robbing a bank while the police were behind you. \nYou paid a fine of [fine]"];

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

            if(message.timestamp >= findUserEconomy.nextCrimeTP)
            {

                let findEconomySettings = await economySettings.findOne({  });
                let crimeSuccessPercentage = 100 - findEconomySettings.crimeSuccessPercentage;
                let crimeResults = Math.floor(Math.random() * Math.floor(100));

                if(crimeResults < crimeSuccessPercentage) 
                {

                    let crimeFineRange = findEconomySettings.crimeFineRange;
                    let crimeCooldown = findEconomySettings.crimeCooldown;

                    let fine = Math.floor(Math.random() * Math.floor(crimeFineRange));
                    let failMessage = failMessages[Math.floor(Math.random() * failMessages.length)].replace("[fine]", `${coinEmote} ${fine}`);
                    let newAmount = findUserEconomy.cashAmount - fine;
                    let nextCrimeTP = message.timestamp + crimeCooldown;

                    message.channel.createMessage({ embed: {

                        color: 8235519,
                        description: failMessage

                    }})

                    await economy.updateOne({ userID: message.author.id }, { cashAmount: newAmount, nextCrimeTP: nextCrimeTP });

                }

                else if(crimeResults > crimeSuccessPercentage)
                {

                    let crimeCooldown = findEconomySettings.crimeCooldown;
                    let crimePayoutRange = findEconomySettings.crimePayRange;

                    let payout = Math.floor(Math.random() * Math.floor(crimePayoutRange));
                    let successMessage = successMessages[Math.floor(Math.random() * successMessages.length)].replace("[payout]", `${coinEmote} ${payout}`);
                    let newAmount = findUserEconomy.cashAmount + payout;
                    let nextCrimeTP = message.timestamp + crimeCooldown;

                    message.channel.createMessage({ embed: {

                        color: 8235519,
                        description: successMessage

                    }})

                    await economy.updateOne({ userID: message.author.id }, { cashAmount: newAmount, nextCrimeTP: nextCrimeTP });  

                }

            }

            else if(message.timestamp < findUserEconomy.nextCrimeTP)
            {

                let remainingTimeInMs = findUserEconomy.nextCrimeTP - message.timestamp;
                let totalSeconds = (remainingTimeInMs / 1000);
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);

                return message.channel.createMessage({ embed: {

                    color: 15761536,
                    description: `${errorEmote} You can commit a crime again in \`${hours} hours ${minutes} minutes\`.`

                }})

            }

        }

    }
    catch(err)
    {

        await commandAvailability.updateOne({ commandName: "crime" }, { availability: false });
        message.channel.createMessage("***An error occured and this command has been disabled. Please wait for a staff to fix this issue.***");
        client.createMessage('720183380301447170', { embed: {

            color: 16711680,
            title: "Command Automatically Disabled",
            description: `**Error:** \`\`\`js\n${err}\`\`\``,
            fields:
            [

                { name: "User:", value: `${message.author.username}#${message.author.discriminator}\n(${message.author.id})`, inline: true },
                { name: "Command:", value: "crime", inline: true }

            ]

        }})

    }

    }

}