const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const { route } = require("./auth");
const Request=require('../models/post')
const PRODUCT=require('../models/product')

const Query = require('../models/query'); // Assuming "../models/query" is the correct path to your Mongoose model
// Import mongoose at the top if not already imported

router.get('/query', async (req, res) => {
  try {
    // Fetch messages from the MongoDB collection
    const messages = await Query.find(); // Assuming Query is your Mongoose model

    // Respond with the messages data in JSON format
    res.json(messages);
    console.log(messages)
  } catch (error) {
    // If an error occurs, send an error response with status code 500
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

  



// Route
router.get("/requestOrder", requireLogin, async (req, res) => {
    try {
        // Fetch all orders
        const orders = await Request.find();

        // Map the orders to include specific fields
        const modifiedOrders = orders.map(order => ({
            _id: order._id,
            image: order.image,
            colorCode: order.colorCode,
            name: order.name,
            email: order.email,
            description: order.description,
            choiceOfService: order.choiceOfService,
            status: order.status // Include the status field
            // Add other fields as needed
        }));

        // Log the modified orders
        console.log("Modified Orders:", modifiedOrders);

        // Send the modified orders as JSON response
        res.json(modifiedOrders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});





router.post("/addproduct", requireLogin, (req, res) => {
    const { body, images, category, priceRange, email, name } = req.body;
    if (!body || !images || !category || !priceRange || !email || !name) {
      return res.status(422).json({ error: "Please provide all required fields" });
    }
    req.user.password = undefined;
    const post = new PRODUCT({
      body,
      images,
      category,
      priceRange,
      email,
      name,
      postedBy: req.user
    });
    post.save().then(result => {
      res.json({ post: result });
    }).catch(err => {
      console.log(err);
    });
  });
  // Update the status field in the request orders
router.put("/updateStatus/:orderId", requireLogin, async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
  
      // Update the status field in the request orders
      const updatedOrder = await Request.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      res.json({ message: "Status updated successfully", order: updatedOrder });
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  


// router.get("/myposts", requireLogin, async (req, res) => {
//     try {
//         const myposts = await POST.find({ postedBy: req.user._id })
//             .populate("postedBy", "_id name")
//             .populate("comments.postedBy", "_id name")
//             .sort("-createdAt");

//         if (!myposts || myposts.length === 0) {
//             return res.status(404).json({ error: "No posts found" });
//         }

//         res.json(myposts);
//     } catch (err) {
//         console.error("Error fetching my posts:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


// router.put("/status", requireLogin, async (req, res) => {
//     try {
//         const result = await POST.findByIdAndUpdate(
//             req.body.postId,
//             { $push: { likes: req.user._id } },
//             { new: true }
//         ).populate("postedBy", "_id name Photo").exec();

//         res.json(result);
//     } catch (err) {
//         res.status(422).json({ error: err });
//     }
// });


// router.put("/unlike", requireLogin, async (req, res) => {
//     try {
//         const result = await POST.findByIdAndUpdate(
//             req.body.postId,
//             { $pull: { likes: req.user._id } },
//             { new: true }
//         ).populate("postedBy", "_id name Photo").exec();

//         res.json(result);
//     } catch (err) {
//         res.status(422).json({ error: err });
//     }
// });


// router.put("/comment", requireLogin, async (req, res) => {
//     try {
//         const comment = {
//             comment: req.body.text,
//             postedBy: req.user._id
//         };

//         const result = await POST.findByIdAndUpdate(
//             req.body.postId,
//             { $push: { comments: comment } },
//             { new: true }
//         )
//         .populate("comments.postedBy", "_id name")
//         .populate("postedBy", "_id name Photo")
//         .exec();

//         res.json(result);
//     } catch (err) {
//         res.status(422).json({ error: err });
//     }
// });


// // Api to delete post
// router.delete("/deletePost/:postId", requireLogin, (req, res) => {
//     POST.findOne({ _id: req.params.postId })
//         .populate("postedBy", "_id")
//         .exec((err, post) => {
//             if (err || !post) {
//                 return res.status(422).json({ error: err })
//             }

//             if (post.postedBy._id.toString() == req.user._id.toString()) {

//                 post.remove()
//                     .then(result => {
//                         return res.json({ message: "Successfully deleted" })
//                     }).catch((err) => {
//                         console.log(err)
//                     })
//             }
//         })
// })

// to show following post
// router.get("/myfollwingpost", requireLogin, (req, res) => {
//     POST.find({ postedBy: { $in: req.user.following } })
//         .populate("postedBy", "_id name")
//         .populate("comments.postedBy", "_id name")
//         .then(posts => {
//             if (!posts) {
//                 return res.status(404).json({ error: "No posts found" });
//             }
//             res.json(posts);
//         })
//         .catch(err => {
//             console.error("Error fetching following posts:", err);
//             res.status(500).json({ error: "Internal server error" });
//         });
// });


module.exports = router
