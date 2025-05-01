import React, { Component, ErrorInfo, ReactNode } from "react";
import { logger } from "../../utils/logger";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error using your custom logger
    logger.error("❌ Uncaught runtime error:", error);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <pre>
            {this.state.error ? this.state.error.toString() : "Unknown Error"}
          </pre>
          <p>Check the console for more details.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 