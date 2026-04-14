import { useEffect, useMemo, useState } from 'react'
import Card from '../../components/Card'
import InteractiveMap from '../../components/InteractiveMap'
import IssueForm from '../../components/IssueForm'
import IssueTable from '../../components/IssueTable'
import MetricCard from '../../components/MetricCard'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../services/mockApi'

function CidadaoDashboard() {
  const { user } = useAuth()
  const [issues, setIssues] = useState([])
  const [benefits, setBenefits] = useState([])

  const myIssues = useMemo(() => issues.filter((issue) => issue.authorId === user.id), [issues, user.id])
  const ranking = useMemo(() => [
    { name: user.name, points: user.points || 0 },
    { name: 'João Silva', points: 200 },
    { name: 'Maria Souza', points: 150 },
  ].sort((a, b) => b.points - a.points), [user.name, user.points])

  const loadData = async () => {
    const [issuesData, benefitsData] = await Promise.all([api.getIssues(), api.getBenefits()])
    setIssues(issuesData)
    setBenefits(benefitsData)
  }

  useEffect(() => {
    loadData()
  }, [])

  const onCreateIssue = async (form) => {
    await api.createIssue({ ...form, authorId: user.id, priority: 'média' })
    await loadData()
  }

  return (
    <div className="page-grid">
      <h2>Dashboard do Cidadão</h2>
      <div className="metrics-grid">
        <MetricCard label="Pontos" value={user.points || 0} accent />
        <MetricCard label="Minhas denúncias" value={myIssues.length} />
        <MetricCard label="Resolvidas" value={myIssues.filter((i) => i.status === 'resolvido').length} />
      </div>

      <Card title="Registrar problema urbano">
        <IssueForm onSubmit={onCreateIssue} />
      </Card>

      <Card title="Mapa interativo">
        <InteractiveMap />
      </Card>

      <Card title="Acompanhamento das denúncias">
        <IssueTable issues={myIssues} />
      </Card>

      <Card title="Ranking de participação">
        <ol>
          {ranking.map((r) => (
            <li key={r.name}>{r.name} — {r.points} pts</li>
          ))}
        </ol>
      </Card>

      <Card title="Trocar pontos por benefícios" subtitle="Selecione uma recompensa dos parceiros">
        <ul>
          {benefits.map((benefit) => (
            <li key={benefit.id}>{benefit.title} - {benefit.pointsCost} pontos</li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

export default CidadaoDashboard
