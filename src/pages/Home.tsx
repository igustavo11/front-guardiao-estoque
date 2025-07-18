import { FC } from "react";
import Lottie from "lottie-react";
import animationData from "../../orange boxes.json";

interface HomeProps {
  onEntrarEstoque: () => void;
}

const Home: FC<HomeProps> = ({ onEntrarEstoque }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <h1 className="text-4xl font-bold mb-6 text-foreground">Guardião do Estoque</h1>
      <div className="w-80 h-80 mb-8">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <div className="max-w-xl text-center mb-8">
        <p className="text-lg text-muted-foreground mb-4">
          Bem-vindo ao Guardião do Estoque! Controle seus produtos de forma simples e rápida.
        </p>
        <ul className="text-base text-muted-foreground list-disc list-inside mb-4">
          <li>Adicione, edite e remova produtos do estoque.</li>
          <li>Acompanhe relatórios e métricas dos seus itens.</li>
        </ul>
        <p className="text-base text-foreground">
          Clique no botão abaixo para começar!
        </p>
      </div>
      <button
        className="px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-primary/80 transition text-lg font-semibold"
        onClick={onEntrarEstoque}
      >
        Entrar no Estoque
      </button>
      <div className="mt-10 text-sm text-muted-foreground text-center">
        Desenvolvido por <span className="font-semibold text-foreground">Gustavo</span>, <span className="font-semibold text-foreground">Marcos Vinicius</span> e <span className="font-semibold text-foreground">Matheus</span>
      </div>
    </div>
  );
};

export default Home;
