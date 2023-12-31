const { User } = require('../models/user');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User associated with this ID'});
                return;
            }
            res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    updateUserById({ params, body }, res) {
        User.findOneAndUpdate({_id: params.id}, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                res.status(404).json({ message: 'No User associated with this ID'});
                return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteUserById({ params }, res) {
        User.findOneAndDelete({_id: params.id})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No User associated with this ID'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    addFriendById( { params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            { $push: { friends: params.friendId }},
            { new: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User associated with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteFriendById( { params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            { $pull: { friends: params.friendId }},
            { new: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User associated with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }

}

module.exports = userController;