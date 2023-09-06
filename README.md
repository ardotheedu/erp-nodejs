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

