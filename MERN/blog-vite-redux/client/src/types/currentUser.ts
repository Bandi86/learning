export type User = {
  _id?: string
  username: string
  email: string
  profilePicture: string
  password?: string
  isAdmin?: boolean
  createdAt?: Date
  updatedAt?: Date
}
