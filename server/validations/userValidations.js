export const validatePassword = (password) => {
    // Check minimum length of 8 characters
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    else if (!/[A-Z]/.test(password)) { // Check for at least one uppercase letter
      return "Password must contain at least one uppercase letter.";
    }
    else if (!/\d/.test(password)) {// Check for at least one numeric digit
      return "Password must contain at least one numeric digit.";
    }
    else if (!/[\W_]/.test(password)) {// Check for at least one special character
      return "Password must contain at least one special character (e.g., !@#$%^&*).";
    }
     return "Success";
};

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|googlemail\.com)$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[7-9][0-9]{9}$/;
  return phoneRegex.test(phone);
};

