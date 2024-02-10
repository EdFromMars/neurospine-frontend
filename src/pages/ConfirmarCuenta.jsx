import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {

  const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false);
  const [ cargando, setCargando ] = useState(true);
  const [ alerta, setAlerta ] = useState({});
  
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `http://localhost:4000/api/usuarios/confirmar/${id}`;
        const resultado = await axios.get(url);

        setCuentaConfirmada(true);

        setAlerta({
          msg: resultado.data.msg
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }

      setCargando(false);
    }

    confirmarCuenta();
  }, []);

  const { msg } = alerta;
  
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu Cuenta y Accede {''}<span className="text-black">al Sistema de Administración</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        { !cargando && <Alerta alerta={alerta} /> }
        { cuentaConfirmada && 
          <Link 
            to="/" 
            className="block text-center my-5 text-gray-500"
          >Iniciar Sesión</Link>
        }
      </div>
    </>
  )
}

export default ConfirmarCuenta