import { Handler } from "express";
import Advocate from "../../models/advocate/advocate";
import Auth from "../../models/auth/authModel";
import IAuth from "../../models/auth/InterfaceAuth";

const AddClient: Handler = async (req, res, next) => {
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
    const {
      courtComplex,
      caseType,
      caseNumber,
      caseYear,
      clientName,
      contactNumber,
      address,
      IAdetails,
      nextHearingDate,
    } = req.body;
    const data = {
      courtComplex: courtComplex,
      caseType: caseType,
      caseNumber: caseNumber,
      caseYear: caseYear,
      clientName: clientName,
      contactNumber: contactNumber,
      address: address,
      IAdetails: IAdetails,
      nextHearingDate: nextHearingDate,
    };
    const advocate = await Advocate.findOne({
      user: user._id,
    });
    if (!advocate) {
      return res.status(404).json({
        status: "FAILED",
        message: "This user type isn't allowed to login!!",
      });
    } else {
      if (!advocate.clientDetails.length) {
        await Advocate.updateOne(
          { user: user._id },
          { $addToSet: { clientDetails: data } }
        ).lean();
        return res.status(200).json({
            status: "SUCCESSFUL",
            message: "This client has been added!!",
          });
      } else {
        let updatedFlag = false;
        const updateDetails = async () => {
          let index = 0;
          for (const client of advocate.clientDetails) {
            if (client.caseNumber === caseNumber) {
              advocate.clientDetails[index] = data;
              await advocate.save();
              updatedFlag = true;
            }
            ++index;
          }
          if (!updatedFlag) {
            await Advocate.updateOne(
              { user: user._id },
              { $addToSet: { clientDetails: data } }
            ).lean();
            return res.status(200).json({
                status: "SUCCESSFUL",
                message: "This client has been added!!",
              });
          }
        };
        updateDetails();
      }
    }
    return res.status(200).json({
        status: "SUCCESSFUL",
        message: "This client has been updated!!",
      });
  } catch {
    return res.send("Not working");
  }
};

export { AddClient };
