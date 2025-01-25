"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AgregarEvento() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [error, setError] = useState(null); 
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const fechaEvento = new Date(fecha);
    const fechaActual = new Date();

    if (!titulo || !descripcion || !fecha || !ubicacion) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (fechaEvento <= fechaActual) {
      setError("La fecha debe ser en el futuro.");
      return;
    }

    const response = await fetch("/api/eventos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, descripcion, fecha, ubicacion }),
    });

  };

  return (
    <div>
      <h1>Añadir Evento</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Descripción:
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Fecha:
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Ubicación:
          <input
            type="text"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Añadir Evento</button>
      </form>
      <Link href="/eventos">
        <button>Lista eventos futuros</button>
      </Link>
    </div>
  );
}
