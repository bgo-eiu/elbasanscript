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
    dh: '\u{1059D}',
    gi: '\u{105A1}\u{105A6}',
    gj: '\u{105A1}\u{105A6}',
    ie: '\u{105A6}',
    ji: '\u{105A7}\u{105A6}',
    ll: '\u{105AA}',
    nj: '\u{105AD}',
    rr: '\u{105B1}',
    sh: '\u{105B4}',
    th: '\u{105B6}',
    xh: '\u{1059B}',
    zh: '\u{105B4}\u{105BC}',
    //single letter keys
    a: '\u{10597}',
    b: '\u{10599}',
    c: '\u{1059A}',
    ç: '\u{1059B}',
    d: '\u{1059C}',
    e: '\u{1059E}',
    ë: '\u{1059F}',
    f: '\u{105A0}',
    g: '\u{105A1}',
    h: '\u{105A3}',
    i: '\u{105A5}',
    j: '\u{105A7}',
    k: '\u{105A8}',
    l: '\u{105A9}',
    m: '\u{105AB}',
    n: '\u{105AC}',
    o: '\u{105AE}',
    p: '\u{105AF}',
    q: '\u{105B0}',
    r: '\u{105B1}',
    s: '\u{105B3}',
    t: '\u{105B5}',
    u: '\u{105B7}',
    v: '\u{105B8}',
    x: '\u{105B9}',
    y: '\u{105BB}',
    z: '\u{105BC}'
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
