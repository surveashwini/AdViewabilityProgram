/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/************************************************************************************************
 *                                                                                              *
 *                              VARIABLES DECLARATION                                           *
 *                                                                                              *
 ************************************************************************************************/
var adIsViewable = "",
    viewabilityTime = 0,
    adElement = document.getElementById("ad");
var adElementClicked = 0;

var getElementBoundingBox = function getElementBoundingBox() {
  return adElement.getBoundingClientRect();
};

var getElementsTopY = function getElementsTopY() {
  return getElementBoundingBox().top;
};

var getElementsLeftX = function getElementsLeftX() {
  return getElementBoundingBox().left;
};

var getElementsRightY = function getElementsRightY() {
  return getElementBoundingBox().right;
};

var getElementsBottomY = function getElementsBottomY() {
  return getElementsTopY() + getElementBoundingBox().height;
};

var isNumberNegative = function isNumberNegative(value) {
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


adElement.addEventListener("click", function () {
  adElementClicked++;
});

var printData = function printData() {
  var visibilityPercentage = getElementVisibilityInPercentage();
  var percentageDetails = "";
  var ZERO_PERCENTAGE = "0%";
  var HUNDRED_PERCENTAGE = "100%";

  if (visibilityPercentage === ZERO_PERCENTAGE || visibilityPercentage === HUNDRED_PERCENTAGE) {
    percentageDetails = visibilityPercentage;
  } else {
    percentageDetails = "Partially visible - ".concat(visibilityPercentage, " to be precise!");
  }
  /**
   * Assumption here:
   * When user scrolls to the bottom of the page
   * It means 0% of the ad is visible on the view port
   * Even if the Ad is partially viewable on the viewport
   * It means it is still considered as partially viewable
   */


  console.log("Ad is viewable: ".concat(percentageDetails === "0%" || document.hidden ? false : true, "\n  \nPercentage of the Ad visibility: ").concat(visibilityPercentage, "\n  \nAd clicked count: ").concat(adElementClicked, "\n  "));
};
/**
 * This method checks if advertisement element's top and bottom values are negative
 * If any of the values are negative - it means the element is not in the viewport
 * @returns boolean value that determines the viewability of the ad element
 */


var isElementNotViewableVertically = function isElementNotViewableVertically() {
  var elementsTopY = getElementsTopY();
  var elementsBottomY = getElementsBottomY();
  return isNumberNegative(elementsTopY) && isNumberNegative(elementsBottomY) || isNumberNegative(elementsTopY) && elementsBottomY === 0 || elementsTopY === 0 && isNumberNegative(elementsBottomY);
};
/**
 * This method checks if advertisement element's left and right values are negative
 * If any of the values are negative - it means the element is not in the viewport
 * @returns boolean value that determines the viewability of the ad element
 */


var isElementNotViewableHorizontally = function isElementNotViewableHorizontally() {
  var elementsLeftX = getElementsLeftX();
  var elementsRightY = getElementsRightY();
  return isNumberNegative(elementsLeftX) && isNumberNegative(elementsRightY) || isNumberNegative(elementsLeftX) && elementsRightY === 0 || elementsLeftX === 0 && isNumberNegative(elementsRightY);
};
/**
 * This method is invoked when the user scrolls vertically such that -
 * The ad elements' top partial section is hidden from the view port
 * @returns boolean value
 */


var isElementPartiallyOutsideViewportVertically = function isElementPartiallyOutsideViewportVertically() {
  var elementsTopY = getElementsTopY();
  var elementsBottomY = getElementsBottomY();
  return !isNumberNegative(elementsTopY) && !isNumberNegative(elementsBottomY) && !(elementsTopY < document.documentElement.clientHeight);
};

var getPercentageOfElementsHeightInViewport = function getPercentageOfElementsHeightInViewport() {
  var elementsTopY = getElementsTopY();
  return Math.round((document.documentElement.clientHeight - elementsTopY) / getElementBoundingBox().height * 100);
};

var getPercentageOfElementsWidthInViewport = function getPercentageOfElementsWidthInViewport() {
  var elementsLeftX = getElementsLeftX();
  var elementsRightY = getElementsRightY();
  return "".concat(Math.round(100 - (elementsLeftX *= -1) / (elementsLeftX + elementsRightY) * 100), "%");
};

var getPercentageOfElementsRemainingHeightFromBottomInViewport = function getPercentageOfElementsRemainingHeightFromBottomInViewport() {
  var elementsTopY = getElementsTopY();
  var elementsBottomY = getElementsBottomY();
  return "".concat(Math.round(100 - (elementsTopY *= -1) / (elementsTopY + elementsBottomY) * 100), "%");
};

var getPercentageOfElementsRemainingHeightFromTopInViewport = function getPercentageOfElementsRemainingHeightFromTopInViewport() {
  var elementsTopY = getElementsTopY();
  var elementsBottomY = getElementsBottomY();
  return "".concat(Math.round(100 - (elementsBottomY *= -1) / (elementsTopY + elementsBottomY) * 100), "%");
};

var getPercentageOfElementsRemainingWidthFromLeftInViewport = function getPercentageOfElementsRemainingWidthFromLeftInViewport() {
  var elementsLeftX = getElementsLeftX();
  var elementsRightY = getElementsRightY();
  return "".concat(Math.round(100 - (elementsRightY *= -1) / (elementsLeftX + elementsRightY) * 100), "%");
};
/**
 * This method checks if advertisement element's bottomright values are less than the viewport's width
 * If the bottomRight values < viewport's width - it means the element is in the viewport
 * @returns boolean value that determines the viewability of the ad element
 */


var isElementVerticallyInsideViewport = function isElementVerticallyInsideViewport() {
  var elementsBottomY = getElementsBottomY();
  var elementsRightY = getElementsRightY();
  var elementsBottomRight = elementsBottomY + elementsRightY;
  return elementsBottomRight < document.documentElement.clientWidth;
};
/**
 * This method checks if advertisement element's right value is less than the viewport's width
 * If the right value < viewport's width - it means the element is in the viewport
 * @returns boolean value that determines the viewability of the ad element
 */


var isElementHorizontallyInsideViewport = function isElementHorizontallyInsideViewport() {
  var elementsLeftX = getElementsLeftX();
  var elementsRightY = getElementsRightY();
  return !isNumberNegative(elementsLeftX) && !isNumberNegative(elementsRightY) && !(elementsRightY > document.documentElement.clientWidth);
};

var getPercentageOfElementsWidthFromLeftInViewport = function getPercentageOfElementsWidthFromLeftInViewport() {
  var elementsRightY = getElementsRightY();
  return Math.round(100 - (elementsRightY - document.documentElement.clientWidth) / getElementBoundingBox().width * 100);
};

var processPercentage = function processPercentage(percentage) {
  percentage = percentage > 100 ? 100 : percentage;
  return "".concat(percentage, "%");
};

var getElementVisibilityInPercentage = function getElementVisibilityInPercentage() {
  var elementsTopY = getElementsTopY();
  var elementsBottomY = getElementsBottomY();
  var elementsLeftX = getElementsLeftX();
  var elementsRightY = getElementsRightY();
  var ZERO_PERCENTAGE = "0%";
  var HUNDRED_PERCENTAGE = "100%";

  if (window.scrollY > 0 && window.scrollX === 0) {
    /**
     * This block is invoked when the user scrolls vertically
     * Given - horizontal scroll is not touched
     */
    if (isElementNotViewableVertically()) {
      return ZERO_PERCENTAGE;
    } else if (isElementPartiallyOutsideViewportVertically()) {
      if (isElementVerticallyInsideViewport()) {
        var percentage = getPercentageOfElementsHeightInViewport();
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
        var _percentage = getPercentageOfElementsHeightInViewport();

        return processPercentage(_percentage);
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
        var _percentage2 = getPercentageOfElementsWidthFromLeftInViewport();

        _percentage2 = isNumberNegative(_percentage2) ? 0 : _percentage2;
        return "".concat(_percentage2, "%");
      }
    }

    return ZERO_PERCENTAGE;
  } else if (window.scrollX > 0 && window.scrollY > 0) {
    /**
     * This block is invoked when the user scrolls horizontally and vertically
     * Given - horizontal and vertical scroll values are not 0
     */
    if (isNumberNegative(elementsLeftX) && isNumberNegative(elementsRightY) || isNumberNegative(elementsTopY) && isNumberNegative(elementsBottomY)) {
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
      var _percentage3 = getPercentageOfElementsWidthFromLeftInViewport();

      _percentage3 = isNumberNegative(_percentage3) ? 0 : _percentage3;
      return "".concat(_percentage3, "%");
    } else if (elementsTopY < document.documentElement.clientHeight) {
      var elementsBottomRight = elementsBottomY + elementsRightY;

      if (elementsBottomRight < document.documentElement.clientWidth + window.scrollY || elementsRightY < document.documentElement.clientHeight + window.scrollX) {
        // this block is invoked when user has scrolled such that -
        // element's top section is inside of viewport
        // element's bottom right section is inside the viewport
        var _percentage4 = getPercentageOfElementsHeightInViewport();

        return processPercentage(_percentage4);
      }

      return ZERO_PERCENTAGE;
    }

    return ZERO_PERCENTAGE;
  } else if (window.scrollX === 0 && window.scrollY === 0) {
    /**
     * This block is invoked when the user doesnt scrolls at all
     * Given - horizontal and vertical scroll is not touched
     */
    var _elementsBottomRight = elementsBottomY + elementsRightY;

    var documentsBottomRight = document.documentElement.clientWidth + document.documentElement.clientHeight;

    if (_elementsBottomRight < documentsBottomRight && elementsRightY < document.documentElement.clientWidth) {
      return HUNDRED_PERCENTAGE;
    }

    return ZERO_PERCENTAGE;
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getElementVisibilityInPercentage);
/******/ })()
;