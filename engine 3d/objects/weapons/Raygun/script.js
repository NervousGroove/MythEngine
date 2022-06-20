const SWIRL_OPTS = {
  parent: "#ray-contain",
  fill: '#d3eae6',
  opacity: 1,
  x: { 0: '-25' },
  duration: 'rand(600, 1000)',
  radius: 'rand(1, 10)',
  pathScale: 'rand(.5, 1)',
  swirlFrequency: 'rand(6, 15)',
  swirlSize: 'rand(8,14)' };


const POS1 = {
  left: '185px', top: '80px',
  y: { 0: '-25' } };


const POS2 = {
  left: '170px', top: '75px',
  y: { 0: '-25' } };


const POS3 = {
  left: '300px', top: '95px',
  y: { 0: '-15' } };


const sw1 = new mojs.ShapeSwirl({
  ...SWIRL_OPTS,
  ...POS1 });


const sw2 = new mojs.ShapeSwirl({
  ...SWIRL_OPTS,
  ...POS1,
  direction: -1,
  delay: 10 });


const sw3 = new mojs.ShapeSwirl({
  ...SWIRL_OPTS,
  ...POS1,
  delay: 20,
  left: '180px' });


const sw4 = new mojs.ShapeSwirl({
  ...SWIRL_OPTS,
  ...POS1,
  direction: -1,
  delay: 50 });


const sw5 = new mojs.ShapeSwirl({
  ...SWIRL_OPTS,
  ...POS2,
  left: '160px' });


const sw6 = new mojs.ShapeSwirl({
  ...SWIRL_OPTS,
  ...POS2,
  direction: -1,
  delay: 10 });


const sw7 = new mojs.ShapeSwirl({
  ...SWIRL_OPTS,
  ...POS2,
  delay: 20 });


const sw8 = new mojs.ShapeSwirl({
  ...SWIRL_OPTS,
  ...POS2,
  direction: -1,
  delay: 50 });


// middle water tank

const sw9 = new mojs.ShapeSwirl({
  ...SWIRL_OPTS,
  ...POS3,
  direction: -1,
  x: { 0: '-55' },
  delay: 10 });


const sw10 = new mojs.ShapeSwirl({
  ...SWIRL_OPTS,
  ...POS3,
  x: { 0: '-10' },
  delay: 20 });


const sw11 = new mojs.ShapeSwirl({
  ...SWIRL_OPTS,
  ...POS3,
  x: { 0: '-30' },
  direction: -1,
  delay: 50 });


//laser

const OPTS = {
  top: '170px', left: '440px',
  parent: "#ray-contain",
  fill: 'none',
  radiusX: 10,
  x: { 0: 300 },
  strokeWidth: { 50: 0 },
  scale: { 0: 1 },
  duration: 500,
  easing: 'quint.out' };


const circ1 = new mojs.Shape({
  ...OPTS,
  stroke: '#d83e67',
  radiusY: { 0: 75 } });


const circ2 = new mojs.Shape({
  ...OPTS,
  radius: { 0: 50 },
  strokeWidth: { 30: 0 },
  stroke: '#f49687',
  delay: 100 });


const circ3 = new mojs.Shape({
  ...OPTS,
  stroke: '#c14365',
  radiusY: { 0: 75 },
  delay: 400 });


const circ4 = new mojs.Shape({
  ...OPTS,
  radius: { 0: 50 },
  strokeWidth: { 30: 0 },
  stroke: '#f49687',
  delay: 500,
  easing: 'quad.out' });


//pewpew
const LINE_OPTS = {
  top: '170px', left: '765px',
  parent: "#ray-contain",
  shape: 'rect',
  duration: 700,
  radius: 300,
  radiusY: 1,
  fill: 'none',
  stroke: '#f49687',
  strokeWidth: { 3: 0 },
  easing: 'sin.out',
  strokeDasharray: { '30% 120%': '0% 50%' },
  strokeDashoffset: { '42%': '0%' } };


let line1 = new mojs.Transit({
  ...LINE_OPTS,
  stroke: '#f7a28c',
  delay: 45 });


let line2 = new mojs.Transit({
  ...LINE_OPTS,
  stroke: { '#c14365': '#f7a28c' },
  delay: 400 });


//now we repeat it all in the master
const master = new mojs.Timeline(
{ speed: .7, repeat: 999 });
master.
add(sw1, sw2, sw3, sw4, sw5, sw6, sw7, sw8, sw9, sw10, sw11).
add(circ1, circ3, circ4, line1, line2).
play();

//new MojsPlayer({ add: master, isPlaying: true, isRepeat: true });

//water
var lWater = document.querySelector('#newwater'),
mWater = document.querySelector('#midwater');

//left water tank second
new mojs.Tween({
  duration: 1300,
  repeat: 999,
  isYoyo: true,
  onUpdate: function (progress) {
    let bProgress = mojs.easing.sin.in(progress);
    lWater.setAttribute('d',
    `M 144.8 102.6 C ${180 - 85 * bProgress} ${100 - 5 * bProgress} ${180 - 60 * bProgress} ${100 - 10 * bProgress} 283 94.6 L 275 137.3 L 144.8 102.6 Z`);
  } }).
play();

//mid water tank first
new mojs.Tween({
  duration: 1500,
  repeat: 999,
  isYoyo: true,
  onUpdate: function (progress) {
    let bProgress = mojs.easing.sin.in(progress);
    mWater.setAttribute('d',
    `M 333 121 C 373 ${121 + 10 * bProgress} 413 ${121 - 10 * bProgress} 455.5 121 L 455.5 121 s.3,21-23.5,19.8H350.8s-18.4-.2-18.6-19.7Z`);
  } }).
play();

const sideL1 = document.querySelector('#sideL1'),
sideL2 = document.querySelector('#sideL2'),
allSideL = [sideL1, sideL2];
const laser1E = mojs.easing.path('M0,400S58,111.1,80.5,175.1s43,286.4,63,110.4,46.3-214.8,70.8-71.8S264.5,369,285,225.5s16.6-209.7,35.1-118.2S349.5,258.5,357,210,400,0,400,0');

new mojs.Tween({
  repeat: 999,
  duration: 2000,
  isYoyo: true,
  isShowEnd: false,
  onUpdate: function (progress) {
    var laser1EProgress = laser1E(progress);
    for (var i = 0; i < allSideL.length; i++) {
      allSideL[i].style.strokeDashoffset = 20 * laser1EProgress + '%';
      allSideL[i].style.opacity = Math.abs(0.8 * laser1EProgress);
    }
  } }).
play();