// ! Interface for the advocate Model

import { Document } from "mongoose";
import { NextFunction } from "express";

export default interface IAdvocate extends Document {
  username?: string;
  password: string;
  securityQuestion?: string;
  securityAnswer?: string;
  personalDetails?: PersonalDetails;
  advocateBarDetails?: AdvocateBarDetails;

  // Methods
  comparePassword(inputPassword: string, next: NextFunction): Promise<boolean>;
}

interface PersonalDetails {
  salutation?: string;
  firstName?: string;
  middleName?: string| null;
  lastName?: string| null;
  gender?: string;
  emailAddress?: string;
  DOB?: Date;
  phoneNo?: number;
}

interface AdvocateBarDetails {
  state?: string;
  district?: string;
  barCouncilNumber?: number;
  areaOfPractice?: string;
  specialization?: string;
  officeAddress?:string;
  pinCode?: number;
}