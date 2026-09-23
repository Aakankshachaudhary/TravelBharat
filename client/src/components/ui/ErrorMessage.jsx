function ErrorMessage({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
}) {
  return (
    <section className="state-message state-message--error" role="alert">
      <span className="state-message__icon" aria-hidden="true">!</span>
      <h3>{title}</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="button button--secondary state-message__action" type="button" onClick={onRetry}>
          Try again
        </button>
      )}
    </section>
  );
}

export default ErrorMessage;