import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth"

const Login = () => {
  const { setAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([ email, password ].includes('')){
      return setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/', { email, password });

      localStorage.setItem('neurospinetoken', data.token);

      setAuth( data );
      
      navigate('/dashboard');

    } catch (error) {
      console.log(error.response);
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
          Bienvenido al {''}<span className="text-black">Sistema de Administración</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta
          alerta = { alerta }
        ></Alerta>}
        <form onSubmit={ handleSubmit }>
          <div className="my-5">
            <input 
              type="email" 
              placeholder="Email"
              className="border w-full p-3 mt-3"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <input 
              type="password" 
              placeholder="Password"
              className="border w-full p-3 mt-3"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <input 
            type="submit" 
            value="Ingresar"
            className="bg-indigo-600 text-white w-full p-3 mt-3 cursor-pointer hover:bg-indigo-700 transition-all duration-200"
          />
          <nav className="mt-10 lg:flex lg:justify-between">
            <Link 
              className="text-center mt-2"
              to="/registrar"
            >¿No tienes una cuenta? Regístrate</Link>
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

export default Login