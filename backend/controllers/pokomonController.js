const Pokomon = require('../models/pokomonModel');
const mongoose = require('mongoose');

const getAllPokomons = async (req, res) => {
    const pokomons = await Pokomon.find().sort({ createdAt: -1 });

    res.status(200).json({ pokomons });
}

const getPokomons = async (req, res) => {
    const { username } = req.params;
    try {
        const pokomons = await Pokomon.find({ author: username }).sort({ createdAt: -1 });

        res.status(200).json({ pokomons });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createPokomon = async (req, res) => {
    const { name, ability1, ability2, ability3, author } = req.body;

    let emptyFields = [];

    if (!name) {
        emptyFields.push('name');
    }
    if (!ability1) {
        emptyFields.push('ability1');
    }
    if (!ability2) {
        emptyFields.push('ability2');
    }
    if (!ability3) {
        emptyFields.push('ability3');
    }
    if (!author) {
        emptyFields.push('author');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
    }

    try {
        const pokomon = await Pokomon.create({ name, ability1, ability2, ability3, author });
        res.status(200).json(pokomon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deletePokomon = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json(errorMssg);
    }

    const pokomon = await Pokomon.findOneAndDelete({ _id: id });

    if (!pokomon) {
        return res.status(400).json({ error: 'pokomon does not exist'});
    }

    res.status(200).json(pokomon);
}

module.exports = {
    getAllPokomons,
    getPokomons,
    createPokomon,
    deletePokomon
}