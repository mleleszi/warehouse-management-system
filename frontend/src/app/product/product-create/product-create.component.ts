import { Component, OnInit } from '@angular/core';
import Part from '../../part/part.model';
import { Subscription } from 'rxjs';
import { PartService } from '../../part/part.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { NgForm } from '@angular/forms';
import { ProductService } from '../product.service';
import ProductCreateDto from '../product-create.dto';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  isLoading = false;
  productDto: ProductCreateDto;
  private authStatusSub: Subscription;
  private partSubscription: Subscription;
  parts: { id: number; name: string; added: number }[];
  displayedColumns: string[] = ['id', 'name', 'operations'];

  constructor(
    public productService: ProductService,
    public partService: PartService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });

    this.partService.getParts();
    this.partSubscription = this.partService
      .getPartsUpdatedListener()
      .subscribe((data) => {
        this.isLoading = false;
        this.parts = [];
        data.parts.forEach((part) => {
          this.parts.push({ id: part.id, name: part.name, added: 0 });
          console.log(part);
        });
        console.log(this.parts);
      });
  }

  onSaveProduct(form: NgForm) {
    this.productService.createPart();
    /*
    if (form.invalid) return;

    this.isLoading = true;
    if (this.mode === 'create') {
      this.partService.createPart({
        id: null,
        name: form.value.name,
        quantity: Math.floor(form.value.quantity),
      });
    } else {
      this.partService.updatePart({
        id: this.part.id,
        name: form.value.name,
        quantity: Math.floor(form.value.quantity),
      });
    }

    form.resetForm();

     */
  }
  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  increment(part: { id: number; name: string; added: number }) {
    part.added++;
  }

  decrement(part: { id: number; name: string; added: number }) {
    if (part.added <= 0) return;
    part.added--;
  }
}
