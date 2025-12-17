# 🚀 Configuração Completa - Neon Database + Vercel

## ⚡ Setup Rápido (10 minutos)

### 1️⃣ Criar Banco Neon

1. Acesse [**Neon.tech**](https://neon.tech)
2. **Sign up** (grátis com GitHub/Google)
3. **Create Project** → Dê um nome (ex: `acompanhantes-vip`)
4. Aguarde a criação (30 segundos)

### 2️⃣ Copiar Connection Strings

No painel Neon, vá em:
```
Dashboard → Seu Projeto → Connection Details
```

Você verá duas strings importantes:

**Connection String (com PgBouncer):**
```
postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require&pgbouncer=true&connect_timeout=10
```

**Direct Connection:**
```
postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require&connect_timeout=10
```

### 3️⃣ Configurar no Vercel

No seu projeto Vercel:
1. `Settings → Environment Variables`
2. Adicione estas variáveis:

```env
# Principal (para o app funcionar)
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require&pgbouncer=true&connect_timeout=10

# Direta (para migrations/seed)
DIRECT_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require&connect_timeout=10

# Segurança
JWT_SECRET=chave-super-secreta-123456789

# URL do site
NEXT_PUBLIC_SITE_URL=https://seu-projeto.vercel.app
```

### 4️⃣ Deploy Automático

```bash
git add .
git commit -m "Configurar Neon Database"
git push origin main
```

Pronto! 🎉 Seu site estará no ar com banco PostgreSQL!

---

## 🔧 Comandos Úteis

### Desenvolvimento Local (com Neon)
```bash
# Criar .env local com as strings do Neon
cp .env.example .env
# Edite .env com suas credenciais Neon

# Gerar client Prisma
npm run db:generate

# Aplicar schema no Neon
npm run db:push

# Popular com dados de exemplo
npm run db:seed
```

### Deploy no Vercel
```bash
# Build e deploy automático
git push origin main

# O Vercel executará automaticamente:
# 1. npm run vercel-build
# 2. prisma generate
# 3. prisma db push
# 4. postbuild (seed se banco vazio)
```

---

## 🛠️ Arquivos Configurados

### `prisma/schema.prisma`
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // Otimização Neon
}
```

### `package.json` Scripts
```json
{
  "neon:setup": "npm install @prisma/adapter-neon && prisma generate",
  "neon:push": "prisma db push",
  "neon:seed": "DIRECT_URL=\"$DIRECT_URL\" tsx seed.ts",
  "vercel-build": "prisma generate && prisma db push"
}
```

---

## ✅ Verificação

Após o deploy, teste estas URLs:

1. **Site Principal**: `https://seu-projeto.vercel.app`
2. **API Anúncios**: `https://seu-projeto.vercel.app/api/anuncios`
3. **Painel Admin**: `https://seu-projeto.vercel.app/admin`

Se tudo retornar JSON (não erro 500), funcionou! 🚀

---

## 🎯 Benefícios do Neon

✅ **Grátis**: 0.5GB, 1 bilhão de row reads/mês  
✅ **Serverless**: Paga pelo que usa  
✅ **Rápido**: Baixa latência global  
✅ **Auto-scaling**: Cresce automaticamente  
✅ **Vercel Ready**: Integração nativa  
✅ **Backup**: Automático e ponto de restauração  

---

## 🔧 Troubleshooting

### Erro: "Unable to open database file"
**Causa**: Ainda está com SQLite local  
**Solução**: Verifique se configurou `DATABASE_URL` no Vercel

### Erro: "Connection timeout"
**Causa**: String de conexão incorreta  
**Solução**: Copie novamente do painel Neon

### Erro: "relation does not exist"
**Causa**: Schema não foi aplicado  
**Solução**: Execute `prisma db push` localmente ou faça novo deploy

---

## 📱 Acesso ao Painel Neon

Sempre que precisar:
- Ver logs
- Fazer backup manual
- Monitorar performance
- Resetar banco

Acesse: [**neon.tech/dashboard**](https://neon.tech/dashboard)

---

## 🎉 Resultado Final

Seu site **Acompanhantes VIP** estará:
- ✅ Online 24/7
- ✅ Com banco persistente
- ✅ Performance otimizada
- ✅ Escalável
- ✅ Seguro

Parabéns! 🚀