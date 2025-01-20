"use client";

import { use,useState, useEffect } from "react";
import Link from "next/link";

export default function Contact({ params }) {
  const { id } = use(params);
  const [articulos, setArticulos] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchArticulos() {
    try {
      const url = `/api/articulos/vista?id=${id}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error al obtener el artículo");
      }

      const art = await response.json();
      setArticulos(art);
    } catch (error) {
      console.error("Hubo un error al buscar el artículo: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchArticulos();
    }
  }, [id]);

  if (loading) {
    return <p>Cargando artículo...</p>;
  }

  if (!articulos) {
    return <p>No se encontró el artículo.</p>;
  }

  return (
    <div>
      <h1>{articulos.titulo}</h1>
      <p><b>Autor:</b> {articulos.autor}</p>
      <p><b>Contenido:</b> {articulos.contenido}</p>
      <p><b>Fecha de publicación:</b> {new Date(articulos.fecha_publicacion).toLocaleDateString()}</p>
      <Link href={"/articulos"}>
      <button>Lista articulos</button>
      </Link>
    </div>
  );
}
