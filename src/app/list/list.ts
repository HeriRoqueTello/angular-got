import { Component, inject } from '@angular/core';
import { GotService } from '../core/services/got.service';
import { Card } from './card/card';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Loader } from './loader/loader';

@Component({
  selector: 'got-list',
  imports: [Card, Header, Footer, Loader],
  template: `
    <got-header />
  
    <div>
    @if (gotListResource.isLoading()) {
      <got-loader />
    } @else if (gotListResource.error()) {
      <p class="text-4xl text-red-400">Error cargar Personajes</p>
    } @else {
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        @let gotList = gotListResource.value();
        @for (gotResult of gotList; track gotResult) {
          <got-card [gotResult]="gotResult" />
        }
      </div>
    }
    </div>
    <got-footer />
  `,
})
export class List {
  readonly #gotService = inject(GotService);
  protected readonly gotListResource = this.#gotService.getGotList();
}
