const bodyParser = require("body-parser"),
      methodOverride = require("method-override"),
      mongoose = require("mongoose"),
      express = require("express"),
      app = express(),
      // Seeds.js
      blogs = require("./seeds");

mongoose.connect("mongodb://localhost/crude_blog", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(express.static("public"));
// app.use(express.static(__dirname + "/public/"));
// console.log(__dirname);
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride("_method"));

const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    author : String,
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

// const newBlog = new Blog(
//     {
//         title: "Hello2",
//         image: "https://image.ytn.co.kr/general/jpg/2017/1018/201710181100063682_d.jpg",
//         description: "my dog is picked up as the cutest dog in the world!",
//         author: "Hanna"
//     }
// );

app.get("/", (req, res) => {
    res.redirect("/blogs");
})

app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) console.log(err);
        res.render("index", { blogs });
    });
    // newBlog.save( (err, data) => {
    //     if(err) console.log(err);
    //     Blog.find({}, (err, data) => {
    //         if (err)  console.log(err);
    //         console.log(data);
    //     })
    // });
    // Blog.create(newBlog, (err, data) =>{
    //     if (err) console.log(err);
    //     console.log(data);
       
    // })
    
});


app.post("/blogs", (req, res) => {
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err) console.log(err);
        console.log(newBlog);
        res.redirect("/blogs");
    });
});

app.get("/blogs/new", (req, res) => {
    res.render("new");
});


app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if(err) console.log(blog);

        res.render("show", {blog});
    });
});

// Edit route

app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if(err) console.log(err);
        console.log(blog);
        res.render("edit", {blog});
    });
});


// Update route

app.put("/blogs/:id", (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, blog) => {
        if(err) console.log(err);
        console.log(blog)
        res.redirect(`/blogs/${req.params.id}`);
    });
});

// Delete route

app.delete("/blogs/:id", (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err, blog) => {
        if(err) res.redirect("back");
        
        console.log(blog);
        res.redirect("/blogs");
    });
});

app.listen(3000, () => {
    console.log("Server has started !");
});