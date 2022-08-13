class User {
  async uploadVideo(userData) {
    const body = new FormData();

    body.append('id', userData.id);
    body.append('name', userData.name);
    body.append('description', userData.description);
    body.append('preview', userData.preview);
    body.append('videofile', userData.videofile);

    await fetch('http://localhost:3001/api/user/uploadVideo', {
      method: 'POST',
      mode: 'no-cors',
      body,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
  async getUserVideos(id) {
    const res = await fetch('http://localhost:3001/api/user/getUserVideos', {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: { 'content-type': 'application/json' },
    });

    const data = res.json();
    return data;
  }
  async getUserVideo(id) {
    const res = await fetch('http://localhost:3001/api/user/getUserVideo', {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: { 'content-type': 'application/json' },
    });

    const data = res.json();
    return data;
  }
}

export default new User();