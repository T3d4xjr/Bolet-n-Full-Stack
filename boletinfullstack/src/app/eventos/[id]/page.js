"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";

export default function VistaEvento({ params }) {
  const { id } = use(params);
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchEvento() {
    try {
      const url = `/api/eventos/vista?id=${id}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al obtener los datos del evento.");
      }
      const event = await response.json();
      setEvento(event);
    } catch (error) {
      console.error("Hubo un error al buscar el evento: ", error);
    } finally {
      setLoading(false);
    }
  }

  async function registrarAsistente() {
    try {
      const url = `/api/eventos/vista?id=${id}`; 
      const response = await fetch(url, {
        method: 'POST', 
      });

      if (!response.ok) {
        throw new Error("Error al registrar el asistente.");
      }
      const data = await response.json();
      alert(data.message);
      fetchEvento();
    } catch (error) {
      console.error("Hubo un error al registrar el asistente:", error);
    }
  }

  useEffect(() => {
    if (id) {
      fetchEvento();
    }
  }, [id]);

  if (loading) {
    return <p>Cargando evento...</p>;
  }

  if (!evento) {
    return <p>No se encontró el evento.</p>;
  }

  return (
    <div>
      <h1>{evento.titulo}</h1>
      <p><b>Descripción:</b> {evento.descripcion}</p>
      <p><b>Fecha:</b> {new Date(evento.fecha).toLocaleDateString()}</p>
      <p><b>Ubicación:</b> {evento.ubicacion}</p>
      <p><b>Asistentes:</b> {evento.asistentes}</p>

      <button onClick={registrarAsistente}>Registrar Asistencia</button>

      <Link href="/eventos">
        <button>Lista de eventos futuros</button>
      </Link>
    </div>
  );
}
