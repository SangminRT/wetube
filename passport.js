import passport from 'passport';
import GithubStrategy from 'passport-github';
import FacebookStrategy from 'passport-facebook';
import User from './models/User';
import {githubLoginCallback, facebookLoginCallback} from './controllers/userController';
import routes from './routes';

passport.use(User.createStrategy()); // passport-local-mongoose plugin을 import하면서 사용할수 있는 함수 -> createStrategy()는 이미 구성된 passpoet-local의 LocalStrategy를 생성함.

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback,
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://sweet-panda-98.localtunnel.me${routes.facebookCallback}`,
      profileFields: ['id', 'displayName', 'photos', 'email'],
      scope: ['public_profile', 'email'],
    },
    facebookLoginCallback,
  ),
);

/*
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
*/
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
