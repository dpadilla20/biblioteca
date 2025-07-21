import { useState } from 'react'
import { usePagoStore } from '../stores/usePagoStore'
import { createPagos } from '../services/pagosService'
import { useOrdenIdStore } from '../../../stores/useOrdenIdStore'

export const PagosForm = () => {
  const { payments, setPayments, clearPayments } = usePagoStore()
  const { ordenId } = useOrdenIdStore()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setMessage('')
    setError('')
    setIsLoading(true)

    try {
      const data = await createPagos({ pagoLista: payments })
      setMessage(`¡El pago se ha realizado correctamente!`)
      clearPayments()
    } catch (err) {
      setError(`Error: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaymentChange = (index, e) => {
    const { name, value } = e.target
    const newPayments = [...payments]
    newPayments[index] = { ...newPayments[index], [name]: value }
    setPayments(newPayments)
  }

  const removePayment = (index) => {
    const newPayments = payments.filter((_, i) => i !== index)
    setPayments(newPayments)
  }

  const addPayment = () => {
    setPayments([
      ...payments,
      { monto: '', metodoPago: 'Yape', estado: 'PENDIENTE', referenciaPago: '', ordenId },
    ])
  }

  if (payments.length === 0)
    <p className="text-gray-500 italic">No hay pagos en la orden. Agrega uno.</p>

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {message && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">{message}</div>
        )}
        {error && <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        {payments.map((payment, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-3 border border-purple-100 rounded-md bg-purple-50"
          >
            <div>
              <label htmlFor={`monto-${index}`} className="block text-sm font-medium text-gray-700">
                Monto
              </label>
              <input
                type="number"
                id={`monto-${index}`}
                name="monto"
                value={payment.monto}
                onChange={(e) => handlePaymentChange(index, e)}
                step="0.01"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor={`metodoPago-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Método de Pago
              </label>
              <select
                id={`metodoPago-${index}`}
                name="metodoPago"
                value={payment.metodoPago}
                onChange={(e) => handlePaymentChange(index, e)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              >
                <option value="Yape">Yape</option>
                <option value="Transferencia bancaria">Transferencia Bancaria</option>
                <option value="Visa Niubiz">Visa Niubiz</option>
                <option value="Pago Efectivo">Pago Efectivo</option>
              </select>
            </div>
            <div>
              <label
                htmlFor={`estado-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Estado
              </label>
              <select
                id={`estado-${index}`}
                name="estado"
                value={payment.estado}
                onChange={(e) => handlePaymentChange(index, e)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              >
                <option value="PENDIENTE">PENDIENTE</option>
                <option value="CONFIRMADO">CONFIRMADO</option>
                <option value="RECHAZADO">RECHAZADO</option>
              </select>
            </div>
            <div>
              <label
                htmlFor={`referenciaPago-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Referencia de Pago
              </label>
              <input
                type="text"
                id={`referenciaPago-${index}`}
                name="referenciaPago"
                value={payment.referenciaPago}
                onChange={(e) => handlePaymentChange(index, e)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            <div className="md:col-span-4 flex justify-end">
              {payments.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePayment(index)}
                  className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addPayment}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Agregar Pago
        </button>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Registrar Pago'}
          </button>
        </div>
      </form>
    </>
  )
}
