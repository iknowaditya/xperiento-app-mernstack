const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

// Middleware for verifying user / checks if the user exists.
async function verifyUser(req, res, next) {
  try {
    const { mobileNumber } = req.method === "GET" ? req.query : req.body;
    // Check user existence
    let exist = await User.findOne({ mobileNumber });
    if (!exist) return res.status(404).send({ message: "User not found" });
    next();
  } catch (err) {
    console.error("Error verifying user:", err);
    return res.status(500).send({ message: "Authentication failed" });
  }
}

// Middleware for protecting routes. /  checks if the JWT token is valid.
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

// Controllers
// Get all users
async function handleGetAllUsers(req, res) {
  try {
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Get a user by ID
async function handleGetUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Update a user by ID
async function handleUpdateUserById(req, res) {
  try {
    await User.findByIdAndUpdate(req.params.id, { lastname: "Changed" });
    return res.json({ message: "User updated" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Delete a user by ID
async function handleDeleteUserById(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ message: "User deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Create a new user
async function handleCreateUserById(req, res) {
  const { firstName, lastName, businessName, mobileNumber, address, password } =
    req.body;

  const mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(mobileNumber)) {
    return res
      .status(400)
      .json({ error: "Please provide a valid 10-digit mobile number" });
  }

  if (
    !firstName ||
    !lastName ||
    !businessName ||
    !mobileNumber ||
    !address ||
    !password
  ) {
    return res.status(400).json({ error: "Please provide all details" });
  }

  const hashedPassword = await hashPassword(password);
  try {
    const result = await User.create({
      firstName,
      lastName,
      businessName,
      mobileNumber,
      address,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "User created", id: result.id });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Login a user
async function handleLoginUserById(req, res) {
  try {
    const { mobileNumber, password } = req.body;
    if (!mobileNumber || !password) {
      return res.status(400).json({ error: "Please provide all details" });
    }

    // Check if user exists
    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if password is correct
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    jwt.sign(
      {
        mobileNumber: user.mobileNumber,
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }, // Set token expiration time
      (err, token) => {
        if (err) throw err;

        // Set token as an HTTP-only cookie
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "lax", // For cross-site requests
          expires: new Date(Date.now() + 3600000), // 1 hour
        });

        // Send response
        res.status(200).json({
          status: "success",
          token: token,
          message: "User logged in successfully",
          user: {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            businessName: user.businessName,
            mobileNumber: user.mobileNumber,
            address: user.address,
          },
        });
      }
    );
  } catch (err) {
    console.error("Error logging in user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Get user profile by ID
// const handleUserProfileById = (req, res) => {
//   const { token } = req.cookies;
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
//       if (err) {
//         return res.status(401).json({ error: "first Unauthorized" });
//       }
//       return res.json(user);
//     });
//   } else {
//     return res.status(401).json({ error: "second Unauthorized" });
//   }
// };

// Get user profile by ID
// const handleUserProfileById = (req, res) => {
//   const { token } = req.cookies;
//   if (!token) {
//     console.log("Token not found in cookies");
//     return res.status(401).json({ error: "second Unauthorized" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
//     if (err) {
//       console.log("Token verification failed:", err);
//       return res.status(401).json({ error: "first Unauthorized" });
//     }
//     return res.json(user);
//   });
// };

// Get user profile by ID
const handleUserProfileById = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Optionally, you can fetch user data from your database using the decoded information
    // Example:
    // User.findById(decoded.userId)
    //   .then(user => res.json(user))
    //   .catch(error => res.status(500).json({ error: 'Internal server error' }));

    return res.json(decoded);
  });
};


// Logout user
const handleLogoutUserById = (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUserById,
  handleLoginUserById,
  handleUserProfileById,
  handleLogoutUserById,
  verifyUser,
  protect,
};
