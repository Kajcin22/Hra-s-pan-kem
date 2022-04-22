// toto budeš potřebovat později
/*
if (!( panacekX + panacekSirka < minceX || minceX + minceSirka < panacekX || panacekY + panacekVyska < minceY || minceY + minceVyska < panacekY)) {
	// panacek a mince se prekryvaji
}
*/

/*
úkoly pro 4. lekci:
1) Vydefinuj si všechny potřebné proměnné. Budeme chtít 100% pracovat se souřadnicemi panáčka a mince, s jejich šířkou a výškou. Potřebujeme i odkaz na jejich HTML elementy.
2) Vytvoř funkci, která umístí panáčka na střed obrazovky. Budeme potřebovat znát šířku a výšku okna (využij vlastnosti - window.innerWidth a window.innerHeight)
3) Podobnou funkci vytvoř i pro minci, tu každopádně chceme umístit náhodně po mapě
4) Reaguj na kliknutí šipek a rozpohybuj panáčka - nahoru, dolu, doleva, doprava. Budeš pracovat se souřadnicemi X,Y. 
5) Vytvoř "animaci", při stisku šipky nahoru se panáček otočí nahoru (změní se obrázek), podobně u dalších šipek

Nezapomeň vše ošetřit - panáček ti nemůže zajíždět za obrazovku apod.
*/

/* -------------------------------querySelectory ------------------------------------------------*/
const panacek = document.querySelector('#panacek');
const mince = document.querySelector('#mince');
const minceStribrna = document.querySelector('#minceStribrna');
const minceBronz = document.querySelector('#minceBronz');
const slimak = document.querySelector('#slimak');
const slimak2 = document.querySelector('#slimak2');
const moucha = document.querySelector('#moucha');
const moucha2 = document.querySelector('#moucha2');

const skore = document.querySelector('#score');
const zivot = document.querySelector('#zivot');

const hudba = document.querySelector('#hudba');
const zvukmince = document.querySelector('#zvukmince');
const zvukfanfara = document.querySelector('#zvukfanfara');
const zvukZraneni = document.querySelector('#zvukzraneni');

const oznameni = document.querySelector('#oznameni');
const hra = document.querySelector('#hra');

const body = document.querySelector('body');

/* --------------- rozměry X a Y - obrazovka, panáček (hráč), mince, nepřátelé -------------------------------*/

let obrazX = window.innerWidth;
let obrazY = window.innerHeight;

let centerX = 0;
let centerY = 0;

let panacekWidth = 74;
let panacekHeight = 64;

let panacekX = 0;
let panacekY = 0;

let minceWidth = 36;
let minceHeight = 36;

let minceX = 0;
let minceY = 0;

let slimakWidth = 58;
let slimakHeight = 28;

let slimakX = 0;
let slimakY = 0;

let slimak2Width = 58;
let slimak2Height = 28;

let slimak2X = 0;
let slimak2Y = 0;

let mouchaWidth = 72;
let mouchaHeight = 32;

let mouchaX = 0;
let mouchaY = 0;

let moucha2Width = 72;
let moucha2Height = 32;

let moucha2X = 0;
let moucha2Y = 0;

let stribrnaWidth = 36;
let stribrnaHeight = 36;

let stribrnaX = 0;
let stribrnaY = 0;

let bronzWidth = 36;
let bronzHeight = 36;

let bronzX = 0;
let bronzY = 0;
/* ------------ funkce pro PANÁČEK ----------------------- */

//načtení panáčka na střed při začátku hry/resetu
const onCenter = () => {
  centerX = obrazX / 2;
  centerY = obrazY / 2;

  panacek.style.left = centerX + 'px';
  panacek.style.top = centerY + 'px';

  panacekX = centerX;
  panacekY = centerY;

  console.log(panacekX);
};
body.addEventListener('load', onCenter());

/* ------------ funkce pro MINCE ---------------------------- */

//načtení zlaté mince:
const loadMince = () => {
  minceX = Math.floor(Math.random() * (obrazX - minceWidth));
  minceY = Math.floor(Math.random() * (obrazY - minceHeight));

  mince.style.left = minceX + 'px';
  mince.style.top = minceY + 'px';
};
body.addEventListener('load', loadMince());

