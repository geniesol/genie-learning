export const MOCK_COURSES = [
  {
    id: "dm-1",
    title: "Digital Marketing Specialist",
    slug: "digital-marketing-specialist",
    description: "Get the 360-degree exposure to Digital Marketing through high-quality projects. Master SEO, Social Media, and Analytics.",
    instructor: "David Miller",
    instructorBio: "Global Marketing Strategist with 20+ years expertise in driving exponential growth for Fortune 500 brands.",
    category: "Digital Marketing",
    level: "Beginner",
    duration: "6 Months",
    price: 99.99,
    lessonsCount: 45,
    enrolled: 4500,
    rating: 4.8,
    metadata: {
      category: "Marketing",
      level: "Professional",
      duration: "180 Days",
      featured: true,
      tags: ["SEO", "Adwords", "Content Marketing"]
    },
    learningOutcomes: [
      "Master Search Engine Optimization (SEO)",
      "Design advanced Social Media campaigns",
      "Understand Customer Acquisition Cost (CAC)",
      "Analyze data with Google Analytics 4"
    ],
    sections: [
      {
        id: "dm_s1",
        title: "SEO Foundations",
        lessons: [
          { id: "dm_l1", title: "Keyword Research & Analysis", type: "video", durationMinutes: 45 },
          { id: "dm_l2", title: "On-Page SEO Optimization", type: "video", durationMinutes: 60 }
        ]
      }
    ]
  },
  {
    id: "1",
    title: "AI & Machine Learning Boot Camp",
    slug: "ai-machine-learning-bootcamp",
    description: "Master AI and Machine Learning with this comprehensive bootcamp. Learn Python, Scikit-Learn, TensorFlow, and more.",
    price: 999,
    lessonsCount: 45,
    metadata: {
      level: "Intermediate",
      duration: "6 Months",
      category: "AI & Machine Learning"
    }
  },
  {
    id: "2",
    title: "Generative AI Masters Program",
    slug: "generative-ai-masters",
    description: "Deep dive into Large Language Models, Stable Diffusion, and GANs. Build real-world GenAI applications.",
    price: 1299,
    lessonsCount: 38,
    metadata: {
      level: "Advanced",
      duration: "4 Months",
      category: "Generative AI"
    }
  },
  {
    id: "3",
    title: "Data Science Specialization",
    slug: "data-science-specialization",
    description: "Learn to analyze and interpret complex data to help businesses make informed decisions. Covers R, Python, and Tableau.",
    price: 899,
    lessonsCount: 52,
    metadata: {
      level: "Beginner",
      duration: "7 Months",
      category: "Data Science"
    }
  },
  {
    id: "4",
    title: "Digital Marketing Specialist",
    slug: "digital-marketing-specialist",
    description: "Become a digital marketing expert with skills in SEO, SEM, Social Media, and Analytics.",
    price: 799,
    lessonsCount: 40,
    metadata: {
      level: "Beginner",
      duration: "5 Months",
      category: "Digital Marketing"
    }
  },
  {
    id: "5",
    title: "Cloud Computing Architect",
    slug: "cloud-computing-architect",
    description: "Design and deploy scalable cloud infrastructures. High focus on AWS, Azure, and Google Cloud Platform.",
    price: 1099,
    lessonsCount: 48,
    metadata: {
      level: "Intermediate",
      duration: "6 Months",
      category: "Cloud Computing"
    }
  },
  {
    id: "ds-1",
    title: "Data Science with Python",
    slug: "data-science-python",
    description: "Master the data science lifecycle with Python. Learn data cleaning, visualization, and predictive modeling.",
    instructor: "Sarah Watson",
    instructorBio: "Senior Data Scientist at TechGiant, specializing in predictive analytics and large-scale data systems.",
    category: "Data Science",
    level: "Intermediate",
    duration: "4 Months",
    price: 159.99,
    lessonsCount: 38,
    enrolled: 3200,
    rating: 4.9,
    metadata: {
      category: "Data Science",
      level: "Intermediate",
      duration: "120 Days",
      featured: true,
      tags: ["Python", "Pandas", "Scikit-Learn"]
    },
    learningOutcomes: [
      "Perform exploratory data analysis (EDA)",
      "Build predictive models with Scikit-Learn",
      "Visualize complex data with Seaborn",
      "Implement machine learning algorithms"
    ],
    sections: [
      {
        id: "ds_s1",
        title: "Introduction to Data Science",
        lessons: [
          { id: "ds_l1", title: "Python for Data Science Recap", type: "video", durationMinutes: 50 },
          { id: "ds_l2", title: "Data Wrangling with Pandas", type: "video", durationMinutes: 75 }
        ]
      }
    ]
  },
  {
    id: "mock-1",
    title: "Advanced AI Systems Engineering",
    slug: "advanced-ai-systems-engineering",
    description: "Master the architecture of resilient, production-grade AI platforms using LLMOps and RAG.",
    instructor: "Dr. Sarah Chen",
    instructorBio: "Lead AI Architect at Silicon Valley Labs with 15+ years of experience in distributed systems and ML.",
    category: "Artificial Intelligence",
    level: "Advanced",
    duration: "40 Hours",
    price: 199.99,
    lessonsCount: 24,
    enrolled: 1250,
    rating: 4.9,
    metadata: {
      category: "AI",
      level: "Advanced",
      duration: "40 Hours",
      featured: true,
      tags: ["LLMOps", "RAG", "Vector-DB"]
    },
    learningOutcomes: [
      "Design scalable RAG architectures",
      "Implement automated LLM evaluation",
      "Optimize vector database indexing",
      "Deploy production-grade LLMOps"
    ],
    sections: [
      {
        id: "s1",
        title: "Vector Databases & Semantic Search",
        lessons: [
          { id: "l1", title: "High-Dimensional Indexing", type: "video", durationMinutes: 45 },
          { id: "l2", title: "RAG Patterns", type: "video", durationMinutes: 60 }
        ]
      }
    ]
  },
  {
    id: "mock-4",
    title: "Zero-Trust Cybersecurity Architect",
    slug: "zero-trust-cybersecurity",
    description: "Design and implement modern security architectures built on the principle of 'never trust, always verify'.",
    instructor: "James Miller",
    instructorBio: "Ex-NSA security analyst and founder of 'SecureGrid'. 20+ years in offensive/defensive security.",
    category: "Cybersecurity",
    level: "Advanced",
    duration: "45 Hours",
    price: 249.99,
    lessonsCount: 30,
    enrolled: 620,
    rating: 4.9,
    metadata: {
      category: "Cybersecurity",
      level: "Advanced",
      duration: "45 Hours",
      featured: true,
      tags: ["IAM", "Network Security", "Cloud Sec"]
    },
    learningOutcomes: [
      "Design multi-tier Zero-Trust architectures",
      "Implement granular IAM policies",
      "Secure containerized workloads",
      "Red-team simulations"
    ],
    sections: []
  },
  {
    id: "cloud-1",
    title: "AWS Cloud Architect Masterclass",
    slug: "aws-cloud-architect",
    description: "Prepare for the AWS Certified Solutions Architect - Associate exam. Design fault-tolerant cloud systems.",
    instructor: "Alex Rivera",
    instructorBio: "Certified AWS Solutions Architect Pro with experience migrating enterprise workloads to the cloud.",
    category: "Cloud Computing",
    level: "Intermediate",
    duration: "5 Months",
    price: 149.99,
    lessonsCount: 50,
    enrolled: 5100,
    rating: 4.8,
    metadata: {
      category: "Cloud",
      level: "Intermediate",
      duration: "150 Days",
      featured: false,
      tags: ["AWS", "S3", "EC2", "Lambda"]
    },
    learningOutcomes: [
      "Manage AWS global infrastructure",
      "Compute services and storage solutions",
      "Database and network management",
      "Security and compliance best practices"
    ],
    sections: []
  }
];
