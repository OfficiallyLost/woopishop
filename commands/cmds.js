module.exports = 
{

    name: "cmds",

    async execute(client, message, commandAvailability) 
    {

        try
        {

        const miscCmds = ["ping", "cmds", "stats", "id"];
        const ecoCmds = ["work", "daily", "crime", "steal", "bal", "buy", "shop"];
        const adminCmds = ["adjust", "whitelist", "blacklist", "enable", "disable"];

        message.channel.createMessage({ embed: {

            color: 15761536,
            title: "Commands Panel",
            fields:
            [

                { name: "Misc Commands", value: "``s!" + miscCmds.join("``, ``s!") + "``" },
                { name: "Economy Commands", value: "``s!" + ecoCmds.join("``, ``s!") + "``" },
                { name: "Admin Commands", value: "``s!" + adminCmds.join("``, ``s!") + "``" }

            ]

        }})

    }
    catch(err)
    {

        await commandAvailability.updateOne({ commandName: "cmds" }, { availability: false });
        message.channel.createMessage("***An error occured and this command has been disabled. Please wait for a staff to fix this issue.***");
        client.createMessage('720183380301447170', { embed: {

            color: 16711680,
            title: "Command Automatically Disabled",
            description: `**Error:** \`\`\`js\n${err}\`\`\``,
            fields:
            [

                { name: "User:", value: `${message.author.username}#${message.author.discriminator}\n(${message.author.id})`, inline: true },
                { name: "Command:", value: "cmds", inline: true }

            ]

        }})

    }

    }

}