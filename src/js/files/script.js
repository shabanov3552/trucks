// Подключение функционала "Чертогов Фрилансера"
import { isMobile, _slideToggle, _slideUp } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


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