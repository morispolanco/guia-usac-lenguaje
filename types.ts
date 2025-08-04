
export interface User {
  id: string;
  email: string;
  passwordHash: string; // In a real app, never store plain text passwords
  hasPaid: boolean;
  progress: UserProgress;
}

export interface UserProgress {
  [unitId: string]: {
    completed: boolean;
    score: number | null;
  };
}

export enum QuizQuestionType {
  MultipleChoice = 'MultipleChoice',
  TrueFalse = 'TrueFalse',
  FillInBlank = 'FillInBlank',
}

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: string;
  options?: string[]; // For MultipleChoice
  answer: string | boolean; // Answer key
  explanation: string;
}

export interface Unit {
  id: string;
  title: string;
  content: {
    theory: string[]; // Paragraphs of theory
    examples: string[];
  };
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  units: Unit[];
}
