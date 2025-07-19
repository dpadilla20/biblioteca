export const createOrder = async (payload) => {
  const response = await fetch('http://localhost:5000/api/Orden', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.title || 'Error al crear la orden')
  }

  return response.json()
}