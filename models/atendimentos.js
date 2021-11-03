const moment = require('moment');
const conexao = require('../infra/conexao');
class Atendimento {
    adicionar(atendimento, res) {
        const dataCriacao = new Date();
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length>=5;

        const validacoes = [
            {
                nome:'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome:'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter mais que cinco letras'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;
        if(existemErros) {
            res.status(400).json(erros);
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
    
            const sql = 'INSERT INTO Atendimentos SET ?';
            conexao.query(sql, atendimentoDatado, (error, resultados)=>{
                if(error){
                    res.status(400).json(error);
                } else{
                    res.status(201).json(resultados);
                }
            })

        }

    }
}

module.exports = new Atendimento