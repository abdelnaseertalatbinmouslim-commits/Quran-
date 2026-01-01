// main.js

// 1. عداد رمضان 2026
function initCountdown() {
    const ramadanDate = new Date("Feb 18, 2026 00:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = ramadanDate - now;
        if (document.getElementById('days')) {
            document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
            document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('mins').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        }
    }, 1000);
}

// 2. نظام السبحة الذكي
let sibhaCount = 0;
function smartSibha() {
    sibhaCount++;
    const label = document.getElementById('sibha-text');
    const counter = document.getElementById('sibha-counter');
    
    if(sibhaCount <= 33) label.innerText = "سبحان الله";
    else if(sibhaCount <= 66) label.innerText = "الحمد لله";
    else if(sibhaCount <= 99) label.innerText = "الله أكبر";
    else if(sibhaCount === 100) label.innerText = "لا إله إلا الله وحده لا شريك له..";
    else { sibhaCount = 0; label.innerText = "ابدأ الذكر"; }
    
    if(counter) counter.innerText = sibhaCount;
    if(window.navigator.vibrate) window.navigator.vibrate(50);
}

// 3. جلب السور للمصحف
async function fetchSurahs() {
    const select = document.getElementById('surah-select');
    if(!select) return;
    const res = await fetch('https://api.alquran.cloud/v1/surah');
    const data = await res.json();
    data.data.forEach(s => {
        let opt = document.createElement('option');
        opt.value = s.number;
        opt.text = s.name;
        select.appendChild(opt);
    });
}

window.onload = () => {
    initCountdown();
    fetchSurahs();
};
