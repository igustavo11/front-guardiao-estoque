import React, { useState } from "react";
import { EstoqueTable, Produto } from "@/components/EstoqueTable";
import { EstoqueMetricas } from "@/components/EstoqueMetricas";
import { AdicionarProduto } from "@/components/AdicionarProduto";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Package, BarChart3, ArrowLeft } from "lucide-react";
import Home from "./Home";



const API_URL = import.meta.env.VITE_BACKEND ;

const Index = () => {

  const [tela, setTela] = useState<'home' | 'estoque'>('home');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);


  
  const fetchProdutos = async () => {
    setLoading(true);
    try {
     
      const endpoint = '/products';
      const url = `${API_URL.replace(/\/$/, '')}${endpoint}`;
      const res = await fetch(url);
      console.log('Response status:', res.status);
      const text = await res.text();
      console.log('Response text:', text);
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        console.error('Erro ao fazer parse do JSON:', jsonErr);
        throw new Error('Resposta não é JSON válido');
      }
      if (!Array.isArray(data)) {
        console.error('Resposta da API não é um array:', data);
        toast({ title: "Erro ao buscar produtos", description: "Resposta inesperada do servidor.", variant: "destructive" });
        setProdutos([]);
        return;
      }
      // Adapta para o formato do frontend
      setProdutos(data.map((p) => ({ id: p.id, nome: p.name, estoque: p.stock })));
    } catch (err) {
      console.error('Erro no fetchProdutos:', err);
      toast({ title: "Erro ao buscar produtos", description: "Não foi possível carregar os produtos.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  
  const handleAdicionarProduto = async (novoProduto: Omit<Produto, 'id'>) => {
    try {
      const endpoint = '/products';
      const url = `${API_URL.replace(/\/$/, '')}${endpoint}`;
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: novoProduto.nome, stock: novoProduto.estoque })
      });
      toast({ title: "Produto adicionado!", description: `${novoProduto.nome} foi adicionado ao estoque.` });
      fetchProdutos();
    } catch (err) {
      toast({ title: "Erro ao adicionar produto", description: "Não foi possível adicionar o produto.", variant: "destructive" });
    }
  };

 
  const handleEditarProduto = async (id: number, produtoAtualizado: Omit<Produto, 'id'>) => {
    try {
      const endpoint = `/products/${id}`;
      const url = `${API_URL.replace(/\/$/, '')}${endpoint}`;
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: produtoAtualizado.nome, stock: produtoAtualizado.estoque })
      });
      toast({ title: "Produto atualizado!", description: `${produtoAtualizado.nome} foi atualizado com sucesso.` });
      fetchProdutos();
    } catch (err) {
      toast({ title: "Erro ao editar produto", description: "Não foi possível editar o produto.", variant: "destructive" });
    }
  };

  
  const handleDeletarProduto = async (id: number) => {
    const produto = produtos.find(p => p.id === id);
    try {
      const endpoint = `/products/${id}`;
      const url = `${API_URL.replace(/\/$/, '')}${endpoint}`;
      await fetch(url, { method: "DELETE" });
      toast({ title: "Produto removido!", description: `${produto?.nome} foi removido do estoque.`, variant: "destructive" });
      fetchProdutos();
    } catch (err) {
      toast({ title: "Erro ao remover produto", description: "Não foi possível remover o produto.", variant: "destructive" });
    }
  };

  
  React.useEffect(() => {
    if (tela === 'estoque') {
      fetchProdutos();
    }
  }, [tela]);

  if (tela === 'home') {
    return <Home onEntrarEstoque={() => setTela('estoque')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8">
        <button
          className="flex items-center gap-2 mb-6 px-4 py-2 bg-muted rounded hover:bg-muted/80 transition"
          onClick={() => setTela('home')}
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para início
        </button>
       
        <Tabs defaultValue="produtos" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8 max-w-md mx-auto">
            <TabsTrigger value="produtos" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="relatorios" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Relatórios
            </TabsTrigger>
          </TabsList>

         
          <TabsContent value="produtos" className="space-y-6">
            
            <div className="flex justify-center">
              <AdicionarProduto onAdicionarProduto={handleAdicionarProduto} />
            </div>

           
            <div>
              <EstoqueTable 
                produtos={produtos}
                onEditarProduto={handleEditarProduto}
                onDeletarProduto={handleDeletarProduto}
              />
            </div>
          </TabsContent>

          {/* Tab de Relatórios */}
          <TabsContent value="relatorios">
            <EstoqueMetricas produtos={produtos} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
