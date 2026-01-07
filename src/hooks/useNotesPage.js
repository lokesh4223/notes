import { useEffect, useState } from 'react'
import useNotesApi from './useNotesApi'
import { mapNoteFromApi } from '@/utils/mapApiTasks'
import { sortTasks } from '@/utils/sortTasksByComplete'

export default function useNotesPage () {
  const [notes, setNotes] = useState(null)
  const [errors, setErrors] = useState({
    createNote: '',
    updateNote: '',
    deleteNote: ''
  })
  const { getAllNotes, deleteNote, updateNote, createNote } = useNotesApi()

  useEffect(() => {
    getAllNotes()
      .then((data) =>
        setNotes(sortTasks(data))
      )
      .catch((error) => { throw new Error(error) })
  }, [getAllNotes])

  const handleDeleteNote = (id) => {
    deleteNote(id).then(() => {
      setNotes(notes.filter((note) => note.id !== id))
      setErrors({ ...errors, deleteNote: '' })
    }).catch((error) => {
      setErrors({ ...errors, deleteNote: error })
      throw new Error(error)
    })
  }

  const handleCreateNote = async (noteData) => {
    try {
      const data = await createNote(noteData)
      const sortNotesFromApi = sortTasks([...notes, data])
      setNotes(sortNotesFromApi)
      setErrors({ ...errors, createNote: '' })
    } catch (error) {
      setErrors({ ...errors, createNote: error.message })
      throw new Error(error.message)
    }
  }

  const handleUpdateNote = async (updatedNote) => {
    try {
      const data = await updateNote(updatedNote)
      const mappedNote = mapNoteFromApi(data)
      const sortNotesFromApi = sortTasks(notes.map((note) => {
        if (note.id === mappedNote.id) return mappedNote
        return note
      }))

      setNotes(sortNotesFromApi)
      setErrors({ ...errors, updateNote: '' })
    } catch (error) {
      setErrors({ ...errors, updateNote: error.message })
      throw new Error(error.message)
    }
  }

  return { notes, handleDeleteNote, handleCreateNote, handleUpdateNote, errors }
}