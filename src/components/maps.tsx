import { Rectangle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import data from '../coordinates.json';
import './map.css'

const RectangleList = () => {
    let map = useMap();

    // Assign unique color to each layer
    const RgbaColor = (index: any) => {
        let h = (1.0 - index) * 240
        return "hsl(" + h + ", 100%, 50%)";
    }

    return (
        // draw Ractangle of each coordinate
        <span>
            {/* We Assuming that our Coordinate are in sorted form */}
            {data.map((item, i) => {
                let northEast = item.northEast.split(',');
                let southWest = item.southWest.split(',');
                let lagx = Number(northEast[0]);
                let lagy = Number(northEast[1]);
                let latx = Number(southWest[0]);
                let laty = Number(southWest[1]);
                return <Rectangle key={i} bounds={[[lagx, lagy], [latx, laty]]} weight={0} color={RgbaColor(i)}
                    // handling events
                    eventHandlers={({

                        // on click open the seleted view in full screen mod
                        click: () => {
                            let zoomFactor;
                            if (data.length / 2 < i) {
                                zoomFactor = 16;
                            }
                            else {
                                zoomFactor = 13;
                            }

                            map.setView(
                                [
                                    // this will set the center of the rectangular area
                                    (lagx + latx) / 2,
                                    (lagy + laty) / 2
                                ],
                                zoomFactor
                            );
                        },
                    })
                    }
                />
            })}
        </span>
    );
};

export default RectangleList;