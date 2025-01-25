"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function EventosPage() {
  const [eventos, setEventos] = useState([]);

  const fetchEventos = async () => {
    try {
      const response = await fetch("/api/eventos");

      const result = await response.json();

      if (result.error) {
        console.error("Error al obtener los eventos:", result.error);
        setEventos([]);
        return;
      }

      setEventos(result);
    } catch (error) {
      console.error("Error al obtener los eventos:", error.message);
      setEventos([]);
    }
  };

  const eliminarEventosPasados = async () => {
    try {
      const response = await fetch("/api/eventos", {
        method: "DELETE", 
      });

      const result = await response.json();

      if (result.error) {
        console.error("Error al eliminar los eventos:", result.error);
        return;
      }

      alert(result.message);  
      fetchEventos();  
    } catch (error) {
      console.error("Error al eliminar eventos:", error.message);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  return (
    <div>
      <h1>Próximos Eventos</h1>
      {eventos.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>Ubicación</th>
                <th>Asistentes</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((evento) => (
                <tr key={evento.id}>
                  <td>{evento.titulo}</td>
                  <td>{evento.descripcion}</td>
                  <td>{new Date(evento.fecha).toLocaleDateString()}</td>
                  <td>{evento.ubicacion}</td>
                  <td>{evento.asistentes}</td>
                  <td>
                    <Link href={`/eventos/${evento.id}`}>
                      <button>Ver Detalles</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <Link href="/eventos/add">
            <button>Añadir nuevos eventos</button>
          </Link>
        </>
      ) : (
        <p>No hay eventos próximos.</p>
      )}
      
      <br />
      <button onClick={eliminarEventosPasados}>Eliminar Eventos Pasados</button>
    </div>
  );
}
