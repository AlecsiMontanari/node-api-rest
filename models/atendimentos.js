const moment = require('moment');
const conexao = require('../infra/conexao');
class Atendimento {
    adiciona(atendimento, res) {
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

    lista(res){
        const sql = 'SELECT * FROM Atendimentos';
        conexao.query(sql, (error, resultados)=>{
            if(error){
                res.status(400).json(error);
            } else {
                res.status(200).json(resultados);
            }
        })
    }
    buscaPorId(res, id) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`
        conexao.query(sql, (error, resultado)=>{
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(resultado);
            }
        })
    }

    altera(res, id, valores) {
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }
        
        const sql = `UPDATE Atendimentos SET ? WHERE id = ${id}`;
        conexao.query(sql, valores, (error, resultado)=>{
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(202).json(resultado)
            }
        })
    }

    deleta(res, id) {
        const sql = `DELETE FROM Atendimentos WHERE id = ${id}`
        conexao.query(sql, (error, resultado)=>{
            if(error){
                res.status(400).json(error);
            }else{
                res.status(200).json(resultado);
            }
        })
    }
}

module.exports = new Atendimento