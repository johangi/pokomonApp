const Pokomon = require('../models/pokomonModel');

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

module.exports = {
    getAllPokomons,
    getPokomons,
    createPokomon
}