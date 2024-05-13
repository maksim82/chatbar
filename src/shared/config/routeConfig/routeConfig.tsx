import {RouteProps} from "react-router-dom";
import {MainPage} from "../../../pages/MainPage";
import {ProfilePage} from "@/pages/ProfilePage";
import {ChatPage} from "@/pages/ChatPage";
import {NotFoundPage} from "@/pages/NotFoundPage";
import {ChatDetailPage} from "@/pages/ChatDetailPage";
import {ChatPersonDetailPage} from "@/pages/ChatPersonDetailPage";

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = "main",
    PROFILE = "profile",
    CHAT = "chat",
    CHAT_GENERAL = "chat_general",
    CHAT_PERSON = "chat_person",
    NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.PROFILE]: "/profile",
    [AppRoutes.CHAT]: "/chat",
    [AppRoutes.CHAT_GENERAL]: "/chat/general",
    [AppRoutes.CHAT_PERSON]: "/chat/person/*",
    [AppRoutes.NOT_FOUND]: "*",
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
        authOnly: true
    },
    [AppRoutes.CHAT]: {
        path: RoutePath.chat,
        element: <ChatPage />,
        authOnly: true
    },
    [AppRoutes.CHAT_GENERAL]: {
        path: RoutePath.chat_general,
        element: <ChatDetailPage />,
        authOnly: true
    },
    [AppRoutes.CHAT_PERSON]: {
        path: RoutePath.chat_person,
        element: <ChatPersonDetailPage />,
        authOnly: true
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />
    },
}
