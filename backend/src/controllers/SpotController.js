const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async index(req, res){
        const { tech } = req.query;

        if (tech){
            const spots = await Spot.find({ techs: tech });
            return res.json(spots);
        }
        
        else {
            const spots = await Spot.find({ });
            return res.json(spots);
        }
        

       
    },

    async delete(req, res){
        const { thumbnail } = req.query;

        const spots = await Spot.deleteMany( { thumbnail: thumbnail });

        

        if (spots.n === 0 ){
            return res.json({ removed: false, spots: spots });
        } else{
            return res.json({ removed: true, spots: spots });
        }

        
    },

    async store(req, res){
        const { filename } = req.file;
        const { company, techs, price } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User does not exists' });
        }

        //filename = filename.trim();

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price,
        })

        return res.json({ ok: true });

    }
};