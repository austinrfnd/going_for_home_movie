/**
 * Going for Home - Admin Dashboard JavaScript
 * Handles authentication and contact submissions management
 */

let submissions = [];
let currentFilter = 'all';
let unsubscribe = null;
let currentModalSubmission = null;

// DOM elements
const loginView = document.getElementById('loginView');
const dashboardView = document.getElementById('dashboardView');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const userEmail = document.getElementById('userEmail');
const loadingState = document.getElementById('loadingState');
const emptyState = document.getElementById('emptyState');
const submissionsTable = document.getElementById('submissionsTable');
const submissionsBody = document.getElementById('submissionsBody');
const totalCount = document.getElementById('totalCount');
const unreadCount = document.getElementById('unreadCount');
const filterBtns = document.querySelectorAll('.filter-btn');

// Wait for Firebase to initialize
function waitForFirebase() {
  return new Promise((resolve) => {
    const check = () => {
      if (window.firebaseAdmin) {
        resolve();
      } else {
        setTimeout(check, 50);
      }
    };
    check();
  });
}

// Format date for display
function formatDate(timestamp) {
  if (!timestamp) return 'N/A';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Render submissions table
function renderSubmissions() {
  const filtered = submissions.filter(sub => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'unread') return !sub.read;
    return sub.inquiryType === currentFilter;
  });

  if (filtered.length === 0) {
    submissionsTable.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  submissionsTable.style.display = 'table';

  submissionsBody.innerHTML = filtered.map(sub => `
    <tr class="${sub.read ? '' : 'unread'}" data-id="${sub.id}" onclick="openModal('${sub.id}')">
      <td class="submission-date">${formatDate(sub.createdAt)}</td>
      <td>${escapeHtml(sub.name)}</td>
      <td><a href="mailto:${escapeHtml(sub.email)}" style="color: var(--accent-gold-light);" onclick="event.stopPropagation()">${escapeHtml(sub.email)}</a></td>
      <td><span class="submission-type ${sub.inquiryType}">${sub.inquiryType}</span></td>
      <td class="submission-message truncated">${escapeHtml(sub.message)}</td>
      <td class="submission-actions">
        <button class="action-btn ${sub.read ? 'marked-read' : ''}" onclick="event.stopPropagation(); toggleRead('${sub.id}', ${sub.read})">
          ${sub.read ? 'Read' : 'Mark Read'}
        </button>
      </td>
    </tr>
  `).join('');
}

// Update stats
function updateStats() {
  totalCount.textContent = submissions.length;
  unreadCount.textContent = submissions.filter(s => !s.read).length;
}

// Toggle read status
async function toggleRead(docId, currentStatus) {
  try {
    const { db, doc, updateDoc } = window.firebaseAdmin;
    await updateDoc(doc(db, 'contact_submissions', docId), {
      read: !currentStatus
    });
  } catch (error) {
    console.error('Error updating read status:', error);
  }
}

// Make toggleRead available globally
window.toggleRead = toggleRead;

// Modal functions
function openModal(submissionId) {
  const sub = submissions.find(s => s.id === submissionId);
  if (!sub) return;

  currentModalSubmission = sub;

  document.getElementById('modalName').textContent = sub.name;
  document.getElementById('modalEmail').textContent = sub.email;
  document.getElementById('modalEmail').href = `mailto:${sub.email}`;
  document.getElementById('modalDate').textContent = formatDate(sub.createdAt);
  document.getElementById('modalType').textContent = sub.inquiryType;
  document.getElementById('modalType').className = `submission-type ${sub.inquiryType}`;
  document.getElementById('modalMessage').textContent = sub.message;

  const readBtn = document.getElementById('modalReadBtn');
  readBtn.textContent = sub.read ? 'Mark Unread' : 'Mark Read';
  readBtn.className = `action-btn ${sub.read ? 'marked-read' : ''}`;

  document.getElementById('detailModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('detailModal').classList.remove('open');
  document.body.style.overflow = '';
  currentModalSubmission = null;
}

async function toggleReadFromModal() {
  if (!currentModalSubmission) return;
  await toggleRead(currentModalSubmission.id, currentModalSubmission.read);
  closeModal();
}

// Close modal on overlay click
document.getElementById('detailModal').addEventListener('click', (e) => {
  if (e.target.id === 'detailModal') {
    closeModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

window.openModal = openModal;
window.closeModal = closeModal;
window.toggleReadFromModal = toggleReadFromModal;

// Set up real-time listener for submissions
function subscribeToSubmissions() {
  const { db, collection, query, orderBy, onSnapshot } = window.firebaseAdmin;

  const q = query(
    collection(db, 'contact_submissions'),
    orderBy('createdAt', 'desc')
  );

  unsubscribe = onSnapshot(q, (snapshot) => {
    loadingState.style.display = 'none';

    submissions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    updateStats();
    renderSubmissions();
  }, (error) => {
    console.error('Error fetching submissions:', error);
    loadingState.innerHTML = '<p>Error loading submissions. Please refresh.</p>';
  });
}

// Handle filter clicks
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderSubmissions();
  });
});

// Handle login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    loginError.style.display = 'none';
    const { auth, signInWithEmailAndPassword } = window.firebaseAdmin;
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Login error:', error);
    loginError.textContent = 'Invalid email or password';
    loginError.style.display = 'block';
  }
});

// Handle logout
logoutBtn.addEventListener('click', async () => {
  try {
    const { auth, signOut } = window.firebaseAdmin;
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
  }
});

// Initialize
async function init() {
  await waitForFirebase();

  const { auth, onAuthStateChanged } = window.firebaseAdmin;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      loginView.style.display = 'none';
      dashboardView.style.display = 'block';
      userEmail.textContent = user.email;
      subscribeToSubmissions();
    } else {
      // User is signed out
      loginView.style.display = 'block';
      dashboardView.style.display = 'none';
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
      submissions = [];
    }
  });
}

init();
