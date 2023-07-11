const router = require("express").Router();
const { isLoggedIn, isAdmin } = require('../middlewares/route-guard.middleware')
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Need profile page

router.get('/profile', isLoggedIn, (req, res, next) => {
  res.render('profile', { user: req.session.user })
})

module.exports = router;
