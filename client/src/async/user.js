class User {
  async uploadVideo(userData) {
    const body = new FormData();

    body.append('id', userData.id);
    body.append('name', userData.name);
    body.append('username', userData.username);
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
  async getUserSubscriptions(id) {
    const res = await fetch(
      `http://localhost:3001/api/user/getUserSubscriptions?id=${id}`
    );
    return res.json();
  }
  async getAboutInfo(id) {
    const res = await fetch(
      `http://localhost:3001/api/user/getAboutInfo/${id}`
    );
    return res.json();
  }
  async setAboutText(userData) {
    const res = await fetch(`http://localhost:3001/api/user/setAboutText`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers:{'content-type':'application/json'}
    });
    return res.json();
  }
  async setAboutLink(userData) {
    const res = await fetch(`http://localhost:3001/api/user/setAboutLink`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers:{'content-type':'application/json'}
    });
    return res.json();
  }
}

export default new User();
