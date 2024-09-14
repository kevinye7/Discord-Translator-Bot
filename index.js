require('dotenv').config();
const { ActivityType, Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const translate = require('@iamtraction/google-translate');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', (c) => {
    console.log(`${c.user.username} is online`);

    client.user.setPresence({
        status: 'idle',
        activities: [{
            type: ActivityType.Custom,
            name: `Custom status test`,
            state: 'translating...'
        }]
    });
});

const lanAbbr = [
    "auto", //Automatic
     "af", //Afrikaans 
     "sq", //Albanian
     "am", //Amharic
     "ar", //Arabic 
     "hy", //Armenian
     "az", //Azerbaijani
     "eu", //Basque 
     "be", //Belarusian 
     "bn", //Bengali
     "bs", //Bosnian 
     "bg", //Bulgarian 
     "ca", //Catalan 
     "ceb", //Cebuano 
     "ny", //Chichewa
     "zh-cn", //Chinese Simplified 
     "zh-tw", //Chinese Traditional
     "co", //Corsican
     "hr", //Croatian 
     "cs", //Czech
     "da", //Danish 
     "nl", //Dutch
     "en", //English 
     "eo", //Esperanto 
     "et", //Estonian 
     "tl", //Filipino 
     "fi", //Finnish 
     "fr", //French
     "fy", //Frisian 
     "gl", //Galician
     "ka", //Georgian
     "de", //German 
     "el", //Greek
     "gu", //Gujarati 
     "ht", //Haitian Creole
     "ha", //Hausa
     "haw", //Hawaiian
     "iw", //Hebrew
     "hi", //Hindi 
     "hmn", //Hmong 
     "hu", //Hungarian 
     "is", //Icelandic 
     "ig", //Igbo
     "id", //Indonesian 
     "ga", //Irish
     "it", //Italian
     "ja", //Japanese 
     "jw", //Javanese 
     "kn", //Kannada 
     "kk", //Kazakh 
     "km", //Khmer 
     "ko", //Korean 
     "ku", //Kurdish (Kurmanji) 
     "ky", //Kyrgyz
     "lo", //Lao 
     "la", //Latin 
     "lv", //Latvian 
     "lt", //Lithuanian 
     "lb", //Luxembourgish 
     "mk", //Macedonian
     "mg", //Malagasy
     "ms", //Malay 
     "ml", //Malayalam
     "mt", //Maltese 
     "mi", //Maori 
     "mr", //Marathi 
     "mn", //Mongolian 
     "my", //Myanmar (Burmese)
     "ne", //Nepali 
     "no", //Norwegian 
     "ps", //Pashto
     "fa", //Persian 
     "pl", //Polish 
     "pt", //Portuguese
     "pa", //Punjabi
     "ro", //Romanian 
     "ru", //Russian 
     "sm", //Samoan
     "gd", //Scots Gaelic 
     "sr", //Serbian 
     "st", //Sesotho
     "sn", //Shona 
     "sd", //Sindhi 
     "si", //Sinhala 
     "sk", //Slovak 
     "sl", //Slovenian 
     "so", //Somali 
     "es", //Spanish 
     "su", //Sundanese 
     "sw", //Swahili 
     "sv", //Swedish 
     "tg", //Tajik 
     "ta", //Tamil
     "te", //Telugu
     "th", //Thai
     "tr", //Turkish
     "uk", //Ukrainian
     "ur", //Urdu
     "uz", //Uzbek 
     "vi", //Vietnamese
     "cy", //Welsh 
     "xh", //Xhosa
     "yi", //Yiddish
     "yo", //Yoruba 
     "zu" //Zulu
];

