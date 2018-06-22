/** import express */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://jb:QyedOIEb9mEyHxYm@cluster0-ykbqi.mongodb.net/test?retryWrites=true")
  .then(() => {
    console.log('connected to database');
  })
  .catch(() => {
    console.log('connection failed');
  });

/** always infront of post request
 * returns valid express middleware
 * OR can be written using urlencoded
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/** For all incoming requests
 * you add the header and what files to target
 * you can choose as many origin or take out as much needed
 * next() called to move onto the next request
 * Methods allowed such as GET POST PATCH DELETE ETC
 * include OPTIONS as it might be passed without explicity using it
 */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

/** post request
 * Post model is passed with newPost({})
 * extract post byusing req.body
 * data managed by mongoose to make it easier to connect it to database
 * return response so it doenst time out
 * post.save() saves it in database (mongoose package)
 * 201 usually means everything is ok
 */
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'post added'
  });
});


/** add Middleware
app.use((req, res, next)=> {
  console.log('first middleware');
  next();
});*/
/** res.send() send back response
 * which uses /posts url to reach this code
 * initilize posts in the backend
 * in posts we create some new objects
 * we can USE or GET here (fetching posts)
 * Post model method (mongoose) with find() to fetch the data and return all entries
*/
app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'posts fetched success',
        posts: documents
      });
    });
});

/** To delete documents,send ID as part of the url NOT request body
 * deleting the item through mongoose query
 * still need to automatically update the front end after deleting
*/
app.delete("/api/posts/:id", (req, res, next ) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted" });
  });
});

/** export class */
module.exports = app;
