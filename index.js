const crabAnimationData = 'https://assets9.lottiefiles.com/private_files/lf30_zn9wvb8m.json';
const crabAnimationAfterTouchData = 'https://assets9.lottiefiles.com/private_files/lf30_nypms3gx.json';
const waveAnimationData = 'https://assets3.lottiefiles.com/private_files/lf30_fjqhet9e.json';

window.requestAnimationFrame = window.requestAnimationFrame
 || window.mozRequestAnimationFrame
 || window.webkitRequestAnimationFrame
 || window.msRequestAnimationFrame
 || function(f){setTimeout(f, 1000/60)}

const OnePxInMeters = 0.2;

function parallaxScroll(elem) {
  scrolltop = window.pageYOffset;
  elem.style.top = -scrolltop * OnePxInMeters + 'px';
}

const audioPlayer = () => {

}


const comparisonCorrospondingDepth = {
  1000: 'the height of 11 Statue of Liberties',
  2000: 'a stack of 1111 Human beings',
  3000: 'the length of 30 Football Fields',
  4000: 'the height of 9 Petronas Twin Towers',
  // 5000: 'the height of 6 Burj Khalifas',
}

const getDepthinMeters = (pxValue) => pxValue*OnePxInMeters;

const isMeterInRange = (start, end) => Object
  .keys(comparisonCorrospondingDepth)
  .find(elem => elem <= end && elem > start);

const scrollTo = (element, to, duration, successCallback) => {
  let start = element ? element.scrollTop : window.scrollY,
    change = to - start,
    currentTime = 0,
    increment = 20;
  const animateScroll = () => {        
    currentTime += increment;
    let val = easeInOutQuad(currentTime, start, change, duration);
    element.scrollTop = val;
    if(currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
    else {
      successCallback && successCallback();
    }
  };
  animateScroll();
}

const easeInOutQuad = (t, b, c, d) => {
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

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

const measureDepth = () => {
  let currentYscroll = window.scrollY;
  let scrollDirectionDown = window.oldScroll > window.scrollY;
  let customScaleElem = document.getElementById('custom-scale');
  depthInMeters = getDepthinMeters(currentYscroll);
  let isInRangeMTo300 = isMeterInRange(depthInMeters - 300, depthInMeters);
  let isInRange200To300 = 
  ((Number(isInRangeMTo300) + 300 - depthInMeters) < 100 && !scrollDirectionDown) || 
  (depthInMeters - Number(isInRangeMTo300) < 100 && scrollDirectionDown);

  if (!isInRange && isInRangeMTo300) {
    customScaleElem.innerHTML = `You are as deep as ${comparisonCorrospondingDepth[isInRangeMTo300]}`;
    customScaleElem.classList.add('fade-in');
  }

  if(!isInRangeOfExit && isInRange200To300) {
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

function animationPlayer (container, path) {
  this.animation = lottie.loadAnimation({
    container: container,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path,
  });
}

// var crabAnimation = null;

document.addEventListener('DOMContentLoaded', () => {
  
  let waveElement = document.getElementById('wave-animation');
  let crabElements = document.getElementsByClassName('crab');
  let waveAnimation = new animationPlayer(waveElement, waveAnimationData);
  let crabsAnimation = [...crabElements].map((elem) => {
    let crabAnim = new animationPlayer(elem, crabAnimationData);
    elem.addEventListener('click', () => {
      crabAnim.animation.destroy();
      crabAnim = new animationPlayer(elem, crabAnimationAfterTouchData);
      setTimeout(() => {
        crabAnim.animation.destroy();
        crabAnim = new animationPlayer(elem, crabAnimationData);
      }, 4000);
    })
    return crabAnim;
  })

  document.getElementById('back-to-top').addEventListener('click', () => {
    let elem = document.querySelector('html')
    let customScaleElem = document.getElementById('custom-scale');
    customScaleElem.style.display = 'none';
    scrollTo(elem, 0, 2000, () => {
      customScaleElem.removeAttribute('style');
    });
  });


}, false)

window.addEventListener('scroll', () => { 
  let bgElem = document.getElementById('background-wrapper');
  requestAnimationFrame(parallaxScroll.bind(this, bgElem));
  // let crabElements = document.getElementsByClassName('crab');
  // [...crabElements].map((elem) => {
  //   requestAnimationFrame(parallaxScroll.bind(this, elem, true));
  // })
  measureDepth();
  this.oldScroll = this.scrollY;
}, false)
 


