import User from "../../models/User";

const authController = {
  async index(req, res) {
    try {
      const user = await User.find();
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      res.status(200).json({ status: "success", data: user });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  },

  async create(req, res) {
    try {
      const { name, email, password, role } = req.body;

      const { referredCode } = req.params;

      let referredById = null;
      const referredByUser = await User.findOne({ referralCode: referredCode });

      if (referredByUser) {
        referredById = referredByUser.id;
      }

      const referral = generateReferralCode();

      const user: any = await User.create({
        name,
        email,
        password,
        referralCode: referral,
        referralBy: referredById,
        role,
      });
      // await user.generateAuthToken();

      await user.save();

      res.status(200).json({
        status: "success",
        message: "User created",
        data: { user: user },
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      await User.findByIdAndUpdate(
        id,
        { $set: req.body },
        { upsert: false, new: true }
      );

      res.status(200).json({ status: "success", message: "User updated" });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);

      res.status(200).json({ status: "success", message: "User deleted" });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user: any = await User.findByCredentials(email, password);

      if (!user) {
        throw new Error("User not found");
      }
      if (user === "invalid-password") {
        throw new Error("Invalid password");
      }

      if (user) await user.generateAuthToken();

      res
        .status(200)
        .json({ status: "success", data: { token: user.token, user } });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  },
};
export default authController;

const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 15);
};
