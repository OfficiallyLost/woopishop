module.exports = 
{

    name: "enable",

    async execute(client, successEmote, errorEmote, message, args, commandAvailability)
    {

        if(!(client.guilds.get("719805331252707389").members.get(message.author.id).roles.includes("719805556688289896"))) return message.channel.createMessage(`${errorEmote} You cannot use this command, silly.`);

        let commandSpecified = args[1];

        let enableHelpEmbed = 
        {

            color: 1002625,
            title: "Enable Command",
            fields:
            [

                { name: "Command Usage", value: "``s!enable [command]``" },
                { name: "Usage Example:", value: "``s!enable balance``" }

            ]

        }

        if(!commandSpecified) return message.channel.createMessage({ embed: enableHelpEmbed });

        else
        {

            let findCommand = await commandAvailability.findOne({ commandName: commandSpecified });
            if(!findCommand) return message.channel.createMessage(`${errorEmote} **Command not found.**`);
            else if(findCommand)
            {

                await commandAvailability.updateOne({ commandName: commandSpecified }, { availability: true });

                client.createMessage('720183380301447170', { embed: {

                    color: 64154,
                    title: "Command Manually Enabled",
                    fields:
                    [

                        { name: "User:", value: `${message.author.username}#${message.author.discriminator}\n(${message.author.id})`, inline: true },
                        { name: "Command:", value: `${commandSpecified}`, inline: true }

                    ]

                }});

                return message.channel.createMessage(`${successEmote} **${commandSpecified} command has been enabled successfully.**`);

            }

        }

    }

}