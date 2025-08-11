import { Component, inject } from '@angular/core';
import { GotService } from '../core/services/got.service';
import { Card } from './card/card';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Loader } from './loader/loader';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { Modal } from '../components/modal/modal';
import { Form } from '../components/form/form';
import { GotCharacter } from '../core/models/got.model';

@Component({
  selector: 'got-list',
  imports: [Card, Header, Footer, Loader, Modal, Form, LucideAngularModule],
  template: `
    <got-header />
    <div class="flex justify-center mb-8">
      <button
        (click)="openAddModal()"
        class="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
      >
        <lucide-icon [img]="PlusIcon" class="w-5 h-5"></lucide-icon>
        Agregar Personaje
      </button>
    </div>
    <div>
    @if (gotListResource.isLoading()) {
      <got-loader />
    } @else if (gotListResource.error()) {
      <p class="text-4xl text-red-400">Error cargar Personajes</p>
    } @else {
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        @let gotList = gotListResource.value();
        @for (gotResult of gotList; track gotResult.id) {
          <got-card [gotResult]="gotResult" />
        }
      </div>
    }
    </div>
    <got-modal 
      [isOpen]="isAddModalOpen" 
      (onClose)="closeAddModal()" 
      title="Agregar Nuevo Personaje"
    >
      <got-form 
        (onCreate)="handleAddCharacter($event)" 
        (onCancel)="closeAddModal()"
      ></got-form>
    </got-modal>
    <got-footer />
  `,
})
export class List {
  isAddModalOpen = false
  isAddingCharacter = false;
  readonly #gotService = inject(GotService);
  protected readonly gotListResource = this.#gotService.charactersResource;

  readonly PlusIcon = Plus

  openAddModal() {
    this.isAddModalOpen = true
  }

  closeAddModal() {
    this.isAddModalOpen = false
  }

  handleAddCharacter(characterData: Omit<GotCharacter, "id">) {
    if (this.isAddingCharacter) {
      return;
    }
    this.isAddingCharacter = true;
    this.#gotService.addCharacter(characterData).subscribe({
      next: () => {
        this.closeAddModal()
        this.isAddingCharacter = false;
        this.#gotService.refreshCharacters();
      },
      error: (error) => {
        console.error("Error al agregar un nuevo personaje:", error)
        this.isAddingCharacter = false;
      },
    })
  }
}
