// Global
const HOME = '/';
const JOIN = '/join';
const LOGIN = '/login';
const LOGOUT = '/logout';
const SEARCH = '/search';

// Users
const USERS = '/users';
const USER_DETAIL = '/:id';
const EDIT_PROFILE = '/edit-profile';
const CHANGE_PASSWORD = '/change-password';
const ME = '/me';

// Videos
const VIDEOS = '/videos';
const UPLOAD = '/upload';
const VIDEOS_DITAIL = '/:id';
const EDIT_VIDEO = '/:id/edit';
const DELETE_VIDEO = '/:id/delete';

// Github
const GITHUB = '/auth/github';
const GITHUB_CALLBACK = '/auth/github/callback';

// Facebook
const FB = '/auth/facebook';
const FB_CALLBACK = '/auth/facebook/callback';

// API  -> 서버와 통신하기 위한 URL 생성
const API = '/api';
const REGISTER_VIEW = '/:id/view';
const ADD_COMMENT = '/:id/comment';

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  // userDetail: USER_DETAIL,
  userDetail: id => {
    if (id) {
      return `/users/${id}`;
    }
    return USER_DETAIL;
  }, // 수정하면서 userRouter.js도 함께 수정
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  // videoDetail: VIDEOS_DITAIL,
  videoDetail: id => {
    if (id) {
      return `/videos/${id}`;
    }
    return VIDEOS_DITAIL;
  },
  // editVideo: EDIT_VIDEO,
  editVideo: id => {
    if (id) {
      return `/videos/${id}/edit`;
    }
    return EDIT_VIDEO;
  },
  deleteVideo: id => {
    if (id) {
      return `/videos/${id}/delete`;
    }
    return DELETE_VIDEO;
  },
  gitHub: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  me: ME,
  facebook: FB,
  facebookCallback: FB_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT,
};

export default routes;
