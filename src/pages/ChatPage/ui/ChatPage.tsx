import {useState, useRef, useEffect, Suspense, ChangeEvent, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "@/shared/ui/Button/Button";
import socket from "@/shared/const/websocket";
import {Modal} from "@/shared/ui/Modal/Modal";
import {classNames} from "@/shared/lib/classNames/classNames";
import {Loader} from "@/shared/ui/Loader/Loader";
import axios from "axios";
import {User} from "@/entities/User/model/types/user";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";

export type ChatEventType = "connection" | "message"

export interface ChatProps {
    id: number
    username: string
    message: string
    event: ChatEventType
}

// const ChatPage = () => {
//     const [messages, setMessages] = useState<ChatProps[]>([]);
//     const [value, setValue] = useState('');
//     const socket = useRef<WebSocket | null>()
//     const [connected, setConnected] = useState(false);
//     const [username, setUsername] = useState('')
//
//     function connect() {
//         socket.current = new WebSocket('ws://localhost:5000')
//
//         socket.current.onopen = () => {
//             setConnected(true)
//             const message = {
//                 event: 'connection',
//                 username,
//                 id: Date.now()
//             }
//             socket.current?.send(JSON.stringify(message))
//         }
//         socket.current.onmessage = (event) => {
//             const message = JSON.parse(event.data)
//             setMessages(prev => [message, ...prev])
//         }
//         socket.current.onclose= () => {
//             console.log('Socket закрыт')
//         }
//         socket.current.onerror = () => {
//             console.log('Socket произошла ошибка')
//         }
//     }
//
//     const sendMessage = async () => {
//         const message = {
//             username,
//             message: value,
//             id: Date.now(),
//             event: 'message'
//         }
//         socket.current?.send(JSON.stringify(message));
//         setValue('')
//     }
//
//
//     if (!connected) {
//         return (
//             <div className="center">
//                 <div className="form">
//                     <input
//                         value={username}
//                         onChange={e => setUsername(e.target.value)}
//                         type="text"
//                         placeholder="Введите ваше имя"/>
//                     <button onClick={connect}>Войти</button>
//                 </div>
//             </div>
//         )
//     }
//
//
//     return (
//         <div className="center">
//             <div>
//                 <div className="form">
//                     <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
//                     <button onClick={sendMessage}>Отправить</button>
//                 </div>
//                 <div className="messages">
//                     {messages.map(mess =>
//                         <div key={mess.id}>
//                             {mess.event === 'connection'
//                                 ? <div className="connection_message">
//                                     Пользователь {mess.username} подключился
//                                 </div>
//                                 : <div className="message">
//                                     {mess.username}. {mess.message}
//                                 </div>
//                             }
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default ChatPage;

interface ChatModalProps {
    className: string
    isOpen: boolean
    onClose: () => void
}

const ChatModal = (props: ChatModalProps) => {
    const {
        className,
        isOpen,
        onClose,
    } = props;
    const [groupName, setGroupName] = useState("");
    const [listUsers, setListUsers] = useState<{ id: number; username: string; password: string }[]>([]);
    const [consumerId, setConsumerId] = useState<number>();
    const userData = useSelector(getUserAuthData)

    const onChangeGroupName = (event: ChangeEvent<HTMLInputElement>) => {
        setGroupName(event.target.value)
    }

    const onCreateRoom = () => {
        if (!consumerId || !groupName || !userData?.id) return;

        socket.emit("/user/queue/personal", {
            title: groupName,
            consumerUserId: consumerId,
            userId: userData?.id
        });
    }

    useEffect(() => {
        showUsers();
    }, []);

    const showUsers = async () => {
        const response = await axios.get('http://localhost:7000/users');

        if (!response.data) {
            throw new Error();
        }

        setListUsers(response.data);
    }

    return (
        <Modal
            className={classNames('', {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <Suspense fallback={<Loader />}>
                <div>
                    <input value={groupName} onChange={onChangeGroupName} placeholder={"Введите название чата"} />
                    <select onChange={e => setConsumerId(Number(e.target.value))}>
                        {
                            listUsers.map(item => (
                                <option value={item.id}>{ item.username }</option>
                            ))
                        }
                    </select>
                    <Button onClick={onCreateRoom}>Создать</Button>
                </div>
            </Suspense>
        </Modal>
    )
}

interface ChatDetailProps {
    id?: string
    text?: string
    name?: string
}

const ChatDetail = (props: ChatDetailProps) => {
    const {
        id,
        text,
        name
    } = props;
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate("/chat/general", { state: { id, text, name } })}>
            <div>{ name }</div>
            <div>{ text ?? "Начните общение первым" }</div>
        </div>
    )
}

const ChatPersonDetail = (props: ChatDetailProps) => {
    const {
        id,
        text,
        name
    } = props;
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/chat/person/${id}`, { state: { id } })}>
            <div>{ name }</div>
            <div>{ text ?? "Начните общение первым" }</div>
        </div>
    )
}

interface RoomsProps {
    chatId: string
    title: string
    messages: string[]
    producerUserId: number
    consumerUserId: number
}

const ChatPage = () => {
    const [isChatModal, setIsChatModal] = useState(false);
    const [preview, setPreview] = useState<{ id: string; message: string; user: string; time: "string" } | null>(null);
    const [rooms, setRooms] = useState<RoomsProps[]>([]);
    const authData = useSelector(getUserAuthData);

    useEffect(() => {
        socket.on("/user/queue/personal", (rooms: any) => {
            setRooms(rooms);
        });
        socket.emit("/topic/public");
        socket.on("/topic/public", (data: { id: string; message: string; user: string; time: "string" }[]) => {
            const newData = data.length ? data[data.length - 1] : data[0];
            setPreview(newData)
        });

        showPersonChats();
    }, [socket]);

    const showPersonChats = async () => {
        const response = await axios.get('http://localhost:7000/chat/personal/list', { params: { id: authData?.id, username: authData?.username } });
        console.log(response.data)
        if (!response.data) {
            throw new Error();
        }

        setRooms(response.data);
    }

    const onCloseModal = () => {
        setIsChatModal(false);
    };

    const onOpenModal = () => {
        setIsChatModal(true);
    }

    return (
        <div>
            <Button onClick={onOpenModal}>Новый чат</Button>
            {
                isChatModal && (
                    <ChatModal
                        className={""}
                        isOpen={isChatModal}
                        onClose={onCloseModal}
                    />
                )
            }
            <ChatDetail id={preview?.id} text={preview?.message} name={preview?.user} />
            {
                rooms.map(room => {
                    const lastMessage = room.messages.length ? room.messages[room.messages.length - 1] : room.messages[0];

                    return (
                        <ChatPersonDetail id={room.chatId} name={room.title} text={lastMessage} />
                    )
                })
            }
        </div>
    )
}

export default ChatPage;
