import { Component, OnInit } from '@angular/core';
import { SelectCreateTypeDialog } from './dialog/select-create-type-dialog/select-create-type-dialog';
import {
  CreatePostDialog,
  DialogData,
} from './dialog/create-post-dialog/create-post-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(public dialog: MatDialog) {}
  postContent: DialogData = {
    title: 'new',
    content: '',
    status: '',
    productId: [],
  };

  openCreateProductDialog(): void {}

  openCreatePostDialog() {
    this.postContent.title = 'new';

    const MatDialogRef = this.dialog.open(CreatePostDialog, {
      data: { post: this.postContent },
      height: '35rem',
      width: '40rem',
      disableClose: true,
    });
    MatDialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.postContent = data;
        console.log(this.postContent);
      }
    });
  }
  openSelectTypeDialog() {
    const MatDialogRef = this.dialog.open(SelectCreateTypeDialog, {
      data: { createType: 'none' },
      height: '20rem',
      width: '30rem',
      disableClose: false,
      panelClass: 'select-type-dialog-container', // in style.css
      backdropClass: 'dialog-background',
    });
    MatDialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      if (data.createType === 'none') return;
      else if (data.createType === 'product') {
        this.openCreateProductDialog;
      } else if (data.createType === 'post') {
        this.openCreatePostDialog();
      }
    });
  }
}
