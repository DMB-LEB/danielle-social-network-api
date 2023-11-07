const router = require("express").Router();

const {
    getAllThoughts,
    getThoughtById,
    // createThought,
    // updateThoughtById,
    // deleteThoughtById,
    // addReaction,
    // deleteReaction,
} = require('../../controllers/thought-controller');

router
  .route('/')
  .get(getAllThoughts)
  // .post(createThought);

router
  .route('/:id')
  .get(getThoughtById)
  // .put(updateThoughtById)
  // .delete(deleteThoughtByID);

// router
//   .route('/:thoughtId/reactions')
//   .post(createReaction);

// router
//   .route('/api/thoughts/:thoughtId/reactions')
//   .delete(deleteReaction);
  
module.exports = router;