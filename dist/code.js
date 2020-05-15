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
                    const frameHeight = 80;
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
                        textNode.characters = JSON.stringify(arrayOfValues[l]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NhbnZhc19pbWFnZV9wcm9jZXNzaW5nL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckIsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGNBQWMsTUFBTTtBQUNwQixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQixjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGNBQWMsTUFBTTtBQUNwQixjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQixjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsY0FBYyxNQUFNO0FBQ3BCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixlQUFlLE1BQU07QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEIsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTs7Ozs7Ozs7Ozs7O0FDOUtBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQ0FBcUM7QUFDMUQsWUFBWSxtQkFBTyxDQUFDLGdGQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHFCQUFxQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG9CQUFvQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw2QkFBNkI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwiY29uc3QgbWFpbiA9IHtcbiAgLyoqXG4gICAqIGNvbnZlciBiYXNlNjQtaW1hZ2Ugc3RyaW5nIHRvIEltYWdlIChIVE1MSW1hZ2VFbGVtZW50IGluc3RhbmNlKSBhc3luY2hyb25vdXNseVxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGJhc2U2NFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGltYWdlNjRUb0ltYWdlKGJhc2U2NCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1hZ2Uuc3JjID0gYmFzZTY0O1xuICAgICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICB9O1xuICAgICAgaW1hZ2Uub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QodGhpcyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBjb252ZXIgYmFzZTY0LWltYWdlIHN0cmluZyB0byBjYW52YXNcbiAgICogQHBhcmFtICB7c3RyaW5nfSBiYXNlNjRcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBhc3luYyBpbWFnZTY0VG9DYW52YXMoYmFzZTY0KSB7XG4gICAgY29uc3QgaW1nID0gYXdhaXQgdGhpcy5pbWFnZTY0VG9JbWFnZShiYXNlNjQpO1xuICAgIHJldHVybiB0aGlzLmltYWdlVG9DYW52YXMoaW1nKTtcbiAgfSxcblxuICAvKipcbiAgICogY29udmVyIGltYWdlIHN0cmluZyB0byBjYW52YXNcbiAgICogQHBhcmFtICB7SW1hZ2V9IGltYWdlXG4gICAqIEByZXR1cm5zIHtDYW52YXN9XG4gICAqL1xuICBpbWFnZVRvQ2FudmFzKGltYWdlKSB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAwLCAwKTtcbiAgICByZXR1cm4gY2FudmFzO1xuICB9LFxuXG4gIC8qKlxuICAgKiByZXNpemUgYmFzZTY0LXN0cmluZ1xuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGJhc2U2NFxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBuZXdXaWR0aFxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBuZXdIZWlnaHRcbiAgICogQHJldHVybnMge1Byb21pc2V9IHdpdGggYmFzZTY0LWltYWdlXG4gICAqL1xuICBhc3luYyByZXNpemVJbWFnZTY0KGJhc2U2NCwgbmV3V2lkdGgsIG5ld0hlaWdodCkge1xuICAgIGNvbnN0IGltZyA9IGF3YWl0IHRoaXMuaW1hZ2U2NFRvSW1hZ2UoYmFzZTY0KTtcbiAgICByZXR1cm4gdGhpcy5yZXNpemVJbWFnZShpbWcsIG5ld1dpZHRoLCBuZXdIZWlnaHQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiByZXNpemUgaW1hZ2UgKEhUTUxJbWFnZUVsZW1lbnQgaW5zdGFuY2UpXG4gICAqIEBwYXJhbSAge2ltYWdlfSBpbWFnZVxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBuZXdXaWR0aFxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBuZXdIZWlnaHRcbiAgICogQHJldHVybnMge3N0cmluZ30gYmFzZTY0LWltYWdlIHN0cmluZ1xuICAgKi9cbiAgcmVzaXplSW1hZ2UoaW1hZ2UsIG5ld1dpZHRoLCBuZXdIZWlnaHQpIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSBuZXdXaWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gbmV3SGVpZ2h0O1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgbmV3V2lkdGgsIG5ld0hlaWdodCk7XG4gICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnKTtcbiAgfSxcblxuICAvKipcbiAgICogY3JvcHBpbmcgaW1hZ2UgZnJvbSBiYXNlNjQtaW1hZ2Ugc3RyaW5nXG4gICAqIEBwYXJhbSAge3N0cmluZ30gYmFzZTY0XG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IHhcbiAgICogQHBhcmFtICB7aW50ZWdlcn0geVxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBuZXdXaWR0aFxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBuZXdIZWlnaHRcbiAgICogQHJldHVybnMge1Byb21pc2V9IHdpdGggYmFzZTY0LWltYWdlIHN0cmluZ1xuICAgKi9cbiAgYXN5bmMgY3JvcEltYWdlNjQoYmFzZTY0LCB4LCB5LCBuZXdXaWR0aCwgbmV3SGVpZ2h0KSB7XG4gICAgY29uc3QgaW1nID0gYXdhaXQgdGhpcy5pbWFnZTY0VG9JbWFnZShiYXNlNjQpO1xuICAgIHJldHVybiB0aGlzLmNyb3BJbWFnZShpbWcsIHgsIHksIG5ld1dpZHRoLCBuZXdIZWlnaHQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBjcm9wcGluZyBpbWFnZSAoSFRNTEltYWdlRWxlbWVudCBpbnN0YW5jZSlcbiAgICogQHBhcmFtICB7aW1hZ2V9IGltYWdlXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IHhcbiAgICogQHBhcmFtICB7aW50ZWdlcn0geVxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBuZXdXaWR0aFxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBuZXdIZWlnaHRcbiAgICogQHJldHVybnMge3N0cmluZ30gYmFzZTY0LWltYWdlIHN0cmluZ1xuICAgKi9cbiAgY3JvcEltYWdlKGltYWdlLCB4LCB5LCBuZXdXaWR0aCwgbmV3SGVpZ2h0KSB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gbmV3V2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IG5ld0hlaWdodDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIHgsIHksIG5ld1dpZHRoLCBuZXdIZWlnaHQsIDAsIDAsIG5ld1dpZHRoLCBuZXdIZWlnaHQpO1xuICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9qcGVnJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGNhbGN1bGF0aW5nIHBhcmFtZXRlciBmb3IgdmVydGljYWwgY3JvcFxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBpbWFnZVdpZHRoPTBcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gaW1hZ2VIZWlnaHQ9MFxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBpdGVtcz0wXG4gICAqIEByZXR1cm5zIHthcnJheX0gW1t4LCB5LCBuZXdXaWR0aCwgbmV3SGVpZ2h0XS4uLl1cbiAgICovXG4gIGNhbGN1bGF0ZVZlcnRpY2FsQ3JvcChpbWFnZVdpZHRoID0gMCwgaW1hZ2VIZWlnaHQgPSAwLCBpdGVtcyA9IDApIHtcbiAgICBpZiAoaW1hZ2VXaWR0aCA9PT0gMCB8fCBpbWFnZUhlaWdodCA9PT0gMCB8fCBpdGVtcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGNvbnN0IG9uZVVuaXQgPSBNYXRoLmZsb29yKGltYWdlV2lkdGggLyBpdGVtcyk7XG4gICAgY29uc3Qgd2lkdGhBcnIgPSBBcnJheSguLi5BcnJheShpdGVtcykpLm1hcChcbiAgICAgIE51bWJlci5wcm90b3R5cGUudmFsdWVPZixcbiAgICAgIG9uZVVuaXQsXG4gICAgKTtcbiAgICBpZiAoaW1hZ2VXaWR0aCAlIGl0ZW1zICE9PSAwKSB7XG4gICAgICB3aWR0aEFyclt3aWR0aEFyci5sZW5ndGggLSAxXSA9XG4gICAgICAgIGltYWdlV2lkdGggLSAod2lkdGhBcnIubGVuZ3RoIC0gMSkgKiBvbmVVbml0O1xuICAgIH1cblxuICAgIHJldHVybiB3aWR0aEFyci5tYXAoKGVsLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICBjb25zdCBzdWJBcnJheSA9IGFyci5zbGljZSgwLCBpbmRleCk7XG4gICAgICBjb25zdCBuZXdYID1cbiAgICAgICAgc3ViQXJyYXkucmVkdWNlKFxuICAgICAgICAgIChhY2N1bXVsYXRvciwgY3VycmVudFZhbHVlKSA9PiBhY2N1bXVsYXRvciArIGN1cnJlbnRWYWx1ZSxcbiAgICAgICAgICAwLFxuICAgICAgICApIHx8IDA7XG5cbiAgICAgIHJldHVybiBbbmV3WCwgMCwgZWwsIGltYWdlSGVpZ2h0XTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogY2FsY3VsYXRpbmcgcGFyYW1ldGVyIGZvciBob3Jpem9udGFsIGNyb3BcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gaW1hZ2VXaWR0aD0wXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IGltYWdlSGVpZ2h0PTBcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gaXRlbXM9MFxuICAgKiBAcmV0dXJucyB7YXJyYXl9IFtbeCwgeSwgbmV3V2lkdGgsIG5ld0hlaWdodF0uLi5dXG4gICAqL1xuICBjYWxjdWxhdGVIb3Jpem9udGFsQ3JvcChpbWFnZVdpZHRoID0gMCwgaW1hZ2VIZWlnaHQgPSAwLCBpdGVtcyA9IDApIHtcbiAgICBpZiAoaW1hZ2VXaWR0aCA9PT0gMCB8fCBpbWFnZUhlaWdodCA9PT0gMCB8fCBpdGVtcyA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGNvbnN0IG9uZVVuaXQgPSBNYXRoLmZsb29yKGltYWdlSGVpZ2h0IC8gaXRlbXMpO1xuICAgIGNvbnN0IGhlaWdodEFyciA9IEFycmF5KC4uLkFycmF5KGl0ZW1zKSkubWFwKFxuICAgICAgTnVtYmVyLnByb3RvdHlwZS52YWx1ZU9mLFxuICAgICAgb25lVW5pdCxcbiAgICApO1xuICAgIGlmIChpbWFnZUhlaWdodCAlIGl0ZW1zICE9PSAwKSB7XG4gICAgICBoZWlnaHRBcnJbaGVpZ2h0QXJyLmxlbmd0aCAtIDFdID1cbiAgICAgICAgaW1hZ2VIZWlnaHQgLSAoaGVpZ2h0QXJyLmxlbmd0aCAtIDEpICogb25lVW5pdDtcbiAgICB9XG5cbiAgICByZXR1cm4gaGVpZ2h0QXJyLm1hcCgoZWwsIGluZGV4LCBhcnIpID0+IHtcbiAgICAgIGNvbnN0IHN1YkFycmF5ID0gYXJyLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgIGNvbnN0IG5ld1kgPVxuICAgICAgICBzdWJBcnJheS5yZWR1Y2UoXG4gICAgICAgICAgKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpID0+IGFjY3VtdWxhdG9yICsgY3VycmVudFZhbHVlLFxuICAgICAgICAgIDAsXG4gICAgICAgICkgfHwgMDtcblxuICAgICAgcmV0dXJuIFswLCBuZXdZLCBpbWFnZVdpZHRoLCBlbF07XG4gICAgfSk7XG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1haW47XG4iLCIvL2ZpZ21hIHByZWxpbWluYXJpZXNcbmZpZ21hLnNob3dVSShfX2h0bWxfXyk7XG5maWdtYS51aS5yZXNpemUoNDM5LCAzMDApO1xuZmlnbWEubG9hZEZvbnRBc3luYyh7IGZhbWlseTogXCJSb2JvdG9cIiwgc3R5bGU6IFwiUmVndWxhclwiIH0pO1xuY29uc3QgQ0lQID0gcmVxdWlyZSgnY2FudmFzX2ltYWdlX3Byb2Nlc3NpbmcnKTtcbi8vVXNlIHRoaXMgdG8gZ3JhYiBwcm9wZXJ0aWVzIG9mIGFueSBvYmplY3QgaW4gZmlnbWEhXG5mb3IgKGNvbnN0IG5vZGUgb2YgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uKSB7XG4gICAgY29uc29sZS5sb2cobm9kZSk7XG59XG5maWdtYS51aS5vbm1lc3NhZ2UgPSBtc2cgPT4ge1xuICAgIGlmIChtc2cudHlwZSA9PT0gJ2Nsb3NlLXBsdWdpbicpIHtcbiAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSAnYWlydGFibGUnKSB7XG4gICAgICAgIC8vY3JlYXRlIG5ldyBmaWdtYSBQYWdlXG4gICAgICAgIGZpZ21hLmNyZWF0ZVBhZ2UoKS5uYW1lID0gbXNnLnRhYmxlTmFtZTtcbiAgICAgICAgLy9OYXZpZ2F0ZSB0byBhaXJ0YWJsZSBkYXRhIHBhZ2VcbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2UgPSBmaWdtYS5yb290LmNoaWxkcmVuLnNsaWNlKC0xKS5wb3AoKTtcbiAgICAgICAgLy9kYXRhIGFycmF5XG4gICAgICAgIGxldCBhcnJheU9mVGFibGVSZXN1bHRzID0gW107XG4gICAgICAgIC8vYWlydGFibGUgb2JqZWN0XG4gICAgICAgIGNvbnN0IGFpcnRhYmxlT2JqZWN0ID0gSlNPTi5wYXJzZShtc2cubWVzc2FnZSk7XG4gICAgICAgIGFycmF5T2ZUYWJsZVJlc3VsdHMucHVzaChhaXJ0YWJsZU9iamVjdC5yZWNvcmRzKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhhaXJ0YWJsZU9iamVjdC5yZWNvcmRzKVxuICAgICAgICBsZXQgbnVtYmVyT2ZGaWVsZHMgPSBPYmplY3Qua2V5cyhhcnJheU9mVGFibGVSZXN1bHRzWzBdWzBdWydmaWVsZHMnXSkubGVuZ3RoO1xuICAgICAgICBhcnJheU9mVGFibGVSZXN1bHRzLm1hcCh0YWJsZVJvdyA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0YWJsZVJvdyk7XG4gICAgICAgICAgICAvL2dpdmUgbWUgbG9vcCBvZiByb3dzXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYmxlUm93Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFycmF5T2ZWYWx1ZXMgPSBPYmplY3QudmFsdWVzKHRhYmxlUm93W2ldLmZpZWxkcyk7XG4gICAgICAgICAgICAgICAgbGV0IGFycmF5T2ZLZXlzID0gT2JqZWN0LmtleXModGFibGVSb3dbaV0uZmllbGRzKTtcbiAgICAgICAgICAgICAgICBsZXQgYXJyYXlPZkpzb24gPSBPYmplY3QudmFsdWVzKHRhYmxlUm93W2ldKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmcmFtZSA9IGZpZ21hLmNyZWF0ZUZyYW1lKCk7XG4gICAgICAgICAgICAgICAgLy9naXZlIG1lIGxvb3Agb2YgZmllbGRzXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbCA9IDA7IGwgPCBudW1iZXJPZkZpZWxkczsgKytsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0Tm9kZSA9IGZpZ21hLmNyZWF0ZVRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZnJhbWVXaWR0aCA9IDIwMCAqIE51bWJlcihudW1iZXJPZkZpZWxkcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZyYW1lSGVpZ2h0ID0gODA7XG4gICAgICAgICAgICAgICAgICAgIC8vQ29tZSBiYWNrIHRvIGZpZ3VyZSBvdXQgcmVzcG9uc2l2ZSB3aWR0aCB3aXRoIHBhZGRpbmdcbiAgICAgICAgICAgICAgICAgICAgZnJhbWUucmVzaXplV2l0aG91dENvbnN0cmFpbnRzKGZyYW1lV2lkdGgsIGZyYW1lSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgZnJhbWUuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBmcmFtZS55ID0gaSAqIDEwMDtcbiAgICAgICAgICAgICAgICAgICAgdGV4dE5vZGUueSA9IDMwO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0Tm9kZS54ID0gbCAqIDIwMDtcbiAgICAgICAgICAgICAgICAgICAgdGV4dE5vZGUucmVzaXplKDE1MCwgMzApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXlPZktleXNbbF0gPT0gJ2F0dGFjaG1lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL0NvbWUgYmFjayB0byBhZGQgYWN0dWFsIGltYWdlIGluc2lkZSBDaXJjbGUgc2hhcGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHROb2RlLmNoYXJhY3RlcnMgPSBKU09OLnN0cmluZ2lmeSh0YWJsZVJvd1tpXS5maWVsZHMuaW1hZ2VbMF0udXJsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXlPZktleXNbbF0gPT0gJ3VybCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ29tZSBiYWNrIHRvIGFkZCBhY3R1YWwgaW1hZ2UgaW5zaWRlIENpcmNsZSBzaGFwZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dE5vZGUuY2hhcmFjdGVycyA9IEpTT04uc3RyaW5naWZ5KHRhYmxlUm93W2ldLmZpZWxkcy51cmxbMF0udXJsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHROb2RlLmNoYXJhY3RlcnMgPSBKU09OLnN0cmluZ2lmeShhcnJheU9mVmFsdWVzW2xdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcbi8vbG9vcCB2YWx1ZXMgb2YgcmVzdWx0c1xuLy8gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgYWlydGFibGVOdW1iZXJPZlJlc3VsdHM7ICsraSl7XG4vL2lmIHN0cmluZ1xuLy8gICAgICAgIGlmKGFycmF5T2ZWYWx1ZXNbaV0gIT09IHVuZGVmaW5lZCkge1xuLy8gICAgICAgICAgY29uc29sZS5sb2coYXJyYXlPZlZhbHVlc1tpXSlcbi8vbGV0IHRleHROb2RlID0gZmlnbWEuY3JlYXRlVGV4dCgpXG4vL3RleHROb2RlLmNoYXJhY3RlcnMgPSBhcnJheU9mVmFsdWVzW2ldLnRvU3RyaW5nKClcbi8vdGV4dE5vZGVcbi8vICAgICAgICB9XG4vL2lmIGltYWdlXG4vLyAgICAgICAgaWYoYXJyYXlPZlZhbHVlc1tpXVswXS5maWxlbmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4vL2NvbnNvbGUubG9nKGFycmF5T2ZWYWx1ZXNbaV1bMF0udGh1bWJuYWlscy5sYXJnZS51cmwpXG4vLyAgICAgICAgICBsZXQgaW1hZ2VVcmwgPSBhcnJheU9mVmFsdWVzW2ldWzBdLnRodW1ibmFpbHMubGFyZ2UudXJsXG4vL3ZhciBhcnIgPSBuZXcgVWludDhBcnJheShbMjEsMzFdKTtcbi8vSGV5IHRoaXMgd29ya3MhXG4vL2xldCBzaGFwZU5vZGUgPSBmaWdtYS5jcmVhdGVFbGxpcHNlKClcbi8vc2hhcGVOb2RlLmZpbGxzID0gW1xuLy8gIHtcbi8vICAgIGJsZW5kTW9kZTogXCJOT1JNQUxcIixcbi8vICAgIGltYWdlSGFzaDogXCIyN2Y2NTI4MDJlOTAzYjlmZWFjNjNkZjIxNGUzY2MyZDM2OWRiOTBmXCIsXG4vLyAgICBvcGFjaXR5OiAxLFxuLy8gICAgc2NhbGVNb2RlOiBcIkZJTExcIixcbi8vICAgIHNjYWxpbmdGYWN0b3I6IDAuNSxcbi8vICAgIHR5cGU6IFwiSU1BR0VcIixcbi8vICAgIHZpc2libGU6IHRydWVcbi8vICB9XG4vL11cbi8vaW1hZ2VOb2RlLmZpbGwgPSBbXG4vLyAge1xuLy8gICAgdHlwZTogJ0lNQUdFJyxcbi8vICAgIHNjYWxlTW9kZTogXCJGSUxMXCIsXG4vLyAgICBpbWFnZUhhc2g6IGltYWdlVXJsLnRvU3RyaW5nKClcbi8vY29sb3I6IHtcbi8vICByOiAxLFxuLy8gIGc6IDAuNSxcbi8vICBiOiAwXG4vL30sXG4vL2JhY2tncm91bmQ6e1xuLy8gIGRhdGE6IGltYWdlVXJsLnRvU3RyaW5nKClcbi8vfVxuLy8gIH1cbi8vXVxuLy9jb25zb2xlLmxvZyhpbWFnZU5vZGUpXG4vL2NvbnNvbGUubG9nKGltYWdlUGFpbnROb2RlKVxuLy9zaGFwZU5vZGVcbi8vICAgICAgICB9XG4vL2xldCB0ZXh0Tm9kZSA9IGZpZ21hLmNyZWF0ZVRleHQoKVxuLy90ZXh0Tm9kZS5jaGFyYWN0ZXJzID0gYXJyYXlPZlZhbHVlc1tpXS50b1N0cmluZygpXG4vL3RleHROb2RlXG4vLyAgICAgIH1cbi8vdGV4dCBub2RlXG4vLyAgICB9KTtcbi8vdGV4dCBub2RlXG4vL2NvbnN0IHRleHROb2RlID0gZmlnbWEuY3JlYXRlVGV4dCgpXG4vL3RleHROb2RlLmNoYXJhY3RlcnMgPSBcImEgc3RyaW5nXCJcbi8vdGV4dE5vZGVcbi8vY3JlYXRlIGZpZ21hIENvbXBvbmVudFxuLy9jb25zdCBjb21wb25lbnQgPSBmaWdtYS5jcmVhdGVDb21wb25lbnQoKVxuLy9jb21wb25lbnQucmVzaXplV2l0aG91dENvbnN0cmFpbnRzKDMwMCwgMTAwKVxuLy9jb25zdCBzZWxlY3RlZFBhZ2UgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF1cbi8vICB9XG4vL31cbi8vaW1nIHRlc3Rcbi8vY29uc29sZS5sb2codGhpcylcbi8vZmlnbWEuY3JlYXRlUmVjdGFuZ2xlKCk7XG4vL2ZpZ21hLnVpLnBvc3RNZXNzYWdlKCd0aGlzIGlzIGEgdGVzdCcpXG4iXSwic291cmNlUm9vdCI6IiJ9