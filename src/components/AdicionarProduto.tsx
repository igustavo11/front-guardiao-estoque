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
import { Plus } from "lucide-react";
import { Produto } from "./EstoqueTable";

interface AdicionarProdutoProps {
  onAdicionarProduto: (produto: Omit<Produto, 'id'>) => void;
}

export function AdicionarProduto({ onAdicionarProduto }: AdicionarProdutoProps) {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [estoque, setEstoque] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome.trim() || !estoque.trim()) {
      return;
    }

    const estoqueNum = parseInt(estoque);
    if (isNaN(estoqueNum) || estoqueNum < 0) {
      return;
    }

    onAdicionarProduto({
      nome: nome.trim(),
      estoque: estoqueNum,
    });

    setNome("");
    setEstoque("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Adicionar Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Produto</DialogTitle>
          <DialogDescription>
            Preencha as informações do novo produto para adicionar ao estoque.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right">
                Nome
              </Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="col-span-3"
                placeholder="Nome do produto"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="estoque" className="text-right">
                Estoque
              </Label>
              <Input
                id="estoque"
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
            <Button type="submit">Adicionar Produto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}