import { Component, OnInit } from '@angular/core';
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
}
