import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { 
  Calendar, MapPin, Clock, Users, ArrowLeft, 
  Trophy, User, CheckCircle, XCircle 
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const levelColors = {
  principiante: "bg-green-100 text-green-800",
  medio: "bg-orange-100 text-orange-800",
  avanzado: "bg-pink-100 text-pink-800"
};

const levelLabels = {
  principiante: "Principiante",
  medio: "Intermedio",
  avanzado: "Avanzado"
};

const typeLabels = {
  torneo: "Torneo",
  casual: "Casual",
  entrenamiento: "Entrenamiento",
  club: "Club"
};

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`${API}/events/${id}`, {
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        setEvent(data);
      } else {
        navigate("/events");
      }
    } catch (error) {
      console.error("Error fetching event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    setJoining(true);
    try {
      const response = await fetch(`${API}/events/${id}/join`, {
        method: "POST",
        credentials: "include"
      });
      
      if (response.ok) {
        toast.success("¡Te has unido al evento!");
        fetchEvent();
      } else {
        const data = await response.json();
        toast.error(data.detail || "Error al unirse");
      }
    } catch (error) {
      toast.error("Error de conexión");
    } finally {
      setJoining(false);
    }
  };

  const handleLeave = async () => {
    setJoining(true);
    try {
      const response = await fetch(`${API}/events/${id}/leave`, {
        method: "DELETE",
        credentials: "include"
      });
      
      if (response.ok) {
        toast.success("Has abandonado el evento");
        fetchEvent();
      } else {
        const data = await response.json();
        toast.error(data.detail || "Error al abandonar");
      }
    } catch (error) {
      toast.error("Error de conexión");
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-beige-100">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-64 w-full rounded-2xl mb-6" />
          <Skeleton className="h-10 w-2/3 mb-4" />
          <Skeleton className="h-6 w-1/3 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </main>
      </div>
    );
  }

  if (!event) return null;

  const date = new Date(event.date);
  const formattedDate = date.toLocaleDateString("es-ES", { 
    weekday: "long", 
    day: "numeric", 
    month: "long" 
  });
  const seatsLeft = event.max_seats - event.seats_taken;
  const isFull = seatsLeft <= 0;
  const isOrganizer = user?.user_id === event.organizer_id;

  return (
    <div className="min-h-screen bg-beige-100">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/events")}
          className="mb-6 text-muted-foreground hover:text-foreground"
          data-testid="back-button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a eventos
        </Button>

        {/* Hero Image */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <img 
            src={event.image_url} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-white/90 text-foreground">
                {typeLabels[event.event_type]}
              </Badge>
              <Badge className={`${levelColors[event.skill_level]} border-0`}>
                {levelLabels[event.skill_level]}
              </Badge>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white">
              {event.title}
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50">
              <h2 className="font-heading text-xl font-semibold mb-4">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Organizer */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50">
              <h2 className="font-heading text-xl font-semibold mb-4">Organizador</h2>
              <Link 
                to={event.organizer_type === "club" ? `/clubs/${event.organizer_id}` : `/profile/${event.organizer_id}`}
                className="flex items-center gap-4 group"
              >
                <Avatar className="h-14 w-14 border-2 border-mahogany-200">
                  <AvatarFallback className="bg-mahogany-100 text-mahogany-800 text-lg">
                    {event.organizer_name?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground group-hover:text-mahogany-800 transition-colors">
                    {event.organizer_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {event.organizer_type === "club" ? "Club de ajedrez" : "Organizador"}
                  </p>
                </div>
              </Link>
            </div>

            {/* Attendees */}
            {event.attendees && event.attendees.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50">
                <h2 className="font-heading text-xl font-semibold mb-4">
                  Participantes ({event.attendees.length})
                </h2>
                <div className="flex flex-wrap gap-2">
                  {event.attendees.map((att) => (
                    <div 
                      key={att.attendance_id}
                      className="flex items-center gap-2 bg-beige-50 rounded-full px-3 py-1.5"
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{att.user_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Details Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-mahogany-500 mt-0.5" />
                <div>
                  <p className="font-medium capitalize">{formattedDate}</p>
                  <p className="text-sm text-muted-foreground">{event.time}h</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-mahogany-500 mt-0.5" />
                <div>
                  <p className="font-medium">{event.city}</p>
                  <p className="text-sm text-muted-foreground">{event.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-mahogany-500 mt-0.5" />
                <div>
                  <p className="font-medium">
                    {event.seats_taken} / {event.max_seats} plazas
                  </p>
                  <p className={`text-sm ${isFull ? "text-destructive" : "text-muted-foreground"}`}>
                    {isFull ? "Evento completo" : `${seatsLeft} plazas disponibles`}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            {!isOrganizer && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50">
                {event.user_joined ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Ya estás inscrito</span>
                    </div>
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={handleLeave}
                      disabled={joining}
                      data-testid="leave-event-btn"
                    >
                      {joining ? "Procesando..." : "Abandonar evento"}
                    </Button>
                  </div>
                ) : (
                  <Button 
                    className="w-full bg-mahogany-500 hover:bg-mahogany-600 text-white rounded-full py-6"
                    onClick={handleJoin}
                    disabled={isFull || joining}
                    data-testid="join-event-btn"
                  >
                    {joining ? "Procesando..." : isFull ? "Evento completo" : "Unirme al evento"}
                  </Button>
                )}
              </div>
            )}

            {isOrganizer && (
              <div className="bg-mahogany-50 rounded-2xl p-6 border border-mahogany-200">
                <div className="flex items-center gap-2 text-mahogany-800">
                  <Trophy className="w-5 h-5" />
                  <span className="font-medium">Eres el organizador</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile nav spacer */}
      <div className="mobile-nav-spacer" />
    </div>
  );
}
