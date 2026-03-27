export const MOCK_COURSES = [
  {
    id: "mock-1",
    title: "Advanced AI Systems Engineering",
    slug: "advanced-ai-systems-engineering",
    description: "Master the architecture of resilient, production-grade AI platforms using LLMOps and RAG.",
    instructor: "Dr. Sarah Chen",
    level: "Advanced",
    duration: "40 Hours",
    price: 199.99,
    category: "Artificial Intelligence",
    lessons: 24,
    enrolled: 1250,
    curriculum: [
      {
        title: "Vector Databases & Semantic Search",
        lessons: [
          { title: "High-Dimensional Indexing with Qdrant", duration: "45m" },
          { title: "Retrieval Augmented Generation (RAG) Patterns", duration: "60m" }
        ]
      },
      {
        title: "LLM Orchestration & Evaluation",
        lessons: [
          { title: "Chain-of-Thought Prompting Strategies", duration: "30m" },
          { title: "LLM Performance Benchmarking", duration: "50m" }
        ]
      }
    ]
  },
  {
    id: "mock-2",
    title: "Quantum Computing for Developers",
    slug: "quantum-dev-foundations",
    description: "Bridge the gap between classical logic and quantum circuits using Qiskit and real hardware.",
    instructor: "Prof. Marcus Bell",
    level: "Intermediate",
    duration: "32 Hours",
    price: 149.99,
    category: "Quantum Computing",
    lessons: 18,
    enrolled: 840,
    curriculum: [
      {
        title: "Quantum Gates & Circuits",
        lessons: [
          { title: "Qubits and Superposition", duration: "40m" },
          { title: "Entanglement & Bell States", duration: "55m" }
        ]
      }
    ]
  },
  {
    id: "mock-3",
    title: "Next-Gen Genomics & Bioinformatics",
    slug: "genomics-science-bioinformatics",
    description: "Computational biology techniques for sequence analysis and population genetics.",
    instructor: "Dr. Elena Volkov",
    level: "Beginner",
    duration: "25 Hours",
    price: 89.99,
    category: "BioScience",
    lessons: 15,
    enrolled: 2100,
    curriculum: [
      {
        title: "Sequence Alignment",
        lessons: [
          { title: "Blast and Smith-Waterman Algorithms", duration: "45m" },
          { title: "Genomic Data Processing", duration: "60m" }
        ]
      }
    ]
  }
];
