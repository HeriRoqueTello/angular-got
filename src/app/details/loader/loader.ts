import { Component } from '@angular/core';

@Component({
  selector: 'got-loader',
  imports: [],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div class="container mx-auto px-4 py-8">
          <div class="animate-pulse">
            <div class="h-8 bg-slate-700 rounded w-32 mb-8"></div>
            <div class="grid md:grid-cols-2 gap-8">
              <div class="h-96 bg-slate-700 rounded-lg"></div>
              <div class="space-y-4">
                <div class="h-12 bg-slate-700 rounded w-3/4"></div>
                <div class="h-6 bg-slate-700 rounded w-1/2"></div>
                <div class="h-6 bg-slate-700 rounded w-2/3"></div>
                <div class="h-24 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  `,
  styleUrl: './loader.css'
})
export class Loader {

}
