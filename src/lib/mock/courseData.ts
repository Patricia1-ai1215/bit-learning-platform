export interface Module {
  id: string;
  title: string;
  mins: number;
  status: "done" | "current" | "todo";
  category: "Pre-class" | "Post-class";
  objectives: string[];
}

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
  id: "c1",
  code: "CS-2041",
  title: "Linear Algebra",
  lessons: [
    {
      id: "l1",
      title: "Foundations",
      modules: [
        {
          id: "m1",
          title: "Vectors & Spaces",
          mins: 8,
          status: "done",
          category: "Pre-class",
          objectives: [
            "Understand vector spaces",
            "Calculate dot products",
          ],
        },
        {
          id: "m2",
          title: "Matrix Operations",
          mins: 12,
          status: "current",
          category: "Pre-class",
          objectives: [
            "Understand matrix multiplication",
            "Apply dot product to problems",
          ],
        },
      ],
    },
    {
      id: "l2",
      title: "Applications",
      modules: [
        {
          id: "m3",
          title: "Eigenvalues",
          mins: 10,
          status: "todo",
          category: "Post-class",
          objectives: ["Define eigenvalues/eigenvectors"],
        },
        {
          id: "m4",
          title: "Linear Systems",
          mins: 15,
          status: "todo",
          category: "Post-class",
          objectives: ["Solve linear systems"],
        },
      ],
    },
  ],
};

