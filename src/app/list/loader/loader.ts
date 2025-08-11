import { Component } from '@angular/core';

@Component({
  selector: 'got-loader',
  imports: [],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div class="container mx-auto px-4 py-8">
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-6xl font-bold text-amber-400 mb-4">Game of Thrones</h1>
          <p class="text-slate-300 text-lg">Cargando personajes...</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          @for (item of [].constructor(8); track $index) {
            <div class="bg-slate-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
              <div class="w-full h-64 bg-slate-700"></div>
              <div class="p-4">
                <div class="h-6 bg-slate-700 rounded w-3/4 mb-2"></div>
                <div class="h-4 bg-slate-700 rounded w-1/2"></div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './loader.css'
})
export class Loader {

}
