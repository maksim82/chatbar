const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const PORT = 7000;
const socketIO = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:5173",
    },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const generateID = () => Math.random().toString(36).substring(2, 10);
let chatRooms = [];
let generalChat = [];

app.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (userFromBd) {
            return res.json(userFromBd);
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

app.get('/users', (req, res)=> {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;

        return res.json(users)
    } catch(e) {
        console.log(e);
    }
})

app.get('/chat/personal/list', (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));

        const chats = db.chats.filter(chat => chat.producerUserId === Number(req.query.id) || chat.consumerUserId === Number(req.query.id));
        return res.json(chats);
    } catch(e) {
        console.log(e);
    }
})

app.get('/chat/personal/history', (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const chat = db.chats.find(chat => chat.chatId === req.query.id);

        return res.json(chat);
    } catch(e) {
        console.log(e);
    }
})

socketIO.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("/topic/public", () => {
        console.log("connected general chat");
        console.log(generalChat);

        socket.emit("/topic/public", generalChat)
        socket.broadcast.emit("/topic/public", generalChat)
    })

    socket.emit("/topic/public", generalChat);
    // socket.on("/topic/public", () => {
    //     socket.to("general").emit("roomMessage", generalChat[generalChat.length - 1]);
    // })

    socket.on("/chat/send/public", data => {
        const { message, user, timestamp } = data;
        const newMessage = {
            id: generateID(),
            message: message,
            user,
            time: timestamp,
        };
        generalChat.push(newMessage)

        socket.emit("/topic/public", generalChat);
        socket.broadcast.emit("/topic/public", generalChat);
    })

    socket.on("/user/queue/personal", (personChatData) => {
        const chatData = { chatId: generateID(), title: personChatData.title, messages: [], producerUserId: personChatData.userId, consumerUserId: personChatData.consumerUserId }
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));

        chatRooms.push(chatData);
        socket.join(chatData.chatId);

        db.chats.push({
            chatId: chatData.chatId,
            title: chatData.title,
            messages: chatData.messages,
            consumerUserId: chatData.consumerUserId,
            producerUserId: chatData.producerUserId
        })

        fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(db), 'UTF-8')

        socket.emit("/user/queue/personal", chatRooms);
        socket.broadcast.emit("/user/queue/personal", chatRooms);
    });

    // socket.on("findRoom", (id) => {
    //     let result = chatRooms.filter((room) => room.id == id);
    //     socket.emit("foundRoom", result[0].messages);
    // });
    ///chat/send/personal
    //{"chatId":"j9fsvay8","title":"Геймеры","messages":[],"consumerUserId":3
    socket.on("/chat/send/personal", (data) => {
        const { chatId, user, message, timestamp } = data;

        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));

        let result = db.chats.find(chat => chat.chatId === chatId);
        const newMessage = {
            chatId,
            message,
            senderIsProducerInChat: result.producerUserId === user,
            time: timestamp,
        };

        socket.to(chatId).emit("/chat/send/personal", newMessage);
        socket.emit("/chat/send/personal", newMessage);
        socket.broadcast.emit("/chat/send/personal", newMessage);
    });
    socket.on("disconnect", () => {
        socket.disconnect();
        console.log("🔥: A user disconnected");
    });
});

app.get("/api", (req, res) => {
    res.json(chatRooms);
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
