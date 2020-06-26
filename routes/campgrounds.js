const express = require("express"),
      router  = express.Router(),
      Comment = require("../models/comment"),
      Campground = require("../models/campground"), 
      middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/", (req, res) =>{
    //get all the campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
}); 

//CREATE - creating a new campground
router.post("/", middleware.isLoggedIn, function(req, res){
    //getting the data entered in the form and pushing it into the campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price:price, image: image, description: description, author: author};
    Campground.create(newCampground, function(err){
        if(err){
            console.log(err);
        } else{
            //redirecting the user to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - displays a form to add a new campground to the DB
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new.ejs");
});

//SHOW - shows info about one particular campground
router.get("/:id", function(req, res){
    //find the campground with the provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else{
            //render the show template for that id
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT - displays the form for the user to edit campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "There was an error finding and accessing the campground");
                res.redirect("/campgrounds");
            } else{
                res.render("campgrounds/edit", {campground: foundCampground});
            }
        });
});

// UPDATE - route to update the campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.data, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            return res.redirect("/");
        } else{
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;