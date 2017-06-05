var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');

/* GET users listing. */
// Answer /answer:id get delete patch
router.route('/:id')
  .get((req, res, next) => {
    const { id } = req.params;
        UserModel.findById(id)
      .then((result) => {
        res.status(200).json({ message: 'Ok', success: true, result });
      })
      .catch((e) => {
        res.status(400).json({ message: 'error' });
        next(e);
      });
  })
  .delete((req, res, next) => {
    const { id } = req.params;
    UserModel.remove({
      _id: id,
    })
    .then((result) => {
      if (!result || result.ok != 1){
        res.status(400).json({ message: 'error' });
        return;
      }
        res.status(200).json({ message: 'Ok', success: true,result });
    })
    .catch((e) => {
      res.status(400).json({ message: 'error' });
      next(e);
    });
  })
  .patch((req, res, next) => {
    // const user = req.session.user;
    // if (!user) {
    //   res.status(400).json({ message: '用户未登录' });
    //   return;
    // }
    // let id = user._id;
    const { id } = req.params;
    const { gender, location, aboutMe} = req.body;
    let obj = {
      gender,
      location,
      aboutMe,
    }
    UserModel.update({
      _id: id},
      obj
      ).then((result) => {
      if (!result || result.ok === 0) {
        res.status(400).json({ message: 'error' });
        return;
      }
      res.status(200).json({ message: 'Ok', success: true, result });
    }).catch((e) => {
      res.status(400).json({ message: 'error' });
      next(e);      
    } );
  });

module.exports = router;
