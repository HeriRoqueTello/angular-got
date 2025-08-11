import { Component, input } from '@angular/core';
import { GotCharacter } from '../../core/types/got.type';
import { CrownIcon, FileIcon, LucideAngularModule, ShieldIcon, UsersIcon } from 'lucide-angular';

@Component({
  selector: 'got-info',
  imports: [LucideAngularModule],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">{{character().fullName}}</h1>
        <div class="w-16 h-1 bg-amber-400 rounded-full"></div>
      </div>

      <div class="grid gap-4">
        <div class="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div class="flex items-center gap-3 mb-2">
            <lucide-icon [img]="CrownIcon" class="w-5 h-5 text-amber-400"></lucide-icon>
            <h3 class="text-lg font-semibold text-amber-400">Títulos</h3>
          </div>
          <p class="text-slate-300 leading-relaxed">{{character().title}}</p>
        </div>

        <div class="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div class="flex items-center gap-3 mb-2">
            <lucide-icon [img]="ShieldIcon" class="shield w-5 h-5 text-amber-400"></lucide-icon>
            <h3 class="text-lg font-semibold text-amber-400">Casa</h3>
          </div>
          <p class="text-slate-300">{{character().family}}</p>
        </div>

        <div class="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div class="flex items-center gap-3 mb-2">
            <lucide-icon [img]="UsersIcon" class="w-5 h-5 text-amber-400"></lucide-icon>
            <h3 class="text-lg font-semibold text-amber-400">Nombres</h3>
          </div>
          <div class="space-y-1 text-slate-300">
            <p>
              <span class="text-amber-200">Nombre:</span> {{character().firstName}}
            </p>
            <p>
              <span class="text-amber-200">Apellido:</span> {{character().lastName}}
            </p>
            <p>
              <span class="text-amber-200">Nombre completo:</span> {{character().fullName}}
            </p>
          </div>
        </div>
      </div>
  `,
  styleUrl: './info.css'
})
export class Info {
  readonly character = input.required<GotCharacter>();
  readonly CrownIcon = CrownIcon
  readonly ShieldIcon = ShieldIcon;
  readonly UsersIcon = UsersIcon;
}
