import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { NgForm } from '@angular/forms';
import Part from '../part.model';
import { PartService } from '../part.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './part-create.component.html',
  styleUrls: ['./part-create.component.css'],
})
export class PartCreateComponent implements OnInit {
  enteredPrice = '';
  part: Part;
  isLoading = false;
  private mode = 'create';
  private partId: string;
  private authStatusSub: Subscription;

  constructor(
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

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('partId')) {
        this.mode = 'edit';
        this.partId = paramMap.get('partId');
        this.isLoading = true;
        this.partService.getPart(this.partId).subscribe((data) => {
          this.isLoading = false;
          console.log(data);
          this.part = {
            id: data.id,
            name: data.name,
            quantity: data.quantity,
            createdAt: data.createdAt,
          };
        });
      } else {
        this.mode = 'create';
        this.partId = null;
      }
    });
  }

  onSavePart(form: NgForm) {
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
  }
  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
