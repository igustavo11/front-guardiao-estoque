# 🛡️ Guardião do Estoque

## 💡 Desafio Proposto

### Desafio Integrador: Sistema de Controle de Estoque com Relatório de Reposição

Uma loja de materiais elétricos precisa de um sistema simples em PHP que liste os produtos cadastrados, seus respectivos estoques e identifique automaticamente quais produtos precisam de reposição (quando o estoque estiver abaixo de 10 unidades).

O gestor da loja também deseja visualizar:

- A lista total de produtos e seus estoques.
- A média de estoque da loja.
- Quais produtos estão abaixo do estoque mínimo.
- A porcentagem de produtos que precisam de reposição.

**Requisitos funcionais:**

- Exibir todos os produtos e seus estoques usando `foreach` ou `for`.
- Calcular e exibir a **média de estoque** dos produtos.
- Listar os produtos com estoque **inferior a 10 unidades**.
- Calcular a **porcentagem de produtos abaixo do estoque mínimo**.
- Exibir um aviso ao lado dos produtos que precisam de reposição: `"⚠ Repor estoque"`.

---

## ✨ Sobre o projeto

Este projeto nasceu na plataforma [Lovable](https://lovable.dev/projects/7e74d2ea-23c7-4fd3-9a77-99c8d4915819) e evoluiu com diversas funcionalidades novas, incluindo integração total com um backend próprio em **PHP + SQLite3**. O objetivo é oferecer uma solução moderna, eficiente e visualmente agradável para gestão de estoque.

A interface é uma SPA (Single Page Application) construída com **React** e utiliza animações Lottie para tornar a experiência do usuário ainda mais interativa e divertida! 🎬

---

## 🚀 Funcionalidades

- 👀 Visualização de produtos em estoque
- ➕ Adição de novos produtos
- ✏️ Edição de produtos existentes
- 🗑️ Exclusão de produtos
- 📊 Relatórios e métricas de estoque (média, baixo estoque, porcentagem de reposição)
- 🔗 Integração total com backend PHP/SQLite3 via API REST
- 📱 Interface responsiva e moderna (React + Tailwind + shadcn-ui)
- 🔔 Toasts de feedback para ações do usuário
- 🎨 Animações Lottie nas telas para uma experiência mais rica
- 🧑‍💻 SPA rápida e fluida

---

## 🛠️ Tecnologias utilizadas

- **Frontend:** Vite, TypeScript, React, shadcn-ui, Tailwind CSS, Lottie
- **Backend:** PHP, SQLite3
- **DevOps:** CI/CD com GitHub Actions Docker, deploy automático na Vercel

---

## 💻 Como rodar o projeto localmente

### 1️⃣ Clonando os repositórios

#### Frontend

```sh
git clone 
cd front-guardiao-estoque
npm install
```

#### Backend

```sh
git clone 
cd <PASTA_BACKEND>
# Instale as dependências do PHP se necessário
# Certifique-se de que o PHP e o SQLite3 estão instalados
php -S localhost:
```

### 2️⃣ Configurando o ambiente

No frontend, crie um arquivo `.env` com:

```
VITE_BACKEND=
```

### 3️⃣ Rodando o projeto

- Inicie o backend PHP (como mostrado acima)
- Inicie o frontend:

```sh
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) para visualizar a aplicação.

---

## ⚙️ DevOps e Deploy

O projeto está sendo preparado para **CI/CD** com GitHub Actions, permitindo deploy automático na [Vercel](https://vercel.com/). Em breve, todo push na branch principal irá disparar testes e publicar a aplicação automaticamente! 🚀

---

## 🤝 Contribuição

Sinta-se à vontade para abrir issues ou pull requests com sugestões, melhorias ou correções! Toda contribuição é bem-vinda. 💡

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.
