class TelevisionReviews {
  /**
   * define elements
   */
  //This is the locator for screen size dropdown button
  get screenSizeBtn() {
    return $('[data-which-button="screen_size-filter"]');
  }

  //This is the locator for list of screen sizes
  get screenSize() {
    return $$(
      '[data-which-button*="size"]+div>div>div>ul>li>div>label>div>span>span:first-child'
    );
  }

  //This is the locator for done button under screen size dropdown button
  get doneBtn() {
    return $('[data-which-id="screen_size-filter-summary"]>button');
  }

  //This is the locator for the screen size displayed on product card
  get productCardScreenSize() {
    return $$(
      '[data-which-id="product-card"]>a>div:nth-child(4)>span:first-child'
    );
  }

  //This is the locator for more filters dropdown button
  get moreFilters() {
    return $('button[data-which-id="more-filters"]');
  }

  //This is the locator for show more under brands section
  get showMoreBtn() {
    return $(
     // 'div>div:nth-child(3)>section>ul>li>button>span'
      '[data-which-button="more_filters-filter"]+div>div>div>div:nth-child(3)>section>ul>li:nth-child(12)>button'
    );
  }

  //This locator is for list of brands displayed under more filters
  get brandName() {
    return $$(
      '[data-test-element*="more"]>div>div>div:nth-child(3)>section>ul>li>div>label>div>span>span>a'
    );
  }

  //This locator is for filter summary done button
  get filterSummaryDoneBtn() {
    return $('[data-which-id="more_filters-filter-summary"]>button');
  }

  //This is the locator for the brand name displayed on product card
  get manufacturerName() {
    return $$('span[itemprop="manufacturer"]');
  }

  //This is the locator for the model number displayed on product card
  get modelNumber() {
    return $$('span[itemprop="model"]');
  }

  //This is the locator for sort by dropdown button
  get sortBy() {
    return $('div:first-child>div:first-child>div>div>label>div>div>div>select');
  }

  //This is the locator for select prie low to high
  get lowToHigh(){
      return $('div:first-child>div:first-child>div>div>label>div>div>div>select>option:nth-child(3)');
  }

  //This is the locator for product amount dispalyed on product card
  get productAmount() {
    return $$('[data-test-element="product-amount"]');
  }

  //This is the locator for add to compare check box displayed on product card
  get addToCompare() {
    return $$('[data-which-id="add-to-compare-button"]');
  }

  //This is the locator for comparision flyout tray
  get flyoutTray() {
    return $('div[data-which-id="comparison-flyout-tray"]');
  }

  //This is the locator for product name displayed on flyout tray
  get flyoutProductName() {
    return $('a[data-which-id="comparison-flyout-product-name"]');
  }

  //This is the locator for product name and product model displayed on product card
  get productNameModel(){
      return $$('div[itemprop="name"]');
  }

  //This is the locator for product page Heading
  get productPageTitle(){
      return $('span[data-test-element="name"]');
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
        productScreenSize[i] >= values.min ||
        productScreenSize[i] >=values.max
      ) {
        return true;
      }
    }
  }

  selectPriceLowToHigh(){
     this.sortBy.click();
     this.lowToHigh.click();
  }

  verifyPriceLowToHigh(){
      const price=this.productAmount;
      const productCardPrice = price.map(cardPrice =>
        cardPrice.getText().slice(1)
      );
    return productCardPrice;
  }

  selectProductToCompare(){
    const index = Math.floor(Math.random() * this.addToCompare.length);
    this.addToCompare[index].click()
    // const item=$$('div[itemprop="name"]')
    const proName=this.productNameModel[index].getText()
    return proName;
  }

  flyoutProduct(){
      return this.flyoutProductName.getText();
  }

  clickRandomProduct(){
      const index = Math.floor(Math.random() * this.productNameModel.length)
      const name= this.productNameModel[index].getText()
      this.productNameModel[index].click()
      return name;
  }

  productPageHeading(){
      const heading=this.productPageTitle.getText()
      return heading;
  }
}
export default new TelevisionReviews();
