import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("TravelBharat UI error", error, info);
  }

  handleRetry = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <section className="page-intro page-intro--center" role="alert">
        <div className="container narrow-content">
          <span className="section-kicker">Unexpected error</span>
          <h1>Something went wrong.</h1>
          <p>
            TravelBharat could not render this page correctly. Refresh the page
            or return to the homepage and continue exploring.
          </p>
          <div className="error-actions">
            <button className="button button--primary" type="button" onClick={this.handleRetry}>
              Refresh page
            </button>
            <Link className="button button--ghost" to="/">
              Go home
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default ErrorBoundary;
