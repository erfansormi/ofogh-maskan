import { useMapEvents } from "react-leaflet";
import { LocateFixed } from "lucide-react";
import { MarkerProps } from "./location-marker";

const LocationFinder = ({ onChange, setPosition }: Omit<MarkerProps, "position">) => {
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      onChange && onChange(e.latlng.lat, e.latlng.lng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return (
    <span className="absolute bottom-4 left-4 bg-white text-slate-700 size-10 rounded-full z-20 center border border-slate-300 cursor-pointer">
      <LocateFixed />
    </span>
  );
};

export default LocationFinder;
