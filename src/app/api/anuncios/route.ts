import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const destaque = searchParams.get('destaque')
    const ativo = searchParams.get('ativo')
    const tags = searchParams.get('tags')
    const bairro = searchParams.get('bairro')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')

    // Construir filtro
    const where: any = {}
    
    if (destaque === 'true') {
      where.destaque = true
    }
    
    if (ativo === 'true') {
      where.ativo = true
    } else if (ativo === 'false') {
      where.ativo = false
    }
    
    if (tags) {
      const tagsArray = tags.split(',').map(tag => tag.trim())
      where.tags = {
        contains: tagsArray[0] // Simplificado - em produção poderia usar OR para múltiplas tags
      }
    }
    
    if (bairro) {
      where.bairro = {
        contains: bairro
      }
    }

    // Buscar anúncios
    const anuncios = await db.anuncio.findMany({
      where,
      include: {
        midias: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      },
      orderBy: [
        { destaque: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit ? parseInt(limit) : undefined,
      skip: offset ? parseInt(offset) : undefined
    })

    // Buscar total para paginação
    const total = await db.anuncio.count({ where })

    return NextResponse.json({
      anuncios,
      total,
      limit: limit ? parseInt(limit) : null,
      offset: offset ? parseInt(offset) : null
    })
  } catch (error) {
    console.error('Erro ao buscar anúncios:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar anúncios' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      nome,
      descricao,
      bairro,
      tags,
      ativo = true,
      destaque = false,
      imagemUrls = [],
      videoUrl
    } = body

    // Validar campos obrigatórios
    if (!nome || !descricao) {
      return NextResponse.json(
        { error: 'Nome e descrição são obrigatórios' },
        { status: 400 }
      )
    }

    // Criar anúncio
    const anuncio = await db.anuncio.create({
      data: {
        nome,
        descricao,
        bairro,
        tags,
        ativo,
        destaque
      }
    })

    // Adicionar mídias
    const midiasToCreate = []
    
    // Adicionar imagens
    imagemUrls.forEach((url: string, index: number) => {
      if (url && url.trim()) {
        midiasToCreate.push({
          anuncioId: anuncio.id,
          tipo: 'imagem',
          url: url.trim()
        })
      }
    })

    // Adicionar vídeo se existir
    if (videoUrl && videoUrl.trim()) {
      midiasToCreate.push({
        anuncioId: anuncio.id,
        tipo: 'video',
        url: videoUrl.trim()
      })
    }

    if (midiasToCreate.length > 0) {
      await db.anuncioMidia.createMany({
        data: midiasToCreate
      })
    }

    // Buscar anúncio completo com mídias
    const anuncioCompleto = await db.anuncio.findUnique({
      where: { id: anuncio.id },
      include: {
        midias: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    })

    return NextResponse.json(anuncioCompleto, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar anúncio:', error)
    return NextResponse.json(
      { error: 'Erro ao criar anúncio' },
      { status: 500 }
    )
  }
}