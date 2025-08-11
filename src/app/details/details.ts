import { Component, inject, input } from '@angular/core';
import { GotService } from '../core/services/got.service';
import { NgOptimizedImage } from '@angular/common';
import { Info } from './info/info';
import { ArrowLeft, Delete, Edit, LucideAngularModule } from 'lucide-angular';
import { Router, RouterLink } from '@angular/router';
import { Loader } from './loader/loader';
import { Modal } from '../components/modal/modal';
import { Form } from '../components/form/form';
import { GotCharacter } from '../core/models/got.model';

@Component({
  selector: 'got-details',
  imports: [NgOptimizedImage, Info, LucideAngularModule, RouterLink, Loader, Modal, Form],
  templateUrl: `./details.html`,
})
export default class Details {
  isEditModalOpen = false
  isEditCharacter = false;
  readonly id = input<string>('');

  readonly #gotService = inject(GotService);
  readonly #router = inject(Router);

  protected readonly gotResource = this.#gotService.getCharacter(this.id);

  readonly ArrowLeft = ArrowLeft;
  readonly EditIcon = Edit
  readonly DeleteIcon = Delete

  openEditModal() {
    this.isEditModalOpen = true
  }

  closeEditModal() {
    this.isEditModalOpen = false
  }

  deleteCharacter() {
    this.#gotService.deleteCharacter(this.id).subscribe({
      next: () => {
        this.#gotService.refreshCharacters();
        this.#router.navigate(['/']);
      },
      error: (error) => {
        console.error("Error al eliminar personaje:", error)
        this.isEditCharacter = false;
      },
    })
  }

  handleEditCharacter(updatedCharacter: GotCharacter) {
    if (this.isEditCharacter) {
      return;
    }
    this.isEditCharacter = true;
    this.#gotService.updateCharacter(updatedCharacter).subscribe({
      next: () => {
        this.closeEditModal()
        this.isEditCharacter = false;
        this.gotResource.reload();
        this.#gotService.refreshCharacters();
      },
      error: (error) => {
        console.error("Error actualizando personaje:", error)
        this.isEditCharacter = false;
      },
    })
  }
}
