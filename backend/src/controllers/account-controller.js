import express from "express";
const router = express.Router();
import nodemailer from 'nodemailer';
import AccountServices from "../services/account-services.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import decodedToken from "../auth/jwt.js"
const AccountSrv  = new AccountServices();

router.post("/login", async (request, response) => { 
    const user = request.body.username;
    const pass = request.body.password;
    
    try {
        const token = await AccountSrv.login(user, pass);
        if (token !== false) {
            return response.status(200).json({
                success: true,
                message: "Login successful",
                token: token
            });
        } else {
            return response.status(401).json({
                success: false,
                message: "Incorrect username or password",
                token: ""
            });
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            success: false,
            message: "An error occurred during login"
        });
    }
});

  
router.get("/login/:token", async (req, response) => { 
    const { token } = req.params;
    const decoded = await decodedToken(token)
    try {
    const user = await AccountSrv.getUserByIdToken(decoded.id);
    return response.status(200).json(user);
    } catch (error) {
    console.error("Error", error);
    return response.json("Error");    }
  });



  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Usa el servicio que prefieras
    auth: {
        user: "bot.estudio.rae@gmail.com",
        pass: "xbly eocf fbey iisr", 
    },
});

  const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: "bot.estudio.rae@gmail.com",
        to: to,
        subject: subject,
        text: text,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

router.get('/confirm/:token', async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const email = decoded.email;
        const user = await AccountSrv.getPendingUser(email);
        if (user) {
            await AccountSrv.registerUser(user.username, user.email, user.hashed_password);
            return res.status(200).json({ message: "Your account has been confirmed!" });
        } else {
            return res.status(400).json({ error: "No pending account found." });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "Invalid or expired token." });
    }
});


  router.post("/register", async (request, response) => {
    const { username, email, password } = request.body;
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!username || !email || !password) {
        return response.status(400).json({ error: "There is an empty field" });
    }

    if (!emailRegex.test(email)) {
        return response.status(400).json({ error: "The email is invalid" });
    }

    if (username.length <= 3) {
        return response.status(400).json({ error: "The username must be more than 3 characters" });
    }

    if (password.length <= 3) {
        return response.status(400).json({ error: "The password must be more than 3 characters" });
    }

    try {
 

        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt); 
        await AccountSrv.registerPendingUser(username, email, hashedPassword);
        const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        const confirmationUrl = `http://localhost:3000/confirm/${token}`;
        await sendEmail(email, 'Confirm your account', `Please confirm your account by clicking this link: ${confirmationUrl}`);
        return response.status(201).json({ message: "Registration successful. Please check your email to confirm your account." });    
        } catch (error) {
        console.error(error);
        if (error.code === '23505') { 
            return response.status(400).json({ error: "The username or email is already in use" });
        }
        return response.status(500).json({ error: "Server error" });
    }
});
  
export default router;
