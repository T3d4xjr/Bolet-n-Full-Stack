"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HabitosApp() {
  const [habitos, setHabitos] = useState([]);

  const fetchHabitos = async () => {
    try {
      const response = await fetch("/api/habitos");

      const result = await response.json();

      if (result.error) {
        console.error("Error al obtener los hábitos: ", result.error);
        setHabitos([]);
        return;
      }

      setHabitos(result);
    } catch (error) {
      console.error("Error al obtener los hábitos:", error.message);
      setHabitos([]);
    }
  };

  const handleComplete = async (id) => {
    try {
      const response = await fetch("/api/habitos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar el hábito. Status: ${response.status}`);
      }

      const result = await response.json();
      if (result.error) {
        console.error(result.error);
      } else {
        alert("Hábito marcado como completado.");
        fetchHabitos();
      }
    } catch (error) {
      console.error("Error al marcar el hábito como completado:", error.message);
    }
  };

  useEffect(() => {
    fetchHabitos();
  }, []);

  const habitosHoy = habitos.filter(
    (habito) => new Date(habito.fecha).toDateString() === new Date().toDateString()
  );

  return (
    <div>
      <h1>Seguimiento de Hábitos</h1>

      <h2>Hábitos de hoy</h2>
      {habitosHoy.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Completado</th>
              <th>Acción</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {habitosHoy.map((habito) => (
              <tr key={habito.id}>
                <td>{habito.nombre}</td>
                <td>{habito.descripcion || "Sin descripción"}</td>
                <td>{habito.completado ? "Sí" : "No"}</td>
                <td>
                  {!habito.completado && (
                    <button onClick={() => handleComplete(habito.id)}>
                      Marcar como completado
                    </button>
                  )}
                </td>
                <td>{habito.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay hábitos para hoy.</p>
      )}

      <br />
      <Link href="/habitos/add">
        <button>Añadir nuevos hábitos</button>
      </Link>
    </div>
  );
}
