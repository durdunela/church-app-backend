import UserService from "../services/user.services.js";

export const register = async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;

    await UserService.registerUser(email, password, fullName);

    res.json({ status: true, success: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.checkUser(email); // Ensure this is awaited

    if (!user) {
      throw new Error("User does not exist");
    }

    const isMatch = await user.comparePassword(password);

    if (isMatch === false) {
      throw new Error("Password is invalid");
    }

    const tokenData = { _id: user._id, email: user.email };

    const token = await UserService.generateToken(tokenData, "secretKey", "1h");

    res.status(200).json({ status: true, token: token });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
