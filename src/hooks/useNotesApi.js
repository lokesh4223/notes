import { API_URL } from '@/constants'
import { mapNoteFromApi, mapNoteToApi, mapNotesFromApi } from '@/utils/mapApiTasks'
import { useCallback } from 'react'

export default function useNotesApi () {
  const getAllNotes = useCallback(async () => {
    try {
      const res = (await fetch(`${API_URL}/notes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }))
      const data = await res.json()

      const mappedNotes = mapNotesFromApi(data)

      return mappedNotes
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  const getNoteById = useCallback(async (id) => {
    try {
      const res = (await fetch(`${API_URL}/notes/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }))
      const data = await res.json()

      const mappedNote = mapNoteFromApi(data)

      return mappedNote
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  const createNote = useCallback(async (newNote) => {
    try {
      const mappedNote = mapNoteToApi(newNote)

      const res = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        body: JSON.stringify(mappedNote),
        headers: {
          'Content-Type': 'application/json'
        }

      })
      const note = await res.json()
      if (note.error) {
        throw new Error(note.message)
      }
      if (res.status === 200) {
        const mappedNoteFromApi = mapNoteFromApi(note)
        return mappedNoteFromApi
      }
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  const updateNote = useCallback(async (updatedNote) => {
    try {
      const mappedNote = mapNoteToApi(updatedNote)

      const res = await fetch(`${API_URL}/notes/${updatedNote.id}`, {
        method: 'PUT',
        body: JSON.stringify(mappedNote),
        headers: {
          'Content-Type': 'application/json'
        }

      })
      const formatRes = await res.json()

      if (res.status === 200) {
        return formatRes
      }
      throw new Error(formatRes.message)
    } catch (error) {
      throw new Error(error.message)
    }
  }, [])

  const deleteNote = useCallback(async (id) => {
    try {
      const res = await fetch(`${API_URL}/notes/${id}`, {
        method: 'DELETE'
      })
      await res.json()

      if (res.status === 200) {
        return true
      }
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  return { getAllNotes, getNoteById, createNote, updateNote, deleteNote }
}