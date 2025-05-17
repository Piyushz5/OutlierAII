import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Quantum Quote Nexus crashed:", error, errorInfo);
    this.setState({ errorInfo });
    
    // Show error on page
    const root = document.getElementById('root');
    if (root) {
      const errorMsg = document.createElement('div');
      errorMsg.style.position = 'fixed';
      errorMsg.style.top = '0';
      errorMsg.style.left = '0';
      errorMsg.style.width = '100%';
      errorMsg.style.padding = '20px';
      errorMsg.style.background = 'rgba(0,0,0,0.8)';
      errorMsg.style.color = '#ff0000';
      errorMsg.style.fontFamily = 'monospace';
      errorMsg.style.zIndex = '9999';
      errorMsg.innerHTML = `<h3>Error: ${error.toString()}</h3><pre>${errorInfo?.componentStack || 'No stack trace'}</pre>`;
      root.appendChild(errorMsg);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          textAlign: 'center',
          color: '#ff00ea',
          background: 'linear-gradient(to bottom right, #000000, #0a0a23, #00f0ff)'
        }}>
          <h1 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '20px' }}>Quantum Anomaly Detected</h1>
          <div style={{ 
            background: 'rgba(0,0,0,0.7)',
            padding: '20px',
            borderRadius: '10px',
            border: '2px solid #ff00ea',
            maxWidth: '800px',
            boxShadow: '0 0 20px #ff00ea'
          }}>
            <p>A quantum fluctuation has disrupted the quote matrix.</p>
            <details style={{ marginTop: '20px', textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>Technical Details</summary>
              <pre style={{ 
                background: 'rgba(0,0,0,0.5)', 
                padding: '10px', 
                overflow: 'auto',
                color: '#00f0ff',
                fontFamily: 'monospace',
                fontSize: '12px',
                maxHeight: '300px'
              }}>
                {this.state.error?.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
} catch (error) {
  console.error("Fatal render error:", error);
  // Display a visual error to the user
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif; background: linear-gradient(to bottom right, #000000, #0a0a23, #00f0ff); color: #ff00ea; text-align: center; padding: 20px;">
        <h1 style="font-family: 'Orbitron', sans-serif; margin-bottom: 20px;">Critical Quantum Error</h1>
        <div style="background: rgba(0,0,0,0.7); padding: 20px; border-radius: 10px; border: 2px solid #ff00ea; max-width: 800px;">
          <p>Failed to initialize the Quantum Quote Matrix.</p>
          <p>Error: ${error.message}</p>
        </div>
      </div>
    `;
  }
} 