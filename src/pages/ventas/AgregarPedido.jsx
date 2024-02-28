import FormularioAgregarPedido from "../../components/ventas/FormularioAgregarPedido";

const AgregarPedido = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full">
          <div>AgregarPedido</div>
          <FormularioAgregarPedido />
        </div>
      </div>
    </>
  )
}

export default AgregarPedido