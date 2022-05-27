var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var mongoose = require('mongoose');
module.exports = function()
{
	var Usuario = mongoose.model('Usuario');
	passport.use(new GitHubStrategy({
		clientID: 'Iv1.8cbe05d7c0f0bd6e',
		clientSecret: 'fb6dd3644f8c987c8964402458fdc7b04af286cb',
		callbackURL: 'https://dswa5-14-ac-pt3008657.herokuapp.com/auth/github/callback'
	}, function(accessToken, refreshToken, profile, done) {
		Usuario.findOrCreate(
			{ "login" : profile.username},
			{ "nome" : profile.username},
			function(erro, usuario) {
				if(erro){
					console.log(erro);
					return done(erro);
				}
				return done(null, usuario);
			}
			);
	}));
	passport.serializeUser
	(function(usuario, done)
	{
		done(null, usuario._id);
	}
	);

	passport.deserializeUser
	(function(id, done)
	{
		Usuario.findById(id).exec().then
		(
			function(usuario)
			{
				done(null, usuario);
			}
			);
	}
	);
};