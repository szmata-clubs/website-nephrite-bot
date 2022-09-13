function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight + 300 || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    );
}

const features = document.querySelector('#features')
const features_paused = document.querySelectorAll('#features .xyz-paused-all')

const development = document.querySelector('#development')
const development_paused = document.querySelectorAll('#development .xyz-paused-all')

let open_counter = false;

const counter = document.querySelector('#counter')
let counter_count = 0;
let counter_inverval = null;

const counter2 = document.querySelector('#counter2')
let counter2_count = 0;
let counter2_inverval = null;

document.addEventListener('scroll', () => {
    if(isInViewport(features)) {
        for (i = 0; i < features_paused.length; i++) {
            features_paused[i].classList.remove('xyz-paused-all')
        }
    }
    if(isInViewport(development)) {
      if (!open_counter) {
        open_counter = true;
        counter_inverval = setInterval(() => {
          counter_count += 500;
          if (counter_count >= 80000) {
            clearInterval(counter_inverval)
            counter_count = 80000;
          }
          counter.innerHTML = `${counter_count}+`
        }, 20)
        counter2_inverval = setInterval(() => {
          counter2_count += 5;
          if (counter2_count >= 500) {
            clearInterval(counter2_inverval)
            counter2_count = 500;
          }
          counter2.innerHTML = `${counter2_count}+`
        }, 30)
      }
      for (i = 0; i < development_paused.length; i++) {
          development_paused[i].classList.remove('xyz-paused-all')
      }
    }
}, {
    passive: true
})


const plugins = document.getElementsByClassName('plugin')
const plugins_nav = document.getElementsByClassName('plugin-navbar')

function changeTab(pluginName) {
  const plugin = document.getElementById(pluginName)
  const plugin_nav = document.getElementById(pluginName + "-navbar")

  for (i = 0; i < plugins.length; i++) {
      plugins[i].style.display = "none"
  }
  plugin.style.display = "block";

  for (i = 0; i < plugins_nav.length; i++) {
      plugins_nav[i].style.background = "unset"
      plugins_nav[i].style.color = "unset"
  }
  plugin_nav.style.background = "#fb514b";
  plugin_nav.style.color = "black";
}