module.exports =
{

    name: "adjust",

    async execute(successEmote, errorEmote, coinEmote, message, args, client, economyShop, economySettings)
    {

        if(!(client.guilds.get("719805331252707389").members.get(message.author.id).roles.includes("719805556688289896"))) return message.channel.createMessage(`${errorEmote} You cannot use this command, silly.`);

        let adjustHelpEmbed = 
        {

            color: 1002625,
            title: "Adjust Command",
            fields:
            [

                { name: "Command Usage", value: "``s!adjust [type] (option)``" },
                { name: "Types:", value: "```css\n[1] price\n[2] stocks\n[3] payout\n[4] successRate```" },
                { name: "Usage Example 1:", value: "``s!adjust price AHfWzADI6LtCz017 100000``" },
                { name: "Usage Example 2:", value: "``s!adjust stocks kTdm0tB6FBQqGUPW 5``" },
                { name: "Usage Example 3:", value: "``s!adjust payout work 250``" },
                { name: "Usage Example 4:", value: "``s!adjust payout crime -250``" },
                { name: "Usage Example 4:", value: "``s!adjust payout crime +500``" },
                { name: "Usage Example 5:", value: "``s!adjust successRate steal 50``" },
                { name: "Tips:", value: "**Price** - Sets the price of an item\n**Stocks** - Replenishes the stocks to the set amount.\n**Payout** - Sets the maximum payout for the economy command specified.\n**Success Rate** - Sets the success percentage for the specified economy command. (**DO NOT** add a '%' behind the number specified)" }

            ]

        }

        let param1 = args[1];

        if(!param1) return message.channel.createMessage({ embed: adjustHelpEmbed });
        if(param1)
        {

            if(param1 === "price")
            {

                let shop = await economyShop.findOne({});
                let productIDSpecified = args[2];
                let newPrice = args[3];

                if(!productIDSpecified) return message.channel.createMessage(`${errorEmote} Missing Parameters. You need to specify the product's ID and the new price.`);
                if(!newPrice) return message.channel.createMessage(`${errorEmote} Missing Parameters. You need to specify a new price for this product.`);

                if(productIDSpecified === "kTdm0tB6FBQqGUPW")
                {

                    try 
                    {
                        await economyShop.updateOne({  }, { infiniteShieldPrice: newPrice });
                        message.channel.createMessage(`${successEmote} Edited Infinite Shield (${productIDSpecified}) Cost: ${newPrice}`);

                        client.createMessage('720133325943209995', { embed: {

                            color: 1002625,
                            title: "Product Price Changed",
                            fields:
                            [
    
                                { name: "User:", value: `${message.author.username}#${message.author.discriminator}`, inline: true },
                                { name: "Product:", value: `Infinite Shield (${productIDSpecified})`, inline: true },
                                { name: "Prices:", value: `**Old Price:** ${coinEmote} ${shop.infiniteShieldPrice}\n**New Price:** ${coinEmote} ${newPrice}`, inline: true },
    
                            ]
    
                        }})
                    } 
                    catch(err) 
                    {
                        return message.channel.createMessage(`${errorEmote} Invalid Parameter. The price specified is not a number.`)
                    }

                }

                else if(productIDSpecified === "gm6YkpdCHfp7ARWU")
                {

                    try 
                    {
                        await economyShop.updateOne({  }, { monthlyShieldPrice: newPrice });
                        message.channel.createMessage(`${successEmote} Edited Monthly Shield (${productIDSpecified}) Cost: ${newPrice}`);

                        client.createMessage('720133325943209995', { embed: {

                            color: 1002625,
                            title: "Product Price Changed",
                            fields:
                            [
    
                                { name: "User:", value: `${message.author.username}#${message.author.discriminator}`, inline: true },
                                { name: "Product:", value: `Monthly Shield (${productIDSpecified})`, inline: true },
                                { name: "Prices:", value: `**Old Price:** ${coinEmote} ${shop.monthlyShieldPrice}\n**New Price:** ${coinEmote} ${newPrice}`, inline: true },
    
                            ]
    
                        }})
                    } 
                    catch(err) 
                    {
                        return message.channel.createMessage(`${errorEmote} Invalid Parameter. The price specified is not a number.`)
                    }

                }

                else if(productIDSpecified === "xRnC9f2um33srcpX")
                {

                    try 
                    {
                        await economyShop.updateOne({  }, { weeklyShieldPrice: newPrice });
                        message.channel.createMessage(`${successEmote} Edited Weekly Shield (${productIDSpecified}) Cost: ${newPrice}`);

                        client.createMessage('720133325943209995', { embed: {

                            color: 1002625,
                            title: "Product Price Changed",
                            fields:
                            [
    
                                { name: "User:", value: `${message.author.username}#${message.author.discriminator}`, inline: true },
                                { name: "Product:", value: `Weekly Shield (${productIDSpecified})`, inline: true },
                                { name: "Prices:", value: `**Old Price:** ${coinEmote} ${shop.weeklyShieldPrice}\n**New Price:** ${coinEmote} ${newPrice}`, inline: true },
    
                            ]
    
                        }})
                    } 
                    catch(err) 
                    {
                        return message.channel.createMessage(`${errorEmote} Invalid Parameter. The price specified is not a number.`)
                    }

                }

                else if(productIDSpecified === "AHfWzADI6LtCz017")
                {

                    try 
                    {
                        await economyShop.updateOne({  }, { activeRolePrice: newPrice });
                        message.channel.createMessage(`${successEmote} Edited Active Role (${productIDSpecified}) Cost: ${newPrice}`);

                        client.createMessage('720133325943209995', { embed: {

                            color: 1002625,
                            title: "Product Price Changed",
                            fields:
                            [
    
                                { name: "User:", value: `${message.author.username}#${message.author.discriminator}`, inline: true },
                                { name: "Product:", value: `Active Role (${productIDSpecified})`, inline: true },
                                { name: "Prices:", value: `**Old Price:** ${coinEmote} ${shop.activeRolePrice}\n**New Price:** ${coinEmote} ${newPrice}`, inline: true },
    
                            ]
    
                        }})
                    } 
                    catch(err) 
                    {
                        return message.channel.createMessage(`${errorEmote} Invalid Parameter. The price specified is not a number.`);
                    }

                }

                else 
                {
                    return message.channel.createMessage(`${errorEmote} Invalid Product ID given.`);
                }

            }

            else if(param1 === "stocks")
            {

                let shop = await economyShop.findOne({});
                let productIDSpecified = args[2];
                let newStock = args[3];

                if(!productIDSpecified) return message.channel.createMessage(`${errorEmote} Missing Parameters. You need to specify the product's ID and the new price.`);
                if(!newStock) return message.channel.createMessage(`${errorEmote} Missing Parameters. You need to specify a new stock for this product.`);

                if(productIDSpecified === "kTdm0tB6FBQqGUPW")
                {

                    try
                    {
                        await economyShop.updateOne({  }, { infiniteShieldStock: newStock });
                        message.channel.createMessage(`${successEmote} Edited Infinite Shield (${productIDSpecified}) Stock: ${newStock}`);

                        client.createMessage('720133325943209995', { embed: {

                            color: 1002625,
                            title: "Product Stock Changed",
                            fields:
                            [
    
                                { name: "User:", value: `${message.author.username}#${message.author.discriminator}`, inline: true },
                                { name: "Product:", value: `Infinite Shield (${productIDSpecified})`, inline: true },
                                { name: "Stocks:", value: `**Old Stock:** ${shop.infiniteShieldStock}\n**New Stock:** ${newStock}`, inline: true },
    
                            ]
    
                        }})
                    }
                    catch(err)
                    {
                        return message.channel.createMessage(`${errorEmote} Invalid Parameter. The price specified is not a number.`);
                    }

                }

                else if(productIDSpecified === "gm6YkpdCHfp7ARWU")
                {

                    try
                    {
                        await economyShop.updateOne({  }, { monthlyShieldStock: newStock });
                        message.channel.createMessage(`${successEmote} Edited Monthly Shield (${productIDSpecified}) Stock: ${newStock}`);

                        client.createMessage('720133325943209995', { embed: {

                            color: 1002625,
                            title: "Product Stock Changed",
                            fields:
                            [
    
                                { name: "User:", value: `${message.author.username}#${message.author.discriminator}`, inline: true },
                                { name: "Product:", value: `Monthly Shield (${productIDSpecified})`, inline: true },
                                { name: "Stocks:", value: `**Old Stock:** ${shop.monthlyShieldStock}\n**New Stock:** ${newStock}`, inline: true },
    
                            ]
    
                        }})
                    }
                    catch(err)
                    {
                        return message.channel.createMessage(`${errorEmote} Invalid Parameter. The price specified is not a number.`);
                    }

                }

                else if(productIDSpecified === "xRnC9f2um33srcpX")
                {

                    try
                    {
                        await economyShop.updateOne({  }, { weeklyShieldStock: newStock });
                        message.channel.createMessage(`${successEmote} Edited Weekly Shield (${productIDSpecified}) Stock: ${newStock}`);

                        client.createMessage('720133325943209995', { embed: {

                            color: 1002625,
                            title: "Product Stock Changed",
                            fields:
                            [
    
                                { name: "User:", value: `${message.author.username}#${message.author.discriminator}`, inline: true },
                                { name: "Product:", value: `Weekly Shield (${productIDSpecified})`, inline: true },
                                { name: "Stocks:", value: `**Old Stock:** ${shop.weeklyShieldStock}\n**New Stock:** ${newStock}`, inline: true },
    
                            ]
    
                        }})
                    }
                    catch(err)
                    {
                        return message.channel.createMessage(`${errorEmote} Invalid Parameter. The price specified is not a number.`);
                    }

                }

                else if(productIDSpecified === "AHfWzADI6LtCz017")
                {

                    try
                    {
                        await economyShop.updateOne({  }, { activeRoleStock: newStock });
                        message.channel.createMessage(`${successEmote} Edited Active Role (${productIDSpecified}) Stock: ${newStock}`);

                        client.createMessage('720133325943209995', { embed: {

                            color: 1002625,
                            title: "Product Stock Changed",
                            fields:
                            [
    
                                { name: "User:", value: `${message.author.username}#${message.author.discriminator}`, inline: true },
                                { name: "Product:", value: `Active Role (${productIDSpecified})`, inline: true },
                                { name: "Stocks:", value: `**Old Stock:** ${shop.activeRoleStock}\n**New Stock:** ${newStock}`, inline: true },
    
                            ]
    
                        }})
                    }
                    catch(err)
                    {
                        return message.channel.createMessage(`${errorEmote} Invalid Parameter. The price specified is not a number.`);
                    }

                }

                else
                {
                    return message.channel.createMessage(`${errorEmote} Invalid Product ID given.`);
                }

            }

            else if(param1 === "payout")
            {

                let ecoSettings = await economySettings.findOne({});
                let actionSpecified = args[2];
                let newPayout = args[3];

                if(!actionSpecified) return message.channel.createMessage(`${errorEmote} Missing Parameters. You need to specify the action(e.g. work, crime) and the new payout.`);
                if(!newPayout) return message.channel.createMessage(`${errorEmote} Missing Parameters. You need to specify a new payout for this action. (e.g. work, crime)`);

                if(actionSpecified === "work")
                {

                    try 
                    {
                        await economySettings.updateOne({  }, { workPayRange: newPayout });
                        message.channel.createMessage(`${successEmote} Edited work maximum payout: ${coinEmote} ${newPayout}`);

                        client.createMessage('720133325943209995', { embed: {

                            color: 1002625,
                            title: "Payout Changed",
                            fields:
                            [
    
                                { name: "User:", value: `${message.author.username}#${message.author.discriminator}`, inline: true },
                                { name: "Action:", value: "Work", inline: true },
                                { name: "Payouts:", value: `**Old Payout:** ${ecoSettings.workPayRange}\n**New Payout:** ${newPayout}`, inline: true },
    
                            ]
    
                        }})
                    } 
                    catch (error) 
                    {
                        return message.channel.createMessage(`${errorEmote} Invalid Parameter. The payout specified is not a number.`);
                    }

                }

                if(actionSpecified === "daily")
                {

                    try 
                    {
                        await economySettings.updateOne({}, { dlyPayRange: newPayout });
                        message.channel.createMessage(`${successEmote} Edited daily maximum payout: ${coinEmote} ${newPayout}`);

                        client.createMessage('720133325943209995', { embed: {

                            color: 1002625,
                            title: "Payout Changed",
                            fields:
                            [
    
                                { name: "User:", value: `${message.author.username}#${message.author.discriminator}`, inline: true },
                                { name: "Action:", value: "Daily", inline: true },
                                { name: "Payouts:", value: `**Old Payout:** ${ecoSettings.dlyPayRange}\n**New Payout:** ${newPayout}`, inline: true },
    
                            ]
    
                        }})
                    } 
                    catch (error) 
                    {
                        return message.channel.createMessage(`${errorEmote} Invalid Parameter. The payout specified is not a number.`);
                    }

                }

                else if(actionSpecified === "crime")
                {

                    if(newPayout.startsWith("+"))
                    {

                        let payout = newPayout.slice(1);

                        try
                        {
                            await economySettings.updateOne({}, { crimePayRange: payout });
                            message.channel.createMessage(`${successEmote} Edited crime maximum payout: ${coinEmote} ${payout}`);
    
                            client.createMessage('720133325943209995', { embed: {
    
                                color: 1002625,
                                title: "Payout Changed",
                                fields:
                                [
        
                                    { name: "User:", value: `${message.author.username}#${message.author.discriminator}`, inline: true },
                                    { name: "Action:", value: "Crime", inline: true },
                                    { name: "Payouts:", value: `**Old Payout:** ${ecoSettings.crimePayRange}\n**New Payout:** ${payout}`, inline: true },
        
                                ]
        
                            }})
                        } 
                        catch (error) 
                        {
                            return message.channel.createMessage(`${errorEmote} Invalid Parameter. The payout specified is not a number.`);
                        }

                    }

                    else if(newPayout.startsWith("-"))
                    {

                        let payout = newPayout.slice(1);
                        try 
                        {
                            await economySettings.updateOne({}, { crimeFineRange: payout });
                            message.channel.createMessage(`${successEmote} Edited crime maximum fine: ${coinEmote} ${payout}`);
    
                            client.createMessage('720133325943209995', { embed: {
    
                                color: 1002625,
                                title: "Payout Changed",
                                fields:
                                [
        
                                    { name: "User:", value: `${message.author.username}#${message.author.discriminator}`, inline: true },
                                    { name: "Action:", value: "Crime", inline: true },
                                    { name: "Fines:", value: `**Old Fine:** ${ecoSettings.crimeFineRange}\n**New Fine:** ${payout}`, inline: true },
        
                                ]
        
                            }})
                        } 
                        catch (error) 
                        {
                            return message.channel.createMessage(`${errorEmote} Invalid Parameter. The fine specified is not a number.`);
                        }

                    }

                    else
                    {
                        return message.channel.createMessage(`${errorEmote} You need to specify whether it is a fine or payout that you're editing.\n>>> **To do so:**\nFine - \`s!adjust payout crime -[amount]\`\nPayout - \`s!adjust payout crime +[amount]\``);
                    }

                }

                else if(actionSpecified === "steal")
                {

                    if(newPayout.startsWith("+"))
                    {

                        let payout = newPayout.slice(1);

                        try
                        {
                            await economySettings.updateOne({}, { stealPayRange: payout });
                            message.channel.createMessage(`${successEmote} Edited steal maximum payout: ${coinEmote} ${payout}`);
    
                            client.createMessage('720133325943209995', { embed: {
    
                                color: 1002625,
                                title: "Payout Changed",
                                fields:
                                [
        
                                    { name: "User:", value: `${message.author.username}#${message.author.discriminator}`, inline: true },
                                    { name: "Action:", value: "Steal", inline: true },
                                    { name: "Payouts:", value: `**Old Payout:** ${ecoSettings.stealPayRange}\n**New Payout:** ${payout}`, inline: true },
        
                                ]
        
                            }})
                        } 
                        catch (error) 
                        {
                            return message.channel.createMessage(`${errorEmote} Invalid Parameter. The payout specified is not a number.`);
                        }

                    }

                    else if(newPayout.startsWith("-"))
                    {

                        let payout = newPayout.slice(1);
                        try 
                        {
                            await economySettings.updateOne({}, { stealFineRange: payout });
                            message.channel.createMessage(`${successEmote} Edited steal maximum fine: ${coinEmote} ${payout}`);
    
                            client.createMessage('720133325943209995', { embed: {
    
                                color: 1002625,
                                title: "Payout Changed",
                                fields:
                                [
        
                                    { name: "User:", value: `${message.author.username}#${message.author.discriminator}`, inline: true },
                                    { name: "Action:", value: "Steal", inline: true },
                                    { name: "Fines:", value: `**Old Fine:** ${ecoSettings.stealFineRange}\n**New Fine:** ${payout}`, inline: true },
        
                                ]
        
                            }})
                        } 
                        catch (error) 
                        {
                            return message.channel.createMessage(`${errorEmote} Invalid Parameter. The fine specified is not a number.`);
                        }

                    }

                    else
                    {
                        return message.channel.createMessage(`${errorEmote} You need to specify whether it is a fine or payout that you're editing.\n>>> **To do so:**\nFine - \`s!adjust payout crime -[amount]\`\nPayout - \`s!adjust payout crime +[amount]\``);
                    }

                }

            }

            else if(param1 === "successrate" || param1 === "successRate" || param1 === "sucrate" || param1 === "sucRate")
            {

                let ecoSettings = await economySettings.findOne({});
                let actionSpecified = args[2];
                let newPercentage = args[3];

                if(!actionSpecified) return message.channel.createMessage(`${errorEmote} Missing Parameters. You need to specify the action(e.g. crime, steal) and the new percentage.`);
                if(!newPercentage) return message.channel.createMessage(`${errorEmote} Missing Parameters. You need to specify a new success percentage for this product.`);

                if(actionSpecified === "crime")
                {

                    try 
                    {
                        await economySettings.updateOne({  }, { crimeSuccessPercentage: newPercentage });
                        message.channel.createMessage(`${successEmote} Edited crime success percentage: ${newPercentage}`);

                        client.createMessage('720133325943209995', { embed: {
    
                            color: 1002625,
                            title: "Success Percentage Changed",
                            fields:
                            [
    
                                { name: "User:", value: `${message.author.username}#${message.author.discriminator}`, inline: true },
                                { name: "Action:", value: "Crime", inline: true },
                                { name: "Percentages:", value: `**Old Percentage:** ${ecoSettings.crimeSuccessPercentage}\n**New Percentage:** ${newPercentage}`, inline: true },
    
                            ]
    
                        }})
                    } 
                    catch (error) 
                    {
                        return message.channel.createMessage(`${errorEmote} Invalid Parameter. The percentage specified is not a number.`);
                    }

                }

                if(actionSpecified === "steal")
                {

                    try 
                    {
                        await economySettings.updateOne({  }, { stealSuccessPercentage: newPercentage });
                        message.channel.createMessage(`${successEmote} Edited steal success percentage: ${newPercentage}`);

                        client.createMessage('720133325943209995', { embed: {
    
                            color: 1002625,
                            title: "Success Percentage Changed",
                            fields:
                            [
    
                                { name: "User:", value: `${message.author.username}#${message.author.discriminator}`, inline: true },
                                { name: "Action:", value: "Steal", inline: true },
                                { name: "Percentages:", value: `**Old Percentage:** ${ecoSettings.stealSuccessPercentage}\n**New Percentage:** ${newPercentage}`, inline: true },
    
                            ]
    
                        }})
                    } 
                    catch (error) 
                    {
                        return message.channel.createMessage(`${errorEmote} Invalid Parameter. The percentage specified is not a number.`);
                    }

                }

            }

        }

    }

}