"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet";

/**
 * Zamonaviy interaktiv xarita — Leaflet + CARTO Positron (ochiq kulrang) plitkalar.
 * Google iframe o'rniga: brend rangidagi pulsli pin, dizaynga mos minimal ko'rinish.
 * API kalit talab qilmaydi; «Xaritada ochish» havolasi Google Maps'ga olib boraveradi.
 */

const TILES =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

const PIN_SVG = `
<svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17 1C8.4 1 1.5 7.9 1.5 16.4 1.5 27.9 17 43 17 43s15.5-15.1 15.5-26.6C32.5 7.9 25.6 1 17 1Z"
        fill="#29ABE2" stroke="#08303F" stroke-width="2"/>
  <circle cx="17" cy="16.5" r="6.2" fill="#FFFFFF"/>
  <circle cx="17" cy="16.5" r="2.6" fill="#0B4A63"/>
</svg>`;

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

      L.tileLayer(TILES, {
        subdomains: "abcd",
        maxZoom: 19,
        detectRetina: false,
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.control
        .attribution({ position: "bottomleft", prefix: false })
        .addAttribution(
          '<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap</a> © CARTO',
        )
        .addTo(map);

      const icon = L.divIcon({
        className: "eg-pin-wrap",
        html: `<span class="eg-pin"><span class="eg-pin__pulse"></span>${PIN_SVG}</span>`,
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
