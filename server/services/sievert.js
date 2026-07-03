const axios = require('axios');

const BASE_URL = 'https://apirest.cemenurnk.org.ar';
const FLEX_AGENT = 'apirest-sievert';

let systemToken = null;
let tokenExpires = null;

async function loginSystem() {
  const username = process.env.SYSTEM_AUTH_USER;
  const password = process.env.SYSTEM_AUTH_PASS;

  if (!username || !password) {
    throw new Error('SYSTEM_AUTH_USER y SYSTEM_AUTH_PASS deben estar definidos en .env');
  }

  const res = await axios.post(`${BASE_URL}/login/`, { username, password }, {
    headers: { flexAgent: FLEX_AGENT }
  });

  systemToken = res.data.tokenAuth;
  tokenExpires = new Date(res.data.expires);
  return systemToken;
}

async function getValidToken() {
  if (!systemToken || !tokenExpires || tokenExpires <= new Date()) {
    await loginSystem();
  }
  return systemToken;
}

async function getUserAccess(username, password) {
  const token = await getValidToken();
  const res = await axios.post(`${BASE_URL}/get_access/`, { username, password }, {
    headers: {
      flexAgent: FLEX_AGENT,
      'X-Authorization-token': token
    }
  });
  return res.data;
}

async function getCandidatos() {
  const token = await getValidToken();
  const res = await axios.get(`${BASE_URL}/sys_admi_01`, {
    headers: {
      flexAgent: FLEX_AGENT,
      'X-Authorization-token': token
    }
  });
  return res.data.data;
}

module.exports = { loginSystem, getValidToken, getUserAccess, getCandidatos };
