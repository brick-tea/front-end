import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductPageComponent } from './product-page/product-page.component';
import { LayoutModule } from '../layout/layout.module';
import { BoardComponent } from './board/board.component';
import { ProductFilterComponent } from './product-page/product-filter/product-filter.component';
import { ProductInfoDialog } from './product-page/product-info-dialog/product-info-dialog';
import { PostInfoDialog } from './board/post-info-dialog/post-info-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { NgBoringAvatarsModule } from 'ng-boring-avatars';
@NgModule({
  declarations: [
    ProductPageComponent,
    BoardComponent,
    ProductFilterComponent,
    ProductInfoDialog,
    PostInfoDialog,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MdbDropdownModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    LayoutModule,
    NgBoringAvatarsModule,
  ],
  exports: [ProductPageComponent],
})
export class ProductModule {}
