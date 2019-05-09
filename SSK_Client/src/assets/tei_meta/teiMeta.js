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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

    "use strict";

    /**
     * init-singlepage.js
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    var events = __webpack_require__(1);
    var teimeta = __webpack_require__(2);
    var common = __webpack_require__(29);
    var msg = __webpack_require__(7);
    __webpack_require__(34);
    __webpack_require__(49);
    __webpack_require__(51);
    function bodyKeys(e) {
        /*
            console.log('keyCode '+ e.keyCode);
            console.log('charCode '+ e.charCode);
            console.log('ctrl '+ e.ctrlKey);
            console.log('alt '+ e.altKey);
            console.log('shift '+ e.shiftKey);
            console.log('meta '+ e.metaKey);
            console.log('ident ' + e.keyIdentifier);
        */
        /*    if (e.which === 117 && e.altKey !== true && e.ctrlKey !== true) {
                e.preventDefault();
                teiEdit.insertLineAtEnd(e);
            }
        */
        if (e.which === 79 && (e.ctrlKey === true || e.metaKey === true) && e.shiftKey === true) { // ctrl shift O
            e.preventDefault();
            events.openOdd();
            return;
        }
        if (e.which === 79 && (e.ctrlKey === true || e.metaKey === true)) { // ctrl O
            e.preventDefault();
            events.openXml();
        }
        if (e.which === 83 && (e.ctrlKey === true || e.metaKey === true) && (e.altKey === true)) { // ctrl alt S
            e.preventDefault();
            events.dumpHtml();
            return;
        }
        if (e.which === 83 && (e.ctrlKey === true || e.metaKey === true && e.shiftKey === true)) { // ctrl shift S
            e.preventDefault();
            events.saveAsLocal(null);
        }
        if (e.which === 83 && (e.ctrlKey === true || e.metaKey === true)) { // ctrl S
            e.preventDefault();
            events.saveLocal(null);
        }
        if (e.which === 78 && (e.ctrlKey === true || e.metaKey === true)) { // ctrl N
            e.preventDefault();
           // events.newXml('new'); // checked changes
        }
    }
    function init() {
        var sURL = window.document.URL.toString();
       
        if (sURL.substring(0, 5) === "file:") {
            teimeta.teiData.system = 'html';
            teimeta.teiData.protocol = 'file';
        }
        else {
            teimeta.teiData.system = 'html';
            teimeta.teiData.protocol = 'http';
        }
        // load params
        console.log(sURL)
        common.loadParams();
        /*
        // the file-save is a download save
        let el = document.getElementById('file-save');
        el.addEventListener("click", events.saveLocal);
        //  and a saveas
        el = document.getElementById('file-saveas');
        el.addEventListener("click", events.saveAsLocal);
        */
        common.init(bodyKeys);
        window.addEventListener("beforeunload", function (e) {
            if (teimeta.teiData.edit.change() === false) {
                return undefined;
            }
            var confirmationMessage = msg.msg('leavinghtml');
            (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
        });
        common.setLanguage(teimeta.teiData.params.language, false);
        // load previous data
       // events.newXml('previous');
    }
    exports.init = init;
    // in case the document is already rendered
    if (document.readyState != 'loading'){
        init();
    }
    else if (document.addEventListener){
        document.addEventListener('DOMContentLoaded', init);
    }
       
    
    
    /***/ }),
    /* 1 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    /**
     * events.ts
     * author: Christophe Parisse
     * main procedures to load, save, and call teiedit functions
     *
     * Use case
     * 1) openXml() --> choose a local file --> loadXml(data/file/url)
     *      if ODD in XML then loadODD(url) or ask for (file)
     *      else choose ODD file or choose predefined ODD or already loaded ODD --> (loadOdd data/file/url)
     *      if CSS in ODD file same thing as above but with CSS
     * 2) newXml()
     *      check changes +
     *      choose ODD file or choose predefined ODD or already loaded ODD --> (loadOdd data/file/url)
     * 3) chooseOdd()
     *      choose ODD file to be used in later openXml() or newXml()
     *      if the user want to replace current ODD, he has to save first but change is immediate otherwise the user
     *      has to use newXml() as above
     * 4) chooseCss()
     *      choose a CSS file to be used in later openXml() or newXml()
     *      the predefined CSS can be used immediatly
     *
     **/
    Object.defineProperty(exports, "__esModule", { value: true });
    var teimeta = __webpack_require__(2);
    var opensave = __webpack_require__(28);
    var alert = __webpack_require__(5);
    var msg = __webpack_require__(7);
    var common = __webpack_require__(29);
    function dispname(s) {
        var p = s.lastIndexOf('/');
        if (p === -1)
            p = s.lastIndexOf('\\');
        if (p === -1)
            return s;
        return s.substring(p + 1);
    }
    function afterOpenXmlFile(err, oddname, displayname, odddata, xmlname, xmldata) {
        if (!err) {
            // open with new odd
            openOddLoad(oddname, displayname, odddata, function () {
                finishOpenXml(xmlname, xmldata);
            });
        }
        else {
            // open with current odd
            finishOpenXml(xmlname, xmldata);
        }
    }
    function openXml() {
        // checked changes - the user can cancel if needed
        checkChange(function () {
            opensave.chooseOpenFile(function (err, name, data) {
                if (!err) { // if not cancelled - use data
                    // try to find the odd name
                    var oddname_1 = teimeta.initXml(name, data);
                    if (!oddname_1) {
                        // find an odd and then this function will open the XML
                        findOdd(name, data);
                    }
                    else if (oddname_1 === teimeta.teiData.oddName) {
                        // same as current odd
                        // do not reload - open XML
                        finishOpenXml(name, data);
                    }
                    else if (oddname_1.substring(0, 4) !== "http") {
                        // an odd is indicated in the xml file
                        // it is not an external address 
                        // so cannot access directly if not electron
                        var displayname = dispname(oddname_1);
                        // open ODD then open XML
                        // find any odd including one on the current machine.
                        findOdd(name, data); // all odds
                        // common.openSpecificLocalFile(oddname, displayname, name, data, afterOpenXmlFile); // only on the current machine
                    }
                    else {
                        // an odd is indicated in the xml file
                        // try to open it
                        var displayname_1 = dispname(oddname_1);
                        // read ODD
                        teimeta.readTextFile(oddname_1, function (err, text) {
                            // console.log("read ODD: ", oddname, text);
                            if (!err) {
                                // load ODD
                                openOddLoad(oddname_1, displayname_1, text, function () {
                                    // then open XML
                                    finishOpenXml(name, data);
                                });
                            }
                        });
                    }
                }
                else
                    console.log("error on openXml", name, err);
            });
        });
    }
    exports.openXml = openXml;
    ;
    function loadOddPredefs(c, choice, nameXml, dataXml) {
        function afterReadOddPredefs(cs) {
            var n = cs[c];
            if (n && n.odd) {
                if (n.css && n.css !== "#clean#") {
                    oddCssLoadUrls(n.odd, n.label, n.css, n.labelcss, function () {
                        finishOpenXml(nameXml, dataXml);
                    });
                }
                else {
                    if (n.css === "#clean#") {
                        cleanCss();
                    }
                    oddLoadUrl(n.odd, n.label, function () {
                        finishOpenXml(nameXml, dataXml);
                    });
                }
            }
            else {
                console.log('loadOddPredefs: bad number in choice:', choice, cs);
                alert.alertUser('bad number in choice: ' + choice);
            }
        }
        common.oddpredefs(afterReadOddPredefs);
    }
    /**
     * method findOdd
     * ask the user for choices: open ODD, use predefined ODD, use previous ODD (if possible)
     */
    function findOdd(nameXml, dataXml) {
        function openChooseOdd(choice) {
            switch (choice) {
                case 'computer':
                    // open local odd
                    opensave.chooseOpenFile(function (err, name, data) {
                        if (!err) {
                            openOddLoad(name, name, data, function () {
                                finishOpenXml(nameXml, dataXml);
                            });
                        }
                        else {
                            console.log('cancel open odd for xml file: ', nameXml);
                        }
                    });
                    break;
                case 'current':
                    // open with current odd
                    finishOpenXml(nameXml, dataXml);
                    break;
                default:
                    if (choice && choice.substring(0, 6) === 'aumoid') {
                        var c = choice.substring(6);
                        if (isNaN(parseInt(c))) {
                            console.log('bad choice:', choice, "[", c, "]");
                            alert.alertUser('bad choice: ' + choice + " [" + c + "]");
                            return;
                        }
                        loadOddPredefs(c, choice, nameXml, dataXml);
                    }
                    break;
            }
        }
        if (teimeta.teiData.dataOdd) {
           common.askUserModalForOdd(teimeta.teiData.oddName, true, openChooseOdd);
        }
        else {
           common.askUserModalForOdd('', false, openChooseOdd);
        }
    }

    exports.findOdd = findOdd; //Added by Lionel

    function cleanCss() {
        teimeta.teiData.cssName = "";
        teimeta.teiData.dataCss = "";
        var el = document.getElementById('cssname');
        if (el)
            el.innerHTML = "CSS: ";
        var js = JSON.stringify({ data: "", cssName: "" });
        localStorage.setItem("previousCSS", js);
    }
    exports.cleanCss = cleanCss;
    function finishOpenXml(name, data) {
        function finishIt() {
            teimeta.loadXml(name, data);
            el = document.getElementById('teidata');
            if (el) {
                el.innerHTML = teimeta.teiData.html;
            }
            else {
                alert.alertUser('HTML error: see console log1');
                console.log('no <div id="teidata"></div> element defined in HTML. Cannot load TEIMETA html form.');
            }
            teimeta.finalizeHTML();
            //console.log("openfile TEI", teimeta.teiData.dataTei);
            //console.log(edit.values);
        }
        teimeta.teiData.fileName = name ? name : msg.msg('newfile');
       // /*Commeted by Lionel 
        var el = document.getElementById('filename'); 
        el.innerHTML = msg.msg('file') + teimeta.teiData.fileName;
        //*/
        // test if cssfile is needed
        if (teimeta.teiData.dataOdd && teimeta.teiData.dataOdd.cssfile) {
            testCss(teimeta.teiData.dataOdd.cssfile, finishIt);
        }
        else
            finishIt();
    }
    exports.finishOpenXml = finishOpenXml; // Added by Lionel
    function testCss(cssname, fun) {
        function afterOpenCssFile(err, cssname, displayname, cssdata, unused1, unused2) {
            if (!err) {
                openCssLoad(cssname, displayname, cssdata);
                if (fun)
                    fun();
            }
        }
        if (!cssname) {
            // nothing to do
            if (fun)
                fun();
            return;
        }
        else if (cssname === teimeta.teiData.cssName) {
            // same as current css
            // do not reload
            if (fun)
                fun();
            return;
        }
        else if (cssname.substring(0, 4) !== "http") {
            // an css is indicated in the odd file
            // it is not an external address so cannot access directly if not electron
            var displayname = dispname(cssname);
            common.openSpecificLocalFile(cssname, cssname, teimeta.teiData.oddName, null, afterOpenCssFile);
        }
        else {
            // an odd is indicated in the xml file
            // try to open it
            var displayname_2 = dispname(cssname);
            teimeta.readTextFile(cssname, function (err, text) {
                // console.log("read ODD: ", oddname, text);
                if (!err) {
                    openCssLoad(cssname, displayname_2, text);
                    if (fun)
                        fun();
                }
            });
        }
    }
    function newXml(choice) {
        // checked changes
        checkChange(function () {
            if (choice !== 'previous') {
                // find an odd
                findOdd(msg.msg('newfile'), null);
            }
            else {
                try {
                    var ls = localStorage.getItem("previousODD");
                    if (ls) {
                        var js = JSON.parse(ls);
                        if (!js.version || js.version !== teimeta.teiData.version) {
                            //console.log('ancienne version de localstorage');
                            //emptyFile();
                            return;
                        }
                        var lcss = localStorage.getItem("previousCSS");
                        var jcss = JSON.parse(lcss);
                        // console.log('newfile CSS', jcss);
                        if (lcss) {
                            openCssLoad(jcss.cssName, jcss.cssName, jcss.data);
                        }
                        openOddLoad(js.oddName, js.oddName, js.data, function () {
                            //alert.alertUser('here is previous');
                            finishOpenXml(msg.msg('newfile'), null);
                        });
                    }
                    else {
                       // emptyFile();
                    }
                }
                catch (error) {
                    console.log("newXml: catch", error);
                    emptyFile();
                }
            }
        });
    }
    exports.newXml = newXml;
    function dumpHtml() {
        //    common.saveFileLocal("html", "page.html", teimeta.teiData.html);
        var t = document.getElementById('teidata');
        if (t) {
            var tc = t.innerHTML;
            common.saveFileLocal("html", "page.html", tc);
            console.log('using innerHTML');
        }
        else {
            common.saveFileLocal("html", "page.html", teimeta.teiData.html);
            console.log('using teimeta.teiData.html');
        }
    }
    exports.dumpHtml = dumpHtml;
    function checkChange(fun) {
        if (teimeta.teiData.edit.change() === false) {
            fun();
            return;
        }
        common.askUserModalYesNoCancel(msg.msg('askforsave'), function (ret) {
            if (ret === 'yes') { //save
                if (teimeta.teiData.system === 'electron') {
                    save(fun);
                }
                else {
                    saveAsLocal(fun);
                }
            }
            else if (ret === 'no') {
                fun(); // do not save
            }
            else {
                return; // cancel
            }
        });
    }
    exports.checkChange = checkChange;
    function reLoad(callback) {
        try {
            var ls = localStorage.getItem("previousODD");
            var lx_1 = localStorage.getItem("previousXML");
            var lxname_1 = localStorage.getItem("previousXMLName");
            if (ls && lx_1) {
                var js = JSON.parse(ls);
                if (!js.version || js.version !== teimeta.teiData.version) {
                    //console.log('ancienne version de localstorage');
                    emptyFile();
                    if (callback)
                        callback(0);
                    return;
                }
                var lcss = localStorage.getItem("previousCSS");
                var jcss = JSON.parse(lcss);
                // console.log('newfile CSS', jcss);
                if (lcss) {
                    openCssLoad(jcss.cssName, jcss.cssName, jcss.data);
                }
                openOddLoad(js.oddName, js.oddName, js.data, function () {
                    finishOpenXml(lxname_1, lx_1);
                    if (callback)
                        callback(0);
                });
            }
            else {
                emptyFile();
            }
        }
        catch (error) {
            console.log("reLoad", error);
            emptyFile();
        }
    }
    exports.reLoad = reLoad;
    function openOddCssLoad(nameOdd, dispNameOdd, dataOdd, nameCss, dispNameCss, dataCss, callback) {
        openCssLoad(nameCss, dispNameCss, dataCss);
        openOddLoad(nameOdd, dispNameOdd, dataOdd, callback);
    }
    exports.openOddCssLoad = openOddCssLoad;
    function openOddLoad(name, displayname, data, callback) {
        function finishOL() {
            var el = document.getElementById('cssname');
            if (el)
                el.innerHTML = "CSS: " + teimeta.teiData.cssName;
            var js = JSON.stringify({ data: data, oddName: name, version: teimeta.teiData.version });
            localStorage.setItem("previousODD", js);
            callback(true);
        }
        function intermediateOL(v) {
            //console.log(name, displayname, 'return from teimeta.initOdd', v);
            if (v === false) {
                //console.log('no processing after teimeta.initOdd');
                callback(false);
            }
            var el = document.getElementById('oddname');
            if (el)
                el.innerHTML = "ODD: " + displayname;
            //console.log(name, displayname, 'finishing the ODD loading');
            if (teimeta.teiData.dataOdd.cssfile) {
                testCss(teimeta.teiData.dataOdd.cssfile, finishOL);
            }
            else {
                finishOL();
            }
        }
        teimeta.initOdd(name, data, name, intermediateOL);
    }
    exports.openOddLoad = openOddLoad;
    function openOdd() {
        // checked changes
        checkChange(function () {
            // save in all cases and put in name + data
            saveStorage();
            var lxdata = localStorage.getItem("previousXML");
            var lxname = localStorage.getItem("previousXMLName");
            // find an odd
            findOdd(lxname, lxdata);
        });
    }
    exports.openOdd = openOdd;
    ;
    function openCssLoad(name, displayname, data) {
        var el = document.getElementById('cssname');
        if (el)
            el.innerHTML = "CSS: " + displayname;
        teimeta.initCss(name, data);
        // console.log("CSS: ", name, data);
        var js = JSON.stringify({ data: data, cssName: name });
        localStorage.setItem("previousCSS", js);
    }
    exports.openCssLoad = openCssLoad;
    function openCss() {
        // checked changes
        checkChange(function () {
            opensave.chooseOpenFile(function (err, name, data) {
                if (!err) {
                    // save in all cases and put in name + data
                    saveStorage();
                    openCssLoad(name, name, data);
                    reLoad(null);
                }
                else
                    console.log("openCss error", name, err);
            });
        });
    }
    exports.openCss = openCss;
    ;
    function emptyFile() {
        var dt = document.getElementById('teidata');
        if (dt !== null ) {
            console.log(dt) 
            dt['innerHTML'] = ''; // Lionel change
        }
        else {
            alert.alertUser('HTML error: see console log2');
            console.log('no <div id="teidata"></div> element defined in HTML. Cannot load TEIMETA html form.');
        }
        teimeta.teiData.oddName = msg.msg('nofilename');
        teimeta.teiData.fileName = msg.msg('nofilename');
        teimeta.teiData.cssName = msg.msg('nofilename');
        teimeta.teiData.new = true;
        var el = document.getElementById('oddname');
        el.innerHTML = "ODD: " + teimeta.teiData.oddName;
        el = document.getElementById('cssname');
        if (el)
            el.innerHTML = "CSS: " + teimeta.teiData.cssName;
        el = document.getElementById('filename');
        el.innerHTML = msg.msg('file') + teimeta.teiData.fileName;
    }
    exports.emptyFile = emptyFile;
    function saveAs(fun) {
        //console.log("saveAs");
        opensave.chooseSaveFile('xml', function (err, name) {
            if (!err) {
                teimeta.teiData.fileName = name;
                var el = document.getElementById('filename');
                el.innerHTML = msg.msg('file') + teimeta.teiData.fileName;
                var ed = teimeta.generateXml();
                opensave.saveFile(teimeta.teiData.fileName, ed);
                teimeta.teiData.edit.change(false);
                if (fun && typeof fun === "function")
                    fun();
            }
            else
                console.log('saveas cancelled', name, err);
        });
    }
    exports.saveAs = saveAs;
    ;
    function save(fun) {
        //console.log("save");
        if (teimeta.teiData.fileName !== msg.msg('newfile')) {
            var ed = teimeta.generateXml();
            teimeta.teiData.edit.change(false);
            opensave.saveFile(teimeta.teiData.fileName, ed);
            if (fun && typeof fun === 'function')
                fun();
        }
        else {
            return saveAs(fun);
        }
    }
    exports.save = save;
    ;
    function saveStorage() {
        var ed = teimeta.generateXml();
        localStorage.setItem("previousXML", ed);
        localStorage.setItem("previousXMLName", teimeta.teiData.fileName);
    }
    exports.saveStorage = saveStorage;

    function generateTEI() {
        var ed = teimeta.generateXml();
       return ed;
    }
    exports.generateTEI = generateTEI;
   
    ;
    function saveit(name, fun) {
        var ed = teimeta.generateXml();
        // console.log(ed);
        teimeta.teiData.edit.change(false);
        common.saveFileLocal('xml', name, ed);
        if (fun && typeof fun === 'function')
            fun();
    }
    function saveLocal(fun, force) {
        if (force === void 0) { force = false; }
        //console.log("saveLocal");
        if (teimeta.teiData.system === 'electron')
            return;
        var nf = msg.msg('newfile');
        if (teimeta.teiData.fileName === nf || force === true) {
            alert.promptUserModal("Please give the name of your new file: ", function (newname) {
                if (!newname)
                    return;
                teimeta.teiData.fileName = newname;
                var el = document.getElementById('filename');
                el.innerHTML = msg.msg('file') + teimeta.teiData.fileName;
                if (newname)
                    saveit(newname, fun);
            });
        }
        else {
            saveit(teimeta.teiData.fileName, fun);
        }
    }
    exports.saveLocal = saveLocal;
    ;
    function saveAsLocal(fun, force) {
        if (force === void 0) { force = false; }
        //console.log("saveAsLocal");
        if (teimeta.teiData.system === 'electron')
            return;
        alert.promptUserModal("Please give the name of your new file: ", function (newname) {
            if (!newname)
                return;
            teimeta.teiData.fileName = newname;
            var el = document.getElementById('filename');
            el.innerHTML = msg.msg('file') + teimeta.teiData.fileName;
            if (newname)
                saveit(newname, fun);
        });
    }
    exports.saveAsLocal = saveAsLocal;
    ;
    function oddLoadUrl(url, namedisplayed, fun) {
        teimeta.readTextFile(url, function (err, text) {
            if (!err) {
                openOddLoad(url, namedisplayed, text, fun);
            }
            else {
                console.log('error', err, 'reading', url, text);
                alert.alertUser('error ' + err + ' reading ' + url);
                fun();
            }
        });
    }
    exports.oddLoadUrl = oddLoadUrl;
    function oddCssLoadUrls(urlOdd, namedisplayedOdd, urlCss, namedisplayedCss, fun) {
        teimeta.readTextFile(urlOdd, function (err1, textOdd) {
            teimeta.readTextFile(urlCss, function (err2, textCss) {
                if (!err1 && !err2) {
                    openOddCssLoad(urlOdd, namedisplayedOdd, textOdd, urlCss, namedisplayedCss, textCss, fun);
                }
                else if (!err1 && err2) {
                    // odd ok but css bad.
                    console.log('error', err2, 'reading', urlCss);
                    alert.alertUser('error' + err2 + ' reading ' + urlCss + ": reading ODD file.");
                    openOddLoad(urlOdd, namedisplayedOdd, textOdd, fun);
                }
                else {
                    console.log('error', err1, 'reading', urlOdd, 'error', err2, 'reading', urlCss);
                    alert.alertUser('error ' + err1 + 'reading ' + urlOdd
                        + " error " + err2 + " reading " + urlCss);
                    return;
                }
            });
        });
    }
    exports.oddCssLoadUrls = oddCssLoadUrls;
    
    
    /***/ }),
    /* 2 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    /**
     * Author: Christophe Parisse
     * Module: teimeta.ts
     * handle the data for the triplet XML file, ODD file, CSS file.
     * so that to open, create and save an XML file it is only necessary to interface with this file
     * and the internal specificities are hidden from the external interface
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    var schema = __webpack_require__(3);
    var odd = __webpack_require__(4);
    var load = __webpack_require__(17);
    var edit = __webpack_require__(18);
    var generate = __webpack_require__(21);
    var alert = __webpack_require__(5);
    /*
    * internal values
    */
    exports.teiData = {
        oddName: '',
        cssName: '',
        fileName: '',
        dataOdd: null,
        dataCss: null,
        dataTei: null,
        html: null,
        new: true,
        parser: null,
        doc: null,
        system: '',
        protocol: '',
        edit: edit,
        params: new schema.PARAMS(),
        version: schema.version,
        init: function () {
            this.oddName = ''; // name of ODD file
            this.cssName = ''; // name of CSS file
            this.fileName = ''; // name of XML/TEI file
            this.dataOdd = null; // data to handle ODD
            this.dataCss = null; // data to handle css (CSScstring)
            this.dataTei = null; // data to handle xml data (by default TEI)
            this.html = null; // html content string
            this.new = true;
            this.parser = null; // DOM Parser
            this.doc = null; // DOM document
        }
    };
    /**
     * load an url - provided here for testing purposes and to make it easier to implement interfaces with teimeta
     * @param {string} file - url to be read
     * @param {FileCallback} callback - function executed after the call
     */
    function readTextFile(file, callback) {
        if (exports.teiData.protocol === 'file') {
            callback("cross origin with no http protocol", "cannot read protocol for " + file);
            return;
        }
        var rawFile = new XMLHttpRequest();
        rawFile.timeout = 4000; // Set timeout to 4 seconds (4000 milliseconds)
        // rawFile.overrideMimeType("text/xml");
        rawFile.responseType = "text";
        rawFile.open("GET", file, true);
        rawFile.onload = function (e) {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(0, rawFile.responseText);
            }
            else {
                callback(rawFile.status, "error reading " + file);
            }
        };
        rawFile.ontimeout = function () {
            callback("internet slow", "slow internet: cannot read " + file);
        };
        try {
            rawFile.send(null);
        }
        catch (e) {
            callback("internet down", "no internet: cannot read " + file);
        }
    }
    exports.readTextFile = readTextFile;
    function urlpathname(s) {
        var p = s.lastIndexOf('/');
        return (p >= 0) ? s.substring(0, p + 1) : s;
    }
    /**
     * to be executed after an HTMl string provided by teimeta has been loaded
     * necessary to implement automatic resize of entry fields
     */
    function finalizeHTML() {
        edit.finalize();
    }
    exports.finalizeHTML = finalizeHTML;
    /**
     * @method loadXml
     * this function takes as input the string content of the file to be open
     * the filename parameter is optional and is used for display
     * the function tries to find out whether the xml file contains the name of ODD file
     * @param filename
     * @param data
     * @returns 'ok' / 'odd' / 'css' / 'null'
     * the return values are stored in the data structure
     */
    function loadXml(filename, data) {
        if (!exports.teiData.dataOdd) {
            // without odd file it is impossible 
            // to load the XML so abort
            return false;
        }
        if (data === null) {
            // in this case, the XML is null, so we
            // just load a new XML which only the ODD
            exports.teiData.dataTei = null;
            exports.teiData.parser = null;
            exports.teiData.doc = null;
            load.loadTei(null, exports.teiData);
            exports.teiData.fileName = filename;
            exports.teiData.new = true;
        }
        else {
            if (filename !== exports.teiData.fileName) {
                // different files
                // so reinit
                exports.teiData.parser = null; // DOM Parser
                exports.teiData.doc = null; // DOM document
                exports.teiData.fileName = filename;
            }
            // now load XML
            load.loadTei(data, exports.teiData);
            exports.teiData.new = false;
        }
        var h; // result from generateHTML
        if (exports.teiData.dataCss) {
            var cssHtml = '<style id="cssstyle">' + exports.teiData.dataCss + '</style>\n';
            h = edit.generateHTML(exports.teiData);
            exports.teiData.html = cssHtml + h;
        }
        else {
            h = edit.generateHTML(exports.teiData);
            exports.teiData.html = h;
        }
        return true;
    }
    exports.loadXml = loadXml;
    /**
     * @method initXml
     * this function takes as input the string content of the file to be open
     * the filename parameter is optional and is used for display
     * the function tries to find out whether the xml file contains the name of ODD file
     * @param filename
     * @param data
     * @returns 'ok' / 'css' / 'null'
     * the return values are stored in the data structure
     */
    function initXml(filename, data) {
        exports.teiData.fileName = filename;
        return load.getOddFromXml(data, exports.teiData);
    }
    exports.initXml = initXml;
    /**
     * @method initOdd
     * this function takes as input the string content of the file to be open
     * the filename parameter is optional and is used for display
     * @param filename
     * @param data
     * @returns 'ok' / 'css' / 'null'
     * the return values are stored in the data structure
     */
    function initOdd(filename, data, urlmodel, finalProcess) {
        var impts = odd.loadOddClassRef(data);
        var eltSpecs = {};
        var eltRefs = {};
        if (impts && impts.length > 0) {
            console.log("imports", impts);
            // there are imports to be loaded.
            var p_1 = urlpathname(urlmodel);
            // for use with Node-style callbacks...
            var async = __webpack_require__(22);
            // var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
            var v = async.each(impts, function (ielt, callback) {
                console.log("read:", p_1 + ielt.source);
                readTextFile(p_1 + ielt.source, function (err, idata) {
                    console.log('finished read ', ielt, err);
                    if (err)
                        return callback(err);
                    try {
                        var ie = idata.toString();
                        var d = odd.loadOdd(ie);
                        console.log(p_1 + ielt.source, d);
                        if (d) {
                            for (var i in d.listElementSpec)
                                eltSpecs[i] = d.listElementSpec[i];
                            for (var i in d.listElementRef)
                                eltRefs[i] = d.listElementRef[i];
                        }
                        console.log(eltSpecs, eltRefs);
                    }
                    catch (e) {
                        return callback(e);
                    }
                    callback();
                });
            }, function (err) {
                if (err) {
                    console.error(err.message);
                    finalProcess(false);
                    return;
                }
                console.log('fin:', err, eltSpecs, eltRefs);
                // eltSpecs and eltRefs contains now all elementSpec and elementRef
                var o = odd.loadOdd(data, eltSpecs, eltRefs);
                console.log('return from odd.loadOdd', o);
                if (!o) {
                    console.error("cannot load ODD multiple");
                    finalProcess(false);
                    return;
                }
                exports.teiData.oddName = filename;
                exports.teiData.dataOdd = o;
                console.log('final return ok');
                finalProcess(true);
            });
        }
        else {
            var o = odd.loadOdd(data);
            console.log('return standalone ODD from odd.loadOdd', o);
            if (!o) {
                console.error("cannot load ODD Single");
                finalProcess(false);
                return;
            }
            exports.teiData.oddName = filename;
            exports.teiData.dataOdd = o;
            console.log('final return of standalone ODD');
            finalProcess(true);
        }
    }
    exports.initOdd = initOdd;
    /**
     * @method initCss
     * this function takes as input the string content of the file to be open
     * the filename parameter is optional and is used for display
     * @param filename
     * @param data
     * @returns 'ok' / 'null'
     * the return values are stored in the data structure
     */
    function initCss(filename, data) {
        exports.teiData.cssName = filename;
        exports.teiData.dataCss = data;
    }
    exports.initCss = initCss;
    /**
     * gather the new state of the XML object edited by teimeta
     * @return {string} - xml content edited by teimeta library
     */
    function generateXml() {
        return generate.generateTEI(exports.teiData);
    }
    exports.generateXml = generateXml;
    /**
     * @method loadXmlOddCss
     * this function takes as input the string content of all the data
     * filename parameters is optional (can be null) and are used for display
     * if dataCss is null, no css is used (unless included in dataOdd)
     * if dataXml is null, a new empty XML file is generated
     * dataOdd cannot be null - an ODD must be specified
     * @param {string} filenameXml - name of xml file
     * @param {string} dataXml - content of xml file
     * @param {string} filenameOdd - name of odd file
     * @param {string} dataOdd - content of odd file
     * @param {string} filenameCss - name of css file
     * @param {string} dataCss - content of css file
     * @returns 'ok' / 'null'
     * the return values are stored in the teiData structure
     */
    function loadXmlOddCss(filenameXml, dataXml, filenameOdd, dataOdd, filenameCss, dataCss, callback) {
        function finalXOC(r) {
            if (!r)
                callback('<div>Incorrect odd!</div>');
            else {
                loadXml(filenameXml, dataXml);
                callback(exports.teiData.html);
            }
        }
        if (dataCss)
            initCss(filenameCss, dataCss);
        if (!dataOdd) {
            alert.alertUser('no dataOdd in loadXmlOddCss: cannot edit xml/tei file');
            callback('<div>Missing odd!</div>');
        }
        initOdd(filenameOdd, dataOdd, urlpathname(filenameOdd), finalXOC);
    }
    exports.loadXmlOddCss = loadXmlOddCss;
    /**
     * @method readXmlOddCss
     * this function takes as input three urls
     * the urls are filenames that must be available though http protocol
     * if filenameCss is null, no css is used (unless included in filenameOdd)
     * if filenameXml is null, a new empty XML file is generated
     * filenameOdd cannot be null - an ODD must be specified
     * @param {string} filenameXml - name of xml file
     * @param {string} filenameOdd - name of odd file
     * @param {string} filenameCss - name of css file
     * @returns 'ok' / 'null'
     * the return values are stored in the teiData structure
     */
    function readXmlOddCss(filenameXml, filenameOdd, filenameCss, callback) {
        function loadXml(filename, oddname, odddata, cssname, cssdata) {
            if (filename) {
                readTextFile(filename, function (err, data) {
                    if (err) {
                        console.log('error : ', data);
                        alert.alertUser('error reading ' + filename + ' : ' + data);
                        return;
                    }
                    loadXmlOddCss(filename, data, oddname, odddata, cssname, cssdata, callback);
                });
            }
            else {
                loadXmlOddCss(null, null, oddname, odddata, cssname, cssdata, callback);
            }
        }
        function loadOdd(filename, cssname, cssdata) {
            if (filename) {
                readTextFile(filename, function (err, data) {
                    if (err) {
                        console.log('error : ', data);
                        alert.alertUser('error reading ' + filename + ' : ' + data);
                        return;
                    }
                    loadXml(filenameXml, filenameOdd, data, filenameCss, data);
                });
            }
            else {
                alert.alertUser('cannot run readXmlOddCss with null filenameOdd');
            }
        }
        if (filenameCss) {
            readTextFile(filenameCss, function (err, data) {
                if (err) {
                    console.log('error : ', data);
                    alert.alertUser('error reading ' + filenameCss + ' : ' + data);
                    return;
                }
                loadOdd(filenameOdd, filenameCss, data);
            });
        }
        else {
            loadOdd(filenameOdd, null, null);
        }
    }
    exports.readXmlOddCss = readXmlOddCss;
    
    
    /***/ }),
    /* 3 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    /**
     * schema.ts
     * @author Christophe Parisse
     * general structure that holds the schema that can be described in different formats
     * the description of the schema and the loading edition saving of the xml files are now independant
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.version = "3.3"; // version of the format
    var PARAMS = /** @class */ (function () {
        function PARAMS() {
            // Default PARAMETRES
            this.defaultNewElement = true; // if true the non existing elements are included by default
            this.leftShift = 5; // size in pixel of the hanging size of the imbrications
            this.groupingStyle = 'border'; // display style of the groups of duplicable elements
            this.validateRequired = false; // if true it is possible to not validate (ie remove) obligatory elements
            this.language = 'fr'; // language name of the desc fields
            this.displayFullpath = false; // display or not the full path of the tags
            this.canRemove = false; // allows to remove existing nodes
            this.fmt = '?:00:00'; // format for time length of media
            this.nbdigits = 0; // number of digits allowed in the decimal part of a number
            this.encodeXMLFull = false; // if true use entities.encodeXML otherwise only encodes < and >
        }
        return PARAMS;
    }());
    exports.PARAMS = PARAMS;
    var SCHEMA = /** @class */ (function () {
        function SCHEMA() {
            this.listElementSpec = {}; // all the elementSpec available here so as to be able to control and check
            this.listElementRef = {}; // all the elementRef available here so as to be able to control and check
            this.rootTEI = null; // pointer to schema root (start attribute of schemaSpec)
            this.rootIdent = ''; // value of the attribute ident in the root schemaSpec
            this.params = new PARAMS();
            this.namespace = ''; // namespace of the resulting xml
            this.altIdent = []; // other namespace information
            // entries = null; // entry points other than rootTEI - not used
            this.cssfile = ''; // information about user specified presentation
            this.remarks = false; // if there is some user css then don't use full css default design
        }
        SCHEMA.prototype.init = function () {
            this.listElementSpec = {}; // contains all elementSpec to access and check them easily
            this.listElementRef = {}; // conntains all elementRef to access and check them easily
            this.rootTEI = null; // pointer to the root of the schema (start attribute of schemaSpec)
            this.rootIdent = ''; // ident attribute of the root of the schemaSpec
        };
        return SCHEMA;
    }());
    exports.SCHEMA = SCHEMA;
    var ElementSpec = /** @class */ (function () {
        function ElementSpec() {
            // Information from the ODD
            this.ident = ''; // name of the element
            this.corresp = ''; // addon to the name (ident) to ensure unicity in the XML when several
            // node have the same name but a different presentation
            this.access = ''; // unique combinaison of ident+corresp that identify in unique manner elementSpec
            this.desc = null; // Desc type structure
            this.module = ''; // not used
            this.mode = ''; // not used
            this.content = null; // pointer the node children
            this.attr = []; // the attributes
            this.usage = ''; // field for usage: obligatory (req), recommended (rec), optional (opt ou '')
            // Information to edit the TEI
            this.absolutepath = '';
            this.validatedES = ''; // field to provide the status from the user
            // '' (empty) not validated or removed
            // 'del' = to be removed
            // 'ok' = validated field
            // 'edit' = field not to be removed but in editing process
            this.validatedESID = '';
            this.node = null; // pointing to the original elements of the DOM
            // if node === null then ex nihilo creation in an absolute xml path
            this.parentElementSpec = null; // pointer to parent element for validation when validating elementSpec
            this.style = ''; // style for presenting the data (block or hidden)
            this.remarks = null; // class Remarks for CSS presentation of the global element
            // remarksContent = null; // class Remarks for CSS presentation of the main field of content.datatype
            // if exist it is the datatype
            // either default style (empty) or user specified style
            this.recursive = false; // if true the node point another node that is above in the tree
        }
        return ElementSpec;
    }());
    exports.ElementSpec = ElementSpec;
    var Content = /** @class */ (function () {
        function Content() {
            this.sequencesRefs = []; // contains ElementCount with sequence or elementRef
            this.datatype = null; // information (format) for edition
        }
        return Content;
    }());
    exports.Content = Content;
    var DataType = /** @class */ (function () {
        function DataType() {
            this.type = ''; // format of the type to edit
            this.vallist = null; // utilisé si ensemble de valeurs prédéfinies
            this.valueContent = ''; // valeur du contenu quelque soit le format
            this.valueContentID = ''; // ID pour les callback
            this.parentElementSpec = null; // pointeur sur l'elementSpec à mettre à vrai si modifié
            // obligatory = false; // true if element cannot be removed
            this.remarks = null; // class Remarks for CSS presentation
        }
        return DataType;
    }());
    exports.DataType = DataType;
    var ElementCount = /** @class */ (function () {
        function ElementCount() {
            // the arrays contain extended elements
            // an extended element is an object that allows to handle
            // an unlimited number of duplicated elements, validated or not
            this.minOccurs = '1'; // 0, 1, 2, unbounded
            this.maxOccurs = '1'; // 0, 1, 2, unbounded
            this.model = null; // name of the elementSpec of reference (elementRef) or of several elementSpec (array for sequences)
            this.ident = null; // identifier
            this.corresp = null; // complement for the identifiant
            this.type = ''; // elementRef or sequence
            this.eCI = []; // element Count Items
            this.parentElementSpec = null; // pointer to parent element for validation when editing datatype
        }
        return ElementCount;
    }());
    exports.ElementCount = ElementCount;
    var ElementCountItem = /** @class */ (function () {
        function ElementCountItem() {
            this.type = '';
            this.model = null; // for a copy of the model of the parent
            this.element = null; // pointer ElementSpec to other elementSpec or to Sequence
            this.node = null; // used to find original nodes or new nodes 
            // if null then an element has to be created and added to the parent
            this.parentElementSpec = null; // pointer to parent element for validation when validating elementSpec
        }
        return ElementCountItem;
    }());
    exports.ElementCountItem = ElementCountItem;
    var Desc = /** @class */ (function () {
        function Desc() {
            // Informations de l'ODD
            this.langs = []; // coded languages
            this.texts = []; // as many as languages : the content of the description
            this.renditions = []; // as many as languages : a content supplementary values for lists
        }
        return Desc;
    }());
    exports.Desc = Desc;
    var AttrDef = /** @class */ (function () {
        function AttrDef() {
            // Information from the ODD
            // content of an attribute
            this.ident = '';
            this.rend = '';
            this.usage = ''; // field marquing use: obligatory (req), recommanded (rec), optional (opt or '')
            this.mode = '';
            this.desc = null;
            this.datatype = null;
        }
        return AttrDef;
    }());
    exports.AttrDef = AttrDef;
    var ValItem = /** @class */ (function () {
        function ValItem() {
            // Information from the ODD
            // list of items
            this.ident = '';
            this.desc = null; // type Desc structure
        }
        return ValItem;
    }());
    exports.ValItem = ValItem;
    var Remarks = /** @class */ (function () {
        function Remarks() {
            // Information from the ODD/CSS
            // for css presentation
            this.cssvalue = '';
            this.ident = '';
        }
        return Remarks;
    }());
    exports.Remarks = Remarks;
    /**
     * utilirary function to make a deep copy of elementSpec data
     * @param {Object} obj - elementSpec pointer
     * @return {Object} - the copy
     */
    function copyElementSpec(obj) {
        var cp = {};
        cp.ident = obj.ident; // nom de l'élément
        cp.desc = obj.desc;
        cp.corresp = obj.corresp;
        cp.access = obj.access;
        cp.module = obj.module;
        cp.rend = obj.rend;
        cp.mode = obj.mode; // change=oneOrMore, replace=one, add=zeroOrMore
        cp.validatedES = obj.validatedES; // is false element not used, si non element used
        cp.validatedESID = obj.validatedESID;
        cp.content = (obj.content !== null)
            ? copyContent(obj.content, cp)
            : null; // pointeur sur les enfants.
        cp.attr = (obj.attr !== null)
            ? copyAttr(obj.attr, cp)
            : null; // contenu pour l'édition du noeud lui même, champ texte, attributs et categories
        cp.absolutepath = obj.absolutepath;
        cp.parentElementSpec = obj.parentElementSpec;
        cp.node = null; // utilisé pour retrouver les éléments orignaux
        cp.remarks = obj.remarks;
        return cp;
    }
    exports.copyElementSpec = copyElementSpec;
    /**
     * copy of content within an elementSpec
     * @param obj
     * @param parent
     */
    function copyContent(obj, parent) {
        var cp = {};
        cp.datatype = (obj.datatype) ? copyDataType(obj.datatype, parent) : null;
        cp.rend = obj.rend;
        cp.sequencesRefs = [];
        cpBloc(cp.sequencesRefs, obj.sequencesRefs);
        return cp;
    }
    /**
     * copy of array of children nodes within a elementSpec - recursive function
     * @param cp
     * @param obj
     */
    function cpBloc(cp, obj) {
        for (var i in obj) {
            var inner = {};
            inner.minOccurs = obj[i].minOccurs; // oneOrMore, one, zeroOrMore, twoOrMore
            inner.maxOccurs = obj[i].maxOccurs; // oneOrMore, one, zeroOrMore, twoOrMore
            inner.model = obj[i].model; // model is never modified
            inner.ident = obj[i].ident; // ident is never modified
            inner.corresp = obj[i].corresp; // corresp is never modified
            inner.type = obj[i].type;
            inner.parent = obj[i].parent;
            inner.eCI = []; // element Count Items
            // copy of eCI is not necessary: elements not modified or handled in load.ts
            cp.push(inner);
        }
    }
    /**
     * copy of attribute within a elementSpec
     * @param oldattr
     * @param parent
     */
    function copyAttr(oldattr, parent) {
        var newattr = [];
        for (var _i = 0, oldattr_1 = oldattr; _i < oldattr_1.length; _i++) {
            var obj = oldattr_1[_i];
            var cp = {};
            cp.ident = obj.ident; // name of the element
            cp.rend = obj.rend;
            cp.usage = obj.usage; // req or nothing
            cp.mode = obj.mode;
            cp.desc = obj.desc;
            cp.datatype = (obj.datatype) ? copyDataType(obj.datatype, parent) : null;
            newattr.push(cp);
        }
        return newattr;
    }
    /**
     * copy of dataType within a elementSpec
     * @param obj
     * @param parent
     */
    function copyDataType(obj, parent) {
        var cp = {};
        cp.type = obj.type;
        cp.rend = obj.rend;
        cp.remarks = obj.remarks;
        cp.valueContent = obj.valueContent;
        cp.valueContentID = obj.valueContentID;
        cp.parentElementSpec = parent;
        cp.vallist = obj.vallist; // no duplication necessary because these elements wont be modified
        return cp;
    }
    // From Ben N.
    function stripBOM(content) {
        // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
        // because the buffer-to-string conversion in `fs.readFileSync()`
        // translates it to FEFF, the UTF-16 BOM.
        if (content.charCodeAt(0) === 0xFEFF) {
            content = content.slice(1);
        }
        return content;
    }
    exports.stripBOM = stripBOM;
    
    
    /***/ }),
    /* 4 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    /**
     * @module odd.ts
     * @author: Christophe Parisse
     * reading the odd file and get all information
     * that make it possible to edit the xml or the TEI
     * @exports loadOdd
     * @exports Element ElementCount ElementCountItem ElementSpec Content Attr Val ValItem
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    var alert = __webpack_require__(5);
    var msg = __webpack_require__(7);
    var schema = __webpack_require__(3);
    var entities = __webpack_require__(8);
    var xpath = __webpack_require__(16);
    var select;
    // import * as system from '../system/opensave';
    var listElementRef = {};
    function tagES(k, c) {
        return (c) ? k + '#' + c : k;
    }
    /**
     * @method getChildrenByName
     * get list of immediate children nodes with a given tagname
     * @param node
     * @param name
     * @returns [list of nodes]
     */
    function getChildrenByName(node, name, corresp) {
        if (corresp === void 0) { corresp = null; }
        var children = [];
        for (var child = 0; child < node.childNodes.length; child++) {
            if (node.childNodes[child].getAttribute && corresp) {
                // console.log(node.childNodes[child]);
                var a = node.childNodes[child].getAttribute('corresp');
                if (a !== corresp)
                    continue;
            }
            if (node.childNodes[child].nodeType === 1) {
                if (node.childNodes[child].tagName === name)
                    children.push(node.childNodes[child]);
            }
        }
        return children;
    }
    exports.getChildrenByName = getChildrenByName;
    /**
     * read a elementSpec in the ODD description from an odd node
     * @param elementspec
     * @param node
     */
    function readElementSpec(elementspec, node) {
        // find all about elementSpec
        var remarks = false;
        // récupérer tous les attributs potentiels
        elementspec.ident = node.getAttribute("ident");
        elementspec.corresp = node.getAttribute("corresp");
        elementspec.module = node.getAttribute("module");
        elementspec.mode = node.getAttribute("mode");
        elementspec.rend = node.getAttribute("rend"); // rend will not be used - signal it ?
        // les autres attributs sont ignorés
        elementspec.access = tagES(elementspec.ident, elementspec.corresp);
        // le champ desc
        var d = new schema.Desc();
        if (readDesc(d, node))
            elementspec.desc = d;
        // le champ content
        var c = new schema.Content();
        if (readContent(c, node))
            elementspec.content = c;
        // le champ remarksContent
        var rc = new schema.Remarks();
        if (readRemarks(rc, node, "element")) {
            remarks = true;
            elementspec.remarks = rc;
        }
        rc = new schema.Remarks();
        if (readRemarks(rc, node, "content")) {
            remarks = true;
            // elementspec.remarksContent = rc;
            if (elementspec.content.datatype) {
                elementspec.content.datatype.remarks = rc;
            }
            else {
                var s = msg.msg('remarksnodatatype');
                alert.alertUser(s);
            }
        }
        // le champ attr
        var a = getChildrenByName(node, 'attList');
        if (a.length > 0) {
            var ad = getChildrenByName(a[0], 'attDef');
            for (var i in ad) {
                var adv = new schema.AttrDef();
                if (readAttrDef(adv, ad[i])) {
                    remarks = true;
                }
                elementspec.attr.push(adv);
            }
        }
        return remarks;
    }
    /**
     * read a remarks description from the ODD
     * @param rm
     * @param node
     * @param style
     */
    function readRemarks(rm, node, style) {
        var d = getChildrenByName(node, 'remarks');
        for (var i in d) {
            var s = d[i].getAttribute('style');
            if (s === style || (style === 'element' && !s)) {
                var r = processRemarks(rm, d[i]);
                if (r) {
                    return rm;
                }
            }
        }
        return null;
    }
    /**
     * process a remarks description from the ODD
     * @param rm
     * @param node
     */
    function processRemarks(rm, node) {
        // ab field : must be unique
        rm.cssvalue = '';
        var d = getChildrenByName(node, 'ab');
        if (d.length > 1) {
            var s = msg.msg('remarksmultab');
            alert.alertUser(s);
            rm.cssvalue = d[0].textContent;
        }
        else if (d.length === 1) {
            rm.cssvalue = d[0].textContent;
        }
        // if no ab field, then the user can use the note fields
        // load the <p><ident> field if it exists
        // load the <p><note> fields (easier to use than the css)
        d = getChildrenByName(node, 'p');
        var warningmultipleident = false;
        for (var i in d) {
            var p = getChildrenByName(d[i], 'ident');
            var found = false;
            if (p.length > 1) {
                var s = msg.msg('remarksmultident');
                alert.alertUser(s);
            }
            if (p.length >= 1) {
                if (warningmultipleident === true) {
                    var s = msg.msg('remarksmultident');
                    alert.alertUser(s + ' ' + p[0].textContent);
                }
                warningmultipleident = true;
                rm.ident = p[0].textContent;
                found = true;
            }
            p = getChildrenByName(d[i], 'note');
            if (p.length > 0 && rm.cssvalue !== '') {
                var s = msg.msg('remarksabplusnote' + d[i].innerHTML + " " + rm.cssvalue);
                alert.alertUser(s);
                found = true;
            }
            else if (p.length > 0) {
                rm.cssvalue = '';
                for (var j in p) {
                    var a = p[j].getAttribute('type');
                    rm.cssvalue += ' ' + a + ':' + p[j].textContent + ';';
                }
                found = true;
            }
            if (found === false) {
                // by default p contains the same value as with ident
                var t = d[i].textContent;
                if (t) {
                    if (warningmultipleident === true) {
                        var s = msg.msg('remarksmultident');
                        alert.alertUser(s + ' ' + t);
                    }
                    warningmultipleident = true;
                    rm.ident = t;
                }
            }
        }
        return rm;
    }
    /**
     * find a datatype description from the ODD
     * @param node
     */
    function getDataRef(node) {
        var d = getChildrenByName(node, 'dataRef');
        if (d.length < 1)
            return '';
        var n = d[0].getAttribute('name');
        if (!n)
            return '';
        switch (n) {
            case 'string':
                return 'string';
            case 'multiline':
                return 'multiline';
            case 'decimal':
                return 'number';
            case 'NCName':
                return 'NCName';
            case 'integer':
                return 'number';
            case 'number':
                return 'number';
            case 'anyURI':
                return 'anyURI';
            case 'url':
                return 'url';
            case 'duration':
                return 'duration';
            case 'list':
                return 'list';
            case 'openlist':
                return 'openlist';
            case 'date':
                return 'date';
            case 'languagecode':
                return 'languagecode';
            case 'countrycode':
                return 'countrycode';
            default:
                console.log('unknow type for dataRef:', n, 'in', node.tagName);
                return 'string';
        }
    }
    /**
     * read a content description from the ODD
     * @param content
     * @param node
     */
    function readContent(content, node) {
        var d = getChildrenByName(node, 'content');
        if (d.length > 1) {
            // standard syntax is not more than one content ?
            console.log('more than one content in node: only first is processed', node.tagName);
        }
        if (d.length > 0) {
            content.rend = d[0].getAttribute('rend');
            if (!content.rend)
                content.rend = '';
            // find elementRef
            var e = getChildrenByName(d[0], 'elementRef');
            for (var ei in e) {
                var ec = new schema.ElementCount();
                getElementRef(ec, e[ei]);
                content.sequencesRefs.push(ec);
            }
            // find sequence
            e = getChildrenByName(d[0], 'sequence');
            for (var ei in e) {
                var ec = new schema.ElementCount();
                getSequence(ec, e[ei]);
                content.sequencesRefs.push(ec);
            }
            // find dataRef
            var ltype = getDataRef(d[0]); // si rien alors datatype === null
            // find textNode
            var t = getChildrenByName(d[0], 'textNode');
            if (t.length > 0) {
                content.datatype = new schema.DataType();
                if (ltype === '') {
                    content.datatype.type = 'string'; // type par defaut
                }
                else {
                    // sinon on respecte le type de dataRef
                    content.datatype.type = ltype;
                    content.datatype.rend = content.rend;
                }
            }
            else if (ltype !== '') {
                content.datatype = new schema.DataType();
                content.datatype.type = ltype;
                content.datatype.rend = content.rend;
            }
            // find if there are values predefined
            var vl = new schema.DataType();
            var n = valList(vl, d[0]);
            if (n > 0) {
                if (!content.datatype)
                    content.datatype = new schema.DataType();
                content.datatype.vallist = vl.vallist;
                // mettre une valeur par défaut s'il y en a une
                if (content.datatype.type === 'openlist' || vl.type === 'openlist')
                    content.datatype.type = 'openlist';
                else
                    content.datatype.type = 'list';
                if (!content.rend)
                    content.datatype.rend = vl.vallist[0].ident;
                else
                    content.datatype.rend = content.rend;
            }
        }
        return d.length;
    }
    /**
     * get mix max values for content from the ODD
     * @param elementCount
     * @param node
     */
    function getMinMax(elementCount, node) {
        var a = node.getAttribute('minOccurs');
        if (a)
            elementCount.minOccurs = a;
        a = node.getAttribute('maxOccurs');
        if (a)
            elementCount.maxOccurs = a;
    }
    /**
     * create content of elementCount reference
     * @param elementCount
     * @param node
     */
    function getElementRef(elementCount, node) {
        getMinMax(elementCount, node);
        elementCount.model = tagElementSpec(node);
        elementCount.ident = keyElementSpec(node);
        elementCount.corresp = correspElementSpec(node);
        elementCount.type = 'elementRef';
        if (listElementRef[elementCount.model] === undefined)
            listElementRef[elementCount.model] = 1;
        else
            listElementRef[elementCount.model]++;
    }
    /**
     * create content of elementCount sequence
     * @param elementCount
     * @param node
     */
    function getSequence(elementCount, node) {
        getMinMax(elementCount, node);
        elementCount.type = 'sequence';
        var s = getChildrenByName(node, 'elementRef');
        elementCount.model = [];
        elementCount.ident = [];
        elementCount.corresp = [];
        for (var i in s) {
            var t = keyElementSpec(s[i]);
            elementCount.ident.push(t);
            t = correspElementSpec(s[i]);
            elementCount.corresp.push(t);
            t = tagElementSpec(s[i]);
            elementCount.model.push(t);
            if (listElementRef[t] === undefined)
                listElementRef[t] = 1;
            else
                listElementRef[t]++;
        }
    }
    /**
     * construct a tag with corresp and key parts of a node
     * @param {Object} node
     * @return {string} tag value
     */
    function tagElementSpec(node) {
        var k = node.getAttribute('key');
        var c = node.getAttribute('corresp');
        return tagES(k, c);
    }
    /**
     * access the key part of a node
     * @param {Object} node
     * @return {string} key value
     */
    function keyElementSpec(node) {
        return node.getAttribute('key');
    }
    /**
     * access the corresp part of a node
     * @param {Object} node
     * @return {string} corresp value
     */
    function correspElementSpec(node) {
        return node.getAttribute('corresp');
    }
    /**
     * access to text value of a Desc
     * @param desc
     * @param lg
     */
    function textDesc(desc, lg) {
        if (!lg) {
            lg = 'en';
        }
        for (var i = 0; i < desc.langs.length; i++) {
            if (lg === desc.langs[i])
                return entities.decodeXML(desc.texts[i]);
        }
        // did not find language
        for (var i = 0; i < desc.langs.length; i++) {
            if ('en' === desc.langs[i])
                return entities.decodeXML(desc.texts[i]);
        }
        // if no english show first
        return entities.decodeXML(desc.texts.length > 0 ? desc.texts[0] : '');
    }
    exports.textDesc = textDesc;
    /**
     * access to rendition value of a Desc
     * @param desc
     * @param lg
     */
    function rendition(desc, lg) {
        if (lg === undefined)
            return desc.rendition.length > 0 ? desc.rendition[0] : '';
        for (var i = 0; i < desc.langs.length; i++) {
            if (lg === desc.langs[i])
                return desc.rendition[i];
        }
        return desc.rendition.length > 0 ? desc.rendition[0] : '';
    }
    /**
     * normalizes text value for XML
     * suppress XML tags
     * @param {string} s XML text
     * @return {string} cleaned text
     */
    function innerXml(s) {
        if (!s)
            return '';
        var pat = /\<.*?\>(.*)\<.*?\>/;
        var r = s.replace(/\n/g, ' ').match(pat);
        return (r) ? r[1] : s;
    }
    /**
     * read a Desc description from the ODD
     * @param desc
     * @param node
     * @return {numeric} length of desc
     */
    function readDesc(desc, node) {
        var d = getChildrenByName(node, 'desc');
        for (var i in d) {
            desc.texts.push(innerXml(d[i].textContent));
            desc.langs.push(d[i].getAttribute('xml:lang'));
            desc.renditions.push(d[i].getAttribute('rendition'));
        }
        return d.length;
    }
    /**
     * read an attribute description from the ODD
     * @param attrDef
     * @param node
     */
    function readAttrDef(attrDef, node) {
        var remarks = false;
        attrDef.ident = node.getAttribute('ident');
        attrDef.usage = node.getAttribute('usage');
        attrDef.mode = node.getAttribute('mode');
        attrDef.rend = node.getAttribute('rend');
        if (!attrDef.rend)
            attrDef.rend = '';
        // desc field
        var d = new schema.Desc();
        if (readDesc(d, node))
            attrDef.desc = d;
        attrDef.datatype = new schema.DataType();
        // datatype field
        var a = getChildrenByName(node, 'datatype');
        if (a.length > 0) {
            attrDef.datatype.type = getDataRef(a[0]);
        }
        else {
            attrDef.datatype.type = 'string';
        }
        attrDef.datatype.rend = attrDef.rend;
        var n = valList(attrDef.datatype, node);
        if (n > 0) {
            if (attrDef.datatype.vallistType) {
                var vlType = (attrDef.datatype.vallistType === 'closed') ? 'list' : attrDef.datatype.vallistType;
                attrDef.datatype.type = vlType;
            }
            else {
                // type not specified by valList: use datatype or default
                if (attrDef.datatype.type !== 'openlist')
                    attrDef.datatype.type = 'list';
            }
            if (!attrDef.rend)
                attrDef.datatype.rend = (attrDef.datatype.vallist.length > 0) ? attrDef.datatype.vallist[0].ident : "";
            else
                attrDef.datatype.rend = attrDef.rend;
        }
        var rc = new schema.Remarks();
        if (readRemarks(rc, node, "element")) {
            remarks = true;
            attrDef.datatype.remarks = rc;
        }
        return remarks;
    }
    /**
     * @method valList
     * compute list of values for an attributre
     * @param {Object} data - Attr structure
     * @param {Object} node - node of an ODD
     * @return {numeric} length of node
     */
    function valList(data, node) {
        var vl = node.getElementsByTagName("valList");
        if (vl.length > 0) {
            data.vallistType = vl[0].getAttribute("type");
            data.vallist = [];
            // find all about element
            var valItem = node.getElementsByTagName("valItem");
            for (var k = 0; k < valItem.length; k++) {
                var vi = new schema.ValItem();
                var attr = valItem[k].getAttribute("ident");
                if (attr)
                    vi.ident = attr;
                // desc field
                var d = new schema.Desc();
                if (readDesc(d, valItem[k])) {
                    vi.desc = d;
                }
                else {
                    d.langs = [''];
                    d.texts = [vi.ident];
                    d.renditions = [''];
                    vi.desc = d;
                }
                data.vallist.push(vi);
            }
        }
        return vl.length;
    }
    /**
     * @method loadOdd
     * parse all elementSpec from the odd and call sub routines for Content fields
     * @param data : content of an odd file
     * @return teiOdd structure (model data from the ODD)
     */
    function loadOdd(data, eltsSpecs, eltsRefs) {
        if (eltsSpecs === void 0) { eltsSpecs = null; }
        if (eltsRefs === void 0) { eltsRefs = null; }
        data = schema.stripBOM(data);
        listElementRef = {};
        var odd = new schema.SCHEMA();
        var error = '';
        var warning = '';
        // get XML ready
        var parser = new DOMParser();
        var doc;
        // let doc = parser.parseFromString(data, "text/xml");
        try {
            var datastring = data.toString();
            doc = parser.parseFromString(datastring, 'text/xml');
            if (doc.documentElement.nodeName === "parsererror") {
                alert.alertUser("The ODD file is not valid: Operation canceled." + doc.documentElement.innerHTML);
                console.log("Errors in ODD file", doc.documentElement.innerHTML);
                // } else {
                // console.log("No errors found");
            }
        }
        catch (e) {
            alert.alertUser("The ODD file is not valid: Operation canceled (catch) " + e.toString());
        }
        var ns = doc.documentElement.namespaceURI;
        select = xpath.useNamespaces({ "tei": ns });
        var schemaSpec = select("//tei:schemaSpec", doc);
        if (schemaSpec.length < 1) {
            var s = msg.msg('nooddinelementspec');
            alert.alertUser(s);
            return null;
        }
        // get attribute start
        var attr = schemaSpec[0].getAttribute("start");
        // function return value
        if (attr) {
            odd.init();
            odd.rootTEI = attr;
        }
        else {
            var s = msg.msg('norootattr');
            alert.alertUser(s);
            return null;
        }
        /* insert elements from included models */
        var duplicateOK = {};
        // add classRefs (elements from included classRef) if there are some
        if (eltsSpecs) {
            odd.listElementSpec = eltsSpecs;
            // list element that can be duplicated
            for (var i in eltsSpecs) {
                duplicateOK[i] = i;
            }
        }
        if (eltsRefs) {
            odd.listElementRef = eltsRefs;
        }
        // get attribute ident
        odd.rootIdent = schemaSpec[0].getAttribute("ident");
        // get all altIdent
        var eAlt = getChildrenByName(schemaSpec[0], 'altIdent');
        // read the elementSpec
        for (var i = 0; i < eAlt.length; i++) {
            var type = eAlt[i].getAttribute("type");
            var content = eAlt[i].textContent;
            // console.log("altIdent", type, content);
            odd.altIdent.push({ type: type, value: content });
        }
        // get all elementSpec
        var eSpec = getChildrenByName(schemaSpec[0], 'elementSpec');
        // get attribute namespace
        odd.namespace = schemaSpec[0].getAttribute("ns");
        // get attribute cssfile
        odd.cssfile = schemaSpec[0].getAttribute("rend");
        odd.remarks = false;
        // read the elementSpec
        for (var i = 0; i < eSpec.length; i++) {
            var es = new schema.ElementSpec();
            if (readElementSpec(es, eSpec[i])) {
                odd.remarks = true;
            }
            if (odd.listElementSpec[es.access]) {
                if (!duplicateOK[es.access])
                    error += msg.msg('redefelementspec') + es.access + '<br/>';
                // if in duplicateOK, the old element is replaced by the new one
                else
                    console.log('duplicate element: ' + es.access);
            }
            odd.listElementSpec[es.access] = es;
        }
        // get all listed elementRef
        for (var i in listElementRef)
            odd.listElementRef[i] = listElementRef[i];
        for (var i in odd.listElementRef) {
            // check if all elementRef exist as elementSpec
            if (!odd.listElementSpec[i]) {
                error += msg.msg('notdefelementref1') + '[' + i + ']' + msg.msg('notdefelementref2') + '<br/>';
            }
        }
        for (var i in odd.listElementSpec) {
            // check if all elementSpec exist as elementRef
            if (odd.listElementSpec[i].access !== odd.rootTEI && !odd.listElementRef[odd.listElementSpec[i].access]) {
                warning += msg.msg('notusedelementref1') + odd.listElementSpec[i].access + msg.msg('notusedelementref2') + '<br/>';
            }
        }
        var rootElt = odd.listElementSpec[odd.rootTEI];
        if (!rootElt) {
            error += msg.msg('nodefrootelement') + odd.rootTEI + '<br/>';
        }
        else {
            rootElt.usage = 'req';
        }
        if (error) {
            alert.alertUser(error);
            return null;
        }
        if (warning) {
            alert.alertUser(warning);
            console.log(warning);
        }
        return odd;
    }
    exports.loadOdd = loadOdd;
    /**
     * @method loadOddClassRef
     * parse all classRef of the odd and return list
     * @param data : content of odd file
     * @return array of { key: "", source: "" }
     */
    function loadOddClassRef(data) {
        data = schema.stripBOM(data);
        var error = '';
        var warning = '';
        // get XML ready
        var parser = new DOMParser();
        var doc;
        try {
            doc = parser.parseFromString(data.toString(), 'text/xml');
            if (doc.documentElement.nodeName === "parsererror") {
                alert.alertUser("The ODD file is not valid: Operation canceled (in loadOddClassRef)." + doc.documentElement.innerHTML);
                console.log("Errors in ODD file (loadOddClassRef).", doc.documentElement.innerHTML);
                // } else {
                // console.log("No errors found in loadOddClassRef");
            }
        }
        catch (e) {
            alert.alertUser("The ODD file is not valid: Operation canceled (in loadOddClassRef) (catch) " + e.toString());
        }
        var ns = doc.documentElement.namespaceURI;
        select = xpath.useNamespaces({ "tei": ns });
        var schemaSpec = select("//tei:schemaSpec", doc);
        if (schemaSpec.length < 1) {
            var s = msg.msg('nooddinelementspec');
            alert.alertUser(s);
            return null;
        }
        // get all classRef = including other files
        var classRefs = [];
        var cRef = getChildrenByName(schemaSpec[0], 'classRef');
        for (var i = 0; i < cRef.length; i++) {
            var key = cRef[i].getAttribute("key");
            var source = cRef[i].getAttribute("source");
            if (key && source) {
                classRefs.push({ key: key, source: source });
            }
            else {
                alert.alertUser('incorrect classRef specification for ' + cRef[0].toString());
            }
        }
        return classRefs;
    }
    exports.loadOddClassRef = loadOddClassRef;
    
    
    /***/ }),
    /* 5 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    /**
     * @module alert.ts
     * @author Christophe Parisse
     * display functions
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    var picoModal = __webpack_require__(6);
    /**
     * simple display of a blocking message without using window.alert()
     * @param {string} s text message
     */
    function alertUser(s) {
        picoModal(s).show();
    }
    exports.alertUser = alertUser;
    /**
     * no parameter callback
     * @callback VoidCallback
     */
    /**
     * simple display of a non-blocking message
     * @param {string} s text message
     * @param {VoidCallback} fun executed after closing the message
     */
    function alertUserModal(s, fun) {
        if (fun)
            picoModal(s).afterClose(fun).show();
        else
            picoModal(s).show();
    }
    exports.alertUserModal = alertUserModal;
    /**
     * ok vs. cancel parameter callback
     * @callback OkCancelCallback
     * @param {string} s - ok / cancel provided to the callback
     */
    /**
     * ask user for a yes / no answer and display a non-blocking message
     * @param {string} s text message
     * @param {OkCancelCallback} fun executed after closing the message - fun parameter contains response value
     */
    function promptUserModal(s, fun) {
        picoModal({
            content: "<p>" + s + "</p>" +
                "<p><input name='picomodalprompt' id='picomodalprompt'></input></p>" +
                "<p class='footer'>" +
                "<button class='cancel'>Cancel</button> " +
                "<button class='ok'>Ok</button>" +
                "</p>"
        }).afterCreate(function (modal) {
            modal.modalElem().addEventListener("click", function (evt) {
                if (evt.target && evt.target.matches(".ok")) {
                    modal.close(true);
                }
                else if (evt.target && evt.target.matches(".cancel")) {
                    modal.close(false);
                }
            });
            modal.modalElem().addEventListener("keydown", function (evt) {
                if (evt.key === "Enter" && !evt.target.matches(".cancel")) {
                    modal.close(true);
                }
            });
        }).afterClose(function (modal, event) {
            if (!event.detail) {
                fun('');
                modal.destroy();
                return;
            }
            var t = document.getElementById('picomodalprompt');
            if (t && t.value) {
                fun(t.value);
            }
            else {
                fun('');
            }
            modal.destroy();
        }).show();
    }
    exports.promptUserModal = promptUserModal;
    /**
     * one open parameter callback
     * @callback TextCallback
     * @param {string} s - open text value provided to the callback
     */
    /**
     * ask user for a text value and display a non-blocking message
     * @param {string} s text message
     * @param {TextCallback} fun executed after closing the message - fun parameter contains response value
     */
    function askUserModal(s, fun) {
        picoModal({
            content: "<p>" + s + "</p>" +
                "<p class='footer'>" +
                "<button class='cancel'>Cancel</button> " +
                "<button class='ok'>Ok</button>" +
                "</p>"
        }).afterCreate(function (modal) {
            modal.modalElem().addEventListener("click", function (evt) {
                if (evt.target && evt.target.matches(".ok")) {
                    modal.close(true);
                }
                else if (evt.target && evt.target.matches(".cancel")) {
                    modal.close();
                }
            });
            modal.modalElem().addEventListener("keydown", function (evt) {
                if (evt.key === "Enter" && !evt.target.matches(".cancel")) {
                    modal.close(true);
                }
            });
        }).afterClose(function (modal, event) {
            fun(event.detail ? true : false);
        }).show();
    }
    exports.askUserModal = askUserModal;
    
    
    /***/ }),
    /* 6 */
    /***/ (function(module, exports, __webpack_require__) {
    
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    
    (function (root, factory) {
        "use strict";
    
        if (true) {
            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
                    __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
                    (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
                    __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        }
        else {}
    }(this, function () {
    
        /**
         * A self-contained modal library
         */
        "use strict";
    
        /** Returns whether a value is a dom node */
        function isNode(value) {
            if ( typeof Node === "object" ) {
                return value instanceof Node;
            }
            else {
                return value && typeof value === "object" && typeof value.nodeType === "number";
            }
        }
    
        /** Returns whether a value is a string */
        function isString(value) {
            return typeof value === "string";
        }
    
        /**
         * Generates observable objects that can be watched and triggered
         */
        function observable() {
            var callbacks = [];
            return {
                watch: callbacks.push.bind(callbacks),
                trigger: function(context, detail) {
    
                    var unprevented = true;
                    var event = {
                        detail: detail,
                        preventDefault: function preventDefault () {
                            unprevented = false;
                        }
                    };
    
                    for (var i = 0; i < callbacks.length; i++) {
                        callbacks[i](context, event);
                    }
    
                    return unprevented;
                }
            };
        }
    
    
        /** Whether an element is hidden */
        function isHidden ( elem ) {
            // @see http://stackoverflow.com/questions/19669786
            return window.getComputedStyle(elem).display === 'none';
        }
    
    
        /**
         * A small interface for creating and managing a dom element
         */
        function Elem( elem ) {
            this.elem = elem;
        }
    
        /** Creates a new div */
        Elem.make = function ( parent, tag ) {
            if ( typeof parent === "string" ) {
                parent = document.querySelector(parent);
            }
            var elem = document.createElement(tag || 'div');
            (parent || document.body).appendChild(elem);
            return new Elem(elem);
        };
    
        Elem.prototype = {
    
            /** Creates a child of this node */
            child: function (tag) {
                return Elem.make(this.elem, tag);
            },
    
            /** Applies a set of styles to an element */
            stylize: function(styles) {
                styles = styles || {};
    
                if ( typeof styles.opacity !== "undefined" ) {
                    styles.filter = "alpha(opacity=" + (styles.opacity * 100) + ")";
                }
    
                for (var prop in styles) {
                    if (styles.hasOwnProperty(prop)) {
                        this.elem.style[prop] = styles[prop];
                    }
                }
    
                return this;
            },
    
            /** Adds a class name */
            clazz: function (clazz) {
                this.elem.className += " " + clazz;
                return this;
            },
    
            /** Sets the HTML */
            html: function (content) {
                if ( isNode(content) ) {
                    this.elem.appendChild( content );
                }
                else {
                    this.elem.innerHTML = content;
                }
                return this;
            },
    
            /** Adds a click handler to this element */
            onClick: function(callback) {
                this.elem.addEventListener('click', callback);
                return this;
            },
    
            /** Removes this element from the DOM */
            destroy: function() {
                this.elem.parentNode.removeChild(this.elem);
            },
    
            /** Hides this element */
            hide: function() {
                this.elem.style.display = "none";
            },
    
            /** Shows this element */
            show: function() {
                this.elem.style.display = "block";
            },
    
            /** Sets an attribute on this element */
            attr: function ( name, value ) {
                if (value !== undefined) {
                    this.elem.setAttribute(name, value);
                }
                return this;
            },
    
            /** Executes a callback on all the ancestors of an element */
            anyAncestor: function ( predicate ) {
                var elem = this.elem;
                while ( elem ) {
                    if ( predicate( new Elem(elem) ) ) {
                        return true;
                    }
                    else {
                        elem = elem.parentNode;
                    }
                }
                return false;
            },
    
            /** Whether this element is visible */
            isVisible: function () {
                return !isHidden(this.elem);
            }
        };
    
    
        /** Generates the grey-out effect */
        function buildOverlay( getOption, close ) {
            return Elem.make( getOption("parent") )
                .clazz("pico-overlay")
                .clazz( getOption("overlayClass", "") )
                .stylize({
                    display: "none",
                    position: "fixed",
                    top: "0px",
                    left: "0px",
                    height: "100%",
                    width: "100%",
                    zIndex: 10000
                })
                .stylize(getOption('overlayStyles', {
                    opacity: 0.5,
                    background: "#000"
                }))
                .onClick(function () {
                    if ( getOption('overlayClose', true) ) {
                        close();
                    }
                });
        }
    
        // An auto incrementing ID assigned to each modal
        var autoinc = 1;
    
        /** Builds the content of a modal */
        function buildModal( getOption, close ) {
            var width = getOption('width', 'auto');
            if ( typeof width === "number" ) {
                width = "" + width + "px";
            }
    
            var id = getOption("modalId", "pico-" + autoinc++);
    
            var elem = Elem.make( getOption("parent") )
                .clazz("pico-content")
                .clazz( getOption("modalClass", "") )
                .stylize({
                    display: 'none',
                    position: 'fixed',
                    zIndex: 10001,
                    left: "50%",
                    top: "38.1966%",
                    maxHeight: '90%',
                    boxSizing: 'border-box',
                    width: width,
                    '-ms-transform': 'translate(-50%,-38.1966%)',
                    '-moz-transform': 'translate(-50%,-38.1966%)',
                    '-webkit-transform': 'translate(-50%,-38.1966%)',
                    '-o-transform': 'translate(-50%,-38.1966%)',
                    transform: 'translate(-50%,-38.1966%)'
                })
                .stylize(getOption('modalStyles', {
                    overflow: 'auto',
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "5px"
                }))
                .html( getOption('content') )
                .attr("id", id)
                .attr("role", "dialog")
                .attr("aria-labelledby", getOption("ariaLabelledBy"))
                .attr("aria-describedby", getOption("ariaDescribedBy", id))
                .onClick(function (event) {
                    var isCloseClick = new Elem(event.target).anyAncestor(function (elem) {
                        return /\bpico-close\b/.test(elem.elem.className);
                    });
                    if ( isCloseClick ) {
                        close();
                    }
                });
    
            return elem;
        }
    
        /** Builds the close button */
        function buildClose ( elem, getOption ) {
            if ( getOption('closeButton', true) ) {
                return elem.child('button')
                    .html( getOption('closeHtml', "&#xD7;") )
                    .clazz("pico-close")
                    .clazz( getOption("closeClass", "") )
                    .stylize( getOption('closeStyles', {
                        borderRadius: "2px",
                        border: 0,
                        padding: 0,
                        cursor: "pointer",
                        height: "15px",
                        width: "15px",
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        fontSize: "16px",
                        textAlign: "center",
                        lineHeight: "15px",
                        background: "#CCC"
                    }) )
                    .attr("aria-label", getOption("close-label", "Close"));
            }
        }
    
        /** Builds a method that calls a method and returns an element */
        function buildElemAccessor( builder ) {
            return function () {
                return builder().elem;
            };
        }
    
    
        // An observable that is triggered whenever the escape key is pressed
        var escapeKey = observable();
    
        // An observable that is triggered when the user hits the tab key
        var tabKey = observable();
    
        /** A global event handler to detect the escape key being pressed */
        document.documentElement.addEventListener('keydown', function onKeyPress (event) {
            var keycode = event.which || event.keyCode;
    
            // If this is the escape key
            if ( keycode === 27 ) {
                escapeKey.trigger();
            }
    
            // If this is the tab key
            else if ( keycode === 9 ) {
                tabKey.trigger(event);
            }
        });
    
    
        /** Attaches focus management events */
        function manageFocus ( iface, isEnabled ) {
    
            /** Whether an element matches a selector */
            function matches ( elem, selector ) {
                var fn = elem.msMatchesSelector || elem.webkitMatchesSelector || elem.matches;
                return fn.call(elem, selector);
            }
    
            /**
             * Returns whether an element is focusable
             * @see http://stackoverflow.com/questions/18261595
             */
            function canFocus( elem ) {
                if (
                    isHidden(elem) ||
                    matches(elem, ":disabled") ||
                    elem.hasAttribute("contenteditable")
                ) {
                    return false;
                }
                else {
                    return elem.hasAttribute("tabindex") ||
                        matches(elem, "input,select,textarea,button,a[href],area[href],iframe");
                }
            }
    
            /** Returns the first descendant that can be focused */
            function firstFocusable ( elem ) {
                var items = elem.getElementsByTagName("*");
                for (var i = 0; i < items.length; i++) {
                    if ( canFocus(items[i]) ) {
                        return items[i];
                    }
                }
            }
    
            /** Returns the last descendant that can be focused */
            function lastFocusable ( elem ) {
                var items = elem.getElementsByTagName("*");
                for (var i = items.length; i--;) {
                    if ( canFocus(items[i]) ) {
                        return items[i];
                    }
                }
            }
    
            // The element focused before the modal opens
            var focused;
    
            // Records the currently focused element so state can be returned
            // after the modal closes
            iface.beforeShow(function getActiveFocus() {
                focused = document.activeElement;
            });
    
            // Shift focus into the modal
            iface.afterShow(function focusModal() {
                if ( isEnabled() ) {
                    var focusable = firstFocusable(iface.modalElem());
                    if ( focusable ) {
                        focusable.focus();
                    }
                }
            });
    
            // Restore the previously focused element when the modal closes
            iface.afterClose(function returnFocus() {
                if ( isEnabled() && focused ) {
                    focused.focus();
                }
                focused = null;
            });
    
            // Capture tab key presses and loop them within the modal
            tabKey.watch(function tabKeyPress (event) {
                if ( isEnabled() && iface.isVisible() ) {
                    var first = firstFocusable(iface.modalElem());
                    var last = lastFocusable(iface.modalElem());
    
                    var from = event.shiftKey ? first : last;
                    if ( from === document.activeElement ) {
                        (event.shiftKey ? last : first).focus();
                        event.preventDefault();
                    }
                }
            });
        }
    
        /** Manages setting the 'overflow: hidden' on the body tag */
        function manageBodyOverflow(iface, isEnabled) {
            var origOverflow;
            var body = new Elem(document.body);
    
            iface.beforeShow(function () {
                // Capture the current values so they can be restored
                origOverflow = body.elem.style.overflow;
    
                if (isEnabled()) {
                    body.stylize({ overflow: "hidden" });
                }
            });
    
            iface.afterClose(function () {
                body.stylize({ overflow: origOverflow });
            });
        }
    
        /**
         * Displays a modal
         */
        return function picoModal(options) {
    
            if ( isString(options) || isNode(options) ) {
                options = { content: options };
            }
    
            var afterCreateEvent = observable();
            var beforeShowEvent = observable();
            var afterShowEvent = observable();
            var beforeCloseEvent = observable();
            var afterCloseEvent = observable();
    
            /**
             * Returns a named option if it has been explicitly defined. Otherwise,
             * it returns the given default value
             */
            function getOption ( opt, defaultValue ) {
                var value = options[opt];
                if ( typeof value === "function" ) {
                    value = value( defaultValue );
                }
                return value === undefined ? defaultValue : value;
            }
    
    
            // The various DOM elements that constitute the modal
            var modalElem = build.bind(window, 'modal');
            var shadowElem = build.bind(window, 'overlay');
            var closeElem = build.bind(window, 'close');
    
            // This will eventually contain the modal API returned to the user
            var iface;
    
    
            /** Hides this modal */
            function forceClose (detail) {
                shadowElem().hide();
                modalElem().hide();
                afterCloseEvent.trigger(iface, detail);
            }
    
            /** Gracefully hides this modal */
            function close (detail) {
                if ( beforeCloseEvent.trigger(iface, detail) ) {
                    forceClose(detail);
                }
            }
    
            /** Wraps a method so it returns the modal interface */
            function returnIface ( callback ) {
                return function () {
                    callback.apply(this, arguments);
                    return iface;
                };
            }
    
    
            // The constructed dom nodes
            var built;
    
            /** Builds a method that calls a method and returns an element */
            function build (name, detail) {
                if ( !built ) {
                    var modal = buildModal(getOption, close);
                    built = {
                        modal: modal,
                        overlay: buildOverlay(getOption, close),
                        close: buildClose(modal, getOption)
                    };
                    afterCreateEvent.trigger(iface, detail);
                }
                return built[name];
            }
    
            iface = {
    
                /** Returns the wrapping modal element */
                modalElem: buildElemAccessor(modalElem),
    
                /** Returns the close button element */
                closeElem: buildElemAccessor(closeElem),
    
                /** Returns the overlay element */
                overlayElem: buildElemAccessor(shadowElem),
    
                /** Builds the dom without showing the modal */
                buildDom: returnIface(build.bind(null, null)),
    
                /** Returns whether this modal is currently being shown */
                isVisible: function () {
                    return !!(built && modalElem && modalElem().isVisible());
                },
    
                /** Shows this modal */
                show: function (detail) {
                    if ( beforeShowEvent.trigger(iface, detail) ) {
                        shadowElem().show();
                        closeElem();
                        modalElem().show();
                        afterShowEvent.trigger(iface, detail);
                    }
                    return this;
                },
    
                /** Hides this modal */
                close: returnIface(close),
    
                /**
                 * Force closes this modal. This will not call beforeClose
                 * events and will just immediately hide the modal
                 */
                forceClose: returnIface(forceClose),
    
                /** Destroys this modal */
                destroy: function () {
                    modalElem().destroy();
                    shadowElem().destroy();
                    shadowElem = modalElem = closeElem = undefined;
                },
    
                /**
                 * Updates the options for this modal. This will only let you
                 * change options that are re-evaluted regularly, such as
                 * `overlayClose`.
                 */
                options: function ( opts ) {
                    Object.keys(opts).map(function (key) {
                        options[key] = opts[key];
                    });
                },
    
                /** Executes after the DOM nodes are created */
                afterCreate: returnIface(afterCreateEvent.watch),
    
                /** Executes a callback before this modal is closed */
                beforeShow: returnIface(beforeShowEvent.watch),
    
                /** Executes a callback after this modal is shown */
                afterShow: returnIface(afterShowEvent.watch),
    
                /** Executes a callback before this modal is closed */
                beforeClose: returnIface(beforeCloseEvent.watch),
    
                /** Executes a callback after this modal is closed */
                afterClose: returnIface(afterCloseEvent.watch)
            };
    
            manageFocus(iface, getOption.bind(null, "focus", true));
    
            manageBodyOverflow(iface, getOption.bind(null, "bodyOverflow", true));
    
            // If a user presses the 'escape' key, close the modal.
            escapeKey.watch(function escapeKeyPress () {
                if ( getOption("escCloses", true) && iface.isVisible() ) {
                    iface.close();
                }
            });
    
            return iface;
        };
    
    }));
    
    
    /***/ }),
    /* 7 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    /**
     * messages.ts
     * author: Christophe Parisse
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    var shortHelp_fra = "\n<b>Usage:</b> Il faut d'abord charger un fichier ODD local (cliquer \"Ouvrir ODD\").</br>\nIl est possible d'\u00E9diter directement un nouveau fichier \u00E0 partir du ODD charg\u00E9 puis de \nle sauvegarder sous un nouveau nom (cliquer sur \"Sauver\").</br>\nIl est aussi possible de charger \u00E9galement un fichier XML (cliquer sur \"Ouvrir\").</br>\nDans ce cas, le fichier XML sera modifi\u00E9 selon les consignes de l'ODD. Les \u00E9l\u00E9ments XML non\nd\u00E9crits dans l'ODD ne seront pas modifi\u00E9s.</br>\nLa sauvegarde (cliquer sur \"Sauver\") se fait dans le r\u00E9pertoire de t\u00E9l\u00E9chargement (ou ailleurs selon les param\u00E8tres du navigateur web).</br>\n<br/>\n<i class=\"validate fa fa-size2 fa-bookmark fa-color-required\"></i> <i class=\"validate fa fa-size2 fa-bookmark fa-color-optional\"></i> indique qu'un \u00E9l\u00E9ment est inclus dans le fichier.</br>\n<i class=\"validate fa fa-size2 fa-bookmark-o fa-color-required\"></i> <i class=\"validate fa fa-size2 fa-bookmark-o fa-color-optional\"></i> indique qu'un \u00E9l\u00E9ment est supprim\u00E9 du fichier.</br>\n<i class=\"create fa fa-plus-square fa-color-expand\"></i> indique qu'un \u00E9l\u00E9ment ou un bloc peut \u00EAtre ajout\u00E9 au fichier. Il sera valid\u00E9 ou non en utilisant les icones pr\u00E9c\u00E9dentes.</br>\n<i class=\"hidebutton fa fa-size2 fa-star-half-o fa-color-toggle\"></i> permet de montrer ou cacher une partie du fichier.</br>\n</br>\nPour toute information (documentation, t\u00E9l\u00E9chargement), aller sur <a href=\"http://ct3.ortolang.fr/teimeta-doc/\" target=\"_blank\">http://ct3.ortolang.fr/teimeta-doc/</a><br/>\nPour t\u00E9l\u00E9charger les sources de ce logiciel, aller sur <a href=\"https://github.com/christopheparisse/teimeta\" target=\"_blank\">https://github.com/christopheparisse/teimeta</a><br/>\nPour signaler une erreur ou proposer une fonctionnalit\u00E9, aller sur <a href=\"https://github.com/christopheparisse/teimeta/issues\" target=\"_blank\">https://github.com/christopheparisse/teimeta/issues</a><br/>\n";
    var messages_fra = {
        norootattr: "Pas d'attribut racine (@start) dans le fichier ODD",
        remarksnodatatype: 'attention: remarks pour champ content sans datatype dans content: remarks ignoré',
        remarksmultab: "attention: plusieurs champs ab dans remarks. Seul le premier est utilisé",
        remarksabplusnote: "attention: le champ ab et le champ note sont présent: seul ab sera utilisé",
        nooddinelementspec: "Pas d'élément schemaSpec dans le fichier ODD",
        redefelementspec: 'ERREUR: redefinition de ',
        notdefelementref1: 'ERREUR: elementRef ',
        notdefelementref2: " n'est pas défini",
        notusedelementref1: 'ATTENTION: elementSpec ',
        notusedelementref2: " n'est pas utilisé",
        nodefrootelement: "Pas de définition pour l'élément racine ",
        toomanyelements: "Attention: trop d'éléments pour ",
        morethanoneroot: "Ficher invalide: Interdit d'avoir plus d'un élément racine",
        norootinodd: "Ficher invalide: pas d'élément racine dans le ODD",
        badtimeformat: 'Mauvais format de temps. Format correct: HhMmSs.ms',
        badtimeminutes: 'Mauvais format des minutes: entre 0 et 59',
        badtimeseconds: 'Mauvais format des secondes: entre 0 et 59',
        badtimeformat2: 'Mauvais format de temps. Format correct: H:M:S.ms',
        formatinseconds: "Format en secondes",
        askremove: 'Voulez vous supprimer cet élément et tous ses descendants ?',
        editvalue: '-saisir une valeur-',
        givevalue: "Donner la nouvelle valeur",
        nolistdatatype: "pas de liste de valeurs pour le datatype: ",
        leavinghtml: 'Il semble que vous avez édité quelque chose. Si vous partez sans sauver vos changements seront perdus.',
        title: "Edition de métadonnées TEI / ORTOLANG / CORLI",
        xmlopen: "Ouvrir",
        xmlsave1: "Sauver",
        xmlsave2: "Sauver le fichier XML",
        xmlsaveas: "Sauver sous ...",
        xmlnew: "Nouveau",
        oddapply: "Appliquer fichier ODD",
        cssapply: "Appliquer fichier CSS",
        cssclean: "Vider fichier CSS",
        menuhelp: "Aide",
        applyoddcss: "Appliquer ODD/CSS",
        oddpredef: "ODD prédéfinis",
        menuparam: "Paramètres",
        paramfullpath: "Afficher les chemins complets ",
        paramshift: "Décalage en pixels des imbrications: ",
        paramdefincl: "Elements vides ou absents inclus automatiquement ",
        paramsupprobl: "Autoriser la suppression des éléments obligatoires ",
        paramcanrm: "Autoriser la suppression d'éléments (sinon seulement modification) ",
        shorthelp: shortHelp_fra,
        versionname: "Version prototype de TEIMETA javascript : ",
        askforsave: "Le fichier n'est pas sauvegardé. Voulez vous le sauver, quitter sans sauver ou annuler ?",
        file: "Fichier: ",
        nofilename: "Pas de nom de fichier",
        predefoddmedia: 'Média (TEI)',
        predefoddolacdc: 'Olac DC',
        predefoddteispoken: 'TEI Oral',
        newfile: 'nouveau-fichier.xml',
        choicelanguage: 'Langues',
        predefodd: "ODD prédéfinis",
        ok: 'OK',
        cancel: 'Annuler',
        pleaseloadcss1: "Le fichier CSS original ",
        pleaseloadcss2: " est absent: voulez vous le charger ?",
        usedefaultcss: "Le fichier CSS est absent. La CSS par défaut sera utilisée",
        pleaseloadodd1: "Le fichier ODD ",
        pleaseloadodd2: " est absent: vous devez indiquer son emplacement.",
        nooddavailable: "Le fichier ODD est absent. Il est impossible d'éditer le fichier XML.",
        askoddInfo: "Vous devez choisir un fichier ODD.",
        askoddCurrent: "Utiliser le fichier ODD actuel ",
        askoddLocalOdd: "Choisir un fichier ODD sur votre ordinateur",
        askoddPredef: "Choisir un fichier ODD prédéfini",
        paramlinks: "Paramètres / Liens",
    };
    var messages_spa = {
        norootattr: "Sin atributo raíz (@start) en el archivo ODD",
        /*
            remarksnodatatype: 'attention: remarks pour champ content sans datatype dans content: remarks ignoré',
            remarksmultab: "attention: plusieurs champs ab dans remarks. Seul le premier est utilisé",
            remarksabplusnote: "attention: le champ ab et le champ note sont présent: seul ab sera utilisé",
            nooddinelementspec: "Pas d'élément schemaSpec dans le fichier ODD",
            redefelementspec: 'ERREUR: redefinition de ',
            notdefelementref1: 'ERREUR: elementRef ',
            notdefelementref2: " n'est pas défini",
            notusedelementref1: 'ATTENTION: elementSpec ',
            notusedelementref2: " n'est pas utilisé",
            nodefrootelement: "Pas de définition pour l'élément racine ",
            toomanyelements: "Attention: trop d'éléments pour ",
            morethanoneroot: "Ficher invalide: Interdit d'avoir plus d'un élément racine",
            norootinodd: "Ficher invalide: pas d'élément racine dans le ODD",
            badtimeformat: 'Mauvais format de temps. Format correct: HhMmSs.ms',
            badtimeminutes: 'Mauvais format des minutes: entre 0 et 59',
            badtimeseconds: 'Mauvais format des secondes: entre 0 et 59',
            badtimeformat2: 'Mauvais format de temps. Format correct: H:M:S.ms',
            formatinseconds: "Format en secondes",
            askremove: 'Voulez vous supprimer cet élément et tous ses descendants ?',
            editvalue: '-saisir une valeur-',
            givevalue: "Donner la nouvelle valeur",
            nolistdatatype: "pas de liste de valeurs pour le datatype: ",
            leavinghtml: 'Il semble que vous avez édité quelque chose. Si vous partez sans sauver vos changements seront perdus.',
        */
        title: "Editar metadatos TEI / ORTOLANG / CORLI",
        xmlopen: "Abrir",
        xmlsave1: "Guardar",
        xmlsave2: "Guardar XML archivo",
        xmlsaveas: "Guardar como ...",
        xmlnew: "Nuevo",
        oddapply: "Aplicar el archivo ODD",
        cssapply: "Aplicar el archivo CSS",
        cssclean: "Limpiar el archivo CSS",
        menuhelp: "Ayuda",
        applyoddcss: "Aplicar ODD/CSS",
        oddpredef: "ODD predefinida:",
        oddteispoken: "TEI Oral",
        oddolac: "Olac/DC",
        oddmedia: "Medios",
        menuparam: "Configuraciones",
        paramfullpath: "Ver rutas completas ",
        paramshift: "Desplazamiento de píxeles de las anidaciones: ",
        paramdefincl: "Elementos vacíos o faltantes incluidos automáticamente ",
        paramsupprobl: "Permitir la eliminación de elementos obligatorios ",
        paramcanrm: "Permitir eliminación de elementos (si no solo cambio) ",
        /*
            shorthelp: shortHelp_fra,
            versionname: "Version prototype de TEIMETA javascript : ",
            askforsave: "Le fichier n'est pas sauvegardé. Voulez vous le sauver, quitter sans sauver ou annuler ?",
            file: "Fichier: ",
            nofilename: "Pas de nom de fichier",
            predefoddmedia: 'Média (TEI)',
            predefoddolacdc: 'Olac DC',
            predefoddteispoken: 'TEI Oral',
            newfile: 'nouveau-fichier.xml',
        */
        choicelanguage: 'Languages',
        predefodd: "ODD predefinda",
        ok: 'OK',
        cancel: 'Cancelar',
        paramlinks: "Parameters / Links",
    };
    var messages_jpn = {
        norootattr: "ODDファイルにルート属性（@start）がありません",
        /*
            remarksnodatatype: 'attention: remarks pour champ content sans datatype dans content: remarks ignoré',
            remarksmultab: "attention: plusieurs champs ab dans remarks. Seul le premier est utilisé",
            remarksabplusnote: "attention: le champ ab et le champ note sont présent: seul ab sera utilisé",
            nooddinelementspec: "Pas d'élément schemaSpec dans le fichier ODD",
            redefelementspec: 'ERREUR: redefinition de ',
            notdefelementref1: 'ERREUR: elementRef ',
            notdefelementref2: " n'est pas défini",
            notusedelementref1: 'ATTENTION: elementSpec ',
            notusedelementref2: " n'est pas utilisé",
            nodefrootelement: "Pas de définition pour l'élément racine ",
            toomanyelements: "Attention: trop d'éléments pour ",
            morethanoneroot: "Ficher invalide: Interdit d'avoir plus d'un élément racine",
            norootinodd: "Ficher invalide: pas d'élément racine dans le ODD",
            badtimeformat: 'Mauvais format de temps. Format correct: HhMmSs.ms',
            badtimeminutes: 'Mauvais format des minutes: entre 0 et 59',
            badtimeseconds: 'Mauvais format des secondes: entre 0 et 59',
            badtimeformat2: 'Mauvais format de temps. Format correct: H:M:S.ms',
            formatinseconds: "Format en secondes",
            askremove: 'Voulez vous supprimer cet élément et tous ses descendants ?',
            editvalue: '-saisir une valeur-',
            givevalue: "Donner la nouvelle valeur",
            nolistdatatype: "pas de liste de valeurs pour le datatype: ",
            leavinghtml: 'Il semble que vous avez édité quelque chose. Si vous partez sans sauver vos changements seront perdus.',
        */
        title: "メタデータの編集 TEI / ORTOLANG / CORLI",
        xmlopen: "開いた",
        xmlsave1: "セーブ",
        xmlsave2: "セーブ XML file",
        xmlsaveas: "セーブ as ...",
        xmlnew: "新しい",
        oddapply: "Apply ODD file",
        cssapply: "Apply CSS file",
        cssclean: "Clean CSS file",
        menuhelp: "助けて",
        applyoddcss: "Apply ODD/CSS",
        oddpredef: "定義済みODD",
        oddteispoken: "TEI 話された",
        oddolac: "Olac/DC",
        oddmedia: "メディア",
        menuparam: "パラメーター",
        paramfullpath: "完全なパスを表示する ",
        paramshift: "ネスティングのピクセルオフセット: ",
        paramdefincl: "空または不足要素が自動的に含まれる ",
        paramsupprobl: "必須要素の削除を許可する ",
        paramcanrm: "アイテムの削除を許可する（変更だけでなく） ",
        /*
            shorthelp: shortHelp_fra,
            versionname: "Version prototype de TEIMETA javascript : ",
            askforsave: "Le fichier n'est pas sauvegardé. Voulez vous le sauver, quitter sans sauver ou annuler ?",
            file: "Fichier: ",
            nofilename: "Pas de nom de fichier",
            predefoddmedia: 'Média (TEI)',
            predefoddolacdc: 'Olac DC',
            predefoddteispoken: 'TEI Oral',
            newfile: 'nouveau-fichier.xml',
        */
        choicelanguage: '語',
        predefodd: "定義済みODD",
        ok: 'OK',
        cancel: 'キャンセル',
        paramlinks: "Parameters / Links",
    };
    var shortHelp_eng = "\n<b>Usage:</b> It is first necessary to load a local ODD file (click \"Open ODD\") or a predefined ODD.</br>\nIt is possible to edit directly a new file starting from the ODD and then \nsave it with a new name (click \"Save\").</br>\nIt is also possile to load an XML file after choosing the ODD (click \"Open\").</br>\nIn this case, the XML file will be modified according to the specifications of the ODD. The XML elemets\nnot described in the ODD will not be modified in any way.</br>\nSaving (click \"Save\") is performed in the download directory (or elsewhere, according to the web browser parameters).</br>\n<br/>\n<i class=\"validate fa fa-size2 fa-bookmark fa-color-required\"></i> <i class=\"validate fa fa-size2 fa-bookmark fa-color-optional\"></i> indicate whether an element is included in the file or not.</br>\n<i class=\"validate fa fa-size2 fa-bookmark-o fa-color-required\"></i> <i class=\"validate fa fa-size2 fa-bookmark-o fa-color-optional\"></i> indicate if an element is removed or not.</br>\n<i class=\"create fa fa-plus-square fa-color-expand\"></i> indicate whether an element or a bloc can be added to the file. It will be validated or not using the previous icons.</br>\n<i class=\"hidebutton fa fa-size2 fa-star-half-o fa-color-toggle\"></i> allows to show or hide part of the file.</br>\n</br>\nFor all information (downloading, documentation), go to <a href=\"http://ct3.ortolang.fr/teimeta-doc/\" target=\"_blank\">http://ct3.ortolang.fr/teimeta-doc/</a><br/>\nTo download the sources of the tool, go to <a href=\"https://github.com/christopheparisse/teimeta\" target=\"_blank\">https://github.com/christopheparisse/teimeta</a><br/>\nTo signal an error or a problem, or ask for improvments, go to <a href=\"https://github.com/christopheparisse/teimeta/issues\" target=\"_blank\">https://github.com/christopheparisse/teimeta/issues</a><br/>\n";
    var messages_eng = {
        norootattr: "No root attribut (@start) in the ODD file",
        remarksnodatatype: 'warning: remarks for content without datatype in content: remarks ignored',
        remarksmultab: "warning: multiple ab fields in remarks. Only first one processed",
        remarksabplusnote: "warning: field ab is used and note also: only the ab field is used",
        nooddinelementspec: "No schemaSpec element in the ODD file",
        redefelementspec: 'ERROR: redefinition of ',
        notdefelementref1: 'ERROR: elementRef ',
        notdefelementref2: " is not defined",
        notusedelementref1: 'warning: elementSpec ',
        notusedelementref2: " is not used",
        nodefrootelement: "No definition for the root element ",
        toomanyelements: "Warning: too many elements for ",
        morethanoneroot: "Invalid file: Cannot have more than one root element",
        norootinodd: "Invalid file: no root in ODD",
        badtimeformat: 'Bad time format. Correct format: HhMmSs.ms',
        badtimeminutes: 'Bad format for minutes: from 0 to 59',
        badtimeseconds: 'Bad format for seconds: from 0 to 59',
        badtimeformat2: 'Bad time format. Correct format: H:M:S.ms',
        formatinseconds: "Format in seconds",
        askremove: 'Do you want to remove this element and all its descendants ?',
        editvalue: '-edit a value-',
        givevalue: "Give the new value",
        nolistdatatype: "no list of values for the datatype: ",
        leavinghtml: 'It looks like you have been editing something. If you leave before saving, your changes will be lost.',
        title: "Metadata edition TEI / ORTOLANG / CORLI",
        xmlopen: "Open",
        xmlsave1: "Save",
        xmlsave2: "Save XML file",
        xmlsaveas: "SaveAs ...",
        xmlnew: "New",
        oddapply: "Apply ODD file",
        cssapply: "Apply CSS file",
        cssclean: "Clean CSS file",
        menuhelp: "Help",
        applyoddcss: "Apply ODD/CSS",
        oddpredef: "Predefined ODD:",
        oddteispoken: "TEI Spoken",
        oddolac: "Olac/DC",
        oddmedia: "Media",
        menuparam: "Parameters",
        paramfullpath: "Display full paths ",
        paramshift: "Number of pixel for imbrication shift: ",
        paramdefincl: "Empty or absent elements included automatically ",
        paramsupprobl: "Allow removal of obligatory elements ",
        paramcanrm: "Allow removal of elements (if not change only) ",
        shorthelp: shortHelp_eng,
        versionname: "Prototype version of javascript TEIMETA: ",
        askforsave: "The file was not saved. Do you want to save it, to quit without saving or to cancel?",
        file: "File: ",
        nofilename: "No file name",
        predefoddmedia: 'Media (TEI)',
        predefoddolacdc: 'Olac DC',
        predefoddteispoken: 'TEI Spoken',
        newfile: 'new-file.xml',
        choicelanguage: 'Languages',
        predefodd: "Predefined ODD",
        ok: 'OK',
        cancel: 'Cancel',
        pleaseloadcss1: "The original CSS file ",
        pleaseloadcss2: " is absent: do you want to load it?",
        usedefaultcss: "The CSS file is not found. Default CSS values will be used",
        pleaseloadodd1: "The ODD file ",
        pleaseloadodd2: " is absent: you have to give its location.",
        nooddavailable: "The ODD file is not found. The XML file cannot be edited.",
        askoddInfo: "You must choose an ODD file.",
        askoddCurrent: "Use the currently loaded ODD",
        askoddLocalOdd: "Choose and ODD file on your computer",
        askoddPredef: "Choose a predefined ODD file",
        paramlinks: "Parameters / Links",
    };
    var language = messages_eng;
    function setLanguage(lang) {
        if (lang.toLowerCase() === 'fr' || lang.toLowerCase() === 'fra' || lang.toLowerCase() === 'fre') {
            language = messages_fra;
        }
        else if (lang.toLowerCase() === 'es' || lang.toLowerCase() === 'spa') {
            language = messages_spa;
        }
        else if (lang.toLowerCase() === 'ja' || lang.toLowerCase() === 'jpn') {
            language = messages_jpn;
        }
        else {
            language = messages_eng;
        }
    }
    exports.setLanguage = setLanguage;
    function msg(tag) {
        if (language[tag])
            return language[tag];
        if (messages_eng[tag])
            return messages_eng[tag];
        return "message: " + tag + " (unknow information)";
    }
    exports.msg = msg;
    
    
    /***/ }),
    /* 8 */
    /***/ (function(module, exports, __webpack_require__) {
    
    var encode = __webpack_require__(9),
        decode = __webpack_require__(12);
    
    exports.decode = function(data, level){
        return (!level || level <= 0 ? decode.XML : decode.HTML)(data);
    };
    
    exports.decodeStrict = function(data, level){
        return (!level || level <= 0 ? decode.XML : decode.HTMLStrict)(data);
    };
    
    exports.encode = function(data, level){
        return (!level || level <= 0 ? encode.XML : encode.HTML)(data);
    };
    
    exports.encodeXML = encode.XML;
    
    exports.encodeHTML4 =
    exports.encodeHTML5 =
    exports.encodeHTML  = encode.HTML;
    
    exports.decodeXML =
    exports.decodeXMLStrict = decode.XML;
    
    exports.decodeHTML4 =
    exports.decodeHTML5 =
    exports.decodeHTML = decode.HTML;
    
    exports.decodeHTML4Strict =
    exports.decodeHTML5Strict =
    exports.decodeHTMLStrict = decode.HTMLStrict;
    
    exports.escape = encode.escape;
    
    
    /***/ }),
    /* 9 */
    /***/ (function(module, exports, __webpack_require__) {
    
    var inverseXML = getInverseObj(__webpack_require__(10)),
        xmlReplacer = getInverseReplacer(inverseXML);
    
    exports.XML = getInverse(inverseXML, xmlReplacer);
    
    var inverseHTML = getInverseObj(__webpack_require__(11)),
        htmlReplacer = getInverseReplacer(inverseHTML);
    
    exports.HTML = getInverse(inverseHTML, htmlReplacer);
    
    function getInverseObj(obj){
        return Object.keys(obj).sort().reduce(function(inverse, name){
            inverse[obj[name]] = "&" + name + ";";
            return inverse;
        }, {});
    }
    
    function getInverseReplacer(inverse){
        var single = [],
            multiple = [];
    
        Object.keys(inverse).forEach(function(k){
            if(k.length === 1){
                single.push("\\" + k);
            } else {
                multiple.push(k);
            }
        });
    
        //TODO add ranges
        multiple.unshift("[" + single.join("") + "]");
    
        return new RegExp(multiple.join("|"), "g");
    }
    
    var re_nonASCII = /[^\0-\x7F]/g,
        re_astralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    
    function singleCharReplacer(c){
        return "&#x" + c.charCodeAt(0).toString(16).toUpperCase() + ";";
    }
    
    function astralReplacer(c){
        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        var high = c.charCodeAt(0);
        var low  = c.charCodeAt(1);
        var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
        return "&#x" + codePoint.toString(16).toUpperCase() + ";";
    }
    
    function getInverse(inverse, re){
        function func(name){
            return inverse[name];
        }
    
        return function(data){
            return data
                    .replace(re, func)
                    .replace(re_astralSymbols, astralReplacer)
                    .replace(re_nonASCII, singleCharReplacer);
        };
    }
    
    var re_xmlChars = getInverseReplacer(inverseXML);
    
    function escapeXML(data){
        return data
                .replace(re_xmlChars, singleCharReplacer)
                .replace(re_astralSymbols, astralReplacer)
                .replace(re_nonASCII, singleCharReplacer);
    }
    
    exports.escape = escapeXML;
    
    
    /***/ }),
    /* 10 */
    /***/ (function(module) {
    
    module.exports = {"amp":"&","apos":"'","gt":">","lt":"<","quot":"\""};
    
    /***/ }),
    /* 11 */
    /***/ (function(module) {
    
    module.exports = {"Aacute":"Á","aacute":"á","Abreve":"Ă","abreve":"ă","ac":"∾","acd":"∿","acE":"∾̳","Acirc":"Â","acirc":"â","acute":"´","Acy":"А","acy":"а","AElig":"Æ","aelig":"æ","af":"⁡","Afr":"𝔄","afr":"𝔞","Agrave":"À","agrave":"à","alefsym":"ℵ","aleph":"ℵ","Alpha":"Α","alpha":"α","Amacr":"Ā","amacr":"ā","amalg":"⨿","amp":"&","AMP":"&","andand":"⩕","And":"⩓","and":"∧","andd":"⩜","andslope":"⩘","andv":"⩚","ang":"∠","ange":"⦤","angle":"∠","angmsdaa":"⦨","angmsdab":"⦩","angmsdac":"⦪","angmsdad":"⦫","angmsdae":"⦬","angmsdaf":"⦭","angmsdag":"⦮","angmsdah":"⦯","angmsd":"∡","angrt":"∟","angrtvb":"⊾","angrtvbd":"⦝","angsph":"∢","angst":"Å","angzarr":"⍼","Aogon":"Ą","aogon":"ą","Aopf":"𝔸","aopf":"𝕒","apacir":"⩯","ap":"≈","apE":"⩰","ape":"≊","apid":"≋","apos":"'","ApplyFunction":"⁡","approx":"≈","approxeq":"≊","Aring":"Å","aring":"å","Ascr":"𝒜","ascr":"𝒶","Assign":"≔","ast":"*","asymp":"≈","asympeq":"≍","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","awconint":"∳","awint":"⨑","backcong":"≌","backepsilon":"϶","backprime":"‵","backsim":"∽","backsimeq":"⋍","Backslash":"∖","Barv":"⫧","barvee":"⊽","barwed":"⌅","Barwed":"⌆","barwedge":"⌅","bbrk":"⎵","bbrktbrk":"⎶","bcong":"≌","Bcy":"Б","bcy":"б","bdquo":"„","becaus":"∵","because":"∵","Because":"∵","bemptyv":"⦰","bepsi":"϶","bernou":"ℬ","Bernoullis":"ℬ","Beta":"Β","beta":"β","beth":"ℶ","between":"≬","Bfr":"𝔅","bfr":"𝔟","bigcap":"⋂","bigcirc":"◯","bigcup":"⋃","bigodot":"⨀","bigoplus":"⨁","bigotimes":"⨂","bigsqcup":"⨆","bigstar":"★","bigtriangledown":"▽","bigtriangleup":"△","biguplus":"⨄","bigvee":"⋁","bigwedge":"⋀","bkarow":"⤍","blacklozenge":"⧫","blacksquare":"▪","blacktriangle":"▴","blacktriangledown":"▾","blacktriangleleft":"◂","blacktriangleright":"▸","blank":"␣","blk12":"▒","blk14":"░","blk34":"▓","block":"█","bne":"=⃥","bnequiv":"≡⃥","bNot":"⫭","bnot":"⌐","Bopf":"𝔹","bopf":"𝕓","bot":"⊥","bottom":"⊥","bowtie":"⋈","boxbox":"⧉","boxdl":"┐","boxdL":"╕","boxDl":"╖","boxDL":"╗","boxdr":"┌","boxdR":"╒","boxDr":"╓","boxDR":"╔","boxh":"─","boxH":"═","boxhd":"┬","boxHd":"╤","boxhD":"╥","boxHD":"╦","boxhu":"┴","boxHu":"╧","boxhU":"╨","boxHU":"╩","boxminus":"⊟","boxplus":"⊞","boxtimes":"⊠","boxul":"┘","boxuL":"╛","boxUl":"╜","boxUL":"╝","boxur":"└","boxuR":"╘","boxUr":"╙","boxUR":"╚","boxv":"│","boxV":"║","boxvh":"┼","boxvH":"╪","boxVh":"╫","boxVH":"╬","boxvl":"┤","boxvL":"╡","boxVl":"╢","boxVL":"╣","boxvr":"├","boxvR":"╞","boxVr":"╟","boxVR":"╠","bprime":"‵","breve":"˘","Breve":"˘","brvbar":"¦","bscr":"𝒷","Bscr":"ℬ","bsemi":"⁏","bsim":"∽","bsime":"⋍","bsolb":"⧅","bsol":"\\","bsolhsub":"⟈","bull":"•","bullet":"•","bump":"≎","bumpE":"⪮","bumpe":"≏","Bumpeq":"≎","bumpeq":"≏","Cacute":"Ć","cacute":"ć","capand":"⩄","capbrcup":"⩉","capcap":"⩋","cap":"∩","Cap":"⋒","capcup":"⩇","capdot":"⩀","CapitalDifferentialD":"ⅅ","caps":"∩︀","caret":"⁁","caron":"ˇ","Cayleys":"ℭ","ccaps":"⩍","Ccaron":"Č","ccaron":"č","Ccedil":"Ç","ccedil":"ç","Ccirc":"Ĉ","ccirc":"ĉ","Cconint":"∰","ccups":"⩌","ccupssm":"⩐","Cdot":"Ċ","cdot":"ċ","cedil":"¸","Cedilla":"¸","cemptyv":"⦲","cent":"¢","centerdot":"·","CenterDot":"·","cfr":"𝔠","Cfr":"ℭ","CHcy":"Ч","chcy":"ч","check":"✓","checkmark":"✓","Chi":"Χ","chi":"χ","circ":"ˆ","circeq":"≗","circlearrowleft":"↺","circlearrowright":"↻","circledast":"⊛","circledcirc":"⊚","circleddash":"⊝","CircleDot":"⊙","circledR":"®","circledS":"Ⓢ","CircleMinus":"⊖","CirclePlus":"⊕","CircleTimes":"⊗","cir":"○","cirE":"⧃","cire":"≗","cirfnint":"⨐","cirmid":"⫯","cirscir":"⧂","ClockwiseContourIntegral":"∲","CloseCurlyDoubleQuote":"”","CloseCurlyQuote":"’","clubs":"♣","clubsuit":"♣","colon":":","Colon":"∷","Colone":"⩴","colone":"≔","coloneq":"≔","comma":",","commat":"@","comp":"∁","compfn":"∘","complement":"∁","complexes":"ℂ","cong":"≅","congdot":"⩭","Congruent":"≡","conint":"∮","Conint":"∯","ContourIntegral":"∮","copf":"𝕔","Copf":"ℂ","coprod":"∐","Coproduct":"∐","copy":"©","COPY":"©","copysr":"℗","CounterClockwiseContourIntegral":"∳","crarr":"↵","cross":"✗","Cross":"⨯","Cscr":"𝒞","cscr":"𝒸","csub":"⫏","csube":"⫑","csup":"⫐","csupe":"⫒","ctdot":"⋯","cudarrl":"⤸","cudarrr":"⤵","cuepr":"⋞","cuesc":"⋟","cularr":"↶","cularrp":"⤽","cupbrcap":"⩈","cupcap":"⩆","CupCap":"≍","cup":"∪","Cup":"⋓","cupcup":"⩊","cupdot":"⊍","cupor":"⩅","cups":"∪︀","curarr":"↷","curarrm":"⤼","curlyeqprec":"⋞","curlyeqsucc":"⋟","curlyvee":"⋎","curlywedge":"⋏","curren":"¤","curvearrowleft":"↶","curvearrowright":"↷","cuvee":"⋎","cuwed":"⋏","cwconint":"∲","cwint":"∱","cylcty":"⌭","dagger":"†","Dagger":"‡","daleth":"ℸ","darr":"↓","Darr":"↡","dArr":"⇓","dash":"‐","Dashv":"⫤","dashv":"⊣","dbkarow":"⤏","dblac":"˝","Dcaron":"Ď","dcaron":"ď","Dcy":"Д","dcy":"д","ddagger":"‡","ddarr":"⇊","DD":"ⅅ","dd":"ⅆ","DDotrahd":"⤑","ddotseq":"⩷","deg":"°","Del":"∇","Delta":"Δ","delta":"δ","demptyv":"⦱","dfisht":"⥿","Dfr":"𝔇","dfr":"𝔡","dHar":"⥥","dharl":"⇃","dharr":"⇂","DiacriticalAcute":"´","DiacriticalDot":"˙","DiacriticalDoubleAcute":"˝","DiacriticalGrave":"`","DiacriticalTilde":"˜","diam":"⋄","diamond":"⋄","Diamond":"⋄","diamondsuit":"♦","diams":"♦","die":"¨","DifferentialD":"ⅆ","digamma":"ϝ","disin":"⋲","div":"÷","divide":"÷","divideontimes":"⋇","divonx":"⋇","DJcy":"Ђ","djcy":"ђ","dlcorn":"⌞","dlcrop":"⌍","dollar":"$","Dopf":"𝔻","dopf":"𝕕","Dot":"¨","dot":"˙","DotDot":"⃜","doteq":"≐","doteqdot":"≑","DotEqual":"≐","dotminus":"∸","dotplus":"∔","dotsquare":"⊡","doublebarwedge":"⌆","DoubleContourIntegral":"∯","DoubleDot":"¨","DoubleDownArrow":"⇓","DoubleLeftArrow":"⇐","DoubleLeftRightArrow":"⇔","DoubleLeftTee":"⫤","DoubleLongLeftArrow":"⟸","DoubleLongLeftRightArrow":"⟺","DoubleLongRightArrow":"⟹","DoubleRightArrow":"⇒","DoubleRightTee":"⊨","DoubleUpArrow":"⇑","DoubleUpDownArrow":"⇕","DoubleVerticalBar":"∥","DownArrowBar":"⤓","downarrow":"↓","DownArrow":"↓","Downarrow":"⇓","DownArrowUpArrow":"⇵","DownBreve":"̑","downdownarrows":"⇊","downharpoonleft":"⇃","downharpoonright":"⇂","DownLeftRightVector":"⥐","DownLeftTeeVector":"⥞","DownLeftVectorBar":"⥖","DownLeftVector":"↽","DownRightTeeVector":"⥟","DownRightVectorBar":"⥗","DownRightVector":"⇁","DownTeeArrow":"↧","DownTee":"⊤","drbkarow":"⤐","drcorn":"⌟","drcrop":"⌌","Dscr":"𝒟","dscr":"𝒹","DScy":"Ѕ","dscy":"ѕ","dsol":"⧶","Dstrok":"Đ","dstrok":"đ","dtdot":"⋱","dtri":"▿","dtrif":"▾","duarr":"⇵","duhar":"⥯","dwangle":"⦦","DZcy":"Џ","dzcy":"џ","dzigrarr":"⟿","Eacute":"É","eacute":"é","easter":"⩮","Ecaron":"Ě","ecaron":"ě","Ecirc":"Ê","ecirc":"ê","ecir":"≖","ecolon":"≕","Ecy":"Э","ecy":"э","eDDot":"⩷","Edot":"Ė","edot":"ė","eDot":"≑","ee":"ⅇ","efDot":"≒","Efr":"𝔈","efr":"𝔢","eg":"⪚","Egrave":"È","egrave":"è","egs":"⪖","egsdot":"⪘","el":"⪙","Element":"∈","elinters":"⏧","ell":"ℓ","els":"⪕","elsdot":"⪗","Emacr":"Ē","emacr":"ē","empty":"∅","emptyset":"∅","EmptySmallSquare":"◻","emptyv":"∅","EmptyVerySmallSquare":"▫","emsp13":" ","emsp14":" ","emsp":" ","ENG":"Ŋ","eng":"ŋ","ensp":" ","Eogon":"Ę","eogon":"ę","Eopf":"𝔼","eopf":"𝕖","epar":"⋕","eparsl":"⧣","eplus":"⩱","epsi":"ε","Epsilon":"Ε","epsilon":"ε","epsiv":"ϵ","eqcirc":"≖","eqcolon":"≕","eqsim":"≂","eqslantgtr":"⪖","eqslantless":"⪕","Equal":"⩵","equals":"=","EqualTilde":"≂","equest":"≟","Equilibrium":"⇌","equiv":"≡","equivDD":"⩸","eqvparsl":"⧥","erarr":"⥱","erDot":"≓","escr":"ℯ","Escr":"ℰ","esdot":"≐","Esim":"⩳","esim":"≂","Eta":"Η","eta":"η","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","euro":"€","excl":"!","exist":"∃","Exists":"∃","expectation":"ℰ","exponentiale":"ⅇ","ExponentialE":"ⅇ","fallingdotseq":"≒","Fcy":"Ф","fcy":"ф","female":"♀","ffilig":"ﬃ","fflig":"ﬀ","ffllig":"ﬄ","Ffr":"𝔉","ffr":"𝔣","filig":"ﬁ","FilledSmallSquare":"◼","FilledVerySmallSquare":"▪","fjlig":"fj","flat":"♭","fllig":"ﬂ","fltns":"▱","fnof":"ƒ","Fopf":"𝔽","fopf":"𝕗","forall":"∀","ForAll":"∀","fork":"⋔","forkv":"⫙","Fouriertrf":"ℱ","fpartint":"⨍","frac12":"½","frac13":"⅓","frac14":"¼","frac15":"⅕","frac16":"⅙","frac18":"⅛","frac23":"⅔","frac25":"⅖","frac34":"¾","frac35":"⅗","frac38":"⅜","frac45":"⅘","frac56":"⅚","frac58":"⅝","frac78":"⅞","frasl":"⁄","frown":"⌢","fscr":"𝒻","Fscr":"ℱ","gacute":"ǵ","Gamma":"Γ","gamma":"γ","Gammad":"Ϝ","gammad":"ϝ","gap":"⪆","Gbreve":"Ğ","gbreve":"ğ","Gcedil":"Ģ","Gcirc":"Ĝ","gcirc":"ĝ","Gcy":"Г","gcy":"г","Gdot":"Ġ","gdot":"ġ","ge":"≥","gE":"≧","gEl":"⪌","gel":"⋛","geq":"≥","geqq":"≧","geqslant":"⩾","gescc":"⪩","ges":"⩾","gesdot":"⪀","gesdoto":"⪂","gesdotol":"⪄","gesl":"⋛︀","gesles":"⪔","Gfr":"𝔊","gfr":"𝔤","gg":"≫","Gg":"⋙","ggg":"⋙","gimel":"ℷ","GJcy":"Ѓ","gjcy":"ѓ","gla":"⪥","gl":"≷","glE":"⪒","glj":"⪤","gnap":"⪊","gnapprox":"⪊","gne":"⪈","gnE":"≩","gneq":"⪈","gneqq":"≩","gnsim":"⋧","Gopf":"𝔾","gopf":"𝕘","grave":"`","GreaterEqual":"≥","GreaterEqualLess":"⋛","GreaterFullEqual":"≧","GreaterGreater":"⪢","GreaterLess":"≷","GreaterSlantEqual":"⩾","GreaterTilde":"≳","Gscr":"𝒢","gscr":"ℊ","gsim":"≳","gsime":"⪎","gsiml":"⪐","gtcc":"⪧","gtcir":"⩺","gt":">","GT":">","Gt":"≫","gtdot":"⋗","gtlPar":"⦕","gtquest":"⩼","gtrapprox":"⪆","gtrarr":"⥸","gtrdot":"⋗","gtreqless":"⋛","gtreqqless":"⪌","gtrless":"≷","gtrsim":"≳","gvertneqq":"≩︀","gvnE":"≩︀","Hacek":"ˇ","hairsp":" ","half":"½","hamilt":"ℋ","HARDcy":"Ъ","hardcy":"ъ","harrcir":"⥈","harr":"↔","hArr":"⇔","harrw":"↭","Hat":"^","hbar":"ℏ","Hcirc":"Ĥ","hcirc":"ĥ","hearts":"♥","heartsuit":"♥","hellip":"…","hercon":"⊹","hfr":"𝔥","Hfr":"ℌ","HilbertSpace":"ℋ","hksearow":"⤥","hkswarow":"⤦","hoarr":"⇿","homtht":"∻","hookleftarrow":"↩","hookrightarrow":"↪","hopf":"𝕙","Hopf":"ℍ","horbar":"―","HorizontalLine":"─","hscr":"𝒽","Hscr":"ℋ","hslash":"ℏ","Hstrok":"Ħ","hstrok":"ħ","HumpDownHump":"≎","HumpEqual":"≏","hybull":"⁃","hyphen":"‐","Iacute":"Í","iacute":"í","ic":"⁣","Icirc":"Î","icirc":"î","Icy":"И","icy":"и","Idot":"İ","IEcy":"Е","iecy":"е","iexcl":"¡","iff":"⇔","ifr":"𝔦","Ifr":"ℑ","Igrave":"Ì","igrave":"ì","ii":"ⅈ","iiiint":"⨌","iiint":"∭","iinfin":"⧜","iiota":"℩","IJlig":"Ĳ","ijlig":"ĳ","Imacr":"Ī","imacr":"ī","image":"ℑ","ImaginaryI":"ⅈ","imagline":"ℐ","imagpart":"ℑ","imath":"ı","Im":"ℑ","imof":"⊷","imped":"Ƶ","Implies":"⇒","incare":"℅","in":"∈","infin":"∞","infintie":"⧝","inodot":"ı","intcal":"⊺","int":"∫","Int":"∬","integers":"ℤ","Integral":"∫","intercal":"⊺","Intersection":"⋂","intlarhk":"⨗","intprod":"⨼","InvisibleComma":"⁣","InvisibleTimes":"⁢","IOcy":"Ё","iocy":"ё","Iogon":"Į","iogon":"į","Iopf":"𝕀","iopf":"𝕚","Iota":"Ι","iota":"ι","iprod":"⨼","iquest":"¿","iscr":"𝒾","Iscr":"ℐ","isin":"∈","isindot":"⋵","isinE":"⋹","isins":"⋴","isinsv":"⋳","isinv":"∈","it":"⁢","Itilde":"Ĩ","itilde":"ĩ","Iukcy":"І","iukcy":"і","Iuml":"Ï","iuml":"ï","Jcirc":"Ĵ","jcirc":"ĵ","Jcy":"Й","jcy":"й","Jfr":"𝔍","jfr":"𝔧","jmath":"ȷ","Jopf":"𝕁","jopf":"𝕛","Jscr":"𝒥","jscr":"𝒿","Jsercy":"Ј","jsercy":"ј","Jukcy":"Є","jukcy":"є","Kappa":"Κ","kappa":"κ","kappav":"ϰ","Kcedil":"Ķ","kcedil":"ķ","Kcy":"К","kcy":"к","Kfr":"𝔎","kfr":"𝔨","kgreen":"ĸ","KHcy":"Х","khcy":"х","KJcy":"Ќ","kjcy":"ќ","Kopf":"𝕂","kopf":"𝕜","Kscr":"𝒦","kscr":"𝓀","lAarr":"⇚","Lacute":"Ĺ","lacute":"ĺ","laemptyv":"⦴","lagran":"ℒ","Lambda":"Λ","lambda":"λ","lang":"⟨","Lang":"⟪","langd":"⦑","langle":"⟨","lap":"⪅","Laplacetrf":"ℒ","laquo":"«","larrb":"⇤","larrbfs":"⤟","larr":"←","Larr":"↞","lArr":"⇐","larrfs":"⤝","larrhk":"↩","larrlp":"↫","larrpl":"⤹","larrsim":"⥳","larrtl":"↢","latail":"⤙","lAtail":"⤛","lat":"⪫","late":"⪭","lates":"⪭︀","lbarr":"⤌","lBarr":"⤎","lbbrk":"❲","lbrace":"{","lbrack":"[","lbrke":"⦋","lbrksld":"⦏","lbrkslu":"⦍","Lcaron":"Ľ","lcaron":"ľ","Lcedil":"Ļ","lcedil":"ļ","lceil":"⌈","lcub":"{","Lcy":"Л","lcy":"л","ldca":"⤶","ldquo":"“","ldquor":"„","ldrdhar":"⥧","ldrushar":"⥋","ldsh":"↲","le":"≤","lE":"≦","LeftAngleBracket":"⟨","LeftArrowBar":"⇤","leftarrow":"←","LeftArrow":"←","Leftarrow":"⇐","LeftArrowRightArrow":"⇆","leftarrowtail":"↢","LeftCeiling":"⌈","LeftDoubleBracket":"⟦","LeftDownTeeVector":"⥡","LeftDownVectorBar":"⥙","LeftDownVector":"⇃","LeftFloor":"⌊","leftharpoondown":"↽","leftharpoonup":"↼","leftleftarrows":"⇇","leftrightarrow":"↔","LeftRightArrow":"↔","Leftrightarrow":"⇔","leftrightarrows":"⇆","leftrightharpoons":"⇋","leftrightsquigarrow":"↭","LeftRightVector":"⥎","LeftTeeArrow":"↤","LeftTee":"⊣","LeftTeeVector":"⥚","leftthreetimes":"⋋","LeftTriangleBar":"⧏","LeftTriangle":"⊲","LeftTriangleEqual":"⊴","LeftUpDownVector":"⥑","LeftUpTeeVector":"⥠","LeftUpVectorBar":"⥘","LeftUpVector":"↿","LeftVectorBar":"⥒","LeftVector":"↼","lEg":"⪋","leg":"⋚","leq":"≤","leqq":"≦","leqslant":"⩽","lescc":"⪨","les":"⩽","lesdot":"⩿","lesdoto":"⪁","lesdotor":"⪃","lesg":"⋚︀","lesges":"⪓","lessapprox":"⪅","lessdot":"⋖","lesseqgtr":"⋚","lesseqqgtr":"⪋","LessEqualGreater":"⋚","LessFullEqual":"≦","LessGreater":"≶","lessgtr":"≶","LessLess":"⪡","lesssim":"≲","LessSlantEqual":"⩽","LessTilde":"≲","lfisht":"⥼","lfloor":"⌊","Lfr":"𝔏","lfr":"𝔩","lg":"≶","lgE":"⪑","lHar":"⥢","lhard":"↽","lharu":"↼","lharul":"⥪","lhblk":"▄","LJcy":"Љ","ljcy":"љ","llarr":"⇇","ll":"≪","Ll":"⋘","llcorner":"⌞","Lleftarrow":"⇚","llhard":"⥫","lltri":"◺","Lmidot":"Ŀ","lmidot":"ŀ","lmoustache":"⎰","lmoust":"⎰","lnap":"⪉","lnapprox":"⪉","lne":"⪇","lnE":"≨","lneq":"⪇","lneqq":"≨","lnsim":"⋦","loang":"⟬","loarr":"⇽","lobrk":"⟦","longleftarrow":"⟵","LongLeftArrow":"⟵","Longleftarrow":"⟸","longleftrightarrow":"⟷","LongLeftRightArrow":"⟷","Longleftrightarrow":"⟺","longmapsto":"⟼","longrightarrow":"⟶","LongRightArrow":"⟶","Longrightarrow":"⟹","looparrowleft":"↫","looparrowright":"↬","lopar":"⦅","Lopf":"𝕃","lopf":"𝕝","loplus":"⨭","lotimes":"⨴","lowast":"∗","lowbar":"_","LowerLeftArrow":"↙","LowerRightArrow":"↘","loz":"◊","lozenge":"◊","lozf":"⧫","lpar":"(","lparlt":"⦓","lrarr":"⇆","lrcorner":"⌟","lrhar":"⇋","lrhard":"⥭","lrm":"‎","lrtri":"⊿","lsaquo":"‹","lscr":"𝓁","Lscr":"ℒ","lsh":"↰","Lsh":"↰","lsim":"≲","lsime":"⪍","lsimg":"⪏","lsqb":"[","lsquo":"‘","lsquor":"‚","Lstrok":"Ł","lstrok":"ł","ltcc":"⪦","ltcir":"⩹","lt":"<","LT":"<","Lt":"≪","ltdot":"⋖","lthree":"⋋","ltimes":"⋉","ltlarr":"⥶","ltquest":"⩻","ltri":"◃","ltrie":"⊴","ltrif":"◂","ltrPar":"⦖","lurdshar":"⥊","luruhar":"⥦","lvertneqq":"≨︀","lvnE":"≨︀","macr":"¯","male":"♂","malt":"✠","maltese":"✠","Map":"⤅","map":"↦","mapsto":"↦","mapstodown":"↧","mapstoleft":"↤","mapstoup":"↥","marker":"▮","mcomma":"⨩","Mcy":"М","mcy":"м","mdash":"—","mDDot":"∺","measuredangle":"∡","MediumSpace":" ","Mellintrf":"ℳ","Mfr":"𝔐","mfr":"𝔪","mho":"℧","micro":"µ","midast":"*","midcir":"⫰","mid":"∣","middot":"·","minusb":"⊟","minus":"−","minusd":"∸","minusdu":"⨪","MinusPlus":"∓","mlcp":"⫛","mldr":"…","mnplus":"∓","models":"⊧","Mopf":"𝕄","mopf":"𝕞","mp":"∓","mscr":"𝓂","Mscr":"ℳ","mstpos":"∾","Mu":"Μ","mu":"μ","multimap":"⊸","mumap":"⊸","nabla":"∇","Nacute":"Ń","nacute":"ń","nang":"∠⃒","nap":"≉","napE":"⩰̸","napid":"≋̸","napos":"ŉ","napprox":"≉","natural":"♮","naturals":"ℕ","natur":"♮","nbsp":" ","nbump":"≎̸","nbumpe":"≏̸","ncap":"⩃","Ncaron":"Ň","ncaron":"ň","Ncedil":"Ņ","ncedil":"ņ","ncong":"≇","ncongdot":"⩭̸","ncup":"⩂","Ncy":"Н","ncy":"н","ndash":"–","nearhk":"⤤","nearr":"↗","neArr":"⇗","nearrow":"↗","ne":"≠","nedot":"≐̸","NegativeMediumSpace":"​","NegativeThickSpace":"​","NegativeThinSpace":"​","NegativeVeryThinSpace":"​","nequiv":"≢","nesear":"⤨","nesim":"≂̸","NestedGreaterGreater":"≫","NestedLessLess":"≪","NewLine":"\n","nexist":"∄","nexists":"∄","Nfr":"𝔑","nfr":"𝔫","ngE":"≧̸","nge":"≱","ngeq":"≱","ngeqq":"≧̸","ngeqslant":"⩾̸","nges":"⩾̸","nGg":"⋙̸","ngsim":"≵","nGt":"≫⃒","ngt":"≯","ngtr":"≯","nGtv":"≫̸","nharr":"↮","nhArr":"⇎","nhpar":"⫲","ni":"∋","nis":"⋼","nisd":"⋺","niv":"∋","NJcy":"Њ","njcy":"њ","nlarr":"↚","nlArr":"⇍","nldr":"‥","nlE":"≦̸","nle":"≰","nleftarrow":"↚","nLeftarrow":"⇍","nleftrightarrow":"↮","nLeftrightarrow":"⇎","nleq":"≰","nleqq":"≦̸","nleqslant":"⩽̸","nles":"⩽̸","nless":"≮","nLl":"⋘̸","nlsim":"≴","nLt":"≪⃒","nlt":"≮","nltri":"⋪","nltrie":"⋬","nLtv":"≪̸","nmid":"∤","NoBreak":"⁠","NonBreakingSpace":" ","nopf":"𝕟","Nopf":"ℕ","Not":"⫬","not":"¬","NotCongruent":"≢","NotCupCap":"≭","NotDoubleVerticalBar":"∦","NotElement":"∉","NotEqual":"≠","NotEqualTilde":"≂̸","NotExists":"∄","NotGreater":"≯","NotGreaterEqual":"≱","NotGreaterFullEqual":"≧̸","NotGreaterGreater":"≫̸","NotGreaterLess":"≹","NotGreaterSlantEqual":"⩾̸","NotGreaterTilde":"≵","NotHumpDownHump":"≎̸","NotHumpEqual":"≏̸","notin":"∉","notindot":"⋵̸","notinE":"⋹̸","notinva":"∉","notinvb":"⋷","notinvc":"⋶","NotLeftTriangleBar":"⧏̸","NotLeftTriangle":"⋪","NotLeftTriangleEqual":"⋬","NotLess":"≮","NotLessEqual":"≰","NotLessGreater":"≸","NotLessLess":"≪̸","NotLessSlantEqual":"⩽̸","NotLessTilde":"≴","NotNestedGreaterGreater":"⪢̸","NotNestedLessLess":"⪡̸","notni":"∌","notniva":"∌","notnivb":"⋾","notnivc":"⋽","NotPrecedes":"⊀","NotPrecedesEqual":"⪯̸","NotPrecedesSlantEqual":"⋠","NotReverseElement":"∌","NotRightTriangleBar":"⧐̸","NotRightTriangle":"⋫","NotRightTriangleEqual":"⋭","NotSquareSubset":"⊏̸","NotSquareSubsetEqual":"⋢","NotSquareSuperset":"⊐̸","NotSquareSupersetEqual":"⋣","NotSubset":"⊂⃒","NotSubsetEqual":"⊈","NotSucceeds":"⊁","NotSucceedsEqual":"⪰̸","NotSucceedsSlantEqual":"⋡","NotSucceedsTilde":"≿̸","NotSuperset":"⊃⃒","NotSupersetEqual":"⊉","NotTilde":"≁","NotTildeEqual":"≄","NotTildeFullEqual":"≇","NotTildeTilde":"≉","NotVerticalBar":"∤","nparallel":"∦","npar":"∦","nparsl":"⫽⃥","npart":"∂̸","npolint":"⨔","npr":"⊀","nprcue":"⋠","nprec":"⊀","npreceq":"⪯̸","npre":"⪯̸","nrarrc":"⤳̸","nrarr":"↛","nrArr":"⇏","nrarrw":"↝̸","nrightarrow":"↛","nRightarrow":"⇏","nrtri":"⋫","nrtrie":"⋭","nsc":"⊁","nsccue":"⋡","nsce":"⪰̸","Nscr":"𝒩","nscr":"𝓃","nshortmid":"∤","nshortparallel":"∦","nsim":"≁","nsime":"≄","nsimeq":"≄","nsmid":"∤","nspar":"∦","nsqsube":"⋢","nsqsupe":"⋣","nsub":"⊄","nsubE":"⫅̸","nsube":"⊈","nsubset":"⊂⃒","nsubseteq":"⊈","nsubseteqq":"⫅̸","nsucc":"⊁","nsucceq":"⪰̸","nsup":"⊅","nsupE":"⫆̸","nsupe":"⊉","nsupset":"⊃⃒","nsupseteq":"⊉","nsupseteqq":"⫆̸","ntgl":"≹","Ntilde":"Ñ","ntilde":"ñ","ntlg":"≸","ntriangleleft":"⋪","ntrianglelefteq":"⋬","ntriangleright":"⋫","ntrianglerighteq":"⋭","Nu":"Ν","nu":"ν","num":"#","numero":"№","numsp":" ","nvap":"≍⃒","nvdash":"⊬","nvDash":"⊭","nVdash":"⊮","nVDash":"⊯","nvge":"≥⃒","nvgt":">⃒","nvHarr":"⤄","nvinfin":"⧞","nvlArr":"⤂","nvle":"≤⃒","nvlt":"<⃒","nvltrie":"⊴⃒","nvrArr":"⤃","nvrtrie":"⊵⃒","nvsim":"∼⃒","nwarhk":"⤣","nwarr":"↖","nwArr":"⇖","nwarrow":"↖","nwnear":"⤧","Oacute":"Ó","oacute":"ó","oast":"⊛","Ocirc":"Ô","ocirc":"ô","ocir":"⊚","Ocy":"О","ocy":"о","odash":"⊝","Odblac":"Ő","odblac":"ő","odiv":"⨸","odot":"⊙","odsold":"⦼","OElig":"Œ","oelig":"œ","ofcir":"⦿","Ofr":"𝔒","ofr":"𝔬","ogon":"˛","Ograve":"Ò","ograve":"ò","ogt":"⧁","ohbar":"⦵","ohm":"Ω","oint":"∮","olarr":"↺","olcir":"⦾","olcross":"⦻","oline":"‾","olt":"⧀","Omacr":"Ō","omacr":"ō","Omega":"Ω","omega":"ω","Omicron":"Ο","omicron":"ο","omid":"⦶","ominus":"⊖","Oopf":"𝕆","oopf":"𝕠","opar":"⦷","OpenCurlyDoubleQuote":"“","OpenCurlyQuote":"‘","operp":"⦹","oplus":"⊕","orarr":"↻","Or":"⩔","or":"∨","ord":"⩝","order":"ℴ","orderof":"ℴ","ordf":"ª","ordm":"º","origof":"⊶","oror":"⩖","orslope":"⩗","orv":"⩛","oS":"Ⓢ","Oscr":"𝒪","oscr":"ℴ","Oslash":"Ø","oslash":"ø","osol":"⊘","Otilde":"Õ","otilde":"õ","otimesas":"⨶","Otimes":"⨷","otimes":"⊗","Ouml":"Ö","ouml":"ö","ovbar":"⌽","OverBar":"‾","OverBrace":"⏞","OverBracket":"⎴","OverParenthesis":"⏜","para":"¶","parallel":"∥","par":"∥","parsim":"⫳","parsl":"⫽","part":"∂","PartialD":"∂","Pcy":"П","pcy":"п","percnt":"%","period":".","permil":"‰","perp":"⊥","pertenk":"‱","Pfr":"𝔓","pfr":"𝔭","Phi":"Φ","phi":"φ","phiv":"ϕ","phmmat":"ℳ","phone":"☎","Pi":"Π","pi":"π","pitchfork":"⋔","piv":"ϖ","planck":"ℏ","planckh":"ℎ","plankv":"ℏ","plusacir":"⨣","plusb":"⊞","pluscir":"⨢","plus":"+","plusdo":"∔","plusdu":"⨥","pluse":"⩲","PlusMinus":"±","plusmn":"±","plussim":"⨦","plustwo":"⨧","pm":"±","Poincareplane":"ℌ","pointint":"⨕","popf":"𝕡","Popf":"ℙ","pound":"£","prap":"⪷","Pr":"⪻","pr":"≺","prcue":"≼","precapprox":"⪷","prec":"≺","preccurlyeq":"≼","Precedes":"≺","PrecedesEqual":"⪯","PrecedesSlantEqual":"≼","PrecedesTilde":"≾","preceq":"⪯","precnapprox":"⪹","precneqq":"⪵","precnsim":"⋨","pre":"⪯","prE":"⪳","precsim":"≾","prime":"′","Prime":"″","primes":"ℙ","prnap":"⪹","prnE":"⪵","prnsim":"⋨","prod":"∏","Product":"∏","profalar":"⌮","profline":"⌒","profsurf":"⌓","prop":"∝","Proportional":"∝","Proportion":"∷","propto":"∝","prsim":"≾","prurel":"⊰","Pscr":"𝒫","pscr":"𝓅","Psi":"Ψ","psi":"ψ","puncsp":" ","Qfr":"𝔔","qfr":"𝔮","qint":"⨌","qopf":"𝕢","Qopf":"ℚ","qprime":"⁗","Qscr":"𝒬","qscr":"𝓆","quaternions":"ℍ","quatint":"⨖","quest":"?","questeq":"≟","quot":"\"","QUOT":"\"","rAarr":"⇛","race":"∽̱","Racute":"Ŕ","racute":"ŕ","radic":"√","raemptyv":"⦳","rang":"⟩","Rang":"⟫","rangd":"⦒","range":"⦥","rangle":"⟩","raquo":"»","rarrap":"⥵","rarrb":"⇥","rarrbfs":"⤠","rarrc":"⤳","rarr":"→","Rarr":"↠","rArr":"⇒","rarrfs":"⤞","rarrhk":"↪","rarrlp":"↬","rarrpl":"⥅","rarrsim":"⥴","Rarrtl":"⤖","rarrtl":"↣","rarrw":"↝","ratail":"⤚","rAtail":"⤜","ratio":"∶","rationals":"ℚ","rbarr":"⤍","rBarr":"⤏","RBarr":"⤐","rbbrk":"❳","rbrace":"}","rbrack":"]","rbrke":"⦌","rbrksld":"⦎","rbrkslu":"⦐","Rcaron":"Ř","rcaron":"ř","Rcedil":"Ŗ","rcedil":"ŗ","rceil":"⌉","rcub":"}","Rcy":"Р","rcy":"р","rdca":"⤷","rdldhar":"⥩","rdquo":"”","rdquor":"”","rdsh":"↳","real":"ℜ","realine":"ℛ","realpart":"ℜ","reals":"ℝ","Re":"ℜ","rect":"▭","reg":"®","REG":"®","ReverseElement":"∋","ReverseEquilibrium":"⇋","ReverseUpEquilibrium":"⥯","rfisht":"⥽","rfloor":"⌋","rfr":"𝔯","Rfr":"ℜ","rHar":"⥤","rhard":"⇁","rharu":"⇀","rharul":"⥬","Rho":"Ρ","rho":"ρ","rhov":"ϱ","RightAngleBracket":"⟩","RightArrowBar":"⇥","rightarrow":"→","RightArrow":"→","Rightarrow":"⇒","RightArrowLeftArrow":"⇄","rightarrowtail":"↣","RightCeiling":"⌉","RightDoubleBracket":"⟧","RightDownTeeVector":"⥝","RightDownVectorBar":"⥕","RightDownVector":"⇂","RightFloor":"⌋","rightharpoondown":"⇁","rightharpoonup":"⇀","rightleftarrows":"⇄","rightleftharpoons":"⇌","rightrightarrows":"⇉","rightsquigarrow":"↝","RightTeeArrow":"↦","RightTee":"⊢","RightTeeVector":"⥛","rightthreetimes":"⋌","RightTriangleBar":"⧐","RightTriangle":"⊳","RightTriangleEqual":"⊵","RightUpDownVector":"⥏","RightUpTeeVector":"⥜","RightUpVectorBar":"⥔","RightUpVector":"↾","RightVectorBar":"⥓","RightVector":"⇀","ring":"˚","risingdotseq":"≓","rlarr":"⇄","rlhar":"⇌","rlm":"‏","rmoustache":"⎱","rmoust":"⎱","rnmid":"⫮","roang":"⟭","roarr":"⇾","robrk":"⟧","ropar":"⦆","ropf":"𝕣","Ropf":"ℝ","roplus":"⨮","rotimes":"⨵","RoundImplies":"⥰","rpar":")","rpargt":"⦔","rppolint":"⨒","rrarr":"⇉","Rrightarrow":"⇛","rsaquo":"›","rscr":"𝓇","Rscr":"ℛ","rsh":"↱","Rsh":"↱","rsqb":"]","rsquo":"’","rsquor":"’","rthree":"⋌","rtimes":"⋊","rtri":"▹","rtrie":"⊵","rtrif":"▸","rtriltri":"⧎","RuleDelayed":"⧴","ruluhar":"⥨","rx":"℞","Sacute":"Ś","sacute":"ś","sbquo":"‚","scap":"⪸","Scaron":"Š","scaron":"š","Sc":"⪼","sc":"≻","sccue":"≽","sce":"⪰","scE":"⪴","Scedil":"Ş","scedil":"ş","Scirc":"Ŝ","scirc":"ŝ","scnap":"⪺","scnE":"⪶","scnsim":"⋩","scpolint":"⨓","scsim":"≿","Scy":"С","scy":"с","sdotb":"⊡","sdot":"⋅","sdote":"⩦","searhk":"⤥","searr":"↘","seArr":"⇘","searrow":"↘","sect":"§","semi":";","seswar":"⤩","setminus":"∖","setmn":"∖","sext":"✶","Sfr":"𝔖","sfr":"𝔰","sfrown":"⌢","sharp":"♯","SHCHcy":"Щ","shchcy":"щ","SHcy":"Ш","shcy":"ш","ShortDownArrow":"↓","ShortLeftArrow":"←","shortmid":"∣","shortparallel":"∥","ShortRightArrow":"→","ShortUpArrow":"↑","shy":"­","Sigma":"Σ","sigma":"σ","sigmaf":"ς","sigmav":"ς","sim":"∼","simdot":"⩪","sime":"≃","simeq":"≃","simg":"⪞","simgE":"⪠","siml":"⪝","simlE":"⪟","simne":"≆","simplus":"⨤","simrarr":"⥲","slarr":"←","SmallCircle":"∘","smallsetminus":"∖","smashp":"⨳","smeparsl":"⧤","smid":"∣","smile":"⌣","smt":"⪪","smte":"⪬","smtes":"⪬︀","SOFTcy":"Ь","softcy":"ь","solbar":"⌿","solb":"⧄","sol":"/","Sopf":"𝕊","sopf":"𝕤","spades":"♠","spadesuit":"♠","spar":"∥","sqcap":"⊓","sqcaps":"⊓︀","sqcup":"⊔","sqcups":"⊔︀","Sqrt":"√","sqsub":"⊏","sqsube":"⊑","sqsubset":"⊏","sqsubseteq":"⊑","sqsup":"⊐","sqsupe":"⊒","sqsupset":"⊐","sqsupseteq":"⊒","square":"□","Square":"□","SquareIntersection":"⊓","SquareSubset":"⊏","SquareSubsetEqual":"⊑","SquareSuperset":"⊐","SquareSupersetEqual":"⊒","SquareUnion":"⊔","squarf":"▪","squ":"□","squf":"▪","srarr":"→","Sscr":"𝒮","sscr":"𝓈","ssetmn":"∖","ssmile":"⌣","sstarf":"⋆","Star":"⋆","star":"☆","starf":"★","straightepsilon":"ϵ","straightphi":"ϕ","strns":"¯","sub":"⊂","Sub":"⋐","subdot":"⪽","subE":"⫅","sube":"⊆","subedot":"⫃","submult":"⫁","subnE":"⫋","subne":"⊊","subplus":"⪿","subrarr":"⥹","subset":"⊂","Subset":"⋐","subseteq":"⊆","subseteqq":"⫅","SubsetEqual":"⊆","subsetneq":"⊊","subsetneqq":"⫋","subsim":"⫇","subsub":"⫕","subsup":"⫓","succapprox":"⪸","succ":"≻","succcurlyeq":"≽","Succeeds":"≻","SucceedsEqual":"⪰","SucceedsSlantEqual":"≽","SucceedsTilde":"≿","succeq":"⪰","succnapprox":"⪺","succneqq":"⪶","succnsim":"⋩","succsim":"≿","SuchThat":"∋","sum":"∑","Sum":"∑","sung":"♪","sup1":"¹","sup2":"²","sup3":"³","sup":"⊃","Sup":"⋑","supdot":"⪾","supdsub":"⫘","supE":"⫆","supe":"⊇","supedot":"⫄","Superset":"⊃","SupersetEqual":"⊇","suphsol":"⟉","suphsub":"⫗","suplarr":"⥻","supmult":"⫂","supnE":"⫌","supne":"⊋","supplus":"⫀","supset":"⊃","Supset":"⋑","supseteq":"⊇","supseteqq":"⫆","supsetneq":"⊋","supsetneqq":"⫌","supsim":"⫈","supsub":"⫔","supsup":"⫖","swarhk":"⤦","swarr":"↙","swArr":"⇙","swarrow":"↙","swnwar":"⤪","szlig":"ß","Tab":"\t","target":"⌖","Tau":"Τ","tau":"τ","tbrk":"⎴","Tcaron":"Ť","tcaron":"ť","Tcedil":"Ţ","tcedil":"ţ","Tcy":"Т","tcy":"т","tdot":"⃛","telrec":"⌕","Tfr":"𝔗","tfr":"𝔱","there4":"∴","therefore":"∴","Therefore":"∴","Theta":"Θ","theta":"θ","thetasym":"ϑ","thetav":"ϑ","thickapprox":"≈","thicksim":"∼","ThickSpace":"  ","ThinSpace":" ","thinsp":" ","thkap":"≈","thksim":"∼","THORN":"Þ","thorn":"þ","tilde":"˜","Tilde":"∼","TildeEqual":"≃","TildeFullEqual":"≅","TildeTilde":"≈","timesbar":"⨱","timesb":"⊠","times":"×","timesd":"⨰","tint":"∭","toea":"⤨","topbot":"⌶","topcir":"⫱","top":"⊤","Topf":"𝕋","topf":"𝕥","topfork":"⫚","tosa":"⤩","tprime":"‴","trade":"™","TRADE":"™","triangle":"▵","triangledown":"▿","triangleleft":"◃","trianglelefteq":"⊴","triangleq":"≜","triangleright":"▹","trianglerighteq":"⊵","tridot":"◬","trie":"≜","triminus":"⨺","TripleDot":"⃛","triplus":"⨹","trisb":"⧍","tritime":"⨻","trpezium":"⏢","Tscr":"𝒯","tscr":"𝓉","TScy":"Ц","tscy":"ц","TSHcy":"Ћ","tshcy":"ћ","Tstrok":"Ŧ","tstrok":"ŧ","twixt":"≬","twoheadleftarrow":"↞","twoheadrightarrow":"↠","Uacute":"Ú","uacute":"ú","uarr":"↑","Uarr":"↟","uArr":"⇑","Uarrocir":"⥉","Ubrcy":"Ў","ubrcy":"ў","Ubreve":"Ŭ","ubreve":"ŭ","Ucirc":"Û","ucirc":"û","Ucy":"У","ucy":"у","udarr":"⇅","Udblac":"Ű","udblac":"ű","udhar":"⥮","ufisht":"⥾","Ufr":"𝔘","ufr":"𝔲","Ugrave":"Ù","ugrave":"ù","uHar":"⥣","uharl":"↿","uharr":"↾","uhblk":"▀","ulcorn":"⌜","ulcorner":"⌜","ulcrop":"⌏","ultri":"◸","Umacr":"Ū","umacr":"ū","uml":"¨","UnderBar":"_","UnderBrace":"⏟","UnderBracket":"⎵","UnderParenthesis":"⏝","Union":"⋃","UnionPlus":"⊎","Uogon":"Ų","uogon":"ų","Uopf":"𝕌","uopf":"𝕦","UpArrowBar":"⤒","uparrow":"↑","UpArrow":"↑","Uparrow":"⇑","UpArrowDownArrow":"⇅","updownarrow":"↕","UpDownArrow":"↕","Updownarrow":"⇕","UpEquilibrium":"⥮","upharpoonleft":"↿","upharpoonright":"↾","uplus":"⊎","UpperLeftArrow":"↖","UpperRightArrow":"↗","upsi":"υ","Upsi":"ϒ","upsih":"ϒ","Upsilon":"Υ","upsilon":"υ","UpTeeArrow":"↥","UpTee":"⊥","upuparrows":"⇈","urcorn":"⌝","urcorner":"⌝","urcrop":"⌎","Uring":"Ů","uring":"ů","urtri":"◹","Uscr":"𝒰","uscr":"𝓊","utdot":"⋰","Utilde":"Ũ","utilde":"ũ","utri":"▵","utrif":"▴","uuarr":"⇈","Uuml":"Ü","uuml":"ü","uwangle":"⦧","vangrt":"⦜","varepsilon":"ϵ","varkappa":"ϰ","varnothing":"∅","varphi":"ϕ","varpi":"ϖ","varpropto":"∝","varr":"↕","vArr":"⇕","varrho":"ϱ","varsigma":"ς","varsubsetneq":"⊊︀","varsubsetneqq":"⫋︀","varsupsetneq":"⊋︀","varsupsetneqq":"⫌︀","vartheta":"ϑ","vartriangleleft":"⊲","vartriangleright":"⊳","vBar":"⫨","Vbar":"⫫","vBarv":"⫩","Vcy":"В","vcy":"в","vdash":"⊢","vDash":"⊨","Vdash":"⊩","VDash":"⊫","Vdashl":"⫦","veebar":"⊻","vee":"∨","Vee":"⋁","veeeq":"≚","vellip":"⋮","verbar":"|","Verbar":"‖","vert":"|","Vert":"‖","VerticalBar":"∣","VerticalLine":"|","VerticalSeparator":"❘","VerticalTilde":"≀","VeryThinSpace":" ","Vfr":"𝔙","vfr":"𝔳","vltri":"⊲","vnsub":"⊂⃒","vnsup":"⊃⃒","Vopf":"𝕍","vopf":"𝕧","vprop":"∝","vrtri":"⊳","Vscr":"𝒱","vscr":"𝓋","vsubnE":"⫋︀","vsubne":"⊊︀","vsupnE":"⫌︀","vsupne":"⊋︀","Vvdash":"⊪","vzigzag":"⦚","Wcirc":"Ŵ","wcirc":"ŵ","wedbar":"⩟","wedge":"∧","Wedge":"⋀","wedgeq":"≙","weierp":"℘","Wfr":"𝔚","wfr":"𝔴","Wopf":"𝕎","wopf":"𝕨","wp":"℘","wr":"≀","wreath":"≀","Wscr":"𝒲","wscr":"𝓌","xcap":"⋂","xcirc":"◯","xcup":"⋃","xdtri":"▽","Xfr":"𝔛","xfr":"𝔵","xharr":"⟷","xhArr":"⟺","Xi":"Ξ","xi":"ξ","xlarr":"⟵","xlArr":"⟸","xmap":"⟼","xnis":"⋻","xodot":"⨀","Xopf":"𝕏","xopf":"𝕩","xoplus":"⨁","xotime":"⨂","xrarr":"⟶","xrArr":"⟹","Xscr":"𝒳","xscr":"𝓍","xsqcup":"⨆","xuplus":"⨄","xutri":"△","xvee":"⋁","xwedge":"⋀","Yacute":"Ý","yacute":"ý","YAcy":"Я","yacy":"я","Ycirc":"Ŷ","ycirc":"ŷ","Ycy":"Ы","ycy":"ы","yen":"¥","Yfr":"𝔜","yfr":"𝔶","YIcy":"Ї","yicy":"ї","Yopf":"𝕐","yopf":"𝕪","Yscr":"𝒴","yscr":"𝓎","YUcy":"Ю","yucy":"ю","yuml":"ÿ","Yuml":"Ÿ","Zacute":"Ź","zacute":"ź","Zcaron":"Ž","zcaron":"ž","Zcy":"З","zcy":"з","Zdot":"Ż","zdot":"ż","zeetrf":"ℨ","ZeroWidthSpace":"​","Zeta":"Ζ","zeta":"ζ","zfr":"𝔷","Zfr":"ℨ","ZHcy":"Ж","zhcy":"ж","zigrarr":"⇝","zopf":"𝕫","Zopf":"ℤ","Zscr":"𝒵","zscr":"𝓏","zwj":"‍","zwnj":"‌"};
    
    /***/ }),
    /* 12 */
    /***/ (function(module, exports, __webpack_require__) {
    
    var entityMap = __webpack_require__(11),
        legacyMap = __webpack_require__(13),
        xmlMap    = __webpack_require__(10),
        decodeCodePoint = __webpack_require__(14);
    
    var decodeXMLStrict  = getStrictDecoder(xmlMap),
        decodeHTMLStrict = getStrictDecoder(entityMap);
    
    function getStrictDecoder(map){
        var keys = Object.keys(map).join("|"),
            replace = getReplacer(map);
    
        keys += "|#[xX][\\da-fA-F]+|#\\d+";
    
        var re = new RegExp("&(?:" + keys + ");", "g");
    
        return function(str){
            return String(str).replace(re, replace);
        };
    }
    
    var decodeHTML = (function(){
        var legacy = Object.keys(legacyMap)
            .sort(sorter);
    
        var keys = Object.keys(entityMap)
            .sort(sorter);
    
        for(var i = 0, j = 0; i < keys.length; i++){
            if(legacy[j] === keys[i]){
                keys[i] += ";?";
                j++;
            } else {
                keys[i] += ";";
            }
        }
    
        var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"),
            replace = getReplacer(entityMap);
    
        function replacer(str){
            if(str.substr(-1) !== ";") str += ";";
            return replace(str);
        }
    
        //TODO consider creating a merged map
        return function(str){
            return String(str).replace(re, replacer);
        };
    }());
    
    function sorter(a, b){
        return a < b ? 1 : -1;
    }
    
    function getReplacer(map){
        return function replace(str){
            if(str.charAt(1) === "#"){
                if(str.charAt(2) === "X" || str.charAt(2) === "x"){
                    return decodeCodePoint(parseInt(str.substr(3), 16));
                }
                return decodeCodePoint(parseInt(str.substr(2), 10));
            }
            return map[str.slice(1, -1)];
        };
    }
    
    module.exports = {
        XML: decodeXMLStrict,
        HTML: decodeHTML,
        HTMLStrict: decodeHTMLStrict
    };
    
    /***/ }),
    /* 13 */
    /***/ (function(module) {
    
    module.exports = {"Aacute":"Á","aacute":"á","Acirc":"Â","acirc":"â","acute":"´","AElig":"Æ","aelig":"æ","Agrave":"À","agrave":"à","amp":"&","AMP":"&","Aring":"Å","aring":"å","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","brvbar":"¦","Ccedil":"Ç","ccedil":"ç","cedil":"¸","cent":"¢","copy":"©","COPY":"©","curren":"¤","deg":"°","divide":"÷","Eacute":"É","eacute":"é","Ecirc":"Ê","ecirc":"ê","Egrave":"È","egrave":"è","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","frac12":"½","frac14":"¼","frac34":"¾","gt":">","GT":">","Iacute":"Í","iacute":"í","Icirc":"Î","icirc":"î","iexcl":"¡","Igrave":"Ì","igrave":"ì","iquest":"¿","Iuml":"Ï","iuml":"ï","laquo":"«","lt":"<","LT":"<","macr":"¯","micro":"µ","middot":"·","nbsp":" ","not":"¬","Ntilde":"Ñ","ntilde":"ñ","Oacute":"Ó","oacute":"ó","Ocirc":"Ô","ocirc":"ô","Ograve":"Ò","ograve":"ò","ordf":"ª","ordm":"º","Oslash":"Ø","oslash":"ø","Otilde":"Õ","otilde":"õ","Ouml":"Ö","ouml":"ö","para":"¶","plusmn":"±","pound":"£","quot":"\"","QUOT":"\"","raquo":"»","reg":"®","REG":"®","sect":"§","shy":"­","sup1":"¹","sup2":"²","sup3":"³","szlig":"ß","THORN":"Þ","thorn":"þ","times":"×","Uacute":"Ú","uacute":"ú","Ucirc":"Û","ucirc":"û","Ugrave":"Ù","ugrave":"ù","uml":"¨","Uuml":"Ü","uuml":"ü","Yacute":"Ý","yacute":"ý","yen":"¥","yuml":"ÿ"};
    
    /***/ }),
    /* 14 */
    /***/ (function(module, exports, __webpack_require__) {
    
    var decodeMap = __webpack_require__(15);
    
    module.exports = decodeCodePoint;
    
    // modified version of https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
    function decodeCodePoint(codePoint){
    
        if((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF){
            return "\uFFFD";
        }
    
        if(codePoint in decodeMap){
            codePoint = decodeMap[codePoint];
        }
    
        var output = "";
    
        if(codePoint > 0xFFFF){
            codePoint -= 0x10000;
            output += String.fromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
            codePoint = 0xDC00 | codePoint & 0x3FF;
        }
    
        output += String.fromCharCode(codePoint);
        return output;
    }
    
    
    /***/ }),
    /* 15 */
    /***/ (function(module) {
    
    module.exports = {"0":65533,"128":8364,"130":8218,"131":402,"132":8222,"133":8230,"134":8224,"135":8225,"136":710,"137":8240,"138":352,"139":8249,"140":338,"142":381,"145":8216,"146":8217,"147":8220,"148":8221,"149":8226,"150":8211,"151":8212,"152":732,"153":8482,"154":353,"155":8250,"156":339,"158":382,"159":376};
    
    /***/ }),
    /* 16 */
    /***/ (function(module, exports, __webpack_require__) {
    
    /*
     * xpath.js
     *
     * An XPath 1.0 library for JavaScript.
     *
     * Cameron McCormack <cam (at) mcc.id.au>
     *
     * This work is licensed under the Creative Commons Attribution-ShareAlike
     * License. To view a copy of this license, visit
     *
     *   http://creativecommons.org/licenses/by-sa/2.0/
     *
     * or send a letter to Creative Commons, 559 Nathan Abbott Way, Stanford,
     * California 94305, USA.
     *
     * Revision 20: April 26, 2011
     *   Fixed a typo resulting in FIRST_ORDERED_NODE_TYPE results being wrong,
     *   thanks to <shi_a009 (at) hotmail.com>.
     *
     * Revision 19: November 29, 2005
     *   Nodesets now store their nodes in a height balanced tree, increasing
     *   performance for the common case of selecting nodes in document order,
     *   thanks to S閎astien Cramatte <contact (at) zeninteractif.com>.
     *   AVL tree code adapted from Raimund Neumann <rnova (at) gmx.net>.
     *
     * Revision 18: October 27, 2005
     *   DOM 3 XPath support.  Caveats:
     *     - namespace prefixes aren't resolved in XPathEvaluator.createExpression,
     *       but in XPathExpression.evaluate.
     *     - XPathResult.invalidIteratorState is not implemented.
     *
     * Revision 17: October 25, 2005
     *   Some core XPath function fixes and a patch to avoid crashing certain
     *   versions of MSXML in PathExpr.prototype.getOwnerElement, thanks to
     *   S閎astien Cramatte <contact (at) zeninteractif.com>.
     *
     * Revision 16: September 22, 2005
     *   Workarounds for some IE 5.5 deficiencies.
     *   Fixed problem with prefix node tests on attribute nodes.
     *
     * Revision 15: May 21, 2005
     *   Fixed problem with QName node tests on elements with an xmlns="...".
     *
     * Revision 14: May 19, 2005
     *   Fixed QName node tests on attribute node regression.
     *
     * Revision 13: May 3, 2005
     *   Node tests are case insensitive now if working in an HTML DOM.
     *
     * Revision 12: April 26, 2005
     *   Updated licence.  Slight code changes to enable use of Dean
     *   Edwards' script compression, http://dean.edwards.name/packer/ .
     *
     * Revision 11: April 23, 2005
     *   Fixed bug with 'and' and 'or' operators, fix thanks to
     *   Sandy McArthur <sandy (at) mcarthur.org>.
     *
     * Revision 10: April 15, 2005
     *   Added support for a virtual root node, supposedly helpful for
     *   implementing XForms.  Fixed problem with QName node tests and
     *   the parent axis.
     *
     * Revision 9: March 17, 2005
     *   Namespace resolver tweaked so using the document node as the context
     *   for namespace lookups is equivalent to using the document element.
     *
     * Revision 8: February 13, 2005
     *   Handle implicit declaration of 'xmlns' namespace prefix.
     *   Fixed bug when comparing nodesets.
     *   Instance data can now be associated with a FunctionResolver, and
     *     workaround for MSXML not supporting 'localName' and 'getElementById',
     *     thanks to Grant Gongaware.
     *   Fix a few problems when the context node is the root node.
     *
     * Revision 7: February 11, 2005
     *   Default namespace resolver fix from Grant Gongaware
     *   <grant (at) gongaware.com>.
     *
     * Revision 6: February 10, 2005
     *   Fixed bug in 'number' function.
     *
     * Revision 5: February 9, 2005
     *   Fixed bug where text nodes not getting converted to string values.
     *
     * Revision 4: January 21, 2005
     *   Bug in 'name' function, fix thanks to Bill Edney.
     *   Fixed incorrect processing of namespace nodes.
     *   Fixed NamespaceResolver to resolve 'xml' namespace.
     *   Implemented union '|' operator.
     *
     * Revision 3: January 14, 2005
     *   Fixed bug with nodeset comparisons, bug lexing < and >.
     *
     * Revision 2: October 26, 2004
     *   QName node test namespace handling fixed.  Few other bug fixes.
     *
     * Revision 1: August 13, 2004
     *   Bug fixes from William J. Edney <bedney (at) technicalpursuit.com>.
     *   Added minimal licence.
     *
     * Initial version: June 14, 2004
     */
    
    // non-node wrapper
    var xpath = ( false) ? undefined : exports;
    
    (function(exports) {
    "use strict";
    
    // XPathParser ///////////////////////////////////////////////////////////////
    
    XPathParser.prototype = new Object();
    XPathParser.prototype.constructor = XPathParser;
    XPathParser.superclass = Object.prototype;
    
    function XPathParser() {
        this.init();
    }
    
    XPathParser.prototype.init = function() {
        this.reduceActions = [];
    
        this.reduceActions[3] = function(rhs) {
            return new OrOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[5] = function(rhs) {
            return new AndOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[7] = function(rhs) {
            return new EqualsOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[8] = function(rhs) {
            return new NotEqualOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[10] = function(rhs) {
            return new LessThanOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[11] = function(rhs) {
            return new GreaterThanOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[12] = function(rhs) {
            return new LessThanOrEqualOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[13] = function(rhs) {
            return new GreaterThanOrEqualOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[15] = function(rhs) {
            return new PlusOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[16] = function(rhs) {
            return new MinusOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[18] = function(rhs) {
            return new MultiplyOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[19] = function(rhs) {
            return new DivOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[20] = function(rhs) {
            return new ModOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[22] = function(rhs) {
            return new UnaryMinusOperation(rhs[1]);
        };
        this.reduceActions[24] = function(rhs) {
            return new BarOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[25] = function(rhs) {
            return new PathExpr(undefined, undefined, rhs[0]);
        };
        this.reduceActions[27] = function(rhs) {
            rhs[0].locationPath = rhs[2];
            return rhs[0];
        };
        this.reduceActions[28] = function(rhs) {
            rhs[0].locationPath = rhs[2];
            rhs[0].locationPath.steps.unshift(new Step(Step.DESCENDANTORSELF, new NodeTest(NodeTest.NODE, undefined), []));
            return rhs[0];
        };
        this.reduceActions[29] = function(rhs) {
            return new PathExpr(rhs[0], [], undefined);
        };
        this.reduceActions[30] = function(rhs) {
            if (Utilities.instance_of(rhs[0], PathExpr)) {
                if (rhs[0].filterPredicates == undefined) {
                    rhs[0].filterPredicates = [];
                }
                rhs[0].filterPredicates.push(rhs[1]);
                return rhs[0];
            } else {
                return new PathExpr(rhs[0], [rhs[1]], undefined);
            }
        };
        this.reduceActions[32] = function(rhs) {
            return rhs[1];
        };
        this.reduceActions[33] = function(rhs) {
            return new XString(rhs[0]);
        };
        this.reduceActions[34] = function(rhs) {
            return new XNumber(rhs[0]);
        };
        this.reduceActions[36] = function(rhs) {
            return new FunctionCall(rhs[0], []);
        };
        this.reduceActions[37] = function(rhs) {
            return new FunctionCall(rhs[0], rhs[2]);
        };
        this.reduceActions[38] = function(rhs) {
            return [ rhs[0] ];
        };
        this.reduceActions[39] = function(rhs) {
            rhs[2].unshift(rhs[0]);
            return rhs[2];
        };
        this.reduceActions[43] = function(rhs) {
            return new LocationPath(true, []);
        };
        this.reduceActions[44] = function(rhs) {
            rhs[1].absolute = true;
            return rhs[1];
        };
        this.reduceActions[46] = function(rhs) {
            return new LocationPath(false, [ rhs[0] ]);
        };
        this.reduceActions[47] = function(rhs) {
            rhs[0].steps.push(rhs[2]);
            return rhs[0];
        };
        this.reduceActions[49] = function(rhs) {
            return new Step(rhs[0], rhs[1], []);
        };
        this.reduceActions[50] = function(rhs) {
            return new Step(Step.CHILD, rhs[0], []);
        };
        this.reduceActions[51] = function(rhs) {
            return new Step(rhs[0], rhs[1], rhs[2]);
        };
        this.reduceActions[52] = function(rhs) {
            return new Step(Step.CHILD, rhs[0], rhs[1]);
        };
        this.reduceActions[54] = function(rhs) {
            return [ rhs[0] ];
        };
        this.reduceActions[55] = function(rhs) {
            rhs[1].unshift(rhs[0]);
            return rhs[1];
        };
        this.reduceActions[56] = function(rhs) {
            if (rhs[0] == "ancestor") {
                return Step.ANCESTOR;
            } else if (rhs[0] == "ancestor-or-self") {
                return Step.ANCESTORORSELF;
            } else if (rhs[0] == "attribute") {
                return Step.ATTRIBUTE;
            } else if (rhs[0] == "child") {
                return Step.CHILD;
            } else if (rhs[0] == "descendant") {
                return Step.DESCENDANT;
            } else if (rhs[0] == "descendant-or-self") {
                return Step.DESCENDANTORSELF;
            } else if (rhs[0] == "following") {
                return Step.FOLLOWING;
            } else if (rhs[0] == "following-sibling") {
                return Step.FOLLOWINGSIBLING;
            } else if (rhs[0] == "namespace") {
                return Step.NAMESPACE;
            } else if (rhs[0] == "parent") {
                return Step.PARENT;
            } else if (rhs[0] == "preceding") {
                return Step.PRECEDING;
            } else if (rhs[0] == "preceding-sibling") {
                return Step.PRECEDINGSIBLING;
            } else if (rhs[0] == "self") {
                return Step.SELF;
            }
            return -1;
        };
        this.reduceActions[57] = function(rhs) {
            return Step.ATTRIBUTE;
        };
        this.reduceActions[59] = function(rhs) {
            if (rhs[0] == "comment") {
                return new NodeTest(NodeTest.COMMENT, undefined);
            } else if (rhs[0] == "text") {
                return new NodeTest(NodeTest.TEXT, undefined);
            } else if (rhs[0] == "processing-instruction") {
                return new NodeTest(NodeTest.PI, undefined);
            } else if (rhs[0] == "node") {
                return new NodeTest(NodeTest.NODE, undefined);
            }
            return new NodeTest(-1, undefined);
        };
        this.reduceActions[60] = function(rhs) {
            return new NodeTest(NodeTest.PI, rhs[2]);
        };
        this.reduceActions[61] = function(rhs) {
            return rhs[1];
        };
        this.reduceActions[63] = function(rhs) {
            rhs[1].absolute = true;
            rhs[1].steps.unshift(new Step(Step.DESCENDANTORSELF, new NodeTest(NodeTest.NODE, undefined), []));
            return rhs[1];
        };
        this.reduceActions[64] = function(rhs) {
            rhs[0].steps.push(new Step(Step.DESCENDANTORSELF, new NodeTest(NodeTest.NODE, undefined), []));
            rhs[0].steps.push(rhs[2]);
            return rhs[0];
        };
        this.reduceActions[65] = function(rhs) {
            return new Step(Step.SELF, new NodeTest(NodeTest.NODE, undefined), []);
        };
        this.reduceActions[66] = function(rhs) {
            return new Step(Step.PARENT, new NodeTest(NodeTest.NODE, undefined), []);
        };
        this.reduceActions[67] = function(rhs) {
            return new VariableReference(rhs[1]);
        };
        this.reduceActions[68] = function(rhs) {
            return new NodeTest(NodeTest.NAMETESTANY, undefined);
        };
        this.reduceActions[69] = function(rhs) {
            var prefix = rhs[0].substring(0, rhs[0].indexOf(":"));
            return new NodeTest(NodeTest.NAMETESTPREFIXANY, prefix);
        };
        this.reduceActions[70] = function(rhs) {
            return new NodeTest(NodeTest.NAMETESTQNAME, rhs[0]);
        };
    };
    
    XPathParser.actionTable = [
        " s s        sssssssss    s ss  s  ss",
        "                 s                  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "                rrrrr               ",
        " s s        sssssssss    s ss  s  ss",
        "rs  rrrrrrrr s  sssssrrrrrr  rrs rs ",
        " s s        sssssssss    s ss  s  ss",
        "                            s       ",
        "                            s       ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "  s                                 ",
        "                            s       ",
        " s           s  sssss          s  s ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "a                                   ",
        "r       s                    rr  r  ",
        "r      sr                    rr  r  ",
        "r   s  rr            s       rr  r  ",
        "r   rssrr            rss     rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrrsss         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrrs  rr  r  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "r  srrrrrrrr         rrrrrrs rr sr  ",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "                sssss               ",
        "r  rrrrrrrrr         rrrrrrr rr sr  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "                             s      ",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "              s                     ",
        "                             s      ",
        "                rrrrr               ",
        " s s        sssssssss    s sss s  ss",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss      ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s           s  sssss          s  s ",
        " s           s  sssss          s  s ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        " s           s  sssss          s  s ",
        " s           s  sssss          s  s ",
        "r  rrrrrrrrr         rrrrrrr rr sr  ",
        "r  rrrrrrrrr         rrrrrrr rr sr  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "                             s      ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "                             rr     ",
        "                             s      ",
        "                             rs     ",
        "r      sr                    rr  r  ",
        "r   s  rr            s       rr  r  ",
        "r   rssrr            rss     rr  r  ",
        "r   rssrr            rss     rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrrsss         rrrrr   rr  r  ",
        "r   rrrrrsss         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "                                 r  ",
        "                                 s  ",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        " s s        sssssssss    s ss  s  ss",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "                             r      "
    ];
    
    XPathParser.actionTableNumber = [
        " 1 0        /.-,+*)('    & %$  #  \"!",
        "                 J                  ",
        "a  aaaaaaaaa         aaaaaaa aa  a  ",
        "                YYYYY               ",
        " 1 0        /.-,+*)('    & %$  #  \"!",
        "K1  KKKKKKKK .  +*)('KKKKKK  KK# K\" ",
        " 1 0        /.-,+*)('    & %$  #  \"!",
        "                            N       ",
        "                            O       ",
        "e  eeeeeeeee         eeeeeee ee ee  ",
        "f  fffffffff         fffffff ff ff  ",
        "d  ddddddddd         ddddddd dd dd  ",
        "B  BBBBBBBBB         BBBBBBB BB BB  ",
        "A  AAAAAAAAA         AAAAAAA AA AA  ",
        "  P                                 ",
        "                            Q       ",
        " 1           .  +*)('          #  \" ",
        "b  bbbbbbbbb         bbbbbbb bb  b  ",
        "                                    ",
        "!       S                    !!  !  ",
        "\"      T\"                    \"\"  \"  ",
        "$   V  $$            U       $$  $  ",
        "&   &ZY&&            &XW     &&  &  ",
        ")   )))))            )))\\[   ))  )  ",
        ".   ....._^]         .....   ..  .  ",
        "1   11111111         11111   11  1  ",
        "5   55555555         55555`  55  5  ",
        "7   77777777         777777  77  7  ",
        "9   99999999         999999  99  9  ",
        ":  c::::::::         ::::::b :: a:  ",
        "I  fIIIIIIII         IIIIIIe II  I  ",
        "=  =========         ======= == ==  ",
        "?  ?????????         ??????? ?? ??  ",
        "C  CCCCCCCCC         CCCCCCC CC CC  ",
        "J   JJJJJJJJ         JJJJJJ  JJ  J  ",
        "M   MMMMMMMM         MMMMMM  MM  M  ",
        "N  NNNNNNNNN         NNNNNNN NN  N  ",
        "P  PPPPPPPPP         PPPPPPP PP  P  ",
        "                +*)('               ",
        "R  RRRRRRRRR         RRRRRRR RR aR  ",
        "U  UUUUUUUUU         UUUUUUU UU  U  ",
        "Z  ZZZZZZZZZ         ZZZZZZZ ZZ ZZ  ",
        "c  ccccccccc         ccccccc cc cc  ",
        "                             j      ",
        "L  fLLLLLLLL         LLLLLLe LL  L  ",
        "6   66666666         66666   66  6  ",
        "              k                     ",
        "                             l      ",
        "                XXXXX               ",
        " 1 0        /.-,+*)('    & %$m #  \"!",
        "_  f________         ______e __  _  ",
        " 1 0        /.-,+*)('    & %$  #  \"!",
        " 1 0        /.-,+*)('    & %$  #  \"!",
        " 1 0        /.-,+*)('    & %$  #  \"!",
        " 1 0        /.-,+*)('    & %$  #  \"!",
        " 1 0        /.-,+*)('    & %$  #  \"!",
        " 1 0        /.-,+*)('    & %$  #  \"!",
        " 1 0        /.-,+*)('    & %$  #  \"!",
        " 1 0        /.-,+*)('    & %$  #  \"!",
        " 1 0        /.-,+*)('    & %$  #  \"!",
        " 1 0        /.-,+*)('    & %$  #  \"!",
        " 1 0        /.-,+*)('    & %$  #  \"!",
        " 1 0        /.-,+*)('    & %$  #  \"!",
        " 1 0        /.-,+*)('    & %$  #  \"!",
        " 1 0        /.-,+*)('      %$  #  \"!",
        " 1 0        /.-,+*)('    & %$  #  \"!",
        " 1           .  +*)('          #  \" ",
        " 1           .  +*)('          #  \" ",
        ">  >>>>>>>>>         >>>>>>> >> >>  ",
        " 1           .  +*)('          #  \" ",
        " 1           .  +*)('          #  \" ",
        "Q  QQQQQQQQQ         QQQQQQQ QQ aQ  ",
        "V  VVVVVVVVV         VVVVVVV VV aV  ",
        "T  TTTTTTTTT         TTTTTTT TT  T  ",
        "@  @@@@@@@@@         @@@@@@@ @@ @@  ",
        "                             \x87      ",
        "[  [[[[[[[[[         [[[[[[[ [[ [[  ",
        "D  DDDDDDDDD         DDDDDDD DD DD  ",
        "                             HH     ",
        "                             \x88      ",
        "                             F\x89     ",
        "#      T#                    ##  #  ",
        "%   V  %%            U       %%  %  ",
        "'   'ZY''            'XW     ''  '  ",
        "(   (ZY((            (XW     ((  (  ",
        "+   +++++            +++\\[   ++  +  ",
        "*   *****            ***\\[   **  *  ",
        "-   -----            ---\\[   --  -  ",
        ",   ,,,,,            ,,,\\[   ,,  ,  ",
        "0   00000_^]         00000   00  0  ",
        "/   /////_^]         /////   //  /  ",
        "2   22222222         22222   22  2  ",
        "3   33333333         33333   33  3  ",
        "4   44444444         44444   44  4  ",
        "8   88888888         888888  88  8  ",
        "                                 ^  ",
        "                                 \x8a  ",
        ";  f;;;;;;;;         ;;;;;;e ;;  ;  ",
        "<  f<<<<<<<<         <<<<<<e <<  <  ",
        "O  OOOOOOOOO         OOOOOOO OO  O  ",
        "`  `````````         ``````` ``  `  ",
        "S  SSSSSSSSS         SSSSSSS SS  S  ",
        "W  WWWWWWWWW         WWWWWWW WW  W  ",
        "\\  \\\\\\\\\\\\\\\\\\         \\\\\\\\\\\\\\ \\\\ \\\\  ",
        "E  EEEEEEEEE         EEEEEEE EE EE  ",
        " 1 0        /.-,+*)('    & %$  #  \"!",
        "]  ]]]]]]]]]         ]]]]]]] ]] ]]  ",
        "                             G      "
    ];
    
    XPathParser.gotoTable = [
        "3456789:;<=>?@ AB  CDEFGH IJ ",
        "                             ",
        "                             ",
        "                             ",
        "L456789:;<=>?@ AB  CDEFGH IJ ",
        "            M        EFGH IJ ",
        "       N;<=>?@ AB  CDEFGH IJ ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "            S        EFGH IJ ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "              e              ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                        h  J ",
        "              i          j   ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "o456789:;<=>?@ ABpqCDEFGH IJ ",
        "                             ",
        "  r6789:;<=>?@ AB  CDEFGH IJ ",
        "   s789:;<=>?@ AB  CDEFGH IJ ",
        "    t89:;<=>?@ AB  CDEFGH IJ ",
        "    u89:;<=>?@ AB  CDEFGH IJ ",
        "     v9:;<=>?@ AB  CDEFGH IJ ",
        "     w9:;<=>?@ AB  CDEFGH IJ ",
        "     x9:;<=>?@ AB  CDEFGH IJ ",
        "     y9:;<=>?@ AB  CDEFGH IJ ",
        "      z:;<=>?@ AB  CDEFGH IJ ",
        "      {:;<=>?@ AB  CDEFGH IJ ",
        "       |;<=>?@ AB  CDEFGH IJ ",
        "       };<=>?@ AB  CDEFGH IJ ",
        "       ~;<=>?@ AB  CDEFGH IJ ",
        "         \x7f=>?@ AB  CDEFGH IJ ",
        "\x80456789:;<=>?@ AB  CDEFGH IJ\x81",
        "            \x82        EFGH IJ ",
        "            \x83        EFGH IJ ",
        "                             ",
        "                     \x84 GH IJ ",
        "                     \x85 GH IJ ",
        "              i          \x86   ",
        "              i          \x87   ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "o456789:;<=>?@ AB\x8cqCDEFGH IJ ",
        "                             ",
        "                             "
    ];
    
    XPathParser.productions = [
        [1, 1, 2],
        [2, 1, 3],
        [3, 1, 4],
        [3, 3, 3, -9, 4],
        [4, 1, 5],
        [4, 3, 4, -8, 5],
        [5, 1, 6],
        [5, 3, 5, -22, 6],
        [5, 3, 5, -5, 6],
        [6, 1, 7],
        [6, 3, 6, -23, 7],
        [6, 3, 6, -24, 7],
        [6, 3, 6, -6, 7],
        [6, 3, 6, -7, 7],
        [7, 1, 8],
        [7, 3, 7, -25, 8],
        [7, 3, 7, -26, 8],
        [8, 1, 9],
        [8, 3, 8, -12, 9],
        [8, 3, 8, -11, 9],
        [8, 3, 8, -10, 9],
        [9, 1, 10],
        [9, 2, -26, 9],
        [10, 1, 11],
        [10, 3, 10, -27, 11],
        [11, 1, 12],
        [11, 1, 13],
        [11, 3, 13, -28, 14],
        [11, 3, 13, -4, 14],
        [13, 1, 15],
        [13, 2, 13, 16],
        [15, 1, 17],
        [15, 3, -29, 2, -30],
        [15, 1, -15],
        [15, 1, -16],
        [15, 1, 18],
        [18, 3, -13, -29, -30],
        [18, 4, -13, -29, 19, -30],
        [19, 1, 20],
        [19, 3, 20, -31, 19],
        [20, 1, 2],
        [12, 1, 14],
        [12, 1, 21],
        [21, 1, -28],
        [21, 2, -28, 14],
        [21, 1, 22],
        [14, 1, 23],
        [14, 3, 14, -28, 23],
        [14, 1, 24],
        [23, 2, 25, 26],
        [23, 1, 26],
        [23, 3, 25, 26, 27],
        [23, 2, 26, 27],
        [23, 1, 28],
        [27, 1, 16],
        [27, 2, 16, 27],
        [25, 2, -14, -3],
        [25, 1, -32],
        [26, 1, 29],
        [26, 3, -20, -29, -30],
        [26, 4, -21, -29, -15, -30],
        [16, 3, -33, 30, -34],
        [30, 1, 2],
        [22, 2, -4, 14],
        [24, 3, 14, -4, 23],
        [28, 1, -35],
        [28, 1, -2],
        [17, 2, -36, -18],
        [29, 1, -17],
        [29, 1, -19],
        [29, 1, -18]
    ];
    
    XPathParser.DOUBLEDOT = 2;
    XPathParser.DOUBLECOLON = 3;
    XPathParser.DOUBLESLASH = 4;
    XPathParser.NOTEQUAL = 5;
    XPathParser.LESSTHANOREQUAL = 6;
    XPathParser.GREATERTHANOREQUAL = 7;
    XPathParser.AND = 8;
    XPathParser.OR = 9;
    XPathParser.MOD = 10;
    XPathParser.DIV = 11;
    XPathParser.MULTIPLYOPERATOR = 12;
    XPathParser.FUNCTIONNAME = 13;
    XPathParser.AXISNAME = 14;
    XPathParser.LITERAL = 15;
    XPathParser.NUMBER = 16;
    XPathParser.ASTERISKNAMETEST = 17;
    XPathParser.QNAME = 18;
    XPathParser.NCNAMECOLONASTERISK = 19;
    XPathParser.NODETYPE = 20;
    XPathParser.PROCESSINGINSTRUCTIONWITHLITERAL = 21;
    XPathParser.EQUALS = 22;
    XPathParser.LESSTHAN = 23;
    XPathParser.GREATERTHAN = 24;
    XPathParser.PLUS = 25;
    XPathParser.MINUS = 26;
    XPathParser.BAR = 27;
    XPathParser.SLASH = 28;
    XPathParser.LEFTPARENTHESIS = 29;
    XPathParser.RIGHTPARENTHESIS = 30;
    XPathParser.COMMA = 31;
    XPathParser.AT = 32;
    XPathParser.LEFTBRACKET = 33;
    XPathParser.RIGHTBRACKET = 34;
    XPathParser.DOT = 35;
    XPathParser.DOLLAR = 36;
    
    XPathParser.prototype.tokenize = function(s1) {
        var types = [];
        var values = [];
        var s = s1 + '\0';
    
        var pos = 0;
        var c = s.charAt(pos++);
        while (1) {
            while (c == ' ' || c == '\t' || c == '\r' || c == '\n') {
                c = s.charAt(pos++);
            }
            if (c == '\0' || pos >= s.length) {
                break;
            }
    
            if (c == '(') {
                types.push(XPathParser.LEFTPARENTHESIS);
                values.push(c);
                c = s.charAt(pos++);
                continue;
            }
            if (c == ')') {
                types.push(XPathParser.RIGHTPARENTHESIS);
                values.push(c);
                c = s.charAt(pos++);
                continue;
            }
            if (c == '[') {
                types.push(XPathParser.LEFTBRACKET);
                values.push(c);
                c = s.charAt(pos++);
                continue;
            }
            if (c == ']') {
                types.push(XPathParser.RIGHTBRACKET);
                values.push(c);
                c = s.charAt(pos++);
                continue;
            }
            if (c == '@') {
                types.push(XPathParser.AT);
                values.push(c);
                c = s.charAt(pos++);
                continue;
            }
            if (c == ',') {
                types.push(XPathParser.COMMA);
                values.push(c);
                c = s.charAt(pos++);
                continue;
            }
            if (c == '|') {
                types.push(XPathParser.BAR);
                values.push(c);
                c = s.charAt(pos++);
                continue;
            }
            if (c == '+') {
                types.push(XPathParser.PLUS);
                values.push(c);
                c = s.charAt(pos++);
                continue;
            }
            if (c == '-') {
                types.push(XPathParser.MINUS);
                values.push(c);
                c = s.charAt(pos++);
                continue;
            }
            if (c == '=') {
                types.push(XPathParser.EQUALS);
                values.push(c);
                c = s.charAt(pos++);
                continue;
            }
            if (c == '$') {
                types.push(XPathParser.DOLLAR);
                values.push(c);
                c = s.charAt(pos++);
                continue;
            }
    
            if (c == '.') {
                c = s.charAt(pos++);
                if (c == '.') {
                    types.push(XPathParser.DOUBLEDOT);
                    values.push("..");
                    c = s.charAt(pos++);
                    continue;
                }
                if (c >= '0' && c <= '9') {
                    var number = "." + c;
                    c = s.charAt(pos++);
                    while (c >= '0' && c <= '9') {
                        number += c;
                        c = s.charAt(pos++);
                    }
                    types.push(XPathParser.NUMBER);
                    values.push(number);
                    continue;
                }
                types.push(XPathParser.DOT);
                values.push('.');
                continue;
            }
    
            if (c == '\'' || c == '"') {
                var delimiter = c;
                var literal = "";
                while (pos < s.length && (c = s.charAt(pos)) !== delimiter) {
                    literal += c;
                    pos += 1;
                }
                if (c !== delimiter) {
                    throw XPathException.fromMessage("Unterminated string literal: " + delimiter + literal);
                }
                pos += 1;
                types.push(XPathParser.LITERAL);
                values.push(literal);
                c = s.charAt(pos++);
                continue;
            }
    
            if (c >= '0' && c <= '9') {
                var number = c;
                c = s.charAt(pos++);
                while (c >= '0' && c <= '9') {
                    number += c;
                    c = s.charAt(pos++);
                }
                if (c == '.') {
                    if (s.charAt(pos) >= '0' && s.charAt(pos) <= '9') {
                        number += c;
                        number += s.charAt(pos++);
                        c = s.charAt(pos++);
                        while (c >= '0' && c <= '9') {
                            number += c;
                            c = s.charAt(pos++);
                        }
                    }
                }
                types.push(XPathParser.NUMBER);
                values.push(number);
                continue;
            }
    
            if (c == '*') {
                if (types.length > 0) {
                    var last = types[types.length - 1];
                    if (last != XPathParser.AT
                            && last != XPathParser.DOUBLECOLON
                            && last != XPathParser.LEFTPARENTHESIS
                            && last != XPathParser.LEFTBRACKET
                            && last != XPathParser.AND
                            && last != XPathParser.OR
                            && last != XPathParser.MOD
                            && last != XPathParser.DIV
                            && last != XPathParser.MULTIPLYOPERATOR
                            && last != XPathParser.SLASH
                            && last != XPathParser.DOUBLESLASH
                            && last != XPathParser.BAR
                            && last != XPathParser.PLUS
                            && last != XPathParser.MINUS
                            && last != XPathParser.EQUALS
                            && last != XPathParser.NOTEQUAL
                            && last != XPathParser.LESSTHAN
                            && last != XPathParser.LESSTHANOREQUAL
                            && last != XPathParser.GREATERTHAN
                            && last != XPathParser.GREATERTHANOREQUAL) {
                        types.push(XPathParser.MULTIPLYOPERATOR);
                        values.push(c);
                        c = s.charAt(pos++);
                        continue;
                    }
                }
                types.push(XPathParser.ASTERISKNAMETEST);
                values.push(c);
                c = s.charAt(pos++);
                continue;
            }
    
            if (c == ':') {
                if (s.charAt(pos) == ':') {
                    types.push(XPathParser.DOUBLECOLON);
                    values.push("::");
                    pos++;
                    c = s.charAt(pos++);
                    continue;
                }
            }
    
            if (c == '/') {
                c = s.charAt(pos++);
                if (c == '/') {
                    types.push(XPathParser.DOUBLESLASH);
                    values.push("//");
                    c = s.charAt(pos++);
                    continue;
                }
                types.push(XPathParser.SLASH);
                values.push('/');
                continue;
            }
    
            if (c == '!') {
                if (s.charAt(pos) == '=') {
                    types.push(XPathParser.NOTEQUAL);
                    values.push("!=");
                    pos++;
                    c = s.charAt(pos++);
                    continue;
                }
            }
    
            if (c == '<') {
                if (s.charAt(pos) == '=') {
                    types.push(XPathParser.LESSTHANOREQUAL);
                    values.push("<=");
                    pos++;
                    c = s.charAt(pos++);
                    continue;
                }
                types.push(XPathParser.LESSTHAN);
                values.push('<');
                c = s.charAt(pos++);
                continue;
            }
    
            if (c == '>') {
                if (s.charAt(pos) == '=') {
                    types.push(XPathParser.GREATERTHANOREQUAL);
                    values.push(">=");
                    pos++;
                    c = s.charAt(pos++);
                    continue;
                }
                types.push(XPathParser.GREATERTHAN);
                values.push('>');
                c = s.charAt(pos++);
                continue;
            }
    
            if (c == '_' || Utilities.isLetter(c.charCodeAt(0))) {
                var name = c;
                c = s.charAt(pos++);
                while (Utilities.isNCNameChar(c.charCodeAt(0))) {
                    name += c;
                    c = s.charAt(pos++);
                }
                if (types.length > 0) {
                    var last = types[types.length - 1];
                    if (last != XPathParser.AT
                            && last != XPathParser.DOUBLECOLON
                            && last != XPathParser.LEFTPARENTHESIS
                            && last != XPathParser.LEFTBRACKET
                            && last != XPathParser.AND
                            && last != XPathParser.OR
                            && last != XPathParser.MOD
                            && last != XPathParser.DIV
                            && last != XPathParser.MULTIPLYOPERATOR
                            && last != XPathParser.SLASH
                            && last != XPathParser.DOUBLESLASH
                            && last != XPathParser.BAR
                            && last != XPathParser.PLUS
                            && last != XPathParser.MINUS
                            && last != XPathParser.EQUALS
                            && last != XPathParser.NOTEQUAL
                            && last != XPathParser.LESSTHAN
                            && last != XPathParser.LESSTHANOREQUAL
                            && last != XPathParser.GREATERTHAN
                            && last != XPathParser.GREATERTHANOREQUAL) {
                        if (name == "and") {
                            types.push(XPathParser.AND);
                            values.push(name);
                            continue;
                        }
                        if (name == "or") {
                            types.push(XPathParser.OR);
                            values.push(name);
                            continue;
                        }
                        if (name == "mod") {
                            types.push(XPathParser.MOD);
                            values.push(name);
                            continue;
                        }
                        if (name == "div") {
                            types.push(XPathParser.DIV);
                            values.push(name);
                            continue;
                        }
                    }
                }
                if (c == ':') {
                    if (s.charAt(pos) == '*') {
                        types.push(XPathParser.NCNAMECOLONASTERISK);
                        values.push(name + ":*");
                        pos++;
                        c = s.charAt(pos++);
                        continue;
                    }
                    if (s.charAt(pos) == '_' || Utilities.isLetter(s.charCodeAt(pos))) {
                        name += ':';
                        c = s.charAt(pos++);
                        while (Utilities.isNCNameChar(c.charCodeAt(0))) {
                            name += c;
                            c = s.charAt(pos++);
                        }
                        if (c == '(') {
                            types.push(XPathParser.FUNCTIONNAME);
                            values.push(name);
                            continue;
                        }
                        types.push(XPathParser.QNAME);
                        values.push(name);
                        continue;
                    }
                    if (s.charAt(pos) == ':') {
                        types.push(XPathParser.AXISNAME);
                        values.push(name);
                        continue;
                    }
                }
                if (c == '(') {
                    if (name == "comment" || name == "text" || name == "node") {
                        types.push(XPathParser.NODETYPE);
                        values.push(name);
                        continue;
                    }
                    if (name == "processing-instruction") {
                        if (s.charAt(pos) == ')') {
                            types.push(XPathParser.NODETYPE);
                        } else {
                            types.push(XPathParser.PROCESSINGINSTRUCTIONWITHLITERAL);
                        }
                        values.push(name);
                        continue;
                    }
                    types.push(XPathParser.FUNCTIONNAME);
                    values.push(name);
                    continue;
                }
                types.push(XPathParser.QNAME);
                values.push(name);
                continue;
            }
    
            throw new Error("Unexpected character " + c);
        }
        types.push(1);
        values.push("[EOF]");
        return [types, values];
    };
    
    XPathParser.SHIFT = 's';
    XPathParser.REDUCE = 'r';
    XPathParser.ACCEPT = 'a';
    
    XPathParser.prototype.parse = function(s) {
        var types;
        var values;
        var res = this.tokenize(s);
        if (res == undefined) {
            return undefined;
        }
        types = res[0];
        values = res[1];
        var tokenPos = 0;
        var state = [];
        var tokenType = [];
        var tokenValue = [];
        var s;
        var a;
        var t;
    
        state.push(0);
        tokenType.push(1);
        tokenValue.push("_S");
    
        a = types[tokenPos];
        t = values[tokenPos++];
        while (1) {
            s = state[state.length - 1];
            switch (XPathParser.actionTable[s].charAt(a - 1)) {
                case XPathParser.SHIFT:
                    tokenType.push(-a);
                    tokenValue.push(t);
                    state.push(XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32);
                    a = types[tokenPos];
                    t = values[tokenPos++];
                    break;
                case XPathParser.REDUCE:
                    var num = XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][1];
                    var rhs = [];
                    for (var i = 0; i < num; i++) {
                        tokenType.pop();
                        rhs.unshift(tokenValue.pop());
                        state.pop();
                    }
                    var s_ = state[state.length - 1];
                    tokenType.push(XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][0]);
                    if (this.reduceActions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32] == undefined) {
                        tokenValue.push(rhs[0]);
                    } else {
                        tokenValue.push(this.reduceActions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32](rhs));
                    }
                    state.push(XPathParser.gotoTable[s_].charCodeAt(XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][0] - 2) - 33);
                    break;
                case XPathParser.ACCEPT:
                    return new XPath(tokenValue.pop());
                default:
                    throw new Error("XPath parse error");
            }
        }
    };
    
    // XPath /////////////////////////////////////////////////////////////////////
    
    XPath.prototype = new Object();
    XPath.prototype.constructor = XPath;
    XPath.superclass = Object.prototype;
    
    function XPath(e) {
        this.expression = e;
    }
    
    XPath.prototype.toString = function() {
        return this.expression.toString();
    };
    
    XPath.prototype.evaluate = function(c) {
        c.contextNode = c.expressionContextNode;
        c.contextSize = 1;
        c.contextPosition = 1;
        c.caseInsensitive = false;
        if (c.contextNode != null) {
            var doc = c.contextNode;
            if (doc.nodeType != 9 /*Node.DOCUMENT_NODE*/) {
                doc = doc.ownerDocument;
            }
            try {
                c.caseInsensitive = doc.implementation.hasFeature("HTML", "2.0");
            } catch (e) {
                c.caseInsensitive = true;
            }
        }
        return this.expression.evaluate(c);
    };
    
    XPath.XML_NAMESPACE_URI = "http://www.w3.org/XML/1998/namespace";
    XPath.XMLNS_NAMESPACE_URI = "http://www.w3.org/2000/xmlns/";
    
    // Expression ////////////////////////////////////////////////////////////////
    
    Expression.prototype = new Object();
    Expression.prototype.constructor = Expression;
    Expression.superclass = Object.prototype;
    
    function Expression() {
    }
    
    Expression.prototype.init = function() {
    };
    
    Expression.prototype.toString = function() {
        return "<Expression>";
    };
    
    Expression.prototype.evaluate = function(c) {
        throw new Error("Could not evaluate expression.");
    };
    
    // UnaryOperation ////////////////////////////////////////////////////////////
    
    UnaryOperation.prototype = new Expression();
    UnaryOperation.prototype.constructor = UnaryOperation;
    UnaryOperation.superclass = Expression.prototype;
    
    function UnaryOperation(rhs) {
        if (arguments.length > 0) {
            this.init(rhs);
        }
    }
    
    UnaryOperation.prototype.init = function(rhs) {
        this.rhs = rhs;
    };
    
    // UnaryMinusOperation ///////////////////////////////////////////////////////
    
    UnaryMinusOperation.prototype = new UnaryOperation();
    UnaryMinusOperation.prototype.constructor = UnaryMinusOperation;
    UnaryMinusOperation.superclass = UnaryOperation.prototype;
    
    function UnaryMinusOperation(rhs) {
        if (arguments.length > 0) {
            this.init(rhs);
        }
    }
    
    UnaryMinusOperation.prototype.init = function(rhs) {
        UnaryMinusOperation.superclass.init.call(this, rhs);
    };
    
    UnaryMinusOperation.prototype.evaluate = function(c) {
        return this.rhs.evaluate(c).number().negate();
    };
    
    UnaryMinusOperation.prototype.toString = function() {
        return "-" + this.rhs.toString();
    };
    
    // BinaryOperation ///////////////////////////////////////////////////////////
    
    BinaryOperation.prototype = new Expression();
    BinaryOperation.prototype.constructor = BinaryOperation;
    BinaryOperation.superclass = Expression.prototype;
    
    function BinaryOperation(lhs, rhs) {
        if (arguments.length > 0) {
            this.init(lhs, rhs);
        }
    }
    
    BinaryOperation.prototype.init = function(lhs, rhs) {
        this.lhs = lhs;
        this.rhs = rhs;
    };
    
    // OrOperation ///////////////////////////////////////////////////////////////
    
    OrOperation.prototype = new BinaryOperation();
    OrOperation.prototype.constructor = OrOperation;
    OrOperation.superclass = BinaryOperation.prototype;
    
    function OrOperation(lhs, rhs) {
        if (arguments.length > 0) {
            this.init(lhs, rhs);
        }
    }
    
    OrOperation.prototype.init = function(lhs, rhs) {
        OrOperation.superclass.init.call(this, lhs, rhs);
    };
    
    OrOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " or " + this.rhs.toString() + ")";
    };
    
    OrOperation.prototype.evaluate = function(c) {
        var b = this.lhs.evaluate(c).bool();
        if (b.booleanValue()) {
            return b;
        }
        return this.rhs.evaluate(c).bool();
    };
    
    // AndOperation //////////////////////////////////////////////////////////////
    
    AndOperation.prototype = new BinaryOperation();
    AndOperation.prototype.constructor = AndOperation;
    AndOperation.superclass = BinaryOperation.prototype;
    
    function AndOperation(lhs, rhs) {
        if (arguments.length > 0) {
            this.init(lhs, rhs);
        }
    }
    
    AndOperation.prototype.init = function(lhs, rhs) {
        AndOperation.superclass.init.call(this, lhs, rhs);
    };
    
    AndOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " and " + this.rhs.toString() + ")";
    };
    
    AndOperation.prototype.evaluate = function(c) {
        var b = this.lhs.evaluate(c).bool();
        if (!b.booleanValue()) {
            return b;
        }
        return this.rhs.evaluate(c).bool();
    };
    
    // EqualsOperation ///////////////////////////////////////////////////////////
    
    EqualsOperation.prototype = new BinaryOperation();
    EqualsOperation.prototype.constructor = EqualsOperation;
    EqualsOperation.superclass = BinaryOperation.prototype;
    
    function EqualsOperation(lhs, rhs) {
        if (arguments.length > 0) {
            this.init(lhs, rhs);
        }
    }
    
    EqualsOperation.prototype.init = function(lhs, rhs) {
        EqualsOperation.superclass.init.call(this, lhs, rhs);
    };
    
    EqualsOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " = " + this.rhs.toString() + ")";
    };
    
    EqualsOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).equals(this.rhs.evaluate(c));
    };
    
    // NotEqualOperation /////////////////////////////////////////////////////////
    
    NotEqualOperation.prototype = new BinaryOperation();
    NotEqualOperation.prototype.constructor = NotEqualOperation;
    NotEqualOperation.superclass = BinaryOperation.prototype;
    
    function NotEqualOperation(lhs, rhs) {
        if (arguments.length > 0) {
            this.init(lhs, rhs);
        }
    }
    
    NotEqualOperation.prototype.init = function(lhs, rhs) {
        NotEqualOperation.superclass.init.call(this, lhs, rhs);
    };
    
    NotEqualOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " != " + this.rhs.toString() + ")";
    };
    
    NotEqualOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).notequal(this.rhs.evaluate(c));
    };
    
    // LessThanOperation /////////////////////////////////////////////////////////
    
    LessThanOperation.prototype = new BinaryOperation();
    LessThanOperation.prototype.constructor = LessThanOperation;
    LessThanOperation.superclass = BinaryOperation.prototype;
    
    function LessThanOperation(lhs, rhs) {
        if (arguments.length > 0) {
            this.init(lhs, rhs);
        }
    }
    
    LessThanOperation.prototype.init = function(lhs, rhs) {
        LessThanOperation.superclass.init.call(this, lhs, rhs);
    };
    
    LessThanOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).lessthan(this.rhs.evaluate(c));
    };
    
    LessThanOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " < " + this.rhs.toString() + ")";
    };
    
    // GreaterThanOperation //////////////////////////////////////////////////////
    
    GreaterThanOperation.prototype = new BinaryOperation();
    GreaterThanOperation.prototype.constructor = GreaterThanOperation;
    GreaterThanOperation.superclass = BinaryOperation.prototype;
    
    function GreaterThanOperation(lhs, rhs) {
        if (arguments.length > 0) {
            this.init(lhs, rhs);
        }
    }
    
    GreaterThanOperation.prototype.init = function(lhs, rhs) {
        GreaterThanOperation.superclass.init.call(this, lhs, rhs);
    };
    
    GreaterThanOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).greaterthan(this.rhs.evaluate(c));
    };
    
    GreaterThanOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " > " + this.rhs.toString() + ")";
    };
    
    // LessThanOrEqualOperation //////////////////////////////////////////////////
    
    LessThanOrEqualOperation.prototype = new BinaryOperation();
    LessThanOrEqualOperation.prototype.constructor = LessThanOrEqualOperation;
    LessThanOrEqualOperation.superclass = BinaryOperation.prototype;
    
    function LessThanOrEqualOperation(lhs, rhs) {
        if (arguments.length > 0) {
            this.init(lhs, rhs);
        }
    }
    
    LessThanOrEqualOperation.prototype.init = function(lhs, rhs) {
        LessThanOrEqualOperation.superclass.init.call(this, lhs, rhs);
    };
    
    LessThanOrEqualOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).lessthanorequal(this.rhs.evaluate(c));
    };
    
    LessThanOrEqualOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " <= " + this.rhs.toString() + ")";
    };
    
    // GreaterThanOrEqualOperation ///////////////////////////////////////////////
    
    GreaterThanOrEqualOperation.prototype = new BinaryOperation();
    GreaterThanOrEqualOperation.prototype.constructor = GreaterThanOrEqualOperation;
    GreaterThanOrEqualOperation.superclass = BinaryOperation.prototype;
    
    function GreaterThanOrEqualOperation(lhs, rhs) {
        if (arguments.length > 0) {
            this.init(lhs, rhs);
        }
    }
    
    GreaterThanOrEqualOperation.prototype.init = function(lhs, rhs) {
        GreaterThanOrEqualOperation.superclass.init.call(this, lhs, rhs);
    };
    
    GreaterThanOrEqualOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).greaterthanorequal(this.rhs.evaluate(c));
    };
    
    GreaterThanOrEqualOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " >= " + this.rhs.toString() + ")";
    };
    
    // PlusOperation /////////////////////////////////////////////////////////////
    
    PlusOperation.prototype = new BinaryOperation();
    PlusOperation.prototype.constructor = PlusOperation;
    PlusOperation.superclass = BinaryOperation.prototype;
    
    function PlusOperation(lhs, rhs) {
        if (arguments.length > 0) {
            this.init(lhs, rhs);
        }
    }
    
    PlusOperation.prototype.init = function(lhs, rhs) {
        PlusOperation.superclass.init.call(this, lhs, rhs);
    };
    
    PlusOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().plus(this.rhs.evaluate(c).number());
    };
    
    PlusOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " + " + this.rhs.toString() + ")";
    };
    
    // MinusOperation ////////////////////////////////////////////////////////////
    
    MinusOperation.prototype = new BinaryOperation();
    MinusOperation.prototype.constructor = MinusOperation;
    MinusOperation.superclass = BinaryOperation.prototype;
    
    function MinusOperation(lhs, rhs) {
        if (arguments.length > 0) {
            this.init(lhs, rhs);
        }
    }
    
    MinusOperation.prototype.init = function(lhs, rhs) {
        MinusOperation.superclass.init.call(this, lhs, rhs);
    };
    
    MinusOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().minus(this.rhs.evaluate(c).number());
    };
    
    MinusOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " - " + this.rhs.toString() + ")";
    };
    
    // MultiplyOperation /////////////////////////////////////////////////////////
    
    MultiplyOperation.prototype = new BinaryOperation();
    MultiplyOperation.prototype.constructor = MultiplyOperation;
    MultiplyOperation.superclass = BinaryOperation.prototype;
    
    function MultiplyOperation(lhs, rhs) {
        if (arguments.length > 0) {
            this.init(lhs, rhs);
        }
    }
    
    MultiplyOperation.prototype.init = function(lhs, rhs) {
        MultiplyOperation.superclass.init.call(this, lhs, rhs);
    };
    
    MultiplyOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().multiply(this.rhs.evaluate(c).number());
    };
    
    MultiplyOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " * " + this.rhs.toString() + ")";
    };
    
    // DivOperation //////////////////////////////////////////////////////////////
    
    DivOperation.prototype = new BinaryOperation();
    DivOperation.prototype.constructor = DivOperation;
    DivOperation.superclass = BinaryOperation.prototype;
    
    function DivOperation(lhs, rhs) {
        if (arguments.length > 0) {
            this.init(lhs, rhs);
        }
    }
    
    DivOperation.prototype.init = function(lhs, rhs) {
        DivOperation.superclass.init.call(this, lhs, rhs);
    };
    
    DivOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().div(this.rhs.evaluate(c).number());
    };
    
    DivOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " div " + this.rhs.toString() + ")";
    };
    
    // ModOperation //////////////////////////////////////////////////////////////
    
    ModOperation.prototype = new BinaryOperation();
    ModOperation.prototype.constructor = ModOperation;
    ModOperation.superclass = BinaryOperation.prototype;
    
    function ModOperation(lhs, rhs) {
        if (arguments.length > 0) {
            this.init(lhs, rhs);
        }
    }
    
    ModOperation.prototype.init = function(lhs, rhs) {
        ModOperation.superclass.init.call(this, lhs, rhs);
    };
    
    ModOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().mod(this.rhs.evaluate(c).number());
    };
    
    ModOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " mod " + this.rhs.toString() + ")";
    };
    
    // BarOperation //////////////////////////////////////////////////////////////
    
    BarOperation.prototype = new BinaryOperation();
    BarOperation.prototype.constructor = BarOperation;
    BarOperation.superclass = BinaryOperation.prototype;
    
    function BarOperation(lhs, rhs) {
        if (arguments.length > 0) {
            this.init(lhs, rhs);
        }
    }
    
    BarOperation.prototype.init = function(lhs, rhs) {
        BarOperation.superclass.init.call(this, lhs, rhs);
    };
    
    BarOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).nodeset().union(this.rhs.evaluate(c).nodeset());
    };
    
    BarOperation.prototype.toString = function() {
        return this.lhs.toString() + " | " + this.rhs.toString();
    };
    
    // PathExpr //////////////////////////////////////////////////////////////////
    
    PathExpr.prototype = new Expression();
    PathExpr.prototype.constructor = PathExpr;
    PathExpr.superclass = Expression.prototype;
    
    function PathExpr(filter, filterPreds, locpath) {
        if (arguments.length > 0) {
            this.init(filter, filterPreds, locpath);
        }
    }
    
    PathExpr.prototype.init = function(filter, filterPreds, locpath) {
        PathExpr.superclass.init.call(this);
        this.filter = filter;
        this.filterPredicates = filterPreds;
        this.locationPath = locpath;
    };
    
    /**
     * Returns the topmost node of the tree containing node
     */
    function findRoot(node) {
        while (node && node.parentNode) {
            node = node.parentNode;
        }
    
        return node;
    }
    
    
    PathExpr.prototype.evaluate = function(c) {
        var nodes;
        var xpc = new XPathContext();
        xpc.variableResolver = c.variableResolver;
        xpc.functionResolver = c.functionResolver;
        xpc.namespaceResolver = c.namespaceResolver;
        xpc.expressionContextNode = c.expressionContextNode;
        xpc.virtualRoot = c.virtualRoot;
        xpc.caseInsensitive = c.caseInsensitive;
        if (this.filter == null) {
            nodes = [ c.contextNode ];
        } else {
            var ns = this.filter.evaluate(c);
            if (!Utilities.instance_of(ns, XNodeSet)) {
                if (this.filterPredicates != null && this.filterPredicates.length > 0 || this.locationPath != null) {
                    throw new Error("Path expression filter must evaluate to a nodset if predicates or location path are used");
                }
                return ns;
            }
            nodes = ns.toUnsortedArray();
            if (this.filterPredicates != null) {
                // apply each of the predicates in turn
                for (var j = 0; j < this.filterPredicates.length; j++) {
                    var pred = this.filterPredicates[j];
                    var newNodes = [];
                    xpc.contextSize = nodes.length;
                    for (xpc.contextPosition = 1; xpc.contextPosition <= xpc.contextSize; xpc.contextPosition++) {
                        xpc.contextNode = nodes[xpc.contextPosition - 1];
                        if (this.predicateMatches(pred, xpc)) {
                            newNodes.push(xpc.contextNode);
                        }
                    }
                    nodes = newNodes;
                }
            }
        }
        if (this.locationPath != null) {
            if (this.locationPath.absolute) {
                if (nodes[0].nodeType != 9 /*Node.DOCUMENT_NODE*/) {
                    if (xpc.virtualRoot != null) {
                        nodes = [ xpc.virtualRoot ];
                    } else {
                        if (nodes[0].ownerDocument == null) {
                            // IE 5.5 doesn't have ownerDocument?
                            var n = nodes[0];
                            while (n.parentNode != null) {
                                n = n.parentNode;
                            }
                            nodes = [ n ];
                        } else {
                            nodes = [ nodes[0].ownerDocument ];
                        }
                    }
                } else {
                    nodes = [ nodes[0] ];
                }
            }
            for (var i = 0; i < this.locationPath.steps.length; i++) {
                var step = this.locationPath.steps[i];
                var newNodes = [];
                for (var j = 0; j < nodes.length; j++) {
                    xpc.contextNode = nodes[j];
                    switch (step.axis) {
                        case Step.ANCESTOR:
                            // look at all the ancestor nodes
                            if (xpc.contextNode === xpc.virtualRoot) {
                                break;
                            }
                            var m;
                            if (xpc.contextNode.nodeType == 2 /*Node.ATTRIBUTE_NODE*/) {
                                m = this.getOwnerElement(xpc.contextNode);
                            } else {
                                m = xpc.contextNode.parentNode;
                            }
                            while (m != null) {
                                if (step.nodeTest.matches(m, xpc)) {
                                    newNodes.push(m);
                                }
                                if (m === xpc.virtualRoot) {
                                    break;
                                }
                                m = m.parentNode;
                            }
                            break;
    
                        case Step.ANCESTORORSELF:
                            // look at all the ancestor nodes and the current node
                            for (var m = xpc.contextNode; m != null; m = m.nodeType == 2 /*Node.ATTRIBUTE_NODE*/ ? this.getOwnerElement(m) : m.parentNode) {
                                if (step.nodeTest.matches(m, xpc)) {
                                    newNodes.push(m);
                                }
                                if (m === xpc.virtualRoot) {
                                    break;
                                }
                            }
                            break;
    
                        case Step.ATTRIBUTE:
                            // look at the attributes
                            var nnm = xpc.contextNode.attributes;
                            if (nnm != null) {
                                for (var k = 0; k < nnm.length; k++) {
                                    var m = nnm.item(k);
                                    if (step.nodeTest.matches(m, xpc)) {
                                        newNodes.push(m);
                                    }
                                }
                            }
                            break;
    
                        case Step.CHILD:
                            // look at all child elements
                            for (var m = xpc.contextNode.firstChild; m != null; m = m.nextSibling) {
                                if (step.nodeTest.matches(m, xpc)) {
                                    newNodes.push(m);
                                }
                            }
                            break;
    
                        case Step.DESCENDANT:
                            // look at all descendant nodes
                            var st = [ xpc.contextNode.firstChild ];
                            while (st.length > 0) {
                                for (var m = st.pop(); m != null; ) {
                                    if (step.nodeTest.matches(m, xpc)) {
                                        newNodes.push(m);
                                    }
                                    if (m.firstChild != null) {
                                        st.push(m.nextSibling);
                                        m = m.firstChild;
                                    } else {
                                        m = m.nextSibling;
                                    }
                                }
                            }
                            break;
    
                        case Step.DESCENDANTORSELF:
                            // look at self
                            if (step.nodeTest.matches(xpc.contextNode, xpc)) {
                                newNodes.push(xpc.contextNode);
                            }
                            // look at all descendant nodes
                            var st = [ xpc.contextNode.firstChild ];
                            while (st.length > 0) {
                                for (var m = st.pop(); m != null; ) {
                                    if (step.nodeTest.matches(m, xpc)) {
                                        newNodes.push(m);
                                    }
                                    if (m.firstChild != null) {
                                        st.push(m.nextSibling);
                                        m = m.firstChild;
                                    } else {
                                        m = m.nextSibling;
                                    }
                                }
                            }
                            break;
    
                        case Step.FOLLOWING:
                            if (xpc.contextNode === xpc.virtualRoot) {
                                break;
                            }
                            var st = [];
                            if (xpc.contextNode.firstChild != null) {
                                st.unshift(xpc.contextNode.firstChild);
                            } else {
                                st.unshift(xpc.contextNode.nextSibling);
                            }
                            for (var m = xpc.contextNode.parentNode; m != null && m.nodeType != 9 /*Node.DOCUMENT_NODE*/ && m !== xpc.virtualRoot; m = m.parentNode) {
                                st.unshift(m.nextSibling);
                            }
                            do {
                                for (var m = st.pop(); m != null; ) {
                                    if (step.nodeTest.matches(m, xpc)) {
                                        newNodes.push(m);
                                    }
                                    if (m.firstChild != null) {
                                        st.push(m.nextSibling);
                                        m = m.firstChild;
                                    } else {
                                        m = m.nextSibling;
                                    }
                                }
                            } while (st.length > 0);
                            break;
    
                        case Step.FOLLOWINGSIBLING:
                            if (xpc.contextNode === xpc.virtualRoot) {
                                break;
                            }
                            for (var m = xpc.contextNode.nextSibling; m != null; m = m.nextSibling) {
                                if (step.nodeTest.matches(m, xpc)) {
                                    newNodes.push(m);
                                }
                            }
                            break;
    
                        case Step.NAMESPACE:
                            var n = {};
                            if (xpc.contextNode.nodeType == 1 /*Node.ELEMENT_NODE*/) {
                                n["xml"] = XPath.XML_NAMESPACE_URI;
                                n["xmlns"] = XPath.XMLNS_NAMESPACE_URI;
                                for (var m = xpc.contextNode; m != null && m.nodeType == 1 /*Node.ELEMENT_NODE*/; m = m.parentNode) {
                                    for (var k = 0; k < m.attributes.length; k++) {
                                        var attr = m.attributes.item(k);
                                        var nm = String(attr.name);
                                        if (nm == "xmlns") {
                                            if (n[""] == undefined) {
                                                n[""] = attr.value;
                                            }
                                        } else if (nm.length > 6 && nm.substring(0, 6) == "xmlns:") {
                                            var pre = nm.substring(6, nm.length);
                                            if (n[pre] == undefined) {
                                                n[pre] = attr.value;
                                            }
                                        }
                                    }
                                }
                                for (var pre in n) {
                                    var nsn = new XPathNamespace(pre, n[pre], xpc.contextNode);
                                    if (step.nodeTest.matches(nsn, xpc)) {
                                        newNodes.push(nsn);
                                    }
                                }
                            }
                            break;
    
                        case Step.PARENT:
                            m = null;
                            if (xpc.contextNode !== xpc.virtualRoot) {
                                if (xpc.contextNode.nodeType == 2 /*Node.ATTRIBUTE_NODE*/) {
                                    m = this.getOwnerElement(xpc.contextNode);
                                } else {
                                    m = xpc.contextNode.parentNode;
                                }
                            }
                            if (m != null && step.nodeTest.matches(m, xpc)) {
                                newNodes.push(m);
                            }
                            break;
    
                        case Step.PRECEDING:
                            var st;
                            if (xpc.virtualRoot != null) {
                                st = [ xpc.virtualRoot ];
                            } else {
                                // cannot rely on .ownerDocument because the node may be in a document fragment
                                st = [findRoot(xpc.contextNode)];
                            }
                            outer: while (st.length > 0) {
                                for (var m = st.pop(); m != null; ) {
                                    if (m == xpc.contextNode) {
                                        break outer;
                                    }
                                    if (step.nodeTest.matches(m, xpc)) {
                                        newNodes.unshift(m);
                                    }
                                    if (m.firstChild != null) {
                                        st.push(m.nextSibling);
                                        m = m.firstChild;
                                    } else {
                                        m = m.nextSibling;
                                    }
                                }
                            }
                            break;
    
                        case Step.PRECEDINGSIBLING:
                            if (xpc.contextNode === xpc.virtualRoot) {
                                break;
                            }
                            for (var m = xpc.contextNode.previousSibling; m != null; m = m.previousSibling) {
                                if (step.nodeTest.matches(m, xpc)) {
                                    newNodes.push(m);
                                }
                            }
                            break;
    
                        case Step.SELF:
                            if (step.nodeTest.matches(xpc.contextNode, xpc)) {
                                newNodes.push(xpc.contextNode);
                            }
                            break;
    
                        default:
                    }
                }
                nodes = newNodes;
                // apply each of the predicates in turn
                for (var j = 0; j < step.predicates.length; j++) {
                    var pred = step.predicates[j];
                    var newNodes = [];
                    xpc.contextSize = nodes.length;
                    for (xpc.contextPosition = 1; xpc.contextPosition <= xpc.contextSize; xpc.contextPosition++) {
                        xpc.contextNode = nodes[xpc.contextPosition - 1];
                        if (this.predicateMatches(pred, xpc)) {
                            newNodes.push(xpc.contextNode);
                        } else {
                        }
                    }
                    nodes = newNodes;
                }
            }
        }
        var ns = new XNodeSet();
        ns.addArray(nodes);
        return ns;
    };
    
    PathExpr.prototype.predicateMatches = function(pred, c) {
        var res = pred.evaluate(c);
        if (Utilities.instance_of(res, XNumber)) {
            return c.contextPosition == res.numberValue();
        }
        return res.booleanValue();
    };
    
    PathExpr.prototype.toString = function() {
        if (this.filter != undefined) {
            var s = this.filter.toString();
            if (Utilities.instance_of(this.filter, XString)) {
                s = "'" + s + "'";
            }
            if (this.filterPredicates != undefined) {
                for (var i = 0; i < this.filterPredicates.length; i++) {
                    s = s + "[" + this.filterPredicates[i].toString() + "]";
                }
            }
            if (this.locationPath != undefined) {
                if (!this.locationPath.absolute) {
                    s += "/";
                }
                s += this.locationPath.toString();
            }
            return s;
        }
        return this.locationPath.toString();
    };
    
    PathExpr.prototype.getOwnerElement = function(n) {
        // DOM 2 has ownerElement
        if (n.ownerElement) {
            return n.ownerElement;
        }
        // DOM 1 Internet Explorer can use selectSingleNode (ironically)
        try {
            if (n.selectSingleNode) {
                return n.selectSingleNode("..");
            }
        } catch (e) {
        }
        // Other DOM 1 implementations must use this egregious search
        var doc = n.nodeType == 9 /*Node.DOCUMENT_NODE*/
                ? n
                : n.ownerDocument;
        var elts = doc.getElementsByTagName("*");
        for (var i = 0; i < elts.length; i++) {
            var elt = elts.item(i);
            var nnm = elt.attributes;
            for (var j = 0; j < nnm.length; j++) {
                var an = nnm.item(j);
                if (an === n) {
                    return elt;
                }
            }
        }
        return null;
    };
    
    // LocationPath //////////////////////////////////////////////////////////////
    
    LocationPath.prototype = new Object();
    LocationPath.prototype.constructor = LocationPath;
    LocationPath.superclass = Object.prototype;
    
    function LocationPath(abs, steps) {
        if (arguments.length > 0) {
            this.init(abs, steps);
        }
    }
    
    LocationPath.prototype.init = function(abs, steps) {
        this.absolute = abs;
        this.steps = steps;
    };
    
    LocationPath.prototype.toString = function() {
        var s;
        if (this.absolute) {
            s = "/";
        } else {
            s = "";
        }
        for (var i = 0; i < this.steps.length; i++) {
            if (i != 0) {
                s += "/";
            }
            s += this.steps[i].toString();
        }
        return s;
    };
    
    // Step //////////////////////////////////////////////////////////////////////
    
    Step.prototype = new Object();
    Step.prototype.constructor = Step;
    Step.superclass = Object.prototype;
    
    function Step(axis, nodetest, preds) {
        if (arguments.length > 0) {
            this.init(axis, nodetest, preds);
        }
    }
    
    Step.prototype.init = function(axis, nodetest, preds) {
        this.axis = axis;
        this.nodeTest = nodetest;
        this.predicates = preds;
    };
    
    Step.prototype.toString = function() {
        var s;
        switch (this.axis) {
            case Step.ANCESTOR:
                s = "ancestor";
                break;
            case Step.ANCESTORORSELF:
                s = "ancestor-or-self";
                break;
            case Step.ATTRIBUTE:
                s = "attribute";
                break;
            case Step.CHILD:
                s = "child";
                break;
            case Step.DESCENDANT:
                s = "descendant";
                break;
            case Step.DESCENDANTORSELF:
                s = "descendant-or-self";
                break;
            case Step.FOLLOWING:
                s = "following";
                break;
            case Step.FOLLOWINGSIBLING:
                s = "following-sibling";
                break;
            case Step.NAMESPACE:
                s = "namespace";
                break;
            case Step.PARENT:
                s = "parent";
                break;
            case Step.PRECEDING:
                s = "preceding";
                break;
            case Step.PRECEDINGSIBLING:
                s = "preceding-sibling";
                break;
            case Step.SELF:
                s = "self";
                break;
        }
        s += "::";
        s += this.nodeTest.toString();
        for (var i = 0; i < this.predicates.length; i++) {
            s += "[" + this.predicates[i].toString() + "]";
        }
        return s;
    };
    
    Step.ANCESTOR = 0;
    Step.ANCESTORORSELF = 1;
    Step.ATTRIBUTE = 2;
    Step.CHILD = 3;
    Step.DESCENDANT = 4;
    Step.DESCENDANTORSELF = 5;
    Step.FOLLOWING = 6;
    Step.FOLLOWINGSIBLING = 7;
    Step.NAMESPACE = 8;
    Step.PARENT = 9;
    Step.PRECEDING = 10;
    Step.PRECEDINGSIBLING = 11;
    Step.SELF = 12;
    
    // NodeTest //////////////////////////////////////////////////////////////////
    
    NodeTest.prototype = new Object();
    NodeTest.prototype.constructor = NodeTest;
    NodeTest.superclass = Object.prototype;
    
    function NodeTest(type, value) {
        if (arguments.length > 0) {
            this.init(type, value);
        }
    }
    
    NodeTest.prototype.init = function(type, value) {
        this.type = type;
        this.value = value;
    };
    
    NodeTest.prototype.toString = function() {
        switch (this.type) {
            case NodeTest.NAMETESTANY:
                return "*";
            case NodeTest.NAMETESTPREFIXANY:
                return this.value + ":*";
            case NodeTest.NAMETESTRESOLVEDANY:
                return "{" + this.value + "}*";
            case NodeTest.NAMETESTQNAME:
                return this.value;
            case NodeTest.NAMETESTRESOLVEDNAME:
                return "{" + this.namespaceURI + "}" + this.value;
            case NodeTest.COMMENT:
                return "comment()";
            case NodeTest.TEXT:
                return "text()";
            case NodeTest.PI:
                if (this.value != undefined) {
                    return "processing-instruction(\"" + this.value + "\")";
                }
                return "processing-instruction()";
            case NodeTest.NODE:
                return "node()";
        }
        return "<unknown nodetest type>";
    };
    
    NodeTest.prototype.matches = function (n, xpc) {
        var nType = n.nodeType;
    
        switch (this.type) {
            case NodeTest.NAMETESTANY:
                if (nType === 2 /*Node.ATTRIBUTE_NODE*/
                        || nType === 1 /*Node.ELEMENT_NODE*/
                        || nType === XPathNamespace.XPATH_NAMESPACE_NODE) {
                    return true;
                }
                return false;
            case NodeTest.NAMETESTPREFIXANY:
                if (nType === 2 /*Node.ATTRIBUTE_NODE*/ || nType === 1 /*Node.ELEMENT_NODE*/) {
                    var ns = xpc.namespaceResolver.getNamespace(this.value, xpc.expressionContextNode);
                    if (ns == null) {
                        throw new Error("Cannot resolve QName " + this.value);
                    }
                    return ns === (n.namespaceURI || '');
                }
                return false;
            case NodeTest.NAMETESTQNAME:
                if (nType === 2 /*Node.ATTRIBUTE_NODE*/
                        || nType === 1 /*Node.ELEMENT_NODE*/
                        || nType === XPathNamespace.XPATH_NAMESPACE_NODE) {
                    var test = Utilities.resolveQName(this.value, xpc.namespaceResolver, xpc.expressionContextNode, false);
                    if (test[0] == null) {
                        throw new Error("Cannot resolve QName " + this.value);
                    }
    
                    test[0] = String(test[0]) || null;
                    test[1] = String(test[1]);
    
                    var node = [
                        String(n.namespaceURI || '') || null,
                        // localName will be null if the node was created with DOM1 createElement()
                        String(n.localName || n.nodeName)
                    ];
    
                    if (xpc.caseInsensitive) {
                        return test[0] === node[0] && test[1].toLowerCase() === node[1].toLowerCase();
                    }
    
                    return test[0] === node[0] && test[1] === node[1];
                }
                return false;
            case NodeTest.COMMENT:
                return nType === 8 /*Node.COMMENT_NODE*/;
            case NodeTest.TEXT:
                return nType === 3 /*Node.TEXT_NODE*/ || nType == 4 /*Node.CDATA_SECTION_NODE*/;
            case NodeTest.PI:
                return nType === 7 /*Node.PROCESSING_INSTRUCTION_NODE*/
                    && (this.value == null || n.nodeName == this.value);
            case NodeTest.NODE:
                return nType === 9 /*Node.DOCUMENT_NODE*/
                    || nType === 1 /*Node.ELEMENT_NODE*/
                    || nType === 2 /*Node.ATTRIBUTE_NODE*/
                    || nType === 3 /*Node.TEXT_NODE*/
                    || nType === 4 /*Node.CDATA_SECTION_NODE*/
                    || nType === 8 /*Node.COMMENT_NODE*/
                    || nType === 7 /*Node.PROCESSING_INSTRUCTION_NODE*/;
        }
        return false;
    };
    
    NodeTest.NAMETESTANY = 0;
    NodeTest.NAMETESTPREFIXANY = 1;
    NodeTest.NAMETESTQNAME = 2;
    NodeTest.COMMENT = 3;
    NodeTest.TEXT = 4;
    NodeTest.PI = 5;
    NodeTest.NODE = 6;
    
    // VariableReference /////////////////////////////////////////////////////////
    
    VariableReference.prototype = new Expression();
    VariableReference.prototype.constructor = VariableReference;
    VariableReference.superclass = Expression.prototype;
    
    function VariableReference(v) {
        if (arguments.length > 0) {
            this.init(v);
        }
    }
    
    VariableReference.prototype.init = function(v) {
        this.variable = v;
    };
    
    VariableReference.prototype.toString = function() {
        return "$" + this.variable;
    };
    
    VariableReference.prototype.evaluate = function(c) {
        var parts = Utilities.resolveQName(this.variable, c.namespaceResolver, c.contextNode, false);
    
        if (parts[0] == null) {
            throw new Error("Cannot resolve QName " + fn);
        }
        var result = c.variableResolver.getVariable(parts[1], parts[0]);
        if (!result) {
            throw XPathException.fromMessage("Undeclared variable: " + this.toString());
        }
        return result;
    };
    
    // FunctionCall //////////////////////////////////////////////////////////////
    
    FunctionCall.prototype = new Expression();
    FunctionCall.prototype.constructor = FunctionCall;
    FunctionCall.superclass = Expression.prototype;
    
    function FunctionCall(fn, args) {
        if (arguments.length > 0) {
            this.init(fn, args);
        }
    }
    
    FunctionCall.prototype.init = function(fn, args) {
        this.functionName = fn;
        this.arguments = args;
    };
    
    FunctionCall.prototype.toString = function() {
        var s = this.functionName + "(";
        for (var i = 0; i < this.arguments.length; i++) {
            if (i > 0) {
                s += ", ";
            }
            s += this.arguments[i].toString();
        }
        return s + ")";
    };
    
    FunctionCall.prototype.evaluate = function(c) {
        var f = FunctionResolver.getFunctionFromContext(this.functionName, c);
    
        if (!f) {
            throw new Error("Unknown function " + this.functionName);
        }
    
        var a = [c].concat(this.arguments);
        return f.apply(c.functionResolver.thisArg, a);
    };
    
    // XString ///////////////////////////////////////////////////////////////////
    
    XString.prototype = new Expression();
    XString.prototype.constructor = XString;
    XString.superclass = Expression.prototype;
    
    function XString(s) {
        if (arguments.length > 0) {
            this.init(s);
        }
    }
    
    XString.prototype.init = function(s) {
        this.str = String(s);
    };
    
    XString.prototype.toString = function() {
        return this.str;
    };
    
    XString.prototype.evaluate = function(c) {
        return this;
    };
    
    XString.prototype.string = function() {
        return this;
    };
    
    XString.prototype.number = function() {
        return new XNumber(this.str);
    };
    
    XString.prototype.bool = function() {
        return new XBoolean(this.str);
    };
    
    XString.prototype.nodeset = function() {
        throw new Error("Cannot convert string to nodeset");
    };
    
    XString.prototype.stringValue = function() {
        return this.str;
    };
    
    XString.prototype.numberValue = function() {
        return this.number().numberValue();
    };
    
    XString.prototype.booleanValue = function() {
        return this.bool().booleanValue();
    };
    
    XString.prototype.equals = function(r) {
        if (Utilities.instance_of(r, XBoolean)) {
            return this.bool().equals(r);
        }
        if (Utilities.instance_of(r, XNumber)) {
            return this.number().equals(r);
        }
        if (Utilities.instance_of(r, XNodeSet)) {
            return r.compareWithString(this, Operators.equals);
        }
        return new XBoolean(this.str == r.str);
    };
    
    XString.prototype.notequal = function(r) {
        if (Utilities.instance_of(r, XBoolean)) {
            return this.bool().notequal(r);
        }
        if (Utilities.instance_of(r, XNumber)) {
            return this.number().notequal(r);
        }
        if (Utilities.instance_of(r, XNodeSet)) {
            return r.compareWithString(this, Operators.notequal);
        }
        return new XBoolean(this.str != r.str);
    };
    
    XString.prototype.lessthan = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
            return r.compareWithNumber(this.number(), Operators.greaterthanorequal);
        }
        return this.number().lessthan(r.number());
    };
    
    XString.prototype.greaterthan = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
            return r.compareWithNumber(this.number(), Operators.lessthanorequal);
        }
        return this.number().greaterthan(r.number());
    };
    
    XString.prototype.lessthanorequal = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
            return r.compareWithNumber(this.number(), Operators.greaterthan);
        }
        return this.number().lessthanorequal(r.number());
    };
    
    XString.prototype.greaterthanorequal = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
            return r.compareWithNumber(this.number(), Operators.lessthan);
        }
        return this.number().greaterthanorequal(r.number());
    };
    
    // XNumber ///////////////////////////////////////////////////////////////////
    
    XNumber.prototype = new Expression();
    XNumber.prototype.constructor = XNumber;
    XNumber.superclass = Expression.prototype;
    
    function XNumber(n) {
        if (arguments.length > 0) {
            this.init(n);
        }
    }
    
    XNumber.prototype.init = function(n) {
        this.num = typeof n === "string" ? this.parse(n) : Number(n);
    };
    
    XNumber.prototype.numberFormat = /^\s*-?[0-9]*\.?[0-9]+\s*$/;
    
    XNumber.prototype.parse = function(s) {
        // XPath representation of numbers is more restrictive than what Number() or parseFloat() allow
        return this.numberFormat.test(s) ? parseFloat(s) : Number.NaN;
    };
    
    XNumber.prototype.toString = function() {
        return this.num;
    };
    
    XNumber.prototype.evaluate = function(c) {
        return this;
    };
    
    XNumber.prototype.string = function() {
        return new XString(this.num);
    };
    
    XNumber.prototype.number = function() {
        return this;
    };
    
    XNumber.prototype.bool = function() {
        return new XBoolean(this.num);
    };
    
    XNumber.prototype.nodeset = function() {
        throw new Error("Cannot convert number to nodeset");
    };
    
    XNumber.prototype.stringValue = function() {
        return this.string().stringValue();
    };
    
    XNumber.prototype.numberValue = function() {
        return this.num;
    };
    
    XNumber.prototype.booleanValue = function() {
        return this.bool().booleanValue();
    };
    
    XNumber.prototype.negate = function() {
        return new XNumber(-this.num);
    };
    
    XNumber.prototype.equals = function(r) {
        if (Utilities.instance_of(r, XBoolean)) {
            return this.bool().equals(r);
        }
        if (Utilities.instance_of(r, XString)) {
            return this.equals(r.number());
        }
        if (Utilities.instance_of(r, XNodeSet)) {
            return r.compareWithNumber(this, Operators.equals);
        }
        return new XBoolean(this.num == r.num);
    };
    
    XNumber.prototype.notequal = function(r) {
        if (Utilities.instance_of(r, XBoolean)) {
            return this.bool().notequal(r);
        }
        if (Utilities.instance_of(r, XString)) {
            return this.notequal(r.number());
        }
        if (Utilities.instance_of(r, XNodeSet)) {
            return r.compareWithNumber(this, Operators.notequal);
        }
        return new XBoolean(this.num != r.num);
    };
    
    XNumber.prototype.lessthan = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
            return r.compareWithNumber(this, Operators.greaterthanorequal);
        }
        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
            return this.lessthan(r.number());
        }
        return new XBoolean(this.num < r.num);
    };
    
    XNumber.prototype.greaterthan = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
            return r.compareWithNumber(this, Operators.lessthanorequal);
        }
        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
            return this.greaterthan(r.number());
        }
        return new XBoolean(this.num > r.num);
    };
    
    XNumber.prototype.lessthanorequal = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
            return r.compareWithNumber(this, Operators.greaterthan);
        }
        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
            return this.lessthanorequal(r.number());
        }
        return new XBoolean(this.num <= r.num);
    };
    
    XNumber.prototype.greaterthanorequal = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
            return r.compareWithNumber(this, Operators.lessthan);
        }
        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
            return this.greaterthanorequal(r.number());
        }
        return new XBoolean(this.num >= r.num);
    };
    
    XNumber.prototype.plus = function(r) {
        return new XNumber(this.num + r.num);
    };
    
    XNumber.prototype.minus = function(r) {
        return new XNumber(this.num - r.num);
    };
    
    XNumber.prototype.multiply = function(r) {
        return new XNumber(this.num * r.num);
    };
    
    XNumber.prototype.div = function(r) {
        return new XNumber(this.num / r.num);
    };
    
    XNumber.prototype.mod = function(r) {
        return new XNumber(this.num % r.num);
    };
    
    // XBoolean //////////////////////////////////////////////////////////////////
    
    XBoolean.prototype = new Expression();
    XBoolean.prototype.constructor = XBoolean;
    XBoolean.superclass = Expression.prototype;
    
    function XBoolean(b) {
        if (arguments.length > 0) {
            this.init(b);
        }
    }
    
    XBoolean.prototype.init = function(b) {
        this.b = Boolean(b);
    };
    
    XBoolean.prototype.toString = function() {
        return this.b.toString();
    };
    
    XBoolean.prototype.evaluate = function(c) {
        return this;
    };
    
    XBoolean.prototype.string = function() {
        return new XString(this.b);
    };
    
    XBoolean.prototype.number = function() {
        return new XNumber(this.b);
    };
    
    XBoolean.prototype.bool = function() {
        return this;
    };
    
    XBoolean.prototype.nodeset = function() {
        throw new Error("Cannot convert boolean to nodeset");
    };
    
    XBoolean.prototype.stringValue = function() {
        return this.string().stringValue();
    };
    
    XBoolean.prototype.numberValue = function() {
        return this.num().numberValue();
    };
    
    XBoolean.prototype.booleanValue = function() {
        return this.b;
    };
    
    XBoolean.prototype.not = function() {
        return new XBoolean(!this.b);
    };
    
    XBoolean.prototype.equals = function(r) {
        if (Utilities.instance_of(r, XString) || Utilities.instance_of(r, XNumber)) {
            return this.equals(r.bool());
        }
        if (Utilities.instance_of(r, XNodeSet)) {
            return r.compareWithBoolean(this, Operators.equals);
        }
        return new XBoolean(this.b == r.b);
    };
    
    XBoolean.prototype.notequal = function(r) {
        if (Utilities.instance_of(r, XString) || Utilities.instance_of(r, XNumber)) {
            return this.notequal(r.bool());
        }
        if (Utilities.instance_of(r, XNodeSet)) {
            return r.compareWithBoolean(this, Operators.notequal);
        }
        return new XBoolean(this.b != r.b);
    };
    
    XBoolean.prototype.lessthan = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
            return r.compareWithNumber(this.number(), Operators.greaterthanorequal);
        }
        return this.number().lessthan(r.number());
    };
    
    XBoolean.prototype.greaterthan = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
            return r.compareWithNumber(this.number(), Operators.lessthanorequal);
        }
        return this.number().greaterthan(r.number());
    };
    
    XBoolean.prototype.lessthanorequal = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
            return r.compareWithNumber(this.number(), Operators.greaterthan);
        }
        return this.number().lessthanorequal(r.number());
    };
    
    XBoolean.prototype.greaterthanorequal = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
            return r.compareWithNumber(this.number(), Operators.lessthan);
        }
        return this.number().greaterthanorequal(r.number());
    };
    
    // AVLTree ///////////////////////////////////////////////////////////////////
    
    AVLTree.prototype = new Object();
    AVLTree.prototype.constructor = AVLTree;
    AVLTree.superclass = Object.prototype;
    
    function AVLTree(n) {
        this.init(n);
    }
    
    AVLTree.prototype.init = function(n) {
        this.left = null;
        this.right = null;
        this.node = n;
        this.depth = 1;
    };
    
    AVLTree.prototype.balance = function() {
        var ldepth = this.left  == null ? 0 : this.left.depth;
        var rdepth = this.right == null ? 0 : this.right.depth;
    
        if (ldepth > rdepth + 1) {
            // LR or LL rotation
            var lldepth = this.left.left  == null ? 0 : this.left.left.depth;
            var lrdepth = this.left.right == null ? 0 : this.left.right.depth;
    
            if (lldepth < lrdepth) {
                // LR rotation consists of a RR rotation of the left child
                this.left.rotateRR();
                // plus a LL rotation of this node, which happens anyway
            }
            this.rotateLL();
        } else if (ldepth + 1 < rdepth) {
            // RR or RL rorarion
            var rrdepth = this.right.right == null ? 0 : this.right.right.depth;
            var rldepth = this.right.left  == null ? 0 : this.right.left.depth;
    
            if (rldepth > rrdepth) {
                // RR rotation consists of a LL rotation of the right child
                this.right.rotateLL();
                // plus a RR rotation of this node, which happens anyway
            }
            this.rotateRR();
        }
    };
    
    AVLTree.prototype.rotateLL = function() {
        // the left side is too long => rotate from the left (_not_ leftwards)
        var nodeBefore = this.node;
        var rightBefore = this.right;
        this.node = this.left.node;
        this.right = this.left;
        this.left = this.left.left;
        this.right.left = this.right.right;
        this.right.right = rightBefore;
        this.right.node = nodeBefore;
        this.right.updateInNewLocation();
        this.updateInNewLocation();
    };
    
    AVLTree.prototype.rotateRR = function() {
        // the right side is too long => rotate from the right (_not_ rightwards)
        var nodeBefore = this.node;
        var leftBefore = this.left;
        this.node = this.right.node;
        this.left = this.right;
        this.right = this.right.right;
        this.left.right = this.left.left;
        this.left.left = leftBefore;
        this.left.node = nodeBefore;
        this.left.updateInNewLocation();
        this.updateInNewLocation();
    };
    
    AVLTree.prototype.updateInNewLocation = function() {
        this.getDepthFromChildren();
    };
    
    AVLTree.prototype.getDepthFromChildren = function() {
        this.depth = this.node == null ? 0 : 1;
        if (this.left != null) {
            this.depth = this.left.depth + 1;
        }
        if (this.right != null && this.depth <= this.right.depth) {
            this.depth = this.right.depth + 1;
        }
    };
    
    function nodeOrder(n1, n2) {
        if (n1 === n2) {
            return 0;
        }
    
        if (n1.compareDocumentPosition) {
            var cpos = n1.compareDocumentPosition(n2);
    
            if (cpos & 0x01) {
                // not in the same document; return an arbitrary result (is there a better way to do this)
                return 1;
            }
            if (cpos & 0x0A) {
                // n2 precedes or contains n1
                return 1;
            }
            if (cpos & 0x14) {
                // n2 follows or is contained by n1
                return -1;
            }
    
            return 0;
        }
    
        var d1 = 0,
            d2 = 0;
        for (var m1 = n1; m1 != null; m1 = m1.parentNode || m1.ownerElement) {
            d1++;
        }
        for (var m2 = n2; m2 != null; m2 = m2.parentNode || m2.ownerElement) {
            d2++;
        }
    
        // step up to same depth
        if (d1 > d2) {
            while (d1 > d2) {
                n1 = n1.parentNode || n1.ownerElement;
                d1--;
            }
            if (n1 === n2) {
                return 1;
            }
        } else if (d2 > d1) {
            while (d2 > d1) {
                n2 = n2.parentNode || n2.ownerElement;
                d2--;
            }
            if (n1 === n2) {
                return -1;
            }
        }
    
        var n1Par = n1.parentNode || n1.ownerElement,
            n2Par = n2.parentNode || n2.ownerElement;
    
        // find common parent
        while (n1Par !== n2Par) {
            n1 = n1Par;
            n2 = n2Par;
            n1Par = n1.parentNode || n1.ownerElement;
            n2Par = n2.parentNode || n2.ownerElement;
        }
        
        var n1isAttr = Utilities.isAttribute(n1);
        var n2isAttr = Utilities.isAttribute(n2);
        
        if (n1isAttr && !n2isAttr) {
            return -1;
        }
        if (!n1isAttr && n2isAttr) {
            return 1;
        }
        
        if(n1Par) {
            var cn = n1isAttr ? n1Par.attributes : n1Par.childNodes,
                len = cn.length;
            for (var i = 0; i < len; i += 1) {
                var n = cn[i];
                if (n === n1) {
                    return -1;
                }
                if (n === n2) {
                    return 1;
                }
            }
        }        
        
        throw new Error('Unexpected: could not determine node order');
    }
    
    AVLTree.prototype.add = function(n)  {
        if (n === this.node) {
            return false;
        }
    
        var o = nodeOrder(n, this.node);
    
        var ret = false;
        if (o == -1) {
            if (this.left == null) {
                this.left = new AVLTree(n);
                ret = true;
            } else {
                ret = this.left.add(n);
                if (ret) {
                    this.balance();
                }
            }
        } else if (o == 1) {
            if (this.right == null) {
                this.right = new AVLTree(n);
                ret = true;
            } else {
                ret = this.right.add(n);
                if (ret) {
                    this.balance();
                }
            }
        }
    
        if (ret) {
            this.getDepthFromChildren();
        }
        return ret;
    };
    
    // XNodeSet //////////////////////////////////////////////////////////////////
    
    XNodeSet.prototype = new Expression();
    XNodeSet.prototype.constructor = XNodeSet;
    XNodeSet.superclass = Expression.prototype;
    
    function XNodeSet() {
        this.init();
    }
    
    XNodeSet.prototype.init = function() {
        this.tree = null;
        this.nodes = [];
        this.size = 0;
    };
    
    XNodeSet.prototype.toString = function() {
        var p = this.first();
        if (p == null) {
            return "";
        }
        return this.stringForNode(p);
    };
    
    XNodeSet.prototype.evaluate = function(c) {
        return this;
    };
    
    XNodeSet.prototype.string = function() {
        return new XString(this.toString());
    };
    
    XNodeSet.prototype.stringValue = function() {
        return this.toString();
    };
    
    XNodeSet.prototype.number = function() {
        return new XNumber(this.string());
    };
    
    XNodeSet.prototype.numberValue = function() {
        return Number(this.string());
    };
    
    XNodeSet.prototype.bool = function() {
        return new XBoolean(this.booleanValue());
    };
    
    XNodeSet.prototype.booleanValue = function() {
        return !!this.size;
    };
    
    XNodeSet.prototype.nodeset = function() {
        return this;
    };
    
    XNodeSet.prototype.stringForNode = function(n) {
        if (n.nodeType == 9   /*Node.DOCUMENT_NODE*/ || 
            n.nodeType == 1   /*Node.ELEMENT_NODE */ || 
            n.nodeType === 11 /*Node.DOCUMENT_FRAGMENT*/) {
            return this.stringForContainerNode(n);
        }
        if (n.nodeType === 2 /* Node.ATTRIBUTE_NODE */) {
            return n.value || n.nodeValue;
        }
        if (n.isNamespaceNode) {
            return n.namespace;
        }
        return n.nodeValue;
    };
    
    XNodeSet.prototype.stringForContainerNode = function(n) {
        var s = "";
        for (var n2 = n.firstChild; n2 != null; n2 = n2.nextSibling) {
            var nt = n2.nodeType;
            //  Element,    Text,       CDATA,      Document,   Document Fragment
            if (nt === 1 || nt === 3 || nt === 4 || nt === 9 || nt === 11) {
                s += this.stringForNode(n2);
            }
        }
        return s;
    };
    
    XNodeSet.prototype.buildTree = function () {
        if (!this.tree && this.nodes.length) {
            this.tree = new AVLTree(this.nodes[0]);
            for (var i = 1; i < this.nodes.length; i += 1) {
                this.tree.add(this.nodes[i]);
            }
        }
    
        return this.tree;
    };
    
    XNodeSet.prototype.first = function() {
        var p = this.buildTree();
        if (p == null) {
            return null;
        }
        while (p.left != null) {
            p = p.left;
        }
        return p.node;
    };
    
    XNodeSet.prototype.add = function(n) {
        for (var i = 0; i < this.nodes.length; i += 1) {
            if (n === this.nodes[i]) {
                return;
            }
        }
    
        this.tree = null;
        this.nodes.push(n);
        this.size += 1;
    };
    
    XNodeSet.prototype.addArray = function(ns) {
        for (var i = 0; i < ns.length; i += 1) {
            this.add(ns[i]);
        }
    };
    
    /**
     * Returns an array of the node set's contents in document order
     */
    XNodeSet.prototype.toArray = function() {
        var a = [];
        this.toArrayRec(this.buildTree(), a);
        return a;
    };
    
    XNodeSet.prototype.toArrayRec = function(t, a) {
        if (t != null) {
            this.toArrayRec(t.left, a);
            a.push(t.node);
            this.toArrayRec(t.right, a);
        }
    };
    
    /**
     * Returns an array of the node set's contents in arbitrary order
     */
    XNodeSet.prototype.toUnsortedArray = function () {
        return this.nodes.slice();
    };
    
    XNodeSet.prototype.compareWithString = function(r, o) {
        var a = this.toUnsortedArray();
        for (var i = 0; i < a.length; i++) {
            var n = a[i];
            var l = new XString(this.stringForNode(n));
            var res = o(l, r);
            if (res.booleanValue()) {
                return res;
            }
        }
        return new XBoolean(false);
    };
    
    XNodeSet.prototype.compareWithNumber = function(r, o) {
        var a = this.toUnsortedArray();
        for (var i = 0; i < a.length; i++) {
            var n = a[i];
            var l = new XNumber(this.stringForNode(n));
            var res = o(l, r);
            if (res.booleanValue()) {
                return res;
            }
        }
        return new XBoolean(false);
    };
    
    XNodeSet.prototype.compareWithBoolean = function(r, o) {
        return o(this.bool(), r);
    };
    
    XNodeSet.prototype.compareWithNodeSet = function(r, o) {
        var a = this.toUnsortedArray();
        for (var i = 0; i < a.length; i++) {
            var n = a[i];
            var l = new XString(this.stringForNode(n));
            var b = r.toUnsortedArray();
            for (var j = 0; j < b.length; j++) {
                var n2 = b[j];
                var r = new XString(this.stringForNode(n2));
                var res = o(l, r);
                if (res.booleanValue()) {
                    return res;
                }
            }
        }
        return new XBoolean(false);
    };
    
    XNodeSet.prototype.equals = function(r) {
        if (Utilities.instance_of(r, XString)) {
            return this.compareWithString(r, Operators.equals);
        }
        if (Utilities.instance_of(r, XNumber)) {
            return this.compareWithNumber(r, Operators.equals);
        }
        if (Utilities.instance_of(r, XBoolean)) {
            return this.compareWithBoolean(r, Operators.equals);
        }
        return this.compareWithNodeSet(r, Operators.equals);
    };
    
    XNodeSet.prototype.notequal = function(r) {
        if (Utilities.instance_of(r, XString)) {
            return this.compareWithString(r, Operators.notequal);
        }
        if (Utilities.instance_of(r, XNumber)) {
            return this.compareWithNumber(r, Operators.notequal);
        }
        if (Utilities.instance_of(r, XBoolean)) {
            return this.compareWithBoolean(r, Operators.notequal);
        }
        return this.compareWithNodeSet(r, Operators.notequal);
    };
    
    XNodeSet.prototype.lessthan = function(r) {
        if (Utilities.instance_of(r, XString)) {
            return this.compareWithNumber(r.number(), Operators.lessthan);
        }
        if (Utilities.instance_of(r, XNumber)) {
            return this.compareWithNumber(r, Operators.lessthan);
        }
        if (Utilities.instance_of(r, XBoolean)) {
            return this.compareWithBoolean(r, Operators.lessthan);
        }
        return this.compareWithNodeSet(r, Operators.lessthan);
    };
    
    XNodeSet.prototype.greaterthan = function(r) {
        if (Utilities.instance_of(r, XString)) {
            return this.compareWithNumber(r.number(), Operators.greaterthan);
        }
        if (Utilities.instance_of(r, XNumber)) {
            return this.compareWithNumber(r, Operators.greaterthan);
        }
        if (Utilities.instance_of(r, XBoolean)) {
            return this.compareWithBoolean(r, Operators.greaterthan);
        }
        return this.compareWithNodeSet(r, Operators.greaterthan);
    };
    
    XNodeSet.prototype.lessthanorequal = function(r) {
        if (Utilities.instance_of(r, XString)) {
            return this.compareWithNumber(r.number(), Operators.lessthanorequal);
        }
        if (Utilities.instance_of(r, XNumber)) {
            return this.compareWithNumber(r, Operators.lessthanorequal);
        }
        if (Utilities.instance_of(r, XBoolean)) {
            return this.compareWithBoolean(r, Operators.lessthanorequal);
        }
        return this.compareWithNodeSet(r, Operators.lessthanorequal);
    };
    
    XNodeSet.prototype.greaterthanorequal = function(r) {
        if (Utilities.instance_of(r, XString)) {
            return this.compareWithNumber(r.number(), Operators.greaterthanorequal);
        }
        if (Utilities.instance_of(r, XNumber)) {
            return this.compareWithNumber(r, Operators.greaterthanorequal);
        }
        if (Utilities.instance_of(r, XBoolean)) {
            return this.compareWithBoolean(r, Operators.greaterthanorequal);
        }
        return this.compareWithNodeSet(r, Operators.greaterthanorequal);
    };
    
    XNodeSet.prototype.union = function(r) {
        var ns = new XNodeSet();
        ns.addArray(this.toUnsortedArray());
        ns.addArray(r.toUnsortedArray());
        return ns;
    };
    
    // XPathNamespace ////////////////////////////////////////////////////////////
    
    XPathNamespace.prototype = new Object();
    XPathNamespace.prototype.constructor = XPathNamespace;
    XPathNamespace.superclass = Object.prototype;
    
    function XPathNamespace(pre, ns, p) {
        this.isXPathNamespace = true;
        this.ownerDocument = p.ownerDocument;
        this.nodeName = "#namespace";
        this.prefix = pre;
        this.localName = pre;
        this.namespaceURI = ns;
        this.nodeValue = ns;
        this.ownerElement = p;
        this.nodeType = XPathNamespace.XPATH_NAMESPACE_NODE;
    }
    
    XPathNamespace.prototype.toString = function() {
        return "{ \"" + this.prefix + "\", \"" + this.namespaceURI + "\" }";
    };
    
    // Operators /////////////////////////////////////////////////////////////////
    
    var Operators = new Object();
    
    Operators.equals = function(l, r) {
        return l.equals(r);
    };
    
    Operators.notequal = function(l, r) {
        return l.notequal(r);
    };
    
    Operators.lessthan = function(l, r) {
        return l.lessthan(r);
    };
    
    Operators.greaterthan = function(l, r) {
        return l.greaterthan(r);
    };
    
    Operators.lessthanorequal = function(l, r) {
        return l.lessthanorequal(r);
    };
    
    Operators.greaterthanorequal = function(l, r) {
        return l.greaterthanorequal(r);
    };
    
    // XPathContext //////////////////////////////////////////////////////////////
    
    XPathContext.prototype = new Object();
    XPathContext.prototype.constructor = XPathContext;
    XPathContext.superclass = Object.prototype;
    
    function XPathContext(vr, nr, fr) {
        this.variableResolver = vr != null ? vr : new VariableResolver();
        this.namespaceResolver = nr != null ? nr : new NamespaceResolver();
        this.functionResolver = fr != null ? fr : new FunctionResolver();
    }
    
    // VariableResolver //////////////////////////////////////////////////////////
    
    VariableResolver.prototype = new Object();
    VariableResolver.prototype.constructor = VariableResolver;
    VariableResolver.superclass = Object.prototype;
    
    function VariableResolver() {
    }
    
    VariableResolver.prototype.getVariable = function(ln, ns) {
        return null;
    };
    
    // FunctionResolver //////////////////////////////////////////////////////////
    
    FunctionResolver.prototype = new Object();
    FunctionResolver.prototype.constructor = FunctionResolver;
    FunctionResolver.superclass = Object.prototype;
    
    function FunctionResolver(thisArg) {
        this.thisArg = thisArg != null ? thisArg : Functions;
        this.functions = new Object();
        this.addStandardFunctions();
    }
    
    FunctionResolver.prototype.addStandardFunctions = function() {
        this.functions["{}last"] = Functions.last;
        this.functions["{}position"] = Functions.position;
        this.functions["{}count"] = Functions.count;
        this.functions["{}id"] = Functions.id;
        this.functions["{}local-name"] = Functions.localName;
        this.functions["{}namespace-uri"] = Functions.namespaceURI;
        this.functions["{}name"] = Functions.name;
        this.functions["{}string"] = Functions.string;
        this.functions["{}concat"] = Functions.concat;
        this.functions["{}starts-with"] = Functions.startsWith;
        this.functions["{}contains"] = Functions.contains;
        this.functions["{}substring-before"] = Functions.substringBefore;
        this.functions["{}substring-after"] = Functions.substringAfter;
        this.functions["{}substring"] = Functions.substring;
        this.functions["{}string-length"] = Functions.stringLength;
        this.functions["{}normalize-space"] = Functions.normalizeSpace;
        this.functions["{}translate"] = Functions.translate;
        this.functions["{}boolean"] = Functions.boolean_;
        this.functions["{}not"] = Functions.not;
        this.functions["{}true"] = Functions.true_;
        this.functions["{}false"] = Functions.false_;
        this.functions["{}lang"] = Functions.lang;
        this.functions["{}number"] = Functions.number;
        this.functions["{}sum"] = Functions.sum;
        this.functions["{}floor"] = Functions.floor;
        this.functions["{}ceiling"] = Functions.ceiling;
        this.functions["{}round"] = Functions.round;
    };
    
    FunctionResolver.prototype.addFunction = function(ns, ln, f) {
        this.functions["{" + ns + "}" + ln] = f;
    };
    
    FunctionResolver.getFunctionFromContext = function(qName, context) {
        var parts = Utilities.resolveQName(qName, context.namespaceResolver, context.contextNode, false);
    
        if (parts[0] === null) {
            throw new Error("Cannot resolve QName " + name);
        }
    
        return context.functionResolver.getFunction(parts[1], parts[0]);
    };
    
    FunctionResolver.prototype.getFunction = function(localName, namespace) {
        return this.functions["{" + namespace + "}" + localName];
    };
    
    // NamespaceResolver /////////////////////////////////////////////////////////
    
    NamespaceResolver.prototype = new Object();
    NamespaceResolver.prototype.constructor = NamespaceResolver;
    NamespaceResolver.superclass = Object.prototype;
    
    function NamespaceResolver() {
    }
    
    NamespaceResolver.prototype.getNamespace = function(prefix, n) {
        if (prefix == "xml") {
            return XPath.XML_NAMESPACE_URI;
        } else if (prefix == "xmlns") {
            return XPath.XMLNS_NAMESPACE_URI;
        }
        if (n.nodeType == 9 /*Node.DOCUMENT_NODE*/) {
            n = n.documentElement;
        } else if (n.nodeType == 2 /*Node.ATTRIBUTE_NODE*/) {
            n = PathExpr.prototype.getOwnerElement(n);
        } else if (n.nodeType != 1 /*Node.ELEMENT_NODE*/) {
            n = n.parentNode;
        }
        while (n != null && n.nodeType == 1 /*Node.ELEMENT_NODE*/) {
            var nnm = n.attributes;
            for (var i = 0; i < nnm.length; i++) {
                var a = nnm.item(i);
                var aname = a.name || a.nodeName;
                if ((aname === "xmlns" && prefix === "")
                        || aname === "xmlns:" + prefix) {
                    return String(a.value || a.nodeValue);
                }
            }
            n = n.parentNode;
        }
        return null;
    };
    
    // Functions /////////////////////////////////////////////////////////////////
    
    var Functions = new Object();
    
    Functions.last = function() {
        var c = arguments[0];
        if (arguments.length != 1) {
            throw new Error("Function last expects ()");
        }
        return new XNumber(c.contextSize);
    };
    
    Functions.position = function() {
        var c = arguments[0];
        if (arguments.length != 1) {
            throw new Error("Function position expects ()");
        }
        return new XNumber(c.contextPosition);
    };
    
    Functions.count = function() {
        var c = arguments[0];
        var ns;
        if (arguments.length != 2 || !Utilities.instance_of(ns = arguments[1].evaluate(c), XNodeSet)) {
            throw new Error("Function count expects (node-set)");
        }
        return new XNumber(ns.size);
    };
    
    Functions.id = function() {
        var c = arguments[0];
        var id;
        if (arguments.length != 2) {
            throw new Error("Function id expects (object)");
        }
        id = arguments[1].evaluate(c);
        if (Utilities.instance_of(id, XNodeSet)) {
            id = id.toArray().join(" ");
        } else {
            id = id.stringValue();
        }
        var ids = id.split(/[\x0d\x0a\x09\x20]+/);
        var count = 0;
        var ns = new XNodeSet();
        var doc = c.contextNode.nodeType == 9 /*Node.DOCUMENT_NODE*/
                ? c.contextNode
                : c.contextNode.ownerDocument;
        for (var i = 0; i < ids.length; i++) {
            var n;
            if (doc.getElementById) {
                n = doc.getElementById(ids[i]);
            } else {
                n = Utilities.getElementById(doc, ids[i]);
            }
            if (n != null) {
                ns.add(n);
                count++;
            }
        }
        return ns;
    };
    
    Functions.localName = function() {
        var c = arguments[0];
        var n;
        if (arguments.length == 1) {
            n = c.contextNode;
        } else if (arguments.length == 2) {
            n = arguments[1].evaluate(c).first();
        } else {
            throw new Error("Function local-name expects (node-set?)");
        }
        if (n == null) {
            return new XString("");
        }
    
        return new XString(n.localName ||     //  standard elements and attributes
                           n.baseName  ||     //  IE
                           n.target    ||     //  processing instructions
                           n.nodeName  ||     //  DOM1 elements
                           "");               //  fallback
    };
    
    Functions.namespaceURI = function() {
        var c = arguments[0];
        var n;
        if (arguments.length == 1) {
            n = c.contextNode;
        } else if (arguments.length == 2) {
            n = arguments[1].evaluate(c).first();
        } else {
            throw new Error("Function namespace-uri expects (node-set?)");
        }
        if (n == null) {
            return new XString("");
        }
        return new XString(n.namespaceURI);
    };
    
    Functions.name = function() {
        var c = arguments[0];
        var n;
        if (arguments.length == 1) {
            n = c.contextNode;
        } else if (arguments.length == 2) {
            n = arguments[1].evaluate(c).first();
        } else {
            throw new Error("Function name expects (node-set?)");
        }
        if (n == null) {
            return new XString("");
        }
        if (n.nodeType == 1 /*Node.ELEMENT_NODE*/) {
            return new XString(n.nodeName);
        } else if (n.nodeType == 2 /*Node.ATTRIBUTE_NODE*/) {
            return new XString(n.name || n.nodeName);
        } else if (n.nodeType === 7 /*Node.PROCESSING_INSTRUCTION_NODE*/) {
            return new XString(n.target || n.nodeName);
        } else if (n.localName == null) {
            return new XString("");
        } else {
            return new XString(n.localName);
        }
    };
    
    Functions.string = function() {
        var c = arguments[0];
        if (arguments.length == 1) {
            return new XString(XNodeSet.prototype.stringForNode(c.contextNode));
        } else if (arguments.length == 2) {
            return arguments[1].evaluate(c).string();
        }
        throw new Error("Function string expects (object?)");
    };
    
    Functions.concat = function() {
        var c = arguments[0];
        if (arguments.length < 3) {
            throw new Error("Function concat expects (string, string, string*)");
        }
        var s = "";
        for (var i = 1; i < arguments.length; i++) {
            s += arguments[i].evaluate(c).stringValue();
        }
        return new XString(s);
    };
    
    Functions.startsWith = function() {
        var c = arguments[0];
        if (arguments.length != 3) {
            throw new Error("Function startsWith expects (string, string)");
        }
        var s1 = arguments[1].evaluate(c).stringValue();
        var s2 = arguments[2].evaluate(c).stringValue();
        return new XBoolean(s1.substring(0, s2.length) == s2);
    };
    
    Functions.contains = function() {
        var c = arguments[0];
        if (arguments.length != 3) {
            throw new Error("Function contains expects (string, string)");
        }
        var s1 = arguments[1].evaluate(c).stringValue();
        var s2 = arguments[2].evaluate(c).stringValue();
        return new XBoolean(s1.indexOf(s2) !== -1);
    };
    
    Functions.substringBefore = function() {
        var c = arguments[0];
        if (arguments.length != 3) {
            throw new Error("Function substring-before expects (string, string)");
        }
        var s1 = arguments[1].evaluate(c).stringValue();
        var s2 = arguments[2].evaluate(c).stringValue();
        return new XString(s1.substring(0, s1.indexOf(s2)));
    };
    
    Functions.substringAfter = function() {
        var c = arguments[0];
        if (arguments.length != 3) {
            throw new Error("Function substring-after expects (string, string)");
        }
        var s1 = arguments[1].evaluate(c).stringValue();
        var s2 = arguments[2].evaluate(c).stringValue();
        if (s2.length == 0) {
            return new XString(s1);
        }
        var i = s1.indexOf(s2);
        if (i == -1) {
            return new XString("");
        }
        return new XString(s1.substring(i + s2.length));
    };
    
    Functions.substring = function() {
        var c = arguments[0];
        if (!(arguments.length == 3 || arguments.length == 4)) {
            throw new Error("Function substring expects (string, number, number?)");
        }
        var s = arguments[1].evaluate(c).stringValue();
        var n1 = Math.round(arguments[2].evaluate(c).numberValue()) - 1;
        var n2 = arguments.length == 4 ? n1 + Math.round(arguments[3].evaluate(c).numberValue()) : undefined;
        return new XString(s.substring(n1, n2));
    };
    
    Functions.stringLength = function() {
        var c = arguments[0];
        var s;
        if (arguments.length == 1) {
            s = XNodeSet.prototype.stringForNode(c.contextNode);
        } else if (arguments.length == 2) {
            s = arguments[1].evaluate(c).stringValue();
        } else {
            throw new Error("Function string-length expects (string?)");
        }
        return new XNumber(s.length);
    };
    
    Functions.normalizeSpace = function() {
        var c = arguments[0];
        var s;
        if (arguments.length == 1) {
            s = XNodeSet.prototype.stringForNode(c.contextNode);
        } else if (arguments.length == 2) {
            s = arguments[1].evaluate(c).stringValue();
        } else {
            throw new Error("Function normalize-space expects (string?)");
        }
        var i = 0;
        var j = s.length - 1;
        while (Utilities.isSpace(s.charCodeAt(j))) {
            j--;
        }
        var t = "";
        while (i <= j && Utilities.isSpace(s.charCodeAt(i))) {
            i++;
        }
        while (i <= j) {
            if (Utilities.isSpace(s.charCodeAt(i))) {
                t += " ";
                while (i <= j && Utilities.isSpace(s.charCodeAt(i))) {
                    i++;
                }
            } else {
                t += s.charAt(i);
                i++;
            }
        }
        return new XString(t);
    };
    
    Functions.translate = function() {
        var c = arguments[0];
        if (arguments.length != 4) {
            throw new Error("Function translate expects (string, string, string)");
        }
        var s1 = arguments[1].evaluate(c).stringValue();
        var s2 = arguments[2].evaluate(c).stringValue();
        var s3 = arguments[3].evaluate(c).stringValue();
        var map = [];
        for (var i = 0; i < s2.length; i++) {
            var j = s2.charCodeAt(i);
            if (map[j] == undefined) {
                var k = i > s3.length ? "" : s3.charAt(i);
                map[j] = k;
            }
        }
        var t = "";
        for (var i = 0; i < s1.length; i++) {
            var c = s1.charCodeAt(i);
            var r = map[c];
            if (r == undefined) {
                t += s1.charAt(i);
            } else {
                t += r;
            }
        }
        return new XString(t);
    };
    
    Functions.boolean_ = function() {
        var c = arguments[0];
        if (arguments.length != 2) {
            throw new Error("Function boolean expects (object)");
        }
        return arguments[1].evaluate(c).bool();
    };
    
    Functions.not = function() {
        var c = arguments[0];
        if (arguments.length != 2) {
            throw new Error("Function not expects (object)");
        }
        return arguments[1].evaluate(c).bool().not();
    };
    
    Functions.true_ = function() {
        if (arguments.length != 1) {
            throw new Error("Function true expects ()");
        }
        return new XBoolean(true);
    };
    
    Functions.false_ = function() {
        if (arguments.length != 1) {
            throw new Error("Function false expects ()");
        }
        return new XBoolean(false);
    };
    
    Functions.lang = function() {
        var c = arguments[0];
        if (arguments.length != 2) {
            throw new Error("Function lang expects (string)");
        }
        var lang;
        for (var n = c.contextNode; n != null && n.nodeType != 9 /*Node.DOCUMENT_NODE*/; n = n.parentNode) {
            var a = n.getAttributeNS(XPath.XML_NAMESPACE_URI, "lang");
            if (a != null) {
                lang = String(a);
                break;
            }
        }
        if (lang == null) {
            return new XBoolean(false);
        }
        var s = arguments[1].evaluate(c).stringValue();
        return new XBoolean(lang.substring(0, s.length) == s
                    && (lang.length == s.length || lang.charAt(s.length) == '-'));
    };
    
    Functions.number = function() {
        var c = arguments[0];
        if (!(arguments.length == 1 || arguments.length == 2)) {
            throw new Error("Function number expects (object?)");
        }
        if (arguments.length == 1) {
            return new XNumber(XNodeSet.prototype.stringForNode(c.contextNode));
        }
        return arguments[1].evaluate(c).number();
    };
    
    Functions.sum = function() {
        var c = arguments[0];
        var ns;
        if (arguments.length != 2 || !Utilities.instance_of((ns = arguments[1].evaluate(c)), XNodeSet)) {
            throw new Error("Function sum expects (node-set)");
        }
        ns = ns.toUnsortedArray();
        var n = 0;
        for (var i = 0; i < ns.length; i++) {
            n += new XNumber(XNodeSet.prototype.stringForNode(ns[i])).numberValue();
        }
        return new XNumber(n);
    };
    
    Functions.floor = function() {
        var c = arguments[0];
        if (arguments.length != 2) {
            throw new Error("Function floor expects (number)");
        }
        return new XNumber(Math.floor(arguments[1].evaluate(c).numberValue()));
    };
    
    Functions.ceiling = function() {
        var c = arguments[0];
        if (arguments.length != 2) {
            throw new Error("Function ceiling expects (number)");
        }
        return new XNumber(Math.ceil(arguments[1].evaluate(c).numberValue()));
    };
    
    Functions.round = function() {
        var c = arguments[0];
        if (arguments.length != 2) {
            throw new Error("Function round expects (number)");
        }
        return new XNumber(Math.round(arguments[1].evaluate(c).numberValue()));
    };
    
    // Utilities /////////////////////////////////////////////////////////////////
    
    var Utilities = new Object();
    
    Utilities.isAttribute = function (val) {
        return val && (val.nodeType === 2 || val.ownerElement);
    }
    
    Utilities.splitQName = function(qn) {
        var i = qn.indexOf(":");
        if (i == -1) {
            return [ null, qn ];
        }
        return [ qn.substring(0, i), qn.substring(i + 1) ];
    };
    
    Utilities.resolveQName = function(qn, nr, n, useDefault) {
        var parts = Utilities.splitQName(qn);
        if (parts[0] != null) {
            parts[0] = nr.getNamespace(parts[0], n);
        } else {
            if (useDefault) {
                parts[0] = nr.getNamespace("", n);
                if (parts[0] == null) {
                    parts[0] = "";
                }
            } else {
                parts[0] = "";
            }
        }
        return parts;
    };
    
    Utilities.isSpace = function(c) {
        return c == 0x9 || c == 0xd || c == 0xa || c == 0x20;
    };
    
    Utilities.isLetter = function(c) {
        return c >= 0x0041 && c <= 0x005A ||
            c >= 0x0061 && c <= 0x007A ||
            c >= 0x00C0 && c <= 0x00D6 ||
            c >= 0x00D8 && c <= 0x00F6 ||
            c >= 0x00F8 && c <= 0x00FF ||
            c >= 0x0100 && c <= 0x0131 ||
            c >= 0x0134 && c <= 0x013E ||
            c >= 0x0141 && c <= 0x0148 ||
            c >= 0x014A && c <= 0x017E ||
            c >= 0x0180 && c <= 0x01C3 ||
            c >= 0x01CD && c <= 0x01F0 ||
            c >= 0x01F4 && c <= 0x01F5 ||
            c >= 0x01FA && c <= 0x0217 ||
            c >= 0x0250 && c <= 0x02A8 ||
            c >= 0x02BB && c <= 0x02C1 ||
            c == 0x0386 ||
            c >= 0x0388 && c <= 0x038A ||
            c == 0x038C ||
            c >= 0x038E && c <= 0x03A1 ||
            c >= 0x03A3 && c <= 0x03CE ||
            c >= 0x03D0 && c <= 0x03D6 ||
            c == 0x03DA ||
            c == 0x03DC ||
            c == 0x03DE ||
            c == 0x03E0 ||
            c >= 0x03E2 && c <= 0x03F3 ||
            c >= 0x0401 && c <= 0x040C ||
            c >= 0x040E && c <= 0x044F ||
            c >= 0x0451 && c <= 0x045C ||
            c >= 0x045E && c <= 0x0481 ||
            c >= 0x0490 && c <= 0x04C4 ||
            c >= 0x04C7 && c <= 0x04C8 ||
            c >= 0x04CB && c <= 0x04CC ||
            c >= 0x04D0 && c <= 0x04EB ||
            c >= 0x04EE && c <= 0x04F5 ||
            c >= 0x04F8 && c <= 0x04F9 ||
            c >= 0x0531 && c <= 0x0556 ||
            c == 0x0559 ||
            c >= 0x0561 && c <= 0x0586 ||
            c >= 0x05D0 && c <= 0x05EA ||
            c >= 0x05F0 && c <= 0x05F2 ||
            c >= 0x0621 && c <= 0x063A ||
            c >= 0x0641 && c <= 0x064A ||
            c >= 0x0671 && c <= 0x06B7 ||
            c >= 0x06BA && c <= 0x06BE ||
            c >= 0x06C0 && c <= 0x06CE ||
            c >= 0x06D0 && c <= 0x06D3 ||
            c == 0x06D5 ||
            c >= 0x06E5 && c <= 0x06E6 ||
            c >= 0x0905 && c <= 0x0939 ||
            c == 0x093D ||
            c >= 0x0958 && c <= 0x0961 ||
            c >= 0x0985 && c <= 0x098C ||
            c >= 0x098F && c <= 0x0990 ||
            c >= 0x0993 && c <= 0x09A8 ||
            c >= 0x09AA && c <= 0x09B0 ||
            c == 0x09B2 ||
            c >= 0x09B6 && c <= 0x09B9 ||
            c >= 0x09DC && c <= 0x09DD ||
            c >= 0x09DF && c <= 0x09E1 ||
            c >= 0x09F0 && c <= 0x09F1 ||
            c >= 0x0A05 && c <= 0x0A0A ||
            c >= 0x0A0F && c <= 0x0A10 ||
            c >= 0x0A13 && c <= 0x0A28 ||
            c >= 0x0A2A && c <= 0x0A30 ||
            c >= 0x0A32 && c <= 0x0A33 ||
            c >= 0x0A35 && c <= 0x0A36 ||
            c >= 0x0A38 && c <= 0x0A39 ||
            c >= 0x0A59 && c <= 0x0A5C ||
            c == 0x0A5E ||
            c >= 0x0A72 && c <= 0x0A74 ||
            c >= 0x0A85 && c <= 0x0A8B ||
            c == 0x0A8D ||
            c >= 0x0A8F && c <= 0x0A91 ||
            c >= 0x0A93 && c <= 0x0AA8 ||
            c >= 0x0AAA && c <= 0x0AB0 ||
            c >= 0x0AB2 && c <= 0x0AB3 ||
            c >= 0x0AB5 && c <= 0x0AB9 ||
            c == 0x0ABD ||
            c == 0x0AE0 ||
            c >= 0x0B05 && c <= 0x0B0C ||
            c >= 0x0B0F && c <= 0x0B10 ||
            c >= 0x0B13 && c <= 0x0B28 ||
            c >= 0x0B2A && c <= 0x0B30 ||
            c >= 0x0B32 && c <= 0x0B33 ||
            c >= 0x0B36 && c <= 0x0B39 ||
            c == 0x0B3D ||
            c >= 0x0B5C && c <= 0x0B5D ||
            c >= 0x0B5F && c <= 0x0B61 ||
            c >= 0x0B85 && c <= 0x0B8A ||
            c >= 0x0B8E && c <= 0x0B90 ||
            c >= 0x0B92 && c <= 0x0B95 ||
            c >= 0x0B99 && c <= 0x0B9A ||
            c == 0x0B9C ||
            c >= 0x0B9E && c <= 0x0B9F ||
            c >= 0x0BA3 && c <= 0x0BA4 ||
            c >= 0x0BA8 && c <= 0x0BAA ||
            c >= 0x0BAE && c <= 0x0BB5 ||
            c >= 0x0BB7 && c <= 0x0BB9 ||
            c >= 0x0C05 && c <= 0x0C0C ||
            c >= 0x0C0E && c <= 0x0C10 ||
            c >= 0x0C12 && c <= 0x0C28 ||
            c >= 0x0C2A && c <= 0x0C33 ||
            c >= 0x0C35 && c <= 0x0C39 ||
            c >= 0x0C60 && c <= 0x0C61 ||
            c >= 0x0C85 && c <= 0x0C8C ||
            c >= 0x0C8E && c <= 0x0C90 ||
            c >= 0x0C92 && c <= 0x0CA8 ||
            c >= 0x0CAA && c <= 0x0CB3 ||
            c >= 0x0CB5 && c <= 0x0CB9 ||
            c == 0x0CDE ||
            c >= 0x0CE0 && c <= 0x0CE1 ||
            c >= 0x0D05 && c <= 0x0D0C ||
            c >= 0x0D0E && c <= 0x0D10 ||
            c >= 0x0D12 && c <= 0x0D28 ||
            c >= 0x0D2A && c <= 0x0D39 ||
            c >= 0x0D60 && c <= 0x0D61 ||
            c >= 0x0E01 && c <= 0x0E2E ||
            c == 0x0E30 ||
            c >= 0x0E32 && c <= 0x0E33 ||
            c >= 0x0E40 && c <= 0x0E45 ||
            c >= 0x0E81 && c <= 0x0E82 ||
            c == 0x0E84 ||
            c >= 0x0E87 && c <= 0x0E88 ||
            c == 0x0E8A ||
            c == 0x0E8D ||
            c >= 0x0E94 && c <= 0x0E97 ||
            c >= 0x0E99 && c <= 0x0E9F ||
            c >= 0x0EA1 && c <= 0x0EA3 ||
            c == 0x0EA5 ||
            c == 0x0EA7 ||
            c >= 0x0EAA && c <= 0x0EAB ||
            c >= 0x0EAD && c <= 0x0EAE ||
            c == 0x0EB0 ||
            c >= 0x0EB2 && c <= 0x0EB3 ||
            c == 0x0EBD ||
            c >= 0x0EC0 && c <= 0x0EC4 ||
            c >= 0x0F40 && c <= 0x0F47 ||
            c >= 0x0F49 && c <= 0x0F69 ||
            c >= 0x10A0 && c <= 0x10C5 ||
            c >= 0x10D0 && c <= 0x10F6 ||
            c == 0x1100 ||
            c >= 0x1102 && c <= 0x1103 ||
            c >= 0x1105 && c <= 0x1107 ||
            c == 0x1109 ||
            c >= 0x110B && c <= 0x110C ||
            c >= 0x110E && c <= 0x1112 ||
            c == 0x113C ||
            c == 0x113E ||
            c == 0x1140 ||
            c == 0x114C ||
            c == 0x114E ||
            c == 0x1150 ||
            c >= 0x1154 && c <= 0x1155 ||
            c == 0x1159 ||
            c >= 0x115F && c <= 0x1161 ||
            c == 0x1163 ||
            c == 0x1165 ||
            c == 0x1167 ||
            c == 0x1169 ||
            c >= 0x116D && c <= 0x116E ||
            c >= 0x1172 && c <= 0x1173 ||
            c == 0x1175 ||
            c == 0x119E ||
            c == 0x11A8 ||
            c == 0x11AB ||
            c >= 0x11AE && c <= 0x11AF ||
            c >= 0x11B7 && c <= 0x11B8 ||
            c == 0x11BA ||
            c >= 0x11BC && c <= 0x11C2 ||
            c == 0x11EB ||
            c == 0x11F0 ||
            c == 0x11F9 ||
            c >= 0x1E00 && c <= 0x1E9B ||
            c >= 0x1EA0 && c <= 0x1EF9 ||
            c >= 0x1F00 && c <= 0x1F15 ||
            c >= 0x1F18 && c <= 0x1F1D ||
            c >= 0x1F20 && c <= 0x1F45 ||
            c >= 0x1F48 && c <= 0x1F4D ||
            c >= 0x1F50 && c <= 0x1F57 ||
            c == 0x1F59 ||
            c == 0x1F5B ||
            c == 0x1F5D ||
            c >= 0x1F5F && c <= 0x1F7D ||
            c >= 0x1F80 && c <= 0x1FB4 ||
            c >= 0x1FB6 && c <= 0x1FBC ||
            c == 0x1FBE ||
            c >= 0x1FC2 && c <= 0x1FC4 ||
            c >= 0x1FC6 && c <= 0x1FCC ||
            c >= 0x1FD0 && c <= 0x1FD3 ||
            c >= 0x1FD6 && c <= 0x1FDB ||
            c >= 0x1FE0 && c <= 0x1FEC ||
            c >= 0x1FF2 && c <= 0x1FF4 ||
            c >= 0x1FF6 && c <= 0x1FFC ||
            c == 0x2126 ||
            c >= 0x212A && c <= 0x212B ||
            c == 0x212E ||
            c >= 0x2180 && c <= 0x2182 ||
            c >= 0x3041 && c <= 0x3094 ||
            c >= 0x30A1 && c <= 0x30FA ||
            c >= 0x3105 && c <= 0x312C ||
            c >= 0xAC00 && c <= 0xD7A3 ||
            c >= 0x4E00 && c <= 0x9FA5 ||
            c == 0x3007 ||
            c >= 0x3021 && c <= 0x3029;
    };
    
    Utilities.isNCNameChar = function(c) {
        return c >= 0x0030 && c <= 0x0039
            || c >= 0x0660 && c <= 0x0669
            || c >= 0x06F0 && c <= 0x06F9
            || c >= 0x0966 && c <= 0x096F
            || c >= 0x09E6 && c <= 0x09EF
            || c >= 0x0A66 && c <= 0x0A6F
            || c >= 0x0AE6 && c <= 0x0AEF
            || c >= 0x0B66 && c <= 0x0B6F
            || c >= 0x0BE7 && c <= 0x0BEF
            || c >= 0x0C66 && c <= 0x0C6F
            || c >= 0x0CE6 && c <= 0x0CEF
            || c >= 0x0D66 && c <= 0x0D6F
            || c >= 0x0E50 && c <= 0x0E59
            || c >= 0x0ED0 && c <= 0x0ED9
            || c >= 0x0F20 && c <= 0x0F29
            || c == 0x002E
            || c == 0x002D
            || c == 0x005F
            || Utilities.isLetter(c)
            || c >= 0x0300 && c <= 0x0345
            || c >= 0x0360 && c <= 0x0361
            || c >= 0x0483 && c <= 0x0486
            || c >= 0x0591 && c <= 0x05A1
            || c >= 0x05A3 && c <= 0x05B9
            || c >= 0x05BB && c <= 0x05BD
            || c == 0x05BF
            || c >= 0x05C1 && c <= 0x05C2
            || c == 0x05C4
            || c >= 0x064B && c <= 0x0652
            || c == 0x0670
            || c >= 0x06D6 && c <= 0x06DC
            || c >= 0x06DD && c <= 0x06DF
            || c >= 0x06E0 && c <= 0x06E4
            || c >= 0x06E7 && c <= 0x06E8
            || c >= 0x06EA && c <= 0x06ED
            || c >= 0x0901 && c <= 0x0903
            || c == 0x093C
            || c >= 0x093E && c <= 0x094C
            || c == 0x094D
            || c >= 0x0951 && c <= 0x0954
            || c >= 0x0962 && c <= 0x0963
            || c >= 0x0981 && c <= 0x0983
            || c == 0x09BC
            || c == 0x09BE
            || c == 0x09BF
            || c >= 0x09C0 && c <= 0x09C4
            || c >= 0x09C7 && c <= 0x09C8
            || c >= 0x09CB && c <= 0x09CD
            || c == 0x09D7
            || c >= 0x09E2 && c <= 0x09E3
            || c == 0x0A02
            || c == 0x0A3C
            || c == 0x0A3E
            || c == 0x0A3F
            || c >= 0x0A40 && c <= 0x0A42
            || c >= 0x0A47 && c <= 0x0A48
            || c >= 0x0A4B && c <= 0x0A4D
            || c >= 0x0A70 && c <= 0x0A71
            || c >= 0x0A81 && c <= 0x0A83
            || c == 0x0ABC
            || c >= 0x0ABE && c <= 0x0AC5
            || c >= 0x0AC7 && c <= 0x0AC9
            || c >= 0x0ACB && c <= 0x0ACD
            || c >= 0x0B01 && c <= 0x0B03
            || c == 0x0B3C
            || c >= 0x0B3E && c <= 0x0B43
            || c >= 0x0B47 && c <= 0x0B48
            || c >= 0x0B4B && c <= 0x0B4D
            || c >= 0x0B56 && c <= 0x0B57
            || c >= 0x0B82 && c <= 0x0B83
            || c >= 0x0BBE && c <= 0x0BC2
            || c >= 0x0BC6 && c <= 0x0BC8
            || c >= 0x0BCA && c <= 0x0BCD
            || c == 0x0BD7
            || c >= 0x0C01 && c <= 0x0C03
            || c >= 0x0C3E && c <= 0x0C44
            || c >= 0x0C46 && c <= 0x0C48
            || c >= 0x0C4A && c <= 0x0C4D
            || c >= 0x0C55 && c <= 0x0C56
            || c >= 0x0C82 && c <= 0x0C83
            || c >= 0x0CBE && c <= 0x0CC4
            || c >= 0x0CC6 && c <= 0x0CC8
            || c >= 0x0CCA && c <= 0x0CCD
            || c >= 0x0CD5 && c <= 0x0CD6
            || c >= 0x0D02 && c <= 0x0D03
            || c >= 0x0D3E && c <= 0x0D43
            || c >= 0x0D46 && c <= 0x0D48
            || c >= 0x0D4A && c <= 0x0D4D
            || c == 0x0D57
            || c == 0x0E31
            || c >= 0x0E34 && c <= 0x0E3A
            || c >= 0x0E47 && c <= 0x0E4E
            || c == 0x0EB1
            || c >= 0x0EB4 && c <= 0x0EB9
            || c >= 0x0EBB && c <= 0x0EBC
            || c >= 0x0EC8 && c <= 0x0ECD
            || c >= 0x0F18 && c <= 0x0F19
            || c == 0x0F35
            || c == 0x0F37
            || c == 0x0F39
            || c == 0x0F3E
            || c == 0x0F3F
            || c >= 0x0F71 && c <= 0x0F84
            || c >= 0x0F86 && c <= 0x0F8B
            || c >= 0x0F90 && c <= 0x0F95
            || c == 0x0F97
            || c >= 0x0F99 && c <= 0x0FAD
            || c >= 0x0FB1 && c <= 0x0FB7
            || c == 0x0FB9
            || c >= 0x20D0 && c <= 0x20DC
            || c == 0x20E1
            || c >= 0x302A && c <= 0x302F
            || c == 0x3099
            || c == 0x309A
            || c == 0x00B7
            || c == 0x02D0
            || c == 0x02D1
            || c == 0x0387
            || c == 0x0640
            || c == 0x0E46
            || c == 0x0EC6
            || c == 0x3005
            || c >= 0x3031 && c <= 0x3035
            || c >= 0x309D && c <= 0x309E
            || c >= 0x30FC && c <= 0x30FE;
    };
    
    Utilities.coalesceText = function(n) {
        for (var m = n.firstChild; m != null; m = m.nextSibling) {
            if (m.nodeType == 3 /*Node.TEXT_NODE*/ || m.nodeType == 4 /*Node.CDATA_SECTION_NODE*/) {
                var s = m.nodeValue;
                var first = m;
                m = m.nextSibling;
                while (m != null && (m.nodeType == 3 /*Node.TEXT_NODE*/ || m.nodeType == 4 /*Node.CDATA_SECTION_NODE*/)) {
                    s += m.nodeValue;
                    var del = m;
                    m = m.nextSibling;
                    del.parentNode.removeChild(del);
                }
                if (first.nodeType == 4 /*Node.CDATA_SECTION_NODE*/) {
                    var p = first.parentNode;
                    if (first.nextSibling == null) {
                        p.removeChild(first);
                        p.appendChild(p.ownerDocument.createTextNode(s));
                    } else {
                        var next = first.nextSibling;
                        p.removeChild(first);
                        p.insertBefore(p.ownerDocument.createTextNode(s), next);
                    }
                } else {
                    first.nodeValue = s;
                }
                if (m == null) {
                    break;
                }
            } else if (m.nodeType == 1 /*Node.ELEMENT_NODE*/) {
                Utilities.coalesceText(m);
            }
        }
    };
    
    Utilities.instance_of = function(o, c) {
        while (o != null) {
            if (o.constructor === c) {
                return true;
            }
            if (o === Object) {
                return false;
            }
            o = o.constructor.superclass;
        }
        return false;
    };
    
    Utilities.getElementById = function(n, id) {
        // Note that this does not check the DTD to check for actual
        // attributes of type ID, so this may be a bit wrong.
        if (n.nodeType == 1 /*Node.ELEMENT_NODE*/) {
            if (n.getAttribute("id") == id
                    || n.getAttributeNS(null, "id") == id) {
                return n;
            }
        }
        for (var m = n.firstChild; m != null; m = m.nextSibling) {
            var res = Utilities.getElementById(m, id);
            if (res != null) {
                return res;
            }
        }
        return null;
    };
    
    // XPathException ////////////////////////////////////////////////////////////
    
    var XPathException = (function () {
        function getMessage(code, exception) {
            var msg = exception ? ": " + exception.toString() : "";
            switch (code) {
                case XPathException.INVALID_EXPRESSION_ERR:
                    return "Invalid expression" + msg;
                case XPathException.TYPE_ERR:
                    return "Type error" + msg;
            }
            return null;
        }
    
        function XPathException(code, error, message) {
            var err = Error.call(this, getMessage(code, error) || message);
    
            err.code = code;
            err.exception = error;
    
            return err;
        }
    
        XPathException.prototype = Object.create(Error.prototype);
        XPathException.prototype.constructor = XPathException;
        XPathException.superclass = Error;
    
        XPathException.prototype.toString = function() {
            return this.message;
        };
    
        XPathException.fromMessage = function(message, error) {
            return new XPathException(null, error, message);
        };
    
        XPathException.INVALID_EXPRESSION_ERR = 51;
        XPathException.TYPE_ERR = 52;
    
        return XPathException;
    })();
    
    // XPathExpression ///////////////////////////////////////////////////////////
    
    XPathExpression.prototype = {};
    XPathExpression.prototype.constructor = XPathExpression;
    XPathExpression.superclass = Object.prototype;
    
    function XPathExpression(e, r, p) {
        this.xpath = p.parse(e);
        this.context = new XPathContext();
        this.context.namespaceResolver = new XPathNSResolverWrapper(r);
    }
    
    XPathExpression.prototype.evaluate = function(n, t, res) {
        this.context.expressionContextNode = n;
        var result = this.xpath.evaluate(this.context);
        return new XPathResult(result, t);
    }
    
    // XPathNSResolverWrapper ////////////////////////////////////////////////////
    
    XPathNSResolverWrapper.prototype = {};
    XPathNSResolverWrapper.prototype.constructor = XPathNSResolverWrapper;
    XPathNSResolverWrapper.superclass = Object.prototype;
    
    function XPathNSResolverWrapper(r) {
        this.xpathNSResolver = r;
    }
    
    XPathNSResolverWrapper.prototype.getNamespace = function(prefix, n) {
        if (this.xpathNSResolver == null) {
            return null;
        }
        return this.xpathNSResolver.lookupNamespaceURI(prefix);
    };
    
    // NodeXPathNSResolver ///////////////////////////////////////////////////////
    
    NodeXPathNSResolver.prototype = {};
    NodeXPathNSResolver.prototype.constructor = NodeXPathNSResolver;
    NodeXPathNSResolver.superclass = Object.prototype;
    
    function NodeXPathNSResolver(n) {
        this.node = n;
        this.namespaceResolver = new NamespaceResolver();
    }
    
    NodeXPathNSResolver.prototype.lookupNamespaceURI = function(prefix) {
        return this.namespaceResolver.getNamespace(prefix, this.node);
    };
    
    // XPathResult ///////////////////////////////////////////////////////////////
    
    XPathResult.prototype = {};
    XPathResult.prototype.constructor = XPathResult;
    XPathResult.superclass = Object.prototype;
    
    function XPathResult(v, t) {
        if (t == XPathResult.ANY_TYPE) {
            if (v.constructor === XString) {
                t = XPathResult.STRING_TYPE;
            } else if (v.constructor === XNumber) {
                t = XPathResult.NUMBER_TYPE;
            } else if (v.constructor === XBoolean) {
                t = XPathResult.BOOLEAN_TYPE;
            } else if (v.constructor === XNodeSet) {
                t = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
            }
        }
        this.resultType = t;
        switch (t) {
            case XPathResult.NUMBER_TYPE:
                this.numberValue = v.numberValue();
                return;
            case XPathResult.STRING_TYPE:
                this.stringValue = v.stringValue();
                return;
            case XPathResult.BOOLEAN_TYPE:
                this.booleanValue = v.booleanValue();
                return;
            case XPathResult.ANY_UNORDERED_NODE_TYPE:
            case XPathResult.FIRST_ORDERED_NODE_TYPE:
                if (v.constructor === XNodeSet) {
                    this.singleNodeValue = v.first();
                    return;
                }
                break;
            case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
            case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
                if (v.constructor === XNodeSet) {
                    this.invalidIteratorState = false;
                    this.nodes = v.toArray();
                    this.iteratorIndex = 0;
                    return;
                }
                break;
            case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
            case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
                if (v.constructor === XNodeSet) {
                    this.nodes = v.toArray();
                    this.snapshotLength = this.nodes.length;
                    return;
                }
                break;
        }
        throw new XPathException(XPathException.TYPE_ERR);
    };
    
    XPathResult.prototype.iterateNext = function() {
        if (this.resultType != XPathResult.UNORDERED_NODE_ITERATOR_TYPE
                && this.resultType != XPathResult.ORDERED_NODE_ITERATOR_TYPE) {
            throw new XPathException(XPathException.TYPE_ERR);
        }
        return this.nodes[this.iteratorIndex++];
    };
    
    XPathResult.prototype.snapshotItem = function(i) {
        if (this.resultType != XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
                && this.resultType != XPathResult.ORDERED_NODE_SNAPSHOT_TYPE) {
            throw new XPathException(XPathException.TYPE_ERR);
        }
        return this.nodes[i];
    };
    
    XPathResult.ANY_TYPE = 0;
    XPathResult.NUMBER_TYPE = 1;
    XPathResult.STRING_TYPE = 2;
    XPathResult.BOOLEAN_TYPE = 3;
    XPathResult.UNORDERED_NODE_ITERATOR_TYPE = 4;
    XPathResult.ORDERED_NODE_ITERATOR_TYPE = 5;
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE = 6;
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE = 7;
    XPathResult.ANY_UNORDERED_NODE_TYPE = 8;
    XPathResult.FIRST_ORDERED_NODE_TYPE = 9;
    
    // DOM 3 XPath support ///////////////////////////////////////////////////////
    
    function installDOM3XPathSupport(doc, p) {
        doc.createExpression = function(e, r) {
            try {
                return new XPathExpression(e, r, p);
            } catch (e) {
                throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, e);
            }
        };
        doc.createNSResolver = function(n) {
            return new NodeXPathNSResolver(n);
        };
        doc.evaluate = function(e, cn, r, t, res) {
            if (t < 0 || t > 9) {
                throw { code: 0, toString: function() { return "Request type not supported"; } };
            }
            return doc.createExpression(e, r, p).evaluate(cn, t, res);
        };
    };
    
    // ---------------------------------------------------------------------------
    
    // Install DOM 3 XPath support for the current document.
    try {
        var shouldInstall = true;
        try {
            if (document.implementation
                    && document.implementation.hasFeature
                    && document.implementation.hasFeature("XPath", null)) {
                shouldInstall = false;
            }
        } catch (e) {
        }
        if (shouldInstall) {
            installDOM3XPathSupport(document, new XPathParser());
        }
    } catch (e) {
    }
    
    // ---------------------------------------------------------------------------
    // exports for node.js
    
    installDOM3XPathSupport(exports, new XPathParser());
    
    (function() {
        var parser = new XPathParser();
    
        var defaultNSResolver = new NamespaceResolver();
        var defaultFunctionResolver = new FunctionResolver();
        var defaultVariableResolver = new VariableResolver();
    
        function makeNSResolverFromFunction(func) {
            return {
                getNamespace: function (prefix, node) {
                    var ns = func(prefix, node);
    
                    return ns || defaultNSResolver.getNamespace(prefix, node);
                }
            };
        }
    
        function makeNSResolverFromObject(obj) {
            return makeNSResolverFromFunction(obj.getNamespace.bind(obj));
        }
    
        function makeNSResolverFromMap(map) {
            return makeNSResolverFromFunction(function (prefix) {
                return map[prefix];
            });
        }
    
        function makeNSResolver(resolver) {
            if (resolver && typeof resolver.getNamespace === "function") {
                return makeNSResolverFromObject(resolver);
            }
    
            if (typeof resolver === "function") {
                return makeNSResolverFromFunction(resolver);
            }
    
            // assume prefix -> uri mapping
            if (typeof resolver === "object") {
                return makeNSResolverFromMap(resolver);
            }
    
            return defaultNSResolver;
        }
    
        /** Converts native JavaScript types to their XPath library equivalent */
        function convertValue(value) {
            if (value === null ||
                typeof value === "undefined" ||
                value instanceof XString ||
                value instanceof XBoolean ||
                value instanceof XNumber ||
                value instanceof XNodeSet) {
                return value;
            }
    
            switch (typeof value) {
                case "string": return new XString(value);
                case "boolean": return new XBoolean(value);
                case "number": return new XNumber(value);
            }
    
            // assume node(s)
            var ns = new XNodeSet();
            ns.addArray([].concat(value));
            return ns;
        }
    
        function makeEvaluator(func) {
            return function (context) {
                var args = Array.prototype.slice.call(arguments, 1).map(function (arg) {
                    return arg.evaluate(context);
                });
                var result = func.apply(this, [].concat(context, args));
                return convertValue(result);
            };
        }
    
        function makeFunctionResolverFromFunction(func) {
            return {
                getFunction: function (name, namespace) {
                    var found = func(name, namespace);
                    if (found) {
                        return makeEvaluator(found);
                    }
                    return defaultFunctionResolver.getFunction(name, namespace);
                }
            };
        }
    
        function makeFunctionResolverFromObject(obj) {
            return makeFunctionResolverFromFunction(obj.getFunction.bind(obj));
        }
    
        function makeFunctionResolverFromMap(map) {
            return makeFunctionResolverFromFunction(function (name) {
                return map[name];
            });
        }
    
        function makeFunctionResolver(resolver) {
            if (resolver && typeof resolver.getFunction === "function") {
                return makeFunctionResolverFromObject(resolver);
            }
    
            if (typeof resolver === "function") {
                return makeFunctionResolverFromFunction(resolver);
            }
    
            // assume map
            if (typeof resolver === "object") {
                return makeFunctionResolverFromMap(resolver);
            }
    
            return defaultFunctionResolver;
        }
    
        function makeVariableResolverFromFunction(func) {
            return {
                getVariable: function (name, namespace) {
                    var value = func(name, namespace);
                    return convertValue(value);
                }
            };
        }
    
        function makeVariableResolver(resolver) {
            if (resolver) {
                if (typeof resolver.getVariable === "function") {
                    return makeVariableResolverFromFunction(resolver.getVariable.bind(resolver));
                }
    
                if (typeof resolver === "function") {
                    return makeVariableResolverFromFunction(resolver);
                }
    
                // assume map
                if (typeof resolver === "object") {
                    return makeVariableResolverFromFunction(function (name) {
                        return resolver[name];
                    });
                }
            }
    
            return defaultVariableResolver;
        }
    
        function makeContext(options) {
            var context = new XPathContext();
    
            if (options) {
                context.namespaceResolver = makeNSResolver(options.namespaces);
                context.functionResolver = makeFunctionResolver(options.functions);
                context.variableResolver = makeVariableResolver(options.variables);
                context.expressionContextNode = options.node;
            } else {
                context.namespaceResolver = defaultNSResolver;
            }
    
            return context;
        }
    
        function evaluate(parsedExpression, options) {
            var context = makeContext(options);
    
            return parsedExpression.evaluate(context);
        }
    
        var evaluatorPrototype = {
            evaluate: function (options) {
                return evaluate(this.expression, options);
            }
    
            ,evaluateNumber: function (options) {
                return this.evaluate(options).numberValue();
            }
    
            ,evaluateString: function (options) {
                return this.evaluate(options).stringValue();
            }
    
            ,evaluateBoolean: function (options) {
                return this.evaluate(options).booleanValue();
            }
    
            ,evaluateNodeSet: function (options) {
                return this.evaluate(options).nodeset();
            }
    
            ,select: function (options) {
                return this.evaluateNodeSet(options).toArray()
            }
    
            ,select1: function (options) {
                return this.select(options)[0];
            }
        };
    
        function parse(xpath) {
            var parsed = parser.parse(xpath);
    
            return Object.create(evaluatorPrototype, {
                expression: {
                    value: parsed
                }
            });
        }
    
        exports.parse = parse;
    })();
    
    exports.XPath = XPath;
    exports.XPathParser = XPathParser;
    exports.XPathResult = XPathResult;
    
    exports.Step = Step;
    exports.NodeTest = NodeTest;
    exports.BarOperation = BarOperation;
    
    exports.NamespaceResolver = NamespaceResolver;
    exports.FunctionResolver = FunctionResolver;
    exports.VariableResolver = VariableResolver;
    
    exports.Utilities = Utilities;
    
    exports.XPathContext = XPathContext;
    exports.XNodeSet = XNodeSet;
    exports.XBoolean = XBoolean;
    exports.XString = XString;
    exports.XNumber = XNumber;
    
    // helper
    exports.select = function(e, doc, single) {
        return exports.selectWithResolver(e, doc, null, single);
    };
    
    exports.useNamespaces = function(mappings) {
        var resolver = {
            mappings: mappings || {},
            lookupNamespaceURI: function(prefix) {
                return this.mappings[prefix];
            }
        };
    
        return function(e, doc, single) {
            return exports.selectWithResolver(e, doc, resolver, single);
        };
    };
    
    exports.selectWithResolver = function(e, doc, resolver, single) {
        var expression = new XPathExpression(e, resolver, new XPathParser());
        var type = XPathResult.ANY_TYPE;
    
        var result = expression.evaluate(doc, type, null);
    
        if (result.resultType == XPathResult.STRING_TYPE) {
            result = result.stringValue;
        }
        else if (result.resultType == XPathResult.NUMBER_TYPE) {
            result = result.numberValue;
        }
        else if (result.resultType == XPathResult.BOOLEAN_TYPE) {
            result = result.booleanValue;
        }
        else {
            result = result.nodes;
            if (single) {
                result = result[0];
            }
        }
    
        return result;
    };
    
    exports.select1 = function(e, doc) {
        return exports.select(e, doc, true);
    };
    
    // end non-node wrapper
    })(xpath);
    
    
    /***/ }),
    /* 17 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    /**
     * @module load.ts
     * @author Christophe Parisse
     * load the XML file and the initial value according to the ODD
     * if the XML file is empty, all initial values are zero or null or blank
     * the result structure teiData is ready to be processed
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    var teimeta = __webpack_require__(2);
    var odd = __webpack_require__(4);
    var schema = __webpack_require__(3);
    var alert = __webpack_require__(5);
    var msg = __webpack_require__(7);
    var entities = __webpack_require__(8);
    exports.ptrListElementSpec = null; // closure variable
    /*
     * loading the XML file
     */
    /**
     * @method getNodeText
     * get text of current node only
     * @param {Object} node
     * @returns {string} value of text
     */
    function getNodeText(node) {
        var txt = '';
        for (var child in node.childNodes) {
            if (node.childNodes[child].nodeType === 3) {
                txt += entities.decodeXML(node.childNodes[child].textContent);
            }
            else if (node.childNodes[child].nodeType === 1 && node.childNodes[child].tagName === 'seg') {
                txt += entities.decodeXML(node.childNodes[child].textContent);
            }
        }
        return txt;
    }
    /**
     * @method getOddFromXml
     * @param {*} data raw data content of TEI file
     * @param {*} dataOdd array of ElementSpec from odd.ts - loadOdd
     * @returns {*} true if ok
     */
    function getOddFromXml(data, teiData) {
        if (!teiData.dataOdd)
            return ''; // no odd already loaded
        if (data)
            data = schema.stripBOM(data);
        // get XML ready
        teiData.parser = new DOMParser();
        try {
            if (data) {
                var datastring = data.toString();
                teiData.doc = teiData.parser.parseFromString(datastring, 'text/xml');
                if (teiData.doc.documentElement.nodeName === "parsererror") {
                    alert.alertUser("The XML file is not valid: Operation canceled." + teiData.doc.documentElement.innerHTML);
                    console.log("Errors in XML file", teiData.doc.documentElement.innerHTML);
                    // } else {
                    // console.log("No errors found");
                }
            }
        }
        catch (e) {
            alert.alertUser("The XML file is not valid: Operation canceled (catch) " + e.toString());
        }
        // find root
        var root = null;
        if (teiData.doc) {
            root = teiData.doc.documentElement;
            var nodes = odd.getChildrenByName(root, teiData.dataOdd.rootTEI);
            if (nodes.length > 1) {
                alert.alertUser(msg.msg('morethanoneroot'));
                return false;
            }
            else if (nodes.length === 1) {
                root = nodes[0];
            }
        }
        if (root) {
            var attr = root.getAttribute("xml:base");
            if (attr)
                return attr;
        }
        return '';
    }
    exports.getOddFromXml = getOddFromXml;
    /**
     * @param {*} data raw data content of TEI file
     * @param {*} dataOdd array of ElementSpec from odd.ts - loadOdd
     * @returns {*} true if ok
     */
    function loadTei(data, teiData) {
        if (data)
            data = schema.stripBOM(data);
        //console.log("call of loadTei ", data, teiData);
        // get XML ready
        if (!teiData.parser)
            teiData.parser = new DOMParser();
        try {
            if (!teiData.doc) {
                if (data) {
                    var datastring = data.toString();
                    teiData.doc = teiData.parser.parseFromString(datastring, 'text/xml');
                    if (teiData.doc.documentElement.nodeName === "parsererror") {
                        alert.alertUser("The XML file is not valid: Operation canceled." + teiData.doc.documentElement.innerHTML);
                        console.log("Errors in XML file", teiData.doc.documentElement.innerHTML);
                        // } else {
                        // console.log("No errors found");
                    }
                }
            }
        }
        catch (e) {
            alert.alertUser("The XML file is not valid: Operation canceled (catch) " + e.toString());
        }
        if (!teiData.dataOdd)
            return ''; // no odd loaded
        // find root
        var root = null;
        var path = '/' + teiData.dataOdd.rootTEI; // root but must be unique !
        if (teiData.doc) {
            root = teiData.doc.documentElement;
            var nodes = odd.getChildrenByName(root, teiData.dataOdd.rootTEI);
            if (nodes.length > 1) {
                alert.alertUser(msg.msg('morethanoneroot'));
                return false;
            }
            else if (nodes.length === 1) {
                root = nodes[0];
            }
        }
        teiData.root = root; // store for later external save
        // find first elementSpec
        exports.ptrListElementSpec = teiData.dataOdd.listElementSpec;
        var h = exports.ptrListElementSpec[teiData.dataOdd.rootTEI];
        if (!h) {
            alert.alertUser(msg.msg('norootinodd'));
            return false;
        }
        // create first elementSpec and find and create the other recursively
        // h = descriptor elementSpec
        // root = list of nodes (could be null)
        // '' = initial path
        // 1 = minimal number of root authorized
        // 1 = maximal number of root authorized
        teiData.dataTei = loadElementSpec(h, root, path, '1', '1', null);
        return true;
    }
    exports.loadTei = loadTei;
    /**
     * check dataType value
     * @param {Object} datatype - dataType object
     */
    function verifyDatatype(datatype) {
        if (datatype.type === 'openlist' && datatype.valueContent !== '') {
            // check if valueContent fait partie du openlist
            var found = false;
            for (var i = 0; i < datatype.vallist.length; i++) {
                if (datatype.vallist[i].ident === datatype.valueContent) {
                    found = true;
                    break;
                }
            }
            if (found === false) {
                // this item was created by the user.
                var vi = new schema.ValItem();
                vi.ident = datatype.valueContent;
                // creation of a description with only the value and the discription is the same as the value for
                // items that were created by the users
                vi.desc = new schema.Desc();
                vi.desc.langs.push("eng");
                vi.desc.texts.push(vi.ident);
                vi.desc.renditions.push(vi.ident);
                datatype.vallist.push(vi);
            }
        }
        if (!datatype.valueContent && datatype.rend)
            datatype.valueContent = datatype.rend;
    }
    /**
     * load elementSpec data from the node - manage element array of any size
     * @param es
     * @param node
     * @param path
     * @param minOcc
     * @param maxOcc
     * @param parent
     */
    function loadElementSpec(es, node, path, minOcc, maxOcc, parent) {
        var c = schema.copyElementSpec(es);
        //console.log('loadElementSpec ', c.access, path);
        // creation of an initial empty element for the current node
        c.node = node;
        c.parentElementSpec = parent;
        if (maxOcc === '2') {
            if (minOcc === '1')
                c.usage = 'req';
            else
                c.usage = 'opt'; // case 0 to 2
        }
        else if (maxOcc === 'unbounded') {
            if (minOcc === '1')
                c.usage = 'req';
            else
                c.usage = 'opt'; // case 0 to unbounded
        }
        else {
            if (minOcc === '1')
                c.usage = 'req'; // case 1 to 1
            else
                c.usage = 'opt'; // case 0 to 1
        }
        c.validatedES = '';
        // look for all existing element in the DOM under this node
        c.absolutepath = path;
        var nbElt = 0;
        if (node) {
            c.validatedES = 'ok'; // this element did exist so it was validated by the user
            // load content
            if (c.content && c.content.datatype) {
                // the text of the node is edited
                c.content.datatype.valueContent = getNodeText(node).trim();
                c.content.datatype.rend = c.content.rend;
                if (!c.content.datatype.valueContent)
                    c.content.datatype.valueContent = c.content.rend;
                c.content.datatype.parentElementSpec = c;
                verifyDatatype(c.content.datatype);
            }
            // load attributes
            for (var a in c.attr) {
                if (c.attr[a].ident) {
                    c.attr[a].datatype.parentElementSpec = c;
                    if (c.attr[a].datatype.type === '') {
                        // no edition of the attribute
                        // but predefined value
                        if (c.attr[a].rend)
                            c.attr[a].datatype.valueContent = c.attr[a].rend;
                    }
                    else {
                        var attr = node.getAttribute(c.attr[a].ident);
                        if (attr) {
                            c.attr[a].datatype.valueContent = attr;
                            c.attr[a].datatype.rend = c.attr[a].rend;
                            if (!c.attr[a].datatype.valueContent)
                                c.attr[a].datatype.valueContent = c.attr[a].rend;
                            verifyDatatype(c.attr[a].datatype);
                        }
                        else {
                            if (c.attr[a].rend)
                                c.attr[a].datatype.valueContent = c.attr[a].rend;
                            else
                                c.attr[a].datatype.valueContent = '';
                        }
                    }
                }
            }
            // load content
            // node recursivity is allowed because we follow node which is not recursive
            if (!c.content)
                return c;
            for (var _i = 0, _a = c.content.sequencesRefs; _i < _a.length; _i++) {
                var ec = _a[_i];
                // ec is at the format ElementCount
                if (ec.type === 'elementRef') {
                    loadElementRef(ec, node, c.absolutepath, c);
                }
                else {
                    loadSequence(ec, node, c.absolutepath, c);
                }
            }
        }
        else {
            // build an empty element not validated
            // either because the DOM is empty or because we did not find the element in the current DOM
            // content and attr will be initialized
            // go down in the tree
            /* here we apply a parameter of the software
             * the elements not edited are or are not included by default
             */
            if (!c.content)
                return c;
            // check recursivity
            if (isRecursive(c.parentElementSpec, c.access)) {
                c.content = null;
                c.recursive = true;
                console.log('recursive stop at ', c.access, c.absolutepath);
                return c;
            }
            c.validatedES = teimeta.teiData.params.defaultNewElement ? 'ok' : ''; // l'élément n'existait pas et il n'est pas validé par l'utilisateur
            for (var _b = 0, _c = c.content.sequencesRefs; _b < _c.length; _b++) {
                var ec = _c[_b];
                // ec at the format ElementCount
                // load content
                if (ec.type === 'elementRef') {
                    loadElementRef(ec, null, c.absolutepath, c);
                }
                else {
                    loadSequence(ec, null, c.absolutepath, c);
                }
            }
        }
        return c;
    }
    exports.loadElementSpec = loadElementSpec;
    /**
     * test if an elementSpec has already be seen in a tree branch to avoid recursive processing
     * @param es
     * @param name
     */
    function isRecursive(es, name) {
        if (!es)
            return;
        // es is an elementSpec
        if (es.access === name)
            return true;
        if (es.parentElementSpec)
            return isRecursive(es.parentElementSpec, name);
        else
            return false;
    }
    /**
     * load elementRef data from the node
     * @param ec
     * @param node
     * @param path
     * @param parent
     */
    function loadElementRef(ec, node, path, parent) {
        //console.log("loadElementRef:",ec,node,path);
        // ec is an ElementCount
        // prepare the first element ElementCountItem
        var eci = new schema.ElementCountItem();
        eci.parentElementSpec = parent;
        // ec.model contains the name of the elementSpec
        eci.type = 'elementRef';
        ec.eCI.push(eci);
        // load from TEI
        var nodes = node ? odd.getChildrenByName(node, ec.ident, ec.corresp) : [];
        // filtering the elements (nodes) using corresp field if necessairy
        path = path + '/' + ec.model;
        // si c'est vide
        if (nodes.length === 0) {
            // find and create one elementSpec
            var h = exports.ptrListElementSpec[ec.model];
            eci.model = ec.model;
            eci.element = loadElementSpec(h, null, path, ec.minOccurs, ec.maxOccurs, parent);
            return;
        }
        // fill the first one if there is one
        if (nodes.length > 0) {
            // find and create first elementSpec
            var h = exports.ptrListElementSpec[ec.model];
            eci.model = ec.model;
            eci.element = loadElementSpec(h, nodes[0], path, ec.minOccurs, ec.maxOccurs, parent);
        }
        for (var i = 1; i < nodes.length; i++) {
            if (ec.maxOccurs === '1') {
                alert.alertUser(msg.msg('toomanyelements') + path + '/' + ec.model);
            }
            // prepare new elements
            // ec is an ElementCount
            eci = new schema.ElementCountItem();
            eci.parentElementSpec = parent;
            eci.type = 'elementRef';
            ec.eCI.push(eci);
            // find and create first elementSpec
            var h = exports.ptrListElementSpec[ec.model];
            eci.model = ec.model;
            eci.element = loadElementSpec(h, nodes[i], path, ec.minOccurs, ec.maxOccurs, parent);
        }
    }
    /**
     * load Sequence data from the node
     * @param ec
     * @param node
     * @param path
     * @param parent
     */
    function loadSequence(ec, node, path, parent) {
        //console.log("loadSequence:",ec,node,path);
        // load from TEI
        var nnodes = []; // array of arrays of nodes
        // for all models in the sequence, we look for corresponding nodes
        if (node) {
            for (var n = 0; n < ec.ident.length; n++) {
                if (node) {
                    // filtering the elements (nodes) using corresp field if necessary
                    var elts = odd.getChildrenByName(node, ec.ident[n], ec.corresp[n]);
                    nnodes.push(elts);
                }
                else {
                    nnodes.push([]);
                }
            }
        }
        var maxlg = 0;
        for (var k = 0; k < nnodes.length; k++)
            if (maxlg < nnodes[k].length)
                maxlg = nnodes[k].length;
        /*
        if (nnodes.length > 1 && ec.maxOccurs === '1') {
            for (let k = 0; k < nnodes.length ; k++) {
                if (nnodes[k].length > 1) {
                    alert.alertUser("Attention: trop d'éléments pour " + ec.model[k] + " dans " + path + '/' + ec.model[k]);
                }
            }
        }
        */
        // initialise the array of descendants
        ec.eCI = [];
        // fill a node if there is none
        if (!node || maxlg === 0) {
            // prepare the first sequence
            // ec is an ElementCount
            var eci = new schema.ElementCountItem();
            eci.parentElementSpec = parent;
            eci.type = 'sequence';
            ec.eCI.push(eci);
            eci.element = [];
            eci.model = [];
            // ec.model contains an array of names of elementSpec
            // find and create first sequence of elementSpec
            for (var k = 0; k < ec.model.length; k++) {
                var h = exports.ptrListElementSpec[ec.model[k]];
                eci.model.push(ec.model[k]);
                eci.element.push(loadElementSpec(h, null, path + '/' + ec.model[k], ec.minOccurs, ec.maxOccurs, parent));
            }
            if (ec.minOccurs === '2') {
                // specific case of a node with 2 obligatory elements
                // prepare the second sequence
                // ec is an ElementCount
                var eci_1 = new schema.ElementCountItem();
                eci_1.type = 'sequence';
                ec.eCI.push(eci_1);
                eci_1.element = [];
                eci_1.model = [];
                // ec.model contains an array of names of elementSpec
                // find and create first sequence of elementSpec
                for (var k = 0; k < ec.model.length; k++) {
                    var h = exports.ptrListElementSpec[ec.model[k]];
                    eci_1.model.push(ec.model[k]);
                    eci_1.element.push(loadElementSpec(h, null, path + '/' + ec.model[k], ec.minOccurs, ec.maxOccurs, parent));
                }
            }
            return;
        }
        // generate a set of eci in ec.eCI
        for (var i = 0; i < maxlg; i++) {
            var eci = new schema.ElementCountItem();
            eci.parentElementSpec = parent;
            eci.type = 'sequence';
            eci.element = [];
            eci.model = [];
            ec.eCI.push(eci);
        }
        // fill the eci with the nodes
        for (var i = 0; i < maxlg; i++) {
            // prepare the new elements
            // ec is an ElementCount
            for (var k = 0; k < nnodes.length; k++) {
                // find and create first elementSpec
                var h = exports.ptrListElementSpec[ec.model[k]];
                ec.eCI[i].model.push(ec.model[k]);
                ec.eCI[i].element.push(loadElementSpec(h, nnodes[k].length > i ? nnodes[k][i] : null, path + '/' + ec.model[k], ec.minOccurs, ec.maxOccurs, parent));
            }
        }
    }
    
    
    /***/ }),
    /* 18 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    /**
     * @module edit.js
     * @author Christophe Parisse
     * creation of the HTML structures that will allow the edition of the ODD and the TEI
     * all the underlying structures have been created before in the odd.loadOdd and tei.load functions
     * the xxID fields than allow to get the final values are created here
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    var odd = __webpack_require__(4);
    var schema = __webpack_require__(3);
    var load = __webpack_require__(17);
    var iso639 = __webpack_require__(19);
    var iso3166 = __webpack_require__(20);
    var alert = __webpack_require__(5);
    var msg = __webpack_require__(7);
    var teimeta = __webpack_require__(2);
    /**
     * sets the internal dynamic function used by javascript in the HTML tags generated by the software
     */
    function initEditFunctions() {
        // for user interface in html pages
        if (!window['teimeta'])
            window['teimeta'] = {};
        window['teimeta'].setOnOffES = teimeta.teiData.edit.setOnOffES;
        window['teimeta'].setText = teimeta.teiData.edit.setText;
        window['teimeta'].createEC = teimeta.teiData.edit.createEC;
        window['teimeta'].setOpenlist = teimeta.teiData.edit.setOpenlist;
        window['teimeta'].initOpenlist = teimeta.teiData.edit.initOpenlist;
        window['teimeta'].toggleES = teimeta.teiData.edit.toggleES;
        window['teimeta'].checkTime = teimeta.teiData.edit.checkTime;
        window['teimeta'].highlight = teimeta.teiData.edit.highlight;
        window['teimeta'].odd = teimeta.teiData.dataOdd;
        // for debugging purposes
        window['dbg'] = {};
        window['dbg'].tei = teimeta.teiData;
        window['dbg'].v = teimeta.teiData.edit.values;
    }
    /**
     * contains the list of html that have to be modified after creating HTML dynamically
     * @private
     */
    var resizeList = [];
    function resizable(id, factor) {
        // deal with input tags
        var el = document.getElementById(id);
        if (!el)
            return;
        if (el.tagName && el.tagName.toLowerCase() == "textarea") {
            var s = el.textContent;
            //console.log('this is a textarea', s, el);
            var lines_1 = function (x) { return x.split(/\r*\n/); };
            var lineCount = function (x) { return lines_1(x).length; };
            var nbl = lineCount(s);
            //console.log('nb lines:', nbl);
            el.rows = nbl;
            return;
        }
        var int = Number(factor) || 7.7;
        function resize() { el.style.width = ((el.value.length + 1) * int) + 'px'; }
        var e = 'keyup,keypress,focus,blur,change'.split(',');
        for (var i in e)
            el.addEventListener(e[i], resize, false);
        resize();
    }
    /**
     * executes the list of html that have to be modified after creating HTML dynamically
     * @param list
     */
    function executeResizeList(list) {
        for (var f in list) {
            resizable(list[f], 8.8);
        }
    }
    /**
     * to be executed after an HTMl string provided by teimeta has been loaded
     * necessary to implement automatic resize of entry fields
     */
    function finalize() {
        executeResizeList(resizeList);
        resizeList = [];
    }
    exports.finalize = finalize;
    /**
     * global values that store the changes made by the user
     * results are gathered in the generate.generateTEI function
     */
    exports.values = {};
    var changed = false; // start with no change made. If set to true then the data has to be saved.
    /**
     * set and test if XML edited values were changed by the user
     * @param {*} newval - allows to set the change flag to true or false
     */
    function change(newval) {
        if (newval === void 0) { newval = undefined; }
        if (newval === undefined)
            return changed;
        changed = newval; // If the parameter is set, set the value
    }
    exports.change = change;
    var recursiveDepth = 0; // recursive depth is zero at start
    /**
     * format an integer into 2-digit values
     * @method intFormat2
     * @param {integer} value
     * @return {string} formatted value
     */
    function intFormat2(v) {
        return (v < 10) ? "0" + v : v;
    }
    /**
     * format the presentation of time in the transcript
     * @method formatTime
     * @param {float} time in seconds
     * @param {string} time format : hms 00:00 ?:00:00 and raw
     * @param {number} nb of digit to the right of the point
     * @return {string} time as string
     */
    function formatTime(t) {
        if (t === undefined || t === null || t === '')
            t = 0; // no time
        var d = new Date(t * 1000);
        var h = d.getUTCHours();
        var r;
        if (teimeta.teiData.params.fmt === 'hms') {
            if (h > 0)
                r = h + 'h' + d.getUTCMinutes() + "m" + d.getSeconds() + "s";
            else
                r = d.getUTCMinutes() + "m" + d.getSeconds() + "s";
        }
        else if (teimeta.teiData.params.fmt === '00:00') {
            r = intFormat2(h * 60 + d.getUTCMinutes()) + ':' + intFormat2(d.getSeconds());
        }
        else if (teimeta.teiData.params.fmt === '?:00:00') {
            if (h > 0)
                r = h + ':' + intFormat2(d.getUTCMinutes()) + ':' + intFormat2(d.getSeconds());
            else
                r = intFormat2(d.getUTCMinutes()) + ':' + intFormat2(d.getSeconds());
        }
        else if (teimeta.teiData.params.fmt === '0:00:00') {
            if (h > 0)
                r = h + ':' + intFormat2(d.getUTCMinutes()) + ':' + intFormat2(d.getSeconds());
            else
                r = h + ':' + intFormat2(d.getUTCMinutes()) + ':' + intFormat2(d.getSeconds());
        }
        else {
            r = h;
        }
        if (!teimeta.teiData.params.nbdigits)
            return r;
        var ms = '0.0';
        if (teimeta.teiData.params.nbdigits === 3)
            ms = ms.substring(2, 5);
        else if (teimeta.teiData.params.nbdigits === 2)
            ms = ms.substring(2, 4);
        else if (teimeta.teiData.params.nbdigits === 1)
            ms = ms.substring(2, 3);
        if (teimeta.teiData.params.fmt === 'hms')
            return r + ms;
        else
            return r + '.' + ms;
    }
    /**
     * check and modify the value of the time edited directly by the user
     * @method checkTime
     * @param event
     */
    function checkTime(event, id) {
        //console.log(event);
        //console.log(event.target);
        event.preventDefault();
        // découper en parties
        var tx = event.target.value;
        if (tx === '' || tx === 0 || tx === null) {
            // sets the time
            exports.values[id].value = '';
            return;
        }
        var newt = 0;
        if (teimeta.teiData.params.fmt === 'hms') {
            var m = tx.split(/[hmsHMS]/);
            if (m.length !== 3) {
                alert.alertUser(msg.msg('badtimeformat'));
                return;
            }
            var h = parseInt(m[0]);
            var mn = parseInt(m[1]);
            var s = parseFloat(m[2]);
            if (mn > 59 || mn < 0) {
                alert.alertUser(msg.msg('badtimeminutes'));
                return;
            }
            if (s > 59 || s < 0) {
                alert.alertUser(msg.msg('badtimeseconds'));
                return;
            }
            newt = h * 3600 + mn * 60 + s;
        }
        else {
            var m = tx.split(':');
            if (m.length === 1) {
                newt = parseFloat(m[0]);
            }
            else if (m.length === 2) {
                var mn_1 = parseInt(m[0]);
                var s_1 = parseFloat(m[1]);
                newt = mn_1 * 60 + s_1;
            }
            else if (m.length !== 3) {
                alert.alertUser(msg.msg('badtimeformat2'));
                return;
            }
            else {
                var h_1 = parseInt(m[0]);
                var mn_2 = parseInt(m[1]);
                var s_2 = parseFloat(m[2]);
                if (mn_2 > 59 || mn_2 < 0) {
                    alert.alertUser(msg.msg('badtimeminutes'));
                    return;
                }
                if (s_2 > 59 || s_2 < 0) {
                    alert.alertUser(msg.msg('badtimeseconds'));
                    return;
                }
                newt = h_1 * 3600 + mn_2 * 60 + s_2;
            }
        }
        // sets the time to newt
        exports.values[id].value = newt;
    }
    exports.checkTime = checkTime;
    /**
     * returns format for the time
     * @return {string} format
     */
    function styleTime() {
        var s;
        switch (teimeta.teiData.params.fmt) {
            case 'hms':
            case 'HMS':
                s = "Format: 0h0m0s";
                break;
            case '00:00':
                s = "Format: 00:00";
                break;
            case '00:00:00':
                s = "Format: 00:00:00";
                break;
            case '?:00:00':
                s = "Format: 00:00 ou 00:00:00";
                break;
            default:
                s = msg.msg('formatinseconds');
                break;
        }
        return s;
    }
    var lastId = 0;
    /**
     * creates a uniq ID
     * @return {number} ID name
     */
    function createID() {
        var id = 'id' + lastId;
        lastId++;
        return id;
    }
    exports.createID = createID;
    /**
     * validates or unvalidates an element
     * variants of shape for the icons
     * fa-circle-o fa-minus-circle fa-minus-square-o
     * fa-circle fa-thumbs-o-up fa-check-square
     * display or not validation of elementSpec
     * validation or not means change in shape
     * control controls the obligatory or optional feature
     * this is not changed here but in the initial dispalay
     * the classes fa-choice-validated et fa-choice-not-validated are pseudo-classes to know the state of an element
     * @param event
     * @param id
     * @param styleOn
     * @param styleOff
     */
    function setOnOff(event, id, styleOn, styleOff) {
        if (event.target.className.indexOf('fa-choice-not-validated') >= 0) {
            event.target.className = 'validate fa fa-size2 fa-choice-validated ' + styleOn;
            exports.values[id].select = 'ok';
            // here update to 'ok' the parents ElementSpec.
            setOnParents(exports.values[id].eltSpec);
        }
        else {
            alert.askUserModal(msg.msg('askremove'), function (ret) {
                if (ret) {
                    event.target.className = 'validate fa fa-size2 fa-choice-not-validated ' + styleOff;
                    exports.values[id].select = '';
                    setOffChildren(exports.values[id].eltSpec);
                }
            });
        }
    }
    exports.setOnOff = setOnOff;
    /**
     * exchage on off styles
     * @param id
     * @param val
     * @param styleOn
     * @param styleOff
     */
    function setStyleOnOff(id, val, styleOn, styleOff) {
        var node = document.getElementById(id);
        if (!node) {
            //console.log("no id found for ", id);
            return;
        }
        if (val) {
            node.className = 'validate fa fa-size2 fa-choice-validated ' + styleOn;
        }
        else {
            node.className = 'validate fa fa-size2 fa-choice-not-validated ' + styleOff;
        }
        //console.log(event);
    }
    /**
     * set parents to on
     * @param eltSpec
     */
    function setOnParents(eltSpec) {
        //console.log("put the parents to +++", eltSpec);
        exports.values[eltSpec.validatedESID].select = 'ok';
        if (eltSpec.usage === 'req')
            setStyleOnOff(eltSpec.validatedESID, true, 'fa-bookmark fa-color-required', 'fa-bookmark-o fa-color-required');
        else
            setStyleOnOff(eltSpec.validatedESID, true, 'fa-bookmark fa-color-optional', 'fa-bookmark-o fa-color-optional');
        if (eltSpec.parentElementSpec)
            setOnParents(eltSpec.parentElementSpec);
    }
    /**
     * set children to off - not implemented because unecessary are children
     * with a parent off are ignored in the final output
     * @param eltSpec
     */
    function setOffChildren(eltSpec) {
        console.log("put the children to ---", eltSpec);
    }
    /**
     * set on off the node that are extended (more than one nodes)
     * @param event
     * @param id
     * @param usage
     */
    function setOnOffES(event, id, usage) {
        if (usage === 'req')
            setOnOff(event, id, 'fa-bookmark fa-color-required', 'fa-bookmark-o fa-color-required');
        else
            setOnOff(event, id, 'fa-bookmark fa-color-optional', 'fa-bookmark-o fa-color-optional');
    }
    exports.setOnOffES = setOnOffES;
    /*
    export function setOnOffEC(event, id) {
        setOnOff(event, id, 'fa-check-square fa-color-expand', 'fa-minus-square-o fa-color-expand');
    }
    */
    /**
     * @method createEC
     * @param event // informed by the navigator
     * @param id // reference to the content in the ODD/TEI
     */
    function createEC(event, id) {
        change(true);
        var c = exports.values[id];
        // values[uniqCreate] = {elt: ec.model, tab: ec.eCI, id: uniqCreate, path: ec.absolutepath};
        var eci = new schema.ElementCountItem();
        eci.parentElementSpec = c.eltSpec;
        eci.type = c.elt.type;
        if (c.elt.type === 'elementRef') {
            eci.model = c.elt.model;
            var h = load.ptrListElementSpec[eci.model];
            eci.element = load.loadElementSpec(h, null, c.path + '/' + eci.model, "0", "unbounded", c.eltSpec);
        }
        else {
            eci.model = [];
            eci.element = [];
            for (var _i = 0, _a = c.elt.model; _i < _a.length; _i++) {
                var ece = _a[_i];
                eci.model.push(ece);
                var h = load.ptrListElementSpec[ece];
                eci.element.push(load.loadElementSpec(h, null, c.path + '/' + ece, "0", "unbounded", c.eltSpec));
            }
        }
        // duplication involves only the first level
        // push to all children the reset of node fields
        // should not be copied (check this ?)
        // odd.setNodesToNull(eci.element);
        c.tab.push(eci);
        var s = '<div class="content">\n';
        if (eci.type === 'elementRef') {
            s += generateElement(eci.element, 'optional');
        }
        else {
            for (var _b = 0, _c = eci.element; _b < _c.length; _b++) {
                var ece = _c[_b];
                s += generateElement(ece, 'optional');
            }
        }
        s += '</div>';
        //console.log(event, id);
        var referenceNode = document.getElementById(id);
        /*
        var newEl = document.createElement('div');
        newEl.innerHTML = s;
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        */
        referenceNode.insertAdjacentHTML('beforeend', s);
        // call resize if necessary
        finalize();
    }
    exports.createEC = createEC;
    /**
     * set text aas validated
     * @param event
     * @param id
     */
    function setText(event, id) {
        change(true);
        exports.values[id].value = event.target.value;
        setOnParents(exports.values[id].eltSpec);
        //console.log(event);
    }
    exports.setText = setText;
    /**
     * string for openchoice in adaquate locale value
     */
    function openchoice() {
        return msg.msg('editvalue');
    }
    function setOpenlist(event, id) {
        if (event.target.value === "--openchoice--") {
            alert.promptUserModal(msg.msg('givevalue'), function (ret) {
                if (ret) {
                    change(true);
                    exports.values[id].value = ret;
                    setOnParents(exports.values[id].eltSpec);
                    var select = document.getElementById(id);
                    var option = document.createElement("option");
                    option.value = ret;
                    option.innerHTML = ret;
                    select.appendChild(option);
                    select.value = ret;
                }
            });
            return;
        }
        change(true);
        exports.values[id].value = event.target.value;
        setOnParents(exports.values[id].eltSpec);
        //console.log(event);
    }
    exports.setOpenlist = setOpenlist;
    /**
     * init openlist display
     * @param event
     * @param id
     */
    function initOpenlist(event, id) {
        alert.promptUserModal(msg.msg('givevalue'), function (ret) {
            if (ret) {
                change(true);
                exports.values[id].value = ret;
                setOnParents(exports.values[id].eltSpec);
                var select = document.getElementById(id);
                var option = document.createElement("option");
                option.value = ret;
                option.innerHTML = ret;
                select.appendChild(option);
                select.value = ret;
                select.onclick = null; // remove this handler
            }
        });
    }
    exports.initOpenlist = initOpenlist;
    /**
     * toggle show hide nodes
     * @param el
     * @param value
     */
    function toggle(el, value) {
        var display = (window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle).display;
        if (display == 'none')
            el.style.display = value;
        else
            el.style.display = 'none';
    }
    /**
     * toggle ES nodes
     * @param event
     * @param id
     */
    function toggleES(event, id) {
        //console.log(event, id);
        // toggle
        var node = document.getElementById('show' + id);
        // if (el.classList) el.classList.contains(className);
        // if (el.classList) el.classList.add(className);
        // if (el.classList) el.classList.remove(className);
        toggle(node, "block");
    }
    exports.toggleES = toggleES;
    /**
     * show all hidden nodes
     */
    function showAll() {
        var nodes = document.getElementsByClassName('toggle');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].style.display = "block";
        }
    }
    exports.showAll = showAll;
    /**
     * hide all nodes
     */
    function hideAll() {
        var nodes = document.getElementsByClassName('toggle');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].style.display = "none";
        }
    }
    exports.hideAll = hideAll;
    /**
     * @function generateHtml
     * @param {Object} elist - teidata object from teimeta.ts
     * @return {string} r - HTML content
     */
    function generateHTML(teiData) {
        lastId = 0;
        initEditFunctions();
        recursiveDepth = 0;
        resizeList = [];
        var r = generateElement(teiData.dataTei, 'root');
        return r;
    }
    exports.generateHTML = generateHTML;
    /**
     * highlight a node during mouse movements
     * @param e
     */
    function highlight(e) {
        e = e || window.event;
        // console.log(e);
        //    if (e.button !== 2) return;
        if (!e.altKey)
            return;
        var el = e.target;
        if (e.target.className === "headHRef") {
            e.target.className = "headHRef highlight";
            setTimeout(function () { e.target.className = "headHRef"; }, 5000);
        }
    }
    exports.highlight = highlight;
    /**
     * generate value for the content of a node
     * @param ct
     * @param abspath
     * @return {string} html content
     */
    function generateContent(ct, abspath) {
        var s = '';
        for (var _i = 0, _a = ct.sequencesRefs; _i < _a.length; _i++) {
            var ec = _a[_i];
            //console.log(">>>",ec.model);
            if (ec.minOccurs === '1' && ec.maxOccurs === '1') {
                //console.log("1-1",ec.model);
                s += '<div class="headHRef" onmouseover="window.teimeta.highlight(event)">';
                if (ec.type === 'elementRef') {
                    s += generateElement(ec.eCI[0].element, 'obligatory');
                }
                else {
                    for (var _b = 0, _c = ec.eCI[0].element; _b < _c.length; _b++) {
                        var ece = _c[_b];
                        s += generateElement(ece, 'obligatory');
                    }
                }
                s += '</div>';
            }
            else {
                // console.log("multiple",ec.eCI[0].model);
                s += generateMultiple(ec, abspath);
            }
        }
        return s;
    }
    /**
     * generate value for multiple nodes
     * @param ec
     * @param abspath
     * @return {string} html content
     */
    function generateMultiple(ec, abspath) {
        // ec est un ElementCount
        var s = '';
        var uniqCreate = createID();
        var uniqCreate2 = createID();
        // console.log(ec); // ec.parentElementSpec.ident
        var idm = typeof (ec.ident) === 'string' ? ec.ident : (ec.ident.join('-'));
        s += '<div class="contentCountMany UPCM-' + idm + '" id="' + uniqCreate + '" ';
        if (teimeta.teiData.dataOdd.remarks === false || !teimeta.teiData.cssName)
            s += ' style="border: 1px solid black; border-radius: 4px;"';
        s += ' >\n';
        // on peut en rajouter ... ou supprimer
        s += '<div class="plusCM"><i id="' + uniqCreate2 + '" class="create fa fa-plus-square fa-color-expand" '
            + 'onclick="window.teimeta.createEC(event, \'' + uniqCreate + '\')"></i></div>\n';
        exports.values[uniqCreate] = { elt: ec.eCI[0], tab: ec.eCI, id: uniqCreate, path: abspath, eltSpec: ec.parentElementSpec };
        for (var i in ec.eCI) {
            // HERE can put info about expansions
            s += '<div class="content">\n';
            if (ec.eCI[i].type === 'elementRef') {
                s += generateElement(ec.eCI[i].element, 'obligatory');
            }
            else {
                for (var _i = 0, _a = ec.eCI[i].element; _i < _a.length; _i++) {
                    var ece = _a[_i];
                    s += generateElement(ece, 'obligatory');
                }
            }
            s += '</div>\n';
        }
        s += '</div>\n';
        return s;
    }
    /**
     * generate content for editing a value
     * @param datatype
     * @param ident
     * @return {string} html content
     */
    function editDataType(datatype, ident) {
        //    console.log('DATATYPE', datatype);
        // if (datatype.remarks) console.log("datatype remarks", datatype.remarks.ident, datatype.remarks, datatype);
        var s = '<div class="nodeEdit">\n';
        // il faut editer l'élément texte du noeud
        var uniq = createID();
        var UPname = 'UPI-' + datatype.parentElementSpec.ident + (datatype.parentElementSpec.corresp ? '-' + datatype.parentElementSpec.corresp : '') + '-' + ident;
        // gérer le type d'édition du champ
        switch (datatype.type) {
            case 'list':
                if (!datatype.vallist || datatype.vallist.length <= 0) {
                    // grosse erreur ou manque liste vide
                    alert.alertUser(msg.msg('nolistdatatype') + datatype.type);
                    return '';
                }
                if (datatype.vallist.length <= 1) {
                    // liste avec un seul element
                    //console.log("1datatype:", datatype.valueContent, datatype.rend, datatype);
                    exports.values[uniq] = { value: (datatype.valueContent ? datatype.valueContent : datatype.rend), eltSpec: datatype.parentElementSpec };
                    datatype.valueContentID = uniq;
                    return '';
                }
                //console.log("datatype:", datatype.valueContent, datatype.rend, datatype);
                datatype.valueContentID = uniq;
                if (!datatype.valueContent) {
                    // if empty put rend value if exists else put first element
                    if (datatype.rend) {
                        datatype.valueContent = datatype.rend;
                    }
                    else if (datatype.vallist) {
                        datatype.valueContent = (datatype.vallist.length > 0) ? datatype.vallist[0].ident : "";
                    }
                }
                exports.values[uniq] = { value: datatype.valueContent, eltSpec: datatype.parentElementSpec };
                // edition de la valeur
                /*
                if (usage === 'req') {
                    s += '<label for="' + uniq + '">';
                    s += '<em>obligatoire</em>';
                    s += '</label>\n';
                }
                */
                // choix dans une liste
                s += '<select class="listattr ' + UPname;
                if (datatype.remarks && datatype.remarks.ident) {
                    s += ' ' + datatype.remarks.ident;
                }
                s += '" id="' + uniq + '" ';
                if (datatype.remarks) {
                    s += 'style="' + datatype.remarks.cssvalue + '" \n';
                }
                s += 'onchange="window.teimeta.setText(event, \'' + uniq + '\');" >\n';
                for (var k = 0; k < datatype.vallist.length; k++) {
                    s += '<option value="' +
                        datatype.vallist[k].ident + '" ';
                    if (datatype.valueContent === datatype.vallist[k].ident)
                        s += 'selected="selected" ';
                    s += '>' + odd.textDesc(datatype.vallist[k].desc, teimeta.teiData.params.language) + '</option>\n';
                }
                s += '</select>\n';
                break;
            case 'openlist':
                // attributs avec liste
                datatype.valueContentID = uniq;
                if (!datatype.valueContent) {
                    // if empty put rend value if exists else put first element
                    if (datatype.rend) {
                        datatype.valueContent = datatype.rend;
                    }
                    else if (datatype.vallist) {
                        datatype.valueContent = (datatype.vallist.length > 0) ? datatype.vallist[0].ident : "";
                    }
                }
                exports.values[uniq] = { value: datatype.valueContent, eltSpec: datatype.parentElementSpec };
                /*
                s +='<input type=text class="awesomplete listattr" data-minchars="0" list="' + uniq + '" value="' + datatype.valueContent + '" ';
                s +='onchange="window.teimeta.setAttr(event, \'' + uniq + '\');"/>\n';
                s +='<datalist id="' + uniq + '">';
                for (let k in datatype.vallist) {
                    s += '<option value="' +
                        datatype.vallist[k].ident + '" ';
                        s += '>' + odd.textDesc(datatype.vallist[k].desc, teimeta.teiData.params.language);
                        s += '</option>\n';
                }
                s += '</datalist>\n';
                */
                // choix dans une liste avec ajout possible
                s += '<select class="listattr ' + UPname;
                if (datatype.remarks && datatype.remarks.ident) {
                    s += ' ' + datatype.remarks.ident;
                }
                s += '" id="' + uniq + '" \n';
                if (datatype.remarks) {
                    s += 'style="' + datatype.remarks.cssvalue + '" \n';
                }
                s += 'onchange="window.teimeta.setOpenlist(event, \'' + uniq + '\');" \n';
                if (datatype.vallist.length === 0) {
                    s += 'onclick="window.teimeta.initOpenlist(event, \'' + uniq + '\');" \n';
                    // ne faire cela que pour des listes pas encore remplie. Pas nécessaire pour les autres.                
                }
                s += '>\n';
                s += '<option value="--openchoice--">';
                s += openchoice() + '</option>\n';
                var selected = false;
                for (var k = 0; k < datatype.vallist.length; k++) {
                    if (datatype.valueContent === datatype.vallist[k].ident) {
                        selected = true;
                    }
                }
                for (var k = 0; k < datatype.vallist.length; k++) {
                    s += '<option value="' +
                        datatype.vallist[k].ident + '" ';
                    if (datatype.valueContent === datatype.vallist[k].ident || k === 0 && selected === false) {
                        s += 'selected="selected" ';
                        selected = true;
                    }
                    s += '>' + odd.textDesc(datatype.vallist[k].desc, teimeta.teiData.params.language) + '</option>\n';
                }
                s += '</select>\n';
                break;
            case 'languagecode':
                //console.log("datatype:", datatype.valueContent, datatype.rend, datatype);
                datatype.valueContentID = uniq;
                if (!datatype.valueContent) {
                    // if empty put rend value if exists else put first element
                    if (datatype.rend) {
                        datatype.valueContent = datatype.rend;
                    }
                    else if (datatype.vallist) {
                        datatype.valueContent = (datatype.vallist.length > 0) ? datatype.vallist[0].ident : "";
                    }
                }
                exports.values[uniq] = { value: datatype.valueContent, eltSpec: datatype.parentElementSpec };
                // edit the value
                // choice in a list
                s += '<select class="listattr iso ' + UPname;
                if (datatype.remarks && datatype.remarks.ident) {
                    s += ' ' + datatype.remarks.ident;
                }
                s += '" id="' + uniq + '" ';
                if (datatype.remarks) {
                    s += 'style="' + datatype.remarks.cssvalue + '" \n';
                }
                s += 'onchange="window.teimeta.setText(event, \'' + uniq + '\');" >\n';
                for (var k = 0; k < iso639.code639.length; k++) {
                    s += '<option value="' +
                        iso639.code639[k].code + '" ';
                    if (datatype.valueContent === iso639.code639[k].code)
                        s += 'selected="selected" ';
                    s += '>' + iso639.code639[k].name /* + ' - ' + iso639.code639[k].desc */ + '</option>\n';
                }
                s += '</select>\n';
                break;
            case 'countrycode':
                //console.log("datatype:", datatype.valueContent, datatype.rend, datatype);
                datatype.valueContentID = uniq;
                if (!datatype.valueContent) {
                    // if empty put rend value if exists else put first element
                    if (datatype.rend) {
                        datatype.valueContent = datatype.rend;
                    }
                    else if (datatype.vallist) {
                        datatype.valueContent = (datatype.vallist.length > 0) ? datatype.vallist[0].ident : "";
                    }
                }
                exports.values[uniq] = { value: datatype.valueContent, eltSpec: datatype.parentElementSpec };
                // edit the value
                // choice in a list
                s += '<select class="listattr iso ' + UPname;
                if (datatype.remarks && datatype.remarks.ident) {
                    s += ' ' + datatype.remarks.ident;
                }
                s += '" id="' + uniq + '" ';
                if (datatype.remarks) {
                    s += 'style="' + datatype.remarks.cssvalue + '" \n';
                }
                s += 'onchange="window.teimeta.setText(event, \'' + uniq + '\');" >\n';
                for (var k = 0; k < iso3166.iso3666Alpha2.length; k++) {
                    s += '<option value="' +
                        iso3166.iso3666Alpha2[k].code + '" ';
                    if (datatype.valueContent === iso3166.iso3666Alpha2[k].code)
                        s += 'selected="selected" ';
                    s += '>' + iso3166.iso3666Alpha2[k].name + '</option>\n';
                }
                s += '</select>\n';
                break;
            case 'duration':
                datatype.valueContentID = uniq;
                exports.values[uniq] = { value: datatype.valueContent, eltSpec: datatype.parentElementSpec };
                // edition de la valeur
                s += '<label for="' + uniq + '">';
                /*
                if (usage === 'req') {
                    s += '<em>obligatoire</em>';
                }
                */
                s += ' ' + styleTime();
                s += '</label>\n';
                s += '<input class="' + UPname;
                if (datatype.remarks && datatype.remarks.ident) {
                    s += ' ' + datatype.remarks.ident;
                }
                s += '" name="' + uniq + '" id="' + uniq + '" ';
                resizeList.push(uniq);
                if (datatype.remarks) {
                    s += 'style="' + datatype.remarks.cssvalue + '" \n';
                }
                s += 'onchange="window.teimeta.checkTime(event, \'' + uniq + '\');"';
                s += ' value="' + formatTime(datatype.valueContent) + '"';
                s += ' />\n';
                break;
            case 'date':
            case 'month':
                datatype.valueContentID = uniq;
                exports.values[uniq] = { value: datatype.valueContent, eltSpec: datatype.parentElementSpec };
                // edition de la valeur
                /*
                if (usage === 'req') {
                    s += '<label for="' + uniq + '">';
                    s += '<em>obligatoire</em>';
                    s += '</label>\n';
                }
                */
                s += '<input class="date ' + UPname;
                if (datatype.remarks && datatype.remarks.ident) {
                    s += ' ' + datatype.remarks.ident;
                }
                s += '" type="date" name="' + uniq + '" id="' + uniq + '" ';
                if (datatype.remarks) {
                    s += 'style="' + datatype.remarks.cssvalue + '" \n';
                }
                s += 'onchange="window.teimeta.setText(event, \'' + uniq + '\');"';
                if (datatype.valueContent)
                    s += ' value="' + datatype.valueContent + '"';
                s += ' />\n';
                break;
            case 'multiline':
                datatype.valueContentID = uniq;
                exports.values[uniq] = { value: datatype.valueContent, eltSpec: datatype.parentElementSpec };
                // edition de la valeur
                /*
                if (usage === 'req') {
                    s += '<label for="' + uniq + '">';
                    s += '<em>obligatoire</em>';
                    s += '</label>\n';
                }
                */
                s += '<textarea rows="1" class="multiline autosize ' + UPname;
                if (datatype.remarks && datatype.remarks.ident) {
                    s += ' ' + datatype.remarks.ident;
                }
                s += '" name="' + uniq + '" id="' + uniq + '" ';
                resizeList.push(uniq);
                if (datatype.remarks) {
                    s += 'style="' + datatype.remarks.cssvalue + '" \n';
                }
                s += 'onchange="window.teimeta.setText(event, \'' + uniq + '\');"';
                //            if (datatype.valueContent) s += ' value="' + datatype.valueContent + '"';
                s += ' >';
                if (datatype.valueContent)
                    s += datatype.valueContent;
                s += '</textarea>\n';
                break;
            case 'anyURI':
            case 'url':
            case 'string':
            case 'number':
            default:
                datatype.valueContentID = uniq;
                exports.values[uniq] = { value: datatype.valueContent, eltSpec: datatype.parentElementSpec };
                // edition de la valeur
                /*
                if (usage === 'req') {
                    s += '<label for="' + uniq + '">';
                    s += '<em>obligatoire</em>';
                    s += '</label>\n';
                }
                */
                s += '<input class="' + UPname;
                if (datatype.remarks && datatype.remarks.ident) {
                    s += ' ' + datatype.remarks.ident;
                }
                s += '" name="' + uniq + '" id="' + uniq + '" ';
                resizeList.push(uniq);
                if (datatype.remarks) {
                    s += 'style="' + datatype.remarks.cssvalue + '" \n';
                }
                s += 'onchange="window.teimeta.setText(event, \'' + uniq + '\');"';
                if (datatype.valueContent)
                    s += ' value="' + datatype.valueContent + '"';
                s += ' />\n';
                break;
        }
        s += '</div>\n';
        return s;
    }
    function classOf(usage) {
        switch (usage) {
            case 'req':
                return 'color-required';
            case 'rec':
                return 'color-recommended';
            default:
                return 'color-optional';
        }
    }
    /**
     * generate content for editing an attribute
     * @param elt
     * @return {string} html content
     */
    function editAttr(elt) {
        if (elt.attr.length < 1)
            return;
        var s = '<div class="nodeAttr">\n';
        for (var i in elt.attr) {
            if (!elt.attr[i].datatype)
                continue; // pas d'édition de la valeur
            if (elt.attr[i].rend)
                elt.attr[i].valueContent = elt.attr[i].rend;
            s += '<span class="eltNodeAttr-' + classOf(elt.attr[i].usage) + '">\n';
            if (elt.attr[i].desc) {
                s += '<span class="descAttr">';
                s += odd.textDesc(elt.attr[i].desc, teimeta.teiData.params.language);
                s += '</span>\n';
            }
            s += editDataType(elt.attr[i].datatype, elt.attr[i].ident);
            s += '</span>\n';
        }
        s += '</div>\n';
        return s;
    }
    /**
     * generate value for the element
     * @param elt
     * @param validatedStyle
     * @return {string} html content
     */
    function generateElement(elt, validatedStyle) {
        // let s = '<div class="element">';
        var s = '';
        var uniq = createID();
        recursiveDepth++; // increase depth of edition
        if (validatedStyle === 'optional')
            elt.usage = 'opt'; // created by the user
        // test if the elemennt is to be displayed or if this is something to edit in it
        var classdisplay = "UP-" + elt.ident;
        s += '<div class="contentCountSimple UPCM-' + elt.ident + '">\n';
        if (elt.corresp)
            classdisplay += "-" + elt.corresp;
        if (teimeta.teiData.params.displayFullpath || elt.attr.length > 0 || (elt.content && elt.content.datatype)) {
            var lprof = recursiveDepth * teimeta.teiData.params.leftShift;
            if (teimeta.teiData.params.displayFullpath && (elt.attr.length === 0 && (!elt.content || !elt.content.datatype)))
                classdisplay = "noUP";
            // if (elt.remarks) console.log("elt remarks (on) ", elt.ident, elt);
            if (elt.remarks) {
                s += '<div title="' + elt.absolutepath + '" ';
                s += 'class="nodeField node-' + classOf(elt.usage) + " " + classdisplay;
                s += (elt.remarks.ident) ? " " + elt.remarks.ident + '" ' : '" ';
                s += 'style="' + elt.remarks.cssvalue + '">\n';
            }
            else {
                s += '<div class="nodeField node-' + classOf(elt.usage) + " " + classdisplay + '" title="'
                    + elt.absolutepath + '" style="margin-left: ' + lprof + 'px;">\n';
            }
            if (teimeta.teiData.params.validateRequired && validatedStyle !== 'root') {
                // on peut tout valider donc on ne se pose pas de question
                exports.values[uniq] = { select: elt.validatedES, eltSpec: elt.parentElementSpec };
                elt.validatedESID = uniq;
                if (elt.validatedES) {
                    s += '<i id="' + elt.validatedESID + '" class="validate fa fa-size2 fa-bookmark fa-choice-validated fa-'
                        + classOf(elt.usage)
                        + '" onclick="window.teimeta.setOnOffES(event, \'' + uniq + '\', \'' + elt.usage + '\')"></i>';
                }
                else {
                    s += '<i id="' + elt.validatedESID + '" class="validate fa fa-size2 fa-bookmark-o fa-choice-not-validated fa-'
                        + classOf(elt.usage)
                        + '" onclick="window.teimeta.setOnOffES(event, \'' + uniq + '\', \'' + elt.usage + '\')"></i>';
                }
            }
            else {
                // on ne peut pas valider les req - ils sont toujours à validatedES === 'ok'
                if (elt.usage === 'req') // || validatedStyle === 'root')
                    elt.validatedES = 'ok';
                exports.values[uniq] = { select: elt.validatedES, eltSpec: elt.parentElementSpec };
                elt.validatedESID = uniq;
                if (validatedStyle !== 'root' && (elt.usage !== 'req' || validatedStyle === 'optional')) {
                    if (elt.validatedES) {
                        s += '<i id="' + elt.validatedESID + '" class="validate fa fa-size2 fa-bookmark fa-choice-validated fa-'
                            + classOf(elt.usage)
                            + '" onclick="window.teimeta.setOnOffES(event, \'' + uniq + '\', \'' + elt.usage + '\')"></i>';
                    }
                    else {
                        s += '<i id="' + elt.validatedESID + '" class="validate fa fa-size2 fa-bookmark-o fa-choice-not-validated fa-'
                            + classOf(elt.usage)
                            + '" onclick="window.teimeta.setOnOffES(event, \'' + uniq + '\', \'' + elt.usage + '\')"></i>';
                    }
                }
            }
            // contenu (node principal)
            s += '<i class="hidebutton fa fa-size2 fa-star-half-o fa-color-toggle" '
                + 'onclick="window.teimeta.toggleES(event, \'' + uniq + '\')"></i>';
            if (teimeta.teiData.params.displayFullpath) {
                s += '<span class="nodeIdent">' + elt.ident + '</span>\n';
                s += '<span class="nodeAbspath">' + elt.absolutepath + '</span>\n';
                s += '<div class="toggle" id="show' + uniq + '">';
                // description
                if (elt.desc)
                    s += '<div class="eltDescBlock ' + classdisplay + '-desc' + '">' + odd.textDesc(elt.desc, teimeta.teiData.params.language) + '</div>\n';
            }
            else {
                s += '<div class="toggle" id="show' + uniq + '">';
                // description
                if (elt.desc)
                    s += '<div class="eltDesc ' + classdisplay + '-desc' + '">' + odd.textDesc(elt.desc, teimeta.teiData.params.language) + '</div>\n';
                else
                    s += '<div class="eltDesc ' + classdisplay + '-desc' + '">' + elt.ident + '</div>\n';
            }
            // champ texte du noeud
            if (elt.content && elt.content.datatype)
                s += editDataType(elt.content.datatype, elt.ident);
            // Attributes
            if (elt.attr.length > 0)
                s += editAttr(elt);
            // enfants
            if (elt.content && elt.content.sequencesRefs.length > 0) {
                s += '<div class="nodeContent">';
                s += generateContent(elt.content, elt.absolutepath);
                s += '</div>\n';
            }
            s += '</div>\n';
            s += '</div>\n';
        }
        else {
            recursiveDepth--; // cancel recursiveDepth
            var lprof = recursiveDepth * teimeta.teiData.params.leftShift;
            if (elt.remarks) {
                // if (elt.remarks) console.log("elt remarks (off) ", elt.ident, elt);
                s += '<div class="nodeField noUP node-' + classOf(elt.usage) + " " + classdisplay;
                s += (elt.remarks.ident) ? " " + elt.remarks.ident + '" ' : '" ';
                s += 'style="' + elt.remarks.cssvalue + '">\n';
            }
            else {
                s += '<div class="nodeField node-' + classOf(elt.usage)
                    + ' noUP" style="margin-left: ' + lprof + 'px;">\n';
            }
            exports.values[uniq] = { select: 'ok', eltSpec: elt.parentElementSpec };
            // on ne peut pas accepter les éléments non validés car ils sont cachés
            elt.validatedESID = uniq;
            if (validatedStyle === 'optional' || elt.usage === 'opt') {
                if (elt.usage === 'opt')
                    exports.values[uniq] = { select: elt.validatedES, eltSpec: elt.parentElementSpec };
                // on peut valider
                if (exports.values[uniq].select === 'ok') {
                    s += '<i id="' + elt.validatedESID + '" class="validate fa fa-size2 fa-bookmark fa-choice-validated fa-'
                        + classOf(elt.usage)
                        + '" onclick="window.teimeta.setOnOffES(event, \'' + uniq + '\', \'' + elt.usage + '\')"></i>';
                }
                else {
                    s += '<i id="' + elt.validatedESID + '" class="validate fa fa-size2 fa-bookmark-o fa-choice-not-validated fa-'
                        + classOf(elt.usage)
                        + '" onclick="window.teimeta.setOnOffES(event, \'' + uniq + '\', \'' + elt.usage + '\')"></i>';
                }
            }
            // description
            if (elt.desc)
                s += '<div class="eltDesc ' + classdisplay + '-desc' + '">' + odd.textDesc(elt.desc, teimeta.teiData.params.language) + '</div>\n';
            else if (teimeta.teiData.params.displayFullpath)
                s += '<div class="eltDesc ' + classdisplay + '-desc' + '">' + elt.ident + '</div>\n';
            if (elt.content && elt.content.sequencesRefs.length > 0) {
                s += '<div class="nodeContent">';
                s += generateContent(elt.content, elt.absolutepath);
                s += '</div>\n';
            }
            s += '</div>\n';
            recursiveDepth++; // reset recursiveDepth
        }
        s += '</div>\n';
        recursiveDepth--;
        return s;
    }
    
    
    /***/ }),
    /* 19 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @module iso639.ts
     * @author Christophe Parisse
     * list of codes for iso languages reference
     */
    exports.code639 = [
        { code: "baq", code2: "eus", code2l: "eu", name: "Basque", desc: "basque" },
        { code: "chi", code2: "zho", code2l: "zh", name: "Chinese", desc: "chinois" },
        { code: "cze", code2: "ces", code2l: "cs", name: "Czech", desc: "tchèque" },
        { code: "dan", code2: "", code2l: "da", name: "Danish", desc: "danois" },
        { code: "dut", code2: "nld", code2l: "nl", name: "Dutch; Flemish", desc: "néerlandais; flamand" },
        { code: "eng", code2: "", code2l: "en", name: "English", desc: "anglais" },
        { code: "est", code2: "", code2l: "et", name: "Estonian", desc: "estonien" },
        { code: "fin", code2: "", code2l: "fi", name: "Finnish", desc: "finnois" },
        { code: "fre", code2: "fra", code2l: "fr", name: "French", desc: "français" },
        { code: "ger", code2: "deu", code2l: "de", name: "German", desc: "allemand" },
        { code: "heb", code2: "", code2l: "he", name: "Hebrew", desc: "hébreu" },
        { code: "hrv", code2: "", code2l: "hr", name: "Croatian", desc: "croate" },
        { code: "hun", code2: "", code2l: "hu", name: "Hungarian", desc: "hongrois" },
        { code: "ice", code2: "isl", code2l: "is", name: "Icelandic", desc: "islandais" },
        { code: "ita", code2: "", code2l: "it", name: "Italian", desc: "italien" },
        { code: "jpn", code2: "", code2l: "ja", name: "Japanese", desc: "japonais" },
        { code: "kor", code2: "", code2l: "ko", name: "Korean", desc: "coréen" },
        { code: "nor", code2: "", code2l: "no", name: "Norwegian", desc: "norvégien" },
        { code: "pol", code2: "", code2l: "pl", name: "Polish", desc: "polonais" },
        { code: "por", code2: "", code2l: "pt", name: "Portuguese", desc: "portugais" },
        { code: "rus", code2: "", code2l: "ru", name: "Russian", desc: "russe" },
        { code: "slo", code2: "slk", code2l: "sk", name: "Slovak", desc: "slovaque" },
        { code: "slv", code2: "", code2l: "sl", name: "Slovenian", desc: "slovène" },
        { code: "spa", code2: "", code2l: "es", name: "Spanish; Castilian", desc: "espagnol; castillan" },
        { code: "swe", code2: "", code2l: "sv", name: "Swedish", desc: "suédois" },
        { code: "tur", code2: "", code2l: "tr", name: "Turkish", desc: "turc" },
        { code: "abk", code2: "", code2l: "ab", name: "Abkhazian", desc: "abkhaze" },
        { code: "ace", code2: "", code2l: "", name: "Achinese", desc: "aceh" },
        { code: "ach", code2: "", code2l: "", name: "Acoli", desc: "acoli" },
        { code: "ada", code2: "", code2l: "", name: "Adangme", desc: "adangme" },
        { code: "ady", code2: "", code2l: "", name: "Adyghe; Adygei", desc: "adyghé" },
        { code: "afa", code2: "", code2l: "", name: "Afro-Asiatic languages", desc: "afro-asiatiques, langues" },
        { code: "afh", code2: "", code2l: "", name: "Afrihili", desc: "afrihili" },
        { code: "afr", code2: "", code2l: "af", name: "Afrikaans", desc: "afrikaans" },
        { code: "ain", code2: "", code2l: "", name: "Ainu", desc: "aïnou" },
        { code: "aka", code2: "", code2l: "ak", name: "Akan", desc: "akan" },
        { code: "akk", code2: "", code2l: "", name: "Akkadian", desc: "akkadien" },
        { code: "alb", code2: "sqi", code2l: "sq", name: "Albanian", desc: "albanais" },
        { code: "ale", code2: "", code2l: "", name: "Aleut", desc: "aléoute" },
        { code: "alg", code2: "", code2l: "", name: "Algonquian languages", desc: "algonquines, langues" },
        { code: "alt", code2: "", code2l: "", name: "Southern Altai", desc: "altai du Sud" },
        { code: "amh", code2: "", code2l: "am", name: "Amharic", desc: "amharique" },
        { code: "ang", code2: "", code2l: "", name: "English, Old (ca.450-1100)", desc: "anglo-saxon (ca.450-1100)" },
        { code: "anp", code2: "", code2l: "", name: "Angika", desc: "angika" },
        { code: "apa", code2: "", code2l: "", name: "Apache languages", desc: "apaches, langues" },
        { code: "ara", code2: "", code2l: "ar", name: "Arabic", desc: "arabe" },
        { code: "arc", code2: "", code2l: "", name: "Official Aramaic (700-300 BCE); Imperial Aramaic (700-300 BCE)", desc: "araméen d'empire (700-300 BCE)" },
        { code: "arg", code2: "", code2l: "an", name: "Aragonese", desc: "aragonais" },
        { code: "arm", code2: "hye", code2l: "hy", name: "Armenian", desc: "arménien" },
        { code: "arn", code2: "", code2l: "", name: "Mapudungun; Mapuche", desc: "mapudungun; mapuche; mapuce" },
        { code: "arp", code2: "", code2l: "", name: "Arapaho", desc: "arapaho" },
        { code: "art", code2: "", code2l: "", name: "Artificial languages", desc: "artificielles, langues" },
        { code: "arw", code2: "", code2l: "", name: "Arawak", desc: "arawak" },
        { code: "asm", code2: "", code2l: "as", name: "Assamese", desc: "assamais" },
        { code: "ast", code2: "", code2l: "", name: "Asturian; Bable; Leonese; Asturleonese", desc: "asturien; bable; léonais; asturoléonais" },
        { code: "ath", code2: "", code2l: "", name: "Athapascan languages", desc: "athapascanes, langues" },
        { code: "aus", code2: "", code2l: "", name: "Australian languages", desc: "australiennes, langues" },
        { code: "ava", code2: "", code2l: "av", name: "Avaric", desc: "avar" },
        { code: "ave", code2: "", code2l: "ae", name: "Avestan", desc: "avestique" },
        { code: "awa", code2: "", code2l: "", name: "Awadhi", desc: "awadhi" },
        { code: "aym", code2: "", code2l: "ay", name: "Aymara", desc: "aymara" },
        { code: "aze", code2: "", code2l: "az", name: "Azerbaijani", desc: "azéri" },
        { code: "bad", code2: "", code2l: "", name: "Banda languages", desc: "banda, langues" },
        { code: "bai", code2: "", code2l: "", name: "Bamileke languages", desc: "bamiléké, langues" },
        { code: "bak", code2: "", code2l: "ba", name: "Bashkir", desc: "bachkir" },
        { code: "bal", code2: "", code2l: "", name: "Baluchi", desc: "baloutchi" },
        { code: "bam", code2: "", code2l: "bm", name: "Bambara", desc: "bambara" },
        { code: "ban", code2: "", code2l: "", name: "Balinese", desc: "balinais" },
        { code: "bas", code2: "", code2l: "", name: "Basa", desc: "basa" },
        { code: "bat", code2: "", code2l: "", name: "Baltic languages", desc: "baltes, langues" },
        { code: "bej", code2: "", code2l: "", name: "Beja; Bedawiyet", desc: "bedja" },
        { code: "bel", code2: "", code2l: "be", name: "Belarusian", desc: "biélorusse" },
        { code: "bem", code2: "", code2l: "", name: "Bemba", desc: "bemba" },
        { code: "ben", code2: "", code2l: "bn", name: "Bengali", desc: "bengali" },
        { code: "ber", code2: "", code2l: "", name: "Berber languages", desc: "berbères, langues" },
        { code: "bho", code2: "", code2l: "", name: "Bhojpuri", desc: "bhojpuri" },
        { code: "bih", code2: "", code2l: "bh", name: "Bihari languages", desc: "langues biharis" },
        { code: "bik", code2: "", code2l: "", name: "Bikol", desc: "bikol" },
        { code: "bin", code2: "", code2l: "", name: "Bini; Edo", desc: "bini; edo" },
        { code: "bis", code2: "", code2l: "bi", name: "Bislama", desc: "bichlamar" },
        { code: "bla", code2: "", code2l: "", name: "Siksika", desc: "blackfoot" },
        { code: "bnt", code2: "", code2l: "", name: "Bantu (Other)", desc: "bantoues, autres langues" },
        { code: "bos", code2: "", code2l: "bs", name: "Bosnian", desc: "bosniaque" },
        { code: "bra", code2: "", code2l: "", name: "Braj", desc: "braj" },
        { code: "bre", code2: "", code2l: "br", name: "Breton", desc: "breton" },
        { code: "btk", code2: "", code2l: "", name: "Batak languages", desc: "batak, langues" },
        { code: "bua", code2: "", code2l: "", name: "Buriat", desc: "bouriate" },
        { code: "bug", code2: "", code2l: "", name: "Buginese", desc: "bugi" },
        { code: "bul", code2: "", code2l: "bg", name: "Bulgarian", desc: "bulgare" },
        { code: "bur", code2: "mya", code2l: "my", name: "Burmese", desc: "birman" },
        { code: "byn", code2: "", code2l: "", name: "Blin; Bilin", desc: "blin; bilen" },
        { code: "cad", code2: "", code2l: "", name: "Caddo", desc: "caddo" },
        { code: "cai", code2: "", code2l: "", name: "Central American Indian languages", desc: "amérindiennes de L'Amérique centrale, langues" },
        { code: "car", code2: "", code2l: "", name: "Galibi Carib", desc: "karib; galibi; carib" },
        { code: "cat", code2: "", code2l: "ca", name: "Catalan; Valencian", desc: "catalan; valencien" },
        { code: "cau", code2: "", code2l: "", name: "Caucasian languages", desc: "caucasiennes, langues" },
        { code: "ceb", code2: "", code2l: "", name: "Cebuano", desc: "cebuano" },
        { code: "cel", code2: "", code2l: "", name: "Celtic languages", desc: "celtiques, langues; celtes, langues" },
        { code: "cha", code2: "", code2l: "ch", name: "Chamorro", desc: "chamorro" },
        { code: "chb", code2: "", code2l: "", name: "Chibcha", desc: "chibcha" },
        { code: "che", code2: "", code2l: "ce", name: "Chechen", desc: "tchétchène" },
        { code: "chg", code2: "", code2l: "", name: "Chagatai", desc: "djaghataï" },
        { code: "chk", code2: "", code2l: "", name: "Chuukese", desc: "chuuk" },
        { code: "chm", code2: "", code2l: "", name: "Mari", desc: "mari" },
        { code: "chn", code2: "", code2l: "", name: "Chinook jargon", desc: "chinook, jargon" },
        { code: "cho", code2: "", code2l: "", name: "Choctaw", desc: "choctaw" },
        { code: "chp", code2: "", code2l: "", name: "Chipewyan; Dene Suline", desc: "chipewyan" },
        { code: "chr", code2: "", code2l: "", name: "Cherokee", desc: "cherokee" },
        { code: "chu", code2: "", code2l: "cu", name: "Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic", desc: "slavon d'église; vieux slave; slavon liturgique; vieux bulgare" },
        { code: "chv", code2: "", code2l: "cv", name: "Chuvash", desc: "tchouvache" },
        { code: "chy", code2: "", code2l: "", name: "Cheyenne", desc: "cheyenne" },
        { code: "cmc", code2: "", code2l: "", name: "Chamic languages", desc: "chames, langues" },
        { code: "cop", code2: "", code2l: "", name: "Coptic", desc: "copte" },
        { code: "cor", code2: "", code2l: "kw", name: "Cornish", desc: "cornique" },
        { code: "cos", code2: "", code2l: "co", name: "Corsican", desc: "corse" },
        { code: "cpe", code2: "", code2l: "", name: "Creoles and pidgins, English based", desc: "créoles et pidgins basés sur l'anglais" },
        { code: "cpf", code2: "", code2l: "", name: "Creoles and pidgins, French-based ", desc: "créoles et pidgins basés sur le français" },
        { code: "cpp", code2: "", code2l: "", name: "Creoles and pidgins, Portuguese-based ", desc: "créoles et pidgins basés sur le portugais" },
        { code: "cre", code2: "", code2l: "cr", name: "Cree", desc: "cree" },
        { code: "crh", code2: "", code2l: "", name: "Crimean Tatar; Crimean Turkish", desc: "tatar de Crimé" },
        { code: "crp", code2: "", code2l: "", name: "Creoles and pidgins ", desc: "créoles et pidgins" },
        { code: "csb", code2: "", code2l: "", name: "Kashubian", desc: "kachoube" },
        { code: "cus", code2: "", code2l: "", name: "Cushitic languages", desc: "couchitiques, langues" },
        { code: "dak", code2: "", code2l: "", name: "Dakota", desc: "dakota" },
        { code: "dar", code2: "", code2l: "", name: "Dargwa", desc: "dargwa" },
        { code: "day", code2: "", code2l: "", name: "Land Dayak languages", desc: "dayak, langues" },
        { code: "del", code2: "", code2l: "", name: "Delaware", desc: "delaware" },
        { code: "den", code2: "", code2l: "", name: "Slave (Athapascan)", desc: "esclave (athapascan)" },
        { code: "dgr", code2: "", code2l: "", name: "Dogrib", desc: "dogrib" },
        { code: "din", code2: "", code2l: "", name: "Dinka", desc: "dinka" },
        { code: "div", code2: "", code2l: "dv", name: "Divehi; Dhivehi; Maldivian", desc: "maldivien" },
        { code: "doi", code2: "", code2l: "", name: "Dogri", desc: "dogri" },
        { code: "dra", code2: "", code2l: "", name: "Dravidian languages", desc: "dravidiennes, langues" },
        { code: "dsb", code2: "", code2l: "", name: "Lower Sorbian", desc: "bas-sorabe" },
        { code: "dua", code2: "", code2l: "", name: "Duala", desc: "douala" },
        { code: "dum", code2: "", code2l: "", name: "Dutch, Middle (ca.1050-1350)", desc: "néerlandais moyen (ca. 1050-1350)" },
        { code: "dyu", code2: "", code2l: "", name: "Dyula", desc: "dioula" },
        { code: "dzo", code2: "", code2l: "dz", name: "Dzongkha", desc: "dzongkha" },
        { code: "efi", code2: "", code2l: "", name: "Efik", desc: "efik" },
        { code: "egy", code2: "", code2l: "", name: "Egyptian (Ancient)", desc: "égyptien" },
        { code: "eka", code2: "", code2l: "", name: "Ekajuk", desc: "ekajuk" },
        { code: "elx", code2: "", code2l: "", name: "Elamite", desc: "élamite" },
        { code: "enm", code2: "", code2l: "", name: "English, Middle (1100-1500)", desc: "anglais moyen (1100-1500)" },
        { code: "epo", code2: "", code2l: "eo", name: "Esperanto", desc: "espéranto" },
        { code: "ewe", code2: "", code2l: "ee", name: "Ewe", desc: "éwé" },
        { code: "ewo", code2: "", code2l: "", name: "Ewondo", desc: "éwondo" },
        { code: "fan", code2: "", code2l: "", name: "Fang", desc: "fang" },
        { code: "fao", code2: "", code2l: "fo", name: "Faroese", desc: "féroïen" },
        { code: "fat", code2: "", code2l: "", name: "Fanti", desc: "fanti" },
        { code: "fij", code2: "", code2l: "fj", name: "Fijian", desc: "fidjien" },
        { code: "fil", code2: "", code2l: "", name: "Filipino; Pilipino", desc: "filipino; pilipino" },
        { code: "fiu", code2: "", code2l: "", name: "Finno-Ugrian languages", desc: "finno-ougriennes, langues" },
        { code: "fon", code2: "", code2l: "", name: "Fon", desc: "fon" },
        { code: "frm", code2: "", code2l: "", name: "French, Middle (ca.1400-1600)", desc: "français moyen (1400-1600)" },
        { code: "fro", code2: "", code2l: "", name: "French, Old (842-ca.1400)", desc: "français ancien (842-ca.1400)" },
        { code: "frr", code2: "", code2l: "", name: "Northern Frisian", desc: "frison septentrional" },
        { code: "frs", code2: "", code2l: "", name: "Eastern Frisian", desc: "frison oriental" },
        { code: "fry", code2: "", code2l: "fy", name: "Western Frisian", desc: "frison occidental" },
        { code: "ful", code2: "", code2l: "ff", name: "Fulah", desc: "peul" },
        { code: "fur", code2: "", code2l: "", name: "Friulian", desc: "frioulan" },
        { code: "gaa", code2: "", code2l: "", name: "Ga", desc: "ga" },
        { code: "gay", code2: "", code2l: "", name: "Gayo", desc: "gayo" },
        { code: "gba", code2: "", code2l: "", name: "Gbaya", desc: "gbaya" },
        { code: "gem", code2: "", code2l: "", name: "Germanic languages", desc: "germaniques, langues" },
        { code: "geo", code2: "kat", code2l: "ka", name: "Georgian", desc: "géorgien" },
        { code: "gez", code2: "", code2l: "", name: "Geez", desc: "guèze" },
        { code: "gil", code2: "", code2l: "", name: "Gilbertese", desc: "kiribati" },
        { code: "gla", code2: "", code2l: "gd", name: "Gaelic; Scottish Gaelic", desc: "gaélique; gaélique écossais" },
        { code: "gle", code2: "", code2l: "ga", name: "Irish", desc: "irlandais" },
        { code: "glg", code2: "", code2l: "gl", name: "Galician", desc: "galicien" },
        { code: "glv", code2: "", code2l: "gv", name: "Manx", desc: "manx; mannois" },
        { code: "gmh", code2: "", code2l: "", name: "German, Middle High (ca.1050-1500)", desc: "allemand, moyen haut (ca. 1050-1500)" },
        { code: "goh", code2: "", code2l: "", name: "German, Old High (ca.750-1050)", desc: "allemand, vieux haut (ca. 750-1050)" },
        { code: "gon", code2: "", code2l: "", name: "Gondi", desc: "gond" },
        { code: "gor", code2: "", code2l: "", name: "Gorontalo", desc: "gorontalo" },
        { code: "got", code2: "", code2l: "", name: "Gothic", desc: "gothique" },
        { code: "grb", code2: "", code2l: "", name: "Grebo", desc: "grebo" },
        { code: "grc", code2: "", code2l: "", name: "Greek, Ancient (to 1453)", desc: "grec ancien (jusqu'à 1453)" },
        { code: "gre", code2: "ell", code2l: "el", name: "Greek, Modern (1453-)", desc: "grec moderne (après 1453)" },
        { code: "grn", code2: "", code2l: "gn", name: "Guarani", desc: "guarani" },
        { code: "gsw", code2: "", code2l: "", name: "Swiss German; Alemannic; Alsatian", desc: "suisse alémanique; alémanique; alsacien" },
        { code: "guj", code2: "", code2l: "gu", name: "Gujarati", desc: "goudjrati" },
        { code: "gwi", code2: "", code2l: "", name: "Gwich'in", desc: "gwich'in" },
        { code: "hai", code2: "", code2l: "", name: "Haida", desc: "haida" },
        { code: "hat", code2: "", code2l: "ht", name: "Haitian; Haitian Creole", desc: "haïtien; créole haïtien" },
        { code: "hau", code2: "", code2l: "ha", name: "Hausa", desc: "haoussa" },
        { code: "haw", code2: "", code2l: "", name: "Hawaiian", desc: "hawaïen" },
        { code: "her", code2: "", code2l: "hz", name: "Herero", desc: "herero" },
        { code: "hil", code2: "", code2l: "", name: "Hiligaynon", desc: "hiligaynon" },
        { code: "him", code2: "", code2l: "", name: "Himachali languages; Western Pahari languages", desc: "langues himachalis; langues paharis occidentales" },
        { code: "hin", code2: "", code2l: "hi", name: "Hindi", desc: "hindi" },
        { code: "hit", code2: "", code2l: "", name: "Hittite", desc: "hittite" },
        { code: "hmn", code2: "", code2l: "", name: "Hmong; Mong", desc: "hmong" },
        { code: "hmo", code2: "", code2l: "ho", name: "Hiri Motu", desc: "hiri motu" },
        { code: "hsb", code2: "", code2l: "", name: "Upper Sorbian", desc: "haut-sorabe" },
        { code: "hup", code2: "", code2l: "", name: "Hupa", desc: "hupa" },
        { code: "iba", code2: "", code2l: "", name: "Iban", desc: "iban" },
        { code: "ibo", code2: "", code2l: "ig", name: "Igbo", desc: "igbo" },
        { code: "ido", code2: "", code2l: "io", name: "Ido", desc: "ido" },
        { code: "iii", code2: "", code2l: "ii", name: "Sichuan Yi; Nuosu", desc: "yi de Sichuan" },
        { code: "ijo", code2: "", code2l: "", name: "Ijo languages", desc: "ijo, langues" },
        { code: "iku", code2: "", code2l: "iu", name: "Inuktitut", desc: "inuktitut" },
        { code: "ile", code2: "", code2l: "ie", name: "Interlingue; Occidental", desc: "interlingue" },
        { code: "ilo", code2: "", code2l: "", name: "Iloko", desc: "ilocano" },
        { code: "ina", code2: "", code2l: "ia", name: "Interlingua (International Auxiliary Language Association)", desc: "interlingua (langue auxiliaire internationale)" },
        { code: "inc", code2: "", code2l: "", name: "Indic languages", desc: "indo-aryennes, langues" },
        { code: "ind", code2: "", code2l: "id", name: "Indonesian", desc: "indonésien" },
        { code: "ine", code2: "", code2l: "", name: "Indo-European languages", desc: "indo-européennes, langues" },
        { code: "inh", code2: "", code2l: "", name: "Ingush", desc: "ingouche" },
        { code: "ipk", code2: "", code2l: "ik", name: "Inupiaq", desc: "inupiaq" },
        { code: "ira", code2: "", code2l: "", name: "Iranian languages", desc: "iraniennes, langues" },
        { code: "iro", code2: "", code2l: "", name: "Iroquoian languages", desc: "iroquoises, langues" },
        { code: "jav", code2: "", code2l: "jv", name: "Javanese", desc: "javanais" },
        { code: "jbo", code2: "", code2l: "", name: "Lojban", desc: "lojban" },
        { code: "jpr", code2: "", code2l: "", name: "Judeo-Persian", desc: "judéo-persan" },
        { code: "jrb", code2: "", code2l: "", name: "Judeo-Arabic", desc: "judéo-arabe" },
        { code: "kaa", code2: "", code2l: "", name: "Kara-Kalpak", desc: "karakalpak" },
        { code: "kab", code2: "", code2l: "", name: "Kabyle", desc: "kabyle" },
        { code: "kac", code2: "", code2l: "", name: "Kachin; Jingpho", desc: "kachin; jingpho" },
        { code: "kal", code2: "", code2l: "kl", name: "Kalaallisut; Greenlandic", desc: "groenlandais" },
        { code: "kam", code2: "", code2l: "", name: "Kamba", desc: "kamba" },
        { code: "kan", code2: "", code2l: "kn", name: "Kannada", desc: "kannada" },
        { code: "kar", code2: "", code2l: "", name: "Karen languages", desc: "karen, langues" },
        { code: "kas", code2: "", code2l: "ks", name: "Kashmiri", desc: "kashmiri" },
        { code: "kau", code2: "", code2l: "kr", name: "Kanuri", desc: "kanouri" },
        { code: "kaw", code2: "", code2l: "", name: "Kawi", desc: "kawi" },
        { code: "kaz", code2: "", code2l: "kk", name: "Kazakh", desc: "kazakh" },
        { code: "kbd", code2: "", code2l: "", name: "Kabardian", desc: "kabardien" },
        { code: "kha", code2: "", code2l: "", name: "Khasi", desc: "khasi" },
        { code: "khi", code2: "", code2l: "", name: "Khoisan languages", desc: "khoïsan, langues" },
        { code: "khm", code2: "", code2l: "km", name: "Central Khmer", desc: "khmer central" },
        { code: "kho", code2: "", code2l: "", name: "Khotanese; Sakan", desc: "khotanais; sakan" },
        { code: "kik", code2: "", code2l: "ki", name: "Kikuyu; Gikuyu", desc: "kikuyu" },
        { code: "kin", code2: "", code2l: "rw", name: "Kinyarwanda", desc: "rwanda" },
        { code: "kir", code2: "", code2l: "ky", name: "Kirghiz; Kyrgyz", desc: "kirghiz" },
        { code: "kmb", code2: "", code2l: "", name: "Kimbundu", desc: "kimbundu" },
        { code: "kok", code2: "", code2l: "", name: "Konkani", desc: "konkani" },
        { code: "kom", code2: "", code2l: "kv", name: "Komi", desc: "kom" },
        { code: "kon", code2: "", code2l: "kg", name: "Kongo", desc: "kongo" },
        { code: "kos", code2: "", code2l: "", name: "Kosraean", desc: "kosrae" },
        { code: "kpe", code2: "", code2l: "", name: "Kpelle", desc: "kpellé" },
        { code: "krc", code2: "", code2l: "", name: "Karachay-Balkar", desc: "karatchai balkar" },
        { code: "krl", code2: "", code2l: "", name: "Karelian", desc: "carélien" },
        { code: "kro", code2: "", code2l: "", name: "Kru languages", desc: "krou, langues" },
        { code: "kru", code2: "", code2l: "", name: "Kurukh", desc: "kurukh" },
        { code: "kua", code2: "", code2l: "kj", name: "Kuanyama; Kwanyama", desc: "kuanyama; kwanyama" },
        { code: "kum", code2: "", code2l: "", name: "Kumyk", desc: "koumyk" },
        { code: "kur", code2: "", code2l: "ku", name: "Kurdish", desc: "kurde" },
        { code: "kut", code2: "", code2l: "", name: "Kutenai", desc: "kutenai" },
        { code: "lad", code2: "", code2l: "", name: "Ladino", desc: "judéo-espagnol" },
        { code: "lah", code2: "", code2l: "", name: "Lahnda", desc: "lahnda" },
        { code: "lam", code2: "", code2l: "", name: "Lamba", desc: "lamba" },
        { code: "lao", code2: "", code2l: "lo", name: "Lao", desc: "lao" },
        { code: "lat", code2: "", code2l: "la", name: "Latin", desc: "latin" },
        { code: "lav", code2: "", code2l: "lv", name: "Latvian", desc: "letton" },
        { code: "lez", code2: "", code2l: "", name: "Lezghian", desc: "lezghien" },
        { code: "lim", code2: "", code2l: "li", name: "Limburgan; Limburger; Limburgish", desc: "limbourgeois" },
        { code: "lin", code2: "", code2l: "ln", name: "Lingala", desc: "lingala" },
        { code: "lit", code2: "", code2l: "lt", name: "Lithuanian", desc: "lituanien" },
        { code: "lol", code2: "", code2l: "", name: "Mongo", desc: "mongo" },
        { code: "loz", code2: "", code2l: "", name: "Lozi", desc: "lozi" },
        { code: "ltz", code2: "", code2l: "lb", name: "Luxembourgish; Letzeburgesch", desc: "luxembourgeois" },
        { code: "lua", code2: "", code2l: "", name: "Luba-Lulua", desc: "luba-lulua" },
        { code: "lub", code2: "", code2l: "lu", name: "Luba-Katanga", desc: "luba-katanga" },
        { code: "lug", code2: "", code2l: "lg", name: "Ganda", desc: "ganda" },
        { code: "lui", code2: "", code2l: "", name: "Luiseno", desc: "luiseno" },
        { code: "lun", code2: "", code2l: "", name: "Lunda", desc: "lunda" },
        { code: "luo", code2: "", code2l: "", name: "Luo (Kenya and Tanzania)", desc: "luo (Kenya et Tanzanie)" },
        { code: "lus", code2: "", code2l: "", name: "Lushai", desc: "lushai" },
        { code: "mac", code2: "mkd", code2l: "mk", name: "Macedonian", desc: "macédonien" },
        { code: "mad", code2: "", code2l: "", name: "Madurese", desc: "madourais" },
        { code: "mag", code2: "", code2l: "", name: "Magahi", desc: "magahi" },
        { code: "mah", code2: "", code2l: "mh", name: "Marshallese", desc: "marshall" },
        { code: "mai", code2: "", code2l: "", name: "Maithili", desc: "maithili" },
        { code: "mak", code2: "", code2l: "", name: "Makasar", desc: "makassar" },
        { code: "mal", code2: "", code2l: "ml", name: "Malayalam", desc: "malayalam" },
        { code: "man", code2: "", code2l: "", name: "Mandingo", desc: "mandingue" },
        { code: "mao", code2: "mri", code2l: "mi", name: "Maori", desc: "maori" },
        { code: "map", code2: "", code2l: "", name: "Austronesian languages", desc: "austronésiennes, langues" },
        { code: "mar", code2: "", code2l: "mr", name: "Marathi", desc: "marathe" },
        { code: "mas", code2: "", code2l: "", name: "Masai", desc: "massaï" },
        { code: "may", code2: "msa", code2l: "ms", name: "Malay", desc: "malais" },
        { code: "mdf", code2: "", code2l: "", name: "Moksha", desc: "moksa" },
        { code: "mdr", code2: "", code2l: "", name: "Mandar", desc: "mandar" },
        { code: "men", code2: "", code2l: "", name: "Mende", desc: "mendé" },
        { code: "mga", code2: "", code2l: "", name: "Irish, Middle (900-1200)", desc: "irlandais moyen (900-1200)" },
        { code: "mic", code2: "", code2l: "", name: "Mi'kmaq; Micmac", desc: "mi'kmaq; micmac" },
        { code: "min", code2: "", code2l: "", name: "Minangkabau", desc: "minangkabau" },
        { code: "mis", code2: "", code2l: "", name: "Uncoded languages", desc: "langues non codées" },
        { code: "mkh", code2: "", code2l: "", name: "Mon-Khmer languages", desc: "môn-khmer, langues" },
        { code: "mlg", code2: "", code2l: "mg", name: "Malagasy", desc: "malgache" },
        { code: "mlt", code2: "", code2l: "mt", name: "Maltese", desc: "maltais" },
        { code: "mnc", code2: "", code2l: "", name: "Manchu", desc: "mandchou" },
        { code: "mni", code2: "", code2l: "", name: "Manipuri", desc: "manipuri" },
        { code: "mno", code2: "", code2l: "", name: "Manobo languages", desc: "manobo, langues" },
        { code: "moh", code2: "", code2l: "", name: "Mohawk", desc: "mohawk" },
        { code: "mon", code2: "", code2l: "mn", name: "Mongolian", desc: "mongol" },
        { code: "mos", code2: "", code2l: "", name: "Mossi", desc: "moré" },
        { code: "mul", code2: "", code2l: "", name: "Multiple languages", desc: "multilingue" },
        { code: "mun", code2: "", code2l: "", name: "Munda languages", desc: "mounda, langues" },
        { code: "mus", code2: "", code2l: "", name: "Creek", desc: "muskogee" },
        { code: "mwl", code2: "", code2l: "", name: "Mirandese", desc: "mirandais" },
        { code: "mwr", code2: "", code2l: "", name: "Marwari", desc: "marvari" },
        { code: "myn", code2: "", code2l: "", name: "Mayan languages", desc: "maya, langues" },
        { code: "myv", code2: "", code2l: "", name: "Erzya", desc: "erza" },
        { code: "nah", code2: "", code2l: "", name: "Nahuatl languages", desc: "nahuatl, langues" },
        { code: "nai", code2: "", code2l: "", name: "North American Indian languages", desc: "nord-amérindiennes, langues" },
        { code: "nap", code2: "", code2l: "", name: "Neapolitan", desc: "napolitain" },
        { code: "nau", code2: "", code2l: "na", name: "Nauru", desc: "nauruan" },
        { code: "nav", code2: "", code2l: "nv", name: "Navajo; Navaho", desc: "navaho" },
        { code: "nbl", code2: "", code2l: "nr", name: "Ndebele, South; South Ndebele", desc: "ndébélé du Sud" },
        { code: "nde", code2: "", code2l: "nd", name: "Ndebele, North; North Ndebele", desc: "ndébélé du Nord" },
        { code: "ndo", code2: "", code2l: "ng", name: "Ndonga", desc: "ndonga" },
        { code: "nds", code2: "", code2l: "", name: "Low German; Low Saxon; German, Low; Saxon, Low", desc: "bas allemand; bas saxon; allemand, bas; saxon, bas" },
        { code: "nep", code2: "", code2l: "ne", name: "Nepali", desc: "népalais" },
        { code: "new", code2: "", code2l: "", name: "Nepal Bhasa; Newari", desc: "nepal bhasa; newari" },
        { code: "nia", code2: "", code2l: "", name: "Nias", desc: "nias" },
        { code: "nic", code2: "", code2l: "", name: "Niger-Kordofanian languages", desc: "nigéro-kordofaniennes, langues" },
        { code: "niu", code2: "", code2l: "", name: "Niuean", desc: "niué" },
        { code: "nno", code2: "", code2l: "nn", name: "Norwegian Nynorsk; Nynorsk, Norwegian", desc: "norvégien nynorsk; nynorsk, norvégien" },
        { code: "nob", code2: "", code2l: "nb", name: "Bokmål, Norwegian; Norwegian Bokmål", desc: "norvégien bokmål" },
        { code: "nog", code2: "", code2l: "", name: "Nogai", desc: "nogaï; nogay" },
        { code: "non", code2: "", code2l: "", name: "Norse, Old", desc: "norrois, vieux" },
        { code: "nqo", code2: "", code2l: "", name: "N'Ko", desc: "n'ko" },
        { code: "nso", code2: "", code2l: "", name: "Pedi; Sepedi; Northern Sotho", desc: "pedi; sepedi; sotho du Nord" },
        { code: "nub", code2: "", code2l: "", name: "Nubian languages", desc: "nubiennes, langues" },
        { code: "nwc", code2: "", code2l: "", name: "Classical Newari; Old Newari; Classical Nepal Bhasa", desc: "newari classique" },
        { code: "nya", code2: "", code2l: "ny", name: "Chichewa; Chewa; Nyanja", desc: "chichewa; chewa; nyanja" },
        { code: "nym", code2: "", code2l: "", name: "Nyamwezi", desc: "nyamwezi" },
        { code: "nyn", code2: "", code2l: "", name: "Nyankole", desc: "nyankolé" },
        { code: "nyo", code2: "", code2l: "", name: "Nyoro", desc: "nyoro" },
        { code: "nzi", code2: "", code2l: "", name: "Nzima", desc: "nzema" },
        { code: "oci", code2: "", code2l: "oc", name: "Occitan (post 1500); Provençal", desc: "occitan (après 1500); provençal" },
        { code: "oji", code2: "", code2l: "oj", name: "Ojibwa", desc: "ojibwa" },
        { code: "ori", code2: "", code2l: "or", name: "Oriya", desc: "oriya" },
        { code: "orm", code2: "", code2l: "om", name: "Oromo", desc: "galla" },
        { code: "osa", code2: "", code2l: "", name: "Osage", desc: "osage" },
        { code: "oss", code2: "", code2l: "os", name: "Ossetian; Ossetic", desc: "ossète" },
        { code: "ota", code2: "", code2l: "", name: "Turkish, Ottoman (1500-1928)", desc: "turc ottoman (1500-1928)" },
        { code: "oto", code2: "", code2l: "", name: "Otomian languages", desc: "otomi, langues" },
        { code: "paa", code2: "", code2l: "", name: "Papuan languages", desc: "papoues, langues" },
        { code: "pag", code2: "", code2l: "", name: "Pangasinan", desc: "pangasinan" },
        { code: "pal", code2: "", code2l: "", name: "Pahlavi", desc: "pahlavi" },
        { code: "pam", code2: "", code2l: "", name: "Pampanga; Kapampangan", desc: "pampangan" },
        { code: "pan", code2: "", code2l: "pa", name: "Panjabi; Punjabi", desc: "pendjabi" },
        { code: "pap", code2: "", code2l: "", name: "Papiamento", desc: "papiamento" },
        { code: "pau", code2: "", code2l: "", name: "Palauan", desc: "palau" },
        { code: "peo", code2: "", code2l: "", name: "Persian, Old (ca.600-400 B.C.)", desc: "perse, vieux (ca. 600-400 av. J.-C.)" },
        { code: "per", code2: "fas", code2l: "fa", name: "Persian", desc: "persan" },
        { code: "phi", code2: "", code2l: "", name: "Philippine languages", desc: "philippines, langues" },
        { code: "phn", code2: "", code2l: "", name: "Phoenician", desc: "phénicien" },
        { code: "pli", code2: "", code2l: "pi", name: "Pali", desc: "pali" },
        { code: "pon", code2: "", code2l: "", name: "Pohnpeian", desc: "pohnpei" },
        { code: "pra", code2: "", code2l: "", name: "Prakrit languages", desc: "prâkrit, langues" },
        { code: "pro", code2: "", code2l: "", name: "Provençal, Old (to 1500)", desc: "provençal ancien (jusqu'à 1500)" },
        { code: "pus", code2: "", code2l: "ps", name: "Pushto; Pashto", desc: "pachto" },
        { code: "qaa-qtz", code2: "", code2l: "", name: "Reserved for local use", desc: "réservée à l'usage local" },
        { code: "que", code2: "", code2l: "qu", name: "Quechua", desc: "quechua" },
        { code: "raj", code2: "", code2l: "", name: "Rajasthani", desc: "rajasthani" },
        { code: "rap", code2: "", code2l: "", name: "Rapanui", desc: "rapanui" },
        { code: "rar", code2: "", code2l: "", name: "Rarotongan; Cook Islands Maori", desc: "rarotonga; maori des îles Cook" },
        { code: "roa", code2: "", code2l: "", name: "Romance languages", desc: "romanes, langues" },
        { code: "roh", code2: "", code2l: "rm", name: "Romansh", desc: "romanche" },
        { code: "rom", code2: "", code2l: "", name: "Romany", desc: "tsigane" },
        { code: "rum", code2: "ron", code2l: "ro", name: "Romanian; Moldavian; Moldovan", desc: "roumain; moldave" },
        { code: "run", code2: "", code2l: "rn", name: "Rundi", desc: "rundi" },
        { code: "rup", code2: "", code2l: "", name: "Aromanian; Arumanian; Macedo-Romanian", desc: "aroumain; macédo-roumain" },
        { code: "sad", code2: "", code2l: "", name: "Sandawe", desc: "sandawe" },
        { code: "sag", code2: "", code2l: "sg", name: "Sango", desc: "sango" },
        { code: "sah", code2: "", code2l: "", name: "Yakut", desc: "iakoute" },
        { code: "sai", code2: "", code2l: "", name: "South American Indian (Other)", desc: "indiennes d'Amérique du Sud, autres langues" },
        { code: "sal", code2: "", code2l: "", name: "Salishan languages", desc: "salishennes, langues" },
        { code: "sam", code2: "", code2l: "", name: "Samaritan Aramaic", desc: "samaritain" },
        { code: "san", code2: "", code2l: "sa", name: "Sanskrit", desc: "sanskrit" },
        { code: "sas", code2: "", code2l: "", name: "Sasak", desc: "sasak" },
        { code: "sat", code2: "", code2l: "", name: "Santali", desc: "santal" },
        { code: "scn", code2: "", code2l: "", name: "Sicilian", desc: "sicilien" },
        { code: "sco", code2: "", code2l: "", name: "Scots", desc: "écossais" },
        { code: "sel", code2: "", code2l: "", name: "Selkup", desc: "selkoupe" },
        { code: "sem", code2: "", code2l: "", name: "Semitic languages", desc: "sémitiques, langues" },
        { code: "sga", code2: "", code2l: "", name: "Irish, Old (to 900)", desc: "irlandais ancien (jusqu'à 900)" },
        { code: "sgn", code2: "", code2l: "", name: "Sign Languages", desc: "langues des signes" },
        { code: "shn", code2: "", code2l: "", name: "Shan", desc: "chan" },
        { code: "sid", code2: "", code2l: "", name: "Sidamo", desc: "sidamo" },
        { code: "sin", code2: "", code2l: "si", name: "Sinhala; Sinhalese", desc: "singhalais" },
        { code: "sio", code2: "", code2l: "", name: "Siouan languages", desc: "sioux, langues" },
        { code: "sit", code2: "", code2l: "", name: "Sino-Tibetan languages", desc: "sino-tibétaines, langues" },
        { code: "sla", code2: "", code2l: "", name: "Slavic languages", desc: "slaves, langues" },
        { code: "sma", code2: "", code2l: "", name: "Southern Sami", desc: "sami du Sud" },
        { code: "sme", code2: "", code2l: "se", name: "Northern Sami", desc: "sami du Nord" },
        { code: "smi", code2: "", code2l: "", name: "Sami languages", desc: "sames, langues" },
        { code: "smj", code2: "", code2l: "", name: "Lule Sami", desc: "sami de Lule" },
        { code: "smn", code2: "", code2l: "", name: "Inari Sami", desc: "sami d'Inari" },
        { code: "smo", code2: "", code2l: "sm", name: "Samoan", desc: "samoan" },
        { code: "sms", code2: "", code2l: "", name: "Skolt Sami", desc: "sami skolt" },
        { code: "sna", code2: "", code2l: "sn", name: "Shona", desc: "shona" },
        { code: "snd", code2: "", code2l: "sd", name: "Sindhi", desc: "sindhi" },
        { code: "snk", code2: "", code2l: "", name: "Soninke", desc: "soninké" },
        { code: "sog", code2: "", code2l: "", name: "Sogdian", desc: "sogdien" },
        { code: "som", code2: "", code2l: "so", name: "Somali", desc: "somali" },
        { code: "son", code2: "", code2l: "", name: "Songhai languages", desc: "songhai, langues" },
        { code: "sot", code2: "", code2l: "st", name: "Sotho, Southern", desc: "sotho du Sud" },
        { code: "srd", code2: "", code2l: "sc", name: "Sardinian", desc: "sarde" },
        { code: "srn", code2: "", code2l: "", name: "Sranan Tongo", desc: "sranan tongo" },
        { code: "srp", code2: "", code2l: "sr", name: "Serbian", desc: "serbe" },
        { code: "srr", code2: "", code2l: "", name: "Serer", desc: "sérère" },
        { code: "ssa", code2: "", code2l: "", name: "Nilo-Saharan languages", desc: "nilo-sahariennes, langues" },
        { code: "ssw", code2: "", code2l: "ss", name: "Swati", desc: "swati" },
        { code: "suk", code2: "", code2l: "", name: "Sukuma", desc: "sukuma" },
        { code: "sun", code2: "", code2l: "su", name: "Sundanese", desc: "soundanais" },
        { code: "sus", code2: "", code2l: "", name: "Susu", desc: "soussou" },
        { code: "sux", code2: "", code2l: "", name: "Sumerian", desc: "sumérien" },
        { code: "swa", code2: "", code2l: "sw", name: "Swahili", desc: "swahili" },
        { code: "syc", code2: "", code2l: "", name: "Classical Syriac", desc: "syriaque classique" },
        { code: "syr", code2: "", code2l: "", name: "Syriac", desc: "syriaque" },
        { code: "tah", code2: "", code2l: "ty", name: "Tahitian", desc: "tahitien" },
        { code: "tai", code2: "", code2l: "", name: "Tai languages", desc: "tai, langues" },
        { code: "tam", code2: "", code2l: "ta", name: "Tamil", desc: "tamoul" },
        { code: "tat", code2: "", code2l: "tt", name: "Tatar", desc: "tatar" },
        { code: "tel", code2: "", code2l: "te", name: "Telugu", desc: "télougou" },
        { code: "tem", code2: "", code2l: "", name: "Timne", desc: "temne" },
        { code: "ter", code2: "", code2l: "", name: "Tereno", desc: "tereno" },
        { code: "tet", code2: "", code2l: "", name: "Tetum", desc: "tetum" },
        { code: "tgk", code2: "", code2l: "tg", name: "Tajik", desc: "tadjik" },
        { code: "tgl", code2: "", code2l: "tl", name: "Tagalog", desc: "tagalog" },
        { code: "tha", code2: "", code2l: "th", name: "Thai", desc: "thaï" },
        { code: "tib", code2: "bod", code2l: "bo", name: "Tibetan", desc: "tibétain" },
        { code: "tig", code2: "", code2l: "", name: "Tigre", desc: "tigré" },
        { code: "tir", code2: "", code2l: "ti", name: "Tigrinya", desc: "tigrigna" },
        { code: "tiv", code2: "", code2l: "", name: "Tiv", desc: "tiv" },
        { code: "tkl", code2: "", code2l: "", name: "Tokelau", desc: "tokelau" },
        { code: "tlh", code2: "", code2l: "", name: "Klingon; tlhIngan-Hol", desc: "klingon" },
        { code: "tli", code2: "", code2l: "", name: "Tlingit", desc: "tlingit" },
        { code: "tmh", code2: "", code2l: "", name: "Tamashek", desc: "tamacheq" },
        { code: "tog", code2: "", code2l: "", name: "Tonga (Nyasa)", desc: "tonga (Nyasa)" },
        { code: "ton", code2: "", code2l: "to", name: "Tonga (Tonga Islands)", desc: "tongan (Îles Tonga)" },
        { code: "tpi", code2: "", code2l: "", name: "Tok Pisin", desc: "tok pisin" },
        { code: "tsi", code2: "", code2l: "", name: "Tsimshian", desc: "tsimshian" },
        { code: "tsn", code2: "", code2l: "tn", name: "Tswana", desc: "tswana" },
        { code: "tso", code2: "", code2l: "ts", name: "Tsonga", desc: "tsonga" },
        { code: "tuk", code2: "", code2l: "tk", name: "Turkmen", desc: "turkmène" },
        { code: "tum", code2: "", code2l: "", name: "Tumbuka", desc: "tumbuka" },
        { code: "tup", code2: "", code2l: "", name: "Tupi languages", desc: "tupi, langues" },
        { code: "tut", code2: "", code2l: "", name: "Altaic languages", desc: "altaïques, langues" },
        { code: "tvl", code2: "", code2l: "", name: "Tuvalu", desc: "tuvalu" },
        { code: "twi", code2: "", code2l: "tw", name: "Twi", desc: "twi" },
        { code: "tyv", code2: "", code2l: "", name: "Tuvinian", desc: "touva" },
        { code: "udm", code2: "", code2l: "", name: "Udmurt", desc: "oudmourte" },
        { code: "uga", code2: "", code2l: "", name: "Ugaritic", desc: "ougaritique" },
        { code: "uig", code2: "", code2l: "ug", name: "Uighur; Uyghur", desc: "ouïgour" },
        { code: "ukr", code2: "", code2l: "uk", name: "Ukrainian", desc: "ukrainien" },
        { code: "umb", code2: "", code2l: "", name: "Umbundu", desc: "umbundu" },
        { code: "und", code2: "", code2l: "", name: "Undetermined", desc: "indéterminée" },
        { code: "urd", code2: "", code2l: "ur", name: "Urdu", desc: "ourdou" },
        { code: "uzb", code2: "", code2l: "uz", name: "Uzbek", desc: "ouszbek" },
        { code: "vai", code2: "", code2l: "", name: "Vai", desc: "vaï" },
        { code: "ven", code2: "", code2l: "ve", name: "Venda", desc: "venda" },
        { code: "vie", code2: "", code2l: "vi", name: "Vietnamese", desc: "vietnamien" },
        { code: "vol", code2: "", code2l: "vo", name: "Volapük", desc: "volapük" },
        { code: "vot", code2: "", code2l: "", name: "Votic", desc: "vote" },
        { code: "wak", code2: "", code2l: "", name: "Wakashan languages", desc: "wakashanes, langues" },
        { code: "wal", code2: "", code2l: "", name: "Walamo", desc: "walamo" },
        { code: "war", code2: "", code2l: "", name: "Waray", desc: "waray" },
        { code: "was", code2: "", code2l: "", name: "Washo", desc: "washo" },
        { code: "wel", code2: "cym", code2l: "cy", name: "Welsh", desc: "gallois" },
        { code: "wen", code2: "", code2l: "", name: "Sorbian languages", desc: "sorabes, langues" },
        { code: "wln", code2: "", code2l: "wa", name: "Walloon", desc: "wallon" },
        { code: "wol", code2: "", code2l: "wo", name: "Wolof", desc: "wolof" },
        { code: "xal", code2: "", code2l: "", name: "Kalmyk; Oirat", desc: "kalmouk; oïrat" },
        { code: "xho", code2: "", code2l: "xh", name: "Xhosa", desc: "xhosa" },
        { code: "yao", code2: "", code2l: "", name: "Yao", desc: "yao" },
        { code: "yap", code2: "", code2l: "", name: "Yapese", desc: "yapois" },
        { code: "yid", code2: "", code2l: "yi", name: "Yiddish", desc: "yiddish" },
        { code: "yor", code2: "", code2l: "yo", name: "Yoruba", desc: "yoruba" },
        { code: "ypk", code2: "", code2l: "", name: "Yupik languages", desc: "yupik, langues" },
        { code: "zap", code2: "", code2l: "", name: "Zapotec", desc: "zapotèque" },
        { code: "zbl", code2: "", code2l: "", name: "Blissymbols; Blissymbolics; Bliss", desc: "symboles Bliss; Bliss" },
        { code: "zen", code2: "", code2l: "", name: "Zenaga", desc: "zenaga" },
        { code: "zgh", code2: "", code2l: "", name: "Standard Moroccan Tamazight", desc: "amazighe standard marocain" },
        { code: "zha", code2: "", code2l: "za", name: "Zhuang; Chuang", desc: "zhuang; chuang" },
        { code: "znd", code2: "", code2l: "", name: "Zande languages", desc: "zandé, langues" },
        { code: "zul", code2: "", code2l: "zu", name: "Zulu", desc: "zoulou" },
        { code: "zun", code2: "", code2l: "", name: "Zuni", desc: "zuni" },
        { code: "zxx", code2: "", code2l: "", name: "No linguistic content; Not applicable", desc: "pas de contenu linguistique; non applicable" },
        { code: "zza", code2: "", code2l: "", name: "Zaza; Dimili; Dimli; Kirdki; Kirmanjki; Zazaki", desc: "zaza; dimili; dimli; kirdki; kirmanjki; zazaki" },
    ];
    
    
    /***/ }),
    /* 20 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @module countries.ts
     * @author Christophe Parisse
     * list of codes for iso contries reference
     */
    exports.iso3666Alpha2 = [
        { code: "AF", name: "Afghanistan" },
        { code: "AX", name: "Åland Islands" },
        { code: "AL", name: "Albania" },
        { code: "DZ", name: "Algeria" },
        { code: "AS", name: "American Samoa" },
        { code: "AD", name: "Andorra" },
        { code: "AO", name: "Angola" },
        { code: "AI", name: "Anguilla" },
        { code: "AQ", name: "Antarctica" },
        { code: "AG", name: "Antigua and Barbuda" },
        { code: "AR", name: "Argentina" },
        { code: "AM", name: "Armenia" },
        { code: "AW", name: "Aruba" },
        { code: "AU", name: "Australia" },
        { code: "AT", name: "Austria" },
        { code: "AZ", name: "Azerbaijan" },
        { code: "BS", name: "Bahamas" },
        { code: "BH", name: "Bahrain" },
        { code: "BD", name: "Bangladesh" },
        { code: "BB", name: "Barbados" },
        { code: "BY", name: "Belarus" },
        { code: "BE", name: "Belgium" },
        { code: "BZ", name: "Belize" },
        { code: "BJ", name: "Benin" },
        { code: "BM", name: "Bermuda" },
        { code: "BT", name: "Bhutan" },
        { code: "BO", name: "Bolivia, Plurinational State of" },
        { code: "BQ", name: "Bonaire, Sint Eustatius and Saba" },
        { code: "BA", name: "Bosnia and Herzegovina" },
        { code: "BW", name: "Botswana" },
        { code: "BV", name: "Bouvet Island" },
        { code: "BR", name: "Brazil" },
        { code: "IO", name: "British Indian Ocean Territory" },
        { code: "BN", name: "Brunei Darussalam" },
        { code: "BG", name: "Bulgaria" },
        { code: "BF", name: "Burkina Faso" },
        { code: "BI", name: "Burundi" },
        { code: "KH", name: "Cambodia" },
        { code: "CM", name: "Cameroon" },
        { code: "CA", name: "Canada" },
        { code: "CV", name: "Cape Verde" },
        { code: "KY", name: "Cayman Islands" },
        { code: "CF", name: "Central African Republic" },
        { code: "TD", name: "Chad" },
        { code: "CL", name: "Chile" },
        { code: "CN", name: "China" },
        { code: "CX", name: "Christmas Island" },
        { code: "CC", name: "Cocos (Keeling) Islands" },
        { code: "CO", name: "Colombia" },
        { code: "KM", name: "Comoros" },
        { code: "CG", name: "Congo" },
        { code: "CD", name: "Congo, the Democratic Republic of the" },
        { code: "CK", name: "Cook Islands" },
        { code: "CR", name: "Costa Rica" },
        { code: "CI", name: "Côte d'Ivoire" },
        { code: "HR", name: "Croatia" },
        { code: "CU", name: "Cuba" },
        { code: "CW", name: "Curaçao" },
        { code: "CY", name: "Cyprus" },
        { code: "CZ", name: "Czech Republic" },
        { code: "DK", name: "Denmark" },
        { code: "DJ", name: "Djibouti" },
        { code: "DM", name: "Dominica" },
        { code: "DO", name: "Dominican Republic" },
        { code: "EC", name: "Ecuador" },
        { code: "EG", name: "Egypt" },
        { code: "SV", name: "El Salvador" },
        { code: "GQ", name: "Equatorial Guinea" },
        { code: "ER", name: "Eritrea" },
        { code: "EE", name: "Estonia" },
        { code: "ET", name: "Ethiopia" },
        { code: "FK", name: "Falkland Islands (Malvinas)" },
        { code: "FO", name: "Faroe Islands" },
        { code: "FJ", name: "Fiji" },
        { code: "FI", name: "Finland" },
        { code: "FR", name: "France" },
        { code: "GF", name: "French Guiana" },
        { code: "PF", name: "French Polynesia" },
        { code: "TF", name: "French Southern Territories" },
        { code: "GA", name: "Gabon" },
        { code: "GM", name: "Gambia" },
        { code: "GE", name: "Georgia" },
        { code: "DE", name: "Germany" },
        { code: "GH", name: "Ghana" },
        { code: "GI", name: "Gibraltar" },
        { code: "GR", name: "Greece" },
        { code: "GL", name: "Greenland" },
        { code: "GD", name: "Grenada" },
        { code: "GP", name: "Guadeloupe" },
        { code: "GU", name: "Guam" },
        { code: "GT", name: "Guatemala" },
        { code: "GG", name: "Guernsey" },
        { code: "GN", name: "Guinea" },
        { code: "GW", name: "Guinea-Bissau" },
        { code: "GY", name: "Guyana" },
        { code: "HT", name: "Haiti" },
        { code: "HM", name: "Heard Island and McDonald Islands" },
        { code: "VA", name: "Holy See (Vatican City State)" },
        { code: "HN", name: "Honduras" },
        { code: "HK", name: "Hong Kong" },
        { code: "HU", name: "Hungary" },
        { code: "IS", name: "Iceland" },
        { code: "IN", name: "India" },
        { code: "ID", name: "Indonesia" },
        { code: "IR", name: "Iran, Islamic Republic of" },
        { code: "IQ", name: "Iraq" },
        { code: "IE", name: "Ireland" },
        { code: "IM", name: "Isle of Man" },
        { code: "IL", name: "Israel" },
        { code: "IT", name: "Italy" },
        { code: "JM", name: "Jamaica" },
        { code: "JP", name: "Japan" },
        { code: "JE", name: "Jersey" },
        { code: "JO", name: "Jordan" },
        { code: "KZ", name: "Kazakhstan" },
        { code: "KE", name: "Kenya" },
        { code: "KI", name: "Kiribati" },
        { code: "KP", name: "Korea, Democratic People's Republic of" },
        { code: "KR", name: "Korea, Republic of" },
        { code: "KW", name: "Kuwait" },
        { code: "KG", name: "Kyrgyzstan" },
        { code: "LA", name: "Lao People's Democratic Republic" },
        { code: "LV", name: "Latvia" },
        { code: "LB", name: "Lebanon" },
        { code: "LS", name: "Lesotho" },
        { code: "LR", name: "Liberia" },
        { code: "LY", name: "Libya" },
        { code: "LI", name: "Liechtenstein" },
        { code: "LT", name: "Lithuania" },
        { code: "LU", name: "Luxembourg" },
        { code: "MO", name: "Macao" },
        { code: "MK", name: "Macedonia, the former Yugoslav Republic of" },
        { code: "MG", name: "Madagascar" },
        { code: "MW", name: "Malawi" },
        { code: "MY", name: "Malaysia" },
        { code: "MV", name: "Maldives" },
        { code: "ML", name: "Mali" },
        { code: "MT", name: "Malta" },
        { code: "MH", name: "Marshall Islands" },
        { code: "MQ", name: "Martinique" },
        { code: "MR", name: "Mauritania" },
        { code: "MU", name: "Mauritius" },
        { code: "YT", name: "Mayotte" },
        { code: "MX", name: "Mexico" },
        { code: "FM", name: "Micronesia, Federated States of" },
        { code: "MD", name: "Moldova, Republic of" },
        { code: "MC", name: "Monaco" },
        { code: "MN", name: "Mongolia" },
        { code: "ME", name: "Montenegro" },
        { code: "MS", name: "Montserrat" },
        { code: "MA", name: "Morocco" },
        { code: "MZ", name: "Mozambique" },
        { code: "MM", name: "Myanmar" },
        { code: "NA", name: "Namibia" },
        { code: "NR", name: "Nauru" },
        { code: "NP", name: "Nepal" },
        { code: "NL", name: "Netherlands" },
        { code: "NC", name: "New Caledonia" },
        { code: "NZ", name: "New Zealand" },
        { code: "NI", name: "Nicaragua" },
        { code: "NE", name: "Niger" },
        { code: "NG", name: "Nigeria" },
        { code: "NU", name: "Niue" },
        { code: "NF", name: "Norfolk Island" },
        { code: "MP", name: "Northern Mariana Islands" },
        { code: "NO", name: "Norway" },
        { code: "OM", name: "Oman" },
        { code: "PK", name: "Pakistan" },
        { code: "PW", name: "Palau" },
        { code: "PS", name: "Palestinian Territory, Occupied" },
        { code: "PA", name: "Panama" },
        { code: "PG", name: "Papua New Guinea" },
        { code: "PY", name: "Paraguay" },
        { code: "PE", name: "Peru" },
        { code: "PH", name: "Philippines" },
        { code: "PN", name: "Pitcairn" },
        { code: "PL", name: "Poland" },
        { code: "PT", name: "Portugal" },
        { code: "PR", name: "Puerto Rico" },
        { code: "QA", name: "Qatar" },
        { code: "RE", name: "Réunion" },
        { code: "RO", name: "Romania" },
        { code: "RU", name: "Russian Federation" },
        { code: "RW", name: "Rwanda" },
        { code: "BL", name: "Saint Barthélemy" },
        { code: "SH", name: "Saint Helena, Ascension and Tristan da Cunha" },
        { code: "KN", name: "Saint Kitts and Nevis" },
        { code: "LC", name: "Saint Lucia" },
        { code: "MF", name: "Saint Martin (French part)" },
        { code: "PM", name: "Saint Pierre and Miquelon" },
        { code: "VC", name: "Saint Vincent and the Grenadines" },
        { code: "WS", name: "Samoa" },
        { code: "SM", name: "San Marino" },
        { code: "ST", name: "Sao Tome and Principe" },
        { code: "SA", name: "Saudi Arabia" },
        { code: "SN", name: "Senegal" },
        { code: "RS", name: "Serbia" },
        { code: "SC", name: "Seychelles" },
        { code: "SL", name: "Sierra Leone" },
        { code: "SG", name: "Singapore" },
        { code: "SX", name: "Sint Maarten (Dutch part)" },
        { code: "SK", name: "Slovakia" },
        { code: "SI", name: "Slovenia" },
        { code: "SB", name: "Solomon Islands" },
        { code: "SO", name: "Somalia" },
        { code: "ZA", name: "South Africa" },
        { code: "GS", name: "South Georgia and the South Sandwich Islands" },
        { code: "SS", name: "South Sudan" },
        { code: "ES", name: "Spain" },
        { code: "LK", name: "Sri Lanka" },
        { code: "SD", name: "Sudan" },
        { code: "SR", name: "Suriname" },
        { code: "SJ", name: "Svalbard and Jan Mayen" },
        { code: "SZ", name: "Swaziland" },
        { code: "SE", name: "Sweden" },
        { code: "CH", name: "Switzerland" },
        { code: "SY", name: "Syrian Arab Republic" },
        { code: "TW", name: "Taiwan, Province of China" },
        { code: "TJ", name: "Tajikistan" },
        { code: "TZ", name: "Tanzania, United Republic of" },
        { code: "TH", name: "Thailand" },
        { code: "TL", name: "Timor-Leste" },
        { code: "TG", name: "Togo" },
        { code: "TK", name: "Tokelau" },
        { code: "TO", name: "Tonga" },
        { code: "TT", name: "Trinidad and Tobago" },
        { code: "TN", name: "Tunisia" },
        { code: "TR", name: "Turkey" },
        { code: "TM", name: "Turkmenistan" },
        { code: "TC", name: "Turks and Caicos Islands" },
        { code: "TV", name: "Tuvalu" },
        { code: "UG", name: "Uganda" },
        { code: "UA", name: "Ukraine" },
        { code: "AE", name: "United Arab Emirates" },
        { code: "GB", name: "United Kingdom" },
        { code: "US", name: "United States" },
        { code: "UM", name: "United States Minor Outlying Islands" },
        { code: "UY", name: "Uruguay" },
        { code: "UZ", name: "Uzbekistan" },
        { code: "VU", name: "Vanuatu" },
        { code: "VE", name: "Venezuela, Bolivarian Republic of" },
        { code: "VN", name: "Viet Nam" },
        { code: "VG", name: "Virgin Islands, British" },
        { code: "VI", name: "Virgin Islands, U.S." },
        { code: "WF", name: "Wallis and Futuna" },
        { code: "EH", name: "Western Sahara" },
        { code: "YE", name: "Yemen" },
        { code: "ZM", name: "Zambia" },
        { code: "ZW", name: "Zimbabwe" }
    ];
    
    
    /***/ }),
    /* 21 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    /*
     * @module generate.ts
     * @author Christophe Parisse
     * Saving the results and the TEI or XML file
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    // import * as alert from './alert';
    var teimeta = __webpack_require__(2);
    var edit = __webpack_require__(18);
    var entities = __webpack_require__(8);
    var basicTEI = '<?xml version="1.0" encoding="UTF-8"?>\
    <TEI xmlns:xi="http://www.w3.org/2001/XInclude" xmlns:svg="http://www.w3.org/2000/svg"\
         xmlns:math="http://www.w3.org/1998/Math/MathML" xmlns="http://www.tei-c.org/ns/1.0">\
    </TEI>';
    var currentNamespace = 'nonamespace';
    /**
     * changes < and > to html codes
     * @param {string} s - string to be processed
     * @return {string} - new string content
     */
    function encodeXML(s) {
        if (teimeta.teiData.params.encodeXMLFull)
            return entities.encodeXML(s);
        s = s.replace(/\</, '&lt;');
        s = s.replace(/\>/, '&gt;');
        return s;
    }
    /**
     * clean xml values in DOM from unused (empty) attributes
     * @param {Object} node - DOM top node recursively processed
    
     function clean(node) {
        var nodes=[], values=[];
        for (let att, i = 0, atts = node.attributes, n = atts.length; i < n; i++) {
                att = atts[i];
                if (!/\S/.test(att.nodeValue)) {
                    node.removeAttribute(att.nodeName);
                    i --;
                }
        }
        for (let n = 0; n < node.childNodes.length; n ++) {
            let child = node.childNodes[n];
            if (  child.nodeType === 8
               || (child.nodeType === 3 && !/\S/.test(child.nodeValue))
               ) {
                node.removeChild(child);
                n --;
            } else if(child.nodeType === 1) {
                clean(child);
            }
        }
    }
     */
    /**
     * @method createAbsolutePath
     * creates a path from top of xml file and returns last node created
     * @param path
     * @param doc
     * @returns node
    
     function createAbsolutePath(path, doc) {
        let p = path.split('/').slice(1);
        // le nom de l'élément racine est ignoré
        // on pourrait controler si le nom de l'élément correspond au nom donné dans l'ODD
        // if (p[0] !== 'TEI') {
        //     let s = 'impossible de créer des chemins qui ne commencent pas par TEI';
        //     alert.alertUser(s);
        //     return null;
        // }
        let node = doc.documentElement;
        for (let i = 1; i < p.length; i++) {
            let nds = odd.getChildrenByName(node, p[i]);
            if (nds.length > 1) {
                let s = p.slice(0,i).join('/');
                s = '<!-- attention element ' + s + " n'est pas unique. -->";
            }
            if (nds.length > 0) {
                node = nds[0];
            } else {
                let newnode = doc.createElement(p[i]);
                node.appendChild(newnode);
                node = newnode;
            }
        }
        return node;
    }
    */
    /**
     * gather the new state of the XML object edited by teimeta
     * @param {Object} teiData - object stored in teimeta module
     * @return {string} - xml content edited by teimeta library
     */
    function generateTEI(teiData) {
        if (!teiData.dataOdd.namespace)
            teiData.dataOdd.namespace = 'http://www.tei-c.org/ns/1.0';
        var eltspec = teiData.dataTei;
        var s = '';
        if (!teiData.doc) {
            if (teiData.dataOdd.namespace) {
                s = '<?xml version="1.0" encoding="UTF-8"?>';
                /*
                s += '<' + teiData.dataOdd.rootTEI + '></' + teiData.dataOdd.rootTEI + '>'
                */
                /*
                if (teiData.dataOdd.namespace !== 'nonamespace')
                    s += '<' + teiData.dataOdd.rootTEI + ' xmlns="' + teiData.dataOdd.namespace + '"></' + teiData.dataOdd.rootTEI + '>';
                else
                    s += '<' + teiData.dataOdd.rootTEI + '></' + teiData.dataOdd.rootTEI + '>';
                */
                s += '<' + teiData.dataOdd.rootTEI + ' ';
                if (teiData.dataOdd.namespace !== 'nonamespace')
                    s += ' xmlns="' + teiData.dataOdd.namespace + '"';
                for (var i = 0; i < teiData.dataOdd.altIdent.length; i++) {
                    s += ' ' + teiData.dataOdd.altIdent[i].type + '="' + teiData.dataOdd.altIdent[i].value + '"';
                }
                s += '></' + teiData.dataOdd.rootTEI + '>';
                teiData.doc = new DOMParser().parseFromString(s, 'text/xml');
            }
            else {
                teiData.doc = new DOMParser().parseFromString(basicTEI, 'text/xml');
            }
            teiData.root = teiData.doc.documentElement;
            /*
            console.log("NS:", teiData.dataOdd.namespace);
            if (teiData.dataOdd.namespace !== 'nonamespace')
                teiData.root.namespaceURI = teiData.dataOdd.namespace;
            */
            eltspec.node = teiData.root;
        }
        currentNamespace = teiData.dataOdd.namespace;
        // first generate the root otherwise it would be duplicated
        generateFilledElement(eltspec, teiData.doc, eltspec.node);
        // console.log("generateTEI", teiData.dataOdd);
        /*
        for (let i=0; i<teiData.dataOdd.altIdent.length; i++) {
            eltspec.node.setAttribute(teiData.dataOdd.altIdent[i].type, teiData.dataOdd.altIdent[i].value);
        }
        */
        if (eltspec.content)
            s += generateTEIContent(eltspec.content, teiData.doc, eltspec.node);
        // add oddname to teiData.doc
        // console.log(s);
        eltspec.node.setAttribute("xml:base", teiData.oddName);
        var xmls = new XMLSerializer();
        // return teiData.doc.toString();
        return xmls.serializeToString(teiData.doc);
    }
    exports.generateTEI = generateTEI;
    /**
     * internal: process Element
     * @param {ElementSpec} espec - node in schema representation
     * @param {Object} doc - DOM main document
     * @param {Object} node - DOM node corresponding to espec parameter
     * @return {string} - return value as string format of the current node
     */
    function generateElement(espec, doc, node) {
        var s = '';
        if (!edit.values[espec.validatedESID]) {
            console.log("Error: geneElemts:", espec);
            return "";
        }
        if (edit.values[espec.validatedESID].select === 'ok' /* || espec.usage === 'req' */) {
            // if node is empty create one at the end, son of the node above
            var current = espec.node;
            if (!current) {
                current = (currentNamespace === 'nonamespace') ? doc.createElement(espec.ident) : doc.createElementNS(currentNamespace, espec.ident);
                node.appendChild(current);
                espec.node = current;
                s += '<!-- ajout de ' + espec.absolutepath + ' -->\n';
            }
            s += generateFilledElement(espec, doc, current);
            if (espec.content) {
                s += generateTEIContent(espec.content, doc, current);
            }
        }
        else {
            // suppress a node is this is allowed
            if (espec.node && (teimeta.teiData.params.canRemove || espec.usage === 'opt')) {
                espec.node.parentNode.removeChild(espec.node);
                espec.node = null;
            }
        }
        return s;
    }
    /**
     * @method setTextNode
     * set the value of the text node only, without touching the children (unlike textContent or innerHTML)
     * @param node
     * @param val
     * @param doc
     */
    function setTextNode(node, val, doc) {
        if (!doc) {
            node.textContent = val;
            return;
        }
        var first = false;
        for (var child in node.childNodes) {
            if (node.childNodes[child].nodeType === 3) {
                if (first === false) {
                    first = true;
                    node.childNodes[child].nodeValue = val;
                    node.childNodes[child].data = val;
                }
                else {
                    node.childNodes[child].nodeValue = '';
                    node.childNodes[child].data = '';
                }
            }
        }
        if (first === false) {
            // pas de noeud texte rencontré
            var nn = doc.createTextNode(val);
            node.appendChild(nn);
        }
    }
    /**
     * internal: switch process to other Element(s)
     * @param {*} espec - list of nodes in schema representation
     * @param {Object} doc - DOM main document
     * @param {Object} current - DOM node corresponding to espec parameter
     * @return {string} - return value as string format of the current node
     */
    function generateElementRef(eci, doc, current) {
        var s = '';
        // pointer to element in ec
        for (var i = 0; i < eci.eCI.length; i++) {
            s += generateElement(eci.eCI[i].element, doc, current);
        }
        return s;
    }
    /**
     * internal: switch process to a sequence of Element(s)
     * @param {*} espec - list of nodes in schema representation
     * @param {Object} doc - DOM main document
     * @param {Object} current - DOM node corresponding to espec parameter
     * @return {string} - return value as string format of the current node
     */
    function generateSequence(eci, doc, current) {
        var s = '';
        // pointer to element in ec
        for (var i = 0; i < eci.eCI.length; i++) {
            for (var k = 0; k < eci.eCI[i].element.length; k++) {
                s += generateElement(eci.eCI[i].element[k], doc, current);
            }
        }
        return s;
    }
    /**
     * internal: switch process to the content of a node
     * @param {*} ct - content of a node in schema representation
     * @param {Object} doc - DOM main document
     * @param {Object} current - DOM node corresponding to espec parameter
     * @return {string} - return value as string format of the current node
     */
    function generateTEIContent(ct, doc, current) {
        var s = '';
        for (var _i = 0, _a = ct.sequencesRefs; _i < _a.length; _i++) {
            var ec = _a[_i];
            // ec at ElementCount format
            if (ec.type === 'elementRef') {
                s += generateElementRef(ec, doc, current);
            }
            else {
                s += generateSequence(ec, doc, current);
            }
        }
        return s;
    }
    /**
     * internal: generate value for an Element with fieds to be edited
     * @param {*} elt - node in schema representation
     * @param {Object} doc - DOM main document
     * @param {Object} current - DOM node corresponding to espec parameter
     * @return {string} - return value as string format of the current node
     */
    function generateFilledElement(elt, doc, node) {
        var s = '';
        s += '<' + elt.ident;
        // attributes
        for (var i = 0; i < elt.attr.length; i++) {
            if (elt.attr[i].ident) {
                if (!elt.attr[i].datatype.type) {
                    elt.attr[i].datatype.valueContent = elt.attr[i].rend;
                }
                else {
                    var v = edit.values[elt.attr[i].datatype.valueContentID].value;
                    elt.attr[i].datatype.valueContent = encodeXML(String(v));
                }
                // test if empty and if this the case, if parameters not to fill empty attribute is true, then remove attribute
                if (!elt.attr[i].datatype.valueContent && elt.attr[i].usage === 'opt' && !teimeta.teiData.params.defaultNewElement) {
                    node.removeAttribute(elt.attr[i].ident);
                }
                else {
                    node.setAttribute(elt.attr[i].ident, elt.attr[i].datatype.valueContent);
                    s += ' ' + elt.attr[i].ident + '="' + elt.attr[i].datatype.valueContent + '"';
                }
            }
        }
        // write corresp attribute if it exists
        if (elt.corresp) {
            node.setAttribute('corresp', elt.corresp);
            s += ' ' + elt.corresp;
        }
        s += '>';
        if (elt.content && elt.content.datatype) {
            elt.content.datatype.valueContent = encodeXML(edit.values[elt.content.datatype.valueContentID].value);
            setTextNode(node, elt.content.datatype.valueContent, doc);
            s += '<textNode>' + elt.content.datatype.valueContent + '</textNode>\n';
        }
        s += '</' + elt.ident + '>\n';
        return s;
    }
    
    
    /***/ }),
    /* 22 */
    /***/ (function(module, exports, __webpack_require__) {
    
    /* WEBPACK VAR INJECTION */(function(setImmediate, process, global, module) {(function (global, factory) {
       true ? factory(exports) :
      undefined;
    }(this, (function (exports) { 'use strict';
    
    function slice(arrayLike, start) {
        start = start|0;
        var newLen = Math.max(arrayLike.length - start, 0);
        var newArr = Array(newLen);
        for(var idx = 0; idx < newLen; idx++)  {
            newArr[idx] = arrayLike[start + idx];
        }
        return newArr;
    }
    
    /**
     * Creates a continuation function with some arguments already applied.
     *
     * Useful as a shorthand when combined with other control flow functions. Any
     * arguments passed to the returned function are added to the arguments
     * originally passed to apply.
     *
     * @name apply
     * @static
     * @memberOf module:Utils
     * @method
     * @category Util
     * @param {Function} fn - The function you want to eventually apply all
     * arguments to. Invokes with (arguments...).
     * @param {...*} arguments... - Any number of arguments to automatically apply
     * when the continuation is called.
     * @returns {Function} the partially-applied function
     * @example
     *
     * // using apply
     * async.parallel([
     *     async.apply(fs.writeFile, 'testfile1', 'test1'),
     *     async.apply(fs.writeFile, 'testfile2', 'test2')
     * ]);
     *
     *
     * // the same process without using apply
     * async.parallel([
     *     function(callback) {
     *         fs.writeFile('testfile1', 'test1', callback);
     *     },
     *     function(callback) {
     *         fs.writeFile('testfile2', 'test2', callback);
     *     }
     * ]);
     *
     * // It's possible to pass any number of additional arguments when calling the
     * // continuation:
     *
     * node> var fn = async.apply(sys.puts, 'one');
     * node> fn('two', 'three');
     * one
     * two
     * three
     */
    var apply = function(fn/*, ...args*/) {
        var args = slice(arguments, 1);
        return function(/*callArgs*/) {
            var callArgs = slice(arguments);
            return fn.apply(null, args.concat(callArgs));
        };
    };
    
    var initialParams = function (fn) {
        return function (/*...args, callback*/) {
            var args = slice(arguments);
            var callback = args.pop();
            fn.call(this, args, callback);
        };
    };
    
    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }
    
    var hasSetImmediate = typeof setImmediate === 'function' && setImmediate;
    var hasNextTick = typeof process === 'object' && typeof process.nextTick === 'function';
    
    function fallback(fn) {
        setTimeout(fn, 0);
    }
    
    function wrap(defer) {
        return function (fn/*, ...args*/) {
            var args = slice(arguments, 1);
            defer(function () {
                fn.apply(null, args);
            });
        };
    }
    
    var _defer;
    
    if (hasSetImmediate) {
        _defer = setImmediate;
    } else if (hasNextTick) {
        _defer = process.nextTick;
    } else {
        _defer = fallback;
    }
    
    var setImmediate$1 = wrap(_defer);
    
    /**
     * Take a sync function and make it async, passing its return value to a
     * callback. This is useful for plugging sync functions into a waterfall,
     * series, or other async functions. Any arguments passed to the generated
     * function will be passed to the wrapped function (except for the final
     * callback argument). Errors thrown will be passed to the callback.
     *
     * If the function passed to `asyncify` returns a Promise, that promises's
     * resolved/rejected state will be used to call the callback, rather than simply
     * the synchronous return value.
     *
     * This also means you can asyncify ES2017 `async` functions.
     *
     * @name asyncify
     * @static
     * @memberOf module:Utils
     * @method
     * @alias wrapSync
     * @category Util
     * @param {Function} func - The synchronous function, or Promise-returning
     * function to convert to an {@link AsyncFunction}.
     * @returns {AsyncFunction} An asynchronous wrapper of the `func`. To be
     * invoked with `(args..., callback)`.
     * @example
     *
     * // passing a regular synchronous function
     * async.waterfall([
     *     async.apply(fs.readFile, filename, "utf8"),
     *     async.asyncify(JSON.parse),
     *     function (data, next) {
     *         // data is the result of parsing the text.
     *         // If there was a parsing error, it would have been caught.
     *     }
     * ], callback);
     *
     * // passing a function returning a promise
     * async.waterfall([
     *     async.apply(fs.readFile, filename, "utf8"),
     *     async.asyncify(function (contents) {
     *         return db.model.create(contents);
     *     }),
     *     function (model, next) {
     *         // `model` is the instantiated model object.
     *         // If there was an error, this function would be skipped.
     *     }
     * ], callback);
     *
     * // es2017 example, though `asyncify` is not needed if your JS environment
     * // supports async functions out of the box
     * var q = async.queue(async.asyncify(async function(file) {
     *     var intermediateStep = await processFile(file);
     *     return await somePromise(intermediateStep)
     * }));
     *
     * q.push(files);
     */
    function asyncify(func) {
        return initialParams(function (args, callback) {
            var result;
            try {
                result = func.apply(this, args);
            } catch (e) {
                return callback(e);
            }
            // if result is Promise object
            if (isObject(result) && typeof result.then === 'function') {
                result.then(function(value) {
                    invokeCallback(callback, null, value);
                }, function(err) {
                    invokeCallback(callback, err.message ? err : new Error(err));
                });
            } else {
                callback(null, result);
            }
        });
    }
    
    function invokeCallback(callback, error, value) {
        try {
            callback(error, value);
        } catch (e) {
            setImmediate$1(rethrow, e);
        }
    }
    
    function rethrow(error) {
        throw error;
    }
    
    var supportsSymbol = typeof Symbol === 'function';
    
    function isAsync(fn) {
        return supportsSymbol && fn[Symbol.toStringTag] === 'AsyncFunction';
    }
    
    function wrapAsync(asyncFn) {
        return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
    }
    
    function applyEach$1(eachfn) {
        return function(fns/*, ...args*/) {
            var args = slice(arguments, 1);
            var go = initialParams(function(args, callback) {
                var that = this;
                return eachfn(fns, function (fn, cb) {
                    wrapAsync(fn).apply(that, args.concat(cb));
                }, callback);
            });
            if (args.length) {
                return go.apply(this, args);
            }
            else {
                return go;
            }
        };
    }
    
    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
    
    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
    
    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();
    
    /** Built-in value references. */
    var Symbol$1 = root.Symbol;
    
    /** Used for built-in method references. */
    var objectProto = Object.prototype;
    
    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;
    
    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;
    
    /** Built-in value references. */
    var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;
    
    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag$1),
          tag = value[symToStringTag$1];
    
      try {
        value[symToStringTag$1] = undefined;
        var unmasked = true;
      } catch (e) {}
    
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag$1] = tag;
        } else {
          delete value[symToStringTag$1];
        }
      }
      return result;
    }
    
    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;
    
    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString$1 = objectProto$1.toString;
    
    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString$1.call(value);
    }
    
    /** `Object#toString` result references. */
    var nullTag = '[object Null]';
    var undefinedTag = '[object Undefined]';
    
    /** Built-in value references. */
    var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;
    
    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag && symToStringTag in Object(value))
        ? getRawTag(value)
        : objectToString(value);
    }
    
    /** `Object#toString` result references. */
    var asyncTag = '[object AsyncFunction]';
    var funcTag = '[object Function]';
    var genTag = '[object GeneratorFunction]';
    var proxyTag = '[object Proxy]';
    
    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    
    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;
    
    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    
    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    
    // A temporary value used to identify if the loop should be broken.
    // See #1064, #1293
    var breakLoop = {};
    
    /**
     * This method returns `undefined`.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Util
     * @example
     *
     * _.times(2, _.noop);
     * // => [undefined, undefined]
     */
    function noop() {
      // No operation performed.
    }
    
    function once(fn) {
        return function () {
            if (fn === null) return;
            var callFn = fn;
            fn = null;
            callFn.apply(this, arguments);
        };
    }
    
    var iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator;
    
    var getIterator = function (coll) {
        return iteratorSymbol && coll[iteratorSymbol] && coll[iteratorSymbol]();
    };
    
    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */
    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);
    
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    
    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }
    
    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]';
    
    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    
    /** Used for built-in method references. */
    var objectProto$3 = Object.prototype;
    
    /** Used to check objects for own properties. */
    var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
    
    /** Built-in value references. */
    var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
    
    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty$2.call(value, 'callee') &&
        !propertyIsEnumerable.call(value, 'callee');
    };
    
    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;
    
    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }
    
    /** Detect free variable `exports`. */
    var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
    
    /** Detect free variable `module`. */
    var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
    
    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;
    
    /** Built-in value references. */
    var Buffer = moduleExports ? root.Buffer : undefined;
    
    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
    
    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse;
    
    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER$1 = 9007199254740991;
    
    /** Used to detect unsigned integer values. */
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    
    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER$1 : length;
    
      return !!length &&
        (type == 'number' ||
          (type != 'symbol' && reIsUint.test(value))) &&
            (value > -1 && value % 1 == 0 && value < length);
    }
    
    /** `Object#toString` result references. */
    var argsTag$1 = '[object Arguments]';
    var arrayTag = '[object Array]';
    var boolTag = '[object Boolean]';
    var dateTag = '[object Date]';
    var errorTag = '[object Error]';
    var funcTag$1 = '[object Function]';
    var mapTag = '[object Map]';
    var numberTag = '[object Number]';
    var objectTag = '[object Object]';
    var regexpTag = '[object RegExp]';
    var setTag = '[object Set]';
    var stringTag = '[object String]';
    var weakMapTag = '[object WeakMap]';
    
    var arrayBufferTag = '[object ArrayBuffer]';
    var dataViewTag = '[object DataView]';
    var float32Tag = '[object Float32Array]';
    var float64Tag = '[object Float64Array]';
    var int8Tag = '[object Int8Array]';
    var int16Tag = '[object Int16Array]';
    var int32Tag = '[object Int32Array]';
    var uint8Tag = '[object Uint8Array]';
    var uint8ClampedTag = '[object Uint8ClampedArray]';
    var uint16Tag = '[object Uint16Array]';
    var uint32Tag = '[object Uint32Array]';
    
    /** Used to identify `toStringTag` values of typed arrays. */
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
    typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
    typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
    typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
    typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
    typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
    typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
    typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
    typedArrayTags[mapTag] = typedArrayTags[numberTag] =
    typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
    typedArrayTags[setTag] = typedArrayTags[stringTag] =
    typedArrayTags[weakMapTag] = false;
    
    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray(value) {
      return isObjectLike(value) &&
        isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    
    /**
     * The base implementation of `_.unary` without support for storing metadata.
     *
     * @private
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     */
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    
    /** Detect free variable `exports`. */
    var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;
    
    /** Detect free variable `module`. */
    var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;
    
    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
    
    /** Detect free variable `process` from Node.js. */
    var freeProcess = moduleExports$1 && freeGlobal.process;
    
    /** Used to access faster Node.js helpers. */
    var nodeUtil = (function() {
      try {
        // Use `util.types` for Node.js 10+.
        var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;
    
        if (types) {
          return types;
        }
    
        // Legacy `process.binding('util')` for Node.js < 10.
        return freeProcess && freeProcess.binding && freeProcess.binding('util');
      } catch (e) {}
    }());
    
    /* Node.js helper references. */
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    
    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    
    /** Used for built-in method references. */
    var objectProto$2 = Object.prototype;
    
    /** Used to check objects for own properties. */
    var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
    
    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value),
          isArg = !isArr && isArguments(value),
          isBuff = !isArr && !isArg && isBuffer(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? baseTimes(value.length, String) : [],
          length = result.length;
    
      for (var key in value) {
        if ((inherited || hasOwnProperty$1.call(value, key)) &&
            !(skipIndexes && (
               // Safari 9 has enumerable `arguments.length` in strict mode.
               key == 'length' ||
               // Node.js 0.10 has enumerable non-index properties on buffers.
               (isBuff && (key == 'offset' || key == 'parent')) ||
               // PhantomJS 2 has enumerable non-index properties on typed arrays.
               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
               // Skip index properties.
               isIndex(key, length)
            ))) {
          result.push(key);
        }
      }
      return result;
    }
    
    /** Used for built-in method references. */
    var objectProto$5 = Object.prototype;
    
    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;
    
      return value === proto;
    }
    
    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    
    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeKeys = overArg(Object.keys, Object);
    
    /** Used for built-in method references. */
    var objectProto$4 = Object.prototype;
    
    /** Used to check objects for own properties. */
    var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
    
    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }
    
    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    
    function createArrayIterator(coll) {
        var i = -1;
        var len = coll.length;
        return function next() {
            return ++i < len ? {value: coll[i], key: i} : null;
        }
    }
    
    function createES2015Iterator(iterator) {
        var i = -1;
        return function next() {
            var item = iterator.next();
            if (item.done)
                return null;
            i++;
            return {value: item.value, key: i};
        }
    }
    
    function createObjectIterator(obj) {
        var okeys = keys(obj);
        var i = -1;
        var len = okeys.length;
        return function next() {
            var key = okeys[++i];
            return i < len ? {value: obj[key], key: key} : null;
        };
    }
    
    function iterator(coll) {
        if (isArrayLike(coll)) {
            return createArrayIterator(coll);
        }
    
        var iterator = getIterator(coll);
        return iterator ? createES2015Iterator(iterator) : createObjectIterator(coll);
    }
    
    function onlyOnce(fn) {
        return function() {
            if (fn === null) throw new Error("Callback was already called.");
            var callFn = fn;
            fn = null;
            callFn.apply(this, arguments);
        };
    }
    
    function _eachOfLimit(limit) {
        return function (obj, iteratee, callback) {
            callback = once(callback || noop);
            if (limit <= 0 || !obj) {
                return callback(null);
            }
            var nextElem = iterator(obj);
            var done = false;
            var running = 0;
            var looping = false;
    
            function iterateeCallback(err, value) {
                running -= 1;
                if (err) {
                    done = true;
                    callback(err);
                }
                else if (value === breakLoop || (done && running <= 0)) {
                    done = true;
                    return callback(null);
                }
                else if (!looping) {
                    replenish();
                }
            }
    
            function replenish () {
                looping = true;
                while (running < limit && !done) {
                    var elem = nextElem();
                    if (elem === null) {
                        done = true;
                        if (running <= 0) {
                            callback(null);
                        }
                        return;
                    }
                    running += 1;
                    iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
                }
                looping = false;
            }
    
            replenish();
        };
    }
    
    /**
     * The same as [`eachOf`]{@link module:Collections.eachOf} but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name eachOfLimit
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.eachOf]{@link module:Collections.eachOf}
     * @alias forEachOfLimit
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {AsyncFunction} iteratee - An async function to apply to each
     * item in `coll`. The `key` is the item's key, or index in the case of an
     * array.
     * Invoked with (item, key, callback).
     * @param {Function} [callback] - A callback which is called when all
     * `iteratee` functions have finished, or an error occurs. Invoked with (err).
     */
    function eachOfLimit(coll, limit, iteratee, callback) {
        _eachOfLimit(limit)(coll, wrapAsync(iteratee), callback);
    }
    
    function doLimit(fn, limit) {
        return function (iterable, iteratee, callback) {
            return fn(iterable, limit, iteratee, callback);
        };
    }
    
    // eachOf implementation optimized for array-likes
    function eachOfArrayLike(coll, iteratee, callback) {
        callback = once(callback || noop);
        var index = 0,
            completed = 0,
            length = coll.length;
        if (length === 0) {
            callback(null);
        }
    
        function iteratorCallback(err, value) {
            if (err) {
                callback(err);
            } else if ((++completed === length) || value === breakLoop) {
                callback(null);
            }
        }
    
        for (; index < length; index++) {
            iteratee(coll[index], index, onlyOnce(iteratorCallback));
        }
    }
    
    // a generic version of eachOf which can handle array, object, and iterator cases.
    var eachOfGeneric = doLimit(eachOfLimit, Infinity);
    
    /**
     * Like [`each`]{@link module:Collections.each}, except that it passes the key (or index) as the second argument
     * to the iteratee.
     *
     * @name eachOf
     * @static
     * @memberOf module:Collections
     * @method
     * @alias forEachOf
     * @category Collection
     * @see [async.each]{@link module:Collections.each}
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {AsyncFunction} iteratee - A function to apply to each
     * item in `coll`.
     * The `key` is the item's key, or index in the case of an array.
     * Invoked with (item, key, callback).
     * @param {Function} [callback] - A callback which is called when all
     * `iteratee` functions have finished, or an error occurs. Invoked with (err).
     * @example
     *
     * var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
     * var configs = {};
     *
     * async.forEachOf(obj, function (value, key, callback) {
     *     fs.readFile(__dirname + value, "utf8", function (err, data) {
     *         if (err) return callback(err);
     *         try {
     *             configs[key] = JSON.parse(data);
     *         } catch (e) {
     *             return callback(e);
     *         }
     *         callback();
     *     });
     * }, function (err) {
     *     if (err) console.error(err.message);
     *     // configs is now a map of JSON data
     *     doSomethingWith(configs);
     * });
     */
    var eachOf = function(coll, iteratee, callback) {
        var eachOfImplementation = isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric;
        eachOfImplementation(coll, wrapAsync(iteratee), callback);
    };
    
    function doParallel(fn) {
        return function (obj, iteratee, callback) {
            return fn(eachOf, obj, wrapAsync(iteratee), callback);
        };
    }
    
    function _asyncMap(eachfn, arr, iteratee, callback) {
        callback = callback || noop;
        arr = arr || [];
        var results = [];
        var counter = 0;
        var _iteratee = wrapAsync(iteratee);
    
        eachfn(arr, function (value, _, callback) {
            var index = counter++;
            _iteratee(value, function (err, v) {
                results[index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    }
    
    /**
     * Produces a new collection of values by mapping each value in `coll` through
     * the `iteratee` function. The `iteratee` is called with an item from `coll`
     * and a callback for when it has finished processing. Each of these callback
     * takes 2 arguments: an `error`, and the transformed item from `coll`. If
     * `iteratee` passes an error to its callback, the main `callback` (for the
     * `map` function) is immediately called with the error.
     *
     * Note, that since this function applies the `iteratee` to each item in
     * parallel, there is no guarantee that the `iteratee` functions will complete
     * in order. However, the results array will be in the same order as the
     * original `coll`.
     *
     * If `map` is passed an Object, the results will be an Array.  The results
     * will roughly be in the order of the original Objects' keys (but this can
     * vary across JavaScript engines).
     *
     * @name map
     * @static
     * @memberOf module:Collections
     * @method
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {AsyncFunction} iteratee - An async function to apply to each item in
     * `coll`.
     * The iteratee should complete with the transformed item.
     * Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Results is an Array of the
     * transformed items from the `coll`. Invoked with (err, results).
     * @example
     *
     * async.map(['file1','file2','file3'], fs.stat, function(err, results) {
     *     // results is now an array of stats for each file
     * });
     */
    var map = doParallel(_asyncMap);
    
    /**
     * Applies the provided arguments to each function in the array, calling
     * `callback` after all functions have completed. If you only provide the first
     * argument, `fns`, then it will return a function which lets you pass in the
     * arguments as if it were a single function call. If more arguments are
     * provided, `callback` is required while `args` is still optional.
     *
     * @name applyEach
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @category Control Flow
     * @param {Array|Iterable|Object} fns - A collection of {@link AsyncFunction}s
     * to all call with the same arguments
     * @param {...*} [args] - any number of separate arguments to pass to the
     * function.
     * @param {Function} [callback] - the final argument should be the callback,
     * called when all functions have completed processing.
     * @returns {Function} - If only the first argument, `fns`, is provided, it will
     * return a function which lets you pass in the arguments as if it were a single
     * function call. The signature is `(..args, callback)`. If invoked with any
     * arguments, `callback` is required.
     * @example
     *
     * async.applyEach([enableSearch, updateSchema], 'bucket', callback);
     *
     * // partial application example:
     * async.each(
     *     buckets,
     *     async.applyEach([enableSearch, updateSchema]),
     *     callback
     * );
     */
    var applyEach = applyEach$1(map);
    
    function doParallelLimit(fn) {
        return function (obj, limit, iteratee, callback) {
            return fn(_eachOfLimit(limit), obj, wrapAsync(iteratee), callback);
        };
    }
    
    /**
     * The same as [`map`]{@link module:Collections.map} but runs a maximum of `limit` async operations at a time.
     *
     * @name mapLimit
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.map]{@link module:Collections.map}
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {AsyncFunction} iteratee - An async function to apply to each item in
     * `coll`.
     * The iteratee should complete with the transformed item.
     * Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Results is an array of the
     * transformed items from the `coll`. Invoked with (err, results).
     */
    var mapLimit = doParallelLimit(_asyncMap);
    
    /**
     * The same as [`map`]{@link module:Collections.map} but runs only a single async operation at a time.
     *
     * @name mapSeries
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.map]{@link module:Collections.map}
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {AsyncFunction} iteratee - An async function to apply to each item in
     * `coll`.
     * The iteratee should complete with the transformed item.
     * Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Results is an array of the
     * transformed items from the `coll`. Invoked with (err, results).
     */
    var mapSeries = doLimit(mapLimit, 1);
    
    /**
     * The same as [`applyEach`]{@link module:ControlFlow.applyEach} but runs only a single async operation at a time.
     *
     * @name applyEachSeries
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @see [async.applyEach]{@link module:ControlFlow.applyEach}
     * @category Control Flow
     * @param {Array|Iterable|Object} fns - A collection of {@link AsyncFunction}s to all
     * call with the same arguments
     * @param {...*} [args] - any number of separate arguments to pass to the
     * function.
     * @param {Function} [callback] - the final argument should be the callback,
     * called when all functions have completed processing.
     * @returns {Function} - If only the first argument is provided, it will return
     * a function which lets you pass in the arguments as if it were a single
     * function call.
     */
    var applyEachSeries = applyEach$1(mapSeries);
    
    /**
     * A specialized version of `_.forEach` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEach(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length;
    
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    
    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;
    
        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }
    
    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = createBaseFor();
    
    /**
     * The base implementation of `_.forOwn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }
    
    /**
     * The base implementation of `_.findIndex` and `_.findLastIndex` without
     * support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} predicate The function invoked per iteration.
     * @param {number} fromIndex The index to search from.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length,
          index = fromIndex + (fromRight ? 1 : -1);
    
      while ((fromRight ? index-- : ++index < length)) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    
    /**
     * The base implementation of `_.isNaN` without support for number objects.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     */
    function baseIsNaN(value) {
      return value !== value;
    }
    
    /**
     * A specialized version of `_.indexOf` which performs strict equality
     * comparisons of values, i.e. `===`.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function strictIndexOf(array, value, fromIndex) {
      var index = fromIndex - 1,
          length = array.length;
    
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    
    /**
     * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseIndexOf(array, value, fromIndex) {
      return value === value
        ? strictIndexOf(array, value, fromIndex)
        : baseFindIndex(array, baseIsNaN, fromIndex);
    }
    
    /**
     * Determines the best order for running the {@link AsyncFunction}s in `tasks`, based on
     * their requirements. Each function can optionally depend on other functions
     * being completed first, and each function is run as soon as its requirements
     * are satisfied.
     *
     * If any of the {@link AsyncFunction}s pass an error to their callback, the `auto` sequence
     * will stop. Further tasks will not execute (so any other functions depending
     * on it will not run), and the main `callback` is immediately called with the
     * error.
     *
     * {@link AsyncFunction}s also receive an object containing the results of functions which
     * have completed so far as the first argument, if they have dependencies. If a
     * task function has no dependencies, it will only be passed a callback.
     *
     * @name auto
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @category Control Flow
     * @param {Object} tasks - An object. Each of its properties is either a
     * function or an array of requirements, with the {@link AsyncFunction} itself the last item
     * in the array. The object's key of a property serves as the name of the task
     * defined by that property, i.e. can be used when specifying requirements for
     * other tasks. The function receives one or two arguments:
     * * a `results` object, containing the results of the previously executed
     *   functions, only passed if the task has any dependencies,
     * * a `callback(err, result)` function, which must be called when finished,
     *   passing an `error` (which can be `null`) and the result of the function's
     *   execution.
     * @param {number} [concurrency=Infinity] - An optional `integer` for
     * determining the maximum number of tasks that can be run in parallel. By
     * default, as many as possible.
     * @param {Function} [callback] - An optional callback which is called when all
     * the tasks have been completed. It receives the `err` argument if any `tasks`
     * pass an error to their callback. Results are always returned; however, if an
     * error occurs, no further `tasks` will be performed, and the results object
     * will only contain partial results. Invoked with (err, results).
     * @returns undefined
     * @example
     *
     * async.auto({
     *     // this function will just be passed a callback
     *     readData: async.apply(fs.readFile, 'data.txt', 'utf-8'),
     *     showData: ['readData', function(results, cb) {
     *         // results.readData is the file's contents
     *         // ...
     *     }]
     * }, callback);
     *
     * async.auto({
     *     get_data: function(callback) {
     *         console.log('in get_data');
     *         // async code to get some data
     *         callback(null, 'data', 'converted to array');
     *     },
     *     make_folder: function(callback) {
     *         console.log('in make_folder');
     *         // async code to create a directory to store a file in
     *         // this is run at the same time as getting the data
     *         callback(null, 'folder');
     *     },
     *     write_file: ['get_data', 'make_folder', function(results, callback) {
     *         console.log('in write_file', JSON.stringify(results));
     *         // once there is some data and the directory exists,
     *         // write the data to a file in the directory
     *         callback(null, 'filename');
     *     }],
     *     email_link: ['write_file', function(results, callback) {
     *         console.log('in email_link', JSON.stringify(results));
     *         // once the file is written let's email a link to it...
     *         // results.write_file contains the filename returned by write_file.
     *         callback(null, {'file':results.write_file, 'email':'user@example.com'});
     *     }]
     * }, function(err, results) {
     *     console.log('err = ', err);
     *     console.log('results = ', results);
     * });
     */
    var auto = function (tasks, concurrency, callback) {
        if (typeof concurrency === 'function') {
            // concurrency is optional, shift the args.
            callback = concurrency;
            concurrency = null;
        }
        callback = once(callback || noop);
        var keys$$1 = keys(tasks);
        var numTasks = keys$$1.length;
        if (!numTasks) {
            return callback(null);
        }
        if (!concurrency) {
            concurrency = numTasks;
        }
    
        var results = {};
        var runningTasks = 0;
        var hasError = false;
    
        var listeners = Object.create(null);
    
        var readyTasks = [];
    
        // for cycle detection:
        var readyToCheck = []; // tasks that have been identified as reachable
        // without the possibility of returning to an ancestor task
        var uncheckedDependencies = {};
    
        baseForOwn(tasks, function (task, key) {
            if (!isArray(task)) {
                // no dependencies
                enqueueTask(key, [task]);
                readyToCheck.push(key);
                return;
            }
    
            var dependencies = task.slice(0, task.length - 1);
            var remainingDependencies = dependencies.length;
            if (remainingDependencies === 0) {
                enqueueTask(key, task);
                readyToCheck.push(key);
                return;
            }
            uncheckedDependencies[key] = remainingDependencies;
    
            arrayEach(dependencies, function (dependencyName) {
                if (!tasks[dependencyName]) {
                    throw new Error('async.auto task `' + key +
                        '` has a non-existent dependency `' +
                        dependencyName + '` in ' +
                        dependencies.join(', '));
                }
                addListener(dependencyName, function () {
                    remainingDependencies--;
                    if (remainingDependencies === 0) {
                        enqueueTask(key, task);
                    }
                });
            });
        });
    
        checkForDeadlocks();
        processQueue();
    
        function enqueueTask(key, task) {
            readyTasks.push(function () {
                runTask(key, task);
            });
        }
    
        function processQueue() {
            if (readyTasks.length === 0 && runningTasks === 0) {
                return callback(null, results);
            }
            while(readyTasks.length && runningTasks < concurrency) {
                var run = readyTasks.shift();
                run();
            }
    
        }
    
        function addListener(taskName, fn) {
            var taskListeners = listeners[taskName];
            if (!taskListeners) {
                taskListeners = listeners[taskName] = [];
            }
    
            taskListeners.push(fn);
        }
    
        function taskComplete(taskName) {
            var taskListeners = listeners[taskName] || [];
            arrayEach(taskListeners, function (fn) {
                fn();
            });
            processQueue();
        }
    
    
        function runTask(key, task) {
            if (hasError) return;
    
            var taskCallback = onlyOnce(function(err, result) {
                runningTasks--;
                if (arguments.length > 2) {
                    result = slice(arguments, 1);
                }
                if (err) {
                    var safeResults = {};
                    baseForOwn(results, function(val, rkey) {
                        safeResults[rkey] = val;
                    });
                    safeResults[key] = result;
                    hasError = true;
                    listeners = Object.create(null);
    
                    callback(err, safeResults);
                } else {
                    results[key] = result;
                    taskComplete(key);
                }
            });
    
            runningTasks++;
            var taskFn = wrapAsync(task[task.length - 1]);
            if (task.length > 1) {
                taskFn(results, taskCallback);
            } else {
                taskFn(taskCallback);
            }
        }
    
        function checkForDeadlocks() {
            // Kahn's algorithm
            // https://en.wikipedia.org/wiki/Topological_sorting#Kahn.27s_algorithm
            // http://connalle.blogspot.com/2013/10/topological-sortingkahn-algorithm.html
            var currentTask;
            var counter = 0;
            while (readyToCheck.length) {
                currentTask = readyToCheck.pop();
                counter++;
                arrayEach(getDependents(currentTask), function (dependent) {
                    if (--uncheckedDependencies[dependent] === 0) {
                        readyToCheck.push(dependent);
                    }
                });
            }
    
            if (counter !== numTasks) {
                throw new Error(
                    'async.auto cannot execute tasks due to a recursive dependency'
                );
            }
        }
    
        function getDependents(taskName) {
            var result = [];
            baseForOwn(tasks, function (task, key) {
                if (isArray(task) && baseIndexOf(task, taskName, 0) >= 0) {
                    result.push(key);
                }
            });
            return result;
        }
    };
    
    /**
     * A specialized version of `_.map` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function arrayMap(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length,
          result = Array(length);
    
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    
    /** `Object#toString` result references. */
    var symbolTag = '[object Symbol]';
    
    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && baseGetTag(value) == symbolTag);
    }
    
    /** Used as references for various `Number` constants. */
    var INFINITY = 1 / 0;
    
    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined;
    var symbolToString = symbolProto ? symbolProto.toString : undefined;
    
    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return arrayMap(value, baseToString) + '';
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }
    
    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;
    
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;
    
      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }
    
    /**
     * Casts `array` to a slice if it's needed.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {number} start The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the cast slice.
     */
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === undefined ? length : end;
      return (!start && end >= length) ? array : baseSlice(array, start, end);
    }
    
    /**
     * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
     * that is not found in the character symbols.
     *
     * @private
     * @param {Array} strSymbols The string symbols to inspect.
     * @param {Array} chrSymbols The character symbols to find.
     * @returns {number} Returns the index of the last unmatched string symbol.
     */
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;
    
      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
      return index;
    }
    
    /**
     * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
     * that is not found in the character symbols.
     *
     * @private
     * @param {Array} strSymbols The string symbols to inspect.
     * @param {Array} chrSymbols The character symbols to find.
     * @returns {number} Returns the index of the first unmatched string symbol.
     */
    function charsStartIndex(strSymbols, chrSymbols) {
      var index = -1,
          length = strSymbols.length;
    
      while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
      return index;
    }
    
    /**
     * Converts an ASCII `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function asciiToArray(string) {
      return string.split('');
    }
    
    /** Used to compose unicode character classes. */
    var rsAstralRange = '\\ud800-\\udfff';
    var rsComboMarksRange = '\\u0300-\\u036f';
    var reComboHalfMarksRange = '\\ufe20-\\ufe2f';
    var rsComboSymbolsRange = '\\u20d0-\\u20ff';
    var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
    var rsVarRange = '\\ufe0e\\ufe0f';
    
    /** Used to compose unicode capture groups. */
    var rsZWJ = '\\u200d';
    
    /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
    var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');
    
    /**
     * Checks if `string` contains Unicode symbols.
     *
     * @private
     * @param {string} string The string to inspect.
     * @returns {boolean} Returns `true` if a symbol is found, else `false`.
     */
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }
    
    /** Used to compose unicode character classes. */
    var rsAstralRange$1 = '\\ud800-\\udfff';
    var rsComboMarksRange$1 = '\\u0300-\\u036f';
    var reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f';
    var rsComboSymbolsRange$1 = '\\u20d0-\\u20ff';
    var rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
    var rsVarRange$1 = '\\ufe0e\\ufe0f';
    
    /** Used to compose unicode capture groups. */
    var rsAstral = '[' + rsAstralRange$1 + ']';
    var rsCombo = '[' + rsComboRange$1 + ']';
    var rsFitz = '\\ud83c[\\udffb-\\udfff]';
    var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
    var rsNonAstral = '[^' + rsAstralRange$1 + ']';
    var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
    var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
    var rsZWJ$1 = '\\u200d';
    
    /** Used to compose unicode regexes. */
    var reOptMod = rsModifier + '?';
    var rsOptVar = '[' + rsVarRange$1 + ']?';
    var rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
    var rsSeq = rsOptVar + reOptMod + rsOptJoin;
    var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
    
    /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
    var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
    
    /**
     * Converts a Unicode `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }
    
    /**
     * Converts `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function stringToArray(string) {
      return hasUnicode(string)
        ? unicodeToArray(string)
        : asciiToArray(string);
    }
    
    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : baseToString(value);
    }
    
    /** Used to match leading and trailing whitespace. */
    var reTrim = /^\s+|\s+$/g;
    
    /**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
    function trim(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrim, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          chrSymbols = stringToArray(chars),
          start = charsStartIndex(strSymbols, chrSymbols),
          end = charsEndIndex(strSymbols, chrSymbols) + 1;
    
      return castSlice(strSymbols, start, end).join('');
    }
    
    var FN_ARGS = /^(?:async\s+)?(function)?\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /(=.+)?(\s*)$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    
    function parseParams(func) {
        func = func.toString().replace(STRIP_COMMENTS, '');
        func = func.match(FN_ARGS)[2].replace(' ', '');
        func = func ? func.split(FN_ARG_SPLIT) : [];
        func = func.map(function (arg){
            return trim(arg.replace(FN_ARG, ''));
        });
        return func;
    }
    
    /**
     * A dependency-injected version of the [async.auto]{@link module:ControlFlow.auto} function. Dependent
     * tasks are specified as parameters to the function, after the usual callback
     * parameter, with the parameter names matching the names of the tasks it
     * depends on. This can provide even more readable task graphs which can be
     * easier to maintain.
     *
     * If a final callback is specified, the task results are similarly injected,
     * specified as named parameters after the initial error parameter.
     *
     * The autoInject function is purely syntactic sugar and its semantics are
     * otherwise equivalent to [async.auto]{@link module:ControlFlow.auto}.
     *
     * @name autoInject
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @see [async.auto]{@link module:ControlFlow.auto}
     * @category Control Flow
     * @param {Object} tasks - An object, each of whose properties is an {@link AsyncFunction} of
     * the form 'func([dependencies...], callback). The object's key of a property
     * serves as the name of the task defined by that property, i.e. can be used
     * when specifying requirements for other tasks.
     * * The `callback` parameter is a `callback(err, result)` which must be called
     *   when finished, passing an `error` (which can be `null`) and the result of
     *   the function's execution. The remaining parameters name other tasks on
     *   which the task is dependent, and the results from those tasks are the
     *   arguments of those parameters.
     * @param {Function} [callback] - An optional callback which is called when all
     * the tasks have been completed. It receives the `err` argument if any `tasks`
     * pass an error to their callback, and a `results` object with any completed
     * task results, similar to `auto`.
     * @example
     *
     * //  The example from `auto` can be rewritten as follows:
     * async.autoInject({
     *     get_data: function(callback) {
     *         // async code to get some data
     *         callback(null, 'data', 'converted to array');
     *     },
     *     make_folder: function(callback) {
     *         // async code to create a directory to store a file in
     *         // this is run at the same time as getting the data
     *         callback(null, 'folder');
     *     },
     *     write_file: function(get_data, make_folder, callback) {
     *         // once there is some data and the directory exists,
     *         // write the data to a file in the directory
     *         callback(null, 'filename');
     *     },
     *     email_link: function(write_file, callback) {
     *         // once the file is written let's email a link to it...
     *         // write_file contains the filename returned by write_file.
     *         callback(null, {'file':write_file, 'email':'user@example.com'});
     *     }
     * }, function(err, results) {
     *     console.log('err = ', err);
     *     console.log('email_link = ', results.email_link);
     * });
     *
     * // If you are using a JS minifier that mangles parameter names, `autoInject`
     * // will not work with plain functions, since the parameter names will be
     * // collapsed to a single letter identifier.  To work around this, you can
     * // explicitly specify the names of the parameters your task function needs
     * // in an array, similar to Angular.js dependency injection.
     *
     * // This still has an advantage over plain `auto`, since the results a task
     * // depends on are still spread into arguments.
     * async.autoInject({
     *     //...
     *     write_file: ['get_data', 'make_folder', function(get_data, make_folder, callback) {
     *         callback(null, 'filename');
     *     }],
     *     email_link: ['write_file', function(write_file, callback) {
     *         callback(null, {'file':write_file, 'email':'user@example.com'});
     *     }]
     *     //...
     * }, function(err, results) {
     *     console.log('err = ', err);
     *     console.log('email_link = ', results.email_link);
     * });
     */
    function autoInject(tasks, callback) {
        var newTasks = {};
    
        baseForOwn(tasks, function (taskFn, key) {
            var params;
            var fnIsAsync = isAsync(taskFn);
            var hasNoDeps =
                (!fnIsAsync && taskFn.length === 1) ||
                (fnIsAsync && taskFn.length === 0);
    
            if (isArray(taskFn)) {
                params = taskFn.slice(0, -1);
                taskFn = taskFn[taskFn.length - 1];
    
                newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn);
            } else if (hasNoDeps) {
                // no dependencies, use the function as-is
                newTasks[key] = taskFn;
            } else {
                params = parseParams(taskFn);
                if (taskFn.length === 0 && !fnIsAsync && params.length === 0) {
                    throw new Error("autoInject task functions require explicit parameters.");
                }
    
                // remove callback param
                if (!fnIsAsync) params.pop();
    
                newTasks[key] = params.concat(newTask);
            }
    
            function newTask(results, taskCb) {
                var newArgs = arrayMap(params, function (name) {
                    return results[name];
                });
                newArgs.push(taskCb);
                wrapAsync(taskFn).apply(null, newArgs);
            }
        });
    
        auto(newTasks, callback);
    }
    
    // Simple doubly linked list (https://en.wikipedia.org/wiki/Doubly_linked_list) implementation
    // used for queues. This implementation assumes that the node provided by the user can be modified
    // to adjust the next and last properties. We implement only the minimal functionality
    // for queue support.
    function DLL() {
        this.head = this.tail = null;
        this.length = 0;
    }
    
    function setInitial(dll, node) {
        dll.length = 1;
        dll.head = dll.tail = node;
    }
    
    DLL.prototype.removeLink = function(node) {
        if (node.prev) node.prev.next = node.next;
        else this.head = node.next;
        if (node.next) node.next.prev = node.prev;
        else this.tail = node.prev;
    
        node.prev = node.next = null;
        this.length -= 1;
        return node;
    };
    
    DLL.prototype.empty = function () {
        while(this.head) this.shift();
        return this;
    };
    
    DLL.prototype.insertAfter = function(node, newNode) {
        newNode.prev = node;
        newNode.next = node.next;
        if (node.next) node.next.prev = newNode;
        else this.tail = newNode;
        node.next = newNode;
        this.length += 1;
    };
    
    DLL.prototype.insertBefore = function(node, newNode) {
        newNode.prev = node.prev;
        newNode.next = node;
        if (node.prev) node.prev.next = newNode;
        else this.head = newNode;
        node.prev = newNode;
        this.length += 1;
    };
    
    DLL.prototype.unshift = function(node) {
        if (this.head) this.insertBefore(this.head, node);
        else setInitial(this, node);
    };
    
    DLL.prototype.push = function(node) {
        if (this.tail) this.insertAfter(this.tail, node);
        else setInitial(this, node);
    };
    
    DLL.prototype.shift = function() {
        return this.head && this.removeLink(this.head);
    };
    
    DLL.prototype.pop = function() {
        return this.tail && this.removeLink(this.tail);
    };
    
    DLL.prototype.toArray = function () {
        var arr = Array(this.length);
        var curr = this.head;
        for(var idx = 0; idx < this.length; idx++) {
            arr[idx] = curr.data;
            curr = curr.next;
        }
        return arr;
    };
    
    DLL.prototype.remove = function (testFn) {
        var curr = this.head;
        while(!!curr) {
            var next = curr.next;
            if (testFn(curr)) {
                this.removeLink(curr);
            }
            curr = next;
        }
        return this;
    };
    
    function queue(worker, concurrency, payload) {
        if (concurrency == null) {
            concurrency = 1;
        }
        else if(concurrency === 0) {
            throw new Error('Concurrency must not be zero');
        }
    
        var _worker = wrapAsync(worker);
        var numRunning = 0;
        var workersList = [];
    
        var processingScheduled = false;
        function _insert(data, insertAtFront, callback) {
            if (callback != null && typeof callback !== 'function') {
                throw new Error('task callback must be a function');
            }
            q.started = true;
            if (!isArray(data)) {
                data = [data];
            }
            if (data.length === 0 && q.idle()) {
                // call drain immediately if there are no tasks
                return setImmediate$1(function() {
                    q.drain();
                });
            }
    
            for (var i = 0, l = data.length; i < l; i++) {
                var item = {
                    data: data[i],
                    callback: callback || noop
                };
    
                if (insertAtFront) {
                    q._tasks.unshift(item);
                } else {
                    q._tasks.push(item);
                }
            }
    
            if (!processingScheduled) {
                processingScheduled = true;
                setImmediate$1(function() {
                    processingScheduled = false;
                    q.process();
                });
            }
        }
    
        function _next(tasks) {
            return function(err){
                numRunning -= 1;
    
                for (var i = 0, l = tasks.length; i < l; i++) {
                    var task = tasks[i];
    
                    var index = baseIndexOf(workersList, task, 0);
                    if (index === 0) {
                        workersList.shift();
                    } else if (index > 0) {
                        workersList.splice(index, 1);
                    }
    
                    task.callback.apply(task, arguments);
    
                    if (err != null) {
                        q.error(err, task.data);
                    }
                }
    
                if (numRunning <= (q.concurrency - q.buffer) ) {
                    q.unsaturated();
                }
    
                if (q.idle()) {
                    q.drain();
                }
                q.process();
            };
        }
    
        var isProcessing = false;
        var q = {
            _tasks: new DLL(),
            concurrency: concurrency,
            payload: payload,
            saturated: noop,
            unsaturated:noop,
            buffer: concurrency / 4,
            empty: noop,
            drain: noop,
            error: noop,
            started: false,
            paused: false,
            push: function (data, callback) {
                _insert(data, false, callback);
            },
            kill: function () {
                q.drain = noop;
                q._tasks.empty();
            },
            unshift: function (data, callback) {
                _insert(data, true, callback);
            },
            remove: function (testFn) {
                q._tasks.remove(testFn);
            },
            process: function () {
                // Avoid trying to start too many processing operations. This can occur
                // when callbacks resolve synchronously (#1267).
                if (isProcessing) {
                    return;
                }
                isProcessing = true;
                while(!q.paused && numRunning < q.concurrency && q._tasks.length){
                    var tasks = [], data = [];
                    var l = q._tasks.length;
                    if (q.payload) l = Math.min(l, q.payload);
                    for (var i = 0; i < l; i++) {
                        var node = q._tasks.shift();
                        tasks.push(node);
                        workersList.push(node);
                        data.push(node.data);
                    }
    
                    numRunning += 1;
    
                    if (q._tasks.length === 0) {
                        q.empty();
                    }
    
                    if (numRunning === q.concurrency) {
                        q.saturated();
                    }
    
                    var cb = onlyOnce(_next(tasks));
                    _worker(data, cb);
                }
                isProcessing = false;
            },
            length: function () {
                return q._tasks.length;
            },
            running: function () {
                return numRunning;
            },
            workersList: function () {
                return workersList;
            },
            idle: function() {
                return q._tasks.length + numRunning === 0;
            },
            pause: function () {
                q.paused = true;
            },
            resume: function () {
                if (q.paused === false) { return; }
                q.paused = false;
                setImmediate$1(q.process);
            }
        };
        return q;
    }
    
    /**
     * A cargo of tasks for the worker function to complete. Cargo inherits all of
     * the same methods and event callbacks as [`queue`]{@link module:ControlFlow.queue}.
     * @typedef {Object} CargoObject
     * @memberOf module:ControlFlow
     * @property {Function} length - A function returning the number of items
     * waiting to be processed. Invoke like `cargo.length()`.
     * @property {number} payload - An `integer` for determining how many tasks
     * should be process per round. This property can be changed after a `cargo` is
     * created to alter the payload on-the-fly.
     * @property {Function} push - Adds `task` to the `queue`. The callback is
     * called once the `worker` has finished processing the task. Instead of a
     * single task, an array of `tasks` can be submitted. The respective callback is
     * used for every task in the list. Invoke like `cargo.push(task, [callback])`.
     * @property {Function} saturated - A callback that is called when the
     * `queue.length()` hits the concurrency and further tasks will be queued.
     * @property {Function} empty - A callback that is called when the last item
     * from the `queue` is given to a `worker`.
     * @property {Function} drain - A callback that is called when the last item
     * from the `queue` has returned from the `worker`.
     * @property {Function} idle - a function returning false if there are items
     * waiting or being processed, or true if not. Invoke like `cargo.idle()`.
     * @property {Function} pause - a function that pauses the processing of tasks
     * until `resume()` is called. Invoke like `cargo.pause()`.
     * @property {Function} resume - a function that resumes the processing of
     * queued tasks when the queue is paused. Invoke like `cargo.resume()`.
     * @property {Function} kill - a function that removes the `drain` callback and
     * empties remaining tasks from the queue forcing it to go idle. Invoke like `cargo.kill()`.
     */
    
    /**
     * Creates a `cargo` object with the specified payload. Tasks added to the
     * cargo will be processed altogether (up to the `payload` limit). If the
     * `worker` is in progress, the task is queued until it becomes available. Once
     * the `worker` has completed some tasks, each callback of those tasks is
     * called. Check out [these](https://camo.githubusercontent.com/6bbd36f4cf5b35a0f11a96dcd2e97711ffc2fb37/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130382f62626330636662302d356632392d313165322d393734662d3333393763363464633835382e676966) [animations](https://camo.githubusercontent.com/f4810e00e1c5f5f8addbe3e9f49064fd5d102699/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130312f38346339323036362d356632392d313165322d383134662d3964336430323431336266642e676966)
     * for how `cargo` and `queue` work.
     *
     * While [`queue`]{@link module:ControlFlow.queue} passes only one task to one of a group of workers
     * at a time, cargo passes an array of tasks to a single worker, repeating
     * when the worker is finished.
     *
     * @name cargo
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @see [async.queue]{@link module:ControlFlow.queue}
     * @category Control Flow
     * @param {AsyncFunction} worker - An asynchronous function for processing an array
     * of queued tasks. Invoked with `(tasks, callback)`.
     * @param {number} [payload=Infinity] - An optional `integer` for determining
     * how many tasks should be processed per round; if omitted, the default is
     * unlimited.
     * @returns {module:ControlFlow.CargoObject} A cargo object to manage the tasks. Callbacks can
     * attached as certain properties to listen for specific events during the
     * lifecycle of the cargo and inner queue.
     * @example
     *
     * // create a cargo object with payload 2
     * var cargo = async.cargo(function(tasks, callback) {
     *     for (var i=0; i<tasks.length; i++) {
     *         console.log('hello ' + tasks[i].name);
     *     }
     *     callback();
     * }, 2);
     *
     * // add some items
     * cargo.push({name: 'foo'}, function(err) {
     *     console.log('finished processing foo');
     * });
     * cargo.push({name: 'bar'}, function(err) {
     *     console.log('finished processing bar');
     * });
     * cargo.push({name: 'baz'}, function(err) {
     *     console.log('finished processing baz');
     * });
     */
    function cargo(worker, payload) {
        return queue(worker, 1, payload);
    }
    
    /**
     * The same as [`eachOf`]{@link module:Collections.eachOf} but runs only a single async operation at a time.
     *
     * @name eachOfSeries
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.eachOf]{@link module:Collections.eachOf}
     * @alias forEachOfSeries
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {AsyncFunction} iteratee - An async function to apply to each item in
     * `coll`.
     * Invoked with (item, key, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Invoked with (err).
     */
    var eachOfSeries = doLimit(eachOfLimit, 1);
    
    /**
     * Reduces `coll` into a single value using an async `iteratee` to return each
     * successive step. `memo` is the initial state of the reduction. This function
     * only operates in series.
     *
     * For performance reasons, it may make sense to split a call to this function
     * into a parallel map, and then use the normal `Array.prototype.reduce` on the
     * results. This function is for situations where each step in the reduction
     * needs to be async; if you can get the data before reducing it, then it's
     * probably a good idea to do so.
     *
     * @name reduce
     * @static
     * @memberOf module:Collections
     * @method
     * @alias inject
     * @alias foldl
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {*} memo - The initial state of the reduction.
     * @param {AsyncFunction} iteratee - A function applied to each item in the
     * array to produce the next step in the reduction.
     * The `iteratee` should complete with the next state of the reduction.
     * If the iteratee complete with an error, the reduction is stopped and the
     * main `callback` is immediately called with the error.
     * Invoked with (memo, item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Result is the reduced value. Invoked with
     * (err, result).
     * @example
     *
     * async.reduce([1,2,3], 0, function(memo, item, callback) {
     *     // pointless async:
     *     process.nextTick(function() {
     *         callback(null, memo + item)
     *     });
     * }, function(err, result) {
     *     // result is now equal to the last value of memo, which is 6
     * });
     */
    function reduce(coll, memo, iteratee, callback) {
        callback = once(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        eachOfSeries(coll, function(x, i, callback) {
            _iteratee(memo, x, function(err, v) {
                memo = v;
                callback(err);
            });
        }, function(err) {
            callback(err, memo);
        });
    }
    
    /**
     * Version of the compose function that is more natural to read. Each function
     * consumes the return value of the previous function. It is the equivalent of
     * [compose]{@link module:ControlFlow.compose} with the arguments reversed.
     *
     * Each function is executed with the `this` binding of the composed function.
     *
     * @name seq
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @see [async.compose]{@link module:ControlFlow.compose}
     * @category Control Flow
     * @param {...AsyncFunction} functions - the asynchronous functions to compose
     * @returns {Function} a function that composes the `functions` in order
     * @example
     *
     * // Requires lodash (or underscore), express3 and dresende's orm2.
     * // Part of an app, that fetches cats of the logged user.
     * // This example uses `seq` function to avoid overnesting and error
     * // handling clutter.
     * app.get('/cats', function(request, response) {
     *     var User = request.models.User;
     *     async.seq(
     *         _.bind(User.get, User),  // 'User.get' has signature (id, callback(err, data))
     *         function(user, fn) {
     *             user.getCats(fn);      // 'getCats' has signature (callback(err, data))
     *         }
     *     )(req.session.user_id, function (err, cats) {
     *         if (err) {
     *             console.error(err);
     *             response.json({ status: 'error', message: err.message });
     *         } else {
     *             response.json({ status: 'ok', message: 'Cats found', data: cats });
     *         }
     *     });
     * });
     */
    function seq(/*...functions*/) {
        var _functions = arrayMap(arguments, wrapAsync);
        return function(/*...args*/) {
            var args = slice(arguments);
            var that = this;
    
            var cb = args[args.length - 1];
            if (typeof cb == 'function') {
                args.pop();
            } else {
                cb = noop;
            }
    
            reduce(_functions, args, function(newargs, fn, cb) {
                fn.apply(that, newargs.concat(function(err/*, ...nextargs*/) {
                    var nextargs = slice(arguments, 1);
                    cb(err, nextargs);
                }));
            },
            function(err, results) {
                cb.apply(that, [err].concat(results));
            });
        };
    }
    
    /**
     * Creates a function which is a composition of the passed asynchronous
     * functions. Each function consumes the return value of the function that
     * follows. Composing functions `f()`, `g()`, and `h()` would produce the result
     * of `f(g(h()))`, only this version uses callbacks to obtain the return values.
     *
     * Each function is executed with the `this` binding of the composed function.
     *
     * @name compose
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @category Control Flow
     * @param {...AsyncFunction} functions - the asynchronous functions to compose
     * @returns {Function} an asynchronous function that is the composed
     * asynchronous `functions`
     * @example
     *
     * function add1(n, callback) {
     *     setTimeout(function () {
     *         callback(null, n + 1);
     *     }, 10);
     * }
     *
     * function mul3(n, callback) {
     *     setTimeout(function () {
     *         callback(null, n * 3);
     *     }, 10);
     * }
     *
     * var add1mul3 = async.compose(mul3, add1);
     * add1mul3(4, function (err, result) {
     *     // result now equals 15
     * });
     */
    var compose = function(/*...args*/) {
        return seq.apply(null, slice(arguments).reverse());
    };
    
    var _concat = Array.prototype.concat;
    
    /**
     * The same as [`concat`]{@link module:Collections.concat} but runs a maximum of `limit` async operations at a time.
     *
     * @name concatLimit
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.concat]{@link module:Collections.concat}
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {AsyncFunction} iteratee - A function to apply to each item in `coll`,
     * which should use an array as its result. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished, or an error occurs. Results is an array
     * containing the concatenated results of the `iteratee` function. Invoked with
     * (err, results).
     */
    var concatLimit = function(coll, limit, iteratee, callback) {
        callback = callback || noop;
        var _iteratee = wrapAsync(iteratee);
        mapLimit(coll, limit, function(val, callback) {
            _iteratee(val, function(err /*, ...args*/) {
                if (err) return callback(err);
                return callback(null, slice(arguments, 1));
            });
        }, function(err, mapResults) {
            var result = [];
            for (var i = 0; i < mapResults.length; i++) {
                if (mapResults[i]) {
                    result = _concat.apply(result, mapResults[i]);
                }
            }
    
            return callback(err, result);
        });
    };
    
    /**
     * Applies `iteratee` to each item in `coll`, concatenating the results. Returns
     * the concatenated list. The `iteratee`s are called in parallel, and the
     * results are concatenated as they return. There is no guarantee that the
     * results array will be returned in the original order of `coll` passed to the
     * `iteratee` function.
     *
     * @name concat
     * @static
     * @memberOf module:Collections
     * @method
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {AsyncFunction} iteratee - A function to apply to each item in `coll`,
     * which should use an array as its result. Invoked with (item, callback).
     * @param {Function} [callback(err)] - A callback which is called after all the
     * `iteratee` functions have finished, or an error occurs. Results is an array
     * containing the concatenated results of the `iteratee` function. Invoked with
     * (err, results).
     * @example
     *
     * async.concat(['dir1','dir2','dir3'], fs.readdir, function(err, files) {
     *     // files is now a list of filenames that exist in the 3 directories
     * });
     */
    var concat = doLimit(concatLimit, Infinity);
    
    /**
     * The same as [`concat`]{@link module:Collections.concat} but runs only a single async operation at a time.
     *
     * @name concatSeries
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.concat]{@link module:Collections.concat}
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {AsyncFunction} iteratee - A function to apply to each item in `coll`.
     * The iteratee should complete with an array an array of results.
     * Invoked with (item, callback).
     * @param {Function} [callback(err)] - A callback which is called after all the
     * `iteratee` functions have finished, or an error occurs. Results is an array
     * containing the concatenated results of the `iteratee` function. Invoked with
     * (err, results).
     */
    var concatSeries = doLimit(concatLimit, 1);
    
    /**
     * Returns a function that when called, calls-back with the values provided.
     * Useful as the first function in a [`waterfall`]{@link module:ControlFlow.waterfall}, or for plugging values in to
     * [`auto`]{@link module:ControlFlow.auto}.
     *
     * @name constant
     * @static
     * @memberOf module:Utils
     * @method
     * @category Util
     * @param {...*} arguments... - Any number of arguments to automatically invoke
     * callback with.
     * @returns {AsyncFunction} Returns a function that when invoked, automatically
     * invokes the callback with the previous given arguments.
     * @example
     *
     * async.waterfall([
     *     async.constant(42),
     *     function (value, next) {
     *         // value === 42
     *     },
     *     //...
     * ], callback);
     *
     * async.waterfall([
     *     async.constant(filename, "utf8"),
     *     fs.readFile,
     *     function (fileData, next) {
     *         //...
     *     }
     *     //...
     * ], callback);
     *
     * async.auto({
     *     hostname: async.constant("https://server.net/"),
     *     port: findFreePort,
     *     launchServer: ["hostname", "port", function (options, cb) {
     *         startServer(options, cb);
     *     }],
     *     //...
     * }, callback);
     */
    var constant = function(/*...values*/) {
        var values = slice(arguments);
        var args = [null].concat(values);
        return function (/*...ignoredArgs, callback*/) {
            var callback = arguments[arguments.length - 1];
            return callback.apply(this, args);
        };
    };
    
    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }
    
    function _createTester(check, getResult) {
        return function(eachfn, arr, iteratee, cb) {
            cb = cb || noop;
            var testPassed = false;
            var testResult;
            eachfn(arr, function(value, _, callback) {
                iteratee(value, function(err, result) {
                    if (err) {
                        callback(err);
                    } else if (check(result) && !testResult) {
                        testPassed = true;
                        testResult = getResult(true, value);
                        callback(null, breakLoop);
                    } else {
                        callback();
                    }
                });
            }, function(err) {
                if (err) {
                    cb(err);
                } else {
                    cb(null, testPassed ? testResult : getResult(false));
                }
            });
        };
    }
    
    function _findGetResult(v, x) {
        return x;
    }
    
    /**
     * Returns the first value in `coll` that passes an async truth test. The
     * `iteratee` is applied in parallel, meaning the first iteratee to return
     * `true` will fire the detect `callback` with that result. That means the
     * result might not be the first item in the original `coll` (in terms of order)
     * that passes the test.
    
     * If order within the original `coll` is important, then look at
     * [`detectSeries`]{@link module:Collections.detectSeries}.
     *
     * @name detect
     * @static
     * @memberOf module:Collections
     * @method
     * @alias find
     * @category Collections
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
     * The iteratee must complete with a boolean value as its result.
     * Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called as soon as any
     * iteratee returns `true`, or after all the `iteratee` functions have finished.
     * Result will be the first item in the array that passes the truth test
     * (iteratee) or the value `undefined` if none passed. Invoked with
     * (err, result).
     * @example
     *
     * async.detect(['file1','file2','file3'], function(filePath, callback) {
     *     fs.access(filePath, function(err) {
     *         callback(null, !err)
     *     });
     * }, function(err, result) {
     *     // result now equals the first file in the list that exists
     * });
     */
    var detect = doParallel(_createTester(identity, _findGetResult));
    
    /**
     * The same as [`detect`]{@link module:Collections.detect} but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name detectLimit
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.detect]{@link module:Collections.detect}
     * @alias findLimit
     * @category Collections
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
     * The iteratee must complete with a boolean value as its result.
     * Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called as soon as any
     * iteratee returns `true`, or after all the `iteratee` functions have finished.
     * Result will be the first item in the array that passes the truth test
     * (iteratee) or the value `undefined` if none passed. Invoked with
     * (err, result).
     */
    var detectLimit = doParallelLimit(_createTester(identity, _findGetResult));
    
    /**
     * The same as [`detect`]{@link module:Collections.detect} but runs only a single async operation at a time.
     *
     * @name detectSeries
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.detect]{@link module:Collections.detect}
     * @alias findSeries
     * @category Collections
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
     * The iteratee must complete with a boolean value as its result.
     * Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called as soon as any
     * iteratee returns `true`, or after all the `iteratee` functions have finished.
     * Result will be the first item in the array that passes the truth test
     * (iteratee) or the value `undefined` if none passed. Invoked with
     * (err, result).
     */
    var detectSeries = doLimit(detectLimit, 1);
    
    function consoleFunc(name) {
        return function (fn/*, ...args*/) {
            var args = slice(arguments, 1);
            args.push(function (err/*, ...args*/) {
                var args = slice(arguments, 1);
                if (typeof console === 'object') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    } else if (console[name]) {
                        arrayEach(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            });
            wrapAsync(fn).apply(null, args);
        };
    }
    
    /**
     * Logs the result of an [`async` function]{@link AsyncFunction} to the
     * `console` using `console.dir` to display the properties of the resulting object.
     * Only works in Node.js or in browsers that support `console.dir` and
     * `console.error` (such as FF and Chrome).
     * If multiple arguments are returned from the async function,
     * `console.dir` is called on each argument in order.
     *
     * @name dir
     * @static
     * @memberOf module:Utils
     * @method
     * @category Util
     * @param {AsyncFunction} function - The function you want to eventually apply
     * all arguments to.
     * @param {...*} arguments... - Any number of arguments to apply to the function.
     * @example
     *
     * // in a module
     * var hello = function(name, callback) {
     *     setTimeout(function() {
     *         callback(null, {hello: name});
     *     }, 1000);
     * };
     *
     * // in the node repl
     * node> async.dir(hello, 'world');
     * {hello: 'world'}
     */
    var dir = consoleFunc('dir');
    
    /**
     * The post-check version of [`during`]{@link module:ControlFlow.during}. To reflect the difference in
     * the order of operations, the arguments `test` and `fn` are switched.
     *
     * Also a version of [`doWhilst`]{@link module:ControlFlow.doWhilst} with asynchronous `test` function.
     * @name doDuring
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @see [async.during]{@link module:ControlFlow.during}
     * @category Control Flow
     * @param {AsyncFunction} fn - An async function which is called each time
     * `test` passes. Invoked with (callback).
     * @param {AsyncFunction} test - asynchronous truth test to perform before each
     * execution of `fn`. Invoked with (...args, callback), where `...args` are the
     * non-error args from the previous callback of `fn`.
     * @param {Function} [callback] - A callback which is called after the test
     * function has failed and repeated execution of `fn` has stopped. `callback`
     * will be passed an error if one occurred, otherwise `null`.
     */
    function doDuring(fn, test, callback) {
        callback = onlyOnce(callback || noop);
        var _fn = wrapAsync(fn);
        var _test = wrapAsync(test);
    
        function next(err/*, ...args*/) {
            if (err) return callback(err);
            var args = slice(arguments, 1);
            args.push(check);
            _test.apply(this, args);
        }
    
        function check(err, truth) {
            if (err) return callback(err);
            if (!truth) return callback(null);
            _fn(next);
        }
    
        check(null, true);
    
    }
    
    /**
     * The post-check version of [`whilst`]{@link module:ControlFlow.whilst}. To reflect the difference in
     * the order of operations, the arguments `test` and `iteratee` are switched.
     *
     * `doWhilst` is to `whilst` as `do while` is to `while` in plain JavaScript.
     *
     * @name doWhilst
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @see [async.whilst]{@link module:ControlFlow.whilst}
     * @category Control Flow
     * @param {AsyncFunction} iteratee - A function which is called each time `test`
     * passes. Invoked with (callback).
     * @param {Function} test - synchronous truth test to perform after each
     * execution of `iteratee`. Invoked with any non-error callback results of
     * `iteratee`.
     * @param {Function} [callback] - A callback which is called after the test
     * function has failed and repeated execution of `iteratee` has stopped.
     * `callback` will be passed an error and any arguments passed to the final
     * `iteratee`'s callback. Invoked with (err, [results]);
     */
    function doWhilst(iteratee, test, callback) {
        callback = onlyOnce(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        var next = function(err/*, ...args*/) {
            if (err) return callback(err);
            var args = slice(arguments, 1);
            if (test.apply(this, args)) return _iteratee(next);
            callback.apply(null, [null].concat(args));
        };
        _iteratee(next);
    }
    
    /**
     * Like ['doWhilst']{@link module:ControlFlow.doWhilst}, except the `test` is inverted. Note the
     * argument ordering differs from `until`.
     *
     * @name doUntil
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @see [async.doWhilst]{@link module:ControlFlow.doWhilst}
     * @category Control Flow
     * @param {AsyncFunction} iteratee - An async function which is called each time
     * `test` fails. Invoked with (callback).
     * @param {Function} test - synchronous truth test to perform after each
     * execution of `iteratee`. Invoked with any non-error callback results of
     * `iteratee`.
     * @param {Function} [callback] - A callback which is called after the test
     * function has passed and repeated execution of `iteratee` has stopped. `callback`
     * will be passed an error and any arguments passed to the final `iteratee`'s
     * callback. Invoked with (err, [results]);
     */
    function doUntil(iteratee, test, callback) {
        doWhilst(iteratee, function() {
            return !test.apply(this, arguments);
        }, callback);
    }
    
    /**
     * Like [`whilst`]{@link module:ControlFlow.whilst}, except the `test` is an asynchronous function that
     * is passed a callback in the form of `function (err, truth)`. If error is
     * passed to `test` or `fn`, the main callback is immediately called with the
     * value of the error.
     *
     * @name during
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @see [async.whilst]{@link module:ControlFlow.whilst}
     * @category Control Flow
     * @param {AsyncFunction} test - asynchronous truth test to perform before each
     * execution of `fn`. Invoked with (callback).
     * @param {AsyncFunction} fn - An async function which is called each time
     * `test` passes. Invoked with (callback).
     * @param {Function} [callback] - A callback which is called after the test
     * function has failed and repeated execution of `fn` has stopped. `callback`
     * will be passed an error, if one occurred, otherwise `null`.
     * @example
     *
     * var count = 0;
     *
     * async.during(
     *     function (callback) {
     *         return callback(null, count < 5);
     *     },
     *     function (callback) {
     *         count++;
     *         setTimeout(callback, 1000);
     *     },
     *     function (err) {
     *         // 5 seconds have passed
     *     }
     * );
     */
    function during(test, fn, callback) {
        callback = onlyOnce(callback || noop);
        var _fn = wrapAsync(fn);
        var _test = wrapAsync(test);
    
        function next(err) {
            if (err) return callback(err);
            _test(check);
        }
    
        function check(err, truth) {
            if (err) return callback(err);
            if (!truth) return callback(null);
            _fn(next);
        }
    
        _test(check);
    }
    
    function _withoutIndex(iteratee) {
        return function (value, index, callback) {
            return iteratee(value, callback);
        };
    }
    
    /**
     * Applies the function `iteratee` to each item in `coll`, in parallel.
     * The `iteratee` is called with an item from the list, and a callback for when
     * it has finished. If the `iteratee` passes an error to its `callback`, the
     * main `callback` (for the `each` function) is immediately called with the
     * error.
     *
     * Note, that since this function applies `iteratee` to each item in parallel,
     * there is no guarantee that the iteratee functions will complete in order.
     *
     * @name each
     * @static
     * @memberOf module:Collections
     * @method
     * @alias forEach
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {AsyncFunction} iteratee - An async function to apply to
     * each item in `coll`. Invoked with (item, callback).
     * The array index is not passed to the iteratee.
     * If you need the index, use `eachOf`.
     * @param {Function} [callback] - A callback which is called when all
     * `iteratee` functions have finished, or an error occurs. Invoked with (err).
     * @example
     *
     * // assuming openFiles is an array of file names and saveFile is a function
     * // to save the modified contents of that file:
     *
     * async.each(openFiles, saveFile, function(err){
     *   // if any of the saves produced an error, err would equal that error
     * });
     *
     * // assuming openFiles is an array of file names
     * async.each(openFiles, function(file, callback) {
     *
     *     // Perform operation on file here.
     *     console.log('Processing file ' + file);
     *
     *     if( file.length > 32 ) {
     *       console.log('This file name is too long');
     *       callback('File name too long');
     *     } else {
     *       // Do work to process file here
     *       console.log('File processed');
     *       callback();
     *     }
     * }, function(err) {
     *     // if any of the file processing produced an error, err would equal that error
     *     if( err ) {
     *       // One of the iterations produced an error.
     *       // All processing will now stop.
     *       console.log('A file failed to process');
     *     } else {
     *       console.log('All files have been processed successfully');
     *     }
     * });
     */
    function eachLimit(coll, iteratee, callback) {
        eachOf(coll, _withoutIndex(wrapAsync(iteratee)), callback);
    }
    
    /**
     * The same as [`each`]{@link module:Collections.each} but runs a maximum of `limit` async operations at a time.
     *
     * @name eachLimit
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.each]{@link module:Collections.each}
     * @alias forEachLimit
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {AsyncFunction} iteratee - An async function to apply to each item in
     * `coll`.
     * The array index is not passed to the iteratee.
     * If you need the index, use `eachOfLimit`.
     * Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called when all
     * `iteratee` functions have finished, or an error occurs. Invoked with (err).
     */
    function eachLimit$1(coll, limit, iteratee, callback) {
        _eachOfLimit(limit)(coll, _withoutIndex(wrapAsync(iteratee)), callback);
    }
    
    /**
     * The same as [`each`]{@link module:Collections.each} but runs only a single async operation at a time.
     *
     * @name eachSeries
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.each]{@link module:Collections.each}
     * @alias forEachSeries
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {AsyncFunction} iteratee - An async function to apply to each
     * item in `coll`.
     * The array index is not passed to the iteratee.
     * If you need the index, use `eachOfSeries`.
     * Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called when all
     * `iteratee` functions have finished, or an error occurs. Invoked with (err).
     */
    var eachSeries = doLimit(eachLimit$1, 1);
    
    /**
     * Wrap an async function and ensure it calls its callback on a later tick of
     * the event loop.  If the function already calls its callback on a next tick,
     * no extra deferral is added. This is useful for preventing stack overflows
     * (`RangeError: Maximum call stack size exceeded`) and generally keeping
     * [Zalgo](http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony)
     * contained. ES2017 `async` functions are returned as-is -- they are immune
     * to Zalgo's corrupting influences, as they always resolve on a later tick.
     *
     * @name ensureAsync
     * @static
     * @memberOf module:Utils
     * @method
     * @category Util
     * @param {AsyncFunction} fn - an async function, one that expects a node-style
     * callback as its last argument.
     * @returns {AsyncFunction} Returns a wrapped function with the exact same call
     * signature as the function passed in.
     * @example
     *
     * function sometimesAsync(arg, callback) {
     *     if (cache[arg]) {
     *         return callback(null, cache[arg]); // this would be synchronous!!
     *     } else {
     *         doSomeIO(arg, callback); // this IO would be asynchronous
     *     }
     * }
     *
     * // this has a risk of stack overflows if many results are cached in a row
     * async.mapSeries(args, sometimesAsync, done);
     *
     * // this will defer sometimesAsync's callback if necessary,
     * // preventing stack overflows
     * async.mapSeries(args, async.ensureAsync(sometimesAsync), done);
     */
    function ensureAsync(fn) {
        if (isAsync(fn)) return fn;
        return initialParams(function (args, callback) {
            var sync = true;
            args.push(function () {
                var innerArgs = arguments;
                if (sync) {
                    setImmediate$1(function () {
                        callback.apply(null, innerArgs);
                    });
                } else {
                    callback.apply(null, innerArgs);
                }
            });
            fn.apply(this, args);
            sync = false;
        });
    }
    
    function notId(v) {
        return !v;
    }
    
    /**
     * Returns `true` if every element in `coll` satisfies an async test. If any
     * iteratee call returns `false`, the main `callback` is immediately called.
     *
     * @name every
     * @static
     * @memberOf module:Collections
     * @method
     * @alias all
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {AsyncFunction} iteratee - An async truth test to apply to each item
     * in the collection in parallel.
     * The iteratee must complete with a boolean result value.
     * Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Result will be either `true` or `false`
     * depending on the values of the async tests. Invoked with (err, result).
     * @example
     *
     * async.every(['file1','file2','file3'], function(filePath, callback) {
     *     fs.access(filePath, function(err) {
     *         callback(null, !err)
     *     });
     * }, function(err, result) {
     *     // if result is true then every file exists
     * });
     */
    var every = doParallel(_createTester(notId, notId));
    
    /**
     * The same as [`every`]{@link module:Collections.every} but runs a maximum of `limit` async operations at a time.
     *
     * @name everyLimit
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.every]{@link module:Collections.every}
     * @alias allLimit
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {AsyncFunction} iteratee - An async truth test to apply to each item
     * in the collection in parallel.
     * The iteratee must complete with a boolean result value.
     * Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Result will be either `true` or `false`
     * depending on the values of the async tests. Invoked with (err, result).
     */
    var everyLimit = doParallelLimit(_createTester(notId, notId));
    
    /**
     * The same as [`every`]{@link module:Collections.every} but runs only a single async operation at a time.
     *
     * @name everySeries
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.every]{@link module:Collections.every}
     * @alias allSeries
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {AsyncFunction} iteratee - An async truth test to apply to each item
     * in the collection in series.
     * The iteratee must complete with a boolean result value.
     * Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Result will be either `true` or `false`
     * depending on the values of the async tests. Invoked with (err, result).
     */
    var everySeries = doLimit(everyLimit, 1);
    
    /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined : object[key];
      };
    }
    
    function filterArray(eachfn, arr, iteratee, callback) {
        var truthValues = new Array(arr.length);
        eachfn(arr, function (x, index, callback) {
            iteratee(x, function (err, v) {
                truthValues[index] = !!v;
                callback(err);
            });
        }, function (err) {
            if (err) return callback(err);
            var results = [];
            for (var i = 0; i < arr.length; i++) {
                if (truthValues[i]) results.push(arr[i]);
            }
            callback(null, results);
        });
    }
    
    function filterGeneric(eachfn, coll, iteratee, callback) {
        var results = [];
        eachfn(coll, function (x, index, callback) {
            iteratee(x, function (err, v) {
                if (err) {
                    callback(err);
                } else {
                    if (v) {
                        results.push({index: index, value: x});
                    }
                    callback();
                }
            });
        }, function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null, arrayMap(results.sort(function (a, b) {
                    return a.index - b.index;
                }), baseProperty('value')));
            }
        });
    }
    
    function _filter(eachfn, coll, iteratee, callback) {
        var filter = isArrayLike(coll) ? filterArray : filterGeneric;
        filter(eachfn, coll, wrapAsync(iteratee), callback || noop);
    }
    
    /**
     * Returns a new array of all the values in `coll` which pass an async truth
     * test. This operation is performed in parallel, but the results array will be
     * in the same order as the original.
     *
     * @name filter
     * @static
     * @memberOf module:Collections
     * @method
     * @alias select
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Invoked with (err, results).
     * @example
     *
     * async.filter(['file1','file2','file3'], function(filePath, callback) {
     *     fs.access(filePath, function(err) {
     *         callback(null, !err)
     *     });
     * }, function(err, results) {
     *     // results now equals an array of the existing files
     * });
     */
    var filter = doParallel(_filter);
    
    /**
     * The same as [`filter`]{@link module:Collections.filter} but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name filterLimit
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.filter]{@link module:Collections.filter}
     * @alias selectLimit
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Invoked with (err, results).
     */
    var filterLimit = doParallelLimit(_filter);
    
    /**
     * The same as [`filter`]{@link module:Collections.filter} but runs only a single async operation at a time.
     *
     * @name filterSeries
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.filter]{@link module:Collections.filter}
     * @alias selectSeries
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - A truth test to apply to each item in `coll`.
     * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
     * with a boolean argument once it has completed. Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Invoked with (err, results)
     */
    var filterSeries = doLimit(filterLimit, 1);
    
    /**
     * Calls the asynchronous function `fn` with a callback parameter that allows it
     * to call itself again, in series, indefinitely.
    
     * If an error is passed to the callback then `errback` is called with the
     * error, and execution stops, otherwise it will never be called.
     *
     * @name forever
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @category Control Flow
     * @param {AsyncFunction} fn - an async function to call repeatedly.
     * Invoked with (next).
     * @param {Function} [errback] - when `fn` passes an error to it's callback,
     * this function will be called, and execution stops. Invoked with (err).
     * @example
     *
     * async.forever(
     *     function(next) {
     *         // next is suitable for passing to things that need a callback(err [, whatever]);
     *         // it will result in this function being called again.
     *     },
     *     function(err) {
     *         // if next is called with a value in its first parameter, it will appear
     *         // in here as 'err', and execution will stop.
     *     }
     * );
     */
    function forever(fn, errback) {
        var done = onlyOnce(errback || noop);
        var task = wrapAsync(ensureAsync(fn));
    
        function next(err) {
            if (err) return done(err);
            task(next);
        }
        next();
    }
    
    /**
     * The same as [`groupBy`]{@link module:Collections.groupBy} but runs a maximum of `limit` async operations at a time.
     *
     * @name groupByLimit
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.groupBy]{@link module:Collections.groupBy}
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {AsyncFunction} iteratee - An async function to apply to each item in
     * `coll`.
     * The iteratee should complete with a `key` to group the value under.
     * Invoked with (value, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Result is an `Object` whoses
     * properties are arrays of values which returned the corresponding key.
     */
    var groupByLimit = function(coll, limit, iteratee, callback) {
        callback = callback || noop;
        var _iteratee = wrapAsync(iteratee);
        mapLimit(coll, limit, function(val, callback) {
            _iteratee(val, function(err, key) {
                if (err) return callback(err);
                return callback(null, {key: key, val: val});
            });
        }, function(err, mapResults) {
            var result = {};
            // from MDN, handle object having an `hasOwnProperty` prop
            var hasOwnProperty = Object.prototype.hasOwnProperty;
    
            for (var i = 0; i < mapResults.length; i++) {
                if (mapResults[i]) {
                    var key = mapResults[i].key;
                    var val = mapResults[i].val;
    
                    if (hasOwnProperty.call(result, key)) {
                        result[key].push(val);
                    } else {
                        result[key] = [val];
                    }
                }
            }
    
            return callback(err, result);
        });
    };
    
    /**
     * Returns a new object, where each value corresponds to an array of items, from
     * `coll`, that returned the corresponding key. That is, the keys of the object
     * correspond to the values passed to the `iteratee` callback.
     *
     * Note: Since this function applies the `iteratee` to each item in parallel,
     * there is no guarantee that the `iteratee` functions will complete in order.
     * However, the values for each key in the `result` will be in the same order as
     * the original `coll`. For Objects, the values will roughly be in the order of
     * the original Objects' keys (but this can vary across JavaScript engines).
     *
     * @name groupBy
     * @static
     * @memberOf module:Collections
     * @method
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {AsyncFunction} iteratee - An async function to apply to each item in
     * `coll`.
     * The iteratee should complete with a `key` to group the value under.
     * Invoked with (value, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Result is an `Object` whoses
     * properties are arrays of values which returned the corresponding key.
     * @example
     *
     * async.groupBy(['userId1', 'userId2', 'userId3'], function(userId, callback) {
     *     db.findById(userId, function(err, user) {
     *         if (err) return callback(err);
     *         return callback(null, user.age);
     *     });
     * }, function(err, result) {
     *     // result is object containing the userIds grouped by age
     *     // e.g. { 30: ['userId1', 'userId3'], 42: ['userId2']};
     * });
     */
    var groupBy = doLimit(groupByLimit, Infinity);
    
    /**
     * The same as [`groupBy`]{@link module:Collections.groupBy} but runs only a single async operation at a time.
     *
     * @name groupBySeries
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.groupBy]{@link module:Collections.groupBy}
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {AsyncFunction} iteratee - An async function to apply to each item in
     * `coll`.
     * The iteratee should complete with a `key` to group the value under.
     * Invoked with (value, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. Result is an `Object` whoses
     * properties are arrays of values which returned the corresponding key.
     */
    var groupBySeries = doLimit(groupByLimit, 1);
    
    /**
     * Logs the result of an `async` function to the `console`. Only works in
     * Node.js or in browsers that support `console.log` and `console.error` (such
     * as FF and Chrome). If multiple arguments are returned from the async
     * function, `console.log` is called on each argument in order.
     *
     * @name log
     * @static
     * @memberOf module:Utils
     * @method
     * @category Util
     * @param {AsyncFunction} function - The function you want to eventually apply
     * all arguments to.
     * @param {...*} arguments... - Any number of arguments to apply to the function.
     * @example
     *
     * // in a module
     * var hello = function(name, callback) {
     *     setTimeout(function() {
     *         callback(null, 'hello ' + name);
     *     }, 1000);
     * };
     *
     * // in the node repl
     * node> async.log(hello, 'world');
     * 'hello world'
     */
    var log = consoleFunc('log');
    
    /**
     * The same as [`mapValues`]{@link module:Collections.mapValues} but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name mapValuesLimit
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.mapValues]{@link module:Collections.mapValues}
     * @category Collection
     * @param {Object} obj - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {AsyncFunction} iteratee - A function to apply to each value and key
     * in `coll`.
     * The iteratee should complete with the transformed value as its result.
     * Invoked with (value, key, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. `result` is a new object consisting
     * of each key from `obj`, with each transformed value on the right-hand side.
     * Invoked with (err, result).
     */
    function mapValuesLimit(obj, limit, iteratee, callback) {
        callback = once(callback || noop);
        var newObj = {};
        var _iteratee = wrapAsync(iteratee);
        eachOfLimit(obj, limit, function(val, key, next) {
            _iteratee(val, key, function (err, result) {
                if (err) return next(err);
                newObj[key] = result;
                next();
            });
        }, function (err) {
            callback(err, newObj);
        });
    }
    
    /**
     * A relative of [`map`]{@link module:Collections.map}, designed for use with objects.
     *
     * Produces a new Object by mapping each value of `obj` through the `iteratee`
     * function. The `iteratee` is called each `value` and `key` from `obj` and a
     * callback for when it has finished processing. Each of these callbacks takes
     * two arguments: an `error`, and the transformed item from `obj`. If `iteratee`
     * passes an error to its callback, the main `callback` (for the `mapValues`
     * function) is immediately called with the error.
     *
     * Note, the order of the keys in the result is not guaranteed.  The keys will
     * be roughly in the order they complete, (but this is very engine-specific)
     *
     * @name mapValues
     * @static
     * @memberOf module:Collections
     * @method
     * @category Collection
     * @param {Object} obj - A collection to iterate over.
     * @param {AsyncFunction} iteratee - A function to apply to each value and key
     * in `coll`.
     * The iteratee should complete with the transformed value as its result.
     * Invoked with (value, key, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. `result` is a new object consisting
     * of each key from `obj`, with each transformed value on the right-hand side.
     * Invoked with (err, result).
     * @example
     *
     * async.mapValues({
     *     f1: 'file1',
     *     f2: 'file2',
     *     f3: 'file3'
     * }, function (file, key, callback) {
     *   fs.stat(file, callback);
     * }, function(err, result) {
     *     // result is now a map of stats for each file, e.g.
     *     // {
     *     //     f1: [stats for file1],
     *     //     f2: [stats for file2],
     *     //     f3: [stats for file3]
     *     // }
     * });
     */
    
    var mapValues = doLimit(mapValuesLimit, Infinity);
    
    /**
     * The same as [`mapValues`]{@link module:Collections.mapValues} but runs only a single async operation at a time.
     *
     * @name mapValuesSeries
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.mapValues]{@link module:Collections.mapValues}
     * @category Collection
     * @param {Object} obj - A collection to iterate over.
     * @param {AsyncFunction} iteratee - A function to apply to each value and key
     * in `coll`.
     * The iteratee should complete with the transformed value as its result.
     * Invoked with (value, key, callback).
     * @param {Function} [callback] - A callback which is called when all `iteratee`
     * functions have finished, or an error occurs. `result` is a new object consisting
     * of each key from `obj`, with each transformed value on the right-hand side.
     * Invoked with (err, result).
     */
    var mapValuesSeries = doLimit(mapValuesLimit, 1);
    
    function has(obj, key) {
        return key in obj;
    }
    
    /**
     * Caches the results of an async function. When creating a hash to store
     * function results against, the callback is omitted from the hash and an
     * optional hash function can be used.
     *
     * If no hash function is specified, the first argument is used as a hash key,
     * which may work reasonably if it is a string or a data type that converts to a
     * distinct string. Note that objects and arrays will not behave reasonably.
     * Neither will cases where the other arguments are significant. In such cases,
     * specify your own hash function.
     *
     * The cache of results is exposed as the `memo` property of the function
     * returned by `memoize`.
     *
     * @name memoize
     * @static
     * @memberOf module:Utils
     * @method
     * @category Util
     * @param {AsyncFunction} fn - The async function to proxy and cache results from.
     * @param {Function} hasher - An optional function for generating a custom hash
     * for storing results. It has all the arguments applied to it apart from the
     * callback, and must be synchronous.
     * @returns {AsyncFunction} a memoized version of `fn`
     * @example
     *
     * var slow_fn = function(name, callback) {
     *     // do something
     *     callback(null, result);
     * };
     * var fn = async.memoize(slow_fn);
     *
     * // fn can now be used as if it were slow_fn
     * fn('some name', function() {
     *     // callback
     * });
     */
    function memoize(fn, hasher) {
        var memo = Object.create(null);
        var queues = Object.create(null);
        hasher = hasher || identity;
        var _fn = wrapAsync(fn);
        var memoized = initialParams(function memoized(args, callback) {
            var key = hasher.apply(null, args);
            if (has(memo, key)) {
                setImmediate$1(function() {
                    callback.apply(null, memo[key]);
                });
            } else if (has(queues, key)) {
                queues[key].push(callback);
            } else {
                queues[key] = [callback];
                _fn.apply(null, args.concat(function(/*args*/) {
                    var args = slice(arguments);
                    memo[key] = args;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                        q[i].apply(null, args);
                    }
                }));
            }
        });
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
    }
    
    /**
     * Calls `callback` on a later loop around the event loop. In Node.js this just
     * calls `process.nextTick`.  In the browser it will use `setImmediate` if
     * available, otherwise `setTimeout(callback, 0)`, which means other higher
     * priority events may precede the execution of `callback`.
     *
     * This is used internally for browser-compatibility purposes.
     *
     * @name nextTick
     * @static
     * @memberOf module:Utils
     * @method
     * @see [async.setImmediate]{@link module:Utils.setImmediate}
     * @category Util
     * @param {Function} callback - The function to call on a later loop around
     * the event loop. Invoked with (args...).
     * @param {...*} args... - any number of additional arguments to pass to the
     * callback on the next tick.
     * @example
     *
     * var call_order = [];
     * async.nextTick(function() {
     *     call_order.push('two');
     *     // call_order now equals ['one','two']
     * });
     * call_order.push('one');
     *
     * async.setImmediate(function (a, b, c) {
     *     // a, b, and c equal 1, 2, and 3
     * }, 1, 2, 3);
     */
    var _defer$1;
    
    if (hasNextTick) {
        _defer$1 = process.nextTick;
    } else if (hasSetImmediate) {
        _defer$1 = setImmediate;
    } else {
        _defer$1 = fallback;
    }
    
    var nextTick = wrap(_defer$1);
    
    function _parallel(eachfn, tasks, callback) {
        callback = callback || noop;
        var results = isArrayLike(tasks) ? [] : {};
    
        eachfn(tasks, function (task, key, callback) {
            wrapAsync(task)(function (err, result) {
                if (arguments.length > 2) {
                    result = slice(arguments, 1);
                }
                results[key] = result;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    }
    
    /**
     * Run the `tasks` collection of functions in parallel, without waiting until
     * the previous function has completed. If any of the functions pass an error to
     * its callback, the main `callback` is immediately called with the value of the
     * error. Once the `tasks` have completed, the results are passed to the final
     * `callback` as an array.
     *
     * **Note:** `parallel` is about kicking-off I/O tasks in parallel, not about
     * parallel execution of code.  If your tasks do not use any timers or perform
     * any I/O, they will actually be executed in series.  Any synchronous setup
     * sections for each task will happen one after the other.  JavaScript remains
     * single-threaded.
     *
     * **Hint:** Use [`reflect`]{@link module:Utils.reflect} to continue the
     * execution of other tasks when a task fails.
     *
     * It is also possible to use an object instead of an array. Each property will
     * be run as a function and the results will be passed to the final `callback`
     * as an object instead of an array. This can be a more readable way of handling
     * results from {@link async.parallel}.
     *
     * @name parallel
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @category Control Flow
     * @param {Array|Iterable|Object} tasks - A collection of
     * [async functions]{@link AsyncFunction} to run.
     * Each async function can complete with any number of optional `result` values.
     * @param {Function} [callback] - An optional callback to run once all the
     * functions have completed successfully. This function gets a results array
     * (or object) containing all the result arguments passed to the task callbacks.
     * Invoked with (err, results).
     *
     * @example
     * async.parallel([
     *     function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'one');
     *         }, 200);
     *     },
     *     function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'two');
     *         }, 100);
     *     }
     * ],
     * // optional callback
     * function(err, results) {
     *     // the results array will equal ['one','two'] even though
     *     // the second function had a shorter timeout.
     * });
     *
     * // an example using an object instead of an array
     * async.parallel({
     *     one: function(callback) {
     *         setTimeout(function() {
     *             callback(null, 1);
     *         }, 200);
     *     },
     *     two: function(callback) {
     *         setTimeout(function() {
     *             callback(null, 2);
     *         }, 100);
     *     }
     * }, function(err, results) {
     *     // results is now equals to: {one: 1, two: 2}
     * });
     */
    function parallelLimit(tasks, callback) {
        _parallel(eachOf, tasks, callback);
    }
    
    /**
     * The same as [`parallel`]{@link module:ControlFlow.parallel} but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name parallelLimit
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @see [async.parallel]{@link module:ControlFlow.parallel}
     * @category Control Flow
     * @param {Array|Iterable|Object} tasks - A collection of
     * [async functions]{@link AsyncFunction} to run.
     * Each async function can complete with any number of optional `result` values.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} [callback] - An optional callback to run once all the
     * functions have completed successfully. This function gets a results array
     * (or object) containing all the result arguments passed to the task callbacks.
     * Invoked with (err, results).
     */
    function parallelLimit$1(tasks, limit, callback) {
        _parallel(_eachOfLimit(limit), tasks, callback);
    }
    
    /**
     * A queue of tasks for the worker function to complete.
     * @typedef {Object} QueueObject
     * @memberOf module:ControlFlow
     * @property {Function} length - a function returning the number of items
     * waiting to be processed. Invoke with `queue.length()`.
     * @property {boolean} started - a boolean indicating whether or not any
     * items have been pushed and processed by the queue.
     * @property {Function} running - a function returning the number of items
     * currently being processed. Invoke with `queue.running()`.
     * @property {Function} workersList - a function returning the array of items
     * currently being processed. Invoke with `queue.workersList()`.
     * @property {Function} idle - a function returning false if there are items
     * waiting or being processed, or true if not. Invoke with `queue.idle()`.
     * @property {number} concurrency - an integer for determining how many `worker`
     * functions should be run in parallel. This property can be changed after a
     * `queue` is created to alter the concurrency on-the-fly.
     * @property {Function} push - add a new task to the `queue`. Calls `callback`
     * once the `worker` has finished processing the task. Instead of a single task,
     * a `tasks` array can be submitted. The respective callback is used for every
     * task in the list. Invoke with `queue.push(task, [callback])`,
     * @property {Function} unshift - add a new task to the front of the `queue`.
     * Invoke with `queue.unshift(task, [callback])`.
     * @property {Function} remove - remove items from the queue that match a test
     * function.  The test function will be passed an object with a `data` property,
     * and a `priority` property, if this is a
     * [priorityQueue]{@link module:ControlFlow.priorityQueue} object.
     * Invoked with `queue.remove(testFn)`, where `testFn` is of the form
     * `function ({data, priority}) {}` and returns a Boolean.
     * @property {Function} saturated - a callback that is called when the number of
     * running workers hits the `concurrency` limit, and further tasks will be
     * queued.
     * @property {Function} unsaturated - a callback that is called when the number
     * of running workers is less than the `concurrency` & `buffer` limits, and
     * further tasks will not be queued.
     * @property {number} buffer - A minimum threshold buffer in order to say that
     * the `queue` is `unsaturated`.
     * @property {Function} empty - a callback that is called when the last item
     * from the `queue` is given to a `worker`.
     * @property {Function} drain - a callback that is called when the last item
     * from the `queue` has returned from the `worker`.
     * @property {Function} error - a callback that is called when a task errors.
     * Has the signature `function(error, task)`.
     * @property {boolean} paused - a boolean for determining whether the queue is
     * in a paused state.
     * @property {Function} pause - a function that pauses the processing of tasks
     * until `resume()` is called. Invoke with `queue.pause()`.
     * @property {Function} resume - a function that resumes the processing of
     * queued tasks when the queue is paused. Invoke with `queue.resume()`.
     * @property {Function} kill - a function that removes the `drain` callback and
     * empties remaining tasks from the queue forcing it to go idle. No more tasks
     * should be pushed to the queue after calling this function. Invoke with `queue.kill()`.
     */
    
    /**
     * Creates a `queue` object with the specified `concurrency`. Tasks added to the
     * `queue` are processed in parallel (up to the `concurrency` limit). If all
     * `worker`s are in progress, the task is queued until one becomes available.
     * Once a `worker` completes a `task`, that `task`'s callback is called.
     *
     * @name queue
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @category Control Flow
     * @param {AsyncFunction} worker - An async function for processing a queued task.
     * If you want to handle errors from an individual task, pass a callback to
     * `q.push()`. Invoked with (task, callback).
     * @param {number} [concurrency=1] - An `integer` for determining how many
     * `worker` functions should be run in parallel.  If omitted, the concurrency
     * defaults to `1`.  If the concurrency is `0`, an error is thrown.
     * @returns {module:ControlFlow.QueueObject} A queue object to manage the tasks. Callbacks can
     * attached as certain properties to listen for specific events during the
     * lifecycle of the queue.
     * @example
     *
     * // create a queue object with concurrency 2
     * var q = async.queue(function(task, callback) {
     *     console.log('hello ' + task.name);
     *     callback();
     * }, 2);
     *
     * // assign a callback
     * q.drain = function() {
     *     console.log('all items have been processed');
     * };
     *
     * // add some items to the queue
     * q.push({name: 'foo'}, function(err) {
     *     console.log('finished processing foo');
     * });
     * q.push({name: 'bar'}, function (err) {
     *     console.log('finished processing bar');
     * });
     *
     * // add some items to the queue (batch-wise)
     * q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
     *     console.log('finished processing item');
     * });
     *
     * // add some items to the front of the queue
     * q.unshift({name: 'bar'}, function (err) {
     *     console.log('finished processing bar');
     * });
     */
    var queue$1 = function (worker, concurrency) {
        var _worker = wrapAsync(worker);
        return queue(function (items, cb) {
            _worker(items[0], cb);
        }, concurrency, 1);
    };
    
    /**
     * The same as [async.queue]{@link module:ControlFlow.queue} only tasks are assigned a priority and
     * completed in ascending priority order.
     *
     * @name priorityQueue
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @see [async.queue]{@link module:ControlFlow.queue}
     * @category Control Flow
     * @param {AsyncFunction} worker - An async function for processing a queued task.
     * If you want to handle errors from an individual task, pass a callback to
     * `q.push()`.
     * Invoked with (task, callback).
     * @param {number} concurrency - An `integer` for determining how many `worker`
     * functions should be run in parallel.  If omitted, the concurrency defaults to
     * `1`.  If the concurrency is `0`, an error is thrown.
     * @returns {module:ControlFlow.QueueObject} A priorityQueue object to manage the tasks. There are two
     * differences between `queue` and `priorityQueue` objects:
     * * `push(task, priority, [callback])` - `priority` should be a number. If an
     *   array of `tasks` is given, all tasks will be assigned the same priority.
     * * The `unshift` method was removed.
     */
    var priorityQueue = function(worker, concurrency) {
        // Start with a normal queue
        var q = queue$1(worker, concurrency);
    
        // Override push to accept second parameter representing priority
        q.push = function(data, priority, callback) {
            if (callback == null) callback = noop;
            if (typeof callback !== 'function') {
                throw new Error('task callback must be a function');
            }
            q.started = true;
            if (!isArray(data)) {
                data = [data];
            }
            if (data.length === 0) {
                // call drain immediately if there are no tasks
                return setImmediate$1(function() {
                    q.drain();
                });
            }
    
            priority = priority || 0;
            var nextNode = q._tasks.head;
            while (nextNode && priority >= nextNode.priority) {
                nextNode = nextNode.next;
            }
    
            for (var i = 0, l = data.length; i < l; i++) {
                var item = {
                    data: data[i],
                    priority: priority,
                    callback: callback
                };
    
                if (nextNode) {
                    q._tasks.insertBefore(nextNode, item);
                } else {
                    q._tasks.push(item);
                }
            }
            setImmediate$1(q.process);
        };
    
        // Remove unshift function
        delete q.unshift;
    
        return q;
    };
    
    /**
     * Runs the `tasks` array of functions in parallel, without waiting until the
     * previous function has completed. Once any of the `tasks` complete or pass an
     * error to its callback, the main `callback` is immediately called. It's
     * equivalent to `Promise.race()`.
     *
     * @name race
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @category Control Flow
     * @param {Array} tasks - An array containing [async functions]{@link AsyncFunction}
     * to run. Each function can complete with an optional `result` value.
     * @param {Function} callback - A callback to run once any of the functions have
     * completed. This function gets an error or result from the first function that
     * completed. Invoked with (err, result).
     * @returns undefined
     * @example
     *
     * async.race([
     *     function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'one');
     *         }, 200);
     *     },
     *     function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'two');
     *         }, 100);
     *     }
     * ],
     * // main callback
     * function(err, result) {
     *     // the result will be equal to 'two' as it finishes earlier
     * });
     */
    function race(tasks, callback) {
        callback = once(callback || noop);
        if (!isArray(tasks)) return callback(new TypeError('First argument to race must be an array of functions'));
        if (!tasks.length) return callback();
        for (var i = 0, l = tasks.length; i < l; i++) {
            wrapAsync(tasks[i])(callback);
        }
    }
    
    /**
     * Same as [`reduce`]{@link module:Collections.reduce}, only operates on `array` in reverse order.
     *
     * @name reduceRight
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.reduce]{@link module:Collections.reduce}
     * @alias foldr
     * @category Collection
     * @param {Array} array - A collection to iterate over.
     * @param {*} memo - The initial state of the reduction.
     * @param {AsyncFunction} iteratee - A function applied to each item in the
     * array to produce the next step in the reduction.
     * The `iteratee` should complete with the next state of the reduction.
     * If the iteratee complete with an error, the reduction is stopped and the
     * main `callback` is immediately called with the error.
     * Invoked with (memo, item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Result is the reduced value. Invoked with
     * (err, result).
     */
    function reduceRight (array, memo, iteratee, callback) {
        var reversed = slice(array).reverse();
        reduce(reversed, memo, iteratee, callback);
    }
    
    /**
     * Wraps the async function in another function that always completes with a
     * result object, even when it errors.
     *
     * The result object has either the property `error` or `value`.
     *
     * @name reflect
     * @static
     * @memberOf module:Utils
     * @method
     * @category Util
     * @param {AsyncFunction} fn - The async function you want to wrap
     * @returns {Function} - A function that always passes null to it's callback as
     * the error. The second argument to the callback will be an `object` with
     * either an `error` or a `value` property.
     * @example
     *
     * async.parallel([
     *     async.reflect(function(callback) {
     *         // do some stuff ...
     *         callback(null, 'one');
     *     }),
     *     async.reflect(function(callback) {
     *         // do some more stuff but error ...
     *         callback('bad stuff happened');
     *     }),
     *     async.reflect(function(callback) {
     *         // do some more stuff ...
     *         callback(null, 'two');
     *     })
     * ],
     * // optional callback
     * function(err, results) {
     *     // values
     *     // results[0].value = 'one'
     *     // results[1].error = 'bad stuff happened'
     *     // results[2].value = 'two'
     * });
     */
    function reflect(fn) {
        var _fn = wrapAsync(fn);
        return initialParams(function reflectOn(args, reflectCallback) {
            args.push(function callback(error, cbArg) {
                if (error) {
                    reflectCallback(null, { error: error });
                } else {
                    var value;
                    if (arguments.length <= 2) {
                        value = cbArg;
                    } else {
                        value = slice(arguments, 1);
                    }
                    reflectCallback(null, { value: value });
                }
            });
    
            return _fn.apply(this, args);
        });
    }
    
    /**
     * A helper function that wraps an array or an object of functions with `reflect`.
     *
     * @name reflectAll
     * @static
     * @memberOf module:Utils
     * @method
     * @see [async.reflect]{@link module:Utils.reflect}
     * @category Util
     * @param {Array|Object|Iterable} tasks - The collection of
     * [async functions]{@link AsyncFunction} to wrap in `async.reflect`.
     * @returns {Array} Returns an array of async functions, each wrapped in
     * `async.reflect`
     * @example
     *
     * let tasks = [
     *     function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'one');
     *         }, 200);
     *     },
     *     function(callback) {
     *         // do some more stuff but error ...
     *         callback(new Error('bad stuff happened'));
     *     },
     *     function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'two');
     *         }, 100);
     *     }
     * ];
     *
     * async.parallel(async.reflectAll(tasks),
     * // optional callback
     * function(err, results) {
     *     // values
     *     // results[0].value = 'one'
     *     // results[1].error = Error('bad stuff happened')
     *     // results[2].value = 'two'
     * });
     *
     * // an example using an object instead of an array
     * let tasks = {
     *     one: function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'one');
     *         }, 200);
     *     },
     *     two: function(callback) {
     *         callback('two');
     *     },
     *     three: function(callback) {
     *         setTimeout(function() {
     *             callback(null, 'three');
     *         }, 100);
     *     }
     * };
     *
     * async.parallel(async.reflectAll(tasks),
     * // optional callback
     * function(err, results) {
     *     // values
     *     // results.one.value = 'one'
     *     // results.two.error = 'two'
     *     // results.three.value = 'three'
     * });
     */
    function reflectAll(tasks) {
        var results;
        if (isArray(tasks)) {
            results = arrayMap(tasks, reflect);
        } else {
            results = {};
            baseForOwn(tasks, function(task, key) {
                results[key] = reflect.call(this, task);
            });
        }
        return results;
    }
    
    function reject$1(eachfn, arr, iteratee, callback) {
        _filter(eachfn, arr, function(value, cb) {
            iteratee(value, function(err, v) {
                cb(err, !v);
            });
        }, callback);
    }
    
    /**
     * The opposite of [`filter`]{@link module:Collections.filter}. Removes values that pass an `async` truth test.
     *
     * @name reject
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.filter]{@link module:Collections.filter}
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - An async truth test to apply to each item in
     * `coll`.
     * The should complete with a boolean value as its `result`.
     * Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Invoked with (err, results).
     * @example
     *
     * async.reject(['file1','file2','file3'], function(filePath, callback) {
     *     fs.access(filePath, function(err) {
     *         callback(null, !err)
     *     });
     * }, function(err, results) {
     *     // results now equals an array of missing files
     *     createFiles(results);
     * });
     */
    var reject = doParallel(reject$1);
    
    /**
     * The same as [`reject`]{@link module:Collections.reject} but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name rejectLimit
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.reject]{@link module:Collections.reject}
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {Function} iteratee - An async truth test to apply to each item in
     * `coll`.
     * The should complete with a boolean value as its `result`.
     * Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Invoked with (err, results).
     */
    var rejectLimit = doParallelLimit(reject$1);
    
    /**
     * The same as [`reject`]{@link module:Collections.reject} but runs only a single async operation at a time.
     *
     * @name rejectSeries
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.reject]{@link module:Collections.reject}
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {Function} iteratee - An async truth test to apply to each item in
     * `coll`.
     * The should complete with a boolean value as its `result`.
     * Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Invoked with (err, results).
     */
    var rejectSeries = doLimit(rejectLimit, 1);
    
    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */
    function constant$1(value) {
      return function() {
        return value;
      };
    }
    
    /**
     * Attempts to get a successful response from `task` no more than `times` times
     * before returning an error. If the task is successful, the `callback` will be
     * passed the result of the successful task. If all attempts fail, the callback
     * will be passed the error and result (if any) of the final attempt.
     *
     * @name retry
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @category Control Flow
     * @see [async.retryable]{@link module:ControlFlow.retryable}
     * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - Can be either an
     * object with `times` and `interval` or a number.
     * * `times` - The number of attempts to make before giving up.  The default
     *   is `5`.
     * * `interval` - The time to wait between retries, in milliseconds.  The
     *   default is `0`. The interval may also be specified as a function of the
     *   retry count (see example).
     * * `errorFilter` - An optional synchronous function that is invoked on
     *   erroneous result. If it returns `true` the retry attempts will continue;
     *   if the function returns `false` the retry flow is aborted with the current
     *   attempt's error and result being returned to the final callback.
     *   Invoked with (err).
     * * If `opts` is a number, the number specifies the number of times to retry,
     *   with the default interval of `0`.
     * @param {AsyncFunction} task - An async function to retry.
     * Invoked with (callback).
     * @param {Function} [callback] - An optional callback which is called when the
     * task has succeeded, or after the final failed attempt. It receives the `err`
     * and `result` arguments of the last attempt at completing the `task`. Invoked
     * with (err, results).
     *
     * @example
     *
     * // The `retry` function can be used as a stand-alone control flow by passing
     * // a callback, as shown below:
     *
     * // try calling apiMethod 3 times
     * async.retry(3, apiMethod, function(err, result) {
     *     // do something with the result
     * });
     *
     * // try calling apiMethod 3 times, waiting 200 ms between each retry
     * async.retry({times: 3, interval: 200}, apiMethod, function(err, result) {
     *     // do something with the result
     * });
     *
     * // try calling apiMethod 10 times with exponential backoff
     * // (i.e. intervals of 100, 200, 400, 800, 1600, ... milliseconds)
     * async.retry({
     *   times: 10,
     *   interval: function(retryCount) {
     *     return 50 * Math.pow(2, retryCount);
     *   }
     * }, apiMethod, function(err, result) {
     *     // do something with the result
     * });
     *
     * // try calling apiMethod the default 5 times no delay between each retry
     * async.retry(apiMethod, function(err, result) {
     *     // do something with the result
     * });
     *
     * // try calling apiMethod only when error condition satisfies, all other
     * // errors will abort the retry control flow and return to final callback
     * async.retry({
     *   errorFilter: function(err) {
     *     return err.message === 'Temporary error'; // only retry on a specific error
     *   }
     * }, apiMethod, function(err, result) {
     *     // do something with the result
     * });
     *
     * // to retry individual methods that are not as reliable within other
     * // control flow functions, use the `retryable` wrapper:
     * async.auto({
     *     users: api.getUsers.bind(api),
     *     payments: async.retryable(3, api.getPayments.bind(api))
     * }, function(err, results) {
     *     // do something with the results
     * });
     *
     */
    function retry(opts, task, callback) {
        var DEFAULT_TIMES = 5;
        var DEFAULT_INTERVAL = 0;
    
        var options = {
            times: DEFAULT_TIMES,
            intervalFunc: constant$1(DEFAULT_INTERVAL)
        };
    
        function parseTimes(acc, t) {
            if (typeof t === 'object') {
                acc.times = +t.times || DEFAULT_TIMES;
    
                acc.intervalFunc = typeof t.interval === 'function' ?
                    t.interval :
                    constant$1(+t.interval || DEFAULT_INTERVAL);
    
                acc.errorFilter = t.errorFilter;
            } else if (typeof t === 'number' || typeof t === 'string') {
                acc.times = +t || DEFAULT_TIMES;
            } else {
                throw new Error("Invalid arguments for async.retry");
            }
        }
    
        if (arguments.length < 3 && typeof opts === 'function') {
            callback = task || noop;
            task = opts;
        } else {
            parseTimes(options, opts);
            callback = callback || noop;
        }
    
        if (typeof task !== 'function') {
            throw new Error("Invalid arguments for async.retry");
        }
    
        var _task = wrapAsync(task);
    
        var attempt = 1;
        function retryAttempt() {
            _task(function(err) {
                if (err && attempt++ < options.times &&
                    (typeof options.errorFilter != 'function' ||
                        options.errorFilter(err))) {
                    setTimeout(retryAttempt, options.intervalFunc(attempt));
                } else {
                    callback.apply(null, arguments);
                }
            });
        }
    
        retryAttempt();
    }
    
    /**
     * A close relative of [`retry`]{@link module:ControlFlow.retry}.  This method
     * wraps a task and makes it retryable, rather than immediately calling it
     * with retries.
     *
     * @name retryable
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @see [async.retry]{@link module:ControlFlow.retry}
     * @category Control Flow
     * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - optional
     * options, exactly the same as from `retry`
     * @param {AsyncFunction} task - the asynchronous function to wrap.
     * This function will be passed any arguments passed to the returned wrapper.
     * Invoked with (...args, callback).
     * @returns {AsyncFunction} The wrapped function, which when invoked, will
     * retry on an error, based on the parameters specified in `opts`.
     * This function will accept the same parameters as `task`.
     * @example
     *
     * async.auto({
     *     dep1: async.retryable(3, getFromFlakyService),
     *     process: ["dep1", async.retryable(3, function (results, cb) {
     *         maybeProcessData(results.dep1, cb);
     *     })]
     * }, callback);
     */
    var retryable = function (opts, task) {
        if (!task) {
            task = opts;
            opts = null;
        }
        var _task = wrapAsync(task);
        return initialParams(function (args, callback) {
            function taskFn(cb) {
                _task.apply(null, args.concat(cb));
            }
    
            if (opts) retry(opts, taskFn, callback);
            else retry(taskFn, callback);
    
        });
    };
    
    /**
     * Run the functions in the `tasks` collection in series, each one running once
     * the previous function has completed. If any functions in the series pass an
     * error to its callback, no more functions are run, and `callback` is
     * immediately called with the value of the error. Otherwise, `callback`
     * receives an array of results when `tasks` have completed.
     *
     * It is also possible to use an object instead of an array. Each property will
     * be run as a function, and the results will be passed to the final `callback`
     * as an object instead of an array. This can be a more readable way of handling
     *  results from {@link async.series}.
     *
     * **Note** that while many implementations preserve the order of object
     * properties, the [ECMAScript Language Specification](http://www.ecma-international.org/ecma-262/5.1/#sec-8.6)
     * explicitly states that
     *
     * > The mechanics and order of enumerating the properties is not specified.
     *
     * So if you rely on the order in which your series of functions are executed,
     * and want this to work on all platforms, consider using an array.
     *
     * @name series
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @category Control Flow
     * @param {Array|Iterable|Object} tasks - A collection containing
     * [async functions]{@link AsyncFunction} to run in series.
     * Each function can complete with any number of optional `result` values.
     * @param {Function} [callback] - An optional callback to run once all the
     * functions have completed. This function gets a results array (or object)
     * containing all the result arguments passed to the `task` callbacks. Invoked
     * with (err, result).
     * @example
     * async.series([
     *     function(callback) {
     *         // do some stuff ...
     *         callback(null, 'one');
     *     },
     *     function(callback) {
     *         // do some more stuff ...
     *         callback(null, 'two');
     *     }
     * ],
     * // optional callback
     * function(err, results) {
     *     // results is now equal to ['one', 'two']
     * });
     *
     * async.series({
     *     one: function(callback) {
     *         setTimeout(function() {
     *             callback(null, 1);
     *         }, 200);
     *     },
     *     two: function(callback){
     *         setTimeout(function() {
     *             callback(null, 2);
     *         }, 100);
     *     }
     * }, function(err, results) {
     *     // results is now equal to: {one: 1, two: 2}
     * });
     */
    function series(tasks, callback) {
        _parallel(eachOfSeries, tasks, callback);
    }
    
    /**
     * Returns `true` if at least one element in the `coll` satisfies an async test.
     * If any iteratee call returns `true`, the main `callback` is immediately
     * called.
     *
     * @name some
     * @static
     * @memberOf module:Collections
     * @method
     * @alias any
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {AsyncFunction} iteratee - An async truth test to apply to each item
     * in the collections in parallel.
     * The iteratee should complete with a boolean `result` value.
     * Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called as soon as any
     * iteratee returns `true`, or after all the iteratee functions have finished.
     * Result will be either `true` or `false` depending on the values of the async
     * tests. Invoked with (err, result).
     * @example
     *
     * async.some(['file1','file2','file3'], function(filePath, callback) {
     *     fs.access(filePath, function(err) {
     *         callback(null, !err)
     *     });
     * }, function(err, result) {
     *     // if result is true then at least one of the files exists
     * });
     */
    var some = doParallel(_createTester(Boolean, identity));
    
    /**
     * The same as [`some`]{@link module:Collections.some} but runs a maximum of `limit` async operations at a time.
     *
     * @name someLimit
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.some]{@link module:Collections.some}
     * @alias anyLimit
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {AsyncFunction} iteratee - An async truth test to apply to each item
     * in the collections in parallel.
     * The iteratee should complete with a boolean `result` value.
     * Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called as soon as any
     * iteratee returns `true`, or after all the iteratee functions have finished.
     * Result will be either `true` or `false` depending on the values of the async
     * tests. Invoked with (err, result).
     */
    var someLimit = doParallelLimit(_createTester(Boolean, identity));
    
    /**
     * The same as [`some`]{@link module:Collections.some} but runs only a single async operation at a time.
     *
     * @name someSeries
     * @static
     * @memberOf module:Collections
     * @method
     * @see [async.some]{@link module:Collections.some}
     * @alias anySeries
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {AsyncFunction} iteratee - An async truth test to apply to each item
     * in the collections in series.
     * The iteratee should complete with a boolean `result` value.
     * Invoked with (item, callback).
     * @param {Function} [callback] - A callback which is called as soon as any
     * iteratee returns `true`, or after all the iteratee functions have finished.
     * Result will be either `true` or `false` depending on the values of the async
     * tests. Invoked with (err, result).
     */
    var someSeries = doLimit(someLimit, 1);
    
    /**
     * Sorts a list by the results of running each `coll` value through an async
     * `iteratee`.
     *
     * @name sortBy
     * @static
     * @memberOf module:Collections
     * @method
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {AsyncFunction} iteratee - An async function to apply to each item in
     * `coll`.
     * The iteratee should complete with a value to use as the sort criteria as
     * its `result`.
     * Invoked with (item, callback).
     * @param {Function} callback - A callback which is called after all the
     * `iteratee` functions have finished, or an error occurs. Results is the items
     * from the original `coll` sorted by the values returned by the `iteratee`
     * calls. Invoked with (err, results).
     * @example
     *
     * async.sortBy(['file1','file2','file3'], function(file, callback) {
     *     fs.stat(file, function(err, stats) {
     *         callback(err, stats.mtime);
     *     });
     * }, function(err, results) {
     *     // results is now the original array of files sorted by
     *     // modified date
     * });
     *
     * // By modifying the callback parameter the
     * // sorting order can be influenced:
     *
     * // ascending order
     * async.sortBy([1,9,3,5], function(x, callback) {
     *     callback(null, x);
     * }, function(err,result) {
     *     // result callback
     * });
     *
     * // descending order
     * async.sortBy([1,9,3,5], function(x, callback) {
     *     callback(null, x*-1);    //<- x*-1 instead of x, turns the order around
     * }, function(err,result) {
     *     // result callback
     * });
     */
    function sortBy (coll, iteratee, callback) {
        var _iteratee = wrapAsync(iteratee);
        map(coll, function (x, callback) {
            _iteratee(x, function (err, criteria) {
                if (err) return callback(err);
                callback(null, {value: x, criteria: criteria});
            });
        }, function (err, results) {
            if (err) return callback(err);
            callback(null, arrayMap(results.sort(comparator), baseProperty('value')));
        });
    
        function comparator(left, right) {
            var a = left.criteria, b = right.criteria;
            return a < b ? -1 : a > b ? 1 : 0;
        }
    }
    
    /**
     * Sets a time limit on an asynchronous function. If the function does not call
     * its callback within the specified milliseconds, it will be called with a
     * timeout error. The code property for the error object will be `'ETIMEDOUT'`.
     *
     * @name timeout
     * @static
     * @memberOf module:Utils
     * @method
     * @category Util
     * @param {AsyncFunction} asyncFn - The async function to limit in time.
     * @param {number} milliseconds - The specified time limit.
     * @param {*} [info] - Any variable you want attached (`string`, `object`, etc)
     * to timeout Error for more information..
     * @returns {AsyncFunction} Returns a wrapped function that can be used with any
     * of the control flow functions.
     * Invoke this function with the same parameters as you would `asyncFunc`.
     * @example
     *
     * function myFunction(foo, callback) {
     *     doAsyncTask(foo, function(err, data) {
     *         // handle errors
     *         if (err) return callback(err);
     *
     *         // do some stuff ...
     *
     *         // return processed data
     *         return callback(null, data);
     *     });
     * }
     *
     * var wrapped = async.timeout(myFunction, 1000);
     *
     * // call `wrapped` as you would `myFunction`
     * wrapped({ bar: 'bar' }, function(err, data) {
     *     // if `myFunction` takes < 1000 ms to execute, `err`
     *     // and `data` will have their expected values
     *
     *     // else `err` will be an Error with the code 'ETIMEDOUT'
     * });
     */
    function timeout(asyncFn, milliseconds, info) {
        var fn = wrapAsync(asyncFn);
    
        return initialParams(function (args, callback) {
            var timedOut = false;
            var timer;
    
            function timeoutCallback() {
                var name = asyncFn.name || 'anonymous';
                var error  = new Error('Callback function "' + name + '" timed out.');
                error.code = 'ETIMEDOUT';
                if (info) {
                    error.info = info;
                }
                timedOut = true;
                callback(error);
            }
    
            args.push(function () {
                if (!timedOut) {
                    callback.apply(null, arguments);
                    clearTimeout(timer);
                }
            });
    
            // setup timer and call original function
            timer = setTimeout(timeoutCallback, milliseconds);
            fn.apply(null, args);
        });
    }
    
    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeCeil = Math.ceil;
    var nativeMax = Math.max;
    
    /**
     * The base implementation of `_.range` and `_.rangeRight` which doesn't
     * coerce arguments.
     *
     * @private
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @param {number} step The value to increment or decrement by.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the range of numbers.
     */
    function baseRange(start, end, step, fromRight) {
      var index = -1,
          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
          result = Array(length);
    
      while (length--) {
        result[fromRight ? length : ++index] = start;
        start += step;
      }
      return result;
    }
    
    /**
     * The same as [times]{@link module:ControlFlow.times} but runs a maximum of `limit` async operations at a
     * time.
     *
     * @name timesLimit
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @see [async.times]{@link module:ControlFlow.times}
     * @category Control Flow
     * @param {number} count - The number of times to run the function.
     * @param {number} limit - The maximum number of async operations at a time.
     * @param {AsyncFunction} iteratee - The async function to call `n` times.
     * Invoked with the iteration index and a callback: (n, next).
     * @param {Function} callback - see [async.map]{@link module:Collections.map}.
     */
    function timeLimit(count, limit, iteratee, callback) {
        var _iteratee = wrapAsync(iteratee);
        mapLimit(baseRange(0, count, 1), limit, _iteratee, callback);
    }
    
    /**
     * Calls the `iteratee` function `n` times, and accumulates results in the same
     * manner you would use with [map]{@link module:Collections.map}.
     *
     * @name times
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @see [async.map]{@link module:Collections.map}
     * @category Control Flow
     * @param {number} n - The number of times to run the function.
     * @param {AsyncFunction} iteratee - The async function to call `n` times.
     * Invoked with the iteration index and a callback: (n, next).
     * @param {Function} callback - see {@link module:Collections.map}.
     * @example
     *
     * // Pretend this is some complicated async factory
     * var createUser = function(id, callback) {
     *     callback(null, {
     *         id: 'user' + id
     *     });
     * };
     *
     * // generate 5 users
     * async.times(5, function(n, next) {
     *     createUser(n, function(err, user) {
     *         next(err, user);
     *     });
     * }, function(err, users) {
     *     // we should now have 5 users
     * });
     */
    var times = doLimit(timeLimit, Infinity);
    
    /**
     * The same as [times]{@link module:ControlFlow.times} but runs only a single async operation at a time.
     *
     * @name timesSeries
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @see [async.times]{@link module:ControlFlow.times}
     * @category Control Flow
     * @param {number} n - The number of times to run the function.
     * @param {AsyncFunction} iteratee - The async function to call `n` times.
     * Invoked with the iteration index and a callback: (n, next).
     * @param {Function} callback - see {@link module:Collections.map}.
     */
    var timesSeries = doLimit(timeLimit, 1);
    
    /**
     * A relative of `reduce`.  Takes an Object or Array, and iterates over each
     * element in series, each step potentially mutating an `accumulator` value.
     * The type of the accumulator defaults to the type of collection passed in.
     *
     * @name transform
     * @static
     * @memberOf module:Collections
     * @method
     * @category Collection
     * @param {Array|Iterable|Object} coll - A collection to iterate over.
     * @param {*} [accumulator] - The initial state of the transform.  If omitted,
     * it will default to an empty Object or Array, depending on the type of `coll`
     * @param {AsyncFunction} iteratee - A function applied to each item in the
     * collection that potentially modifies the accumulator.
     * Invoked with (accumulator, item, key, callback).
     * @param {Function} [callback] - A callback which is called after all the
     * `iteratee` functions have finished. Result is the transformed accumulator.
     * Invoked with (err, result).
     * @example
     *
     * async.transform([1,2,3], function(acc, item, index, callback) {
     *     // pointless async:
     *     process.nextTick(function() {
     *         acc.push(item * 2)
     *         callback(null)
     *     });
     * }, function(err, result) {
     *     // result is now equal to [2, 4, 6]
     * });
     *
     * @example
     *
     * async.transform({a: 1, b: 2, c: 3}, function (obj, val, key, callback) {
     *     setImmediate(function () {
     *         obj[key] = val * 2;
     *         callback();
     *     })
     * }, function (err, result) {
     *     // result is equal to {a: 2, b: 4, c: 6}
     * })
     */
    function transform (coll, accumulator, iteratee, callback) {
        if (arguments.length <= 3) {
            callback = iteratee;
            iteratee = accumulator;
            accumulator = isArray(coll) ? [] : {};
        }
        callback = once(callback || noop);
        var _iteratee = wrapAsync(iteratee);
    
        eachOf(coll, function(v, k, cb) {
            _iteratee(accumulator, v, k, cb);
        }, function(err) {
            callback(err, accumulator);
        });
    }
    
    /**
     * It runs each task in series but stops whenever any of the functions were
     * successful. If one of the tasks were successful, the `callback` will be
     * passed the result of the successful task. If all tasks fail, the callback
     * will be passed the error and result (if any) of the final attempt.
     *
     * @name tryEach
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @category Control Flow
     * @param {Array|Iterable|Object} tasks - A collection containing functions to
     * run, each function is passed a `callback(err, result)` it must call on
     * completion with an error `err` (which can be `null`) and an optional `result`
     * value.
     * @param {Function} [callback] - An optional callback which is called when one
     * of the tasks has succeeded, or all have failed. It receives the `err` and
     * `result` arguments of the last attempt at completing the `task`. Invoked with
     * (err, results).
     * @example
     * async.tryEach([
     *     function getDataFromFirstWebsite(callback) {
     *         // Try getting the data from the first website
     *         callback(err, data);
     *     },
     *     function getDataFromSecondWebsite(callback) {
     *         // First website failed,
     *         // Try getting the data from the backup website
     *         callback(err, data);
     *     }
     * ],
     * // optional callback
     * function(err, results) {
     *     Now do something with the data.
     * });
     *
     */
    function tryEach(tasks, callback) {
        var error = null;
        var result;
        callback = callback || noop;
        eachSeries(tasks, function(task, callback) {
            wrapAsync(task)(function (err, res/*, ...args*/) {
                if (arguments.length > 2) {
                    result = slice(arguments, 1);
                } else {
                    result = res;
                }
                error = err;
                callback(!err);
            });
        }, function () {
            callback(error, result);
        });
    }
    
    /**
     * Undoes a [memoize]{@link module:Utils.memoize}d function, reverting it to the original,
     * unmemoized form. Handy for testing.
     *
     * @name unmemoize
     * @static
     * @memberOf module:Utils
     * @method
     * @see [async.memoize]{@link module:Utils.memoize}
     * @category Util
     * @param {AsyncFunction} fn - the memoized function
     * @returns {AsyncFunction} a function that calls the original unmemoized function
     */
    function unmemoize(fn) {
        return function () {
            return (fn.unmemoized || fn).apply(null, arguments);
        };
    }
    
    /**
     * Repeatedly call `iteratee`, while `test` returns `true`. Calls `callback` when
     * stopped, or an error occurs.
     *
     * @name whilst
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @category Control Flow
     * @param {Function} test - synchronous truth test to perform before each
     * execution of `iteratee`. Invoked with ().
     * @param {AsyncFunction} iteratee - An async function which is called each time
     * `test` passes. Invoked with (callback).
     * @param {Function} [callback] - A callback which is called after the test
     * function has failed and repeated execution of `iteratee` has stopped. `callback`
     * will be passed an error and any arguments passed to the final `iteratee`'s
     * callback. Invoked with (err, [results]);
     * @returns undefined
     * @example
     *
     * var count = 0;
     * async.whilst(
     *     function() { return count < 5; },
     *     function(callback) {
     *         count++;
     *         setTimeout(function() {
     *             callback(null, count);
     *         }, 1000);
     *     },
     *     function (err, n) {
     *         // 5 seconds have passed, n = 5
     *     }
     * );
     */
    function whilst(test, iteratee, callback) {
        callback = onlyOnce(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        if (!test()) return callback(null);
        var next = function(err/*, ...args*/) {
            if (err) return callback(err);
            if (test()) return _iteratee(next);
            var args = slice(arguments, 1);
            callback.apply(null, [null].concat(args));
        };
        _iteratee(next);
    }
    
    /**
     * Repeatedly call `iteratee` until `test` returns `true`. Calls `callback` when
     * stopped, or an error occurs. `callback` will be passed an error and any
     * arguments passed to the final `iteratee`'s callback.
     *
     * The inverse of [whilst]{@link module:ControlFlow.whilst}.
     *
     * @name until
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @see [async.whilst]{@link module:ControlFlow.whilst}
     * @category Control Flow
     * @param {Function} test - synchronous truth test to perform before each
     * execution of `iteratee`. Invoked with ().
     * @param {AsyncFunction} iteratee - An async function which is called each time
     * `test` fails. Invoked with (callback).
     * @param {Function} [callback] - A callback which is called after the test
     * function has passed and repeated execution of `iteratee` has stopped. `callback`
     * will be passed an error and any arguments passed to the final `iteratee`'s
     * callback. Invoked with (err, [results]);
     */
    function until(test, iteratee, callback) {
        whilst(function() {
            return !test.apply(this, arguments);
        }, iteratee, callback);
    }
    
    /**
     * Runs the `tasks` array of functions in series, each passing their results to
     * the next in the array. However, if any of the `tasks` pass an error to their
     * own callback, the next function is not executed, and the main `callback` is
     * immediately called with the error.
     *
     * @name waterfall
     * @static
     * @memberOf module:ControlFlow
     * @method
     * @category Control Flow
     * @param {Array} tasks - An array of [async functions]{@link AsyncFunction}
     * to run.
     * Each function should complete with any number of `result` values.
     * The `result` values will be passed as arguments, in order, to the next task.
     * @param {Function} [callback] - An optional callback to run once all the
     * functions have completed. This will be passed the results of the last task's
     * callback. Invoked with (err, [results]).
     * @returns undefined
     * @example
     *
     * async.waterfall([
     *     function(callback) {
     *         callback(null, 'one', 'two');
     *     },
     *     function(arg1, arg2, callback) {
     *         // arg1 now equals 'one' and arg2 now equals 'two'
     *         callback(null, 'three');
     *     },
     *     function(arg1, callback) {
     *         // arg1 now equals 'three'
     *         callback(null, 'done');
     *     }
     * ], function (err, result) {
     *     // result now equals 'done'
     * });
     *
     * // Or, with named functions:
     * async.waterfall([
     *     myFirstFunction,
     *     mySecondFunction,
     *     myLastFunction,
     * ], function (err, result) {
     *     // result now equals 'done'
     * });
     * function myFirstFunction(callback) {
     *     callback(null, 'one', 'two');
     * }
     * function mySecondFunction(arg1, arg2, callback) {
     *     // arg1 now equals 'one' and arg2 now equals 'two'
     *     callback(null, 'three');
     * }
     * function myLastFunction(arg1, callback) {
     *     // arg1 now equals 'three'
     *     callback(null, 'done');
     * }
     */
    var waterfall = function(tasks, callback) {
        callback = once(callback || noop);
        if (!isArray(tasks)) return callback(new Error('First argument to waterfall must be an array of functions'));
        if (!tasks.length) return callback();
        var taskIndex = 0;
    
        function nextTask(args) {
            var task = wrapAsync(tasks[taskIndex++]);
            args.push(onlyOnce(next));
            task.apply(null, args);
        }
    
        function next(err/*, ...args*/) {
            if (err || taskIndex === tasks.length) {
                return callback.apply(null, arguments);
            }
            nextTask(slice(arguments, 1));
        }
    
        nextTask([]);
    };
    
    /**
     * An "async function" in the context of Async is an asynchronous function with
     * a variable number of parameters, with the final parameter being a callback.
     * (`function (arg1, arg2, ..., callback) {}`)
     * The final callback is of the form `callback(err, results...)`, which must be
     * called once the function is completed.  The callback should be called with a
     * Error as its first argument to signal that an error occurred.
     * Otherwise, if no error occurred, it should be called with `null` as the first
     * argument, and any additional `result` arguments that may apply, to signal
     * successful completion.
     * The callback must be called exactly once, ideally on a later tick of the
     * JavaScript event loop.
     *
     * This type of function is also referred to as a "Node-style async function",
     * or a "continuation passing-style function" (CPS). Most of the methods of this
     * library are themselves CPS/Node-style async functions, or functions that
     * return CPS/Node-style async functions.
     *
     * Wherever we accept a Node-style async function, we also directly accept an
     * [ES2017 `async` function]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function}.
     * In this case, the `async` function will not be passed a final callback
     * argument, and any thrown error will be used as the `err` argument of the
     * implicit callback, and the return value will be used as the `result` value.
     * (i.e. a `rejected` of the returned Promise becomes the `err` callback
     * argument, and a `resolved` value becomes the `result`.)
     *
     * Note, due to JavaScript limitations, we can only detect native `async`
     * functions and not transpilied implementations.
     * Your environment must have `async`/`await` support for this to work.
     * (e.g. Node > v7.6, or a recent version of a modern browser).
     * If you are using `async` functions through a transpiler (e.g. Babel), you
     * must still wrap the function with [asyncify]{@link module:Utils.asyncify},
     * because the `async function` will be compiled to an ordinary function that
     * returns a promise.
     *
     * @typedef {Function} AsyncFunction
     * @static
     */
    
    /**
     * Async is a utility module which provides straight-forward, powerful functions
     * for working with asynchronous JavaScript. Although originally designed for
     * use with [Node.js](http://nodejs.org) and installable via
     * `npm install --save async`, it can also be used directly in the browser.
     * @module async
     * @see AsyncFunction
     */
    
    
    /**
     * A collection of `async` functions for manipulating collections, such as
     * arrays and objects.
     * @module Collections
     */
    
    /**
     * A collection of `async` functions for controlling the flow through a script.
     * @module ControlFlow
     */
    
    /**
     * A collection of `async` utility functions.
     * @module Utils
     */
    
    var index = {
        apply: apply,
        applyEach: applyEach,
        applyEachSeries: applyEachSeries,
        asyncify: asyncify,
        auto: auto,
        autoInject: autoInject,
        cargo: cargo,
        compose: compose,
        concat: concat,
        concatLimit: concatLimit,
        concatSeries: concatSeries,
        constant: constant,
        detect: detect,
        detectLimit: detectLimit,
        detectSeries: detectSeries,
        dir: dir,
        doDuring: doDuring,
        doUntil: doUntil,
        doWhilst: doWhilst,
        during: during,
        each: eachLimit,
        eachLimit: eachLimit$1,
        eachOf: eachOf,
        eachOfLimit: eachOfLimit,
        eachOfSeries: eachOfSeries,
        eachSeries: eachSeries,
        ensureAsync: ensureAsync,
        every: every,
        everyLimit: everyLimit,
        everySeries: everySeries,
        filter: filter,
        filterLimit: filterLimit,
        filterSeries: filterSeries,
        forever: forever,
        groupBy: groupBy,
        groupByLimit: groupByLimit,
        groupBySeries: groupBySeries,
        log: log,
        map: map,
        mapLimit: mapLimit,
        mapSeries: mapSeries,
        mapValues: mapValues,
        mapValuesLimit: mapValuesLimit,
        mapValuesSeries: mapValuesSeries,
        memoize: memoize,
        nextTick: nextTick,
        parallel: parallelLimit,
        parallelLimit: parallelLimit$1,
        priorityQueue: priorityQueue,
        queue: queue$1,
        race: race,
        reduce: reduce,
        reduceRight: reduceRight,
        reflect: reflect,
        reflectAll: reflectAll,
        reject: reject,
        rejectLimit: rejectLimit,
        rejectSeries: rejectSeries,
        retry: retry,
        retryable: retryable,
        seq: seq,
        series: series,
        setImmediate: setImmediate$1,
        some: some,
        someLimit: someLimit,
        someSeries: someSeries,
        sortBy: sortBy,
        timeout: timeout,
        times: times,
        timesLimit: timeLimit,
        timesSeries: timesSeries,
        transform: transform,
        tryEach: tryEach,
        unmemoize: unmemoize,
        until: until,
        waterfall: waterfall,
        whilst: whilst,
    
        // aliases
        all: every,
        allLimit: everyLimit,
        allSeries: everySeries,
        any: some,
        anyLimit: someLimit,
        anySeries: someSeries,
        find: detect,
        findLimit: detectLimit,
        findSeries: detectSeries,
        forEach: eachLimit,
        forEachSeries: eachSeries,
        forEachLimit: eachLimit$1,
        forEachOf: eachOf,
        forEachOfSeries: eachOfSeries,
        forEachOfLimit: eachOfLimit,
        inject: reduce,
        foldl: reduce,
        foldr: reduceRight,
        select: filter,
        selectLimit: filterLimit,
        selectSeries: filterSeries,
        wrapSync: asyncify
    };
    
    exports['default'] = index;
    exports.apply = apply;
    exports.applyEach = applyEach;
    exports.applyEachSeries = applyEachSeries;
    exports.asyncify = asyncify;
    exports.auto = auto;
    exports.autoInject = autoInject;
    exports.cargo = cargo;
    exports.compose = compose;
    exports.concat = concat;
    exports.concatLimit = concatLimit;
    exports.concatSeries = concatSeries;
    exports.constant = constant;
    exports.detect = detect;
    exports.detectLimit = detectLimit;
    exports.detectSeries = detectSeries;
    exports.dir = dir;
    exports.doDuring = doDuring;
    exports.doUntil = doUntil;
    exports.doWhilst = doWhilst;
    exports.during = during;
    exports.each = eachLimit;
    exports.eachLimit = eachLimit$1;
    exports.eachOf = eachOf;
    exports.eachOfLimit = eachOfLimit;
    exports.eachOfSeries = eachOfSeries;
    exports.eachSeries = eachSeries;
    exports.ensureAsync = ensureAsync;
    exports.every = every;
    exports.everyLimit = everyLimit;
    exports.everySeries = everySeries;
    exports.filter = filter;
    exports.filterLimit = filterLimit;
    exports.filterSeries = filterSeries;
    exports.forever = forever;
    exports.groupBy = groupBy;
    exports.groupByLimit = groupByLimit;
    exports.groupBySeries = groupBySeries;
    exports.log = log;
    exports.map = map;
    exports.mapLimit = mapLimit;
    exports.mapSeries = mapSeries;
    exports.mapValues = mapValues;
    exports.mapValuesLimit = mapValuesLimit;
    exports.mapValuesSeries = mapValuesSeries;
    exports.memoize = memoize;
    exports.nextTick = nextTick;
    exports.parallel = parallelLimit;
    exports.parallelLimit = parallelLimit$1;
    exports.priorityQueue = priorityQueue;
    exports.queue = queue$1;
    exports.race = race;
    exports.reduce = reduce;
    exports.reduceRight = reduceRight;
    exports.reflect = reflect;
    exports.reflectAll = reflectAll;
    exports.reject = reject;
    exports.rejectLimit = rejectLimit;
    exports.rejectSeries = rejectSeries;
    exports.retry = retry;
    exports.retryable = retryable;
    exports.seq = seq;
    exports.series = series;
    exports.setImmediate = setImmediate$1;
    exports.some = some;
    exports.someLimit = someLimit;
    exports.someSeries = someSeries;
    exports.sortBy = sortBy;
    exports.timeout = timeout;
    exports.times = times;
    exports.timesLimit = timeLimit;
    exports.timesSeries = timesSeries;
    exports.transform = transform;
    exports.tryEach = tryEach;
    exports.unmemoize = unmemoize;
    exports.until = until;
    exports.waterfall = waterfall;
    exports.whilst = whilst;
    exports.all = every;
    exports.allLimit = everyLimit;
    exports.allSeries = everySeries;
    exports.any = some;
    exports.anyLimit = someLimit;
    exports.anySeries = someSeries;
    exports.find = detect;
    exports.findLimit = detectLimit;
    exports.findSeries = detectSeries;
    exports.forEach = eachLimit;
    exports.forEachSeries = eachSeries;
    exports.forEachLimit = eachLimit$1;
    exports.forEachOf = eachOf;
    exports.forEachOfSeries = eachOfSeries;
    exports.forEachOfLimit = eachOfLimit;
    exports.inject = reduce;
    exports.foldl = reduce;
    exports.foldr = reduceRight;
    exports.select = filter;
    exports.selectLimit = filterLimit;
    exports.selectSeries = filterSeries;
    exports.wrapSync = asyncify;
    
    Object.defineProperty(exports, '__esModule', { value: true });
    
    })));
    
    /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(23).setImmediate, __webpack_require__(26), __webpack_require__(24), __webpack_require__(27)(module)))
    
    /***/ }),
    /* 23 */
    /***/ (function(module, exports, __webpack_require__) {
    
    /* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
                (typeof self !== "undefined" && self) ||
                window;
    var apply = Function.prototype.apply;
    
    // DOM APIs, for completeness
    
    exports.setTimeout = function() {
      return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
    };
    exports.setInterval = function() {
      return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
    };
    exports.clearTimeout =
    exports.clearInterval = function(timeout) {
      if (timeout) {
        timeout.close();
      }
    };
    
    function Timeout(id, clearFn) {
      this._id = id;
      this._clearFn = clearFn;
    }
    Timeout.prototype.unref = Timeout.prototype.ref = function() {};
    Timeout.prototype.close = function() {
      this._clearFn.call(scope, this._id);
    };
    
    // Does not start the time, just sets up the members needed.
    exports.enroll = function(item, msecs) {
      clearTimeout(item._idleTimeoutId);
      item._idleTimeout = msecs;
    };
    
    exports.unenroll = function(item) {
      clearTimeout(item._idleTimeoutId);
      item._idleTimeout = -1;
    };
    
    exports._unrefActive = exports.active = function(item) {
      clearTimeout(item._idleTimeoutId);
    
      var msecs = item._idleTimeout;
      if (msecs >= 0) {
        item._idleTimeoutId = setTimeout(function onTimeout() {
          if (item._onTimeout)
            item._onTimeout();
        }, msecs);
      }
    };
    
    // setimmediate attaches itself to the global object
    __webpack_require__(25);
    // On some exotic environments, it's not clear which object `setimmediate` was
    // able to install onto.  Search each possibility in the same order as the
    // `setimmediate` library.
    exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                           (typeof global !== "undefined" && global.setImmediate) ||
                           (this && this.setImmediate);
    exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                             (typeof global !== "undefined" && global.clearImmediate) ||
                             (this && this.clearImmediate);
    
    /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(24)))
    
    /***/ }),
    /* 24 */
    /***/ (function(module, exports) {
    
    var g;
    
    // This works in non-strict mode
    g = (function() {
        return this;
    })();
    
    try {
        // This works if eval is allowed (see CSP)
        g = g || Function("return this")() || (1, eval)("this");
    } catch (e) {
        // This works if the window reference is available
        if (typeof window === "object") g = window;
    }
    
    // g can still be undefined, but nothing to do about it...
    // We return undefined, instead of nothing here, so it's
    // easier to handle this case. if(!global) { ...}
    
    module.exports = g;
    
    
    /***/ }),
    /* 25 */
    /***/ (function(module, exports, __webpack_require__) {
    
    /* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
        "use strict";
    
        if (global.setImmediate) {
            return;
        }
    
        var nextHandle = 1; // Spec says greater than zero
        var tasksByHandle = {};
        var currentlyRunningATask = false;
        var doc = global.document;
        var registerImmediate;
    
        function setImmediate(callback) {
          // Callback can either be a function or a string
          if (typeof callback !== "function") {
            callback = new Function("" + callback);
          }
          // Copy function arguments
          var args = new Array(arguments.length - 1);
          for (var i = 0; i < args.length; i++) {
              args[i] = arguments[i + 1];
          }
          // Store and register the task
          var task = { callback: callback, args: args };
          tasksByHandle[nextHandle] = task;
          registerImmediate(nextHandle);
          return nextHandle++;
        }
    
        function clearImmediate(handle) {
            delete tasksByHandle[handle];
        }
    
        function run(task) {
            var callback = task.callback;
            var args = task.args;
            switch (args.length) {
            case 0:
                callback();
                break;
            case 1:
                callback(args[0]);
                break;
            case 2:
                callback(args[0], args[1]);
                break;
            case 3:
                callback(args[0], args[1], args[2]);
                break;
            default:
                callback.apply(undefined, args);
                break;
            }
        }
    
        function runIfPresent(handle) {
            // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
            // So if we're currently running a task, we'll need to delay this invocation.
            if (currentlyRunningATask) {
                // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
                // "too much recursion" error.
                setTimeout(runIfPresent, 0, handle);
            } else {
                var task = tasksByHandle[handle];
                if (task) {
                    currentlyRunningATask = true;
                    try {
                        run(task);
                    } finally {
                        clearImmediate(handle);
                        currentlyRunningATask = false;
                    }
                }
            }
        }
    
        function installNextTickImplementation() {
            registerImmediate = function(handle) {
                process.nextTick(function () { runIfPresent(handle); });
            };
        }
    
        function canUsePostMessage() {
            // The test against `importScripts` prevents this implementation from being installed inside a web worker,
            // where `global.postMessage` means something completely different and can't be used for this purpose.
            if (global.postMessage && !global.importScripts) {
                var postMessageIsAsynchronous = true;
                var oldOnMessage = global.onmessage;
                global.onmessage = function() {
                    postMessageIsAsynchronous = false;
                };
                global.postMessage("", "*");
                global.onmessage = oldOnMessage;
                return postMessageIsAsynchronous;
            }
        }
    
        function installPostMessageImplementation() {
            // Installs an event handler on `global` for the `message` event: see
            // * https://developer.mozilla.org/en/DOM/window.postMessage
            // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
    
            var messagePrefix = "setImmediate$" + Math.random() + "$";
            var onGlobalMessage = function(event) {
                if (event.source === global &&
                    typeof event.data === "string" &&
                    event.data.indexOf(messagePrefix) === 0) {
                    runIfPresent(+event.data.slice(messagePrefix.length));
                }
            };
    
            if (global.addEventListener) {
                global.addEventListener("message", onGlobalMessage, false);
            } else {
                global.attachEvent("onmessage", onGlobalMessage);
            }
    
            registerImmediate = function(handle) {
                global.postMessage(messagePrefix + handle, "*");
            };
        }
    
        function installMessageChannelImplementation() {
            var channel = new MessageChannel();
            channel.port1.onmessage = function(event) {
                var handle = event.data;
                runIfPresent(handle);
            };
    
            registerImmediate = function(handle) {
                channel.port2.postMessage(handle);
            };
        }
    
        function installReadyStateChangeImplementation() {
            var html = doc.documentElement;
            registerImmediate = function(handle) {
                // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                var script = doc.createElement("script");
                script.onreadystatechange = function () {
                    runIfPresent(handle);
                    script.onreadystatechange = null;
                    html.removeChild(script);
                    script = null;
                };
                html.appendChild(script);
            };
        }
    
        function installSetTimeoutImplementation() {
            registerImmediate = function(handle) {
                setTimeout(runIfPresent, 0, handle);
            };
        }
    
        // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
        var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
        attachTo = attachTo && attachTo.setTimeout ? attachTo : global;
    
        // Don't get fooled by e.g. browserify environments.
        if ({}.toString.call(global.process) === "[object process]") {
            // For Node.js before 0.9
            installNextTickImplementation();
    
        } else if (canUsePostMessage()) {
            // For non-IE10 modern browsers
            installPostMessageImplementation();
    
        } else if (global.MessageChannel) {
            // For web workers, where supported
            installMessageChannelImplementation();
    
        } else if (doc && "onreadystatechange" in doc.createElement("script")) {
            // For IE 6–8
            installReadyStateChangeImplementation();
    
        } else {
            // For older browsers
            installSetTimeoutImplementation();
        }
    
        attachTo.setImmediate = setImmediate;
        attachTo.clearImmediate = clearImmediate;
    }(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));
    
    /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(24), __webpack_require__(26)))
    
    /***/ }),
    /* 26 */
    /***/ (function(module, exports) {
    
    // shim for using process in browser
    var process = module.exports = {};
    
    // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.
    
    var cachedSetTimeout;
    var cachedClearTimeout;
    
    function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout () {
        throw new Error('clearTimeout has not been defined');
    }
    (function () {
        try {
            if (typeof setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
            } else {
                cachedSetTimeout = defaultSetTimout;
            }
        } catch (e) {
            cachedSetTimeout = defaultSetTimout;
        }
        try {
            if (typeof clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout;
            } else {
                cachedClearTimeout = defaultClearTimeout;
            }
        } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
        }
    } ())
    function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
            //normal enviroments in sane situations
            return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
        } catch(e){
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                return cachedSetTimeout.call(null, fun, 0);
            } catch(e){
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                return cachedSetTimeout.call(this, fun, 0);
            }
        }
    
    
    }
    function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
            //normal enviroments in sane situations
            return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
        } catch (e){
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                return cachedClearTimeout.call(null, marker);
            } catch (e){
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                return cachedClearTimeout.call(this, marker);
            }
        }
    
    
    
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    
    function cleanUpNextTick() {
        if (!draining || !currentQueue) {
            return;
        }
        draining = false;
        if (currentQueue.length) {
            queue = currentQueue.concat(queue);
        } else {
            queueIndex = -1;
        }
        if (queue.length) {
            drainQueue();
        }
    }
    
    function drainQueue() {
        if (draining) {
            return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
    
        var len = queue.length;
        while(len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
                if (currentQueue) {
                    currentQueue[queueIndex].run();
                }
            }
            queueIndex = -1;
            len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
    }
    
    process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
        }
    };
    
    // v8 likes predictible objects
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function () {
        this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};
    
    function noop() {}
    
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;
    
    process.listeners = function (name) { return [] }
    
    process.binding = function (name) {
        throw new Error('process.binding is not supported');
    };
    
    process.cwd = function () { return '/' };
    process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
    };
    process.umask = function() { return 0; };
    
    
    /***/ }),
    /* 27 */
    /***/ (function(module, exports) {
    
    module.exports = function(module) {
        if (!module.webpackPolyfill) {
            module.deprecate = function() {};
            module.paths = [];
            // module.parent = undefined by default
            if (!module.children) module.children = [];
            Object.defineProperty(module, "loaded", {
                enumerable: true,
                get: function() {
                    return module.l;
                }
            });
            Object.defineProperty(module, "id", {
                enumerable: true,
                get: function() {
                    return module.i;
                }
            });
            module.webpackPolyfill = 1;
        }
        return module;
    };
    
    
    /***/ }),
    /* 28 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    /* use strict */
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * load a transcription from a FILE object (for internal purposes)
     * @method localLoadTranscriptFile
     * @param {file} object
     */
    var common = __webpack_require__(29);
    exports.system = 'electron';
    function openLocalFile(fun) {
        /*
        var nBytes = 0,
            oFiles = document.getElementById("upload-input-transcript").files,
            nBytes = oFiles[0].size;
        var sOutput = nBytes + " bytes";
        // optional code for multiples approximation
        for (var aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"],
            nMultiple = 0,
            nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
            sOutput = nApprox.toFixed(1) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
        }
        */
        // end of optional code
        // document.getElementById("transcript-file-size").innerHTML = sOutput;
        var d = document.getElementById("upload-input-transcript");
        var oFiles = d.files;
        readTranscriptObj(oFiles[0]);
    }
    exports.openLocalFile = openLocalFile;
    ;
    /**
     * read a transcription from a FILE object with FileReader
     * @method readTranscriptObj
     * @param File object
     */
    var readTranscriptObjCallback = null;
    function readTranscriptObj(file) {
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                // document.getElementById('divopenfile').style.display = 'none';
                if (readTranscriptObjCallback) {
                    readTranscriptObjCallback(0, file.name, e.target.result);
                }
            };
        })(file);
        // Read in the image file as a data URL.
        reader.readAsText(file);
    }
    /**
     * available in main
     */
    function chooseOpenFile(callback) {
        readTranscriptObjCallback = callback;
        document.getElementById('upload-input-transcript').click();
    }
    exports.chooseOpenFile = chooseOpenFile;
    ;
    /**
     * @method saveFile
     * for compatibility purpose. Should not be used in a web navigator interface.
     * @param name
     * @param data
     */
    function saveFile(name, data) {
        common.saveFileLocal('xml', name, data);
    }
    exports.saveFile = saveFile;
    function chooseSaveFile(type, fun) { }
    exports.chooseSaveFile = chooseSaveFile;
    
    
    /***/ }),
    /* 29 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    /**
     * common.ts
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    var teimeta = __webpack_require__(2);
    var events = __webpack_require__(1);
    var msg = __webpack_require__(7);
    var syscall = __webpack_require__(28);
    var version = __webpack_require__(30);
    var alert = __webpack_require__(5);
    var picoModal = __webpack_require__(6);
    var saveAs = __webpack_require__(31);
    // to check if parameters are changed
    var changeParams = false;
    function setLeftShift(e) {
        //    console.log('leftshift', e);
        var v = parseInt(e.target.value);
        if (!isNaN(v) && v >= 0 && v <= 100) {
            if (teimeta.teiData.params.leftShift !== v) {
                changeParams = true;
                teimeta.teiData.params.leftShift = v;
            }
        }
    }
    exports.setLeftShift = setLeftShift;
    function setDispFPath(e) {
        var s = document.getElementById('toggleDispFPath');
        if (teimeta.teiData.params.displayFullpath) {
            s.innerHTML = '<i class="fa fa-square-o" aria-hidden="true"></i>';
            teimeta.teiData.params.displayFullpath = false;
        }
        else {
            s.innerHTML = '<i class="fa fa-check-square-o" aria-hidden="true"></i>';
            teimeta.teiData.params.displayFullpath = true;
        }
        changeParams = true;
    }
    exports.setDispFPath = setDispFPath;
    function setDefNewElt(e) {
        var s = document.getElementById('toggleDefNewElt');
        if (teimeta.teiData.params.defaultNewElement) {
            s.innerHTML = '<i class="fa fa-square-o" aria-hidden="true"></i>';
            teimeta.teiData.params.defaultNewElement = false;
        }
        else {
            s.innerHTML = '<i class="fa fa-check-square-o" aria-hidden="true"></i>';
            teimeta.teiData.params.defaultNewElement = true;
        }
        changeParams = true;
    }
    exports.setDefNewElt = setDefNewElt;
    function setValReq(e) {
        var s = document.getElementById('toggleDefValReq');
        if (teimeta.teiData.params.validateRequired) {
            s.innerHTML = '<i class="fa fa-square-o" aria-hidden="true"></i>';
            teimeta.teiData.params.validateRequired = false;
        }
        else {
            s.innerHTML = '<i class="fa fa-check-square-o" aria-hidden="true"></i>';
            teimeta.teiData.params.validateRequired = true;
        }
        changeParams = true;
    }
    exports.setValReq = setValReq;
    function setCanRm(e) {
        var s = document.getElementById('toggleDefCanRm');
        if (teimeta.teiData.params.canRemove) {
            s.innerHTML = '<i class="fa fa-square-o" aria-hidden="true"></i>';
            teimeta.teiData.params.canRemove = false;
        }
        else {
            s.innerHTML = '<i class="fa fa-check-square-o" aria-hidden="true"></i>';
            teimeta.teiData.params.canRemove = true;
        }
        changeParams = true;
    }
    exports.setCanRm = setCanRm;
    function setLanguage(lg, reload) {
        if (reload === void 0) { reload = true; }
        if (lg === 'fr' || lg === 'fra' || lg === 'fre') {
            teimeta.teiData.params.language = 'fre';
            msg.setLanguage('fre');
        }
        else if (lg === 'es' || lg === 'esp' || lg === 'spa') {
            teimeta.teiData.params.language = 'spa';
            msg.setLanguage('spa');
        }
        else if (lg === 'ja' || lg === 'jpn') {
            teimeta.teiData.params.language = 'jpn';
            msg.setLanguage('jpn');
        }
        else {
            teimeta.teiData.params.language = 'eng';
            msg.setLanguage('eng');
        }
        try {
            var el = document.getElementById('title');
            if (el)
                el.textContent = msg.msg("title");
            el = document.getElementById('xmlopen');
            if (el)
                el.textContent = msg.msg("xmlopen");
            el = document.getElementById('xmlsave1');
            if (el)
                el.textContent = msg.msg("xmlsave1");
            el = document.getElementById('xmlsave2');
            if (el)
                el.textContent = msg.msg("xmlsave2");
            el = document.getElementById('xmlsaveas');
            if (el)
                el.textContent = msg.msg("xmlsaveas");
            el = document.getElementById('oddapply');
            if (el)
                el.textContent = msg.msg("oddapply");
            el = document.getElementById('cssapply');
            if (el)
                el.textContent = msg.msg("cssapply");
            el = document.getElementById('cssclean');
            if (el)
                el.textContent = msg.msg("cssclean");
            el = document.getElementById('xmlnew');
            if (el)
                el.textContent = msg.msg("xmlnew");
            el = document.getElementById('menuhelp');
            if (el)
                el.textContent = msg.msg("menuhelp");
            el = document.getElementById('menuparam');
            if (el)
                el.textContent = msg.msg("menuparam");
            el = document.getElementById('applyoddcss');
            if (el)
                el.textContent = msg.msg("applyoddcss");
            el = document.getElementById('choicelanguage');
            if (el)
                el.textContent = msg.msg("choicelanguage");
            el = document.getElementById('paramlinks');
            if (el)
                el.textContent = msg.msg("paramlinks");
        }
        catch (error) {
            alert.alertUser('Erreur de message: ' + error.toString());
            console.log("setLanguage", error);
        }
        changeParams = false;
        saveParams();
        if (reload) {
            events.saveStorage();
            events.reLoad(null);
        }
    }
    exports.setLanguage = setLanguage;
    function oddParams() {
        var paramsPicomodal = null;
        var userInfo = "\n    <h2 style=\"margin-top: 0\">Param\u00E8tres</h2>\n    <ul>\n        <li onclick=\"window.teimeta.setDispFPath();\">" + msg.msg('paramfullpath') + '<span id="toggleDispFPath">'
            + ((teimeta.teiData.params.displayFullpath)
                ? '<i class="fa fa-check-square-o" aria-hidden="true"></i>'
                : '<i class="fa fa-square-o" aria-hidden="true"></i>')
            + "</span></li>\n        <li>" + msg.msg('paramshift') + '<input type="number" min="0" max="100" value="'
            + teimeta.teiData.params.leftShift
            + "\" name=\"leftshift\" onchange=\"window.teimeta.setLeftShift(event);\"/></li>\n        <li onclick=\"window.teimeta.setDefNewElt();\">" + msg.msg('paramdefincl') + '<span id="toggleDefNewElt">'
            + ((teimeta.teiData.params.defaultNewElement)
                ? '<i class="fa fa-check-square-o" aria-hidden="true"></i>'
                : '<i class="fa fa-square-o" aria-hidden="true"></i>')
            + "</span></li>\n        <li onclick=\"window.teimeta.setValReq();\">" + msg.msg('paramsupprobl') + '<span id="toggleDefValReq">'
            + ((teimeta.teiData.params.validateRequired)
                ? '<i class="fa fa-check-square-o" aria-hidden="true"></i>'
                : '<i class="fa fa-square-o" aria-hidden="true"></i>')
            + "</span></li>\n        <li onclick=\"window.teimeta.setCanRm();\">" + msg.msg('paramcanrm') + '<span id="toggleDefCanRm">'
            + ((teimeta.teiData.params.canRemove)
                ? '<i class="fa fa-check-square-o" aria-hidden="true"></i>'
                : '<i class="fa fa-square-o" aria-hidden="true"></i>')
            + "</span></li>\n    </ul>\n    ";
        changeParams = false;
        paramsPicomodal = picoModal({
            content: userInfo,
            closeHtml: '<span>Ok</span>',
            closeStyles: {
                //                position: "absolute",
                top: "-10px",
                right: "-10px",
                background: "#eee",
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "5px",
                border: "1px solid #ccc"
            }
        });
        paramsPicomodal.afterClose(function () {
            if (changeParams) {
                saveParams();
                events.saveStorage();
                events.reLoad(null);
            }
        }).afterClose(function (modal) { modal.destroy(); })
            .show();
    }
    exports.oddParams = oddParams;
    function saveParams() {
        localStorage.setItem("defaultNewElement", teimeta.teiData.params.defaultNewElement.toString());
        localStorage.setItem("leftShift", teimeta.teiData.params.leftShift.toString());
        localStorage.setItem("validateRequired", teimeta.teiData.params.validateRequired.toString());
        localStorage.setItem("canRemove", teimeta.teiData.params.canRemove.toString());
        localStorage.setItem("language", teimeta.teiData.params.language);
        localStorage.setItem("displayFullpath", teimeta.teiData.params.displayFullpath.toString());
        localStorage.setItem("groupingStyle", teimeta.teiData.params.groupingStyle);
    }
    function loadParams() {
        // load params.
        var v = localStorage.getItem("defaultNewElement");
        if (v === 'false')
            teimeta.teiData.params.defaultNewElement = false;
        v = localStorage.getItem("validateRequired");
        if (v === 'true')
            teimeta.teiData.params.validateRequired = true;
        v = localStorage.getItem("canRemove");
        if (v === 'true')
            teimeta.teiData.params.canRemove = true;
        v = localStorage.getItem("displayFullpath");
        if (v === 'false')
            teimeta.teiData.params.displayFullpath = false;
        v = localStorage.getItem("groupingStyle");
        if (v)
            teimeta.teiData.params.groupingStyle = v;
        v = localStorage.getItem("language");
        if (v === 'en')
            teimeta.teiData.params.language = v;
        v = localStorage.getItem("leftShift");
        if (v !== '') {
            var vi = parseInt(v);
            if (!isNaN(vi) && vi >= 0 && vi <= 100)
                teimeta.teiData.params.leftShift = vi;
        }
    }
    exports.loadParams = loadParams;
    function link(url) {
        window.open(url, '_blank');
    }
    //resizable(document.getElementById('txt'),7);
    function init(funbodykeys) {
        var el;
        el = document.getElementById('titledate');
        if (el)
            el.textContent = ' - ' + version.version + ' - ' + version.date;
        el = document.getElementsByTagName('body');
        if (el)
            el[0].addEventListener("keydown", funbodykeys);
        /*
        el = document.getElementById('file-open');
        if (el) el.addEventListener("click", events.openXml);
        el = document.getElementById('file-new');
        if (el) el.addEventListener("click", events.newXml);
        el = document.getElementById('file-apply-odd');
        if (el) el.addEventListener("click", events.openOdd);
        el = document.getElementById('file-apply-css');
        if (el) el.addEventListener("click", events.openCss);
        el = document.getElementById('file-clean-css');
        if (el) el.addEventListener("click", events.cleanCss);
        el = document.getElementById('help');
        if (el) el.addEventListener("click", version.about);
        el = document.getElementById('top2-params');
        if (el) el.addEventListener("click", oddParams);
    
        el = document.getElementById('showall');
        if (el) el.addEventListener("click", teimeta.teiData.edit.showAll);
        el = document.getElementById('hideall');
        if (el) el.addEventListener("click", teimeta.teiData.edit.hideAll);
        */
        el = document.getElementById('link-ortolang');
        if (el)
            el.addEventListener("click", function () { link('https://www.ortolang.fr'); });
        el = document.getElementById('link-metadoc');
        if (el)
            el.addEventListener("click", function () { link('http://ct3.ortolang.fr/teimeta-doc/'); });
        el = document.getElementById('link-teiconvert');
        if (el)
            el.addEventListener("click", function () { link('http://ct3.ortolang.fr/teiconvert/'); });
        el = document.getElementById('link-teicorpo');
        if (el)
            el.addEventListener("click", function () { link('http://ct3.ortolang.fr/tei-corpo/'); });
        el = document.getElementById('upload-input-transcript');
        if (el)
            el.addEventListener("change", syscall.openLocalFile);
        //
        if (!window['teimeta'])
            window['teimeta'] = {};
        window['teimeta'].setLeftShift = setLeftShift;
        window['teimeta'].setDispFPath = setDispFPath;
        window['teimeta'].setDefNewElt = setDefNewElt;
        window['teimeta'].setValReq = setValReq;
        window['teimeta'].setCanRm = setCanRm;
        window['teimeta'].setLanguage = setLanguage;
        window['teimeta'].openXml = events.openXml;
        window['teimeta'].newXml = events.newXml;
        window['teimeta'].openOdd = events.openOdd;
        window['teimeta'].openCss = events.openCss;
        window['teimeta'].cleanCss = events.cleanCss;
        window['teimeta'].about = version.about;
        window['teimeta'].oddParams = oddParams;
        window['teimeta'].showAll = teimeta.teiData.edit.showAll;
        window['teimeta'].hideAll = teimeta.teiData.edit.hideAll;
        window['teimeta'].saveLocal = events.saveLocal;
        window['teimeta'].saveAsLocal = events.saveAsLocal;
        window['teimeta'].dumpHtml = events.dumpHtml;
        window['teimeta'].emptyFile = events.emptyFile;
        window['teimeta'].initXml = events.initXml; //Added by Lionel
        window['teimeta'].finishOpenXml = events.finishOpenXml; //Added by Lionel
        window['teimeta'].findOdd = events.findOdd; //Added by Lionel
        window['teimeta'].oddLoadUrl = events.oddLoadUrl; //Added by Lionel
        window['teimeta'].generateTEI = events.generateTEI; //Added by Lionel
    }
    exports.init = init;
    function saveFileLocal(type, name, data) {
        var blob = new Blob([data], {
            type: "text/plain;charset=utf-8"
        });
        // {type: 'text/css'});
        var p1 = name.lastIndexOf('/');
        var p2 = name.lastIndexOf('\\');
        if (p1 < p2)
            p1 = p2;
        if (p1 === -1)
            p1 = 0;
        var l = name.substr(p1);
        saveAs.saveAs(blob, l);
    }
    exports.saveFileLocal = saveFileLocal;
    ;
    function openSpecificLocalFile(oddname, displayname, xmlname, xmldata, funCallback) {
        function fun(err, name, data) {
            // name should be the same as oddname but the user might have changed it
            funCallback(err, name, name, data, xmlname, xmldata);
        }
        alert.askUserModal('The file <b>' + xmlname + '</b> uses a file named <b>' + oddname +
            '</b> - please locate it on you computer.', function (response) {
            if (response)
                syscall.chooseOpenFile(fun);
            else
                fun("cancel", "", "");
        });
    }
    exports.openSpecificLocalFile = openSpecificLocalFile;
    function askUserModalYesNoCancel(s, fun) {
        picoModal({
            content: "<p>" + s + "</p>" +
                "<p class='footer'>" +
                "<button class='yes'>Save</button>" +
                "<button class='no'>Don't save</button>" +
                "<button class='cancel'>Cancel</button> " +
                "</p>"
        }).afterCreate(function (modal) {
            modal.modalElem().addEventListener("click", function (evt) {
                if (evt.target && evt.target.matches(".yes")) {
                    modal.close('yes');
                }
                else if (evt.target && evt.target.matches(".cancel")) {
                    modal.close('cancel');
                }
                else if (evt.target && evt.target.matches(".no")) {
                    modal.close('no');
                }
            });
        }).afterClose(function (modal, event) {
            fun(event.detail);
        }).show();
    }
    exports.askUserModalYesNoCancel = askUserModalYesNoCancel;
    var oddprefdefined = [];
    function oddpredefs(callback) {
        if (oddprefdefined.length < 1) {
            teimeta.readTextFile("./assets/tei_meta/models/models.json", function (err, data) {
                if (!err) {
                    var ds = data.toString();
                    try {
                        var js = JSON.parse(ds);
                        for (var i = 0; i < js.length; i++) {
                            if (js[i].css)
                                js[i].css = './models/' + js[i].css;
                            if (js[i].odd)
                                js[i].odd = './models/' + js[i].odd;
                            if (!js[i].labelcss)
                                js[i].labelcss = "";
                            if (!js[i].css)
                                js[i].css = "";
                        }
                        oddprefdefined = js;
                        console.log("oddpredefs", js);
                        callback(oddprefdefined);
                    }
                    catch (e) {
                        // alert.alertUser('error reading models.json: ' + e.toString());
                        console.log('error reading models.json31:', e);
                        callback(oddprefdefined);
                    }
                }
                else {
                    // alert.alertUser('error reading models.json: ' + data);
                    console.log('error reading models.json 3:', data);
                    callback(oddprefdefined);
                }
            });
        }
        else {
            callback(oddprefdefined);
        } 
    }
    exports.oddpredefs = oddpredefs;


    function askUserModalForOdd(previousname, loaded, fun) {
       function afteroddpredefs(predefs) {
            var askoddInfo = msg.msg('askoddInfo');
            var askoddCurrent = msg.msg('askoddCurrent');
            var askoddLocalOdd = msg.msg('askoddLocalOdd');
            var askoddPredef = msg.msg('askoddPredef');
            //    let askoddOk = msg.msg('ok');
            var askoddCancel = msg.msg('cancel');
            var box = '<div id="aumomodal"><p class="aumo aumotitle">' + askoddInfo + '</p>' +
                (loaded ? "<button class='aumo aumobutton current'>" + askoddCurrent + " " + previousname + "</button>" : "")
                + "<button class='aumo aumobutton computer'>" + askoddLocalOdd + "</button>";
            if (predefs.length === 0) {
                box += "<p class='aumo aumoinfo'>" + "No predefined ODDs" + "</p>";
            }
            else {
                box += '<p class="aumo aumoinfo">' + askoddPredef + "<p/>";
                for (var s = 0; s < predefs.length; s++) {
                    box += "<button class='aumo aumobutton aumoid" + s + "'>" + (predefs)[s].label + "</button>";
                }
            }
            box += "<button class='aumo aumocancel cancel'>" + askoddCancel + "</button></div>";
            picoModal({
                content: box
            }).afterCreate(function (modal) {
                modal.modalElem().addEventListener("click", function (evt) {
                    if (evt.target) {
                        if (evt.target.matches(".current")) {
                            modal.close('current');
                        }
                        else if (evt.target.matches(".computer")) {
                            modal.close('computer');
                        }
                        else if (evt.target.matches(".cancel")) {
                            modal.close('cancel');
                        }
                        else {
                            for (var s = 0; s < predefs.length; s++) {
                                var l = "aumoid" + s;
                                if (evt.target.matches("." + l)) {
                                    modal.close(l);
                                }
                            }
                        }
                    }
                });
            }).afterClose(function (modal, event) {
                fun(event.detail);
            }).show();
       }
       oddpredefs(afteroddpredefs);
      // callback(oddprefdefined);
    }
    exports.askUserModalForOdd = askUserModalForOdd;
    
    
    /***/ }),
    /* 30 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    /**
     * version.ts
     */
    Object.defineProperty(exports, "__esModule", { value: true });
    var alert = __webpack_require__(5);
    var msg = __webpack_require__(7);
    exports.version = '0.6.5';
    exports.date = '17-09-2018';
    function about() {
        var s = msg.msg('versionname') + exports.version + " - " + exports.date + "</br></br>";
        s += msg.msg('shorthelp');
        alert.alertUser(s);
    }
    exports.about = about;
    ;
    
    
    /***/ }),
    /* 31 */
    /***/ (function(module, exports, __webpack_require__) {
    
    var __WEBPACK_AMD_DEFINE_RESULT__;/* FileSaver.js
     * A saveAs() FileSaver implementation.
     * 1.3.2
     * 2016-06-16 18:25:19
     *
     * By Eli Grey, http://eligrey.com
     * License: MIT
     *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
     */
    
    /*global self */
    /*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */
    
    /*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
    
    var saveAs = saveAs || (function(view) {
        "use strict";
        // IE <10 is explicitly unsupported
        if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
            return;
        }
        var
              doc = view.document
              // only get URL when necessary in case Blob.js hasn't overridden it yet
            , get_URL = function() {
                return view.URL || view.webkitURL || view;
            }
            , save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
            , can_use_save_link = "download" in save_link
            , click = function(node) {
                var event = new MouseEvent("click");
                node.dispatchEvent(event);
            }
            , is_safari = /constructor/i.test(view.HTMLElement) || view.safari
            , is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
            , throw_outside = function(ex) {
                (view.setImmediate || view.setTimeout)(function() {
                    throw ex;
                }, 0);
            }
            , force_saveable_type = "application/octet-stream"
            // the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
            , arbitrary_revoke_timeout = 1000 * 40 // in ms
            , revoke = function(file) {
                var revoker = function() {
                    if (typeof file === "string") { // file is an object URL
                        get_URL().revokeObjectURL(file);
                    } else { // file is a File
                        file.remove();
                    }
                };
                setTimeout(revoker, arbitrary_revoke_timeout);
            }
            , dispatch = function(filesaver, event_types, event) {
                event_types = [].concat(event_types);
                var i = event_types.length;
                while (i--) {
                    var listener = filesaver["on" + event_types[i]];
                    if (typeof listener === "function") {
                        try {
                            listener.call(filesaver, event || filesaver);
                        } catch (ex) {
                            throw_outside(ex);
                        }
                    }
                }
            }
            , auto_bom = function(blob) {
                // prepend BOM for UTF-8 XML and text/* types (including HTML)
                // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
                if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
                    return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
                }
                return blob;
            }
            , FileSaver = function(blob, name, no_auto_bom) {
                if (!no_auto_bom) {
                    blob = auto_bom(blob);
                }
                // First try a.download, then web filesystem, then object URLs
                var
                      filesaver = this
                    , type = blob.type
                    , force = type === force_saveable_type
                    , object_url
                    , dispatch_all = function() {
                        dispatch(filesaver, "writestart progress write writeend".split(" "));
                    }
                    // on any filesys errors revert to saving with object URLs
                    , fs_error = function() {
                        if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
                            // Safari doesn't allow downloading of blob urls
                            var reader = new FileReader();
                            reader.onloadend = function() {
                                var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
                                var popup = view.open(url, '_blank');
                                if(!popup) view.location.href = url;
                                url=undefined; // release reference before dispatching
                                filesaver.readyState = filesaver.DONE;
                                dispatch_all();
                            };
                            reader.readAsDataURL(blob);
                            filesaver.readyState = filesaver.INIT;
                            return;
                        }
                        // don't create more object URLs than needed
                        if (!object_url) {
                            object_url = get_URL().createObjectURL(blob);
                        }
                        if (force) {
                            view.location.href = object_url;
                        } else {
                            var opened = view.open(object_url, "_blank");
                            if (!opened) {
                                // Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
                                view.location.href = object_url;
                            }
                        }
                        filesaver.readyState = filesaver.DONE;
                        dispatch_all();
                        revoke(object_url);
                    }
                ;
                filesaver.readyState = filesaver.INIT;
    
                if (can_use_save_link) {
                    object_url = get_URL().createObjectURL(blob);
                    setTimeout(function() {
                        save_link.href = object_url;
                        save_link.download = name;
                        click(save_link);
                        dispatch_all();
                        revoke(object_url);
                        filesaver.readyState = filesaver.DONE;
                    });
                    return;
                }
    
                fs_error();
            }
            , FS_proto = FileSaver.prototype
            , saveAs = function(blob, name, no_auto_bom) {
                return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
            }
        ;
        // IE 10+ (native saveAs)
        if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
            return function(blob, name, no_auto_bom) {
                name = name || blob.name || "download";
    
                if (!no_auto_bom) {
                    blob = auto_bom(blob);
                }
                return navigator.msSaveOrOpenBlob(blob, name);
            };
        }
    
        FS_proto.abort = function(){};
        FS_proto.readyState = FS_proto.INIT = 0;
        FS_proto.WRITING = 1;
        FS_proto.DONE = 2;
    
        FS_proto.error =
        FS_proto.onwritestart =
        FS_proto.onprogress =
        FS_proto.onwrite =
        FS_proto.onabort =
        FS_proto.onerror =
        FS_proto.onwriteend =
            null;
    
        return saveAs;
    }(
           typeof self !== "undefined" && self
        || typeof window !== "undefined" && window
        || this.content
    ));
    // `self` is undefined in Firefox for Android content script context
    // while `this` is nsIContentFrameMessageManager
    // with an attribute `content` that corresponds to the window
    
    if (typeof module !== "undefined" && module.exports) {
      module.exports.saveAs = saveAs;
    } else if (("function" !== "undefined" && __webpack_require__(32) !== null) && (__webpack_require__(33) !== null)) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return saveAs;
      }).call(exports, __webpack_require__, exports, module),
                    __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    
    
    /***/ }),
    /* 32 */
    /***/ (function(module, exports) {
    
    module.exports = function() {
        throw new Error("define cannot be used indirect");
    };
    
    
    /***/ }),
    /* 33 */
    /***/ (function(module, exports) {
    
    /* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
    module.exports = __webpack_amd_options__;
    
    /* WEBPACK VAR INJECTION */}.call(this, {}))
    
    /***/ }),
    /* 34 */
    /***/ (function(module, exports, __webpack_require__) {
    
    // style-loader: Adds some css to the DOM by adding a <style> tag
    
    // load the styles
    var content = __webpack_require__(35);
    if(typeof content === 'string') content = [[module.i, content, '']];
    // add the styles to the DOM
    var update = __webpack_require__(47)(content, {});
    if(content.locals) module.exports = content.locals;
    // Hot Module Replacement
    if(false) {}
    
    /***/ }),
    /* 35 */
    /***/ (function(module, exports, __webpack_require__) {
    
    exports = module.exports = __webpack_require__(36)(undefined);
    // imports
    
    
    // module
    exports.push([module.i, "/*!\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */@font-face{font-family:'FontAwesome';src:url(" + __webpack_require__(41) + ");src:url(" + __webpack_require__(42) + "?#iefix&v=4.7.0) format('embedded-opentype'),url(" + __webpack_require__(43) + ") format('woff2'),url(" + __webpack_require__(44) + ") format('woff'),url(" + __webpack_require__(45) + ") format('truetype'),url(" + __webpack_require__(46) + "#fontawesomeregular) format('svg');font-weight:normal;font-style:normal}.fa{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-lg{font-size:1.33333333em;line-height:.75em;vertical-align:-15%}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-fw{width:1.28571429em;text-align:center}.fa-ul{padding-left:0;margin-left:2.14285714em;list-style-type:none}.fa-ul>li{position:relative}.fa-li{position:absolute;left:-2.14285714em;width:2.14285714em;top:.14285714em;text-align:center}.fa-li.fa-lg{left:-1.85714286em}.fa-border{padding:.2em .25em .15em;border:solid .08em #eee;border-radius:.1em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa.fa-pull-left{margin-right:.3em}.fa.fa-pull-right{margin-left:.3em}.pull-right{float:right}.pull-left{float:left}.fa.pull-left{margin-right:.3em}.fa.pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.fa-rotate-90{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";-webkit-transform:scale(-1, 1);-ms-transform:scale(-1, 1);transform:scale(-1, 1)}.fa-flip-vertical{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";-webkit-transform:scale(1, -1);-ms-transform:scale(1, -1);transform:scale(1, -1)}:root .fa-rotate-90,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-flip-horizontal,:root .fa-flip-vertical{filter:none}.fa-stack{position:relative;display:inline-block;width:2em;height:2em;line-height:2em;vertical-align:middle}.fa-stack-1x,.fa-stack-2x{position:absolute;left:0;width:100%;text-align:center}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:#fff}.fa-glass:before{content:\"\\F000\"}.fa-music:before{content:\"\\F001\"}.fa-search:before{content:\"\\F002\"}.fa-envelope-o:before{content:\"\\F003\"}.fa-heart:before{content:\"\\F004\"}.fa-star:before{content:\"\\F005\"}.fa-star-o:before{content:\"\\F006\"}.fa-user:before{content:\"\\F007\"}.fa-film:before{content:\"\\F008\"}.fa-th-large:before{content:\"\\F009\"}.fa-th:before{content:\"\\F00A\"}.fa-th-list:before{content:\"\\F00B\"}.fa-check:before{content:\"\\F00C\"}.fa-remove:before,.fa-close:before,.fa-times:before{content:\"\\F00D\"}.fa-search-plus:before{content:\"\\F00E\"}.fa-search-minus:before{content:\"\\F010\"}.fa-power-off:before{content:\"\\F011\"}.fa-signal:before{content:\"\\F012\"}.fa-gear:before,.fa-cog:before{content:\"\\F013\"}.fa-trash-o:before{content:\"\\F014\"}.fa-home:before{content:\"\\F015\"}.fa-file-o:before{content:\"\\F016\"}.fa-clock-o:before{content:\"\\F017\"}.fa-road:before{content:\"\\F018\"}.fa-download:before{content:\"\\F019\"}.fa-arrow-circle-o-down:before{content:\"\\F01A\"}.fa-arrow-circle-o-up:before{content:\"\\F01B\"}.fa-inbox:before{content:\"\\F01C\"}.fa-play-circle-o:before{content:\"\\F01D\"}.fa-rotate-right:before,.fa-repeat:before{content:\"\\F01E\"}.fa-refresh:before{content:\"\\F021\"}.fa-list-alt:before{content:\"\\F022\"}.fa-lock:before{content:\"\\F023\"}.fa-flag:before{content:\"\\F024\"}.fa-headphones:before{content:\"\\F025\"}.fa-volume-off:before{content:\"\\F026\"}.fa-volume-down:before{content:\"\\F027\"}.fa-volume-up:before{content:\"\\F028\"}.fa-qrcode:before{content:\"\\F029\"}.fa-barcode:before{content:\"\\F02A\"}.fa-tag:before{content:\"\\F02B\"}.fa-tags:before{content:\"\\F02C\"}.fa-book:before{content:\"\\F02D\"}.fa-bookmark:before{content:\"\\F02E\"}.fa-print:before{content:\"\\F02F\"}.fa-camera:before{content:\"\\F030\"}.fa-font:before{content:\"\\F031\"}.fa-bold:before{content:\"\\F032\"}.fa-italic:before{content:\"\\F033\"}.fa-text-height:before{content:\"\\F034\"}.fa-text-width:before{content:\"\\F035\"}.fa-align-left:before{content:\"\\F036\"}.fa-align-center:before{content:\"\\F037\"}.fa-align-right:before{content:\"\\F038\"}.fa-align-justify:before{content:\"\\F039\"}.fa-list:before{content:\"\\F03A\"}.fa-dedent:before,.fa-outdent:before{content:\"\\F03B\"}.fa-indent:before{content:\"\\F03C\"}.fa-video-camera:before{content:\"\\F03D\"}.fa-photo:before,.fa-image:before,.fa-picture-o:before{content:\"\\F03E\"}.fa-pencil:before{content:\"\\F040\"}.fa-map-marker:before{content:\"\\F041\"}.fa-adjust:before{content:\"\\F042\"}.fa-tint:before{content:\"\\F043\"}.fa-edit:before,.fa-pencil-square-o:before{content:\"\\F044\"}.fa-share-square-o:before{content:\"\\F045\"}.fa-check-square-o:before{content:\"\\F046\"}.fa-arrows:before{content:\"\\F047\"}.fa-step-backward:before{content:\"\\F048\"}.fa-fast-backward:before{content:\"\\F049\"}.fa-backward:before{content:\"\\F04A\"}.fa-play:before{content:\"\\F04B\"}.fa-pause:before{content:\"\\F04C\"}.fa-stop:before{content:\"\\F04D\"}.fa-forward:before{content:\"\\F04E\"}.fa-fast-forward:before{content:\"\\F050\"}.fa-step-forward:before{content:\"\\F051\"}.fa-eject:before{content:\"\\F052\"}.fa-chevron-left:before{content:\"\\F053\"}.fa-chevron-right:before{content:\"\\F054\"}.fa-plus-circle:before{content:\"\\F055\"}.fa-minus-circle:before{content:\"\\F056\"}.fa-times-circle:before{content:\"\\F057\"}.fa-check-circle:before{content:\"\\F058\"}.fa-question-circle:before{content:\"\\F059\"}.fa-info-circle:before{content:\"\\F05A\"}.fa-crosshairs:before{content:\"\\F05B\"}.fa-times-circle-o:before{content:\"\\F05C\"}.fa-check-circle-o:before{content:\"\\F05D\"}.fa-ban:before{content:\"\\F05E\"}.fa-arrow-left:before{content:\"\\F060\"}.fa-arrow-right:before{content:\"\\F061\"}.fa-arrow-up:before{content:\"\\F062\"}.fa-arrow-down:before{content:\"\\F063\"}.fa-mail-forward:before,.fa-share:before{content:\"\\F064\"}.fa-expand:before{content:\"\\F065\"}.fa-compress:before{content:\"\\F066\"}.fa-plus:before{content:\"\\F067\"}.fa-minus:before{content:\"\\F068\"}.fa-asterisk:before{content:\"\\F069\"}.fa-exclamation-circle:before{content:\"\\F06A\"}.fa-gift:before{content:\"\\F06B\"}.fa-leaf:before{content:\"\\F06C\"}.fa-fire:before{content:\"\\F06D\"}.fa-eye:before{content:\"\\F06E\"}.fa-eye-slash:before{content:\"\\F070\"}.fa-warning:before,.fa-exclamation-triangle:before{content:\"\\F071\"}.fa-plane:before{content:\"\\F072\"}.fa-calendar:before{content:\"\\F073\"}.fa-random:before{content:\"\\F074\"}.fa-comment:before{content:\"\\F075\"}.fa-magnet:before{content:\"\\F076\"}.fa-chevron-up:before{content:\"\\F077\"}.fa-chevron-down:before{content:\"\\F078\"}.fa-retweet:before{content:\"\\F079\"}.fa-shopping-cart:before{content:\"\\F07A\"}.fa-folder:before{content:\"\\F07B\"}.fa-folder-open:before{content:\"\\F07C\"}.fa-arrows-v:before{content:\"\\F07D\"}.fa-arrows-h:before{content:\"\\F07E\"}.fa-bar-chart-o:before,.fa-bar-chart:before{content:\"\\F080\"}.fa-twitter-square:before{content:\"\\F081\"}.fa-facebook-square:before{content:\"\\F082\"}.fa-camera-retro:before{content:\"\\F083\"}.fa-key:before{content:\"\\F084\"}.fa-gears:before,.fa-cogs:before{content:\"\\F085\"}.fa-comments:before{content:\"\\F086\"}.fa-thumbs-o-up:before{content:\"\\F087\"}.fa-thumbs-o-down:before{content:\"\\F088\"}.fa-star-half:before{content:\"\\F089\"}.fa-heart-o:before{content:\"\\F08A\"}.fa-sign-out:before{content:\"\\F08B\"}.fa-linkedin-square:before{content:\"\\F08C\"}.fa-thumb-tack:before{content:\"\\F08D\"}.fa-external-link:before{content:\"\\F08E\"}.fa-sign-in:before{content:\"\\F090\"}.fa-trophy:before{content:\"\\F091\"}.fa-github-square:before{content:\"\\F092\"}.fa-upload:before{content:\"\\F093\"}.fa-lemon-o:before{content:\"\\F094\"}.fa-phone:before{content:\"\\F095\"}.fa-square-o:before{content:\"\\F096\"}.fa-bookmark-o:before{content:\"\\F097\"}.fa-phone-square:before{content:\"\\F098\"}.fa-twitter:before{content:\"\\F099\"}.fa-facebook-f:before,.fa-facebook:before{content:\"\\F09A\"}.fa-github:before{content:\"\\F09B\"}.fa-unlock:before{content:\"\\F09C\"}.fa-credit-card:before{content:\"\\F09D\"}.fa-feed:before,.fa-rss:before{content:\"\\F09E\"}.fa-hdd-o:before{content:\"\\F0A0\"}.fa-bullhorn:before{content:\"\\F0A1\"}.fa-bell:before{content:\"\\F0F3\"}.fa-certificate:before{content:\"\\F0A3\"}.fa-hand-o-right:before{content:\"\\F0A4\"}.fa-hand-o-left:before{content:\"\\F0A5\"}.fa-hand-o-up:before{content:\"\\F0A6\"}.fa-hand-o-down:before{content:\"\\F0A7\"}.fa-arrow-circle-left:before{content:\"\\F0A8\"}.fa-arrow-circle-right:before{content:\"\\F0A9\"}.fa-arrow-circle-up:before{content:\"\\F0AA\"}.fa-arrow-circle-down:before{content:\"\\F0AB\"}.fa-globe:before{content:\"\\F0AC\"}.fa-wrench:before{content:\"\\F0AD\"}.fa-tasks:before{content:\"\\F0AE\"}.fa-filter:before{content:\"\\F0B0\"}.fa-briefcase:before{content:\"\\F0B1\"}.fa-arrows-alt:before{content:\"\\F0B2\"}.fa-group:before,.fa-users:before{content:\"\\F0C0\"}.fa-chain:before,.fa-link:before{content:\"\\F0C1\"}.fa-cloud:before{content:\"\\F0C2\"}.fa-flask:before{content:\"\\F0C3\"}.fa-cut:before,.fa-scissors:before{content:\"\\F0C4\"}.fa-copy:before,.fa-files-o:before{content:\"\\F0C5\"}.fa-paperclip:before{content:\"\\F0C6\"}.fa-save:before,.fa-floppy-o:before{content:\"\\F0C7\"}.fa-square:before{content:\"\\F0C8\"}.fa-navicon:before,.fa-reorder:before,.fa-bars:before{content:\"\\F0C9\"}.fa-list-ul:before{content:\"\\F0CA\"}.fa-list-ol:before{content:\"\\F0CB\"}.fa-strikethrough:before{content:\"\\F0CC\"}.fa-underline:before{content:\"\\F0CD\"}.fa-table:before{content:\"\\F0CE\"}.fa-magic:before{content:\"\\F0D0\"}.fa-truck:before{content:\"\\F0D1\"}.fa-pinterest:before{content:\"\\F0D2\"}.fa-pinterest-square:before{content:\"\\F0D3\"}.fa-google-plus-square:before{content:\"\\F0D4\"}.fa-google-plus:before{content:\"\\F0D5\"}.fa-money:before{content:\"\\F0D6\"}.fa-caret-down:before{content:\"\\F0D7\"}.fa-caret-up:before{content:\"\\F0D8\"}.fa-caret-left:before{content:\"\\F0D9\"}.fa-caret-right:before{content:\"\\F0DA\"}.fa-columns:before{content:\"\\F0DB\"}.fa-unsorted:before,.fa-sort:before{content:\"\\F0DC\"}.fa-sort-down:before,.fa-sort-desc:before{content:\"\\F0DD\"}.fa-sort-up:before,.fa-sort-asc:before{content:\"\\F0DE\"}.fa-envelope:before{content:\"\\F0E0\"}.fa-linkedin:before{content:\"\\F0E1\"}.fa-rotate-left:before,.fa-undo:before{content:\"\\F0E2\"}.fa-legal:before,.fa-gavel:before{content:\"\\F0E3\"}.fa-dashboard:before,.fa-tachometer:before{content:\"\\F0E4\"}.fa-comment-o:before{content:\"\\F0E5\"}.fa-comments-o:before{content:\"\\F0E6\"}.fa-flash:before,.fa-bolt:before{content:\"\\F0E7\"}.fa-sitemap:before{content:\"\\F0E8\"}.fa-umbrella:before{content:\"\\F0E9\"}.fa-paste:before,.fa-clipboard:before{content:\"\\F0EA\"}.fa-lightbulb-o:before{content:\"\\F0EB\"}.fa-exchange:before{content:\"\\F0EC\"}.fa-cloud-download:before{content:\"\\F0ED\"}.fa-cloud-upload:before{content:\"\\F0EE\"}.fa-user-md:before{content:\"\\F0F0\"}.fa-stethoscope:before{content:\"\\F0F1\"}.fa-suitcase:before{content:\"\\F0F2\"}.fa-bell-o:before{content:\"\\F0A2\"}.fa-coffee:before{content:\"\\F0F4\"}.fa-cutlery:before{content:\"\\F0F5\"}.fa-file-text-o:before{content:\"\\F0F6\"}.fa-building-o:before{content:\"\\F0F7\"}.fa-hospital-o:before{content:\"\\F0F8\"}.fa-ambulance:before{content:\"\\F0F9\"}.fa-medkit:before{content:\"\\F0FA\"}.fa-fighter-jet:before{content:\"\\F0FB\"}.fa-beer:before{content:\"\\F0FC\"}.fa-h-square:before{content:\"\\F0FD\"}.fa-plus-square:before{content:\"\\F0FE\"}.fa-angle-double-left:before{content:\"\\F100\"}.fa-angle-double-right:before{content:\"\\F101\"}.fa-angle-double-up:before{content:\"\\F102\"}.fa-angle-double-down:before{content:\"\\F103\"}.fa-angle-left:before{content:\"\\F104\"}.fa-angle-right:before{content:\"\\F105\"}.fa-angle-up:before{content:\"\\F106\"}.fa-angle-down:before{content:\"\\F107\"}.fa-desktop:before{content:\"\\F108\"}.fa-laptop:before{content:\"\\F109\"}.fa-tablet:before{content:\"\\F10A\"}.fa-mobile-phone:before,.fa-mobile:before{content:\"\\F10B\"}.fa-circle-o:before{content:\"\\F10C\"}.fa-quote-left:before{content:\"\\F10D\"}.fa-quote-right:before{content:\"\\F10E\"}.fa-spinner:before{content:\"\\F110\"}.fa-circle:before{content:\"\\F111\"}.fa-mail-reply:before,.fa-reply:before{content:\"\\F112\"}.fa-github-alt:before{content:\"\\F113\"}.fa-folder-o:before{content:\"\\F114\"}.fa-folder-open-o:before{content:\"\\F115\"}.fa-smile-o:before{content:\"\\F118\"}.fa-frown-o:before{content:\"\\F119\"}.fa-meh-o:before{content:\"\\F11A\"}.fa-gamepad:before{content:\"\\F11B\"}.fa-keyboard-o:before{content:\"\\F11C\"}.fa-flag-o:before{content:\"\\F11D\"}.fa-flag-checkered:before{content:\"\\F11E\"}.fa-terminal:before{content:\"\\F120\"}.fa-code:before{content:\"\\F121\"}.fa-mail-reply-all:before,.fa-reply-all:before{content:\"\\F122\"}.fa-star-half-empty:before,.fa-star-half-full:before,.fa-star-half-o:before{content:\"\\F123\"}.fa-location-arrow:before{content:\"\\F124\"}.fa-crop:before{content:\"\\F125\"}.fa-code-fork:before{content:\"\\F126\"}.fa-unlink:before,.fa-chain-broken:before{content:\"\\F127\"}.fa-question:before{content:\"\\F128\"}.fa-info:before{content:\"\\F129\"}.fa-exclamation:before{content:\"\\F12A\"}.fa-superscript:before{content:\"\\F12B\"}.fa-subscript:before{content:\"\\F12C\"}.fa-eraser:before{content:\"\\F12D\"}.fa-puzzle-piece:before{content:\"\\F12E\"}.fa-microphone:before{content:\"\\F130\"}.fa-microphone-slash:before{content:\"\\F131\"}.fa-shield:before{content:\"\\F132\"}.fa-calendar-o:before{content:\"\\F133\"}.fa-fire-extinguisher:before{content:\"\\F134\"}.fa-rocket:before{content:\"\\F135\"}.fa-maxcdn:before{content:\"\\F136\"}.fa-chevron-circle-left:before{content:\"\\F137\"}.fa-chevron-circle-right:before{content:\"\\F138\"}.fa-chevron-circle-up:before{content:\"\\F139\"}.fa-chevron-circle-down:before{content:\"\\F13A\"}.fa-html5:before{content:\"\\F13B\"}.fa-css3:before{content:\"\\F13C\"}.fa-anchor:before{content:\"\\F13D\"}.fa-unlock-alt:before{content:\"\\F13E\"}.fa-bullseye:before{content:\"\\F140\"}.fa-ellipsis-h:before{content:\"\\F141\"}.fa-ellipsis-v:before{content:\"\\F142\"}.fa-rss-square:before{content:\"\\F143\"}.fa-play-circle:before{content:\"\\F144\"}.fa-ticket:before{content:\"\\F145\"}.fa-minus-square:before{content:\"\\F146\"}.fa-minus-square-o:before{content:\"\\F147\"}.fa-level-up:before{content:\"\\F148\"}.fa-level-down:before{content:\"\\F149\"}.fa-check-square:before{content:\"\\F14A\"}.fa-pencil-square:before{content:\"\\F14B\"}.fa-external-link-square:before{content:\"\\F14C\"}.fa-share-square:before{content:\"\\F14D\"}.fa-compass:before{content:\"\\F14E\"}.fa-toggle-down:before,.fa-caret-square-o-down:before{content:\"\\F150\"}.fa-toggle-up:before,.fa-caret-square-o-up:before{content:\"\\F151\"}.fa-toggle-right:before,.fa-caret-square-o-right:before{content:\"\\F152\"}.fa-euro:before,.fa-eur:before{content:\"\\F153\"}.fa-gbp:before{content:\"\\F154\"}.fa-dollar:before,.fa-usd:before{content:\"\\F155\"}.fa-rupee:before,.fa-inr:before{content:\"\\F156\"}.fa-cny:before,.fa-rmb:before,.fa-yen:before,.fa-jpy:before{content:\"\\F157\"}.fa-ruble:before,.fa-rouble:before,.fa-rub:before{content:\"\\F158\"}.fa-won:before,.fa-krw:before{content:\"\\F159\"}.fa-bitcoin:before,.fa-btc:before{content:\"\\F15A\"}.fa-file:before{content:\"\\F15B\"}.fa-file-text:before{content:\"\\F15C\"}.fa-sort-alpha-asc:before{content:\"\\F15D\"}.fa-sort-alpha-desc:before{content:\"\\F15E\"}.fa-sort-amount-asc:before{content:\"\\F160\"}.fa-sort-amount-desc:before{content:\"\\F161\"}.fa-sort-numeric-asc:before{content:\"\\F162\"}.fa-sort-numeric-desc:before{content:\"\\F163\"}.fa-thumbs-up:before{content:\"\\F164\"}.fa-thumbs-down:before{content:\"\\F165\"}.fa-youtube-square:before{content:\"\\F166\"}.fa-youtube:before{content:\"\\F167\"}.fa-xing:before{content:\"\\F168\"}.fa-xing-square:before{content:\"\\F169\"}.fa-youtube-play:before{content:\"\\F16A\"}.fa-dropbox:before{content:\"\\F16B\"}.fa-stack-overflow:before{content:\"\\F16C\"}.fa-instagram:before{content:\"\\F16D\"}.fa-flickr:before{content:\"\\F16E\"}.fa-adn:before{content:\"\\F170\"}.fa-bitbucket:before{content:\"\\F171\"}.fa-bitbucket-square:before{content:\"\\F172\"}.fa-tumblr:before{content:\"\\F173\"}.fa-tumblr-square:before{content:\"\\F174\"}.fa-long-arrow-down:before{content:\"\\F175\"}.fa-long-arrow-up:before{content:\"\\F176\"}.fa-long-arrow-left:before{content:\"\\F177\"}.fa-long-arrow-right:before{content:\"\\F178\"}.fa-apple:before{content:\"\\F179\"}.fa-windows:before{content:\"\\F17A\"}.fa-android:before{content:\"\\F17B\"}.fa-linux:before{content:\"\\F17C\"}.fa-dribbble:before{content:\"\\F17D\"}.fa-skype:before{content:\"\\F17E\"}.fa-foursquare:before{content:\"\\F180\"}.fa-trello:before{content:\"\\F181\"}.fa-female:before{content:\"\\F182\"}.fa-male:before{content:\"\\F183\"}.fa-gittip:before,.fa-gratipay:before{content:\"\\F184\"}.fa-sun-o:before{content:\"\\F185\"}.fa-moon-o:before{content:\"\\F186\"}.fa-archive:before{content:\"\\F187\"}.fa-bug:before{content:\"\\F188\"}.fa-vk:before{content:\"\\F189\"}.fa-weibo:before{content:\"\\F18A\"}.fa-renren:before{content:\"\\F18B\"}.fa-pagelines:before{content:\"\\F18C\"}.fa-stack-exchange:before{content:\"\\F18D\"}.fa-arrow-circle-o-right:before{content:\"\\F18E\"}.fa-arrow-circle-o-left:before{content:\"\\F190\"}.fa-toggle-left:before,.fa-caret-square-o-left:before{content:\"\\F191\"}.fa-dot-circle-o:before{content:\"\\F192\"}.fa-wheelchair:before{content:\"\\F193\"}.fa-vimeo-square:before{content:\"\\F194\"}.fa-turkish-lira:before,.fa-try:before{content:\"\\F195\"}.fa-plus-square-o:before{content:\"\\F196\"}.fa-space-shuttle:before{content:\"\\F197\"}.fa-slack:before{content:\"\\F198\"}.fa-envelope-square:before{content:\"\\F199\"}.fa-wordpress:before{content:\"\\F19A\"}.fa-openid:before{content:\"\\F19B\"}.fa-institution:before,.fa-bank:before,.fa-university:before{content:\"\\F19C\"}.fa-mortar-board:before,.fa-graduation-cap:before{content:\"\\F19D\"}.fa-yahoo:before{content:\"\\F19E\"}.fa-google:before{content:\"\\F1A0\"}.fa-reddit:before{content:\"\\F1A1\"}.fa-reddit-square:before{content:\"\\F1A2\"}.fa-stumbleupon-circle:before{content:\"\\F1A3\"}.fa-stumbleupon:before{content:\"\\F1A4\"}.fa-delicious:before{content:\"\\F1A5\"}.fa-digg:before{content:\"\\F1A6\"}.fa-pied-piper-pp:before{content:\"\\F1A7\"}.fa-pied-piper-alt:before{content:\"\\F1A8\"}.fa-drupal:before{content:\"\\F1A9\"}.fa-joomla:before{content:\"\\F1AA\"}.fa-language:before{content:\"\\F1AB\"}.fa-fax:before{content:\"\\F1AC\"}.fa-building:before{content:\"\\F1AD\"}.fa-child:before{content:\"\\F1AE\"}.fa-paw:before{content:\"\\F1B0\"}.fa-spoon:before{content:\"\\F1B1\"}.fa-cube:before{content:\"\\F1B2\"}.fa-cubes:before{content:\"\\F1B3\"}.fa-behance:before{content:\"\\F1B4\"}.fa-behance-square:before{content:\"\\F1B5\"}.fa-steam:before{content:\"\\F1B6\"}.fa-steam-square:before{content:\"\\F1B7\"}.fa-recycle:before{content:\"\\F1B8\"}.fa-automobile:before,.fa-car:before{content:\"\\F1B9\"}.fa-cab:before,.fa-taxi:before{content:\"\\F1BA\"}.fa-tree:before{content:\"\\F1BB\"}.fa-spotify:before{content:\"\\F1BC\"}.fa-deviantart:before{content:\"\\F1BD\"}.fa-soundcloud:before{content:\"\\F1BE\"}.fa-database:before{content:\"\\F1C0\"}.fa-file-pdf-o:before{content:\"\\F1C1\"}.fa-file-word-o:before{content:\"\\F1C2\"}.fa-file-excel-o:before{content:\"\\F1C3\"}.fa-file-powerpoint-o:before{content:\"\\F1C4\"}.fa-file-photo-o:before,.fa-file-picture-o:before,.fa-file-image-o:before{content:\"\\F1C5\"}.fa-file-zip-o:before,.fa-file-archive-o:before{content:\"\\F1C6\"}.fa-file-sound-o:before,.fa-file-audio-o:before{content:\"\\F1C7\"}.fa-file-movie-o:before,.fa-file-video-o:before{content:\"\\F1C8\"}.fa-file-code-o:before{content:\"\\F1C9\"}.fa-vine:before{content:\"\\F1CA\"}.fa-codepen:before{content:\"\\F1CB\"}.fa-jsfiddle:before{content:\"\\F1CC\"}.fa-life-bouy:before,.fa-life-buoy:before,.fa-life-saver:before,.fa-support:before,.fa-life-ring:before{content:\"\\F1CD\"}.fa-circle-o-notch:before{content:\"\\F1CE\"}.fa-ra:before,.fa-resistance:before,.fa-rebel:before{content:\"\\F1D0\"}.fa-ge:before,.fa-empire:before{content:\"\\F1D1\"}.fa-git-square:before{content:\"\\F1D2\"}.fa-git:before{content:\"\\F1D3\"}.fa-y-combinator-square:before,.fa-yc-square:before,.fa-hacker-news:before{content:\"\\F1D4\"}.fa-tencent-weibo:before{content:\"\\F1D5\"}.fa-qq:before{content:\"\\F1D6\"}.fa-wechat:before,.fa-weixin:before{content:\"\\F1D7\"}.fa-send:before,.fa-paper-plane:before{content:\"\\F1D8\"}.fa-send-o:before,.fa-paper-plane-o:before{content:\"\\F1D9\"}.fa-history:before{content:\"\\F1DA\"}.fa-circle-thin:before{content:\"\\F1DB\"}.fa-header:before{content:\"\\F1DC\"}.fa-paragraph:before{content:\"\\F1DD\"}.fa-sliders:before{content:\"\\F1DE\"}.fa-share-alt:before{content:\"\\F1E0\"}.fa-share-alt-square:before{content:\"\\F1E1\"}.fa-bomb:before{content:\"\\F1E2\"}.fa-soccer-ball-o:before,.fa-futbol-o:before{content:\"\\F1E3\"}.fa-tty:before{content:\"\\F1E4\"}.fa-binoculars:before{content:\"\\F1E5\"}.fa-plug:before{content:\"\\F1E6\"}.fa-slideshare:before{content:\"\\F1E7\"}.fa-twitch:before{content:\"\\F1E8\"}.fa-yelp:before{content:\"\\F1E9\"}.fa-newspaper-o:before{content:\"\\F1EA\"}.fa-wifi:before{content:\"\\F1EB\"}.fa-calculator:before{content:\"\\F1EC\"}.fa-paypal:before{content:\"\\F1ED\"}.fa-google-wallet:before{content:\"\\F1EE\"}.fa-cc-visa:before{content:\"\\F1F0\"}.fa-cc-mastercard:before{content:\"\\F1F1\"}.fa-cc-discover:before{content:\"\\F1F2\"}.fa-cc-amex:before{content:\"\\F1F3\"}.fa-cc-paypal:before{content:\"\\F1F4\"}.fa-cc-stripe:before{content:\"\\F1F5\"}.fa-bell-slash:before{content:\"\\F1F6\"}.fa-bell-slash-o:before{content:\"\\F1F7\"}.fa-trash:before{content:\"\\F1F8\"}.fa-copyright:before{content:\"\\F1F9\"}.fa-at:before{content:\"\\F1FA\"}.fa-eyedropper:before{content:\"\\F1FB\"}.fa-paint-brush:before{content:\"\\F1FC\"}.fa-birthday-cake:before{content:\"\\F1FD\"}.fa-area-chart:before{content:\"\\F1FE\"}.fa-pie-chart:before{content:\"\\F200\"}.fa-line-chart:before{content:\"\\F201\"}.fa-lastfm:before{content:\"\\F202\"}.fa-lastfm-square:before{content:\"\\F203\"}.fa-toggle-off:before{content:\"\\F204\"}.fa-toggle-on:before{content:\"\\F205\"}.fa-bicycle:before{content:\"\\F206\"}.fa-bus:before{content:\"\\F207\"}.fa-ioxhost:before{content:\"\\F208\"}.fa-angellist:before{content:\"\\F209\"}.fa-cc:before{content:\"\\F20A\"}.fa-shekel:before,.fa-sheqel:before,.fa-ils:before{content:\"\\F20B\"}.fa-meanpath:before{content:\"\\F20C\"}.fa-buysellads:before{content:\"\\F20D\"}.fa-connectdevelop:before{content:\"\\F20E\"}.fa-dashcube:before{content:\"\\F210\"}.fa-forumbee:before{content:\"\\F211\"}.fa-leanpub:before{content:\"\\F212\"}.fa-sellsy:before{content:\"\\F213\"}.fa-shirtsinbulk:before{content:\"\\F214\"}.fa-simplybuilt:before{content:\"\\F215\"}.fa-skyatlas:before{content:\"\\F216\"}.fa-cart-plus:before{content:\"\\F217\"}.fa-cart-arrow-down:before{content:\"\\F218\"}.fa-diamond:before{content:\"\\F219\"}.fa-ship:before{content:\"\\F21A\"}.fa-user-secret:before{content:\"\\F21B\"}.fa-motorcycle:before{content:\"\\F21C\"}.fa-street-view:before{content:\"\\F21D\"}.fa-heartbeat:before{content:\"\\F21E\"}.fa-venus:before{content:\"\\F221\"}.fa-mars:before{content:\"\\F222\"}.fa-mercury:before{content:\"\\F223\"}.fa-intersex:before,.fa-transgender:before{content:\"\\F224\"}.fa-transgender-alt:before{content:\"\\F225\"}.fa-venus-double:before{content:\"\\F226\"}.fa-mars-double:before{content:\"\\F227\"}.fa-venus-mars:before{content:\"\\F228\"}.fa-mars-stroke:before{content:\"\\F229\"}.fa-mars-stroke-v:before{content:\"\\F22A\"}.fa-mars-stroke-h:before{content:\"\\F22B\"}.fa-neuter:before{content:\"\\F22C\"}.fa-genderless:before{content:\"\\F22D\"}.fa-facebook-official:before{content:\"\\F230\"}.fa-pinterest-p:before{content:\"\\F231\"}.fa-whatsapp:before{content:\"\\F232\"}.fa-server:before{content:\"\\F233\"}.fa-user-plus:before{content:\"\\F234\"}.fa-user-times:before{content:\"\\F235\"}.fa-hotel:before,.fa-bed:before{content:\"\\F236\"}.fa-viacoin:before{content:\"\\F237\"}.fa-train:before{content:\"\\F238\"}.fa-subway:before{content:\"\\F239\"}.fa-medium:before{content:\"\\F23A\"}.fa-yc:before,.fa-y-combinator:before{content:\"\\F23B\"}.fa-optin-monster:before{content:\"\\F23C\"}.fa-opencart:before{content:\"\\F23D\"}.fa-expeditedssl:before{content:\"\\F23E\"}.fa-battery-4:before,.fa-battery:before,.fa-battery-full:before{content:\"\\F240\"}.fa-battery-3:before,.fa-battery-three-quarters:before{content:\"\\F241\"}.fa-battery-2:before,.fa-battery-half:before{content:\"\\F242\"}.fa-battery-1:before,.fa-battery-quarter:before{content:\"\\F243\"}.fa-battery-0:before,.fa-battery-empty:before{content:\"\\F244\"}.fa-mouse-pointer:before{content:\"\\F245\"}.fa-i-cursor:before{content:\"\\F246\"}.fa-object-group:before{content:\"\\F247\"}.fa-object-ungroup:before{content:\"\\F248\"}.fa-sticky-note:before{content:\"\\F249\"}.fa-sticky-note-o:before{content:\"\\F24A\"}.fa-cc-jcb:before{content:\"\\F24B\"}.fa-cc-diners-club:before{content:\"\\F24C\"}.fa-clone:before{content:\"\\F24D\"}.fa-balance-scale:before{content:\"\\F24E\"}.fa-hourglass-o:before{content:\"\\F250\"}.fa-hourglass-1:before,.fa-hourglass-start:before{content:\"\\F251\"}.fa-hourglass-2:before,.fa-hourglass-half:before{content:\"\\F252\"}.fa-hourglass-3:before,.fa-hourglass-end:before{content:\"\\F253\"}.fa-hourglass:before{content:\"\\F254\"}.fa-hand-grab-o:before,.fa-hand-rock-o:before{content:\"\\F255\"}.fa-hand-stop-o:before,.fa-hand-paper-o:before{content:\"\\F256\"}.fa-hand-scissors-o:before{content:\"\\F257\"}.fa-hand-lizard-o:before{content:\"\\F258\"}.fa-hand-spock-o:before{content:\"\\F259\"}.fa-hand-pointer-o:before{content:\"\\F25A\"}.fa-hand-peace-o:before{content:\"\\F25B\"}.fa-trademark:before{content:\"\\F25C\"}.fa-registered:before{content:\"\\F25D\"}.fa-creative-commons:before{content:\"\\F25E\"}.fa-gg:before{content:\"\\F260\"}.fa-gg-circle:before{content:\"\\F261\"}.fa-tripadvisor:before{content:\"\\F262\"}.fa-odnoklassniki:before{content:\"\\F263\"}.fa-odnoklassniki-square:before{content:\"\\F264\"}.fa-get-pocket:before{content:\"\\F265\"}.fa-wikipedia-w:before{content:\"\\F266\"}.fa-safari:before{content:\"\\F267\"}.fa-chrome:before{content:\"\\F268\"}.fa-firefox:before{content:\"\\F269\"}.fa-opera:before{content:\"\\F26A\"}.fa-internet-explorer:before{content:\"\\F26B\"}.fa-tv:before,.fa-television:before{content:\"\\F26C\"}.fa-contao:before{content:\"\\F26D\"}.fa-500px:before{content:\"\\F26E\"}.fa-amazon:before{content:\"\\F270\"}.fa-calendar-plus-o:before{content:\"\\F271\"}.fa-calendar-minus-o:before{content:\"\\F272\"}.fa-calendar-times-o:before{content:\"\\F273\"}.fa-calendar-check-o:before{content:\"\\F274\"}.fa-industry:before{content:\"\\F275\"}.fa-map-pin:before{content:\"\\F276\"}.fa-map-signs:before{content:\"\\F277\"}.fa-map-o:before{content:\"\\F278\"}.fa-map:before{content:\"\\F279\"}.fa-commenting:before{content:\"\\F27A\"}.fa-commenting-o:before{content:\"\\F27B\"}.fa-houzz:before{content:\"\\F27C\"}.fa-vimeo:before{content:\"\\F27D\"}.fa-black-tie:before{content:\"\\F27E\"}.fa-fonticons:before{content:\"\\F280\"}.fa-reddit-alien:before{content:\"\\F281\"}.fa-edge:before{content:\"\\F282\"}.fa-credit-card-alt:before{content:\"\\F283\"}.fa-codiepie:before{content:\"\\F284\"}.fa-modx:before{content:\"\\F285\"}.fa-fort-awesome:before{content:\"\\F286\"}.fa-usb:before{content:\"\\F287\"}.fa-product-hunt:before{content:\"\\F288\"}.fa-mixcloud:before{content:\"\\F289\"}.fa-scribd:before{content:\"\\F28A\"}.fa-pause-circle:before{content:\"\\F28B\"}.fa-pause-circle-o:before{content:\"\\F28C\"}.fa-stop-circle:before{content:\"\\F28D\"}.fa-stop-circle-o:before{content:\"\\F28E\"}.fa-shopping-bag:before{content:\"\\F290\"}.fa-shopping-basket:before{content:\"\\F291\"}.fa-hashtag:before{content:\"\\F292\"}.fa-bluetooth:before{content:\"\\F293\"}.fa-bluetooth-b:before{content:\"\\F294\"}.fa-percent:before{content:\"\\F295\"}.fa-gitlab:before{content:\"\\F296\"}.fa-wpbeginner:before{content:\"\\F297\"}.fa-wpforms:before{content:\"\\F298\"}.fa-envira:before{content:\"\\F299\"}.fa-universal-access:before{content:\"\\F29A\"}.fa-wheelchair-alt:before{content:\"\\F29B\"}.fa-question-circle-o:before{content:\"\\F29C\"}.fa-blind:before{content:\"\\F29D\"}.fa-audio-description:before{content:\"\\F29E\"}.fa-volume-control-phone:before{content:\"\\F2A0\"}.fa-braille:before{content:\"\\F2A1\"}.fa-assistive-listening-systems:before{content:\"\\F2A2\"}.fa-asl-interpreting:before,.fa-american-sign-language-interpreting:before{content:\"\\F2A3\"}.fa-deafness:before,.fa-hard-of-hearing:before,.fa-deaf:before{content:\"\\F2A4\"}.fa-glide:before{content:\"\\F2A5\"}.fa-glide-g:before{content:\"\\F2A6\"}.fa-signing:before,.fa-sign-language:before{content:\"\\F2A7\"}.fa-low-vision:before{content:\"\\F2A8\"}.fa-viadeo:before{content:\"\\F2A9\"}.fa-viadeo-square:before{content:\"\\F2AA\"}.fa-snapchat:before{content:\"\\F2AB\"}.fa-snapchat-ghost:before{content:\"\\F2AC\"}.fa-snapchat-square:before{content:\"\\F2AD\"}.fa-pied-piper:before{content:\"\\F2AE\"}.fa-first-order:before{content:\"\\F2B0\"}.fa-yoast:before{content:\"\\F2B1\"}.fa-themeisle:before{content:\"\\F2B2\"}.fa-google-plus-circle:before,.fa-google-plus-official:before{content:\"\\F2B3\"}.fa-fa:before,.fa-font-awesome:before{content:\"\\F2B4\"}.fa-handshake-o:before{content:\"\\F2B5\"}.fa-envelope-open:before{content:\"\\F2B6\"}.fa-envelope-open-o:before{content:\"\\F2B7\"}.fa-linode:before{content:\"\\F2B8\"}.fa-address-book:before{content:\"\\F2B9\"}.fa-address-book-o:before{content:\"\\F2BA\"}.fa-vcard:before,.fa-address-card:before{content:\"\\F2BB\"}.fa-vcard-o:before,.fa-address-card-o:before{content:\"\\F2BC\"}.fa-user-circle:before{content:\"\\F2BD\"}.fa-user-circle-o:before{content:\"\\F2BE\"}.fa-user-o:before{content:\"\\F2C0\"}.fa-id-badge:before{content:\"\\F2C1\"}.fa-drivers-license:before,.fa-id-card:before{content:\"\\F2C2\"}.fa-drivers-license-o:before,.fa-id-card-o:before{content:\"\\F2C3\"}.fa-quora:before{content:\"\\F2C4\"}.fa-free-code-camp:before{content:\"\\F2C5\"}.fa-telegram:before{content:\"\\F2C6\"}.fa-thermometer-4:before,.fa-thermometer:before,.fa-thermometer-full:before{content:\"\\F2C7\"}.fa-thermometer-3:before,.fa-thermometer-three-quarters:before{content:\"\\F2C8\"}.fa-thermometer-2:before,.fa-thermometer-half:before{content:\"\\F2C9\"}.fa-thermometer-1:before,.fa-thermometer-quarter:before{content:\"\\F2CA\"}.fa-thermometer-0:before,.fa-thermometer-empty:before{content:\"\\F2CB\"}.fa-shower:before{content:\"\\F2CC\"}.fa-bathtub:before,.fa-s15:before,.fa-bath:before{content:\"\\F2CD\"}.fa-podcast:before{content:\"\\F2CE\"}.fa-window-maximize:before{content:\"\\F2D0\"}.fa-window-minimize:before{content:\"\\F2D1\"}.fa-window-restore:before{content:\"\\F2D2\"}.fa-times-rectangle:before,.fa-window-close:before{content:\"\\F2D3\"}.fa-times-rectangle-o:before,.fa-window-close-o:before{content:\"\\F2D4\"}.fa-bandcamp:before{content:\"\\F2D5\"}.fa-grav:before{content:\"\\F2D6\"}.fa-etsy:before{content:\"\\F2D7\"}.fa-imdb:before{content:\"\\F2D8\"}.fa-ravelry:before{content:\"\\F2D9\"}.fa-eercast:before{content:\"\\F2DA\"}.fa-microchip:before{content:\"\\F2DB\"}.fa-snowflake-o:before{content:\"\\F2DC\"}.fa-superpowers:before{content:\"\\F2DD\"}.fa-wpexplorer:before{content:\"\\F2DE\"}.fa-meetup:before{content:\"\\F2E0\"}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}\n", ""]);
    
    // exports
    
    
    /***/ }),
    /* 36 */
    /***/ (function(module, exports, __webpack_require__) {
    
    /* WEBPACK VAR INJECTION */(function(Buffer) {/*
        MIT License http://www.opensource.org/licenses/mit-license.php
        Author Tobias Koppers @sokra
    */
    // css base code, injected by the css-loader
    module.exports = function(useSourceMap) {
        var list = [];
    
        // return the list of modules as css string
        list.toString = function toString() {
            return this.map(function (item) {
                var content = cssWithMappingToString(item, useSourceMap);
                if(item[2]) {
                    return "@media " + item[2] + "{" + content + "}";
                } else {
                    return content;
                }
            }).join("");
        };
    
        // import a list of modules into the list
        list.i = function(modules, mediaQuery) {
            if(typeof modules === "string")
                modules = [[null, modules, ""]];
            var alreadyImportedModules = {};
            for(var i = 0; i < this.length; i++) {
                var id = this[i][0];
                if(typeof id === "number")
                    alreadyImportedModules[id] = true;
            }
            for(i = 0; i < modules.length; i++) {
                var item = modules[i];
                // skip already imported module
                // this implementation is not 100% perfect for weird media query combinations
                //  when a module is imported multiple times with different media queries.
                //  I hope this will never occur (Hey this way we have smaller bundles)
                if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
                    if(mediaQuery && !item[2]) {
                        item[2] = mediaQuery;
                    } else if(mediaQuery) {
                        item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
                    }
                    list.push(item);
                }
            }
        };
        return list;
    };
    
    function cssWithMappingToString(item, useSourceMap) {
        var content = item[1] || '';
        var cssMapping = item[3];
        if (!cssMapping) {
            return content;
        }
    
        if (useSourceMap) {
            var sourceMapping = toComment(cssMapping);
            var sourceURLs = cssMapping.sources.map(function (source) {
                return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
            });
    
            return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
        }
    
        return [content].join('\n');
    }
    
    // Adapted from convert-source-map (MIT)
    function toComment(sourceMap) {
      var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
      var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
    
      return '/*# ' + data + ' */';
    }
    
    /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(37).Buffer))
    
    /***/ }),
    /* 37 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    /* WEBPACK VAR INJECTION */(function(global) {/*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
     * @license  MIT
     */
    /* eslint-disable no-proto */
    
    
    
    var base64 = __webpack_require__(38)
    var ieee754 = __webpack_require__(39)
    var isArray = __webpack_require__(40)
    
    exports.Buffer = Buffer
    exports.SlowBuffer = SlowBuffer
    exports.INSPECT_MAX_BYTES = 50
    
    /**
     * If `Buffer.TYPED_ARRAY_SUPPORT`:
     *   === true    Use Uint8Array implementation (fastest)
     *   === false   Use Object implementation (most compatible, even IE6)
     *
     * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
     * Opera 11.6+, iOS 4.2+.
     *
     * Due to various browser bugs, sometimes the Object implementation will be used even
     * when the browser supports typed arrays.
     *
     * Note:
     *
     *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
     *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
     *
     *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
     *
     *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
     *     incorrect length in some situations.
    
     * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
     * get the Object implementation, which is slower but behaves correctly.
     */
    Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
      ? global.TYPED_ARRAY_SUPPORT
      : typedArraySupport()
    
    /*
     * Export kMaxLength after typed array support is determined.
     */
    exports.kMaxLength = kMaxLength()
    
    function typedArraySupport () {
      try {
        var arr = new Uint8Array(1)
        arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
        return arr.foo() === 42 && // typed array instances can be augmented
            typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
            arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
      } catch (e) {
        return false
      }
    }
    
    function kMaxLength () {
      return Buffer.TYPED_ARRAY_SUPPORT
        ? 0x7fffffff
        : 0x3fffffff
    }
    
    function createBuffer (that, length) {
      if (kMaxLength() < length) {
        throw new RangeError('Invalid typed array length')
      }
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        // Return an augmented `Uint8Array` instance, for best performance
        that = new Uint8Array(length)
        that.__proto__ = Buffer.prototype
      } else {
        // Fallback: Return an object instance of the Buffer class
        if (that === null) {
          that = new Buffer(length)
        }
        that.length = length
      }
    
      return that
    }
    
    /**
     * The Buffer constructor returns instances of `Uint8Array` that have their
     * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
     * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
     * and the `Uint8Array` methods. Square bracket notation works as expected -- it
     * returns a single octet.
     *
     * The `Uint8Array` prototype remains unmodified.
     */
    
    function Buffer (arg, encodingOrOffset, length) {
      if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
        return new Buffer(arg, encodingOrOffset, length)
      }
    
      // Common case.
      if (typeof arg === 'number') {
        if (typeof encodingOrOffset === 'string') {
          throw new Error(
            'If encoding is specified then the first argument must be a string'
          )
        }
        return allocUnsafe(this, arg)
      }
      return from(this, arg, encodingOrOffset, length)
    }
    
    Buffer.poolSize = 8192 // not used by this implementation
    
    // TODO: Legacy, not needed anymore. Remove in next major version.
    Buffer._augment = function (arr) {
      arr.__proto__ = Buffer.prototype
      return arr
    }
    
    function from (that, value, encodingOrOffset, length) {
      if (typeof value === 'number') {
        throw new TypeError('"value" argument must not be a number')
      }
    
      if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
        return fromArrayBuffer(that, value, encodingOrOffset, length)
      }
    
      if (typeof value === 'string') {
        return fromString(that, value, encodingOrOffset)
      }
    
      return fromObject(that, value)
    }
    
    /**
     * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
     * if value is a number.
     * Buffer.from(str[, encoding])
     * Buffer.from(array)
     * Buffer.from(buffer)
     * Buffer.from(arrayBuffer[, byteOffset[, length]])
     **/
    Buffer.from = function (value, encodingOrOffset, length) {
      return from(null, value, encodingOrOffset, length)
    }
    
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      Buffer.prototype.__proto__ = Uint8Array.prototype
      Buffer.__proto__ = Uint8Array
      if (typeof Symbol !== 'undefined' && Symbol.species &&
          Buffer[Symbol.species] === Buffer) {
        // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
        Object.defineProperty(Buffer, Symbol.species, {
          value: null,
          configurable: true
        })
      }
    }
    
    function assertSize (size) {
      if (typeof size !== 'number') {
        throw new TypeError('"size" argument must be a number')
      } else if (size < 0) {
        throw new RangeError('"size" argument must not be negative')
      }
    }
    
    function alloc (that, size, fill, encoding) {
      assertSize(size)
      if (size <= 0) {
        return createBuffer(that, size)
      }
      if (fill !== undefined) {
        // Only pay attention to encoding if it's a string. This
        // prevents accidentally sending in a number that would
        // be interpretted as a start offset.
        return typeof encoding === 'string'
          ? createBuffer(that, size).fill(fill, encoding)
          : createBuffer(that, size).fill(fill)
      }
      return createBuffer(that, size)
    }
    
    /**
     * Creates a new filled Buffer instance.
     * alloc(size[, fill[, encoding]])
     **/
    Buffer.alloc = function (size, fill, encoding) {
      return alloc(null, size, fill, encoding)
    }
    
    function allocUnsafe (that, size) {
      assertSize(size)
      that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
      if (!Buffer.TYPED_ARRAY_SUPPORT) {
        for (var i = 0; i < size; ++i) {
          that[i] = 0
        }
      }
      return that
    }
    
    /**
     * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
     * */
    Buffer.allocUnsafe = function (size) {
      return allocUnsafe(null, size)
    }
    /**
     * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
     */
    Buffer.allocUnsafeSlow = function (size) {
      return allocUnsafe(null, size)
    }
    
    function fromString (that, string, encoding) {
      if (typeof encoding !== 'string' || encoding === '') {
        encoding = 'utf8'
      }
    
      if (!Buffer.isEncoding(encoding)) {
        throw new TypeError('"encoding" must be a valid string encoding')
      }
    
      var length = byteLength(string, encoding) | 0
      that = createBuffer(that, length)
    
      var actual = that.write(string, encoding)
    
      if (actual !== length) {
        // Writing a hex string, for example, that contains invalid characters will
        // cause everything after the first invalid character to be ignored. (e.g.
        // 'abxxcd' will be treated as 'ab')
        that = that.slice(0, actual)
      }
    
      return that
    }
    
    function fromArrayLike (that, array) {
      var length = array.length < 0 ? 0 : checked(array.length) | 0
      that = createBuffer(that, length)
      for (var i = 0; i < length; i += 1) {
        that[i] = array[i] & 255
      }
      return that
    }
    
    function fromArrayBuffer (that, array, byteOffset, length) {
      array.byteLength // this throws if `array` is not a valid ArrayBuffer
    
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('\'offset\' is out of bounds')
      }
    
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('\'length\' is out of bounds')
      }
    
      if (byteOffset === undefined && length === undefined) {
        array = new Uint8Array(array)
      } else if (length === undefined) {
        array = new Uint8Array(array, byteOffset)
      } else {
        array = new Uint8Array(array, byteOffset, length)
      }
    
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        // Return an augmented `Uint8Array` instance, for best performance
        that = array
        that.__proto__ = Buffer.prototype
      } else {
        // Fallback: Return an object instance of the Buffer class
        that = fromArrayLike(that, array)
      }
      return that
    }
    
    function fromObject (that, obj) {
      if (Buffer.isBuffer(obj)) {
        var len = checked(obj.length) | 0
        that = createBuffer(that, len)
    
        if (that.length === 0) {
          return that
        }
    
        obj.copy(that, 0, 0, len)
        return that
      }
    
      if (obj) {
        if ((typeof ArrayBuffer !== 'undefined' &&
            obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
          if (typeof obj.length !== 'number' || isnan(obj.length)) {
            return createBuffer(that, 0)
          }
          return fromArrayLike(that, obj)
        }
    
        if (obj.type === 'Buffer' && isArray(obj.data)) {
          return fromArrayLike(that, obj.data)
        }
      }
    
      throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
    }
    
    function checked (length) {
      // Note: cannot use `length < kMaxLength()` here because that fails when
      // length is NaN (which is otherwise coerced to zero.)
      if (length >= kMaxLength()) {
        throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                             'size: 0x' + kMaxLength().toString(16) + ' bytes')
      }
      return length | 0
    }
    
    function SlowBuffer (length) {
      if (+length != length) { // eslint-disable-line eqeqeq
        length = 0
      }
      return Buffer.alloc(+length)
    }
    
    Buffer.isBuffer = function isBuffer (b) {
      return !!(b != null && b._isBuffer)
    }
    
    Buffer.compare = function compare (a, b) {
      if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
        throw new TypeError('Arguments must be Buffers')
      }
    
      if (a === b) return 0
    
      var x = a.length
      var y = b.length
    
      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i]
          y = b[i]
          break
        }
      }
    
      if (x < y) return -1
      if (y < x) return 1
      return 0
    }
    
    Buffer.isEncoding = function isEncoding (encoding) {
      switch (String(encoding).toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'latin1':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return true
        default:
          return false
      }
    }
    
    Buffer.concat = function concat (list, length) {
      if (!isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers')
      }
    
      if (list.length === 0) {
        return Buffer.alloc(0)
      }
    
      var i
      if (length === undefined) {
        length = 0
        for (i = 0; i < list.length; ++i) {
          length += list[i].length
        }
      }
    
      var buffer = Buffer.allocUnsafe(length)
      var pos = 0
      for (i = 0; i < list.length; ++i) {
        var buf = list[i]
        if (!Buffer.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers')
        }
        buf.copy(buffer, pos)
        pos += buf.length
      }
      return buffer
    }
    
    function byteLength (string, encoding) {
      if (Buffer.isBuffer(string)) {
        return string.length
      }
      if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
          (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
        return string.byteLength
      }
      if (typeof string !== 'string') {
        string = '' + string
      }
    
      var len = string.length
      if (len === 0) return 0
    
      // Use a for loop to avoid recursion
      var loweredCase = false
      for (;;) {
        switch (encoding) {
          case 'ascii':
          case 'latin1':
          case 'binary':
            return len
          case 'utf8':
          case 'utf-8':
          case undefined:
            return utf8ToBytes(string).length
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return len * 2
          case 'hex':
            return len >>> 1
          case 'base64':
            return base64ToBytes(string).length
          default:
            if (loweredCase) return utf8ToBytes(string).length // assume utf8
            encoding = ('' + encoding).toLowerCase()
            loweredCase = true
        }
      }
    }
    Buffer.byteLength = byteLength
    
    function slowToString (encoding, start, end) {
      var loweredCase = false
    
      // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
      // property of a typed array.
    
      // This behaves neither like String nor Uint8Array in that we set start/end
      // to their upper/lower bounds if the value passed is out of range.
      // undefined is handled specially as per ECMA-262 6th Edition,
      // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
      if (start === undefined || start < 0) {
        start = 0
      }
      // Return early if start > this.length. Done here to prevent potential uint32
      // coercion fail below.
      if (start > this.length) {
        return ''
      }
    
      if (end === undefined || end > this.length) {
        end = this.length
      }
    
      if (end <= 0) {
        return ''
      }
    
      // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
      end >>>= 0
      start >>>= 0
    
      if (end <= start) {
        return ''
      }
    
      if (!encoding) encoding = 'utf8'
    
      while (true) {
        switch (encoding) {
          case 'hex':
            return hexSlice(this, start, end)
    
          case 'utf8':
          case 'utf-8':
            return utf8Slice(this, start, end)
    
          case 'ascii':
            return asciiSlice(this, start, end)
    
          case 'latin1':
          case 'binary':
            return latin1Slice(this, start, end)
    
          case 'base64':
            return base64Slice(this, start, end)
    
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return utf16leSlice(this, start, end)
    
          default:
            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
            encoding = (encoding + '').toLowerCase()
            loweredCase = true
        }
      }
    }
    
    // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
    // Buffer instances.
    Buffer.prototype._isBuffer = true
    
    function swap (b, n, m) {
      var i = b[n]
      b[n] = b[m]
      b[m] = i
    }
    
    Buffer.prototype.swap16 = function swap16 () {
      var len = this.length
      if (len % 2 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 16-bits')
      }
      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1)
      }
      return this
    }
    
    Buffer.prototype.swap32 = function swap32 () {
      var len = this.length
      if (len % 4 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 32-bits')
      }
      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3)
        swap(this, i + 1, i + 2)
      }
      return this
    }
    
    Buffer.prototype.swap64 = function swap64 () {
      var len = this.length
      if (len % 8 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 64-bits')
      }
      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7)
        swap(this, i + 1, i + 6)
        swap(this, i + 2, i + 5)
        swap(this, i + 3, i + 4)
      }
      return this
    }
    
    Buffer.prototype.toString = function toString () {
      var length = this.length | 0
      if (length === 0) return ''
      if (arguments.length === 0) return utf8Slice(this, 0, length)
      return slowToString.apply(this, arguments)
    }
    
    Buffer.prototype.equals = function equals (b) {
      if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
      if (this === b) return true
      return Buffer.compare(this, b) === 0
    }
    
    Buffer.prototype.inspect = function inspect () {
      var str = ''
      var max = exports.INSPECT_MAX_BYTES
      if (this.length > 0) {
        str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
        if (this.length > max) str += ' ... '
      }
      return '<Buffer ' + str + '>'
    }
    
    Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
      if (!Buffer.isBuffer(target)) {
        throw new TypeError('Argument must be a Buffer')
      }
    
      if (start === undefined) {
        start = 0
      }
      if (end === undefined) {
        end = target ? target.length : 0
      }
      if (thisStart === undefined) {
        thisStart = 0
      }
      if (thisEnd === undefined) {
        thisEnd = this.length
      }
    
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError('out of range index')
      }
    
      if (thisStart >= thisEnd && start >= end) {
        return 0
      }
      if (thisStart >= thisEnd) {
        return -1
      }
      if (start >= end) {
        return 1
      }
    
      start >>>= 0
      end >>>= 0
      thisStart >>>= 0
      thisEnd >>>= 0
    
      if (this === target) return 0
    
      var x = thisEnd - thisStart
      var y = end - start
      var len = Math.min(x, y)
    
      var thisCopy = this.slice(thisStart, thisEnd)
      var targetCopy = target.slice(start, end)
    
      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i]
          y = targetCopy[i]
          break
        }
      }
    
      if (x < y) return -1
      if (y < x) return 1
      return 0
    }
    
    // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
    // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
    //
    // Arguments:
    // - buffer - a Buffer to search
    // - val - a string, Buffer, or number
    // - byteOffset - an index into `buffer`; will be clamped to an int32
    // - encoding - an optional encoding, relevant is val is a string
    // - dir - true for indexOf, false for lastIndexOf
    function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
      // Empty buffer means no match
      if (buffer.length === 0) return -1
    
      // Normalize byteOffset
      if (typeof byteOffset === 'string') {
        encoding = byteOffset
        byteOffset = 0
      } else if (byteOffset > 0x7fffffff) {
        byteOffset = 0x7fffffff
      } else if (byteOffset < -0x80000000) {
        byteOffset = -0x80000000
      }
      byteOffset = +byteOffset  // Coerce to Number.
      if (isNaN(byteOffset)) {
        // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
        byteOffset = dir ? 0 : (buffer.length - 1)
      }
    
      // Normalize byteOffset: negative offsets start from the end of the buffer
      if (byteOffset < 0) byteOffset = buffer.length + byteOffset
      if (byteOffset >= buffer.length) {
        if (dir) return -1
        else byteOffset = buffer.length - 1
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0
        else return -1
      }
    
      // Normalize val
      if (typeof val === 'string') {
        val = Buffer.from(val, encoding)
      }
    
      // Finally, search either indexOf (if dir is true) or lastIndexOf
      if (Buffer.isBuffer(val)) {
        // Special case: looking for empty string/buffer always fails
        if (val.length === 0) {
          return -1
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
      } else if (typeof val === 'number') {
        val = val & 0xFF // Search for a byte value [0-255]
        if (Buffer.TYPED_ARRAY_SUPPORT &&
            typeof Uint8Array.prototype.indexOf === 'function') {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
          }
        }
        return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
      }
    
      throw new TypeError('val must be string, number or Buffer')
    }
    
    function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
      var indexSize = 1
      var arrLength = arr.length
      var valLength = val.length
    
      if (encoding !== undefined) {
        encoding = String(encoding).toLowerCase()
        if (encoding === 'ucs2' || encoding === 'ucs-2' ||
            encoding === 'utf16le' || encoding === 'utf-16le') {
          if (arr.length < 2 || val.length < 2) {
            return -1
          }
          indexSize = 2
          arrLength /= 2
          valLength /= 2
          byteOffset /= 2
        }
      }
    
      function read (buf, i) {
        if (indexSize === 1) {
          return buf[i]
        } else {
          return buf.readUInt16BE(i * indexSize)
        }
      }
    
      var i
      if (dir) {
        var foundIndex = -1
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
          } else {
            if (foundIndex !== -1) i -= i - foundIndex
            foundIndex = -1
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
        for (i = byteOffset; i >= 0; i--) {
          var found = true
          for (var j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false
              break
            }
          }
          if (found) return i
        }
      }
    
      return -1
    }
    
    Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1
    }
    
    Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
    }
    
    Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
    }
    
    function hexWrite (buf, string, offset, length) {
      offset = Number(offset) || 0
      var remaining = buf.length - offset
      if (!length) {
        length = remaining
      } else {
        length = Number(length)
        if (length > remaining) {
          length = remaining
        }
      }
    
      // must be an even number of digits
      var strLen = string.length
      if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
    
      if (length > strLen / 2) {
        length = strLen / 2
      }
      for (var i = 0; i < length; ++i) {
        var parsed = parseInt(string.substr(i * 2, 2), 16)
        if (isNaN(parsed)) return i
        buf[offset + i] = parsed
      }
      return i
    }
    
    function utf8Write (buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
    }
    
    function asciiWrite (buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length)
    }
    
    function latin1Write (buf, string, offset, length) {
      return asciiWrite(buf, string, offset, length)
    }
    
    function base64Write (buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length)
    }
    
    function ucs2Write (buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
    }
    
    Buffer.prototype.write = function write (string, offset, length, encoding) {
      // Buffer#write(string)
      if (offset === undefined) {
        encoding = 'utf8'
        length = this.length
        offset = 0
      // Buffer#write(string, encoding)
      } else if (length === undefined && typeof offset === 'string') {
        encoding = offset
        length = this.length
        offset = 0
      // Buffer#write(string, offset[, length][, encoding])
      } else if (isFinite(offset)) {
        offset = offset | 0
        if (isFinite(length)) {
          length = length | 0
          if (encoding === undefined) encoding = 'utf8'
        } else {
          encoding = length
          length = undefined
        }
      // legacy write(string, encoding, offset, length) - remove in v0.13
      } else {
        throw new Error(
          'Buffer.write(string, encoding, offset[, length]) is no longer supported'
        )
      }
    
      var remaining = this.length - offset
      if (length === undefined || length > remaining) length = remaining
    
      if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
        throw new RangeError('Attempt to write outside buffer bounds')
      }
    
      if (!encoding) encoding = 'utf8'
    
      var loweredCase = false
      for (;;) {
        switch (encoding) {
          case 'hex':
            return hexWrite(this, string, offset, length)
    
          case 'utf8':
          case 'utf-8':
            return utf8Write(this, string, offset, length)
    
          case 'ascii':
            return asciiWrite(this, string, offset, length)
    
          case 'latin1':
          case 'binary':
            return latin1Write(this, string, offset, length)
    
          case 'base64':
            // Warning: maxLength not taken into account in base64Write
            return base64Write(this, string, offset, length)
    
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return ucs2Write(this, string, offset, length)
    
          default:
            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
            encoding = ('' + encoding).toLowerCase()
            loweredCase = true
        }
      }
    }
    
    Buffer.prototype.toJSON = function toJSON () {
      return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0)
      }
    }
    
    function base64Slice (buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf)
      } else {
        return base64.fromByteArray(buf.slice(start, end))
      }
    }
    
    function utf8Slice (buf, start, end) {
      end = Math.min(buf.length, end)
      var res = []
    
      var i = start
      while (i < end) {
        var firstByte = buf[i]
        var codePoint = null
        var bytesPerSequence = (firstByte > 0xEF) ? 4
          : (firstByte > 0xDF) ? 3
          : (firstByte > 0xBF) ? 2
          : 1
    
        if (i + bytesPerSequence <= end) {
          var secondByte, thirdByte, fourthByte, tempCodePoint
    
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 0x80) {
                codePoint = firstByte
              }
              break
            case 2:
              secondByte = buf[i + 1]
              if ((secondByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
                if (tempCodePoint > 0x7F) {
                  codePoint = tempCodePoint
                }
              }
              break
            case 3:
              secondByte = buf[i + 1]
              thirdByte = buf[i + 2]
              if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
                if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                  codePoint = tempCodePoint
                }
              }
              break
            case 4:
              secondByte = buf[i + 1]
              thirdByte = buf[i + 2]
              fourthByte = buf[i + 3]
              if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
                if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                  codePoint = tempCodePoint
                }
              }
          }
        }
    
        if (codePoint === null) {
          // we did not generate a valid codePoint so insert a
          // replacement char (U+FFFD) and advance only 1 byte
          codePoint = 0xFFFD
          bytesPerSequence = 1
        } else if (codePoint > 0xFFFF) {
          // encode to utf16 (surrogate pair dance)
          codePoint -= 0x10000
          res.push(codePoint >>> 10 & 0x3FF | 0xD800)
          codePoint = 0xDC00 | codePoint & 0x3FF
        }
    
        res.push(codePoint)
        i += bytesPerSequence
      }
    
      return decodeCodePointsArray(res)
    }
    
    // Based on http://stackoverflow.com/a/22747272/680742, the browser with
    // the lowest limit is Chrome, with 0x10000 args.
    // We go 1 magnitude less, for safety
    var MAX_ARGUMENTS_LENGTH = 0x1000
    
    function decodeCodePointsArray (codePoints) {
      var len = codePoints.length
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
      }
    
      // Decode in chunks to avoid "call stack size exceeded".
      var res = ''
      var i = 0
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        )
      }
      return res
    }
    
    function asciiSlice (buf, start, end) {
      var ret = ''
      end = Math.min(buf.length, end)
    
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 0x7F)
      }
      return ret
    }
    
    function latin1Slice (buf, start, end) {
      var ret = ''
      end = Math.min(buf.length, end)
    
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i])
      }
      return ret
    }
    
    function hexSlice (buf, start, end) {
      var len = buf.length
    
      if (!start || start < 0) start = 0
      if (!end || end < 0 || end > len) end = len
    
      var out = ''
      for (var i = start; i < end; ++i) {
        out += toHex(buf[i])
      }
      return out
    }
    
    function utf16leSlice (buf, start, end) {
      var bytes = buf.slice(start, end)
      var res = ''
      for (var i = 0; i < bytes.length; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
      }
      return res
    }
    
    Buffer.prototype.slice = function slice (start, end) {
      var len = this.length
      start = ~~start
      end = end === undefined ? len : ~~end
    
      if (start < 0) {
        start += len
        if (start < 0) start = 0
      } else if (start > len) {
        start = len
      }
    
      if (end < 0) {
        end += len
        if (end < 0) end = 0
      } else if (end > len) {
        end = len
      }
    
      if (end < start) end = start
    
      var newBuf
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        newBuf = this.subarray(start, end)
        newBuf.__proto__ = Buffer.prototype
      } else {
        var sliceLen = end - start
        newBuf = new Buffer(sliceLen, undefined)
        for (var i = 0; i < sliceLen; ++i) {
          newBuf[i] = this[i + start]
        }
      }
    
      return newBuf
    }
    
    /*
     * Need to make sure that buffer isn't trying to write out of bounds.
     */
    function checkOffset (offset, ext, length) {
      if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
      if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
    }
    
    Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
      offset = offset | 0
      byteLength = byteLength | 0
      if (!noAssert) checkOffset(offset, byteLength, this.length)
    
      var val = this[offset]
      var mul = 1
      var i = 0
      while (++i < byteLength && (mul *= 0x100)) {
        val += this[offset + i] * mul
      }
    
      return val
    }
    
    Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
      offset = offset | 0
      byteLength = byteLength | 0
      if (!noAssert) {
        checkOffset(offset, byteLength, this.length)
      }
    
      var val = this[offset + --byteLength]
      var mul = 1
      while (byteLength > 0 && (mul *= 0x100)) {
        val += this[offset + --byteLength] * mul
      }
    
      return val
    }
    
    Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 1, this.length)
      return this[offset]
    }
    
    Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length)
      return this[offset] | (this[offset + 1] << 8)
    }
    
    Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length)
      return (this[offset] << 8) | this[offset + 1]
    }
    
    Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length)
    
      return ((this[offset]) |
          (this[offset + 1] << 8) |
          (this[offset + 2] << 16)) +
          (this[offset + 3] * 0x1000000)
    }
    
    Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length)
    
      return (this[offset] * 0x1000000) +
        ((this[offset + 1] << 16) |
        (this[offset + 2] << 8) |
        this[offset + 3])
    }
    
    Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
      offset = offset | 0
      byteLength = byteLength | 0
      if (!noAssert) checkOffset(offset, byteLength, this.length)
    
      var val = this[offset]
      var mul = 1
      var i = 0
      while (++i < byteLength && (mul *= 0x100)) {
        val += this[offset + i] * mul
      }
      mul *= 0x80
    
      if (val >= mul) val -= Math.pow(2, 8 * byteLength)
    
      return val
    }
    
    Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
      offset = offset | 0
      byteLength = byteLength | 0
      if (!noAssert) checkOffset(offset, byteLength, this.length)
    
      var i = byteLength
      var mul = 1
      var val = this[offset + --i]
      while (i > 0 && (mul *= 0x100)) {
        val += this[offset + --i] * mul
      }
      mul *= 0x80
    
      if (val >= mul) val -= Math.pow(2, 8 * byteLength)
    
      return val
    }
    
    Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 1, this.length)
      if (!(this[offset] & 0x80)) return (this[offset])
      return ((0xff - this[offset] + 1) * -1)
    }
    
    Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length)
      var val = this[offset] | (this[offset + 1] << 8)
      return (val & 0x8000) ? val | 0xFFFF0000 : val
    }
    
    Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length)
      var val = this[offset + 1] | (this[offset] << 8)
      return (val & 0x8000) ? val | 0xFFFF0000 : val
    }
    
    Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length)
    
      return (this[offset]) |
        (this[offset + 1] << 8) |
        (this[offset + 2] << 16) |
        (this[offset + 3] << 24)
    }
    
    Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length)
    
      return (this[offset] << 24) |
        (this[offset + 1] << 16) |
        (this[offset + 2] << 8) |
        (this[offset + 3])
    }
    
    Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length)
      return ieee754.read(this, offset, true, 23, 4)
    }
    
    Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length)
      return ieee754.read(this, offset, false, 23, 4)
    }
    
    Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 8, this.length)
      return ieee754.read(this, offset, true, 52, 8)
    }
    
    Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 8, this.length)
      return ieee754.read(this, offset, false, 52, 8)
    }
    
    function checkInt (buf, value, offset, ext, max, min) {
      if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
      if (offset + ext > buf.length) throw new RangeError('Index out of range')
    }
    
    Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
      value = +value
      offset = offset | 0
      byteLength = byteLength | 0
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1
        checkInt(this, value, offset, byteLength, maxBytes, 0)
      }
    
      var mul = 1
      var i = 0
      this[offset] = value & 0xFF
      while (++i < byteLength && (mul *= 0x100)) {
        this[offset + i] = (value / mul) & 0xFF
      }
    
      return offset + byteLength
    }
    
    Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
      value = +value
      offset = offset | 0
      byteLength = byteLength | 0
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1
        checkInt(this, value, offset, byteLength, maxBytes, 0)
      }
    
      var i = byteLength - 1
      var mul = 1
      this[offset + i] = value & 0xFF
      while (--i >= 0 && (mul *= 0x100)) {
        this[offset + i] = (value / mul) & 0xFF
      }
    
      return offset + byteLength
    }
    
    Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
      value = +value
      offset = offset | 0
      if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
      if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
      this[offset] = (value & 0xff)
      return offset + 1
    }
    
    function objectWriteUInt16 (buf, value, offset, littleEndian) {
      if (value < 0) value = 0xffff + value + 1
      for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
        buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
          (littleEndian ? i : 1 - i) * 8
      }
    }
    
    Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
      value = +value
      offset = offset | 0
      if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = (value & 0xff)
        this[offset + 1] = (value >>> 8)
      } else {
        objectWriteUInt16(this, value, offset, true)
      }
      return offset + 2
    }
    
    Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
      value = +value
      offset = offset | 0
      if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = (value >>> 8)
        this[offset + 1] = (value & 0xff)
      } else {
        objectWriteUInt16(this, value, offset, false)
      }
      return offset + 2
    }
    
    function objectWriteUInt32 (buf, value, offset, littleEndian) {
      if (value < 0) value = 0xffffffff + value + 1
      for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
        buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
      }
    }
    
    Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
      value = +value
      offset = offset | 0
      if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset + 3] = (value >>> 24)
        this[offset + 2] = (value >>> 16)
        this[offset + 1] = (value >>> 8)
        this[offset] = (value & 0xff)
      } else {
        objectWriteUInt32(this, value, offset, true)
      }
      return offset + 4
    }
    
    Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
      value = +value
      offset = offset | 0
      if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = (value >>> 24)
        this[offset + 1] = (value >>> 16)
        this[offset + 2] = (value >>> 8)
        this[offset + 3] = (value & 0xff)
      } else {
        objectWriteUInt32(this, value, offset, false)
      }
      return offset + 4
    }
    
    Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
      value = +value
      offset = offset | 0
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength - 1)
    
        checkInt(this, value, offset, byteLength, limit - 1, -limit)
      }
    
      var i = 0
      var mul = 1
      var sub = 0
      this[offset] = value & 0xFF
      while (++i < byteLength && (mul *= 0x100)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1
        }
        this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
      }
    
      return offset + byteLength
    }
    
    Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
      value = +value
      offset = offset | 0
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength - 1)
    
        checkInt(this, value, offset, byteLength, limit - 1, -limit)
      }
    
      var i = byteLength - 1
      var mul = 1
      var sub = 0
      this[offset + i] = value & 0xFF
      while (--i >= 0 && (mul *= 0x100)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1
        }
        this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
      }
    
      return offset + byteLength
    }
    
    Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
      value = +value
      offset = offset | 0
      if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
      if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
      if (value < 0) value = 0xff + value + 1
      this[offset] = (value & 0xff)
      return offset + 1
    }
    
    Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
      value = +value
      offset = offset | 0
      if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = (value & 0xff)
        this[offset + 1] = (value >>> 8)
      } else {
        objectWriteUInt16(this, value, offset, true)
      }
      return offset + 2
    }
    
    Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
      value = +value
      offset = offset | 0
      if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = (value >>> 8)
        this[offset + 1] = (value & 0xff)
      } else {
        objectWriteUInt16(this, value, offset, false)
      }
      return offset + 2
    }
    
    Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
      value = +value
      offset = offset | 0
      if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = (value & 0xff)
        this[offset + 1] = (value >>> 8)
        this[offset + 2] = (value >>> 16)
        this[offset + 3] = (value >>> 24)
      } else {
        objectWriteUInt32(this, value, offset, true)
      }
      return offset + 4
    }
    
    Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
      value = +value
      offset = offset | 0
      if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
      if (value < 0) value = 0xffffffff + value + 1
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = (value >>> 24)
        this[offset + 1] = (value >>> 16)
        this[offset + 2] = (value >>> 8)
        this[offset + 3] = (value & 0xff)
      } else {
        objectWriteUInt32(this, value, offset, false)
      }
      return offset + 4
    }
    
    function checkIEEE754 (buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError('Index out of range')
      if (offset < 0) throw new RangeError('Index out of range')
    }
    
    function writeFloat (buf, value, offset, littleEndian, noAssert) {
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4)
      return offset + 4
    }
    
    Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert)
    }
    
    Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert)
    }
    
    function writeDouble (buf, value, offset, littleEndian, noAssert) {
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8)
      return offset + 8
    }
    
    Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert)
    }
    
    Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert)
    }
    
    // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
    Buffer.prototype.copy = function copy (target, targetStart, start, end) {
      if (!start) start = 0
      if (!end && end !== 0) end = this.length
      if (targetStart >= target.length) targetStart = target.length
      if (!targetStart) targetStart = 0
      if (end > 0 && end < start) end = start
    
      // Copy 0 bytes; we're done
      if (end === start) return 0
      if (target.length === 0 || this.length === 0) return 0
    
      // Fatal error conditions
      if (targetStart < 0) {
        throw new RangeError('targetStart out of bounds')
      }
      if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
      if (end < 0) throw new RangeError('sourceEnd out of bounds')
    
      // Are we oob?
      if (end > this.length) end = this.length
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start
      }
    
      var len = end - start
      var i
    
      if (this === target && start < targetStart && targetStart < end) {
        // descending copy from end
        for (i = len - 1; i >= 0; --i) {
          target[i + targetStart] = this[i + start]
        }
      } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
        // ascending copy from start
        for (i = 0; i < len; ++i) {
          target[i + targetStart] = this[i + start]
        }
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, start + len),
          targetStart
        )
      }
    
      return len
    }
    
    // Usage:
    //    buffer.fill(number[, offset[, end]])
    //    buffer.fill(buffer[, offset[, end]])
    //    buffer.fill(string[, offset[, end]][, encoding])
    Buffer.prototype.fill = function fill (val, start, end, encoding) {
      // Handle string cases:
      if (typeof val === 'string') {
        if (typeof start === 'string') {
          encoding = start
          start = 0
          end = this.length
        } else if (typeof end === 'string') {
          encoding = end
          end = this.length
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0)
          if (code < 256) {
            val = code
          }
        }
        if (encoding !== undefined && typeof encoding !== 'string') {
          throw new TypeError('encoding must be a string')
        }
        if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
          throw new TypeError('Unknown encoding: ' + encoding)
        }
      } else if (typeof val === 'number') {
        val = val & 255
      }
    
      // Invalid ranges are not set to a default, so can range check early.
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError('Out of range index')
      }
    
      if (end <= start) {
        return this
      }
    
      start = start >>> 0
      end = end === undefined ? this.length : end >>> 0
    
      if (!val) val = 0
    
      var i
      if (typeof val === 'number') {
        for (i = start; i < end; ++i) {
          this[i] = val
        }
      } else {
        var bytes = Buffer.isBuffer(val)
          ? val
          : utf8ToBytes(new Buffer(val, encoding).toString())
        var len = bytes.length
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len]
        }
      }
    
      return this
    }
    
    // HELPER FUNCTIONS
    // ================
    
    var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
    
    function base64clean (str) {
      // Node strips out invalid characters like \n and \t from the string, base64-js does not
      str = stringtrim(str).replace(INVALID_BASE64_RE, '')
      // Node converts strings with length < 2 to ''
      if (str.length < 2) return ''
      // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
      while (str.length % 4 !== 0) {
        str = str + '='
      }
      return str
    }
    
    function stringtrim (str) {
      if (str.trim) return str.trim()
      return str.replace(/^\s+|\s+$/g, '')
    }
    
    function toHex (n) {
      if (n < 16) return '0' + n.toString(16)
      return n.toString(16)
    }
    
    function utf8ToBytes (string, units) {
      units = units || Infinity
      var codePoint
      var length = string.length
      var leadSurrogate = null
      var bytes = []
    
      for (var i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i)
    
        // is surrogate component
        if (codePoint > 0xD7FF && codePoint < 0xE000) {
          // last char was a lead
          if (!leadSurrogate) {
            // no lead yet
            if (codePoint > 0xDBFF) {
              // unexpected trail
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
              continue
            } else if (i + 1 === length) {
              // unpaired lead
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
              continue
            }
    
            // valid lead
            leadSurrogate = codePoint
    
            continue
          }
    
          // 2 leads in a row
          if (codePoint < 0xDC00) {
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
            leadSurrogate = codePoint
            continue
          }
    
          // valid surrogate pair
          codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
        } else if (leadSurrogate) {
          // valid bmp char, but last char was a lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        }
    
        leadSurrogate = null
    
        // encode utf8
        if (codePoint < 0x80) {
          if ((units -= 1) < 0) break
          bytes.push(codePoint)
        } else if (codePoint < 0x800) {
          if ((units -= 2) < 0) break
          bytes.push(
            codePoint >> 0x6 | 0xC0,
            codePoint & 0x3F | 0x80
          )
        } else if (codePoint < 0x10000) {
          if ((units -= 3) < 0) break
          bytes.push(
            codePoint >> 0xC | 0xE0,
            codePoint >> 0x6 & 0x3F | 0x80,
            codePoint & 0x3F | 0x80
          )
        } else if (codePoint < 0x110000) {
          if ((units -= 4) < 0) break
          bytes.push(
            codePoint >> 0x12 | 0xF0,
            codePoint >> 0xC & 0x3F | 0x80,
            codePoint >> 0x6 & 0x3F | 0x80,
            codePoint & 0x3F | 0x80
          )
        } else {
          throw new Error('Invalid code point')
        }
      }
    
      return bytes
    }
    
    function asciiToBytes (str) {
      var byteArray = []
      for (var i = 0; i < str.length; ++i) {
        // Node's code seems to be doing this and not & 0x7F..
        byteArray.push(str.charCodeAt(i) & 0xFF)
      }
      return byteArray
    }
    
    function utf16leToBytes (str, units) {
      var c, hi, lo
      var byteArray = []
      for (var i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break
    
        c = str.charCodeAt(i)
        hi = c >> 8
        lo = c % 256
        byteArray.push(lo)
        byteArray.push(hi)
      }
    
      return byteArray
    }
    
    function base64ToBytes (str) {
      return base64.toByteArray(base64clean(str))
    }
    
    function blitBuffer (src, dst, offset, length) {
      for (var i = 0; i < length; ++i) {
        if ((i + offset >= dst.length) || (i >= src.length)) break
        dst[i + offset] = src[i]
      }
      return i
    }
    
    function isnan (val) {
      return val !== val // eslint-disable-line no-self-compare
    }
    
    /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(24)))
    
    /***/ }),
    /* 38 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    exports.byteLength = byteLength
    exports.toByteArray = toByteArray
    exports.fromByteArray = fromByteArray
    
    var lookup = []
    var revLookup = []
    var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
    
    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i]
      revLookup[code.charCodeAt(i)] = i
    }
    
    revLookup['-'.charCodeAt(0)] = 62
    revLookup['_'.charCodeAt(0)] = 63
    
    function placeHoldersCount (b64) {
      var len = b64.length
      if (len % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4')
      }
    
      // the number of equal signs (place holders)
      // if there are two placeholders, than the two characters before it
      // represent one byte
      // if there is only one, then the three characters before it represent 2 bytes
      // this is just a cheap hack to not do indexOf twice
      return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
    }
    
    function byteLength (b64) {
      // base64 is 4/3 + up to two characters of the original data
      return b64.length * 3 / 4 - placeHoldersCount(b64)
    }
    
    function toByteArray (b64) {
      var i, j, l, tmp, placeHolders, arr
      var len = b64.length
      placeHolders = placeHoldersCount(b64)
    
      arr = new Arr(len * 3 / 4 - placeHolders)
    
      // if there are placeholders, only get up to the last complete 4 chars
      l = placeHolders > 0 ? len - 4 : len
    
      var L = 0
    
      for (i = 0, j = 0; i < l; i += 4, j += 3) {
        tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
        arr[L++] = (tmp >> 16) & 0xFF
        arr[L++] = (tmp >> 8) & 0xFF
        arr[L++] = tmp & 0xFF
      }
    
      if (placeHolders === 2) {
        tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
        arr[L++] = tmp & 0xFF
      } else if (placeHolders === 1) {
        tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
        arr[L++] = (tmp >> 8) & 0xFF
        arr[L++] = tmp & 0xFF
      }
    
      return arr
    }
    
    function tripletToBase64 (num) {
      return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
    }
    
    function encodeChunk (uint8, start, end) {
      var tmp
      var output = []
      for (var i = start; i < end; i += 3) {
        tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
        output.push(tripletToBase64(tmp))
      }
      return output.join('')
    }
    
    function fromByteArray (uint8) {
      var tmp
      var len = uint8.length
      var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
      var output = ''
      var parts = []
      var maxChunkLength = 16383 // must be multiple of 3
    
      // go through the array every three bytes, we'll deal with trailing stuff later
      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
        parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
      }
    
      // pad the end with zeros, but make sure to not forget the extra bytes
      if (extraBytes === 1) {
        tmp = uint8[len - 1]
        output += lookup[tmp >> 2]
        output += lookup[(tmp << 4) & 0x3F]
        output += '=='
      } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
        output += lookup[tmp >> 10]
        output += lookup[(tmp >> 4) & 0x3F]
        output += lookup[(tmp << 2) & 0x3F]
        output += '='
      }
    
      parts.push(output)
    
      return parts.join('')
    }
    
    
    /***/ }),
    /* 39 */
    /***/ (function(module, exports) {
    
    exports.read = function (buffer, offset, isLE, mLen, nBytes) {
      var e, m
      var eLen = (nBytes * 8) - mLen - 1
      var eMax = (1 << eLen) - 1
      var eBias = eMax >> 1
      var nBits = -7
      var i = isLE ? (nBytes - 1) : 0
      var d = isLE ? -1 : 1
      var s = buffer[offset + i]
    
      i += d
    
      e = s & ((1 << (-nBits)) - 1)
      s >>= (-nBits)
      nBits += eLen
      for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}
    
      m = e & ((1 << (-nBits)) - 1)
      e >>= (-nBits)
      nBits += mLen
      for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}
    
      if (e === 0) {
        e = 1 - eBias
      } else if (e === eMax) {
        return m ? NaN : ((s ? -1 : 1) * Infinity)
      } else {
        m = m + Math.pow(2, mLen)
        e = e - eBias
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
    }
    
    exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c
      var eLen = (nBytes * 8) - mLen - 1
      var eMax = (1 << eLen) - 1
      var eBias = eMax >> 1
      var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
      var i = isLE ? 0 : (nBytes - 1)
      var d = isLE ? 1 : -1
      var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
    
      value = Math.abs(value)
    
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0
        e = eMax
      } else {
        e = Math.floor(Math.log(value) / Math.LN2)
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--
          c *= 2
        }
        if (e + eBias >= 1) {
          value += rt / c
        } else {
          value += rt * Math.pow(2, 1 - eBias)
        }
        if (value * c >= 2) {
          e++
          c /= 2
        }
    
        if (e + eBias >= eMax) {
          m = 0
          e = eMax
        } else if (e + eBias >= 1) {
          m = ((value * c) - 1) * Math.pow(2, mLen)
          e = e + eBias
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
          e = 0
        }
      }
    
      for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
    
      e = (e << mLen) | m
      eLen += mLen
      for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
    
      buffer[offset + i - d] |= s * 128
    }
    
    
    /***/ }),
    /* 40 */
    /***/ (function(module, exports) {
    
    var toString = {}.toString;
    
    module.exports = Array.isArray || function (arr) {
      return toString.call(arr) == '[object Array]';
    };
    
    
    /***/ }),
    /* 41 */
    /***/ (function(module, exports, __webpack_require__) {
    
    module.exports = __webpack_require__.p + "assets/tei_meta/fonts/fontawesome-webfont.eot";
    
    /***/ }),
    /* 42 */
    /***/ (function(module, exports, __webpack_require__) {
    
    module.exports = __webpack_require__.p + "assets/tei_meta/fonts/fontawesome-webfont.eot";
    
    /***/ }),
    /* 43 */
    /***/ (function(module, exports, __webpack_require__) {
    
    module.exports = __webpack_require__.p + "assets/tei_meta/fonts/fontawesome-webfont.woff2";
    
    /***/ }),
    /* 44 */
    /***/ (function(module, exports, __webpack_require__) {
    
    module.exports = __webpack_require__.p + "assets/tei_meta/fonts/fontawesome-webfont.woff";
    
    /***/ }),
    /* 45 */
    /***/ (function(module, exports, __webpack_require__) {
    
    module.exports = __webpack_require__.p + "assets/tei_meta/fonts/fontawesome-webfont.ttf";
    
    /***/ }),
    /* 46 */
    /***/ (function(module, exports, __webpack_require__) {
    
    module.exports = __webpack_require__.p + "assets/tei_meta/fonts/fontawesome-webfont.svg";
    
    /***/ }),
    /* 47 */
    /***/ (function(module, exports, __webpack_require__) {
    
    /*
        MIT License http://www.opensource.org/licenses/mit-license.php
        Author Tobias Koppers @sokra
    */
    var stylesInDom = {},
        memoize = function(fn) {
            var memo;
            return function () {
                if (typeof memo === "undefined") memo = fn.apply(this, arguments);
                return memo;
            };
        },
        isOldIE = memoize(function() {
            // Test for IE <= 9 as proposed by Browserhacks
            // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
            // Tests for existence of standard globals is to allow style-loader 
            // to operate correctly into non-standard environments
            // @see https://github.com/webpack-contrib/style-loader/issues/177
            return window && document && document.all && !window.atob;
        }),
        getElement = (function(fn) {
            var memo = {};
            return function(selector) {
                if (typeof memo[selector] === "undefined") {
                    memo[selector] = fn.call(this, selector);
                }
                return memo[selector]
            };
        })(function (styleTarget) {
            return document.querySelector(styleTarget)
        }),
        singletonElement = null,
        singletonCounter = 0,
        styleElementsInsertedAtTop = [],
        fixUrls = __webpack_require__(48);
    
    module.exports = function(list, options) {
        if(typeof DEBUG !== "undefined" && DEBUG) {
            if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
        }
    
        options = options || {};
        options.attrs = typeof options.attrs === "object" ? options.attrs : {};
    
        // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
        // tags it will allow on a page
        if (typeof options.singleton === "undefined") options.singleton = isOldIE();
    
        // By default, add <style> tags to the <head> element
        if (typeof options.insertInto === "undefined") options.insertInto = "head";
    
        // By default, add <style> tags to the bottom of the target
        if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
    
        var styles = listToStyles(list);
        addStylesToDom(styles, options);
    
        return function update(newList) {
            var mayRemove = [];
            for(var i = 0; i < styles.length; i++) {
                var item = styles[i];
                var domStyle = stylesInDom[item.id];
                domStyle.refs--;
                mayRemove.push(domStyle);
            }
            if(newList) {
                var newStyles = listToStyles(newList);
                addStylesToDom(newStyles, options);
            }
            for(var i = 0; i < mayRemove.length; i++) {
                var domStyle = mayRemove[i];
                if(domStyle.refs === 0) {
                    for(var j = 0; j < domStyle.parts.length; j++)
                        domStyle.parts[j]();
                    delete stylesInDom[domStyle.id];
                }
            }
        };
    };
    
    function addStylesToDom(styles, options) {
        for(var i = 0; i < styles.length; i++) {
            var item = styles[i];
            var domStyle = stylesInDom[item.id];
            if(domStyle) {
                domStyle.refs++;
                for(var j = 0; j < domStyle.parts.length; j++) {
                    domStyle.parts[j](item.parts[j]);
                }
                for(; j < item.parts.length; j++) {
                    domStyle.parts.push(addStyle(item.parts[j], options));
                }
            } else {
                var parts = [];
                for(var j = 0; j < item.parts.length; j++) {
                    parts.push(addStyle(item.parts[j], options));
                }
                stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
            }
        }
    }
    
    function listToStyles(list) {
        var styles = [];
        var newStyles = {};
        for(var i = 0; i < list.length; i++) {
            var item = list[i];
            var id = item[0];
            var css = item[1];
            var media = item[2];
            var sourceMap = item[3];
            var part = {css: css, media: media, sourceMap: sourceMap};
            if(!newStyles[id])
                styles.push(newStyles[id] = {id: id, parts: [part]});
            else
                newStyles[id].parts.push(part);
        }
        return styles;
    }
    
    function insertStyleElement(options, styleElement) {
        var styleTarget = getElement(options.insertInto)
        if (!styleTarget) {
            throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
        }
        var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
        if (options.insertAt === "top") {
            if(!lastStyleElementInsertedAtTop) {
                styleTarget.insertBefore(styleElement, styleTarget.firstChild);
            } else if(lastStyleElementInsertedAtTop.nextSibling) {
                styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
            } else {
                styleTarget.appendChild(styleElement);
            }
            styleElementsInsertedAtTop.push(styleElement);
        } else if (options.insertAt === "bottom") {
            styleTarget.appendChild(styleElement);
        } else {
            throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
        }
    }
    
    function removeStyleElement(styleElement) {
        styleElement.parentNode.removeChild(styleElement);
        var idx = styleElementsInsertedAtTop.indexOf(styleElement);
        if(idx >= 0) {
            styleElementsInsertedAtTop.splice(idx, 1);
        }
    }
    
    function createStyleElement(options) {
        var styleElement = document.createElement("style");
        options.attrs.type = "text/css";
    
        attachTagAttrs(styleElement, options.attrs);
        insertStyleElement(options, styleElement);
        return styleElement;
    }
    
    function createLinkElement(options) {
        var linkElement = document.createElement("link");
        options.attrs.type = "text/css";
        options.attrs.rel = "stylesheet";
    
        attachTagAttrs(linkElement, options.attrs);
        insertStyleElement(options, linkElement);
        return linkElement;
    }
    
    function attachTagAttrs(element, attrs) {
        Object.keys(attrs).forEach(function (key) {
            element.setAttribute(key, attrs[key]);
        });
    }
    
    function addStyle(obj, options) {
        var styleElement, update, remove;
    
        if (options.singleton) {
            var styleIndex = singletonCounter++;
            styleElement = singletonElement || (singletonElement = createStyleElement(options));
            update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
            remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
        } else if(obj.sourceMap &&
            typeof URL === "function" &&
            typeof URL.createObjectURL === "function" &&
            typeof URL.revokeObjectURL === "function" &&
            typeof Blob === "function" &&
            typeof btoa === "function") {
            styleElement = createLinkElement(options);
            update = updateLink.bind(null, styleElement, options);
            remove = function() {
                removeStyleElement(styleElement);
                if(styleElement.href)
                    URL.revokeObjectURL(styleElement.href);
            };
        } else {
            styleElement = createStyleElement(options);
            update = applyToTag.bind(null, styleElement);
            remove = function() {
                removeStyleElement(styleElement);
            };
        }
    
        update(obj);
    
        return function updateStyle(newObj) {
            if(newObj) {
                if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
                    return;
                update(obj = newObj);
            } else {
                remove();
            }
        };
    }
    
    var replaceText = (function () {
        var textStore = [];
    
        return function (index, replacement) {
            textStore[index] = replacement;
            return textStore.filter(Boolean).join('\n');
        };
    })();
    
    function applyToSingletonTag(styleElement, index, remove, obj) {
        var css = remove ? "" : obj.css;
    
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = replaceText(index, css);
        } else {
            var cssNode = document.createTextNode(css);
            var childNodes = styleElement.childNodes;
            if (childNodes[index]) styleElement.removeChild(childNodes[index]);
            if (childNodes.length) {
                styleElement.insertBefore(cssNode, childNodes[index]);
            } else {
                styleElement.appendChild(cssNode);
            }
        }
    }
    
    function applyToTag(styleElement, obj) {
        var css = obj.css;
        var media = obj.media;
    
        if(media) {
            styleElement.setAttribute("media", media)
        }
    
        if(styleElement.styleSheet) {
            styleElement.styleSheet.cssText = css;
        } else {
            while(styleElement.firstChild) {
                styleElement.removeChild(styleElement.firstChild);
            }
            styleElement.appendChild(document.createTextNode(css));
        }
    }
    
    function updateLink(linkElement, options, obj) {
        var css = obj.css;
        var sourceMap = obj.sourceMap;
    
        /* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
        and there is no publicPath defined then lets turn convertToAbsoluteUrls
        on by default.  Otherwise default to the convertToAbsoluteUrls option
        directly
        */
        var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;
    
        if (options.convertToAbsoluteUrls || autoFixUrls){
            css = fixUrls(css);
        }
    
        if(sourceMap) {
            // http://stackoverflow.com/a/26603875
            css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
        }
    
        var blob = new Blob([css], { type: "text/css" });
    
        var oldSrc = linkElement.href;
    
        linkElement.href = URL.createObjectURL(blob);
    
        if(oldSrc)
            URL.revokeObjectURL(oldSrc);
    }
    
    
    /***/ }),
    /* 48 */
    /***/ (function(module, exports) {
    
    
    /**
     * When source maps are enabled, `style-loader` uses a link element with a data-uri to
     * embed the css on the page. This breaks all relative urls because now they are relative to a
     * bundle instead of the current page.
     *
     * One solution is to only use full urls, but that may be impossible.
     *
     * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
     *
     * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
     *
     */
    
    module.exports = function (css) {
      // get current location
      var location = typeof window !== "undefined" && window.location;
    
      if (!location) {
        throw new Error("fixUrls requires window.location");
      }
    
        // blank or null?
        if (!css || typeof css !== "string") {
          return css;
      }
    
      var baseUrl = location.protocol + "//" + location.host;
      var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");
    
        // convert each url(...)
        /*
        This regular expression is just a way to recursively match brackets within
        a string.
    
         /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
           (  = Start a capturing group
             (?:  = Start a non-capturing group
                 [^)(]  = Match anything that isn't a parentheses
                 |  = OR
                 \(  = Match a start parentheses
                     (?:  = Start another non-capturing groups
                         [^)(]+  = Match anything that isn't a parentheses
                         |  = OR
                         \(  = Match a start parentheses
                             [^)(]*  = Match anything that isn't a parentheses
                         \)  = Match a end parentheses
                     )  = End Group
                  *\) = Match anything and then a close parens
              )  = Close non-capturing group
              *  = Match anything
           )  = Close capturing group
         \)  = Match a close parens
    
         /gi  = Get all matches, not the first.  Be case insensitive.
         */
        var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
            // strip quotes (if they exist)
            var unquotedOrigUrl = origUrl
                .trim()
                .replace(/^"(.*)"$/, function(o, $1){ return $1; })
                .replace(/^'(.*)'$/, function(o, $1){ return $1; });
    
            // already a full url? no change
            if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
              return fullMatch;
            }
    
            // convert the url to a full url
            var newUrl;
    
            if (unquotedOrigUrl.indexOf("//") === 0) {
                  //TODO: should we add protocol?
                newUrl = unquotedOrigUrl;
            } else if (unquotedOrigUrl.indexOf("/") === 0) {
                // path should be relative to the base url
                newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
            } else {
                // path should be relative to current directory
                newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
            }
    
            // send back the fixed url(...)
            return "url(" + JSON.stringify(newUrl) + ")";
        });
    
        // send back the fixed css
        return fixedCss;
    };
    
    
    /***/ }),
    /* 49 */
    /***/ (function(module, exports, __webpack_require__) {
    
    // style-loader: Adds some css to the DOM by adding a <style> tag
    
    // load the styles
    var content = __webpack_require__(50);
    if(typeof content === 'string') content = [[module.i, content, '']];
    // add the styles to the DOM
    var update = __webpack_require__(47)(content, {});
    if(content.locals) module.exports = content.locals;
    // Hot Module Replacement
    if(false) {}
    
    /***/ }),
    /* 50 */
    /***/ (function(module, exports, __webpack_require__) {
    
    exports = module.exports = __webpack_require__(36)(undefined);
    // imports
    
    
    // module
    exports.push([module.i, "/*\n * css for the automatically generated part\n */\n\n.infofiles {\n    padding-top: 10px;\n    font-size: 110%;\n    background-color: darkblue;\n    color: #fff;\n}\n\n.headtopi {\n    padding-left: 4px;\n    vertical-align: middle;\n}\n\n.headtopt {\n    text-align: center;\n    vertical-align: middle;\n}\n\n.fa-color-required { color: #fb1820; }\n.fa-color-optional { color: #2d8924; }\n.fa-color-expand { color: #551cd9; }\n.fa-color-toggle { color: #26cdd9; }\n\n/*\n.fa-choice-toggle { color: #099ff6; }\n.fa-choice-set { color: #01feaa; }\n.fa-choice-expand { color: #2803fc; }\n.fa-choice-not-set { color: #e8176b; }\n.violet-klein { color: #551cd9; }\n*/\n\n/*\n * nodeContent\n */\n\n.nodeIdent {\n    /*\n    display: inline;\n    */\n    border: 1px solid #551cd9;\n    border-collapse: collapse;\n\tborder-radius: 2px;\n    font-weight: bold;\n}\n\n.showonoff {\n    display: inline;\n}\n\n.nodeContent {\n    width:\"100%\";\n    /*\n    border: 2px solid blue;\n\tborder-radius: 2px;\n    margin-top: 5px;\n    margin-bottom: 5px;\n    */\n    border-collapse: collapse;\n    padding: 2px;\n    /*\n    display: inline;\n    */\n}\n\n.eltDesc {\n    display: inline;\n    font-style: italic;\n    font-size: smaller;\n    background-color: lightgray;\n}\n\n.eltDescBlock {\n    display: block;\n    font-style: italic;\n    font-size: smaller;\n    background-color: lightgray;\n}\n\n.toggle {\n    display: inline;\n}\n\n.contentCountMany {\n    /*\n        ici optionel pour les blocs à ajouter\n    */\n    display: block;\n\n    /*\n    border: 1px solid black;\n\tborder-radius: 4px;\n    background-color: #88AAFF;\n    */\n}\n\n.contentCountSimple {\n    display: block;\n}\n\n.plusCM {\n    float: left;\n    margin-right: 5px;\n    margin-top: 0px;\n    color: blue;\n    /*\n    border: 1px solid blue;\n\tborder-radius: 4px;\n    */\n}\n\n.content {\n    display: block;\n    clear: both;\n}\n\n.headSequence {\n    display: block;\n}\n\n.validate {\n    display: inline-block;\n}\n\n.nodeField {\n    /*\n    display: inline-block;\n    */\n    font-size: large;\n}\n\n.headSequence .nodeField {\n    display: block;\n}\n\n.headHRef {\n    display: inline-block;\n/*    border: 1px solid grey; */\n}\n\n.highlight {\n    border: 3px solid green;\n}\n\n.nodeEdit {\n    display: inline-block;\n}\n\n.nodeAttr {\n    display: inline-block;\n    font-size: initial;\n}\n\n.nodeAttr label {\n    margin-left: 5px;\n    margin-right: 5px;\n    font-style: italic;\n    font-size: smaller;\n    background-color: lightgray;\n}\n\n.nodeField label {\n    margin-left: 5px;\n    margin-right: 5px;\n    /*\n    border: 1px solid blue;\n\tborder-radius: 4px;\n    */\n    font-style: italic;\n    font-size: smaller;\n    background-color: lightgray;\n}\n\n.nodeField em {\n    margin-left: 5px;\n    margin-right: 5px;\n}\n\ninput {\n    background-color: #F7F7F7;\n    min-width: 30px!important;\n    max-width: 800px!important;\n    transition: width 0.25s;\n    font-size: large;\n}\n\ninput.date {\n    background-color: #F7F7F7;\n    width: 180px;\n    font-size: large;\n}\n\nstrong {\n    font-size: x-large;\n}\n\nselect {\n    font-size: large;\n}\n\n.iso {\n    font-size: smaller;\n    width: 600px;\n}\n\n.optional {\n    background-color: #88FFFF;\n}\n\n.recommended {\n    background-color: #88AAFF;\n}\n\n.obligatory {\n    background-color: white;\n}\n\n.fa-square-o { \n    color:blue;\n}\n\n.fa-check-square-o { \n    color:blue;\n}\n\n.multiline {\n    display: block;\n    box-sizing: padding-box;\n    overflow: hidden;\n    min-width: 50px;\n    padding: 0px;\n}\n\nbutton.ok {\n    background-color: blue;\n    color: white;\n}\n\n/*Style for popup ODD choice*/\n#aumomodal {\n    background: whitesmoke;\n}\n.aumo {\n    display:block;\n    min-width:100px;\n    height: 30px;\n    text-align: left;\n    line-height: 30px;\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    color: #fff;\n    background-color: darkblue;\n    text-decoration: none;\n    border-collapse: collapse;\n\tborder-radius: 4px;\n}\n\n.aumo p {\n    margin: 0;\n    padding: 0;\n}\n\n.aumobutton {\n    border: 1px solid white;\n}\n\n.aumobutton:hover {\n    background: #19c589;\n}\n\n.aumoinfo {\n    background: blue;\n    font-size: large;\n}\n.aumotitle {\n    background: blue;\n    font-size: large;\n}\n\n.aumocancel {\n    border: 1px solid white;\n}\n\n.aumocancel:hover {\n    background: #19c589;\n}\n", ""]);
    
    // exports
    
    
    /***/ }),
    /* 51 */
    /***/ (function(module, exports, __webpack_require__) {
    
    // style-loader: Adds some css to the DOM by adding a <style> tag
    
    // load the styles
    var content = __webpack_require__(52);
    if(typeof content === 'string') content = [[module.i, content, '']];
    // add the styles to the DOM
    var update = __webpack_require__(47)(content, {});
    if(content.locals) module.exports = content.locals;
    // Hot Module Replacement
    if(false) {}
    
    /***/ }),
    /* 52 */
    /***/ (function(module, exports, __webpack_require__) {
    
    exports = module.exports = __webpack_require__(36)(undefined);
    // imports
    
    
    // module
   // exports.push([module.i, "/*\n * css for the standard user interface\n */\n\n#topall {\n    width: 100%;\n}\n#bottomall {\n    margin-top: 30px;  \n}\n/*Responsive Styles*/\n@media screen and (max-width : 780px) {\n    /*Display menu on two lines*/\n    #bottomall {\n        margin-top: 60px;  \n    }\n}\n\n/*Strip the ul of padding and list styling*/\nnav ul {\n    list-style-type:none;\n    margin:0;\n    padding:0;\n    position: absolute;\n}\n/*Create a horizontal list with spacing*/\nnav li {\n    display: block;\n    float: left;\n    margin-right: 1px;\n}\n/*Style for menu links*/\nnav li a {\n    display:block;\n    min-width:100px;\n    height: 30px;\n    text-align: center;\n    line-height: 30px;\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    color: #fff;\n    background: darkblue;\n    text-decoration: none;\n    border: 1px solid white;\n}\n/*Hover state for top level links*/\nnav li:hover a {\n    background: #19c589;\n}\n/*Style for dropdown links*/\nnav li:hover ul a {\n    background: #f3f3f3;\n    color: #2f3036;\n    height: 30px;\n    line-height: 30px;\n}\n/*Hover state for dropdown links*/\nnav li:hover ul a:hover {\n    background: #19c589;\n    color: #fff;\n}\n/*Hide dropdown links until they are needed*/\nnav li ul {\n    display: none;\n}\n/*Make dropdown links vertical*/\nnav li ul li {\n    display: block;\n    float: none;\n}\n/*Prevent text wrapping*/\nnav li ul li a {\n    width: auto;\n    min-width: 100px;\n    padding: 0 10px;\n    text-align: left;\n}\n/*Display the dropdown on hover*/\nnav ul li a:hover + .hidden, .hidden:hover {\n    display: block;\n}\n/*Style 'show menu' label button and hide it by default*/\n.show-menu {\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    text-decoration: none;\n    color: #fff;\n    background: #19c589;\n    text-align: center;\n    padding: 10px 0;\n    display: none;\n}\n/*Hide checkbox*/\nnav input[type=checkbox]{   \n    display: none;\n}\n/*Show menu when invisible checkbox is checked*/\nnav input[type=checkbox]:checked ~ #menu{\n    display: block;\n}\n/*Responsive Styles*/\n@media screen and (max-width : 300px){\n    /*Make dropdown links appear inline*/\n    ul {\n        position: static;\n        display: none;\n    }\n    /*Create vertical spacing*/\n    li {\n        margin-bottom: 1px;\n    }\n    /*Make all menu links full width*/\n    ul li, li a {\n        width: 100%;\n    }\n    /*Display 'show menu' link*/\n    .show-menu {\n        display:block;\n    }\n}\n", ""]);
    
    // exports
    
    
    /***/ })
    /******/ ]);