const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

router.post("/login", async (req, res) => {
    // const { error } = loginValidation(req.body);
    // if (error) return res.status(400).json({ error:   error.details[0].message });
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "Email is wrong" });
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).json({ error: "Password is wrong" });

    // create token
    const token = jwt.sign(
        // payload data
        {
            name: user.name,
            id: user._id,
        },
        process.env.TOKEN_SECRET
    );
    res.header("auth-token", token).json({
        error: null,
        data: {
            token,
        },
    });
    res.json({
        error: null,
        data: {
            message: "Login successful",
        },
    });
    res.redirect('/dashboard');
});

module.exports = router;
