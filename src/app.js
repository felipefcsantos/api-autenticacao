import express from 'express';
import routes from './routes/index.js'
import connectDatabase from './config/database.js'
import tratarErros from './middlewares/tratarErros.js'

const conexao = await connectDatabase();

conexao.on('error', (erro) => {
    console.error('Erro de conexão com banco', erro)
})

conexao.once('open', () => {
    console.log('Conexão com o banco feita com sucesso!');
})

const app = express()
routes(app);
app.use(tratarErros);

export default app;