export default class AuroraHero {
  private readonly selectors: Record<string, string> = {
    root: "[data-js-hero]",
    button: "[data-js-hero-button]",
    subtitle: "[data-js-hero-subtitle]",
  };

  private statesClasses: Record<string, string> = {
    extended: "is-extended",
    active: "is-active",
    notExtended: "is-not-extended",
  };

  private rootElement: HTMLElement | null;
  private buttonElements: HTMLElement[] = [];
  private subtitlesElements: HTMLElement[] = [];
  private isExtended: boolean = false;

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root) as HTMLElement;
    this.buttonElements = Array.from(document.querySelectorAll(this.selectors.button)) as HTMLElement[];
    this.subtitlesElements = Array.from(document.querySelectorAll(this.selectors.subtitle)) as HTMLElement[];
    if (this.isReady()) {
      this.init();
    }
  }

  private isReady(): boolean {
    return !!this.rootElement && this.buttonElements.length === 2 && this.subtitlesElements.length === 2;
  }

  private init(): void {
    this.randomizeSubtitles();
    this.isExtended = this.rootElement?.classList.contains(this.statesClasses.extended) ?? false;
    this.updateUI();

    this.buttonElements.forEach((button: HTMLElement) => {
      button.addEventListener("click", this.handleButtonClick.bind(this));
    });
  }

  private handleButtonClick(event: Event): void {
    this.rootElement?.classList.toggle(this.statesClasses.extended);
    this.isExtended = !this.isExtended;
    this.updateUI();

    const target = event.currentTarget as HTMLElement;
    const index = this.buttonElements.indexOf(target);
    (this.buttonElements[index] as HTMLButtonElement).disabled = true;
    (this.buttonElements[1 - index] as HTMLButtonElement).disabled = false;
  }

  private updateUI(): void {
    const currentIndex = this.isExtended ? 0 : 1;
    const previousIndex = this.isExtended ? 1 : 0;

    this.subtitlesElements[previousIndex].classList.remove(this.statesClasses.active);
    this.subtitlesElements[currentIndex].classList.add(this.statesClasses.active);
  }

  private randomizeSubtitles(): void {
    const randomIndex = Math.floor(Math.random() * this.subtitlesElements.length);
    this.rootElement?.classList.add(randomIndex === 0 ? this.statesClasses.extended : this.statesClasses.notExtended);
  }
}
