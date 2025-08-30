# 🧾 Receipt Generator Frontend

> Gere recibos profissionais a partir de um formulário dinâmico usando React e TypeScript.

---

## ✨ Funcionalidades

- 📝 Criar um recibo a partir de um formulário  
- ➕ Adicionar múltiplos produtos dinamicamente  
- 🔢 Numeração automática dos recibos  
- 💰 Calcula o preço total dos produtos automaticamente  
- 🎨 Layout simples e limpo  

---

## 🛠 Tecnologias

- **React 19**  
- **TypeScript 5.8**  
- **Vite**  
- **React Router DOM 7**  
- **ESLint** para qualidade do código  

---

## 🚀 Instalação

Clone o repositório:

```bash
git clone https://github.com/alberyReis/receipt_generator_frontend.git
cd receipt_generator_frontend
```

Instale as dependências:

```bash
npm install
```

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

O app será executado em http://localhost:5173.

🖥 Uso

1. Preencha as informações da empresa, cliente e produtos no formulário.<br>
2. Clique em Adicionar Produto para incluir múltiplos itens no recibo.<br>
3. A numeração do recibo é incrementada automaticamente.<br>
4. Envie o formulário para visualizar o recibo estilizado na ReceiptScreen.

🧩 Componentes e Telas

Componentes:

* AddIcon – ícone para adicionar produtos
* ButtonSubmitForm – botão de envio estilizado
* ContainerInput – container para inputs
* InputErrorText – exibe erros de validação
* InputForm – componente principal de input

Telas:

* FormScreen – formulário principal para preencher os dados do recibo
* ReceiptScreen – exibe o recibo gerado

📁 Estrutura de Pastas

```bash
src/
├── components/
│   ├── AddIcon/
│   ├── ButtonSubmitForm/
│   ├── ContainerInput/
│   ├── InputErrorText/
│   └── InputForm/
├── screens/
│   ├── FormScreen/
│   └── ReceiptScreen/
├── App.tsx
├── main.tsx
├── index.css
├── App.css
└── vite-env.d.ts
```

📄 Licença

Este projeto está licenciado sob MIT.
