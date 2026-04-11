const RegisterValidation = {
    isPasswordValid: (password) => {
        return password.trim() !== '';
    },
    isConfirmPasswordValid: (confirmPassword) => {
        return confirmPassword.trim() !== '';
    },
    isPasswordLengthValid: (password, confirmPassword) => {
        return password.length >= 8 && confirmPassword.length >= 8;
    },    
    arePasswordsMatching: (password, confirmPassword) => {
        return password == confirmPassword;
    }
};
  
export default RegisterValidation;
