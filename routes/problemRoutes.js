const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

// GET all problems
router.get('/', async (req, res) => {
  const problems = await Problem.find();
  res.json(problems);
});

// POST a new problem
router.post('/', async (req, res) => {
  const newProblem = new Problem(req.body);
  await newProblem.save();
  res.status(201).json(newProblem);
});

module.exports = router;

// DELETE a problem
router.delete('/:id', async (req, res) => {
  try {
    await Problem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Problem deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Get statistics
router.get('/stats', async (req, res) => {
  try {
    const problems = await Problem.find();

    const total = problems.length;
    const solved = problems.filter(p => p.status.toLowerCase() === 'solved').length;
    const unsolved = total - solved;

    const difficultyCount = problems.reduce((acc, curr) => {
      const level = curr.difficulty.toLowerCase();
      acc[level] = acc[level] ? acc[level] + 1 : 1;
      return acc;
    }, {});

    res.json({
      total,
      solved,
      unsolved,
      difficultyCount
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

// Update a problem by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Problem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating problem' });
  }
});


