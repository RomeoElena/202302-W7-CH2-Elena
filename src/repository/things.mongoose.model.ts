import { model, Schema } from 'mongoose';
import { Thing } from '../entities/thing.js';

const thingSchema = new Schema<Thing>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  interestingScore: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  importantScore: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
});

export const ThingModel = model('Thing', thingSchema, 'things');

// Nombre del modelo, esquema, alias en singular y minúscula
