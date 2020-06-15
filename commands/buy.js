module.exports = 
{

    name: "buy",

    async execute(successEmote, errorEmote, coinEmote, economyStore, economy, message, args, client, commandAvailability)
    {

        try
        {

        let shop = await economyStore.findOne({});
        let productSpecified = args[1];

        if(!productSpecified)
        {

            return message.channel.createMessage({ embed: {

                color: 8235519,
                title: "Buy Command",
                fields:
                [

                    { name: "Command Usage:", value: "``s!buy [productID]``" },
                    { name: "Usage Example:", value: "``s!buy kTdm0tB6FBQqGUPW``" },
                    { name: "Tip:", value: "You can find the product's ID by typing ``s!shop`` and copy pasting the desired product's ID." },

                ]

            }})

        }

        else if(productSpecified)
        {

            let findUserDB = await economy.findOne({ userID: message.author.id });

            if(productSpecified === "kTdm0tB6FBQqGUPW") //Infinite Shield
            {

                if(shop.infiniteShieldStock <= 0) return message.channel.createMessage(`${errorEmote} This product has ran out of stock. Please contact a staff member.`);
                if(findUserDB.cashAmount < shop.infiniteShieldPrice) return message.channel.createMessage(`${errorEmote} You do not have sufficient cash to purchase this product.`);
                if(message.member.roles.includes("719857932262703195")) return message.channel.createMessage(`${errorEmote} You already purchased this product.`);
                message.member.addRole("719857932262703195", "Bought Infinite Shield");
                message.channel.createMessage(`${successEmote} You bought the \`Infinite Shield\` product for ${coinEmote} ${shop.infiniteShieldPrice}. (Lasts forever)`);
                await economy.updateOne({ userID: message.author.id }, { cashAmount: findUserDB.cashAmount - shop.infiniteShieldPrice });
                await economyStore.updateOne({  }, { infiniteShieldStock: shop.infiniteShieldStock - 1 });

                client.createMessage('719806721542979605', { embed: {

                    color: 64154,
                    title: "Product Purchased",
                    fields:
                    [

                        { name: `User:`, value: `${message.author.username}#${message.author.discriminator}\n(${message.author.id})`, inline: true },
                        { name: `Product:`, value: `Infinite Shield (kTdm0tB6FBQqGUPW)`, inline: true },
                        { name: `Stock Left:`, value: `${shop.infiniteShieldStock - 1}`, inline: true }

                    ]

                }})
                    
            }

            else if(productSpecified === "gm6YkpdCHfp7ARWU") //Monthly Shield
            {

                if(shop.monthlyShieldStock <= 0) return message.channel.createMessage(`${errorEmote} This product has ran out of stock. Please contact a staff member.`);
                if(findUserDB.cashAmount < shop.monthlyShieldPrice) return message.channel.createMessage(`${errorEmote} You do not have sufficient cash to purchase this product.`);
                if(message.member.roles.includes("720097644898418711")) return message.channel.createMessage(`${errorEmote} You already purchased this product.`);
                message.member.addRole("720097644898418711", "Bought Monthly Shield");
                message.channel.createMessage(`${successEmote} You bought the \`Monthly Shield\` product for ${coinEmote} ${shop.monthlyShieldPrice}. (Will be removed on the 1st of the coming month)`);
                await economy.updateOne({ userID: message.author.id }, { cashAmount: findUserDB.cashAmount - shop.monthlyShieldPrice });
                await economyStore.updateOne({  }, { monthlyShieldStock: shop.monthlyShieldStock - 1 });

                client.createMessage('719806721542979605', { embed: {

                    color: 64154,
                    title: "Product Purchased",
                    fields:
                    [

                        { name: `User:`, value: `${message.author.username}#${message.author.discriminator}\n(${message.author.id})`, inline: true },
                        { name: `Product:`, value: `Monthly Shield (gm6YkpdCHfp7ARWU)`, inline: true },
                        { name: `Stock Left:`, value: `${shop.infiniteShieldStock - 1}`, inline: true }

                    ]

                }})
                    
            }

            else if(productSpecified === "xRnC9f2um33srcpX") //Weekly Shield
            {

                if(shop.weeklyShieldStock <= 0) return message.channel.createMessage(`${errorEmote} This product has ran out of stock. Please contact a staff member.`);
                if(findUserDB.cashAmount < shop.weeklyShieldPrice) return message.channel.createMessage(`${errorEmote} You do not have sufficient cash to purchase this product.`);
                if(message.member.roles.includes("720097677521453058")) return message.channel.createMessage(`${errorEmote} You already purchased this product.`);
                message.member.addRole("720097677521453058", "Bought Weekly Shield");
                message.channel.createMessage(`${successEmote} You bought the \`Weekly Shield\` product for ${coinEmote} ${shop.weeklyShieldPrice}. (Will be removed on the coming Sunday)`);
                await economy.updateOne({ userID: message.author.id }, { cashAmount: findUserDB.cashAmount - shop.weeklyShieldPrice });
                await economyStore.updateOne({  }, { weeklyShieldStock: shop.weeklyShieldStock - 1 });

                client.createMessage('719806721542979605', { embed: {

                    color: 64154,
                    title: "Product Purchased",
                    fields:
                    [

                        { name: `User:`, value: `${message.author.username}#${message.author.discriminator}\n(${message.author.id})`, inline: true },
                        { name: `Product:`, value: `Weekly Shield (xRnC9f2um33srcpX)`, inline: true },
                        { name: `Stock Left:`, value: `${shop.weeklyShieldStock - 1}`, inline: true }

                    ]

                }})
                    
            }

            else if(productSpecified === "AHfWzADI6LtCz017") //Active Role
            {

                if(shop.activeRoleStock <= 0) return message.channel.createMessage(`${errorEmote} This product has ran out of stock. Please contact a staff member.`);
                if(findUserDB.cashAmount < shop.activeRolePrice) return message.channel.createMessage(`${errorEmote} You do not have sufficient cash to purchase this product.`);
                if(message.member.roles.includes("668355624249065492")) return message.channel.createMessage(`${errorEmote} You already purchased this product.`);
                message.member.addRole("668355624249065492", "Bought Active Role");
                message.channel.createMessage(`${successEmote} You bought the \`Active Role\` product for ${coinEmote} ${shop.activeRolePrice}. (Lasts forever)`);
                await economy.updateOne({ userID: message.author.id }, { cashAmount: findUserDB.cashAmount - shop.activeRolePrice });
                await economyStore.updateOne({  }, { activeRoleStock: shop.activeRoleStock - 1 });

                client.createMessage('719806721542979605', { embed: {

                    color: 64154,
                    title: "Product Purchased",
                    fields:
                    [

                        { name: `User:`, value: `${message.author.username}#${message.author.discriminator}\n(${message.author.id})`, inline: true },
                        { name: `Product:`, value: `Active Role (AHfWzADI6LtCz017)`, inline: true },
                        { name: `Stock Left:`, value: `${shop.activeRoleStock - 1}`, inline: true }

                    ]

                }})
                    
            }

            else 
            {

                return message.channel.createMessage(`${errorEmote} I couldn't find the product specified. Make sure you are copying the product's **ID**`);

            }

        }

    }
    catch(err)
    {

        await commandAvailability.updateOne({ commandName: "buy" }, { availability: false });
        message.channel.createMessage("***An error occured and this command has been disabled. Please wait for a staff to fix this issue.***");
        client.createMessage('720183380301447170', { embed: {

            color: 16711680,
            title: "Command Automatically Disabled",
            description: `**Error:** \`\`\`js\n${err}\`\`\``,
            fields:
            [

                { name: "User:", value: `${message.author.username}#${message.author.discriminator}\n(${message.author.id})`, inline: true },
                { name: "Command:", value: "buy", inline: true }

            ]

        }})

    }

    }

}