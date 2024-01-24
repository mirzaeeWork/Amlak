import * as yup from "yup";

const signupSchema = yup.object().shape({
    email: yup.string().required('Email is required').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"The email is not valid."),
    password: yup.string().required('Password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
    ,"Password must be 6 characters long and contain one lowercase letter and one uppercase English letter, characters and numbers"),
});


export { signupSchema };
