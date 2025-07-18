import { TriangleAlert, BarChart3, TrendingUp, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
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

  // Dados para o gráfico de pizza - Status dos produtos
  const produtosAdequados = produtos.length - produtosBaixoEstoque.length;
  
  const statusData = [
    {
      name: "Estoque Adequado",
      value: produtosAdequados,
      color: "#10b981", // green-500
      percentage: produtos.length > 0 ? Math.round((produtosAdequados / produtos.length) * 100) : 0,
    },
    {
      name: "Baixo Estoque",
      value: produtosBaixoEstoque.length,
      color: "#f59e0b", // amber-500
      percentage: porcentagemReposicao,
    },
  ];

  // Dados para o gráfico de distribuição de estoque
  const estoqueRanges = {
    critico: produtos.filter(p => p.estoque < 5).length,
    baixo: produtos.filter(p => p.estoque >= 5 && p.estoque < ESTOQUE_MINIMO).length,
    adequado: produtos.filter(p => p.estoque >= ESTOQUE_MINIMO && p.estoque < 50).length,
    alto: produtos.filter(p => p.estoque >= 50).length,
  };

  const distribuicaoData = [
    {
      name: "Crítico (< 5)",
      value: estoqueRanges.critico,
      color: "#ef4444", // red-500
    },
    {
      name: "Baixo (5-9)",
      value: estoqueRanges.baixo,
      color: "#f59e0b", // amber-500
    },
    {
      name: "Adequado (10-49)",
      value: estoqueRanges.adequado,
      color: "#10b981", // green-500
    },
    {
      name: "Alto (≥ 50)",
      value: estoqueRanges.alto,
      color: "#3b82f6", // blue-500
    },
  ].filter(item => item.value > 0);

  const chartConfig = {
    adequado: {
      label: "Estoque Adequado",
      color: "#10b981",
    },
    baixoEstoque: {
      label: "Baixo Estoque",
      color: "#f59e0b",
    },
    critico: {
      label: "Crítico",
      color: "#ef4444",
    },
    alto: {
      label: "Alto",
      color: "#3b82f6",
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
            <BarChart3 className="text-blue-600 dark:text-blue-400" size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Relatório do Estoque
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Análise detalhada dos produtos em estoque
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          Atualizado agora
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="shadow-sm border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Média de Estoque
            </CardTitle>
            <div className="p-2 bg-blue-200 dark:bg-blue-800 rounded-lg">
              <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
              {mediaEstoque}
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              unidades por produto
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300">
              Produtos Baixo Estoque
            </CardTitle>
            <div className="p-2 bg-amber-200 dark:bg-amber-800 rounded-lg">
              <TriangleAlert className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-900 dark:text-amber-100">
              {produtosBaixoEstoque.length}
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
              de {produtos.length} produtos
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">
              % Necessita Reposição
            </CardTitle>
            <div className="p-2 bg-red-200 dark:bg-red-800 rounded-lg">
              <TrendingUp className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-900 dark:text-red-100">
              {porcentagemReposicao}%
            </div>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              necessita reposição
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de Distribuição do Estoque */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Status Geral do Estoque */}
        <Card className="shadow-sm border-0 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              Status Geral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <ChartContainer config={chartConfig} className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={85}
                      innerRadius={45}
                      paddingAngle={2}
                      strokeWidth={0}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border">
                              <p className="font-semibold text-slate-900 dark:text-slate-100">
                                {data.name}
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {data.value} produtos ({data.percentage}%)
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            
            <div className="mt-4 space-y-2">
              {statusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {item.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {item.value}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {item.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Distribuição por Faixas de Estoque */}
        <Card className="shadow-sm border-0 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              Distribuição por Faixas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <ChartContainer config={chartConfig} className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distribuicaoData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={85}
                      innerRadius={45}
                      paddingAngle={2}
                      strokeWidth={0}
                    >
                      {distribuicaoData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          const percentage = produtos.length > 0 ? Math.round((data.value / produtos.length) * 100) : 0;
                          return (
                            <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border">
                              <p className="font-semibold text-slate-900 dark:text-slate-100">
                                {data.name}
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {data.value} produtos ({percentage}%)
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            
            <div className="mt-4 space-y-2">
              {distribuicaoData.map((item, index) => {
                const percentage = produtos.length > 0 ? Math.round((item.value / produtos.length) * 100) : 0;
                return (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {item.value}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {percentage}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {produtosBaixoEstoque.length > 0 && (
        <Card className="">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <div className="p-2 bg-red-200 dark:bg-red-800 rounded-lg">
                <TriangleAlert className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              Produtos Abaixo do Estoque Mínimo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {produtosBaixoEstoque.map((produto) => {
                const isCritico = produto.estoque < 5;
                return (
                  <div key={produto.id} className="flex items-center justify-between p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${isCritico ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                      <div>
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {produto.nome}
                        </span>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {isCritico ? 'Crítico' : 'Baixo estoque'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${isCritico ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        {produto.estoque} unidades
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        restantes
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}