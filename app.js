var express       = require("express");
var app           = express();
var bodyParser    = require("body-parser");
var passport      = require("passport");
var LocalStrategy = require("passport-local");
var Campground    = require("./models/campground");
var seedDB        = require("./seeds");
var Comment       = require("./models/comment");
var User          = require("./models/user");
var mongoose      = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
   secret: "Olive is the best dog ever",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
   res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
      //Get all campgrounds from DB
      Campground.find({}, function(err, allCampgrounds){
         if(err){
            console.log(err);
         } else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds});       
         }
      })
      
});

app.post("/campgrounds", function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: image, description: desc};
   //Create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
      if(err){
         console.log(err);
      } else {
         //redirect back to campgrounds page
         res.redirect("/campgrounds");
      }
   });
});

app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new.ejs");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
   //find the campground with provided id
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err){
         console.log(err);
      } else {
         console.log(foundCampground);
         //render show template with that campground
         res.render("campgrounds/show", {campground: foundCampground});
      }
   });
   
});

// =====================
//  COMMENTS ROUTES
// =====================

app.get("/campgrounds/:id/comments/new", function(req, res){
   //Find campground by id
   Campground.findById(req.params.id, function(err, campground){
      if(err){
         console.log(err);
      } else {
         res.render("comments/new", {campground: campground});
      }
   });
});

app.post("/campgrounds/:id/comments", function(req, res){
   //lookup campground using id
   Campground.findById(req.params.id, function(err, campground){
      if(err){
         console.log(err);
      } else {
         //create new comment
         Comment.create(req.body.comment, function(err, comment){
            if(err){
               console.log(err);
            } else {
               //connect new comment to campground
               campground.comments.push(comment);
               campground.save();
               //redirect to campground show page
               res.redirect("/campgrounds/" + campground._id);
            }
         });
      }
   });

});

// ===========
// AUTH ROUTES
// ===========



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp Server Started");
});
