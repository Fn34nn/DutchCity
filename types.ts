export interface DutchCity {
  id: string;
  name: string;
  province?: string;
  description?: string;
  notes: string;
  dutchName?: string; // Add optional Dutch name for beta search
}

export enum AppSection {
  SEARCH = 'search',
  NOTES = 'notes',
}

export enum AppLanguage {
  ENGLISH = 'en',
  DUTCH = 'nl',
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'chatbot';
  text: string;
}