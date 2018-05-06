var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Dessert Peak",
        image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1c80f31bb4040015d51db663252fbd30&auto=format&fit=crop&w=400&q=60",
        description: "May the Father judge him justly. The battle of the redgrass field. A feast for crows. Our Sun Shines Bright. The winds of Winter. The battle of the redgrass field. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. May the Father judge him justly. May the Father judge him justly. The Knight of Lemonwood."
    },
    {
        name: "Lakeside Hollow",
        image: "https://images.unsplash.com/photo-1444124818704-4d89a495bbae?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a128b113cb6090ba5d87ee29fc3a7869&auto=format&fit=crop&w=400&q=60",
        description: "May the Father judge him justly. The battle of the redgrass field. A feast for crows. Our Sun Shines Bright. The winds of Winter. The battle of the redgrass field. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. May the Father judge him justly. May the Father judge him justly. The Knight of Lemonwood."
    },
    {
        name: "Canyon Lake",
        image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d1c8cc988efddbda8746281871c0c8bf&auto=format&fit=crop&w=400&q=60",
        description: "May the Father judge him justly. The battle of the redgrass field. A feast for crows. Our Sun Shines Bright. The winds of Winter. The battle of the redgrass field. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. May the Father judge him justly. May the Father judge him justly. The Knight of Lemonwood."
    }
    ]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed Campgrounds!");
        //Add new campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //Add new comments    
                    Comment.create(
                        {
                            text: "This place is great but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log("Comment Error");
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
        });
    });
});    
    
}


module.exports = seedDB;

