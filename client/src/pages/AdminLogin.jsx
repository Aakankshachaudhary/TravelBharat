import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { auth } from "../services/auth";
import PageMeta from "../components/ui/PageMeta";

function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const session = await api.login(form);
      auth.setSession(session);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-auth-page">
      <PageMeta title="Admin Login" description="Secure TravelBharat content management login." />
      <div className="admin-auth-card">
        <span className="section-kicker">Secure workspace</span>
        <h1>TravelBharat Admin</h1>
        <p>Sign in to manage destination content and keep the public travel catalogue up to date.</p>
        <form onSubmit={submit} className="admin-form">
          <label>
            Email
            <input
              type="email"
              autoComplete="username"
              inputMode="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>
          {error && <div className="form-error" role="alert">{error}</div>}
          <button className="button button--primary" disabled={loading} aria-busy={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;
