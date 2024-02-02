export type CurrentUser = {
  user: {
    currentUser: {
      data: {
        username: string
        email: string
        profilePicture: string
        password?: string
      }
    }
  }
}
