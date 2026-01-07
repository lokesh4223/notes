export function sortTasks(tasks) {
  if (!tasks || !Array.isArray(tasks)) {
    return [];
  }

  // Sort tasks: incomplete tasks first, then completed tasks
  return [...tasks].sort((a, b) => {
    // If both have the same completion status, sort by creation date (newest first)
    if (a.complete === b.complete) {
      const dateA = new Date(a.createdAt || a._id?.getTimestamp?.() || Date.now());
      const dateB = new Date(b.createdAt || b._id?.getTimestamp?.() || Date.now());
      return dateB - dateA; // Newer first
    }
    
    // Sort by completion status: incomplete (false) first, then complete (true)
    return a.complete - b.complete;
  });
}