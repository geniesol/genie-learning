import axios from 'axios';

const API_URL = 'http://localhost:3001/ai'; // AI Service URL
const CONCURRENT_REQUESTS = 10;
const TEST_QUESTION = 'What are the ethical implications of AI in schools?';

async function fireRequest(id: number) {
  const start = Date.now();
  try {
    const response = await axios.post(`${API_URL}/chat`, {
      question: TEST_QUESTION
    });
    const latency = Date.now() - start;
    console.log(`[Request ${id}] Success in ${latency}ms`);
    return latency;
  } catch (error: any) {
    console.error(`[Request ${id}] Failed: ${error.message}`);
    return null;
  }
}

async function runStressTest() {
  console.log(`🚀 Starting AI Stress Test with ${CONCURRENT_REQUESTS} concurrent requests...`);
  
  const startTime = Date.now();
  const promises = [];
  
  for (let i = 1; i <= CONCURRENT_REQUESTS; i++) {
    promises.push(fireRequest(i));
  }
  
  const results = await Promise.all(promises);
  const totalTime = Date.now() - startTime;
  
  const successfulRequests = results.filter(r => r !== null) as number[];
  const avgLatency = successfulRequests.length > 0 
    ? successfulRequests.reduce((a, b) => a + b, 0) / successfulRequests.length 
    : 0;

  console.log('\n--- Stress Test Report ---');
  console.log(`Total Requests: ${CONCURRENT_REQUESTS}`);
  console.log(`Successful: ${successfulRequests.length}`);
  console.log(`Average Latency: ${avgLatency.toFixed(2)}ms`);
  console.log(`Total Execution Time: ${totalTime}ms`);
  console.log('---------------------------');
}

runStressTest();
