
const socket = io('http://localhost:3000');

const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('roomId');
const userId = Math.floor(Math.random() * 1000000);

document.getElementById('room-display').textContent = roomId;

function log(msg) {
  const logEl = document.getElementById('event-log');
  const entry = document.createElement('div');
  entry.textContent = msg;
  logEl.appendChild(entry);
  logEl.scrollTop = logEl.scrollHeight;
}


socket.emit('join-room', { roomId, userId });

socket.on('user-joined', (userId) => {
  log(`👋 User ${id} joined`);
});

socket.on('user-left', (id) => {
  console.log(`User ${id} left`);
  log(`🚪 User ${id} left`);
});

socket.on('receive-edit', (data) => {
  if (data.type === 'marker') {
    addMarkerToUI(data.payload);
  } else if (data.type === 'video') {
    loadVideo(data.payload);
  }
});


function sendMarker() {
  const time = document.getElementById('video-player').currentTime;
  socket.emit('send-edit', {
    roomId,
    type: 'marker',
    payload: { userId, time }
  });
  addMarkerToUI({ userId, time });
}

function addMarkerToUI({ userId, time }) {
  const ul = document.getElementById('marker-list');
  const li = document.createElement('li');
  li.textContent = `User ${userId} added a marker at ${time.toFixed(2)}s`;
  ul.appendChild(li);
}

// Video upload
document.getElementById('video-upload').addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const videoUrl = e.target.result;
      loadVideo(videoUrl);
      socket.emit('send-edit', {
        roomId,
        type: 'video',
        payload: videoUrl
      });
    };
    reader.readAsDataURL(file);
  }
});

function loadVideo(src) {
  const video = document.getElementById('video-player');
  video.src = src;
}

