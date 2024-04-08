import React from 'react'

const AgregarProgramacionProductos = ({visibility, productos, productosProgramacion, setProductosProgramacion}) => {
  return (
    <div className={`space-y-12 datos-programacion ${visibility.datos}`}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Productos del Pedido</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Agrega los productos que serán parte de la programación.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="tipo-programacion" className="block text-sm font-medium leading-6 text-gray-900">
              Tipo de Programación
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgregarProgramacionProductos