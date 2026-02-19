"use client";

import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, OverlayView } from "@react-google-maps/api";
import Image from "next/image";
import { Loader2, X } from "lucide-react";

const CONTAINER_STYLE = {
    width: "100%",
    height: "100%",
    borderRadius: "0.75rem",
};

// Default center (Lagos)
const CENTER = {
    lat: 6.5244,
    lng: 3.3792
};

const MAP_STYLES = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }], 
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#BFDBFE" }], 
    },
    {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{ color: "#E5E9F2" }], 
    },
];

interface ListingsMapProps {
    listings: Array<{
        id: string;
        title: string;
        price: string;
        location: string;
        image: string;
        lat?: number;
        lng?: number;
    }>;
}

export const ListingsMap = ({ listings }: ListingsMapProps) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "", 
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [selectedListingId, setSelectedListingId] = useState<string | null>(null);

    const onLoad = useCallback((map: google.maps.Map) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    useEffect(() => {
        if (map && listings.length > 0) {
            const bounds = new google.maps.LatLngBounds();
            let hasValidCoords = false;
            listings.forEach(listing => {
                if (listing.lat && listing.lng) {
                    bounds.extend({ lat: listing.lat, lng: listing.lng });
                    hasValidCoords = true;
                }
            });
            if (hasValidCoords) {
                map.fitBounds(bounds);
            }
        }
    }, [map, listings]);

    if (!isLoaded) {
        return (
            <div className="w-full h-150 md:h-[calc(100vh-200px)] bg-gray-100 rounded-xl flex items-center justify-center">
                <Loader2 className="animate-spin text-gray-400" size={32} />
            </div>
        );
    }

    return (
        <div className="relative w-full h-150 md:h-[calc(100vh-200px)] rounded-xl overflow-hidden border border-gray-200">
            <GoogleMap
                mapContainerStyle={CONTAINER_STYLE}
                center={CENTER}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    styles: MAP_STYLES,
                    disableDefaultUI: true, 
                    zoomControl: true,
                    gestureHandling: "greedy", 
                    draggable: true,
                }}
            >
                {listings.map((listing) => {
                    if (!listing.lat || !listing.lng) return null;

                    const isSelected = selectedListingId === listing.id;

                    return (
                        <OverlayView
                            key={listing.id}
                            position={{ lat: listing.lat, lng: listing.lng }}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        >
                            <div className="relative">
                                {isSelected ? (
                                    <div className="relative transform -translate-x-1/2 -translate-y-full mb-4 z-50 w-65 bg-white rounded-xl shadow-2xl p-3 animate-in fade-in zoom-in duration-200 font-sans">
                                        <button 
                                            aria-label="Close modal"
                                            onClick={(e) => { e.stopPropagation(); setSelectedListingId(null); }}
                                            className="absolute top-2 right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200 z-10"
                                        >
                                            <X size={12} className="text-gray-600" />
                                        </button>

                                        <div className="flex gap-3">
                                            <div className="relative w-20 h-24 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                                <Image 
                                                    src={listing.image} 
                                                    alt={listing.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="80px"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h3 className="text-xl font-extrabold text-[#111827]">{listing.price}</h3>
                                                <p className="text-sm text-gray-500 font-medium line-clamp-1">{listing.location}</p>
                                                <p className="text-xs text-gray-400 line-clamp-1 mt-1">{listing.title}</p>
                                            </div>
                                        </div>

                                        <button 
                                            className="mt-3 w-full bg-[#1A1A1A] hover:bg-black text-white text-sm font-bold py-3 rounded-lg transition-colors"
                                        >
                                            View listing
                                        </button>
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45"></div>
                                    </div>
                                ) : (
                                    <div 
                                        onClick={() => setSelectedListingId(listing.id)}
                                        className="transform -translate-x-1/2 -translate-y-1/2 bg-[#65A30D] hover:bg-[#4d7c0f] text-white text-xs font-bold px-2 py-1 rounded-md shadow-md cursor-pointer hover:scale-110 transition-transform whitespace-nowrap z-10"
                                    >
                                        {listing.price}
                                    </div>
                                )}
                            </div>
                        </OverlayView>
                    );
                })}
            </GoogleMap>
        </div>
    );
};