import axios from "axios";
import { useState } from "react";
import Card from "./Card";

function App() {
  const [forecast, setForecast] = useState([]); // começa como array vazio
  const [location, setLocation] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (!search.trim()) return; // evita buscar vazio

    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=e296cfcd560f4c4fbf403352250209&q=${search}&days=7`
      )
      .then((res) => {
        setForecast(res.data.forecast.forecastday); // pega só o array
        setLocation(res.data.location); // guarda a cidade
        setError(null); // limpa erro anterior
      })
      .catch((err) => {
        console.log("Error: ", err);
        setError("Cidade não encontrada.");
        setForecast([]);
        setLocation(null);
      });
  };

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="font-serif sm:text-2xl md:text-3xl lg:text-4xl mb-4">
          Previsão do tempo próximos 7 dias
        </h1>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Digite o nome da cidade"
          className="border rounded p-2 m-2 w-64"
        />
        <button
          onClick={handleSearch}
          disabled={!search.trim()}
          className="rounded-md w-32 bg-black text-white p-2 disabled:bg-gray-400"
        >
          Buscar
        </button>
      </div>

      {/* Mensagens de erro ou localização */}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {location && !error && (
        <h2 className="text-center font-bold text-xl mb-4">
          {location.name} - {location.country}
        </h2>
      )}

      {/* Lista de cards */}
      <div className="px-4 md:px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {forecast.map((day) => (
          <Card key={day.date} day={day} />
        ))}
      </div>
    </>
  );
}

export default App;
