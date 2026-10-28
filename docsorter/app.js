// app.js – 화면 동작 (폴더별 목록 그리기, 문서 추가)

// 가상 문서 (실제 기관 자료 아님)
const SAMPLE_DOCS = [
  { title: '다중이용시설 안전점검 결과', body: '소화기와 비상구 표시등을 확인함' },
  { title: '시민 체험 행사 참가 안내', body: '참가 신청은 현장 접수로 운영' },
  { title: '옥상 배관 교체 공사 계획', body: '노후 설비 교체 일정 정리' },
  { title: '비상연락망 정비', body: '담당자 연락 순서를 다시 정함' },
  { title: '화재 대피 훈련 결과', body: '대피 시간 4분, 안전 요원 배치 확인' },
  { title: '회의실 예약 규칙', body: '사용 후 정리 정돈' },
];

let docs = [];

function loadDocs() {
  const saved = JSON.parse(localStorage.getItem('doc_added') || '[]');
  docs = SAMPLE_DOCS.concat(saved);
}

function renderFolders() {
  const box = document.getElementById('folderList');
  box.innerHTML = '';
  for (const name of FOLDERS.map(f => f.name).concat(OTHER)) {
    const inFolder = docs.filter(d => classify(d.title, d.body) === name);
    const sec = document.createElement('section');
    sec.className = 'card';
    const h2 = document.createElement('h2');
    h2.textContent = '📁 ' + name + ' (' + inFolder.length + ')';
    sec.appendChild(h2);
    const ul = document.createElement('ul');
    for (const d of inFolder) {
      const li = document.createElement('li');
      const b = document.createElement('b');
      b.textContent = d.title;
      const p = document.createElement('span');
      p.className = 'body';
      p.textContent = d.body;
      li.appendChild(b);
      li.appendChild(p);
      ul.appendChild(li);
    }
    if (!inFolder.length) {
      const li = document.createElement('li');
      li.className = 'none';
      li.textContent = '문서 없음';
      ul.appendChild(li);
    }
    sec.appendChild(ul);
    box.appendChild(sec);
  }
}

function addDoc(e) {
  e.preventDefault();
  const d = {
    title: document.getElementById('titleInput').value.trim(),
    body: document.getElementById('bodyInput').value.trim(),
  };
  if (!d.title) return;
  const saved = JSON.parse(localStorage.getItem('doc_added') || '[]');
  saved.push(d);
  localStorage.setItem('doc_added', JSON.stringify(saved));
  document.getElementById('msgBox').textContent = "'" + d.title + "' → " + classify(d.title, d.body) + ' 폴더';
  e.target.reset();
  loadDocs();
  renderFolders();
}

document.getElementById('docForm').addEventListener('submit', addDoc);
loadDocs();
renderFolders();
