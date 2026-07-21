// [실습6] Git 커밋 테스트
let posts = [
  { id: 1, title: '첫 글' },
  { id: 2, title: '둘째 글' },
];
const list = document.querySelector('#list');
const form = document.querySelector('#writeForm');
const titleInput = document.querySelector('#title');
const writerInput = document.querySelector('#writer');
const searchInput = document.querySelector('#search');

function renderList() {
  list.innerHTML = '';           // 먼저 비우기
  posts.forEach(post => {
    const li = document.createElement('li');
    li.textContent = `${post.title} - ${post.writer || '익명'}`;
    list.appendChild(li);
  });
}
renderList();

function renderList() {
  list.innerHTML = '';
  posts.forEach(post => {
    const li = document.createElement('li');
    li.textContent = post.title;

    const delBtn = document.createElement('button');
    delBtn.textContent = '삭제';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();   // li 클릭 이벤트랑 겹치지 않게
      posts = posts.filter(p => p.id !== post.id);
      renderList();
    });
    li.appendChild(delBtn);

    li.addEventListener('click', () => {
      console.log('클릭:', post.title);
    });

    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const writer = writerInput.value.trim();
  if (!title) return;
  posts.push({ id: Date.now(), title, writer });
  renderList();
  form.reset();
});


searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.trim();
  const filtered = posts.filter(p => p.title.includes(keyword));
  renderList(filtered);
});

async function loadPosts() {
  try {
    const res = await fetch('posts.json');
    if (!res.ok) throw new Error('불러오기 실패');
    posts = await res.json();
    renderList();
  } catch (err) {
    list.textContent = '불러오기 실패';
  }
}
loadPosts();