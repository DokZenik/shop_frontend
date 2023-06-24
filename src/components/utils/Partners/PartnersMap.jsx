// import React from "react";
// import ReactMapGL, { Marker, Popup } from "react-map-gl";
//
// const MapboxMap = () => {
//     const [viewport, setViewport] = React.useState({
//         latitude: 50.0755,
//         longitude: 14.4378,
//         zoom: 10,
//     });
//
//     return (
//         <ReactMapGL
//             {...viewport}
//             width="100vw"
//             height="100vh"
//             mapboxAccessToken="pk.eyJ1IjoicGhpbHlhYTMiLCJhIjoiY2xqMXdwZzRmMHp0eDNsb2RpZXZyNGFqcSJ9.txcZG0uEL79eAo2AFfpcwA"
//             onViewportChange={(viewport) => setViewport(viewport)}
//             mapStyle="mapbox://styles/mapbox/streets-v11"
//         >
//             <Marker latitude={50.0755} longitude={14.4378}>
//                 <Popup latitude={50.0755} longitude={14.4378}>
//                     Prague, Czech Republic
//                 </Popup>
//             </Marker>
//         </ReactMapGL>
//     );
// };
//
// export default MapboxMap;
