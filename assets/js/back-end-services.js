//import { deleteImage, deleteMedia } from './back-end-services-delete';
//import { sendMessage } from './back-end-services-email';
//import { getById, sendAuthorizedGetRequest, sendGetRequest } from './back-end-services-get';
//import { toggleElementVisibility, setAPIUrl, getCookieValue, getIdFromUrl } from './back-end-services-helpers';
//import { updateMedia, editImage, addImage, sendAuthorizedPostRequest } from './back-end-services-post';
//import { jwtSignup, jwtLogin, setLoggedInState, logout, isLoggedIn, saveTokenToCookie } from './back-end-services-user';
const BackendServices = {
  user: {},
  post: {},
  helpers: {},
  get: {},
  email: {},
  delete: {}
};

import * as UserService from './back-end-services-user.js';
import * as PostService from './back-end-services-post.js';
import * as HelpersService from './back-end-services-helpers.js';
import * as GetService from './back-end-services-get.js';
import * as EmailService from './back-end-services-email.js';
import * as DeleteService from './back-end-services-delete.js';

BackendServices.user = UserService;
BackendServices.post = PostService;
BackendServices.helpers = HelpersService;
BackendServices.get = GetService;
BackendServices.email = EmailService;
BackendServices.delete = DeleteService;

export default BackendServices;

//jwtLogin("thomasantill92@gmail.com", "Test12345!");