import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import './shared/config/i18n/i18n';
import {ErrorBoundary} from "@/app/providers/ErrorBoundary";
import {ThemeProvider} from "@/app/providers/ThemeProvider";
import "./app/styles/index.scss";
import { StoreProvider } from "@/app/providers/StoreProvider/ui/StoreProvider";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider>
                    <GoogleOAuthProvider clientId="86184040834-349rkvd45u6fl2nadmssoi62vktl2lag.apps.googleusercontent.com">
                        <App />
                    </GoogleOAuthProvider>;
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
)
