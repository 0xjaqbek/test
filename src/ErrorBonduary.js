import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          backgroundColor: 'black',
          color: '#0EDBFF',
          textAlign: 'center',
          padding: '20px'
        }}>
          <h1>Something went wrong.</h1>
          <p>We're working on fixing the issue. Please try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#0EDBFF',
              color: 'black',
              border: 'none',
              padding: '10px 20px',
              margin: '20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;