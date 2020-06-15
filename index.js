const config = require("./config.json");
const mongoose = require("mongoose");
const { inspect } = require("util");
const Eris = require("eris");
const fs = require("fs");

const { prefix, token, mongodb } = config;

const client = new Eris.Client(token);

const economySchema = mongoose.Schema({
    userID: String,
    cashAmount: Number,
    nextWorkTP: Number,
    nextStealTP: Number,
    nextDlyTP: Number,
    nextCrimeTP: Number
});

const economySettingsSchema = mongoose.Schema({
    workCooldown: Number,
    dlyCooldown: Number,
    stealCooldown: Number,
    crimeCooldown: Number,
    workPayRange: Number,
    dlyPayRange: Number,
    stealPayRange: Number,
    stealFineRange: Number,
    stealSuccessPercentage: Number,
    crimePayRange: Number,
    crimeFineRange: Number,
    crimeSuccessPercentage: Number
});

const economyShopSchema = mongoose.Schema({
    weeklyShieldPrice: Number,
    weeklyShieldProductID: String,
    weeklyShieldStock: Number,
    weeklyShieldDescription: String,
    monthlyShieldPrice: Number,
    monthlyShieldProductID: String,
    monthlyShieldStock: Number,
    monthlyShieldDescription: String,
    infiniteShieldPrice: Number,
    infiniteShieldProductID: String,
    infiniteShieldStock: Number,
    infiniteShieldDescription: String,
    activeRolePrice: Number,
    activeRoleProductID: String,
    activeRoleStock: Number,
    activeRoleDescription: String
})

const commandsAvailabilitySchema = mongoose.Schema({
    commandName: String,
    availability: Boolean
});

const userManagementSchema = mongoose.Schema({
    userID: String,
    blacklisted: Boolean
})

const economy = mongoose.model('economy', economySchema);
const economySettings = mongoose.model('economySettings', economySettingsSchema);
const economyShop = mongoose.model('economyShop', economyShopSchema);
const commandAvailability = mongoose.model('commandAvailability', commandsAvailabilitySchema);
const userManagement = mongoose.model('userManagement', userManagementSchema);

client.commands = new Eris.Collection();
const commandFiles = fs.readdirSync('commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("ready", () => {
    console.log("Ready!");
    client.editStatus({ name: `anime`, type: 3 });
    client.createMessage("697814432637517855", { embed: {

      color: 64154,
      title: "Woopi Shop Booted Successfully.",
      description: "Watching the Bank."

    }})
});

