import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { OutletModule } from '../../../cms-structure/outlet/index';
import { CarouselModule } from '../../../shared/components/carousel/index';
import { MediaModule } from '../../../shared/components/media/media.module';
import { ProductImagesComponent } from './product-images.component';
import { AppZoomModule } from '../image-zoom/app-zoom.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    OutletModule,
    CarouselModule,
    AppZoomModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductImagesComponent: {
          component: ProductImagesComponent,
        },
      },
    }),
  ],
  declarations: [ProductImagesComponent],
  entryComponents: [ProductImagesComponent],
  exports: [ProductImagesComponent],
})
export class ProductImagesModule {}
