import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    category: { type: String, enum: ['cardio', 'strength', 'mobility'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ type: String, required: true }],
  },
  { timestamps: true },
)

export const Workout = mongoose.model('Workout', workoutSchema)