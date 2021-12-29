export interface IUser {
  id: string;
  email: string;
  name: string;
  password?: string;
}

export class User implements IUser {
  id: string;
  email: string;
  name: string;
  password?: string;

  constructor(rawData: IUser) {
    this.id = rawData.id;
    this.email = rawData.email;
    this.name = rawData.name;
    this.password = rawData?.password;
  }
}