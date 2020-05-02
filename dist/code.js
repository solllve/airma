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

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

figma.showUI(__html__);
figma.ui.resize(450, 350);
figma.loadFontAsync({ family: "Roboto", style: "Regular" });
//Use this to grab properties of any object in figma!
for (const node of figma.currentPage.selection) {
    console.log(node);
}
//img test
const imagePath = './assets/airtable/john.jpg';
const header_size = 70;
const width = 255;
const height = 255;
const image_size = width * height * 4;
const arr = new Uint8Array(header_size + image_size);
figma.ui.onmessage = (res) => {
    //airtable object
    const airtableObject = res;
    //return map of nodes
    let airtableNumberOfResults = Object.keys(res[0]).length;
    airtableObject.map(tableRow => {
        let arrayOfValues = Object.values(tableRow);
        let arrayOfKeys = Object.keys(tableRow);
        //loop values of results
        for (var i = 0; i < airtableNumberOfResults; ++i) {
            //if string
            if (arrayOfValues[i] !== undefined) {
                console.log(arrayOfValues[i]);
                //let textNode = figma.createText()
                //textNode.characters = arrayOfValues[i].toString()
                //textNode
            }
            //if image
            if (arrayOfValues[i][0].filename !== undefined) {
                //console.log(arrayOfValues[i][0].thumbnails.large.url)
                let imageUrl = arrayOfValues[i][0].thumbnails.large.url;
                //var arr = new Uint8Array([21,31]);
                //Hey this works!
                let shapeNode = figma.createEllipse();
                shapeNode.fills = [
                    {
                        blendMode: "NORMAL",
                        imageHash: "27f652802e903b9feac63df214e3cc2d369db90f",
                        opacity: 1,
                        scaleMode: "FILL",
                        scalingFactor: 0.5,
                        type: "IMAGE",
                        visible: true
                    }
                ];
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
            }
            //let textNode = figma.createText()
            //textNode.characters = arrayOfValues[i].toString()
            //textNode
        }
        //text node
        //console.log(i)
        //console.log(Object.keys(tableRow).length)
        //console.log(Object.keys(tableRow))
    });
    //figma.createPage().name = 'Airtable Data'
    //text node
    //const textNode = figma.createText()
    //textNode.characters = "a string"
    //textNode
    //create figma Component
    //const component = figma.createComponent()
    //component.resizeWithoutConstraints(300, 100)
    //const selectedPage = figma.currentPage.selection[0]
};
//console.log(this)
//figma.createRectangle();
//figma.ui.postMessage('this is a test')


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQSxxQkFBcUIscUNBQXFDO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsNkJBQTZCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NvZGUudHNcIik7XG4iLCJmaWdtYS5zaG93VUkoX19odG1sX18pO1xuZmlnbWEudWkucmVzaXplKDQ1MCwgMzUwKTtcbmZpZ21hLmxvYWRGb250QXN5bmMoeyBmYW1pbHk6IFwiUm9ib3RvXCIsIHN0eWxlOiBcIlJlZ3VsYXJcIiB9KTtcbi8vVXNlIHRoaXMgdG8gZ3JhYiBwcm9wZXJ0aWVzIG9mIGFueSBvYmplY3QgaW4gZmlnbWEhXG5mb3IgKGNvbnN0IG5vZGUgb2YgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uKSB7XG4gICAgY29uc29sZS5sb2cobm9kZSk7XG59XG4vL2ltZyB0ZXN0XG5jb25zdCBpbWFnZVBhdGggPSAnLi9hc3NldHMvYWlydGFibGUvam9obi5qcGcnO1xuY29uc3QgaGVhZGVyX3NpemUgPSA3MDtcbmNvbnN0IHdpZHRoID0gMjU1O1xuY29uc3QgaGVpZ2h0ID0gMjU1O1xuY29uc3QgaW1hZ2Vfc2l6ZSA9IHdpZHRoICogaGVpZ2h0ICogNDtcbmNvbnN0IGFyciA9IG5ldyBVaW50OEFycmF5KGhlYWRlcl9zaXplICsgaW1hZ2Vfc2l6ZSk7XG5maWdtYS51aS5vbm1lc3NhZ2UgPSAocmVzKSA9PiB7XG4gICAgLy9haXJ0YWJsZSBvYmplY3RcbiAgICBjb25zdCBhaXJ0YWJsZU9iamVjdCA9IHJlcztcbiAgICAvL3JldHVybiBtYXAgb2Ygbm9kZXNcbiAgICBsZXQgYWlydGFibGVOdW1iZXJPZlJlc3VsdHMgPSBPYmplY3Qua2V5cyhyZXNbMF0pLmxlbmd0aDtcbiAgICBhaXJ0YWJsZU9iamVjdC5tYXAodGFibGVSb3cgPT4ge1xuICAgICAgICBsZXQgYXJyYXlPZlZhbHVlcyA9IE9iamVjdC52YWx1ZXModGFibGVSb3cpO1xuICAgICAgICBsZXQgYXJyYXlPZktleXMgPSBPYmplY3Qua2V5cyh0YWJsZVJvdyk7XG4gICAgICAgIC8vbG9vcCB2YWx1ZXMgb2YgcmVzdWx0c1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFpcnRhYmxlTnVtYmVyT2ZSZXN1bHRzOyArK2kpIHtcbiAgICAgICAgICAgIC8vaWYgc3RyaW5nXG4gICAgICAgICAgICBpZiAoYXJyYXlPZlZhbHVlc1tpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJyYXlPZlZhbHVlc1tpXSk7XG4gICAgICAgICAgICAgICAgLy9sZXQgdGV4dE5vZGUgPSBmaWdtYS5jcmVhdGVUZXh0KClcbiAgICAgICAgICAgICAgICAvL3RleHROb2RlLmNoYXJhY3RlcnMgPSBhcnJheU9mVmFsdWVzW2ldLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAvL3RleHROb2RlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2lmIGltYWdlXG4gICAgICAgICAgICBpZiAoYXJyYXlPZlZhbHVlc1tpXVswXS5maWxlbmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhhcnJheU9mVmFsdWVzW2ldWzBdLnRodW1ibmFpbHMubGFyZ2UudXJsKVxuICAgICAgICAgICAgICAgIGxldCBpbWFnZVVybCA9IGFycmF5T2ZWYWx1ZXNbaV1bMF0udGh1bWJuYWlscy5sYXJnZS51cmw7XG4gICAgICAgICAgICAgICAgLy92YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoWzIxLDMxXSk7XG4gICAgICAgICAgICAgICAgLy9IZXkgdGhpcyB3b3JrcyFcbiAgICAgICAgICAgICAgICBsZXQgc2hhcGVOb2RlID0gZmlnbWEuY3JlYXRlRWxsaXBzZSgpO1xuICAgICAgICAgICAgICAgIHNoYXBlTm9kZS5maWxscyA9IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxlbmRNb2RlOiBcIk5PUk1BTFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VIYXNoOiBcIjI3ZjY1MjgwMmU5MDNiOWZlYWM2M2RmMjE0ZTNjYzJkMzY5ZGI5MGZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZU1vZGU6IFwiRklMTFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGluZ0ZhY3RvcjogMC41LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJJTUFHRVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAvL2ltYWdlTm9kZS5maWxsID0gW1xuICAgICAgICAgICAgICAgIC8vICB7XG4gICAgICAgICAgICAgICAgLy8gICAgdHlwZTogJ0lNQUdFJyxcbiAgICAgICAgICAgICAgICAvLyAgICBzY2FsZU1vZGU6IFwiRklMTFwiLFxuICAgICAgICAgICAgICAgIC8vICAgIGltYWdlSGFzaDogaW1hZ2VVcmwudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIC8vY29sb3I6IHtcbiAgICAgICAgICAgICAgICAvLyAgcjogMSxcbiAgICAgICAgICAgICAgICAvLyAgZzogMC41LFxuICAgICAgICAgICAgICAgIC8vICBiOiAwXG4gICAgICAgICAgICAgICAgLy99LFxuICAgICAgICAgICAgICAgIC8vYmFja2dyb3VuZDp7XG4gICAgICAgICAgICAgICAgLy8gIGRhdGE6IGltYWdlVXJsLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICAvLyAgfVxuICAgICAgICAgICAgICAgIC8vXVxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaW1hZ2VOb2RlKVxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaW1hZ2VQYWludE5vZGUpXG4gICAgICAgICAgICAgICAgLy9zaGFwZU5vZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vbGV0IHRleHROb2RlID0gZmlnbWEuY3JlYXRlVGV4dCgpXG4gICAgICAgICAgICAvL3RleHROb2RlLmNoYXJhY3RlcnMgPSBhcnJheU9mVmFsdWVzW2ldLnRvU3RyaW5nKClcbiAgICAgICAgICAgIC8vdGV4dE5vZGVcbiAgICAgICAgfVxuICAgICAgICAvL3RleHQgbm9kZVxuICAgICAgICAvL2NvbnNvbGUubG9nKGkpXG4gICAgICAgIC8vY29uc29sZS5sb2coT2JqZWN0LmtleXModGFibGVSb3cpLmxlbmd0aClcbiAgICAgICAgLy9jb25zb2xlLmxvZyhPYmplY3Qua2V5cyh0YWJsZVJvdykpXG4gICAgfSk7XG4gICAgLy9maWdtYS5jcmVhdGVQYWdlKCkubmFtZSA9ICdBaXJ0YWJsZSBEYXRhJ1xuICAgIC8vdGV4dCBub2RlXG4gICAgLy9jb25zdCB0ZXh0Tm9kZSA9IGZpZ21hLmNyZWF0ZVRleHQoKVxuICAgIC8vdGV4dE5vZGUuY2hhcmFjdGVycyA9IFwiYSBzdHJpbmdcIlxuICAgIC8vdGV4dE5vZGVcbiAgICAvL2NyZWF0ZSBmaWdtYSBDb21wb25lbnRcbiAgICAvL2NvbnN0IGNvbXBvbmVudCA9IGZpZ21hLmNyZWF0ZUNvbXBvbmVudCgpXG4gICAgLy9jb21wb25lbnQucmVzaXplV2l0aG91dENvbnN0cmFpbnRzKDMwMCwgMTAwKVxuICAgIC8vY29uc3Qgc2VsZWN0ZWRQYWdlID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdXG59O1xuLy9jb25zb2xlLmxvZyh0aGlzKVxuLy9maWdtYS5jcmVhdGVSZWN0YW5nbGUoKTtcbi8vZmlnbWEudWkucG9zdE1lc3NhZ2UoJ3RoaXMgaXMgYSB0ZXN0JylcbiJdLCJzb3VyY2VSb290IjoiIn0=