import { Kid } from "../models/kidSchema.js";
import { GuestKidSchema } from "../models/kidSchema.js";
import emailGenerator from "./../nodemailer/nodemailer.js";

export const sendMail = async (req, res) => {
  if (req.collection == Kid) {
    try {
      // Call the sendMail function
      await emailGenerator(req.body.weekType);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email", error);
      res.status(500).json({ error: "Error sending email" });
    }
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
};

export const postNewKid = async (req, res) => {
  console.log(req.method);
  try {
    const newKid = await req.collection.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        Kid: newKid,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

export const updateKidInfo = async (req, res) => {
  console.log(req);
  try {
    console.log(req.body);

    const newKidInfo = await req.collection.findOneAndUpdate(
      { _id: req.query.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        newKidInfo: newKidInfo,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

export const deleteKidInfo = async (req, res) => {
  console.log(req);
  try {
    await req.collection.findOneAndDelete({ _id: req.query.id });

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

export const getFullList = async (req, res) => {
  try {
    console.log(req.query);

    const Kids = await req.collection.find();

    res.status(200).json({
      status: "success",
      results: req.collection.length,
      data: {
        Kids,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
