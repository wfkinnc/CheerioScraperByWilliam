var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var SiteDateSchema = new Schema({
// date 
    
  siteDate: {
    type: Date,
    default: Date.now
  }

});

// This creates our model from the above schema, using mongoose's model method
var SiteDate = mongoose.model("ScrapedDate", SiteDateSchema);

// Export the Article model
module.exports = SiteDate;
