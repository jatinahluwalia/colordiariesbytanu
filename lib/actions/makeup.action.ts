"use server";

import Makeup from "../models/makeup.model";
import { MakeupType } from "../models/makeup.model";
import { connectToDB } from "../mongoose";
import { transporter } from "../nodemailer";
import dayjs from "dayjs";

export const createMakeup = async (props: MakeupType) => {
  try {
    await connectToDB();

    transporter.sendMail({
      to: "ahluwalia.tanu@gmail.com",
      subject: `Makeup Booking for ${props.name}`,
      html: `
          <style>
            @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
          </style>
        <div
          style="font-family: 'Roboto';
        >
          <div style="padding-inline: 20px">
            <h1>Hello Tanu, we have a new booking for you!</h1>
            <p style="color: gray">Here are the details:</p>

            <div
              style="font-size: 20px;
              "
            >
              <div style="display: flex; padding-top: 16px">
                <label for="name">Name: </label>
                <div style="padding-left: 16px">${props.name}</div>
              </div>
              <div style="display: flex; padding-top: 16px">
                <label for="name">Contact: </label>
                <div style="padding-left: 16px">${props.contact}</div>
              </div>
              <div style="display: flex; padding-top: 16px">
                <label for="name">Occassion: </label>
                <div style="padding-left: 16px">${
                  props.occasion || "Not given"
                }</div>
              </div>
              <div style="display: flex; padding-top: 16px">
                <label for="name">Skin Allergy: </label>
                <div style="padding-left: 16px">${
                  props.skinAllergy || "No"
                }</div>
              </div>
              <div style="display: flex; padding-top: 16px">
                <label for="name">Alternate Contact: </label>
                <div style="padding-left: 16px">${
                  props.alternateContact || "Not given"
                }</div>
              </div>

              <div class="makeups">
                <h2 style="color: blue">Makeups</h2>
                ${props.makeups.map(
                  (makeup, index) => `
                <h5>${index + 1}.</h5>
                <div>
                  <div style="display: flex; padding-top: 16px;">
                    <label for="name">Location: </label>
                    <div style="padding-left: 16px">${makeup.location}</div>
                  </div>
                  <div style="display: flex; padding-top: 16px;">
                    <label for="name">Date: </label>
                    <div style="padding-left: 16px">${dayjs(makeup.date).format(
                      "DD MMM, YYYY"
                    )}</div>
                  </div>
                  <div style="display: flex; padding-top: 16px;">
                    <label for="name">Ready Time: </label>
                    <div style="padding-left: 16px">${makeup.readyTime}</div>
                  </div>
                </div>
                `
                )}
              </div>
            </div>
          </div>
        </div>

      `,
    });
    await Makeup.create(props);

    return "Form submitted successfully";
  } catch (error) {
    console.log(error);
    throw new Error("Error submitting form");
  }
};
