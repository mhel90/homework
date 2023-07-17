export class HomePage {
    get regularItems() {
        return cy.get('.row').not('[ng-show]')
    }

    get favoriteItems() {
        return cy.get('.row').not('.ng-hide').find('[alt="add to fav"]')
    }

    get perPageDropdown() {
        return cy.get('select').eq(0)
    }

    get searchField() {
        return cy.get('input')
    }

    get clearSearchButton() {
        return cy.get('.clearSearch')
    }

    getName(rowNumber) {
        return this.regularItems.eq(rowNumber).find('.ng-binding').eq(0)
    }

    getSummary(rowNumber) {
        return this.regularItems.eq(rowNumber).find('.ng-binding').eq(1)
    }

    getTime(rowNumber) {
        return this.regularItems.eq(rowNumber).find('.ng-binding').eq(2)
    }

    viewItem(rowNumber) {
        this.regularItems.eq(rowNumber).click()
    }

}