import {lazy} from "react";

export const ChatPersonDetailPageAsync = lazy(() => new Promise(resolve => {
    //@ts-ignore
    setTimeout(() => resolve(import('./ChatPersonDetailPage')), 1500)
}))
