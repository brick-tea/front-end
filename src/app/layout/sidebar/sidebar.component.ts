import { Component, OnInit } from '@angular/core';
import { SelectCreateTypeDialog } from './dialog/select-create-type-dialog/select-create-type-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(public dialog: MatDialog) {}

  openSelectTypeDialog() {
    const MatDialogRef = this.dialog.open(SelectCreateTypeDialog, {
      height: '20rem',
      width: '30rem',
      disableClose: false,
      panelClass: 'select-type-dialog-container', // in style.css
      backdropClass: 'dialog-background',
    });
  }
}
