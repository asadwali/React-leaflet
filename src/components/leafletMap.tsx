import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import RectangleList from "./maps";
import data from '../coordinates.json';
import { LatLngTuple, } from 'leaflet';
import L from "leaflet"

const LeafletMap = () => {
    // this function will helps to find the center of the map
    const getLatLngBounds = () => {
        let tupleArray: Array<LatLngTuple[]> = [];
        data.forEach((item) => {
            const northEast = item.northEast.split(",");
            const southWest = item.southWest.split(",")
            tupleArray.push([
                [+northEast[0], +northEast[1]],
                [+southWest[0], +southWest[1]]
            ])
        })
        let tupleAreaCalculateArray: any = [];
        tupleArray.forEach((item: number[][]) => {
            tupleAreaCalculateArray.push([...item])
        })

        const bounds = L.latLngBounds(tupleAreaCalculateArray);
        let center = bounds.getCenter();
        return center;
    };

    return (
        // Leaflet Map
        <MapContainer className="h-screen" center={getLatLngBounds()} zoom={10} scrollWheelZoom={false}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Call Rectangle Component */}
            <RectangleList />
        </MapContainer>
    )
}

export default LeafletMap;