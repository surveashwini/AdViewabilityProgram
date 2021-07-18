/************************************************************************************************
 *                                                                                              *
 *                              VARIABLES DECLARATION                                           *
 *                                                                                              *
 ************************************************************************************************/
var adElement = document.getElementById("ad");

var adElementClicked = 0;

var getElementBoundingBox = () => {
  return adElement.getBoundingClientRect();
};

var getElementsTopY = () => {
  return getElementBoundingBox().top;
};

var getElementsLeftX = () => {
  return getElementBoundingBox().left;
};

var getElementsRightY = () => {
  return getElementBoundingBox().right;
};

var getElementsBottomY = () => {
  return getElementsTopY() + getElementBoundingBox().height;
};

var isNumberNegative = (value) => {
  return Math.sign(value) === -1;
};

/**
 * Logs the viewability values in the console
 *
 * @override
 */
window.log = function (data) {
  printData();
};

/************************************************************************************************
 *                                                                                              *
 *                              YOUR IMPLEMENTATION                                             *
 *                                                                                              *
 ************************************************************************************************/

adElement.addEventListener("click", () => {
  adElementClicked++;
});

var printData = function () {
  let visibilityPercentage = getElementVisibilityInPercentage();
  let percentageDetails = ``;
  const ZERO_PERCENTAGE = `0%`;
  const HUNDRED_PERCENTAGE = `100%`;
  if (
    visibilityPercentage === ZERO_PERCENTAGE ||
    visibilityPercentage === HUNDRED_PERCENTAGE
  ) {
    percentageDetails = visibilityPercentage;
  } else {
    percentageDetails = `Partially visible - ${visibilityPercentage} to be precise!`;
  }

  /**
   * Assumption here:
   * When user scrolls to the bottom of the page
   * It means 0% of the ad is visible on the view port
   * Even if the Ad is partially viewable on the viewport
   * It means it is still considered as partially viewable
   */

  console.log(`Ad is viewable: ${
    percentageDetails === `0%` || document.hidden ? false : true
  }
  \nPercentage of the Ad visibility: ${visibilityPercentage}
  \nAd clicked count: ${adElementClicked}
  `);
};

/**
 * This method checks if advertisement element's top and bottom values are negative
 * If any of the values are negative - it means the element is not in the viewport
 * @returns boolean value that determines the viewability of the ad element
 */
var isElementNotViewableVertically = () => {
  let elementsTopY = getElementsTopY();
  let elementsBottomY = getElementsBottomY();
  return (
    (isNumberNegative(elementsTopY) && isNumberNegative(elementsBottomY)) ||
    (isNumberNegative(elementsTopY) && elementsBottomY === 0) ||
    (elementsTopY === 0 && isNumberNegative(elementsBottomY))
  );
};

/**
 * This method checks if advertisement element's left and right values are negative
 * If any of the values are negative - it means the element is not in the viewport
 * @returns boolean value that determines the viewability of the ad element
 */
var isElementNotViewableHorizontally = () => {
  let elementsLeftX = getElementsLeftX();
  let elementsRightY = getElementsRightY();
  return (
    (isNumberNegative(elementsLeftX) && isNumberNegative(elementsRightY)) ||
    (isNumberNegative(elementsLeftX) && elementsRightY === 0) ||
    (elementsLeftX === 0 && isNumberNegative(elementsRightY))
  );
};

/**
 * This method is invoked when the user scrolls vertically such that -
 * The ad elements' top partial section is hidden from the view port
 * @returns boolean value
 */
var isElementPartiallyOutsideViewportVertically = () => {
  let elementsTopY = getElementsTopY();
  let elementsBottomY = getElementsBottomY();
  return (
    !isNumberNegative(elementsTopY) &&
    !isNumberNegative(elementsBottomY) &&
    !(elementsTopY < document.documentElement.clientHeight)
  );
};

var getPercentageOfElementsHeightInViewport = () => {
  let elementsTopY = getElementsTopY();
  return Math.round(
    ((document.documentElement.clientHeight - elementsTopY) /
      getElementBoundingBox().height) *
      100
  );
};

var getPercentageOfElementsWidthInViewport = () => {
  let elementsLeftX = getElementsLeftX();
  let elementsRightY = getElementsRightY();
  return `${Math.round(
    100 - ((elementsLeftX *= -1) / (elementsLeftX + elementsRightY)) * 100
  )}%`;
};

