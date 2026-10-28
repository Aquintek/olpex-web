import { MAP_DOTS } from "@/lib/coverage-map";
import "./coverage-map.css";

// Dot map of the Americas and the Caribbean. Coverage in brand blue; the Guatemala
// HQ is the one bright point, with a short ping when the map scrolls into view.
export function CoverageMap() {
  return (
    <figure className="coverage" data-reveal>
      <svg className="coverage-map" viewBox="0 0 636 713" role="img" aria-labelledby="map-title map-desc">
        <title id="map-title">Mapa de cobertura de OLPEX</title>
        <desc id="map-desc">
          OLPEX atiende plantas en todo el continente americano y el Caribe, con sede en Guatemala.
        </desc>
        <g fill="none" strokeLinecap="round">
          <path className="dots-cover" d={MAP_DOTS} />
        </g>
        {/* The HQ marker sits on the center of Guatemala's own dots (MAP_DOTS_HQ). */}
        <g className="hq" aria-hidden="true">
          <circle className="hq-ping" cx="364" cy="325" r="10" />
          <circle className="hq-halo" cx="364" cy="325" r="16" />
          <circle className="hq-node" cx="364" cy="325" r="8" />
          <text className="hq-label" x="388" y="333">
            Sede en Guatemala
          </text>
        </g>
      </svg>
      <figcaption className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-soft">
        <span className="flex items-center gap-2.5">
          <span className="size-2.5 rounded-full bg-chalk shadow-[0_0_0_3px_rgb(79_168_255/0.35)]" aria-hidden="true" />
          Sede en Guatemala
        </span>
        <span className="flex items-center gap-2.5">
          <span className="size-2.5 rounded-full bg-brand" aria-hidden="true" />
          Cobertura en América y el Caribe
        </span>
      </figcaption>
    </figure>
  );
}
