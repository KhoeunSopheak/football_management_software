const Footballer = require('../model/footballerModel'); 

const createFootballer = async (req, res) => { 
    try {
        const { full_name, position, nationality, dob, bio, avatar} = req.body;
        const newFootballer = new Footballer({
            full_name,
            position,
            nationality,
            dob,
            bio,
            avatar,
            created_by: req.user?._id,
        });

        if (!full_name || !position || !nationality || !dob) {
        return res.status(400).json({ error: "Missing required fields" });
        };
        const existingFootballer = await Footballer.findOne({ full_name });
        if (existingFootballer) {
            return res.status(409).json({ error: "Footballer already exists" });
        };

        const saveFootballer = await newFootballer.save();

        return res.status(201).json({ 
            message: 'Create successfully', 
            footballer: { 
            id : saveFootballer._id,
            full_name,
            position,
            nationality,
            dob,
            bio,
            avatar,
            created_by: saveFootballer.created_by
            } 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server error.' });
    }
};

const getAllFootballer = async (req, res) => {
    try {
        console.log(res);
        const footballers = await Footballer.find();
        return res.status(200).json({ message: 'Fetched footballer successfully' , footballers
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server error'});
    }
};

const getFootballerId = async (req, res) => {
    try {
        const id = req.params.id;
        const footballerId = await Footballer.findById(id);
        if (!footballerId) {
            return res.status(404).json({ error: "Footballer not found" });
        };

        return res.status(200).json(
            footballerId,
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server error'});
    }
};

const updateFootballer = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const updateFootballer = await Footballer.findByIdAndUpdate(
            id,
            updates, { new: true, runValidators: true} 
        );
        if (!updateFootballer) {
            return res.status(404).json({ error: 'Footballer not found' });
        }
        return res.status(200).json( { message: 'Updated footballer successfully', updateFootballer
    });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server error'});
    }
};

const deleteFootballer = async (req, res) => {
    try {
        const id = req.params.id;
        const footballerId = await Footballer.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Deleted footballer successfully' ,footballerId});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server error'});
    }
};

module.exports = { createFootballer, 
                   getAllFootballer, 
                   getFootballerId, 
                   updateFootballer, 
                   deleteFootballer};
