import { useEffect, useState } from 'react'

function InteractiveMap() {
  const [coords, setCoords] = useState({ lat: -23.5505, lng: -46.6333 })

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => undefined,
    )
  }, [])

  return (
    <div className="map-wrapper">
      <iframe
        title="Mapa de ocorrências"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.03}%2C${coords.lat - 0.03}%2C${coords.lng + 0.03}%2C${coords.lat + 0.03}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`}
      />
    </div>
  )
}

export default InteractiveMap
