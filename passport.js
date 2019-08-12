import passport from 'passport';
import User from './models/User';

passport.use(User.createStrategy()); // passport-local-mongoose plugin을 import하면서 사용할수 있는 함수 -> createStrategy()는 이미 구성된 passpoet-local의 LocalStrategy를 생성함.

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
