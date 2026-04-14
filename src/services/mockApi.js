import { storage } from './storage'

const USERS_KEY = 'cc_users'
const ISSUES_KEY = 'cc_issues'
const BENEFITS_KEY = 'cc_benefits'

const seed = () => {
  const users = storage.read(USERS_KEY, null)
  if (!users) {
    const baseUsers = [
      { id: 1, name: 'Ana Cidadã', email: 'cidadao@cc.com', password: '123456', role: 'cidadao', points: 120 },
      { id: 2, name: 'Carlos Admin', email: 'admin@cc.com', password: '123456', role: 'admin', points: 0 },
      { id: 3, name: 'Secretaria Urbana', email: 'orgao@cc.com', password: '123456', role: 'orgao', points: 0 },
      { id: 4, name: 'Comércio Parceiro', email: 'parceiro@cc.com', password: '123456', role: 'parceiro', points: 0 },
    ]
    storage.write(USERS_KEY, baseUsers)
    storage.write(ISSUES_KEY, [])
    storage.write(BENEFITS_KEY, [
      { id: 1, title: 'Vale Transporte', pointsCost: 80, partnerName: 'Comércio Parceiro', redemptions: 2 },
    ])
  }
}

seed()

export const api = {
  login: async (email, password) => {
    const users = storage.read(USERS_KEY, [])
    const user = users.find((u) => u.email === email && u.password === password)
    if (!user) throw new Error('Credenciais inválidas')
    return { ...user, password: undefined }
  },

  register: async (payload) => {
    const users = storage.read(USERS_KEY, [])
    const exists = users.some((u) => u.email === payload.email)
    if (exists) throw new Error('E-mail já cadastrado')
    const newUser = { ...payload, id: Date.now(), points: payload.role === 'cidadao' ? 0 : 0 }
    storage.write(USERS_KEY, [...users, newUser])
    return { ...newUser, password: undefined }
  },

  getIssues: async () => storage.read(ISSUES_KEY, []),

  createIssue: async (issue) => {
    const issues = storage.read(ISSUES_KEY, [])
    const newIssue = { id: Date.now(), status: 'pendente', createdAt: new Date().toISOString(), ...issue }
    storage.write(ISSUES_KEY, [newIssue, ...issues])
    return newIssue
  },

  updateIssue: async (id, changes) => {
    const issues = storage.read(ISSUES_KEY, [])
    const updated = issues.map((issue) => (issue.id === id ? { ...issue, ...changes } : issue))
    storage.write(ISSUES_KEY, updated)
  },

  getUsers: async () => storage.read(USERS_KEY, []).map((u) => ({ ...u, password: undefined })),

  getBenefits: async () => storage.read(BENEFITS_KEY, []),

  createBenefit: async (benefit) => {
    const benefits = storage.read(BENEFITS_KEY, [])
    const newBenefit = { id: Date.now(), redemptions: 0, ...benefit }
    storage.write(BENEFITS_KEY, [newBenefit, ...benefits])
  },
}