//načtení stříbrné mince:
const loadStribro = () => {
  stribrnaX = Math.floor(Math.random() * (obrazX - stribrnaWidth));
  stribrnaY = Math.floor(Math.random() * (obrazY - stribrnaHeight));
  minceStribrna.style.left = stribrnaX + 'px';
  minceStribrna.style.top = stribrnaY + 'px';
};
body.addEventListener('load', loadStribro());

//načtení bronzové mince:
function loadBronz() {
  bronzX = Math.floor(Math.random() * (obrazX - bronzWidth));
  bronzY = Math.floor(Math.random() * (obrazY - bronzHeight));
  minceBronz.style.left = bronzX + 'px';
  minceBronz.style.top = bronzY + 'px';
}
body.addEventListener('load', loadBronz());

/* ----------------- funkce pro NEPŘÁTELE -----------------------------------*/

//SLIMÁK 1
// načtení:
const loadSlimak = () => {
  slimakX = Math.floor(Math.random() * (obrazX - slimakWidth));
  slimakY = Math.floor(Math.random() * (obrazY - slimakHeight));
  slimak.style.left = slimakX + 'px';
  slimak.style.top = slimakY + 'px';
};
body.addEventListener('load', loadSlimak());
//pohyb:
let posunSlimaka = -4;
const plazeniSlimaka = () => {
  if (posunSlimaka >= 0) {
    slimak.src = 'obrazky/slimak-vpravo.png';
  } else {
    slimak.src = 'obrazky/slimak-vlevo.png';
  }
  slimakX = slimakX + posunSlimaka;
  slimak.style.left = slimakX + 'px';
  if (slimakX <= 0 || slimakX > obrazX - slimakWidth) {
    posunSlimaka = posunSlimaka * -1;
    slimakX = slimakX + posunSlimaka;
    slimak.style.left = slimakX + 'px';
  }
};
setInterval(plazeniSlimaka, 100);

//SLIMÁK 2
//načtení:
const loadSlimak2 = () => {
  slimak2X = Math.floor(Math.random() * (obrazX - slimak2Width));
  slimak2Y = Math.floor(Math.random() * (obrazY - slimak2Height));
  slimak2.style.left = slimak2X + 'px';
  slimak2.style.top = slimak2Y + 'px';
};
body.addEventListener('load', loadSlimak2());
//pohyb:
let posunSlimaka2 = -4;
const plazeniSlimaka2 = () => {
  if (posunSlimaka2 >= 0) {
    slimak2.src = 'obrazky/slimak-vpravo.png';
  } else {
    slimak2.src = 'obrazky/slimak-vlevo.png';
  }
  slimak2X = slimak2X + posunSlimaka2;
  slimak2.style.left = slimak2X + 'px';
  if (slimak2X <= 0 || slimak2X > obrazX - slimak2Width) {
    posunSlimaka2 = posunSlimaka2 * -1;
    slimak2X = slimak2X + posunSlimaka2;
    slimak2.style.left = slimak2X + 'px';
  }
};
setInterval(plazeniSlimaka2, 100);

//MOUCHA 1
//načtení:
const loadMoucha = () => {
  mouchaX = Math.floor(Math.random() * (obrazX - mouchaWidth));
  mouchaY = Math.floor(Math.random() * (obrazY - mouchaHeight));
  moucha.style.left = mouchaX + 'px';
  moucha.style.top = mouchaY + 'px';
};
body.addEventListener('load', loadMoucha());
//pohyb:
let posunMoucha = -10;
const letMoucha = () => {
  if (posunMoucha >= 0) {
    moucha.src = 'obrazky/moucha-vpravo.png';
  } else {
    moucha.src = 'obrazky/moucha-vlevo.png';
  }
  mouchaY = mouchaY + posunMoucha;
  moucha.style.top = mouchaY + 'px';

  if (mouchaY <= 0 || mouchaY > obrazY - mouchaHeight) {
    posunMoucha = posunMoucha * -1;
    mouchaY = mouchaY + posunMoucha;
    moucha.style.top = mouchaY + 'px';
  }
};
setInterval(letMoucha, 50);

