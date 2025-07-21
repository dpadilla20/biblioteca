export const createPagos = async (payload) => {
  const response = await fetch('http://localhost:5000/api/Pagos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.title || 'Error al crear el pago')
  }

  return response.json()
}