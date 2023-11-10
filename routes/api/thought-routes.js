const router = require("express").Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(deleteThoughtById);

router
  .route('/:thoughtId/reactions')
  .post(createReaction);

router
.route('/:thoughtId/:reactionId')
  .delete(deleteReaction);
  
module.exports = router;