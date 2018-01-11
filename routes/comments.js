var express = require("express"),
    router = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");

/*Passing of parent req.params to the child router is made possible by setting the {mergeParams: true}  when initializing the child router instance with the express.Router()  method.
Now the child router has req.params values of the parent router and can pass them into the code as needed.*/
/*Now, if parent and child router have some same params names, values from the child router take precedence.*/

//NEW - show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    });
});

//CREATE - add new comment to DB and associated campground
router.post("/", middleware.isLoggedIn, function(req, res){
   Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           Comment.create(req.body.comment, function(err, comment){
             if(err){
               console.log(err);
           } else {
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               comment.save();
               campground.comments.push(comment._id);
               campground.save();
               req.flash("success", "Successfully added comment");
               res.redirect("/campgrounds/" + campground._id);
           }
        });
       }
   });
});

//Route --> /campgrounds/:id/comments/:comment_id/edit
//EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
      res.render("comments/edit", {campground_id: req.params.id, comment: comment});
    });
})

//UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updated) {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
})

//DELETE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    res.redirect("/campgrounds/" + req.params.id);
  })
})

module.exports = router;