import { TriangleAlert } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface Produto {
  id: number;
  nome: string;
  estoque: number;
}

interface EstoqueTableProps {
  produtos: Produto[];
}

const ESTOQUE_MINIMO = 10;

export function EstoqueTable({ produtos }: EstoqueTableProps) {
  return (
    <Card className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-4 font-semibold text-foreground">
                Produto
              </th>
              <th className="text-left p-4 font-semibold text-foreground">
                Estoque
              </th>
              <th className="text-left p-4 font-semibold text-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => {
              const precisaReposicao = produto.estoque < ESTOQUE_MINIMO;
              
              return (
                <tr key={produto.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-foreground">
                    {produto.nome}
                  </td>
                  <td className="p-4 text-foreground font-medium">
                    {produto.estoque} unidades
                  </td>
                  <td className="p-4">
                    {precisaReposicao ? (
                      <div className="flex items-center gap-2 text-warning">
                        <TriangleAlert size={16} />
                        <span className="font-medium">Repor estoque</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-success">
                        <span className="font-medium">✓ Adequado</span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}