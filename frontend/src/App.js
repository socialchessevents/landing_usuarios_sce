import { useEffect, useRef, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

// Pages
import Landing from "@/pages/Landing";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import CreateEvent from "@/pages/CreateEvent";
import MyEvents from "@/pages/MyEvents";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import ClubProfile from "@/pages/ClubProfile";
import Clubs from "@/pages/Clubs";

// Context
import { AuthProvider, useAuth } from "@/context/AuthContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

// REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
function AuthCallback() {
  const navigate = useNavigate();
  const hasProcessed = useRef(false);
  const { setUser } = useAuth();

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processAuth = async () => {
      const hash = window.location.hash;
      const sessionIdMatch = hash.match(/session_id=([^&]+)/);
      
      if (sessionIdMatch) {
        const sessionId = sessionIdMatch[1];
        try {
          const response = await fetch(`${API}/auth/session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ session_id: sessionId })
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            navigate("/events", { replace: true, state: { user: userData } });
          } else {
            navigate("/auth", { replace: true });
          }
        } catch (error) {
          console.error("Auth error:", error);
          navigate("/auth", { replace: true });
        }
      }
    };

    processAuth();
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-100">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-mahogany-800 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Iniciando sesión...</p>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading, checkAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.user) return;
    
    const verifyAuth = async () => {
      const isAuth = await checkAuth();
      if (!isAuth) {
        navigate("/auth", { replace: true });
      }
    };
    
    if (!user && !loading) {
      verifyAuth();
    }
  }, [user, loading, checkAuth, navigate, location.state]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige-100">
        <div className="animate-spin w-8 h-8 border-4 border-mahogany-800 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user && !location.state?.user) {
    return null;
  }

  return children;
}

function AppRouter() {
  const location = useLocation();
  
  // Check for session_id in URL fragment SYNCHRONOUSLY before any other routing
  if (location.hash?.includes('session_id=')) {
    return <AuthCallback />;
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventDetail />} />
      <Route path="/clubs" element={<Clubs />} />
      <Route path="/clubs/:id" element={<ClubProfile />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/create" element={
        <ProtectedRoute>
          <CreateEvent />
        </ProtectedRoute>
      } />
      <Route path="/me" element={
        <ProtectedRoute>
          <MyEvents />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
        <Toaster position="top-center" richColors />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
