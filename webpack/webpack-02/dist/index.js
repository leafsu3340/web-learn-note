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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/css/index.less":
/*!****************************!*\
  !*** ./src/css/index.less ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n    const tag = document.createElement(\"style\");\n    tag.innerHTML = \"body div {\\n  display: flex;\\n  height: 20px;\\n  border: 1px blue solid;\\n}\\n\";\n    document.head.appendChild(tag);\n  \n\n//# sourceURL=webpack:///./src/css/index.less?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/index.less */ \"./src/css/index.less\");\n/* harmony import */ var _css_index_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_index_less__WEBPACK_IMPORTED_MODULE_0__);\n\n// spa mpa\n// 团队合作 还是 单兵作战\n// 样式部分\n// 原生的样式-less/sass/stylus/postcss\n// JS部分\n// es6+ vue react ts\n// html模板引擎\n// pug ejs 原生的html\nconsole.log(\"hello webpack\"); //您好 kkb\n\n// babel 处理JS\n// postcss 处理css\n\n// browserslist ： 声明浏览器的集合，设置目标浏览器的工具\n\n// 使用场景：1 package.json\n// 使用场景：2 .browserslistrc配置文件\n// last 2 versions\", 兼容浏览器最近两个版本 \" >1%\" 兼容市场占有率大于1%的浏览器 全球市场\n// IE 浏览器最新的版本是啥？ 11 10 ie浏览器的升级都是独立的！！\n\n// browserslist浏览器集合的写法\n// last 2 versions ---> last 1 version\n//  >1% (>5% in US)\n// firefox > 45 指定浏览器版本范围\n// ie 6-8 指定浏览器版本范围\n// not ie < 11 排除ie11以下版本\n// dead 全球使用低于0.5%，而且官网声明 不在维护已经两年以上\n\n// and_chr 88\n// and_ff 86\n// and_qq 10.4\n// and_uc 12.12\n// android 81\n// baidu 7.12\n// bb 10\n// bb 7\n// chrome 89\n// chrome 88\n// chrome 87\n// edge 89\n// edge 88\n// firefox 86\n// firefox 85\n// ie 11\n// ie 10\n// ie_mob 11\n// ie_mob 10\n// ios_saf 14.0-14.4\n// ios_saf 13.4-13.7\n// kaios 2.5\n// op_mini all\n// op_mob 62\n// op_mob 12.1\n// opera 73\n// opera 72\n// safari 14\n// safari 13.1\n// samsung 13.0\n// samsung 12.0\n\n// css 优化\n// 1.去掉冗余\n// 2.压缩\n\n// 如何实现自定义loader\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });