import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import IssueTable from '../../components/IssueTable'
import MetricCard from '../../components/MetricCard'
import { api } from '../../services/mockApi'

function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [issues, setIssues] = useState([])

  useEffect(() => {
    Promise.all([api.getUsers(), api.getIssues()]).then(([usersData, issuesData]) => {
      setUsers(usersData)
      setIssues(issuesData)
    })
  }, [])

  return (
    <div className="page-grid">
      <h2>Dashboard do Administrador</h2>
      <div className="metrics-grid">
        <MetricCard label="Usuários" value={users.length} accent />
        <MetricCard label="Problemas registrados" value={issues.length} />
        <MetricCard label="Problemas resolvidos" value={issues.filter((i) => i.status === 'resolvido').length} />
      </div>

      <Card title="Gerenciar usuários">
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name} — {user.role}</li>
          ))}
        </ul>
      </Card>

      <Card title="Gerenciar e moderar denúncias">
        <IssueTable issues={issues} />
      </Card>
    </div>
  )
}

export default AdminDashboard
