
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minLength: 4,
        maxLength: 50
    },
    middleName: {
        type: String,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
        minLength: 4,
        maxLength: 50
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
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
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

module.exports = mongoose.model("User", userSchema);