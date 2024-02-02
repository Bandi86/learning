export function generateUsername(email) {
  // checking if the email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format!')
  }

  // cut the email before the @ sign
  const usernamePrefix = email.split('@')[0]

  // generate 6 random numbers
  const randomNumbers = Array.from(
    { length: 6 },
    () => Math.floor(Math.random() * 10)
  ).join('')

  // combine the username prefix and random numbers
  const username = `${usernamePrefix}${randomNumbers}`

  return username
}