var getPercentageOfElementsRemainingHeightFromBottomInViewport = () => {
  let elementsTopY = getElementsTopY();
  let elementsBottomY = getElementsBottomY();
  return `${Math.round(
    100 - ((elementsTopY *= -1) / (elementsTopY + elementsBottomY)) * 100
  )}%`;
};

var getPercentageOfElementsRemainingHeightFromTopInViewport = () => {
  let elementsTopY = getElementsTopY();
  let elementsBottomY = getElementsBottomY();
  return `${Math.round(
    100 - ((elementsBottomY *= -1) / (elementsTopY + elementsBottomY)) * 100
  )}%`;
};

var getPercentageOfElementsRemainingWidthFromLeftInViewport = () => {
  let elementsLeftX = getElementsLeftX();
  let elementsRightY = getElementsRightY();
  return `${Math.round(
    100 - ((elementsRightY *= -1) / (elementsLeftX + elementsRightY)) * 100
  )}%`;
};

/**
 * This method checks if advertisement element's bottomright values are less than the viewport's width
 * If the bottomRight values < viewport's width - it means the element is in the viewport
 * @returns boolean value that determines the viewability of the ad element
 */
var isElementVerticallyInsideViewport = () => {
  let elementsBottomY = getElementsBottomY();
  let elementsRightY = getElementsRightY();
  let elementsBottomRight = elementsBottomY + elementsRightY;
  return elementsBottomRight < document.documentElement.clientWidth;
};

/**
 * This method checks if advertisement element's right value is less than the viewport's width
 * If the right value < viewport's width - it means the element is in the viewport
 * @returns boolean value that determines the viewability of the ad element
 */
var isElementHorizontallyInsideViewport = () => {
  let elementsLeftX = getElementsLeftX();
  let elementsRightY = getElementsRightY();
  return (
    !isNumberNegative(elementsLeftX) &&
    !isNumberNegative(elementsRightY) &&
    !(elementsRightY > document.documentElement.clientWidth)
  );
};

var getPercentageOfElementsWidthFromLeftInViewport = () => {
  let elementsRightY = getElementsRightY();
  return Math.round(
    100 -
      ((elementsRightY - document.documentElement.clientWidth) /
        getElementBoundingBox().width) *
        100
  );
};

var processPercentage = (percentage) => {
  percentage = percentage > 100 ? 100 : percentage;
  return `${percentage}%`;
};

