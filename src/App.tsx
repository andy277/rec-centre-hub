
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Centers from "@/pages/Centers";
import RecCenterDetail from "@/pages/RecCenterDetail";
import NotFound from "@/pages/NotFound";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Favorites from "@/pages/Favorites";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/centers" element={<Centers />} />
          <Route path="/centers/:centerId" element={<RecCenterDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster position="top-center" />
    </AuthProvider>
  );
}

export default App;
