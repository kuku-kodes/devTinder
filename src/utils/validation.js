const validator = require("validator");

const validatingSignupData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Enter a valid Name!!");
    }else if (!validator.isEmail(emailId)){
        throw new Error("Enter a valid EmailId");
    }else if (!validator.isStrongPassword(password)){
        throw new Error("Please enter a valid Password!");
    }
 }

 const validateEditProfileData = (req) => {
    const allowedEditedFields = [
        "firstName",
        "middleName",
        "lastName",
        "age",
        "gender",
        "photoUrl",
        "about",
        "skills",
    ];

    const isEditAllowed = Object.keys(req.body).every((field) => 
        allowedEditedFields.includes(field)
);

return isEditAllowed;

}

 module.exports = {
    validatingSignupData,
    validateEditProfileData,

 };