export default class Slider {
  private rootId: string = "hero-cards-slider";
  private rootElement: HTMLElement | null;
  private slider!: HTMLElement | null;
  private titlesElements: HTMLElement[] = [];

  constructor() {
    this.rootElement = document.getElementById(this.rootId);
    this.titlesElements = Array.from(document.querySelectorAll("[data-js-hero-subtitle]")) as HTMLElement[];
    if (this.rootElement) {
      // Підраховуємо кількість слайдів
      const slides = this.rootElement.querySelectorAll(".swiper-slide");
      const slidesCount = slides.length;

      // Генеруємо випадковий індекс для початкового слайда
      const randomInitialIndex = Math.floor(Math.random() * slidesCount);

      //@ts-expect-error Swiper is not typed
      this.slider = new Swiper(this.rootElement, {
        slidesPerView: 1,
        spaceBetween: 20,
        effect: "cards",
        initialSlide: randomInitialIndex,

        cardsEffect: {
          slideShadows: false,
          rotate: false,
          perSlideOffset: 6,
          perSlideRotate: 0,
        },
        navigation: {
          nextEl: ".hero-navigation__button--prev",
          prevEl: ".hero-navigation__button--next",
        },
      });

      if (this.slider) {
        // Оновлюємо активний підзаголовок відповідно до випадкового індексу
        this.titlesElements.forEach(title => {
          title.classList.remove("is-active");
        });
        if (this.titlesElements[randomInitialIndex]) {
          this.titlesElements[randomInitialIndex].classList.add("is-active");
        }

        // Додаємо клас для початкового стану
        if (this.rootElement) {
          //@ts-expect-error Swiper is not typed
          if (this.slider.activeIndex === 0) {
            const parentElement = this.rootElement?.parentElement?.parentElement;
            parentElement?.classList.add("is-first-slide");
          }
        }

        //@ts-expect-error Swiper is not typed
        this.slider.on("slideChangeTransitionStart", swiper => {
          this.titlesElements.forEach(title => {
            title.classList.remove("is-active");
          });
          this.titlesElements[swiper.activeIndex].classList.add("is-active");

          // Додаємо/видаляємо клас is-first-slide
          if (this.rootElement) {
            if (swiper.activeIndex === 0) {
              const parentElement = this.rootElement?.parentElement?.parentElement;
              if (parentElement) {
                parentElement.classList.add("is-first-slide");
              }
            } else {
              const parentElement = this.rootElement?.parentElement?.parentElement;
              parentElement?.classList.remove("is-first-slide");
            }
          }
        });
      }
    }
  }
}
