const { thought } = require('../models/thoughts');
const { User } = require('../models/user');


const thoughtController = {
    getAllThoughts(req, res) {     
        thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    getThoughtById({ params }, res) {
        thought.findOne({ _id: params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought associated with this ID'});
                    return;
                }
            res.json(thoughtData);
        })
    },

    createThought({ body }, res) {
        thought.create(body)
            .then(({_id}) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id}},
                { new: true}
            );
        })
            .then(dbUserData => {
                if (!dbUserData) {
                res.status(404).json({ message: 'No user associated with this ID' });
                return;
                }
                res.json(dbUserData);
        })
          .catch(err => res.json(err));
    },

    updateThoughtById ({ params, body }, res) {
        thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought associated with this ID' });
                return;
                }
                res.json(dbThoughtData);
        })
            .catch(err => res.json(err));
    },

    deleteThoughtById ({ params }, res) {
        thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought associated with this ID' });
                return;
                }
                return User.findOneAndUpdate(
                { _id: parmas.userId },
                { $pull: { thoughts: params.Id } },
                { new: true }
                )
        })
            .then(dbUserData => {
                if (!dbUserData) {
                res.status(404).json({ message: 'No thought associated with this ID'});
                return;
                }
                res.json(dbUserData);
        })
            .catch(err => res.json(err));
    },

    createReaction(req, res) {
    console.log(req.body);
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body} },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res
                .status(404)
                .json({ message: 'No reaction associated with this ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteReaction({ params }, res) {
        thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
    )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
            res.status(404).json({ message: 'No reaction associated with this ID'});
            return;
        }
       res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
};


  
module.exports = thoughtController;
