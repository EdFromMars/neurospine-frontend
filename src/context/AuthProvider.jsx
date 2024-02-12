import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('neurospinetoken');
      
      if(!token) {
        setCargando(false);
        return;
      }
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
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
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider }

export default AuthContext;