import { Component, inject, input } from '@angular/core';
import { GotService } from '../core/services/got.service';
import { NgOptimizedImage } from '@angular/common';
import { Info } from './info/info';
import { ArrowLeft, LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { Loader } from './loader/loader';

@Component({
  selector: 'got-details',
  imports: [NgOptimizedImage, Info, LucideAngularModule, RouterLink, Loader],
  templateUrl: `./details.html`,
})
export default class Details {
  readonly id = input<string>('');

  readonly #gotService = inject(GotService);

  protected readonly gotResource = this.#gotService.getCharacter(this.id);

  readonly ArrowLeft = ArrowLeft;
}
