import React, { ReactNode } from "react";
import ErrorPage from "./ErrorPage";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; 
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage:string|null
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false,  errorMessage:null };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
 
    return { hasError: true,errorMessage:_.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
   
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
    
      return (
        <ErrorPage message={this.state.errorMessage}/>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
