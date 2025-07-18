import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditarProduto } from "./EditarProduto";
import { DeletarProduto } from "./DeletarProduto";

export interface Produto {
  id: number;
  nome: string;
  estoque: number;
}

interface EstoqueTableProps {
  produtos: Produto[];
  onEditarProduto: (id: number, produtoAtualizado: Omit<Produto, 'id'>) => void;
  onDeletarProduto: (id: number) => void;
}


import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function EstoqueTable({ produtos, onEditarProduto, onDeletarProduto }: EstoqueTableProps) {
  const [page, setPage] = useState(1);
  const pageSize = 7;
  const totalPages = Math.ceil(produtos.length / pageSize);
  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const produtosPagina = produtos.slice(startIdx, endIdx);

  return (
    <Card className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground">Produtos</span>
          <Badge variant="secondary" className="text-xs px-2 py-1">
            {produtos.length} {produtos.length === 1 ? 'produto' : 'produtos'}
          </Badge>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center gap-1 bg-muted rounded px-2 py-1">
            <button
              className="p-1 rounded hover:bg-accent transition disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs text-muted-foreground font-medium px-2">
              Página <span className="font-bold text-foreground">{page}</span> de <span className="font-bold text-foreground">{totalPages}</span>
            </span>
            <button
              className="p-1 rounded hover:bg-accent transition disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Próxima página"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-xl overflow-hidden">
          <thead>
            <tr className="border-b border-border bg-muted/60">
              <th className="text-left p-4 font-semibold text-foreground">Produto</th>
              <th className="text-left p-4 font-semibold text-foreground">Estoque</th>
              <th className="text-left p-4 font-semibold text-foreground">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosPagina.map((produto, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <tr
                  key={produto.id}
                  className={`border-b border-border transition-colors ${isEven ? 'bg-background' : 'bg-muted/40'} hover:bg-accent/60`}
                >
                  <td className="p-4 text-foreground text-base font-medium">
                    {produto.nome}
                  </td>
                  <td className="p-4 text-foreground font-semibold">
                    {produto.estoque} <span className="text-xs text-muted-foreground font-normal">unidades</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <EditarProduto
                        produto={produto}
                        onEditarProduto={onEditarProduto}
                      />
                      <DeletarProduto
                        produto={produto}
                        onDeletarProduto={onDeletarProduto}
                      />
                    </div>
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