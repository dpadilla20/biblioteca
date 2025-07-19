import { useOrderDetailsStore } from '../store/userOrderDetailsStore'

export const OrdenDetailItems = () => {
  const { orderDetails, setOrderDetails } = useOrderDetailsStore()

  const addOrderDetail = () => {
    setOrderDetails([
      ...orderDetails,
      {
        productId: '',
        productoNombre: '',
        tipoProducto: '',
        formato: '',
        cantidad: '',
        precioUnitario: '',
      },
    ])
  }

  const handleOrderDetailChange = (index, e) => {
    const { name, value } = e.target
    const newOrderDetails = [...orderDetails]
    newOrderDetails[index] = { ...newOrderDetails[index], [name]: value }
    setOrderDetails(newOrderDetails)
  }

  const removeOrderDetail = (index) => {
    const newOrderDetails = orderDetails.filter((_, i) => i !== index)
    setOrderDetails(newOrderDetails)
  }

  return (
    <div className="border border-green-200 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Detalles de la Orden</h2>

      {orderDetails.length === 0 && (
        <p className="text-gray-500 italic">No hay ítems en la orden. Agrega uno.</p>
      )}

      {orderDetails?.map((detail, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4 p-3 border border-green-100 rounded-md bg-green-50"
        >
          <input
            type="text"
            name="productoNombre"
            placeholder="Nombre del producto"
            value={detail.productoNombre}
            onChange={(e) => handleOrderDetailChange(index, e)}
            className="col-span-1 p-2 border rounded"
          />
          <input
            type="text"
            name="tipoProducto"
            placeholder="Tipo"
            value={detail.tipoProducto}
            onChange={(e) => handleOrderDetailChange(index, e)}
            className="col-span-1 p-2 border rounded"
          />
          <input
            type="text"
            name="formato"
            placeholder="Formato"
            value={detail.formato}
            onChange={(e) => handleOrderDetailChange(index, e)}
            className="col-span-1 p-2 border rounded"
          />
          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            value={detail.cantidad}
            onChange={(e) => handleOrderDetailChange(index, e)}
            className="col-span-1 p-2 border rounded"
          />
          <input
            type="number"
            step="0.01"
            name="precioUnitario"
            placeholder="Precio Unitario"
            value={detail.precioUnitario}
            onChange={(e) => handleOrderDetailChange(index, e)}
            className="col-span-1 p-2 border rounded"
          />
          <div className="col-span-1 flex items-center justify-end">
            {orderDetails.length > 1 && (
              <button
                type="button"
                onClick={() => removeOrderDetail(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Quitar
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addOrderDetail}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
      >
        Agregar Item
      </button>
    </div>
  )
}
