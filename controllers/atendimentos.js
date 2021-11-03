const Atendimento = require('../models/atendimentos');
module.exports = app => {
    app.get('/atendimentos', (req, res)=>{
        Atendimento.lista(res);
    })

    app.get('/atendimentos/:id', (req, res)=>{
        Atendimento.buscaPorId(res, req.params.id)
    })


    app.post('/atendimentos', (req, res)=>{
        const atendimento = req.body;
        Atendimento.adiciona(atendimento, res);
        
    })

    app.patch('/atendimentos/:id', (req, res)=>{
        Atendimento.altera(res, req.params.id, req.body)
    })

    app.delete('/atendimentos/:id', (req, res)=>{
        Atendimento.deleta(res, req.params.id)
    })
}