const TelegramBot = require("node-telegram-bot-api");

// replace the value below with the Telegram token you receive from @BotFather
const token = "6879158440:AAHuwMwvHrsP-8bimMGmkKwn5eYGya0XAG0";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Выбери действие:", {
    reply_markup: {
      keyboard: [["Нафармить 1 монету"], ["Фарми 100 монет"]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Привет!");

  const imagePath = "./images.jpg";

  // Отправляем изображение
      bot
            // .sendDice(chatId)
    .sendPhoto(chatId, imagePath, { caption: "Привет, это изображение! 🖼️",
      reply_markup: {
        keyboard: [["Нафармить 1 монету"], ["Фарми 100 монет"]],
        resize_keyboard: true,
        one_time_keyboard: true,
      }, })
    .then(() => {
      console.log("Изображение успешно отправлено");
    })
    .catch((error) => {
      console.error("Ошибка при отправке изображения:", error);
    });
});
