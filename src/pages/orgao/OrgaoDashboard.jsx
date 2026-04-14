import { useEffect, useMemo, useState } from 'react'
import Card from '../../components/Card'
import InteractiveMap from '../../components/InteractiveMap'
import IssueTable from '../../components/IssueTable'
import { api } from '../../services/mockApi'

function OrgaoDashboard() {
  const [issues, setIssues] = useState([])
  const [filter, setFilter] = useState({ status: 'todos', type: 'todos', location: '' })

  const load = async () => setIssues(await api.getIssues())

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(
    () => issues.filter((i) =>
      (filter.status === 'todos' || i.status === filter.status)
      && (filter.type === 'todos' || i.type === filter.type)
      && (!filter.location || i.location?.toLowerCase().includes(filter.location.toLowerCase()))),
    [issues, filter],
  )

  const updateStatus = async (id, status) => {
    await api.updateIssue(id, { status, response: `Atualizado pelo órgão em ${new Date().toLocaleDateString('pt-BR')}` })
    await load()
  }

  return (
    <div className="page-grid">
      <h2>Painel do Órgão Público</h2>

      <Card title="Mapa de ocorrências">
        <InteractiveMap />
      </Card>

      <Card title="Filtros">
        <div className="filters">
          <select value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
            <option value="todos">Todos os status</option>
            <option value="pendente">Pendente</option>
            <option value="em andamento">Em andamento</option>
            <option value="resolvido">Resolvido</option>
          </select>
          <input placeholder="Filtrar por tipo" value={filter.type === 'todos' ? '' : filter.type} onChange={(e) => setFilter({ ...filter, type: e.target.value || 'todos' })} />
          <input placeholder="Filtrar por localização" value={filter.location} onChange={(e) => setFilter({ ...filter, location: e.target.value })} />
        </div>
      </Card>

      <Card title="Atualizar status e responder denúncias">
        <IssueTable issues={filtered} onStatusChange={updateStatus} allowStatusEdit />
      </Card>
    </div>
  )
}

export default OrgaoDashboard
