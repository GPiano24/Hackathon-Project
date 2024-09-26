import { authenticateJWT, checkAdminRole } from "./middleware.js";
import { getUserByUsername, getUserRole } from "../functions/authFunctions.js";
import bcrypt from "bcryptjs";
const SECRET_KEY = "a-very-secret-key";

export function authRoutes(app) {
  app.post("/login", (req, res) => {
    const { username, password } = req.body;

    getUserByUsername(username, (err, user) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (!user)
        return res.status(403).json({ message: "Invalid credentials" });

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(403).json({ message: "Invalid credentials" });
      }

      getUserRole(user.user_id, (err, role) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (!role) return res.status(403).json({ message: "No role found" });

        const accessToken = jwt.sign(
          { user_id: user.user_id, username: user.username, role },
          SECRET_KEY,
          { expiresIn: "4h" }
        );

        res.json({ accessToken });
      });
    });
  });

  app.get("/a_booking", authenticateJWT, checkAdminRole, (req, res) => {
    res.json({ message: "Admin page accessed" });
  });
}
