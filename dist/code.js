/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/canvas_image_processing/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/canvas_image_processing/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const main = {
  /**
   * conver base64-image string to Image (HTMLImageElement instance) asynchronously
   * @param  {string} base64
   * @returns {Promise}
   */
  image64ToImage(base64) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = base64;
      image.onload = function() {
        resolve(this);
      };
      image.onerror = function() {
        reject(this);
      };
    });
  },

  /**
   * conver base64-image string to canvas
   * @param  {string} base64
   * @returns {Promise}
   */
  async image64ToCanvas(base64) {
    const img = await this.image64ToImage(base64);
    return this.imageToCanvas(img);
  },

  /**
   * conver image string to canvas
   * @param  {Image} image
   * @returns {Canvas}
   */
  imageToCanvas(image) {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    return canvas;
  },

  /**
   * resize base64-string
   * @param  {string} base64
   * @param  {integer} newWidth
   * @param  {integer} newHeight
   * @returns {Promise} with base64-image
   */
  async resizeImage64(base64, newWidth, newHeight) {
    const img = await this.image64ToImage(base64);
    return this.resizeImage(img, newWidth, newHeight);
  },

  /**
   * resize image (HTMLImageElement instance)
   * @param  {image} image
   * @param  {integer} newWidth
   * @param  {integer} newHeight
   * @returns {string} base64-image string
   */
  resizeImage(image, newWidth, newHeight) {
    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, 0, 0, newWidth, newHeight);
    return canvas.toDataURL('image/jpeg');
  },

  /**
   * cropping image from base64-image string
   * @param  {string} base64
   * @param  {integer} x
   * @param  {integer} y
   * @param  {integer} newWidth
   * @param  {integer} newHeight
   * @returns {Promise} with base64-image string
   */
  async cropImage64(base64, x, y, newWidth, newHeight) {
    const img = await this.image64ToImage(base64);
    return this.cropImage(img, x, y, newWidth, newHeight);
  },

  /**
   * cropping image (HTMLImageElement instance)
   * @param  {image} image
   * @param  {integer} x
   * @param  {integer} y
   * @param  {integer} newWidth
   * @param  {integer} newHeight
   * @returns {string} base64-image string
   */
  cropImage(image, x, y, newWidth, newHeight) {
    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, x, y, newWidth, newHeight, 0, 0, newWidth, newHeight);
    return canvas.toDataURL('image/jpeg');
  },

  /**
   * calculating parameter for vertical crop
   * @param  {integer} imageWidth=0
   * @param  {integer} imageHeight=0
   * @param  {integer} items=0
   * @returns {array} [[x, y, newWidth, newHeight]...]
   */
  calculateVerticalCrop(imageWidth = 0, imageHeight = 0, items = 0) {
    if (imageWidth === 0 || imageHeight === 0 || items === 0) {
      return [];
    }

    const oneUnit = Math.floor(imageWidth / items);
    const widthArr = Array(...Array(items)).map(
      Number.prototype.valueOf,
      oneUnit,
    );
    if (imageWidth % items !== 0) {
      widthArr[widthArr.length - 1] =
        imageWidth - (widthArr.length - 1) * oneUnit;
    }

    return widthArr.map((el, index, arr) => {
      const subArray = arr.slice(0, index);
      const newX =
        subArray.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0,
        ) || 0;

      return [newX, 0, el, imageHeight];
    });
  },

  /**
   * calculating parameter for horizontal crop
   * @param  {integer} imageWidth=0
   * @param  {integer} imageHeight=0
   * @param  {integer} items=0
   * @returns {array} [[x, y, newWidth, newHeight]...]
   */
  calculateHorizontalCrop(imageWidth = 0, imageHeight = 0, items = 0) {
    if (imageWidth === 0 || imageHeight === 0 || items === 0) {
      return [];
    }

    const oneUnit = Math.floor(imageHeight / items);
    const heightArr = Array(...Array(items)).map(
      Number.prototype.valueOf,
      oneUnit,
    );
    if (imageHeight % items !== 0) {
      heightArr[heightArr.length - 1] =
        imageHeight - (heightArr.length - 1) * oneUnit;
    }

    return heightArr.map((el, index, arr) => {
      const subArray = arr.slice(0, index);
      const newY =
        subArray.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0,
        ) || 0;

      return [0, newY, imageWidth, el];
    });
  },
};

