// version 1
    > setting up the basic version of the app:
        * express, ejs
        * views directory
        * homepage
        * campgrounds page
            - note  untill we learn to use databases, we will be hardcoding the campgrounds data into an array
        * add in partials
        * add in bootstrap
        * new campgrounds
            - setting up the post route - REST convention, REST routes(7)
                bodyparser
            - forms and pushing the data entered by the user in the campgrounds array
        * styling the campgrounds page
        * adding nav bar to all the pages
        * adding styling to the form

//version 2
    > setting up mongoose
        * install mongoose
        * campgrounds model setup
        * using the campgrounds model in app

    > setting up the show route
        * shows more info about one specific campground
        * the campground schema is changed to have another property, "description"
        * the db.collection_name.drop() command in mongoDB

//version 3

    > Refactor the code
        * created model directory and campground file
        * using module.exports
        * requiring mongoose and other stuffs

    > working on the seeds.js file
        * reason we are working with a seeds.js file is that we can have some sample data to work with before setting up new and create routes

    > associating comments with campground mode, creating the comments model

    > showing the comments

//version 4
    > nested routes
    > making new directories and separating the ejs templates into two types: campgrounds and comments
    > setting up the form to add comments and the corresponding routes as well

//version 5 (incomplete!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)
================ style the show.ejs template, Harshit! ==================================
    > styling the show page
    > we'll make a custom stylesheet!!

//version 6
    > add the user model
    > install the necessary packages!

    > configure passport
    > add register route
    > render register template

    > login route
    > login template

    > add logout route
    > prevent user from adding a comment if not logged in
    > add links to navbar
    
    > show/hide auth links correctly

// version 7
    > refactored the routes

//version 8
    > data association between the user and the comments

//version 9
    > data association between the user and the campground
        * this is done so that:
            1. no one who is not logged in can make a new campground
            2. save username and id of the user who created the campground

//version 10
    > editing campgrounds
        * add method-override
        * add edit route for campgrounds (without any authentication yet)
        * add link to edit page
        * add update route
        * fix $set problem
    > deleting campgrounds
        * making a new form
            - and a lil bit of styling with the form :P
    > adding user authorisation
        * a user cannot edit/delete a campground that he or she did not create
        * hiding and unhiding the edit/delete buttons accordingly

    > editing comments
        * add edit route for comments
        * add edit button
        * add update route
    > deleting comments
        * add delete route
        * add delete button(which actually is a form)
    > adding user authorisation
        * so that a user can edit/delete only their comments
        * hiding and unhiding the edit/delete buttons accordingly

    > refactoring the middleware

    > adding in flash messages
        * install and configure connect-Flash
        * add bootstrap alerts to headers

    > sending flash messages on relevant errors and actions
    ----------------------- ERROR AA GAYA YAARRRRRRRRRRRRR -------------------------------------
    Link to Ian's video where he handles the error: https://www.youtube.com/watch?v=eDWPJAzlBfM&feature=youtu.be
    > ALRIGHT SO RIGHT WHEN YOU THOUGHT EVERYTHING IS GOING GOOD, IT CAME TO BE KNOWN THAT THERE ARE A COUPLE OF ISSUES WHICH MUST BE ATTENDED TO BECAUSE THEY ARE A FEW SERIOUS ONES. FOLLOWING ARE THE PLACES WE LIST THEM:
        * if we change the id in the url but keep the number of characters in each id the same, we run into issues on the following pages:
            1. SHOW => error displayed in one of the most ugliest manners (ERR: cannot read property image of null)
            2. EDIT => crashes the whole app, taking it down from the server (ERR: cannot read property "author" of null. Means there is some issue with the middleware)

        * doing the same thing except that we do not keep the number of characters the same as before, errors occure at the following pages:
            1. SHOW => the page is waiting for a response(ERR: cast to ObjectId failed for value:"" at path._id)(Cast error, basically...)
            NOTE!! - EDIT => this one actually gets handled and we get an error flash message on the screen which we sent in the middleware(middlewareObj.checkCampgroundOwnership)
        
        LET US UNDERSTAND WHAT IS HAPPENING - PART ONE
        KEEPING LENGTH OF ID SAME AS BEFORE 
            1. The reason its not showing any error and returning null is that we're passing valid parameters to mongo via mongoose and mongo. Mongo is just not finding anything in the database. So there isnt any error popping up as the id we're giving is technically valid and nothing exists with that id in the database so its just sending us null.
            Check this out: in node terminal(or just js console), we see that !null is truthy. And null (or !!null) is falsey.
                So! we replace if(err) statement by if(err || !foundCampground) to check for another error
                After this correction, the EDIT page on both cases(valid and invalid incorrect ids) works the way we want it to!
                The issue on SHOW isn't resolved though
                Inside the capground route, we'll add the same conditionals inside the if() right after we populate the comments.
                Now this resolves the issue on SHOW page for both cases, i.e. keeping the number of characters in id same and different.
            
            NOW WE WANT TO MAKE SURE NOTHING GOES WRONG WITH OUR COMMENTS AS WELL 
            - here we need not worry about someone messing the url and cause the error in the show page as comment ids are not accessible there. We need to worry about the EDIT COMMENT page!
                So! just replaced the if statement inside of middleware.checkCommentOwnership with if(err || !foundComment)

            NOW WE CHANGE THE ID OF CAMPGROUND TOO AFTER GETTING TO THE "EDIT A COMMENT" FORM and press enter - it reloads, and doesn't take us anywhere else nor does it get displayed anywhere, BUT the comment does get added to our database.
            SOLUTION?   in our EDIT COMMENT page, we never checked whether the camgpround was valid or not. so we'll do that.
            changes are as follows: inside the edit comment route:
            
// version 12
    > designing the landing page!
        * we'll be using mordenizer: it'll add some classes if the browser is kinda out-dated so that our css is compatible with more browsers.
    > adding the dynamic price feature

    > BHAI PLEASE ZARA COMMENT DATE BHI!
    > KEEP ON CHECKING OUT IAN'S AND ZARCO'S VIDEOS TO IMPROVE YELPCAMP PROJECT
	list=>  https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/6754188#questions/11091948

        "yelp-camp-refactored-master" has a lot of improvements.
========================================= IMPORTANT NOTE ===============================================
best security practices, later answered by Ian to Koen in the discussion => https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/3861710#questions/2758358
									https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/3861710#questions/2758358
OPTIMISE THE WHOLE APP BY ALSO DELETING THE ASSOCIATED DATA WHENEVER WE DELETE SOMETHING FROM THE DATABASE!!!!!!!!!!!!!!!!!!