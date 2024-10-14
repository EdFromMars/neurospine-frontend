import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({});
  const [locacion, setLocacion] = useState('');
  const [cargando, setCargando] = useState(true);
  const [ejecutivo, setEjecutivo] = useState(false);
  const [almacen, setAlmacen] = useState(false);
  const [vendedor, setVendedor] = useState(false);
  const [administrador, setAdministrador] = useState(false);
  
  const token = localStorage.getItem('neurospinetoken');
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  const puestos = {
    ejecutivo: function() {
      setEjecutivo(true)
    },
    almacen: function() {
      setAlmacen(true)
    },
    vendedor: function() {
      setVendedor(true)
    },
    administrador: function() {
      setAdministrador(true)
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
        puestos[data.puesto]();
      } catch (error) {
        setAuth({});
        localStorage.removeItem('neurospinetoken');
      }
      
      setCargando(false);
    }
    
    autenticarUsuario();
  }, []);

  const actualizarAuth = async (datos) => {
    if (datos.coleccion === 'usuarios') {
      try {
        const { data } = await clienteAxios.get('/usuarios/perfil', config);
        setAuth(data);
        puestos[data.puesto]();
        setEjecutivo(false);
        setAlmacen(false);
        setVendedor(false);
        setAdministrador(false);
        puestos[data.puesto]();
      } catch (error) {
        console.error('Error al actualizar el perfil:', error);
      }
    }
  };

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
    setEjecutivo(false);
    setAlmacen(false);
    setVendedor(false);
    setAdministrador(false);
  }

  
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        actualizarAuth,
        puestos,
        ejecutivo,
        almacen,
        vendedor,
        administrador,
        locacion,
        setLocacion,
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