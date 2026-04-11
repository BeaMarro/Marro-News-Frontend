const UserValidation = {
    isBioValid: (bio) => {
        return bio.trim() !== '';
    },
    isBioLengthValid: (bio) => {
      const trimmedBio = bio.trim();
      return trimmedBio.length > 1 && trimmedBio.length < 500;
    }
  };
  
  export default UserValidation;
