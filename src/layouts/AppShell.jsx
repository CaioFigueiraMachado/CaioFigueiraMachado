import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const pathsByRole = {
  cidadao: '/app/cidadao',
  admin: '/app/admin',
  orgao: '/app/orgao',
  parceiro: '/app/parceiro',
}

function AppShell() {
  const { user, logout } = useAuth()

  return (
    <div className="app-shell">
      <aside>
        <h1>Conecta Cidadão</h1>
        <p className="muted">{user?.name}</p>
        <nav>
          <Link to={pathsByRole[user?.role]}>Dashboard</Link>
        </nav>
        <button className="secondary" onClick={logout}>Sair</button>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AppShell
