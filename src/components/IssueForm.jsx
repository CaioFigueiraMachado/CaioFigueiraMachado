import { useState } from 'react'
import { ISSUE_TYPES } from '../utils/constants'

function IssueForm({ onSubmit }) {
  const [form, setForm] = useState({ title: '', description: '', type: ISSUE_TYPES[0], location: '', image: '' })

  const handleImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm((prev) => ({ ...prev, image: reader.result }))
    reader.readAsDataURL(file)
  }

  return (
    <form
      className="grid-form"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(form)
        setForm({ title: '', description: '', type: ISSUE_TYPES[0], location: '', image: '' })
      }}
    >
      <input required placeholder="Título do problema" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <textarea required placeholder="Descrição detalhada" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
        {ISSUE_TYPES.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </select>
      <input placeholder="Localização" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <input type="file" accept="image/*" onChange={handleImage} />
      <button type="submit">Registrar ocorrência</button>
    </form>
  )
}

export default IssueForm
