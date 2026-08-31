"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet";
import { MAP_ATTRIBUTION, MAP_TILES, activePinHtml } from "./map-style";

/**
 * Zamonaviy interaktiv xarita — Leaflet + CARTO Positron (ochiq kulrang) plitkalar.
 * Google iframe o'rniga: brend rangidagi pulsli pin, dizaynga mos minimal ko'rinish.
 * API kalit talab qilmaydi; «Xaritada ochish» havolasi Google Maps'ga olib boraveradi.
 *
 * Bitta nuqta uchun. Barcha shou-rumlarni bitta xaritada ko'rsatish —
 * `ShowroomsMap` (bosh sahifadagi bo'lim).
 */

export function BranchMap({
  lat,
  lng,
  title,
  zoom = 15,
  className,
}: {
  lat: number;
  lng: number;
  title: string;
  zoom?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !ref.current || mapRef.current) return;

      const map = L.map(ref.current, {
        center: [lat, lng],
        zoom,
        zoomControl: false,
        scrollWheelZoom: false, // sahifa skrollini "tutib qolmasin"
        dragging: !L.Browser.mobile, // mobil'da sahifa skrolli ustuvor
        attributionControl: false,
      });
      mapRef.current = map;

      L.tileLayer(MAP_TILES, {
        subdomains: "abcd",
        maxZoom: 19,
        detectRetina: false,
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.control
        .attribution({ position: "bottomleft", prefix: false })
        .addAttribution(MAP_ATTRIBUTION)
        .addTo(map);

      const icon = L.divIcon({
        className: "eg-pin-wrap",
        html: activePinHtml(),
        iconSize: [34, 44],
        iconAnchor: [17, 43],
      });

      L.marker([lat, lng], { icon, title, keyboard: false }).addTo(map);

      // Reveal-animatsiyadan keyin o'lchamni qayta hisoblash
      setTimeout(() => map.invalidateSize(), 350);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [lat, lng, zoom, title]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={title}
      className={className}
    />
  );
}
