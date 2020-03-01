# WebdriverIO CucumberJS JavaScript
This project is designed using Webdriver.io on Cucumber Framework

## How to install

    Clone or Download the zip 
    Run command:
    npm install

## How to run tests   

    npm run tests

## Features

-   Cucumber Framework
-   Allure Reporter
-   Chai For assertions

##### Reporting

The Allure Reporter creates test reports which is an HTML generated website with all necessary information to debug your test results and take a look on error screenshots. 

After the tests has been executed view the allure reporting by simply running the command:

-npm run open-allure


### Dependencies

Java must be installed to run allure reports


##### Using Cucumber JavaScript framework

Tests are written in the Cucumber framework using the Gherkin Syntax. More about Gherkin & Cucumber can be found at https://cucumber.io/docs/reference

Tests are place in `*.feature` files in the `/test/features/` directory. A typical test will look similar to this:
```
Feature: Television Reviews

    As a user I would like to compare and view the television reviews,
    so that I can buy the right television

    Background:
        Given user is on television landing page

    Scenario: Filter by Screen size
        When user selects any screen size filter
        Then user should see the results as per the selected filter

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

```

### The Page Object Design Pattern

Within your web app's UI there are areas that your tests interact with. A Page Object simply models these as objects within the test code. This reduces the amount of duplicated code and means that if the UI changes, the fix need only be applied in one place. In other wards one of the challenges of writing test automation is keeping your [selectors] (classes, id's, or xpath' etc.) up to date with the latest version of your code.  The next challenge is to keep the code you write nice and DRY (Don't Repeat Yourself).  The page object pattern helps us accomplish this in one solution.  

You can also place reusable functions or logic inside of these pages and call them from your step files. The page object serves as a layer of abstraction between tests and code.  When A test fails, it fails on a individual step.  That step may call a selector that is no longer valid, but that selector may be used by many other steps.  By having a single source of truth of what the selector is supposed to be, fixing one selector on the page object could repair a number of failing tests that were affected by the same selector.

For more information on the implementation of `Page Object Design Pattern`, refer to the `/test/pageobjects` directory. 

```
class TelevisionReviews {
  /**
   * define elements
   */
  //This is the locator for screen size dropdown button
  get screenSizeBtn() {
    return browser.$('[data-which-button="screen_size-filter"]');
    // return browser.elementClick('[data-which-button="screen_size-filter"]')
  }

  //This is the locator for list of screen sizes
  get screenSize() {
    return browser.$$(
      '[data-which-button*="size"]+div>div>div>ul>li>div>label>div>span>span:first-child'
    );
  }

  //This is the locator for done button under screen size dropdown button
  get doneBtn() {
    return browser.$('[data-which-id="screen_size-filter-summary"]>button');
  }

  //This is the locator for the screen size displayed on product card
  get productCardScreenSize() {
    return browser.$$(
      '[data-which-id="product-card"]>a>div:nth-child(4)>span:first-child'
    );
  }

  clickScreenSizeFilter() {
    this.screenSizeBtn.click();
  }

  randomSelectScreenSize() {
    const index = Math.floor(Math.random() * this.screenSize.length);
    const expected = this.screenSize[index].getText();
    const minScreenSize = expected.slice(0, 2);
    const maxScreenSize = expected.slice(3, 5);

    console.log("Selected screen size range " + expected);
    this.screenSize[index].click();
    this.doneBtn.waitForExist(5000);
    this.doneBtn.click();
    var value = {
      min: minScreenSize,
      max: maxScreenSize
    };
    return value;
  }

  productScreenSize() {
    const size = this.productCardScreenSize;
    const productCardScreenSize = size.map(sizeValues =>
      sizeValues.getText().slice(0, 2)
    );
    return productCardScreenSize;
  }

  verifyScreenSize() {
    browser.pause(2500);
    const values = this.randomSelectScreenSize();
    const productScreenSize = this.productScreenSize();
    for (let i = 0; i <= productScreenSize.length; i++) {
      if (
        productScreenSize[i] <= values.max &&
        productScreenSize[i] >= values.min
      ) {
        return true;
      }
    }
  }
}
export default new TelevisionReviews();
```

