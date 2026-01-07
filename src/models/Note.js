import { Schema, model, models } from 'mongoose'

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'The title is required'],
      trim: true,
      maxlength: [100, 'The title must be less than 100 characters']
    },
    content: {
      type: String,
      required: [true, 'The content is required'],
      trim: true,
      maxlength: [1000, 'The content must be less than 1000 characters']
    }
  },
  {
    timestamps: true
  }
)

export default models.Note || model('Note', noteSchema)