import {useLocation} from "react-router-dom";
import {ReactNode, useEffect, useRef, useState} from "react";
import {ChatProps} from "../../ChatPage/ui/ChatPage";
import socket from "@/shared/const/websocket";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";

const ChatDetailPage = () => {
    const [value, setValue] = useState("");
    const [messages, setMessages] = useState<{id: string; message: string; user: string; timestamp: Date }[]>([]);
    const userData = useSelector(getUserAuthData)
    const location = useLocation();

    const sendMessage = () => {
        socket.emit("/chat/send/public", {
            message: value,
            user: userData?.username,
            timestamp: new Date(),
        });
    }

    useEffect(() => {
        socket.on("/topic/public", (chatData: {id: string; message: string; user: string; timestamp: Date }[]) => setMessages(chatData));
    }, [socket]);

    return (
        <div>
            <div className="form">
                <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                <button onClick={sendMessage}>Отправить</button>
            </div>
            <div className="messages">
                {messages.map(mess =>
                    <div key={mess.id}>
                        <div className="message">
                            {mess.user}. {mess.message}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatDetailPage;
