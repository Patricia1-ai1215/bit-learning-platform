// src/lib/mock/courseData.ts

export interface Module {
  id: string;
  title: string;
  mins: number;
  status: 'done' | 'current' | 'todo';
  category: 'Pre-class' | 'Post-class';
  objectives: string[];
  steps: Step[]; // NEW: Added steps
}

export type StepType = 'TEXT' | 'DIAGRAM' | 'FLASHCARD' | 'QUIZ';

// Base Step interface
export interface BaseStep {
  id: string;
  type: StepType;
}

// Specific Step interfaces
export interface TextStep extends BaseStep {
  type: 'TEXT';
  content: string; // Markdown string
  pullQuote?: string;
  keyTerms?: string[];
}

export interface DiagramStep extends BaseStep {
  type: 'DIAGRAM';
  svgContent: string; // SVG string
  caption: string;
  ariaLabel: string;
}

export interface FlashcardStep extends BaseStep {
  type: 'FLASHCARD';
  cards: { front: string; back: string }[];
}

export interface QuizStep extends BaseStep {
  type: 'QUIZ';
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export type Step = TextStep | DiagramStep | FlashcardStep | QuizStep;

export interface Lesson {
  id: string;
  title: string;
  modules: Module[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  lessons: Lesson[];
}

export const mockCourseData: Course = {
  id: 'c1',
  code: 'CS-2041',
  title: 'Linear Algebra',
  lessons: [
    {
      id: 'l1',
      title: 'Foundations',
      modules: [
        { id: 'm1', title: 'Vectors & Spaces', mins: 8, status: 'done', category: 'Pre-class', objectives: ['Understand vector spaces'], steps: [] },
        { 
          id: 'm2', 
          title: 'Matrix Operations', 
          mins: 12, 
          status: 'current', 
          category: 'Pre-class',
          objectives: ['Understand matrix multiplication', 'Apply dot product to problems'],
          steps: [
            {
              id: 's1',
              type: 'TEXT',
              content: 'In supervised learning, you give the model a stack of examples where every input comes paired with the correct output. The model’s only job is to find a function that maps inputs to outputs well enough to handle new examples it has never seen.',
              pullQuote: '"A supervised learner is a student with an answer key. It learns by being told the right answer for thousands of examples."',
              keyTerms: ['Classification', 'Regression', 'Overfitting']
            },
            {
              id: 's2',
              type: 'DIAGRAM',
              svgContent: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" fill="#eef7ff" stroke="#2a7cff" /><rect x="110" y="10" width="80" height="80" fill="#eef7ff" stroke="#2a7cff" /><text x="50" y="55" text-anchor="middle" fill="#2a7cff" font-size="14">Input</text><text x="150" y="55" text-anchor="middle" fill="#2a7cff" font-size="14">Output</text></svg>`,
              caption: 'Basic input/output mapping in supervised learning.',
              ariaLabel: 'Diagram showing Input mapping to Output'
            },
            {
              id: 's3',
              type: 'FLASHCARD',
              cards: [
                { front: 'What does it mean for a learning task to be "supervised"?', back: 'The training data is labelled — every input example comes paired with the correct output.' },
                { front: 'What is the difference between classification and regression?', back: 'Classification predicts a discrete label. Regression predicts a continuous value.' },
                { front: 'Why do we split data into train and test sets?', back: 'To estimate how well the model will perform on data it has not seen.' }
              ]
            },
            {
              id: 's4',
              type: 'QUIZ',
              questions: [
                {
                  question: 'Which of these is a regression task, not classification?',
                  options: ['Detecting whether an email is spam', 'Predicting tomorrow’s temperature in degrees', 'Recognising the digit shown in an image', 'Flagging fraudulent transactions'],
                  correctIndex: 1,
                  explanation: 'Regression predicts a continuous number. Temperature is continuous; the others all output discrete categories.'
                }
              ]
            }
          ]
        },
      ],
    },
    {
      id: 'l2',
      title: 'Applications',
      modules: [
        { id: 'm3', title: 'Eigenvalues', mins: 10, status: 'todo', category: 'Post-class', objectives: ['Define eigenvalues/eigenvectors'], steps: [] },
      ],
    },
  ],
};

