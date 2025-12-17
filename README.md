# Acompanhantes VIP

Site moderno e intuitivo de anúncios de acompanhantes, desenvolvido com Next.js 15, TypeScript, Tailwind CSS e **Neon PostgreSQL**.

## 🚀 Funcionalidades

### Página Principal
- **Slider de Destaques**: Exibe até 3 anúncios em destaque com navegação automática
- **Galeria de Anúncios**: Grid responsivo com todos os anúncios ativos
- **Sistema de Filtros**: Filtre por tags e bairro
- **Design Responsivo**: Mobile-first com layout adaptativo

### Página do Anúncio
- **Galeria de Imagens**: Até 5 fotos com navegação por thumbnails
- **Vídeo Embed**: Suporte para 1 vídeo via URL
- **Informações Completas**: Nome, descrição, tags, bairro
- **Anúncios Relacionados**: Slider lateral e seção final com outros destaques

### Painel Administrativo
- **Login Seguro**: Autenticação via JWT
- **CRUD Completo**: Criar, editar, ativar/desativar, excluir anúncios
- **Gestão de Destaques**: Marcar/desmarcar anúncios como destaque
- **Interface Intuitiva**: Dashboard com estatísticas e gerenciamento visual

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Banco de Dados**: **Neon PostgreSQL** (serverless, escalável)
- **Autenticação**: JWT com bcryptjs
- **Imagens**: URLs externas (sem upload)
- **Deploy**: Vercel otimizado

---

## 🌟 **NOVO: Configuração com Neon Database**

Este projeto agora usa **Neon PostgreSQL** - banco serverless, rápido e gratuito!

### ⚡ Setup em 5 minutos

#### 1️⃣ Criar Banco Neon
1. Acesse [**neon.tech**](https://neon.tech) → Sign up (grátis)
2. Create Project → Nome: `acompanhantes-vip`
3. Copie as connection strings

#### 2️⃣ Configurar no Vercel
No projeto Vercel → Settings → Environment Variables:
```env
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require&pgbouncer=true&connect_timeout=10
DIRECT_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require&connect_timeout=10
JWT_SECRET=chave-super-secreta-123456
NEXT_PUBLIC_SITE_URL=https://seu-projeto.vercel.app
```

#### 3️⃣ Deploy
```bash
git add .
git commit -m "Configurar Neon Database"
git push origin main
```

📖 **Guia completo**: `NEON-SETUP.md`

---

## 📋 Instalação Local

### Com Neon (Recomendado)
1. **Clonar e instalar**
```bash
git clone <repositório>
cd acompanhantes-vip
npm install
npm run neon:setup
```

2. **Configurar ambiente**
```bash
cp .env.example .env
# Edite .env com suas credenciais Neon
```

3. **Testar conexão**
```bash
npm run db:test
```

4. **Popular banco**
```bash
npm run db:seed
```

5. **Executar**
```bash
npm run dev
```

### Com SQLite (Desenvolvimento)
Use o arquivo `.env.local` com:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="secret-local"
```

## 🔐 Credenciais de Acesso

### Admin
- **Email**: admin@acompanhantes.com
- **Senha**: admin123

> ⚠️ **Importante**: Altere as credenciais em produção!

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas Next.js
│   ├── api/               # APIs REST
│   │   ├── anuncios/      # CRUD de anúncios
│   │   └── auth/          # Autenticação
│   ├── admin/             # Painel administrativo
│   ├── anuncio/[id]/      # Página individual
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ui/               # shadcn/ui components
│   ├── AnuncioCard.tsx   # Card de anúncio
│   ├── Filters.tsx        # Sistema de filtros
│   └── Slider.tsx         # Slider de destaques
├── hooks/                # Hooks personalizados
│   └── useAnuncios.ts     # Hook para buscar anúncios
└── lib/                  # Utilitários
    └── db.ts             # Cliente Prisma
```

## 🎨 Personalização

### Cores
O tema usa roxo como cor principal. Para alterar:
- Procure por `purple-600` nos arquivos CSS/TSX
- Altere para a cor desejada (ex: `pink-600`, `blue-600`)

### Tags e Bairros
Edite o componente `Filters.tsx` para personalizar:
- Tags disponíveis
- Lista de bairros
- Categorias de filtros

## 📱 Deploy

### Vercel com Neon (Recomendado)
1. Configure as variáveis de ambiente (ver acima)
2. Push para o repositório
3. Deploy automático no Vercel

### Scripts Úteis
```bash
# Testar conexão com banco
npm run db:test

# Setup completo Neon
npm run neon:setup

# Apenas push do schema
npm run neon:push

# Seed com diret URL
npm run neon:seed
```

## 🔧 Manutenção

### Backup do Banco (Neon)
O Neon faz backup automaticamente, mas você pode:
```bash
# Exportar dados
npm run db:seed --export

# Resetar banco (cuidado!)
npm run db:reset
```

## 📝 Features Futuras

- [ ] Sistema de favoritos
- [ ] Avaliações e comentários
- [ ] Busca avançada
- [ ] Sistema de denúncias
- [ ] Notificações push
- [ ] App mobile PWA

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit suas mudanças: `git commit -m 'Add nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e proprietário. Todos os direitos reservados.

## ⚠️ Aviso Legal

Este site é uma plataforma de anúncios e não se responsabiliza pelo conteúdo publicado. 
Todos os anúncios são de responsabilidade exclusiva dos anunciantes.
É proibido o acesso por menores de 18 anos.

---

**Desenvolvido com ❤️ usando Next.js 15 + Neon PostgreSQL**