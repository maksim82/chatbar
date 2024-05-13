import {lazy} from "react";

export const ChatDetailPageAsync = lazy(() => new Promise(resolve => {
    //@ts-ignore
    setTimeout(() => resolve(import('./ChatDetailPage')), 1500)
}))
