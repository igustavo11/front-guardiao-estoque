import { useState } from "react";
import { EstoqueTable, Produto } from "@/components/EstoqueTable";
import { EstoqueMetricas } from "@/components/EstoqueMetricas";
import { AdicionarProduto } from "@/components/AdicionarProduto";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  // Dados iniciais de materiais elétricos
  const produtosIniciais: Produto[] = [
    { id: 1, nome: "Fio elétrico 2,5mm (rolo 100m)", estoque: 25 },
    { id: 2, nome: "Disjuntor 20A", estoque: 8 },
    { id: 3, nome: "Tomada 10A com terra", estoque: 45 },
    { id: 4, nome: "Interruptor simples", estoque: 12 },
    { id: 5, nome: "Lâmpada LED 9W", estoque: 6 },
    { id: 6, nome: "Eletroduto 20mm (barra 3m)", estoque: 18 },
    { id: 7, nome: "Caixa de passagem 4x2", estoque: 32 },
    { id: 8, nome: "Fita isolante", estoque: 9 },
    { id: 9, nome: "Abraçadeira plástica", estoque: 150 },
    { id: 10, nome: "Condulete de alumínio", estoque: 7 },
    { id: 11, nome: "Cabo flexível 4mm", estoque: 22 },
    { id: 12, nome: "Plugue 10A", estoque: 35 },
  ];

  const [produtos, setProdutos] = useState<Produto[]>(produtosIniciais);

  // Função para adicionar novo produto
  const handleAdicionarProduto = (novoProduto: Omit<Produto, 'id'>) => {
    const novoId = Math.max(...produtos.map(p => p.id)) + 1;
    const produto: Produto = {
      id: novoId,
      ...novoProduto
    };
    setProdutos([...produtos, produto]);
    toast({
      title: "Produto adicionado!",
      description: `${produto.nome} foi adicionado ao estoque.`,
    });
  };

  // Função para editar produto
  const handleEditarProduto = (id: number, produtoAtualizado: Omit<Produto, 'id'>) => {
    setProdutos(produtos.map(produto => 
      produto.id === id 
        ? { ...produto, ...produtoAtualizado }
        : produto
    ));
    toast({
      title: "Produto atualizado!",
      description: `${produtoAtualizado.nome} foi atualizado com sucesso.`,
    });
  };

  // Função para deletar produto
  const handleDeletarProduto = (id: number) => {
    const produto = produtos.find(p => p.id === id);
    setProdutos(produtos.filter(produto => produto.id !== id));
    toast({
      title: "Produto removido!",
      description: `${produto?.nome} foi removido do estoque.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3">
            📦 Controle de Estoque – Loja de Materiais Elétricos
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Acompanhe o estoque dos seus produtos e identifique itens que precisam de reposição
          </p>
        </div>

        {/* Botão Adicionar Produto */}
        <div className="mb-4 sm:mb-6 flex justify-center">
          <AdicionarProduto onAdicionarProduto={handleAdicionarProduto} />
        </div>

        {/* Tabela de Produtos */}
        <div className="mb-6 sm:mb-8">
          <EstoqueTable 
            produtos={produtos}
            onEditarProduto={handleEditarProduto}
            onDeletarProduto={handleDeletarProduto}
          />
        </div>

        {/* Seção de Métricas */}
        <div className="mb-6 sm:mb-8">
          <EstoqueMetricas produtos={produtos} />
        </div>
      </div>
    </div>
  );
};

export default Index;
