import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Clock } from "lucide-react";

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

const typeColors = {
  torneo: "bg-purple-100 text-purple-800",
  casual: "bg-blue-100 text-blue-800",
  entrenamiento: "bg-teal-100 text-teal-800",
  club: "bg-red-100 text-red-800"
};

const typeLabels = {
  torneo: "Torneo",
  casual: "Casual",
  entrenamiento: "Entrenamiento",
  club: "Club"
};

export function EventCard({ event, index = 0 }) {
  const date = new Date(event.date);
  const day = date.getDate();
  const month = date.toLocaleDateString("es-ES", { month: "short" }).toUpperCase();
  const seatsLeft = event.max_seats - event.seats_taken;
  const isFull = seatsLeft <= 0;

  return (
    <Link 
      to={`/events/${event.event_id}`}
      className={`group block opacity-0 animate-fade-in stagger-${(index % 4) + 1}`}
      data-testid={`event-card-${event.event_id}`}
    >
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-border/50 overflow-hidden card-hover">
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          <img 
            src={event.image_url || "https://images.unsplash.com/photo-1743686749360-712a3bfb19f0?w=800"} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 hero-overlay" />
          
          {/* Date Box */}
          <div className="absolute top-3 left-3 date-box text-white rounded-xl px-3 py-2 text-center min-w-[52px]">
            <div className="text-xl font-bold leading-none">{day}</div>
            <div className="text-xs font-medium mt-0.5">{month}</div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 right-3 flex gap-1.5">
            <Badge className={`${typeColors[event.event_type]} border-0 font-medium`}>
              {typeLabels[event.event_type]}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-foreground line-clamp-1 group-hover:text-mahogany-800 transition-colors">
            {event.title}
          </h3>
          
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{event.city}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>{event.time}h</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
            <Badge variant="outline" className={`${levelColors[event.skill_level]} border-0`}>
              {levelLabels[event.skill_level]}
            </Badge>
            
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className={`text-sm font-medium ${isFull ? "text-destructive" : "text-muted-foreground"}`}>
                {isFull ? "Completo" : `${seatsLeft} plazas`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
