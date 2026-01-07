import DeleteButton from './DeleteButton'
import { useCallback, useState } from 'react'
import { capitalizeFirstLetter } from '@/utils/capitalize'
import debounce from 'just-debounce-it'
import { NOTE } from '@/constants'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function NoteCard ({ noteData, actionOnDelete, actionOnUpdate }) {
  const [note, setNote] = useState({
    ...noteData,
    title: capitalizeFirstLetter(noteData.title)
  })
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showFullNote, setShowFullNote] = useState(false)

  const handleDelete = async () => {
    await actionOnDelete(note.id)
  }

  const handleDeleteClick = () => {
    setShowConfirm(true);
  }

  const handleConfirmDelete = async () => {
    await handleDelete();
    setShowConfirm(false);
  }

  const handleCancelDelete = () => {
    setShowConfirm(false);
  }

  const debouncedUpdateNote = useCallback(debounce(note => {
    actionOnUpdate(note).catch((error) => {
      setError(error.message)
    })
  }, 300), [actionOnUpdate])

  const handleUpdate = (e) => {
    const newNote = { ...note, [e.target.name]: e.target.value }
    setNote(newNote)
    setError('')

    if (e.target.name === NOTE.title && e.target.value.length > 100) {
      setError('The note title must be less than 100 characters')
      return
    }
    if (e.target.name === NOTE.content && e.target.value.length > 1000) {
      setError('The note content must be less than 1000 characters')
      return
    }
    if (e.target.name === NOTE.title && !e.target.value) {
      setError('The note title is required')
      return
    }
    if (e.target.name === NOTE.content && !e.target.value) {
      setError('The note content is required')
      return
    }

    debouncedUpdateNote(newNote)
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const toggleFullNote = () => {
    setShowFullNote(!showFullNote);
  }

  // Function to truncate content to first 6 words
  const truncateContent = (content, wordLimit = 6) => {
    if (!content) return '';
    const words = content.split(' ');
    if (words.length <= wordLimit) return content;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  return (
    <>
      <div className='bg-gray-500 p-2 rounded-lg transition-colors hover:border-secondary2 flex flex-col gap-2 justify-between items-center gap-5 break-keep w-full border-2 border-gray-400'>
        <div className='flex items-center justify-between w-full mb-2'>
          <div 
            onClick={toggleFullNote}
            className="cursor-pointer w-full"
          >
            <div className='text-sm font-semibold text-gray-100'>
              {note.title}
            </div>
            <div className='text-xs text-gray-300 mt-1'>
              {truncateContent(note.content, 6)}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(note.createdAt).toLocaleString()}
            </div>
          </div>
          <div className='flex space-x-2 ml-2'>
            <button 
              onClick={toggleEdit}
              className='text-blue-400 hover:text-blue-300'
            >
              <EditIcon fontSize="small" />
            </button>
            {!showConfirm ? (
              <button 
                onClick={handleDeleteClick}
                className='text-red-400 hover:text-red-300'
              >
                <DeleteIcon fontSize="small" />
              </button>
            ) : (
              <div className="flex space-x-2">
                <button 
                  onClick={handleConfirmDelete}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Confirm
                </button>
                <button 
                  onClick={handleCancelDelete}
                  className="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal for full note view */}
      {showFullNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-600 rounded-lg w-full max-w-md p-4 relative">
            <div className="flex justify-between items-center mb-2">
              {isEditing ? (
                <input
                  type="text"
                  value={note.title}
                  onChange={(e) => {
                    const newNote = { ...note, title: e.target.value };
                    setNote(newNote);
                    debouncedUpdateNote(newNote);
                  }}
                  className="text-lg font-semibold bg-transparent outline-none text-gray-100 w-full"
                />
              ) : (
                <h3 className="text-lg font-semibold text-gray-100">{note.title}</h3>
              )}
              <button 
                onClick={toggleFullNote}
                className="text-gray-300 hover:text-white"
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              {isEditing ? (
                <textarea
                  value={note.content}
                  onChange={(e) => {
                    const newNote = { ...note, content: e.target.value };
                    setNote(newNote);
                    debouncedUpdateNote(newNote);
                  }}
                  className="w-full bg-gray-700 text-gray-200 p-2 rounded outline-none"
                  rows="6"
                />
              ) : (
                <div className="text-gray-200">{note.content}</div>
              )}
            </div>
            <div className="text-xs text-gray-400">
              Created: {new Date(note.createdAt).toLocaleString()}
            </div>
            <div className="flex space-x-2 mt-4">
              {!isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={handleDeleteClick}
                    className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(false)}
                  className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Done
                </button>
              )}
            </div>
            
            {/* Confirmation for delete */}
            {showConfirm && (
              <div className="mt-4 p-3 bg-red-500 rounded">
                <p className="text-white text-sm mb-2">Are you sure?</p>
                <div className="flex space-x-2">
                  <button 
                    onClick={handleConfirmDelete}
                    className="text-xs bg-white text-red-500 px-2 py-1 rounded hover:bg-gray-200"
                  >
                    Yes
                  </button>
                  <button 
                    onClick={handleCancelDelete}
                    className="text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600"
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className={`text-xs text-error w-full ${!error ? 'hidden' : ''}`}>
        <p className='inline-block'>{error}</p>
      </div>
    </>
  )
}