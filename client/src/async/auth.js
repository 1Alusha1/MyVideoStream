class AuthAsync {
  async register(userData) {
    const res = await fetch('http://localhost:3001/api/auth/registration', {
      method: 'post',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });
    return res.json();
  }

  async login(userData) {
    const res = await fetch('http://localhost:3001/api/auth/login', {
      method: 'post',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });
    return res.json();
  }

  async checkAuth() {
    const res = await fetch('http://localhost:3001/api/auth/checkAuth', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${document.cookie.split('=')[1]}`,
      },
    })
    return res.json()
  }
}

export default new AuthAsync();
