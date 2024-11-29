const Match = require("../model/Matches");

const createMatch = async (req, res) => {
  try {
    const {homeTeam, awayTeam, date, location, score} = req.body;
    const newMatch =  new Match({
      homeTeam,
      awayTeam,
      date,
      location,
      score,
      created_by: req.user?._id,
    });

    if (!homeTeam || !awayTeam || !date || !location) {
      return res.status(400).json({ error: "Missing required fields" });
      };

    const saveMatch = await newMatch.save();

    return res.status(201).json({
       message: 'Create match successfully',
       match: {
        homeTeam,
        awayTeam,
        date,
        location,
        score,
        created_by: saveMatch.created_by
       }});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server error.' });
  }
};

const getMatches = async (req, res) => {
    try {
      const matches = await Match.find();
      res.status(200).json({ message: 'Fetched all match successfully', data: matches });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server error.'  });
    }
};

const getMatchById = async (req, res) => {
    try {
      const match = await Match.findById(req.params.id);
      if (!match) {
        return res.status(404).json({ success: false, message: 'Match not found' });
      }
      res.status(200).json({ message: 'Fetched all match successfully', data: match });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server error.' });
    }
};

const updateMatch = async (req, res) => {
    try {
      const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!match) {
        return res.status(404).json({ message: 'Match not found' });
      }
      res.status(200).json({ message: 'Updated match successfully', data: match });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server error.'  });
    }
};

const deleteMatch = async (req, res) => {
    try {
      const match = await Match.findByIdAndDelete(req.params.id);
      if (!match) {
        return res.status(404).json({ success: false, message: 'Match not found' });
      }
      res.status(200).json({ message: 'Deleted match successfully', data: match});
    } catch (error) {
      res.status(500).json({ error: 'Internal Server error.'  });
    }
};

module.exports = {createMatch, 
                  getMatches,
                  getMatchById,
                  updateMatch,
                  deleteMatch};
