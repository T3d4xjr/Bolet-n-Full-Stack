"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function LibrosPage() {
  const [libros, setLibros] = useState([]);
  const [filtro, setFiltro] = useState("todos"); // "todos", "leidos", "no_leidos"

  async function fetchLibros() {
    const response = await fetch("/api/libros");
    const body = await response.json();
    setLibros(body);
  }

  useEffect(() => {
    fetchLibros();
  }, []);

  async function toggleLeido(id, estadoActual) {
    await fetch(`/api/libros`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, leido: !estadoActual }),
    });
    fetchLibros();
  }

  async function deleteLibro(deleteId) {
    if (window.confirm("¿Desea eliminar el libro?")) {
      await fetch("/api/libros", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteId }),
      });
      fetchLibros();
    }
  }

  const librosFiltrados = libros.filter((libro) => {
    if (filtro === "leidos") return libro.leido;
    if (filtro === "no_leidos") return !libro.leido;
    return true;
  });

  if (libros.length === 0) {
    return <p>No hay libros disponibles.</p>;
  }

  return (
    <div>
      <h1>Lista de libros</h1>

      <div>
        <label>Filtrar: </label>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="leidos">Leídos</option>
          <option value="no_leidos">No leídos</option>
        </select>
      </div>

      {librosFiltrados.map((libro) => (
        <div key={libro.id}>
            <div>
              <p>Título: {libro.titulo}</p>
              <p>Autor: <strong>{libro.autor}</strong></p>
            </div>
          
          <div>
            <label>
              <input
                type="checkbox"
                checked={libro.leido}
                onChange={() => toggleLeido(libro.id, libro.leido)}
              />
              Leído
            </label>
          </div>
          <button onClick={() => deleteLibro(libro.id)}>Eliminar</button>
        </div>
      ))}
      <Link href={"/libros/add"}>
        <button>Añadir libros</button>
      </Link>
    </div>
  );
}
