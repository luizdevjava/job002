import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/db'

const JWT_SECRET = process.env.JWT_SECRET || 'seu-secret-key-aqui'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validar campos
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar admin no banco
    const admin = await db.admin.findUnique({
      where: { email }
    })

    if (!admin) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(password, admin.password)
    
    if (!senhaValida) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Gerar token JWT
    const token = jwt.sign(
      { 
        id: admin.id, 
        email: admin.email 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Retornar token e informações do admin (sem a senha)
    return NextResponse.json({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        createdAt: admin.createdAt
      }
    })

  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}