const express    = require("express"),
      router     = express.Router({mergeParams: true}),
      Campground = require("../models/campground"),
      Comment    = require("../models/comment"), 
      middleware = require("../middleware");

// new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: campground});
        }
    });
});

// create a comment
router.post("/", middleware.isLoggedIn, function(req, res){
    //look up for the campground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            //create a comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                    req.flash("error", "Something went wrong...");
                    res.redirect("/campgrounds/" + campground._id);
                } else{
                    //add username and id to the comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;

                    //save comment
                    comment.save();
                    
                    //link the comment to a campground
                    campground.comments.push(comment);

                    //save the new campground
                    campground.save();

                    //redirect to the show page
                    req.flash("success", "Comment added successfully!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });  
});

// EDIT ROUTE - RENDER A FORM TO EDIT COMMENT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function (err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground not found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
            } else{
                res.render("comments/edit.ejs",{campground_id: req.params.id, comment: foundComment});
            }
        });
    });
});

//UPDATE ROUTE - UPDATES AN ALREADY EXISTING COMMENT
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       } else{
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

// DESTROY ROUTE - DELETE A COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else{
            req.flash("success", "Comment deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


module.exports = router;