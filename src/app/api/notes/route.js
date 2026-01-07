import { NextResponse } from 'next/server'
import { connectDB } from '@/utils/mongoose'
import Note from '@/models/Note'

// Get all notes
export async function GET () {
  await connectDB()

  const notes = await Note.find()

  return NextResponse.json(notes)
}

// Create new note
export async function POST (req) {
  try {
    const data = await req.json()

    const newNote = new Note(data)
    const savedNote = await newNote.save()

    return NextResponse.json(savedNote)
  } catch (error) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return NextResponse.json(
        {
          error: true,
          message: 'The title must be unique for every note'
        },
        {
          status: 400
        }
      )
    } else {
      return NextResponse.json(
        {
          error: true,
          message: error.message
        },
        {
          status: 400
        }
      )
    }
  }
}