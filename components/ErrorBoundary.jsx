'use client'
import { Component } from 'react'
import { FiRefreshCw, FiHome } from 'react-icons/fi'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
          <div className="text-center max-w-md">
            <h1 className="text-6xl font-space font-black text-heading mb-4">
              Oops!
            </h1>
            <h2 className="text-2xl font-space font-bold text-body mb-4">
              Something went wrong
            </h2>
            <p className="text-subtle mb-8">
              An unexpected error occurred. Please try refreshing the page or go back to the homepage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 bg-sidebar text-white px-6 py-3 rounded-xl font-inter font-semibold transition-all hover:bg-black shadow-lg focus:outline-none focus:ring-2 focus:ring-sidebar"
              >
                <FiRefreshCw size={20} />
                Refresh Page
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 border-2 border-sidebar text-sidebar px-6 py-3 rounded-xl font-inter font-semibold transition-all hover:bg-sidebar hover:text-white focus:outline-none focus:ring-2 focus:ring-sidebar"
              >
                <FiHome size={20} />
                Go Home
              </a>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm font-bold text-subtle mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="bg-white/50 p-4 rounded-lg text-xs overflow-auto border border-border">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
