import { NextResponse } from 'next/server'
import { connectDB } from '@/utils/mongoose'
import Note from '@/models/Note'

export async function GET (req, { params }) {
  await connectDB()
  const validId = params.id

  try {
    const note = await Note.findById(validId)

    if (!note) {
      return NextResponse.json(
        {
          error: true,
          message: 'Note not found'
        },
        {
          status: 404
        }
      )
    }

    return NextResponse.json(note)
  } catch (error) {
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

export async function PUT (req, { params }) {
  try {
    const data = await req.json()

    const updatedNote = await Note.findByIdAndUpdate(params.id, data, {
      new: true
    })

    return NextResponse.json(updatedNote)
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

export async function DELETE (req, { params }) {
  try {
    const deletedNote = await Note.findByIdAndDelete(params.id)

    if (!deletedNote) {
      return NextResponse.json(
        {
          error: true,
          message: 'Note not found'
        },
        {
          status: 404
        }
      )
    }

    return NextResponse.json(deletedNote)
  } catch (error) {
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