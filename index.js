const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
const path = require('path')
const osUtils = require("os-utils");
const ms = require("ms");

const DB = require('./Structures/Schemas/ClientDB');
const config = require("./Structures/config.json");



const { Intents } = DiscordJS

const client = new DiscordJS.Client({
  // These intents are recommended for the built in help menu
  intents: 
    [   
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  ],
})


client.on('ready', () => {

    new WOKCommands(client, {
    
        commandsDir: path.join(__dirname, 'Commands'),
        
        featuresDir: path.join(__dirname, 'Events'),

        messagesPath: '',
        
        typeScript: false,
        
        showWarns: false,

        delErrMsgCooldown: 10,

        defaultLangauge: 'english',

        ignoreBots: false,

        ephemeral: true,

        dbOptions: {
            keepAlive: true
        },

        testServers: ["969614943072698389"],

        botOwners: ['939872045783736380', '944257362447978596'],

        disabledDefaultCommands: [
             'command',
             'help',
             'prefix',
             'language',
             'requiredrole',
             'channelonly'
        ],

        mongoUri: config.Database,
        
        debug: false
    })

        .setDefaultPrefix('v!')

        .setColor(0xff0000)

        
        const activites = [
            {name: `Over ${client.guilds.cache.size} Guilds!`, type: "WATCHING"},
            {name: `Over ${client.users.cache.size} Members!`, type: "WATCHING"},
            {name: `Part Of The Vivid Series`},
            {name: `/help`, type: "LISTENING"},
            {name: `Vivid Music`, type: "LISTENING"},
            {name: `Vivid Moderation`, type: "WATCHING"},
            {name: `Vivid Status`, type: "PLAYING"},
        ]

        let activity = 0
        client.user.setPresence({status: "idle", activity: activites[0]})
        setInterval(() => {
            if(activity === activity.length) return activity = 0;
            activity++
            client.user.setActivity(activites[Math.floor(Math.random() * activites.length)])
        }, 1000 * 35);

})



client.login(config.Token)


// require ("./Handlers/anti-crash.js")(client)