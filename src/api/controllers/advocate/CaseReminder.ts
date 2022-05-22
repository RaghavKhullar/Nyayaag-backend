import { Handler } from "express";
import Advocate from "../../models/advocate/advocate";
import IAdvocate from "../../models/advocate/InterfaceAdvocateRegister";
import Auth from "../../models/auth/authModel";
import IAuth from "../../models/auth/InterfaceAuth";

const CaseReminder: Handler = async (req, res, next) => {
  try {
    if (req.session && !req.session.user) {
      return res.status(404).json({
        status: "FAILED",
        message: "Please Login before entering!!",
      });
    }
    const user: IAuth = await Auth.findOne({
      _id: req.session.user || null,
    }).lean();
    if (!user) {
      return res.status(404).json({
        status: "FAILED",
        message: "The requested User doesn't exists!!",
      });
    } else {
      if (!user.verified) {
        return res.status(404).json({
          status: "FAILED",
          message: "Please Verify your username to login!!",
        });
      }
      if (user.userType !== "advocate") {
        return res.status(404).json({
          status: "FAILED",
          message: "This user type isn't allowed to login!!",
        });
      }
    }
    const hearingDate:Date = new Date();
    const advocate: IAdvocate = await Advocate.findOne({
      user: user._id,
    }).lean();
    const clientDetails = advocate.clientDetails;
    if (!clientDetails) {
      return res
        .status(400)
        .jsonp({ status: 400, message: "No clients found" });
    } else {
      const clients: {
        courtComplex: string;
        caseType: string;
        caseNumber: string;
        caseYear: number;
        clientName: string;
        contactNumber: number;
        address: string;
        IAdetails: string;
        nextHearingDate: Date;
      }[] = [];
      clientDetails.forEach((client) => {
        if (client.nextHearingDate.getTime() > hearingDate.getTime()) {
          clients.push(client);
        }
      });
      
      clients.sort(
        (a, b) => a.nextHearingDate.getTime() - b.nextHearingDate.getTime()
      );
      return res.status(200).jsonp({
        status: "SUCCESSFUL",
        data: clients,
      });
    }
  } catch {
    return res.send("Not working");
  }
};

export { CaseReminder };
