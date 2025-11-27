// src/components/WeatherCard.jsx
import React from "react";

export default function WeatherCard({ data }) {
  if (!data) return null;

  // adapt fields to how your backend returns them
  const { name, country, temp, description, humidity, wind_speed } = transform(data);

  return (
    <article className="card" role="region" aria-label={`Weather for ${name}`}>
      <header className="card-head">
        <h2>{name}{country ? `, ${country}` : ""}</h2>
        <div className="desc">{description}</div>
      </header>

      <div className="card-body">
        <div className="temp">{Math.round(temp)}°</div>

        <div className="grid">
          <div className="line"><div className="label">Humidity</div><div className="value">{humidity}%</div></div>
          <div className="line"><div className="label">Wind</div><div className="value">{wind_speed} m/s</div></div>
          {/* add more lines as needed */}
        </div>
      </div>
    </article>
  );
}

function transform(raw) {
  // try to be resilient in extracting fields; adapt to your API shape
  const name = raw?.name || raw?.city || "Unknown";
  const country = raw?.sys?.country || raw?.country;
  const temp = raw?.main?.temp ?? raw?.temp ?? 0;
  const description = raw?.weather?.[0]?.description || raw?.description || "";
  const humidity = raw?.main?.humidity ?? raw?.humidity ?? "-";
  const wind_speed = raw?.wind?.speed ?? raw?.wind_speed ?? "-";
  return { name, country, temp, description, humidity, wind_speed };
}
