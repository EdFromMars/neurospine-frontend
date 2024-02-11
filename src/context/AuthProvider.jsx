import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('neurospinetoken');
      console.log('Desde AuthProvider, token:', token);
      
      if(!token) {
        console.log('token no existe');
        setCargando(false);
        return;
      }
      
      console.log('token existe');
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

      console.log('llegó al final')
      setCargando(false);
    }

    autenticarUsuario();
  }, []);
  
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider }

export default AuthContext;