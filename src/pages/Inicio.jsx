import useAuth from "../hooks/useAuth";

const Inicio = () => {
  const { auth } = useAuth();
  
  return (
    <>
      {!auth.puesto ? (
        <p className="text-2xl font-bold">Solicita a un administrador acceso a la plataforma</p>
      ) : (
        <p>Página de inicio</p>
      )}
    </>
  )
}

export default Inicio