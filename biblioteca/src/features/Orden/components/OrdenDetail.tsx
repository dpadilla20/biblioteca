import { useOrderStore } from '../store/useOrderStore'

export const OrdenDetail = () => {
  const { order, updateField } = useOrderStore()

  const handleOrderChange = (e) => {
    const { name, value } = e.target
    updateField(name, value)
  }

  return (
    <div className="border border-blue-200 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Datos de la Orden</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
            User ID
          </label>
          <input
            type="number"
            id="userId"
            name="userId"
            value={order.userId}
            onChange={handleOrderChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="total" className="block text-sm font-medium text-gray-700">
            Total
          </label>
          <input
            type="number"
            id="total"
            name="total"
            value={order.total}
            onChange={handleOrderChange}
            step="0.01"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="tipoEntrega" className="block text-sm font-medium text-gray-700">
            Tipo de Entrega
          </label>
          <select
            id="tipoEntrega"
            name="tipoEntrega"
            value={order.tipoEntrega}
            onChange={handleOrderChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="retiro">Retiro en Sede</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>

        {order.tipoEntrega === 'retiro' && (
          <>
            <div>
              <label htmlFor="sedeId" className="block text-sm font-medium text-gray-700">
                Sede ID
              </label>
              <input
                type="number"
                id="sedeId"
                name="sedeId"
                value={order.sedeId}
                onChange={handleOrderChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="sedeNombre" className="block text-sm font-medium text-gray-700">
                Nombre de Sede
              </label>
              <input
                type="text"
                id="sedeNombre"
                name="sedeNombre"
                value={order.sedeNombre}
                onChange={handleOrderChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </>
        )}

        <div className="md:col-span-2">
          <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700">
            Observaciones
          </label>
          <textarea
            id="observaciones"
            name="observaciones"
            value={order.observaciones}
            onChange={handleOrderChange}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
      </div>
    </div>
  )
}
