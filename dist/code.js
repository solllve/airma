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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQSxxQkFBcUIscUNBQXFDO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDZCQUE2QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwiZmlnbWEuc2hvd1VJKF9faHRtbF9fKTtcbmZpZ21hLnVpLnJlc2l6ZSg0NTAsIDM1MCk7XG5maWdtYS5sb2FkRm9udEFzeW5jKHsgZmFtaWx5OiBcIlJvYm90b1wiLCBzdHlsZTogXCJSZWd1bGFyXCIgfSk7XG4vL1VzZSB0aGlzIHRvIGdyYWIgcHJvcGVydGllcyBvZiBhbnkgb2JqZWN0IGluIGZpZ21hIVxuZm9yIChjb25zdCBub2RlIG9mIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbikge1xuICAgIGNvbnNvbGUubG9nKG5vZGUpO1xufVxuZmlnbWEudWkub25tZXNzYWdlID0gKHJlcykgPT4ge1xuICAgIC8vYWlydGFibGUgb2JqZWN0XG4gICAgY29uc3QgYWlydGFibGVPYmplY3QgPSByZXM7XG4gICAgLy9yZXR1cm4gbWFwIG9mIG5vZGVzXG4gICAgbGV0IGFpcnRhYmxlTnVtYmVyT2ZSZXN1bHRzID0gT2JqZWN0LmtleXMocmVzWzBdKS5sZW5ndGg7XG4gICAgYWlydGFibGVPYmplY3QubWFwKHRhYmxlUm93ID0+IHtcbiAgICAgICAgbGV0IGFycmF5T2ZWYWx1ZXMgPSBPYmplY3QudmFsdWVzKHRhYmxlUm93KTtcbiAgICAgICAgbGV0IGFycmF5T2ZLZXlzID0gT2JqZWN0LmtleXModGFibGVSb3cpO1xuICAgICAgICAvL2xvb3AgdmFsdWVzIG9mIHJlc3VsdHNcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhaXJ0YWJsZU51bWJlck9mUmVzdWx0czsgKytpKSB7XG4gICAgICAgICAgICAvL2lmIHN0cmluZ1xuICAgICAgICAgICAgaWYgKGFycmF5T2ZWYWx1ZXNbaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFycmF5T2ZWYWx1ZXNbaV0pO1xuICAgICAgICAgICAgICAgIC8vbGV0IHRleHROb2RlID0gZmlnbWEuY3JlYXRlVGV4dCgpXG4gICAgICAgICAgICAgICAgLy90ZXh0Tm9kZS5jaGFyYWN0ZXJzID0gYXJyYXlPZlZhbHVlc1tpXS50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgLy90ZXh0Tm9kZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9pZiBpbWFnZVxuICAgICAgICAgICAgaWYgKGFycmF5T2ZWYWx1ZXNbaV1bMF0uZmlsZW5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coYXJyYXlPZlZhbHVlc1tpXVswXS50aHVtYm5haWxzLmxhcmdlLnVybClcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2VVcmwgPSBhcnJheU9mVmFsdWVzW2ldWzBdLnRodW1ibmFpbHMubGFyZ2UudXJsO1xuICAgICAgICAgICAgICAgIC8vdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KFsyMSwzMV0pO1xuICAgICAgICAgICAgICAgIC8vSGV5IHRoaXMgd29ya3MhXG4gICAgICAgICAgICAgICAgbGV0IHNoYXBlTm9kZSA9IGZpZ21hLmNyZWF0ZUVsbGlwc2UoKTtcbiAgICAgICAgICAgICAgICBzaGFwZU5vZGUuZmlsbHMgPSBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsZW5kTW9kZTogXCJOT1JNQUxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlSGFzaDogXCIyN2Y2NTI4MDJlOTAzYjlmZWFjNjNkZjIxNGUzY2MyZDM2OWRiOTBmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGVNb2RlOiBcIkZJTExcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxpbmdGYWN0b3I6IDAuNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiSU1BR0VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgLy9pbWFnZU5vZGUuZmlsbCA9IFtcbiAgICAgICAgICAgICAgICAvLyAge1xuICAgICAgICAgICAgICAgIC8vICAgIHR5cGU6ICdJTUFHRScsXG4gICAgICAgICAgICAgICAgLy8gICAgc2NhbGVNb2RlOiBcIkZJTExcIixcbiAgICAgICAgICAgICAgICAvLyAgICBpbWFnZUhhc2g6IGltYWdlVXJsLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAvL2NvbG9yOiB7XG4gICAgICAgICAgICAgICAgLy8gIHI6IDEsXG4gICAgICAgICAgICAgICAgLy8gIGc6IDAuNSxcbiAgICAgICAgICAgICAgICAvLyAgYjogMFxuICAgICAgICAgICAgICAgIC8vfSxcbiAgICAgICAgICAgICAgICAvL2JhY2tncm91bmQ6e1xuICAgICAgICAgICAgICAgIC8vICBkYXRhOiBpbWFnZVVybC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgLy8gIH1cbiAgICAgICAgICAgICAgICAvL11cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGltYWdlTm9kZSlcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGltYWdlUGFpbnROb2RlKVxuICAgICAgICAgICAgICAgIC8vc2hhcGVOb2RlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2xldCB0ZXh0Tm9kZSA9IGZpZ21hLmNyZWF0ZVRleHQoKVxuICAgICAgICAgICAgLy90ZXh0Tm9kZS5jaGFyYWN0ZXJzID0gYXJyYXlPZlZhbHVlc1tpXS50b1N0cmluZygpXG4gICAgICAgICAgICAvL3RleHROb2RlXG4gICAgICAgIH1cbiAgICAgICAgLy90ZXh0IG5vZGVcbiAgICAgICAgLy9jb25zb2xlLmxvZyhpKVxuICAgICAgICAvL2NvbnNvbGUubG9nKE9iamVjdC5rZXlzKHRhYmxlUm93KS5sZW5ndGgpXG4gICAgICAgIC8vY29uc29sZS5sb2coT2JqZWN0LmtleXModGFibGVSb3cpKVxuICAgIH0pO1xuICAgIC8vZmlnbWEuY3JlYXRlUGFnZSgpLm5hbWUgPSAnQWlydGFibGUgRGF0YSdcbiAgICAvL3RleHQgbm9kZVxuICAgIC8vY29uc3QgdGV4dE5vZGUgPSBmaWdtYS5jcmVhdGVUZXh0KClcbiAgICAvL3RleHROb2RlLmNoYXJhY3RlcnMgPSBcImEgc3RyaW5nXCJcbiAgICAvL3RleHROb2RlXG4gICAgLy9jcmVhdGUgZmlnbWEgQ29tcG9uZW50XG4gICAgLy9jb25zdCBjb21wb25lbnQgPSBmaWdtYS5jcmVhdGVDb21wb25lbnQoKVxuICAgIC8vY29tcG9uZW50LnJlc2l6ZVdpdGhvdXRDb25zdHJhaW50cygzMDAsIDEwMClcbiAgICAvL2NvbnN0IHNlbGVjdGVkUGFnZSA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXVxufTtcbi8vY29uc29sZS5sb2codGhpcylcbi8vZmlnbWEuY3JlYXRlUmVjdGFuZ2xlKCk7XG4vL2ZpZ21hLnVpLnBvc3RNZXNzYWdlKCd0aGlzIGlzIGEgdGVzdCcpXG4iXSwic291cmNlUm9vdCI6IiJ9