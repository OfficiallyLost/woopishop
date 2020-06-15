module.exports = 
{

    name: "ping",

    async execute(client, message, commandAvailability)
    {

        try
        {

            let m  = await message.channel.createMessage("Ping?");
            m.edit(`Pong! \`${m.timestamp - message.timestamp}ms\``);

        }
        catch(err)
        {

            await commandAvailability.updateOne({ commandName: "ping" }, { availability: false });
            message.channel.createMessage("***An error occured and this command has been disabled. Please wait for a staff to fix this issue.***");
            client.createMessage('720183380301447170', { embed: {

                color: 16711680,
                title: "Command Automatically Disabled",
                description: `**Error:** \`\`\`js\n${err}\`\`\``,
                fields:
                [

                    { name: "User:", value: `${message.author.username}#${message.author.discriminator}\n(${message.author.id})`, inline: true },
                    { name: "Command:", value: "ping", inline: true }

                ]

            }})

        }

    }

}