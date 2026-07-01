import { api } from './api';

export const facialService = {
  startAuth() {
    return api.post('/api/face-auth/start');
  },

  verifyAuth(sessionToken, frames) {
    return api.post('/api/face-auth/verify', { sessionToken, frames });
  },

  registerFace(imageBase64) {
    return api.post('/api/facial/register', { imageBase64 });
  },
};
