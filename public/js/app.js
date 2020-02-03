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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: C:\\xampp\\htdocs\\Projets\\jamgati\\resources\\js\\app.js: Unexpected token (37:1)\n\n\u001b[0m \u001b[90m 35 | \u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 36 | \u001b[39mrequire(\u001b[32m'./components/Form'\u001b[39m)\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 37 | \u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<\u001b[39m \u001b[33mHEAD\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m    | \u001b[39m \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 38 | \u001b[39mrequire(\u001b[32m'./components/Nav'\u001b[39m)\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 39 | \u001b[39m\u001b[33m===\u001b[39m\u001b[33m===\u001b[39m\u001b[33m=\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 40 | \u001b[39m\u001b[33m>>>\u001b[39m\u001b[33m>>>\u001b[39m\u001b[33m>\u001b[39m \u001b[35m6\u001b[39mbc09915d9a573e98a70655a0dee715e5c444fef\u001b[0m\n    at Object.raise (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:6414:17)\n    at Object.unexpected (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:7768:16)\n    at Object.jsxParseIdentifier (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:3386:12)\n    at Object.jsxParseNamespacedName (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:3396:23)\n    at Object.jsxParseElementName (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:3407:21)\n    at Object.jsxParseOpeningElementAt (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:3493:22)\n    at Object.jsxParseElementAt (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:3526:33)\n    at Object.jsxParseElement (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:3600:17)\n    at Object.parseExprAtom (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:3607:19)\n    at Object.parseExprSubscripts (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:8547:23)\n    at Object.parseMaybeUnary (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:8527:21)\n    at Object.parseExprOps (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:8393:23)\n    at Object.parseMaybeConditional (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:8366:23)\n    at Object.parseMaybeAssign (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:8313:21)\n    at Object.parseExpression (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:8261:23)\n    at Object.parseStatementContent (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:10113:23)\n    at Object.parseStatement (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:9984:17)\n    at Object.parseBlockOrModuleBlockBody (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:10560:25)\n    at Object.parseBlockBody (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:10547:10)\n    at Object.parseTopLevel (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:9915:10)\n    at Object.parse (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:11422:17)\n    at parse (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\parser\\lib\\index.js:11458:38)\n    at parser (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\core\\lib\\transformation\\normalize-file.js:168:34)\n    at normalizeFile (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\core\\lib\\transformation\\normalize-file.js:102:11)\n    at runSync (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\core\\lib\\transformation\\index.js:44:43)\n    at runAsync (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\core\\lib\\transformation\\index.js:35:14)\n    at process.nextTick (C:\\xampp\\htdocs\\Projets\\jamgati\\node_modules\\@babel\\core\\lib\\transform.js:34:34)\n    at process._tickCallback (internal/process/next_tick.js:61:11)");

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\xampp\htdocs\Projets\jamgati\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! C:\xampp\htdocs\Projets\jamgati\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });