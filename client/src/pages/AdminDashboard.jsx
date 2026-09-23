import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { auth } from "../services/auth";
import PageMeta from "../components/ui/PageMeta";
import ErrorMessage from "../components/ui/ErrorMessage";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const emptyForm = {
  slug: "",
  name: "",
  stateSlug: "rajasthan",
  city: "",
  location: "",
  category: "Heritage",
  image: "/assets/destinations/amber-fort.svg",
  imageAlt: "",
  description: "",
  historicalSignificance: "",
  bestTime: "",
  entryFee: "",
  timings: "",
  nearbyAttractions: "",
  relatedDestinationSlugs: "",
};

const toPayload = (form) => ({
  ...form,
  nearbyAttractions: form.nearbyAttractions.split(",").map((value) => value.trim()).filter(Boolean),
  relatedDestinationSlugs: form.relatedDestinationSlugs.split(",").map((value) => value.trim()).filter(Boolean),
});

function AdminDashboard() {
  const navigate = useNavigate();
  const user = auth.getUser();
  const [destinations, setDestinations] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError("");
      setDestinations(await api.getDestinations());
    } catch (error) {
      if (error.status === 401) {
        auth.clear();
        navigate("/admin/login", { replace: true });
        return;
      }
      setLoadError(error.message);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(
    () =>
      destinations.filter((destination) =>
        `${destination.name} ${destination.city || ""} ${destination.category}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [destinations, query],
  );

  const stats = useMemo(
    () => ({
      total: destinations.length,
      heritage: destinations.filter((destination) => destination.category === "Heritage").length,
      nature: destinations.filter((destination) => destination.category === "Nature").length,
    }),
    [destinations],
  );

  const edit = (destination) => {
    setMessage("");
    setEditing(destination.slug);
    setForm({
      ...destination,
      nearbyAttractions: (destination.nearbyAttractions || []).join(", "),
      relatedDestinationSlugs: (destination.relatedDestinationSlugs || []).join(", "),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      if (editing) {
        await api.updateDestination(editing, toPayload(form));
      } else {
        await api.createDestination(toPayload(form));
      }
      setMessage(editing ? "Destination updated successfully." : "Destination created successfully.");
      reset();
      await load();
    } catch (error) {
      if (error.status === 401) {
        auth.clear();
        navigate("/admin/login", { replace: true });
      } else {
        setMessage(error.message);
      }
    } finally {
      setSaving(false);
    }
  };

  const remove = async (slug) => {
    if (!window.confirm("Delete this destination? This cannot be undone.")) return;
    setMessage("");
    try {
      await api.deleteDestination(slug);
      setMessage("Destination deleted.");
      await load();
    } catch (error) {
      if (error.status === 401) {
        auth.clear();
        navigate("/admin/login", { replace: true });
      } else {
        setMessage(error.message);
      }
    }
  };

  const logout = () => {
    auth.clear();
    navigate("/admin/login", { replace: true });
  };

  return (
    <section className="admin-page">
      <PageMeta title="Admin Dashboard" description="TravelBharat destination content management workspace." />
      <div className="admin-header">
        <div>
          <span className="section-kicker">Content operations</span>
          <h1>Admin Dashboard</h1>
          <p>Welcome, {user?.name || "Admin"}. Manage TravelBharat's destination catalogue.</p>
        </div>
        <div className="admin-actions">
          <button className="button button--ghost" type="button" onClick={() => navigate("/")}>View site</button>
          <button className="button button--secondary" type="button" onClick={logout}>Sign out</button>
        </div>
      </div>

      <section className="admin-stats" aria-label="Catalogue statistics">
        <article><strong>{stats.total}</strong><span>Total destinations</span></article>
        <article><strong>{stats.heritage}</strong><span>Heritage</span></article>
        <article><strong>{stats.nature}</strong><span>Nature</span></article>
      </section>

      {loadError && (
        <ErrorMessage
          title="Could not load catalogue"
          message={loadError}
          onRetry={load}
        />
      )}

      <section className="admin-grid">
        <form className="admin-panel admin-form" onSubmit={save} aria-busy={saving}>
          <div className="panel-heading">
            <div>
              <span className="section-kicker">Content editor</span>
              <h2>{editing ? "Edit destination" : "Add destination"}</h2>
            </div>
            {editing && (
              <button type="button" className="text-button" onClick={reset}>Cancel</button>
            )}
          </div>

          <div className="form-grid">
            {[
              ["name", "Name"], ["slug", "Slug"], ["stateSlug", "State slug"],
              ["city", "City"], ["location", "Location"], ["category", "Category"],
              ["image", "Image path"], ["imageAlt", "Image alt text"], ["bestTime", "Best time"],
              ["entryFee", "Entry fee"], ["timings", "Timings"],
              ["nearbyAttractions", "Nearby attractions (comma separated)"],
              ["relatedDestinationSlugs", "Related destination slugs (comma separated)"],
            ].map(([key, label]) => (
              <label key={key}>
                {label}
                <input
                  required={!['city', 'nearbyAttractions', 'relatedDestinationSlugs'].includes(key)}
                  value={form[key] ?? ""}
                  onChange={(event) => setForm({ ...form, [key]: event.target.value })}
                />
              </label>
            ))}
          </div>

          <label>
            Description
            <textarea required rows="4" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
          </label>
          <label>
            Historical significance
            <textarea required rows="4" value={form.historicalSignificance} onChange={(event) => setForm({ ...form, historicalSignificance: event.target.value })} />
          </label>

          {message && <div className="form-notice" role="status">{message}</div>}
          <button className="button button--primary" disabled={saving} aria-busy={saving}>
            {saving ? "Saving…" : editing ? "Update destination" : "Create destination"}
          </button>
        </form>

        <section className="admin-panel" aria-labelledby="catalogue-heading">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">Catalogue</span>
              <h2 id="catalogue-heading">Destinations</h2>
            </div>
            <label className="sr-only" htmlFor="admin-catalogue-search">Search catalogue</label>
            <input
              id="admin-catalogue-search"
              className="admin-search"
              placeholder="Search catalogue…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          {loading ? (
            <LoadingSpinner label="Loading catalogue" />
          ) : filtered.length ? (
            <div className="admin-table-wrap">
              <table>
                <thead>
                  <tr><th>Destination</th><th>State</th><th>Category</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filtered.map((destination) => (
                    <tr key={destination.slug}>
                      <td><strong>{destination.name}</strong><small>{destination.city || destination.location}</small></td>
                      <td>{destination.stateSlug}</td>
                      <td>{destination.category}</td>
                      <td>
                        <button className="text-button" type="button" onClick={() => edit(destination)}>Edit</button>
                        <button className="text-button danger" type="button" onClick={() => remove(destination.slug)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="admin-empty">No destinations match “{query}”.</p>
          )}
        </section>
      </section>
    </section>
  );
}

export default AdminDashboard;