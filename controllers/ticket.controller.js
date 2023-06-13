const Espectador = require('../models/espectador');
const Ticket = require('../models/ticket');
const ticketCtrl = {}

ticketCtrl.getTickets = async (req, res) => {
    var tickets = await Ticket.find();
    res.json(tickets);
}

ticketCtrl.createTicket = async (req, res) => {
    var ticket = new Ticket(req.body);
    try {
        await ticket.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Ticket guardado.'})
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'})
    }
}

ticketCtrl.getTicket = async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    res.json(ticket);
}

ticketCtrl.editTicket = async (req, res) => {
    const vticket = new Ticket(req.body);
    try {
        await Ticket.updateOne({_id: req.body._id}, vticket);
        res.json({
            'status': '1',
            'msg': 'Ticket updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

ticketCtrl.deleteTicket = async (req, res)=>{
    try {
        await Ticket.deleteOne({_id: req.params.id});
        res.json({
            status: '1',
            msg: 'Ticket removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

ticketCtrl.getEspectadores = async (req, res) => {
    var tickets      = await Tickets.find();
    var espectadores = {};

    tickets.forEach(t => {
        if (t.categoriaEspectador = req.cat ){
            espectadores.push(t.espectador );
        }
    });  

    res.json(espectadores);
}

module.exports = ticketCtrl;
