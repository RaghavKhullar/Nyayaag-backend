// ! Interface for the Auth Model

import { Document } from "mongoose";
import { NextFunction } from "express";

export default interface IAuth extends Document {
  username?: string;
  password: string;
  securityQuestion?: string;
  securityAnswer?: string;
  verified?: boolean;

  // Methods
  comparePassword(inputPassword: string, next: NextFunction): Promise<boolean>;
}