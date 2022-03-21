// ! Interface for the Client Model

import { Document } from "mongoose";
import { NextFunction } from "express";

export default interface IClient extends Document {
  personalDetails?: PersonalDetails;

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