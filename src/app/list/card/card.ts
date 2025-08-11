import { Component, input } from '@angular/core';
import { GotCharacter } from '../../core/types/got.type';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'got-card',
  imports: [NgOptimizedImage, RouterLink],
  template: `
    <a [routerLink]="['character',(gotResult().id).toString()]" class="group block bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-slate-700 hover:border-amber-400/50" href="">
      <div class="relative overflow-hidden">
        <img
          width="120"
          height="120"
          [ngSrc]="gotResult().imageUrl"
          [alt]="gotResult().image"
          class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div class="p-4">
        <p class="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors duration-300 text-center">
          {{gotResult().fullName}}
        </p>
      </div>
    </a>
  `,
})
export class Card {
  readonly gotResult = input.required<GotCharacter>();
}
