const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,
    Unique: true
  },
  phone: {
    type: Number,
    required: true,
    Unique:true
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  transcation: [
    {
      name: {
        type: String,
        required: true,
      },
      header: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// we are hasing the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

// ==================================== we are generating token==================
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};
//===================================== store the messages ============================
userSchema.methods.addMessage = async function (name, header, amount, status) {
  try {
    this.transcation = this.transcation.concat({
      name,
      header,
      amount,
      status,
    });
    await this.save();
    return this.transcation;
  } catch (err) {
    console.log(err);
  }
};

//=====================================collection creation ===============================
const User = mongoose.model("register", userSchema);

module.exports = User;
