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
figma.ui.resize(439, 350);
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
                const frame = figma.createFrame();
                //give me loop of fields
                for (var l = 0; l < numberOfFields; ++l) {
                    let textNode = figma.createText();
                    const frameWidth = 200 * Number(numberOfFields);
                    const frameHeight = 80;
                    //Come back to figure out responsive width with padding
                    frame.resizeWithoutConstraints(frameWidth, frameHeight);
                    frame.appendChild(textNode);
                    frame.y = i * 100;
                    textNode.y = 30;
                    textNode.x = l * 200;
                    textNode.resize(150, 30);
                    if (arrayOfKeys[l] == 'image') {
                        //Come back to add actual image inside Circle shape
                        textNode.characters = JSON.stringify(tableRow[i].fields.image[0].url);
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
//if string
//        if(arrayOfValues[i] !== undefined) {
//          console.log(arrayOfValues[i])
//let textNode = figma.createText()
//textNode.characters = arrayOfValues[i].toString()
//textNode
//        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NhbnZhc19pbWFnZV9wcm9jZXNzaW5nL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckIsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGNBQWMsTUFBTTtBQUNwQixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQixjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGNBQWMsTUFBTTtBQUNwQixjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQixjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsY0FBYyxNQUFNO0FBQ3BCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixlQUFlLE1BQU07QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEIsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTs7Ozs7Ozs7Ozs7O0FDOUtBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQ0FBcUM7QUFDMUQsWUFBWSxtQkFBTyxDQUFDLGdGQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHFCQUFxQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixvQkFBb0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDZCQUE2QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NvZGUudHNcIik7XG4iLCJjb25zdCBtYWluID0ge1xuICAvKipcbiAgICogY29udmVyIGJhc2U2NC1pbWFnZSBzdHJpbmcgdG8gSW1hZ2UgKEhUTUxJbWFnZUVsZW1lbnQgaW5zdGFuY2UpIGFzeW5jaHJvbm91c2x5XG4gICAqIEBwYXJhbSAge3N0cmluZ30gYmFzZTY0XG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgaW1hZ2U2NFRvSW1hZ2UoYmFzZTY0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICBpbWFnZS5zcmMgPSBiYXNlNjQ7XG4gICAgICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzKTtcbiAgICAgIH07XG4gICAgICBpbWFnZS5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdCh0aGlzKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGNvbnZlciBiYXNlNjQtaW1hZ2Ugc3RyaW5nIHRvIGNhbnZhc1xuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGJhc2U2NFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGFzeW5jIGltYWdlNjRUb0NhbnZhcyhiYXNlNjQpIHtcbiAgICBjb25zdCBpbWcgPSBhd2FpdCB0aGlzLmltYWdlNjRUb0ltYWdlKGJhc2U2NCk7XG4gICAgcmV0dXJuIHRoaXMuaW1hZ2VUb0NhbnZhcyhpbWcpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBjb252ZXIgaW1hZ2Ugc3RyaW5nIHRvIGNhbnZhc1xuICAgKiBAcGFyYW0gIHtJbWFnZX0gaW1hZ2VcbiAgICogQHJldHVybnMge0NhbnZhc31cbiAgICovXG4gIGltYWdlVG9DYW52YXMoaW1hZ2UpIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApO1xuICAgIHJldHVybiBjYW52YXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIHJlc2l6ZSBiYXNlNjQtc3RyaW5nXG4gICAqIEBwYXJhbSAge3N0cmluZ30gYmFzZTY0XG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IG5ld1dpZHRoXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IG5ld0hlaWdodFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gd2l0aCBiYXNlNjQtaW1hZ2VcbiAgICovXG4gIGFzeW5jIHJlc2l6ZUltYWdlNjQoYmFzZTY0LCBuZXdXaWR0aCwgbmV3SGVpZ2h0KSB7XG4gICAgY29uc3QgaW1nID0gYXdhaXQgdGhpcy5pbWFnZTY0VG9JbWFnZShiYXNlNjQpO1xuICAgIHJldHVybiB0aGlzLnJlc2l6ZUltYWdlKGltZywgbmV3V2lkdGgsIG5ld0hlaWdodCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIHJlc2l6ZSBpbWFnZSAoSFRNTEltYWdlRWxlbWVudCBpbnN0YW5jZSlcbiAgICogQHBhcmFtICB7aW1hZ2V9IGltYWdlXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IG5ld1dpZHRoXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IG5ld0hlaWdodFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBiYXNlNjQtaW1hZ2Ugc3RyaW5nXG4gICAqL1xuICByZXNpemVJbWFnZShpbWFnZSwgbmV3V2lkdGgsIG5ld0hlaWdodCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy53aWR0aCA9IG5ld1dpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBuZXdIZWlnaHQ7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAwLCAwLCBuZXdXaWR0aCwgbmV3SGVpZ2h0KTtcbiAgICByZXR1cm4gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvanBlZycpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBjcm9wcGluZyBpbWFnZSBmcm9tIGJhc2U2NC1pbWFnZSBzdHJpbmdcbiAgICogQHBhcmFtICB7c3RyaW5nfSBiYXNlNjRcbiAgICogQHBhcmFtICB7aW50ZWdlcn0geFxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSB5XG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IG5ld1dpZHRoXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IG5ld0hlaWdodFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gd2l0aCBiYXNlNjQtaW1hZ2Ugc3RyaW5nXG4gICAqL1xuICBhc3luYyBjcm9wSW1hZ2U2NChiYXNlNjQsIHgsIHksIG5ld1dpZHRoLCBuZXdIZWlnaHQpIHtcbiAgICBjb25zdCBpbWcgPSBhd2FpdCB0aGlzLmltYWdlNjRUb0ltYWdlKGJhc2U2NCk7XG4gICAgcmV0dXJuIHRoaXMuY3JvcEltYWdlKGltZywgeCwgeSwgbmV3V2lkdGgsIG5ld0hlaWdodCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGNyb3BwaW5nIGltYWdlIChIVE1MSW1hZ2VFbGVtZW50IGluc3RhbmNlKVxuICAgKiBAcGFyYW0gIHtpbWFnZX0gaW1hZ2VcbiAgICogQHBhcmFtICB7aW50ZWdlcn0geFxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSB5XG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IG5ld1dpZHRoXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IG5ld0hlaWdodFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBiYXNlNjQtaW1hZ2Ugc3RyaW5nXG4gICAqL1xuICBjcm9wSW1hZ2UoaW1hZ2UsIHgsIHksIG5ld1dpZHRoLCBuZXdIZWlnaHQpIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSBuZXdXaWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gbmV3SGVpZ2h0O1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgeCwgeSwgbmV3V2lkdGgsIG5ld0hlaWdodCwgMCwgMCwgbmV3V2lkdGgsIG5ld0hlaWdodCk7XG4gICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnKTtcbiAgfSxcblxuICAvKipcbiAgICogY2FsY3VsYXRpbmcgcGFyYW1ldGVyIGZvciB2ZXJ0aWNhbCBjcm9wXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IGltYWdlV2lkdGg9MFxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBpbWFnZUhlaWdodD0wXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IGl0ZW1zPTBcbiAgICogQHJldHVybnMge2FycmF5fSBbW3gsIHksIG5ld1dpZHRoLCBuZXdIZWlnaHRdLi4uXVxuICAgKi9cbiAgY2FsY3VsYXRlVmVydGljYWxDcm9wKGltYWdlV2lkdGggPSAwLCBpbWFnZUhlaWdodCA9IDAsIGl0ZW1zID0gMCkge1xuICAgIGlmIChpbWFnZVdpZHRoID09PSAwIHx8IGltYWdlSGVpZ2h0ID09PSAwIHx8IGl0ZW1zID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgY29uc3Qgb25lVW5pdCA9IE1hdGguZmxvb3IoaW1hZ2VXaWR0aCAvIGl0ZW1zKTtcbiAgICBjb25zdCB3aWR0aEFyciA9IEFycmF5KC4uLkFycmF5KGl0ZW1zKSkubWFwKFxuICAgICAgTnVtYmVyLnByb3RvdHlwZS52YWx1ZU9mLFxuICAgICAgb25lVW5pdCxcbiAgICApO1xuICAgIGlmIChpbWFnZVdpZHRoICUgaXRlbXMgIT09IDApIHtcbiAgICAgIHdpZHRoQXJyW3dpZHRoQXJyLmxlbmd0aCAtIDFdID1cbiAgICAgICAgaW1hZ2VXaWR0aCAtICh3aWR0aEFyci5sZW5ndGggLSAxKSAqIG9uZVVuaXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdpZHRoQXJyLm1hcCgoZWwsIGluZGV4LCBhcnIpID0+IHtcbiAgICAgIGNvbnN0IHN1YkFycmF5ID0gYXJyLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgIGNvbnN0IG5ld1ggPVxuICAgICAgICBzdWJBcnJheS5yZWR1Y2UoXG4gICAgICAgICAgKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpID0+IGFjY3VtdWxhdG9yICsgY3VycmVudFZhbHVlLFxuICAgICAgICAgIDAsXG4gICAgICAgICkgfHwgMDtcblxuICAgICAgcmV0dXJuIFtuZXdYLCAwLCBlbCwgaW1hZ2VIZWlnaHRdO1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBjYWxjdWxhdGluZyBwYXJhbWV0ZXIgZm9yIGhvcml6b250YWwgY3JvcFxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBpbWFnZVdpZHRoPTBcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gaW1hZ2VIZWlnaHQ9MFxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBpdGVtcz0wXG4gICAqIEByZXR1cm5zIHthcnJheX0gW1t4LCB5LCBuZXdXaWR0aCwgbmV3SGVpZ2h0XS4uLl1cbiAgICovXG4gIGNhbGN1bGF0ZUhvcml6b250YWxDcm9wKGltYWdlV2lkdGggPSAwLCBpbWFnZUhlaWdodCA9IDAsIGl0ZW1zID0gMCkge1xuICAgIGlmIChpbWFnZVdpZHRoID09PSAwIHx8IGltYWdlSGVpZ2h0ID09PSAwIHx8IGl0ZW1zID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgY29uc3Qgb25lVW5pdCA9IE1hdGguZmxvb3IoaW1hZ2VIZWlnaHQgLyBpdGVtcyk7XG4gICAgY29uc3QgaGVpZ2h0QXJyID0gQXJyYXkoLi4uQXJyYXkoaXRlbXMpKS5tYXAoXG4gICAgICBOdW1iZXIucHJvdG90eXBlLnZhbHVlT2YsXG4gICAgICBvbmVVbml0LFxuICAgICk7XG4gICAgaWYgKGltYWdlSGVpZ2h0ICUgaXRlbXMgIT09IDApIHtcbiAgICAgIGhlaWdodEFycltoZWlnaHRBcnIubGVuZ3RoIC0gMV0gPVxuICAgICAgICBpbWFnZUhlaWdodCAtIChoZWlnaHRBcnIubGVuZ3RoIC0gMSkgKiBvbmVVbml0O1xuICAgIH1cblxuICAgIHJldHVybiBoZWlnaHRBcnIubWFwKChlbCwgaW5kZXgsIGFycikgPT4ge1xuICAgICAgY29uc3Qgc3ViQXJyYXkgPSBhcnIuc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgY29uc3QgbmV3WSA9XG4gICAgICAgIHN1YkFycmF5LnJlZHVjZShcbiAgICAgICAgICAoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSkgPT4gYWNjdW11bGF0b3IgKyBjdXJyZW50VmFsdWUsXG4gICAgICAgICAgMCxcbiAgICAgICAgKSB8fCAwO1xuXG4gICAgICByZXR1cm4gWzAsIG5ld1ksIGltYWdlV2lkdGgsIGVsXTtcbiAgICB9KTtcbiAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbWFpbjtcbiIsIi8vZmlnbWEgcHJlbGltaW5hcmllc1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fKTtcbmZpZ21hLnVpLnJlc2l6ZSg0MzksIDM1MCk7XG5maWdtYS5sb2FkRm9udEFzeW5jKHsgZmFtaWx5OiBcIlJvYm90b1wiLCBzdHlsZTogXCJSZWd1bGFyXCIgfSk7XG5jb25zdCBDSVAgPSByZXF1aXJlKCdjYW52YXNfaW1hZ2VfcHJvY2Vzc2luZycpO1xuLy9Vc2UgdGhpcyB0byBncmFiIHByb3BlcnRpZXMgb2YgYW55IG9iamVjdCBpbiBmaWdtYSFcbmZvciAoY29uc3Qgbm9kZSBvZiBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pIHtcbiAgICBjb25zb2xlLmxvZyhub2RlKTtcbn1cbmZpZ21hLnVpLm9ubWVzc2FnZSA9IG1zZyA9PiB7XG4gICAgaWYgKG1zZy50eXBlID09PSAnY2xvc2UtcGx1Z2luJykge1xuICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09ICdhaXJ0YWJsZScpIHtcbiAgICAgICAgLy9jcmVhdGUgbmV3IGZpZ21hIFBhZ2VcbiAgICAgICAgZmlnbWEuY3JlYXRlUGFnZSgpLm5hbWUgPSBtc2cudGFibGVOYW1lO1xuICAgICAgICAvL05hdmlnYXRlIHRvIGFpcnRhYmxlIGRhdGEgcGFnZVxuICAgICAgICBmaWdtYS5jdXJyZW50UGFnZSA9IGZpZ21hLnJvb3QuY2hpbGRyZW4uc2xpY2UoLTEpLnBvcCgpO1xuICAgICAgICAvL2RhdGEgYXJyYXlcbiAgICAgICAgbGV0IGFycmF5T2ZUYWJsZVJlc3VsdHMgPSBbXTtcbiAgICAgICAgLy9haXJ0YWJsZSBvYmplY3RcbiAgICAgICAgY29uc3QgYWlydGFibGVPYmplY3QgPSBKU09OLnBhcnNlKG1zZy5tZXNzYWdlKTtcbiAgICAgICAgYXJyYXlPZlRhYmxlUmVzdWx0cy5wdXNoKGFpcnRhYmxlT2JqZWN0LnJlY29yZHMpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGFpcnRhYmxlT2JqZWN0LnJlY29yZHMpXG4gICAgICAgIGxldCBudW1iZXJPZkZpZWxkcyA9IE9iamVjdC5rZXlzKGFycmF5T2ZUYWJsZVJlc3VsdHNbMF1bMF1bJ2ZpZWxkcyddKS5sZW5ndGg7XG4gICAgICAgIGFycmF5T2ZUYWJsZVJlc3VsdHMubWFwKHRhYmxlUm93ID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhYmxlUm93KTtcbiAgICAgICAgICAgIC8vZ2l2ZSBtZSBsb29wIG9mIHJvd3NcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFibGVSb3cubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJyYXlPZlZhbHVlcyA9IE9iamVjdC52YWx1ZXModGFibGVSb3dbaV0uZmllbGRzKTtcbiAgICAgICAgICAgICAgICBsZXQgYXJyYXlPZktleXMgPSBPYmplY3Qua2V5cyh0YWJsZVJvd1tpXS5maWVsZHMpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZyYW1lID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICAgICAgICAgICAgICAvL2dpdmUgbWUgbG9vcCBvZiBmaWVsZHNcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IG51bWJlck9mRmllbGRzOyArK2wpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRleHROb2RlID0gZmlnbWEuY3JlYXRlVGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmcmFtZVdpZHRoID0gMjAwICogTnVtYmVyKG51bWJlck9mRmllbGRzKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZnJhbWVIZWlnaHQgPSA4MDtcbiAgICAgICAgICAgICAgICAgICAgLy9Db21lIGJhY2sgdG8gZmlndXJlIG91dCByZXNwb25zaXZlIHdpZHRoIHdpdGggcGFkZGluZ1xuICAgICAgICAgICAgICAgICAgICBmcmFtZS5yZXNpemVXaXRob3V0Q29uc3RyYWludHMoZnJhbWVXaWR0aCwgZnJhbWVIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBmcmFtZS5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lLnkgPSBpICogMTAwO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0Tm9kZS55ID0gMzA7XG4gICAgICAgICAgICAgICAgICAgIHRleHROb2RlLnggPSBsICogMjAwO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0Tm9kZS5yZXNpemUoMTUwLCAzMCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJheU9mS2V5c1tsXSA9PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbWUgYmFjayB0byBhZGQgYWN0dWFsIGltYWdlIGluc2lkZSBDaXJjbGUgc2hhcGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHROb2RlLmNoYXJhY3RlcnMgPSBKU09OLnN0cmluZ2lmeSh0YWJsZVJvd1tpXS5maWVsZHMuaW1hZ2VbMF0udXJsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHROb2RlLmNoYXJhY3RlcnMgPSBhcnJheU9mVmFsdWVzW2xdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4vL2xvb3AgdmFsdWVzIG9mIHJlc3VsdHNcbi8vICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGFpcnRhYmxlTnVtYmVyT2ZSZXN1bHRzOyArK2kpe1xuLy9pZiBzdHJpbmdcbi8vICAgICAgICBpZihhcnJheU9mVmFsdWVzW2ldICE9PSB1bmRlZmluZWQpIHtcbi8vICAgICAgICAgIGNvbnNvbGUubG9nKGFycmF5T2ZWYWx1ZXNbaV0pXG4vL2xldCB0ZXh0Tm9kZSA9IGZpZ21hLmNyZWF0ZVRleHQoKVxuLy90ZXh0Tm9kZS5jaGFyYWN0ZXJzID0gYXJyYXlPZlZhbHVlc1tpXS50b1N0cmluZygpXG4vL3RleHROb2RlXG4vLyAgICAgICAgfVxuLy9pZiBpbWFnZVxuLy8gICAgICAgIGlmKGFycmF5T2ZWYWx1ZXNbaV1bMF0uZmlsZW5hbWUgIT09IHVuZGVmaW5lZCkge1xuLy9jb25zb2xlLmxvZyhhcnJheU9mVmFsdWVzW2ldWzBdLnRodW1ibmFpbHMubGFyZ2UudXJsKVxuLy8gICAgICAgICAgbGV0IGltYWdlVXJsID0gYXJyYXlPZlZhbHVlc1tpXVswXS50aHVtYm5haWxzLmxhcmdlLnVybFxuLy92YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoWzIxLDMxXSk7XG4vL0hleSB0aGlzIHdvcmtzIVxuLy9sZXQgc2hhcGVOb2RlID0gZmlnbWEuY3JlYXRlRWxsaXBzZSgpXG4vL3NoYXBlTm9kZS5maWxscyA9IFtcbi8vICB7XG4vLyAgICBibGVuZE1vZGU6IFwiTk9STUFMXCIsXG4vLyAgICBpbWFnZUhhc2g6IFwiMjdmNjUyODAyZTkwM2I5ZmVhYzYzZGYyMTRlM2NjMmQzNjlkYjkwZlwiLFxuLy8gICAgb3BhY2l0eTogMSxcbi8vICAgIHNjYWxlTW9kZTogXCJGSUxMXCIsXG4vLyAgICBzY2FsaW5nRmFjdG9yOiAwLjUsXG4vLyAgICB0eXBlOiBcIklNQUdFXCIsXG4vLyAgICB2aXNpYmxlOiB0cnVlXG4vLyAgfVxuLy9dXG4vL2ltYWdlTm9kZS5maWxsID0gW1xuLy8gIHtcbi8vICAgIHR5cGU6ICdJTUFHRScsXG4vLyAgICBzY2FsZU1vZGU6IFwiRklMTFwiLFxuLy8gICAgaW1hZ2VIYXNoOiBpbWFnZVVybC50b1N0cmluZygpXG4vL2NvbG9yOiB7XG4vLyAgcjogMSxcbi8vICBnOiAwLjUsXG4vLyAgYjogMFxuLy99LFxuLy9iYWNrZ3JvdW5kOntcbi8vICBkYXRhOiBpbWFnZVVybC50b1N0cmluZygpXG4vL31cbi8vICB9XG4vL11cbi8vY29uc29sZS5sb2coaW1hZ2VOb2RlKVxuLy9jb25zb2xlLmxvZyhpbWFnZVBhaW50Tm9kZSlcbi8vc2hhcGVOb2RlXG4vLyAgICAgICAgfVxuLy9sZXQgdGV4dE5vZGUgPSBmaWdtYS5jcmVhdGVUZXh0KClcbi8vdGV4dE5vZGUuY2hhcmFjdGVycyA9IGFycmF5T2ZWYWx1ZXNbaV0udG9TdHJpbmcoKVxuLy90ZXh0Tm9kZVxuLy8gICAgICB9XG4vL3RleHQgbm9kZVxuLy8gICAgfSk7XG4vL3RleHQgbm9kZVxuLy9jb25zdCB0ZXh0Tm9kZSA9IGZpZ21hLmNyZWF0ZVRleHQoKVxuLy90ZXh0Tm9kZS5jaGFyYWN0ZXJzID0gXCJhIHN0cmluZ1wiXG4vL3RleHROb2RlXG4vL2NyZWF0ZSBmaWdtYSBDb21wb25lbnRcbi8vY29uc3QgY29tcG9uZW50ID0gZmlnbWEuY3JlYXRlQ29tcG9uZW50KClcbi8vY29tcG9uZW50LnJlc2l6ZVdpdGhvdXRDb25zdHJhaW50cygzMDAsIDEwMClcbi8vY29uc3Qgc2VsZWN0ZWRQYWdlID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdXG4vLyAgfVxuLy99XG4vL2ltZyB0ZXN0XG4vL2NvbnNvbGUubG9nKHRoaXMpXG4vL2ZpZ21hLmNyZWF0ZVJlY3RhbmdsZSgpO1xuLy9maWdtYS51aS5wb3N0TWVzc2FnZSgndGhpcyBpcyBhIHRlc3QnKVxuIl0sInNvdXJjZVJvb3QiOiIifQ==