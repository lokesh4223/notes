'use client'

import CreateNote from '@/components/CreateNote/CreateNote'
import LoadingTask from '@/components/LoadingTask/LoadingTask'
import useNotesPage from '@/hooks/useNotesPage'
import { Inter } from 'next/font/google'
import React, { Suspense, useState, useMemo } from 'react'
import TasksInfo from '@/components/TasksInfo/TasksInfo'

const LazyNote = React.lazy(() => import('@/components/NoteCard'))

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

export default function HomePage () {
  const { notes, handleDeleteNote, handleCreateNote, handleUpdateNote, errors } = useNotesPage()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState('newest') // 'newest' or 'oldest'

  // Filter notes based on search term
  const filteredNotes = useMemo(() => {
    if (!notes) return [];
    
    const filtered = notes.filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (note.content && note.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    // Sort notes based on selected option
    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      
      if (sortOption === 'newest') {
        return dateB - dateA; // Newer dates first
      } else {
        return dateA - dateB; // Older dates first
      }
    });
  }, [notes, searchTerm, sortOption]);

  return (
    <div className='gap-7 flex flex-col'>
      <header>
        <CreateNote actionOnCreate={handleCreateNote} errorMessage={errors.createNote} />
        <TasksInfo tasks={filteredNotes} />
        <div className="flex gap-4 mt-4">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-2 rounded border border-gray-600 bg-gray-700 text-white"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </header>
      <div className={`grid grid-rows-none gap-4 place-items-center ${inter.className} w-full`}>
        {filteredNotes?.length === 0 && <h2 className='text-2xl text-gray-100'>No notes found</h2>}
        {filteredNotes?.map((note) =>
          <Suspense fallback={<LoadingTask />} key={note.id}>
            <LazyNote noteData={note} key={note.id} actionOnUpdate={handleUpdateNote} actionOnDelete={handleDeleteNote} />
          </Suspense>
        )}
      </div>
    </div>
  )
}
