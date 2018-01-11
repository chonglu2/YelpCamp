var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

var campgroundsRoutes = require("./routes/campgrounds"),
    commentRoutes     = require("./routes/comments"),
    indexRoutes       = require("./routes/index");

/*app.use([path,] callback [, callback...]) ->
Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.*/
/*Since path defaults to “/”, middleware mounted without a path will be executed for every request to the app.*/

mongoose.connect("mongodb://localhost/yelp_camp");
//mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//PASSPORT Configuration
app.use(require("express-session")({
  secret: "This is the secret page!!!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*Once a user gets authenticated and a session is created (with passport and its dependencies)
then req.user gets created, otherwise it's undefined.*/

/*once a user gets authenticated and a session is created (with passport and its dependencies) then req.user gets created, otherwise it's undefined.
Local variables can be set with res.locals, app.locals, or passed in via res.render() as the second argument inside of an object.
Local variables are variables available to us in the EJS code, they get rendered into the HTML that gets outputted in the browser. It's how we see data from the server in our view files.
req.user is available on the server, but if we want it available in the view then we set res.locals.currentUser = req.user*/
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);/*The '/' indicates that any of the routes that we're using will come in place of the root path*/
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen("3000", function(){
   console.log("The YelpCamp Server Has Started!");
});