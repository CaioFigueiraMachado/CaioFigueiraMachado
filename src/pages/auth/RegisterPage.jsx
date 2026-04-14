import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const roles = [
  { value: 'cidadao', label: 'Cidadão' },
  { value: 'admin', label: 'Administrador' },
  { value: 'orgao', label: 'Órgão Público' },
  { value: 'parceiro', label: 'Parceiro' },
]

const redirect = {
  cidadao: '/app/cidadao',
  admin: '/app/admin',
  orgao: '/app/orgao',
  parceiro: '/app/parceiro',
}

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'cidadao' })
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const user = await register(form)
      navigate(redirect[user.role])
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Criar conta</h2>
        <input required placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="email" required placeholder="E-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" required placeholder="Senha" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          {roles.map((role) => (
            <option key={role.value} value={role.value}>{role.label}</option>
          ))}
        </select>
        {error && <p className="error">{error}</p>}
        <button type="submit">Cadastrar</button>
        <Link to="/login">Já tenho conta</Link>
      </form>
    </div>
  )
}

export default RegisterPage
