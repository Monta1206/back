const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    console.log("AUTH MIDDLEWARE RUNNING");

    try {

        const authHeader = req.headers.authorization;

        console.log("Authorization Header:", authHeader);


        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                success: false,
                message: "No token provided"
            });

        }


        const token = authHeader.split(" ")[1];

        console.log("TOKEN:", token);


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        console.log("DECODED USER:", decoded);


        req.user = decoded;


        next();


    } catch (error) {

        console.error("JWT ERROR:", error.message);


        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }

};


module.exports = authMiddleware;