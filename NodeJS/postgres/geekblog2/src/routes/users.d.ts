declare module 'users' {
    export interface User {
      id: number;
      username: string;
      email: string;
      password: string;
      role : string
      // Egyéb felhasználói mezők
    }
  
    export interface UserRepository {
      findById(id: number): User | undefined;
      findByUsername(username: string): User | undefined;
      // Egyéb lekérdezési műveletek
    }
  }