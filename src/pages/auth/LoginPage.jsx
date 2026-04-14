import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const redirect = {
  cidadao: '/app/cidadao',
  admin: '/app/admin',
  orgao: '/app/orgao',
  parceiro: '/app/parceiro',
}

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const user = await login(form.email, form.password)
      navigate(redirect[user.role])
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Entrar</h2>
        <p className="muted">Acesse sua conta para monitorar a cidade.</p>
        <input type="email" placeholder="E-mail" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Senha" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Entrar</button>
        <Link to="/cadastro">Criar conta</Link>
        <small className="muted">Demo: cidadao@cc.com / admin@cc.com / orgao@cc.com / parceiro@cc.com (senha: 123456)</small>
      </form>
    </div>
  )
}

export default LoginPage
