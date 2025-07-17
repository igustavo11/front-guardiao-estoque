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
        <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
          <Plus size={16} />
          Adicionar Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border shadow-xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold text-card-foreground">Adicionar Novo Produto</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Preencha as informações do novo produto para adicionar ao estoque.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-sm font-medium text-foreground">
                Nome do Produto
              </Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-background border-input"
                placeholder="Digite o nome do produto"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estoque" className="text-sm font-medium text-foreground">
                Quantidade em Estoque
              </Label>
              <Input
                id="estoque"
                type="number"
                min="0"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
                className="w-full bg-background border-input"
                placeholder="Digite a quantidade"
                required
              />
            </div>
          </div>
          <DialogFooter className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1 border-input hover:bg-accent"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
            >
              Adicionar Produto
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}