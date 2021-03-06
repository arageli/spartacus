import { TestBed } from '@angular/core/testing';
import { Product } from '@spartacus/core';
import { JsonLdBaseProductBuilder } from './jsonld-base-product.builder';

const simpeProductMock: Product = {
  code: '123',
  name: 'Product 123',
  summary: 'Product 123 summary',
};

const completeProductMock: Product = {
  code: '456',
  name: 'Product 456',
  summary: 'Product 456 summary',
  manufacturer: 'mybrand',
  images: {
    PRIMARY: {
      zoom: {
        url: 'https://images.com/456.jpg',
      },
    },
  },
};

describe('JsonLdBaseProductBuilder', () => {
  let service: JsonLdBaseProductBuilder;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonLdBaseProductBuilder],
    });

    service = TestBed.inject(JsonLdBaseProductBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build simple product schema', () => {
    service
      .build(simpeProductMock)
      .subscribe((schema) => {
        expect(schema).toEqual({
          sku: '123',
          name: 'Product 123',
          description: 'Product 123 summary',
        });
      })
      .unsubscribe();
  });

  it('should build full base product schema', () => {
    service
      .build(completeProductMock)
      .subscribe((schema) => {
        expect(schema).toEqual({
          sku: '456',
          name: 'Product 456',
          description: 'Product 456 summary',
          image: 'https://images.com/456.jpg',
          brand: 'mybrand',
        });
      })
      .unsubscribe();
  });
});
