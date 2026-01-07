'use client'

import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'

export default function CreateNote ({ actionOnCreate }) {
  const [noteData, setNoteData] = useState({
    title: '',
    content: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title' && value.length > 100) {
      setError('The note title must be less than 100 characters')
      return
    }
    if (name === 'content' && value.length > 1000) {
      setError('The note content must be less than 1000 characters')
      return
    }
    setNoteData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!noteData.title) {
      setError('The note title is required')
      return
    }
    if (!noteData.content) {
      setError('The note content is required')
      return
    }

    actionOnCreate(noteData)
      .then(() => {
        setNoteData({
          title: '',
          content: ''
        })
        setError('')
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  return (
    <div className='flex flex-col gap-2'>
      <form className='w-full gap-2 flex flex-col'>
        <input 
          onChange={handleChange} 
          value={noteData.title} 
          type='text' 
          name='title'
          autoFocus 
          placeholder='Add new note title' 
          className='w-full bg-gray-500 rounded-lg text-gray-100 text-base placeholder:text-gray-300 p-4 border-gray-700 border-2 outline-none transition-colors duration-300 hover:border-secondary2 focus:border-secondary2' 
        />
        <textarea
          onChange={handleChange}
          value={noteData.content}
          name='content'
          placeholder='Add note content...'
          rows="3"
          className='w-full bg-gray-500 rounded-lg text-gray-100 text-base placeholder:text-gray-300 p-4 border-gray-700 border-2 outline-none transition-colors duration-300 hover:border-secondary2 focus:border-secondary2'
        />
        <button 
          onClick={handleSubmit} 
          className='w-full bg-secondary2 h-full p-4 rounded-lg border-gray-700 border-2 flex items-center justify-center transition-colors duration-200 hover:border-secondary2'
        >
          <span className='hidden md:block'>Create Note</span>
          <AddIcon />
        </button>
      </form>
      <div className={`text-xs text-error ${!error ? 'invisible' : ''}`}>
        <p className='inline-block'>{error}</p>
      </div>
    </div>
  )
}