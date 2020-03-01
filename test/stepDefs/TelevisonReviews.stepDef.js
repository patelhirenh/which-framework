import { Given, When, Then } from "cucumber";
import { expect } from "chai";
import televisionReviews from "../pageObjects/TelevisionReviews";

const homePage = require("../../wdio.conf");
var chai = require("chai"); 
chai.use(require("chai-sorted"));

Given(/^user is on television landing page$/, () => {
  browser.url(homePage.config.baseUrl);
  const title = browser.getTitle();
  expect(title).to.equal("Television reviews - Which?");
});

When(/^user selects any screen size filter$/, () => {
  televisionReviews.clickScreenSizeFilter();
});

Then(/^user should see the results as per the selected filter$/, () => {
  expect(televisionReviews.verifyScreenSize()).to.be.true;
});

When(/^user select price low to high from sort by drop down$/, () => {
  televisionReviews.selectPriceLowToHigh();
});

Then(/^user should find products price are displayed in ascending order$/, () => {
    expect(televisionReviews.verifyPriceLowToHigh()).to.be.sorted();
  }
);

When(/^user select any item to compare$/, () => {});

Then(/^user should see the item has been added to comparison flyout tray$/, () => {
    expect(televisionReviews.selectProductToCompare()).to.be.equal(
      televisionReviews.flyoutProduct()
    );
  } 
);

When(/^user clicks on any product$/, () => {});

Then(/^user should be redirected to the selected product page$/, () => {
  expect(televisionReviews.clickRandomProduct()).equal(
    televisionReviews.productPageHeading()
  );
});

When(/^user clicks on more filter button$/, () => {});

Then(/^user should see the list of Brands$/, datatable => {});

When(/^user select any brand$/, () => {});

Then(/^user should see the result by the selected brand$/, () => {});
