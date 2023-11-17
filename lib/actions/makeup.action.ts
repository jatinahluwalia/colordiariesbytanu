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
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
          </style>
          <title>Document</title>
        </head>
        <body
          style="font-family: 'Roboto'; margin: 0; padding: 0; box-sizing: border-box"
        >
          <div style="padding-inline: min(5rem, 5vw)">
            <h1>Hello Tanu, we have a new booking for you!</h1>
            <p style="color: gray">Here are the details:</p>

            <div
              style="
                display: flex;
                flex-direction: column;
                gap: 20px;
                font-size: 20px;
              "
            >
              <div style="display: flex; gap: 1rem; align-items: center">
                <label for="name">Name: </label>
                <div>${props.name}</div>
              </div>
              <div style="display: flex; gap: 1rem; align-items: center">
                <label for="name">Contact: </label>
                <div>${props.contact}</div>
              </div>
              <div style="display: flex; gap: 1rem; align-items: center">
                <label for="name">Occassion: </label>
                <div>${props.occasion}</div>
              </div>
              <div style="display: flex; gap: 1rem; align-items: center">
                <label for="name">Skin Allergy: </label>
                <div>${props.skinAllergy || "No"}</div>
              </div>
              <div style="display: flex; gap: 1rem; align-items: center">
                <label for="name">Alternate Contact: </label>
                <div>${props.alternateContact || "Not given"}</div>
              </div>

              <div class="makeups">
                <h2 style="color: blue">Makeups</h2>
                ${props.makeups.map(
                  (makeup, index) => `
                <h5>${index + 1}.</h5>
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    font-size: 20px;
                  "
                >
                  <div style="display: flex; gap: 1rem; align-items: center">
                    <label for="name">Location: </label>
                    <div>${makeup.location}</div>
                  </div>
                  <div style="display: flex; gap: 1rem; align-items: center">
                    <label for="name">Date: </label>
                    <div>${dayjs(makeup.date).format("DD MMM, YYYY")}</div>
                  </div>
                  <div style="display: flex; gap: 1rem; align-items: center">
                    <label for="name">Ready Time: </label>
                    <div>${makeup.readyTime}</div>
                  </div>
                </div>
                `
                )}
              </div>
            </div>
          </div>
        </body>
      </html>

      `,
    });
    await Makeup.create(props);

    return "Form submitted successfully";
  } catch (error) {
    console.log(error);
    throw new Error("Error submitting form");
  }
};
