// ======================= ALL MIDDLEWARE GOES HERE ==================================

const Campground = require("../models/campground"),
      Comment    = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    // is user logged in or not
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground){
            // checking for error or whether the foundCampground exists or not 
            if(err || !foundCampground){
                req.flash("error", "Oops...An error occured");
                res.redirect("back");
            } else{
                // does this user own the campground or not?
                if(foundCampground.author.id.equals(req.user._id)) {
                    // continue and take the user to corresponding page as per the request
                    next();
                } else{
                    // otherwise, redirect
                    req.flash("error", "Only campground owner can make changes to a campground");
                    res.redirect("back");
                }
            }
        });
    } else{
        // if not logged in, redirect somewhere
        req.flash("error", "Please log in first");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    // is user logged in or not
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Oops...An error occured");
                res.redirect("back");
            } else{
                // does this user own the campground or not?
                if(foundComment.author.id.equals(req.user._id)) {
                    // continue and take the user to corresponding page as per the request
                    next();
                } else{
                    // otherwise, redirect
                    req.flash("error", "Only the author of the comment can do that!");
                    res.redirect("back");
                }
            }
        });
    } else{
        // if not logged in, redirect somewhere
        req.flash("error", "Please log in first");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;