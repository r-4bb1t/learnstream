export interface NoteType {
  id: string;
  contents: string;
  user: string;
  video: string;
  lastSaved: string;
  shared: boolean;
}

export interface SharedNoteType {
  id: string;
  preview: string;
  contents: string;
  userId: string;
  username: string;
  userProfile: string;
  lastSaved: string;
}
