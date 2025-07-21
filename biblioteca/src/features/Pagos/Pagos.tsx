import { PagosForm } from './components/PagosForm'

export const Pagos = () => {
  return (
    <div className="pt-5 px-3">
      <div className="border border-purple-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">Detalles de Pago</h2>
        <PagosForm />
      </div>
    </div>
  )
}
