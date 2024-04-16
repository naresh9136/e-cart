const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const Feedback = require("../models/Feedback");


// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
router.get("/api/auth", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/auth
// @desc    Auth user & get token
// @access   Public
router.post("/login",async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token,user });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);


// @route    POST api/register
// @desc    Auth user & get token
// @access   Private - only can access this route
router.post("/api/register",auth,async (req, res) => {
    const { name, email, password } = req.body;

    try {

      if(password.length<8){
        return res.status(400).json({msg:"Minimum 8 characters required for Password"})
      }

      let admin = await User.findById(req.user.id)
      //console.log(admin)
      if(admin.isAdmin===true){

        let user = await User.findOne({ email: email });
  
        if (user) {
          return res.status(400).json({ msg: "User already exists" });
        }
  
        user = new User({
          name: name,
          email: email,
          password: password,
        });
  
        const salt = await bcrypt.genSalt(10);
  
        user.password = await bcrypt.hash(password, salt);
  
        await user.save();
  
        const payload = {
          user: {
            id: user.id,
          },
        };
  
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          {
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      }else{
          return res.status(401).json({ msg: "Not Authorised, only admin can add user" });  
      }

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
    
}
    
  
);

// @route    POST api/feedback
// @desc    Auth user & get token
// @access   Private - only can access this route
router.post("/api/feedback",auth,async (req, res) => {
  const { feedback } = req.body;

  //res.json(user);
  
  try {
    const user = await User.findById(req.user.id).select("-password");
    // let admin = await User.findById(req.user.id)

     // let user = await User.findOne({ email: email });

      // if (user) {
      //   return res.status(400).json({ msg: "User already exists" });
      // }

      // var re = new RegExp(/[A-Za-z0-9]/, g);
      //   var uzorak = feedback;
      //   var ok = re.test(feedback);
      //   if(!ok){
      //     res.status(400).json({msg:"Only Characters Required"})
      //   }
      if(/^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/.test(req.body.feedback)){
        let newFeedback = new Feedback({
          name: user.name,
          feedback: feedback,
        });
        await newFeedback.save();
      res.json({feedback})

      }else{
    res.status(400).json({msg:"Only Characters Required"})

      }


      // const salt = await bcrypt.genSalt(10);

      // user.password = await bcrypt.hash(password, salt);


      // const payload = {
      //   user: {
      //     id: user.id,
      //   },
      // };

      // jwt.sign(
      //   payload,
      //   config.get("jwtSecret"),
      //   {
      //     expiresIn: 360000,
      //   },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({ token });
      //   }
      // );

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");

  }
  
} 

);

router.get("/api/all/feedbacks",auth,async (req, res) => {

  //res.json(user);
  
  try {
    const feedbacks = await Feedback.find();
      res.json({feedbacks})

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
  
} 

);


// Change User Password
router.put("/change_password",auth,async(req,res)=>{
  // res.send("CHNAGE")
  const {new_password,old_password} = req.body
  const userId = req.user.id
  // res.send(userId)
  const user = await User.findById(req.user.id)
  // res.send(user)
  const isMatch = await bcrypt.compare(old_password,user.password)
  // res.send(isMatch)
  if(!isMatch){
      return res.status(400).json({msg:"Old Password is Wrong"})
  }
  const salt = await bcrypt.genSalt(10)
  const hashed_password = await bcrypt.hash(new_password,salt)
  const newUser={}
  newUser.password = hashed_password
  const newPasswordUser = await User.findByIdAndUpdate(userId,{$set:newUser},{new:true})
  if(newPasswordUser){
      return res.status(200).json({msg:"Password Changed Successfully"})
  }else{
      return res.status(400).json({msg:"Unable to change password"})
  }
})


module.exports = router;