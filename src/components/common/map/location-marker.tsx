import { MapProps } from ".";
import { Marker, Popup, useMapEvents } from "react-leaflet";

export interface MarkerProps extends MapProps {
  position: [number, number];
  setPosition: React.Dispatch<React.SetStateAction<[number, number]>>;
}

function LocationMarker({ onChange, setPosition, position, staticMap }: MarkerProps) {
  const map = useMapEvents({
    click(e) {
      if (staticMap) return;

      if ((e.originalEvent.target as any)?.nodeName !== "DIV") return;

      map.flyTo(e.latlng, map.getZoom() <= 15 ? 15 : map.getZoom());
      setPosition([e.latlng.lat, e.latlng.lng]);
      onChange && onChange(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>شما اینجا هستید!</Popup>
    </Marker>
  );
}

export default LocationMarker;
