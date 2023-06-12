const Transaccion = require('../models/transaccion');
const transaccionCtrl = {}

transaccionCtrl.getTransacciones = async (req, res) => {
    var transacciones = await Transaccion.find();
    res.json(transacciones);
}

transaccionCtrl.createTransaccion = async (req, res) => {
    var transaccion = new Transaccion(req.body);
    try {
        await transaccion.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Transaccion guardada.'})
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'})
    }
}

transaccionCtrl.getTransaccion = async (req, res) => {
    const transaccion = await Transaccion.findById(req.params.id);
    res.json(transaccion);
}

transaccionCtrl.editTransaccion = async (req, res) => {
    const vtransaccion = new Transaccion(req.body);
    try {
        await Transaccion.updateOne({_id: req.body._id}, vtransaccion);
        res.json({
            'status': '1',
            'msg': 'Transaccion actualizada'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

transaccionCtrl.deleteTransaccion = async (req, res)=>{
    try {
        await Transaccion.deleteOne({_id: req.params.id});
        res.json({
            status: '1',
            msg: 'Transaccion eliminada'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

transaccionCtrl.getTrnByEmail = async (req, res) => {
    var transacciones = await Transaccion.find();
    var trnEmail = {};

    transacciones.forEach(t => {
        if (t.email == req.params.email ){
            trnEmail.push(t);
        }
    });
    res.json(trnEmail);
}

transaccionCtrl.getTrnByMoneda = async (req, res) => {
    var transacciones = await Transaccion.find();
    var trnMonedas = {};

    transacciones.forEach(t => {
        if (t.monedaOrigen == req.params.origen && t.monedaDestino == req.params.destino ){
            trnMonedas.push(t);
        }
    });
    res.json(trnMonedas);
}

module.exports = transaccionCtrl;
