function IssueTable({ issues, onStatusChange, allowStatusEdit = false }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Tipo</th>
            <th>Local</th>
            <th>Status</th>
            <th>Prioridade</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id}>
              <td>{issue.title}</td>
              <td>{issue.type}</td>
              <td>{issue.location || 'Não informado'}</td>
              <td>
                {allowStatusEdit ? (
                  <select value={issue.status} onChange={(e) => onStatusChange(issue.id, e.target.value)}>
                    <option>pendente</option>
                    <option>em andamento</option>
                    <option>resolvido</option>
                  </select>
                ) : (
                  issue.status
                )}
              </td>
              <td>{issue.priority || 'média'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IssueTable
