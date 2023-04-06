// const maxImg = document.querySelector('.right-panel img');
// const select = document.querySelector('select');
// const allLang = ['en', 'ru'];

// document.querySelectorAll('.left-panel img').forEach(item => item.onmouseenter = (event) => maxImg.src = event.target.src);

// select.addEventListener('change', changeURLLanguage);

// const langArr = {
//   "title": {
//     "ru": "Сулейман Алирзаев",
//     "en": "Suleyman Alirzaev",
//   },
//   "name" :  {
//       "ru": "Сулейман Алирзаев",
//       "en": "Suleyman Alirzaev",
//   },
//   "info-text": {
//       "ru": "Люблю вникать в детали того, что делаю. Нравится автоматизировать рутинные дела и разбираться в коде. Нравится находить баги, локализовать их и отправлять в работу и видеть её результат.",
//       "en": "I like to delve into the details of what I do. I like to automate routine tasks and understand the code. I like to find bugs, localize them and send them to work and see its result.",
//   },
//   "switch-lang": {
//       "ru": "Change lang to English",
//       "en": "Изменить язык на русский",
//   }
// }

// // перенаправить на url с указанием языка
// function changeURLLanguage() {
//     let lang = select.value;
//     location.href = window.location.pathname + '#' + lang;
//     location.reload();
// }

// function changeLanguage() {
//     let hash = window.location.hash;
//     hash = hash.substr(1);
//     console.log(hash);
//     if (!allLang.includes(hash)) {
//         location.href = window.location.pathname + '#ru';
//         location.reload();
//     }
//     select.value = hash;
//     document.querySelector('title').innerHTML = langArr['title'][hash];
//     // document.querySelector('.lng-chip').innerHTML = langArr['chip'][hash];
//     for (let key in langArr) {
//         let elem = document.querySelector('.lng-' + key);
//         if (elem) {
//             elem.innerHTML = langArr[key][hash];
//         }

//     }
// }

// changeLanguage();

// https://github.com/NickZabolotskiy/multi-language-site
var changeLocaleService = (function () {
  var locale;

  function loadLocale(defLang) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "lang.json", true);
    xhr.onreadystatechange = saveLocale.bind(this);
    xhr.onerror = function () {
      console.log("Lang packs aren't found");
    };
    xhr.send();

    function saveLocale() {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        locale = JSON.parse(xhr.responseText);
        console.log("Lang packs are loaded");
        if (defLang) changeLocale(defLang);
      }
    }
  }

  function changeLocale(lang) {
    if (!locale[lang]) return console.log("no found language");
    else changeText("locale", locale[lang]);

    function changeText(name, object, startIndex) {
      for (key in object)
        if (
          Array.isArray(object[key]) &&
          typeof object[key] != "string" &&
          typeof object[key][0] == "string"
        )
          getArrayText(key, object, name);
        else if (typeof object[key] == "object") {
          if (isNaN(key)) changeText(name + "-" + key, object[key]);
          else changeText(name, object[key], key);
        } else getText(key, object, name, startIndex);
    }
    function getText(key, object, name, startIndex) {
      var elementKey = 0;
      if (startIndex) elementKey = startIndex;

      for (
        ;
        elementKey < document.getElementsByClassName(name + "-" + key).length;
        elementKey++
      )
        if (!isNaN(elementKey))
          document.getElementsByClassName(name + "-" + key)[
            elementKey
          ].textContent = object[key];
    }
    function getArrayText(key, object, name, startIndex) {
      var elementKey = 0;
      if (startIndex) elementKey = startIndex;

      for (
        ;
        elementKey < document.getElementsByClassName(name + "-" + key).length;
        elementKey++
      )
        if (!isNaN(elementKey))
          document.getElementsByClassName(name + "-" + key)[
            elementKey
          ].textContent = object[key][elementKey % object[key].length];
    }
  }

  return {
    loadLocale: loadLocale,
    changeLocale: changeLocale,
  };
})();
changeLocaleService.loadLocale("ru");
