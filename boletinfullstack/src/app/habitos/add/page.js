"use client";

import { useState } from "react";
import Link from "next/link";

export default function AgregarHabitos() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");

  const fetchHabitos = async () => {
    const response = await fetch("/api/habitos");
    if (response.ok) {
      const data = await response.json();
      console.log("Hábitos obtenidos: ", data);
    } else {
      alert("Error al obtener los hábitos.");
    }
  };

  const handleAddHabito = async (e) => {
    e.preventDefault();

    if (!nombre || !fecha || new Date(fecha) < new Date().setHours(0, 0, 0, 0)) {
      alert("El nombre es obligatorio y la fecha debe ser válida y no estar en el pasado.");
      return;
    }

    try {
      const response = await fetch("/api/habitos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, descripcion, fecha }),
      });

      if (response.ok) {
        alert("Hábito añadido correctamente");
        setNombre("");
        setDescripcion("");
        setFecha("");
        fetchHabitos();
      } else {
        alert("Error al añadir el hábito.");
      }
    } catch (error) {
      alert("Hubo un error al agregar el hábito.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Añadir Hábito</h2>
      <form onSubmit={handleAddHabito}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Descripción:
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
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
        <button type="submit">Añadir Hábito</button>
      </form>
      <Link href="/habitos">
        <button>Ver Tabla de Hábitos</button>
      </Link>
    </div>
  );
}
