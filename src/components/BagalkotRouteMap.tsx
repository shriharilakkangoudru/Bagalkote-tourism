import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import { Compass, MapPin, Navigation, Route, Eye, Info, Layers, CheckCircle2, RotateCcw, ExternalLink, ArrowRight, ShieldCheck, Car } from 'lucide-react';
import { DESTINATIONS, Destination } from '../data/destinations';
import { TOURISM_ROUTES, TourismRoute } from '../data/routes';

interface BagalkotRouteMapProps {
  onSelectDestination?: (dest: Destination) => void;
  focusedRouteId?: string | null;
}

export const BagalkotRouteMap: React.FC<BagalkotRouteMapProps> = ({
  onSelectDestination,
  focusedRouteId = null,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const routeLayersRef = useRef<{ [routeId: string]: L.Polyline }>({});
  const markersRef = useRef<{ [destId: string]: L.Marker }>({});

  const [selectedRouteId, setSelectedRouteId] = useState<string>(focusedRouteId || 'all');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  // Sync prop changes for focusedRouteId
  useEffect(() => {
    if (focusedRouteId) {
      setSelectedRouteId(focusedRouteId);
    }
  }, [focusedRouteId]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Safety check for Leaflet container reuse in React StrictMode
    if ((mapContainerRef.current as any)._leaflet_id) {
      delete (mapContainerRef.current as any)._leaflet_id;
    }

    let resizeTimer: any = null;
    let handleResize = () => {};

    try {
      // Bagalkot District Center coordinates
      const bagalkotCenter: L.LatLngExpression = [16.12, 75.78];

      const map = L.map(mapContainerRef.current, {
        center: bagalkotCenter,
        zoom: 10,
        minZoom: 9,
        maxZoom: 18,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      // High quality Voyager / OpenStreetMap basemap
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;

      // Render Polylines for each route
      TOURISM_ROUTES.forEach((route) => {
        const polyline = L.polyline(route.waypoints, {
          color: route.color,
          weight: 5,
          opacity: 0.85,
          lineCap: 'round',
          lineJoin: 'round',
          dashArray: route.id === 'route-4' ? '6, 8' : undefined,
        }).addTo(map);

        // Bind route tooltip
        polyline.bindTooltip(
          `<strong>${route.name}</strong><br/><span style="font-size:11px;color:#d97706">${route.distanceKm} km • ${route.estimatedDuration.split('(')[0]}</span>`,
          { sticky: true }
        );

        polyline.on('click', () => {
          setSelectedRouteId(route.id);
          map.fitBounds(polyline.getBounds(), { padding: [40, 40] });
        });

        routeLayersRef.current[route.id] = polyline;
      });

      // Render Markers for all destinations
      DESTINATIONS.forEach((dest) => {
        // Determine pin color based on category
        let pinColor = '#d97706'; // default amber
        if (dest.category === 'UNESCO Heritage') pinColor = '#ea580c'; // fiery orange
        if (dest.category === 'Rock-Cut Caves') pinColor = '#b45309'; // deep sandstone
        if (dest.category === 'Confluence & Sacred') pinColor = '#0284c7'; // river blue
        if (dest.category === 'Dams & Nature') pinColor = '#059669'; // emerald
        if (dest.category === 'Crafts & Culture') pinColor = '#7c3aed'; // silk purple

        const iconHtml = `
          <div style="background-color: ${pinColor}; width: 32px; height: 32px; border-radius: 50%; border: 2.5px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.5); font-size: 14px;">
            ${dest.category === 'UNESCO Heritage' ? '🏛️' : dest.category === 'Rock-Cut Caves' ? '🪨' : dest.category === 'Confluence & Sacred' ? '🌊' : dest.category === 'Dams & Nature' ? '💧' : '🧵'}
          </div>
        `;

        const customIcon = L.divIcon({
          className: 'bagalkot-custom-pin',
          html: iconHtml,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -18],
        });

        const marker = L.marker([dest.coordinates.lat, dest.coordinates.lng], {
          icon: customIcon,
          title: dest.name,
        }).addTo(map);

        // Popup Content
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${dest.coordinates.lat},${dest.coordinates.lng}`;

        const popupContent = `
          <div style="width: 260px; font-family: sans-serif; overflow: hidden; border-radius: 12px;">
            <div style="height: 120px; position: relative; background: #1a2232;">
              <img src="${dest.image}" alt="${dest.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='/images/monuments/virupaksha.jpg'"/>
              <span style="position: absolute; top: 6px; left: 6px; background: rgba(0,0,0,0.75); color: #f59e0b; padding: 2px 8px; border-radius: 6px; font-size: 10px; font-weight: bold;">
                ${dest.category}
              </span>
            </div>
            <div style="padding: 12px; background: #121927; color: #f3f4f6;">
              <h4 style="margin: 0 0 2px 0; font-size: 15px; font-weight: bold; color: white;">${dest.name}</h4>
              <p style="margin: 0 0 8px 0; font-size: 11px; color: #fbbf24;">${dest.kannadaName}</p>
              <p style="margin: 0 0 10px 0; font-size: 11px; color: #9ca3af; line-height: 1.4;">${dest.shortDescription.slice(0, 110)}...</p>
              <div style="display: flex; gap: 6px;">
                <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; background: #d97706; color: #0b0f17; padding: 6px 0; border-radius: 8px; font-size: 11px; font-weight: bold; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 4px;">
                  <span>Get Directions</span> ↗
                </a>
              </div>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 300 });

        marker.on('click', () => {
          setSelectedDestination(dest);
        });

        markersRef.current[dest.id] = marker;
      });

      resizeTimer = setTimeout(() => {
        map.invalidateSize();
      }, 250);

      handleResize = () => {
        map.invalidateSize();
      };
      window.addEventListener('resize', handleResize);
    } catch (err) {
      console.warn('Leaflet map initialization exception:', err);
    }

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {}
        mapInstanceRef.current = null;
      }
      routeLayersRef.current = {};
      markersRef.current = {};
      if (mapContainerRef.current) {
        delete (mapContainerRef.current as any)._leaflet_id;
      }
    };
  }, []);

  // Update Route Focus and Styling dynamically
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (selectedRouteId === 'all') {
      // Show all routes with original opacity
      TOURISM_ROUTES.forEach((route) => {
        const polyline = routeLayersRef.current[route.id];
        if (polyline) {
          polyline.setStyle({ opacity: 0.8, weight: 5 });
        }
      });
      // Center Bagalkot District
      map.setView([16.12, 75.78], 10, { animate: true });
    } else {
      // Highlight selected route, dim others
      TOURISM_ROUTES.forEach((route) => {
        const polyline = routeLayersRef.current[route.id];
        if (polyline) {
          if (route.id === selectedRouteId) {
            polyline.setStyle({ opacity: 1.0, weight: 7 });
            polyline.bringToFront();
            map.fitBounds(polyline.getBounds(), { padding: [50, 50], animate: true });
          } else {
            polyline.setStyle({ opacity: 0.25, weight: 3 });
          }
        }
      });
    }
  }, [selectedRouteId]);

  // Filter markers by category
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    DESTINATIONS.forEach((dest) => {
      const marker = markersRef.current[dest.id];
      if (!marker) return;

      const matchesCategory = activeCategory === 'All' || dest.category === activeCategory;
      if (matchesCategory) {
        if (!map.hasLayer(marker)) {
          marker.addTo(map);
        }
      } else {
        if (map.hasLayer(marker)) {
          marker.remove();
        }
      }
    });
  }, [activeCategory]);

  const activeRoute = useMemo(() => {
    return TOURISM_ROUTES.find((r) => r.id === selectedRouteId);
  }, [selectedRouteId]);

  const handleResetMap = () => {
    setSelectedRouteId('all');
    setActiveCategory('All');
    setSelectedDestination(null);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([16.12, 75.78], 10, { animate: true });
    }
  };

  const handleMarkerFocus = (dest: Destination) => {
    const map = mapInstanceRef.current;
    const marker = markersRef.current[dest.id];
    if (map && marker) {
      map.setView([dest.coordinates.lat, dest.coordinates.lng], 14, { animate: true });
      marker.openPopup();
      setSelectedDestination(dest);
    }
  };

  return (
    <div className="space-y-6">
      {/* Route Map Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121927] p-5 sm:p-6 rounded-3xl border border-gray-800">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Route className="w-4 h-4 text-amber-400" />
            <span>Interactive Bagalkot District Route Map</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
            Discover Bagalkot Travel Circuits
          </h2>
          <p className="text-xs sm:text-sm text-gray-300">
            Dedicated district-specific map with verified highway corridors, real driving routes, and verified coordinates.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleResetMap}
            className="px-3.5 py-2 rounded-xl bg-[#1a2334] hover:bg-[#232e44] text-xs font-semibold text-gray-300 hover:text-white border border-gray-700 flex items-center space-x-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Reset Map View</span>
          </button>
        </div>
      </div>

      {/* Suggested Routes Fast Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TOURISM_ROUTES.map((route) => {
          const isSelected = selectedRouteId === route.id;
          return (
            <button
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-[#182338] border-amber-400 shadow-lg shadow-amber-500/15 scale-[1.02]'
                  : 'bg-[#121927] border-gray-800 hover:border-gray-700 hover:bg-[#161f30]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: route.color }}
                />
                <span className="text-[11px] font-extrabold text-amber-300">
                  {route.distanceKm} km
                </span>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                  {route.name}
                </h4>
                <p className="text-[11px] text-gray-400 line-clamp-1">{route.subtitle}</p>
              </div>
              <div className="flex items-center space-x-1 text-[11px] font-bold text-amber-400 pt-1">
                <span>{isSelected ? 'Route Focused ✓' : 'Explore the Route →'}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Route Info Ribbon */}
      {activeRoute && (
        <div className="bg-[#141d2d] border border-amber-500/40 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeRoute.color }} />
              <h3 className="text-base font-bold text-white font-serif">{activeRoute.name}</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                {activeRoute.theme}
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
              {activeRoute.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs shrink-0 border-t lg:border-t-0 lg:border-l border-gray-800 pt-3 lg:pt-0 lg:pl-5">
            <div>
              <span className="text-gray-400 block">Total Distance:</span>
              <strong className="text-amber-400 text-sm">{activeRoute.distanceKm} km</strong>
            </div>
            <div>
              <span className="text-gray-400 block">Drive Time:</span>
              <strong className="text-white text-sm">{activeRoute.estimatedDuration.split('(')[0]}</strong>
            </div>
            <div>
              <span className="text-gray-400 block">Highways:</span>
              <span className="text-gray-300 font-medium">{activeRoute.highways.join(', ')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Interactive Leaflet Map Canvas */}
      <div className="relative w-full h-[420px] sm:h-[540px] md:h-[620px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl bg-[#0d131f]">
        {/* Map Container */}
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Floating Category Filter Bar */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-[400] flex items-center gap-1.5 bg-[#121927]/90 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl border border-gray-700/80 shadow-2xl text-xs max-w-[calc(100%-1.5rem)] sm:max-w-[calc(100%-2rem)] overflow-x-auto scrollbar-none flex-nowrap sm:flex-wrap">
          <span className="text-[11px] font-bold text-amber-400 px-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            Filter:
          </span>
          {['All', 'UNESCO Heritage', 'Rock-Cut Caves', 'Ancient Temples', 'Confluence & Sacred', 'Dams & Nature', 'Crafts & Culture'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-gray-950 font-bold shadow'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat === 'All' ? 'All Sites' : cat.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Floating Map Legend Overlay */}
        <div className="absolute bottom-4 left-4 z-[400] bg-[#121927]/95 backdrop-blur-md p-3.5 rounded-2xl border border-gray-700/80 shadow-2xl text-xs space-y-2 pointer-events-auto max-w-[240px]">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
            Map Legend & Routes
          </span>

          <div className="space-y-1.5 text-[11px] text-gray-300">
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-1 rounded" style={{ backgroundColor: '#d97706' }} />
              <span>Route 1: Classic Chalukyan</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-1 rounded" style={{ backgroundColor: '#ea580c' }} />
              <span>Route 2: Springs & UNESCO</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-1 rounded" style={{ backgroundColor: '#0284c7' }} />
              <span>Route 3: Rivers & Almatti</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-1 rounded border-dashed" style={{ backgroundColor: '#7c3aed' }} />
              <span>Route 4: Grand Circuit</span>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-800 space-y-1 text-[11px] text-gray-400">
            <div className="flex items-center space-x-1.5">
              <span>🏛️</span>
              <span>UNESCO Sites (Pattadakal)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span>🪨</span>
              <span>Rock-Cut Caves (Badami)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span>🌊</span>
              <span>Sacred Confluence (Kudalasangama)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Destination Quick Focus Shelf */}
      <div className="bg-[#121927] border border-gray-800 rounded-3xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            Quick Focus Map on Major Bagalkot Destinations:
          </span>
          <span className="text-[11px] text-gray-500">Click to center & open directions</span>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {DESTINATIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => handleMarkerFocus(d)}
              className="px-3.5 py-1.5 rounded-xl bg-[#192233] hover:bg-[#202c42] border border-gray-750 text-xs font-medium text-gray-200 hover:text-amber-300 shrink-0 transition-colors flex items-center space-x-1.5"
            >
              <span>{d.name.split(' ')[0]}</span>
              <span className="text-[10px] text-amber-400/80">({d.distanceFromBagalkotKm}km)</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
