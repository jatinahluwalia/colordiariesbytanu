"use server";

import Makeup from "../models/makeup.model";
import { MakeupType } from "../models/makeup.model";
import { connectToDB } from "../mongoose";

export const createMakeup = async (props: MakeupType) => {
  try {
    await connectToDB();
    await Makeup.create(props);
    return "Form submitted successfully";
  } catch (error) {
    console.log(error);
    throw new Error("Error submitting form");
  }
};
