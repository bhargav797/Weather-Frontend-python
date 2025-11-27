return (
  <div className="page">
    <div className="container">
      <header className="header">
        <h1>Weather Check</h1>
        <p className="sub">Search by city name or use your current location.</p>
      </header>

      <main className="main">
        <SearchBar
          onSearch={searchCity}
          onUseLocation={() => {
            setError("");
            setWeather(null);
            setLoading(true);
            if (!navigator.geolocation) {
              setError("Geolocation not supported by your browser");
              setLoading(false);
              return;
            }
            navigator.geolocation.getCurrentPosition(
              (pos) => searchByCoords(pos.coords.latitude, pos.coords.longitude),
              (err) => {
                setError("Unable to get location: " + err.message);
                setLoading(false);
              },
              { timeout: 10000 }
            );
          }}
          loading={loading}
        />

        <div className="feedback">
          {loading && <div className="muted">Loading...</div>}
          {error && <div className="error">{error}</div>}
        </div>

        <div className="result-area">
          {weather ? <WeatherCard data={weather} /> : null}
        </div>
      </main>

      <footer className="footer">
        Data provided by OpenWeatherMap. Developed by Bhargav Gol
      </footer>
    </div>
  </div>
);
