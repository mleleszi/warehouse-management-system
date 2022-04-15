import { Injectable } from '@angular/core';
import Part from './part.model';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PartService {
  private parts: Part[];
  private partsUpdated = new Subject<{ parts: Part[] }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPartsUpdatedListener() {
    return this.partsUpdated;
  }

  getParts() {
    this.http
      .get<Part[]>('http://localhost:8080/api/part')
      .pipe(
        map((data) => {
          return {
            parts: data.map((part) => {
              return {
                id: part.id,
                name: part.name,
                quantity: part.quantity,
                createdAt: part.createdAt,
              };
            }),
          };
        })
      )
      .subscribe((data) => {
        this.parts = data.parts;
        this.partsUpdated.next({ parts: [...this.parts] });
      });
  }

  getPart(id: string) {
    return this.http.get<Part>('http://localhost:8080/api/part/' + id);
  }

  createPart(part: { id: number; name: string; quantity: number }) {
    part.id = null;
    this.http.post('http://localhost:8080/api/part/', part).subscribe((res) => {
      this.router.navigate(['/parts']);
    });
  }

  updatePart(part: { id: number; name: string; quantity: number }) {
    this.http.put('http://localhost:8080/api/part', part).subscribe((res) => {
      this.router.navigate(['/parts']);
    });
  }

  deletePart(id: string) {
    return this.http.delete('http://localhost:8080/api/part/' + id);
  }
}
