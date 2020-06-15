module.exports = 
{

    name: "steal",

    async execute(client, coinEmote, errorEmote, economy, economySettings, message, commandAvailability)
    {

        try
        {

        let successMessages = ["You stole [payout] from [user]."];
        let failMessages = ["You tried stealing and got caught. \nYou lost [fine]"];

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

            if(message.timestamp >= findUserEconomy.nextStealTP)
            {

                let findEconomySettings = await economySettings.findOne({  });
                let stealSuccessPercentage = 100 - findEconomySettings.stealSuccessPercentage;
                let stealResults = Math.floor(Math.random() * Math.floor(100));

                if(stealResults < stealSuccessPercentage) 
                {

                    let stealFineRange = findEconomySettings.stealFineRange;
                    let stealCooldown = findEconomySettings.stealCooldown;

                    let fine = Math.floor(Math.random() * Math.floor(stealFineRange));
                    let failMessage = failMessages[Math.floor(Math.random() * failMessages.length)].replace("[fine]", `${coinEmote} ${fine}`);
                    let newAmount = findUserEconomy.cashAmount - fine;
                    let nextStealTP = message.timestamp + stealCooldown;

                    message.channel.createMessage({ embed: {

                        color: 8235519,
                        description: failMessage

                    }})

                    await economy.updateOne({ userID: message.author.id }, { cashAmount: newAmount, nextStealTP: nextStealTP });

                }

                else if(stealResults > stealSuccessPercentage)
                {

                    let membersWithBotsNotDefended2 = message.channel.guild.members.filter(r => !(r.roles.includes("719857932262703195")));
                    let membersWithBotsNotDefended1 = membersWithBotsNotDefended2.filter(r => !(r.roles.includes("720097644898418711")));
                    let membersWithBotsNotDefended = membersWithBotsNotDefended1.filter(r => !(r.roles.includes("720097677521453058")));
                    let humanMembersThatCanBeUser = membersWithBotsNotDefended.filter(u => !(u.bot));
                    let humanMembers = humanMembersThatCanBeUser.filter(u => u.id !== message.author.id);
                    let humanMemberIDs = humanMembers.map(u => u.id);
                    let randomHumanMemberID = humanMemberIDs[Math.floor(Math.random() * humanMemberIDs.length)];
                    let humanMemberChosen = message.channel.guild.members.get(randomHumanMemberID);
                    let humanMemberChosenTag = `${humanMemberChosen.user.username}#${humanMemberChosen.user.discriminator}`;

                    let stealCooldown = findEconomySettings.stealCooldown;
                    let stealPayoutRange = findEconomySettings.stealPayRange;

                    let payout = Math.floor(Math.random() * Math.floor(stealPayoutRange));
                    let successMessage = successMessages[Math.floor(Math.random() * successMessages.length)].replace("[payout]", `${coinEmote} ${payout}`).replace("[user]", humanMemberChosenTag);
                    let newAmount = findUserEconomy.cashAmount + payout;
                    let nextStealTP = message.timestamp + stealCooldown;

                    let findStolenMemberDB = await economy.findOne({ userID: randomHumanMemberID });
                    if(!findStolenMemberDB)
                    {

                        let createUserEconomy = new economy({

                            userID: randomHumanMemberID,
                            cashAmount: 0,
                            nextWorkTP: message.timestamp,
                            nextStealTP: message.timestamp,
                            nextDlyTP: message.timestamp,
                            nextCrimeTP: message.timestamp
            
                        })
            
                        createUserEconomy.save();

                    }

                    message.channel.createMessage({ embed: {

                        color: 8235519,
                        description: successMessage

                    }})

                    await economy.updateOne({ userID: message.author.id }, { cashAmount: newAmount, nextStealTP: nextStealTP });  
                    await economy.updateOne({ userID: randomHumanMemberID }, { cashAmount: 0 });  

                }

            }

            else if(message.timestamp < findUserEconomy.nextStealTP)
            {

                let remainingTimeInMs = findUserEconomy.nextStealTP - message.timestamp;
                let totalSeconds = (remainingTimeInMs / 1000);
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);

                return message.channel.createMessage({ embed: {

                    color: 15761536,
                    description: `${errorEmote} You can steal again in \`${hours} hours ${minutes} minutes\`.`

                }})

            }

        }

    }
    catch(err)
    {

        await commandAvailability.updateOne({ commandName: "steal" }, { availability: false });
        message.channel.createMessage("***An error occured and this command has been disabled. Please wait for a staff to fix this issue.***");
        client.createMessage('720183380301447170', { embed: {

            color: 16711680,
            title: "Command Automatically Disabled",
            description: `**Error:** \`\`\`js\n${err}\`\`\``,
            fields:
            [

                { name: "User:", value: `${message.author.username}#${message.author.discriminator}\n(${message.author.id})`, inline: true },
                { name: "Command:", value: "steal", inline: true }

            ]

        }})

    }

    }

}