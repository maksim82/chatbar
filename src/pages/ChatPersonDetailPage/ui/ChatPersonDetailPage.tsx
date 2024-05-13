import {useLocation} from "react-router-dom";
import {ReactNode, useEffect, useRef, useState} from "react";
import {ChatProps} from "../../ChatPage/ui/ChatPage";
import socket from "@/shared/const/websocket";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import axios from "axios";

interface ChatPersonDetailProps {
    chatId: number,
    title: string,
    message: string,
    consumerUserId: string,
    producerUserId: string,
    senderIsProducerInChat?: boolean
}

const ChatPersonDetailPage = () => {
    const [value, setValue] = useState("");
    const [room, setRoom] = useState<ChatPersonDetailProps | null>(null);
    const userData = useSelector(getUserAuthData)
    const location = useLocation();

    const sendMessage = () => {
        if (!room?.chatId) return;

        socket.emit("/chat/send/personal", {
            message: value,
            user: userData?.id,
            timestamp: new Date(),
            chatId: room.chatId
        });
    }

    useEffect(() => {
        showPersonChats();

        socket.on("/chat/send/personal", data => {
            console.log(data);
            setRoom(data)
        })
    }, [socket]);

    const showPersonChats = async () => {
        const response = await axios.get('http://localhost:7000/chat/personal/history', { params: { id: location.state.id } });

        if (!response.data) {
            throw new Error();
        }

        setRoom(response.data);
    }

    if (!room) return;

    return (
        <div>
            <div className="form">
                <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                <button onClick={sendMessage}>Отправить</button>
            </div>
            <div className="messages">
                {/*{room.messages?.map(mess =>*/}
                {/*    <div key={mess}>*/}
                {/*        {mess}*/}
                {/*    </div>*/}
                {/*)}*/}
                {
                    room.message
                }
            </div>
        </div>
    )
}

export default ChatPersonDetailPage;
