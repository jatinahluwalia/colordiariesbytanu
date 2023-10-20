import { InferSchemaType, model, models, Schema } from "mongoose";

const makeupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  readyTime: {
    type: String,
    required: true,
  },
  occasion: {
    type: String,
    default: "",
  },
  skinAllergy: {
    type: String,
    default: "",
  },
  alternateContact: {
    type: String,
    default: "",
  },
  makeups: [
    {
      location: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
        min: new Date(),
      },
    },
  ],
});

export type MakeupType = InferSchemaType<typeof makeupSchema>;

const Makeup = models.Makeup || model<MakeupType>("Makeup", makeupSchema);

export default Makeup;
