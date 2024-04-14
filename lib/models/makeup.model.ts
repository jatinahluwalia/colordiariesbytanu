import {
  InferSchemaType,
  Model,
  model,
  models,
  Schema,
  Document,
} from 'mongoose';

const makeupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },

  occasion: {
    type: String,
    default: '',
  },
  skinAllergy: {
    type: String,
    default: '',
  },
  alternateContact: {
    type: String,
    default: '',
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
      readyTime: {
        type: String,
        required: true,
      },
    },
  ],
});

export type MakeupType = Document & InferSchemaType<typeof makeupSchema>;

const Makeup: Model<MakeupType> =
  models.Makeup || model('Makeup', makeupSchema);

export default Makeup;
