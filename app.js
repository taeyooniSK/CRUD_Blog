const bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      express = require("express"),
      app = express(),
      // Seeds.js
      blogs = require("./seeds");

mongoose.connect("mongodb://localhost/crude_blog", {useNewUrlParser: true});

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    author : String,
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

const newBlog = new Blog(
    {
        title: "Hello",
        image: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBSw2ne.img?h=270&w=270&m=6&q=60&o=f&l=f",
        description: "my dog is so lovely !!!!!!",
        author: "Handeson"
    }
);

app.get("/", (req, res) => {
    res.redirect("blogs");
})

app.get("/blogs", (req, res) => {
    newBlog.save( (err, data) => {
        if(err) console.log(err);
        Blog.find({}, (err, data) => {
            if (err)  console.log(err);
            console.log(data);
        })
    })
    // Blog.create(newBlog, (err, data) =>{
    //     if (err) console.log(err);
    //     console.log(data);
    // })
    res.render("index", { blogs });
});

app.listen(3000, () => {
    console.log("Server has started !");
});