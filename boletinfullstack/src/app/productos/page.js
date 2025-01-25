"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [stockUpdate, setStockUpdate] = useState({ id: null, stock: 0 });

  async function fetchProductos() {
    const response = await fetch("/api/productos");
    const body = await response.json();
    setProductos(body);
  }

  async function handleUpdateStock(e, id) {
    e.preventDefault();
    const updatedStock = stockUpdate.stock;

    if (updatedStock < 0) {
      alert("El stock no puede ser negativo.");
      return;
    }

    const response = await fetch("/api/productos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, stock: updatedStock }),
    });

    if (!response.ok) {
      alert("Error al actualizar el stock.");
      return;
    }

    fetchProductos();
    setStockUpdate({ id: null, stock: 0 });
  }

  useEffect(() => {
    fetchProductos();
  }, []);

  if (productos.length === 0) {
    return <p>No hay artículos disponibles.</p>;
  }

  return (
    <div>
      <h1>Lista de productos</h1>
      {productos.map((producto) => (
        <div key={producto.id}>
          <table border="1">
            <thead>
              <tr>
                <th colSpan="2">Detalles del Producto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Nombre</th>
                <td>{producto.nombre}</td>
              </tr>
              <tr>
                <th>Descripción</th>
                <td>{producto.descripcion}</td>
              </tr>
              <tr>
                <th>Precio</th>
                <td>{producto.precio}</td>
              </tr>
              <tr>
                <th>Stock</th>
                <td style={{ color: producto.stock === 0 ? "red" : "white" }}>
                  {producto.stock}
                </td>
              </tr>
            </tbody>
          </table>

          <div>
            <form
              onSubmit={(e) => handleUpdateStock(e, producto.id)} 
            >
              <input
                type="number"
                placeholder="Actualizar stock"
                value={stockUpdate.id === producto.id ? stockUpdate.stock : ""}
                onChange={(e) =>
                  setStockUpdate({
                    id: producto.id,
                    stock: Number(e.target.value),
                  })
                }
              />
              <button type="submit">Actualizar Stock</button>
            </form>
          </div>
        </div>
      ))}

      <Link href={"/productos/add"}>
        <button>Añadir productos</button>
      </Link>
    </div>
  );
}
