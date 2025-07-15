import { TriangleAlert, BarChart3, TrendingUp, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Produto } from "./EstoqueTable";

interface EstoqueMetricasProps {
  produtos: Produto[];
}

const ESTOQUE_MINIMO = 10;

export function EstoqueMetricas({ produtos }: EstoqueMetricasProps) {
  const mediaEstoque = produtos.length > 0 
    ? Math.round(produtos.reduce((acc, produto) => acc + produto.estoque, 0) / produtos.length)
    : 0;

  const produtosBaixoEstoque = produtos.filter(produto => produto.estoque < ESTOQUE_MINIMO);
  
  const porcentagemReposicao = produtos.length > 0 
    ? Math.round((produtosBaixoEstoque.length / produtos.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="text-primary" size={24} />
        <h2 className="text-2xl font-bold text-foreground">📊 Informações do Estoque</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média de Estoque</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mediaEstoque}</div>
            <p className="text-xs text-muted-foreground">unidades por produto</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Baixo Estoque</CardTitle>
            <TriangleAlert className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{produtosBaixoEstoque.length}</div>
            <p className="text-xs text-muted-foreground">de {produtos.length} produtos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">% Reposição</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{porcentagemReposicao}%</div>
            <p className="text-xs text-muted-foreground">necessita reposição</p>
          </CardContent>
        </Card>
      </div>

      {produtosBaixoEstoque.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <TriangleAlert size={20} />
              Produtos abaixo do estoque mínimo:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {produtosBaixoEstoque.map((produto) => (
                <li key={produto.id} className="flex items-center gap-2 text-sm">
                  <TriangleAlert size={14} className="text-warning" />
                  <span className="font-medium">{produto.nome}</span>
                  <span className="text-muted-foreground">
                    ({produto.estoque} unidades restantes)
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}