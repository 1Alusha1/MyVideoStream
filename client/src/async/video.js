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
  async comment(userData) {
    const res = await fetch('http://localhost:3001/api/video/comment', {
      method: 'post',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });

    return res.json();
  }
  async getComments(videoId) {
    const res = await fetch('http://localhost:3001/api/video/getComment', {
      method: 'post',
      body: JSON.stringify({ id: videoId }),
      headers: { 'content-type': 'application/json' },
    });

    return res.json();
  }

  async view(id) {
    await fetch(`http://localhost:3001/api/video/view?id=${id}`);
  }
}

export default new Video();
