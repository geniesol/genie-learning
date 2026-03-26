import axios from 'axios';

async function verifyAuth() {
  const API_URL = 'http://localhost:3001'; // Direct api-core port
  const testUser = {
    email: `test-${Date.now()}@genie.com`,
    password: 'Password123!',
    role: 'student',
    region: 'US'
  };

  console.log('🔐 Verifying Authentication Flow...');

  try {
    // 1. Register
    console.log('📝 Registering new user...');
    const registerRes = await axios.post(`${API_URL}/auth/register`, testUser);
    console.log('✅ Registration successful. Token received.');
    const token = registerRes.data.access_token;

    // 2. Login
    console.log('🔑 Logging in...');
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login successful. JWT issued.');
    const loginToken = loginRes.data.access_token;

    // 3. Access Protected Route
    console.log('🛡️ Accessing protected /auth/me...');
    const meRes = await axios.get(`${API_URL}/auth/me`, {
      headers: { 
        Authorization: `Bearer ${loginToken}`
      }
    });
    console.log('✅ Profile retrieved:', meRes.data);

    if (meRes.data.email === testUser.email) {
      console.log('✨ AUTHENTICATION VERIFIED SUCCESSFULLY!');
    } else {
      console.log('❌ Email mismatch in profile data.');
    }

  } catch (err: any) {
    console.error('❌ Verification failed:', err.message);
    if (err.response) {
      console.error('Data:', err.response.data);
    }
  }
}

verifyAuth();
