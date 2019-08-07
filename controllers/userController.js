import routes from '../routes';

export const getJoin = (req, res) => {
  res.render('join', {pageTitle: 'Join'});
};
export const postJoin = (req, res) => {
  // console.log(req.body);  //app.js 파일에서 bodyParser를 사용해서 가능한 것.
  const {
    body: {name, email, password, password2},
  } = req;
  if (password !== password2) {
    res.status(400); // 상태코드(status code)는 인터넷이 서로 어떻게 상호작용하는지 표시하는 것. 웹사이트가 이해할 수 있는 기본코드.
    res.render('join', {pageTitle: 'Join'});
  } else {
    // TODO: Register User 사용자 등록
    // TODO: Log user in   사용자 로그인
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) => {
  res.render('login', {pageTitle: 'Login'});
};
export const postLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  //TODO: Process Log Out
  res.redirect(routes.home);
};
export const users = (req, res) => res.render('users', {pageTitle: 'Users'});
export const userDetail = (req, res) => res.render('userDetail', {pageTitle: 'User Detail'});
export const editProfile = (req, res) => res.render('editProfile', {pageTitle: 'Edit Profile'});
export const changePassword = (req, res) =>
  res.render('changePassword', {pageTitle: 'Change Password'});
