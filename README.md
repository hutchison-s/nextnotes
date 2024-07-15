# Note Taking App

Welcome to NextNotes! This application allows users to create, edit, and view notes, both privately and publicly. Below is a guide to the structure and functionality of the app.

### App Router

The NextJS app is structured with the following routes:

#### Compose

- **Path:** `/compose`
- **Description:** This route allows users to compose a new note. Users can enter the title and content of the note and save it.

#### Help

- **Path:** `/help`
- **Description:** This route provides users with information and guidance on how to use the app. It includes FAQs, tutorials, and contact information for support.

#### Notes

- **Path:** `/notes`
- **Description:** This route displays a list of all notes created by the user. Users can view, edit, and delete their notes.

##### View Note

- **Path:** `/notes/[id]/`
- **Description:** This sub-route allows users to view an existing note.

##### Edit Note

- **Path:** `/notes/[id]/edit`
- **Description:** This sub-route allows users to edit an existing note. Users can update the title and content of the note.

#### Public Notes

- **Path:** `/public-notes`
- **Description:** This route displays a list of public notes created by various users. Notes here are visible to everyone.

##### User's Public Notes

- **Path:** `/public-notes/[user_id]/[note_id]`
- **Description:** This sub-route displays a searchable list of a specific user's public notes.

##### User's Public Note

- **Path:** `/public-notes/[user_id]/[note_id]`
- **Description:** This sub-route displays a specific public note created by a specific user. Anyone can view this note, but only the creator can edit it. This is also the link used for sharing a public note.

#### Sign-In

- **Path:** `/sign-in`
- **Description:** This route allows users to sign in to the app. Users can log in using their credentials to access their private notes and compose new ones.

#### Index

- **Path:** `/`
- **Description:** This is the main landing page of the app. It provides an overview of the app's features and encourages users to sign in.

### License

This project is licensed under the MIT License.
