import React, { ErrorInfo, ReactNode, Suspense } from "react";
import { PageError } from "../../../../widgets/PageError/PageError";
import {PageLoader} from "../../../../widgets/PageLoader/PageLoader";

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(error, errorInfo)
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return (
                <Suspense fallback={<PageLoader />}>
                    <PageError />
                </Suspense>
            )
        }

        return children;
    }
}

export default ErrorBoundary;
