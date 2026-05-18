const searchForm = document.getElementById('searchForm');
const usernameInput = document.getElementById('usernameInput');
const searchBtn = document.getElementById('searchBtn');
const messageElement = document.getElementById('message');
const profileSection = document.getElementById('profile');
const reposSection = document.getElementById('repos');
const reposList = document.getElementById('reposList');

const GITHUB_API_BASE = 'https://api.github.com/users';

// -----------------------------
// 유틸리티 함수
// -----------------------------
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const setMessage = (text) => {
  messageElement.textContent = text;
};

const setLoading = (isLoading) => {
  searchBtn.disabled = isLoading;
  searchBtn.textContent = isLoading ? 'Loading...' : 'Search';
};

const clearUI = () => {
  profileSection.classList.add('hidden');
  reposSection.classList.add('hidden');
  profileSection.innerHTML = '';
  reposList.innerHTML = '';
};

// -----------------------------
// API 요청 함수
// -----------------------------
const getUser = async (username) => {
  const response = await fetch(`${GITHUB_API_BASE}/${username}`);

  if (response.status === 404) {
    throw new Error('NOT_FOUND');
  }

  if (!response.ok) {
    throw new Error('FETCH_ERROR');
  }

  return response.json();
};

const getRepos = async (username) => {
  const response = await fetch(`${GITHUB_API_BASE}/${username}/repos?sort=created&per_page=5`);

  if (!response.ok) {
    throw new Error('REPO_FETCH_ERROR');
  }

  return response.json();
};

// -----------------------------
// 렌더링 함수
// -----------------------------
const renderProfile = (user) => {
  const company = user.company ? user.company : '정보 없음';
  const blogHtml = user.blog
    ? `<a href="${user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}" target="_blank">${user.blog}</a>`
    : '정보 없음';
  const location = user.location ? user.location : '정보 없음';
  const createdAt = user.created_at ? formatDate(user.created_at) : '정보 없음';

  profileSection.innerHTML = `
    <div class="profile-header">
      <div class="profile-avatar">
        <img src="${user.avatar_url}" alt="${user.login} profile" />
        <a class="btn" href="${user.html_url}" target="_blank">View Profile</a>
      </div>
      <div>
        <div class="profile-badges">
          <span class="badge badge-primary">Public Repos: <strong>${user.public_repos}</strong></span>
          <span class="badge badge-secondary">Public Gists: <strong>${user.public_gists}</strong></span>
          <span class="badge badge-success">Followers: <strong>${user.followers}</strong></span>
          <span class="badge badge-info">Following: <strong>${user.following}</strong></span>
        </div>
        <div class="profile-details">
          <ul>
            <li><strong>Company:</strong> ${company}</li>
            <li><strong>Website/Blog:</strong> ${blogHtml}</li>
            <li><strong>Location:</strong> ${location}</li>
            <li><strong>Member Since:</strong> ${createdAt}</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  profileSection.classList.remove('hidden');
};

const renderRepos = (repos) => {
  reposList.innerHTML = '';

  if (!repos.length) {
    reposList.innerHTML = '<p>공개 저장소가 없습니다.</p>';
    reposSection.classList.remove('hidden');
    return;
  }

  repos.forEach((repo) => {
    const repoCard = document.createElement('div');
    repoCard.className = 'repo-card';

    repoCard.innerHTML = `
      <div class="repo-card-row">
        <a class="repo-card-title" href="${repo.html_url}" target="_blank">${repo.name}</a>
        <div class="repo-badges">
          <span class="repo-badge repo-badge--star">Stars: ${repo.stargazers_count}</span>
          <span class="repo-badge repo-badge--watch">Watchers: ${repo.watchers_count}</span>
          <span class="repo-badge repo-badge--fork">Forks: ${repo.forks_count}</span>
        </div>
      </div>
    `;

    reposList.appendChild(repoCard);
  });

  reposSection.classList.remove('hidden');
};

// -----------------------------
// 검색 실행 함수
// -----------------------------
const fetchUserData = async (username) => {
  setLoading(true);

  try {
    setMessage('사용자 정보를 불러오는 중입니다...');
    clearUI();

    const user = await getUser(username);
    renderProfile(user);

    try {
      const repos = await getRepos(username);
      renderRepos(repos);
      setMessage('');
    } catch (repoError) {
      if (repoError.message === 'REPO_FETCH_ERROR') {
        setMessage('저장소 정보를 불러오지 못했습니다.');
        return;
      }
      throw repoError;
    }
  } catch (error) {
    clearUI();

    if (error.message === 'NOT_FOUND') {
      setMessage('해당 사용자를 찾을 수 없습니다.');
      return;
    }

    setMessage('사용자 정보를 불러오지 못했습니다.');
  } finally {
    setLoading(false);
  }
};

const handleSearch = () => {
  const username = usernameInput.value.trim();

  if (!username) {
    setMessage('사용자 아이디를 입력해 주세요.');
    clearUI();
    return;
  }

  fetchUserData(username);
};

// -----------------------------
// 이벤트 연결
// -----------------------------
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  handleSearch();
});
