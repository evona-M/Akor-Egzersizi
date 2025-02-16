// Akorlar
const chords = {
  easy: ['C', 'D', 'E', 'G', 'A'],
  medium: ['F', 'Bm', 'Cm', 'Dm', 'Am'],
  hard: ['B', 'F#', 'Gm', 'Ab', 'Db']
};

let currentChord = '';
let intervalId;
let chordTime = 1000; // Başlangıç süresi 1 saniye

// Seviye seçimi ve akor gösterme
document.getElementById('level').addEventListener('change', function() {
  clearInterval(intervalId); // Yeni seviyede önceki zamanlayıcıyı durdur
  startChordDisplay();
});

// Zaman ayarını değiştirme
document.getElementById('time').addEventListener('input', function() {
  chordTime = parseFloat(this.value) * 1000;
  document.getElementById('timeValue').textContent = `${this.value} saniye`;
  clearInterval(intervalId); // Zaman değiştiği için önceki zamanlayıcıyı durdur
  startChordDisplay();
});

// Akorları rastgele göstermek için başlat
document.getElementById('startStopBtn').addEventListener('click', function() {
  if (intervalId) {
    clearInterval(intervalId); // Durdur
    this.textContent = 'Başlat';
  } else {
    startChordDisplay(); // Başlat
    this.textContent = 'Durdur';
  }
});

function startChordDisplay() {
  const level = document.getElementById('level').value;
  const chordArray = chords[level];
  
  intervalId = setInterval(function() {
    currentChord = chordArray[Math.floor(Math.random() * chordArray.length)];
    document.getElementById('chordName').textContent = `Akor Adı: ${currentChord}`;
    document.getElementById('chordTab').innerHTML = getChordTab(currentChord);
  }, chordTime);
}

function getChordTab(chord) {
  const chordTabs = {
    'C': `<pre>e|---0---|\nB|---1---|\nG|---0---|\nD|---2---|\nA|---3---|\nE|-------|</pre>`,
    'D': `<pre>e|---2---|\nB|---3---|\nG|---2---|\nD|---0---|\nA|-------|\nE|-------|</pre>`,
    'E': `<pre>e|---0---|\nB|---0---|\nG|---1---|\nD|---2---|\nA|---2---|\nE|---0---|</pre>`,
    'G': `<pre>e|---3---|\nB|---0---|\nG|---0---|\nD|---0---|\nA|---2---|\nE|---3---|</pre>`,
    'A': `<pre>e|---0---|\nB|---2---|\nG|---2---|\nD|---2---|\nA|---0---|\nE|-------|</pre>`
    // Diğer akorları buraya ekleyebilirsin
  };

  return chordTabs[chord] || '<p>Akor Tabı Bulunamadı!</p>';
}
