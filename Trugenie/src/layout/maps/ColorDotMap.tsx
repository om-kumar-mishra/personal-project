import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { env } from "../../env";
// import { IndexSignatureStringType } from "../../lib/services/Datatype";

interface ColorDotMapProps {
  markers: any;
  mapHeight?: string;
}

const ColorDotMap: React.FC<ColorDotMapProps> = ({ markers, mapHeight }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: env.VITE_REACT_GOOGLE_MAPS_API_KEY,
  });

  const mapOptions = {
    center:
      markers?.[0]?.longitude && markers?.[0]?.latitude
        ? {
            lat: parseInt(markers[0].latitude),
            lng: parseInt(markers[0].longitude),
          }
        : { lat: 37.7749, lng: -122.4194 },
    zoom: 4,
  };

  const getColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "blue";
      case "Invested":
        return "yellow";
      case "Land Bank":
        return "green";
      case "Ongoing":
        return "orange";
      default:
        return "pink";
    }
  };

  if (!isLoaded) return <div className="text-center">Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ height: mapHeight ?? "200px", width: "100%" }}
      options={mapOptions}
      center={mapOptions.center}
      zoom={mapOptions.zoom}
    >
      {markers
        ? markers.map((value: any, index: number) => (
            <Marker
              key={`color_dot_${index}`}
              position={{
                lat: value?.latitude ? value.latitude : 12.3044,
                lng: value?.longitude ? value.longitude : 12.3456,
              }}
              icon={{
                url: `http://maps.google.com/mapfiles/ms/icons/${getColor(
                  value?.status
                )}-dot.png`,
                scaledSize: new window.google.maps.Size(30, 30),
              }}
              // title={() => getTitle(marker.projectName, marker.city)}
              title={value?.projectName ?? "Project"}
            />
          ))
        : ""}
    </GoogleMap>
  );
};

export default ColorDotMap;
