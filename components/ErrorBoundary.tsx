import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary component that catches JavaScript errors anywhere in the child
 * component tree, logs those errors, and displays a fallback UI.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {hasError: true, error};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({errorInfo});

    // Log error to console in development
    if (__DEV__) {
      console.error('ErrorBoundary caught an error:', error);
      console.error('Component stack:', errorInfo.componentStack);
    }

    // TODO: Send error to error reporting service (e.g., Sentry, Crashlytics)
  }

  handleRetry = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    const {hasError, error} = this.state;
    const {children, fallback} = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <View style={styles.container}>
          <Surface style={styles.surface} elevation={2}>
            <Text variant="headlineMedium" style={styles.title}>
              Something went wrong
            </Text>
            <Text variant="bodyMedium" style={styles.message}>
              {
                "We're sorry, but something unexpected happened. Please try again."
              }
            </Text>
            {__DEV__ && error && (
              <ScrollView style={styles.errorContainer}>
                <Text variant="labelSmall" style={styles.errorText}>
                  {error.toString()}
                </Text>
              </ScrollView>
            )}
            <Button
              mode="contained"
              onPress={this.handleRetry}
              style={styles.button}>
              Try Again
            </Button>
          </Surface>
        </View>
      );
    }

    return children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  surface: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'InterBold',
  },
  message: {
    marginBottom: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  errorContainer: {
    maxHeight: 150,
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 8,
    width: '100%',
  },
  errorText: {
    fontFamily: 'monospace',
    color: '#c00',
  },
  button: {
    marginTop: 8,
  },
});

export default ErrorBoundary;
