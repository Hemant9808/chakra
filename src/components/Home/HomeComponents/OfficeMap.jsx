import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 28.7041, // Change this to your office latitude
  lng: 77.1025, // Change this to your office longitude
};

const OfficeMap = () => {
  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        {/* Office Marker */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default OfficeMap;