export const emailValidation = (email, password) => {
  const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email,
  );
  const validatePassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    );
  if (!validateEmail) {
    return "Email is wrong";
  }
  if (!validatePassword) {
    return "password is wrong";
  }
  return null;
};
