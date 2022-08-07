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
}

export default new User();
