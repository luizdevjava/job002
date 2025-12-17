# 🚀 Deploy Rápido no Vercel

## ⚡ Solução Imediata (5 minutos)

### 1️⃣ Criar Banco PostgreSQL GRÁTIS
Vá para [Neon.tech](https://neon.tech) → Sign up → Create Project

Copie a connection string:
```
postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
```

### 2️⃣ Configurar no Vercel
1. Vá para seu projeto no Vercel
2. Settings → Environment Variables
3. Adicione:
   ```
   DATABASE_URL = cole-a-string-do-neon-aqui
   JWT_SECRET = chave-secreta-123456
   NEXT_PUBLIC_SITE_URL = https://seu-projeto.vercel.app
   ```

### 3️⃣ Fazer Deploy
```bash
git add .
git commit -m "Configurar PostgreSQL para produção"
git push origin main
```

### 4️⃣ Acessar Site
- Site: `https://seu-projeto.vercel.app`
- Admin: `https://seu-projeto.vercel.app/admin`
- Login: admin@acompanhantes.com / admin123

---

## 🔧 Outras Opções de PostgreSQL GRÁTIS

### Supabase
1. [supabase.com](https://supabase.com) → Start Project
2. Settings → Database → Connection string
3. Copiar e configurar no Vercel

### Railway
1. [railway.app](https://railway.app) → New Project → PostgreSQL
2. Copiar DATABASE_URL
3. Configurar no Vercel

---

## ✅ Verificação
Após o deploy, acesse:
- `/api/anuncios` → Deve retornar JSON com anúncios
- `/admin` → Deve carregar página de login

Se ainda der erro, verifique se as variáveis de ambiente foram salvas corretamente no Vercel!