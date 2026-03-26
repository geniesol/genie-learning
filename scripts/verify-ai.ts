import axios from 'axios';

async function verifyAI() {
  const API_URL = 'http://localhost:3002'; // Correct external mapping for ai-service

  console.log('🔍 Verifying AI Service...');

  try {
    // 1. Trigger Ingestion
    console.log('📤 Triggering ingestion...');
    const ingestRes = await axios.post(`${API_URL}/ai/ingest-courses`);
    console.log('✅ Ingestion triggered:', ingestRes.data);

    // 2. Test Chat
    console.log('💬 Testing chat (Instructional Design)...');
    const chatRes = await axios.post(`${API_URL}/ai/chat`, {
      question: 'What is the Bloom’s Taxonomy?'
    });
    console.log('🤖 AI Response:', chatRes.data.text);

    // 3. Test Tutor
    console.log('🧑‍🏫 Testing AI Tutor...');
    const tutorRes = await axios.post(`${API_URL}/ai/tutor`, {
      question: 'Explain the ROLE framework for prompting.',
      context: 'The student is asking about prompt engineering.'
    });
    console.log('🤖 Tutor Response:', tutorRes.data.text);

  } catch (err: any) {
    console.error('❌ Verification failed:', err.message);
    if (err.response) {
      console.error('Data:', err.response.data);
    }
  }
}

verifyAI();
