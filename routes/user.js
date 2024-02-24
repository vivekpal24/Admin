const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Request=require('../models/post')
const USER = mongoose.model("ADMIN");
const requireLogin = require("../middlewares/requireLogin");

// to get user profile
// router.get("/user/:id", async (req, res) => {
//     try {
//         const user = await USER.findOne({ _id: req.params.id }).select("-password");
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         const posts = await POST.find({ postedBy: req.params.id })
//             .populate("postedBy", "_id")
//             .exec();

//         res.status(200).json({ user, post: posts });
//     } catch (err) {
//         res.status(422).json({ error: err });
//     }
// });


// to follow user
// router.put("/follow", requireLogin, async (req, res) => {
//     try {
//         // Add the current user to the followers list of the user with followId
//         await USER.findByIdAndUpdate(
//             req.body.followId,
//             { $push: { followers: req.user._id } },
//             { new: true }
//         ).exec();

//         // Add the followId to the current user's following list
//         const currentUser = await USER.findByIdAndUpdate(
//             req.user._id,
//             { $push: { following: req.body.followId } },
//             { new: true }
//         ).exec();

//         res.json(currentUser);
//     } catch (err) {
//         res.status(422).json({ error: err });
//     }
// });


// to unfollow user
// router.put("/unfollow", requireLogin, async (req, res) => {
//     try {
//         // Unfollow the user with followId from the current user's followers list
//         const unfollowedUser = await USER.findByIdAndUpdate(
//             req.body.followId,
//             { $pull: { followers: req.user._id } },
//             { new: true }
//         ).exec();

//         // Remove the followId from the current user's following list
//         const currentUser = await USER.findByIdAndUpdate(
//             req.user._id,
//             { $pull: { following: req.body.followId } },
//             { new: true }
//         ).exec();

//         res.json(currentUser);
//     } catch (err) {
//         res.status(422).json({ error: err });
//     }
// });


// to upload profile pic
router.put("/uploadProfilePic", requireLogin, async (req, res) => {
    try {
        // Add logging
        console.log("Updating profile picture for user:", req.user._id);

        const result = await USER.findByIdAndUpdate(
            req.user._id,
            { $set: { Photo: req.body.pic } },
            { new: true }
        ).exec();

        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});



module.exports = router;