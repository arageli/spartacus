import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.StoreFinderPageTemplate';
const lastPageSelector = 'cx-pagination .end';

export function searchResultsTabbingOrder(config: TabElement[]) {
  cy.visit('/store-finder/find?query=Nakano');

  cy.server();

  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/stores?fields=*`
  ).as('storesList');

  cy.wait('@storesList');

  cy.get(lastPageSelector).click();

  cy.wait('@storesList');

  verifyTabbingOrder(containerSelector, config);
}
