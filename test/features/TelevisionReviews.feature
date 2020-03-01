Feature: Television Reviews

    As a user I would like to compare and view the television reviews,
    so that I can buy the right television

    Background:
        Given user is on television landing page

    Scenario: Filter by Screen size
        When user selects any screen size filter
        Then user should see the results as per the selected filter

    Scenario: Sort By Price low to high
        When user select price low to high from sort by drop down
        Then user should find products price are displayed in ascending order

    Scenario: Navigate to product page
        When user clicks on any product
        Then user should be redirected to the selected product page

    Scenario: Add item to comparison flyout tray
        When user select any item to compare
        Then user should see the item has been added to comparison flyout tray

    Scenario: Filter by Brand name
        When user clicks on more filter button
        Then user should see the list of Brands
            | brands    |
            | Samsung   |
            | LG        |
            | Sony      |
            | Panasonic |
            | Hisense   |
            | Philips   |
            | JVC       |
            | Toshiba   |
        When user select any brand
        Then user should see the result by the selected brand


