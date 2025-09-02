function Card({ day }) {
  return (
    <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 text-white text-center mt-8 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
      <p className="text-sm text-gray-400 mb-2">{day.date}</p>
      <img
        src={`http:${day.day.condition.icon}`}
        alt={day.day.condition.text}
        className="mx-auto w-20 h-20 mb-2"
      />
      <p className="text-lg font-semibold mb-1">{day.day.condition.text}</p>
      <p className="text-2xl font-bold">{day.day.avgtemp_c}°C</p>
    </div>
  );
}

export default Card;
