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

export const githubLogin = passport.authenticate('github'); // passport.js 파일에 작성해둔 GithubStrategy가 실행.

export const githubLoginCallback = async (_, __, profile, cb) => {
  // (accessToken, refreshToken, profile, db) -> accessToken과 refreshToken은 사용하지 않는 parameter. 이것들을 _와 __로 표현. 단순히 살제해서는 안된다. // cb는 passport에서 제공하는 callback 함수
  const {
    _json: {id, avatar_url: avatarUrl, name, email},
  } = profile;
  try {
    const user = await User.findOne({email}); // email:email - github 에서 가져온 email과 동일한 사용자를 찾음.
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate('facebook');

export const facebookLoginCallback = (accessToken, refreshToken, profile, db) => {
  console.log(accessToken, refreshToken, profile, db);
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
// export const users = (req, res) => res.render('users', {pageTitle: 'Users', user: req.user});

export const getMe = (req, res) => {
  res.render('userDetail', {pageTitle: 'User Detail', user: req.user}); // req.user는 현재 로그인 된 사용자
};

export const userDetail = async (req, res) => {
  const {
    params: {id},
  } = req; // routes.js 에서 USER_DETAIL = "/:id" 이렇게 설정했기 때문에 여기서 id가 들어가는 것.
  try {
    const user = await User.findById(id);
    res.render('userDetail', {pageTitle: 'User Detail', user});
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const editProfile = (req, res) => res.render('editProfile', {pageTitle: 'Edit Profile'});
export const changePassword = (req, res) =>
  res.render('changePassword', {pageTitle: 'Change Password'});
