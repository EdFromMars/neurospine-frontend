import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({});
  
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('neurospinetoken');
      if(!token) return;

      const config = {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await clienteAxios.get('/usuarios/perfil', config);

        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }
    }

    autenticarUsuario();
  }, []);
  
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }

export default AuthContext;