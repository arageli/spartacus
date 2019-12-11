import { Injectable } from '@angular/core';
import { ProductSearchPage } from '../../../../model/product-search.model';
import { PRODUCT_NORMALIZER } from '../../../../product/connectors/product/converters';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';

@Injectable({ providedIn: 'root' })
export class OccProductSearchPageNormalizer
  implements Converter<Occ.ProductSearchPage, ProductSearchPage> {
  constructor(private converterService: ConverterService) {}

  convert(
    source: Occ.ProductSearchPage,
    target: ProductSearchPage = {}
  ): ProductSearchPage {
    this.normalizeFacetValues(source);
    target = {
      ...target,
      ...(source as any),
    };
    if (source.products) {
      target.products = source.products.map(product =>
        this.converterService.convert(product, PRODUCT_NORMALIZER)
      );
    }

    return target;
  }

  /**
   *
   * In case there are so-called `topVales` given for the facet values,
   * we replace the facet values by the topValues, simple because the
   * values are obsolete.
   *
   * `topValues` is a feature in the adaptive search which can limit a large
   * amount of facet values to a small set (5 by default). As long as the backend
   * provides all facet values AND topValues, we normalize the data to not bother
   * the UI with this specific feature.
   */
  private normalizeFacetValues(source: Occ.ProductSearchPage) {
    if (source.facets) {
      source.facets.map(facet => {
        if (facet.topValues) {
          facet.values = facet.topValues;
          delete facet.topValues;
        }
      });
    }
  }
}