//MOUCHA 2
//načtení:
const loadMoucha2 = () => {
  moucha2X = Math.floor(Math.random() * (obrazX - moucha2Width));
  moucha2Y = Math.floor(Math.random() * (obrazY - moucha2Height));
  moucha2.style.left = moucha2X + 'px';
  moucha2.style.top = moucha2Y + 'px';
};
body.addEventListener('load', loadMoucha2());
//pohyb:
let posunMoucha2 = -10;
const letMoucha2 = () => {
  if (posunMoucha2 >= 0) {
    moucha2.src = 'obrazky/moucha-vpravo.png';
  } else {
    moucha2.src = 'obrazky/moucha-vlevo.png';
  }
  moucha2Y = moucha2Y + posunMoucha2;
  moucha2.style.top = moucha2Y + 'px';

  if (moucha2Y <= 0 || moucha2Y > obrazY - moucha2Height) {
    posunMoucha2 = posunMoucha2 * -1;
    moucha2Y = moucha2Y + posunMoucha2;
    moucha2.style.top = moucha2Y + 'px';
  }
};
setInterval(letMoucha2, 50);

let skoreHodnota = 0;
let zivotHodnota = 5;

//resetování hry při prohře/výhře:
function resetGame() {
  zivot.src = 'obrazky/srdce-5.png';
  loadBronz();
  loadStribro();
  loadMince();
  loadSlimak();
  loadSlimak2();
  loadMoucha();
  loadMoucha2();
  onCenter();
}

/* -------------------------- pohyb panáčka ---------------------------------------------------- */
body.addEventListener('keydown', posunPanacka);
function posunPanacka(event) {
  switch (event.key) {
    case 'w':
      panacek.src = 'obrazky/panacek-nahoru.png';
      panacekY = panacekY - 10;
      panacek.style.top = panacekY + 'px';
      if (panacekY <= 0) {
        panacekY = panacekY + 10;
        panacek.style.top = panacekY + 'px';
      }
      break;
    case 's':
      panacek.src = 'obrazky/panacek.png';
      panacekY = panacekY + 10;
      panacek.style.top = panacekY + 'px';

      if (panacekY > obrazY - panacekHeight) {
        panacekY = panacekY - 10;
        panacek.style.top = panacekY + 'px';
      }
      break;
    case 'd':
      panacek.src = 'obrazky/panacek-vpravo.png';
      panacekX = panacekX + 10;
      panacek.style.left = panacekX + 'px';

      if (panacekX > obrazX - panacekWidth) {
        panacekX = panacekX - 10;
        panacek.style.left = panacekX + 'px';
      }
      break;
    case 'a':
      panacek.src = 'obrazky/panacek-vlevo.png';
      panacekX = panacekX - 10;
      panacek.style.left = panacekX + 'px';
      if (panacekX <= 0) {
        panacekX = panacekX + 10;
        panacek.style.left = panacekX + 'px';
      }
      break;
  }
  if (
    !(
      panacekX + panacekWidth < minceX ||
      minceX + minceWidth < panacekX ||
      panacekY + panacekHeight < minceY ||
      minceY + minceHeight < panacekY
    )
  ) {
    //panacek a mince se prekryvaji
    zvukmince.play();
    loadMince();
    skoreHodnota += 3;
    skore.textContent = skoreHodnota;
  }
  if (
    !(
      panacekX + panacekWidth < stribrnaX ||
      stribrnaX + stribrnaWidth < panacekX ||
      panacekY + panacekHeight < stribrnaY ||
      stribrnaY + stribrnaHeight < panacekY
    )
  ) {
    //panacek a stribrna mince se prekryvaji
    zvukmince.play();
    loadStribro();
    skoreHodnota += 2;
    skore.textContent = skoreHodnota;
  }

  if (
    !(
      panacekX + panacekWidth < bronzX ||
      bronzX + bronzWidth < panacekX ||
      panacekY + panacekHeight < bronzY ||
      bronzY + bronzHeight < panacekY
    )
  ) {
    //panacek a stribrna mince se prekryvaji
    zvukmince.play();
    loadBronz();
    skoreHodnota += 1;
    skore.textContent = skoreHodnota;
  }

  if (skoreHodnota >= 20) {
    if (skoreHodnota == 20) {
      zvukfanfara.play();
      skore.textContent = ' 20 - vítězství';
      skoreHodnota = skoreHodnota + 1;
      return;
    }
    alert('Vyhráls!');
    zvukfanfara.play();
    skore.textContent = '0';
    skoreHodnota = 0;
    zivotHodnota = 5;
    resetGame();
    return;
  }

  if (
    !(
      panacekX + panacekWidth < slimakX ||
      slimakX + slimakWidth < panacekX ||
      panacekY + panacekHeight < slimakY ||
      slimakY + slimakHeight < panacekY
    )
  ) {
    //panacek a slimák se prekryvaji
    zraneni();
  }

  if (
    !(
      panacekX + panacekWidth < slimak2X ||
      slimak2X + slimak2Width < panacekX ||
      panacekY + panacekHeight < slimak2Y ||
      slimak2Y + slimak2Height < panacekY
    )
  ) {
    //panacek a slimák2 se prekryvaji
    zraneni();
  }

  if (
    !(
      panacekX + panacekWidth < mouchaX ||
      mouchaX + mouchaWidth < panacekX ||
      panacekY + panacekHeight < mouchaY ||
      mouchaY + mouchaHeight < panacekY
    )
  ) {
    //panacek a moucha se prekryvaji
    kradeni();
  }

  if (
    !(
      panacekX + panacekWidth < moucha2X ||
      moucha2X + moucha2Width < panacekX ||
      panacekY + panacekHeight < moucha2Y ||
      moucha2Y + moucha2Height < panacekY
    )
  ) {
    //panacek a moucha2 se prekryvaji
    kradeni();
  }
}

