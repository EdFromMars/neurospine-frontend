import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../../components/Alerta";
import axios from 'axios';

const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [locacion, setLocacion] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if([nombre, email, telefono, locacion, password, repetirPassword].includes('')) {
      return setAlerta({
        error: true,
        msg: 'Todos los campos son obligatorios'
      });
    }
    
    if(password !== repetirPassword) {
      return setAlerta({
        error: true,
        msg: 'Verifica que tu contraseña sea la misma en ambos campos'
      });
    }

    if(password.length < 6) {
      return setAlerta({ 
        error: true,
        msg: 'Tu contraseña debe tener al menos 6 caracteres'
      });
    }
    
    setAlerta({});

    try {
      const url = 'http://localhost:4000/api/usuarios/registro';
      
      const resultado = await axios.post(url, {
        nombre,
        email,
        telefono,
        password,
        locacion,
      });

      setAlerta({
        msg: "Creado correctamente, revisa tu email para activar tu cuenta",
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const { msg } = alerta;
  
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu Cuenta y Accede {''}<span className="text-black">al Sistema de Administración</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        { msg && <Alerta alerta={alerta} /> }
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <input 
              type="text" 
              placeholder="Nombre"
              className="border w-full p-3 mt-3"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <input 
              type="email" 
              placeholder="Email"
              className="border w-full p-3 mt-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <input 
              type="text" 
              placeholder="Teléfono"
              className="border w-full p-3 mt-3"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div className="my-5">
            <input 
              type="password" 
              placeholder="Password"
              className="border w-full p-3 mt-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <input 
              type="password" 
              placeholder="Repite tu Password"
              className="border w-full p-3 mt-3"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>
          <input 
            type="submit" 
            value="Registrar"
            className="bg-indigo-600 text-white w-full p-3 mt-3 cursor-pointer hover:bg-indigo-700 transition-all duration-200"
          />
          <nav className="mt-10 lg:flex lg:justify-between">
            <Link 
              className="text-center mt-2"
              to="/"
            >¿Ya tienes una cuenta? Inicia Sesión</Link>
            <Link 
              className="text-center mt-2"
              to="/olvide-password"
            >Olvidé mi password</Link>
          </nav>
        </form>
      </div>
    </>
  )
}

export default Registrar