module.exports = main;


/***/ }),

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//figma preliminaries
figma.showUI(__html__);
figma.ui.resize(439, 300);
figma.loadFontAsync({ family: "Roboto", style: "Regular" });
const CIP = __webpack_require__(/*! canvas_image_processing */ "./node_modules/canvas_image_processing/index.js");
//Use this to grab properties of any object in figma!
for (const node of figma.currentPage.selection) {
    console.log(node);
}
figma.ui.onmessage = msg => {
    if (msg.type === 'close-plugin') {
        figma.closePlugin();
    }
    if (msg.type === 'successful-message') {
        figma.notify('✌️ Data has been successfully loaded!');
    }
    if (msg.type === 'fail-message') {
        figma.notify('😅 Please double check your API credentials at airtable.com/api');
    }
    if (msg.type === 'airtable') {
        //create new figma Page
        figma.createPage().name = msg.tableName;
        //Navigate to airtable data page
        figma.currentPage = figma.root.children.slice(-1).pop();
        //data array
        let arrayOfTableResults = [];
        //airtable object
        const airtableObject = JSON.parse(msg.message);
        arrayOfTableResults.push(airtableObject.records);
        //console.log(airtableObject.records)
        let numberOfFields = Object.keys(arrayOfTableResults[0][0]['fields']).length;
        arrayOfTableResults.map(tableRow => {
            console.log(tableRow);
            //give me loop of rows
            for (var i = 0; i < tableRow.length; ++i) {
                let arrayOfValues = Object.values(tableRow[i].fields);
                let arrayOfKeys = Object.keys(tableRow[i].fields);
                let arrayOfJson = Object.values(tableRow[i]);
                const frame = figma.createFrame();
                //give me loop of fields
                for (var l = 0; l < numberOfFields; ++l) {
                    let textNode = figma.createText();
                    const frameWidth = 200 * Number(numberOfFields);
                    const frameHeight = 100;
                    //Come back to figure out responsive width with padding
                    frame.resizeWithoutConstraints(frameWidth, frameHeight);
                    frame.appendChild(textNode);
                    frame.y = i * 100;
                    textNode.y = 30;
                    textNode.x = l * 200;
                    textNode.resize(150, 30);
                    if (arrayOfKeys[l] == 'attachment') {
                        //Come back to add actual image inside Circle shape
                        textNode.characters = JSON.stringify(tableRow[i].fields.image[0].url);
                    }
                    if (arrayOfKeys[l] == 'url') {
                        //Come back to add actual image inside Circle shape
                        textNode.characters = JSON.stringify(tableRow[i].fields.url[0].url);
                    }
                    else {
                        textNode.characters = arrayOfValues[l].toString();
                    }
                }
            }
        });
    }
};
//loop values of results
//      for(var i = 0; i < airtableNumberOfResults; ++i){
//if image
//        if(arrayOfValues[i][0].filename !== undefined) {
//console.log(arrayOfValues[i][0].thumbnails.large.url)
//          let imageUrl = arrayOfValues[i][0].thumbnails.large.url
//var arr = new Uint8Array([21,31]);
//Hey this works!
//let shapeNode = figma.createEllipse()
//shapeNode.fills = [
//  {
//    blendMode: "NORMAL",
//    imageHash: "27f652802e903b9feac63df214e3cc2d369db90f",
//    opacity: 1,
//    scaleMode: "FILL",
//    scalingFactor: 0.5,
//    type: "IMAGE",
//    visible: true
//  }
//]
//imageNode.fill = [
//  {
//    type: 'IMAGE',
//    scaleMode: "FILL",
//    imageHash: imageUrl.toString()
//color: {
//  r: 1,
//  g: 0.5,
//  b: 0
//},
//background:{
//  data: imageUrl.toString()
//}
//  }
//]
//console.log(imageNode)
//console.log(imagePaintNode)
//shapeNode
//        }
//let textNode = figma.createText()
//textNode.characters = arrayOfValues[i].toString()
//textNode
//      }
//text node
//    });
//text node
//const textNode = figma.createText()
//textNode.characters = "a string"
//textNode
//create figma Component
//const component = figma.createComponent()
//component.resizeWithoutConstraints(300, 100)
//const selectedPage = figma.currentPage.selection[0]
//  }
//}
//img test
//console.log(this)
//figma.createRectangle();
//figma.ui.postMessage('this is a test')


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NhbnZhc19pbWFnZV9wcm9jZXNzaW5nL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckIsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGNBQWMsTUFBTTtBQUNwQixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQixjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGNBQWMsTUFBTTtBQUNwQixjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQixjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsY0FBYyxNQUFNO0FBQ3BCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixlQUFlLE1BQU07QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEIsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTs7Ozs7Ozs7Ozs7O0FDOUtBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQ0FBcUM7QUFDMUQsWUFBWSxtQkFBTyxDQUFDLGdGQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHFCQUFxQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG9CQUFvQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw2QkFBNkI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29kZS50c1wiKTtcbiIsImNvbnN0IG1haW4gPSB7XG4gIC8qKlxuICAgKiBjb252ZXIgYmFzZTY0LWltYWdlIHN0cmluZyB0byBJbWFnZSAoSFRNTEltYWdlRWxlbWVudCBpbnN0YW5jZSkgYXN5bmNocm9ub3VzbHlcbiAgICogQHBhcmFtICB7c3RyaW5nfSBiYXNlNjRcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBpbWFnZTY0VG9JbWFnZShiYXNlNjQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLnNyYyA9IGJhc2U2NDtcbiAgICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKHRoaXMpO1xuICAgICAgfTtcbiAgICAgIGltYWdlLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHRoaXMpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogY29udmVyIGJhc2U2NC1pbWFnZSBzdHJpbmcgdG8gY2FudmFzXG4gICAqIEBwYXJhbSAge3N0cmluZ30gYmFzZTY0XG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgYXN5bmMgaW1hZ2U2NFRvQ2FudmFzKGJhc2U2NCkge1xuICAgIGNvbnN0IGltZyA9IGF3YWl0IHRoaXMuaW1hZ2U2NFRvSW1hZ2UoYmFzZTY0KTtcbiAgICByZXR1cm4gdGhpcy5pbWFnZVRvQ2FudmFzKGltZyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGNvbnZlciBpbWFnZSBzdHJpbmcgdG8gY2FudmFzXG4gICAqIEBwYXJhbSAge0ltYWdlfSBpbWFnZVxuICAgKiBAcmV0dXJucyB7Q2FudmFzfVxuICAgKi9cbiAgaW1hZ2VUb0NhbnZhcyhpbWFnZSkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy53aWR0aCA9IGltYWdlLndpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgMCwgMCk7XG4gICAgcmV0dXJuIGNhbnZhcztcbiAgfSxcblxuICAvKipcbiAgICogcmVzaXplIGJhc2U2NC1zdHJpbmdcbiAgICogQHBhcmFtICB7c3RyaW5nfSBiYXNlNjRcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gbmV3V2lkdGhcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gbmV3SGVpZ2h0XG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSB3aXRoIGJhc2U2NC1pbWFnZVxuICAgKi9cbiAgYXN5bmMgcmVzaXplSW1hZ2U2NChiYXNlNjQsIG5ld1dpZHRoLCBuZXdIZWlnaHQpIHtcbiAgICBjb25zdCBpbWcgPSBhd2FpdCB0aGlzLmltYWdlNjRUb0ltYWdlKGJhc2U2NCk7XG4gICAgcmV0dXJuIHRoaXMucmVzaXplSW1hZ2UoaW1nLCBuZXdXaWR0aCwgbmV3SGVpZ2h0KTtcbiAgfSxcblxuICAvKipcbiAgICogcmVzaXplIGltYWdlIChIVE1MSW1hZ2VFbGVtZW50IGluc3RhbmNlKVxuICAgKiBAcGFyYW0gIHtpbWFnZX0gaW1hZ2VcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gbmV3V2lkdGhcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gbmV3SGVpZ2h0XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGJhc2U2NC1pbWFnZSBzdHJpbmdcbiAgICovXG4gIHJlc2l6ZUltYWdlKGltYWdlLCBuZXdXaWR0aCwgbmV3SGVpZ2h0KSB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gbmV3V2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IG5ld0hlaWdodDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIG5ld1dpZHRoLCBuZXdIZWlnaHQpO1xuICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9qcGVnJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGNyb3BwaW5nIGltYWdlIGZyb20gYmFzZTY0LWltYWdlIHN0cmluZ1xuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGJhc2U2NFxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSB4XG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IHlcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gbmV3V2lkdGhcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gbmV3SGVpZ2h0XG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSB3aXRoIGJhc2U2NC1pbWFnZSBzdHJpbmdcbiAgICovXG4gIGFzeW5jIGNyb3BJbWFnZTY0KGJhc2U2NCwgeCwgeSwgbmV3V2lkdGgsIG5ld0hlaWdodCkge1xuICAgIGNvbnN0IGltZyA9IGF3YWl0IHRoaXMuaW1hZ2U2NFRvSW1hZ2UoYmFzZTY0KTtcbiAgICByZXR1cm4gdGhpcy5jcm9wSW1hZ2UoaW1nLCB4LCB5LCBuZXdXaWR0aCwgbmV3SGVpZ2h0KTtcbiAgfSxcblxuICAvKipcbiAgICogY3JvcHBpbmcgaW1hZ2UgKEhUTUxJbWFnZUVsZW1lbnQgaW5zdGFuY2UpXG4gICAqIEBwYXJhbSAge2ltYWdlfSBpbWFnZVxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSB4XG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IHlcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gbmV3V2lkdGhcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gbmV3SGVpZ2h0XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGJhc2U2NC1pbWFnZSBzdHJpbmdcbiAgICovXG4gIGNyb3BJbWFnZShpbWFnZSwgeCwgeSwgbmV3V2lkdGgsIG5ld0hlaWdodCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy53aWR0aCA9IG5ld1dpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBuZXdIZWlnaHQ7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICBjdHguZHJhd0ltYWdlKGltYWdlLCB4LCB5LCBuZXdXaWR0aCwgbmV3SGVpZ2h0LCAwLCAwLCBuZXdXaWR0aCwgbmV3SGVpZ2h0KTtcbiAgICByZXR1cm4gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvanBlZycpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBjYWxjdWxhdGluZyBwYXJhbWV0ZXIgZm9yIHZlcnRpY2FsIGNyb3BcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gaW1hZ2VXaWR0aD0wXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IGltYWdlSGVpZ2h0PTBcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gaXRlbXM9MFxuICAgKiBAcmV0dXJucyB7YXJyYXl9IFtbeCwgeSwgbmV3V2lkdGgsIG5ld0hlaWdodF0uLi5dXG4gICAqL1xuICBjYWxjdWxhdGVWZXJ0aWNhbENyb3AoaW1hZ2VXaWR0aCA9IDAsIGltYWdlSGVpZ2h0ID0gMCwgaXRlbXMgPSAwKSB7XG4gICAgaWYgKGltYWdlV2lkdGggPT09IDAgfHwgaW1hZ2VIZWlnaHQgPT09IDAgfHwgaXRlbXMgPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBjb25zdCBvbmVVbml0ID0gTWF0aC5mbG9vcihpbWFnZVdpZHRoIC8gaXRlbXMpO1xuICAgIGNvbnN0IHdpZHRoQXJyID0gQXJyYXkoLi4uQXJyYXkoaXRlbXMpKS5tYXAoXG4gICAgICBOdW1iZXIucHJvdG90eXBlLnZhbHVlT2YsXG4gICAgICBvbmVVbml0LFxuICAgICk7XG4gICAgaWYgKGltYWdlV2lkdGggJSBpdGVtcyAhPT0gMCkge1xuICAgICAgd2lkdGhBcnJbd2lkdGhBcnIubGVuZ3RoIC0gMV0gPVxuICAgICAgICBpbWFnZVdpZHRoIC0gKHdpZHRoQXJyLmxlbmd0aCAtIDEpICogb25lVW5pdDtcbiAgICB9XG5cbiAgICByZXR1cm4gd2lkdGhBcnIubWFwKChlbCwgaW5kZXgsIGFycikgPT4ge1xuICAgICAgY29uc3Qgc3ViQXJyYXkgPSBhcnIuc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgY29uc3QgbmV3WCA9XG4gICAgICAgIHN1YkFycmF5LnJlZHVjZShcbiAgICAgICAgICAoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSkgPT4gYWNjdW11bGF0b3IgKyBjdXJyZW50VmFsdWUsXG4gICAgICAgICAgMCxcbiAgICAgICAgKSB8fCAwO1xuXG4gICAgICByZXR1cm4gW25ld1gsIDAsIGVsLCBpbWFnZUhlaWdodF07XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGNhbGN1bGF0aW5nIHBhcmFtZXRlciBmb3IgaG9yaXpvbnRhbCBjcm9wXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IGltYWdlV2lkdGg9MFxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBpbWFnZUhlaWdodD0wXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IGl0ZW1zPTBcbiAgICogQHJldHVybnMge2FycmF5fSBbW3gsIHksIG5ld1dpZHRoLCBuZXdIZWlnaHRdLi4uXVxuICAgKi9cbiAgY2FsY3VsYXRlSG9yaXpvbnRhbENyb3AoaW1hZ2VXaWR0aCA9IDAsIGltYWdlSGVpZ2h0ID0gMCwgaXRlbXMgPSAwKSB7XG4gICAgaWYgKGltYWdlV2lkdGggPT09IDAgfHwgaW1hZ2VIZWlnaHQgPT09IDAgfHwgaXRlbXMgPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBjb25zdCBvbmVVbml0ID0gTWF0aC5mbG9vcihpbWFnZUhlaWdodCAvIGl0ZW1zKTtcbiAgICBjb25zdCBoZWlnaHRBcnIgPSBBcnJheSguLi5BcnJheShpdGVtcykpLm1hcChcbiAgICAgIE51bWJlci5wcm90b3R5cGUudmFsdWVPZixcbiAgICAgIG9uZVVuaXQsXG4gICAgKTtcbiAgICBpZiAoaW1hZ2VIZWlnaHQgJSBpdGVtcyAhPT0gMCkge1xuICAgICAgaGVpZ2h0QXJyW2hlaWdodEFyci5sZW5ndGggLSAxXSA9XG4gICAgICAgIGltYWdlSGVpZ2h0IC0gKGhlaWdodEFyci5sZW5ndGggLSAxKSAqIG9uZVVuaXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhlaWdodEFyci5tYXAoKGVsLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICBjb25zdCBzdWJBcnJheSA9IGFyci5zbGljZSgwLCBpbmRleCk7XG4gICAgICBjb25zdCBuZXdZID1cbiAgICAgICAgc3ViQXJyYXkucmVkdWNlKFxuICAgICAgICAgIChhY2N1bXVsYXRvciwgY3VycmVudFZhbHVlKSA9PiBhY2N1bXVsYXRvciArIGN1cnJlbnRWYWx1ZSxcbiAgICAgICAgICAwLFxuICAgICAgICApIHx8IDA7XG5cbiAgICAgIHJldHVybiBbMCwgbmV3WSwgaW1hZ2VXaWR0aCwgZWxdO1xuICAgIH0pO1xuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtYWluO1xuIiwiLy9maWdtYSBwcmVsaW1pbmFyaWVzXG5maWdtYS5zaG93VUkoX19odG1sX18pO1xuZmlnbWEudWkucmVzaXplKDQzOSwgMzAwKTtcbmZpZ21hLmxvYWRGb250QXN5bmMoeyBmYW1pbHk6IFwiUm9ib3RvXCIsIHN0eWxlOiBcIlJlZ3VsYXJcIiB9KTtcbmNvbnN0IENJUCA9IHJlcXVpcmUoJ2NhbnZhc19pbWFnZV9wcm9jZXNzaW5nJyk7XG4vL1VzZSB0aGlzIHRvIGdyYWIgcHJvcGVydGllcyBvZiBhbnkgb2JqZWN0IGluIGZpZ21hIVxuZm9yIChjb25zdCBub2RlIG9mIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbikge1xuICAgIGNvbnNvbGUubG9nKG5vZGUpO1xufVxuZmlnbWEudWkub25tZXNzYWdlID0gbXNnID0+IHtcbiAgICBpZiAobXNnLnR5cGUgPT09ICdjbG9zZS1wbHVnaW4nKSB7XG4gICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gJ3N1Y2Nlc3NmdWwtbWVzc2FnZScpIHtcbiAgICAgICAgZmlnbWEubm90aWZ5KCfinIzvuI8gRGF0YSBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgbG9hZGVkIScpO1xuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09ICdmYWlsLW1lc3NhZ2UnKSB7XG4gICAgICAgIGZpZ21hLm5vdGlmeSgn8J+YhSBQbGVhc2UgZG91YmxlIGNoZWNrIHlvdXIgQVBJIGNyZWRlbnRpYWxzIGF0IGFpcnRhYmxlLmNvbS9hcGknKTtcbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSAnYWlydGFibGUnKSB7XG4gICAgICAgIC8vY3JlYXRlIG5ldyBmaWdtYSBQYWdlXG4gICAgICAgIGZpZ21hLmNyZWF0ZVBhZ2UoKS5uYW1lID0gbXNnLnRhYmxlTmFtZTtcbiAgICAgICAgLy9OYXZpZ2F0ZSB0byBhaXJ0YWJsZSBkYXRhIHBhZ2VcbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2UgPSBmaWdtYS5yb290LmNoaWxkcmVuLnNsaWNlKC0xKS5wb3AoKTtcbiAgICAgICAgLy9kYXRhIGFycmF5XG4gICAgICAgIGxldCBhcnJheU9mVGFibGVSZXN1bHRzID0gW107XG4gICAgICAgIC8vYWlydGFibGUgb2JqZWN0XG4gICAgICAgIGNvbnN0IGFpcnRhYmxlT2JqZWN0ID0gSlNPTi5wYXJzZShtc2cubWVzc2FnZSk7XG4gICAgICAgIGFycmF5T2ZUYWJsZVJlc3VsdHMucHVzaChhaXJ0YWJsZU9iamVjdC5yZWNvcmRzKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhhaXJ0YWJsZU9iamVjdC5yZWNvcmRzKVxuICAgICAgICBsZXQgbnVtYmVyT2ZGaWVsZHMgPSBPYmplY3Qua2V5cyhhcnJheU9mVGFibGVSZXN1bHRzWzBdWzBdWydmaWVsZHMnXSkubGVuZ3RoO1xuICAgICAgICBhcnJheU9mVGFibGVSZXN1bHRzLm1hcCh0YWJsZVJvdyA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0YWJsZVJvdyk7XG4gICAgICAgICAgICAvL2dpdmUgbWUgbG9vcCBvZiByb3dzXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYmxlUm93Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFycmF5T2ZWYWx1ZXMgPSBPYmplY3QudmFsdWVzKHRhYmxlUm93W2ldLmZpZWxkcyk7XG4gICAgICAgICAgICAgICAgbGV0IGFycmF5T2ZLZXlzID0gT2JqZWN0LmtleXModGFibGVSb3dbaV0uZmllbGRzKTtcbiAgICAgICAgICAgICAgICBsZXQgYXJyYXlPZkpzb24gPSBPYmplY3QudmFsdWVzKHRhYmxlUm93W2ldKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmcmFtZSA9IGZpZ21hLmNyZWF0ZUZyYW1lKCk7XG4gICAgICAgICAgICAgICAgLy9naXZlIG1lIGxvb3Agb2YgZmllbGRzXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbCA9IDA7IGwgPCBudW1iZXJPZkZpZWxkczsgKytsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0Tm9kZSA9IGZpZ21hLmNyZWF0ZVRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZnJhbWVXaWR0aCA9IDIwMCAqIE51bWJlcihudW1iZXJPZkZpZWxkcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZyYW1lSGVpZ2h0ID0gMTAwO1xuICAgICAgICAgICAgICAgICAgICAvL0NvbWUgYmFjayB0byBmaWd1cmUgb3V0IHJlc3BvbnNpdmUgd2lkdGggd2l0aCBwYWRkaW5nXG4gICAgICAgICAgICAgICAgICAgIGZyYW1lLnJlc2l6ZVdpdGhvdXRDb25zdHJhaW50cyhmcmFtZVdpZHRoLCBmcmFtZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lLmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgZnJhbWUueSA9IGkgKiAxMDA7XG4gICAgICAgICAgICAgICAgICAgIHRleHROb2RlLnkgPSAzMDtcbiAgICAgICAgICAgICAgICAgICAgdGV4dE5vZGUueCA9IGwgKiAyMDA7XG4gICAgICAgICAgICAgICAgICAgIHRleHROb2RlLnJlc2l6ZSgxNTAsIDMwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5T2ZLZXlzW2xdID09ICdhdHRhY2htZW50Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9Db21lIGJhY2sgdG8gYWRkIGFjdHVhbCBpbWFnZSBpbnNpZGUgQ2lyY2xlIHNoYXBlXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Tm9kZS5jaGFyYWN0ZXJzID0gSlNPTi5zdHJpbmdpZnkodGFibGVSb3dbaV0uZmllbGRzLmltYWdlWzBdLnVybCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5T2ZLZXlzW2xdID09ICd1cmwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbWUgYmFjayB0byBhZGQgYWN0dWFsIGltYWdlIGluc2lkZSBDaXJjbGUgc2hhcGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHROb2RlLmNoYXJhY3RlcnMgPSBKU09OLnN0cmluZ2lmeSh0YWJsZVJvd1tpXS5maWVsZHMudXJsWzBdLnVybCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Tm9kZS5jaGFyYWN0ZXJzID0gYXJyYXlPZlZhbHVlc1tsXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuLy9sb29wIHZhbHVlcyBvZiByZXN1bHRzXG4vLyAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBhaXJ0YWJsZU51bWJlck9mUmVzdWx0czsgKytpKXtcbi8vaWYgaW1hZ2Vcbi8vICAgICAgICBpZihhcnJheU9mVmFsdWVzW2ldWzBdLmZpbGVuYW1lICE9PSB1bmRlZmluZWQpIHtcbi8vY29uc29sZS5sb2coYXJyYXlPZlZhbHVlc1tpXVswXS50aHVtYm5haWxzLmxhcmdlLnVybClcbi8vICAgICAgICAgIGxldCBpbWFnZVVybCA9IGFycmF5T2ZWYWx1ZXNbaV1bMF0udGh1bWJuYWlscy5sYXJnZS51cmxcbi8vdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KFsyMSwzMV0pO1xuLy9IZXkgdGhpcyB3b3JrcyFcbi8vbGV0IHNoYXBlTm9kZSA9IGZpZ21hLmNyZWF0ZUVsbGlwc2UoKVxuLy9zaGFwZU5vZGUuZmlsbHMgPSBbXG4vLyAge1xuLy8gICAgYmxlbmRNb2RlOiBcIk5PUk1BTFwiLFxuLy8gICAgaW1hZ2VIYXNoOiBcIjI3ZjY1MjgwMmU5MDNiOWZlYWM2M2RmMjE0ZTNjYzJkMzY5ZGI5MGZcIixcbi8vICAgIG9wYWNpdHk6IDEsXG4vLyAgICBzY2FsZU1vZGU6IFwiRklMTFwiLFxuLy8gICAgc2NhbGluZ0ZhY3RvcjogMC41LFxuLy8gICAgdHlwZTogXCJJTUFHRVwiLFxuLy8gICAgdmlzaWJsZTogdHJ1ZVxuLy8gIH1cbi8vXVxuLy9pbWFnZU5vZGUuZmlsbCA9IFtcbi8vICB7XG4vLyAgICB0eXBlOiAnSU1BR0UnLFxuLy8gICAgc2NhbGVNb2RlOiBcIkZJTExcIixcbi8vICAgIGltYWdlSGFzaDogaW1hZ2VVcmwudG9TdHJpbmcoKVxuLy9jb2xvcjoge1xuLy8gIHI6IDEsXG4vLyAgZzogMC41LFxuLy8gIGI6IDBcbi8vfSxcbi8vYmFja2dyb3VuZDp7XG4vLyAgZGF0YTogaW1hZ2VVcmwudG9TdHJpbmcoKVxuLy99XG4vLyAgfVxuLy9dXG4vL2NvbnNvbGUubG9nKGltYWdlTm9kZSlcbi8vY29uc29sZS5sb2coaW1hZ2VQYWludE5vZGUpXG4vL3NoYXBlTm9kZVxuLy8gICAgICAgIH1cbi8vbGV0IHRleHROb2RlID0gZmlnbWEuY3JlYXRlVGV4dCgpXG4vL3RleHROb2RlLmNoYXJhY3RlcnMgPSBhcnJheU9mVmFsdWVzW2ldLnRvU3RyaW5nKClcbi8vdGV4dE5vZGVcbi8vICAgICAgfVxuLy90ZXh0IG5vZGVcbi8vICAgIH0pO1xuLy90ZXh0IG5vZGVcbi8vY29uc3QgdGV4dE5vZGUgPSBmaWdtYS5jcmVhdGVUZXh0KClcbi8vdGV4dE5vZGUuY2hhcmFjdGVycyA9IFwiYSBzdHJpbmdcIlxuLy90ZXh0Tm9kZVxuLy9jcmVhdGUgZmlnbWEgQ29tcG9uZW50XG4vL2NvbnN0IGNvbXBvbmVudCA9IGZpZ21hLmNyZWF0ZUNvbXBvbmVudCgpXG4vL2NvbXBvbmVudC5yZXNpemVXaXRob3V0Q29uc3RyYWludHMoMzAwLCAxMDApXG4vL2NvbnN0IHNlbGVjdGVkUGFnZSA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXVxuLy8gIH1cbi8vfVxuLy9pbWcgdGVzdFxuLy9jb25zb2xlLmxvZyh0aGlzKVxuLy9maWdtYS5jcmVhdGVSZWN0YW5nbGUoKTtcbi8vZmlnbWEudWkucG9zdE1lc3NhZ2UoJ3RoaXMgaXMgYSB0ZXN0JylcbiJdLCJzb3VyY2VSb290IjoiIn0=