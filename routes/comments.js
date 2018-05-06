const express = require("express");
const router  = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");

// =====================
//  COMMENTS ROUTES
// =====================
router.get("/new", isLoggedIn, function(req, res){
   //Find campground by id
   console.log(req.params.id);
   Campground.findById(req.params.id, function(err, campground){
      if(err){
         console.log(err);
      } else {
         res.render("comments/new", {campground: campground});
      }
   });
});

router.post("/", isLoggedIn, function(req, res){
   //lookup campground using id
   Campground.findById(req.params.id, function(err, campground){
      if(err){
         console.log(err);
         res.redirect("/campgrounds");
      } else {
         //create new comment
         Comment.create(req.body.comment, function(err, comment){
            if(err){
               console.log(err);
            } else {
               // add user and id to the comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               // save comment
               commment.save(); 
               campground.comments.push(comment);
               campground.save();
               console.log(comment);
               //redirect to campground show page
               res.redirect("/campgrounds/" + campground._id);
            }
         });
      }
   });
});

function isLoggedIn(req, res, next){
   if(req.isAuthenticated()){
      return next();
   }
   res.redirect("/login");
}

module.exports = router;