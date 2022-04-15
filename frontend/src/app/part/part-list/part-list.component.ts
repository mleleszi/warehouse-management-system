import { Component, OnDestroy, OnInit } from '@angular/core';
import { PartService } from '../part.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import Part from '../part.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.css'],
})
export class PartListComponent implements OnInit, OnDestroy {
  parts: Part[];
  isLoading = false;
  userIsAuthenticated = false;
  displayedColumns: string[] = [
    'id',
    'name',
    'quantity',
    'createdAt',
    'operations',
  ];
  private partSubscription: Subscription;
  private authListenerSubscription: Subscription;

  constructor(
    private partService: PartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.partService.getParts();
    this.partSubscription = this.partService
      .getPartsUpdatedListener()
      .subscribe((data) => {
        this.isLoading = false;
        this.parts = data.parts.sort((a, b) => a.id - b.id);
      });
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authListenerSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onDelete(partId: string) {
    this.isLoading = true;
    this.partService.deletePart(partId).subscribe(() => {
      this.partService.getParts();
    });
  }

  ngOnDestroy(): void {
    this.partSubscription.unsubscribe();
    this.authListenerSubscription.unsubscribe();
  }
}
