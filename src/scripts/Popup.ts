import MicroModal from "micromodal";

export default class Popup {
  private selectors: Record<string, string> = {
    trigger: "[data-js-hero-or] a",
  };

  private triggerElement: HTMLElement | null;

  constructor() {
    this.triggerElement = document.querySelector(this.selectors.trigger) as HTMLElement;

    if (this.isReady()) {
      this.init();
    }
  }

  private isReady(): boolean {
    return !!this.triggerElement;
  }

  private init(): void {
    this.triggerElement?.addEventListener("click", this.handleClick.bind(this));
  }

  private handleClick(event: MouseEvent): void {
    event.preventDefault();
    const popup = document.getElementById("hero-popup") as HTMLElement;
    if (popup) {
      MicroModal.show("hero-popup", {
        disableScroll: true,
        disableFocus: true,
      });
    }
  }
}
