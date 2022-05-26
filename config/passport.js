var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var mongoose = require('mongoose');
module.exports = function()
{
	var Usuario = mongoose.model('Usuario');
	passport.use(new GitHubStrategy({
		clientID: 'Iv1.e4fc0e2c71291d0a',
		clientSecret: '4800e79a884c2c97c76caac6f5046a092c28bef3',
		callbackURL: 'https://dswa5-11-ac-pt3008657.herokuapp.com/auth/github/callback'
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