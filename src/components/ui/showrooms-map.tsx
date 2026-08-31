"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap, Marker } from "leaflet";
import {
  MAP_ATTRIBUTION,
  MAP_TILES,
  activePinHtml,
  idlePinHtml,
} from "./map-style";

export interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  title: string;
}

/**
 * Barcha shou-rumlar bitta xaritada. Tanlangani siyan pulsli pin bilan
 * ajratiladi, qolganlari bosiq kulrang.
 *
 * Xarita FAQAT bir marta quriladi — shahar almashganda qayta yaratilmaydi,
 * `flyTo` bilan silliq uchib o'tadi. Pinni bosish ham shaharni almashtiradi.
 */
export function ShowroomsMap({
  points,
  activeId,
  onSelect,
  zoom = 14,
  className,
}: {
  points: MapPoint[];
  activeId: string;
  onSelect?: (id: string) => void;
  zoom?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});
  const roRef = useRef<ResizeObserver | null>(null);
  const iconsRef = useRef<{ active?: unknown; idle?: unknown }>({});

  /* onSelect'ni ref'da saqlaymiz — o'zgarishi xaritani qayta qurmasin */
  const selectRef = useRef(onSelect);
  useEffect(() => {
    selectRef.current = onSelect;
  }, [onSelect]);

  /* ── 1. Xaritani bir marta qurish ── */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !ref.current || mapRef.current) return;

      const start = points.find((p) => p.id === activeId) ?? points[0];
      if (!start) return;

      const map = L.map(ref.current, {
        center: [start.lat, start.lng],
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

      const mk = (html: string) =>
        L.divIcon({
          className: "eg-pin-wrap",
          html,
          iconSize: [34, 44],
          iconAnchor: [17, 43],
        });
      iconsRef.current = { active: mk(activePinHtml()), idle: mk(idlePinHtml()) };

      for (const p of points) {
        const m = L.marker([p.lat, p.lng], {
          icon: (p.id === start.id
            ? iconsRef.current.active
            : iconsRef.current.idle) as never,
          title: p.title,
          keyboard: false,
        }).addTo(map);
        m.on("click", () => selectRef.current?.(p.id));
        markersRef.current[p.id] = m;
      }

      /* O'ram o'lchami o'zgarganda (reveal animatsiyasi, breakpoint, shrift
         yuklanishi) Leaflet o'zi bilmaydi — kuzatib turamiz, aks holda
         plitkalar yetishmay xarita yarim bo'sh qoladi. */
      const ro = new ResizeObserver(() => map.invalidateSize({ pan: false }));
      ro.observe(ref.current);
      roRef.current = ro;

      setTimeout(() => map.invalidateSize({ pan: false }), 350);
    })();

    return () => {
      cancelled = true;
      roRef.current?.disconnect();
      roRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
    // Nuqtalar ro'yxati o'zgarmas — xarita bir marta quriladi.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── 2. Tanlangan shaharga uchish + pinlarni yangilash ── */
  useEffect(() => {
    const map = mapRef.current;
    const { active, idle } = iconsRef.current;
    if (!map || !active || !idle) return;

    const target = points.find((p) => p.id === activeId);
    if (!target) return;

    for (const [id, m] of Object.entries(markersRef.current)) {
      m.setIcon((id === activeId ? active : idle) as never);
      m.setZIndexOffset(id === activeId ? 1000 : 0);
    }

    map.flyTo([target.lat, target.lng], zoom, {
      duration: 1.1,
      easeLinearity: 0.24,
    });
  }, [activeId, points, zoom]);

  const active = points.find((p) => p.id === activeId);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={active?.title ?? ""}
      className={className}
    />
  );
}
