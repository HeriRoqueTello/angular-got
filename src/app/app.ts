import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'got-root',
  imports: [RouterOutlet],
  template: `
    <main class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div class="container mx-auto px-4 py-8">
        <router-outlet />
      </div>
    </main>
  `,
})
export class App {

}
