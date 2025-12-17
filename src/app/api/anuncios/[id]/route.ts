import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      )
    }

    const anuncio = await db.anuncio.findUnique({
      where: { id },
      include: {
        midias: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    })

    if (!anuncio) {
      return NextResponse.json(
        { error: 'Anúncio não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(anuncio)
  } catch (error) {
    console.error('Erro ao buscar anúncio:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar anúncio' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const {
      nome,
      descricao,
      bairro,
      tags,
      ativo,
      destaque,
      imagemUrls = [],
      videoUrl
    } = body

    // Verificar se anúncio existe
    const anuncioExistente = await db.anuncio.findUnique({
      where: { id }
    })

    if (!anuncioExistente) {
      return NextResponse.json(
        { error: 'Anúncio não encontrado' },
        { status: 404 }
      )
    }

    // Atualizar anúncio
    const anuncioAtualizado = await db.anuncio.update({
      where: { id },
      data: {
        nome,
        descricao,
        bairro,
        tags,
        ativo,
        destaque
      }
    })

    // Remover mídias existentes
    await db.anuncioMidia.deleteMany({
      where: { anuncioId: id }
    })

    // Adicionar novas mídias
    const midiasToCreate = []
    
    // Adicionar imagens
    imagemUrls.forEach((url: string, index: number) => {
      if (url && url.trim()) {
        midiasToCreate.push({
          anuncioId: id,
          tipo: 'imagem',
          url: url.trim()
        })
      }
    })

    // Adicionar vídeo se existir
    if (videoUrl && videoUrl.trim()) {
      midiasToCreate.push({
        anuncioId: id,
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
      where: { id },
      include: {
        midias: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    })

    return NextResponse.json(anuncioCompleto)
  } catch (error) {
    console.error('Erro ao atualizar anúncio:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar anúncio' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      )
    }

    // Verificar se anúncio existe
    const anuncioExistente = await db.anuncio.findUnique({
      where: { id }
    })

    if (!anuncioExistente) {
      return NextResponse.json(
        { error: 'Anúncio não encontrado' },
        { status: 404 }
      )
    }

    // Deletar anúncio (as mídias serão deletadas em cascata)
    await db.anuncio.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Anúncio deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar anúncio:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar anúncio' },
      { status: 500 }
    )
  }
}