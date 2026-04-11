const AccountValidation = {
    isFullNameValid: (fullName) => {
      return fullName.trim() !== '';
    },
    isFullNameLengthValid: (fullName) => {
      const trimmedName = fullName.trim();
      return trimmedName.length > 2 && trimmedName.length < 50;
    },
    isUsernameValid: (username) => {
      return username.trim() !== '';
    },
    isUsernameLengthValid: (username) => {
      const trimmedUsername = username.trim();
      return trimmedUsername.length > 2 && trimmedUsername.length < 50;
    },
    isEmailValid: (email) => {
        return email.trim() !== '';
    },
    isDateOfBirthValid: (dateOfBirth) => {
        return dateOfBirth.trim() !== '';
    }
  };
  
  export default AccountValidation;
  