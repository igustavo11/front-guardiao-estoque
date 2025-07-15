import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { Produto } from "./EstoqueTable";

interface EditarProdutoProps {
  produto: Produto;
  onEditarProduto: (id: number, produtoAtualizado: Omit<Produto, 'id'>) => void;
}

export function EditarProduto({ produto, onEditarProduto }: EditarProdutoProps) {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState(produto.nome);
  const [estoque, setEstoque] = useState(produto.estoque.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome.trim() || !estoque.trim()) {
      return;
    }

    const estoqueNum = parseInt(estoque);
    if (isNaN(estoqueNum) || estoqueNum < 0) {
      return;
    }

    onEditarProduto(produto.id, {
      nome: nome.trim(),
      estoque: estoqueNum,
    });

    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      // Reset values when opening
      setNome(produto.nome);
      setEstoque(produto.estoque.toString());
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Edit size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>
            Faça as alterações necessárias no produto.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-nome" className="text-right">
                Nome
              </Label>
              <Input
                id="edit-nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="col-span-3"
                placeholder="Nome do produto"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-estoque" className="text-right">
                Estoque
              </Label>
              <Input
                id="edit-estoque"
                type="number"
                min="0"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
                className="col-span-3"
                placeholder="Quantidade em estoque"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}