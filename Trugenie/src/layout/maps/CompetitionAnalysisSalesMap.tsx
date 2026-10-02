import React, { useEffect, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { MicroMarketCompletionAnalysisType } from "../../lib/services/salesDashboard/dataTypes";
import { convertDateFormatMMM } from "../../utils/commonFunctions";
import { numberWithCommasAndFraction } from "../../widgets/charts/Recharts/utils";
import { env } from "../../env";

interface CompetitionAnalysisMapProps {
  markers: MicroMarketCompletionAnalysisType[];
  mapHeight?: string;
}
const CompetitionAnalysisSalesMap: React.FC<CompetitionAnalysisMapProps> = ({
  markers,
  mapHeight,
}) => {
  const [mapOptions, setMapOptions] = useState({
    center: { lat: 28.7041, lng: 77.1025 },
    zoom: 15,
  });
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: env.VITE_REACT_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const mapOption = {
      center:
        markers?.[0]?.longitude && markers?.[0]?.latitude
          ? {
              lat: +markers[0].latitude,
              lng: +markers[0].longitude,
            }
          : { lat: 28.7041, lng: 77.1025 },
      zoom: 10,
    };
    setMapOptions(mapOption);
  }, [markers]);

  if (!isLoaded) return <div className="text-center">Loading...</div>;
  return (
    <>
      <GoogleMap
        mapContainerStyle={{ height: mapHeight ?? "70vh", width: "100%" }}
        options={mapOptions}
        center={mapOptions.center}
        zoom={mapOptions.zoom}
      >
        {markers
          ? markers.map((value, index) => (
              <MarkerF
                key={`ca_${index}`}
                draggable={true}
                position={{
                  lat: value?.latitude ? +value.latitude : 28.7041,
                  lng: value?.longitude ? +value.longitude : 77.1025,
                }}
                // icon={{
                //   path: window.google.maps.SymbolPath.CIRCLE,
                //   strokeColor: colors[index],
                //   strokeOpacity: 1,
                //   strokeWeight: 2,
                //   fillColor: colors[index],
                //   fillOpacity: 0.7,
                //   scale: 8,
                //   //   scaledSize: new window.google.maps.Size(50, 50),
                // }}
                title={`Developer : ${value.developer}\nProject: ${
                  value.project
                }\nLaunch Date : ${convertDateFormatMMM(
                  value.launchDate
                )}\nLaunch Area : ${numberWithCommasAndFraction(
                  value.launchedDateArea,
                  0
                )}\nSold Percentage : ${
                  value.sold ? `${value.sold * 100}%` : ""
                }\nCurrent Price : ${value.currentPrice}`}
              />
            ))
          : ""}
      </GoogleMap>
    </>
  );
};

export default CompetitionAnalysisSalesMap;
