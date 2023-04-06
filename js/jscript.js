// Closing hamburger menu if clicked outside or width > 991
document.addEventListener("DOMContentLoaded", () => {
  // const button = document.querySelector("#hamburgerbutton"); // находим кнопку для открытия/закрытия окна навигации
  const nav = document.querySelector("#navbarNav"); // находим окно навигации
  const hambtn = document.querySelector("#hamburgerbutton");
  const isHidden = (elem) => {
    const styles = window.getComputedStyle(elem);
    return styles.display === "none" || styles.visibility === "hidden";
  };
  const elem = document.querySelector("#hamburgerbutton");

  var width = window.innerWidth;
  window.addEventListener("resize", (e) => {
    if (isHidden(elem) && width > 991) {
      nav.classList.remove("show");
    }
  });
  window.addEventListener("click", (e) => {
    // при клике в любом месте окна браузера
    const target = e.target; // находим элемент, на котором был клик
    if (!target.closest("#navbarNav") && !target.closest("#navbar")) {
      // если этот элемент или его родительские элементы не окно навигации и не кнопка
      nav.classList.remove("show"); // то закрываем окно навигации, удаляя активный класс
    }
  });
});

// Changing styles for lang switcher if burger menu is visible
var langbtnen = document.getElementById("lngbtnen");
var langbtnru = document.getElementById("lngbtnru");
window.addEventListener("resize", function () {
  if (window.innerWidth <= 991) {
    langbtnen.classList.add(["nav-link"], ["btn-nav"]);
    langbtnru.classList.add(["nav-link"], ["btn-nav"]);
    langbtnen.classList.remove("btn-info");
    langbtnru.classList.remove("btn-info");
  } else {
    langbtnen.classList.remove(["nav-link"], ["btn-nav"]);
    langbtnru.classList.remove(["nav-link"], ["btn-nav"]);
    langbtnen.classList.add("btn-info");
    langbtnru.classList.add("btn-info");
  }
});
// Checking width after refreshing a page and setting styles for changing lang btn
function screen_check() {
  if (window.innerWidth <= 991) {
    // langbtnen.classList.add("Debug1");
    langbtnen.classList.add(["nav-link"], ["btn-nav"]);
    langbtnru.classList.add(["nav-link"], ["btn-nav"]);
    langbtnen.classList.remove("btn-info");
    langbtnru.classList.remove("btn-info");
  } else {
    // langbtnen.classList.add("Debug2");
    langbtnen.classList.remove(["nav-link"], ["btn-nav"]);
    langbtnru.classList.remove(["nav-link"], ["btn-nav"]);
    langbtnen.classList.add("btn-info");
    langbtnru.classList.add("btn-info");
  }
}
screen_check();

// Show about me section in navbar if user on secondary pages
// var navbarelements = document.querySelectorAll(".secondary-navbtn");
// var navhomepagebtn = document.getElementById("home-page");
// for (var i = 0; i < navbarelements.length; i++) {
//   navbarelements[i].onclick = function () {
//     navhomepagebtn.style.display = "block";
//   };
//   // navbarelements[0].onclick = function () {
//   //   document.getElementById("test").style.display = "none";
//   //   document.getElementById("testdocblock").classList.remove("testdocdiv");
//   // };
// }

// Hide about me section in navbar after clicking on it
// var navhomepagebtn = document.getElementById("home-page");
// navhomepagebtn.onclick = function () {
//   navhomepagebtn.style.display = "none";
// };

// window.addEventListener("click", (e) => {
//   const target = e.target;
//   var arr = document.getElementsByClassName("secondary-navbtn");
//   for (var i = 0; i < arr.length; i++) {
//     arr[i].style.display = "none";
//     target.style.display = "";
//   }
// });

// window.addEventListener("click", (e) => {
//   const target = e.target;
// });

// var testdocbtn = document.getElementById("testdocblock");
// document.getElementById("testdoc").onclick = function () {
//   document.getElementById("test").hidden = true;
//   testdocbtn.classList.remove("testdocdiv");
//   // document.getElementById("testdocblock").hidden = false;
// };
var aboutme = document.getElementById("home-page");
function openBlock(evt, blockName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(blockName).style.display = "block";
  evt.currentTarget.className += " active";
}