const lanName = [
    "Automatic", "Afrikaans", "Albanian", "Amharic", "Arabic", "Armenian", "Azerbaijani", 
    "Basque ", "Belarusian", "Bengali", "Bosnian", "Bulgarian", 
    "Catalan", "Cebuano", "Chichewa", "Chinese Simplified ", "Chinese Traditional", "Corsican", "Croatian ", "Czech", 
    "Danish", "Dutch", 
    "English", "Esperanto", "Estonian", 
    "Filipino", "Finnish", "French", "Frisian", 
    "Galician", "Georgian", "German ", "Greek", "Gujarati", 
    "Haitian Creole", "Hausa", "Hawaiian", "Hebrew", "Hindi", "Hmong", "Hungarian", 
    "Icelandic", "Igbo", "Indonesian", "Irish", "Italian", 
    "Japanese", "Javanese",  
    "Kannada", "Kazakh", "Khmer","Korean", "Kurdish (Kurmanji) ", "Kyrgyz", 
    "Lao", "Latin", "Latvian", "Lithuanian", "Luxembourgish", 
    "Macedonian", "Malagasy", "Malay", "Malayalam", "Maltese", "Maori", "Marathi", "Mongolian", "Myanmar (Burmese)", 
    "Nepali", "Norwegian", 
    "Pashto", "Persian", "Polish", "Portuguese", "Punjabi", 
    "Romanian", "Russian", 
    "Samoan", "Scots Gaelic", "Serbian", "Sesotho", "Shona", "Sindhi", "Sinhala", "Slovak", "Slovenian", "Somali", "Spanish", "Sundanese", "Swahili", "Swedish",  
    "Tajik", "Tamil", "Telugu", "Thai", "Turkish", 
    "Ukrainian", "Urdu", "Uzbek", 
    "Vietnamese", 
    "Welsh", 
    "Xhosa", 
    "Yiddish", "Yoruba", 
    "Zulu" 
];

const commandPrefix = ".";

client.on(Events.MessageCreate, async (message) => {
    if (message.mentions.has(client.user))
        message.reply('Please type .help for help.');

    if (!message.content.trim().startsWith(commandPrefix) || message.author.bot) 
        return;

    const content = message.content.trim();
    let texts = [];
    texts = content.slice(commandPrefix.length).trim().split(' ');
    const command = texts.shift().toLowerCase();

    const commands = { 
        help: () => {
            const commandsEmbed = new EmbedBuilder()
                .setTitle(`Commands`)
                .setColor('White')
                .addFields({name: '.languagelist', value: `Provide a list of the available languages, including their names and abbreviations.`})
                .addFields({name: '.translate', value: `Translate the provided text into the languages chosen by the user.`})
                .addFields({name: '.format', value: `Display the format for translating a given text from the user.`})

            message.channel.send({ embeds: [commandsEmbed]});
        },

        format: () => {
            const formatEmbed = new EmbedBuilder()
                .setTitle(`Format`)
                .setColor('White')
                .addFields({name: 'Here’s the format for translating a text provided by the user:', value: `.translate [Language Abbreviation] [Text]`})

            message.channel.send({ embeds: [formatEmbed]});
        },

        languagelist: () => {
            const languageEmbed = new EmbedBuilder()
                .setTitle(`Available Languages (${lanName.length})`)
                .setColor('White')
                .addFields({name: 'Name: ', value: `${lanName.join('\n')}`, inline: true})
                .addFields({name: 'Abbreviation: ', value: `${lanAbbr.join('\n')}`, inline: true})

            message.channel.send({ embeds: [languageEmbed]});
        },

        translate: async () => {
            if (!texts[0]) 
                return message.reply('Please provide the language abbrevation and the text you want to translate. Use .format to see the available format.');

            const lang = texts.shift().toLowerCase();

            if (!lang || !lanAbbr.includes(lang)) 
                return message.reply(`Invalid language. Please use the abbreviation that are listed in .languagelist to translate.`);

            const text = texts.join(" ");
            if (!text) 
                return message.reply(`Please provide the text to translate.`);

            const applied = await translate(text, { to: lang });

            const translationEmbed = new EmbedBuilder()
                .setTitle('Translation')
                .setColor('White')
                .addFields({name: 'Old Text:', value: `${text}`})
                .addFields({name: 'New Text:', value: `${applied.text}`})

            message.channel.send({ embeds: [translationEmbed]});
        }
    };

    if (commands[command])
        commands[command]();
});

client.login(process.env.TOKEN);