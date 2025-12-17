'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star, 
  LogOut,
  Users,
  TrendingUp,
  Settings,
  ArrowLeft
} from 'lucide-react'

// Mock data - em produção virá da API
const mockAnuncios = [
  {
    id: 1,
    nome: "Maria Sofia",
    descricao: "Olá, sou Maria Sofia! Uma loira delicada e completinha...",
    bairro: "Copacabana",
    tags: "Loira, Delicada, Completinha",
    ativo: true,
    destaque: true,
    createdAt: "2024-01-15",
    midias: [
      { id: 1, tipo: "imagem", url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face" }
    ]
  },
  {
    id: 2,
    nome: "Ana Beatriz",
    descricao: "Morena gostosa e ativa, pronta para tudo...",
    bairro: "Ipanema",
    tags: "Morena, Gostosa, Ativa",
    ativo: true,
    destaque: true,
    createdAt: "2024-01-14",
    midias: [
      { id: 2, tipo: "imagem", url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face" }
    ]
  },
  {
    id: 3,
    nome: "Juliana Santos",
    descricao: "Ruiva safada e passiva...",
    bairro: "Leblon",
    tags: "Ruiva, Safada, Passiva",
    ativo: false,
    destaque: false,
    createdAt: "2024-01-13",
    midias: [
      { id: 3, tipo: "imagem", url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" }
    ]
  }
]

export default function AdminDashboard() {
  const router = useRouter()
  const [anuncios, setAnuncios] = useState(mockAnuncios)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingAnuncio, setEditingAnuncio] = useState<any>(null)
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    bairro: '',
    tags: '',
    imagemUrls: '',
    videoUrl: '',
    ativo: true,
    destaque: false
  })

  useEffect(() => {
    // Verificar autenticação
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin')
  }

  const handleCreateAnuncio = () => {
    setEditingAnuncio(null)
    setFormData({
      nome: '',
      descricao: '',
      bairro: '',
      tags: '',
      imagemUrls: '',
      videoUrl: '',
      ativo: true,
      destaque: false
    })
    setShowCreateForm(true)
  }

  const handleEditAnuncio = (anuncio: any) => {
    setEditingAnuncio(anuncio)
    setFormData({
      nome: anuncio.nome,
      descricao: anuncio.descricao,
      bairro: anuncio.bairro || '',
      tags: anuncio.tags || '',
      imagemUrls: anuncio.midias.filter((m: any) => m.tipo === 'imagem').map((m: any) => m.url).join('\n'),
      videoUrl: anuncio.midias.find((m: any) => m.tipo === 'video')?.url || '',
      ativo: anuncio.ativo,
      destaque: anuncio.destaque
    })
    setShowCreateForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulação de salvamento - em produção faria chamada à API
    if (editingAnuncio) {
      // Editar anúncio existente
      setAnuncios(prev => prev.map(a => 
        a.id === editingAnuncio.id 
          ? {
              ...a,
              nome: formData.nome,
              descricao: formData.descricao,
              bairro: formData.bairro,
              tags: formData.tags,
              ativo: formData.ativo,
              destaque: formData.destaque
            }
          : a
      ))
    } else {
      // Criar novo anúncio
      const newAnuncio = {
        id: Math.max(...anuncios.map(a => a.id)) + 1,
        nome: formData.nome,
        descricao: formData.descricao,
        bairro: formData.bairro,
        tags: formData.tags,
        ativo: formData.ativo,
        destaque: formData.destaque,
        createdAt: new Date().toISOString().split('T')[0],
        midias: [
          ...formData.imagemUrls.split('\n').filter(url => url.trim()).map((url, index) => ({
            id: Date.now() + index,
            tipo: 'imagem',
            url: url.trim()
          })),
          ...(formData.videoUrl ? [{
            id: Date.now() + 999,
            tipo: 'video',
            url: formData.videoUrl.trim()
          }] : [])
        ]
      }
      setAnuncios(prev => [...prev, newAnuncio])
    }
    
    setShowCreateForm(false)
    setEditingAnuncio(null)
  }

  const handleDeleteAnuncio = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este anúncio?')) {
      setAnuncios(prev => prev.filter(a => a.id !== id))
    }
  }

  const handleToggleStatus = (id: number, field: 'ativo' | 'destaque') => {
    setAnuncios(prev => prev.map(a => 
      a.id === id ? { ...a, [field]: !a[field] } : a
    ))
  }

  const stats = {
    total: anuncios.length,
    ativos: anuncios.filter(a => a.ativo).length,
    destaques: anuncios.filter(a => a.destaque).length,
    inativos: anuncios.filter(a => !a.ativo).length
  }

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateForm(false)}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </Button>
                <h1 className="text-xl font-semibold text-gray-900">
                  {editingAnuncio ? 'Editar Anúncio' : 'Criar Novo Anúncio'}
                </h1>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>
                {editingAnuncio ? 'Editar Anúncio' : 'Criar Novo Anúncio'}
              </CardTitle>
              <CardDescription>
                Preencha as informações do anúncio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome *</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input
                      id="bairro"
                      value={formData.bairro}
                      onChange={(e) => setFormData(prev => ({ ...prev, bairro: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição *</Label>
                  <Textarea
                    id="descricao"
                    rows={4}
                    value={formData.descricao}
                    onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                  <Input
                    id="tags"
                    placeholder="Loira, Delicada, Completinha"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imagemUrls">URLs das Imagens (uma por linha, máximo 5)</Label>
                  <Textarea
                    id="imagemUrls"
                    rows={5}
                    placeholder="https://exemplo.com/imagem1.jpg&#10;https://exemplo.com/imagem2.jpg"
                    value={formData.imagemUrls}
                    onChange={(e) => setFormData(prev => ({ ...prev, imagemUrls: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="videoUrl">URL do Vídeo (opcional)</Label>
                  <Input
                    id="videoUrl"
                    placeholder="https://youtube.com/watch?v=..."
                    value={formData.videoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                  />
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="ativo"
                      checked={formData.ativo}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, ativo: checked }))}
                    />
                    <Label htmlFor="ativo">Anúncio Ativo</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="destaque"
                      checked={formData.destaque}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, destaque: checked }))}
                    />
                    <Label htmlFor="destaque">Anúncio Destaque</Label>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingAnuncio ? 'Salvar Alterações' : 'Criar Anúncio'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar ao Site</span>
                </Button>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Painel Administrativo</h1>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Estatísticas */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Anúncios</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Anúncios Ativos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.ativos}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Destaques</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.destaques}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inativos</CardTitle>
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.inativos}</div>
            </CardContent>
          </Card>
        </div>

        {/* Ações */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Gerenciar Anúncios</h2>
          <Button onClick={handleCreateAnuncio} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Anúncio
          </Button>
        </div>

        {/* Lista de Anúncios */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Anúncio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Localização
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {anuncios.map((anuncio) => (
                    <tr key={anuncio.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            {anuncio.midias[0] ? (
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={anuncio.midias[0].url}
                                alt={anuncio.nome}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <Users className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {anuncio.nome}
                            </div>
                            <div className="text-sm text-gray-500">
                              {anuncio.tags}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {anuncio.bairro || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Badge variant={anuncio.ativo ? "default" : "secondary"}>
                            {anuncio.ativo ? 'Ativo' : 'Inativo'}
                          </Badge>
                          {anuncio.destaque && (
                            <Badge variant="outline" className="border-purple-600 text-purple-600">
                              Destaque
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(anuncio.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditAnuncio(anuncio)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(anuncio.id, 'ativo')}
                        >
                          {anuncio.ativo ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(anuncio.id, 'destaque')}
                        >
                          <Star className={`w-4 h-4 ${anuncio.destaque ? 'text-purple-600' : 'text-gray-400'}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteAnuncio(anuncio.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}