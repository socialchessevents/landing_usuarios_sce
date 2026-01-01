import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Calendar, MapPin, Clock, Users, ArrowLeft, Loader2 } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    address: "",
    date: "",
    time: "",
    event_type: "",
    skill_level: "",
    max_seats: "",
    image_url: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.city || 
        !formData.address || !formData.date || !formData.time ||
        !formData.event_type || !formData.skill_level || !formData.max_seats) {
      toast.error("Por favor, completa todos los campos obligatorios");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          max_seats: parseInt(formData.max_seats)
        })
      });

      if (response.ok) {
        const event = await response.json();
        toast.success("¡Evento creado con éxito!");
        navigate(`/events/${event.event_id}`);
      } else {
        const data = await response.json();
        toast.error(data.detail || "Error al crear el evento");
      }
    } catch (error) {
      toast.error("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige-100">
      <Navbar />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/events")}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a eventos
        </Button>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-border/50">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#5c330a] mb-2">
            Crear Nuevo Evento
          </h1>
          <p className="text-muted-foreground mb-8">
            Organiza un torneo, partida casual o entrenamiento
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Título del evento *</Label>
              <Input
                id="title"
                name="title"
                placeholder="Ej: Torneo Blitz Nocturno"
                value={formData.title}
                onChange={handleChange}
                className="bg-beige-50"
                data-testid="input-title"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe el evento, reglas, premios..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="bg-beige-50"
                data-testid="input-description"
              />
            </div>

            {/* Type and Level */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de evento *</Label>
                <Select
                  value={formData.event_type}
                  onValueChange={(v) => handleSelectChange("event_type", v)}
                >
                  <SelectTrigger className="bg-beige-50" data-testid="select-type">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="torneo">Torneo</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="entrenamiento">Entrenamiento</SelectItem>
                    <SelectItem value="club">Club</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Nivel *</Label>
                <Select
                  value={formData.skill_level}
                  onValueChange={(v) => handleSelectChange("skill_level", v)}
                >
                  <SelectTrigger className="bg-beige-50" data-testid="select-level">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="principiante">Principiante</SelectItem>
                    <SelectItem value="medio">Intermedio</SelectItem>
                    <SelectItem value="avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="bg-beige-50 pl-10"
                    data-testid="input-date"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Hora *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="bg-beige-50 pl-10"
                    data-testid="input-time"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="city"
                    name="city"
                    placeholder="Ej: Barcelona"
                    value={formData.city}
                    onChange={handleChange}
                    className="bg-beige-50 pl-10"
                    data-testid="input-city"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max_seats">Plazas máximas *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="max_seats"
                    name="max_seats"
                    type="number"
                    min="1"
                    placeholder="Ej: 16"
                    value={formData.max_seats}
                    onChange={handleChange}
                    className="bg-beige-50 pl-10"
                    data-testid="input-seats"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Dirección *</Label>
              <Input
                id="address"
                name="address"
                placeholder="Ej: Carrer de la Portaferrissa, 22"
                value={formData.address}
                onChange={handleChange}
                className="bg-beige-50"
                data-testid="input-address"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="image_url">URL de imagen (opcional)</Label>
              <Input
                id="image_url"
                name="image_url"
                placeholder="https://..."
                value={formData.image_url}
                onChange={handleChange}
                className="bg-beige-50"
                data-testid="input-image"
              />
            </div>

            {/* Submit */}
            <Button 
              type="submit" 
              className="w-full bg-[#5c330a] hover:bg-[#4A2908] text-white rounded-full py-6 mt-4"
              disabled={loading}
              data-testid="submit-event"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear Evento"
              )}
            </Button>
          </form>
        </div>
      </main>

      {/* Mobile nav spacer */}
      <div className="mobile-nav-spacer" />
    </div>
  );
}
