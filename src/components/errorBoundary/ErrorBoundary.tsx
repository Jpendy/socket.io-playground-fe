import { Component } from "react";

interface ErrorBoundaryProps { children: any }

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ height: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                    <img width='200px' src={'assets/dizzy-dog.gif'} alt='dizzy dog gif' />
                    <h1>Oops! Something went wrong.</h1>
                </div>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;