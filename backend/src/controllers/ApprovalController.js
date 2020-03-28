const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        const { booking_id } = req.params;

        const booking = await (await Booking.findById(booking_id)).populated('spot');

        booking.approved = true;

        await booking.save()

        return res.json(booking);
    }
};