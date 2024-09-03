import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 27.7000,
  lng: 83.4500
};

function MyComponent() {
  return (
    
    <LoadScript
      googleMapsApiKey="AIzaSyCGwLMSeSdsn0X7_KbKdHy6f_cFmFLDNvU"  
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components like markers, info windows, etc. */ }
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyComponent);
