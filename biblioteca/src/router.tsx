// src/router.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ordenRoutes } from './features/Orden/orden.routes'
import { pagosRoutes } from './features/Pagos/pagos.routes'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de Orden */}
        {ordenRoutes}

        {/* Rutas de Pagos */}
        {pagosRoutes}

        {/* Ruta por defecto */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-dvh">
              <h1 className="text-white">404 - Página no encontrada</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
