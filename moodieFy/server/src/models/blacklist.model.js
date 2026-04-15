import mongoose from "mongoose";

const blackList = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token Required For Black Listing"],
    },
  },
  {
    timestamps: true,
  },
);

const blackListModel = mongoose.model("blackList", blackList);

export default blackListModel;
