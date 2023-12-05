import express from 'express';
import Poll from '../schemas/pollSchema.js';
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { question, options } = req.body;
    const newPoll = new Poll({ question, options });
    await newPoll.save();
    res.status(201).json({ message: 'Poll created successfully' });
  } catch (error) {
    console.error('Error creating poll:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/allPolls', async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (error) {
    console.error('Error fetching polls:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})

router.post('/deletePoll/:id', async (req, res) => {
  try {
    const pollId = req.params.id;
    await Poll.findByIdAndDelete(pollId);
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
