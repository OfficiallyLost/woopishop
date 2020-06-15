module.exports = 
{

    name: "id",

    async execute(client, message, args, commandAvailability)
    {

        try
        {

        let productSpecified = args.slice(1).join(" ");

        if(!productSpecified) return message.channel.createMessage({ embed: {

            color: 15761536,
            title: "ID Command",
            description: "Displays the Product ID of a specified Product.",
            fields:
            [

                { name: "Command Usage:", value: "``w!id [product]``" },
                { name: "Usage Example:", value: "``w!id Infinite Shield``" },
                { name: "Tip:", value: "The Product Name is not case sensitive." }

            ]

        }});

        if(productSpecified)
        {

            if(productSpecified.toLowerCase() === "infinite shield") return message.channel.createMessage("kTdm0tB6FBQqGUPW");
            if(productSpecified.toLowerCase() === "monthly shield") return message.channel.createMessage("gm6YkpdCHfp7ARWU");
            if(productSpecified.toLowerCase() === "weekly shield") return message.channel.createMessage("xRnC9f2um33srcpX");
            if(productSpecified.toLowerCase() === "active role") return message.channel.createMessage("AHfWzADI6LtCz017");

        }

    }
    catch(err)
    {

        await commandAvailability.updateOne({ commandName: "id" }, { availability: false });
        message.channel.createMessage("***An error occured and this command has been disabled. Please wait for a staff to fix this issue.***");
        client.createMessage('720183380301447170', { embed: {

            color: 16711680,
            title: "Command Automatically Disabled",
            description: `**Error:** \`\`\`js\n${err}\`\`\``,
            fields:
            [

                { name: "User:", value: `${message.author.username}#${message.author.discriminator}\n(${message.author.id})`, inline: true },
                { name: "Command:", value: "id", inline: true }

            ]

        }})

    }

    }

}