export default class AnimaNumeros {
  constructor(numeros, observerTarget, observerClass) {
    this.numeros = document.querySelectorAll(numeros, observerTarget, observerClass);
    this.observerTarget = document.querySelector(observerTarget);
    this.observerClass = observerClass;
  }

  static incrementarNumeros(numero) {
    const total = +numero.innerText;
    const incremento = Math.floor(total / 100);
    let start = 0;
    const timer = setInterval(() => {
      start += incremento;
      numero.innerText = start;
      if (start > total) {
        numero.innerText = total;
        clearInterval(timer);
      }
    }, 25 * Math.random());
  }

  handleMutantion(mutation) {
    if (mutation[0].target.classList.contains(this.observerClass)) {
      this.observer.disconnect();
      this.animaNumero();
    }
  }

  animaNumero() {
    console.log('teste');
    this.numeros.forEach((numero) => this.constructor.incrementarNumeros(numero));
  }

  addMutationObserver() {
    this.observer = new MutationObserver(this.handleMutantion);
    this.observer.observe(this.observerTarget, { attributes: true });
  }

  init() {
    if (this.numeros.length && this.observerTarget) {
      this.addMutationObserver();
    }
    return this;
  }
}
