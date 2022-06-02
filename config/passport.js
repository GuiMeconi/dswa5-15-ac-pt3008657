var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var mongoose = require('mongoose');
module.exports = function()
{
	var Usuario = mongoose.model('Usuario');
	passport.use(new GitHubStrategy({
		clientID: 'Iv1.a5f0c775be4be7b4',
		clientSecret: '915483af3b847782c8946e0d483ce513e77739dd',
		callbackURL: 'hhttps://dswa5-15-ac-pt3008657.herokuapp.com/auth/github/callback'
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