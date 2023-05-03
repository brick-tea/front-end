import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CreatePostDialog } from '../create-post-dialog/create-post-dialog';
import { CreateProductDialog } from '../create-product-dialog/create-product-dialog';

@Component({
  selector: 'app-select-create-type-dialog',
  templateUrl: './select-create-type-dialog.html',
  styleUrls: ['./select-create-type-dialog.scss'],
})
export class SelectCreateTypeDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SelectCreateTypeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log(this.data);
  }
  selectType(type: string) {
    if (type === 'product') {
      const MatDialogRef = this.dialog.open(CreateProductDialog, {
        height: '35rem',
        width: '40rem',
        disableClose: true,
      });
    } else if (type === 'post') {
      const MatDialogRef = this.dialog.open(CreatePostDialog, {
        height: '35rem',
        width: '40rem',
        disableClose: true,
      });
    }
    this.dialogRef.close();
  }
}

interface DialogData {
  createType: string;
}
