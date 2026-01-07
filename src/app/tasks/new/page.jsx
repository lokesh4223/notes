'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useNotesApi from '@/hooks/useNotesApi'

export default function FormPage () {
  const router = useRouter()
  const params = useParams()
  const [newNote, setNewNote] = useState({
    title: '',
    content: ''
  })
  const { deleteNote, getNoteById, createNote, updateNote } = useNotesApi()

  const handleChange = (e) => {
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (params.id) {
      updateNote(newNote)
        .then((data) => router.push('/'))
        .catch((error) => { throw new Error(error) })
    } else {
      createNote(newNote)
        .then((data) => router.push('/'))
        .catch((error) => { throw new Error(error) })
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()

    deleteNote(params.id)
      .then((data) => router.push('/'))
      .catch((error) => { throw new Error(error) })
  }

  useEffect(() => {
    if (params.id) {
      getNoteById(params.id)
        .then((data) => {
          setNewNote(data)
        })
        .catch((error) => { throw new Error(error) })
    }
  }, [params.id, getNoteById])

  return (
    <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
      <form onSubmit={handleSubmit}>
        <h2 className='font-bold text-3xl'>
          {params.id ? 'Edit Note' : 'Create Note'}
        </h2>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={newNote.title}
          className='bg-gray-800 border-2 w-full p-4 rounded-lg my-4'
          onChange={handleChange}
        />
        <textarea
          name='content'
          placeholder='Content...'
          value={newNote.content}
          rows={5}
          className='bg-gray-800 border-2 w-full p-4 rounded-lg my-4'
          onChange={handleChange}
        />
        <div className='flex justify-between'>
          <button
            type='submit'
            className='bg-green-600 text-white px-4 py-2 rounded font-medium w-1/3'
          >
            Save
          </button>
          <button
            onClick={handleDelete}
            className='bg-red-600 text-white px-4 py-2 rounded font-medium w-1/3'
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  )
}
