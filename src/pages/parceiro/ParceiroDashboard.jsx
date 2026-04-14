import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import MetricCard from '../../components/MetricCard'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../services/mockApi'

function ParceiroDashboard() {
  const { user } = useAuth()
  const [benefits, setBenefits] = useState([])
  const [form, setForm] = useState({ title: '', pointsCost: 0 })

  const load = async () => setBenefits(await api.getBenefits())
  useEffect(() => { load() }, [])

  const createBenefit = async (e) => {
    e.preventDefault()
    await api.createBenefit({ ...form, pointsCost: Number(form.pointsCost), partnerName: user.name })
    setForm({ title: '', pointsCost: 0 })
    await load()
  }

  return (
    <div className="page-grid">
      <h2>Dashboard do Parceiro</h2>

      <div className="metrics-grid">
        <MetricCard label="Benefícios criados" value={benefits.length} accent />
        <MetricCard label="Resgates totais" value={benefits.reduce((acc, item) => acc + (item.redemptions || 0), 0)} />
      </div>

      <Card title="Criar benefício">
        <form className="inline-form" onSubmit={createBenefit}>
          <input required placeholder="Título da recompensa" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input required type="number" min="1" placeholder="Pontos" value={form.pointsCost} onChange={(e) => setForm({ ...form, pointsCost: e.target.value })} />
          <button type="submit">Publicar</button>
        </form>
      </Card>

      <Card title="Gerenciar recompensas">
        <ul>
          {benefits.map((benefit) => (
            <li key={benefit.id}>{benefit.title} — {benefit.pointsCost} pts — {benefit.redemptions || 0} resgates</li>
          ))}
        </ul>
      </Card>

      <Card title="Engajamento de usuários">
        <p>Usuários ativos no último mês: 143</p>
        <p>Taxa de conversão de benefícios: 37%</p>
      </Card>
    </div>
  )
}

export default ParceiroDashboard
