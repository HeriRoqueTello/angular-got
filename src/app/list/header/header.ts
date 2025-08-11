import { Component } from '@angular/core';

@Component({
  selector: 'got-header',
  imports: [],
  template: `
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-6xl font-bold text-amber-400 mb-4 tracking-wide">Game of Thrones</h1>
      <p class="text-slate-300 text-lg max-w-2xl mx-auto">
        Descubre los personajes más icónicos de los Siete Reinos
      </p>
      <div class="w-24 h-1 bg-amber-400 mx-auto mt-4 rounded-full"></div>
    </div>
  `,
})
export class Header {

}
