export class DetailsPage {
    get name() {
        return cy.get('.ng-binding').eq(0)
    }

    get description() {
        return cy.get('.ng-binding').eq(2)
    }

    get when() {
        return cy.get('.ng-binding').eq(1)
    }

    get favoriteHint() {
        return cy.get('i')
    }

    get deleteFromFavoriteIcon() {
        return cy.get('[alt="add to fav"]')
    }

    get addToFavoriteIcon() {
        return cy.get('[alt="delete fav"]')
    }

    get backButton() {
        return cy.get('.navBtn')
    }

    get coverImage() {
        return cy.get('[alt="show cover image"]')
    }
}