export interface NoteType {
  id: string;
  contents: string;
  user: string;
  video: string;
  lastSaved: string;
}

export interface SharedNoteType {
  id: string;
  contents: string;
  userId: string;
  username: string;
  userProfile: string;
  lastSaved: string;
}
