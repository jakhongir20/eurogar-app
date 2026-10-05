"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Map as LeafletMap } from "leaflet";
import {
  MAP_ATTRIBUTION,
  MAP_STYLE,
  activePinHtml,
  whenNearViewport,
} from "./map-style";

/**
 * Zamonaviy interaktiv xarita — Leaflet + OpenFreeMap Positron (ochiq kulrang, vektor).
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
    const el = ref.current;
    if (!el) return;

    const init = async () => {
      /* Leaflet va MapLibre ko'prigi parallel yuklanadi */
      const [{ default: L }, { maplibreGL }] = await Promise.all([
        import("leaflet"),
        import("@maplibre/maplibre-gl-leaflet"),
      ]);
      if (cancelled || !ref.current || mapRef.current) return;

      const map = L.map(ref.current, {
        center: [lat, lng],
        zoom,
        zoomControl: false,
        maxZoom: 19,
        scrollWheelZoom: false, // sahifa skrollini "tutib qolmasin"
        dragging: !L.Browser.mobile, // mobil'da sahifa skrolli ustuvor
        attributionControl: false,
      });
      mapRef.current = map;

      /* Vektor fon: har qanday zoom va Retina ekranda tiniq */
      maplibreGL({ style: MAP_STYLE }).addTo(map);

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
    };
    const stop = whenNearViewport(el, () => void init());

    return () => {
      cancelled = true;
      stop();
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
