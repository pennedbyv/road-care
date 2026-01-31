import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Complaint, DamageType } from "@/types/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom markers for different damage types
const createCustomIcon = (type: DamageType) => {
  const colors: Record<DamageType, string> = {
    pothole: "#ef4444",
    crack: "#f59e0b",
    water: "#3b82f6",
  };

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        background: ${colors[type]};
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        border: 2px solid rgba(255,255,255,0.8);
      ">
        <div style="
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Solapur city bounds
const SOLAPUR_CENTER: [number, number] = [17.6599, 75.9064];
const SOLAPUR_BOUNDS: [[number, number], [number, number]] = [
  [17.58, 75.82],
  [17.74, 76.00],
];

interface SolapurMapProps {
  complaints: Complaint[];
  selectedType?: DamageType | "all";
}

function MapController() {
  const map = useMap();
  
  useEffect(() => {
    map.setMaxBounds(SOLAPUR_BOUNDS);
    map.setMinZoom(12);
    map.setMaxZoom(18);
  }, [map]);

  return null;
}

const damageLabels: Record<DamageType, string> = {
  pothole: "Pothole",
  crack: "Road Crack",
  water: "Water Damage",
};

const statusLabels = {
  pending: { label: "Pending", class: "badge-pending" },
  "in-progress": { label: "In Progress", class: "badge-in-progress" },
  completed: { label: "Completed", class: "badge-completed" },
};

export function SolapurMap({ complaints, selectedType = "all" }: SolapurMapProps) {
  const filteredComplaints = selectedType === "all"
    ? complaints
    : complaints.filter((c) => c.damageType === selectedType);

  return (
    <div className="map-container h-[500px]">
      <MapContainer
        center={SOLAPUR_CENTER}
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <MapController />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredComplaints.map((complaint) => (
          <Marker
            key={complaint.id}
            position={[complaint.coordinates.lat, complaint.coordinates.lng]}
            icon={createCustomIcon(complaint.damageType)}
          >
            <Popup className="custom-popup">
              <div className="p-1 min-w-[200px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">{complaint.id}</span>
                  <Badge
                    variant="outline"
                    className={statusLabels[complaint.status].class}
                  >
                    {statusLabels[complaint.status].label}
                  </Badge>
                </div>
                <img
                  src={complaint.imageUrl}
                  alt="Damage"
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <p className="text-sm text-foreground mb-1">{complaint.location}</p>
                <p className="text-xs text-muted-foreground mb-2">{complaint.ward}</p>
                <div className="flex items-center justify-between">
                  <Badge className={`damage-${complaint.damageType}`}>
                    {damageLabels[complaint.damageType]}
                  </Badge>
                  <Button size="sm" variant="ghost" className="h-7 text-xs">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
