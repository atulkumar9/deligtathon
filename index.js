window.requestAnimationFrame = window.requestAnimationFrame
 || window.mozRequestAnimationFrame
 || window.webkitRequestAnimationFrame
 || window.msRequestAnimationFrame
 || function(f){setTimeout(f, 1000/60)}

// var bgElem = document.getElementById('bg')

function parallaxBackgroundScroll() {
  var bgElem = document.getElementById('background-wrapper');
  var scrolltop = window.pageYOffset;
  bgElem.style.top = -scrolltop * .2 + 'px';
}

const OnePxInMeters = 0.2;

const comparisonCorrospondingDepth = {
  500: 'length of 5 Football Fields',
  1000: 'height of 11 Statue of Liberties',
  1500: 'height of 5 Eifel Towers',
  2000: 'height of 1111 Human Stack',
  3000: 'height of 60 Niagra Falls',
  4000: 'height of 9 Petronas Twin Towers',
  5000: 'height of 6 Burj Khalifas',
}

const getDepthinMeters = (pxValue) => pxValue*OnePxInMeters;

// const inRange = (elem, meter) => {
//   return meter >= elem && meter > elem + 200
// };

const isMeterInRange = (start, end) => Object
  .keys(comparisonCorrospondingDepth)
  .find(elem => elem <= end && elem > start);

const scrollDirection = () => {
  let st = window.pageYOffset || document.documentElement.scrollTop;
  let direction = '';
  if (st > lastScrollTop){
    direction = 'down';
  } else {
    direction = 'up';
  }
  lastScrollTop = st <= 0 ? 0 : st;
  return direction;
}

var isInRange = false;
var isInRangeOfExit = false;
var lastScrollTop = 0;
var waveAnimationELem = document.getElementById('wave-animation');

function measureDepth() {
  let currentYscroll = window.scrollY;
  let scrollDirectionDown = window.oldScroll > window.scrollY;
  let customScaleElem = document.getElementById('custom-scale');
  depthInMeters = getDepthinMeters(currentYscroll);
  let isInRangeMTo300 = isMeterInRange(depthInMeters - 300, depthInMeters);
  let isInRange200To300 = 
  ((Number(isInRangeMTo300) + 300 - depthInMeters) < 100 && !scrollDirectionDown) || 
  (depthInMeters - Number(isInRangeMTo300) < 100 && scrollDirectionDown);

  if (!isInRange && isInRangeMTo300) {
    customScaleElem.innerHTML = `Depth is equal to collective ${comparisonCorrospondingDepth[isInRangeMTo300]}`.toUpperCase();
    customScaleElem.classList.add('fade-in');
  }

  if(!isInRangeOfExit && isInRange200To300) {
    console.log('fade out called')
    customScaleElem.classList.add('fade-out');
  }

  if (isInRangeMTo300)
    isInRange = true;
  else {
    isInRange = false;
    customScaleElem.classList.remove('fade-in');
    customScaleElem.innerHTML = '';
  }

  if (isInRange200To300) 
    isInRangeOfExit = true;
  else {
    isInRangeOfExit = false;
    customScaleElem.classList.remove('fade-out');
  }

}


lottie.loadAnimation({
  container: waveAnimationELem, // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'wave-animation.json'
});

window.addEventListener('scroll', function(){ 
  requestAnimationFrame(parallaxBackgroundScroll);
  measureDepth();
  this.oldScroll = this.scrollY;
}, false)
 


