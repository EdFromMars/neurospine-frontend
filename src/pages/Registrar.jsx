import { useState } from "react";
import { Link } from "react-router-dom";

const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu Cuenta y Accede {''}<span className="text-black">al Sistema de Administración</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <form>
          <div className="my-5">
            <input 
              type="text" 
              placeholder="Nombre"
              className="border w-full p-3 mt-3"
              value={nombre}
            />
          </div>
          <div className="my-5">
            <input 
              type="email" 
              placeholder="Email"
              className="border w-full p-3 mt-3"
            />
          </div>
          <div className="my-5">
            <input 
              type="text" 
              placeholder="Teléfono"
              className="border w-full p-3 mt-3"
            />
          </div>
          <div className="my-5">
            <input 
              type="password" 
              placeholder="Password"
              className="border w-full p-3 mt-3"
            />
          </div>
          <div className="my-5">
            <input 
              type="password" 
              placeholder="Repite tu Password"
              className="border w-full p-3 mt-3"
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