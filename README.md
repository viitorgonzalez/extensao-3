# Extensão 3

Este é um projeto full-stack composto por um frontend e um backend, utilizando o NestJS no backend e o framework de sua escolha no frontend.

## Estrutura do Projeto

- `backend/`: Contém a API backend construída com NestJS.
- `frontend/`: Contém a aplicação frontend construída com ReactJS.

## Pré-requisitos

Certifique-se de que você tenha o Node.js instalado em sua máquina. Você pode verificar se o Node.js está instalado rodando o comando:


## Instale as dependências:
### Na raiz do projeto:

~~~bash
npm install
~~~

### Dentro das pastas frontend e backend:

~~~bash
cd frontend/
npm install
~~~
~~~bash
cd ..
cd backend/
npm install
~~~

## Configuração de Variáveis de Ambiente

Copie o arquivo .env.example para .env em cada um dos diretórios frontend e backend:

~~~bash
cp .env.example .env
~~~

Preencha as variáveis de ambiente com as informações corretas (ex: URL do Supabase, chaves de API, etc.).

## Rodando o Projeto

### Como rodar o frontend e o backend juntos na raiz
Na raiz do projeto, você pode rodar o comando npm run dev para iniciar tanto o frontend quanto o backend ao mesmo tempo:

~~~bash
npm run dev
~~~
### Este comando irá:

- Iniciar o frontend na pasta front usando npm run dev configurado no package.json do frontend.

- Iniciar o backend na pasta backend usando npm run dev configurado no package.json do backend.

- Isso permite que o frontend e o backend rodem juntos, simplificando o processo de desenvolvimento.

## Rodando Separadamente (Opcional)
Se preferir rodar o frontend e o backend separadamente, siga as etapas abaixo:

### Inicie o backend:
~~~bash
cd backend
npm run dev
~~~
### Inicie o frontend:
~~~bash
cd front
npm run dev
~~~