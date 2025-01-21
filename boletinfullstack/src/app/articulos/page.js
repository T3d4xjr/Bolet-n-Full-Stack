"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ArticulosPage() {
  const [articulos, setArticulos] = useState([]);
  async function fetchArticulos() {
    const response = await fetch("/api/articulos");
    const body = await response.json();
    setArticulos(body);
  }
  
  useEffect(() => {
    fetchArticulos();
  }, []);

  async function deleteArticulo(deleteId) {
    if (window.confirm("Desea eliminar el contacto")) {
      await fetch("/api/articulos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteId }),
      });
      fetchArticulos();
    }
  }

  if (articulos.length === 0) {
    return <p>No hay artículos disponibles.</p>;
  }
  return (
    <div>
      <h1>Lista de artículos</h1>
      {articulos.map((articulo) => (
        <div key={articulo.id}>
          <Link href={"/articulos/" + articulo.id}>

              <p>Titulo: {articulo.titulo}</p>
              <p>
                Autor: <strong>{articulo.autor}</strong>
              </p>
              <p>
                Fecha publicación:
                {new Date(articulo.fecha_publicacion).toLocaleDateString()}
              </p>
          </Link>
          <button onClick={() => deleteArticulo(articulo.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
