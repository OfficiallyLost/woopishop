module.exports  =
{

    name: "stats",

    async execute(client, economySettings, message, commandAvailability)
    {

        try
        {

        let economyStats = await economySettings.findOne({});

        let workCooldownInMs = economyStats.workCooldown;
        let workCooldownTotalSeconds = (workCooldownInMs / 1000);
        let workCooldownInHours = Math.floor(workCooldownTotalSeconds / 3600);
        workCooldownTotalSeconds %= 3600;
        let workCooldownInMinutes = Math.floor(workCooldownTotalSeconds / 60);

        let dailyCooldownInMs = economyStats.dlyCooldown;
        let dailyCooldownTotalSeconds = (dailyCooldownInMs / 1000);
        let dailyCooldownInHours = Math.floor(dailyCooldownTotalSeconds / 3600);
        dailyCooldownTotalSeconds %= 3600;
        let dailyCooldownInMinutes = Math.floor(dailyCooldownTotalSeconds / 60);

        let stealCooldownInMs = economyStats.stealCooldown;
        let stealCooldownTotalSeconds = (stealCooldownInMs / 1000);
        let stealCooldownInHours = Math.floor(stealCooldownTotalSeconds / 3600);
        stealCooldownTotalSeconds %= 3600;
        let stealCooldownInMinutes = Math.floor(stealCooldownTotalSeconds / 60);

        let crimeCooldownInMs = economyStats.crimeCooldown;
        let crimeCooldownTotalSeconds = (crimeCooldownInMs / 1000);
        let crimeCooldownInHours = Math.floor(crimeCooldownTotalSeconds / 3600);
        crimeCooldownTotalSeconds %= 3600;
        let crimeCooldownInMinutes = Math.floor(crimeCooldownTotalSeconds / 60);

        return message.channel.createMessage({ embed: {

            color: 15761536,
            title: "Economy Commands Statistics",
            fields:
            [

                { name: "Work: (Cooldown)", value: `${workCooldownInHours} Hours ${workCooldownInMinutes} minutes`, inline: true },
                { name: "Work: (Pay Range)", value: `0 to ${economyStats.workPayRange}`, inline: true },
                { name: "Work: (Extra)", value: `None`, inline: true },
                { name: "Daily: (Cooldown)", value: `${dailyCooldownInHours} Hours ${dailyCooldownInMinutes} minutes`, inline: true },
                { name: "Daily: (Pay Range)", value: `0 to ${economyStats.dlyPayRange}`, inline: true },
                { name: "Daily: (Extra)", value: `None`, inline: true },
                { name: "Crime: (Cooldown)", value: `${crimeCooldownInHours} Hours ${crimeCooldownInMinutes} minutes`, inline: true },
                { name: "Crime: (Pay Range)", value: `0 to ${economyStats.crimePayRange}`, inline: true },
                { name: "Crime: (Extra)", value: `**Fine Range:** 0 to ${economyStats.crimeFineRange}\n**Success Percentage:** ${economyStats.crimeSuccessPercentage}`, inline: true },
                { name: "Steal: (Cooldown)", value: `${stealCooldownInHours} Hours ${stealCooldownInMinutes} minutes`, inline: true },
                { name: "Steal: (Pay Range)", value: `${economyStats.stealPayRange}`, inline: true },
                { name: "Steal: (Extra)", value: `**Fine Range:** 0 to ${economyStats.stealFineRange}\n**Success Percentage:** ${economyStats.stealSuccessPercentage}`, inline: true },

            ]

        }})

    }
    catch(err)
    {

        await commandAvailability.updateOne({ commandName: "stats" }, { availability: false });
        message.channel.createMessage("***An error occured and this command has been disabled. Please wait for a staff to fix this issue.***");
        client.createMessage('720183380301447170', { embed: {

            color: 16711680,
            title: "Command Automatically Disabled",
            description: `**Error:** \`\`\`js\n${err}\`\`\``,
            fields:
            [

                { name: "User:", value: `${message.author.username}#${message.author.discriminator}\n(${message.author.id})`, inline: true },
                { name: "Command:", value: "stats", inline: true }

            ]

        }})

    }

    }

}