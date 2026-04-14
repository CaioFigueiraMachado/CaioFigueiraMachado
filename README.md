# Conecta Cidadão

Sistema web completo para participação cidadã, com autenticação, dashboards por perfil e módulos para gestão de ocorrências urbanas.

## Stack
- React + Vite
- React Router
- Context API
- Mock API em `localStorage` (pronto para integrar Supabase/API real)

## Estrutura de pastas

```text
src/
  components/
    Card.jsx
    InteractiveMap.jsx
    IssueForm.jsx
    IssueTable.jsx
    MetricCard.jsx
  context/
    AuthContext.jsx
  layouts/
    AppShell.jsx
  pages/
    auth/
      LoginPage.jsx
      RegisterPage.jsx
    cidadao/
      CidadaoDashboard.jsx
    admin/
      AdminDashboard.jsx
    orgao/
      OrgaoDashboard.jsx
    parceiro/
      ParceiroDashboard.jsx
  routes/
    PrivateRoute.jsx
    RoleRoute.jsx
  services/
    mockApi.js
    storage.js
  styles/
    global.css
  utils/
    constants.js
  App.jsx
  main.jsx
```

## Funcionalidades implementadas

### Gerais
- Login e cadastro com autenticação global.
- Controle de acesso por tipo de usuário (RBAC).
- Navegação protegida com React Router.
- Layout moderno, responsivo e componente reutilizável.

### Cidadão
- Registro de problema com título, descrição, imagem e localização.
- Visualização em mapa interativo (OpenStreetMap embed com geolocalização).
- Acompanhamento de status das denúncias.
- Sistema de pontos, ranking e catálogo de benefícios.

### Administrador
- Dashboard com métricas gerais.
- Listagem e gerenciamento de usuários.
- Moderação/listagem de denúncias.

### Órgão Público
- Mapa de ocorrências.
- Filtros por status/tipo/local.
- Atualização de status e resposta nas denúncias.

### Parceiro
- Criação e gestão de benefícios.
- Definição de recompensas por pontos.
- Visualização de engajamento.

## Como executar

```bash
npm install
npm run dev
```

## Usuários de demonstração

- `cidadao@cc.com`
- `admin@cc.com`
- `orgao@cc.com`
- `parceiro@cc.com`

Senha de todos: `123456`
