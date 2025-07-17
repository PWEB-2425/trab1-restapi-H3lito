# Gestão de Alunos - Trabalho 1 Programação Web

## ## O Aluno

- **Hélito de Jesus Mendes de Horta**

- **Número: 32440**
  
  ---
  
  ## Publicação da aplicação
  
  - **Frontend:** https://rest-api-frontend-navy.vercel.app
  
  - **Backend:** https://trab1-restapi-h3lito.onrender.com
    
    ---
    
    ## Como Instalar e Correr o projecto
    
    ### 1. Clonar o repositório e configurações iniciais
    
    O primeiro passo é clonar o  repositório disponibilizado no github utilizando o comando:
    
    ````
    git clone https://github.com//repositório
    ```
    
    Tendo clonado o repositório,  deve iniciar o projecto no vscode.  Pode ver que no projecto tens os directórios onde vais trabalhar no projecto.
    
    Dentro do directorio **mock-server** execute os comandos **npm install & npm install express** . Poderá acompanhar o passo a passo através deste guia: 
    
    Agora que temos a configuração do nosso servidor, prossegue com a criação da base de dados dentro do directorio mock-data, com as coleções alunos e cursos.
    
    Tendo tudo pronto, através do terminal, no directório mock-server, execute o comando **npx json-server**
    
    Tendo inicializado o servidor poderá fazer o teste dos endpoints no postman(CRUD do alunos e cursos). Terminado o teste, exporte a coleção para o directório **tests** do teu projeto.
    
    ---
    
    ### Frontend
    
    Tendo realizado as configurações necessária, poderá prosseguir para a costumização do frontend de forma a ter um visual atrativo. Poderá trabalhar da forma que quiser no teu frontend. No entanto deve garantir  o fetch, para que os teus dados sejam visiveis no teu frontend. Isto tudo é feito no ficheiro **script.js**. No ficheiro **script.js** deve fazer os **fetch()**. O método **fetch()** retorna  uma promessa.
    
    No frontend, utilizei HTML, CSS, JavaScript e Bootstrap para criar um layout responsivo e intuitivo.  
    
    A comunicação com o backend é feita com `fetch()`, definida no ficheiro `script.js`, onde são carregados os dados dos alunos e cursos dinamicamente.
    
    #### Estrutura
    
    - `Index.html:` página principal. 
    
    - `Registoaluno.html & Registocurso.html:` registo do aluno r curso
    
    - `Consultaaluno & Consultacurso:` consulta dos alunos e cursos
    
    - `Script.js:` garante a interação dinâmica com a index.html e base de dados.
    
    - `style.css:` controla o estilo
    
    ### Descrição da Base de Dados
    
    Tendo desenvolvido um frontend, prossegue então a trabalhar no backend de forma a ter um website dinâmico. 
    
    A aplicação utiliza **MongoDB Atlas** como base de dados não-relacional.
    
    1. **Criação da base de dados no MongoDB**
       
        No mongodb, deve-se criar a sua base de dados e as coleções alunos e cursos.  Para os alunos é necessário obter o nome, apelido, curso e ano curricular. Para o curso  apenas o nome.
       
       1.1 **Coleção: `alunos`**
       
       Contém os registos dos alunos com os seguintes campos:
       
       ```json
       {
         "nome": "João",
         "apelido": "Silva",
         "curso": "Informática",
         "anoCurricular": 2
       }
       ```
    
    2. **Conexão da base de dados com vscode, para interação com a frontend**
       
       A ligação é feita através da URI no ficheiro `.env`, nunca incluído no repositório por razões de segurança.
       
       ### Descrição da API
       
        API segue uma estrutura modular com `routes/` e `controllers/`, que separam a lógica da aplicação. São utilizados os métodos HTTP **GET**, **POST**, **PUT** e **DELETE** para suportar operações de CRUD sobre alunos e cursos.
       
       #### Estrutura Relevante
       
       /backend
       ├── controllers/
       │   ├── alunoController.js
       │   └── authController.js
       ├── routes/
       │   ├── alunoRoutes.js
       │   └── authRoutes.js
       ├── docs/
       │   └── swagger.js
       └── server.js

#### Rotas de Alunos

| Método | Rota   | Descrição                               |
| ------ |:------:| --------------------------------------- |
| GET    | `/`    | Lista todos os alunos                   |
| GET    | `/:id` | Obtém os dados de um aluno específico   |
| POST   | `/`    | Regista um novo aluno                   |
| PUT    | `/:id` | Atualiza os dados de um aluno existente |
| DELETE | `/:id` | Remove um aluno                         |

#### Rotas de Curso

| Método | Rota   | Descrição                               |
| ------ | ------ | --------------------------------------- |
| GET    | `/`    | Lista todos os cursos                   |
| POST   | `/`    | Registo de um novo curso                |
| PUT    | `/:id` | Atualiza os dados de um aluno existente |
| DELETE | `/:id` | Remove um curso                         |

A comunicação entre frontend e backend é feita com a função `fetch()`, que permite:

- Carregar a lista de alunos/cursos
- Adicionar, editar e remover alunos/curso
  
  

## Ferramentas Utilizadas

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

- [Node.js](https://nodejs.org/)

- [Express.js](https://expressjs.com/)

- [Bootstrap](https://getbootstrap.com/)

- [Render](https://render.com/) _(para publicação do backend)_

- [Vercel](https://vercel.com/) _(para publicação do frontend)_
