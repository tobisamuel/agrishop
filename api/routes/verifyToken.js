import jwt from "jsonwebtoken";

// function to verify token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token; // get token from request header

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // split token from Bearer
    // verify token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) res.status(403).json("Token is not valid"); // if token not valid after verification
      req.user = user; // if token valid, add user info to the request
      next(); // continue function after verification
    });
  } else {
    return res.status(401).json("You are not authenticated"); // if no authentication token
  }
};

// function to verify token and logged in User
export const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      // if user id same as request id or if user is an admin, keep cooking!
      next();
    } else {
      return res
        .status(403)
        .json("You are not allowed to perform this action!");
    }
  });
};

// function to verify token and logged in and approved Vendor
export const verifyTokenAndApproved = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user);
    if (req.user.id === req.params.id || req.user.approved) {
      // if user id same as request id and is approved, keep cooking!
      next();
    } else {
      return res
        .status(403)
        .json("You are not allowed to perform this action!");
    }
  });
};

// function to verify admin only
export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      // if user is admin keep going
      next();
    } else {
      return res
        .status(403)
        .json("You are not allowed to perform this action!");
    }
  });
};
