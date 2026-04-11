const AdminValidation = {
    isCompanyValid: (company) => {
        return company.trim() !== '';
    },
    isCompanyLengthValid: (company) => {
      const trimmedCompany = company.trim();
      return trimmedCompany.length > 1 && trimmedCompany.length < 50;
    }
  };

  export default AdminValidation;
