import "leaflet/dist/leaflet.css";
import LocationMarker from "./location-marker";
import LocationFinder from "./location-finder";
import { useState } from "react";
import { MapContainer, MapContainerProps, TileLayer } from "react-leaflet";

export interface MapProps {
  position?: [number, number];
  onChange?: (lat: number, lng: number) => void;
}

const Map = ({ onChange, ...props }: MapContainerProps & MapProps) => {
  const [position, setPosition] = useState<[number, number]>(
    props.position || [35.68909089912437, 51.38797044754029]
  );

  return (
    <MapContainer
      zoom={13}
      minZoom={3}
      scrollWheelZoom={true}
      className="size-full relative z-10"
      center={{ lat: position[0], lng: position[1] }}
      {...props}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker onChange={onChange} position={position} setPosition={setPosition} />
      <LocationFinder setPosition={setPosition} onChange={onChange} />
    </MapContainer>
  );
};

export default Map;
