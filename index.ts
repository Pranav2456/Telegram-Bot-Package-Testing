import TelegramBot from 'node-telegram-bot-api';

const token = "7148301304:AAEF0qRHVnNKJuypdhhT-LXBy1K_9JhW79Y";

const bot = new TelegramBot(token || '', { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.first_name; 

    const welcomeMessage = `Welcome, @${username}!\n\nHere's what you can do:`;

    const inlineKeyboard = {
        inline_keyboard: [
            [ 
                { text: 'Launch the Game', url: 'https://t.me/durgerkingbot?start' },
            ],
            [ 
                { text: 'Join the Community', url: 'https://t.me/polygonofficial' },
            ],
            [ 
                { text: 'How to Play', callback_data: 'how_to_play' } 
            ]
        ]
    };

    bot.sendMessage(chatId, welcomeMessage, { 
        parse_mode: 'Markdown',
        reply_markup: inlineKeyboard 
    });
});


bot.on('callback_query', (query) => {
    if (query.data === 'how_to_play') {
        const howToPlayInstructions = '*Insert brief instructions here*\n\nLet the clicking begin!';
        bot.answerCallbackQuery(query.id, { text: howToPlayInstructions });
    }
});

bot.startPolling();
console.log('Bot started!');