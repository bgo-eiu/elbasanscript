var flipped = false;

const toElbasan = () => {
  flipped = false;
  if (!document.getElementById('inp') || !document.getElementById('out')) return;
  document.getElementById('inp').placeholder = 'Text in Latin';
  document.getElementById('toLatin').checked = false;
  document.getElementById('inp').value = '';
  document.getElementById('out').value = '';
};

const toLatin = () => {
  flipped = true;
  if (!document.getElementById('inp') || !document.getElementById('out')) return;
  document.getElementById('inp').placeholder = 'Text in Elbasan (𐔇𐔐𐔁𐔀𐔛𐔀𐔓)';
  document.getElementById('toElbasan').checked = false;
  document.getElementById('inp').value = '';
  document.getElementById('out').value = '';
};

const convert = () => {
  if (!document.getElementById('inp') || !document.getElementById('out')) return;
  document.getElementById('out').value = transliterate(document.getElementById('inp').value);
};


const transliterate = (word) => {
  word = word.toLowerCase()
  let charCodes = {
    //specific sequences (see https://www.unicode.org/L2/L2020/20187r2-n5138r2-vithkuqi.pdf)
    ' mbë dhe': ' \u{105AB}\u{10598}\u{1059F} \u{1059D}\u{1059E}',
    bëntorit: '\u{10598}\u{1059F}\u{105AC}\u{105B5}\u{105AE}\u{105B1}\u{105B5}\u{105A5}\u{105B5}',
    bredhasi: '\u{10598}\u{105B1}\u{1059E}\u{1059D}\u{10597}\u{105B3}\u{105A5}',
    bredhi: '\u{10598}\u{105B1}\u{1059E}\u{1059D}\u{105A5}',
    bëftë: '\u{10598}\u{1059F}\u{105A0}\u{105B5}\u{1059F}',
    bukën: '\u{10598}\u{105B7}\u{105A8}\u{1059F}\u{105AC}',
    bukur: '\u{10598}\u{105B7}\u{105A8}\u{105B7}\u{105B1}',
    baht: '\u{10598}\u{10597}\u{105A4}\u{105B5}',
    harxhi: '\u{105A4}\u{10597}\u{105B1}\u{1059B}\u{105A5}',
    ham: '\u{105A4}\u{10597}\u{105AB}',
    //two letter keys
    dh: '\u{10506}',
    gi: '',
    gj: '\u{1050B}',
    ie: '',
    ji: '',
    ll: '\u{10511}',
    nj: '\u{10515}',
    rr: '\u{1051A}',
    sh: '\u{1051C}',
    th: '\u{1051E}',
    xh: '\u{10503}',
    zh: '\u{10524}',
    //single letter keys
    a: '\u{10500}',
    b: '\u{10501}',
    c: '\u{10502}',
    ç: '\u{10503}',
    e: '\u{10507}',
    ë: '\u{10508}',
    f: '\u{10509}',
    d: '\u{10504}',
    g: '\u{1050A}',
    h: '\u{1050C}',
    i: '\u{1050D}',
    j: '\u{1050E}',
    k: '\u{1050F}',
    l: '\u{10510}',
    m: '\u{10512}',
    n: '\u{10513}',
    o: '\u{10516}',
    p: '\u{10517}',
    q: '\u{10518}',
    r: '\u{10519}',
    s: '\u{1051B}',
    t: '\u{1051D}',
    u: '\u{1051F}',
    v: '\u{10520}',
    x: '\u{10521}',
    y: '\u{10522}',
    z: '\u{10523}'
  };

  if (flipped) charCodes = objectFlip(charCodes);

  const pattern = new RegExp(
    Object.keys(charCodes).join('|'),
    'g'
  );
  return word.replace(pattern, match => charCodes[match]);
}

function objectFlip(obj) {
  return Object.keys(obj).reduce((ret, key) => {
    ret[obj[key]] = key;
    return ret;
  }, {});
};
