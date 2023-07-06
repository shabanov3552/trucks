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
         e.preventDefault();
         if (!ddBox.classList.contains('_slide')) {
            _slideToggle(ddBox, 300);
            dropdown.classList.toggle('dropdown-open');
            header.classList.toggle('dropdown-open');
         }
      }
      if (!e.target.closest(".menu__item_dropdown .menu__link")) {
         if (!ddBox.classList.contains('_slide')) {
            _slideUp(ddBox, 300);
            dropdown.classList.remove('dropdown-open');
            header.classList.remove('dropdown-open');
         }
      }
   });
}

//#endregion

//#region Шаринг в деталке

let shareButton = document.getElementById('share-button');
if (shareButton) {


   let thisUrl = window.location.href;
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
            });

      } else {
         flsModules.popup.open('#share-popup');
         copyUrl();
      }
   });
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

//#region запуск анимации на главном экране

const video = document.querySelector(".home-page__fb-video video");

if (video) {
   video.addEventListener("timeupdate", (e) => {
      if (e.target.currentTime <= 0.1) {
         startAnim();
      }
   });
}

export function startAnim() {
   if (!video) return;

   const messageFirst = document.querySelector('.home-page__fb-message_first'),
      messageSecond = document.querySelector('.home-page__fb-message_second'),
      messageThird = document.querySelector('.home-page__fb-message_third'),
      messageFourth = document.querySelector('.home-page__fb-message_fourth'),
      messageFifth = document.querySelector('.home-page__fb-message_fifth');

   // первое появление карточки
   messageFifth.classList.add('_active');
   setTimeout(() => {
      messageFifth.classList.remove('_active');
   }, 3000);

   // второе появление карточки
   setTimeout(() => {
      messageFirst.classList.add('_active');
   }, 3500);

   // третье появление карточки
   setTimeout(() => {
      messageFirst.classList.remove('_active');
      messageSecond.classList.add('_active');
   }, 6700);

   // четвертое появление карточки
   setTimeout(() => {
      messageSecond.classList.remove('_active');
      messageThird.classList.add('_active');
   }, 10000);

   // пятое появление карточки
   setTimeout(() => {
      messageThird.classList.remove('_active');
      messageFourth.classList.add('_active');
   }, 11500);

   // скрытие пятой карточки
   setTimeout(() => {
      messageFourth.classList.remove('_active');
      video.currentTime = 0;
   }, 12900);
}

//#endregion

//#region render video preview in video gallery

class YouTubeVideoPreview {
   constructor(videoId, element) {
      this.element = element;
      this.apiKey = "AIzaSyAwGUSLR-S7iSRFO6JDZwlEskC_5M6zeys";
      this.videoId = videoId;
      this.url = `https://www.googleapis.com/youtube/v3/videos?id=${this.videoId}&part=snippet&key=${this.apiKey}`;
      this.imgSrc = '';
      this.title = '';
      this.date = '';
   }

   getVideoData() {

      let res = fetch(this.url).then(r => r.json());

      if (res.status === "error") {
         console.error(res);
      } else {
         res.then(json => {
            this.title = json.items[0].snippet.title;
            let date = new Date(json.items[0].snippet.publishedAt);
            this.date = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
            this.imgSrc = json.items[0].snippet.thumbnails.maxres.url;
            this.renderPreview();
         });
      }
   }

   renderPreview() {
      let html;
      if (this.element.classList.contains('broadcast')) {
         html = `
         <div class="broadcast__text">
            <p>Трансляция со склада</p>
         </div>
         <div class="broadcast__video">
            <img src="${this.imgSrc}" alt="">
         </div>`
      } else {
         html = `
         <div class="video__image-ibg"><img src="${this.imgSrc}" alt=""></div>
         <div class="video__play-btn">
            <img src="img/play-btn.png" alt="">
         </div>`;
      }
      this.element.innerHTML = html;
   }
}

const videos = document.querySelectorAll("[data-popup-youtube]");
if (videos.length > 0) {
   videos.forEach(video => {
      let preview = new YouTubeVideoPreview(video.dataset.popupYoutube, video);
      preview.getVideoData();
   });
}

//#endregion

//#region Кнопка вверх и лого


window.addEventListener('scroll', buttonToTop);
function buttonToTop(e) {
   let btnTop = document.querySelector('.broadcast');
   let scr_val = window.pageYOffset + document.documentElement.clientHeight;
   let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
   );
   scr_val >= (scrollHeight - 50) ? btnTop.classList.add('_active') : btnTop.classList.remove('_active');
};

//#endregion