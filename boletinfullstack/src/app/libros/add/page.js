"use client";

import { useState } from "react";
import Link from "next/link";

export default function AgregarLibro() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [leido, setLeido] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/libros/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          autor,
          leido,
        }),
      });

      if (response.ok) {
        alert("Libro añadido correctamente");
        setTitulo("");
        setAutor("");
        setLeido(false);
      } else {
        alert("Error al añadir el libro.");
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      alert("Hubo un error al agregar el libro.");
    }
  };

  return (
    <div>
      <h1>Añadir Libro</h1>
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
          Autor:
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={leido}
            onChange={(e) => setLeido(e.target.checked)}
          />
          Leído
        </label>
        <br />
        <button type="submit">Añadir Libro</button>
      </form>

      <br />
      <Link href={"/libros"}>
        <button>Lista de libros</button>
      </Link>
    </div>
  );
}
