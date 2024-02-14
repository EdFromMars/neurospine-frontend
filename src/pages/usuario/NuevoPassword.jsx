import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Alerta from "../../components/Alerta";
import clienteAxios from "../../config/clienteAxios";

const NuevoPassword = () => {

  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  
  const { token } = useParams();
  
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const url = `/usuarios/olvide-password/${token}`;
        const resultado = await clienteAxios(url, { token });
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace',
          error: true
        });
      }
    }

    comprobarToken();
  }, [tokenValido]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password.length < 6) {
      return setAlerta({
        error: true,
        msg: 'Tu contraseña debe tener al menos 6 caracteres'
      });
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;
      const resultado = await clienteAxios.post(url, { password });

      setAlerta({
        msg: resultado.data.msg
      });

      setPasswordModificado(true);

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
        Reestable tu Password y no Pierdas Acceso al {''}<span className="text-black"> Sistema de Administración</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        { msg && <Alerta alerta={alerta} /> }
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <input 
              type="password" 
              placeholder="Nuevo Password"
              className="border w-full p-3 mt-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input 
            type="submit" 
            value="Guardar Nuevo Password"
            className="bg-indigo-600 text-white w-full p-3 mt-3 cursor-pointer hover:bg-indigo-700 transition-all duration-200"
          />
        </form>
        { passwordModificado &&  
          <Link 
            to="/" 
            className="block text-center text-indigo-600 mt-5"
          >Inicia Sesión</Link>}
      </div>
    </>
  )
}

export default NuevoPassword