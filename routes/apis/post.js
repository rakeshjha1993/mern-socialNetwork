const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

var router = express.Router();

const Post = require('../../models/Post');



// @Route GET api/posts/test
// @desc Test Post Route
// @acess Public
router.get('/test', (req, res) => {
    res.json({
        "message": "In post Routes"
    });
});

// @Route POST api/posts/
// @desc CREATE Post Route
// @acess private
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.user.avatar,
        user: req.user.id
    });

    newPost.save().then((post) => res.json(post)).catch(err => res.status(500).json(err));

});

// @Route GET api/posts/all
// @desc FETCH Post Route
// @acess public
router.get('/all', (req, res) => {
    Post.find({}).sort({
        date: -1
    }).then((posts) => {
        if (!posts) {
            return res.status(404).json({
                message: "No post found"
            });
        }
        res.json(posts);
    }).catch(err => res.status(500).json({
        err
    }));

});

// @Route GET api/posts/:id
// @desc FETCH individual Post Route
// @acess public
// router.get('/:id', (req, res) => {
//     console.log(req.params.id);
//     Post.findOne({_id:req.params.id}).then((post) => {
//         if(!post) {
//             return res.status(404).json({message: "No post found"});
//         }
//         res.json(posts);
//     }).catch(err => res.status(500).json({err}));

// });

// @Route GET api/posts/:id
// @desc FETCH individual Post Route
// @acess public
router.get('/:id', (req, res) => {
    Post.findById((req.params.id), (err, post) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        console.log(post);
        res.json(post);
    });
});


// @Route Delete api/posts/:id
// @desc Delete individual Post Route
// @acess private
router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
        user: req.user.id
    }).then((profile) => {
        Post.findById(req.params.id).then((post) => {
            //Check the post and user
            if (post.user.toString() !== req.user.id) {
                res.status(401).json({
                    notauthorized: 'user not authorized'
                });
            }
            //Delete
            Post.findByIdAndRemove(req.params.id).then(() => res.json({
                success: true
            })).catch(err => res.status(400).json({
                success: false
            }));

        });
    });
});


// @Route like api/like/:id
// @desc Delete individual Post Route
// @acess private
router.get('/like/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
        user: req.user.id
    }).then((profile) => {
        Post.findById(req.params.id).then((post) => {
            console.log(post);
            //Check the user liked or not
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                return res.status(400).json({alreadyLiked : "user already liked"});
            }
            post.likes.unshift({user:req.user.id});
            post.save().then((post) => res.json(post)).catch(err => res.status(400).json({error : "error happened"}));
        }).catch(err => console.log(err));
    });
});

// @Route like api/posts/unlike/:id
// @desc unlike individual Post Route
// @acess private
router.get('/unlike/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
        user: req.user.id
    }).then((profile) => {
        Post.findById(req.params.id).then((post) => {
            //Check the user liked or not
            console.log(req.user.id)
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                
                return res.status(400).json({notLiked : "user have not liked"});
            }   
            //Get Remove Index
            const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
            console.log(removeIndex);
            //splice out of
            post.likes.splice(removeIndex, 1);
            console.log(post.likes.splice(removeIndex, -1));
            post.save().then((post) => res.json(post)).catch(err => res.status(400).json({error : "error happened"}));
        });
    });
});


// @Route Post api/posts/comment/:id
// @desc Comment individual Post Route
// @acess private
router.post('/comment/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    
        Post.findById(req.params.id).then((post) => {
            
            const newComment = {
               text : req.body.text,
               user : req.user.id,
               avatar : req.user.avatar,
               name : req.body.name
            }

            post.comments.unshift(newComment);
            post.save().then((post) => res.json(post)).catch(err => res.status(500).json('something went wrong'));
        
        }).catch(err => res.status(404).json({error: "Profile Not Found"}));
   
});

// @Route Post api/posts/uncomment/:id
// @desc unComment individual Post Route
// @acess private
router.delete('/uncomment/:post_id/:comment_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    
        Post.findById(req.params.post_id).then((post) => {
            console.log(post);
            const removeIndex = post.comments.map(item => item.id.toString()).indexOf(req.params.comment_id);
            console.log(removeIndex);
            post.comments.splice(removeIndex,1);
            post.save().then((post) => res.json(post)).catch(err => res.status(500).json('something went wrong'));
        
        }).catch(err => res.status(404).json({error: "post Not Found"}));
   
});

module.exports = router;