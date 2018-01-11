//all the middleware goes here
var Campground = require("../models/campground"),
    Comment = require("../models/comment");

var middlewareObj = {};

//middleware -> check whether the logged user is the one who owns the intended campground
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
  if(req.isAuthenticated()) { //check if user is logged in
    Campground.findById(req.params.id, function(err, campground) {
      //-------------------------//
      //There is a fatal error here, that when a user tries to modify the id of the campground in the url to edit the campground, this findById might return an undefined campground, e.g. no found campground.
      //But this is not technically an ERROR, so will pass this line and crash the app because we access campground.author later. Not yet fixed now but can be fixed by watching Ian's youtube video...
      if(err) {
        req.flash("error", "Campground not found");
        res.redirect("back")
      } else {
        //if(campground.author.id === req.user.id) --> Problematic because the left returns a mongoose OBJECT(when we print it out it seems like a string) and the right returns a STRING, although they both represent the same number(ID)
        /*req.user.id is a String representation of req.user._id, which is an automatically generated Object -- >
        //every schema is assigned a ._id which is an object and id is the string representation of that object.*/
        /*****console.log(campground.author.id);
        console.log(req.user._id);
        console.log(req.user.id);
        RESULT -->  5a54077dbf2c6a088a020625
                    5a54077dbf2c6a088a020625
                    5a54077dbf2c6a088a020625*****/
        if(campground.author.id.equals(req.user._id)) {
           next();
         } else {
           req.flash("error", "You do not have permission to do that");
           res.redirect("back");
         }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
  if(req.isAuthenticated()) { //check if user is logged in
    Comment.findById(req.params.comment_id, function(err, comment) {
      if(err)
        console.log(err);
      else {
        if(comment.author.id.equals(req.user._id)) {
           next();
         } else {
           req.flash("error", "You do not have permission to do that");
           res.redirect("back");
         }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
}

middlewareObj.isLoggedIn = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
  }
}

module.exports = middlewareObj;