var getElementVisibilityInPercentage = () => {
  let elementsTopY = getElementsTopY();
  let elementsBottomY = getElementsBottomY();

  let elementsLeftX = getElementsLeftX();
  let elementsRightY = getElementsRightY();
  const ZERO_PERCENTAGE = `0%`;
  const HUNDRED_PERCENTAGE = `100%`;

  if (window.scrollY > 0 && window.scrollX === 0) {
    /**
     * This block is invoked when the user scrolls vertically
     * Given - horizontal scroll is not touched
     */
    if (isElementNotViewableVertically()) {
      return ZERO_PERCENTAGE;
    } else if (isElementPartiallyOutsideViewportVertically()) {
      if (isElementVerticallyInsideViewport()) {
        let percentage = getPercentageOfElementsHeightInViewport();
        return processPercentage(percentage);
      }
      return ZERO_PERCENTAGE;
    } else if (isNumberNegative(elementsTopY)) {
      // this block will be executed when user has scrolled vertically such that
      // the top portion of the ad element is hidden from the viewport and
      // only the bottom portion of the ad element is visible in the viewport
      if (isElementVerticallyInsideViewport()) {
        return getPercentageOfElementsRemainingHeightFromBottomInViewport();
      }
      return ZERO_PERCENTAGE;
    } else if (isNumberNegative(elementsBottomY)) {
      // this block will be executed when user has scrolled vertically such that
      // the bottom portion of the ad element is hidden from the viewport and
      // only the top portion of the ad element is visible in the viewport
      return getPercentageOfElementsRemainingHeightFromTopInViewport();
    } else if (elementsTopY < document.documentElement.clientHeight) {
      if (isElementVerticallyInsideViewport()) {
        let percentage = getPercentageOfElementsHeightInViewport();
        return processPercentage(percentage);
      }
      return ZERO_PERCENTAGE;
    }
  } else if (window.scrollX > 0 && window.scrollY === 0) {
    /**
     * This block is invoked when the user scrolls horizontally
     * Given - vertical scroll is not touched
     */
    if (isElementNotViewableHorizontally()) {
      return ZERO_PERCENTAGE;
    } else if (isElementHorizontallyInsideViewport()) {
      if (isElementVerticallyInsideViewport()) {
        return HUNDRED_PERCENTAGE;
      }
    } else if (isNumberNegative(elementsLeftX)) {
      if (isElementVerticallyInsideViewport()) {
        // this block is invoked when element is hidden from left out of the viewport
        // however the elements remaining half is still in the view port
        return getPercentageOfElementsWidthInViewport();
      }
    } else if (isNumberNegative(elementsRightY)) {
      return getPercentageOfElementsRemainingWidthFromLeftInViewport();
    } else if (elementsRightY > document.documentElement.clientWidth) {
      if (isElementVerticallyInsideViewport()) {
        let percentage = getPercentageOfElementsWidthFromLeftInViewport();
        percentage = isNumberNegative(percentage) ? 0 : percentage;
        return `${percentage}%`;
      }
    }
    return ZERO_PERCENTAGE;
  } else if (window.scrollX > 0 && window.scrollY > 0) {
    /**
     * This block is invoked when the user scrolls horizontally and vertically
     * Given - horizontal and vertical scroll values are not 0
     */
    if (
      (isNumberNegative(elementsLeftX) && isNumberNegative(elementsRightY)) ||
      (isNumberNegative(elementsTopY) && isNumberNegative(elementsBottomY))
    ) {
      // horizontal/vertical scrolled made the element invisible
      return ZERO_PERCENTAGE;
    } else if (isNumberNegative(elementsLeftX)) {
      /**
       * when the ad element is horizontally scrolled
       * such that the start portion of the element is outside of the viewport
       */
      if (isElementVerticallyInsideViewport()) {
        if (isNumberNegative(elementsTopY)) {
          // when ad element is only half-inside from top left corner of the view port
          return getPercentageOfElementsRemainingHeightFromBottomInViewport();
        }
        return getPercentageOfElementsWidthInViewport();
      }
      return getPercentageOfElementsWidthInViewport();
    } else if (isNumberNegative(elementsRightY)) {
      // this block is invoked when element is hidden from bottom horizontally - out of the viewport
      return getPercentageOfElementsRemainingWidthFromLeftInViewport();
    } else if (isNumberNegative(elementsTopY)) {
      // this block is invoked when element is hidden from top out of the viewport
      if (elementsLeftX < document.documentElement.clientWidth) {
        // this block is invoked when element is inside the viewport from its left X value
        return getPercentageOfElementsRemainingHeightFromBottomInViewport();
      }
    } else if (isNumberNegative(elementsBottomY)) {
      // this block is invoked when element is hidden from bottom vertically - out of the viewport
      return getPercentageOfElementsRemainingHeightFromTopInViewport();
    } else if (elementsRightY > document.documentElement.clientWidth) {
      // this block is invoked when element's right portion is outside of the viewport
      let percentage = getPercentageOfElementsWidthFromLeftInViewport();
      percentage = isNumberNegative(percentage) ? 0 : percentage;
      return `${percentage}%`;
    } else if (elementsTopY < document.documentElement.clientHeight) {
      let elementsBottomRight = elementsBottomY + elementsRightY;
      if (
        elementsBottomRight <
          document.documentElement.clientWidth + window.scrollY ||
        elementsRightY < document.documentElement.clientHeight + window.scrollX
      ) {
        // this block is invoked when user has scrolled such that -
        // element's top section is inside of viewport
        // element's bottom right section is inside the viewport
        let percentage = getPercentageOfElementsHeightInViewport();
        return processPercentage(percentage);
      }

      return ZERO_PERCENTAGE;
    }
    return ZERO_PERCENTAGE;
  } else if (window.scrollX === 0 && window.scrollY === 0) {
    /**
     * This block is invoked when the user doesnt scrolls at all
     * Given - horizontal and vertical scroll is not touched
     */
    let elementsBottomRight = elementsBottomY + elementsRightY;
    let documentsBottomRight =
      document.documentElement.clientWidth +
      document.documentElement.clientHeight;
    if (
      elementsBottomRight < documentsBottomRight &&
      elementsRightY < document.documentElement.clientWidth
    ) {
      return HUNDRED_PERCENTAGE;
    }
    return ZERO_PERCENTAGE;
  }
};

export default getElementVisibilityInPercentage;
