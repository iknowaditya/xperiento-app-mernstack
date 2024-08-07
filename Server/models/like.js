const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actionSchema = new Schema(
  {
    itemId: {
      type: Schema.Types.ObjectId,
      required: true,
    }, // ID of the item being liked/disliked/saved
    likedBy: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User", // Assuming you have a User model
        },
        firstName: {
          type: Schema.Types.String,
        },
        lastName: {
          type: Schema.Types.String,
        },
      },
    ], // Array of user IDs who liked the item
    dislikedBy: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User", // Assuming you have a User model
        },
        firstName: {
          type: Schema.Types.String,
        },
        lastName: {
          type: Schema.Types.String,
        },
      },
    ], // Array of user IDs who disliked the item
    savedBy: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User", // Assuming you have a User model
        },
        firstName: {
          type: Schema.Types.String,
        },
        lastName: {
          type: Schema.Types.String,
        },
      },
    ], // Array of user IDs who saved the item
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

const Action = mongoose.model("Action", actionSchema);

module.exports = Action;
