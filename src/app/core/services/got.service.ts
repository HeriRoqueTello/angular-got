import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { GotCharacter } from '../models/got.model';

@Injectable({
  providedIn: 'root'
})
export class GotService {
  readonly #gotUrl = 'http://localhost:3000/personajes';

  public readonly charactersResource: HttpResourceRef<GotCharacter[] | undefined>;

  constructor(private http: HttpClient) {
    this.charactersResource = httpResource<GotCharacter[]>(() => this.#gotUrl);
  }


  getCharacter(id: Signal<string>): HttpResourceRef<GotCharacter | undefined> {
    return httpResource<GotCharacter>(() => `${this.#gotUrl}/${id()}`);
  }

  addCharacter(character: Omit<GotCharacter, 'id'>) {
    return this.http.post(this.#gotUrl, character);
  }

  updateCharacter(character: GotCharacter) {
    return this.http.put(`${this.#gotUrl}/${character.id}`, character);
  }

  deleteCharacter(id: Signal<string>) {
    return this.http.delete(`${this.#gotUrl}/${id()}`);
  }

  refreshCharacters() {
    this.charactersResource.reload();
  }

}
