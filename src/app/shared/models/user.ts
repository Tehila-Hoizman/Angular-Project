import { Address } from "./address";

export class User {

    constructor(
        public id:string,
        public name:string,
        public email:string,
        public password:string,
        public role:string,
        public address?:Address,
      ) {}
}
