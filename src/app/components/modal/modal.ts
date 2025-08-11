import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'got-modal',
  imports: [LucideAngularModule],
  template: `
    @if(isOpen) {
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" (click)="onClose.emit()"></div>
        <div class="relative bg-slate-800 rounded-lg shadow-2xl border border-slate-700 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-6 border-b border-slate-700">
            <h2 class="text-2xl font-bold text-amber-400">{{ title }}</h2>
            <button (click)="onClose.emit()" class="text-slate-400 hover:text-white transition-colors duration-200 p-1">
              <lucide-icon [img]="XIcon" class="w-6 h-6"></lucide-icon>
            </button>
          </div>
          <div class="p-6">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    }
  `,
})
export class Modal {
  @Input() isOpen = false
  @Input() title = ""
  @Output() onClose = new EventEmitter<void>()
  readonly XIcon = X
}
