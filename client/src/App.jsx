import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import States from "./pages/States";
import StateDetails from "./pages/StateDetails";
import DestinationDetails from "./pages/DestinationDetails";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SearchResults from "./pages/SearchResults";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedAdminRoute from "./pages/ProtectedAdminRoute";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/states" element={<States />} />
          <Route path="/states/:stateSlug" element={<StateDetails />} />
          <Route path="/destinations/:destinationSlug" element={<DestinationDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedAdminRoute />}><Route path="/admin" element={<AdminDashboard />} /></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;

