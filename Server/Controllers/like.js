const Action = require("../models/like");

// Like an item..
async function handleLike(req, res) {
  const { itemId, userId } = req.body;
  try {
    const action = await Action.findOne({ itemId });

    if (!action) {
      const newAction = new Action({
        itemId,
        likedBy: [userId],
        dislikedBy: [],
        savedBy: [],
      });
      await newAction.save();
    } else {
      const isLiked = action.likedBy.includes(userId);
      if (isLiked) {
        action.likedBy = action.likedBy.filter((id) => id !== userId);
      } else {
        action.likedBy.push(userId);
      }
      await action.save();
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Dislike an item..
async function handleDislike(req, res) {
  const { itemId, userId } = req.body;
  try {
    const action = await Action.findOne({ itemId });

    if (!action) {
      const newAction = new Action({
        itemId,
        likedBy: [],
        dislikedBy: [userId],
        savedBy: [],
      });
      await newAction.save();
    } else {
      const isDisliked = action.dislikedBy.includes(userId);
      if (isDisliked) {
        action.dislikedBy = action.dislikedBy.filter((id) => id !== userId);
      } else {
        action.dislikedBy.push(userId);
      }
      await action.save();
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Save an item..

async function handleSave(req, res) {
  const { itemId, userId } = req.body;
  try {
    const action = await Action.findOne({ itemId });

    if (!action) {
      const newAction = new Action({
        itemId,
        likedBy: [],
        dislikedBy: [],
        savedBy: [userId],
      });
      await newAction.save();
    } else {
      const isSaved = action.savedBy.includes(userId);
      if (isSaved) {
        action.savedBy = action.savedBy.filter((id) => id !== userId);
      } else {
        action.savedBy.push(userId);
      }
      await action.save();
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { handleLike, handleDislike, handleSave };
