
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minLength: 4,
        maxLength: 50,
        
    },
    middleName: {
        type: String,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
        require: true,
        minLength: 4,
        maxLength: 50,
    },
    emailId: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address:" + value);
            }
            
        }
    },
    password: {
        type: String,
        require: true,
        minLength: 4,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password:" + value);
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "others"],
            message: `{VALUE} is not a valid gender`
        },
        // validate(value){
        //     if(!["male", "female", "others"].includes(value)){
        //         throw new Error("Gender data is not valid");
        //     }
        // },
    },   
    photoUrl:{
        type:String,
        default: "https://rmvg.com/wp-content/uploads/2017/09/blank.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Enter a valid URL:" + value);
            }
        }
    },
    about: {
        type:String,
        default: "This is the default about of the user!",
    },
    skills: {
        type: [String],
    },
},
{
    timestamps: true,
}
);

// // Hash password before saving
// userSchema.pre("save", async function (next) {
//   const user = this;
  
//   // Only hash if the password has been modified (or is new)
//   if (!user.isModified("password")) return next();
  
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);
//   next();
// });

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;

};

userSchema.methods.getJWT = async function (){
    const user = this;
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" }); // this token will be expired in 7 days

    return token;
};



module.exports = mongoose.model("User", userSchema);