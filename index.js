const customExpress = require('./config/customExpress');
const conexao = require('./infra/conexao');

conexao.connect(erro => {
    if(erro){
        console.log('erro',erro);
    } else {
        console.log('Database Connected successfully');  
        const app = customExpress();
        app.listen(3000, () => console.log('Serverup'));
    }
});


