const {
    login,
    register,
    getAllUsers,
    setAvatar,
    logOut,
  } = require("../controllers/usercontroller");
  
  const router = require("express").Router();
  
  router.post("/login", login);
  router.post("/register", register);
  router.get("/allusers/:id", getAllUsers);
  router.post("/setavatar/:id", setAvatar);
   router.get("/logout/:id", logOut);
  
  module.exports = router;