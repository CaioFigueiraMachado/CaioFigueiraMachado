import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import CidadaoDashboard from './pages/cidadao/CidadaoDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import OrgaoDashboard from './pages/orgao/OrgaoDashboard'
import ParceiroDashboard from './pages/parceiro/ParceiroDashboard'
import PrivateRoute from './routes/PrivateRoute'
import RoleRoute from './routes/RoleRoute'
import AppShell from './layouts/AppShell'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />

      <Route
        path="/app"
        element={
          <PrivateRoute>
            <AppShell />
          </PrivateRoute>
        }
      >
        <Route
          path="cidadao"
          element={
            <RoleRoute allowedRoles={["cidadao"]}>
              <CidadaoDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="admin"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="orgao"
          element={
            <RoleRoute allowedRoles={["orgao"]}>
              <OrgaoDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="parceiro"
          element={
            <RoleRoute allowedRoles={["parceiro"]}>
              <ParceiroDashboard />
            </RoleRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
