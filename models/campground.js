var mongoose = require("mongoose");
//schema setup
var campgroundsSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {type: mongoose.Schema.Types.ObjectId,
     ref: "Comment"}
    //ref: "Commentt"} -> MissingSchemaError: Schema hasn't been registered for model "Commentt"
  ]
}, { usePushEach: true });
module.exports = mongoose.model("Campground", campgroundsSchema);