import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Loading from './Loading';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
function Map({location}) {  

    if(!location ) return <Loading/>
    const reversedCoordinates = location.map(location => {
        const [lng, lat] = location.coordinates;
        return [lat, lng];
      });    

    const initialCenter = reversedCoordinates ? reversedCoordinates[0] : [0, 0];
    return (
        <MapContainer style={{height: "600px"}} center={initialCenter} zoom={6} scrollWheelZoom={false}>
           <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            {
                reversedCoordinates && reversedCoordinates.map(cord => (
                    <Marker position={cord}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                ))
            }
            </MapContainer>
    )
}

export default Map
