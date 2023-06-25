// Подключение функционала "Чертогов Фрилансера"
import { isMobile, _slideToggle, _slideUp } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

//#region Глобальный клик

document.addEventListener("click", function (e) {
   // очистка input по клику на крестик
   if (e.target.closest('.form__clear-svg')) {
      let input = e.target.closest('.form__line').querySelector('.form__input');
      input.value = '';
      input.classList.remove('_form-focus');
      input.parentElement.classList.remove('_form-focus');
      e.target.closest('.form__clear-svg').classList.remove('_active');
      // Inputmask.remove(input);
      input.style.height = `auto`;
   }
});

//#endregion

//#region открыть\закрыть dropdown каталога в меню

const dropdown = document.querySelector('.menu__item_dropdown');
if (dropdown) {
   let ddBox = document.querySelector('.dropdown-catalog');
   let header = document.querySelector('.header');
   document.addEventListener("click", function (e) {
      // e.preventDefault()
      if (e.target.closest(".menu__item_dropdown .menu__link")) {
         e.preventDefault()
         if (!ddBox.classList.contains('_slide')) {
            _slideToggle(ddBox);
            dropdown.classList.toggle('dropdown-open');
            header.classList.toggle('dropdown-open');
         }
      }
      if (!e.target.closest(".menu__item_dropdown .menu__link")) {
         if (!ddBox.classList.contains('_slide')) {
            _slideUp(ddBox);
            dropdown.classList.remove('dropdown-open');
            header.classList.remove('dropdown-open');
         }
      }
   });
}

//#endregion

//#region Плавающая линия для табов


// document.querySelectorAll(".float-line").forEach(e => {
//    floatLine(e)
// });

// function floatLine(node) {
//    if (!node) return

//    node.addEventListener("mouseover", (e) => {
//       if (e.target.classList.contains("float-line__item")) {
//          if (node.closest('.float-line__horizontal')) {
//             node.style.setProperty(
//                "--underline-offset-y",
//                `${e.target.offsetTop}px`
//             );
//             node.style.setProperty(
//                "--underline-height",
//                `${e.target.offsetHeight}px`
//             );
//          } else {
//             node.style.setProperty(
//                "--underline-width",
//                `${e.target.offsetWidth}px`
//             );
//             node.style.setProperty(
//                "--underline-offset-x",
//                `${e.target.offsetLeft}px`
//             );
//          }
//       }
//    });
//    node.addEventListener("mouseleave", () => {
//       if (node.closest('.float-line__horizontal')) {
//          node.style.setProperty("--underline-height", "0")
//       } else {
//          node.style.setProperty("--underline-width", "0")
//       }
//    });
// }

//#endregion

//#region Шаринг в деталке


let shareButton = document.getElementById('share-button');
if (shareButton) {


   let thisUrl = window.location.href
   let thisTitle = document.title;
   shareButton.addEventListener('click', function () {
      // Проверка поддержки navigator.share
      if (navigator.share && isMobile.any()) {

         // navigator.share принимает объект с URL, title или text
         navigator.share({
            title: thisTitle,
            url: thisUrl
         })
            .then(function () {
               // Shareing successfull
            })
            .catch(function () {
               // Sharing failed
            })

      } else {
         flsModules.popup.open('#share-popup');
         copyUrl();
      }
   })
}
function copyUrl() {
   const copyButton = document.querySelector('.share__button');
   const copyInput = document.querySelector('.share__input');
   console.log(copyInput);
   copyInput.value = window.location.href;
   setTimeout(() => {
      copyInput.focus();
   }, 100);

   copyButton.addEventListener("click", function (e) {
      copyInput.select();
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      copyButton.innerHTML = 'Ссылка скопированна';
      copyButton.classList.remove('btn__orange');
      copyButton.setAttribute('disabled', 'true');
   });
}

//#endregion