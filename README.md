# Extensão 3

Este é um projeto full-stack composto por um frontend e um backend, utilizando o NestJS no backend e o framework ReactJS no frontend.

## Estrutura do Projeto

- `backend/`: Contém a API backend construída com NestJS.
- `frontend/`: Contém a aplicação frontend construída com ReactJS.

## Pré-requisitos

- NodeJs

### Verificando a versão do Node.js e npm

Para verificar a instalação ou a versão do Node.js instalada em sua máquina, execute o seguinte comando:

~~~bash
node -v
~~~

Para verificar a instalação ou a versão do npm, execute o seguinte comando:

~~~bash
npm -v
~~~

### Node versão utilizada:
- v22.14.0

### Npm versão utilizada:
- 11.1.0

Se você não tiver essas versões, pode baixar o Node.js LTS no site oficial, que inclui o npm:

- [NodeJs](https://nodejs.org/pt)
- O npm será instalado automaticamente junto com o Node.js.

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