"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({ nombre: "",descripcion:"", precio: "", stock: 0 });

  async function fetchProductos() {
    const response = await fetch("/api/productos");
    const body = await response.json();
    setProductos(body);
  }

  useEffect(() => {
    fetchProductos();
  }, []);

  async function handleAddProducto(e) {
    e.preventDefault();
    const { nombre,descripcion, precio, stock } = formData;

    // Validaciones
    if (!nombre || !precio || Number(precio) <= 0) {
      alert("El nombre y el precio son obligatorios y deben ser válidos.");
      return;
    }
    if (Number(stock) < 0) {
      alert("El stock no puede ser negativo.");
      return;
    }

    await fetch("/api/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setFormData({ nombre: "", descripcion:"",precio: "", stock: 0 });
    fetchProductos();
  }
  return (
    <div>
      <h1>Gestión de Productos</h1>

      <h2>Añadir Producto</h2>
      <form onSubmit={handleAddProducto}>
        <input
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripcion"
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={formData.precio}
          onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
        />
        <button type="submit">Añadir Producto</button>
      </form>
      <Link href={"/productos"}>
      <button>Lista productos</button>
      </Link>
    </div>
  );
}
