const authenticate = async () => {
  const response = await fetch('https://div-toggl-staging-backend-epraz.ondigitalocean.app/tokens', {
    method: 'POST',
    body: JSON.stringify({
      "user": {
        "email": "test@example.com",
        "password": "12341234"
      }
    })
  });
  const data = await response.json();
  return data;
};

const fetchProjects = async () => {
  const response = await fetch('https://div-toggl-staging-backend-epraz.ondigitalocean.app/api/v1/toggl//get_projects', {
    method: 'GET',
    headers: {'Authorization': 'Bearer 824161bdf8c648c23c7f0c8634b0be29b8bcd37f91c4d9c422888a4f49e55fb2'}
  });
  const data = await response.json();
  return data.projects;
};

const fetchClients = async () => {
  const response = await fetch('https://div-toggl-staging-backend-epraz.ondigitalocean.app/api/v1/toggl//get_clients', {
    method: 'GET',
    headers: {'Authorization': 'Bearer 824161bdf8c648c23c7f0c8634b0be29b8bcd37f91c4d9c422888a4f49e55fb2'}
  });
  const data = await response.json();
  return data;
};

const fetchTasks = async () => {
  const response = await fetch('https://div-toggl-staging-backend-epraz.ondigitalocean.app/api/v1/toggl//get_tasks', {
    method: 'GET',
    headers: {'Authorization': 'Bearer 824161bdf8c648c23c7f0c8634b0be29b8bcd37f91c4d9c422888a4f49e55fb2'}
  });
  const data = await response.json();
  return data;
};

const fetchTags = async () => {
  const response = await fetch('https://div-toggl-staging-backend-epraz.ondigitalocean.app/api/v1/toggl//get_tags', {
    method: 'GET',
    headers: {'Authorization': 'Bearer 824161bdf8c648c23c7f0c8634b0be29b8bcd37f91c4d9c422888a4f49e55fb2'}
  });
  const data = await response.json();
  return data.tags;
};

const fetchWebTimer = async () => {
  const response = await fetch('https://div-toggl-staging-backend-epraz.ondigitalocean.app/api/v1/toggl//get_web_timer', {
    method: 'GET',
    headers: {'Authorization': 'Bearer 824161bdf8c648c23c7f0c8634b0be29b8bcd37f91c4d9c422888a4f49e55fb2'}
  });
  const data = await response.json();
  return data;
};

const startTimer = async () => {
  const response = await fetch('https://div-toggl-staging-backend-epraz.ondigitalocean.app/api/v1/toggl//start_timer', {
    method: 'POST',
    headers: {'Authorization': 'Bearer 824161bdf8c648c23c7f0c8634b0be29b8bcd37f91c4d9c422888a4f49e55fb2'},
    body: JSON.stringify({
      "billable": true,
      "description": "Testing with start alone again1",
      "duration": -1,
      "toggl_project_id": 154740793
    })
  });
  const data = await response.json();
  return data;
};

const stopTimer = async () => {
  const response = await fetch('https://div-toggl-staging-backend-epraz.ondigitalocean.app/api/v1/toggl//stop_timer', {
    method: 'PATCH',
    headers: {'Authorization': 'Bearer 824161bdf8c648c23c7f0c8634b0be29b8bcd37f91c4d9c422888a4f49e55fb2'},
    body: JSON.stringify({
      "entry_id": "3165168920"
    })
  });
  const data = await response.json();
  return data;
};

const updateTimer = async () => {
  const response = await fetch('https://div-toggl-staging-backend-epraz.ondigitalocean.app/api/v1/toggl//update_timer_entry', {
    method: 'PUT',
    headers: {'Authorization': 'Bearer 824161bdf8c648c23c7f0c8634b0be29b8bcd37f91c4d9c422888a4f49e55fb2'},
    body: JSON.stringify({
      "entry_id": "3176402941",
      "start_time": "2023-10-22T02:33:26Z",
      "duration": 7200,
      "stop_time": "2023-10-22T04:33:26Z",
      "billable": true,
      "description": "Testing with start alone again9",
      "toggl_project_id": 154740793
    })
  });
  const data = await response.json();
  return data;
};

const logout = async () => {
  const response = await fetch('https://div-toggl-staging-backend-epraz.ondigitalocean.app/tokens', {
    method: 'DELETE',
    headers: {'Authorization': 'Bearer 824161bdf8c648c23c7f0c8634b0be29b8bcd37f91c4d9c422888a4f49e55fb2'}
  });
  const data = await response.json();
  return data;
};

export {
  authenticate,
  fetchProjects,
  fetchClients,
  fetchTasks,
  fetchTags,
  fetchWebTimer,
  startTimer,
  stopTimer,
  updateTimer,
  logout
};
