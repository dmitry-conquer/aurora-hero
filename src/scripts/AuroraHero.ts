export default class AuroraHero {
  private readonly selectors: Record<string, string> = {
    root: "[data-js-hero]",
    button: "[data-js-hero-button]",
    subtitle: "[data-js-hero-subtitle]",
    message: ".hero-message",
  };

  private statesClasses: Record<string, string> = {
    extended: "is-extended",
    active: "is-active",
    notExtended: "is-not-extended",
  };

  private rootElement: HTMLElement | null;
  private buttonElements: HTMLElement[] = [];
  private subtitlesElements: HTMLElement[] = [];
  private messageElements: HTMLElement[] = [];
  private currentIndex: number = 0;

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root) as HTMLElement;
    this.buttonElements = Array.from(document.querySelectorAll(this.selectors.button)) as HTMLElement[];
    this.subtitlesElements = Array.from(document.querySelectorAll(this.selectors.subtitle)) as HTMLElement[];
    this.messageElements = Array.from(document.querySelectorAll(this.selectors.message)) as HTMLElement[];
    if (this.isReady()) {
      this.init();
    }
  }

  private isReady(): boolean {
    return !!this.rootElement && this.buttonElements.length === 2 && this.subtitlesElements.length === 3 && this.messageElements.length === 2;
  }

  private init(): void {
    this.randomizeSubtitles();
    this.updateUI();

    this.buttonElements.forEach((button: HTMLElement, index: number) => {
      button.addEventListener("click", () => this.handleButtonClick(index === 0 ? -1 : 1));
    });
  }

  private handleButtonClick(direction: number): void {
    const newIndex = this.currentIndex + direction;

    if (newIndex < 0 || newIndex > 2) {
      return;
    }

    this.currentIndex = newIndex;
    this.updateUI();
    this.updateButtons();
  }

  private updateButtons(): void {
    const prevButton = this.buttonElements[0] as HTMLButtonElement;
    const nextButton = this.buttonElements[1] as HTMLButtonElement;

    prevButton.disabled = this.currentIndex === 0;
    nextButton.disabled = this.currentIndex === 2;
  }

  private updateUI(): void {
    this.subtitlesElements.forEach(subtitle => {
      subtitle.classList.remove(this.statesClasses.active);
    });

    this.messageElements.forEach(message => {
      message.classList.remove(this.statesClasses.extended);
    });

    this.subtitlesElements[this.currentIndex].classList.add(this.statesClasses.active);

    if (this.currentIndex === 1) {
      this.messageElements[0].classList.add(this.statesClasses.extended);
    } else if (this.currentIndex === 2) {
      this.messageElements[1].classList.add(this.statesClasses.extended);
    }

    this.updateButtons();
  }

  private randomizeSubtitles(): void {
    const randomIndex = Math.floor(Math.random() * this.subtitlesElements.length);
    this.currentIndex = randomIndex;
  }
}
