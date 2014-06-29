module.exports = function(app, passport) {

	// HOME PAGE : PAGE RENDER
	app.get('/', function(req,res) {
		res.render('index.ejs');
	})

	// LOGIN : PAGE RENDER
	app.get('/login', function(req,res) {

															// PASS IN FLASH MESSAGE IF EXISTS
		res.render('login.ejs', { message: req.flash('loginMessage') });
	})

	// LOGIN : PROCESS FORM
	//app.post('/login', passport.authenticate('local-signup', {
	//	successRedirect : '/instances',
	//	failureRedirect : '/signup',
	//	failureFlash		: true
	//}));

	// SIGNUP : PAGE RENDER
	app.get('/signup', function(req,res) {

															// PASS IN FLASH MESSAGE IF EXISTS
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	})

	// LOGIN : PROCESS FORM
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/instances',
		failureRedirect : '/signup',
		failureFlash		: true
	}));


	// INSTANCES : INDEX VIEW ( ALLOWED: SIGNED IN USERS )
	app.get('/instances', isLoggedIn, function(req,res) {
		res.render('instances.ejs', {
			user : req.user 							// get user out of session, pass to templatein
		})
	})

	// LIST : INDEX VIEW ( ALLOWED: ADMINS )
	// LIST : ADD INSTANCE VIEW ( ALLOWED: ADMINS )
	// LIST : VIEW/EDIT INSTANCE VIEW ( ALLOWED: ADMINS )
	// LIST : CREATE INSTANCE ( ALLOWED: ADMINS )
	// LIST : UPDATE INSTANCE ( ALLOWED: ADMINS )
	// LIST : DELETE INSTANCE ( ALLOWED: ADMINS )

	// INSTANCES : ADD INSTANCE VIEW ( ALLOWED: ADMINS )
	// INSTANCES : VIEW/EDIT INSTANCE VIEW ( ALLOWED: ADMINS )
	// INSTANCES : CREATE INSTANCE ( ALLOWED: ADMINS )
	// INSTANCES : UPDATE INSTANCE ( ALLOWED: ADMINS )
	// INSTANCES : DELETE INSTANCE ( ALLOWED: ADMINS )

	// LOGOUT
	app.get('/logout', function(req, res) {
			req.logout();
			res.redirect('/');
	})

};

function isLoggedIn(req, res, next) {

	// if user is authenticated, move on
	if (req.isAuthenticated())
		return next();

	// if user is not authenticated, go to root
	res.redirect('/');

}

function isAdmin(req, res, next) {

	// if user is authenticated, move on
	if (req.isAuthenticated())								// TODO: add && req.user.type == 'admin'
		return next();

	// if user is not authenticated, go to root
	res.redirect('/');

}





