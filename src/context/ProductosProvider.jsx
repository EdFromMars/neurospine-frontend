import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const token = localStorage.getItem('neurospinetoken');
        if(!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
        const { data } = await clienteAxios.get('/productos', config);
        setProductos(data);
      } catch (error) {
        console.log(error);
      }
    }

    obtenerProductos();
  }, [auth]);
  
  const guardarProducto = async (producto) => {

    const token = localStorage.getItem('neurospinetoken');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    try {
      
      const { data } = await clienteAxios.post('/productos', producto, config);

      setProductos([
        ...productos,
        data
      ]);

    } catch (error) {
      console.log(error);
    }
  };

  const mostrarProducto = async (id) => {
    try {
      const token = localStorage.getItem('neurospinetoken');
      if(!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.get(`/productos/${id}`, config);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
    
  return (
    <ProductosContext.Provider 
      value={{
        productos,
        guardarProducto,
        mostrarProducto
      }}
    >
      {children}
    </ProductosContext.Provider>
  )
};

export default ProductosContext;