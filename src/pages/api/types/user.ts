export interface UserFromDatabase {
  user_id: string;
  name: string;
  id_group: string;
  password: string;
}

export interface LoginUser {
  username: string;
  password: string;
}
