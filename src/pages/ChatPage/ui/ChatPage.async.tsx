import {lazy} from "react";

export const ChatPageAsync = lazy(() => new Promise(resolve => {
    //@ts-ignore
    setTimeout(() => resolve(import('./ChatPage')), 1500)
}))
