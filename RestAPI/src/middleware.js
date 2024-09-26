import jwt from "jsonwebtoken";
const SECRET_KEY = "a-very-secret-key";

export const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

export const checkAdminRole = (req, res, next) => {
  const { user_id } = req.user;

  getUserRole(user_id, (err, role) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access." });
    }
    next();
  });
};
