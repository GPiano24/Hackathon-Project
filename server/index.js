const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const PORT = 3001;
const userData = require("./users");

app.use(express.json());
const SECRET_KEY = "a-very-secret-key";

userData.users.forEach((user) => {
  user.password = bcrypt.hashSync(user.password, 10);
});

let users = userData.users;
let roles = userData.roles;
let usersAndRoles = userData.user_roles;

const getUserRole = (userId) => {
  const userRole = usersAndRoles.find((ur) => ur.user_id === userId);
  const role = roles.find((role) => role.role_id === userRole.role_id);

  return role ? role.role_name : null;
};

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(tokem, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

const checkAdminRole = (req, res, next) => {
  const role = getUserRole(req.user.user_id);

  if (role !== "admin") {
    return res.status(403).json({ message: "Unauthorized access." });
  }

  next();
};

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(403).send({ message: "Invalid credentials" });
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(403).json({ message: "Invalid password" });
  }

  const userRole = usersAndRoles.find((ur) => ur.user_id === user.user_id);
  const role = roles.find((r) => r.role_id === userRole.role_id);

  const accessToken = jwt.sign(
    {
      user_id: user.user_id,
      username: user.user_name,
      role: role.role_name,
    },
    SECRET_KEY,
    { expiresIn: "4h" }
  );

  res.json({ accessToken });
});

app.get("/a_booking", authenticateJWT, checkAdminRole, (req, res) => {
  res.json({ message: "Admin page accessed" });
});

app.listen(PORT, () => {
  console.log("Server is running...");
});
