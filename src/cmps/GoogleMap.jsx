const API_KEY = import.meta.env.VITE_MY_API_KEY
import { useTranslation } from "react-i18next"
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
    const { t, i18n } = useTranslation()
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
        <div className="map" style={{ height: '80vh', width: '80%' }}>
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