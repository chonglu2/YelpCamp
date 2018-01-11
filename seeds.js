var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

//some initial data...
var campgrounds = [
    {name: "Salmon Creek", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg", description: "Description of Salmon Creek"},
    {name: "Granite Hill", image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg", description: "Description of Granite Hill"},
    //{name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg", description: "Description of Mountain Goat's Rest"},
    {name: "Miyajima", image: "https://farm4.staticflickr.com/3185/2677193999_7490d5bcf5.jpg", description: "Description of Miyajima"},
    //{name: "Sahale Glacier Camp", image: "https://farm3.staticflickr.com/2896/14597697096_820df79a15.jpg", description: "Description of Sahale Glacier Camp"},
    {name: "Joshua Tree", image: "https://farm9.staticflickr.com/8572/16034357695_5ca6214f59.jpg", description: "Description of Joshua Tree"}
];

function seedDB() {
  //remove all campgrounds
  Campground.remove({}, function(err) {
    //remove all comments
    Comment.remove({}, function(err) {
      //add a few campgrounds
//       campgrounds.forEach(function(elem) {
//         Campground.create(elem, function(err, campground) {
//           //add a few comments
//           Comment.create({
//             text: "Comment for " + elem.name,
//             author: {
//               username: "initName"
//             }
//             }, function(err, comment) {
//             campground.comments.push(comment._id);
//             campground.save(function(err, data) {
//               //console.log(data);
//               //console.log("comment.author.id = " + comment.author.id);
//               //console.log("\n");
//             });
//           })
//         })
//       })
    });
  });
}
module.exports = seedDB;