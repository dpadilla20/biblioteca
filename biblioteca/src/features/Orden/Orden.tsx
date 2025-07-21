import { useState } from 'react'

import { OrdenDetail } from './components/OrdenDetail'
import { OrdenDetailItems } from './components/OrdenDetailItems'
import { createOrder } from './services/orderService'
import { useOrderStore } from './store/useOrderStore'
import { useOrderDetailsStore } from './store/userOrderDetailsStore'
import { useNavigate } from 'react-router-dom'
import { useOrdenIdStore } from '../../stores/useOrdenIdStore'

export const Orden = () => {
  const navigate = useNavigate()

  const { order, resetAll } = useOrderStore()
  const { setOrdenId } = useOrdenIdStore()
  const { orderDetails, clearOrderDetails } = useOrderDetailsStore()

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setIsLoading(true)

    const payload = {
      userId: parseInt(order.userId),
      total: parseFloat(order.total),
      estado: order.estado || 'PENDIENTE',
      tipoEntrega: order.tipoEntrega,
      observaciones: order.observaciones,
      sedeId: order.tipoEntrega === 'retiro' ? parseInt(order.sedeId) : null,
      sedeNombre: order.tipoEntrega === 'retiro' ? order.sedeNombre : null,
      OrdenDetalleLista: orderDetails.map((d) => ({
        productId: parseInt(d.productId),
        productoNombre: d.productoNombre,
        tipoProducto: d.tipoProducto,
        formato: d.formato,
        cantidad: parseInt(d.cantidad),
        precioUnitario: parseFloat(d.precioUnitario),
      })),
    }

    try {
      const data = await createOrder(payload)
      setOrdenId(data.id)

      setMessage(
        `¡Se registro la orden con! ID: ${data.id} seras redirigido en unos segundos a la sección de pagos.`
      )
      resetAll()
      clearOrderDetails()
      setTimeout(() => {
        navigate('/pagos') // sin enviar el ID por URL
      }, 2500)
    } catch (err) {
      setError(`Error: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-inter">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Registro de Órdenes</h1>

        {message && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">{message}</div>
        )}
        {error && <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <OrdenDetail />
          <OrdenDetailItems />
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Registrando...' : 'Registrar Orden'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
