import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {
  MapPin,
  Navigation,
  Clock,
  Compass,
  Landmark,
  ArrowRight,
  Eye,
  ShieldCheck,
  Car,
  Layers,
  Locate,
  Route,
  Search,
  ExternalLink,
  Sparkles,
  Info,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { Monument, Language } from '../types';
import { MONUMENTS } from '../data/monumentsData';
import { TRANSLATIONS } from '../data/translations';
import { handleImageError } from '../utils/imageUtils';

interface TourismMapProps {
  language: Language;
  initialMonument?: Monument | null;
  onSelectMonument: (monument: Monument) => void;
  onExploreHistory: (monument: Monument) => void;
}

// Cluster definitions with precise camera coordinates
interface ClusterConfig {
  id: 'All' | 'Badami' | 'Pattadakal' | 'Aihole';
  name: string;
  kannadaName: string;
  hindiName: string;
  badge: string;
  center: { lat: number; lng: number };
  zoom: number;
  description: string;
  distanceFromBadami: string;
  travelTime: string;
}

const CLUSTERS: ClusterConfig[] = [
  {
    id: 'All',
    name: 'All Bagalkote Hubs',
    kannadaName: 'ಎಲ್ಲಾ ಪರಂಪರೆ ತಾಣಗಳು',
    hindiName: 'सभी ऐतिहासिक केंद्र',
    badge: 'Golden Triangle',
    center: { lat: 15.965, lng: 75.785 },
    zoom: 11,
    description: 'The Badami Chalukya Golden Triangle encompassing Badami, Pattadakal, and Aihole along the sacred Malaprabha river valley.',
    distanceFromBadami: 'Full Circuit: ~70 km',
    travelTime: '1–2 Full Days',
  },
  {
    id: 'Badami',
    name: 'Badami (Vatapi)',
    kannadaName: 'ಬಾದಾಮಿ (ವಾತಾಪಿ)',
    hindiName: 'बादामी (वातापी)',
    badge: 'Rock-Cut Architecture',
    center: { lat: 15.920, lng: 75.686 },
    zoom: 15,
    description: 'Ancient Chalukyan capital founded in 540 CE, cradled in red sandstone ravines surrounding Agastya Lake with 4 monolithic rock-cut cave temples.',
    distanceFromBadami: '0 km (Central Base)',
    travelTime: 'Base Point',
  },
  {
    id: 'Pattadakal',
    name: 'Pattadakal (Raktapura)',
    kannadaName: 'ಪಟ್ಟದಕಲ್ಲು (ರಕ್ತಪುರ)',
    hindiName: 'पट्टदकल (रक्तपुर)',
    badge: 'UNESCO World Heritage',
    center: { lat: 15.949, lng: 75.816 },
    zoom: 16,
    description: 'UNESCO World Heritage coronation sanctuary where northern Nagara and southern Dravidian temple styles merged in perfect harmony.',
    distanceFromBadami: '22 km North-East',
    travelTime: '28 min via SH-14',
  },
  {
    id: 'Aihole',
    name: 'Aihole (Aryapura)',
    kannadaName: 'ಐಹೊಳೆ (ಆರ್ಯಪುರ)',
    hindiName: 'ऐहोल (आर्यपुर)',
    badge: 'Cradle of Temple Craft',
    center: { lat: 16.020, lng: 75.883 },
    zoom: 15,
    description: 'The ancient experimental workshop of over 120 stone temples where master sculptors forged the foundations of Indian temple architecture.',
    distanceFromBadami: '34 km East (13 km from Pattadakal)',
    travelTime: '45 min via Pattadakal',
  },
];

// Subcomponent: Smoothly controls Map camera movements
function MapCameraController({
  target,
  zoom,
}: {
  target: { lat: number; lng: number } | null;
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    if (!map || !target) return;
    map.panTo(target);
    map.setZoom(zoom);
  }, [map, target, zoom]);
  return null;
}

// Subcomponent: Calculates and renders real driving routes on Google Maps
function DirectionsRendererOverlay({
  origin,
  destination,
  onRouteCalculated,
}: {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  onRouteCalculated?: (distance: string, duration: string) => void;
}) {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    if (!routesLibrary || !map) return;
    const service = new routesLibrary.DirectionsService();
    const renderer = new routesLibrary.DirectionsRenderer({
      map,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#f59e0b',
        strokeOpacity: 0.9,
        strokeWeight: 6,
      },
    });
    setDirectionsService(service);
    setDirectionsRenderer(renderer);

    return () => {
      renderer.setMap(null);
    };
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.setDirections(result);
          const leg = result.routes[0]?.legs[0];
          if (leg && onRouteCalculated) {
            onRouteCalculated(leg.distance?.text || '', leg.duration?.text || '');
          }
        }
      }
    );
  }, [directionsService, directionsRenderer, origin, destination, onRouteCalculated]);

  return null;
}

