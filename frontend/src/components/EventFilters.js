import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

export function EventFilters({ filters, setFilters, onClear }) {
  const hasActiveFilters = filters.city || filters.date_filter || filters.skill_level || filters.event_type;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* City Search */}
        <div className="relative lg:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Ciudad..."
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            className="pl-9 bg-beige-50 border-border focus:ring-2 focus:ring-mahogany-200"
            data-testid="filter-city"
          />
        </div>

        {/* Date Filter */}
        <Select
          value={filters.date_filter || "all"}
          onValueChange={(value) => setFilters({ ...filters, date_filter: value === "all" ? "" : value })}
        >
          <SelectTrigger className="bg-beige-50 border-border" data-testid="filter-date">
            <SelectValue placeholder="Fecha" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las fechas</SelectItem>
            <SelectItem value="hoy">Hoy</SelectItem>
            <SelectItem value="semana">Esta semana</SelectItem>
            <SelectItem value="mes">Este mes</SelectItem>
          </SelectContent>
        </Select>

        {/* Skill Level */}
        <Select
          value={filters.skill_level || "all"}
          onValueChange={(value) => setFilters({ ...filters, skill_level: value === "all" ? "" : value })}
        >
          <SelectTrigger className="bg-beige-50 border-border" data-testid="filter-level">
            <SelectValue placeholder="Nivel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los niveles</SelectItem>
            <SelectItem value="principiante">Principiante</SelectItem>
            <SelectItem value="medio">Intermedio</SelectItem>
            <SelectItem value="avanzado">Avanzado</SelectItem>
          </SelectContent>
        </Select>

        {/* Event Type */}
        <Select
          value={filters.event_type || "all"}
          onValueChange={(value) => setFilters({ ...filters, event_type: value === "all" ? "" : value })}
        >
          <SelectTrigger className="bg-beige-50 border-border" data-testid="filter-type">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            <SelectItem value="torneo">Torneo</SelectItem>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="entrenamiento">Entrenamiento</SelectItem>
            <SelectItem value="club">Club</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Button */}
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            onClick={onClear}
            className="text-muted-foreground hover:text-foreground"
            data-testid="filter-clear"
          >
            <X className="w-4 h-4 mr-2" />
            Limpiar
          </Button>
        )}
      </div>
    </div>
  );
}
