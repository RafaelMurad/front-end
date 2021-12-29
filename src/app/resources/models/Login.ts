export interface ILogin {
  email: string;
  password: string;
}

export class Login implements ILogin {
  email: string;
  password: string;

  constructor(rawData: ILogin) {
    this.email = rawData.email;
    this.password = rawData.password;
  }
}