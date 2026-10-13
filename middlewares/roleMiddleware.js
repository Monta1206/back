const authorize = (...allowedRoles) => {

    return (req, res, next) => {


        console.log("ROLE MIDDLEWARE RUNNING");

        console.log("USER:", req.user);

        console.log("ALLOWED ROLES:", allowedRoles);



        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });

        }



        if (!allowedRoles.includes(req.user.role)) {

            return res.status(403).json({
                success: false,
                message: "Forbidden: You don't have permission."
            });

        }



        next();

    };

};


module.exports = authorize;