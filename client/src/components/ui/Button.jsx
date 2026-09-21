function Button({ children, onClick, type = "button", variant = "primary", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button button--${variant} ${className}`.trim()}
    >
      {children}
    </button>
  );
}

export default Button;