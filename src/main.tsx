import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import './shared/config/i18n/i18n';
import {ErrorBoundary} from "@/app/providers/ErrorBoundary";
import {ThemeProvider} from "@/app/providers/ThemeProvider";
import "./app/styles/index.scss";
import { StoreProvider } from "@/app/providers/StoreProvider/ui/StoreProvider";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StoreProvider>
        <ErrorBoundary>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </ErrorBoundary>
    </StoreProvider>,
)
