import { Schema, model, models } from 'mongoose'

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'The title is required'],
      unique: [true, 'The title must be unique'],
      trim: true,
      maxlength: [100, 'The title must be less than 100 characters']
    },
    description: {
      type: String,
      required: false,
      trim: true,
      maxlength: [1000, 'The description must be less than 1000 characters']
    },
    complete: {
      type: Boolean,
      default: false
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

export default models.Task || model('Task', taskSchema)
