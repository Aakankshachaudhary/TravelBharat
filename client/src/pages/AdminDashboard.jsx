import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { auth } from "../services/auth";

const emptyForm = { slug: "", name: "", stateSlug: "rajasthan", city: "", location: "", category: "Heritage", image: "/assets/destinations/amber-fort.svg", imageAlt: "", description: "", historicalSignificance: "", bestTime: "", entryFee: "", timings: "", nearbyAttractions: "", relatedDestinationSlugs: "" };
const toPayload = (form) => ({ ...form, nearbyAttractions: form.nearbyAttractions.split(",").map((v) => v.trim()).filter(Boolean), relatedDestinationSlugs: form.relatedDestinationSlugs.split(",").map((v) => v.trim()).filter(Boolean) });

function AdminDashboard() {
  const navigate = useNavigate();
  const user = auth.getUser();
  const [destinations, setDestinations] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setDestinations(await api.getDestinations());
    } catch (e) {
      if (e.status === 401) { auth.clear(); navigate("/admin/login", { replace: true }); }
      else setMessage(e.message);
    } finally { setLoading(false); }
  }, [navigate]);
  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => destinations.filter((d) => `${d.name} ${d.city} ${d.category}`.toLowerCase().includes(query.toLowerCase())), [destinations, query]);
  const stats = { total: destinations.length, heritage: destinations.filter((d) => d.category === "Heritage").length, nature: destinations.filter((d) => d.category === "Nature").length };

  const edit = (d) => { setEditing(d.slug); setForm({ ...d, nearbyAttractions: (d.nearbyAttractions || []).join(", "), relatedDestinationSlugs: (d.relatedDestinationSlugs || []).join(", ") }); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const reset = () => { setEditing(null); setForm(emptyForm); };
  const save = async (e) => { e.preventDefault(); setSaving(true); setMessage(""); try { if (editing) await api.updateDestination(editing, toPayload(form)); else await api.createDestination(toPayload(form)); setMessage(editing ? "Destination updated successfully." : "Destination created successfully."); reset(); await load(); } catch (err) { setMessage(err.message); } finally { setSaving(false); } };
  const remove = async (slug) => { if (!window.confirm("Delete this destination? This cannot be undone.")) return; try { await api.deleteDestination(slug); setMessage("Destination deleted."); await load(); } catch (err) { setMessage(err.message); } };
  const logout = () => { auth.clear(); navigate("/admin/login", { replace: true }); };

  return <main className="admin-page">
    <div className="admin-header"><div><span className="section-kicker">Content operations</span><h1>Admin Dashboard</h1><p>Welcome, {user?.name || "Admin"}. Manage TravelBharat's destination catalogue.</p></div><div className="admin-actions"><button className="button button--ghost" onClick={() => navigate("/")}>View site</button><button className="button button--secondary" onClick={logout}>Sign out</button></div></div>
    <section className="admin-stats"><article><strong>{stats.total}</strong><span>Total destinations</span></article><article><strong>{stats.heritage}</strong><span>Heritage</span></article><article><strong>{stats.nature}</strong><span>Nature</span></article></section>
    <section className="admin-grid">
      <form className="admin-panel admin-form" onSubmit={save}><div className="panel-heading"><div><span className="section-kicker">Content editor</span><h2>{editing ? "Edit destination" : "Add destination"}</h2></div>{editing && <button type="button" className="text-button" onClick={reset}>Cancel</button>}</div>
        <div className="form-grid">{[["name","Name"],["slug","Slug"],["stateSlug","State slug"],["city","City"],["location","Location"],["category","Category"],["image","Image path"],["imageAlt","Image alt text"],["bestTime","Best time"],["entryFee","Entry fee"],["timings","Timings"],["nearbyAttractions","Nearby attractions (comma separated)"],["relatedDestinationSlugs","Related destination slugs (comma separated)"]].map(([key,label]) => <label key={key}>{label}<input required={!['city','nearbyAttractions','relatedDestinationSlugs'].includes(key)} value={form[key] ?? ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} /></label>)}</div>
        <label>Description<textarea required rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label><label>Historical significance<textarea required rows="4" value={form.historicalSignificance} onChange={(e) => setForm({ ...form, historicalSignificance: e.target.value })} /></label>
        {message && <div className="form-notice">{message}</div>}<button className="button button--primary" disabled={saving}>{saving ? "Saving…" : editing ? "Update destination" : "Create destination"}</button>
      </form>
      <section className="admin-panel"><div className="panel-heading"><div><span className="section-kicker">Catalogue</span><h2>Destinations</h2></div><input className="admin-search" placeholder="Search catalogue…" value={query} onChange={(e) => setQuery(e.target.value)} /></div>{loading ? <p>Loading catalogue…</p> : <div className="admin-table-wrap"><table><thead><tr><th>Destination</th><th>State</th><th>Category</th><th>Actions</th></tr></thead><tbody>{filtered.map((d) => <tr key={d.slug}><td><strong>{d.name}</strong><small>{d.city || d.location}</small></td><td>{d.stateSlug}</td><td>{d.category}</td><td><button className="text-button" onClick={() => edit(d)}>Edit</button><button className="text-button danger" onClick={() => remove(d.slug)}>Delete</button></td></tr>)}</tbody></table></div>}</section>
    </section>
  </main>;
}
export default AdminDashboard;
