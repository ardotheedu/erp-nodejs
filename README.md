1. Clone o projeto

2. Instale as denpedencias
npm i 

3. Faça um copia do .env
 cp .env.example .env

4. Rode as migrations
npm run knex -- migrate:latest
para saber mais sobre migrations, acesse: https://knexjs.org/guide/migrations.html#migration-cli
Para criar migrações rode: 
npm run knex migrate:make migration_name 
5. Execute o programa
npm run dev 

Como preencher o banco de dados:
Vamos criar algo  chamado de seed que vai preencher os campos do banco de dados:
1° Rode o comando para gerar o arquivo da seed:
npm run knex seed:make `nome_arquivo`

2° Modifique o nome da tabela
Onde tiver table_name modifique para o nome da tabela que você quer preencher

3° Dentro do array do .insert([]), crie uma objeto com o nome dos campos e os dados. Exemplo
 await knex('funcionario').insert([
    {
      nome: 'João',
      email: 'joao@gmail.com',
      senha: '123456',
      telefone: '123456789',
      cargo: 'Estoquista',
      salario: '1.320',
      data_contratacao: '2021-09-03',
      papel_id: '1',
    },
    {
      nome: 'Maria',
      email: 'maria@gmail.com',
      senha: '123456',
      telefone: '123456789',
      cargo: 'Gerente',
      salario: '2.500',
      data_contratacao: '2021-09-03',
      papel_id: '2',
    },
  ])