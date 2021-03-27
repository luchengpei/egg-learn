'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/upload', controller.uploadFile.index);
  router.get('/getUser', controller.user.getUser);
  router.post('/add/user', controller.user.addUser);
  router.get('/delete/user', controller.user.deleteUser);
  router.post('/update/user', controller.user.updateUser)
};