body.addEventListener('keyup', panacekStop);
function panacekStop(event) {
  switch (event.key) {
    case 'w':
      panacek.src = 'obrazky/panacek.png';
      break;
    case 's':
      panacek.src = 'obrazky/panacek.png';
      break;
    case 'd':
      panacek.src = 'obrazky/panacek.png';
      break;
    case 'a':
      panacek.src = 'obrazky/panacek.png';
      break;
  }
}

/* --------------------------- střet s nepřáteli ---------------------------------- */
const novaHraButton = () => {
  oznameni.innerHTML += `<button><a href="hra.html">Nová hra?</a></button><br><button><a href="uvodni.html">Hlavní nabídka :(</a></button>`;
};

function zraneni() {
  zvukZraneni.play();
  zivotHodnota -= 1;
  if (zivotHodnota == 4) {
    zivot.src = 'obrazky/srdce-4.png';
  }
  if (zivotHodnota == 3) {
    zivot.src = 'obrazky/srdce-3.png';
  }
  if (zivotHodnota == 2) {
    zivot.src = 'obrazky/srdce-2.png';
  }
  if (zivotHodnota == 1) {
    zivot.src = 'obrazky/srdce-1.png';
  }
  if (zivotHodnota == 0) {
    zivot.src = 'obrazky/srdce-0.png';
  }
  if (zivotHodnota < 0) {
    //alert('Chcípnuls!');
    oznameni.classList.remove('hidden');
    hra.classList.add('hidden');
    skore.classList.add('hidden');
    zivot.classList.add('hidden');
    oznameni.innerHTML = `<h1>Sežrali tě slimáci!!</h1>`;
    setTimeout(novaHraButton, 3000);
    zivotHodnota = 5;
    skoreHodnota = 0;
    skore.textContent = '0';
    zivot.src = 'obrazky/srdce-5.png';
    return;
  }
}

function kradeni() {
  zvukZraneni.play();
  skoreHodnota -= 1;
  skore.textContent = skoreHodnota;
  if (skoreHodnota == 0) {
    skore.textContent = 'Byls okraden!'; //ale ještě neumíráš
    return;
  }
  if (skoreHodnota < 0) {
    //bez peněz se nedá žít
    oznameni.classList.remove('hidden');
    hra.classList.add('hidden');
    skore.classList.add('hidden');
    zivot.classList.add('hidden');
    oznameni.innerHTML = `<h1>Byls oloupen mouchami!!</h1>`;
    setTimeout(novaHraButton, 3000);
    skore.textContent = '0';
    skoreHodnota = 0;
    return;
  }
}
