class User {
  async uploadVideo(userData) {
    try {
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
    } catch (err) {
      console.log(err);
    }
  }
  async getUserVideos(id) {
    try {
      const res = await fetch('http://localhost:3001/api/user/getUserVideos', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: { 'content-type': 'application/json' },
      });
      return res.json();
    } catch (err) {
      console.log(err);
    }
  }
  async getUserVideo(id) {
    try {
      const res = await fetch('http://localhost:3001/api/user/getUserVideo', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: { 'content-type': 'application/json' },
      });

      return res.json();
    } catch (err) {
      console.log(err);
    }
  }
  async getUserSubscriptions(id) {
    try {
      const res = await fetch(
        `http://localhost:3001/api/user/getUserSubscriptions?id=${id}`
      );
      return res.json();
    } catch (err) {
      console.log(err);
    }
  }
  async getAboutInfo(id) {
    try {
      const res = await fetch(
        `http://localhost:3001/api/user/getAboutInfo/${id}`
      );
      return res.json();
    } catch (err) {
      console.log(err);
    }
  }
  async setAboutText(userData) {
    try {
      const res = await fetch(`http://localhost:3001/api/user/setAboutText`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'content-type': 'application/json' },
      });
      return res.json();
    } catch (err) {
      console.log(err);
    }
  }
  async setAboutLink(userData) {
    try {
      const res = await fetch(`http://localhost:3001/api/user/setAboutLink`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'content-type': 'application/json' },
      });
      return res.json();
    } catch (err) {
      console.log(err);
    }
  }
  async getUserSubscriptionsVideo(arrayId) {
    try {
      const res = await fetch(
        `http://localhost:3001/api/user/getUserSubscriptionsVideo`,
        {
          method: 'POST',
          body: JSON.stringify({ arrayId }),
          headers: { 'content-type': 'application/json' },
        }
      );
      return res.json();
    } catch (err) {
      console.log(err);
    }
  }
}

export default new User();
