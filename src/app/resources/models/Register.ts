export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export class Register implements IRegister {
  name: string;
  email: string;
  password: string;

  constructor(rawData: IRegister) {
    this.name = rawData.name;
    this.email = rawData.email;
    this.password = rawData.password;
  }
}