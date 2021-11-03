const customExpress = require('./config/customExpress');
const conexao = require('./infra/conexao');
const Tabelas = require('./infra/tabelas');

conexao.connect(erro => {
    if(erro){
        console.log('erro',erro);
    } else {
        console.log('Database Connected successfully');  
        Tabelas.init(conexao);
        const app = customExpress();
        app.listen(3000, () => console.log('Serverup'));
    }
});


