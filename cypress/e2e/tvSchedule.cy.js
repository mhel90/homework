import { DetailsPage } from "../pages/detailsPage"
import { HomePage } from "../pages/homePage"

describe('TV Schedule - sample tests', () => {
  const homePage = new HomePage()
  const detailsPage = new DetailsPage()

  beforeEach(() => {
    cy.visit('')
  })
  it('can view episode details', () => {
    let name 
    let summary
    let time
    let day

    // Get item details from home page
    homePage.getName(1).then((el) => {
      name = el.text()
    })
    homePage.getSummary(1).then((el) => {
      summary = el.text()
    })
    homePage.getTime(1).then((el) => {
      let arr = el.text().split(' ')
      day = arr[1]
      time = arr[3]
    }).then(() => {

      // Open one item and verify that proper details are displayed
      homePage.viewItem(1)
      cy.url().should('contain', '/details')
      detailsPage.name.should('contain.text', name)
      detailsPage.description.should('contain.text', summary)
      detailsPage.when.should('contain.text', `When? ${time} on ${day}`)
      detailsPage.coverImage.should('be.visible')
    })
  })

  it('can add episode to favorites', () => {
    // Open episode to be added to favorites 
    homePage.getName(1).then((el) => {
      name = el.text()
    }).then(() => {
      homePage.viewItem(1)

      // Verify item is not already marked as favorite
      detailsPage.favoriteHint.should('contain.text', 'Add to favorites')

      // Add to favorites
      detailsPage.addToFavoriteIcon.click();

      // Assert
      detailsPage.favoriteHint.should('contain.text', 'Delete from favorites')
      detailsPage.backButton.click();
      homePage.favoriteItems.should('have.length',1)
    })
  })

  it('can view certain number of items per page', () => {
    homePage.perPageDropdown.should('have.attr','ng-init','perPage=12')
    homePage.regularItems.should('have.length',12)
    homePage.perPageDropdown.select('25')
    homePage.regularItems.should('have.length',25)
  })

  it('can search episode by name', () => {
    // Get initial number of items
    homePage.regularItems.then((el) => {
      let initialNumberOfItems = el.length
      // Search by term
      homePage.searchField.type('Morning')
      homePage.regularItems.each((el, index, list) => {
        // Verify each item contains search term 
        cy.wrap(el).should('contain.text','Morning')
      }).then((list)=>{
        // Verify there are less results than initially 
        expect(list.length).to.be.lessThan(initialNumberOfItems)
      })
      // Clear search and verify all results are shown again
      homePage.clearSearchButton.click()
      homePage.regularItems.then((el)=>{
        expect(el.length).to.be.eq(initialNumberOfItems)
      })
    })
  })
})