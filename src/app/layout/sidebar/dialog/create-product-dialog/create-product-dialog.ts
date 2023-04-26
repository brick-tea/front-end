import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService, Product } from 'src/app/service/product.service';

/// for chip component
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.html',
  styleUrls: ['./create-product-dialog.scss'],
})
export class CreateProductDialog implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits!: Observable<string[]>;
  fruits: string[] = ['test1'];
  allFruits: string[] = ['test1', 'test2', 'test3', 'test4', 'test5'];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<CreateProductDialog>
  ) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allFruits.slice()
      )
    );
  }

  testProduct: Product = {
    status: 'string',
    title: 'string',
    content: 'string',
    price: 0,
    tag_Id: 0,
  };
  product: Product = {
    status: '',
    title: '',
    content: '',
    price: 0,
    tag_Id: 0,
  };

  ngOnInit() {
    //this.createProduct();
  }

  /// MatChips
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }
  ///

  createProduct(): void {
    const body = JSON.stringify(this.product);
    this.productService.createProduct(this.product).subscribe(
      (res) => {
        console.log(res);
        alert('成功發布！');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
