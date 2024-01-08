export const inputValidation = (
  type: string,
  fullname: string,
  email: string,
  password: string
) => {
  if (type === 'signin') {
    if (email === '' || password === '') {
      return 'Please enter your details'
    }
    if (!email.includes('@')) {
      return 'Invalid email'
    }
    return true
  }

  if (type === 'signup') {
    if (fullname) {
      if (fullname.length < 3) {
        return 'Fullname must be more than 3 characters'
      }
      if (email === '' || password === '') {
        return 'Please enter your details'
      }
    }
    if (password.length < 6) {
      return 'Password must be more than 6 characters'
    }
    if (!email.includes('@')) {
      return 'Invalid email'
    }
    return true
  }
}
