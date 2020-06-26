const mongoose   = require("mongoose"),
      Comment    = require("./models/comment"),
      Campground = require("./models/campground");

var data = [
    {
        name: "Cloud's Rest",
        image:"https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales lectus a diam tempus, vitae fermentum sapien semper. Duis sit amet sapien ultricies, gravida augue non, tincidunt arcu. Sed imperdiet urna aliquam rutrum hendrerit. Etiam pretium enim quis risus dignissim, nec dapibus odio interdum. Nulla ac lacus ipsum. Nullam scelerisque justo vel tincidunt cursus. Integer gravida enim vel vestibulum tincidunt. Morbi lacus ligula, lobortis nec porta nec, sollicitudin vel justo. Donec tincidunt vitae risus a posuere."
    },
    {
        name: "Desert Mesa",
        image:"https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales lectus a diam tempus, vitae fermentum sapien semper. Duis sit amet sapien ultricies, gravida augue non, tincidunt arcu. Sed imperdiet urna aliquam rutrum hendrerit. Etiam pretium enim quis risus dignissim, nec dapibus odio interdum. Nulla ac lacus ipsum. Nullam scelerisque justo vel tincidunt cursus. Integer gravida enim vel vestibulum tincidunt. Morbi lacus ligula, lobortis nec porta nec, sollicitudin vel justo. Donec tincidunt vitae risus a posuere."
    },
    {
        name: "Canyon Floor",
        image:"https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales lectus a diam tempus, vitae fermentum sapien semper. Duis sit amet sapien ultricies, gravida augue non, tincidunt arcu. Sed imperdiet urna aliquam rutrum hendrerit. Etiam pretium enim quis risus dignissim, nec dapibus odio interdum. Nulla ac lacus ipsum. Nullam scelerisque justo vel tincidunt cursus. Integer gravida enim vel vestibulum tincidunt. Morbi lacus ligula, lobortis nec porta nec, sollicitudin vel justo. Donec tincidunt vitae risus a posuere."
    },
]

function seedDB(){
    //remove all campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("campgrounds removed!");

            //add campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else{
                        console.log("added a campground!");

                        //add a comment to each campground
                        Comment.create({
                            text: "This place is great. I wish there was better network in the area though.",
                            author: "Bob"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            }
                            else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("new comment created");
                            }
                        });
                    }
                });
            });
        }
    });    
};

//returning the function without parenthesis as that would mean we are....
//...exporting the value which was returned after the execution of seedDB().
module.exports = seedDB;