export interface Lesson {
  id: string;
  title: string;
  unit: string;
  unitTitle: string;
  order: number;
  accordionData: { title: string; content: string }[];
  islamicReflections?: string[];
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: 'tf' | 'mc';
  options?: string[];
  correct: string;
  explain: string;
}

export interface School {
  id: string;
  name: string;
  password?: string;
}

export interface Teacher {
  id: string;
  name: string;
  password?: string;
  schoolId: string;
}

export interface ActivationCode {
  code: string;
  status: 'active' | 'used';
  school: string;
  usedBy?: string;
}

export interface StudentScore {
  name: string;
  school: string;
  code: string;
  lessonId: string;
  lessonTitle: string;
  score: string;
  date: string;
}
