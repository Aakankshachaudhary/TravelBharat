import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import LoadingSpinner from "./components/ui/LoadingSpinner";

const Home = lazy(() => import("./pages/Home"));
const States = lazy(() => import("./pages/States"));
const StateDetails = lazy(() => import("./pages/StateDetails"));
const DestinationDetails = lazy(() => import("./pages/DestinationDetails"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ProtectedAdminRoute = lazy(() => import("./pages/ProtectedAdminRoute"));

function RouteLoading() {
  return (
    <section className="page-intro" aria-label="Loading page">
      <div className="container">
        <LoadingSpinner label="Loading page" />
      </div>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <MainLayout>
          <Suspense fallback={<RouteLoading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/states" element={<States />} />
              <Route path="/states/:stateSlug" element={<StateDetails />} />
              <Route path="/destinations/:destinationSlug" element={<DestinationDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route element={<ProtectedAdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </MainLayout>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
