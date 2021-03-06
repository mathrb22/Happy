import React from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
//Tile layer -> fonte de blocos de dados de imagens; servidor para requisições de imagens para preencher a área de visualização do mapa
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

import mapMarkerImg from "../images/map_marker.svg";
import "../styles/pages/orphanages-map.css";

const mapIcon = Leaflet.icon({
	iconUrl: mapMarkerImg,
	iconSize: [58, 68],
	iconAnchor: [29, 68],
	popupAnchor: [170, 2],
});

function OrphanagesMap() {
	return (
		<div id="page-map">
			<aside>
				<header>
					<img src={mapMarkerImg} alt="Happy" />
					<h2>Escolha um orfanato no mapa</h2>
					<p>Muitas crianças estão esperando a sua visita :)</p>
				</header>

				<footer>
					<strong>Bauru</strong>
					<span>São Paulo</span>
				</footer>
			</aside>

			<Map
				center={[-22.3297043, -49.0579478]}
				zoom={14.25}
				style={{ width: "100%", height: "100%" }}>
				{/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
				<TileLayer
					url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
				/>
				<Marker icon={mapIcon} position={[-22.3297043, -49.0579478]}>
					<Popup
						closeButton={false}
						minWidth={240}
						maxWidth={240}
						className="map-popup">
						Casa da criança
						<Link to="/">
							<FiArrowRight size={20} color="#FFF" />
						</Link>
					</Popup>
				</Marker>
			</Map>

			<Link to="" className="create-orphanage">
				<FiPlus size={32} color="#FFF" />
			</Link>
		</div>
	);
}

export default OrphanagesMap;