client.on("messageCreate", async(message) => { 


    if(message.channel.type !== 0) return;
    if(message.author.bot) return;

    const args = message.content.slice(prefix.length).split(" ");
    const command = args[0].toLowerCase();
    
    const successEmote = "<:greentick:668427698372214797>";
    const errorEmote = "<:redtick:673024127988269076>";
    const coinEmote = "<:coin:719811910614253599>";

    const userDoc = await userManagement.findOne({ userID: message.author.id });

    try {
        
        if(!(message.content.startsWith(prefix))) return;
        if(userDoc.blacklisted === true) return message.channel.createMessage(`${errorEmote} ***You have been blacklisted by the system. Please contact a Shop Manager.***`);

        if (command === "eval") {
            let devs = ["382368885267234816"];
            if (!(devs.includes(message.author.id))) return;
            else {
                try {
                    let evaled = await eval(args.slice(1).join(" "));
                    message.channel.createMessage("```js\n" + inspect(evaled) + "```");
                }
                catch (err) {
                    function CatchError(err, message) {
                    message.channel.createMessage("**Error** ```" + err + "```");
                    }
                    CatchError(err, message);
                }
            }
        }

        if(command === "reload")
        {
            let devs = ["382368885267234816", "475371795185139712", "508309548679954442"];
            if(!(devs.includes(message.author.id))) return;
                    
            let commandSpecified = args[1];
            try 
            {
                delete require.cache[require.resolve(`./commands/${commandSpecified}`)];
                client.commands.delete(commandSpecified);
                let commandFile = require(`./commands/${commandSpecified}`);
                client.commands.set(commandSpecified, commandFile);
                return message.channel.createMessage(`${successEmote} Command \`\`${commandSpecified}\`\` was reloaded successfully.`);
            } 
            catch (error) 
            {
                return message.channel.createMessage(`${errorEmote} Command \`\`${commandSpecified}\`\` does not exist.`);
            }
        }

        if(command === "cmddoc")
        {

            if(message.author.id !== "382368885267234816") return;
            let commandSpecified = args[1];
            if(await commandAvailability.findOne({ commandName: commandSpecified })) return message.channel.createMessage("Command Document Has Already Been Created.");

            else
            {

                let newCommandDoc = new commandAvailability({

                    commandName: commandSpecified,
                    availability: true

                })
                await newCommandDoc.save();
                message.channel.createMessage("Command Document Created Successfully.");

            }

        }

        if(command === "ping")
        {
            let commandDoc = await commandAvailability.findOne({ commandName: 'ping' });
            if(commandDoc.availability === true)
            {
                client.commands.get("ping").execute(client, message, commandAvailability);
            }
            else
            {
                return message.channel.createMessage(`${errorEmote} ***This command has been disabled. Please wait for a store manager to fix the issue.***`);
            }
        }

        if(command === "cmds" || command === "commands")
        {
            let commandDoc = await commandAvailability.findOne({ commandName: 'cmds' });
            if(commandDoc.availability === true)
            {
                client.commands.get("cmds").execute(client, message, commandAvailability);
            }
            else
            {
                return message.channel.createMessage(`${errorEmote} ***This command has been disabled. Please wait for a store manager to fix the issue.***`);
            }
        }

        if(command === "id")
        {
            let commandDoc = await commandAvailability.findOne({ commandName: 'id' });
            if(commandDoc.availability === true)
            {
                client.commands.get("id").execute(client, message, args, commandAvailability);
            }
            else
            {
                return message.channel.createMessage(`${errorEmote} ***This command has been disabled. Please wait for a store manager to fix the issue.***`);
            }
        }

        if(command === "work")
        {
            let commandDoc = await commandAvailability.findOne({ commandName: 'work' });
            if(commandDoc.availability === true)
            {
                client.commands.get("work").execute(client, coinEmote, errorEmote, economy, economySettings, message, commandAvailability);
            }
            else
            {
                return message.channel.createMessage(`${errorEmote} ***This command has been disabled. Please wait for a store manager to fix the issue.***`);
            }
        }

        if(command === "daily" || command === "dly")
        {
            let commandDoc = await commandAvailability.findOne({ commandName: 'daily' });
            if(commandDoc.availability === true)
            {
                client.commands.get("daily").execute(client, coinEmote, errorEmote, economy, economySettings, message, commandAvailability);
            }
            else
            {
                return message.channel.createMessage(`${errorEmote} ***This command has been disabled. Please wait for a store manager to fix the issue.***`);
            }
        }

        if(command === "crime")
        {
            let commandDoc = await commandAvailability.findOne({ commandName: 'crime' });
            if(commandDoc.availability === true)
            {
                client.commands.get("crime").execute(client, coinEmote, errorEmote, economy, economySettings, message, commandAvailability);
            }
            else
            {
                return message.channel.createMessage(`${errorEmote} ***This command has been disabled. Please wait for a store manager to fix the issue.***`);
            }
        }

        if(command === "steal")
        {
            let commandDoc = await commandAvailability.findOne({ commandName: 'steal' });
            if(commandDoc.availability === true)
            {
                client.commands.get("steal").execute(client, coinEmote, errorEmote, economy, economySettings, message, commandAvailability);
            }
            else
            {
                return message.channel.createMessage(`${errorEmote} ***This command has been disabled. Please wait for a store manager to fix the issue.***`);
            }
        }

        if(command === "bal" || command === "balance")
        {
            let commandDoc = await commandAvailability.findOne({ commandName: 'bal' });
            if(commandDoc.availability === true)
            {
            client.commands.get("balance").execute(client, coinEmote, errorEmote, economy, message, args, commandAvailability);
            }
            else
            {
                return message.channel.createMessage(`${errorEmote} ***This command has been disabled. Please wait for a store manager to fix the issue.***`);
            }
        }

        if(command === 'stats' || command === 'statistics')
        {
            let commandDoc = await commandAvailability.findOne({ commandName: 'stats' });
            if(commandDoc.availability === true)
            {
                client.commands.get("stats").execute(client, economySettings, message, commandAvailability);
            }
            else
            {
                return message.channel.createMessage(`${errorEmote} ***This command has been disabled. Please wait for a store manager to fix the issue.***`);
            }
        }

        if(command === "shop" || command === "store")
        {
            let commandDoc = await commandAvailability.findOne({ commandName: 'shop' });
            if(commandDoc.availability === true)
            {
                client.commands.get('shop').execute(client, coinEmote, economyShop, message, commandAvailability);
            }
            else
            {
                return message.channel.createMessage(`${errorEmote} ***This command has been disabled. Please wait for a store manager to fix the issue.***`);
            }
        }

        if(command === "buy" || command === "purchase")
        {
            let commandDoc = await commandAvailability.findOne({ commandName: 'buy' });
            if(commandDoc.availability === true)
            {
            client.commands.get("buy").execute(successEmote, errorEmote, coinEmote, economyShop, economy, message, args, client, commandAvailability);
            }
            else
            {
                return message.channel.createMessage(`${errorEmote} ***This command has been disabled. Please wait for a store manager to fix the issue.***`);
            }
        }

        if(command === "adjust" || command === "adj")
        {
            client.commands.get("adjust").execute(successEmote, errorEmote, coinEmote, message, args, client, economyShop, economySettings);
        }

        if(command === "blacklist")
        {
            client.commands.get("blacklist").execute(client, successEmote, errorEmote, message, args, userManagement);
        }

        if(command === "whitelist")
        {
            client.commands.get("whitelist").execute(client, successEmote, errorEmote, message, args, userManagement);
        }

        if(command === "enable")
        {
            client.commands.get("enable").execute(client, successEmote, errorEmote, message, args, commandAvailability);
        }

        if(command === "disable")
        {
            client.commands.get("disable").execute(client, successEmote, errorEmote, message, args, commandAvailability);
        }

    } catch(err) {
        console.log(err);
    }

    //Creating if doesn't exist
    let findUserEconomy = await economy.exists({ userID: message.author.id });

    if(!findUserEconomy)
    {

        let newUserSchema = new economy({

            userID: message.author.id,
            cashAmount: 0,
            nextWorkTP: message.timestamp,
            nextStealTP: message.timestamp,
            nextDlyTP: message.timestamp,
            nextCrimeTP: message.timestamp

        });

        await newUserSchema.save();

    }

    if(!userDoc)
    {

        let newUserDoc = new userManagement({

            userID: message.author.id,
            blacklisted: false

        });

        await newUserDoc.save();

    }

})

client.connect();

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database Connected Successfully.")
});