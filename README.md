# Notes Management Application

A full-featured notes management application built with Next.js 13, React 18, MongoDB, and Tailwind CSS. This application provides a complete CRUD (Create, Read, Update, Delete) solution for managing notes with advanced features like search, sorting, and responsive design.

## Technology Stack & Flow

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React 18      │◄──►│  Next.js 13      │◄──►│   API Routes    │
│  (Frontend)     │    │  (Framework)     │    │   (Backend)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                        │
         │                ┌──────────────────┐           │
         └────────────────►   Middleware     │◄──────────┘
                          │                  │
                          └──────────────────┘
                                          │
                                          ▼
                          ┌─────────────────────────────┐
                          │     MongoDB Database      │
                          │   (Data Storage & Query)   │
                          └─────────────────────────────┘
```

## Features

- **Create Notes**: Create new notes with title and content
- **Read Notes**: View all notes in a responsive grid layout
- **Update Notes**: Edit existing notes in-place or in a modal view
- **Delete Notes**: Remove notes with confirmation dialog
- **Search Functionality**: Search notes by title or content (case-insensitive, real-time)
- **Sorting Options**: Sort notes by newest or oldest first
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Local Storage**: Data stored in MongoDB database
- **Modal View**: Detailed view of notes in a modal interface
- **Timestamps**: Automatic creation timestamps for each note

## Tech Stack

- **Frontend**: Next.js 13 (App Router), React 18
- **Styling**: Tailwind CSS, @emotion/react, Material-UI (MUI)
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Runtime**: Node.js
- **Package Manager**: Yarn/npm

## Installation

1. Clone the repository (or use the existing project)
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following content:
   ```
   # MongoDB Connection String
   MONGODB_URI=mongodb://localhost:27017/notes-app

   # For local development
   NEXT_PUBLIC_VERCEL_ENV=development
   NEXT_PUBLIC_VERCEL_URL=localhost:3000
   ```

4. Make sure MongoDB is running on your local machine

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes for CRUD operations
│   │   ├── notes/         # Notes API endpoints
│   │   └── tasks/         # Tasks API endpoints
│   ├── notes/             # Notes pages
│   │   ├── [id]/          # Note detail page
│   │   └── new/           # New note page
│   ├── globals.css        # Global styles
│   ├── layout.jsx         # Root layout
│   └── page.jsx           # Home page
├── components/            # React components
│   ├── NoteCard.jsx       # Note display component
│   ├── CreateNote/        # Create note component
│   ├── LoadingTask/       # Loading component
│   ├── TasksInfo/         # Tasks info component
│   └── DeleteButton.jsx   # Delete button component
├── hooks/                 # Custom React hooks
│   ├── useNotesApi.js     # API operations hook
│   └── useNotesPage.js    # Page state management hook
├── models/                # Mongoose models
│   ├── Note.js            # Note model
│   └── Task.js            # Task model
├── utils/                 # Utility functions
│   ├── capitalize.js      # Text capitalization utility
│   ├── mapApiTasks.js     # API data mapping utilities
│   ├── mongoose.js        # MongoDB connection utility
│   └── sortTasksByComplete.js # Sorting utility
├── constants.js           # Application constants
└── middleware.js          # Next.js middleware
```

## Component Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Application Layout                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    Header Section                           │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │ │
│  │  │   CreateNote    │  │   Search Bar    │  │ Sort By   │ │ │
│  │  │   Component     │  │   Component     │  │ Dropdown  │ │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────┘ │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    Notes Grid                               │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │ │
│  │  │   NoteCard  │  │   NoteCard  │  │   NoteCard  │        │ │
│  │  │    #1       │  │    #2       │  │    #3       │        │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘        │ │
│  │           ...                                              │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

NoteCard Component Breakdown:
┌─────────────────────────────────────────────────────────────────┐
│                         NoteCard                                │
├─────────────────────────────────────────────────────────────────┤
│ Title: [Note Title] [Edit Icon] [Delete Icon]                   │
│ Content: First 6 words...                                       │
│ Timestamp: Created at date/time                                 │
│ [Click to open Modal View]                                      │
└─────────────────────────────────────────────────────────────────┘

Modal View:
┌─────────────────────────────────────────────────────────────────┐
│                        Full Note View                           │
├─────────────────────────────────────────────────────────────────┤
│ Title: [Full Title]                                             │
│ Content: [Full Content Text]                                    │
│ Created: [Timestamp]                                            │
│ [Edit Button] [Delete Button] [Close Button]                    │
└─────────────────────────────────────────────────────────────────┘
```

## API Endpoints

### Notes API

- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/[id]` - Get a specific note
- `PUT /api/notes/[id]` - Update a specific note
- `DELETE /api/notes/[id]` - Delete a specific note

### Expected Data Format

**Note Object:**
```json
{
  "id": "string",
  "title": "string (required)",
  "content": "string (required)",
  "createdAt": "timestamp",
}
```

## Functionality

### Creating Notes
1. Use the "Create Note" form at the top of the page
2. Enter a title and content
3. Click "Create Note" button
4. The new note will appear in the list

### Viewing Notes
1. Notes are displayed in a grid layout
2. Each note shows title and first 6 words of content
3. Click on any note to open detailed view in modal

### Editing Notes
1. Click on a note to open the modal view
2. Click the "Edit" button
3. Modify the title and content
4. Click "Done" to save changes

### Deleting Notes
1. Click on a note to open the modal view
2. Click the "Delete" button
3. Confirm deletion in the confirmation dialog

### Searching Notes
1. Use the search input field at the top
2. Type any text to search in titles and content
3. Results update in real-time

### Sorting Notes
1. Use the dropdown menu next to search
2. Choose between "Newest First" and "Oldest First"
3. Notes are sorted by creation timestamp

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `NEXT_PUBLIC_VERCEL_ENV`: Environment indicator (development/production)
- `NEXT_PUBLIC_VERCEL_URL`: Base URL for API calls

## Development

This project uses Next.js App Router with the following features:

- File-based routing system
- Server-side rendering
- API routes for backend functionality
- Built-in CSS support
- Fast Refresh for real-time updates

## Database Models

### Note Model
- `title`: String (required, max 100 characters)
- `content`: String (required, max 1000 characters)
- `createdAt`: Date (auto-generated)

## Data Flow Diagram

```
User Interaction
       │
       ▼
┌─────────────────┐
│   React UI      │
│  Components     │
└─────────────────┘
       │
       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Call      │───►│   Next.js       │───►│   MongoDB       │
│   (fetch)       │    │   API Route     │    │   Database      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                            │                        │
                            ▼                        ▼
                    ┌─────────────────┐    ┌─────────────────┐
                    │   Validation    │    │   Data Query    │
                    │   & Processing  │    │   & Storage     │
                    └─────────────────┘    └─────────────────┘
                            │                        │
                            ▼                        ▼
                    ┌─────────────────┐    ┌─────────────────┐
                    │   Response      │◄───│   Result        │
                    │   Formatting    │    │   Processing    │
                    └─────────────────┘    └─────────────────┘
                            │
                            ▼
                    ┌─────────────────┐
                    │   React State   │
                    │   Update        │
                    └─────────────────┘
```

### MongoDB Schema

```
Note Schema:
{
  title: { type: String, required: true, maxlength: 100 },
  content: { type: String, required: true, maxlength: 1000 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please file an issue in the repository.