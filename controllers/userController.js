import passport from 'passport';
import routes from '../routes';
import User from '../models/User';

export const getJoin = (req, res) => {
  res.render('join', {pageTitle: 'Join'});
};
export const postJoin = async (req, res, next) => {
  // console.log(req.body);  //app.js 파일에서 bodyParser를 사용해서 가능한 것.
  const {
    body: {name, email, password, password2},
  } = req;
  if (password !== password2) {
    res.status(400); // 상태코드(status code)는 인터넷이 서로 어떻게 상호작용하는지 표시하는 것. 웹사이트가 이해할 수 있는 기본코드.
    res.render('join', {pageTitle: 'Join'});
  } else {
    // Registe\r User 사용자 등록
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
    //  Log user in   사용자 로그인
  }
};

export const getLogin = (req, res) => {
  res.render('login', {pageTitle: 'Login'});
};
export const postLogin = passport.authenticate('local', {
  // 'local'은 이미 설치해준 Strategy 이름.
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const logout = (req, res) => {
  // TODO: Process Log Out
  res.redirect(routes.home);
};
export const users = (req, res) => res.render('users', {pageTitle: 'Users'});
export const userDetail = (req, res) => res.render('userDetail', {pageTitle: 'User Detail'});
export const editProfile = (req, res) => res.render('editProfile', {pageTitle: 'Edit Profile'});
export const changePassword = (req, res) =>
  res.render('changePassword', {pageTitle: 'Change Password'});
