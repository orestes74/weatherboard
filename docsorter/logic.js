// logic.js – 분류 규칙만 (화면을 다루는 코드 금지)

// 교육용 가상 기준 : 업무 폴더와 키워드 (앞에 있는 폴더가 동점일 때 우선)
const FOLDERS = [
  { name: '안전점검', words: ['안전', '점검', '진단', '위험'] },
  { name: '행사운영', words: ['행사', '축제', '체험', '참가', '운영'] },
  { name: '시설보수', words: ['보수', '수리', '교체', '설비', '공사'] },
  { name: '비상대응', words: ['비상', '훈련', '대피', '재난', '연락망'] },
];
const OTHER = '기타';
const SCORE = { title: 2, body: 1 };

// 제목 키워드 2점, 내용 키워드 1점 → 점수가 가장 높은 폴더 (0점이면 '기타')
function classify(title, body) {
  let best = OTHER;
  let bestScore = 0;
  for (const f of FOLDERS) {
    let score = 0;
    for (const w of f.words) {
      if (title.includes(w)) score += SCORE.title;
      if (body.includes(w)) score += SCORE.body;
    }
    if (score > bestScore) {
      best = f.name;
      bestScore = score;
    }
  }
  return best;
}

if (typeof module !== 'undefined') module.exports = { FOLDERS, OTHER, SCORE, classify };
