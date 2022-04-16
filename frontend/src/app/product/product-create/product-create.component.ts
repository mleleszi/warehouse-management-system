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
    if (form.invalid) return;
    this.isLoading = true;

    const blueprints: { partId: number; quantity: number }[] = this.parts
      .filter((part) => part.added !== 0)
      .map((part) => {
        return {
          partId: part.id,
          quantity: part.added,
        };
      });
    const productCreateDto: ProductCreateDto = {
      name: form.value.name,
      blueprints,
    };

    this.productService.createPart(productCreateDto).subscribe(() => {
      this.isLoading = false;
    });
    form.resetForm();
    this.parts.forEach((part) => {
      part.added = 0;
    });
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
