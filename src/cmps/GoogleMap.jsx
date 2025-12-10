const API_KEY = 'AIzaSyDN14tyfDn2jjnbEbs8mAQsdfe_wU2to40'

import { useRef, useState } from "react"
import {
    AdvancedMarker,
    APIProvider,
    InfoWindow,
    Map,
    useAdvancedMarkerRef
} from "@vis.gl/react-google-maps"

function ClickableMarker({ position, onClick }) {
    const [markerRef, marker] = useAdvancedMarkerRef()

    return (
        <AdvancedMarker
            position={position}
            ref={markerRef}
            onClick={() => onClick(marker)}
        />
    )
}

export function GoogleMap() {
    const [coords, setCoords] = useState({ lat: 32.0853, lng: 34.7818 })
    const [isOpen, setIsOpen] = useState(false)
    const [activeMarker, setActiveMarker] = useState(null)

    const mapRef = useRef(null)


    function handleMapClick(ev) {
        const pos = ev.detail?.latLng;
        if (!pos) return
        setCoords(pos)    
        setIsOpen(false)
    }

    function handleMarkerClick(marker) {
        const pos = marker.position;
        setCoords(pos)     
        setActiveMarker(marker)
        setIsOpen(true)
    }

    const markers = [
        { lat: 32.0853, lng: 34.7818 },  // Tel Aviv
        { lat: 32.44391, lng: 34.91762 }, // Hadera
        { lat: 32.01672, lng: 34.74581 }, // Bat Yam
    ]

    return (
        <div className="map" style={{ height: '100vh', width: '100%' }}>
            <APIProvider apiKey={API_KEY}>
                <Map
                    defaultCenter={coords}
                    defaultZoom={10}
                    mapId="MAP_ID"
                    gestureHandling={'greedy'}
                    disableDefaultUI={false}
                    onClick={handleMapClick}
                >

                    {markers.map(pos => (
                        <ClickableMarker
                            key={`${pos.lat}-${pos.lng}`}
                            position={pos}
                            onClick={handleMarkerClick}
                        />
                    ))}

                    {isOpen &&
                        <InfoWindow
                            anchor={activeMarker}
                            onCloseClick={() => setIsOpen(false)}
                        >
                            <h3>Marker is at {JSON.stringify(coords)}</h3>
                        </InfoWindow>
                    }
                </Map>
            </APIProvider>
        </div>
    )

}