import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.resolve(__dirname, '../../../.env');
console.log(`🔍 Loading env from: ${envPath}`);
dotenv.config({ path: envPath });

console.log(`🔗 DATABASE_URL: ${process.env.DATABASE_URL ? 'Loaded' : 'MISSING'}`);

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Clearing existing data...');
  
  // High-performance reset for PostgreSQL
  try {
    console.log('🔍 Fetching table names...');
    const tablenames = await prisma.$queryRaw<
      { tablename: string }[]
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    console.log(`📋 Found ${tablenames.length} tables`);

    const tables = tablenames
      .map(({ tablename }) => tablename)
      .filter((name) => name !== '_prisma_migrations')
      .map((name) => `"public"."${name}"`)
      .join(', ');

    if (tables) {
       console.log('🧨 Executing TRUNCATE...');
       await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
       console.log('✅ Database cleared');
    }
  } catch (error: any) {
    console.log('⚠️ Raw query/truncate failed:', error.message);
    console.log('🔄 Falling back to manual deletion sequence...');
    // Manual fallback
    try {
      await prisma.coursePricing.deleteMany({});
      await prisma.lesson.deleteMany({});
      await prisma.section.deleteMany({});
      await prisma.course.deleteMany({});
    } catch (e: any) {
      console.log('❌ Fallback deletion also failed:', e.message);
    }
  }
  
  console.log('🌱 Seeding database...');

  // 1. Create Courses
  const course1 = await prisma.course.upsert({
    where: { slug: 'instructional-design-mastery' },
    update: {},
    create: {
      title: 'Instructional Design Mastery',
      slug: 'instructional-design-mastery',
      description: 'Master the art of creating effective learning experiences.',
      status: 'published',
      instructorId: 'placeholder-instructor',
      regions: ['GLOBAL', 'IN', 'US'],
      metadata: {
        duration: '12h',
        level: 'Intermediate',
        category: 'Design',
        featured: true,
      },
      sections: {
        create: [
          {
            title: 'Foundations of ID',
            sortOrder: 1,
            lessons: {
              create: [
                {
                  title: 'Introduction to ADDIE',
                  content: { text: 'ADDIE is the classic framework for instructional design: Analyze, Design, Develop, Implement, Evaluate.' },
                  type: 'text',
                  durationMinutes: 10,
                  sortOrder: 1,
                },
                {
                  title: 'Learning Objectives and Bloom’s Taxonomy',
                  content: { text: 'Bloom’s Taxonomy helps categorize levels of reasoning from remembering to creating.' },
                  type: 'text',
                  durationMinutes: 15,
                  sortOrder: 2,
                },
              ],
            },
          },
          {
            title: 'Modern Methodologies',
            sortOrder: 2,
            lessons: {
              create: [
                {
                  title: 'Agile ID with SAM',
                  content: { text: 'Successive Approximation Model (SAM) is an agile alternative to traditional ADDIE.' },
                  type: 'text',
                  durationMinutes: 12,
                  sortOrder: 1,
                },
              ],
            },
          },
        ],
      },
    },
  });

  const course2 = await prisma.course.upsert({
    where: { slug: 'ai-for-educators-2026' },
    update: {},
    create: {
      title: 'AI for Educators 2026',
      slug: 'ai-for-educators-2026',
      description: 'Learn how to leverage generative AI to enhance teaching and automate admin.',
      status: 'published',
      instructorId: 'placeholder-instructor',
      regions: ['GLOBAL', 'IN'],
      metadata: {
        duration: '8h',
        level: 'Beginner',
        category: 'AI',
        featured: true,
      },
      sections: {
        create: [
          {
            title: 'GenAI Tools',
            sortOrder: 1,
            lessons: {
              create: [
                {
                  title: 'Prompt Engineering for Teachers',
                  content: { text: 'Effective prompting using the ROLE framework: Role, Objective, Limits, Example.' },
                  type: 'text',
                  durationMinutes: 20,
                  sortOrder: 1,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // 3. Advanced AI Systems Engineering
  const course3 = await prisma.course.upsert({
    where: { slug: 'advanced-ai-systems-engineering' },
    update: {},
    create: {
      title: 'Advanced AI Systems Engineering',
      slug: 'advanced-ai-systems-engineering',
      description: 'Architecting resilient, scalable AI platforms with LLMOps and RAG.',
      status: 'published',
      instructorId: 'placeholder-instructor',
      regions: ['GLOBAL', 'US', 'UK'],
      metadata: {
        duration: '40h',
        level: 'Advanced',
        category: 'AI',
        featured: true,
      },
      sections: {
        create: [
          {
            title: 'Vector Databases & Retrieval',
            sortOrder: 1,
            lessons: {
              create: [
                {
                  title: 'High-Dimensional Indexing with Qdrant',
                  content: { text: 'Qdrant uses HNSW (Hierarchical Navigable Small World) graphs for efficient vector search. Understanding distance metrics like Cosine, Dot Product, and Euclidean is critical for RAG performance.' },
                  type: 'text',
                  durationMinutes: 45,
                  sortOrder: 1,
                },
                {
                  title: 'Advanced RAG Strategies',
                  content: { text: 'Implementing Re-ranking, Self-Querying, and Parent-Document Retrieval to minimize hallucinations and maximize context precision.' },
                  type: 'text',
                  durationMinutes: 60,
                  sortOrder: 2,
                },
              ],
            },
          },
        ],
      },
      pricing: {
        create: [
          { region: 'US', currency: 'USD', price: 199.99 },
          { region: 'GLOBAL', currency: 'USD', price: 149.99 }
        ]
      }
    },
  });

  // 4. Genomic Knowledge Systems
  const course4 = await prisma.course.upsert({
    where: { slug: 'genomic-data-science' },
    update: {},
    create: {
      title: 'Genomic Data Science & Bio-computation',
      slug: 'genomic-data-science',
      description: 'Bridging biology and computation for the future of personalized medicine.',
      status: 'published',
      instructorId: 'placeholder-instructor',
      regions: ['GLOBAL', 'UK'],
      metadata: {
        duration: '35h',
        level: 'Advanced',
        category: 'Genomics',
        featured: false,
      },
      sections: {
        create: [
          {
            title: 'Foundations of Bioinformatics',
            sortOrder: 1,
            lessons: {
              create: [
                {
                  title: 'Genome Sequencing 101',
                  content: { text: 'Understanding Next-Generation Sequencing (NGS) and the computational challenges of assembly and alignment of short reads.' },
                  type: 'text',
                  durationMinutes: 50,
                  sortOrder: 1,
                },
                {
                  title: 'CRISPR & Computational Editing',
                  content: { text: 'Using AI algorithms to predict off-target effects in CRISPR-Cas9 genome editing.' },
                  type: 'text',
                  durationMinutes: 75,
                  sortOrder: 2,
                },
              ],
            },
          },
        ],
      },
      pricing: {
        create: [
          { region: 'UK', currency: 'GBP', price: 150.00 },
          { region: 'GLOBAL', currency: 'USD', price: 180.00 }
        ]
      }
    },
  });

  console.log(`✅ Seeded ${course1.title}, ${course2.title}, ${course3.title}, and ${course4.title}`);

  // 2. Create Sample CMS Content
  await prisma.cMSContent.upsert({
    where: { 
      type_slug_region: {
        type: 'page',
        slug: 'about-us',
        region: 'GLOBAL'
      }
    },
    update: {},
    create: {
      type: 'page',
      slug: 'about-us',
      region: 'GLOBAL',
      data: { 
        title: 'About Genie Learning',
        hero: 'We are revolutionizing education globally.', 
        vision: 'Accessible premium education for everyone.' 
      },
      status: 'published',
    },
  });

  console.log('✅ Seeded CMS content');
  console.log('🌱 Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
