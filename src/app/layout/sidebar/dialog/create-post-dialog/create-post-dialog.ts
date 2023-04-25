import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/service/product.service';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.html',
  styleUrls: ['./create-post-dialog.scss'],
})
export class CreatePostDialog implements OnInit {
  constructor(
    private product: ProductService,
    private postsService: PostsService,
    public dialogRef: MatDialogRef<CreatePostDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  proudctList: any;

  ngOnInit() {
    console.log('data:');
    console.log(this.data);

    this.product.getMyProducts().subscribe(
      (res) => {
        this.proudctList = res;
        console.log(res);
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

export class DialogData {
  title: string = '';
  content: string = '';
  status: string = '';
  productId: string[] = [];
}
