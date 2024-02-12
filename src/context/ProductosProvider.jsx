import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";

const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

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

      console.log(data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
    
  return (
    <ProductosContext.Provider 
      value={{
        productos,
        guardarProducto
      }}
    >
      {children}
    </ProductosContext.Provider>
  )
};

export default ProductosContext;