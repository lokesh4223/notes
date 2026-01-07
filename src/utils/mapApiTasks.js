export function mapNotesFromApi (noteList) {
  return noteList.map((note) => ({
    id: note._id,
    title: note.title,
    content: note.content,
    description: note.description,
    complete: note.complete,
    createdAt: note.createdAt
  }))
}

export function mapNoteFromApi (note) {
  return {
    id: note._id,
    title: note.title,
    content: note.content,
    description: note.description,
    complete: note.complete,
    createdAt: note.createdAt
  }
}

export function mapNotesToApi (noteList) {
  return noteList.map((note) => ({
    _id: note.id,
    title: note.title,
    content: note.content,
    description: note.description,
    complete: note.complete,
    createdAt: note.createdAt
  }))
}

export function mapNoteToApi (note) {
  return {
    _id: note.id,
    title: note.title,
    content: note.content,
    description: note.description,
    complete: note.complete,
    createdAt: note.createdAt
  }
}

// Export task functions for backward compatibility
export function mapTasksFromApi (taskList) {
  return mapNotesFromApi(taskList);
}

export function mapTaskFromApi (task) {
  return mapNoteFromApi(task);
}

export function mapTasksToApi (taskList) {
  return mapNotesToApi(taskList);
}

export function mapTaskToApi (task) {
  return mapNoteToApi(task);
}
