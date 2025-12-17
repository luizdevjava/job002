import { db } from './src/lib/db'
import bcrypt from 'bcryptjs'

async function seed() {
  try {
    console.log('🌱 Iniciando seed do banco de dados...')

    // Criar admin padrão
    const adminEmail = 'admin@acompanhantes.com'
    const adminPassword = 'admin123'
    
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    const adminExistente = await db.admin.findUnique({
      where: { email: adminEmail }
    })

    if (!adminExistente) {
      await db.admin.create({
        data: {
          email: adminEmail,
          password: hashedPassword
        }
      })
      console.log('✅ Admin padrão criado com sucesso!')
      console.log(`   Email: ${adminEmail}`)
      console.log(`   Senha: ${adminPassword}`)
    } else {
      console.log('ℹ️  Admin padrão já existe')
    }

    // Criar anúncios de exemplo
    const anunciosExemplo = [
      {
        nome: "Maria Sofia",
        descricao: "Olá, sou Maria Sofia! Uma loira delicada e completinha, pronta para realizar seus sonhos mais secretos. Tenho 22 anos, corpo escultural e sorriso contagiante. Adoro conversar e proporcionar momentos inesquecíveis. Meus serviços incluem massagens relaxantes, jantares românticos e muito mais. Atendo em local discreto e seguro na zona sul do Rio. Faço questão de manter nosso encontro sempre sigiloso e prazeroso para ambos. Agende já um encontro comigo e vamos desfrutar dos melhores momentos juntos!",
        bairro: "Copacabana",
        tags: "Loira, Delicada, Completinha, Massagista, GFE",
        destaque: true,
        midias: [
          { tipo: "imagem", url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=600&fit=crop&crop=face" },
          { tipo: "imagem", url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop&crop=face" },
          { tipo: "imagem", url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop&crop=face" }
        ]
      },
      {
        nome: "Ana Beatriz",
        descricao: "Morena gostosa e ativa, pronta para tudo! Tenho 25 anos, corpo atlético e muita disposição. Adoro aventuras e novos desafios. Meus serviços são completos e vou te deixar sem fôlego. Atendo em hotel ou motel, dependendo da sua preferência. Faço todos os seus desejos se tornarem realidade. Me chame e vamos marcar um encontro inesquecível!",
        bairro: "Ipanema",
        tags: "Morena, Gostosa, Ativa, Completa",
        destaque: true,
        midias: [
          { tipo: "imagem", url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop&crop=face" },
          { tipo: "imagem", url: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&h=600&fit=crop&crop=face" },
          { tipo: "imagem", url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&h=600&fit=crop&crop=face" }
        ]
      },
      {
        nome: "Juliana Santos",
        descricao: "Ruiva safada e passiva, aqui para te satisfazer! Tenho 23 anos, pele branquinha e olhos verdes que hipnotizam. Adoro me entregar nos momentos certos e ser completamente sua. Atendo em local discreto e seguro. Faço questão de manter nosso segredo bem guardado. Vamos viver momentos intensos e prazerosos juntos?",
        bairro: "Leblon",
        tags: "Ruiva, Safada, Passiva, Delicada",
        destaque: true,
        midias: [
          { tipo: "imagem", url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop&crop=face" },
          { tipo: "imagem", url: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&h=600&fit=crop&crop=face" },
          { tipo: "imagem", url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=600&fit=crop&crop=face" }
        ]
      },
      {
        nome: "Carla Dias",
        descricao: "Mulata gata e delicada, pronta para te mostrar o melhor do Rio! Tenho 24 anos, corpo de dançarina e sorriso que ilumina qualquer ambiente. Adoro conversar, dançar e proporcionar momentos únicos. Atendo em local discreto ou posso ir até você. Vamos conhecer os melhores lugares da cidade juntos?",
        bairro: "Barra",
        tags: "Mulata, Gata, Delicada, Dançarina",
        destaque: false,
        midias: [
          { tipo: "imagem", url: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&h=600&fit=crop&crop=face" },
          { tipo: "imagem", url: "https://images.unsplash.com/photo-1506863536011-592ce2835c07?w=800&h=600&fit=crop&crop=face" }
        ]
      },
      {
        nome: "Fernanda Lima",
        descricao: "Loira ativa e completinha, aqui para realizar suas fantasias! Tenho 26 anos, experiência e muita disposição. Adoro dominar e também ser dominada, depende do seu humor. Faço todos os tipos de programas e não tenho tabus. Atendo em hotel, motel ou sua residência. Vamos explorar todos os limites do prazer?",
        bairro: "Botafogo",
        tags: "Loira, Ativa, Completinha, Experiente",
        destaque: false,
        midias: [
          { tipo: "imagem", url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&h=600&fit=crop&crop=face" },
          { tipo: "imagem", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop&crop=face" }
        ]
      },
      {
        nome: "Patricia Oliveira",
        descricao: "Morena gostosa e safada, pronta para tudo! Tenho 27 anos, curvas perfeitas e muita experiência. Adoro surpreender e ser surpreendida. Meus programas são completos e vou te deixar sem palavras. Atendo em local discreto e seguro. Faço questão de que nosso momento seja especial e inesquecível. Me chame e vamos marcar!",
        bairro: "Flamengo",
        tags: "Morena, Gostosa, Safada, Experiente",
        destaque: false,
        midias: [
          { tipo: "imagem", url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=600&fit=crop&crop=face" },
          { tipo: "imagem", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=600&fit=crop&crop=face" }
        ]
      }
    ]

    const totalAnuncios = await db.anuncio.count()
    
    if (totalAnuncios === 0) {
      console.log(`📝 Criando ${anunciosExemplo.length} anúncios de exemplo...`)
      
      for (const anuncioData of anunciosExemplo) {
        const { midias, ...anuncioInfo } = anuncioData
        
        try {
          const anuncio = await db.anuncio.create({
            data: anuncioInfo
          })

          // Adicionar mídias
          for (const midia of midias) {
            await db.anuncioMidia.create({
              data: {
                anuncioId: anuncio.id,
                ...midia
              }
            })
          }
          
          console.log(`✅ Anúncio "${anuncioInfo.nome}" criado`)
        } catch (error) {
          console.error(`❌ Erro ao criar anúncio "${anuncioInfo.nome}":`, error)
        }
      }
      
      console.log(`✅ ${anunciosExemplo.length} anúncios de exemplo criados com sucesso!`)
    } else {
      console.log(`ℹ️  Já existem ${totalAnuncios} anúncios no banco`)
    }

    console.log('🎉 Seed concluído com sucesso!')

  } catch (error) {
    console.error('❌ Erro durante o seed:', error)
    process.exit(1)
  } finally {
    await db.$disconnect()
  }
}

// Executar seed apenas se chamado diretamente
if (require.main === module) {
  seed()
}

export default seed