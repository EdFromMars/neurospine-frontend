import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  
  const token = localStorage.getItem('neurospinetoken');
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  useEffect(() => {
    const autenticarUsuario = async () => {
      
      if(!token) {
        setCargando(false);
        return;
      }

      try {
        const { data } = await clienteAxios('/usuarios/perfil', config);
        setAuth(data);

      } catch (error) {
        console.log(error);
        setAuth({});
        
      }

      setCargando(false);
    }

    autenticarUsuario();
  }, []);

  const guardarBitacora = async (descripcion, acciones) => {
        
    const bitacora = {
      usuario: auth._id,
      descripcion,
      'acciones': JSON.stringify(acciones)
    }
  
    try {
      const { data } = await clienteAxios.post('/bitacora', bitacora, config);
    } catch (error) {
      console.log(error);
    }
  };
  
  const cerrarSesion = () => {
    localStorage.removeItem('neurospinetoken');
    setAuth({});
  }

  
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        guardarBitacora,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider }

export default AuthContext;