function EmptyState({ title = "Nothing to show yet", message = "Try another search or explore a different category." }) {
  return (
    <section className="state-message" aria-live="polite">
      <span className="state-message__icon" aria-hidden="true">◌</span>
      <h3>{title}</h3>
      <p>{message}</p>
    </section>
  );
}

export default EmptyState;
