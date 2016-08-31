
// Lazyload code
/*jslint browser: true, eqeqeq: true, bitwise: true, newcap: true, immed: true, regexp: false */
/**
LazyLoad makes it easy and painless to lazily load one or more external
JavaScript or CSS files on demand either during or after the rendering of a web
page.
Supported browsers include Firefox 2+, IE6+, Safari 3+ (including Mobile
Safari), Google Chrome, and Opera 9+. Other browsers may or may not work and
are not officially supported.
Visit https://github.com/rgrove/lazyload/ for more info.
Copyright (c) 2011 Ryan Grove <ryan@wonko.com>
All rights reserved.
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
@module lazyload
@class LazyLoad
@static
@version 2.0.3 (git)
*/
LazyLoad=function(a){function b(b,c){var d=a.createElement(b),e;for(e in c)c.hasOwnProperty(e)&&d.setAttribute(e,c[e]);return d}function c(a){var b=j[a],c,d;b&&(c=b.callback,d=b.urls,d.shift(),k=0,d.length||(c&&c.call(b.context,b.obj),j[a]=null,l[a].length&&e(a)))}function d(){var b=navigator.userAgent;h={async:a.createElement("script").async===!0};(h.webkit=/AppleWebKit\//.test(b))||(h.ie=/MSIE/.test(b))||(h.opera=/Opera/.test(b))||(h.gecko=/Gecko\//.test(b))||(h.unknown=!0)}function e(e,k,m,o,q){var r=function(){c(e)},v=e==="css",x=[],y,z,A,B;h||d();if(k)if(k=typeof k=="string"?[k]:k.concat(),v||h.async||h.gecko||h.opera)l[e].push({urls:k,callback:m,obj:o,context:q});else{y=0;for(z=k.length;y<z;++y)l[e].push({urls:[k[y]],callback:y===z-1?m:null,obj:o,context:q})}if(!j[e]&&(B=j[e]=l[e].shift())){i||(i=a.head||a.getElementsByTagName("head")[0]);k=B.urls;y=0;for(z=k.length;y<z;++y)m=k[y],v?A=h.gecko?b("style"):b("link",{href:m,rel:"stylesheet"}):(A=b("script",{src:m}),A.async=!1),A.className="lazyload",A.setAttribute("charset","utf-8"),h.ie&&!v?A.onreadystatechange=function(){/loaded|complete/.test(A.readyState)&&(A.onreadystatechange=null,r())}:v&&(h.gecko||h.webkit)?h.webkit?(B.urls[y]=A.href,g()):(A.innerHTML='@import "'+m+'";',f(A)):A.onload=A.onerror=r,x.push(A);y=0;for(z=x.length;y<z;++y)i.appendChild(x[y])}}function f(a){var b;try{b=!!a.sheet.cssRules}catch(d){k+=1;k<200?setTimeout(function(){f(a)},50):b&&c("css");return}c("css")}function g(){var a=j.css,b;if(a){for(b=m.length;--b>=0;)if(m[b].href===a.urls[0]){c("css");break}k+=1;a&&(k<200?setTimeout(g,50):c("css"))}}var h,i,j={},k=0,l={css:[],js:[]},m=a.styleSheets;return{css:function(a,b,c,d){e("css",a,b,c,d)},js:function(a,b,c,d){e("js",a,b,c,d)}}}(this.document);
function getJSFiles(pageJSFiles) {
// These are the standard JS files all pages need
var jsFiles=[
'//use.typekit.com/tmb7qux.js',
'//www.google.com/cse/cse.js?cx=001814011871879729902:ugq2c6leueg'
];
// If there are any addtional files, add them
if (pageJSFiles) {jsFiles.push(pageJSFiles)}
return jsFiles
}
function loadJSFiles (pageParameters) {
var d=document,
objStyle=d.createElement('style'),
objScript=d.getElementsByTagName('script')[0],
jsFiles=[],
thisURI = window.location+'',
pageType = thisURI.toLowerCase();
pageType = (pageType.indexOf('visualedit') === -1) ? pageParameters.page : 'harris-visual-edit';
// Collect JS files to load
switch (pageType) {
case 'alums-inner': jsFiles = getJSFiles('https://alums.vassar.edu/min/g=js-alums-inner&amp;1392403001'); break;
case 'alums-inner-harris': jsFiles = getJSFiles('https://alums.vassar.edu/min/g=js-harris&amp;1392403001'); break;
default: jsFiles = getJSFiles(!1)
}
// Condition prevents JS loading so Harris visual editor has no JS conflict
if (pageType === 'harris-visual-edit') {
objStyle.innerHTML = 'body { visibility: visible; }';
objScript.parentNode.insertBefore(objStyle, objScript)
}
else {
/*
* Asynchronously load the collected JS files
* Check that jQuery loaded, if not, load a local copy
* Once all JS files have loaded, run our JS code
*/
LazyLoad.js(jsFiles,function(){
window.jQuery?fncSiteJS(pageParameters):
LazyLoad.js(['/assets/js/jquery/library/jquery-1.7.1.min.js'],
function(){fncSiteJS(pageParameters)}
)
}
)
}
}
loadJSFiles ({page:'alums-inner',weather:'<b class="temperature">31&#176;</b><b class="degree">F</b><p class="weather-description">The <a href="http://forecast.weather.gov/MapClick.php?CityName=Poughkeepsie&state=NY&site=ALY&lat=41.6958&lon=-73.9225">weather</a> at Vassar is light snow freezing fog.</p>'});
// Make sure if Typekit doesn't load any classes in the HTML tag, that we add one so the page will become visible again
/*
window.setTimeout (
function(){
var H = document.getElementsByTagName('html')[0];
if(H.className.indexOf('wf-') === -1){ H.className=H.className.replace(/\b([.]*\b)/,'wf-error $1'); }
}
,1000);
*/