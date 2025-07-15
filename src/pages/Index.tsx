import { EstoqueTable, Produto } from "@/components/EstoqueTable";
import { EstoqueMetricas } from "@/components/EstoqueMetricas";

const Index = () => {
  // Dados mockados de materiais elétricos
  const produtos: Produto[] = [
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            📦 Controle de Estoque – Loja de Materiais Elétricos
          </h1>
          <p className="text-muted-foreground">
            Acompanhe o estoque dos seus produtos e identifique itens que precisam de reposição
          </p>
        </div>

        {/* Tabela de Produtos */}
        <div className="mb-8">
          <EstoqueTable produtos={produtos} />
        </div>

        {/* Seção de Métricas */}
        <EstoqueMetricas produtos={produtos} />
      </div>
    </div>
  );
};

export default Index;
