import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { GotCharacter } from '../types/got.type';

@Injectable({
  providedIn: 'root'
})
export class GotService {
  readonly #gotUrl = 'https://thronesapi.com/api/v2';

  getGotList(): HttpResourceRef<GotCharacter[] | undefined> {
    return httpResource<GotCharacter[]>(() => `${this.#gotUrl}/Characters`)
  }

  getCharacter(id: Signal<string>): HttpResourceRef<GotCharacter | undefined> {
    return httpResource<GotCharacter>(() => `${this.#gotUrl}/Characters/${Number(id())}`);
  }
}
