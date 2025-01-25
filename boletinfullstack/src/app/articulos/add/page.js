"use client";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

export default function AgregarArticulo() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [autor, setAutor] = useState("");
  const [loading, setLoading] = useState(false);

  const [articuloAñadido, setArticuloAñadido] = useState(false); // Estado para controlar la redirección

  // Manejador para el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!titulo || !contenido || !autor || titulo.length > 150) {
      alert("Todos los campos son obligatorios y el título no puede superar los 150 caracteres.");
      return;
    }

    setLoading(true);

    try {
      // Solicitud POST a la API para insertar el nuevo artículo
      const response = await fetch("/api/articulos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          contenido,
          autor,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Artículo añadido correctamente");
        setArticuloAñadido(true); // Establecer el estado de éxito y redirigir manualmente
      } else {
        alert("Error al añadir el artículo: " + result.error);
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      alert("Hubo un error al agregar el artículo.");
    } finally {
      setLoading(false);
    }
  };

  // Redireccionar cuando el artículo sea añadido exitosamente
  useEffect(() => {
  }, [articuloAñadido]);

  return (
    <div>
      <h1>Añadir Artículo</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            maxLength={150}
          />
        </label>
        <br />
        <label>
          Contenido:
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
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
        <button type="submit" disabled={loading}>
          {loading ? "Añadiendo..." : "Añadir Artículo"}
        </button>
      </form>

      <br />
      <Link href={"/articulos"}>
      <button>Lista articulos</button>
      </Link>
    </div>
  );
}
