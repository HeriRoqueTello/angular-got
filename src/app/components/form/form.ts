import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, type FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { GotCharacter } from '../../core/models/got.model';

@Component({
  selector: 'got-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="characterForm" (ngSubmit)="onSubmitForm()" class="space-y-6">
      <div>
        <label for="firstName" class="block text-sm font-medium text-amber-400 mb-2">
          Nombre *
        </label>
        <input
          type="text"
          id="firstName"
          formControlName="firstName"
          class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          placeholder="Ej: Jon"
        />
        @if(characterForm.get('firstName')?.errors?.['required'] && characterForm.get('firstName')?.touched) {
          <p class="text-red-400 text-sm mt-1">El nombre es requerido</p>
        }
      </div>

      <div>
        <label for="lastName" class="block text-sm font-medium text-amber-400 mb-2">
          Apellido *
        </label>
        <input
          type="text"
          id="lastName"
          formControlName="lastName"
          class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          placeholder="Ej: Snow"
        />
        @if(characterForm.get('lastName')?.errors?.['required'] && characterForm.get('lastName')?.touched) {
          <p class="text-red-400 text-sm mt-1">El apellido es requerido</p>
        }
      </div>

      <div>
        <label for="fullName" class="block text-sm font-medium text-amber-400 mb-2">
          Nombre Completo
        </label>
        <input
          [disabled]="true"
          type="text"
          id="fullName"
          formControlName="fullName"
          class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          placeholder="Se genera automáticamente"
        />
      </div>

      <div>
        <label for="title" class="block text-sm font-medium text-amber-400 mb-2">
          Títulos *
        </label>
        <textarea
          id="title"
          formControlName="title"
          rows="3"
          class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
          placeholder="Ej: King in the North, Lord Commander of the Night's Watch"
        ></textarea>
        @if(characterForm.get('title')?.errors?.['required'] && characterForm.get('title')?.touched) {
          <p class="text-red-400 text-sm mt-1">El título es requerido</p>
        }
      </div>

      <div>
        <label for="family" class="block text-sm font-medium text-amber-400 mb-2">
          Casa *
        </label>
        <select
          id="family"
          formControlName="family"
          class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
        >
          <option value="">Selecciona una casa</option>
          @for (house of houses; track house) {
            <option [value]="house">{{ house }}</option>
          }
        </select>
        @if(characterForm.get('family')?.errors?.['required'] && characterForm.get('family')?.touched) {
          <p class="text-red-400 text-sm mt-1">El casa es requerido</p>
        }
      </div>

      <div>
        <label for="imageUrl" class="block text-sm font-medium text-amber-400 mb-2">
          URL de la Imagen *
        </label>
        <input
          type="url"
          id="imageUrl"
          formControlName="imageUrl"
          class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          placeholder="https://ejemplo.com/imagen.jpg"
        />
        @if(characterForm.get('imageUrl')?.errors?.['required'] && characterForm.get('imageUrl')?.touched) {
          <p class="text-red-400 text-sm mt-1">La URL de la imagen es requerida</p>
        }
      </div>

       @if(characterForm.get('imageUrl')?.value){
         <div>
           <label class="block text-sm font-medium text-amber-400 mb-2">Vista Previa</label>
           <div class="w-32 h-32 rounded-lg overflow-hidden border border-slate-600">
             <img
               [src]="characterForm.get('imageUrl')?.value || '/placeholder.svg'"
               alt="Vista previa"
               class="w-full h-full object-cover"
               (error)="onImageError($event)"
             />
           </div>
         </div>
       }

      <div class="flex gap-4 pt-4">
        <button
          type="submit"
          [disabled]="characterForm.invalid"
          class="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
        >
          {{ isEditing ? 'Actualizar Personaje' : 'Agregar Personaje' }}
        </button>
        <button
          type="button"
          (click)="onCancel.emit()"
          class="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
        >
          Cancelar
        </button>
      </div>
    </form>
  `,
})
export class Form implements OnInit {
  @Input() character?: GotCharacter
  @Input() isEditing = false
  @Output() onEdit = new EventEmitter<GotCharacter>();
  @Output() onCreate = new EventEmitter<GotCharacter | Omit<GotCharacter, "id">>()
  @Output() onCancel = new EventEmitter<void>()

  characterForm!: FormGroup

  houses = [
    "Casa Stark",
    "Casa Lannister",
    "Casa Targaryen",
    "Casa Baratheon",
    "Casa Greyjoy",
    "Casa Arryn",
    "Casa Martell",
    "Casa Tyrell",
    "Casa Tully",
    "Otro",
  ]

  private fb = inject(FormBuilder);

  ngOnInit() {
    this.characterForm = this.fb.group({
      firstName: [this.character?.firstName || "", Validators.required],
      lastName: [this.character?.lastName || "", Validators.required],
      fullName: [this.character?.fullName || "",],
      title: [this.character?.title || "", Validators.required],
      family: [this.character?.family || "", Validators.required],
      imageUrl: [this.character?.imageUrl || "", Validators.required],
    })


    this.characterForm.get("firstName")?.valueChanges.subscribe(() => this.updateFullName())
    this.characterForm.get("lastName")?.valueChanges.subscribe(() => this.updateFullName())
  }

  private updateFullName() {
    const firstName = this.characterForm.get("firstName")?.value || ""
    const lastName = this.characterForm.get("lastName")?.value || ""
    this.characterForm.get("fullName")?.setValue(`${firstName} ${lastName}`.trim())
  }

  onImageError(event: any) {
    event.target.src = "/placeholder.svg?height=128&width=128&text=Error"
  }

  onSubmitForm() {
    if (this.characterForm.valid) {
      const formValue = this.characterForm.value
      const characterData = {
        ...formValue,
        image: formValue.imageUrl,
      }

      if (this.isEditing && this.character) {
        this.onEdit.emit({ ...characterData, id: this.character.id })
      } else {
        this.onCreate.emit(characterData)
      }
    }
  }
}