export const TourismMap: React.FC<TourismMapProps> = ({
  language,
  initialMonument,
  onSelectMonument,
  onExploreHistory,
}) => {
  const t = TRANSLATIONS[language];

  // API Key state: check env or fetch from backend fallback
  const [apiKey, setApiKey] = useState<string>(() => {
    return (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY || '';
  });

  useEffect(() => {
    if (!apiKey) {
      fetch('/api/config/maps')
        .then((res) => res.json())
        .then((data) => {
          if (data?.apiKey) {
            setApiKey(data.apiKey);
          }
        })
        .catch(() => {});
    }
  }, [apiKey]);

  // Map state
  const [selectedClusterId, setSelectedClusterId] = useState<'All' | 'Badami' | 'Pattadakal' | 'Aihole'>(() => {
    return initialMonument ? initialMonument.cluster : 'All';
  });
  const [cameraTarget, setCameraTarget] = useState<{ lat: number; lng: number }>(() => {
    return initialMonument ? initialMonument.coordinates : CLUSTERS[0].center;
  });
  const [cameraZoom, setCameraZoom] = useState<number>(() => {
    return initialMonument ? 16 : CLUSTERS[0].zoom;
  });
  const [activeMonument, setActiveMonument] = useState<Monument | null>(() => {
    return initialMonument || null;
  });
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Temples' | 'Caves' | 'Museums'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mapType, setMapType] = useState<google.maps.MapTypeId | 'roadmap' | 'hybrid' | 'terrain'>('roadmap');

  // User Geolocation
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  // Real-time Route Directions state
  const [isRoutingActive, setIsRoutingActive] = useState<boolean>(false);
  const [routeOriginId, setRouteOriginId] = useState<string>('badami-caves');
  const [routeDestId, setRouteDestId] = useState<string>('virupaksha-pattadakal');
  const [calculatedDistance, setCalculatedDistance] = useState<string>('');
  const [calculatedDuration, setCalculatedDuration] = useState<string>('');

  const activeCluster = CLUSTERS.find((c) => c.id === selectedClusterId) || CLUSTERS[0];

  // Filtered monuments based on cluster, category, and search query
  const filteredMonuments = useMemo(() => {
    return MONUMENTS.filter((m) => {
      const matchesCluster = selectedClusterId === 'All' || m.cluster === selectedClusterId;
      const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        m.name.toLowerCase().includes(query) ||
        m.kannadaName.toLowerCase().includes(query) ||
        m.location.toLowerCase().includes(query) ||
        m.architectureStyle.toLowerCase().includes(query);
      return matchesCluster && matchesCategory && matchesQuery;
    });
  }, [selectedClusterId, selectedCategory, searchQuery]);

  // Switch cluster and smooth fly
  const handleClusterSelect = (clusterId: 'All' | 'Badami' | 'Pattadakal' | 'Aihole') => {
    setSelectedClusterId(clusterId);
    const cluster = CLUSTERS.find((c) => c.id === clusterId) || CLUSTERS[0];
    setCameraTarget(cluster.center);
    setCameraZoom(cluster.zoom);
    setActiveMonument(null);
  };

  // Click monument from list or map
  const handleMonumentClick = (monument: Monument) => {
    setActiveMonument(monument);
    setCameraTarget(monument.coordinates);
    setCameraZoom(16);
  };

  // Geolocation Handler
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const userPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(userPos);
        setCameraTarget(userPos);
        setCameraZoom(14);
      },
      (err) => {
        setIsLocating(false);
        setGeoError(err.message || 'Unable to retrieve location.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Open Google Maps External Navigation
  const handleOpenGoogleMapsDirections = (monument: Monument) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${monument.coordinates.lat},${monument.coordinates.lng}&destination_place_id=${encodeURIComponent(monument.name)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Get pin theme colors based on cluster
  const getPinTheme = (cluster: string, isSelected: boolean) => {
    if (cluster === 'Badami') {
      return {
        bg: isSelected ? '#ea580c' : '#c2410c',
        border: '#7c2d12',
        glyph: '#ffffff',
      };
    }
    if (cluster === 'Pattadakal') {
      return {
        bg: isSelected ? '#d97706' : '#b45309',
        border: '#78350f',
        glyph: '#ffffff',
      };
    }
    // Aihole
    return {
      bg: isSelected ? '#059669' : '#047857',
      border: '#064e3b',
      glyph: '#ffffff',
    };
  };

  const originMonument = MONUMENTS.find((m) => m.id === routeOriginId) || MONUMENTS[1];
  const destMonument = MONUMENTS.find((m) => m.id === routeDestId) || MONUMENTS[0];

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-white">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Google Maps Platform Integration • Live GPS Coordinates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
            Bagalkote Heritage Mapping System
          </h2>
          <p className="text-gray-300 text-sm max-w-2xl mt-1">
            Explore 9 world-famous Chalukyan rock-cut and stone architectural wonders across Badami, Pattadakal, and Aihole with interactive Google Maps navigation, satellite view, and live driving routes.
          </p>
        </div>

        {/* Quick Actions / Geolocation */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="map-locate-me-btn"
            onClick={handleLocateMe}
            disabled={isLocating}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shadow-md ${
              userLocation
                ? 'bg-blue-600 text-white hover:bg-blue-500'
                : 'bg-[#1e2738] text-gray-200 hover:bg-[#253248] border border-gray-700'
            }`}
            title="Detect your current location on the map"
          >
            <Locate className={`w-4 h-4 ${isLocating ? 'animate-spin text-amber-400' : 'text-blue-400'}`} />
            <span>{isLocating ? 'Detecting GPS...' : userLocation ? 'My Location Active' : 'Locate Me'}</span>
          </button>

          <button
            id="map-directions-toggle-btn"
            onClick={() => setIsRoutingActive(!isRoutingActive)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shadow-md ${
              isRoutingActive
                ? 'bg-amber-500 text-gray-950 font-extrabold'
                : 'bg-[#1e2738] text-gray-200 hover:bg-[#253248] border border-gray-700'
            }`}
          >
            <Route className="w-4 h-4 text-amber-400" />
            <span>{isRoutingActive ? 'Hide Directions' : 'Driving Routes'}</span>
          </button>
        </div>
      </div>

      {geoError && (
        <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-red-200 text-xs flex items-center justify-between">
          <span>{geoError}</span>
          <button onClick={() => setGeoError(null)} className="text-red-400 hover:text-white font-bold ml-4">
            ✕
          </button>
        </div>
      )}

      {/* Cluster Fast Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#121824] p-3 rounded-2xl border border-gray-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-400 font-medium px-2 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Hubs:
          </span>
          {CLUSTERS.map((c) => {
            const isSelected = selectedClusterId === c.id;
            return (
              <button
                key={c.id}
                id={`cluster-nav-btn-${c.id}`}
                onClick={() => handleClusterSelect(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-gray-950 shadow-md shadow-amber-500/20'
                    : 'bg-[#1a2332] text-gray-300 hover:text-white hover:bg-[#222e42] border border-gray-750'
                }`}
              >
                <span>{c.name.split(' ')[0]}</span>
                <span className="text-[10px] opacity-75 hidden sm:inline">({c.badge})</span>
              </button>
            );
          })}
        </div>

        {/* Map Type Switcher */}
        <div className="flex items-center space-x-1 bg-[#1a2332] p-1 rounded-xl border border-gray-700 text-xs">
          <button
            onClick={() => setMapType('roadmap')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              mapType === 'roadmap' ? 'bg-amber-500 text-gray-950 font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Vector Map
          </button>
          <button
            onClick={() => setMapType('hybrid')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              mapType === 'hybrid' ? 'bg-amber-500 text-gray-950 font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Satellite
          </button>
          <button
            onClick={() => setMapType('terrain')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              mapType === 'terrain' ? 'bg-amber-500 text-gray-950 font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Terrain
          </button>
        </div>
      </div>

      {/* Driving Routes Calculation Drawer */}
      {isRoutingActive && (
        <div className="bg-[#141d2b] border-2 border-amber-500/40 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Interactive Heritage Route Planner</h4>
                <p className="text-xs text-gray-400">Calculate real-time driving path along SH-14 and Malaprabha valley highways</p>
              </div>
            </div>

            {calculatedDistance && (
              <div className="flex items-center space-x-3 bg-[#1c273a] px-4 py-2 rounded-xl border border-amber-500/30">
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Estimated Distance</span>
                  <span className="text-sm font-extrabold text-amber-400">{calculatedDistance}</span>
                </div>
                <div className="h-6 w-px bg-gray-700" />
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Drive Time</span>
                  <span className="text-sm font-extrabold text-emerald-400">{calculatedDuration}</span>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Starting Point (Origin)</label>
              <select
                id="route-origin-select"
                value={routeOriginId}
                onChange={(e) => setRouteOriginId(e.target.value)}
                className="w-full bg-[#101723] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {MONUMENTS.map((m) => (
                  <option key={`origin-${m.id}`} value={m.id}>
                    {m.name} ({m.cluster})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Destination</label>
              <select
                id="route-dest-select"
                value={routeDestId}
                onChange={(e) => setRouteDestId(e.target.value)}
                className="w-full bg-[#101723] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {MONUMENTS.map((m) => (
                  <option key={`dest-${m.id}`} value={m.id}>
                    {m.name} ({m.cluster})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Google Maps Interactive Viewport Stage */}
      <div className="relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-[#0e141f]">
        {apiKey ? (
          <APIProvider apiKey={apiKey} solutionChannel="GMP_visgl_rgm_v1">
            <Map
              mapId="DEMO_MAP_ID"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              defaultCenter={cameraTarget}
              defaultZoom={cameraZoom}
              mapTypeId={mapType}
              gestureHandling="greedy"
              disableDefaultUI={false}
              fullscreenControl={true}
              zoomControl={true}
              streetViewControl={true}
              mapTypeControl={false}
              className="w-full h-full"
            >
              {/* Camera Pan & Zoom Controller */}
              <MapCameraController target={cameraTarget} zoom={cameraZoom} />

              {/* Real-time driving routes on Google Maps */}
              {isRoutingActive && originMonument && destMonument && (
                <DirectionsRendererOverlay
                  origin={originMonument.coordinates}
                  destination={destMonument.coordinates}
                  onRouteCalculated={(dist, dur) => {
                    setCalculatedDistance(dist);
                    setCalculatedDuration(dur);
                  }}
                />
              )}

              {/* User Geolocation Marker */}
              {userLocation && (
                <AdvancedMarker position={userLocation} title="Your Current Location">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-10 h-10 rounded-full bg-blue-500/30 animate-ping" />
                    <div className="relative w-5 h-5 rounded-full bg-blue-500 border-2 border-white shadow-xl flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>
                </AdvancedMarker>
              )}

              {/* Monument Advanced Markers */}
              {filteredMonuments.map((monument) => {
                const isSelected = activeMonument?.id === monument.id;
                const theme = getPinTheme(monument.cluster, isSelected);

                return (
                  <AdvancedMarker
                    key={monument.id}
                    position={monument.coordinates}
                    title={monument.name}
                    onClick={() => handleMonumentClick(monument)}
                    zIndex={isSelected ? 100 : 10}
                  >
                    <Pin
                      background={theme.bg}
                      borderColor={theme.border}
                      glyphColor={theme.glyph}
                      scale={isSelected ? 1.35 : 1.1}
                    />
                  </AdvancedMarker>
                );
              })}

              {/* InfoWindow Popup on Marker Click */}
              {activeMonument && (
                <InfoWindow
                  position={activeMonument.coordinates}
                  onCloseClick={() => setActiveMonument(null)}
                  maxWidth={340}
                  headerDisabled={false}
                >
                  <div className="text-gray-900 font-sans p-1 space-y-2.5">
                    <div className="relative h-28 w-full rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={activeMonument.image}
                        alt={activeMonument.name}
                        onError={(e) => handleImageError(e, activeMonument.cluster)}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-600 text-white text-[10px] font-bold shadow">
                        {activeMonument.cluster}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-sm text-gray-900 leading-tight font-serif">
                        {language === 'kn'
                          ? activeMonument.kannadaName
                          : language === 'hi'
                          ? activeMonument.hindiName
                          : activeMonument.name}
                      </h4>
                      <p className="text-[11px] text-gray-600 mt-0.5">{activeMonument.architectureStyle}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[11px] bg-gray-50 p-2 rounded-lg border border-gray-200">
                      <div>
                        <span className="text-gray-500 block text-[10px]">Period</span>
                        <span className="font-semibold text-gray-800">{activeMonument.period}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[10px]">Entry Fee</span>
                        <span className="font-semibold text-gray-800">{activeMonument.entryFee.indian}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-700 line-clamp-2 leading-relaxed">
                      {activeMonument.shortDescription[language] || activeMonument.shortDescription.en}
                    </p>

                    <div className="flex items-center gap-1.5 pt-1 border-t border-gray-200">
                      <button
                        onClick={() => onExploreHistory(activeMonument)}
                        className="flex-1 py-1.5 px-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg text-center transition-all shadow"
                      >
                        Explore Details
                      </button>
                      <button
                        onClick={() => handleOpenGoogleMapsDirections(activeMonument)}
                        className="py-1.5 px-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold rounded-lg flex items-center justify-center transition-all"
                        title="Open directions in Google Maps"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center animate-pulse">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Loading Google Maps Platform...</h3>
            <p className="text-xs text-gray-400 max-w-sm">
              Connecting to Google Maps JavaScript API.
            </p>
          </div>
        )}

        {/* Floating Map Legend Overlay */}
        <div className="absolute bottom-4 left-4 z-10 bg-[#121927]/90 backdrop-blur-md p-3 rounded-2xl border border-gray-700/70 shadow-2xl text-xs space-y-1.5 max-w-[200px] pointer-events-auto">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Legend</span>
          <div className="flex items-center space-x-2 text-gray-300">
            <div className="w-3 h-3 rounded-full bg-orange-600 border border-white/40" />
            <span>Badami (Caves/Fort)</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <div className="w-3 h-3 rounded-full bg-amber-500 border border-white/40" />
            <span>Pattadakal (UNESCO)</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <div className="w-3 h-3 rounded-full bg-emerald-600 border border-white/40" />
            <span>Aihole (Cradle of Art)</span>
          </div>
        </div>
      </div>

      {/* Monument Explorer Shelf & Category Filters */}
      <div className="bg-[#141a27] border border-gray-800 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Landmark className="w-5 h-5 text-amber-400" />
              <span>Heritage Monuments in {activeCluster.name}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {filteredMonuments.length} sites
              </span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Click any monument card to focus its Google Maps marker and view architectural details</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search monument, style..."
                className="bg-[#101723] border border-gray-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 w-48 sm:w-56"
              />
            </div>

            {/* Category Filter Chips */}
            {(['All', 'Temples', 'Caves', 'Museums'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-gray-950 font-bold'
                    : 'bg-[#1e2738] text-gray-300 hover:text-white border border-gray-750'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Monument Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMonuments.map((monument) => {
            const isSelected = activeMonument?.id === monument.id;
            return (
              <div
                key={monument.id}
                id={`map-card-${monument.id}`}
                onClick={() => handleMonumentClick(monument)}
                className={`group cursor-pointer bg-[#182233] border rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between hover:shadow-xl ${
                  isSelected
                    ? 'border-amber-500 bg-[#1e2a3f] ring-2 ring-amber-400/30'
                    : 'border-gray-800 hover:border-amber-500/40'
                }`}
              >
                <div className="space-y-3">
                  <div className="relative h-36 rounded-xl overflow-hidden bg-gray-900">
                    <img
                      src={monument.image}
                      alt={monument.name}
                      onError={(e) => handleImageError(e, monument.cluster)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1">
                      <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold border border-amber-400/30">
                        {monument.cluster}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-gray-200 text-[10px] font-medium border border-gray-700">
                        {monument.category}
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-white text-[10px] font-mono">
                      {monument.coordinates.lat.toFixed(4)}°N, {monument.coordinates.lng.toFixed(4)}°E
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-extrabold text-white font-serif group-hover:text-amber-400 transition-colors">
                      {monument.name}
                    </h4>
                    <p className="text-xs text-amber-400/90 font-medium">
                      {language === 'kn' ? monument.kannadaName : monument.kannadaName}
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">
                      {monument.shortDescription[language] || monument.shortDescription.en}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-800 flex items-center justify-between text-xs">
                  <span className="text-gray-400 text-[11px]">
                    {monument.cluster === 'Badami' ? 'Central Base' : `${monument.distanceFromBadamiKm} km from Badami`}
                  </span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onExploreHistory(monument);
                      }}
                      className="text-amber-400 hover:text-amber-300 font-bold flex items-center space-x-1"
                    >
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
