function ErrorMessage({ title = "Something went wrong", message = "We couldn't load this content. Please try again." }) {
  return (
    <section className="state-message state-message--error" role="alert">
      <span className="state-message__icon" aria-hidden="true">!</span>
      <h3>{title}</h3>
      <p>{message}</p>
    </section>
  );
}

export default ErrorMessage;
