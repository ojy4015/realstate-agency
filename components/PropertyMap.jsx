// 'use client';
// import { useEffect, useState } from 'react';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import Map, { Marker } from 'react-map-gl';
// import {
//   setKey,
//   setDefaults,
//   setLanguage,
//   setRegion,
//   fromAddress,
//   fromLatLng,
//   fromPlaceId,
//   setLocationType,
//   geocode,
//   RequestType,
// } from 'react-geocode';
// import Spinner from './Spinner';
// import Image from 'next/image';
// import pin from '@/assets/images/pin.svg';

// const PropertyMap = ({ property }) => {
//   const [lat, setLat] = useState(null);
//   const [lng, setLng] = useState(null);

//   const [toggle, setToggle] = useState(true);
//   // const [viewport, setViewport] = useState({
//   //   latitude: 0,
//   //   longitude: 0,
//   //   zoom: 12,
//   //   width: '100%',
//   //   height: '500px',
//   // });

//   const [viewport, setViewport] = useState({
//     latitude: 0,
//     longitude: 0,
//     zoom: 12,
//     width: '100%',
//     height: '100%',
//   });
//   const [loading, setLoading] = useState(true);
//   const [geocodeError, setGeocodeError] = useState(false);

//   setDefaults({
//     key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
//     language: 'en',
//     region: 'us',
//   });
//   // setDefaults({
//   //   key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
//   //   language: 'ko',
//   //   region: 'kr',
//   // });

//   // get coordinates from address
//   useEffect(() => {
//     const fetchCoords = async () => {
//       try {
//         // const addr =
//         //   "'" +
//         //   `${property?.location.street} ${property?.location.city} ${property?.location.state} ${property?.location.zipcode}` +
//         //   "'";
//         // console.log('addr->', addr);
//         // const res = await fromAddress(addr);
//         const res = await fromAddress(
//           `${property?.location.street} ${property?.location.city} ${property?.location.state} ${property?.location.zipcode}`
//         );
//         // const res = await fromAddress('789 Forest Lane Denver CO 80201');
//         // const res = await fromAddress(
//         //   '1600 Amphitheatre Parkway, Mountain View, CA'
//         // );
//         // console.log(
//         //   `${property?.location.street} ${property?.location.city} ${property?.location.state} ${property?.location.zipcode}`
//         // );
//         console.log('res ==> ', res);
//         //  Check for results
//         if (res?.results.length === 0) {
//           // No results found
//           setGeocodeError(true);
//           setLoading(false);
//           return;
//         }

//         const { lat, lng } = res.results[0].geometry.location;
//         console.log(lat, lng);

//         setLat(lat);
//         setLng(lng);
//         setViewport({
//           ...viewport,
//           latitude: lat,
//           longitude: lng,
//         });

//         // setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setGeocodeError(true);
//         // setLoading(false);
//       } finally {
//         setLoading(false);
//         console.log('geocodeError --> ', geocodeError);
//       }
//     };

//     fetchCoords();
//   }, [property]);

//   if (loading) return <Spinner loading={loading} />;
//   if (geocodeError) {
//     // Handle case where geocoding failed
//     return <div className="text-xl">No location data found</div>;
//   }

//   return (
//     !loading && (
//       <Map
//         mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
//         mapLib={import('mapbox-gl')}
//         initialViewState={{
//           longitude: lng,
//           latitude: lat,
//           zoom: 15,
//         }}
//         style={{ width: '100%', height: 500 }}
//         mapStyle="mapbox://styles/mapbox/streets-v9"
//       >
//         <Marker longitude={lng} latitude={lat} anchor="bottom">
//           <Image src={pin} alt="location" width={40} height={40} />
//         </Marker>
//       </Map>
//     )
//   );
// };
// export default PropertyMap;

'use client';
import { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from 'react-geocode';
import Spinner from './Spinner';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const [toggle, setToggle] = useState(true);

  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '100%',
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'us',
  });

  // get coordinates from address
  useEffect(() => {
    const fetchCoords = async () => {
      geocode(
        RequestType.ADDRESS,
        `${property?.location.street} ${property?.location.city} ${property?.location.state} ${property?.location.zipcode}`
      )
        .then(({ results }) => {
          const { lat, lng } = results[0].geometry.location;
          // console.log(lat, lng);

          setLat(lat);
          setLng(lng);
          setViewport({
            ...viewport,
            latitude: lat,
            longitude: lng,
          });
          setLoading(false);
        })
        .catch(console.error);
    };

    fetchCoords();
  }, [property]);

  if (loading) return <Spinner loading={loading} />;
  if (geocodeError) {
    // Handle case where geocoding failed
    return <div className="text-xl">No location data found</div>;
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 12,
        }}
        style={{ width: '100%', height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};
export default PropertyMap;
