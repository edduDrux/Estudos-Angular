import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-hello',
  imports: [],
  templateUrl: './hello.html',
  styleUrl: './hello.css',
})
export class Hello {
  protected title = signal<string>('Welcome to Modern Angular!');
  protected isDisabled = signal<boolean>(false);
  protected count = signal<number>(0);
  protected doubleCount = computed(() => this.count() * 2);

  protected onClick() {
    console.log('Button clicked');
    this.isDisabled.update((value) => !value);
  }

  private readonly countLog = effect(() => {
    console.log('Count changed:', this.count());
  });

  getDoubleCount() {
    return this.count() * 2;
  }

  protected increateCounter() {
    // same as: count = count + 1;
    this.count.update((value) => value + 1);
  }

  protected decreaseCounter() {
    this.count.update((value) => value - 1);
  }

  protected resetCounter() {
    this.count.set(0);
  }
}
