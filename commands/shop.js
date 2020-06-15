module.exports = 
{

    name: "shop",

    async execute(client, coinEmote, economyShop, message, commandAvailability)
    {

        try
        {

        let economyShopSettings = await economyShop.findOne({});

        let shopEmbed = 
        {

            color: 15761536,
            title: "Woopi Store",
            description: "The following products are limited and have stocks.\nPlease DM one of the staffs if the stock has ran out for an item.",
            fields:
            [

                { name: "Infinite Shield", value: `**Description:** ${economyShopSettings.infiniteShieldDescription}\n**Price:** ${coinEmote} ${economyShopSettings.infiniteShieldPrice}\n**Stock:** ${economyShopSettings.infiniteShieldStock}\n**Product ID:** ${economyShopSettings.infiniteShieldProductID}` },
                { name: "Monthly Shield", value: `**Description:** ${economyShopSettings.monthlyShieldDescription}\n**Price:** ${coinEmote} ${economyShopSettings.monthlyShieldPrice}\n**Stock:** ${economyShopSettings.monthlyShieldStock}\n**Product ID:** ${economyShopSettings.monthlyShieldProductID}` },
                { name: "Weekly Shield", value: `**Description:** ${economyShopSettings.weeklyShieldDescription}\n**Price:** ${coinEmote} ${economyShopSettings.weeklyShieldPrice}\n**Stock:** ${economyShopSettings.weeklyShieldStock}\n**Product ID:** ${economyShopSettings.weeklyShieldProductID}` },
                { name: "Active Role", value: `**Description:** ${economyShopSettings.activeRoleDescription}\n**Price:** ${coinEmote} ${economyShopSettings.activeRolePrice}\n**Stock:** ${economyShopSettings.activeRoleStock}\n**Product ID:** ${economyShopSettings.activeRoleProductID}` }
                
            ],

            footer: { text: "Type s!buy [productID] to purchase a product." }

        }

        return message.channel.createMessage({ embed: shopEmbed });

    }
    catch(err)
    {

        await commandAvailability.updateOne({ commandName: "shop" }, { availability: false });
        message.channel.createMessage("***An error occured and this command has been disabled. Please wait for a staff to fix this issue.***");
        client.createMessage('720183380301447170', { embed: {

            color: 16711680,
            title: "Command Automatically Disabled",
            description: `**Error:** \`\`\`js\n${err}\`\`\``,
            fields:
            [

                { name: "User:", value: `${message.author.username}#${message.author.discriminator}\n(${message.author.id})`, inline: true },
                { name: "Command:", value: "shop", inline: true }

            ]

        }})

    }

    }

}