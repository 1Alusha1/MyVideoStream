class Video {
  async like(userData) {
    const res = await fetch('http://localhost:3001/api/video/like', {
      method: 'post',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });

    return res.json();
  }
  async disLike(userData) {
    const res = await fetch('http://localhost:3001/api/video/disLike', {
      method: 'post',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });

    return res.json();
  }
  async subscribe(userData) {
    console.log(userData)
    const res = await fetch('http://localhost:3001/api/video/subscribe', {
      method: 'post',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });

    return res.json();
  }
}

export default new Video();
