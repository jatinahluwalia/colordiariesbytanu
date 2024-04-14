'use server';

import { Schema } from '@/components/form/BookingForm';
import Makeup, { MakeupType } from '../models/makeup.model';
import { connectToDB } from '../mongoose';
import { transporter } from '../nodemailer';
import dayjs from 'dayjs';

export const createMakeup = async (props: Schema) => {
  try {
    connectToDB();

    const data = {
      ...props,
      makeups: props.makeups.map((makeup) => ({
        ...makeup,
        date: new Date(makeup.date.getTime() + 19800000),
      })),
    };

    transporter.sendMail({
      to: 'ahluwalia.tanu@gmail.com',
      subject: `Makeup Booking for ${data.name}`,
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
                <div style="padding-left: 16px">${data.name}</div>
              </div>
              <div style="display: flex; padding-top: 16px">
                <label for="name">Contact: </label>
                <div style="padding-left: 16px">${data.contact}</div>
              </div>
              <div style="display: flex; padding-top: 16px">
                <label for="name">Occassion: </label>
                <div style="padding-left: 16px">${
                  data.occasion || 'Not given'
                }</div>
              </div>
              <div style="display: flex; padding-top: 16px">
                <label for="name">Skin Allergy: </label>
                <div style="padding-left: 16px">${
                  data.skinAllergy || 'No'
                }</div>
              </div>
              <div style="display: flex; padding-top: 16px">
                <label for="name">Alternate Contact: </label>
                <div style="padding-left: 16px">${
                  data.alternateContact || 'Not given'
                }</div>
              </div>

              <div class="makeups">
                <h2 style="color: blue">Makeups</h2>
                ${data.makeups.map(
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
                      'DD MMM, YYYY',
                    )}</div>
                  </div>
                  <div style="display: flex; padding-top: 16px;">
                    <label for="name">Ready Time: </label>
                    <div style="padding-left: 16px">${makeup.readyTime}</div>
                  </div>
                </div>
                `,
                )}
              </div>
            </div>
          </div>
        </div>

      `,
    });
    await Makeup.create(data);

    return 'Form submitted successfully';
  } catch (error) {
    console.log(error);
    throw new Error('Error submitting form');
  }
};

export const getMakeups = async () => {
  try {
    connectToDB();
    const data = await Makeup.aggregate([
      { $sort: { 'makeups.location': -1 } },
    ]);
    return data as unknown as MakeupType[];
  } catch (error) {
    console.log('[GETMAKEUP]', error);
  }
};
