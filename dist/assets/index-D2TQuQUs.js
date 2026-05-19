(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const p of document.querySelectorAll('link[rel="modulepreload"]'))d(p);new MutationObserver(p=>{for(const f of p)if(f.type==="childList")for(const h of f.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&d(h)}).observe(document,{childList:!0,subtree:!0});function c(p){const f={};return p.integrity&&(f.integrity=p.integrity),p.referrerPolicy&&(f.referrerPolicy=p.referrerPolicy),p.crossOrigin==="use-credentials"?f.credentials="include":p.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function d(p){if(p.ep)return;p.ep=!0;const f=c(p);fetch(p.href,f)}})();function Hu(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var gl={exports:{}},ri={},yl={exports:{}},pe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var vu;function uf(){if(vu)return pe;vu=1;var s=Symbol.for("react.element"),a=Symbol.for("react.portal"),c=Symbol.for("react.fragment"),d=Symbol.for("react.strict_mode"),p=Symbol.for("react.profiler"),f=Symbol.for("react.provider"),h=Symbol.for("react.context"),y=Symbol.for("react.forward_ref"),C=Symbol.for("react.suspense"),b=Symbol.for("react.memo"),N=Symbol.for("react.lazy"),T=Symbol.iterator;function O(v){return v===null||typeof v!="object"?null:(v=T&&v[T]||v["@@iterator"],typeof v=="function"?v:null)}var L={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},S=Object.assign,k={};function w(v,A,se){this.props=v,this.context=A,this.refs=k,this.updater=se||L}w.prototype.isReactComponent={},w.prototype.setState=function(v,A){if(typeof v!="object"&&typeof v!="function"&&v!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,v,A,"setState")},w.prototype.forceUpdate=function(v){this.updater.enqueueForceUpdate(this,v,"forceUpdate")};function B(){}B.prototype=w.prototype;function H(v,A,se){this.props=v,this.context=A,this.refs=k,this.updater=se||L}var te=H.prototype=new B;te.constructor=H,S(te,w.prototype),te.isPureReactComponent=!0;var ne=Array.isArray,xe=Object.prototype.hasOwnProperty,Ne={current:null},ge={key:!0,ref:!0,__self:!0,__source:!0};function Fe(v,A,se){var re,le={},ae=null,fe=null;if(A!=null)for(re in A.ref!==void 0&&(fe=A.ref),A.key!==void 0&&(ae=""+A.key),A)xe.call(A,re)&&!ge.hasOwnProperty(re)&&(le[re]=A[re]);var ue=arguments.length-2;if(ue===1)le.children=se;else if(1<ue){for(var we=Array(ue),He=0;He<ue;He++)we[He]=arguments[He+2];le.children=we}if(v&&v.defaultProps)for(re in ue=v.defaultProps,ue)le[re]===void 0&&(le[re]=ue[re]);return{$$typeof:s,type:v,key:ae,ref:fe,props:le,_owner:Ne.current}}function Be(v,A){return{$$typeof:s,type:v.type,key:A,ref:v.ref,props:v.props,_owner:v._owner}}function Je(v){return typeof v=="object"&&v!==null&&v.$$typeof===s}function st(v){var A={"=":"=0",":":"=2"};return"$"+v.replace(/[=:]/g,function(se){return A[se]})}var $e=/\/+/g;function Se(v,A){return typeof v=="object"&&v!==null&&v.key!=null?st(""+v.key):A.toString(36)}function Ee(v,A,se,re,le){var ae=typeof v;(ae==="undefined"||ae==="boolean")&&(v=null);var fe=!1;if(v===null)fe=!0;else switch(ae){case"string":case"number":fe=!0;break;case"object":switch(v.$$typeof){case s:case a:fe=!0}}if(fe)return fe=v,le=le(fe),v=re===""?"."+Se(fe,0):re,ne(le)?(se="",v!=null&&(se=v.replace($e,"$&/")+"/"),Ee(le,A,se,"",function(He){return He})):le!=null&&(Je(le)&&(le=Be(le,se+(!le.key||fe&&fe.key===le.key?"":(""+le.key).replace($e,"$&/")+"/")+v)),A.push(le)),1;if(fe=0,re=re===""?".":re+":",ne(v))for(var ue=0;ue<v.length;ue++){ae=v[ue];var we=re+Se(ae,ue);fe+=Ee(ae,A,se,we,le)}else if(we=O(v),typeof we=="function")for(v=we.call(v),ue=0;!(ae=v.next()).done;)ae=ae.value,we=re+Se(ae,ue++),fe+=Ee(ae,A,se,we,le);else if(ae==="object")throw A=String(v),Error("Objects are not valid as a React child (found: "+(A==="[object Object]"?"object with keys {"+Object.keys(v).join(", ")+"}":A)+"). If you meant to render a collection of children, use an array instead.");return fe}function Me(v,A,se){if(v==null)return v;var re=[],le=0;return Ee(v,re,"","",function(ae){return A.call(se,ae,le++)}),re}function he(v){if(v._status===-1){var A=v._result;A=A(),A.then(function(se){(v._status===0||v._status===-1)&&(v._status=1,v._result=se)},function(se){(v._status===0||v._status===-1)&&(v._status=2,v._result=se)}),v._status===-1&&(v._status=0,v._result=A)}if(v._status===1)return v._result.default;throw v._result}var ve={current:null},D={transition:null},q={ReactCurrentDispatcher:ve,ReactCurrentBatchConfig:D,ReactCurrentOwner:Ne};function $(){throw Error("act(...) is not supported in production builds of React.")}return pe.Children={map:Me,forEach:function(v,A,se){Me(v,function(){A.apply(this,arguments)},se)},count:function(v){var A=0;return Me(v,function(){A++}),A},toArray:function(v){return Me(v,function(A){return A})||[]},only:function(v){if(!Je(v))throw Error("React.Children.only expected to receive a single React element child.");return v}},pe.Component=w,pe.Fragment=c,pe.Profiler=p,pe.PureComponent=H,pe.StrictMode=d,pe.Suspense=C,pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=q,pe.act=$,pe.cloneElement=function(v,A,se){if(v==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+v+".");var re=S({},v.props),le=v.key,ae=v.ref,fe=v._owner;if(A!=null){if(A.ref!==void 0&&(ae=A.ref,fe=Ne.current),A.key!==void 0&&(le=""+A.key),v.type&&v.type.defaultProps)var ue=v.type.defaultProps;for(we in A)xe.call(A,we)&&!ge.hasOwnProperty(we)&&(re[we]=A[we]===void 0&&ue!==void 0?ue[we]:A[we])}var we=arguments.length-2;if(we===1)re.children=se;else if(1<we){ue=Array(we);for(var He=0;He<we;He++)ue[He]=arguments[He+2];re.children=ue}return{$$typeof:s,type:v.type,key:le,ref:ae,props:re,_owner:fe}},pe.createContext=function(v){return v={$$typeof:h,_currentValue:v,_currentValue2:v,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},v.Provider={$$typeof:f,_context:v},v.Consumer=v},pe.createElement=Fe,pe.createFactory=function(v){var A=Fe.bind(null,v);return A.type=v,A},pe.createRef=function(){return{current:null}},pe.forwardRef=function(v){return{$$typeof:y,render:v}},pe.isValidElement=Je,pe.lazy=function(v){return{$$typeof:N,_payload:{_status:-1,_result:v},_init:he}},pe.memo=function(v,A){return{$$typeof:b,type:v,compare:A===void 0?null:A}},pe.startTransition=function(v){var A=D.transition;D.transition={};try{v()}finally{D.transition=A}},pe.unstable_act=$,pe.useCallback=function(v,A){return ve.current.useCallback(v,A)},pe.useContext=function(v){return ve.current.useContext(v)},pe.useDebugValue=function(){},pe.useDeferredValue=function(v){return ve.current.useDeferredValue(v)},pe.useEffect=function(v,A){return ve.current.useEffect(v,A)},pe.useId=function(){return ve.current.useId()},pe.useImperativeHandle=function(v,A,se){return ve.current.useImperativeHandle(v,A,se)},pe.useInsertionEffect=function(v,A){return ve.current.useInsertionEffect(v,A)},pe.useLayoutEffect=function(v,A){return ve.current.useLayoutEffect(v,A)},pe.useMemo=function(v,A){return ve.current.useMemo(v,A)},pe.useReducer=function(v,A,se){return ve.current.useReducer(v,A,se)},pe.useRef=function(v){return ve.current.useRef(v)},pe.useState=function(v){return ve.current.useState(v)},pe.useSyncExternalStore=function(v,A,se){return ve.current.useSyncExternalStore(v,A,se)},pe.useTransition=function(){return ve.current.useTransition()},pe.version="18.3.1",pe}var bu;function Tl(){return bu||(bu=1,yl.exports=uf()),yl.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wu;function df(){if(wu)return ri;wu=1;var s=Tl(),a=Symbol.for("react.element"),c=Symbol.for("react.fragment"),d=Object.prototype.hasOwnProperty,p=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,f={key:!0,ref:!0,__self:!0,__source:!0};function h(y,C,b){var N,T={},O=null,L=null;b!==void 0&&(O=""+b),C.key!==void 0&&(O=""+C.key),C.ref!==void 0&&(L=C.ref);for(N in C)d.call(C,N)&&!f.hasOwnProperty(N)&&(T[N]=C[N]);if(y&&y.defaultProps)for(N in C=y.defaultProps,C)T[N]===void 0&&(T[N]=C[N]);return{$$typeof:a,type:y,key:O,ref:L,props:T,_owner:p.current}}return ri.Fragment=c,ri.jsx=h,ri.jsxs=h,ri}var ku;function pf(){return ku||(ku=1,gl.exports=df()),gl.exports}var i=pf(),U=Tl();const Ku=Hu(U);var gs={},vl={exports:{}},mt={},bl={exports:{}},wl={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ju;function ff(){return ju||(ju=1,(function(s){function a(D,q){var $=D.length;D.push(q);e:for(;0<$;){var v=$-1>>>1,A=D[v];if(0<p(A,q))D[v]=q,D[$]=A,$=v;else break e}}function c(D){return D.length===0?null:D[0]}function d(D){if(D.length===0)return null;var q=D[0],$=D.pop();if($!==q){D[0]=$;e:for(var v=0,A=D.length,se=A>>>1;v<se;){var re=2*(v+1)-1,le=D[re],ae=re+1,fe=D[ae];if(0>p(le,$))ae<A&&0>p(fe,le)?(D[v]=fe,D[ae]=$,v=ae):(D[v]=le,D[re]=$,v=re);else if(ae<A&&0>p(fe,$))D[v]=fe,D[ae]=$,v=ae;else break e}}return q}function p(D,q){var $=D.sortIndex-q.sortIndex;return $!==0?$:D.id-q.id}if(typeof performance=="object"&&typeof performance.now=="function"){var f=performance;s.unstable_now=function(){return f.now()}}else{var h=Date,y=h.now();s.unstable_now=function(){return h.now()-y}}var C=[],b=[],N=1,T=null,O=3,L=!1,S=!1,k=!1,w=typeof setTimeout=="function"?setTimeout:null,B=typeof clearTimeout=="function"?clearTimeout:null,H=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function te(D){for(var q=c(b);q!==null;){if(q.callback===null)d(b);else if(q.startTime<=D)d(b),q.sortIndex=q.expirationTime,a(C,q);else break;q=c(b)}}function ne(D){if(k=!1,te(D),!S)if(c(C)!==null)S=!0,he(xe);else{var q=c(b);q!==null&&ve(ne,q.startTime-D)}}function xe(D,q){S=!1,k&&(k=!1,B(Fe),Fe=-1),L=!0;var $=O;try{for(te(q),T=c(C);T!==null&&(!(T.expirationTime>q)||D&&!st());){var v=T.callback;if(typeof v=="function"){T.callback=null,O=T.priorityLevel;var A=v(T.expirationTime<=q);q=s.unstable_now(),typeof A=="function"?T.callback=A:T===c(C)&&d(C),te(q)}else d(C);T=c(C)}if(T!==null)var se=!0;else{var re=c(b);re!==null&&ve(ne,re.startTime-q),se=!1}return se}finally{T=null,O=$,L=!1}}var Ne=!1,ge=null,Fe=-1,Be=5,Je=-1;function st(){return!(s.unstable_now()-Je<Be)}function $e(){if(ge!==null){var D=s.unstable_now();Je=D;var q=!0;try{q=ge(!0,D)}finally{q?Se():(Ne=!1,ge=null)}}else Ne=!1}var Se;if(typeof H=="function")Se=function(){H($e)};else if(typeof MessageChannel<"u"){var Ee=new MessageChannel,Me=Ee.port2;Ee.port1.onmessage=$e,Se=function(){Me.postMessage(null)}}else Se=function(){w($e,0)};function he(D){ge=D,Ne||(Ne=!0,Se())}function ve(D,q){Fe=w(function(){D(s.unstable_now())},q)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(D){D.callback=null},s.unstable_continueExecution=function(){S||L||(S=!0,he(xe))},s.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Be=0<D?Math.floor(1e3/D):5},s.unstable_getCurrentPriorityLevel=function(){return O},s.unstable_getFirstCallbackNode=function(){return c(C)},s.unstable_next=function(D){switch(O){case 1:case 2:case 3:var q=3;break;default:q=O}var $=O;O=q;try{return D()}finally{O=$}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(D,q){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var $=O;O=D;try{return q()}finally{O=$}},s.unstable_scheduleCallback=function(D,q,$){var v=s.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?v+$:v):$=v,D){case 1:var A=-1;break;case 2:A=250;break;case 5:A=1073741823;break;case 4:A=1e4;break;default:A=5e3}return A=$+A,D={id:N++,callback:q,priorityLevel:D,startTime:$,expirationTime:A,sortIndex:-1},$>v?(D.sortIndex=$,a(b,D),c(C)===null&&D===c(b)&&(k?(B(Fe),Fe=-1):k=!0,ve(ne,$-v))):(D.sortIndex=A,a(C,D),S||L||(S=!0,he(xe))),D},s.unstable_shouldYield=st,s.unstable_wrapCallback=function(D){var q=O;return function(){var $=O;O=q;try{return D.apply(this,arguments)}finally{O=$}}}})(wl)),wl}var Nu;function hf(){return Nu||(Nu=1,bl.exports=ff()),bl.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Su;function mf(){if(Su)return mt;Su=1;var s=Tl(),a=hf();function c(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d=new Set,p={};function f(e,t){h(e,t),h(e+"Capture",t)}function h(e,t){for(p[e]=t,e=0;e<t.length;e++)d.add(t[e])}var y=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),C=Object.prototype.hasOwnProperty,b=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,N={},T={};function O(e){return C.call(T,e)?!0:C.call(N,e)?!1:b.test(e)?T[e]=!0:(N[e]=!0,!1)}function L(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function S(e,t,n,r){if(t===null||typeof t>"u"||L(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function k(e,t,n,r,o,l,u){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=l,this.removeEmptyString=u}var w={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){w[e]=new k(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];w[t]=new k(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){w[e]=new k(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){w[e]=new k(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){w[e]=new k(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){w[e]=new k(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){w[e]=new k(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){w[e]=new k(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){w[e]=new k(e,5,!1,e.toLowerCase(),null,!1,!1)});var B=/[\-:]([a-z])/g;function H(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(B,H);w[t]=new k(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(B,H);w[t]=new k(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(B,H);w[t]=new k(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){w[e]=new k(e,1,!1,e.toLowerCase(),null,!1,!1)}),w.xlinkHref=new k("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){w[e]=new k(e,1,!1,e.toLowerCase(),null,!0,!0)});function te(e,t,n,r){var o=w.hasOwnProperty(t)?w[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(S(t,n,o,r)&&(n=null),r||o===null?O(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var ne=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,xe=Symbol.for("react.element"),Ne=Symbol.for("react.portal"),ge=Symbol.for("react.fragment"),Fe=Symbol.for("react.strict_mode"),Be=Symbol.for("react.profiler"),Je=Symbol.for("react.provider"),st=Symbol.for("react.context"),$e=Symbol.for("react.forward_ref"),Se=Symbol.for("react.suspense"),Ee=Symbol.for("react.suspense_list"),Me=Symbol.for("react.memo"),he=Symbol.for("react.lazy"),ve=Symbol.for("react.offscreen"),D=Symbol.iterator;function q(e){return e===null||typeof e!="object"?null:(e=D&&e[D]||e["@@iterator"],typeof e=="function"?e:null)}var $=Object.assign,v;function A(e){if(v===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);v=t&&t[1]||""}return`
`+v+e}var se=!1;function re(e,t){if(!e||se)return"";se=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(R){var r=R}Reflect.construct(e,[],t)}else{try{t.call()}catch(R){r=R}e.call(t.prototype)}else{try{throw Error()}catch(R){r=R}e()}}catch(R){if(R&&r&&typeof R.stack=="string"){for(var o=R.stack.split(`
`),l=r.stack.split(`
`),u=o.length-1,m=l.length-1;1<=u&&0<=m&&o[u]!==l[m];)m--;for(;1<=u&&0<=m;u--,m--)if(o[u]!==l[m]){if(u!==1||m!==1)do if(u--,m--,0>m||o[u]!==l[m]){var x=`
`+o[u].replace(" at new "," at ");return e.displayName&&x.includes("<anonymous>")&&(x=x.replace("<anonymous>",e.displayName)),x}while(1<=u&&0<=m);break}}}finally{se=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?A(e):""}function le(e){switch(e.tag){case 5:return A(e.type);case 16:return A("Lazy");case 13:return A("Suspense");case 19:return A("SuspenseList");case 0:case 2:case 15:return e=re(e.type,!1),e;case 11:return e=re(e.type.render,!1),e;case 1:return e=re(e.type,!0),e;default:return""}}function ae(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ge:return"Fragment";case Ne:return"Portal";case Be:return"Profiler";case Fe:return"StrictMode";case Se:return"Suspense";case Ee:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case st:return(e.displayName||"Context")+".Consumer";case Je:return(e._context.displayName||"Context")+".Provider";case $e:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Me:return t=e.displayName||null,t!==null?t:ae(e.type)||"Memo";case he:t=e._payload,e=e._init;try{return ae(e(t))}catch{}}return null}function fe(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ae(t);case 8:return t===Fe?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function ue(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function we(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function He(e){var t=we(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,l=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(u){r=""+u,l.call(this,u)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(u){r=""+u},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function _t(e){e._valueTracker||(e._valueTracker=He(e))}function Sn(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=we(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Yt(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function rn(e,t){var n=t.checked;return $({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function En(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=ue(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Cn(e,t){t=t.checked,t!=null&&te(e,"checked",t,!1)}function z(e,t){Cn(e,t);var n=ue(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Gt(e,t.type,n):t.hasOwnProperty("defaultValue")&&Gt(e,t.type,ue(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ce(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Gt(e,t,n){(t!=="number"||Yt(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Ut=Array.isArray;function W(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+ue(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function J(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(c(91));return $({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function de(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(c(92));if(Ut(n)){if(1<n.length)throw Error(c(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:ue(n)}}function ke(e,t){var n=ue(t.value),r=ue(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Ie(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Ze(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ke(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Ze(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ft,Ae=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ft=Ft||document.createElement("div"),Ft.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ft.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Bt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Tt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Vn=["Webkit","ms","Moz","O"];Object.keys(Tt).forEach(function(e){Vn.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Tt[t]=Tt[e]})});function sn(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Tt.hasOwnProperty(e)&&Tt[e]?(""+t).trim():t+"px"}function yr(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=sn(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var vr=$({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function br(e,t){if(t){if(vr[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(c(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(c(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(c(61))}if(t.style!=null&&typeof t.style!="object")throw Error(c(62))}}function _s(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ts=null;function As(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var zs=null,Hn=null,Kn=null;function Pl(e){if(e=$r(e)){if(typeof zs!="function")throw Error(c(280));var t=e.stateNode;t&&(t=zi(t),zs(e.stateNode,e.type,t))}}function Dl(e){Hn?Kn?Kn.push(e):Kn=[e]:Hn=e}function Ml(){if(Hn){var e=Hn,t=Kn;if(Kn=Hn=null,Pl(e),t)for(e=0;e<t.length;e++)Pl(t[e])}}function Ul(e,t){return e(t)}function Fl(){}var Ls=!1;function Bl(e,t,n){if(Ls)return e(t,n);Ls=!0;try{return Ul(e,t,n)}finally{Ls=!1,(Hn!==null||Kn!==null)&&(Fl(),Ml())}}function wr(e,t){var n=e.stateNode;if(n===null)return null;var r=zi(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(c(231,t,typeof n));return n}var Is=!1;if(y)try{var kr={};Object.defineProperty(kr,"passive",{get:function(){Is=!0}}),window.addEventListener("test",kr,kr),window.removeEventListener("test",kr,kr)}catch{Is=!1}function md(e,t,n,r,o,l,u,m,x){var R=Array.prototype.slice.call(arguments,3);try{t.apply(n,R)}catch(P){this.onError(P)}}var jr=!1,ui=null,di=!1,Os=null,xd={onError:function(e){jr=!0,ui=e}};function gd(e,t,n,r,o,l,u,m,x){jr=!1,ui=null,md.apply(xd,arguments)}function yd(e,t,n,r,o,l,u,m,x){if(gd.apply(this,arguments),jr){if(jr){var R=ui;jr=!1,ui=null}else throw Error(c(198));di||(di=!0,Os=R)}}function Rn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function $l(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Wl(e){if(Rn(e)!==e)throw Error(c(188))}function vd(e){var t=e.alternate;if(!t){if(t=Rn(e),t===null)throw Error(c(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var l=o.alternate;if(l===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===l.child){for(l=o.child;l;){if(l===n)return Wl(o),e;if(l===r)return Wl(o),t;l=l.sibling}throw Error(c(188))}if(n.return!==r.return)n=o,r=l;else{for(var u=!1,m=o.child;m;){if(m===n){u=!0,n=o,r=l;break}if(m===r){u=!0,r=o,n=l;break}m=m.sibling}if(!u){for(m=l.child;m;){if(m===n){u=!0,n=l,r=o;break}if(m===r){u=!0,r=l,n=o;break}m=m.sibling}if(!u)throw Error(c(189))}}if(n.alternate!==r)throw Error(c(190))}if(n.tag!==3)throw Error(c(188));return n.stateNode.current===n?e:t}function Vl(e){return e=vd(e),e!==null?Hl(e):null}function Hl(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Hl(e);if(t!==null)return t;e=e.sibling}return null}var Kl=a.unstable_scheduleCallback,Yl=a.unstable_cancelCallback,bd=a.unstable_shouldYield,wd=a.unstable_requestPaint,Pe=a.unstable_now,kd=a.unstable_getCurrentPriorityLevel,Ps=a.unstable_ImmediatePriority,Gl=a.unstable_UserBlockingPriority,pi=a.unstable_NormalPriority,jd=a.unstable_LowPriority,ql=a.unstable_IdlePriority,fi=null,$t=null;function Nd(e){if($t&&typeof $t.onCommitFiberRoot=="function")try{$t.onCommitFiberRoot(fi,e,void 0,(e.current.flags&128)===128)}catch{}}var At=Math.clz32?Math.clz32:Cd,Sd=Math.log,Ed=Math.LN2;function Cd(e){return e>>>=0,e===0?32:31-(Sd(e)/Ed|0)|0}var hi=64,mi=4194304;function Nr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function xi(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,l=e.pingedLanes,u=n&268435455;if(u!==0){var m=u&~o;m!==0?r=Nr(m):(l&=u,l!==0&&(r=Nr(l)))}else u=n&~o,u!==0?r=Nr(u):l!==0&&(r=Nr(l));if(r===0)return 0;if(t!==0&&t!==r&&(t&o)===0&&(o=r&-r,l=t&-t,o>=l||o===16&&(l&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-At(t),o=1<<n,r|=e[n],t&=~o;return r}function Rd(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function _d(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,l=e.pendingLanes;0<l;){var u=31-At(l),m=1<<u,x=o[u];x===-1?((m&n)===0||(m&r)!==0)&&(o[u]=Rd(m,t)):x<=t&&(e.expiredLanes|=m),l&=~m}}function Ds(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ql(){var e=hi;return hi<<=1,(hi&4194240)===0&&(hi=64),e}function Ms(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Sr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-At(t),e[t]=n}function Td(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-At(n),l=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~l}}function Us(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-At(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var je=0;function Xl(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var Jl,Fs,Zl,ea,ta,Bs=!1,gi=[],on=null,ln=null,an=null,Er=new Map,Cr=new Map,cn=[],Ad="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function na(e,t){switch(e){case"focusin":case"focusout":on=null;break;case"dragenter":case"dragleave":ln=null;break;case"mouseover":case"mouseout":an=null;break;case"pointerover":case"pointerout":Er.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Cr.delete(t.pointerId)}}function Rr(e,t,n,r,o,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:l,targetContainers:[o]},t!==null&&(t=$r(t),t!==null&&Fs(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function zd(e,t,n,r,o){switch(t){case"focusin":return on=Rr(on,e,t,n,r,o),!0;case"dragenter":return ln=Rr(ln,e,t,n,r,o),!0;case"mouseover":return an=Rr(an,e,t,n,r,o),!0;case"pointerover":var l=o.pointerId;return Er.set(l,Rr(Er.get(l)||null,e,t,n,r,o)),!0;case"gotpointercapture":return l=o.pointerId,Cr.set(l,Rr(Cr.get(l)||null,e,t,n,r,o)),!0}return!1}function ra(e){var t=_n(e.target);if(t!==null){var n=Rn(t);if(n!==null){if(t=n.tag,t===13){if(t=$l(n),t!==null){e.blockedOn=t,ta(e.priority,function(){Zl(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function yi(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ws(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Ts=r,n.target.dispatchEvent(r),Ts=null}else return t=$r(n),t!==null&&Fs(t),e.blockedOn=n,!1;t.shift()}return!0}function ia(e,t,n){yi(e)&&n.delete(t)}function Ld(){Bs=!1,on!==null&&yi(on)&&(on=null),ln!==null&&yi(ln)&&(ln=null),an!==null&&yi(an)&&(an=null),Er.forEach(ia),Cr.forEach(ia)}function _r(e,t){e.blockedOn===t&&(e.blockedOn=null,Bs||(Bs=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,Ld)))}function Tr(e){function t(o){return _r(o,e)}if(0<gi.length){_r(gi[0],e);for(var n=1;n<gi.length;n++){var r=gi[n];r.blockedOn===e&&(r.blockedOn=null)}}for(on!==null&&_r(on,e),ln!==null&&_r(ln,e),an!==null&&_r(an,e),Er.forEach(t),Cr.forEach(t),n=0;n<cn.length;n++)r=cn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<cn.length&&(n=cn[0],n.blockedOn===null);)ra(n),n.blockedOn===null&&cn.shift()}var Yn=ne.ReactCurrentBatchConfig,vi=!0;function Id(e,t,n,r){var o=je,l=Yn.transition;Yn.transition=null;try{je=1,$s(e,t,n,r)}finally{je=o,Yn.transition=l}}function Od(e,t,n,r){var o=je,l=Yn.transition;Yn.transition=null;try{je=4,$s(e,t,n,r)}finally{je=o,Yn.transition=l}}function $s(e,t,n,r){if(vi){var o=Ws(e,t,n,r);if(o===null)oo(e,t,r,bi,n),na(e,r);else if(zd(o,e,t,n,r))r.stopPropagation();else if(na(e,r),t&4&&-1<Ad.indexOf(e)){for(;o!==null;){var l=$r(o);if(l!==null&&Jl(l),l=Ws(e,t,n,r),l===null&&oo(e,t,r,bi,n),l===o)break;o=l}o!==null&&r.stopPropagation()}else oo(e,t,r,null,n)}}var bi=null;function Ws(e,t,n,r){if(bi=null,e=As(r),e=_n(e),e!==null)if(t=Rn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=$l(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return bi=e,null}function sa(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(kd()){case Ps:return 1;case Gl:return 4;case pi:case jd:return 16;case ql:return 536870912;default:return 16}default:return 16}}var un=null,Vs=null,wi=null;function oa(){if(wi)return wi;var e,t=Vs,n=t.length,r,o="value"in un?un.value:un.textContent,l=o.length;for(e=0;e<n&&t[e]===o[e];e++);var u=n-e;for(r=1;r<=u&&t[n-r]===o[l-r];r++);return wi=o.slice(e,1<r?1-r:void 0)}function ki(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ji(){return!0}function la(){return!1}function yt(e){function t(n,r,o,l,u){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=l,this.target=u,this.currentTarget=null;for(var m in e)e.hasOwnProperty(m)&&(n=e[m],this[m]=n?n(l):l[m]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?ji:la,this.isPropagationStopped=la,this}return $(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ji)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ji)},persist:function(){},isPersistent:ji}),t}var Gn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Hs=yt(Gn),Ar=$({},Gn,{view:0,detail:0}),Pd=yt(Ar),Ks,Ys,zr,Ni=$({},Ar,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:qs,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==zr&&(zr&&e.type==="mousemove"?(Ks=e.screenX-zr.screenX,Ys=e.screenY-zr.screenY):Ys=Ks=0,zr=e),Ks)},movementY:function(e){return"movementY"in e?e.movementY:Ys}}),aa=yt(Ni),Dd=$({},Ni,{dataTransfer:0}),Md=yt(Dd),Ud=$({},Ar,{relatedTarget:0}),Gs=yt(Ud),Fd=$({},Gn,{animationName:0,elapsedTime:0,pseudoElement:0}),Bd=yt(Fd),$d=$({},Gn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Wd=yt($d),Vd=$({},Gn,{data:0}),ca=yt(Vd),Hd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Kd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Yd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Gd(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Yd[e])?!!t[e]:!1}function qs(){return Gd}var qd=$({},Ar,{key:function(e){if(e.key){var t=Hd[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ki(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Kd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:qs,charCode:function(e){return e.type==="keypress"?ki(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ki(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Qd=yt(qd),Xd=$({},Ni,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ua=yt(Xd),Jd=$({},Ar,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:qs}),Zd=yt(Jd),ep=$({},Gn,{propertyName:0,elapsedTime:0,pseudoElement:0}),tp=yt(ep),np=$({},Ni,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),rp=yt(np),ip=[9,13,27,32],Qs=y&&"CompositionEvent"in window,Lr=null;y&&"documentMode"in document&&(Lr=document.documentMode);var sp=y&&"TextEvent"in window&&!Lr,da=y&&(!Qs||Lr&&8<Lr&&11>=Lr),pa=" ",fa=!1;function ha(e,t){switch(e){case"keyup":return ip.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ma(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var qn=!1;function op(e,t){switch(e){case"compositionend":return ma(t);case"keypress":return t.which!==32?null:(fa=!0,pa);case"textInput":return e=t.data,e===pa&&fa?null:e;default:return null}}function lp(e,t){if(qn)return e==="compositionend"||!Qs&&ha(e,t)?(e=oa(),wi=Vs=un=null,qn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return da&&t.locale!=="ko"?null:t.data;default:return null}}var ap={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xa(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!ap[e.type]:t==="textarea"}function ga(e,t,n,r){Dl(r),t=_i(t,"onChange"),0<t.length&&(n=new Hs("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Ir=null,Or=null;function cp(e){Oa(e,0)}function Si(e){var t=er(e);if(Sn(t))return e}function up(e,t){if(e==="change")return t}var ya=!1;if(y){var Xs;if(y){var Js="oninput"in document;if(!Js){var va=document.createElement("div");va.setAttribute("oninput","return;"),Js=typeof va.oninput=="function"}Xs=Js}else Xs=!1;ya=Xs&&(!document.documentMode||9<document.documentMode)}function ba(){Ir&&(Ir.detachEvent("onpropertychange",wa),Or=Ir=null)}function wa(e){if(e.propertyName==="value"&&Si(Or)){var t=[];ga(t,Or,e,As(e)),Bl(cp,t)}}function dp(e,t,n){e==="focusin"?(ba(),Ir=t,Or=n,Ir.attachEvent("onpropertychange",wa)):e==="focusout"&&ba()}function pp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Si(Or)}function fp(e,t){if(e==="click")return Si(t)}function hp(e,t){if(e==="input"||e==="change")return Si(t)}function mp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var zt=typeof Object.is=="function"?Object.is:mp;function Pr(e,t){if(zt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!C.call(t,o)||!zt(e[o],t[o]))return!1}return!0}function ka(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ja(e,t){var n=ka(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ka(n)}}function Na(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Na(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Sa(){for(var e=window,t=Yt();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Yt(e.document)}return t}function Zs(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function xp(e){var t=Sa(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Na(n.ownerDocument.documentElement,n)){if(r!==null&&Zs(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,l=Math.min(r.start,o);r=r.end===void 0?l:Math.min(r.end,o),!e.extend&&l>r&&(o=r,r=l,l=o),o=ja(n,l);var u=ja(n,r);o&&u&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==u.node||e.focusOffset!==u.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),l>r?(e.addRange(t),e.extend(u.node,u.offset)):(t.setEnd(u.node,u.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var gp=y&&"documentMode"in document&&11>=document.documentMode,Qn=null,eo=null,Dr=null,to=!1;function Ea(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;to||Qn==null||Qn!==Yt(r)||(r=Qn,"selectionStart"in r&&Zs(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Dr&&Pr(Dr,r)||(Dr=r,r=_i(eo,"onSelect"),0<r.length&&(t=new Hs("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Qn)))}function Ei(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Xn={animationend:Ei("Animation","AnimationEnd"),animationiteration:Ei("Animation","AnimationIteration"),animationstart:Ei("Animation","AnimationStart"),transitionend:Ei("Transition","TransitionEnd")},no={},Ca={};y&&(Ca=document.createElement("div").style,"AnimationEvent"in window||(delete Xn.animationend.animation,delete Xn.animationiteration.animation,delete Xn.animationstart.animation),"TransitionEvent"in window||delete Xn.transitionend.transition);function Ci(e){if(no[e])return no[e];if(!Xn[e])return e;var t=Xn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ca)return no[e]=t[n];return e}var Ra=Ci("animationend"),_a=Ci("animationiteration"),Ta=Ci("animationstart"),Aa=Ci("transitionend"),za=new Map,La="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function dn(e,t){za.set(e,t),f(t,[e])}for(var ro=0;ro<La.length;ro++){var io=La[ro],yp=io.toLowerCase(),vp=io[0].toUpperCase()+io.slice(1);dn(yp,"on"+vp)}dn(Ra,"onAnimationEnd"),dn(_a,"onAnimationIteration"),dn(Ta,"onAnimationStart"),dn("dblclick","onDoubleClick"),dn("focusin","onFocus"),dn("focusout","onBlur"),dn(Aa,"onTransitionEnd"),h("onMouseEnter",["mouseout","mouseover"]),h("onMouseLeave",["mouseout","mouseover"]),h("onPointerEnter",["pointerout","pointerover"]),h("onPointerLeave",["pointerout","pointerover"]),f("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),f("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),f("onBeforeInput",["compositionend","keypress","textInput","paste"]),f("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),f("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),f("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Mr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),bp=new Set("cancel close invalid load scroll toggle".split(" ").concat(Mr));function Ia(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,yd(r,t,void 0,e),e.currentTarget=null}function Oa(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var l=void 0;if(t)for(var u=r.length-1;0<=u;u--){var m=r[u],x=m.instance,R=m.currentTarget;if(m=m.listener,x!==l&&o.isPropagationStopped())break e;Ia(o,m,R),l=x}else for(u=0;u<r.length;u++){if(m=r[u],x=m.instance,R=m.currentTarget,m=m.listener,x!==l&&o.isPropagationStopped())break e;Ia(o,m,R),l=x}}}if(di)throw e=Os,di=!1,Os=null,e}function Re(e,t){var n=t[fo];n===void 0&&(n=t[fo]=new Set);var r=e+"__bubble";n.has(r)||(Pa(t,e,2,!1),n.add(r))}function so(e,t,n){var r=0;t&&(r|=4),Pa(n,e,r,t)}var Ri="_reactListening"+Math.random().toString(36).slice(2);function Ur(e){if(!e[Ri]){e[Ri]=!0,d.forEach(function(n){n!=="selectionchange"&&(bp.has(n)||so(n,!1,e),so(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ri]||(t[Ri]=!0,so("selectionchange",!1,t))}}function Pa(e,t,n,r){switch(sa(t)){case 1:var o=Id;break;case 4:o=Od;break;default:o=$s}n=o.bind(null,t,n,e),o=void 0,!Is||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function oo(e,t,n,r,o){var l=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var u=r.tag;if(u===3||u===4){var m=r.stateNode.containerInfo;if(m===o||m.nodeType===8&&m.parentNode===o)break;if(u===4)for(u=r.return;u!==null;){var x=u.tag;if((x===3||x===4)&&(x=u.stateNode.containerInfo,x===o||x.nodeType===8&&x.parentNode===o))return;u=u.return}for(;m!==null;){if(u=_n(m),u===null)return;if(x=u.tag,x===5||x===6){r=l=u;continue e}m=m.parentNode}}r=r.return}Bl(function(){var R=l,P=As(n),M=[];e:{var I=za.get(e);if(I!==void 0){var V=Hs,G=e;switch(e){case"keypress":if(ki(n)===0)break e;case"keydown":case"keyup":V=Qd;break;case"focusin":G="focus",V=Gs;break;case"focusout":G="blur",V=Gs;break;case"beforeblur":case"afterblur":V=Gs;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":V=aa;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":V=Md;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":V=Zd;break;case Ra:case _a:case Ta:V=Bd;break;case Aa:V=tp;break;case"scroll":V=Pd;break;case"wheel":V=rp;break;case"copy":case"cut":case"paste":V=Wd;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":V=ua}var Q=(t&4)!==0,De=!Q&&e==="scroll",j=Q?I!==null?I+"Capture":null:I;Q=[];for(var g=R,E;g!==null;){E=g;var F=E.stateNode;if(E.tag===5&&F!==null&&(E=F,j!==null&&(F=wr(g,j),F!=null&&Q.push(Fr(g,F,E)))),De)break;g=g.return}0<Q.length&&(I=new V(I,G,null,n,P),M.push({event:I,listeners:Q}))}}if((t&7)===0){e:{if(I=e==="mouseover"||e==="pointerover",V=e==="mouseout"||e==="pointerout",I&&n!==Ts&&(G=n.relatedTarget||n.fromElement)&&(_n(G)||G[qt]))break e;if((V||I)&&(I=P.window===P?P:(I=P.ownerDocument)?I.defaultView||I.parentWindow:window,V?(G=n.relatedTarget||n.toElement,V=R,G=G?_n(G):null,G!==null&&(De=Rn(G),G!==De||G.tag!==5&&G.tag!==6)&&(G=null)):(V=null,G=R),V!==G)){if(Q=aa,F="onMouseLeave",j="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(Q=ua,F="onPointerLeave",j="onPointerEnter",g="pointer"),De=V==null?I:er(V),E=G==null?I:er(G),I=new Q(F,g+"leave",V,n,P),I.target=De,I.relatedTarget=E,F=null,_n(P)===R&&(Q=new Q(j,g+"enter",G,n,P),Q.target=E,Q.relatedTarget=De,F=Q),De=F,V&&G)t:{for(Q=V,j=G,g=0,E=Q;E;E=Jn(E))g++;for(E=0,F=j;F;F=Jn(F))E++;for(;0<g-E;)Q=Jn(Q),g--;for(;0<E-g;)j=Jn(j),E--;for(;g--;){if(Q===j||j!==null&&Q===j.alternate)break t;Q=Jn(Q),j=Jn(j)}Q=null}else Q=null;V!==null&&Da(M,I,V,Q,!1),G!==null&&De!==null&&Da(M,De,G,Q,!0)}}e:{if(I=R?er(R):window,V=I.nodeName&&I.nodeName.toLowerCase(),V==="select"||V==="input"&&I.type==="file")var X=up;else if(xa(I))if(ya)X=hp;else{X=pp;var Z=dp}else(V=I.nodeName)&&V.toLowerCase()==="input"&&(I.type==="checkbox"||I.type==="radio")&&(X=fp);if(X&&(X=X(e,R))){ga(M,X,n,P);break e}Z&&Z(e,I,R),e==="focusout"&&(Z=I._wrapperState)&&Z.controlled&&I.type==="number"&&Gt(I,"number",I.value)}switch(Z=R?er(R):window,e){case"focusin":(xa(Z)||Z.contentEditable==="true")&&(Qn=Z,eo=R,Dr=null);break;case"focusout":Dr=eo=Qn=null;break;case"mousedown":to=!0;break;case"contextmenu":case"mouseup":case"dragend":to=!1,Ea(M,n,P);break;case"selectionchange":if(gp)break;case"keydown":case"keyup":Ea(M,n,P)}var ee;if(Qs)e:{switch(e){case"compositionstart":var oe="onCompositionStart";break e;case"compositionend":oe="onCompositionEnd";break e;case"compositionupdate":oe="onCompositionUpdate";break e}oe=void 0}else qn?ha(e,n)&&(oe="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(oe="onCompositionStart");oe&&(da&&n.locale!=="ko"&&(qn||oe!=="onCompositionStart"?oe==="onCompositionEnd"&&qn&&(ee=oa()):(un=P,Vs="value"in un?un.value:un.textContent,qn=!0)),Z=_i(R,oe),0<Z.length&&(oe=new ca(oe,e,null,n,P),M.push({event:oe,listeners:Z}),ee?oe.data=ee:(ee=ma(n),ee!==null&&(oe.data=ee)))),(ee=sp?op(e,n):lp(e,n))&&(R=_i(R,"onBeforeInput"),0<R.length&&(P=new ca("onBeforeInput","beforeinput",null,n,P),M.push({event:P,listeners:R}),P.data=ee))}Oa(M,t)})}function Fr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function _i(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,l=o.stateNode;o.tag===5&&l!==null&&(o=l,l=wr(e,n),l!=null&&r.unshift(Fr(e,l,o)),l=wr(e,t),l!=null&&r.push(Fr(e,l,o))),e=e.return}return r}function Jn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Da(e,t,n,r,o){for(var l=t._reactName,u=[];n!==null&&n!==r;){var m=n,x=m.alternate,R=m.stateNode;if(x!==null&&x===r)break;m.tag===5&&R!==null&&(m=R,o?(x=wr(n,l),x!=null&&u.unshift(Fr(n,x,m))):o||(x=wr(n,l),x!=null&&u.push(Fr(n,x,m)))),n=n.return}u.length!==0&&e.push({event:t,listeners:u})}var wp=/\r\n?/g,kp=/\u0000|\uFFFD/g;function Ma(e){return(typeof e=="string"?e:""+e).replace(wp,`
`).replace(kp,"")}function Ti(e,t,n){if(t=Ma(t),Ma(e)!==t&&n)throw Error(c(425))}function Ai(){}var lo=null,ao=null;function co(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var uo=typeof setTimeout=="function"?setTimeout:void 0,jp=typeof clearTimeout=="function"?clearTimeout:void 0,Ua=typeof Promise=="function"?Promise:void 0,Np=typeof queueMicrotask=="function"?queueMicrotask:typeof Ua<"u"?function(e){return Ua.resolve(null).then(e).catch(Sp)}:uo;function Sp(e){setTimeout(function(){throw e})}function po(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),Tr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);Tr(t)}function pn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Fa(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Zn=Math.random().toString(36).slice(2),Wt="__reactFiber$"+Zn,Br="__reactProps$"+Zn,qt="__reactContainer$"+Zn,fo="__reactEvents$"+Zn,Ep="__reactListeners$"+Zn,Cp="__reactHandles$"+Zn;function _n(e){var t=e[Wt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[qt]||n[Wt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Fa(e);e!==null;){if(n=e[Wt])return n;e=Fa(e)}return t}e=n,n=e.parentNode}return null}function $r(e){return e=e[Wt]||e[qt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function er(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(c(33))}function zi(e){return e[Br]||null}var ho=[],tr=-1;function fn(e){return{current:e}}function _e(e){0>tr||(e.current=ho[tr],ho[tr]=null,tr--)}function Ce(e,t){tr++,ho[tr]=e.current,e.current=t}var hn={},et=fn(hn),ut=fn(!1),Tn=hn;function nr(e,t){var n=e.type.contextTypes;if(!n)return hn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},l;for(l in n)o[l]=t[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function dt(e){return e=e.childContextTypes,e!=null}function Li(){_e(ut),_e(et)}function Ba(e,t,n){if(et.current!==hn)throw Error(c(168));Ce(et,t),Ce(ut,n)}function $a(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(c(108,fe(e)||"Unknown",o));return $({},n,r)}function Ii(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||hn,Tn=et.current,Ce(et,e),Ce(ut,ut.current),!0}function Wa(e,t,n){var r=e.stateNode;if(!r)throw Error(c(169));n?(e=$a(e,t,Tn),r.__reactInternalMemoizedMergedChildContext=e,_e(ut),_e(et),Ce(et,e)):_e(ut),Ce(ut,n)}var Qt=null,Oi=!1,mo=!1;function Va(e){Qt===null?Qt=[e]:Qt.push(e)}function Rp(e){Oi=!0,Va(e)}function mn(){if(!mo&&Qt!==null){mo=!0;var e=0,t=je;try{var n=Qt;for(je=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Qt=null,Oi=!1}catch(o){throw Qt!==null&&(Qt=Qt.slice(e+1)),Kl(Ps,mn),o}finally{je=t,mo=!1}}return null}var rr=[],ir=0,Pi=null,Di=0,kt=[],jt=0,An=null,Xt=1,Jt="";function zn(e,t){rr[ir++]=Di,rr[ir++]=Pi,Pi=e,Di=t}function Ha(e,t,n){kt[jt++]=Xt,kt[jt++]=Jt,kt[jt++]=An,An=e;var r=Xt;e=Jt;var o=32-At(r)-1;r&=~(1<<o),n+=1;var l=32-At(t)+o;if(30<l){var u=o-o%5;l=(r&(1<<u)-1).toString(32),r>>=u,o-=u,Xt=1<<32-At(t)+o|n<<o|r,Jt=l+e}else Xt=1<<l|n<<o|r,Jt=e}function xo(e){e.return!==null&&(zn(e,1),Ha(e,1,0))}function go(e){for(;e===Pi;)Pi=rr[--ir],rr[ir]=null,Di=rr[--ir],rr[ir]=null;for(;e===An;)An=kt[--jt],kt[jt]=null,Jt=kt[--jt],kt[jt]=null,Xt=kt[--jt],kt[jt]=null}var vt=null,bt=null,Te=!1,Lt=null;function Ka(e,t){var n=Ct(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Ya(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,vt=e,bt=pn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,vt=e,bt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=An!==null?{id:Xt,overflow:Jt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ct(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,vt=e,bt=null,!0):!1;default:return!1}}function yo(e){return(e.mode&1)!==0&&(e.flags&128)===0}function vo(e){if(Te){var t=bt;if(t){var n=t;if(!Ya(e,t)){if(yo(e))throw Error(c(418));t=pn(n.nextSibling);var r=vt;t&&Ya(e,t)?Ka(r,n):(e.flags=e.flags&-4097|2,Te=!1,vt=e)}}else{if(yo(e))throw Error(c(418));e.flags=e.flags&-4097|2,Te=!1,vt=e}}}function Ga(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;vt=e}function Mi(e){if(e!==vt)return!1;if(!Te)return Ga(e),Te=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!co(e.type,e.memoizedProps)),t&&(t=bt)){if(yo(e))throw qa(),Error(c(418));for(;t;)Ka(e,t),t=pn(t.nextSibling)}if(Ga(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){bt=pn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}bt=null}}else bt=vt?pn(e.stateNode.nextSibling):null;return!0}function qa(){for(var e=bt;e;)e=pn(e.nextSibling)}function sr(){bt=vt=null,Te=!1}function bo(e){Lt===null?Lt=[e]:Lt.push(e)}var _p=ne.ReactCurrentBatchConfig;function Wr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(c(309));var r=n.stateNode}if(!r)throw Error(c(147,e));var o=r,l=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===l?t.ref:(t=function(u){var m=o.refs;u===null?delete m[l]:m[l]=u},t._stringRef=l,t)}if(typeof e!="string")throw Error(c(284));if(!n._owner)throw Error(c(290,e))}return e}function Ui(e,t){throw e=Object.prototype.toString.call(t),Error(c(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Qa(e){var t=e._init;return t(e._payload)}function Xa(e){function t(j,g){if(e){var E=j.deletions;E===null?(j.deletions=[g],j.flags|=16):E.push(g)}}function n(j,g){if(!e)return null;for(;g!==null;)t(j,g),g=g.sibling;return null}function r(j,g){for(j=new Map;g!==null;)g.key!==null?j.set(g.key,g):j.set(g.index,g),g=g.sibling;return j}function o(j,g){return j=jn(j,g),j.index=0,j.sibling=null,j}function l(j,g,E){return j.index=E,e?(E=j.alternate,E!==null?(E=E.index,E<g?(j.flags|=2,g):E):(j.flags|=2,g)):(j.flags|=1048576,g)}function u(j){return e&&j.alternate===null&&(j.flags|=2),j}function m(j,g,E,F){return g===null||g.tag!==6?(g=dl(E,j.mode,F),g.return=j,g):(g=o(g,E),g.return=j,g)}function x(j,g,E,F){var X=E.type;return X===ge?P(j,g,E.props.children,F,E.key):g!==null&&(g.elementType===X||typeof X=="object"&&X!==null&&X.$$typeof===he&&Qa(X)===g.type)?(F=o(g,E.props),F.ref=Wr(j,g,E),F.return=j,F):(F=cs(E.type,E.key,E.props,null,j.mode,F),F.ref=Wr(j,g,E),F.return=j,F)}function R(j,g,E,F){return g===null||g.tag!==4||g.stateNode.containerInfo!==E.containerInfo||g.stateNode.implementation!==E.implementation?(g=pl(E,j.mode,F),g.return=j,g):(g=o(g,E.children||[]),g.return=j,g)}function P(j,g,E,F,X){return g===null||g.tag!==7?(g=Fn(E,j.mode,F,X),g.return=j,g):(g=o(g,E),g.return=j,g)}function M(j,g,E){if(typeof g=="string"&&g!==""||typeof g=="number")return g=dl(""+g,j.mode,E),g.return=j,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case xe:return E=cs(g.type,g.key,g.props,null,j.mode,E),E.ref=Wr(j,null,g),E.return=j,E;case Ne:return g=pl(g,j.mode,E),g.return=j,g;case he:var F=g._init;return M(j,F(g._payload),E)}if(Ut(g)||q(g))return g=Fn(g,j.mode,E,null),g.return=j,g;Ui(j,g)}return null}function I(j,g,E,F){var X=g!==null?g.key:null;if(typeof E=="string"&&E!==""||typeof E=="number")return X!==null?null:m(j,g,""+E,F);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case xe:return E.key===X?x(j,g,E,F):null;case Ne:return E.key===X?R(j,g,E,F):null;case he:return X=E._init,I(j,g,X(E._payload),F)}if(Ut(E)||q(E))return X!==null?null:P(j,g,E,F,null);Ui(j,E)}return null}function V(j,g,E,F,X){if(typeof F=="string"&&F!==""||typeof F=="number")return j=j.get(E)||null,m(g,j,""+F,X);if(typeof F=="object"&&F!==null){switch(F.$$typeof){case xe:return j=j.get(F.key===null?E:F.key)||null,x(g,j,F,X);case Ne:return j=j.get(F.key===null?E:F.key)||null,R(g,j,F,X);case he:var Z=F._init;return V(j,g,E,Z(F._payload),X)}if(Ut(F)||q(F))return j=j.get(E)||null,P(g,j,F,X,null);Ui(g,F)}return null}function G(j,g,E,F){for(var X=null,Z=null,ee=g,oe=g=0,qe=null;ee!==null&&oe<E.length;oe++){ee.index>oe?(qe=ee,ee=null):qe=ee.sibling;var ye=I(j,ee,E[oe],F);if(ye===null){ee===null&&(ee=qe);break}e&&ee&&ye.alternate===null&&t(j,ee),g=l(ye,g,oe),Z===null?X=ye:Z.sibling=ye,Z=ye,ee=qe}if(oe===E.length)return n(j,ee),Te&&zn(j,oe),X;if(ee===null){for(;oe<E.length;oe++)ee=M(j,E[oe],F),ee!==null&&(g=l(ee,g,oe),Z===null?X=ee:Z.sibling=ee,Z=ee);return Te&&zn(j,oe),X}for(ee=r(j,ee);oe<E.length;oe++)qe=V(ee,j,oe,E[oe],F),qe!==null&&(e&&qe.alternate!==null&&ee.delete(qe.key===null?oe:qe.key),g=l(qe,g,oe),Z===null?X=qe:Z.sibling=qe,Z=qe);return e&&ee.forEach(function(Nn){return t(j,Nn)}),Te&&zn(j,oe),X}function Q(j,g,E,F){var X=q(E);if(typeof X!="function")throw Error(c(150));if(E=X.call(E),E==null)throw Error(c(151));for(var Z=X=null,ee=g,oe=g=0,qe=null,ye=E.next();ee!==null&&!ye.done;oe++,ye=E.next()){ee.index>oe?(qe=ee,ee=null):qe=ee.sibling;var Nn=I(j,ee,ye.value,F);if(Nn===null){ee===null&&(ee=qe);break}e&&ee&&Nn.alternate===null&&t(j,ee),g=l(Nn,g,oe),Z===null?X=Nn:Z.sibling=Nn,Z=Nn,ee=qe}if(ye.done)return n(j,ee),Te&&zn(j,oe),X;if(ee===null){for(;!ye.done;oe++,ye=E.next())ye=M(j,ye.value,F),ye!==null&&(g=l(ye,g,oe),Z===null?X=ye:Z.sibling=ye,Z=ye);return Te&&zn(j,oe),X}for(ee=r(j,ee);!ye.done;oe++,ye=E.next())ye=V(ee,j,oe,ye.value,F),ye!==null&&(e&&ye.alternate!==null&&ee.delete(ye.key===null?oe:ye.key),g=l(ye,g,oe),Z===null?X=ye:Z.sibling=ye,Z=ye);return e&&ee.forEach(function(cf){return t(j,cf)}),Te&&zn(j,oe),X}function De(j,g,E,F){if(typeof E=="object"&&E!==null&&E.type===ge&&E.key===null&&(E=E.props.children),typeof E=="object"&&E!==null){switch(E.$$typeof){case xe:e:{for(var X=E.key,Z=g;Z!==null;){if(Z.key===X){if(X=E.type,X===ge){if(Z.tag===7){n(j,Z.sibling),g=o(Z,E.props.children),g.return=j,j=g;break e}}else if(Z.elementType===X||typeof X=="object"&&X!==null&&X.$$typeof===he&&Qa(X)===Z.type){n(j,Z.sibling),g=o(Z,E.props),g.ref=Wr(j,Z,E),g.return=j,j=g;break e}n(j,Z);break}else t(j,Z);Z=Z.sibling}E.type===ge?(g=Fn(E.props.children,j.mode,F,E.key),g.return=j,j=g):(F=cs(E.type,E.key,E.props,null,j.mode,F),F.ref=Wr(j,g,E),F.return=j,j=F)}return u(j);case Ne:e:{for(Z=E.key;g!==null;){if(g.key===Z)if(g.tag===4&&g.stateNode.containerInfo===E.containerInfo&&g.stateNode.implementation===E.implementation){n(j,g.sibling),g=o(g,E.children||[]),g.return=j,j=g;break e}else{n(j,g);break}else t(j,g);g=g.sibling}g=pl(E,j.mode,F),g.return=j,j=g}return u(j);case he:return Z=E._init,De(j,g,Z(E._payload),F)}if(Ut(E))return G(j,g,E,F);if(q(E))return Q(j,g,E,F);Ui(j,E)}return typeof E=="string"&&E!==""||typeof E=="number"?(E=""+E,g!==null&&g.tag===6?(n(j,g.sibling),g=o(g,E),g.return=j,j=g):(n(j,g),g=dl(E,j.mode,F),g.return=j,j=g),u(j)):n(j,g)}return De}var or=Xa(!0),Ja=Xa(!1),Fi=fn(null),Bi=null,lr=null,wo=null;function ko(){wo=lr=Bi=null}function jo(e){var t=Fi.current;_e(Fi),e._currentValue=t}function No(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function ar(e,t){Bi=e,wo=lr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(pt=!0),e.firstContext=null)}function Nt(e){var t=e._currentValue;if(wo!==e)if(e={context:e,memoizedValue:t,next:null},lr===null){if(Bi===null)throw Error(c(308));lr=e,Bi.dependencies={lanes:0,firstContext:e}}else lr=lr.next=e;return t}var Ln=null;function So(e){Ln===null?Ln=[e]:Ln.push(e)}function Za(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,So(t)):(n.next=o.next,o.next=n),t.interleaved=n,Zt(e,r)}function Zt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var xn=!1;function Eo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ec(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function en(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function gn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(me&2)!==0){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,Zt(e,n)}return o=r.interleaved,o===null?(t.next=t,So(r)):(t.next=o.next,o.next=t),r.interleaved=t,Zt(e,n)}function $i(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Us(e,n)}}function tc(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,l=null;if(n=n.firstBaseUpdate,n!==null){do{var u={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};l===null?o=l=u:l=l.next=u,n=n.next}while(n!==null);l===null?o=l=t:l=l.next=t}else o=l=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Wi(e,t,n,r){var o=e.updateQueue;xn=!1;var l=o.firstBaseUpdate,u=o.lastBaseUpdate,m=o.shared.pending;if(m!==null){o.shared.pending=null;var x=m,R=x.next;x.next=null,u===null?l=R:u.next=R,u=x;var P=e.alternate;P!==null&&(P=P.updateQueue,m=P.lastBaseUpdate,m!==u&&(m===null?P.firstBaseUpdate=R:m.next=R,P.lastBaseUpdate=x))}if(l!==null){var M=o.baseState;u=0,P=R=x=null,m=l;do{var I=m.lane,V=m.eventTime;if((r&I)===I){P!==null&&(P=P.next={eventTime:V,lane:0,tag:m.tag,payload:m.payload,callback:m.callback,next:null});e:{var G=e,Q=m;switch(I=t,V=n,Q.tag){case 1:if(G=Q.payload,typeof G=="function"){M=G.call(V,M,I);break e}M=G;break e;case 3:G.flags=G.flags&-65537|128;case 0:if(G=Q.payload,I=typeof G=="function"?G.call(V,M,I):G,I==null)break e;M=$({},M,I);break e;case 2:xn=!0}}m.callback!==null&&m.lane!==0&&(e.flags|=64,I=o.effects,I===null?o.effects=[m]:I.push(m))}else V={eventTime:V,lane:I,tag:m.tag,payload:m.payload,callback:m.callback,next:null},P===null?(R=P=V,x=M):P=P.next=V,u|=I;if(m=m.next,m===null){if(m=o.shared.pending,m===null)break;I=m,m=I.next,I.next=null,o.lastBaseUpdate=I,o.shared.pending=null}}while(!0);if(P===null&&(x=M),o.baseState=x,o.firstBaseUpdate=R,o.lastBaseUpdate=P,t=o.shared.interleaved,t!==null){o=t;do u|=o.lane,o=o.next;while(o!==t)}else l===null&&(o.shared.lanes=0);Pn|=u,e.lanes=u,e.memoizedState=M}}function nc(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(c(191,o));o.call(r)}}}var Vr={},Vt=fn(Vr),Hr=fn(Vr),Kr=fn(Vr);function In(e){if(e===Vr)throw Error(c(174));return e}function Co(e,t){switch(Ce(Kr,t),Ce(Hr,e),Ce(Vt,Vr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ke(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ke(t,e)}_e(Vt),Ce(Vt,t)}function cr(){_e(Vt),_e(Hr),_e(Kr)}function rc(e){In(Kr.current);var t=In(Vt.current),n=Ke(t,e.type);t!==n&&(Ce(Hr,e),Ce(Vt,n))}function Ro(e){Hr.current===e&&(_e(Vt),_e(Hr))}var ze=fn(0);function Vi(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var _o=[];function To(){for(var e=0;e<_o.length;e++)_o[e]._workInProgressVersionPrimary=null;_o.length=0}var Hi=ne.ReactCurrentDispatcher,Ao=ne.ReactCurrentBatchConfig,On=0,Le=null,We=null,Ye=null,Ki=!1,Yr=!1,Gr=0,Tp=0;function tt(){throw Error(c(321))}function zo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!zt(e[n],t[n]))return!1;return!0}function Lo(e,t,n,r,o,l){if(On=l,Le=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Hi.current=e===null||e.memoizedState===null?Ip:Op,e=n(r,o),Yr){l=0;do{if(Yr=!1,Gr=0,25<=l)throw Error(c(301));l+=1,Ye=We=null,t.updateQueue=null,Hi.current=Pp,e=n(r,o)}while(Yr)}if(Hi.current=qi,t=We!==null&&We.next!==null,On=0,Ye=We=Le=null,Ki=!1,t)throw Error(c(300));return e}function Io(){var e=Gr!==0;return Gr=0,e}function Ht(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ye===null?Le.memoizedState=Ye=e:Ye=Ye.next=e,Ye}function St(){if(We===null){var e=Le.alternate;e=e!==null?e.memoizedState:null}else e=We.next;var t=Ye===null?Le.memoizedState:Ye.next;if(t!==null)Ye=t,We=e;else{if(e===null)throw Error(c(310));We=e,e={memoizedState:We.memoizedState,baseState:We.baseState,baseQueue:We.baseQueue,queue:We.queue,next:null},Ye===null?Le.memoizedState=Ye=e:Ye=Ye.next=e}return Ye}function qr(e,t){return typeof t=="function"?t(e):t}function Oo(e){var t=St(),n=t.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=e;var r=We,o=r.baseQueue,l=n.pending;if(l!==null){if(o!==null){var u=o.next;o.next=l.next,l.next=u}r.baseQueue=o=l,n.pending=null}if(o!==null){l=o.next,r=r.baseState;var m=u=null,x=null,R=l;do{var P=R.lane;if((On&P)===P)x!==null&&(x=x.next={lane:0,action:R.action,hasEagerState:R.hasEagerState,eagerState:R.eagerState,next:null}),r=R.hasEagerState?R.eagerState:e(r,R.action);else{var M={lane:P,action:R.action,hasEagerState:R.hasEagerState,eagerState:R.eagerState,next:null};x===null?(m=x=M,u=r):x=x.next=M,Le.lanes|=P,Pn|=P}R=R.next}while(R!==null&&R!==l);x===null?u=r:x.next=m,zt(r,t.memoizedState)||(pt=!0),t.memoizedState=r,t.baseState=u,t.baseQueue=x,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do l=o.lane,Le.lanes|=l,Pn|=l,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Po(e){var t=St(),n=t.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,l=t.memoizedState;if(o!==null){n.pending=null;var u=o=o.next;do l=e(l,u.action),u=u.next;while(u!==o);zt(l,t.memoizedState)||(pt=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),n.lastRenderedState=l}return[l,r]}function ic(){}function sc(e,t){var n=Le,r=St(),o=t(),l=!zt(r.memoizedState,o);if(l&&(r.memoizedState=o,pt=!0),r=r.queue,Do(ac.bind(null,n,r,e),[e]),r.getSnapshot!==t||l||Ye!==null&&Ye.memoizedState.tag&1){if(n.flags|=2048,Qr(9,lc.bind(null,n,r,o,t),void 0,null),Ge===null)throw Error(c(349));(On&30)!==0||oc(n,t,o)}return o}function oc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Le.updateQueue,t===null?(t={lastEffect:null,stores:null},Le.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function lc(e,t,n,r){t.value=n,t.getSnapshot=r,cc(t)&&uc(e)}function ac(e,t,n){return n(function(){cc(t)&&uc(e)})}function cc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!zt(e,n)}catch{return!0}}function uc(e){var t=Zt(e,1);t!==null&&Dt(t,e,1,-1)}function dc(e){var t=Ht();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:qr,lastRenderedState:e},t.queue=e,e=e.dispatch=Lp.bind(null,Le,e),[t.memoizedState,e]}function Qr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Le.updateQueue,t===null?(t={lastEffect:null,stores:null},Le.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function pc(){return St().memoizedState}function Yi(e,t,n,r){var o=Ht();Le.flags|=e,o.memoizedState=Qr(1|t,n,void 0,r===void 0?null:r)}function Gi(e,t,n,r){var o=St();r=r===void 0?null:r;var l=void 0;if(We!==null){var u=We.memoizedState;if(l=u.destroy,r!==null&&zo(r,u.deps)){o.memoizedState=Qr(t,n,l,r);return}}Le.flags|=e,o.memoizedState=Qr(1|t,n,l,r)}function fc(e,t){return Yi(8390656,8,e,t)}function Do(e,t){return Gi(2048,8,e,t)}function hc(e,t){return Gi(4,2,e,t)}function mc(e,t){return Gi(4,4,e,t)}function xc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function gc(e,t,n){return n=n!=null?n.concat([e]):null,Gi(4,4,xc.bind(null,t,e),n)}function Mo(){}function yc(e,t){var n=St();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&zo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function vc(e,t){var n=St();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&zo(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function bc(e,t,n){return(On&21)===0?(e.baseState&&(e.baseState=!1,pt=!0),e.memoizedState=n):(zt(n,t)||(n=Ql(),Le.lanes|=n,Pn|=n,e.baseState=!0),t)}function Ap(e,t){var n=je;je=n!==0&&4>n?n:4,e(!0);var r=Ao.transition;Ao.transition={};try{e(!1),t()}finally{je=n,Ao.transition=r}}function wc(){return St().memoizedState}function zp(e,t,n){var r=wn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},kc(e))jc(t,n);else if(n=Za(e,t,n,r),n!==null){var o=lt();Dt(n,e,r,o),Nc(n,t,r)}}function Lp(e,t,n){var r=wn(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(kc(e))jc(t,o);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var u=t.lastRenderedState,m=l(u,n);if(o.hasEagerState=!0,o.eagerState=m,zt(m,u)){var x=t.interleaved;x===null?(o.next=o,So(t)):(o.next=x.next,x.next=o),t.interleaved=o;return}}catch{}finally{}n=Za(e,t,o,r),n!==null&&(o=lt(),Dt(n,e,r,o),Nc(n,t,r))}}function kc(e){var t=e.alternate;return e===Le||t!==null&&t===Le}function jc(e,t){Yr=Ki=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Nc(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Us(e,n)}}var qi={readContext:Nt,useCallback:tt,useContext:tt,useEffect:tt,useImperativeHandle:tt,useInsertionEffect:tt,useLayoutEffect:tt,useMemo:tt,useReducer:tt,useRef:tt,useState:tt,useDebugValue:tt,useDeferredValue:tt,useTransition:tt,useMutableSource:tt,useSyncExternalStore:tt,useId:tt,unstable_isNewReconciler:!1},Ip={readContext:Nt,useCallback:function(e,t){return Ht().memoizedState=[e,t===void 0?null:t],e},useContext:Nt,useEffect:fc,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Yi(4194308,4,xc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Yi(4194308,4,e,t)},useInsertionEffect:function(e,t){return Yi(4,2,e,t)},useMemo:function(e,t){var n=Ht();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Ht();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=zp.bind(null,Le,e),[r.memoizedState,e]},useRef:function(e){var t=Ht();return e={current:e},t.memoizedState=e},useState:dc,useDebugValue:Mo,useDeferredValue:function(e){return Ht().memoizedState=e},useTransition:function(){var e=dc(!1),t=e[0];return e=Ap.bind(null,e[1]),Ht().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Le,o=Ht();if(Te){if(n===void 0)throw Error(c(407));n=n()}else{if(n=t(),Ge===null)throw Error(c(349));(On&30)!==0||oc(r,t,n)}o.memoizedState=n;var l={value:n,getSnapshot:t};return o.queue=l,fc(ac.bind(null,r,l,e),[e]),r.flags|=2048,Qr(9,lc.bind(null,r,l,n,t),void 0,null),n},useId:function(){var e=Ht(),t=Ge.identifierPrefix;if(Te){var n=Jt,r=Xt;n=(r&~(1<<32-At(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Gr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Tp++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Op={readContext:Nt,useCallback:yc,useContext:Nt,useEffect:Do,useImperativeHandle:gc,useInsertionEffect:hc,useLayoutEffect:mc,useMemo:vc,useReducer:Oo,useRef:pc,useState:function(){return Oo(qr)},useDebugValue:Mo,useDeferredValue:function(e){var t=St();return bc(t,We.memoizedState,e)},useTransition:function(){var e=Oo(qr)[0],t=St().memoizedState;return[e,t]},useMutableSource:ic,useSyncExternalStore:sc,useId:wc,unstable_isNewReconciler:!1},Pp={readContext:Nt,useCallback:yc,useContext:Nt,useEffect:Do,useImperativeHandle:gc,useInsertionEffect:hc,useLayoutEffect:mc,useMemo:vc,useReducer:Po,useRef:pc,useState:function(){return Po(qr)},useDebugValue:Mo,useDeferredValue:function(e){var t=St();return We===null?t.memoizedState=e:bc(t,We.memoizedState,e)},useTransition:function(){var e=Po(qr)[0],t=St().memoizedState;return[e,t]},useMutableSource:ic,useSyncExternalStore:sc,useId:wc,unstable_isNewReconciler:!1};function It(e,t){if(e&&e.defaultProps){t=$({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Uo(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:$({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Qi={isMounted:function(e){return(e=e._reactInternals)?Rn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=lt(),o=wn(e),l=en(r,o);l.payload=t,n!=null&&(l.callback=n),t=gn(e,l,o),t!==null&&(Dt(t,e,o,r),$i(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=lt(),o=wn(e),l=en(r,o);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=gn(e,l,o),t!==null&&(Dt(t,e,o,r),$i(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=lt(),r=wn(e),o=en(n,r);o.tag=2,t!=null&&(o.callback=t),t=gn(e,o,r),t!==null&&(Dt(t,e,r,n),$i(t,e,r))}};function Sc(e,t,n,r,o,l,u){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,u):t.prototype&&t.prototype.isPureReactComponent?!Pr(n,r)||!Pr(o,l):!0}function Ec(e,t,n){var r=!1,o=hn,l=t.contextType;return typeof l=="object"&&l!==null?l=Nt(l):(o=dt(t)?Tn:et.current,r=t.contextTypes,l=(r=r!=null)?nr(e,o):hn),t=new t(n,l),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Qi,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=l),t}function Cc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Qi.enqueueReplaceState(t,t.state,null)}function Fo(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},Eo(e);var l=t.contextType;typeof l=="object"&&l!==null?o.context=Nt(l):(l=dt(t)?Tn:et.current,o.context=nr(e,l)),o.state=e.memoizedState,l=t.getDerivedStateFromProps,typeof l=="function"&&(Uo(e,t,l,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&Qi.enqueueReplaceState(o,o.state,null),Wi(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function ur(e,t){try{var n="",r=t;do n+=le(r),r=r.return;while(r);var o=n}catch(l){o=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:t,stack:o,digest:null}}function Bo(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function $o(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Dp=typeof WeakMap=="function"?WeakMap:Map;function Rc(e,t,n){n=en(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){rs||(rs=!0,rl=r),$o(e,t)},n}function _c(e,t,n){n=en(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){$o(e,t)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(n.callback=function(){$o(e,t),typeof r!="function"&&(vn===null?vn=new Set([this]):vn.add(this));var u=t.stack;this.componentDidCatch(t.value,{componentStack:u!==null?u:""})}),n}function Tc(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Dp;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=Xp.bind(null,e,t,n),t.then(e,e))}function Ac(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function zc(e,t,n,r,o){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=en(-1,1),t.tag=2,gn(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=o,e)}var Mp=ne.ReactCurrentOwner,pt=!1;function ot(e,t,n,r){t.child=e===null?Ja(t,null,n,r):or(t,e.child,n,r)}function Lc(e,t,n,r,o){n=n.render;var l=t.ref;return ar(t,o),r=Lo(e,t,n,r,l,o),n=Io(),e!==null&&!pt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,tn(e,t,o)):(Te&&n&&xo(t),t.flags|=1,ot(e,t,r,o),t.child)}function Ic(e,t,n,r,o){if(e===null){var l=n.type;return typeof l=="function"&&!ul(l)&&l.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=l,Oc(e,t,l,r,o)):(e=cs(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,(e.lanes&o)===0){var u=l.memoizedProps;if(n=n.compare,n=n!==null?n:Pr,n(u,r)&&e.ref===t.ref)return tn(e,t,o)}return t.flags|=1,e=jn(l,r),e.ref=t.ref,e.return=t,t.child=e}function Oc(e,t,n,r,o){if(e!==null){var l=e.memoizedProps;if(Pr(l,r)&&e.ref===t.ref)if(pt=!1,t.pendingProps=r=l,(e.lanes&o)!==0)(e.flags&131072)!==0&&(pt=!0);else return t.lanes=e.lanes,tn(e,t,o)}return Wo(e,t,n,r,o)}function Pc(e,t,n){var r=t.pendingProps,o=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ce(pr,wt),wt|=n;else{if((n&1073741824)===0)return e=l!==null?l.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Ce(pr,wt),wt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:n,Ce(pr,wt),wt|=r}else l!==null?(r=l.baseLanes|n,t.memoizedState=null):r=n,Ce(pr,wt),wt|=r;return ot(e,t,o,n),t.child}function Dc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Wo(e,t,n,r,o){var l=dt(n)?Tn:et.current;return l=nr(t,l),ar(t,o),n=Lo(e,t,n,r,l,o),r=Io(),e!==null&&!pt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,tn(e,t,o)):(Te&&r&&xo(t),t.flags|=1,ot(e,t,n,o),t.child)}function Mc(e,t,n,r,o){if(dt(n)){var l=!0;Ii(t)}else l=!1;if(ar(t,o),t.stateNode===null)Ji(e,t),Ec(t,n,r),Fo(t,n,r,o),r=!0;else if(e===null){var u=t.stateNode,m=t.memoizedProps;u.props=m;var x=u.context,R=n.contextType;typeof R=="object"&&R!==null?R=Nt(R):(R=dt(n)?Tn:et.current,R=nr(t,R));var P=n.getDerivedStateFromProps,M=typeof P=="function"||typeof u.getSnapshotBeforeUpdate=="function";M||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(m!==r||x!==R)&&Cc(t,u,r,R),xn=!1;var I=t.memoizedState;u.state=I,Wi(t,r,u,o),x=t.memoizedState,m!==r||I!==x||ut.current||xn?(typeof P=="function"&&(Uo(t,n,P,r),x=t.memoizedState),(m=xn||Sc(t,n,m,r,I,x,R))?(M||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount()),typeof u.componentDidMount=="function"&&(t.flags|=4194308)):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=x),u.props=r,u.state=x,u.context=R,r=m):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{u=t.stateNode,ec(e,t),m=t.memoizedProps,R=t.type===t.elementType?m:It(t.type,m),u.props=R,M=t.pendingProps,I=u.context,x=n.contextType,typeof x=="object"&&x!==null?x=Nt(x):(x=dt(n)?Tn:et.current,x=nr(t,x));var V=n.getDerivedStateFromProps;(P=typeof V=="function"||typeof u.getSnapshotBeforeUpdate=="function")||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(m!==M||I!==x)&&Cc(t,u,r,x),xn=!1,I=t.memoizedState,u.state=I,Wi(t,r,u,o);var G=t.memoizedState;m!==M||I!==G||ut.current||xn?(typeof V=="function"&&(Uo(t,n,V,r),G=t.memoizedState),(R=xn||Sc(t,n,R,r,I,G,x)||!1)?(P||typeof u.UNSAFE_componentWillUpdate!="function"&&typeof u.componentWillUpdate!="function"||(typeof u.componentWillUpdate=="function"&&u.componentWillUpdate(r,G,x),typeof u.UNSAFE_componentWillUpdate=="function"&&u.UNSAFE_componentWillUpdate(r,G,x)),typeof u.componentDidUpdate=="function"&&(t.flags|=4),typeof u.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof u.componentDidUpdate!="function"||m===e.memoizedProps&&I===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||m===e.memoizedProps&&I===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=G),u.props=r,u.state=G,u.context=x,r=R):(typeof u.componentDidUpdate!="function"||m===e.memoizedProps&&I===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||m===e.memoizedProps&&I===e.memoizedState||(t.flags|=1024),r=!1)}return Vo(e,t,n,r,l,o)}function Vo(e,t,n,r,o,l){Dc(e,t);var u=(t.flags&128)!==0;if(!r&&!u)return o&&Wa(t,n,!1),tn(e,t,l);r=t.stateNode,Mp.current=t;var m=u&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&u?(t.child=or(t,e.child,null,l),t.child=or(t,null,m,l)):ot(e,t,m,l),t.memoizedState=r.state,o&&Wa(t,n,!0),t.child}function Uc(e){var t=e.stateNode;t.pendingContext?Ba(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ba(e,t.context,!1),Co(e,t.containerInfo)}function Fc(e,t,n,r,o){return sr(),bo(o),t.flags|=256,ot(e,t,n,r),t.child}var Ho={dehydrated:null,treeContext:null,retryLane:0};function Ko(e){return{baseLanes:e,cachePool:null,transitions:null}}function Bc(e,t,n){var r=t.pendingProps,o=ze.current,l=!1,u=(t.flags&128)!==0,m;if((m=u)||(m=e!==null&&e.memoizedState===null?!1:(o&2)!==0),m?(l=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),Ce(ze,o&1),e===null)return vo(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(u=r.children,e=r.fallback,l?(r=t.mode,l=t.child,u={mode:"hidden",children:u},(r&1)===0&&l!==null?(l.childLanes=0,l.pendingProps=u):l=us(u,r,0,null),e=Fn(e,r,n,null),l.return=t,e.return=t,l.sibling=e,t.child=l,t.child.memoizedState=Ko(n),t.memoizedState=Ho,e):Yo(t,u));if(o=e.memoizedState,o!==null&&(m=o.dehydrated,m!==null))return Up(e,t,u,r,m,o,n);if(l){l=r.fallback,u=t.mode,o=e.child,m=o.sibling;var x={mode:"hidden",children:r.children};return(u&1)===0&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=x,t.deletions=null):(r=jn(o,x),r.subtreeFlags=o.subtreeFlags&14680064),m!==null?l=jn(m,l):(l=Fn(l,u,n,null),l.flags|=2),l.return=t,r.return=t,r.sibling=l,t.child=r,r=l,l=t.child,u=e.child.memoizedState,u=u===null?Ko(n):{baseLanes:u.baseLanes|n,cachePool:null,transitions:u.transitions},l.memoizedState=u,l.childLanes=e.childLanes&~n,t.memoizedState=Ho,r}return l=e.child,e=l.sibling,r=jn(l,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Yo(e,t){return t=us({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Xi(e,t,n,r){return r!==null&&bo(r),or(t,e.child,null,n),e=Yo(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Up(e,t,n,r,o,l,u){if(n)return t.flags&256?(t.flags&=-257,r=Bo(Error(c(422))),Xi(e,t,u,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(l=r.fallback,o=t.mode,r=us({mode:"visible",children:r.children},o,0,null),l=Fn(l,o,u,null),l.flags|=2,r.return=t,l.return=t,r.sibling=l,t.child=r,(t.mode&1)!==0&&or(t,e.child,null,u),t.child.memoizedState=Ko(u),t.memoizedState=Ho,l);if((t.mode&1)===0)return Xi(e,t,u,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var m=r.dgst;return r=m,l=Error(c(419)),r=Bo(l,r,void 0),Xi(e,t,u,r)}if(m=(u&e.childLanes)!==0,pt||m){if(r=Ge,r!==null){switch(u&-u){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=(o&(r.suspendedLanes|u))!==0?0:o,o!==0&&o!==l.retryLane&&(l.retryLane=o,Zt(e,o),Dt(r,e,o,-1))}return cl(),r=Bo(Error(c(421))),Xi(e,t,u,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=Jp.bind(null,e),o._reactRetry=t,null):(e=l.treeContext,bt=pn(o.nextSibling),vt=t,Te=!0,Lt=null,e!==null&&(kt[jt++]=Xt,kt[jt++]=Jt,kt[jt++]=An,Xt=e.id,Jt=e.overflow,An=t),t=Yo(t,r.children),t.flags|=4096,t)}function $c(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),No(e.return,t,n)}function Go(e,t,n,r,o){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=o)}function Wc(e,t,n){var r=t.pendingProps,o=r.revealOrder,l=r.tail;if(ot(e,t,r.children,n),r=ze.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&$c(e,n,t);else if(e.tag===19)$c(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Ce(ze,r),(t.mode&1)===0)t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&Vi(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),Go(t,!1,o,n,l);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&Vi(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}Go(t,!0,n,null,l);break;case"together":Go(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ji(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function tn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Pn|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(c(153));if(t.child!==null){for(e=t.child,n=jn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=jn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Fp(e,t,n){switch(t.tag){case 3:Uc(t),sr();break;case 5:rc(t);break;case 1:dt(t.type)&&Ii(t);break;case 4:Co(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;Ce(Fi,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(Ce(ze,ze.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?Bc(e,t,n):(Ce(ze,ze.current&1),e=tn(e,t,n),e!==null?e.sibling:null);Ce(ze,ze.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return Wc(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),Ce(ze,ze.current),r)break;return null;case 22:case 23:return t.lanes=0,Pc(e,t,n)}return tn(e,t,n)}var Vc,qo,Hc,Kc;Vc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},qo=function(){},Hc=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,In(Vt.current);var l=null;switch(n){case"input":o=rn(e,o),r=rn(e,r),l=[];break;case"select":o=$({},o,{value:void 0}),r=$({},r,{value:void 0}),l=[];break;case"textarea":o=J(e,o),r=J(e,r),l=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Ai)}br(n,r);var u;n=null;for(R in o)if(!r.hasOwnProperty(R)&&o.hasOwnProperty(R)&&o[R]!=null)if(R==="style"){var m=o[R];for(u in m)m.hasOwnProperty(u)&&(n||(n={}),n[u]="")}else R!=="dangerouslySetInnerHTML"&&R!=="children"&&R!=="suppressContentEditableWarning"&&R!=="suppressHydrationWarning"&&R!=="autoFocus"&&(p.hasOwnProperty(R)?l||(l=[]):(l=l||[]).push(R,null));for(R in r){var x=r[R];if(m=o!=null?o[R]:void 0,r.hasOwnProperty(R)&&x!==m&&(x!=null||m!=null))if(R==="style")if(m){for(u in m)!m.hasOwnProperty(u)||x&&x.hasOwnProperty(u)||(n||(n={}),n[u]="");for(u in x)x.hasOwnProperty(u)&&m[u]!==x[u]&&(n||(n={}),n[u]=x[u])}else n||(l||(l=[]),l.push(R,n)),n=x;else R==="dangerouslySetInnerHTML"?(x=x?x.__html:void 0,m=m?m.__html:void 0,x!=null&&m!==x&&(l=l||[]).push(R,x)):R==="children"?typeof x!="string"&&typeof x!="number"||(l=l||[]).push(R,""+x):R!=="suppressContentEditableWarning"&&R!=="suppressHydrationWarning"&&(p.hasOwnProperty(R)?(x!=null&&R==="onScroll"&&Re("scroll",e),l||m===x||(l=[])):(l=l||[]).push(R,x))}n&&(l=l||[]).push("style",n);var R=l;(t.updateQueue=R)&&(t.flags|=4)}},Kc=function(e,t,n,r){n!==r&&(t.flags|=4)};function Xr(e,t){if(!Te)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function nt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Bp(e,t,n){var r=t.pendingProps;switch(go(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return nt(t),null;case 1:return dt(t.type)&&Li(),nt(t),null;case 3:return r=t.stateNode,cr(),_e(ut),_e(et),To(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Mi(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Lt!==null&&(ol(Lt),Lt=null))),qo(e,t),nt(t),null;case 5:Ro(t);var o=In(Kr.current);if(n=t.type,e!==null&&t.stateNode!=null)Hc(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(c(166));return nt(t),null}if(e=In(Vt.current),Mi(t)){r=t.stateNode,n=t.type;var l=t.memoizedProps;switch(r[Wt]=t,r[Br]=l,e=(t.mode&1)!==0,n){case"dialog":Re("cancel",r),Re("close",r);break;case"iframe":case"object":case"embed":Re("load",r);break;case"video":case"audio":for(o=0;o<Mr.length;o++)Re(Mr[o],r);break;case"source":Re("error",r);break;case"img":case"image":case"link":Re("error",r),Re("load",r);break;case"details":Re("toggle",r);break;case"input":En(r,l),Re("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},Re("invalid",r);break;case"textarea":de(r,l),Re("invalid",r)}br(n,l),o=null;for(var u in l)if(l.hasOwnProperty(u)){var m=l[u];u==="children"?typeof m=="string"?r.textContent!==m&&(l.suppressHydrationWarning!==!0&&Ti(r.textContent,m,e),o=["children",m]):typeof m=="number"&&r.textContent!==""+m&&(l.suppressHydrationWarning!==!0&&Ti(r.textContent,m,e),o=["children",""+m]):p.hasOwnProperty(u)&&m!=null&&u==="onScroll"&&Re("scroll",r)}switch(n){case"input":_t(r),ce(r,l,!0);break;case"textarea":_t(r),Ie(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=Ai)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{u=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Ze(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=u.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=u.createElement(n,{is:r.is}):(e=u.createElement(n),n==="select"&&(u=e,r.multiple?u.multiple=!0:r.size&&(u.size=r.size))):e=u.createElementNS(e,n),e[Wt]=t,e[Br]=r,Vc(e,t,!1,!1),t.stateNode=e;e:{switch(u=_s(n,r),n){case"dialog":Re("cancel",e),Re("close",e),o=r;break;case"iframe":case"object":case"embed":Re("load",e),o=r;break;case"video":case"audio":for(o=0;o<Mr.length;o++)Re(Mr[o],e);o=r;break;case"source":Re("error",e),o=r;break;case"img":case"image":case"link":Re("error",e),Re("load",e),o=r;break;case"details":Re("toggle",e),o=r;break;case"input":En(e,r),o=rn(e,r),Re("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=$({},r,{value:void 0}),Re("invalid",e);break;case"textarea":de(e,r),o=J(e,r),Re("invalid",e);break;default:o=r}br(n,o),m=o;for(l in m)if(m.hasOwnProperty(l)){var x=m[l];l==="style"?yr(e,x):l==="dangerouslySetInnerHTML"?(x=x?x.__html:void 0,x!=null&&Ae(e,x)):l==="children"?typeof x=="string"?(n!=="textarea"||x!=="")&&Bt(e,x):typeof x=="number"&&Bt(e,""+x):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(p.hasOwnProperty(l)?x!=null&&l==="onScroll"&&Re("scroll",e):x!=null&&te(e,l,x,u))}switch(n){case"input":_t(e),ce(e,r,!1);break;case"textarea":_t(e),Ie(e);break;case"option":r.value!=null&&e.setAttribute("value",""+ue(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?W(e,!!r.multiple,l,!1):r.defaultValue!=null&&W(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Ai)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return nt(t),null;case 6:if(e&&t.stateNode!=null)Kc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(c(166));if(n=In(Kr.current),In(Vt.current),Mi(t)){if(r=t.stateNode,n=t.memoizedProps,r[Wt]=t,(l=r.nodeValue!==n)&&(e=vt,e!==null))switch(e.tag){case 3:Ti(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ti(r.nodeValue,n,(e.mode&1)!==0)}l&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Wt]=t,t.stateNode=r}return nt(t),null;case 13:if(_e(ze),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Te&&bt!==null&&(t.mode&1)!==0&&(t.flags&128)===0)qa(),sr(),t.flags|=98560,l=!1;else if(l=Mi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(c(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(c(317));l[Wt]=t}else sr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;nt(t),l=!1}else Lt!==null&&(ol(Lt),Lt=null),l=!0;if(!l)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(ze.current&1)!==0?Ve===0&&(Ve=3):cl())),t.updateQueue!==null&&(t.flags|=4),nt(t),null);case 4:return cr(),qo(e,t),e===null&&Ur(t.stateNode.containerInfo),nt(t),null;case 10:return jo(t.type._context),nt(t),null;case 17:return dt(t.type)&&Li(),nt(t),null;case 19:if(_e(ze),l=t.memoizedState,l===null)return nt(t),null;if(r=(t.flags&128)!==0,u=l.rendering,u===null)if(r)Xr(l,!1);else{if(Ve!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(u=Vi(e),u!==null){for(t.flags|=128,Xr(l,!1),r=u.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)l=n,e=r,l.flags&=14680066,u=l.alternate,u===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=u.childLanes,l.lanes=u.lanes,l.child=u.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=u.memoizedProps,l.memoizedState=u.memoizedState,l.updateQueue=u.updateQueue,l.type=u.type,e=u.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Ce(ze,ze.current&1|2),t.child}e=e.sibling}l.tail!==null&&Pe()>fr&&(t.flags|=128,r=!0,Xr(l,!1),t.lanes=4194304)}else{if(!r)if(e=Vi(u),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Xr(l,!0),l.tail===null&&l.tailMode==="hidden"&&!u.alternate&&!Te)return nt(t),null}else 2*Pe()-l.renderingStartTime>fr&&n!==1073741824&&(t.flags|=128,r=!0,Xr(l,!1),t.lanes=4194304);l.isBackwards?(u.sibling=t.child,t.child=u):(n=l.last,n!==null?n.sibling=u:t.child=u,l.last=u)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=Pe(),t.sibling=null,n=ze.current,Ce(ze,r?n&1|2:n&1),t):(nt(t),null);case 22:case 23:return al(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(wt&1073741824)!==0&&(nt(t),t.subtreeFlags&6&&(t.flags|=8192)):nt(t),null;case 24:return null;case 25:return null}throw Error(c(156,t.tag))}function $p(e,t){switch(go(t),t.tag){case 1:return dt(t.type)&&Li(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return cr(),_e(ut),_e(et),To(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Ro(t),null;case 13:if(_e(ze),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(c(340));sr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return _e(ze),null;case 4:return cr(),null;case 10:return jo(t.type._context),null;case 22:case 23:return al(),null;case 24:return null;default:return null}}var Zi=!1,rt=!1,Wp=typeof WeakSet=="function"?WeakSet:Set,Y=null;function dr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Oe(e,t,r)}else n.current=null}function Qo(e,t,n){try{n()}catch(r){Oe(e,t,r)}}var Yc=!1;function Vp(e,t){if(lo=vi,e=Sa(),Zs(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{n.nodeType,l.nodeType}catch{n=null;break e}var u=0,m=-1,x=-1,R=0,P=0,M=e,I=null;t:for(;;){for(var V;M!==n||o!==0&&M.nodeType!==3||(m=u+o),M!==l||r!==0&&M.nodeType!==3||(x=u+r),M.nodeType===3&&(u+=M.nodeValue.length),(V=M.firstChild)!==null;)I=M,M=V;for(;;){if(M===e)break t;if(I===n&&++R===o&&(m=u),I===l&&++P===r&&(x=u),(V=M.nextSibling)!==null)break;M=I,I=M.parentNode}M=V}n=m===-1||x===-1?null:{start:m,end:x}}else n=null}n=n||{start:0,end:0}}else n=null;for(ao={focusedElem:e,selectionRange:n},vi=!1,Y=t;Y!==null;)if(t=Y,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Y=e;else for(;Y!==null;){t=Y;try{var G=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(G!==null){var Q=G.memoizedProps,De=G.memoizedState,j=t.stateNode,g=j.getSnapshotBeforeUpdate(t.elementType===t.type?Q:It(t.type,Q),De);j.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var E=t.stateNode.containerInfo;E.nodeType===1?E.textContent="":E.nodeType===9&&E.documentElement&&E.removeChild(E.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(c(163))}}catch(F){Oe(t,t.return,F)}if(e=t.sibling,e!==null){e.return=t.return,Y=e;break}Y=t.return}return G=Yc,Yc=!1,G}function Jr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var l=o.destroy;o.destroy=void 0,l!==void 0&&Qo(t,n,l)}o=o.next}while(o!==r)}}function es(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Xo(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Gc(e){var t=e.alternate;t!==null&&(e.alternate=null,Gc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Wt],delete t[Br],delete t[fo],delete t[Ep],delete t[Cp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function qc(e){return e.tag===5||e.tag===3||e.tag===4}function Qc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||qc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Jo(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Ai));else if(r!==4&&(e=e.child,e!==null))for(Jo(e,t,n),e=e.sibling;e!==null;)Jo(e,t,n),e=e.sibling}function Zo(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Zo(e,t,n),e=e.sibling;e!==null;)Zo(e,t,n),e=e.sibling}var Qe=null,Ot=!1;function yn(e,t,n){for(n=n.child;n!==null;)Xc(e,t,n),n=n.sibling}function Xc(e,t,n){if($t&&typeof $t.onCommitFiberUnmount=="function")try{$t.onCommitFiberUnmount(fi,n)}catch{}switch(n.tag){case 5:rt||dr(n,t);case 6:var r=Qe,o=Ot;Qe=null,yn(e,t,n),Qe=r,Ot=o,Qe!==null&&(Ot?(e=Qe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Qe.removeChild(n.stateNode));break;case 18:Qe!==null&&(Ot?(e=Qe,n=n.stateNode,e.nodeType===8?po(e.parentNode,n):e.nodeType===1&&po(e,n),Tr(e)):po(Qe,n.stateNode));break;case 4:r=Qe,o=Ot,Qe=n.stateNode.containerInfo,Ot=!0,yn(e,t,n),Qe=r,Ot=o;break;case 0:case 11:case 14:case 15:if(!rt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var l=o,u=l.destroy;l=l.tag,u!==void 0&&((l&2)!==0||(l&4)!==0)&&Qo(n,t,u),o=o.next}while(o!==r)}yn(e,t,n);break;case 1:if(!rt&&(dr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(m){Oe(n,t,m)}yn(e,t,n);break;case 21:yn(e,t,n);break;case 22:n.mode&1?(rt=(r=rt)||n.memoizedState!==null,yn(e,t,n),rt=r):yn(e,t,n);break;default:yn(e,t,n)}}function Jc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Wp),t.forEach(function(r){var o=Zp.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function Pt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var l=e,u=t,m=u;e:for(;m!==null;){switch(m.tag){case 5:Qe=m.stateNode,Ot=!1;break e;case 3:Qe=m.stateNode.containerInfo,Ot=!0;break e;case 4:Qe=m.stateNode.containerInfo,Ot=!0;break e}m=m.return}if(Qe===null)throw Error(c(160));Xc(l,u,o),Qe=null,Ot=!1;var x=o.alternate;x!==null&&(x.return=null),o.return=null}catch(R){Oe(o,t,R)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Zc(t,e),t=t.sibling}function Zc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Pt(t,e),Kt(e),r&4){try{Jr(3,e,e.return),es(3,e)}catch(Q){Oe(e,e.return,Q)}try{Jr(5,e,e.return)}catch(Q){Oe(e,e.return,Q)}}break;case 1:Pt(t,e),Kt(e),r&512&&n!==null&&dr(n,n.return);break;case 5:if(Pt(t,e),Kt(e),r&512&&n!==null&&dr(n,n.return),e.flags&32){var o=e.stateNode;try{Bt(o,"")}catch(Q){Oe(e,e.return,Q)}}if(r&4&&(o=e.stateNode,o!=null)){var l=e.memoizedProps,u=n!==null?n.memoizedProps:l,m=e.type,x=e.updateQueue;if(e.updateQueue=null,x!==null)try{m==="input"&&l.type==="radio"&&l.name!=null&&Cn(o,l),_s(m,u);var R=_s(m,l);for(u=0;u<x.length;u+=2){var P=x[u],M=x[u+1];P==="style"?yr(o,M):P==="dangerouslySetInnerHTML"?Ae(o,M):P==="children"?Bt(o,M):te(o,P,M,R)}switch(m){case"input":z(o,l);break;case"textarea":ke(o,l);break;case"select":var I=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!l.multiple;var V=l.value;V!=null?W(o,!!l.multiple,V,!1):I!==!!l.multiple&&(l.defaultValue!=null?W(o,!!l.multiple,l.defaultValue,!0):W(o,!!l.multiple,l.multiple?[]:"",!1))}o[Br]=l}catch(Q){Oe(e,e.return,Q)}}break;case 6:if(Pt(t,e),Kt(e),r&4){if(e.stateNode===null)throw Error(c(162));o=e.stateNode,l=e.memoizedProps;try{o.nodeValue=l}catch(Q){Oe(e,e.return,Q)}}break;case 3:if(Pt(t,e),Kt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Tr(t.containerInfo)}catch(Q){Oe(e,e.return,Q)}break;case 4:Pt(t,e),Kt(e);break;case 13:Pt(t,e),Kt(e),o=e.child,o.flags&8192&&(l=o.memoizedState!==null,o.stateNode.isHidden=l,!l||o.alternate!==null&&o.alternate.memoizedState!==null||(nl=Pe())),r&4&&Jc(e);break;case 22:if(P=n!==null&&n.memoizedState!==null,e.mode&1?(rt=(R=rt)||P,Pt(t,e),rt=R):Pt(t,e),Kt(e),r&8192){if(R=e.memoizedState!==null,(e.stateNode.isHidden=R)&&!P&&(e.mode&1)!==0)for(Y=e,P=e.child;P!==null;){for(M=Y=P;Y!==null;){switch(I=Y,V=I.child,I.tag){case 0:case 11:case 14:case 15:Jr(4,I,I.return);break;case 1:dr(I,I.return);var G=I.stateNode;if(typeof G.componentWillUnmount=="function"){r=I,n=I.return;try{t=r,G.props=t.memoizedProps,G.state=t.memoizedState,G.componentWillUnmount()}catch(Q){Oe(r,n,Q)}}break;case 5:dr(I,I.return);break;case 22:if(I.memoizedState!==null){nu(M);continue}}V!==null?(V.return=I,Y=V):nu(M)}P=P.sibling}e:for(P=null,M=e;;){if(M.tag===5){if(P===null){P=M;try{o=M.stateNode,R?(l=o.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(m=M.stateNode,x=M.memoizedProps.style,u=x!=null&&x.hasOwnProperty("display")?x.display:null,m.style.display=sn("display",u))}catch(Q){Oe(e,e.return,Q)}}}else if(M.tag===6){if(P===null)try{M.stateNode.nodeValue=R?"":M.memoizedProps}catch(Q){Oe(e,e.return,Q)}}else if((M.tag!==22&&M.tag!==23||M.memoizedState===null||M===e)&&M.child!==null){M.child.return=M,M=M.child;continue}if(M===e)break e;for(;M.sibling===null;){if(M.return===null||M.return===e)break e;P===M&&(P=null),M=M.return}P===M&&(P=null),M.sibling.return=M.return,M=M.sibling}}break;case 19:Pt(t,e),Kt(e),r&4&&Jc(e);break;case 21:break;default:Pt(t,e),Kt(e)}}function Kt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(qc(n)){var r=n;break e}n=n.return}throw Error(c(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(Bt(o,""),r.flags&=-33);var l=Qc(e);Zo(e,l,o);break;case 3:case 4:var u=r.stateNode.containerInfo,m=Qc(e);Jo(e,m,u);break;default:throw Error(c(161))}}catch(x){Oe(e,e.return,x)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Hp(e,t,n){Y=e,eu(e)}function eu(e,t,n){for(var r=(e.mode&1)!==0;Y!==null;){var o=Y,l=o.child;if(o.tag===22&&r){var u=o.memoizedState!==null||Zi;if(!u){var m=o.alternate,x=m!==null&&m.memoizedState!==null||rt;m=Zi;var R=rt;if(Zi=u,(rt=x)&&!R)for(Y=o;Y!==null;)u=Y,x=u.child,u.tag===22&&u.memoizedState!==null?ru(o):x!==null?(x.return=u,Y=x):ru(o);for(;l!==null;)Y=l,eu(l),l=l.sibling;Y=o,Zi=m,rt=R}tu(e)}else(o.subtreeFlags&8772)!==0&&l!==null?(l.return=o,Y=l):tu(e)}}function tu(e){for(;Y!==null;){var t=Y;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:rt||es(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!rt)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:It(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=t.updateQueue;l!==null&&nc(t,l,r);break;case 3:var u=t.updateQueue;if(u!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}nc(t,u,n)}break;case 5:var m=t.stateNode;if(n===null&&t.flags&4){n=m;var x=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":x.autoFocus&&n.focus();break;case"img":x.src&&(n.src=x.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var R=t.alternate;if(R!==null){var P=R.memoizedState;if(P!==null){var M=P.dehydrated;M!==null&&Tr(M)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(c(163))}rt||t.flags&512&&Xo(t)}catch(I){Oe(t,t.return,I)}}if(t===e){Y=null;break}if(n=t.sibling,n!==null){n.return=t.return,Y=n;break}Y=t.return}}function nu(e){for(;Y!==null;){var t=Y;if(t===e){Y=null;break}var n=t.sibling;if(n!==null){n.return=t.return,Y=n;break}Y=t.return}}function ru(e){for(;Y!==null;){var t=Y;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{es(4,t)}catch(x){Oe(t,n,x)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(x){Oe(t,o,x)}}var l=t.return;try{Xo(t)}catch(x){Oe(t,l,x)}break;case 5:var u=t.return;try{Xo(t)}catch(x){Oe(t,u,x)}}}catch(x){Oe(t,t.return,x)}if(t===e){Y=null;break}var m=t.sibling;if(m!==null){m.return=t.return,Y=m;break}Y=t.return}}var Kp=Math.ceil,ts=ne.ReactCurrentDispatcher,el=ne.ReactCurrentOwner,Et=ne.ReactCurrentBatchConfig,me=0,Ge=null,Ue=null,Xe=0,wt=0,pr=fn(0),Ve=0,Zr=null,Pn=0,ns=0,tl=0,ei=null,ft=null,nl=0,fr=1/0,nn=null,rs=!1,rl=null,vn=null,is=!1,bn=null,ss=0,ti=0,il=null,os=-1,ls=0;function lt(){return(me&6)!==0?Pe():os!==-1?os:os=Pe()}function wn(e){return(e.mode&1)===0?1:(me&2)!==0&&Xe!==0?Xe&-Xe:_p.transition!==null?(ls===0&&(ls=Ql()),ls):(e=je,e!==0||(e=window.event,e=e===void 0?16:sa(e.type)),e)}function Dt(e,t,n,r){if(50<ti)throw ti=0,il=null,Error(c(185));Sr(e,n,r),((me&2)===0||e!==Ge)&&(e===Ge&&((me&2)===0&&(ns|=n),Ve===4&&kn(e,Xe)),ht(e,r),n===1&&me===0&&(t.mode&1)===0&&(fr=Pe()+500,Oi&&mn()))}function ht(e,t){var n=e.callbackNode;_d(e,t);var r=xi(e,e===Ge?Xe:0);if(r===0)n!==null&&Yl(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Yl(n),t===1)e.tag===0?Rp(su.bind(null,e)):Va(su.bind(null,e)),Np(function(){(me&6)===0&&mn()}),n=null;else{switch(Xl(r)){case 1:n=Ps;break;case 4:n=Gl;break;case 16:n=pi;break;case 536870912:n=ql;break;default:n=pi}n=fu(n,iu.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function iu(e,t){if(os=-1,ls=0,(me&6)!==0)throw Error(c(327));var n=e.callbackNode;if(hr()&&e.callbackNode!==n)return null;var r=xi(e,e===Ge?Xe:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=as(e,r);else{t=r;var o=me;me|=2;var l=lu();(Ge!==e||Xe!==t)&&(nn=null,fr=Pe()+500,Mn(e,t));do try{qp();break}catch(m){ou(e,m)}while(!0);ko(),ts.current=l,me=o,Ue!==null?t=0:(Ge=null,Xe=0,t=Ve)}if(t!==0){if(t===2&&(o=Ds(e),o!==0&&(r=o,t=sl(e,o))),t===1)throw n=Zr,Mn(e,0),kn(e,r),ht(e,Pe()),n;if(t===6)kn(e,r);else{if(o=e.current.alternate,(r&30)===0&&!Yp(o)&&(t=as(e,r),t===2&&(l=Ds(e),l!==0&&(r=l,t=sl(e,l))),t===1))throw n=Zr,Mn(e,0),kn(e,r),ht(e,Pe()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(c(345));case 2:Un(e,ft,nn);break;case 3:if(kn(e,r),(r&130023424)===r&&(t=nl+500-Pe(),10<t)){if(xi(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){lt(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=uo(Un.bind(null,e,ft,nn),t);break}Un(e,ft,nn);break;case 4:if(kn(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var u=31-At(r);l=1<<u,u=t[u],u>o&&(o=u),r&=~l}if(r=o,r=Pe()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Kp(r/1960))-r,10<r){e.timeoutHandle=uo(Un.bind(null,e,ft,nn),r);break}Un(e,ft,nn);break;case 5:Un(e,ft,nn);break;default:throw Error(c(329))}}}return ht(e,Pe()),e.callbackNode===n?iu.bind(null,e):null}function sl(e,t){var n=ei;return e.current.memoizedState.isDehydrated&&(Mn(e,t).flags|=256),e=as(e,t),e!==2&&(t=ft,ft=n,t!==null&&ol(t)),e}function ol(e){ft===null?ft=e:ft.push.apply(ft,e)}function Yp(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],l=o.getSnapshot;o=o.value;try{if(!zt(l(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function kn(e,t){for(t&=~tl,t&=~ns,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-At(t),r=1<<n;e[n]=-1,t&=~r}}function su(e){if((me&6)!==0)throw Error(c(327));hr();var t=xi(e,0);if((t&1)===0)return ht(e,Pe()),null;var n=as(e,t);if(e.tag!==0&&n===2){var r=Ds(e);r!==0&&(t=r,n=sl(e,r))}if(n===1)throw n=Zr,Mn(e,0),kn(e,t),ht(e,Pe()),n;if(n===6)throw Error(c(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Un(e,ft,nn),ht(e,Pe()),null}function ll(e,t){var n=me;me|=1;try{return e(t)}finally{me=n,me===0&&(fr=Pe()+500,Oi&&mn())}}function Dn(e){bn!==null&&bn.tag===0&&(me&6)===0&&hr();var t=me;me|=1;var n=Et.transition,r=je;try{if(Et.transition=null,je=1,e)return e()}finally{je=r,Et.transition=n,me=t,(me&6)===0&&mn()}}function al(){wt=pr.current,_e(pr)}function Mn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,jp(n)),Ue!==null)for(n=Ue.return;n!==null;){var r=n;switch(go(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Li();break;case 3:cr(),_e(ut),_e(et),To();break;case 5:Ro(r);break;case 4:cr();break;case 13:_e(ze);break;case 19:_e(ze);break;case 10:jo(r.type._context);break;case 22:case 23:al()}n=n.return}if(Ge=e,Ue=e=jn(e.current,null),Xe=wt=t,Ve=0,Zr=null,tl=ns=Pn=0,ft=ei=null,Ln!==null){for(t=0;t<Ln.length;t++)if(n=Ln[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,l=n.pending;if(l!==null){var u=l.next;l.next=o,r.next=u}n.pending=r}Ln=null}return e}function ou(e,t){do{var n=Ue;try{if(ko(),Hi.current=qi,Ki){for(var r=Le.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}Ki=!1}if(On=0,Ye=We=Le=null,Yr=!1,Gr=0,el.current=null,n===null||n.return===null){Ve=1,Zr=t,Ue=null;break}e:{var l=e,u=n.return,m=n,x=t;if(t=Xe,m.flags|=32768,x!==null&&typeof x=="object"&&typeof x.then=="function"){var R=x,P=m,M=P.tag;if((P.mode&1)===0&&(M===0||M===11||M===15)){var I=P.alternate;I?(P.updateQueue=I.updateQueue,P.memoizedState=I.memoizedState,P.lanes=I.lanes):(P.updateQueue=null,P.memoizedState=null)}var V=Ac(u);if(V!==null){V.flags&=-257,zc(V,u,m,l,t),V.mode&1&&Tc(l,R,t),t=V,x=R;var G=t.updateQueue;if(G===null){var Q=new Set;Q.add(x),t.updateQueue=Q}else G.add(x);break e}else{if((t&1)===0){Tc(l,R,t),cl();break e}x=Error(c(426))}}else if(Te&&m.mode&1){var De=Ac(u);if(De!==null){(De.flags&65536)===0&&(De.flags|=256),zc(De,u,m,l,t),bo(ur(x,m));break e}}l=x=ur(x,m),Ve!==4&&(Ve=2),ei===null?ei=[l]:ei.push(l),l=u;do{switch(l.tag){case 3:l.flags|=65536,t&=-t,l.lanes|=t;var j=Rc(l,x,t);tc(l,j);break e;case 1:m=x;var g=l.type,E=l.stateNode;if((l.flags&128)===0&&(typeof g.getDerivedStateFromError=="function"||E!==null&&typeof E.componentDidCatch=="function"&&(vn===null||!vn.has(E)))){l.flags|=65536,t&=-t,l.lanes|=t;var F=_c(l,m,t);tc(l,F);break e}}l=l.return}while(l!==null)}cu(n)}catch(X){t=X,Ue===n&&n!==null&&(Ue=n=n.return);continue}break}while(!0)}function lu(){var e=ts.current;return ts.current=qi,e===null?qi:e}function cl(){(Ve===0||Ve===3||Ve===2)&&(Ve=4),Ge===null||(Pn&268435455)===0&&(ns&268435455)===0||kn(Ge,Xe)}function as(e,t){var n=me;me|=2;var r=lu();(Ge!==e||Xe!==t)&&(nn=null,Mn(e,t));do try{Gp();break}catch(o){ou(e,o)}while(!0);if(ko(),me=n,ts.current=r,Ue!==null)throw Error(c(261));return Ge=null,Xe=0,Ve}function Gp(){for(;Ue!==null;)au(Ue)}function qp(){for(;Ue!==null&&!bd();)au(Ue)}function au(e){var t=pu(e.alternate,e,wt);e.memoizedProps=e.pendingProps,t===null?cu(e):Ue=t,el.current=null}function cu(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Bp(n,t,wt),n!==null){Ue=n;return}}else{if(n=$p(n,t),n!==null){n.flags&=32767,Ue=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Ve=6,Ue=null;return}}if(t=t.sibling,t!==null){Ue=t;return}Ue=t=e}while(t!==null);Ve===0&&(Ve=5)}function Un(e,t,n){var r=je,o=Et.transition;try{Et.transition=null,je=1,Qp(e,t,n,r)}finally{Et.transition=o,je=r}return null}function Qp(e,t,n,r){do hr();while(bn!==null);if((me&6)!==0)throw Error(c(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(c(177));e.callbackNode=null,e.callbackPriority=0;var l=n.lanes|n.childLanes;if(Td(e,l),e===Ge&&(Ue=Ge=null,Xe=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||is||(is=!0,fu(pi,function(){return hr(),null})),l=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||l){l=Et.transition,Et.transition=null;var u=je;je=1;var m=me;me|=4,el.current=null,Vp(e,n),Zc(n,e),xp(ao),vi=!!lo,ao=lo=null,e.current=n,Hp(n),wd(),me=m,je=u,Et.transition=l}else e.current=n;if(is&&(is=!1,bn=e,ss=o),l=e.pendingLanes,l===0&&(vn=null),Nd(n.stateNode),ht(e,Pe()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(rs)throw rs=!1,e=rl,rl=null,e;return(ss&1)!==0&&e.tag!==0&&hr(),l=e.pendingLanes,(l&1)!==0?e===il?ti++:(ti=0,il=e):ti=0,mn(),null}function hr(){if(bn!==null){var e=Xl(ss),t=Et.transition,n=je;try{if(Et.transition=null,je=16>e?16:e,bn===null)var r=!1;else{if(e=bn,bn=null,ss=0,(me&6)!==0)throw Error(c(331));var o=me;for(me|=4,Y=e.current;Y!==null;){var l=Y,u=l.child;if((Y.flags&16)!==0){var m=l.deletions;if(m!==null){for(var x=0;x<m.length;x++){var R=m[x];for(Y=R;Y!==null;){var P=Y;switch(P.tag){case 0:case 11:case 15:Jr(8,P,l)}var M=P.child;if(M!==null)M.return=P,Y=M;else for(;Y!==null;){P=Y;var I=P.sibling,V=P.return;if(Gc(P),P===R){Y=null;break}if(I!==null){I.return=V,Y=I;break}Y=V}}}var G=l.alternate;if(G!==null){var Q=G.child;if(Q!==null){G.child=null;do{var De=Q.sibling;Q.sibling=null,Q=De}while(Q!==null)}}Y=l}}if((l.subtreeFlags&2064)!==0&&u!==null)u.return=l,Y=u;else e:for(;Y!==null;){if(l=Y,(l.flags&2048)!==0)switch(l.tag){case 0:case 11:case 15:Jr(9,l,l.return)}var j=l.sibling;if(j!==null){j.return=l.return,Y=j;break e}Y=l.return}}var g=e.current;for(Y=g;Y!==null;){u=Y;var E=u.child;if((u.subtreeFlags&2064)!==0&&E!==null)E.return=u,Y=E;else e:for(u=g;Y!==null;){if(m=Y,(m.flags&2048)!==0)try{switch(m.tag){case 0:case 11:case 15:es(9,m)}}catch(X){Oe(m,m.return,X)}if(m===u){Y=null;break e}var F=m.sibling;if(F!==null){F.return=m.return,Y=F;break e}Y=m.return}}if(me=o,mn(),$t&&typeof $t.onPostCommitFiberRoot=="function")try{$t.onPostCommitFiberRoot(fi,e)}catch{}r=!0}return r}finally{je=n,Et.transition=t}}return!1}function uu(e,t,n){t=ur(n,t),t=Rc(e,t,1),e=gn(e,t,1),t=lt(),e!==null&&(Sr(e,1,t),ht(e,t))}function Oe(e,t,n){if(e.tag===3)uu(e,e,n);else for(;t!==null;){if(t.tag===3){uu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(vn===null||!vn.has(r))){e=ur(n,e),e=_c(t,e,1),t=gn(t,e,1),e=lt(),t!==null&&(Sr(t,1,e),ht(t,e));break}}t=t.return}}function Xp(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=lt(),e.pingedLanes|=e.suspendedLanes&n,Ge===e&&(Xe&n)===n&&(Ve===4||Ve===3&&(Xe&130023424)===Xe&&500>Pe()-nl?Mn(e,0):tl|=n),ht(e,t)}function du(e,t){t===0&&((e.mode&1)===0?t=1:(t=mi,mi<<=1,(mi&130023424)===0&&(mi=4194304)));var n=lt();e=Zt(e,t),e!==null&&(Sr(e,t,n),ht(e,n))}function Jp(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),du(e,n)}function Zp(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(c(314))}r!==null&&r.delete(t),du(e,n)}var pu;pu=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ut.current)pt=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return pt=!1,Fp(e,t,n);pt=(e.flags&131072)!==0}else pt=!1,Te&&(t.flags&1048576)!==0&&Ha(t,Di,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ji(e,t),e=t.pendingProps;var o=nr(t,et.current);ar(t,n),o=Lo(null,t,r,e,o,n);var l=Io();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,dt(r)?(l=!0,Ii(t)):l=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Eo(t),o.updater=Qi,t.stateNode=o,o._reactInternals=t,Fo(t,r,e,n),t=Vo(null,t,r,!0,l,n)):(t.tag=0,Te&&l&&xo(t),ot(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ji(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=tf(r),e=It(r,e),o){case 0:t=Wo(null,t,r,e,n);break e;case 1:t=Mc(null,t,r,e,n);break e;case 11:t=Lc(null,t,r,e,n);break e;case 14:t=Ic(null,t,r,It(r.type,e),n);break e}throw Error(c(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:It(r,o),Wo(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:It(r,o),Mc(e,t,r,o,n);case 3:e:{if(Uc(t),e===null)throw Error(c(387));r=t.pendingProps,l=t.memoizedState,o=l.element,ec(e,t),Wi(t,r,null,n);var u=t.memoizedState;if(r=u.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:u.cache,pendingSuspenseBoundaries:u.pendingSuspenseBoundaries,transitions:u.transitions},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){o=ur(Error(c(423)),t),t=Fc(e,t,r,n,o);break e}else if(r!==o){o=ur(Error(c(424)),t),t=Fc(e,t,r,n,o);break e}else for(bt=pn(t.stateNode.containerInfo.firstChild),vt=t,Te=!0,Lt=null,n=Ja(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(sr(),r===o){t=tn(e,t,n);break e}ot(e,t,r,n)}t=t.child}return t;case 5:return rc(t),e===null&&vo(t),r=t.type,o=t.pendingProps,l=e!==null?e.memoizedProps:null,u=o.children,co(r,o)?u=null:l!==null&&co(r,l)&&(t.flags|=32),Dc(e,t),ot(e,t,u,n),t.child;case 6:return e===null&&vo(t),null;case 13:return Bc(e,t,n);case 4:return Co(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=or(t,null,r,n):ot(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:It(r,o),Lc(e,t,r,o,n);case 7:return ot(e,t,t.pendingProps,n),t.child;case 8:return ot(e,t,t.pendingProps.children,n),t.child;case 12:return ot(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,l=t.memoizedProps,u=o.value,Ce(Fi,r._currentValue),r._currentValue=u,l!==null)if(zt(l.value,u)){if(l.children===o.children&&!ut.current){t=tn(e,t,n);break e}}else for(l=t.child,l!==null&&(l.return=t);l!==null;){var m=l.dependencies;if(m!==null){u=l.child;for(var x=m.firstContext;x!==null;){if(x.context===r){if(l.tag===1){x=en(-1,n&-n),x.tag=2;var R=l.updateQueue;if(R!==null){R=R.shared;var P=R.pending;P===null?x.next=x:(x.next=P.next,P.next=x),R.pending=x}}l.lanes|=n,x=l.alternate,x!==null&&(x.lanes|=n),No(l.return,n,t),m.lanes|=n;break}x=x.next}}else if(l.tag===10)u=l.type===t.type?null:l.child;else if(l.tag===18){if(u=l.return,u===null)throw Error(c(341));u.lanes|=n,m=u.alternate,m!==null&&(m.lanes|=n),No(u,n,t),u=l.sibling}else u=l.child;if(u!==null)u.return=l;else for(u=l;u!==null;){if(u===t){u=null;break}if(l=u.sibling,l!==null){l.return=u.return,u=l;break}u=u.return}l=u}ot(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,ar(t,n),o=Nt(o),r=r(o),t.flags|=1,ot(e,t,r,n),t.child;case 14:return r=t.type,o=It(r,t.pendingProps),o=It(r.type,o),Ic(e,t,r,o,n);case 15:return Oc(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:It(r,o),Ji(e,t),t.tag=1,dt(r)?(e=!0,Ii(t)):e=!1,ar(t,n),Ec(t,r,o),Fo(t,r,o,n),Vo(null,t,r,!0,e,n);case 19:return Wc(e,t,n);case 22:return Pc(e,t,n)}throw Error(c(156,t.tag))};function fu(e,t){return Kl(e,t)}function ef(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ct(e,t,n,r){return new ef(e,t,n,r)}function ul(e){return e=e.prototype,!(!e||!e.isReactComponent)}function tf(e){if(typeof e=="function")return ul(e)?1:0;if(e!=null){if(e=e.$$typeof,e===$e)return 11;if(e===Me)return 14}return 2}function jn(e,t){var n=e.alternate;return n===null?(n=Ct(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function cs(e,t,n,r,o,l){var u=2;if(r=e,typeof e=="function")ul(e)&&(u=1);else if(typeof e=="string")u=5;else e:switch(e){case ge:return Fn(n.children,o,l,t);case Fe:u=8,o|=8;break;case Be:return e=Ct(12,n,t,o|2),e.elementType=Be,e.lanes=l,e;case Se:return e=Ct(13,n,t,o),e.elementType=Se,e.lanes=l,e;case Ee:return e=Ct(19,n,t,o),e.elementType=Ee,e.lanes=l,e;case ve:return us(n,o,l,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Je:u=10;break e;case st:u=9;break e;case $e:u=11;break e;case Me:u=14;break e;case he:u=16,r=null;break e}throw Error(c(130,e==null?e:typeof e,""))}return t=Ct(u,n,t,o),t.elementType=e,t.type=r,t.lanes=l,t}function Fn(e,t,n,r){return e=Ct(7,e,r,t),e.lanes=n,e}function us(e,t,n,r){return e=Ct(22,e,r,t),e.elementType=ve,e.lanes=n,e.stateNode={isHidden:!1},e}function dl(e,t,n){return e=Ct(6,e,null,t),e.lanes=n,e}function pl(e,t,n){return t=Ct(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function nf(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ms(0),this.expirationTimes=Ms(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ms(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function fl(e,t,n,r,o,l,u,m,x){return e=new nf(e,t,n,m,x),t===1?(t=1,l===!0&&(t|=8)):t=0,l=Ct(3,null,null,t),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Eo(l),e}function rf(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ne,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function hu(e){if(!e)return hn;e=e._reactInternals;e:{if(Rn(e)!==e||e.tag!==1)throw Error(c(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(dt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(c(171))}if(e.tag===1){var n=e.type;if(dt(n))return $a(e,n,t)}return t}function mu(e,t,n,r,o,l,u,m,x){return e=fl(n,r,!0,e,o,l,u,m,x),e.context=hu(null),n=e.current,r=lt(),o=wn(n),l=en(r,o),l.callback=t??null,gn(n,l,o),e.current.lanes=o,Sr(e,o,r),ht(e,r),e}function ds(e,t,n,r){var o=t.current,l=lt(),u=wn(o);return n=hu(n),t.context===null?t.context=n:t.pendingContext=n,t=en(l,u),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=gn(o,t,u),e!==null&&(Dt(e,o,u,l),$i(e,o,u)),u}function ps(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function xu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function hl(e,t){xu(e,t),(e=e.alternate)&&xu(e,t)}function sf(){return null}var gu=typeof reportError=="function"?reportError:function(e){console.error(e)};function ml(e){this._internalRoot=e}fs.prototype.render=ml.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(c(409));ds(e,t,null,null)},fs.prototype.unmount=ml.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Dn(function(){ds(null,e,null,null)}),t[qt]=null}};function fs(e){this._internalRoot=e}fs.prototype.unstable_scheduleHydration=function(e){if(e){var t=ea();e={blockedOn:null,target:e,priority:t};for(var n=0;n<cn.length&&t!==0&&t<cn[n].priority;n++);cn.splice(n,0,e),n===0&&ra(e)}};function xl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function hs(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function yu(){}function of(e,t,n,r,o){if(o){if(typeof r=="function"){var l=r;r=function(){var R=ps(u);l.call(R)}}var u=mu(t,r,e,0,null,!1,!1,"",yu);return e._reactRootContainer=u,e[qt]=u.current,Ur(e.nodeType===8?e.parentNode:e),Dn(),u}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var m=r;r=function(){var R=ps(x);m.call(R)}}var x=fl(e,0,!1,null,null,!1,!1,"",yu);return e._reactRootContainer=x,e[qt]=x.current,Ur(e.nodeType===8?e.parentNode:e),Dn(function(){ds(t,x,n,r)}),x}function ms(e,t,n,r,o){var l=n._reactRootContainer;if(l){var u=l;if(typeof o=="function"){var m=o;o=function(){var x=ps(u);m.call(x)}}ds(t,u,e,o)}else u=of(n,t,e,o,r);return ps(u)}Jl=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Nr(t.pendingLanes);n!==0&&(Us(t,n|1),ht(t,Pe()),(me&6)===0&&(fr=Pe()+500,mn()))}break;case 13:Dn(function(){var r=Zt(e,1);if(r!==null){var o=lt();Dt(r,e,1,o)}}),hl(e,1)}},Fs=function(e){if(e.tag===13){var t=Zt(e,134217728);if(t!==null){var n=lt();Dt(t,e,134217728,n)}hl(e,134217728)}},Zl=function(e){if(e.tag===13){var t=wn(e),n=Zt(e,t);if(n!==null){var r=lt();Dt(n,e,t,r)}hl(e,t)}},ea=function(){return je},ta=function(e,t){var n=je;try{return je=e,t()}finally{je=n}},zs=function(e,t,n){switch(t){case"input":if(z(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=zi(r);if(!o)throw Error(c(90));Sn(r),z(r,o)}}}break;case"textarea":ke(e,n);break;case"select":t=n.value,t!=null&&W(e,!!n.multiple,t,!1)}},Ul=ll,Fl=Dn;var lf={usingClientEntryPoint:!1,Events:[$r,er,zi,Dl,Ml,ll]},ni={findFiberByHostInstance:_n,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},af={bundleType:ni.bundleType,version:ni.version,rendererPackageName:ni.rendererPackageName,rendererConfig:ni.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ne.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Vl(e),e===null?null:e.stateNode},findFiberByHostInstance:ni.findFiberByHostInstance||sf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var xs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!xs.isDisabled&&xs.supportsFiber)try{fi=xs.inject(af),$t=xs}catch{}}return mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=lf,mt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!xl(t))throw Error(c(200));return rf(e,t,null,n)},mt.createRoot=function(e,t){if(!xl(e))throw Error(c(299));var n=!1,r="",o=gu;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=fl(e,1,!1,null,null,n,!1,r,o),e[qt]=t.current,Ur(e.nodeType===8?e.parentNode:e),new ml(t)},mt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(c(188)):(e=Object.keys(e).join(","),Error(c(268,e)));return e=Vl(t),e=e===null?null:e.stateNode,e},mt.flushSync=function(e){return Dn(e)},mt.hydrate=function(e,t,n){if(!hs(t))throw Error(c(200));return ms(null,e,t,!0,n)},mt.hydrateRoot=function(e,t,n){if(!xl(e))throw Error(c(405));var r=n!=null&&n.hydratedSources||null,o=!1,l="",u=gu;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onRecoverableError!==void 0&&(u=n.onRecoverableError)),t=mu(t,null,e,1,n??null,o,!1,l,u),e[qt]=t.current,Ur(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new fs(t)},mt.render=function(e,t,n){if(!hs(t))throw Error(c(200));return ms(null,e,t,!1,n)},mt.unmountComponentAtNode=function(e){if(!hs(e))throw Error(c(40));return e._reactRootContainer?(Dn(function(){ms(null,null,e,!1,function(){e._reactRootContainer=null,e[qt]=null})}),!0):!1},mt.unstable_batchedUpdates=ll,mt.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!hs(n))throw Error(c(200));if(e==null||e._reactInternals===void 0)throw Error(c(38));return ms(e,t,n,!1,r)},mt.version="18.3.1-next-f1338f8080-20240426",mt}var Eu;function xf(){if(Eu)return vl.exports;Eu=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(a){console.error(a)}}return s(),vl.exports=mf(),vl.exports}var Cu;function gf(){if(Cu)return gs;Cu=1;var s=xf();return gs.createRoot=s.createRoot,gs.hydrateRoot=s.hydrateRoot,gs}var yf=gf();const vf=Hu(yf);function Yu(s,a){return function(){return s.apply(a,arguments)}}const{toString:bf}=Object.prototype,{getPrototypeOf:Al}=Object,{iterator:Ns,toStringTag:Gu}=Symbol,Ss=(s=>a=>{const c=bf.call(a);return s[c]||(s[c]=c.slice(8,-1).toLowerCase())})(Object.create(null)),Mt=s=>(s=s.toLowerCase(),a=>Ss(a)===s),Es=s=>a=>typeof a===s,{isArray:gr}=Array,xr=Es("undefined");function si(s){return s!==null&&!xr(s)&&s.constructor!==null&&!xr(s.constructor)&&xt(s.constructor.isBuffer)&&s.constructor.isBuffer(s)}const qu=Mt("ArrayBuffer");function wf(s){let a;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?a=ArrayBuffer.isView(s):a=s&&s.buffer&&qu(s.buffer),a}const kf=Es("string"),xt=Es("function"),Qu=Es("number"),oi=s=>s!==null&&typeof s=="object",jf=s=>s===!0||s===!1,bs=s=>{if(Ss(s)!=="object")return!1;const a=Al(s);return(a===null||a===Object.prototype||Object.getPrototypeOf(a)===null)&&!(Gu in s)&&!(Ns in s)},Nf=s=>{if(!oi(s)||si(s))return!1;try{return Object.keys(s).length===0&&Object.getPrototypeOf(s)===Object.prototype}catch{return!1}},Sf=Mt("Date"),Ef=Mt("File"),Cf=s=>!!(s&&typeof s.uri<"u"),Rf=s=>s&&typeof s.getParts<"u",_f=Mt("Blob"),Tf=Mt("FileList"),Af=s=>oi(s)&&xt(s.pipe);function zf(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const Ru=zf(),_u=typeof Ru.FormData<"u"?Ru.FormData:void 0,Lf=s=>{let a;return s&&(_u&&s instanceof _u||xt(s.append)&&((a=Ss(s))==="formdata"||a==="object"&&xt(s.toString)&&s.toString()==="[object FormData]"))},If=Mt("URLSearchParams"),[Of,Pf,Df,Mf]=["ReadableStream","Request","Response","Headers"].map(Mt),Uf=s=>s.trim?s.trim():s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function li(s,a,{allOwnKeys:c=!1}={}){if(s===null||typeof s>"u")return;let d,p;if(typeof s!="object"&&(s=[s]),gr(s))for(d=0,p=s.length;d<p;d++)a.call(null,s[d],d,s);else{if(si(s))return;const f=c?Object.getOwnPropertyNames(s):Object.keys(s),h=f.length;let y;for(d=0;d<h;d++)y=f[d],a.call(null,s[y],y,s)}}function Xu(s,a){if(si(s))return null;a=a.toLowerCase();const c=Object.keys(s);let d=c.length,p;for(;d-- >0;)if(p=c[d],a===p.toLowerCase())return p;return null}const Bn=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Ju=s=>!xr(s)&&s!==Bn;function El(){const{caseless:s,skipUndefined:a}=Ju(this)&&this||{},c={},d=(p,f)=>{if(f==="__proto__"||f==="constructor"||f==="prototype")return;const h=s&&Xu(c,f)||f;bs(c[h])&&bs(p)?c[h]=El(c[h],p):bs(p)?c[h]=El({},p):gr(p)?c[h]=p.slice():(!a||!xr(p))&&(c[h]=p)};for(let p=0,f=arguments.length;p<f;p++)arguments[p]&&li(arguments[p],d);return c}const Ff=(s,a,c,{allOwnKeys:d}={})=>(li(a,(p,f)=>{c&&xt(p)?Object.defineProperty(s,f,{value:Yu(p,c),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(s,f,{value:p,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:d}),s),Bf=s=>(s.charCodeAt(0)===65279&&(s=s.slice(1)),s),$f=(s,a,c,d)=>{s.prototype=Object.create(a.prototype,d),Object.defineProperty(s.prototype,"constructor",{value:s,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(s,"super",{value:a.prototype}),c&&Object.assign(s.prototype,c)},Wf=(s,a,c,d)=>{let p,f,h;const y={};if(a=a||{},s==null)return a;do{for(p=Object.getOwnPropertyNames(s),f=p.length;f-- >0;)h=p[f],(!d||d(h,s,a))&&!y[h]&&(a[h]=s[h],y[h]=!0);s=c!==!1&&Al(s)}while(s&&(!c||c(s,a))&&s!==Object.prototype);return a},Vf=(s,a,c)=>{s=String(s),(c===void 0||c>s.length)&&(c=s.length),c-=a.length;const d=s.indexOf(a,c);return d!==-1&&d===c},Hf=s=>{if(!s)return null;if(gr(s))return s;let a=s.length;if(!Qu(a))return null;const c=new Array(a);for(;a-- >0;)c[a]=s[a];return c},Kf=(s=>a=>s&&a instanceof s)(typeof Uint8Array<"u"&&Al(Uint8Array)),Yf=(s,a)=>{const d=(s&&s[Ns]).call(s);let p;for(;(p=d.next())&&!p.done;){const f=p.value;a.call(s,f[0],f[1])}},Gf=(s,a)=>{let c;const d=[];for(;(c=s.exec(a))!==null;)d.push(c);return d},qf=Mt("HTMLFormElement"),Qf=s=>s.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(c,d,p){return d.toUpperCase()+p}),Tu=(({hasOwnProperty:s})=>(a,c)=>s.call(a,c))(Object.prototype),Xf=Mt("RegExp"),Zu=(s,a)=>{const c=Object.getOwnPropertyDescriptors(s),d={};li(c,(p,f)=>{let h;(h=a(p,f,s))!==!1&&(d[f]=h||p)}),Object.defineProperties(s,d)},Jf=s=>{Zu(s,(a,c)=>{if(xt(s)&&["arguments","caller","callee"].indexOf(c)!==-1)return!1;const d=s[c];if(xt(d)){if(a.enumerable=!1,"writable"in a){a.writable=!1;return}a.set||(a.set=()=>{throw Error("Can not rewrite read-only method '"+c+"'")})}})},Zf=(s,a)=>{const c={},d=p=>{p.forEach(f=>{c[f]=!0})};return gr(s)?d(s):d(String(s).split(a)),c},eh=()=>{},th=(s,a)=>s!=null&&Number.isFinite(s=+s)?s:a;function nh(s){return!!(s&&xt(s.append)&&s[Gu]==="FormData"&&s[Ns])}const rh=s=>{const a=new Array(10),c=(d,p)=>{if(oi(d)){if(a.indexOf(d)>=0)return;if(si(d))return d;if(!("toJSON"in d)){a[p]=d;const f=gr(d)?[]:{};return li(d,(h,y)=>{const C=c(h,p+1);!xr(C)&&(f[y]=C)}),a[p]=void 0,f}}return d};return c(s,0)},ih=Mt("AsyncFunction"),sh=s=>s&&(oi(s)||xt(s))&&xt(s.then)&&xt(s.catch),ed=((s,a)=>s?setImmediate:a?((c,d)=>(Bn.addEventListener("message",({source:p,data:f})=>{p===Bn&&f===c&&d.length&&d.shift()()},!1),p=>{d.push(p),Bn.postMessage(c,"*")}))(`axios@${Math.random()}`,[]):c=>setTimeout(c))(typeof setImmediate=="function",xt(Bn.postMessage)),oh=typeof queueMicrotask<"u"?queueMicrotask.bind(Bn):typeof process<"u"&&process.nextTick||ed,lh=s=>s!=null&&xt(s[Ns]),_={isArray:gr,isArrayBuffer:qu,isBuffer:si,isFormData:Lf,isArrayBufferView:wf,isString:kf,isNumber:Qu,isBoolean:jf,isObject:oi,isPlainObject:bs,isEmptyObject:Nf,isReadableStream:Of,isRequest:Pf,isResponse:Df,isHeaders:Mf,isUndefined:xr,isDate:Sf,isFile:Ef,isReactNativeBlob:Cf,isReactNative:Rf,isBlob:_f,isRegExp:Xf,isFunction:xt,isStream:Af,isURLSearchParams:If,isTypedArray:Kf,isFileList:Tf,forEach:li,merge:El,extend:Ff,trim:Uf,stripBOM:Bf,inherits:$f,toFlatObject:Wf,kindOf:Ss,kindOfTest:Mt,endsWith:Vf,toArray:Hf,forEachEntry:Yf,matchAll:Gf,isHTMLForm:qf,hasOwnProperty:Tu,hasOwnProp:Tu,reduceDescriptors:Zu,freezeMethods:Jf,toObjectSet:Zf,toCamelCase:Qf,noop:eh,toFiniteNumber:th,findKey:Xu,global:Bn,isContextDefined:Ju,isSpecCompliantForm:nh,toJSONObject:rh,isAsyncFn:ih,isThenable:sh,setImmediate:ed,asap:oh,isIterable:lh};let ie=class td extends Error{static from(a,c,d,p,f,h){const y=new td(a.message,c||a.code,d,p,f);return y.cause=a,y.name=a.name,a.status!=null&&y.status==null&&(y.status=a.status),h&&Object.assign(y,h),y}constructor(a,c,d,p,f){super(a),Object.defineProperty(this,"message",{value:a,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,c&&(this.code=c),d&&(this.config=d),p&&(this.request=p),f&&(this.response=f,this.status=f.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:_.toJSONObject(this.config),code:this.code,status:this.status}}};ie.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";ie.ERR_BAD_OPTION="ERR_BAD_OPTION";ie.ECONNABORTED="ECONNABORTED";ie.ETIMEDOUT="ETIMEDOUT";ie.ERR_NETWORK="ERR_NETWORK";ie.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";ie.ERR_DEPRECATED="ERR_DEPRECATED";ie.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";ie.ERR_BAD_REQUEST="ERR_BAD_REQUEST";ie.ERR_CANCELED="ERR_CANCELED";ie.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";ie.ERR_INVALID_URL="ERR_INVALID_URL";const ah=null;function Cl(s){return _.isPlainObject(s)||_.isArray(s)}function nd(s){return _.endsWith(s,"[]")?s.slice(0,-2):s}function kl(s,a,c){return s?s.concat(a).map(function(p,f){return p=nd(p),!c&&f?"["+p+"]":p}).join(c?".":""):a}function ch(s){return _.isArray(s)&&!s.some(Cl)}const uh=_.toFlatObject(_,{},null,function(a){return/^is[A-Z]/.test(a)});function Cs(s,a,c){if(!_.isObject(s))throw new TypeError("target must be an object");a=a||new FormData,c=_.toFlatObject(c,{metaTokens:!0,dots:!1,indexes:!1},!1,function(k,w){return!_.isUndefined(w[k])});const d=c.metaTokens,p=c.visitor||N,f=c.dots,h=c.indexes,C=(c.Blob||typeof Blob<"u"&&Blob)&&_.isSpecCompliantForm(a);if(!_.isFunction(p))throw new TypeError("visitor must be a function");function b(S){if(S===null)return"";if(_.isDate(S))return S.toISOString();if(_.isBoolean(S))return S.toString();if(!C&&_.isBlob(S))throw new ie("Blob is not supported. Use a Buffer instead.");return _.isArrayBuffer(S)||_.isTypedArray(S)?C&&typeof Blob=="function"?new Blob([S]):Buffer.from(S):S}function N(S,k,w){let B=S;if(_.isReactNative(a)&&_.isReactNativeBlob(S))return a.append(kl(w,k,f),b(S)),!1;if(S&&!w&&typeof S=="object"){if(_.endsWith(k,"{}"))k=d?k:k.slice(0,-2),S=JSON.stringify(S);else if(_.isArray(S)&&ch(S)||(_.isFileList(S)||_.endsWith(k,"[]"))&&(B=_.toArray(S)))return k=nd(k),B.forEach(function(te,ne){!(_.isUndefined(te)||te===null)&&a.append(h===!0?kl([k],ne,f):h===null?k:k+"[]",b(te))}),!1}return Cl(S)?!0:(a.append(kl(w,k,f),b(S)),!1)}const T=[],O=Object.assign(uh,{defaultVisitor:N,convertValue:b,isVisitable:Cl});function L(S,k){if(!_.isUndefined(S)){if(T.indexOf(S)!==-1)throw Error("Circular reference detected in "+k.join("."));T.push(S),_.forEach(S,function(B,H){(!(_.isUndefined(B)||B===null)&&p.call(a,B,_.isString(H)?H.trim():H,k,O))===!0&&L(B,k?k.concat(H):[H])}),T.pop()}}if(!_.isObject(s))throw new TypeError("data must be an object");return L(s),a}function Au(s){const a={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(s).replace(/[!'()~]|%20|%00/g,function(d){return a[d]})}function zl(s,a){this._pairs=[],s&&Cs(s,this,a)}const rd=zl.prototype;rd.append=function(a,c){this._pairs.push([a,c])};rd.toString=function(a){const c=a?function(d){return a.call(this,d,Au)}:Au;return this._pairs.map(function(p){return c(p[0])+"="+c(p[1])},"").join("&")};function dh(s){return encodeURIComponent(s).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function id(s,a,c){if(!a)return s;const d=c&&c.encode||dh,p=_.isFunction(c)?{serialize:c}:c,f=p&&p.serialize;let h;if(f?h=f(a,p):h=_.isURLSearchParams(a)?a.toString():new zl(a,p).toString(d),h){const y=s.indexOf("#");y!==-1&&(s=s.slice(0,y)),s+=(s.indexOf("?")===-1?"?":"&")+h}return s}class zu{constructor(){this.handlers=[]}use(a,c,d){return this.handlers.push({fulfilled:a,rejected:c,synchronous:d?d.synchronous:!1,runWhen:d?d.runWhen:null}),this.handlers.length-1}eject(a){this.handlers[a]&&(this.handlers[a]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(a){_.forEach(this.handlers,function(d){d!==null&&a(d)})}}const Ll={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},ph=typeof URLSearchParams<"u"?URLSearchParams:zl,fh=typeof FormData<"u"?FormData:null,hh=typeof Blob<"u"?Blob:null,mh={isBrowser:!0,classes:{URLSearchParams:ph,FormData:fh,Blob:hh},protocols:["http","https","file","blob","url","data"]},Il=typeof window<"u"&&typeof document<"u",Rl=typeof navigator=="object"&&navigator||void 0,xh=Il&&(!Rl||["ReactNative","NativeScript","NS"].indexOf(Rl.product)<0),gh=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",yh=Il&&window.location.href||"http://localhost",vh=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Il,hasStandardBrowserEnv:xh,hasStandardBrowserWebWorkerEnv:gh,navigator:Rl,origin:yh},Symbol.toStringTag,{value:"Module"})),it={...vh,...mh};function bh(s,a){return Cs(s,new it.classes.URLSearchParams,{visitor:function(c,d,p,f){return it.isNode&&_.isBuffer(c)?(this.append(d,c.toString("base64")),!1):f.defaultVisitor.apply(this,arguments)},...a})}function wh(s){return _.matchAll(/\w+|\[(\w*)]/g,s).map(a=>a[0]==="[]"?"":a[1]||a[0])}function kh(s){const a={},c=Object.keys(s);let d;const p=c.length;let f;for(d=0;d<p;d++)f=c[d],a[f]=s[f];return a}function sd(s){function a(c,d,p,f){let h=c[f++];if(h==="__proto__")return!0;const y=Number.isFinite(+h),C=f>=c.length;return h=!h&&_.isArray(p)?p.length:h,C?(_.hasOwnProp(p,h)?p[h]=[p[h],d]:p[h]=d,!y):((!p[h]||!_.isObject(p[h]))&&(p[h]=[]),a(c,d,p[h],f)&&_.isArray(p[h])&&(p[h]=kh(p[h])),!y)}if(_.isFormData(s)&&_.isFunction(s.entries)){const c={};return _.forEachEntry(s,(d,p)=>{a(wh(d),p,c,0)}),c}return null}function jh(s,a,c){if(_.isString(s))try{return(a||JSON.parse)(s),_.trim(s)}catch(d){if(d.name!=="SyntaxError")throw d}return(c||JSON.stringify)(s)}const ai={transitional:Ll,adapter:["xhr","http","fetch"],transformRequest:[function(a,c){const d=c.getContentType()||"",p=d.indexOf("application/json")>-1,f=_.isObject(a);if(f&&_.isHTMLForm(a)&&(a=new FormData(a)),_.isFormData(a))return p?JSON.stringify(sd(a)):a;if(_.isArrayBuffer(a)||_.isBuffer(a)||_.isStream(a)||_.isFile(a)||_.isBlob(a)||_.isReadableStream(a))return a;if(_.isArrayBufferView(a))return a.buffer;if(_.isURLSearchParams(a))return c.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),a.toString();let y;if(f){if(d.indexOf("application/x-www-form-urlencoded")>-1)return bh(a,this.formSerializer).toString();if((y=_.isFileList(a))||d.indexOf("multipart/form-data")>-1){const C=this.env&&this.env.FormData;return Cs(y?{"files[]":a}:a,C&&new C,this.formSerializer)}}return f||p?(c.setContentType("application/json",!1),jh(a)):a}],transformResponse:[function(a){const c=this.transitional||ai.transitional,d=c&&c.forcedJSONParsing,p=this.responseType==="json";if(_.isResponse(a)||_.isReadableStream(a))return a;if(a&&_.isString(a)&&(d&&!this.responseType||p)){const h=!(c&&c.silentJSONParsing)&&p;try{return JSON.parse(a,this.parseReviver)}catch(y){if(h)throw y.name==="SyntaxError"?ie.from(y,ie.ERR_BAD_RESPONSE,this,null,this.response):y}}return a}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:it.classes.FormData,Blob:it.classes.Blob},validateStatus:function(a){return a>=200&&a<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};_.forEach(["delete","get","head","post","put","patch"],s=>{ai.headers[s]={}});const Nh=_.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Sh=s=>{const a={};let c,d,p;return s&&s.split(`
`).forEach(function(h){p=h.indexOf(":"),c=h.substring(0,p).trim().toLowerCase(),d=h.substring(p+1).trim(),!(!c||a[c]&&Nh[c])&&(c==="set-cookie"?a[c]?a[c].push(d):a[c]=[d]:a[c]=a[c]?a[c]+", "+d:d)}),a},Lu=Symbol("internals");function ii(s){return s&&String(s).trim().toLowerCase()}function ws(s){return s===!1||s==null?s:_.isArray(s)?s.map(ws):String(s).replace(/[\r\n]+$/,"")}function Eh(s){const a=Object.create(null),c=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let d;for(;d=c.exec(s);)a[d[1]]=d[2];return a}const Ch=s=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(s.trim());function jl(s,a,c,d,p){if(_.isFunction(d))return d.call(this,a,c);if(p&&(a=c),!!_.isString(a)){if(_.isString(d))return a.indexOf(d)!==-1;if(_.isRegExp(d))return d.test(a)}}function Rh(s){return s.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(a,c,d)=>c.toUpperCase()+d)}function _h(s,a){const c=_.toCamelCase(" "+a);["get","set","has"].forEach(d=>{Object.defineProperty(s,d+c,{value:function(p,f,h){return this[d].call(this,a,p,f,h)},configurable:!0})})}let gt=class{constructor(a){a&&this.set(a)}set(a,c,d){const p=this;function f(y,C,b){const N=ii(C);if(!N)throw new Error("header name must be a non-empty string");const T=_.findKey(p,N);(!T||p[T]===void 0||b===!0||b===void 0&&p[T]!==!1)&&(p[T||C]=ws(y))}const h=(y,C)=>_.forEach(y,(b,N)=>f(b,N,C));if(_.isPlainObject(a)||a instanceof this.constructor)h(a,c);else if(_.isString(a)&&(a=a.trim())&&!Ch(a))h(Sh(a),c);else if(_.isObject(a)&&_.isIterable(a)){let y={},C,b;for(const N of a){if(!_.isArray(N))throw TypeError("Object iterator must return a key-value pair");y[b=N[0]]=(C=y[b])?_.isArray(C)?[...C,N[1]]:[C,N[1]]:N[1]}h(y,c)}else a!=null&&f(c,a,d);return this}get(a,c){if(a=ii(a),a){const d=_.findKey(this,a);if(d){const p=this[d];if(!c)return p;if(c===!0)return Eh(p);if(_.isFunction(c))return c.call(this,p,d);if(_.isRegExp(c))return c.exec(p);throw new TypeError("parser must be boolean|regexp|function")}}}has(a,c){if(a=ii(a),a){const d=_.findKey(this,a);return!!(d&&this[d]!==void 0&&(!c||jl(this,this[d],d,c)))}return!1}delete(a,c){const d=this;let p=!1;function f(h){if(h=ii(h),h){const y=_.findKey(d,h);y&&(!c||jl(d,d[y],y,c))&&(delete d[y],p=!0)}}return _.isArray(a)?a.forEach(f):f(a),p}clear(a){const c=Object.keys(this);let d=c.length,p=!1;for(;d--;){const f=c[d];(!a||jl(this,this[f],f,a,!0))&&(delete this[f],p=!0)}return p}normalize(a){const c=this,d={};return _.forEach(this,(p,f)=>{const h=_.findKey(d,f);if(h){c[h]=ws(p),delete c[f];return}const y=a?Rh(f):String(f).trim();y!==f&&delete c[f],c[y]=ws(p),d[y]=!0}),this}concat(...a){return this.constructor.concat(this,...a)}toJSON(a){const c=Object.create(null);return _.forEach(this,(d,p)=>{d!=null&&d!==!1&&(c[p]=a&&_.isArray(d)?d.join(", "):d)}),c}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([a,c])=>a+": "+c).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(a){return a instanceof this?a:new this(a)}static concat(a,...c){const d=new this(a);return c.forEach(p=>d.set(p)),d}static accessor(a){const d=(this[Lu]=this[Lu]={accessors:{}}).accessors,p=this.prototype;function f(h){const y=ii(h);d[y]||(_h(p,h),d[y]=!0)}return _.isArray(a)?a.forEach(f):f(a),this}};gt.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);_.reduceDescriptors(gt.prototype,({value:s},a)=>{let c=a[0].toUpperCase()+a.slice(1);return{get:()=>s,set(d){this[c]=d}}});_.freezeMethods(gt);function Nl(s,a){const c=this||ai,d=a||c,p=gt.from(d.headers);let f=d.data;return _.forEach(s,function(y){f=y.call(c,f,p.normalize(),a?a.status:void 0)}),p.normalize(),f}function od(s){return!!(s&&s.__CANCEL__)}let ci=class extends ie{constructor(a,c,d){super(a??"canceled",ie.ERR_CANCELED,c,d),this.name="CanceledError",this.__CANCEL__=!0}};function ld(s,a,c){const d=c.config.validateStatus;!c.status||!d||d(c.status)?s(c):a(new ie("Request failed with status code "+c.status,[ie.ERR_BAD_REQUEST,ie.ERR_BAD_RESPONSE][Math.floor(c.status/100)-4],c.config,c.request,c))}function Th(s){const a=/^([-+\w]{1,25})(:?\/\/|:)/.exec(s);return a&&a[1]||""}function Ah(s,a){s=s||10;const c=new Array(s),d=new Array(s);let p=0,f=0,h;return a=a!==void 0?a:1e3,function(C){const b=Date.now(),N=d[f];h||(h=b),c[p]=C,d[p]=b;let T=f,O=0;for(;T!==p;)O+=c[T++],T=T%s;if(p=(p+1)%s,p===f&&(f=(f+1)%s),b-h<a)return;const L=N&&b-N;return L?Math.round(O*1e3/L):void 0}}function zh(s,a){let c=0,d=1e3/a,p,f;const h=(b,N=Date.now())=>{c=N,p=null,f&&(clearTimeout(f),f=null),s(...b)};return[(...b)=>{const N=Date.now(),T=N-c;T>=d?h(b,N):(p=b,f||(f=setTimeout(()=>{f=null,h(p)},d-T)))},()=>p&&h(p)]}const js=(s,a,c=3)=>{let d=0;const p=Ah(50,250);return zh(f=>{const h=f.loaded,y=f.lengthComputable?f.total:void 0,C=h-d,b=p(C),N=h<=y;d=h;const T={loaded:h,total:y,progress:y?h/y:void 0,bytes:C,rate:b||void 0,estimated:b&&y&&N?(y-h)/b:void 0,event:f,lengthComputable:y!=null,[a?"download":"upload"]:!0};s(T)},c)},Iu=(s,a)=>{const c=s!=null;return[d=>a[0]({lengthComputable:c,total:s,loaded:d}),a[1]]},Ou=s=>(...a)=>_.asap(()=>s(...a)),Lh=it.hasStandardBrowserEnv?((s,a)=>c=>(c=new URL(c,it.origin),s.protocol===c.protocol&&s.host===c.host&&(a||s.port===c.port)))(new URL(it.origin),it.navigator&&/(msie|trident)/i.test(it.navigator.userAgent)):()=>!0,Ih=it.hasStandardBrowserEnv?{write(s,a,c,d,p,f,h){if(typeof document>"u")return;const y=[`${s}=${encodeURIComponent(a)}`];_.isNumber(c)&&y.push(`expires=${new Date(c).toUTCString()}`),_.isString(d)&&y.push(`path=${d}`),_.isString(p)&&y.push(`domain=${p}`),f===!0&&y.push("secure"),_.isString(h)&&y.push(`SameSite=${h}`),document.cookie=y.join("; ")},read(s){if(typeof document>"u")return null;const a=document.cookie.match(new RegExp("(?:^|; )"+s+"=([^;]*)"));return a?decodeURIComponent(a[1]):null},remove(s){this.write(s,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Oh(s){return typeof s!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(s)}function Ph(s,a){return a?s.replace(/\/?\/$/,"")+"/"+a.replace(/^\/+/,""):s}function ad(s,a,c){let d=!Oh(a);return s&&(d||c==!1)?Ph(s,a):a}const Pu=s=>s instanceof gt?{...s}:s;function Wn(s,a){a=a||{};const c={};function d(b,N,T,O){return _.isPlainObject(b)&&_.isPlainObject(N)?_.merge.call({caseless:O},b,N):_.isPlainObject(N)?_.merge({},N):_.isArray(N)?N.slice():N}function p(b,N,T,O){if(_.isUndefined(N)){if(!_.isUndefined(b))return d(void 0,b,T,O)}else return d(b,N,T,O)}function f(b,N){if(!_.isUndefined(N))return d(void 0,N)}function h(b,N){if(_.isUndefined(N)){if(!_.isUndefined(b))return d(void 0,b)}else return d(void 0,N)}function y(b,N,T){if(T in a)return d(b,N);if(T in s)return d(void 0,b)}const C={url:f,method:f,data:f,baseURL:h,transformRequest:h,transformResponse:h,paramsSerializer:h,timeout:h,timeoutMessage:h,withCredentials:h,withXSRFToken:h,adapter:h,responseType:h,xsrfCookieName:h,xsrfHeaderName:h,onUploadProgress:h,onDownloadProgress:h,decompress:h,maxContentLength:h,maxBodyLength:h,beforeRedirect:h,transport:h,httpAgent:h,httpsAgent:h,cancelToken:h,socketPath:h,responseEncoding:h,validateStatus:y,headers:(b,N,T)=>p(Pu(b),Pu(N),T,!0)};return _.forEach(Object.keys({...s,...a}),function(N){if(N==="__proto__"||N==="constructor"||N==="prototype")return;const T=_.hasOwnProp(C,N)?C[N]:p,O=T(s[N],a[N],N);_.isUndefined(O)&&T!==y||(c[N]=O)}),c}const cd=s=>{const a=Wn({},s);let{data:c,withXSRFToken:d,xsrfHeaderName:p,xsrfCookieName:f,headers:h,auth:y}=a;if(a.headers=h=gt.from(h),a.url=id(ad(a.baseURL,a.url,a.allowAbsoluteUrls),s.params,s.paramsSerializer),y&&h.set("Authorization","Basic "+btoa((y.username||"")+":"+(y.password?unescape(encodeURIComponent(y.password)):""))),_.isFormData(c)){if(it.hasStandardBrowserEnv||it.hasStandardBrowserWebWorkerEnv)h.setContentType(void 0);else if(_.isFunction(c.getHeaders)){const C=c.getHeaders(),b=["content-type","content-length"];Object.entries(C).forEach(([N,T])=>{b.includes(N.toLowerCase())&&h.set(N,T)})}}if(it.hasStandardBrowserEnv&&(d&&_.isFunction(d)&&(d=d(a)),d||d!==!1&&Lh(a.url))){const C=p&&f&&Ih.read(f);C&&h.set(p,C)}return a},Dh=typeof XMLHttpRequest<"u",Mh=Dh&&function(s){return new Promise(function(c,d){const p=cd(s);let f=p.data;const h=gt.from(p.headers).normalize();let{responseType:y,onUploadProgress:C,onDownloadProgress:b}=p,N,T,O,L,S;function k(){L&&L(),S&&S(),p.cancelToken&&p.cancelToken.unsubscribe(N),p.signal&&p.signal.removeEventListener("abort",N)}let w=new XMLHttpRequest;w.open(p.method.toUpperCase(),p.url,!0),w.timeout=p.timeout;function B(){if(!w)return;const te=gt.from("getAllResponseHeaders"in w&&w.getAllResponseHeaders()),xe={data:!y||y==="text"||y==="json"?w.responseText:w.response,status:w.status,statusText:w.statusText,headers:te,config:s,request:w};ld(function(ge){c(ge),k()},function(ge){d(ge),k()},xe),w=null}"onloadend"in w?w.onloadend=B:w.onreadystatechange=function(){!w||w.readyState!==4||w.status===0&&!(w.responseURL&&w.responseURL.indexOf("file:")===0)||setTimeout(B)},w.onabort=function(){w&&(d(new ie("Request aborted",ie.ECONNABORTED,s,w)),w=null)},w.onerror=function(ne){const xe=ne&&ne.message?ne.message:"Network Error",Ne=new ie(xe,ie.ERR_NETWORK,s,w);Ne.event=ne||null,d(Ne),w=null},w.ontimeout=function(){let ne=p.timeout?"timeout of "+p.timeout+"ms exceeded":"timeout exceeded";const xe=p.transitional||Ll;p.timeoutErrorMessage&&(ne=p.timeoutErrorMessage),d(new ie(ne,xe.clarifyTimeoutError?ie.ETIMEDOUT:ie.ECONNABORTED,s,w)),w=null},f===void 0&&h.setContentType(null),"setRequestHeader"in w&&_.forEach(h.toJSON(),function(ne,xe){w.setRequestHeader(xe,ne)}),_.isUndefined(p.withCredentials)||(w.withCredentials=!!p.withCredentials),y&&y!=="json"&&(w.responseType=p.responseType),b&&([O,S]=js(b,!0),w.addEventListener("progress",O)),C&&w.upload&&([T,L]=js(C),w.upload.addEventListener("progress",T),w.upload.addEventListener("loadend",L)),(p.cancelToken||p.signal)&&(N=te=>{w&&(d(!te||te.type?new ci(null,s,w):te),w.abort(),w=null)},p.cancelToken&&p.cancelToken.subscribe(N),p.signal&&(p.signal.aborted?N():p.signal.addEventListener("abort",N)));const H=Th(p.url);if(H&&it.protocols.indexOf(H)===-1){d(new ie("Unsupported protocol "+H+":",ie.ERR_BAD_REQUEST,s));return}w.send(f||null)})},Uh=(s,a)=>{const{length:c}=s=s?s.filter(Boolean):[];if(a||c){let d=new AbortController,p;const f=function(b){if(!p){p=!0,y();const N=b instanceof Error?b:this.reason;d.abort(N instanceof ie?N:new ci(N instanceof Error?N.message:N))}};let h=a&&setTimeout(()=>{h=null,f(new ie(`timeout of ${a}ms exceeded`,ie.ETIMEDOUT))},a);const y=()=>{s&&(h&&clearTimeout(h),h=null,s.forEach(b=>{b.unsubscribe?b.unsubscribe(f):b.removeEventListener("abort",f)}),s=null)};s.forEach(b=>b.addEventListener("abort",f));const{signal:C}=d;return C.unsubscribe=()=>_.asap(y),C}},Fh=function*(s,a){let c=s.byteLength;if(c<a){yield s;return}let d=0,p;for(;d<c;)p=d+a,yield s.slice(d,p),d=p},Bh=async function*(s,a){for await(const c of $h(s))yield*Fh(c,a)},$h=async function*(s){if(s[Symbol.asyncIterator]){yield*s;return}const a=s.getReader();try{for(;;){const{done:c,value:d}=await a.read();if(c)break;yield d}}finally{await a.cancel()}},Du=(s,a,c,d)=>{const p=Bh(s,a);let f=0,h,y=C=>{h||(h=!0,d&&d(C))};return new ReadableStream({async pull(C){try{const{done:b,value:N}=await p.next();if(b){y(),C.close();return}let T=N.byteLength;if(c){let O=f+=T;c(O)}C.enqueue(new Uint8Array(N))}catch(b){throw y(b),b}},cancel(C){return y(C),p.return()}},{highWaterMark:2})},Mu=64*1024,{isFunction:ys}=_,Wh=(({Request:s,Response:a})=>({Request:s,Response:a}))(_.global),{ReadableStream:Uu,TextEncoder:Fu}=_.global,Bu=(s,...a)=>{try{return!!s(...a)}catch{return!1}},Vh=s=>{s=_.merge.call({skipUndefined:!0},Wh,s);const{fetch:a,Request:c,Response:d}=s,p=a?ys(a):typeof fetch=="function",f=ys(c),h=ys(d);if(!p)return!1;const y=p&&ys(Uu),C=p&&(typeof Fu=="function"?(S=>k=>S.encode(k))(new Fu):async S=>new Uint8Array(await new c(S).arrayBuffer())),b=f&&y&&Bu(()=>{let S=!1;const k=new Uu,w=new c(it.origin,{body:k,method:"POST",get duplex(){return S=!0,"half"}}).headers.has("Content-Type");return k.cancel(),S&&!w}),N=h&&y&&Bu(()=>_.isReadableStream(new d("").body)),T={stream:N&&(S=>S.body)};p&&["text","arrayBuffer","blob","formData","stream"].forEach(S=>{!T[S]&&(T[S]=(k,w)=>{let B=k&&k[S];if(B)return B.call(k);throw new ie(`Response type '${S}' is not supported`,ie.ERR_NOT_SUPPORT,w)})});const O=async S=>{if(S==null)return 0;if(_.isBlob(S))return S.size;if(_.isSpecCompliantForm(S))return(await new c(it.origin,{method:"POST",body:S}).arrayBuffer()).byteLength;if(_.isArrayBufferView(S)||_.isArrayBuffer(S))return S.byteLength;if(_.isURLSearchParams(S)&&(S=S+""),_.isString(S))return(await C(S)).byteLength},L=async(S,k)=>{const w=_.toFiniteNumber(S.getContentLength());return w??O(k)};return async S=>{let{url:k,method:w,data:B,signal:H,cancelToken:te,timeout:ne,onDownloadProgress:xe,onUploadProgress:Ne,responseType:ge,headers:Fe,withCredentials:Be="same-origin",fetchOptions:Je}=cd(S),st=a||fetch;ge=ge?(ge+"").toLowerCase():"text";let $e=Uh([H,te&&te.toAbortSignal()],ne),Se=null;const Ee=$e&&$e.unsubscribe&&(()=>{$e.unsubscribe()});let Me;try{if(Ne&&b&&w!=="get"&&w!=="head"&&(Me=await L(Fe,B))!==0){let v=new c(k,{method:"POST",body:B,duplex:"half"}),A;if(_.isFormData(B)&&(A=v.headers.get("content-type"))&&Fe.setContentType(A),v.body){const[se,re]=Iu(Me,js(Ou(Ne)));B=Du(v.body,Mu,se,re)}}_.isString(Be)||(Be=Be?"include":"omit");const he=f&&"credentials"in c.prototype,ve={...Je,signal:$e,method:w.toUpperCase(),headers:Fe.normalize().toJSON(),body:B,duplex:"half",credentials:he?Be:void 0};Se=f&&new c(k,ve);let D=await(f?st(Se,Je):st(k,ve));const q=N&&(ge==="stream"||ge==="response");if(N&&(xe||q&&Ee)){const v={};["status","statusText","headers"].forEach(le=>{v[le]=D[le]});const A=_.toFiniteNumber(D.headers.get("content-length")),[se,re]=xe&&Iu(A,js(Ou(xe),!0))||[];D=new d(Du(D.body,Mu,se,()=>{re&&re(),Ee&&Ee()}),v)}ge=ge||"text";let $=await T[_.findKey(T,ge)||"text"](D,S);return!q&&Ee&&Ee(),await new Promise((v,A)=>{ld(v,A,{data:$,headers:gt.from(D.headers),status:D.status,statusText:D.statusText,config:S,request:Se})})}catch(he){throw Ee&&Ee(),he&&he.name==="TypeError"&&/Load failed|fetch/i.test(he.message)?Object.assign(new ie("Network Error",ie.ERR_NETWORK,S,Se,he&&he.response),{cause:he.cause||he}):ie.from(he,he&&he.code,S,Se,he&&he.response)}}},Hh=new Map,ud=s=>{let a=s&&s.env||{};const{fetch:c,Request:d,Response:p}=a,f=[d,p,c];let h=f.length,y=h,C,b,N=Hh;for(;y--;)C=f[y],b=N.get(C),b===void 0&&N.set(C,b=y?new Map:Vh(a)),N=b;return b};ud();const Ol={http:ah,xhr:Mh,fetch:{get:ud}};_.forEach(Ol,(s,a)=>{if(s){try{Object.defineProperty(s,"name",{value:a})}catch{}Object.defineProperty(s,"adapterName",{value:a})}});const $u=s=>`- ${s}`,Kh=s=>_.isFunction(s)||s===null||s===!1;function Yh(s,a){s=_.isArray(s)?s:[s];const{length:c}=s;let d,p;const f={};for(let h=0;h<c;h++){d=s[h];let y;if(p=d,!Kh(d)&&(p=Ol[(y=String(d)).toLowerCase()],p===void 0))throw new ie(`Unknown adapter '${y}'`);if(p&&(_.isFunction(p)||(p=p.get(a))))break;f[y||"#"+h]=p}if(!p){const h=Object.entries(f).map(([C,b])=>`adapter ${C} `+(b===!1?"is not supported by the environment":"is not available in the build"));let y=c?h.length>1?`since :
`+h.map($u).join(`
`):" "+$u(h[0]):"as no adapter specified";throw new ie("There is no suitable adapter to dispatch the request "+y,"ERR_NOT_SUPPORT")}return p}const dd={getAdapter:Yh,adapters:Ol};function Sl(s){if(s.cancelToken&&s.cancelToken.throwIfRequested(),s.signal&&s.signal.aborted)throw new ci(null,s)}function Wu(s){return Sl(s),s.headers=gt.from(s.headers),s.data=Nl.call(s,s.transformRequest),["post","put","patch"].indexOf(s.method)!==-1&&s.headers.setContentType("application/x-www-form-urlencoded",!1),dd.getAdapter(s.adapter||ai.adapter,s)(s).then(function(d){return Sl(s),d.data=Nl.call(s,s.transformResponse,d),d.headers=gt.from(d.headers),d},function(d){return od(d)||(Sl(s),d&&d.response&&(d.response.data=Nl.call(s,s.transformResponse,d.response),d.response.headers=gt.from(d.response.headers))),Promise.reject(d)})}const pd="1.14.0",Rs={};["object","boolean","number","function","string","symbol"].forEach((s,a)=>{Rs[s]=function(d){return typeof d===s||"a"+(a<1?"n ":" ")+s}});const Vu={};Rs.transitional=function(a,c,d){function p(f,h){return"[Axios v"+pd+"] Transitional option '"+f+"'"+h+(d?". "+d:"")}return(f,h,y)=>{if(a===!1)throw new ie(p(h," has been removed"+(c?" in "+c:"")),ie.ERR_DEPRECATED);return c&&!Vu[h]&&(Vu[h]=!0,console.warn(p(h," has been deprecated since v"+c+" and will be removed in the near future"))),a?a(f,h,y):!0}};Rs.spelling=function(a){return(c,d)=>(console.warn(`${d} is likely a misspelling of ${a}`),!0)};function Gh(s,a,c){if(typeof s!="object")throw new ie("options must be an object",ie.ERR_BAD_OPTION_VALUE);const d=Object.keys(s);let p=d.length;for(;p-- >0;){const f=d[p],h=a[f];if(h){const y=s[f],C=y===void 0||h(y,f,s);if(C!==!0)throw new ie("option "+f+" must be "+C,ie.ERR_BAD_OPTION_VALUE);continue}if(c!==!0)throw new ie("Unknown option "+f,ie.ERR_BAD_OPTION)}}const ks={assertOptions:Gh,validators:Rs},Rt=ks.validators;let $n=class{constructor(a){this.defaults=a||{},this.interceptors={request:new zu,response:new zu}}async request(a,c){try{return await this._request(a,c)}catch(d){if(d instanceof Error){let p={};Error.captureStackTrace?Error.captureStackTrace(p):p=new Error;const f=p.stack?p.stack.replace(/^.+\n/,""):"";try{d.stack?f&&!String(d.stack).endsWith(f.replace(/^.+\n.+\n/,""))&&(d.stack+=`
`+f):d.stack=f}catch{}}throw d}}_request(a,c){typeof a=="string"?(c=c||{},c.url=a):c=a||{},c=Wn(this.defaults,c);const{transitional:d,paramsSerializer:p,headers:f}=c;d!==void 0&&ks.assertOptions(d,{silentJSONParsing:Rt.transitional(Rt.boolean),forcedJSONParsing:Rt.transitional(Rt.boolean),clarifyTimeoutError:Rt.transitional(Rt.boolean),legacyInterceptorReqResOrdering:Rt.transitional(Rt.boolean)},!1),p!=null&&(_.isFunction(p)?c.paramsSerializer={serialize:p}:ks.assertOptions(p,{encode:Rt.function,serialize:Rt.function},!0)),c.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?c.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:c.allowAbsoluteUrls=!0),ks.assertOptions(c,{baseUrl:Rt.spelling("baseURL"),withXsrfToken:Rt.spelling("withXSRFToken")},!0),c.method=(c.method||this.defaults.method||"get").toLowerCase();let h=f&&_.merge(f.common,f[c.method]);f&&_.forEach(["delete","get","head","post","put","patch","common"],S=>{delete f[S]}),c.headers=gt.concat(h,f);const y=[];let C=!0;this.interceptors.request.forEach(function(k){if(typeof k.runWhen=="function"&&k.runWhen(c)===!1)return;C=C&&k.synchronous;const w=c.transitional||Ll;w&&w.legacyInterceptorReqResOrdering?y.unshift(k.fulfilled,k.rejected):y.push(k.fulfilled,k.rejected)});const b=[];this.interceptors.response.forEach(function(k){b.push(k.fulfilled,k.rejected)});let N,T=0,O;if(!C){const S=[Wu.bind(this),void 0];for(S.unshift(...y),S.push(...b),O=S.length,N=Promise.resolve(c);T<O;)N=N.then(S[T++],S[T++]);return N}O=y.length;let L=c;for(;T<O;){const S=y[T++],k=y[T++];try{L=S(L)}catch(w){k.call(this,w);break}}try{N=Wu.call(this,L)}catch(S){return Promise.reject(S)}for(T=0,O=b.length;T<O;)N=N.then(b[T++],b[T++]);return N}getUri(a){a=Wn(this.defaults,a);const c=ad(a.baseURL,a.url,a.allowAbsoluteUrls);return id(c,a.params,a.paramsSerializer)}};_.forEach(["delete","get","head","options"],function(a){$n.prototype[a]=function(c,d){return this.request(Wn(d||{},{method:a,url:c,data:(d||{}).data}))}});_.forEach(["post","put","patch"],function(a){function c(d){return function(f,h,y){return this.request(Wn(y||{},{method:a,headers:d?{"Content-Type":"multipart/form-data"}:{},url:f,data:h}))}}$n.prototype[a]=c(),$n.prototype[a+"Form"]=c(!0)});let qh=class fd{constructor(a){if(typeof a!="function")throw new TypeError("executor must be a function.");let c;this.promise=new Promise(function(f){c=f});const d=this;this.promise.then(p=>{if(!d._listeners)return;let f=d._listeners.length;for(;f-- >0;)d._listeners[f](p);d._listeners=null}),this.promise.then=p=>{let f;const h=new Promise(y=>{d.subscribe(y),f=y}).then(p);return h.cancel=function(){d.unsubscribe(f)},h},a(function(f,h,y){d.reason||(d.reason=new ci(f,h,y),c(d.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(a){if(this.reason){a(this.reason);return}this._listeners?this._listeners.push(a):this._listeners=[a]}unsubscribe(a){if(!this._listeners)return;const c=this._listeners.indexOf(a);c!==-1&&this._listeners.splice(c,1)}toAbortSignal(){const a=new AbortController,c=d=>{a.abort(d)};return this.subscribe(c),a.signal.unsubscribe=()=>this.unsubscribe(c),a.signal}static source(){let a;return{token:new fd(function(p){a=p}),cancel:a}}};function Qh(s){return function(c){return s.apply(null,c)}}function Xh(s){return _.isObject(s)&&s.isAxiosError===!0}const _l={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(_l).forEach(([s,a])=>{_l[a]=s});function hd(s){const a=new $n(s),c=Yu($n.prototype.request,a);return _.extend(c,$n.prototype,a,{allOwnKeys:!0}),_.extend(c,a,null,{allOwnKeys:!0}),c.create=function(p){return hd(Wn(s,p))},c}const K=hd(ai);K.Axios=$n;K.CanceledError=ci;K.CancelToken=qh;K.isCancel=od;K.VERSION=pd;K.toFormData=Cs;K.AxiosError=ie;K.Cancel=K.CanceledError;K.all=function(a){return Promise.all(a)};K.spread=Qh;K.isAxiosError=Xh;K.mergeConfig=Wn;K.AxiosHeaders=gt;K.formToJSON=s=>sd(_.isHTMLForm(s)?new FormData(s):s);K.getAdapter=dd.getAdapter;K.HttpStatusCode=_l;K.default=K;const{Axios:Cm,AxiosError:Rm,CanceledError:_m,isCancel:Tm,CancelToken:Am,VERSION:zm,all:Lm,Cancel:Im,isAxiosError:Om,spread:Pm,toFormData:Dm,AxiosHeaders:Mm,HttpStatusCode:Um,formToJSON:Fm,getAdapter:Bm,mergeConfig:$m}=K,be=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"?"http://127.0.0.1:5000":window.location.origin,Jh=()=>{const[s,a]=U.useState(""),[c,d]=U.useState(""),[p,f]=U.useState(""),[h,y]=U.useState([]),[C,b]=U.useState([]),N=localStorage.getItem("apc_user"),T=async()=>{try{const k={"x-user-identity":N},w=await K.get(`${be}/my-shares`,{headers:k});y(w.data||[]);const B=await K.get(`${be}/shared-with-me`,{headers:k});b(B.data||[])}catch{console.error("Sync failed - Backend might be unreachable.")}};U.useEffect(()=>{T()},[]);const O=async()=>{var k,w;try{const B=await K.post(`${be}/grant`,{fileId:c.replace("#","").trim(),targetUser:s.trim(),owner:N});f(`SUCCESS: TX ${B.data.tx}`),d(""),a(""),T()}catch(B){f(`ERROR: ${((w=(k=B.response)==null?void 0:k.data)==null?void 0:w.message)||"Failed"}`)}},L=async k=>{try{const w=await K.post(`${be}/view-decrypted`,{fileId:k.id,username:N},{responseType:"blob"}),B=window.URL.createObjectURL(new Blob([w.data])),H=document.createElement("a");H.href=B,H.setAttribute("download",k.filename),document.body.appendChild(H),H.click(),H.remove(),window.URL.revokeObjectURL(B)}catch{alert("Access Denied: Protocol rejected the decryption key.")}},S=async(k,w)=>{try{await K.post(`${be}/revoke`,{fileId:k,targetUser:w,owner:N}),T()}catch{alert("Revoke command failed.")}};return i.jsxs("div",{className:"module-inner-content",children:[i.jsxs("div",{className:"perm-grid",children:[i.jsxs("div",{className:"perm-box",children:[i.jsx("label",{children:"AUTHORIZE NEW ACCESS"}),i.jsxs("div",{className:"input-group",children:[i.jsx("small",{className:"input-hint",children:"Recipient Unique ID"}),i.jsx("input",{type:"text",placeholder:"e.g. CHANDAN_01",className:"file-input-custom",value:s,onChange:k=>a(k.target.value)})]}),i.jsxs("div",{className:"input-group",style:{marginTop:"15px"},children:[i.jsx("small",{className:"input-hint",children:"File Reference ID"}),i.jsx("input",{type:"text",placeholder:"e.g. 8f2a",className:"file-input-custom",value:c,onChange:k=>d(k.target.value)})]}),i.jsx("button",{onClick:O,className:"cyber-action-btn",children:"Grant Access by ID"}),p&&i.jsx("p",{className:"status-msg",children:p})]}),i.jsxs("div",{className:"perm-box",style:{display:"flex",flexDirection:"column"},children:[i.jsx("label",{children:"OUTBOUND_ACCESS (MY SHARED FILES)"}),i.jsx("div",{className:"shares-list scrollable",style:{flex:1},children:h.length>0?h.map((k,w)=>i.jsxs("div",{className:"share-item",children:[i.jsxs("span",{className:"user-tag",children:[i.jsx("span",{style:{color:"#2563eb"},children:"@"}),k.targetUser,i.jsx("br",{}),i.jsxs("small",{style:{color:"#444"},children:["FILE: ",k.filename]})]}),i.jsx("button",{onClick:()=>S(k.fileId,k.targetUser),className:"revoke-btn",children:"REVOKE"})]},w)):i.jsx("p",{className:"empty-text",children:"NO_ACTIVE_SHARES"})})]})]}),i.jsxs("div",{className:"perm-box",style:{marginTop:"25px",flex:1,display:"flex",flexDirection:"column"},children:[i.jsx("label",{children:"INBOUND_ACCESS_NODES (SHARED WITH YOU)"}),i.jsx("div",{className:"shares-list horizontal",style:{flex:1,alignContent:"flex-start"},children:C.length>0?C.map((k,w)=>i.jsxs("div",{className:"share-item received",children:[i.jsx("div",{className:"security-tag",children:"● AES-256 SECURED"}),i.jsxs("span",{className:"file-tag",children:["📄 ",k.filename]}),i.jsxs("span",{className:"owner-tag",children:["SOURCE_ID: ",i.jsxs("span",{children:["@",k.owner]})]}),i.jsx("button",{onClick:()=>L(k),className:"dec-btn-small",children:"DECRYPT & VIEW"})]},w)):i.jsx("p",{className:"empty-text",children:"NO_FILES_SHARED_WITH_YOU"})})]}),i.jsx("style",{children:`
        .module-inner-content { flex: 1; width: 100%; height: 100%; display: flex; flex-direction: column; padding: 25px; box-sizing: border-box; }
        .perm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
        .perm-box { background: rgba(255,255,255,0.02); padding: 25px; border-radius: 20px; border: 1px solid #111; }
        .input-hint { color: #444; font-size: 9px; text-transform: uppercase; display: block; margin-bottom: 5px; font-weight: 800; }
        .file-input-custom { width: 100%; background: #000; border: 1px solid #222; padding: 12px; border-radius: 10px; color: #fff; font-size: 11px; outline: none; transition: 0.3s; }
        .file-input-custom:focus { border-color: #2563eb; }
        .cyber-action-btn { background: #2563eb; color: #fff; border: none; padding: 14px; border-radius: 10px; font-weight: 900; cursor: pointer; font-size: 10px; text-transform: uppercase; width: 100%; margin-top: 20px; }
        label { font-size: 9px; color: #2563eb; font-weight: 800; display: block; margin-bottom: 20px; letter-spacing: 1.5px; }
        
        .shares-list.scrollable { max-height: 220px; overflow-y: auto; }
        .shares-list.horizontal { display: flex; gap: 12px; flex-wrap: wrap; }
        
        .share-item { display: flex; justify-content: space-between; align-items: center; background: #000; padding: 15px; border-radius: 15px; border: 1px solid #111; margin-bottom: 10px; }
        .share-item.received { flex-direction: column; align-items: flex-start; min-width: 220px; width: auto; }
        
        .user-tag { color: #fff; font-size: 11px; font-family: monospace; }
        .security-tag { font-size: 9px; fontWeight: bold; color: #10b981; margin-bottom: 10px; letter-spacing: 1px; }
        .owner-tag { color: #3b82f6; font-size: 9px; margin: 8px 0; }
        .owner-tag span { color: #fff; }
        .file-tag { color: #fff; font-size: 11px; font-weight: bold; }
        
        .dec-btn-small { background: #10b981; color: #fff; border: none; padding: 10px; border-radius: 8px; font-size: 9px; width: 100%; cursor: pointer; margin-top: 10px; font-weight: 800; }
        .revoke-btn { background: transparent; border: 1px solid #ef4444; color: #ef4444; font-size: 8px; padding: 6px 12px; border-radius: 6px; cursor: pointer; transition: 0.3s; }
        .revoke-btn:hover { background: #ef4444; color: #fff; }
        
        .empty-text { color: #333; font-size: 10px; text-align: center; padding: 20px 0; font-family: monospace; }
        .status-msg { font-size: 10px; color: #3b82f6; margin-top: 15px; font-family: monospace; border-left: 2px solid #3b82f6; padding-left: 10px; }

        @media (max-width: 768px) {
          .module-inner-content { padding: 10px !important; }
          .perm-grid { grid-template-columns: 1fr !important; gap: 15px !important; }
          .perm-box { padding: 15px !important; }
          .share-item { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
          .share-item .revoke-btn { width: 100% !important; margin-top: 5px !important; }
          .shares-list.horizontal { flex-direction: column !important; }
          .share-item.received { width: 100% !important; box-sizing: border-box !important; }
        }
      `})]})},Zh=()=>{const[s,a]=U.useState([]),[c,d]=U.useState(!0),p=async()=>{try{const h=localStorage.getItem("apc_token"),y=await K.get(`${be}/alerts`,{headers:{"x-access-token":h}});a(y.data)}catch(h){console.error("Failed to fetch alerts",h)}finally{d(!1)}};U.useEffect(()=>{p();const h=setInterval(p,1e4);return()=>clearInterval(h)},[]);const f=async h=>{try{const y=localStorage.getItem("apc_token");await K.post(`${be}/resolve-alert/${h}`,{},{headers:{"x-access-token":y}}),p()}catch(y){console.error("Failed to resolve alert",y)}};return i.jsxs("div",{className:"module-inner-content",children:[i.jsxs("div",{className:"vault-header-control",style:{marginBottom:"20px"},children:[i.jsxs("div",{className:"header-status-block",children:[i.jsx("div",{className:"pulse-indicator"}),i.jsx("h3",{className:"module-title",children:"REAL_TIME_ALERT_CENTER"})]}),i.jsxs("span",{className:"event-count",children:[s.length," ALERT_DATA_STREAM"]})]}),i.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"},children:[i.jsxs("div",{className:"v-table-head alert-grid",children:[i.jsx("span",{className:"col-label",children:"SEVERITY"}),i.jsx("span",{className:"col-label",children:"TIMESTAMP"}),i.jsx("span",{className:"col-label",children:"EVENT_MESSAGE"}),i.jsx("span",{className:"col-label",children:"NODE_ID"}),i.jsx("span",{className:"col-label",style:{textAlign:"right"},children:"STATUS"})]}),i.jsx("div",{className:"v-table-body",children:c?i.jsx("div",{className:"system-loader",children:"// SCANNING_NETWORK..."}):s.length===0?i.jsx("div",{className:"system-loader",children:"NO_ALERTS_IN_QUEUE"}):s.map(h=>i.jsxs("div",{className:"v-table-row alert-grid",children:[i.jsx("span",{className:`severity-tag ${h.severity.toLowerCase()}`,children:h.severity}),i.jsx("span",{className:"ts",children:h.timestamp}),i.jsx("span",{className:"msg",children:h.alert_message}),i.jsx("span",{className:"node",children:h.user}),i.jsx("span",{className:"stat",style:{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:"8px"},children:h.resolved?i.jsx("span",{style:{color:"#10b981"},children:"RESOLVED"}):i.jsxs(i.Fragment,{children:[i.jsx("span",{style:{color:"#ef4444"},children:"ACTIVE_EVENT"}),i.jsx("button",{onClick:()=>f(h.id),className:"resolve-btn",children:"✓ RESOLVE"})]})})]},h.id))})]}),i.jsx("style",{children:`
        .module-inner-content { 
          flex: 1;
          width: 100%;
          height: 100%; 
          display: flex; 
          flex-direction: column; 
          padding: 25px;
          box-sizing: border-box;
        }

        .vault-header-control { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          background: rgba(255,255,255,0.02); 
          padding: 18px 25px; 
          border-radius: 18px; 
          border: 1px solid rgba(255,255,255,0.05); 
          margin-bottom: 20px;
        }

        .header-status-block { 
          display: flex; 
          align-items: center; 
          gap: 12px;
          height: 20px;
        }

        .module-title { 
          font-size: 14px; 
          font-weight: 900; 
          color: #2563eb; 
          letter-spacing: 2px; 
          margin: 0; 
          font-family: monospace;
          line-height: 1;
        }

        .pulse-indicator { 
          width: 8px; 
          height: 8px; 
          background: #2563eb; 
          border-radius: 50%; 
          box-shadow: 0 0 10px #2563eb;
          flex-shrink: 0;
        }

        .event-count { 
          font-size: 10px; 
          color: #666; 
          font-weight: 900; 
          font-family: monospace; 
        }

        .event-count { 
          font-size: 10px; 
          color: #666; 
          font-weight: 900; 
          font-family: monospace; 
        }

        .alert-grid {
          display: grid !important;
          grid-template-columns: 120px 180px 1fr 150px 120px !important;
          align-items: center !important;
          gap: 20px;
          white-space: nowrap;
        }

        .v-table-head { 
          padding: 20px 40px; 
          background: #000; 
          border-bottom: 1px solid #111;
        }

        .col-label {
          font-size: 10px; 
          color: #2563eb; 
          font-weight: 900; 
          letter-spacing: 2px;
          font-family: monospace;
          line-height: 1;
        }

        .v-table-body { flex: 1; overflow-y: auto; padding: 15px; }
        
        .v-table-row { 
          padding: 18px 40px; 
          background: rgba(255,255,255,0.01); 
          border: 1px solid #0a0a0a; 
          margin-bottom: 8px; 
          border-radius: 12px; 
          font-family: monospace; 
          font-size: 11px;
        }

        .severity-tag { font-size: 9px; font-weight: 900; padding: 2px 8px; border-radius: 4px; border: 1px solid; width: fit-content; }
        .high { border-color: #ef4444; color: #ef4444; }
        .medium { border-color: #f59e0b; color: #f59e0b; }
        .low { border-color: #10b981; color: #10b981; }

        .ts { color: #555; }
        .msg { color: #aaa; font-weight: 900; overflow: hidden; text-overflow: ellipsis; }
        .node { color: #2563eb; font-weight: 900; }
        
        .stat { 
          text-align: right; 
          font-weight: 900; 
          font-size: 10px; 
          color: #444; 
          line-height: 1;
        }

        .resolve-btn {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 9px;
          font-weight: 900;
          cursor: pointer;
          font-family: monospace;
          transition: 0.2s;
        }

        .resolve-btn:hover {
          background: rgba(16, 185, 129, 0.2);
          transform: translateY(-1px);
        }

        .system-loader { padding: 50px; text-align: center; color: #222; font-weight: 900; font-family: monospace; }

        @media (max-width: 768px) {
          .module-inner-content { padding: 10px !important; }
          .vault-header-control { flex-direction: column !important; padding: 15px !important; align-items: flex-start !important; }
          .v-table-head { display: none !important; }
          .v-table-row { grid-template-columns: 1fr !important; gap: 10px !important; padding: 15px !important; border-radius: 12px !important; }
          .stat { text-align: left !important; justify-content: flex-start !important; margin-top: 5px !important; }
        }
      `})]})},em=()=>{const[s,a]=U.useState(""),[c,d]=U.useState(""),[p,f]=U.useState(!1),[h,y]=U.useState(!1);U.useEffect(()=>{const w=localStorage.getItem("apc_user");w&&localStorage.getItem(`apc_master_validated_${w}`)==="true"&&f(!0)},[]);const[C,b]=U.useState("master"),[N,T]=U.useState(""),[O,L]=U.useState(""),S=async w=>{var B,H;w.preventDefault(),y(!0);try{const te=localStorage.getItem("apc_token");await K.post(`${be}/verify-master-key`,{master_key:s,name:c},{headers:{"x-access-token":te}}),f(!0);const ne=localStorage.getItem("apc_user");ne&&localStorage.setItem(`apc_master_validated_${ne}`,"true"),alert("Master Key Validated Successfully.")}catch(te){alert(((H=(B=te.response)==null?void 0:B.data)==null?void 0:H.message)||"Invalid Master Key.")}finally{y(!1)}},k=async w=>{var H,te;if(w.preventDefault(),!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/.test(O)){alert("SECURITY RISK: Password must contain at least one uppercase letter, one lowercase letter, and one special character.");return}y(!0);try{const ne=localStorage.getItem("apc_token"),xe={new_password:O};C==="master"?xe.master_key=s:xe.old_password=N,await K.post(`${be}/change-password`,xe,{headers:{"x-access-token":ne}}),alert("Password updated successfully. Please log in with your new password."),window.location.reload()}catch(ne){alert(((te=(H=ne.response)==null?void 0:H.data)==null?void 0:te.message)||"Failed to update password.")}finally{y(!1)}};return i.jsxs("div",{className:"module-inner-content",children:[i.jsxs("div",{className:"vault-header-control",style:{marginBottom:"20px"},children:[i.jsxs("div",{className:"header-status-block",children:[i.jsx("div",{className:"pulse-indicator"}),i.jsx("h3",{className:"module-title",children:"EMERGENCY_RECOVERY_TOOL"})]}),i.jsx("span",{className:"event-count",children:"SYSTEM_RECOVERY_PROTOCOL"})]}),i.jsxs("div",{className:"recovery-container",children:[i.jsxs("div",{className:"recovery-card",children:[i.jsx("h2",{className:"card-heading",children:"1. VALIDATE MASTER KEY"}),i.jsx("p",{className:"card-subtext",children:"Paste the Master Recovery Key you received during registration to unlock password recovery."}),i.jsxs("form",{onSubmit:S,className:"recovery-form",children:[i.jsxs("div",{className:"cyber-field",children:[i.jsx("label",{children:"LEGAL NAME"}),i.jsx("input",{type:"text",placeholder:"Enter registered legal name...",value:c,onChange:w=>d(w.target.value),disabled:p,required:!0})]}),i.jsxs("div",{className:"cyber-field",children:[i.jsx("label",{children:"MASTER RECOVERY KEY"}),i.jsx("input",{type:"text",placeholder:"XXXX-XXXX-XXXX-XXXX",value:s,onChange:w=>a(w.target.value),disabled:p,required:!0})]}),!p&&i.jsx("button",{type:"submit",className:"cyber-btn",disabled:h,children:h?"VALIDATING...":"VALIDATE KEY"}),p&&i.jsx("div",{className:"success-banner",children:"✓ MASTER KEY VERIFIED"})]})]}),i.jsxs("div",{className:"recovery-card",children:[i.jsxs("h2",{className:"card-heading",children:["2. UPDATE PASSWORD FOR USER: ",i.jsx("span",{style:{color:"#2563eb"},children:localStorage.getItem("apc_user")})]}),i.jsx("p",{className:"card-subtext",children:"Ensure your new password meets the strict platform requirements."}),i.jsxs("div",{className:"mode-tabs",children:[i.jsx("button",{className:`mode-tab ${C==="master"?"active":""}`,onClick:()=>b("master"),children:"USE MASTER KEY"}),i.jsx("button",{className:`mode-tab ${C==="old"?"active":""}`,onClick:()=>b("old"),children:"USE OLD PASSWORD"})]}),i.jsxs("form",{onSubmit:k,className:`recovery-form ${!p&&C==="master"?"locked":""}`,children:[C==="old"&&i.jsxs("div",{className:"cyber-field",children:[i.jsx("label",{children:"CURRENT PASSWORD"}),i.jsx("input",{type:"password",placeholder:"Enter current password...",value:N,onChange:w=>T(w.target.value),required:!0})]}),i.jsxs("div",{className:"cyber-field",children:[i.jsx("label",{children:"NEW PASSWORD"}),i.jsx("input",{type:"password",placeholder:"Enter new strong password...",value:O,onChange:w=>L(w.target.value),required:!0,disabled:C==="master"&&!p}),i.jsx("span",{className:"password-hint",children:"Requires: 1 Uppercase, 1 Lowercase, 1 Special Character"})]}),i.jsx("button",{type:"submit",className:"cyber-btn",disabled:h||C==="master"&&!p,children:h?"UPDATING...":"UPDATE SYSTEM PASSWORD"})]})]})]}),i.jsx("style",{children:`
        .module-inner-content { 
          flex: 1;
          width: 100%;
          height: 100%; 
          display: flex; 
          flex-direction: column; 
          padding: 25px;
          overflow-y: auto;
          box-sizing: border-box;
        }

        .vault-header-control { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          background: rgba(255,255,255,0.02); 
          padding: 18px 25px; 
          border-radius: 18px; 
          border: 1px solid rgba(255,255,255,0.05); 
          margin-bottom: 20px;
        }

        .header-status-block { 
          display: flex; 
          align-items: center; 
          gap: 12px;
          height: 20px;
        }

        .module-title { 
          font-size: 14px; 
          font-weight: 900; 
          color: #2563eb; 
          letter-spacing: 2px; 
          margin: 0; 
          font-family: monospace;
          line-height: 1;
        }

        .pulse-indicator { 
          width: 8px; 
          height: 8px; 
          background: #2563eb; 
          border-radius: 50%; 
          box-shadow: 0 0 10px #2563eb;
          flex-shrink: 0;
        }

        .event-count { 
          font-size: 10px; 
          color: #666; 
          font-weight: 900; 
          font-family: monospace; 
        }

        .recovery-container {
          display: flex;
          flex-direction: column;
          gap: 25px;
          width: 100%;
        }

        .recovery-card {
          background: rgba(10, 10, 10, 0.4);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 30px;
          transition: opacity 0.3s;
        }

        .recovery-form.locked {
          opacity: 0.5;
          pointer-events: none;
        }

        .card-heading {
          font-size: 16px;
          color: #fff;
          font-family: 'Inter', sans-serif;
          margin: 0 0 10px 0;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .card-subtext {
          font-size: 12px;
          color: #888;
          margin: 0 0 25px 0;
        }

        .recovery-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cyber-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cyber-field label {
          font-size: 10px;
          font-weight: 900;
          color: #2563eb;
          letter-spacing: 1.5px;
          font-family: monospace;
        }

        .cyber-field input {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 15px;
          border-radius: 12px;
          color: #fff;
          font-family: monospace;
          font-size: 14px;
        }

        .cyber-field input:focus {
          outline: none;
          border-color: #2563eb;
          background: rgba(37, 99, 235, 0.05);
        }

        .cyber-field input:disabled {
          background: rgba(0,0,0,0.5);
          color: #555;
          cursor: not-allowed;
        }

        .password-hint {
          font-size: 10px;
          color: #f59e0b;
          font-family: monospace;
        }

        .cyber-btn {
          background: #2563eb;
          color: #fff;
          border: none;
          padding: 16px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
          cursor: pointer;
          transition: 0.3s;
          font-family: monospace;
        }

        .cyber-btn:hover:not(:disabled) {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(37,99,235,0.4);
        }

        .cyber-btn:disabled {
          background: #333;
          color: #666;
          cursor: not-allowed;
        }

        .success-banner {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 16px;
          border-radius: 12px;
          text-align: center;
          font-weight: 900;
          font-family: monospace;
          font-size: 12px;
        }

        .mode-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 15px;
        }

        .mode-tab {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: #888;
          padding: 10px 15px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
          transition: 0.2s;
        }

        .mode-tab:hover {
          background: rgba(255,255,255,0.05);
          color: #fff;
        }

        .mode-tab.active {
          background: rgba(37, 99, 235, 0.1);
          border-color: #2563eb;
          color: #2563eb;
        }

        @media (max-width: 768px) {
          .module-inner-content { padding: 10px !important; }
          .vault-header-control { flex-direction: column !important; padding: 15px !important; align-items: flex-start !important; }
          .recovery-card { padding: 15px !important; border-radius: 12px !important; }
          .card-heading { font-size: 13px !important; }
          .mode-tabs { flex-direction: column !important; gap: 8px !important; }
          .mode-tab { width: 100% !important; text-align: center !important; }
        }
      `})]})},tm=()=>{const[s,a]=U.useState([]),[c,d]=U.useState(!0),p=async()=>{try{const f=localStorage.getItem("apc_token"),h=await K.get(`${be}/security-logs`,{headers:{"x-access-token":f}});a(h.data)}catch(f){console.error("Failed to fetch security logs",f)}finally{d(!1)}};return U.useEffect(()=>{p();const f=setInterval(p,5e3);return()=>clearInterval(f)},[]),i.jsxs("div",{className:"module-inner-content",children:[i.jsxs("div",{className:"vault-header-control",style:{marginBottom:"20px"},children:[i.jsxs("div",{className:"header-status-block",children:[i.jsx("div",{className:"pulse-indicator"}),i.jsx("h3",{className:"module-title",children:"SECURITY_ACTIVITY_FEED"})]}),i.jsxs("span",{className:"event-count",children:[s.length," SECURITY_ACTIVITY_LOGS"]})]}),i.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"},children:[i.jsxs("div",{className:"v-table-head security-grid",children:[i.jsx("span",{className:"col-label",children:"TIME"}),i.jsx("span",{className:"col-label",children:"ACTOR"}),i.jsx("span",{className:"col-label",children:"ACTION"}),i.jsx("span",{className:"col-label",children:"RESOURCE"}),i.jsx("span",{className:"col-label",style:{textAlign:"right"},children:"STATUS"})]}),i.jsx("div",{className:"v-table-body",children:c?i.jsx("div",{className:"system-loader",children:"// RECONSTRUCTING_STREAM..."}):s.length===0?i.jsx("div",{className:"system-loader",children:"NO_RECORDS_IN_LEDGER"}):s.map(f=>{var h;return i.jsxs("div",{className:"v-table-row security-grid",children:[i.jsx("span",{className:"ts",children:f.timestamp}),i.jsx("span",{className:"actor",children:f.user_id}),i.jsx("span",{className:"event",children:f.event}),i.jsx("span",{className:"res",children:((h=f.file_id)==null?void 0:h.slice(0,8))||"SYS"}),i.jsx("span",{className:`stat ${f.status==="SUCCESS"?"pass":"fail"}`,children:f.status})]},f.id)})})]}),i.jsx("style",{children:`
        .module-inner-content { 
          flex: 1;
          width: 100%;
          height: 100%; 
          display: flex; 
          flex-direction: column; 
          padding: 25px;
          box-sizing: border-box;
        }

        .vault-header-control { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          background: rgba(255,255,255,0.02); 
          padding: 15px 25px; 
          border-radius: 15px; 
          border: 1px solid rgba(255,255,255,0.05); 
          margin-bottom: 15px;
        }

        .header-status-block { 
          display: flex; 
          align-items: center; 
          gap: 12px;
          height: 20px;
        }

        .module-title { 
          font-size: 13px; 
          font-weight: 900; 
          color: #2563eb; 
          letter-spacing: 2px; 
          font-family: monospace; 
          margin: 0;
          line-height: 1;
          margin-bottom: 4px;
        }

        .module-subtitle {
          font-size: 10px;
          color: #888;
          font-family: monospace;
          margin: 0;
          letter-spacing: 0.5px;
        }

        .pulse-indicator { 
          width: 8px; 
          height: 8px; 
          background: #2563eb; 
          border-radius: 50%; 
          box-shadow: 0 0 10px #2563eb;
          flex-shrink: 0;
        }

        .event-count { 
          font-size: 10px; 
          color: #666; 
          font-weight: 900; 
          font-family: monospace; 
        }

        .event-count { 
          font-size: 10px; 
          color: #666; 
          font-weight: 900; 
          font-family: monospace; 
        }

        .security-grid {
          display: grid !important; 
          grid-template-columns: 180px 140px 1fr 140px 100px !important; 
          align-items: center !important; 
          gap: 20px;
          white-space: nowrap;
        }

        .v-table-head { 
          padding: 20px 40px; 
          background: #000; 
          border-bottom: 1px solid #111;
          height: 50px; /* Fixed height for header */
          box-sizing: border-box;
        }

        .col-label {
          font-size: 10px; 
          color: #2563eb; 
          font-weight: 900; 
          letter-spacing: 2px;
          font-family: monospace;
          line-height: 1; /* Eliminates extra vertical space */
          display: inline-block;
        }

        .v-table-body { flex: 1; overflow-y: auto; padding: 15px; }
        
        .v-table-row { 
          padding: 18px 40px; 
          background: rgba(255,255,255,0.01); 
          border: 1px solid #0a0a0a; 
          margin-bottom: 8px; 
          border-radius: 12px; 
          font-family: monospace; 
          font-size: 11px;
          box-sizing: border-box;
        }

        .ts { color: #555; }
        .actor { color: #888; font-weight: 900; }
        .event { color: #aaa; font-weight: 900; } 
        .res { color: #2563eb; font-weight: 900; }
        
        .stat { 
          text-align: right; 
          font-weight: 900; 
          font-size: 10px; 
          line-height: 1; 
        }
        
        .pass { color: #10b981; }
        .fail { color: #ef4444; }

        .system-loader { padding: 50px; text-align: center; color: #222; font-weight: 900; font-family: monospace; }

        @media (max-width: 768px) {
          .module-inner-content { padding: 10px !important; }
          .vault-header-control { flex-direction: column !important; padding: 15px !important; align-items: flex-start !important; }
          .v-table-head { display: none !important; }
          .v-table-row { grid-template-columns: 1fr !important; gap: 8px !important; padding: 15px !important; border-radius: 12px !important; }
          .stat { text-align: left !important; margin-top: 5px !important; }
        }
      `})]})},nm=({activeTab:s})=>{const[a,c]=U.useState([]),[d,p]=U.useState(null),[f,h]=U.useState(!1),y=s.toLowerCase().trim();U.useEffect(()=>{y.includes("vault")&&C()},[y]);const C=async()=>{const S=localStorage.getItem("apc_token"),k=localStorage.getItem("apc_user");try{const[w,B]=await Promise.all([K.get(`${be}/my-files`,{headers:{"x-access-token":S}}),K.get(`${be}/shared-with-me`,{headers:{"x-user-identity":k}}).catch(()=>({data:[]}))]),H=w.data.map(ne=>({...ne,is_shared:!1})),te=B.data.map(ne=>({...ne,is_shared:!0}));c([...H,...te])}catch{console.error("Vault offline")}},b=async()=>{if(!d)return alert("Select file first.");h(!0);const S=new FormData;S.append("file",d);const k=localStorage.getItem("apc_token");try{await K.post(`${be}/upload`,S,{headers:{"Content-Type":"multipart/form-data","x-access-token":k}}),p(null);try{await K.post(`${be}/encrypt-pending`,{},{headers:{"x-access-token":k}})}catch{console.warn("Auto-encryption pending manual trigger.")}C()}catch{alert("Upload failed.")}finally{h(!1)}},N=async()=>{const S=localStorage.getItem("apc_token");h(!0);try{await K.post(`${be}/encrypt-pending`,{},{headers:{"x-access-token":S}}),C()}catch{alert("Encryption failed.")}finally{h(!1)}},T=async S=>{try{const k=await K.get(`${be}/download/${S.id}`,{headers:{"x-access-token":localStorage.getItem("apc_token")},responseType:"blob"}),w=window.URL.createObjectURL(new Blob([k.data])),B=document.createElement("a");B.href=w,B.setAttribute("download",S.filename),document.body.appendChild(B),B.click(),B.remove();try{const H=localStorage.getItem("apc_user")||"User_2";await K.post(`${be}/api/log-decrypt`,{user:H,owner:S.owner||"User_1",file:S.filename})}catch{console.warn("SOC activity recording failed.")}}catch{alert("Decryption failed.")}},O=async S=>{if(!window.confirm("Delete file permanently?"))return;const k=localStorage.getItem("apc_token");try{await K.delete(`${be}/delete-file/${S}`,{headers:{"x-access-token":k}}),C()}catch{alert("Delete failed.")}};let L;return y.includes("vault")?L=i.jsxs("div",{className:"vault-enlarged-root",children:[i.jsxs("div",{className:"vault-header-control",children:[i.jsx("input",{type:"file",id:"v-file",onChange:S=>S.target.files&&p(S.target.files[0]),hidden:!0}),i.jsx("label",{htmlFor:"v-file",className:"v-picker-long",children:d?d.name:"// SELECT_DATA_STREAM"}),i.jsxs("div",{className:"btn-group",children:[i.jsx("button",{onClick:b,className:"v-upload-btn",disabled:f,children:f?"PROCESSING...":"UPLOAD"}),i.jsx("button",{onClick:N,className:"v-encrypt-btn",disabled:f,children:"ENCRYPT"})]})]}),i.jsxs("div",{className:"vault-table-container",children:[i.jsxs("div",{className:"v-table-head",children:[i.jsx("span",{children:"FILE_NO"}),i.jsx("span",{children:"FILE_IDENTIFIER"}),i.jsx("span",{children:"SECURITY_LAYER"}),i.jsx("span",{style:{textAlign:"right"},children:"COMMANDS"})]}),i.jsx("div",{className:"v-table-body",children:a.map(S=>i.jsxs("div",{className:"v-table-row",children:[i.jsxs("div",{className:"v-col-id",style:{color:"#2563eb",fontWeight:"bold",fontFamily:"monospace"},children:["#",S.id.slice(0,8)]}),i.jsxs("div",{className:"v-col-name",children:["📄 ",S.filename,S.is_shared&&i.jsx("span",{style:{color:"#3b82f6",fontSize:"9px",marginLeft:"10px",fontWeight:"bold"},children:"[SHARED]"})]}),i.jsx("div",{className:`v-col-status ${S.is_encrypted?"active":""}`,children:S.is_encrypted?"AES_256_SECURED":"RAW_UNSECURED"}),i.jsxs("div",{className:"v-col-cmds",children:[i.jsx("button",{onClick:()=>T(S),className:"v-btn dec",children:"DECRYPT"}),!S.is_shared&&i.jsx("button",{onClick:()=>O(S.id),className:"v-btn del",children:"DEL"})]})]},S.id))})]})]}):y==="permission manager"||y.includes("alert")||y.includes("emergency")||y.includes("recovery")||y.includes("security")?L=i.jsx("div",{className:"vault-enlarged-root",children:i.jsxs("div",{className:"vault-table-container",children:[y==="permission manager"&&i.jsx(Jh,{}),y.includes("alert")&&i.jsx(Zh,{}),(y.includes("emergency")||y.includes("recovery"))&&i.jsx(em,{}),y.includes("security")&&i.jsx(tm,{})]})}):L=i.jsxs("div",{style:{color:"#444",textAlign:"center",marginTop:"50px",fontFamily:"monospace"},children:["[ SYSTEM_IDLE ] ",i.jsx("br",{}),'Active Tab: "',s,'"']}),i.jsxs("div",{className:"dashboard-outer-wrapper",children:[i.jsx("div",{className:"module-content-shaper",children:L}),i.jsx("style",{children:`
        .dashboard-outer-wrapper { 
          width: 100%; 
          height: 100%; 
          display: flex; 
          flex-direction: column; 
          overflow: hidden; 
        }

        .module-content-shaper {
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .vault-enlarged-root { 
          width: 100%; 
          height: 100%; 
          display: flex; 
          flex-direction: column; 
          padding: 20px; 
          box-sizing: border-box; 
        }
        
        .vault-header-control { 
          display: flex; 
          width: 100%;
          gap: 15px; 
          margin-bottom: 20px; 
          background: rgba(255,255,255,0.02); 
          padding: 25px; 
          border-radius: 20px; 
          border: 1px solid rgba(255,255,255,0.05); 
          box-sizing: border-box;
        }

        .v-picker-long { 
          flex: 2; 
          background: #000; 
          border: 1px solid #222; 
          padding: 18px; 
          border-radius: 12px; 
          color: #666; 
          font-family: monospace; 
          font-size: 11px; 
          cursor: pointer; 
          display: flex; 
          align-items: center; 
        }

        .btn-group { 
          flex: 1; 
          display: flex; 
          gap: 10px; 
        }

        .v-upload-btn, .v-encrypt-btn { 
          flex: 1; 
          height: 55px; 
          border-radius: 12px; 
          font-weight: 900; 
          font-size: 11px; 
          cursor: pointer; 
          border: none; 
          letter-spacing: 1px; 
        }

        .v-upload-btn { background: #fff; color: #000; }
        .v-encrypt-btn { background: #2563eb; color: #fff; }

        .vault-table-container { 
          flex: 1; 
          width: 100%;
          background: rgba(10, 10, 10, 0.4); 
          border-radius: 20px; 
          border: 1px solid rgba(255,255,255,0.03); 
          overflow: hidden; 
          display: flex; 
          flex-direction: column; 
        }

        .v-table-head { 
          display: grid; 
          grid-template-columns: 120px 2fr 1fr 200px; 
          padding: 20px 30px; 
          font-size: 10px; 
          color: #2563eb; 
          font-weight: 900; 
          border-bottom: 1px solid #111; 
          letter-spacing: 2px; 
        }

        .v-table-body { flex: 1; overflow-y: auto; padding: 15px; }

        .v-table-row { 
          display: grid; 
          grid-template-columns: 120px 2fr 1fr 200px; 
          align-items: center; 
          padding: 22px 25px; 
          background: rgba(255,255,255,0.01); 
          border: 1px solid #0a0a0a; 
          margin-bottom: 10px; 
          border-radius: 18px; 
        }

        .v-col-name { color: #fff; font-size: 14px; font-family: monospace; }
        .v-col-status { font-size: 11px; font-weight: 800; color: #333; }
        .v-col-status.active { color: #10b981; }
        .v-col-cmds { display: flex; gap: 10px; justify-content: flex-end; }
        .v-btn { background: #000; border: 1px solid #222; color: #fff; padding: 10px 18px; border-radius: 10px; font-size: 10px; cursor: pointer; font-weight: 800; }
        .v-btn.dec { border-color: #10b981; color: #10b981; }
        .v-btn.del:hover { color: #ef4444; border-color: #ef4444; }

        @media (max-width: 768px) {
          .vault-header-control { flex-direction: column !important; padding: 15px !important; gap: 10px !important; }
          .v-picker-long { width: 100% !important; flex: none !important; box-sizing: border-box !important; padding: 14px !important; }
          .btn-group { width: 100% !important; flex: none !important; gap: 10px !important; }
          .v-upload-btn, .v-encrypt-btn { height: 45px !important; border-radius: 8px !important; }
          .v-table-head { display: none !important; }
          .v-table-row { grid-template-columns: 1fr !important; gap: 12px !important; padding: 15px !important; border-radius: 12px !important; }
          .v-col-id { font-size: 10px !important; }
          .v-col-name { font-size: 13px !important; white-space: normal !important; word-break: break-all !important; }
          .v-col-status { font-size: 10px !important; }
          .v-col-cmds { justify-content: flex-start !important; margin-top: 5px !important; }
          .v-btn { padding: 8px 14px !important; border-radius: 8px !important; }
        }
      `})]})},rm="admin-bypass",im=be,sm={"x-admin-token":rm},om=s=>{if(!s)return"";let a=String(s);return!a.endsWith("Z")&&!a.includes("+")&&!a.includes("-")&&(a=a.replace(" ","T"),a.endsWith("Z")||(a+="Z")),new Date(a).toLocaleString("en-IN",{timeZone:"Asia/Kolkata",day:"2-digit",month:"2-digit",year:"numeric",hour:"numeric",minute:"2-digit",hour12:!0}).toUpperCase()};function lm(){const[s,a]=U.useState([]),[c,d]=U.useState(!0),[p,f]=U.useState(""),h=async()=>{d(!0);try{const b=await K.get(`${im}/admin/clickstream-tracker-logs`,{headers:sm});a(b.data)}catch{console.error("Failed to fetch clickstream logs")}finally{d(!1)}};U.useEffect(()=>{h();const b=setInterval(h,3e3);return()=>clearInterval(b)},[]);const y=s.filter(b=>(b.user_id||"").toLowerCase().includes(p.toLowerCase())||(b.event_type||"").toLowerCase().includes(p.toLowerCase())||(b.url_route||"").toLowerCase().includes(p.toLowerCase())||(b.ip_address||"").toLowerCase().includes(p.toLowerCase())),C=b=>{if(!b)return"#6b7280";switch(b.toUpperCase()){case"CLICK":return"#3b82f6";case"INPUT":return"#f59e0b";case"NAVIGATION":return"#10b981";case"API_REQUEST":return"#8b5cf6";case"LOGIN":return"#06b6d4";case"ERROR":return"#ef4444";default:return"#6b7280"}};return i.jsxs("div",{className:"cs-tracker-container",children:[i.jsxs("div",{className:"cs-header",children:[i.jsxs("div",{className:"cs-header-left",children:[i.jsx("h2",{className:"cs-title",children:"Global Click-Stream Matrix"}),i.jsx("p",{className:"cs-subtitle",children:"Deep Forensic Analysis of User Interactions & Requests"})]}),i.jsxs("div",{className:"cs-header-right",children:[i.jsxs("div",{className:"cs-search-box",children:[i.jsx("span",{className:"search-icon",children:"🔍"}),i.jsx("input",{type:"text",placeholder:"Filter by User ID, IP, Event...",value:p,onChange:b=>f(b.target.value)})]}),i.jsxs("button",{onClick:h,className:"cs-refresh-btn",children:[i.jsx("span",{className:`refresh-icon ${c?"spinning":""}`,children:"↻"})," REFRESH"]})]})]}),i.jsxs("div",{className:"cs-stats-row",children:[i.jsxs("div",{className:"cs-stat-box",children:[i.jsx("div",{className:"cs-stat-val",children:s.length}),i.jsx("div",{className:"cs-stat-label",children:"Total Recorded Events"})]}),i.jsxs("div",{className:"cs-stat-box",children:[i.jsx("div",{className:"cs-stat-val",style:{color:"#3b82f6"},children:s.filter(b=>b.event_type==="CLICK").length}),i.jsx("div",{className:"cs-stat-label",children:"UI Clicks"})]}),i.jsxs("div",{className:"cs-stat-box",children:[i.jsx("div",{className:"cs-stat-val",style:{color:"#8b5cf6"},children:s.filter(b=>b.event_type==="API_REQUEST").length}),i.jsx("div",{className:"cs-stat-label",children:"API Requests"})]}),i.jsx("div",{className:"cs-stat-box",children:i.jsxs("div",{className:"cs-live-indicator",children:[i.jsx("span",{className:"pulse-dot"})," LIVE RECORDING ACTIVE"]})})]}),i.jsx("div",{className:"cs-table-container",children:i.jsxs("table",{className:"cs-table",children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx("th",{children:"Event ID"}),i.jsx("th",{children:"Timestamp"}),i.jsx("th",{children:"User / Actor"}),i.jsx("th",{children:"Event Type"}),i.jsx("th",{children:"Target Element"}),i.jsx("th",{children:"URL Route"}),i.jsx("th",{children:"Origin IP"})]})}),i.jsx("tbody",{children:c&&s.length===0?i.jsx("tr",{children:i.jsx("td",{colSpan:7,className:"cs-empty",children:i.jsxs("div",{className:"sync-loader",children:[i.jsx("span",{className:"sync-icon",children:"⚡"}),i.jsx("span",{className:"sync-text",children:"INSTANT SYNC ACTIVE..."})]})})}):y.length===0?i.jsx("tr",{children:i.jsx("td",{colSpan:7,className:"cs-empty",children:"No clickstream records found in this vector."})}):y.map(b=>i.jsxs("tr",{className:"cs-row",children:[i.jsxs("td",{className:"cs-id-cell",children:[b.id.substring(0,8),"..."]}),i.jsx("td",{className:"cs-time-cell",children:om(b.timestamp)}),i.jsxs("td",{className:"cs-user-cell",children:[i.jsx("div",{style:{fontWeight:"bold",color:b.user_id==="ADM-777"?"#fff":"#8b5cf6"},children:b.numeric_id||b.user_id}),b.phone_number&&i.jsxs("div",{style:{color:"#9ca3af",fontSize:"10px",marginTop:"2px"},children:["📞 ",b.phone_number]})]}),i.jsx("td",{children:i.jsx("span",{className:"cs-badge",style:{background:C(b.event_type)+"22",color:C(b.event_type),borderColor:C(b.event_type)},children:b.event_type})}),i.jsx("td",{className:"cs-target-cell",children:b.element_id}),i.jsx("td",{className:"cs-route-cell",children:b.url_route}),i.jsx("td",{className:"cs-ip-cell",children:b.ip_address})]},b.id))})]})}),i.jsx("style",{children:`
        .cs-tracker-container {
          background: #0d0d12;
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 20px;
          padding: 24px;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          animation: fadeIn 0.5s ease-out;
        }
        
        .cs-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }
        
        .cs-title {
          color: #fff;
          font-size: 24px;
          font-weight: 800;
          margin: 0 0 5px 0;
          letter-spacing: -0.5px;
        }
        
        .cs-subtitle {
          color: #818cf8;
          font-size: 13px;
          margin: 0;
          font-weight: 600;
        }
        
        .cs-header-right {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        
        .cs-search-box {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-icon {
          position: absolute;
          left: 12px;
          font-size: 14px;
          color: #6b7280;
        }
        
        .cs-search-box input {
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 10px 10px 10px 35px;
          color: #fff;
          font-size: 13px;
          width: 250px;
          outline: none;
          transition: 0.3s;
        }
        
        .cs-search-box input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 10px rgba(99,102,241,0.2);
        }
        
        .cs-refresh-btn {
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: #818cf8;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: 0.2s;
        }
        
        .cs-refresh-btn:hover {
          background: rgba(99, 102, 241, 0.2);
          color: #fff;
        }
        
        .spinning {
          display: inline-block;
          animation: spin 1s linear infinite;
        }
        
        .cs-stats-row {
          display: flex;
          gap: 15px;
          margin-bottom: 24px;
        }
        
        .cs-stat-box {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 15px 20px;
          border-radius: 12px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .cs-stat-val {
          font-size: 24px;
          font-weight: 900;
          color: #fff;
          line-height: 1.2;
        }
        
        .cs-stat-label {
          font-size: 11px;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }
        
        .cs-live-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #10b981;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 1px;
          height: 100%;
        }
        
        .pulse-dot {
          width: 10px;
          height: 10px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 10px #10b981;
          animation: pulse 1.5s infinite;
        }
        
        .cs-table-container {
          flex: 1;
          overflow: auto;
          background: #0a0a0f;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.03);
        }
        
        .cs-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        
        .cs-table th {
          background: rgba(255,255,255,0.02);
          padding: 15px 20px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #8b5cf6;
          font-weight: 800;
          position: sticky;
          top: 0;
          z-index: 10;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        
        .cs-row {
          border-bottom: 1px dashed rgba(255,255,255,0.05);
          transition: 0.2s;
        }
        
        .cs-row:hover {
          background: rgba(255,255,255,0.02);
        }
        
        .cs-row td {
          padding: 15px 20px;
          font-size: 13px;
          color: #d1d5db;
        }
        
        .cs-id-cell {
          font-family: monospace;
          color: #6b7280 !important;
          font-size: 12px !important;
        }
        
        .cs-time-cell {
          color: #9ca3af !important;
          font-size: 12px !important;
        }
        
        .cs-user-cell {
          font-weight: 700;
          color: #fff !important;
        }
        
        .cs-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.5px;
          background: rgba(255,255,255,0.02);
        }
        
        .cs-target-cell {
          font-family: monospace;
          color: #a78bfa !important;
        }
        
        .cs-route-cell {
          font-family: monospace;
          color: #34d399 !important;
        }
        
        .cs-ip-cell {
          font-family: monospace;
          color: #fca5a5 !important;
        }
        
        .cs-empty {
          text-align: center;
          padding: 50px !important;
          color: #6b7280 !important;
          font-style: italic;
        }
        .sync-loader { display: flex; flex-direction: column; align-items: center; gap: 15px; }
        .sync-icon { font-size: 32px; animation: spin 2s linear infinite; display: inline-block; }
        .sync-text { font-size: 11px; font-weight: 800; letter-spacing: 2px; color: #6366f1; }
        
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .cs-table-container::-webkit-scrollbar { width: 6px; }
        .cs-table-container::-webkit-scrollbar-track { background: transparent; }
        .cs-table-container::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.3); border-radius: 10px; }
      `})]})}const am="admin-bypass",cm=be,um={"x-admin-token":am};function dm(){const[s,a]=U.useState(null),[c,d]=U.useState(!0),[p,f]=U.useState(""),[h,y]=U.useState(!1),C=async()=>{d(!0);try{const L=await K.get(`${cm}/admin/blockchain-ledger`,{headers:um});a(L.data)}catch{console.error("Failed to fetch blockchain ledger")}finally{d(!1)}};U.useEffect(()=>{C();const L=setInterval(C,5e3);return()=>clearInterval(L)},[]);const b=(s==null?void 0:s.blocks.filter(L=>L.block_hash.toLowerCase().includes(p.toLowerCase())||L.owner_numeric_id.toLowerCase().includes(p.toLowerCase())||L.file_id.toLowerCase().includes(p.toLowerCase())||L.prev_hash.toLowerCase().includes(p.toLowerCase())))||[],N=h?"CORRUPTED":(s==null?void 0:s.integrity)||"VERIFYING",T=N==="INTACT"||N==="VERIFIED";let O=b;return h&&O.length>1&&(O=[...O],O[1]={...O[1],block_hash:"c89a7f6e5d4b3a2109f8e7d6c5b4a392..."}),i.jsxs("div",{className:`bl-container ${T?"":"alarm-mode"}`,children:[i.jsxs("div",{className:"bl-header",children:[i.jsxs("div",{className:"bl-header-left",children:[i.jsx("h2",{className:"bl-title",children:"Blockchain Ledger Viewer"}),i.jsx("p",{className:"bl-subtitle",children:"Verify the immutable records of all file shares and access rights stored on the chain"})]}),i.jsxs("div",{className:"bl-header-right",children:[i.jsxs("div",{className:"bl-search-box",children:[i.jsx("span",{className:"search-icon",children:"🔍"}),i.jsx("input",{type:"text",placeholder:"Search Hash, User ID, File ID...",value:p,onChange:L=>f(L.target.value)})]}),i.jsx("button",{onClick:()=>y(!h),className:"bl-hack-btn",children:h?"RESTORE CHAIN":"SIMULATE BREACH"}),i.jsxs("button",{onClick:C,className:"bl-refresh-btn",children:[i.jsx("span",{className:`refresh-icon ${c?"spinning":""}`,children:"↻"})," REFRESH"]})]})]}),!T&&i.jsxs("div",{className:"bl-alarm-banner",children:[i.jsx("span",{className:"alarm-icon",children:"🚨"}),i.jsxs("div",{className:"alarm-text",children:[i.jsx("strong",{children:"CRITICAL ALARM: BLOCKCHAIN INTEGRITY COMPROMISED"}),i.jsx("span",{children:"Cryptographic hash mismatch detected! A record has been secretly tampered with!"})]})]}),i.jsxs("div",{className:"bl-stats-row",children:[i.jsxs("div",{className:"bl-stat-box",style:{borderColor:T?"rgba(16, 185, 129, 0.3)":"rgba(239, 68, 68, 0.3)"},children:[i.jsx("div",{className:"bl-stat-val",style:{color:T?"#10b981":"#ef4444"},children:N}),i.jsx("div",{className:"bl-stat-label",children:"Chain Integrity Status"})]}),i.jsxs("div",{className:"bl-stat-box",children:[i.jsx("div",{className:"bl-stat-val",style:{color:"#6366f1"},children:(s==null?void 0:s.blocks.length)||0}),i.jsx("div",{className:"bl-stat-label",children:"Total Validated Blocks"})]}),i.jsxs("div",{className:"bl-stat-box",children:[i.jsx("div",{className:"bl-stat-val",style:{color:"#8b5cf6"},children:(s==null?void 0:s.blocks.filter(L=>L.encrypted).length)||0}),i.jsx("div",{className:"bl-stat-label",children:"AES-256 Encrypted Nodes"})]}),i.jsx("div",{className:"bl-stat-box",children:i.jsxs("div",{className:"bl-live-indicator",children:[i.jsx("span",{className:"pulse-dot"})," LIVE NETWORK SYNC"]})})]}),i.jsx("div",{className:"bl-table-container",children:i.jsxs("table",{className:"bl-table",children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx("th",{children:"Block #"}),i.jsx("th",{children:"Event"}),i.jsx("th",{children:"Granted By"}),i.jsx("th",{children:"Granted To"}),i.jsx("th",{children:"File Name"}),i.jsx("th",{children:"Hash Verification"})]})}),i.jsx("tbody",{children:c&&!s?i.jsx("tr",{children:i.jsx("td",{colSpan:7,className:"bl-empty",children:"Synchronizing Ledger..."})}):O.length===0?i.jsx("tr",{children:i.jsx("td",{colSpan:7,className:"bl-empty",children:"No cryptographic blocks found."})}):O.map((L,S)=>{const k=S===0,w=h&&S===1,B=h&&S===2,H=L.record_type==="GRANT_ACCESS"?"#10b981":"#ef4444",te=L.record_type==="GRANT_ACCESS"?"✅ GRANTED":"🚫 REVOKED",ne=L.filename||(L.file_id?`#${L.file_id.substring(0,8)}`:"UNKNOWN");return i.jsxs("tr",{className:`bl-row ${w?"corrupted-row":""}`,children:[i.jsxs("td",{className:"bl-index-cell",children:["#",S.toString().padStart(4,"0")]}),i.jsx("td",{className:"bl-record-cell",children:i.jsx("span",{className:"record-tag",style:{color:H,borderColor:H,background:`${H}15`},children:k?"SYSTEM_INIT":te})}),i.jsx("td",{className:"bl-user-cell",style:{color:"#6366f1",fontWeight:700},children:L.owner_numeric_id||"—"}),i.jsx("td",{className:"bl-target-user-cell",style:{color:"#3b82f6",fontWeight:700},children:L.target_user_id||"—"}),i.jsx("td",{className:"bl-file-cell",style:{color:ne==="[DELETED]"?"#ef444490":"#aaa",fontStyle:ne==="[DELETED]"?"italic":"normal"},children:ne}),i.jsxs("td",{className:"bl-hash-cell",children:[i.jsxs("div",{className:"hash-line",style:{color:w?"#ef4444":""},children:["CUR: ",i.jsx("span",{className:w?"":"hash-prefix",children:(L.block_hash||"").substring(0,16)}),i.jsxs("span",{className:w?"":"hash-suffix",children:[(L.block_hash||"").substring(16,24),"..."]})]}),i.jsxs("div",{className:"hash-line",style:{color:B?"#ef4444":""},children:["PRV: ",k?i.jsx("span",{className:"genesis-tag",children:"0000000000000000..."}):i.jsxs(i.Fragment,{children:[i.jsx("span",{className:B?"":"hash-prefix prev",children:(L.prev_hash||"").substring(0,16)}),i.jsxs("span",{className:B?"":"hash-suffix",children:[(L.prev_hash||"").substring(16,24),"..."]})]}),B&&i.jsx("span",{style:{marginLeft:"5px",fontSize:"12px"},children:"⚠️ MISMATCH"})]})]})]},S)})})]})}),i.jsx("style",{children:`
        .bl-container {
          background: #0d0d12;
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 20px;
          padding: 24px;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          animation: fadeIn 0.5s ease-out;
        }
        
        .bl-container.alarm-mode {
          border-color: #ef4444;
          box-shadow: 0 0 30px rgba(239,68,68,0.2);
        }
        
        .bl-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }
        
        .bl-title {
          color: #fff;
          font-size: 24px;
          font-weight: 800;
          margin: 0 0 5px 0;
          letter-spacing: -0.5px;
        }
        
        .bl-subtitle {
          color: #10b981;
          font-size: 13px;
          margin: 0;
          font-weight: 600;
        }
        
        .bl-header-right {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        
        .bl-search-box {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-icon {
          position: absolute;
          left: 12px;
          font-size: 14px;
          color: #6b7280;
        }
        
        .bl-search-box input {
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 10px 10px 10px 35px;
          color: #fff;
          font-size: 13px;
          width: 250px;
          outline: none;
          transition: 0.3s;
        }
        
        .bl-search-box input:focus {
          border-color: #10b981;
          box-shadow: 0 0 10px rgba(16,185,129,0.2);
        }
        
        .bl-refresh-btn {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #34d399;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: 0.2s;
        }
        
        .bl-refresh-btn:hover {
          background: rgba(16, 185, 129, 0.2);
          color: #fff;
        }
        
        .bl-hack-btn {
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #f59e0b;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: 0.2s;
        }
        
        .bl-hack-btn:hover {
          background: rgba(245, 158, 11, 0.2);
          color: #fff;
        }
        
        .bl-alarm-banner {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid #ef4444;
          border-radius: 12px;
          padding: 15px 20px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 15px;
          animation: flashBg 1s infinite alternate;
        }
        
        .alarm-icon {
          font-size: 30px;
          animation: pulseIcon 0.5s infinite alternate;
        }
        
        .alarm-text {
          display: flex;
          flex-direction: column;
        }
        
        .alarm-text strong {
          color: #ef4444;
          font-size: 16px;
          letter-spacing: 1px;
        }
        
        .alarm-text span {
          color: #fca5a5;
          font-size: 13px;
        }
        
        @keyframes flashBg {
          from { background: rgba(239, 68, 68, 0.1); box-shadow: 0 0 10px rgba(239,68,68,0); }
          to { background: rgba(239, 68, 68, 0.3); box-shadow: 0 0 20px rgba(239,68,68,0.5); }
        }
        
        @keyframes pulseIcon {
          from { transform: scale(1); }
          to { transform: scale(1.2); }
        }
        
        .spinning {
          display: inline-block;
          animation: spin 1s linear infinite;
        }
        
        .bl-stats-row {
          display: flex;
          gap: 15px;
          margin-bottom: 24px;
        }
        
        .bl-stat-box {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 15px 20px;
          border-radius: 12px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: 0.3s;
        }
        
        .bl-stat-val {
          font-size: 24px;
          font-weight: 900;
          color: #fff;
          line-height: 1.2;
        }
        
        .bl-stat-label {
          font-size: 11px;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }
        
        .bl-live-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #10b981;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 1px;
          height: 100%;
        }
        
        .pulse-dot {
          width: 10px;
          height: 10px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 10px #10b981;
          animation: pulse 1.5s infinite;
        }
        
        .bl-table-container {
          flex: 1;
          overflow: auto;
          background: #0a0a0f;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.03);
        }
        
        .bl-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        
        .bl-table th {
          background: rgba(255,255,255,0.02);
          padding: 15px 20px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #10b981;
          font-weight: 800;
          position: sticky;
          top: 0;
          z-index: 10;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        
        .bl-row {
          border-bottom: 1px dashed rgba(255,255,255,0.05);
          transition: 0.2s;
        }
        
        .corrupted-row {
          background: rgba(239, 68, 68, 0.1) !important;
          border: 1px solid #ef4444 !important;
        }
        
        .bl-row:hover {
          background: rgba(16, 185, 129, 0.05);
        }
        
        .bl-row td {
          padding: 15px 20px;
          font-size: 13px;
          color: #d1d5db;
        }
        
        .bl-index-cell {
          font-family: monospace;
          color: #6366f1 !important;
          font-weight: bold;
        }
        
        .bl-hash-cell {
          font-family: monospace;
          font-size: 10px !important;
          letter-spacing: 0.5px;
        }
        
        .hash-line {
          color: #6b7280;
          margin-bottom: 2px;
        }
        
        .hash-prefix {
          color: #10b981;
          font-weight: bold;
        }
        
        .hash-prefix.prev {
          color: #8b5cf6;
        }
        
        .hash-suffix {
          color: #4b5563;
        }
        
        .genesis-tag {
          color: #f59e0b;
          font-weight: bold;
        }
        
        .record-tag {
          font-size: 9px;
          font-weight: 900;
          padding: 4px 8px;
          border-radius: 4px;
          letter-spacing: 1px;
        }
        .rt-SYSTEM_INIT { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; border: 1px solid rgba(139, 92, 246, 0.3); }
        .rt-GRANT_ACCESS { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
        .rt-REVOKE_ACCESS { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
        
        .bl-user-cell {
          font-weight: 700;
          color: #fff !important;
        }
        
        .bl-target-user-cell {
          color: #3b82f6 !important;
          font-weight: 600;
        }
        
        .bl-file-cell {
          font-family: monospace;
          color: #a78bfa !important;
        }
        
        .bl-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.5px;
        }
        
        .bl-badge.success {
          border: 1px solid #10b981;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
        }
        
        .bl-badge.warning {
          border: 1px solid #f59e0b;
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.1);
        }
        
        .bl-empty {
          text-align: center;
          padding: 50px !important;
          color: #6b7280 !important;
          font-style: italic;
        }
        
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .bl-table-container::-webkit-scrollbar { width: 6px; }
        .bl-table-container::-webkit-scrollbar-track { background: transparent; }
        .bl-table-container::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.3); border-radius: 10px; }
      `})]})}const pm="admin-bypass",fm=be,hm={"x-admin-token":pm},mm=s=>{if(!s)return"";let a=String(s);return!a.endsWith("Z")&&!a.includes("+")&&!a.includes("-")&&(a=a.replace(" ","T"),a.endsWith("Z")||(a+="Z")),new Date(a).toLocaleString("en-IN",{timeZone:"Asia/Kolkata",day:"2-digit",month:"2-digit",year:"numeric",hour:"numeric",minute:"2-digit",hour12:!0}).toUpperCase()};function xm(){const[s,a]=U.useState({}),c=async k=>{if(k==="127.0.0.1"||k==="localhost")return{text:"Mumbai, India (Localhost)",isIndia:!0};try{const B=await(await fetch(`http://ip-api.com/json/${k}`)).json();if(B.status==="success")return{text:`${B.city||"Unknown"}, ${B.country||"Unknown"} (${B.isp||"Unknown ISP"})`,isIndia:B.countryCode==="IN"}}catch{return{text:"Tracking...",isIndia:!0}}return{text:"Unknown Location",isIndia:!1}},[d,p]=U.useState([]),[f,h]=U.useState(!0),[y,C]=U.useState(""),b=async()=>{h(!0);try{const k=await K.get(`${fm}/admin/ip-threats`,{headers:hm});p(k.data)}catch{console.error("Failed to fetch IP threats")}finally{h(!1)}};U.useEffect(()=>{b();const k=setInterval(b,3e3);return()=>clearInterval(k)},[]),U.useEffect(()=>{const k=async()=>{const w={...s};let B=!1;for(const H of d)w[H.ip]||(H.country&&H.country!=="Unknown"?w[H.ip]={text:`${H.country} (Verified Breach)`,isIndia:H.country==="IN"}:w[H.ip]=await c(H.ip),B=!0);B&&a(w)};d.length>0&&k()},[d]);const N=d.filter(k=>k.ip.toLowerCase().includes(y.toLowerCase())||k.user_id.toLowerCase().includes(y.toLowerCase())),T=d.length,O=d.filter(k=>{const w=s[k.ip];return w&&!w.isIndia}).length,L=d.filter(k=>k.severity==="HIGH"||k.severity==="CRITICAL").length,S=k=>{const w=s[k];return w?w.isIndia?"#10b981":"#ef4444":"#6b7280"};return i.jsxs("div",{className:"ip-container",children:[i.jsxs("div",{className:"ip-header",children:[i.jsxs("div",{className:"ip-header-left",children:[i.jsx("h2",{className:"ip-title",children:"IP-Geofencing Monitor"}),i.jsx("p",{className:"ip-subtitle",children:"A security map that flags login attempts from suspicious or unauthorized geographic locations"})]}),i.jsxs("div",{className:"ip-header-right",children:[i.jsxs("div",{className:"ip-search-box",children:[i.jsx("span",{className:"search-icon",children:"🔍"}),i.jsx("input",{type:"text",placeholder:"Filter IP or Severity...",value:y,onChange:k=>C(k.target.value)})]}),i.jsxs("button",{onClick:b,className:"ip-refresh-btn",children:[i.jsx("span",{className:`refresh-icon ${f?"spinning":""}`,children:"↻"})," REFRESH"]})]})]}),i.jsxs("div",{className:"ip-stats-row",children:[i.jsxs("div",{className:"ip-stat-box",children:[i.jsx("div",{className:"ip-stat-val",style:{color:"#fff"},children:T}),i.jsx("div",{className:"ip-stat-label",children:"Monitored IPs"})]}),i.jsxs("div",{className:"ip-stat-box",style:{borderColor:O>0?"rgba(239, 68, 68, 0.3)":"rgba(255,255,255,0.05)"},children:[i.jsx("div",{className:"ip-stat-val",style:{color:O>0?"#ef4444":"#6b7280"},children:O}),i.jsx("div",{className:"ip-stat-label",children:"Critical Threats"})]}),i.jsxs("div",{className:"ip-stat-box",style:{borderColor:L>0?"rgba(249, 115, 22, 0.3)":"rgba(255,255,255,0.05)"},children:[i.jsx("div",{className:"ip-stat-val",style:{color:L>0?"#f97316":"#6b7280"},children:L}),i.jsx("div",{className:"ip-stat-label",children:"High Alerts"})]}),i.jsx("div",{className:"ip-stat-box",children:i.jsxs("div",{className:"ip-live-indicator",children:[i.jsx("span",{className:"pulse-dot"})," RADAR ACTIVE"]})})]}),i.jsx("div",{className:"ip-table-container",children:i.jsxs("table",{className:"ip-table",children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx("th",{children:"Origin IP Address"}),i.jsx("th",{children:"Geographic Location"}),i.jsx("th",{children:"Associated User"}),i.jsx("th",{children:"Total Attempts"}),i.jsx("th",{children:"Geofence Risk"}),i.jsx("th",{children:"Last Seen"}),i.jsx("th",{children:"Status"})]})}),i.jsx("tbody",{children:f&&d.length===0?i.jsx("tr",{children:i.jsx("td",{colSpan:7,className:"ip-empty",children:"Initializing Geofencing Radar..."})}):N.length===0?i.jsx("tr",{children:i.jsx("td",{colSpan:7,className:"ip-empty",children:"No external threats detected on perimeter."})}):N.map((k,w)=>{const B=s[k.ip],H=B==null?void 0:B.isIndia;return i.jsxs("tr",{className:"ip-row",children:[i.jsxs("td",{className:"ip-address-cell",children:[i.jsx("span",{className:"radar-ping",style:{background:S(k.ip)}}),k.ip]}),i.jsxs("td",{className:"ip-location-cell",children:[i.jsx("span",{className:"geo-icon",children:"🌍"})," ",(B==null?void 0:B.text)||"Resolving..."]}),i.jsx("td",{style:{fontFamily:"monospace",color:"#818cf8",fontWeight:"bold"},children:k.user_id}),i.jsxs("td",{className:"ip-attempts-cell",children:[i.jsx("div",{className:"attempt-bar-bg",children:i.jsx("div",{className:"attempt-bar-fill",style:{width:`${Math.min(100,k.attempts*5)}%`,background:S(k.ip)}})}),i.jsxs("span",{children:[k.attempts," pings"]})]}),i.jsx("td",{children:i.jsx("span",{className:`ip-badge ${H?"badge-low":"badge-critical"}`,children:H?"DOMESTIC_PASS":"FOREIGN_VPN_ALERT"})}),i.jsx("td",{className:"ip-time-cell",children:mm(k.last_seen)}),i.jsx("td",{children:i.jsx("span",{className:H?"ip-status-pass":"ip-status-blocked",children:H?"✅ ALLOWED":"🛡️ BLOCKED"})})]},w)})})]})}),i.jsx("style",{children:`
        .ip-container {
          background: #0d0d12;
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 20px;
          padding: 24px;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          animation: fadeIn 0.5s ease-out;
        }
        
        .ip-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }
        
        .ip-title {
          color: #fff;
          font-size: 24px;
          font-weight: 800;
          margin: 0 0 5px 0;
          letter-spacing: -0.5px;
        }
        
        .ip-subtitle {
          color: #ef4444;
          font-size: 13px;
          margin: 0;
          font-weight: 600;
        }
        
        .ip-header-right {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        
        .ip-search-box {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-icon {
          position: absolute;
          left: 12px;
          font-size: 14px;
          color: #6b7280;
        }
        
        .ip-search-box input {
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 10px 10px 10px 35px;
          color: #fff;
          font-size: 13px;
          width: 250px;
          outline: none;
          transition: 0.3s;
        }
        
        .ip-search-box input:focus {
          border-color: #ef4444;
          box-shadow: 0 0 10px rgba(239,68,68,0.2);
        }
        
        .ip-refresh-btn {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: 0.2s;
        }
        
        .ip-refresh-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #fff;
        }
        
        .spinning {
          display: inline-block;
          animation: spin 1s linear infinite;
        }
        
        .ip-stats-row {
          display: flex;
          gap: 15px;
          margin-bottom: 24px;
        }
        
        .ip-stat-box {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 15px 20px;
          border-radius: 12px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: 0.3s;
        }
        
        .ip-stat-val {
          font-size: 24px;
          font-weight: 900;
          color: #fff;
          line-height: 1.2;
        }
        
        .ip-stat-label {
          font-size: 11px;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }
        
        .ip-live-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #ef4444;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 1px;
          height: 100%;
        }
        
        .pulse-dot {
          width: 10px;
          height: 10px;
          background: #ef4444;
          border-radius: 50%;
          box-shadow: 0 0 10px #ef4444;
          animation: pulse 1.5s infinite;
        }
        
        .ip-table-container {
          flex: 1;
          overflow: auto;
          background: #0a0a0f;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.03);
        }
        
        .ip-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        
        .ip-table th {
          background: rgba(255,255,255,0.02);
          padding: 15px 20px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #fca5a5;
          font-weight: 800;
          position: sticky;
          top: 0;
          z-index: 10;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        
        .ip-row {
          border-bottom: 1px dashed rgba(255,255,255,0.05);
          transition: 0.2s;
        }
        
        .ip-row:hover {
          background: rgba(239, 68, 68, 0.05);
        }
        
        .ip-row td {
          padding: 15px 20px;
          font-size: 13px;
          color: #d1d5db;
        }
        
        .ip-address-cell {
          font-family: monospace;
          color: #fff !important;
          font-size: 14px !important;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .ip-location-cell {
          font-size: 12px;
          color: #d1d5db;
          font-weight: 600;
        }
        
        .geo-icon {
          margin-right: 5px;
          font-size: 14px;
        }
        
        .radar-ping {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 8px currentColor;
        }
        
        .ip-attempts-cell {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .attempt-bar-bg {
          width: 100px;
          height: 4px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          overflow: hidden;
        }
        
        .attempt-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.5s ease-out;
        }
        
        .ip-attempts-cell span {
          font-size: 10px;
          color: #9ca3af;
          font-weight: bold;
        }
        
        .ip-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.5px;
          border: 1px solid;
        }
        
        .badge-critical { border-color: #ef4444; color: #ef4444; background: rgba(239, 68, 68, 0.1); }
        .badge-high { border-color: #f97316; color: #f97316; background: rgba(249, 115, 22, 0.1); }
        .badge-medium { border-color: #f59e0b; color: #f59e0b; background: rgba(245, 158, 11, 0.1); }
        .badge-low { border-color: #3b82f6; color: #3b82f6; background: rgba(59, 130, 246, 0.1); }
        .badge-default { border-color: #6b7280; color: #6b7280; background: rgba(107, 114, 128, 0.1); }
        
        .ip-time-cell {
          color: #9ca3af !important;
          font-size: 12px !important;
        }
        
        .ip-status-blocked {
          font-size: 11px;
          font-weight: 800;
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        
        .ip-status-pass {
          font-size: 11px;
          font-weight: 800;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        
        .ip-empty {
          text-align: center;
          padding: 50px !important;
          color: #6b7280 !important;
          font-style: italic;
        }
        
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .ip-table-container::-webkit-scrollbar { width: 6px; }
        .ip-table-container::-webkit-scrollbar-track { background: transparent; }
        .ip-table-container::-webkit-scrollbar-thumb { background: rgba(239, 68, 68, 0.3); border-radius: 10px; }
      `})]})}function gm({unauthLogs:s,moduleLoading:a,formatDelhiTime:c,fetchModuleData:d,handleAdminResolve:p}){return i.jsxs("div",{className:"soc-full-card",children:[i.jsxs("div",{className:"card-header",children:[i.jsxs("h3",{children:["Unauthorized Access Logs ",i.jsxs("span",{className:"count-badge",children:[s.length," total"]})]}),i.jsx("button",{onClick:()=>d(),className:"soc-pill-btn",children:"↻"})]}),i.jsxs("div",{className:"soc-list",children:[i.jsxs("div",{className:"list-head",style:{gridTemplateColumns:"1fr 1.5fr 1.5fr 0.5fr 1fr"},children:[i.jsx("span",{children:"IP"}),i.jsx("span",{children:"Message"}),i.jsx("span",{children:"Time"}),i.jsx("span",{children:"Status"}),i.jsx("span",{children:"Action"})]}),a?i.jsx("p",{className:"empty-state",children:"Loading alerts..."}):s.length===0?i.jsx("p",{className:"empty-state",children:"No logs."}):s.map((f,h)=>i.jsxs("div",{className:"list-row",style:{gridTemplateColumns:"1fr 1.5fr 1.5fr 0.5fr 1fr"},children:[i.jsx("span",{className:"l-id",children:f.ip}),i.jsx("span",{className:"l-target",style:{fontSize:"10px"},children:f.message}),i.jsx("span",{className:"l-time",children:c(f.timestamp)}),i.jsx("span",{className:f.resolved?"c-green":"c-red",children:f.resolved?"Resolved":"Active"}),i.jsx("span",{children:!f.resolved&&i.jsx("button",{onClick:()=>p(f.id),className:"t-resolve",style:{margin:0},children:"✓ Resolve"})})]},h))]})]})}function ym({usersList:s,moduleLoading:a,fetchModuleData:c,API:d,headers:p}){const[f,h]=U.useState(null),[y,C]=U.useState(""),[b,N]=U.useState(!1),T=(L,S)=>{h({userId:L,action:S}),C(""),N(!1)},O=async()=>{if(!f)return;if(y!=="admin123"){alert("INVALID CODE. ACCESS DENIED."),h(null);return}const{userId:L,action:S}=f,k=S==="suspend"?"suspend-user":"reset-token";try{await K.post(`${d}/admin/${k}/${L}`,{},{headers:p}),alert("Success"),c()}catch{alert("Action failed.")}h(null)};return i.jsxs("div",{className:"soc-full-card",children:[i.jsxs("div",{className:"card-header",children:[i.jsxs("h3",{children:["User Management ",i.jsxs("span",{className:"count-badge",children:[s.length," users"]})]}),i.jsx("button",{onClick:()=>c(),className:"soc-pill-btn",children:"↻"})]}),i.jsxs("div",{className:"soc-list",children:[i.jsxs("div",{className:"list-head",style:{gridTemplateColumns:"0.8fr 1.5fr 1fr 1fr 2fr"},children:[i.jsx("span",{children:"ID"}),i.jsx("span",{children:"Phone"}),i.jsx("span",{children:"Name"}),i.jsx("span",{children:"Files/Alerts"}),i.jsx("span",{children:"Actions"})]}),a?i.jsx("p",{className:"empty-state",children:"Loading users..."}):s.length===0?i.jsx("p",{className:"empty-state",children:"No users."}):s.map((L,S)=>i.jsxs("div",{className:"list-row",style:{gridTemplateColumns:"0.8fr 1.5fr 1fr 1fr 2fr"},children:[i.jsx("span",{className:"l-id",style:{fontSize:"11px"},children:L.numeric_id}),i.jsx("span",{children:L.phone}),i.jsx("span",{children:L.name}),i.jsxs("span",{className:"l-target",children:[L.files," files / ",i.jsxs("span",{className:L.alerts>0?"c-red":"",children:[L.alerts," alerts"]})]}),i.jsxs("span",{style:{display:"flex",gap:"8px"},children:[i.jsx("button",{onClick:()=>T(L.id,"reset"),className:"soc-pill-btn",style:{margin:0,fontSize:"10px"},children:"Reset Token"}),i.jsx("button",{onClick:()=>T(L.id,"suspend"),className:"soc-pill-btn danger",style:{margin:0,fontSize:"10px"},children:"Suspend"})]})]},S))]}),f&&i.jsx("div",{className:"soc-modal-overlay",style:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999},children:i.jsxs("div",{className:"soc-modal-content",style:{background:"#131220",border:"1px solid rgba(99,102,241,0.3)",padding:"24px",borderRadius:"16px",width:"350px",boxShadow:"0 10px 25px rgba(0,0,0,0.5)"},children:[i.jsxs("h3",{style:{marginTop:0,marginBottom:"16px",color:"#fff",fontSize:"14px",borderBottom:"1px solid rgba(255,255,255,0.1)",paddingBottom:"12px"},children:["ENTER ADMIN CODE TO ",f.action.toUpperCase()," USER:"]}),i.jsxs("div",{style:{position:"relative",marginBottom:"20px"},children:[i.jsx("input",{type:b?"text":"password",value:y,onChange:L=>C(L.target.value),placeholder:"Security Code...",style:{width:"100%",padding:"12px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#fff",borderRadius:"8px",boxSizing:"border-box",outline:"none",fontFamily:b?"inherit":"caption"},autoFocus:!0,onKeyDown:L=>{L.key==="Enter"&&O()}}),i.jsx("button",{onClick:()=>N(!b),style:{position:"absolute",right:"12px",top:"12px",background:"none",border:"none",color:"#9ca3af",cursor:"pointer",padding:0,fontSize:"16px"},title:b?"Hide Password":"Show Password",children:b?"👁️":"👁️‍🗨️"})]}),i.jsxs("div",{style:{display:"flex",gap:"10px",justifyContent:"flex-end"},children:[i.jsx("button",{onClick:()=>h(null),className:"soc-pill-btn danger",style:{margin:0},children:"Cancel"}),i.jsx("button",{onClick:O,className:"soc-pill-btn",style:{margin:0,background:"rgba(99,102,241,0.2)",borderColor:"#6366f1",color:"#fff"},children:"Confirm"})]})]})})]})}const mr=s=>{if(!s)return"";let a=String(s);return!a.endsWith("Z")&&!a.includes("+")&&!a.includes("-")&&(a=a.replace(" ","T"),a.endsWith("Z")||(a+="Z")),new Date(a).toLocaleString("en-IN",{timeZone:"Asia/Kolkata",day:"2-digit",month:"2-digit",year:"numeric",hour:"numeric",minute:"2-digit",hour12:!0}).toUpperCase()},vm="admin-bypass",at=be,ct={"x-admin-token":vm};function bm(){var we,He,_t,Sn,Yt,rn,En,Cn;const[s,a]=U.useState(null),[c,d]=U.useState(!0),[p,f]=U.useState(!1),[h,y]=U.useState(null),[C,b]=U.useState("mfd"),[N,T]=U.useState("activity"),[O,L]=U.useState(null),[S,k]=U.useState(""),[w,B]=U.useState(!1),[H,te]=U.useState([]),[ne,xe]=U.useState([]),[Ne,ge]=U.useState(null),[Fe,Be]=U.useState([]),[Je,st]=U.useState([]),[$e,Se]=U.useState([]),[Ee,Me]=U.useState(!1),[he,ve]=U.useState(Array(100).fill(10)),D=U.useCallback(async()=>{try{const z=await K.get(`${at}/admin/forensic-stats`,{headers:ct});a(z.data)}catch(z){console.error("Failed to fetch forensic stats:",z)}finally{d(!1)}},[]),q=U.useCallback(async(z=!1)=>{z===!0&&Me(!0);try{if(C==="recovery"){const ce=await K.get(`${at}/admin/recovery-queue`,{headers:ct});te(ce.data)}else if(C==="clickstream"){const ce=await K.get(`${at}/admin/clickstream-tracker-logs`,{headers:ct});xe(ce.data)}else if(C==="blockchain"){const ce=await K.get(`${at}/admin/blockchain-ledger`,{headers:ct});ge(ce.data)}else if(C==="ip"){const ce=await K.get(`${at}/admin/ip-threats`,{headers:ct});Be(ce.data)}else if(C==="alerts"){const ce=await K.get(`${at}/admin/unauthorized-logs`,{headers:ct});st(ce.data)}else if(C==="users"){const ce=await K.get(`${at}/admin/users`,{headers:ct});Se(ce.data)}}catch{console.error(`Failed to fetch ${C} data`)}finally{z===!0&&Me(!1)}},[C]),$=async()=>{try{const z=await K.get(`${at}/admin/recovery-queue`,{headers:ct});te(z.data)}catch{}},v=async()=>{try{const z=await K.get(`${at}/admin/clickstream-tracker-logs`,{headers:ct});xe(z.data)}catch{}};U.useEffect(()=>{N==="recovery"&&$(),N==="logins"&&v()},[N]),U.useEffect(()=>{D();const z=setInterval(D,5e3);return()=>clearInterval(z)},[D]),U.useEffect(()=>{if(C!=="mfd"){q(!0);const z=setInterval(()=>q(!1),3e3);return()=>clearInterval(z)}},[C,q]),U.useEffect(()=>{const z=setInterval(()=>{ve(ce=>{const Gt=(s==null?void 0:s.total_users)??0,Ut=(s==null?void 0:s.total_logins)??0,W=(s==null?void 0:s.encrypted_files)??0,J=(s==null?void 0:s.active_alerts)??0,de=Gt*2+Ut+W*3,ke=Math.random()*15-7.5;let Ie=Math.max(5,Math.min(100,de%80+10+ke));return(J>0||(s==null?void 0:s.blockchain_integrity)!=="INTACT")&&(Ie=80+Math.random()*20),[...ce.slice(1),Ie]})},500);return()=>clearInterval(z)},[s]);const A=async()=>{f(!0),y(null);try{const z=await K.post(`${at}/admin/system-scan`,{},{headers:ct});y(z.data),D()}catch{y({message:"Scan failed.",status:"ERROR"})}finally{f(!1)}},se=async()=>{if(window.confirm("⚠️ CONFIRM EMERGENCY LOCKDOWN? This blocks all user activity."))try{await K.post(`${at}/admin/emergency-lockdown`,{},{headers:ct}),D()}catch{alert("Command failed.")}},re=async()=>{if(window.confirm("✅ LIFT LOCKDOWN? Restores regular user access."))try{await K.post(`${at}/admin/lift-lockdown`,{},{headers:ct}),D()}catch{alert("Command failed.")}},le=async(z,ce)=>{try{await K.post(`${at}/admin/${ce}-recovery/${z}`,{},{headers:ct}),q(),D()}catch{console.error("Recovery action failed")}},ae=z=>{L(z),k(""),B(!1)},fe=async()=>{if(S!=="admin123"){alert("INVALID CODE. ACCESS DENIED."),L(null);return}try{await K.post(`${at}/admin/resolve-alert/${O}`,{},{headers:ct}),D(),C==="alerts"&&q()}catch{alert("Failed to resolve.")}L(null)};if(c)return i.jsxs("div",{className:"soc-loading",children:[i.jsx("div",{className:"soc-spinner"}),i.jsx("p",{children:"Initializing SOC Terminal..."}),i.jsx("style",{children:".soc-loading{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#05050a;color:#8b5cf6;} .soc-spinner{width:50px;height:50px;border:3px solid rgba(139,92,246,0.2);border-top:3px solid #8b5cf6;border-radius:50%;animation:spin 1s linear infinite;} @keyframes spin{to{transform:rotate(360deg);}}"})]});const ue=z=>({LOGIN:"#3b82f6",UPLOAD:"#10b981",DELETE:"#ef4444",DECRYPT_OWN:"#8b5cf6",DOWNLOAD_RAW:"#f59e0b",EMERGENCY_LOCKDOWN:"#ff0000",GLOBAL_SCAN:"#22d3ee",APPROVE_RECOVERY:"#10b981",REJECT_RECOVERY:"#ef4444",SUSPEND_USER:"#ef4444",RESET_TOKEN:"#a78bfa"})[z]||"#666";return i.jsxs("div",{className:"soc-app",children:[i.jsxs("header",{className:"soc-header",children:[i.jsxs("div",{className:"soc-header-left",children:[i.jsx("img",{src:"/logo.png",alt:"Logo",className:"soc-logo-img",onError:z=>{z.currentTarget.src="",z.currentTarget.className="soc-logo fallback-logo"}}),i.jsxs("div",{className:"soc-title-area",children:[i.jsx("h1",{children:"AuthPrivacyChain V2"}),i.jsx("p",{children:"System Command Center"})]})]}),i.jsxs("div",{className:"soc-header-right",children:[i.jsxs("div",{className:"admin-profile",children:[i.jsx("div",{className:"admin-avatar",children:"777"}),i.jsxs("div",{className:"admin-info",children:[i.jsx("span",{className:"admin-name",children:"ADM-777"}),i.jsx("span",{className:"admin-role",children:"System Admin Node"})]})]}),i.jsxs("button",{className:"soc-logout-btn",onClick:()=>window.location.reload(),children:["Logout ",i.jsx("span",{children:"→"})]})]})]}),i.jsxs("div",{className:"soc-modules-grid",children:[i.jsxs("div",{className:`soc-tab ${C==="mfd"?"active":""}`,onClick:()=>b("mfd"),children:[i.jsx("span",{className:"box-icon",children:"🛡️"})," ",i.jsx("span",{className:"box-name",children:"Master Forensic Dashboard"})]}),i.jsxs("div",{className:`soc-tab ${C==="clickstream"?"active":""}`,onClick:()=>b("clickstream"),children:[i.jsx("span",{className:"box-icon",children:"🖱️"})," ",i.jsx("span",{className:"box-name",children:"Click-Stream Tracker"})]}),i.jsxs("div",{className:`soc-tab ${C==="blockchain"?"active":""}`,onClick:()=>b("blockchain"),children:[i.jsx("span",{className:"box-icon",children:"⛓️"})," ",i.jsx("span",{className:"box-name",children:"Blockchain Ledger"})]}),i.jsxs("div",{className:`soc-tab ${C==="ip"?"active":""}`,onClick:()=>b("ip"),children:[i.jsx("span",{className:"box-icon",children:"🌍"})," ",i.jsx("span",{className:"box-name",children:"IP-Geofencing Monitor"})]}),i.jsxs("div",{className:`soc-tab ${C==="alerts"?"active":""}`,onClick:()=>b("alerts"),children:[i.jsx("span",{className:"box-icon",children:"🚨"})," ",i.jsx("span",{className:"box-name",children:"Unauthorized Access Logs"})]}),i.jsxs("div",{className:`soc-tab ${C==="users"?"active":""}`,onClick:()=>b("users"),children:[i.jsx("span",{className:"box-icon",children:"👥"})," ",i.jsx("span",{className:"box-name",children:"User Management"})]})]}),i.jsxs("div",{className:"soc-global-actions",children:[i.jsx("button",{className:"soc-pill-btn",onClick:A,disabled:p,children:p?"⟳ Scanning Network...":"⚡ Global Scan"}),s!=null&&s.system_lockdown?i.jsx("button",{className:"soc-pill-btn danger active",onClick:re,children:"✅ Lift Lockdown"}):i.jsx("button",{className:"soc-pill-btn danger",onClick:se,children:"🔒 Emergency Lockdown"})]}),i.jsxs("div",{className:"soc-main-body",children:[h&&i.jsxs("div",{className:`soc-scan-banner ${h.status==="ERROR"?"err":""}`,children:[i.jsx("span",{children:"⌁ SCAN COMPLETE"}),i.jsxs("span",{children:["Nodes: ",i.jsx("b",{children:h.nodes_scanned})]}),i.jsxs("span",{children:["Threats: ",i.jsx("b",{children:h.threats_found})]}),i.jsxs("span",{children:["Unencrypted: ",i.jsx("b",{children:h.unencrypted_files})]}),i.jsx("button",{onClick:()=>y(null),className:"banner-close",children:"✕"})]}),C==="mfd"&&i.jsxs("div",{className:"mfd-classic",children:[i.jsxs("div",{className:"classic-stats-grid",children:[i.jsxs("div",{className:`stat-card ${N==="score"?"active-stat":""}`,onClick:()=>T("score"),children:[i.jsxs("div",{className:"sc-icon-row",children:[i.jsx("span",{className:"sc-icon",style:{background:"rgba(16,185,129,0.1)",color:"#10b981"},children:"🎯"}),i.jsx("span",{className:"sc-title",children:"SECURITY SCORE"})]}),i.jsxs("div",{className:"sc-body",style:{alignItems:"center",marginTop:"10px"},children:[i.jsx("div",{className:"sc-val",style:{marginBottom:"0"},children:i.jsx("div",{className:"score-circle",style:{width:"70px",height:"70px"},children:i.jsxs("svg",{viewBox:"0 0 36 36",className:"circular-chart green",children:[i.jsx("path",{className:"circle-bg",d:"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"}),i.jsx("path",{className:"circle",strokeDasharray:`${(s==null?void 0:s.security_score)??0}, 100`,d:"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"}),i.jsx("text",{x:"18",y:"20.35",className:"percentage",style:{fontSize:"11px"},children:(s==null?void 0:s.security_score)??0})]})})}),i.jsx("span",{className:"sc-subtext",style:{color:"#10b981",marginTop:"6px"},children:"● SECURE"})]})]}),i.jsxs("div",{className:`stat-card ${N==="activity"?"active-stat":""}`,onClick:()=>T("activity"),children:[i.jsxs("div",{className:"sc-icon-row",children:[i.jsx("span",{className:"sc-icon",children:"⛓️"}),i.jsx("span",{className:"sc-title",children:"Blockchain"})]}),i.jsxs("div",{className:"sc-body",children:[i.jsx("span",{className:"sc-val",style:{color:(s==null?void 0:s.blockchain_integrity)==="INTACT"?"#10b981":"#f59e0b"},children:(s==null?void 0:s.blockchain_integrity)??"VERIFYING"}),i.jsx("span",{className:"sc-subtext",style:{color:"#818cf8"},children:"All files encrypted"})]})]}),i.jsxs("div",{className:`stat-card ${N==="users"?"active-stat":""}`,onClick:()=>T("users"),children:[i.jsxs("div",{className:"sc-icon-row",children:[i.jsx("span",{className:"sc-icon",children:"👥"}),i.jsx("span",{className:"sc-title",children:"Registered Users"})]}),i.jsxs("div",{className:"sc-body",children:[i.jsx("span",{className:"sc-val",children:(s==null?void 0:s.total_users)??0}),i.jsx("span",{className:"sc-subtext",children:"Users"})]})]}),i.jsxs("div",{className:`stat-card ${N==="files"?"active-stat":""}`,onClick:()=>T("files"),children:[i.jsxs("div",{className:"sc-icon-row",children:[i.jsx("span",{className:"sc-icon",children:"🔐"}),i.jsx("span",{className:"sc-title",children:"Encrypted Files"})]}),i.jsxs("div",{className:"sc-body",children:[i.jsxs("span",{className:"sc-val",children:[(s==null?void 0:s.encrypted_files)??0,i.jsxs("small",{style:{fontSize:"16px",color:"#6b7280"},children:["/",(s==null?void 0:s.total_files)??0]})]}),i.jsx("span",{className:"sc-subtext",children:"Files"})]})]}),i.jsxs("div",{className:`stat-card ${N==="alerts"?"active-stat":""}`,onClick:()=>T("alerts"),children:[i.jsxs("div",{className:"sc-icon-row",children:[i.jsx("span",{className:"sc-icon",children:"🚨"}),i.jsx("span",{className:"sc-title",children:"Active Alerts"})]}),i.jsxs("div",{className:"sc-body",children:[i.jsx("span",{className:"sc-val",style:{color:s!=null&&s.active_alerts&&s.active_alerts>0?"#ef4444":"#10b981"},children:(s==null?void 0:s.active_alerts)??0}),i.jsx("span",{className:"sc-subtext",children:"Threats"})]})]}),i.jsxs("div",{className:`stat-card ${N==="recovery"?"active-stat":""}`,onClick:()=>T("recovery"),children:[i.jsxs("div",{className:"sc-icon-row",children:[i.jsx("span",{className:"sc-icon",children:"🛠️"}),i.jsx("span",{className:"sc-title",children:"Recovery Queue"})]}),i.jsxs("div",{className:"sc-body",children:[i.jsx("span",{className:"sc-val",style:{color:s!=null&&s.pending_recovery_requests&&s.pending_recovery_requests>0?"#f59e0b":"#fff"},children:(s==null?void 0:s.pending_recovery_requests)??0}),i.jsx("span",{className:"sc-subtext",children:"Pending"})]})]}),i.jsxs("div",{className:`stat-card ${N==="logins"?"active-stat":""}`,onClick:()=>T("logins"),children:[i.jsxs("div",{className:"sc-icon-row",children:[i.jsx("span",{className:"sc-icon",children:"🖱️"}),i.jsx("span",{className:"sc-title",children:"Total Logins"})]}),i.jsxs("div",{className:"sc-body",children:[i.jsx("span",{className:"sc-val",children:(s==null?void 0:s.total_logins)??0}),i.jsx("span",{className:"sc-subtext",children:"History"})]})]})]}),i.jsxs("div",{className:"classic-panels-grid",children:[i.jsxs("div",{className:"soc-full-card",style:{minHeight:"400px"},children:[i.jsxs("div",{className:"card-header",style:{paddingBottom:"16px",borderBottom:"1px solid rgba(255,255,255,0.05)"},children:[i.jsxs("h3",{children:[N==="activity"&&"Recent System Activity",N==="score"&&"Security Score Details",N==="users"&&"Recently Registered Users",N==="files"&&"Encrypted File Vaults",N==="alerts"&&"Active Threats & Alerts",N==="recovery"&&"Pending Recovery Requests",N==="logins"&&"Recent Login Activity"]}),i.jsx("button",{onClick:()=>{D(),N==="recovery"&&$()},className:"soc-pill-btn",children:"↻ Refresh"})]}),i.jsxs("div",{className:"soc-list",style:{paddingTop:"16px"},children:[N==="activity"&&i.jsxs(i.Fragment,{children:[i.jsxs("div",{className:"list-head",style:{display:"flex",gap:"10px",padding:"0 12px 10px"},children:[i.jsx("span",{style:{width:"130px",textAlign:"center"},children:"Action"}),i.jsx("span",{style:{width:"120px"},children:"User ID"}),i.jsx("span",{style:{flex:1},children:"Target"}),i.jsx("span",{style:{width:"150px",textAlign:"right"},children:"Date & Time"})]}),(((we=s==null?void 0:s.recent_activity)==null?void 0:we.length)??0)===0?i.jsx("p",{className:"empty-state",children:"No recent activity."}):s==null?void 0:s.recent_activity.map((z,ce)=>i.jsxs("div",{className:"soc-list-row",style:{display:"flex",gap:"10px",background:"transparent",borderBottom:"1px dashed rgba(255,255,255,0.05)",borderRadius:0},children:[i.jsx("span",{className:"l-tag",style:{color:ue(z.action),borderColor:ue(z.action),width:"130px",textAlign:"center",background:"rgba(255,255,255,0.02)"},children:z.action}),i.jsx("span",{className:"l-user",style:{width:"120px"},children:z.actor}),i.jsx("span",{className:"l-target",style:{flex:1,color:"#6b7280",fontSize:"11px"},children:z.target!=="N/A"?`— TARGET NODE: ${z.target}`:"—"}),i.jsx("span",{className:"l-time",style:{width:"150px",textAlign:"right"},children:mr(z.timestamp)})]},ce))]}),N==="score"&&((((He=s==null?void 0:s.score_deductions)==null?void 0:He.length)??0)===0?i.jsxs("div",{className:"empty-state",children:[i.jsx("div",{style:{fontSize:"32px",marginBottom:"10px"},children:"✅"}),i.jsx("p",{children:"Score is perfect 100/100. No deductions!"})]}):s==null?void 0:s.score_deductions.map((z,ce)=>i.jsx("div",{className:"threat-card",style:{borderColor:"#ef4444"},children:i.jsx("p",{style:{margin:0,color:"#ef4444",fontWeight:700},children:z})},ce))),N==="users"&&i.jsxs(i.Fragment,{children:[i.jsxs("div",{className:"list-head",style:{display:"flex",gap:"10px",padding:"0 12px 10px"},children:[i.jsx("span",{style:{width:"150px"},children:"User ID"}),i.jsx("span",{style:{flex:1},children:"Name"}),i.jsx("span",{style:{width:"150px",textAlign:"right"},children:"Contact"})]}),(((_t=s==null?void 0:s.users_list)==null?void 0:_t.length)??0)===0?i.jsx("p",{className:"empty-state",children:"No users registered."}):(Sn=s==null?void 0:s.users_list)==null?void 0:Sn.map((z,ce)=>i.jsxs("div",{className:"soc-list-row",style:{display:"flex",gap:"10px",background:"transparent",borderBottom:"1px dashed rgba(255,255,255,0.05)",borderRadius:0},children:[i.jsx("span",{className:"l-id",style:{width:"150px"},children:z.numeric_id}),i.jsx("span",{className:"l-user",style:{flex:1},children:z.name}),i.jsx("span",{className:"l-target",style:{width:"150px",textAlign:"right"},children:z.phone})]},ce))]}),N==="files"&&i.jsxs(i.Fragment,{children:[i.jsxs("div",{className:"list-head",style:{display:"flex",gap:"10px",padding:"0 12px 10px"},children:[i.jsx("span",{style:{width:"200px"},children:"File ID"}),i.jsx("span",{style:{flex:1,textAlign:"right"},children:"Encryption Status"})]}),(((Yt=s==null?void 0:s.files_list)==null?void 0:Yt.length)??0)===0?i.jsx("p",{className:"empty-state",children:"No files uploaded."}):(rn=s==null?void 0:s.files_list)==null?void 0:rn.map((z,ce)=>i.jsxs("div",{className:"soc-list-row",style:{display:"flex",gap:"10px",background:"transparent",borderBottom:"1px dashed rgba(255,255,255,0.05)",borderRadius:0},children:[i.jsxs("span",{className:"l-id",style:{width:"200px"},children:["#",(z.file_id||"").substring(0,4)]}),i.jsx("span",{className:z.encrypted?"c-green":"c-yellow",style:{flex:1,textAlign:"right"},children:z.encrypted?"🔐 AES-256 Encrypted":"⚠️ Plain Text"})]},ce))]}),N==="alerts"&&((((En=s==null?void 0:s.live_threats)==null?void 0:En.length)??0)===0?i.jsx("p",{className:"empty-state",children:"No active alerts."}):s==null?void 0:s.live_threats.map((z,ce)=>i.jsxs("div",{className:"threat-card",children:[i.jsxs("div",{className:"t-head",children:[i.jsxs("span",{children:["ID: ",z.user_id]}),i.jsxs("div",{children:[i.jsx("span",{className:`t-sev ${(z.severity||"").toLowerCase()}`,children:z.severity}),i.jsx("button",{onClick:()=>ae(z.alert_id),className:"t-resolve",children:"✓ Resolve"})]})]}),i.jsx("p",{className:"t-msg",children:z.message}),i.jsx("p",{className:"t-time",children:mr(z.timestamp)})]},ce))),N==="recovery"&&(H.length===0?i.jsx("p",{className:"empty-state",children:"No pending recovery requests."}):H.map(z=>i.jsxs("div",{className:"threat-card",children:[i.jsxs("div",{className:"t-head",children:[i.jsxs("span",{children:["ID: ",z.user_id]})," ",i.jsx("span",{className:`t-sev ${(z.status||"").toLowerCase()}`,children:z.status})]}),i.jsxs("p",{className:"t-msg",children:["Phone: ",z.phone," | Match: ",i.jsx("span",{style:{color:z.name_match?"#10b981":"#ef4444"},children:z.name_match?"YES":"NO"})]}),z.status==="PENDING"&&i.jsxs("div",{style:{marginTop:"10px",display:"flex",gap:"10px"},children:[i.jsx("button",{onClick:()=>{le(z.request_id,"approve"),$()},className:"t-resolve",style:{borderColor:"#10b981",color:"#10b981",margin:0},children:"✓ Approve"}),i.jsx("button",{onClick:()=>{le(z.request_id,"reject"),$()},className:"t-resolve",style:{borderColor:"#ef4444",color:"#ef4444",margin:0},children:"✕ Reject"})]})]},z.request_id))),N==="logins"&&i.jsxs(i.Fragment,{children:[i.jsxs("div",{className:"list-head",style:{display:"flex",gap:"10px",padding:"0 12px 10px"},children:[i.jsx("span",{style:{width:"130px",textAlign:"center"},children:"Action"}),i.jsx("span",{style:{flex:1},children:"User ID"}),i.jsx("span",{style:{width:"150px",textAlign:"right"},children:"Date & Time"})]}),ne.filter(z=>(z.event_type||z.action)==="USER_LOGIN_SUCCESS").length===0?i.jsx("p",{className:"empty-state",children:"No recent logins."}):ne.filter(z=>(z.event_type||z.action)==="USER_LOGIN_SUCCESS").map((z,ce)=>i.jsxs("div",{className:"soc-list-row",style:{display:"flex",gap:"10px",background:"transparent",borderBottom:"1px dashed rgba(255,255,255,0.05)",borderRadius:0},children:[i.jsx("span",{className:"l-tag",style:{color:ue(z.event_type||z.action),borderColor:ue(z.event_type||z.action),width:"130px",textAlign:"center",background:"rgba(255,255,255,0.02)"},children:z.event_type||z.action}),i.jsx("span",{className:"l-user",style:{flex:1},children:z.user_id||z.actor_identity}),i.jsx("span",{className:"l-time",style:{width:"150px",textAlign:"right"},children:mr(z.timestamp)})]},ce))]})]})]}),i.jsxs("div",{className:"soc-full-card",style:{minHeight:"400px"},children:[i.jsxs("div",{className:"card-header",style:{paddingBottom:"16px",borderBottom:"1px solid rgba(255,255,255,0.05)"},children:[i.jsx("h3",{style:{color:"#f59e0b"},children:"⚠️ Live Threat Feed"}),i.jsx("span",{className:"count-badge",style:{background:"rgba(16,185,129,0.1)",color:"#10b981",border:"1px solid rgba(16,185,129,0.3)",padding:"4px 12px"},children:"Active"})]}),i.jsx("div",{className:"soc-list",style:{paddingTop:"16px"},children:(((Cn=s==null?void 0:s.live_threats)==null?void 0:Cn.length)??0)===0?i.jsxs("div",{className:"empty-state",style:{marginTop:"40px"},children:[i.jsx("div",{style:{fontSize:"32px",marginBottom:"16px",background:"#10b981",width:"48px",height:"48px",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",color:"#fff"},children:"✓"}),i.jsx("p",{children:"No active threats. System is secure."})]}):s==null?void 0:s.live_threats.map((z,ce)=>i.jsxs("div",{className:"threat-card",children:[i.jsxs("div",{className:"t-head",children:[i.jsxs("span",{children:["📡 IP: ",z.ip]}),i.jsxs("div",{children:[i.jsx("span",{className:`t-sev ${(z.severity||"").toLowerCase()}`,children:z.severity}),i.jsx("button",{onClick:()=>ae(z.alert_id),className:"t-resolve",children:"✓ Resolve"})]})]}),i.jsx("p",{className:"t-msg",children:z.message}),i.jsx("p",{className:"t-time",children:mr(z.timestamp)})]},ce))})]})]}),i.jsxs("div",{className:"soc-full-card",style:{marginTop:"24px",padding:"0",minHeight:"220px",flex:"none",position:"relative",overflow:"hidden"},children:[i.jsxs("div",{className:"card-header",style:{padding:"20px 24px 16px",position:"relative",zIndex:10},children:[i.jsx("h3",{style:{color:((s==null?void 0:s.active_alerts)??0)>0?"#ef4444":"#818cf8",textShadow:`0 0 5px ${((s==null?void 0:s.active_alerts)??0)>0?"rgba(239,68,68,0.5)":"rgba(129,140,248,0.5)"}`},children:"Global Threat Matrix & Cloud Security"}),i.jsx("span",{className:"count-badge",style:{background:((s==null?void 0:s.active_alerts)??0)>0?"rgba(239,68,68,0.1)":"rgba(99, 102, 241, 0.1)",color:((s==null?void 0:s.active_alerts)??0)>0?"#ef4444":"#818cf8",border:`1px solid ${((s==null?void 0:s.active_alerts)??0)>0?"rgba(239,68,68,0.3)":"rgba(99, 102, 241, 0.3)"}`},children:"Live Sync"})]}),i.jsxs("div",{className:"cyber-vis-container",style:{position:"absolute",top:0,left:0,right:0,bottom:0,background:"#131220",opacity:1},children:[i.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,color:((s==null?void 0:s.active_alerts)??0)>0?"rgba(239,68,68,0.08)":"rgba(99,102,241,0.08)",fontSize:"12px",fontFamily:"monospace",overflow:"hidden",whiteSpace:"pre",lineHeight:"12px",zIndex:0},children:Array.from({length:20}).map((z,ce)=>i.jsx("div",{style:{opacity:Math.random()*.5+.1},children:Array.from({length:200}).map(()=>Math.random()>.5?"1":"0").join(" ")},ce))}),i.jsxs("svg",{viewBox:"0 0 1000 220",width:"100%",height:"100%",preserveAspectRatio:"xMidYMid slice",xmlns:"http://www.w3.org/2000/svg",style:{position:"relative",zIndex:1},children:[i.jsxs("defs",{children:[i.jsxs("filter",{id:"neon-glow-intense",children:[i.jsx("feGaussianBlur",{stdDeviation:"6",result:"coloredBlur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"coloredBlur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]}),i.jsxs("filter",{id:"neon-glow",children:[i.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),i.jsxs("feMerge",{children:[i.jsx("feMergeNode",{in:"coloredBlur"}),i.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),i.jsxs("text",{x:"150",y:"40",fill:"#6366f1",fontSize:"10",fontWeight:"bold",children:["USERS: ",(s==null?void 0:s.total_users)??0]}),i.jsxs("text",{x:"850",y:"40",fill:"#6366f1",fontSize:"10",fontWeight:"bold",children:["LOGINS: ",(s==null?void 0:s.total_logins)??0]}),i.jsxs("text",{x:"500",y:"25",fill:"#818cf8",fontSize:"10",fontWeight:"bold",textAnchor:"middle",children:["FILES SECURED: ",(s==null?void 0:s.encrypted_files)??0]}),i.jsxs("g",{className:"pcb-traces",stroke:((s==null?void 0:s.active_alerts)??0)>0?"rgba(239,68,68,0.3)":"rgba(99,102,241,0.3)",strokeWidth:"3",fill:"none",strokeLinecap:"square",children:[i.jsx("path",{d:"M -50,50 L 200,50 L 250,110 L 410,110"}),i.jsx("path",{d:"M -50,150 L 150,150 L 200,110"}),i.jsx("path",{d:"M -50,180 L 250,180 L 300,130 L 410,130"}),i.jsx("path",{d:"M -50,20 L 300,20 L 350,90 L 410,90"}),i.jsx("circle",{cx:"200",cy:"50",r:"4",fill:((s==null?void 0:s.active_alerts)??0)>0?"#ef4444":"#818cf8",filter:"url(#neon-glow)"}),i.jsx("circle",{cx:"150",cy:"150",r:"4",fill:((s==null?void 0:s.active_alerts)??0)>0?"#ef4444":"#818cf8",filter:"url(#neon-glow)"}),i.jsx("circle",{cx:"250",cy:"180",r:"4",fill:((s==null?void 0:s.active_alerts)??0)>0?"#ef4444":"#818cf8",filter:"url(#neon-glow)"}),i.jsx("circle",{cx:"300",cy:"20",r:"4",fill:((s==null?void 0:s.active_alerts)??0)>0?"#ef4444":"#818cf8",filter:"url(#neon-glow)"})]}),i.jsxs("g",{stroke:((s==null?void 0:s.active_alerts)??0)>0?"#ef4444":"#818cf8",strokeWidth:"3",fill:"none",filter:"url(#neon-glow-intense)",children:[i.jsx("path",{d:"M -50,50 L 200,50 L 250,110 L 410,110",strokeDasharray:"20 600",style:{animation:`flow-dash ${Math.max(.5,3-((s==null?void 0:s.total_users)??0)*.1)}s linear infinite`}}),i.jsx("path",{d:"M -50,150 L 150,150 L 200,110",strokeDasharray:"20 500",style:{animation:`flow-dash ${Math.max(.6,4-((s==null?void 0:s.total_users)??0)*.1)}s linear infinite 0.5s`}}),i.jsx("path",{d:"M -50,180 L 250,180 L 300,130 L 410,130",strokeDasharray:"20 700",style:{animation:`flow-dash ${Math.max(.7,2.5-((s==null?void 0:s.total_users)??0)*.1)}s linear infinite 0.2s`}}),i.jsx("path",{d:"M -50,20 L 300,20 L 350,90 L 410,90",strokeDasharray:"20 500",style:{animation:`flow-dash ${Math.max(.8,3.5-((s==null?void 0:s.total_users)??0)*.1)}s linear infinite 1s`}})]}),i.jsxs("g",{className:"pcb-traces",stroke:((s==null?void 0:s.active_alerts)??0)>0?"rgba(239,68,68,0.3)":"rgba(99,102,241,0.3)",strokeWidth:"3",fill:"none",strokeLinecap:"square",children:[i.jsx("path",{d:"M 1050,50 L 800,50 L 750,110 L 590,110"}),i.jsx("path",{d:"M 1050,150 L 850,150 L 800,110"}),i.jsx("path",{d:"M 1050,180 L 750,180 L 700,130 L 590,130"}),i.jsx("path",{d:"M 1050,20 L 700,20 L 650,90 L 590,90"}),i.jsx("circle",{cx:"800",cy:"50",r:"4",fill:((s==null?void 0:s.active_alerts)??0)>0?"#ef4444":"#818cf8",filter:"url(#neon-glow)"}),i.jsx("circle",{cx:"850",cy:"150",r:"4",fill:((s==null?void 0:s.active_alerts)??0)>0?"#ef4444":"#818cf8",filter:"url(#neon-glow)"}),i.jsx("circle",{cx:"750",cy:"180",r:"4",fill:((s==null?void 0:s.active_alerts)??0)>0?"#ef4444":"#818cf8",filter:"url(#neon-glow)"}),i.jsx("circle",{cx:"700",cy:"20",r:"4",fill:((s==null?void 0:s.active_alerts)??0)>0?"#ef4444":"#818cf8",filter:"url(#neon-glow)"})]}),i.jsxs("g",{stroke:((s==null?void 0:s.active_alerts)??0)>0?"#ef4444":"#818cf8",strokeWidth:"3",fill:"none",filter:"url(#neon-glow-intense)",children:[i.jsx("path",{d:"M 1050,50 L 800,50 L 750,110 L 590,110",strokeDasharray:"20 600",style:{animation:`flow-dash ${Math.max(.5,3-((s==null?void 0:s.total_logins)??0)*.05)}s linear infinite`}}),i.jsx("path",{d:"M 1050,150 L 850,150 L 800,110",strokeDasharray:"20 500",style:{animation:`flow-dash ${Math.max(.6,4-((s==null?void 0:s.total_logins)??0)*.05)}s linear infinite 0.5s`}}),i.jsx("path",{d:"M 1050,180 L 750,180 L 700,130 L 590,130",strokeDasharray:"20 700",style:{animation:`flow-dash ${Math.max(.7,2.5-((s==null?void 0:s.total_logins)??0)*.05)}s linear infinite 0.2s`}}),i.jsx("path",{d:"M 1050,20 L 700,20 L 650,90 L 590,90",strokeDasharray:"20 500",style:{animation:`flow-dash ${Math.max(.8,3.5-((s==null?void 0:s.total_logins)??0)*.05)}s linear infinite 1s`}})]}),i.jsxs("g",{transform:"translate(500, 110)",children:[i.jsx("circle",{cx:"0",cy:"0",r:"95",fill:"none",stroke:((s==null?void 0:s.active_alerts)??0)>0?"rgba(239,68,68,0.3)":"rgba(99,102,241,0.3)",strokeWidth:"6",strokeDasharray:"20 10",style:{transformOrigin:"0px 0px",animation:`spin ${Math.max(2,20-((s==null?void 0:s.encrypted_files)??0)*.5)}s linear infinite`}}),i.jsx("circle",{cx:"0",cy:"0",r:"85",fill:"none",stroke:((s==null?void 0:s.active_alerts)??0)>0?"#ef4444":"#818cf8",strokeWidth:"4",filter:"url(#neon-glow-intense)",style:{transformOrigin:"0px 0px",animation:`spin-rev ${Math.max(3,25-((s==null?void 0:s.encrypted_files)??0)*.5)}s linear infinite`}}),i.jsx("circle",{cx:"0",cy:"0",r:"75",fill:((s==null?void 0:s.active_alerts)??0)>0?"rgba(239,68,68,0.15)":"rgba(99,102,241,0.15)",stroke:((s==null?void 0:s.active_alerts)??0)>0?"#ef4444":"#818cf8",strokeWidth:"3",filter:"url(#neon-glow)"}),i.jsxs("g",{stroke:((s==null?void 0:s.active_alerts)??0)>0?"rgba(239,68,68,0.6)":"rgba(99,102,241,0.6)",strokeWidth:"2",fill:"none",children:[i.jsx("ellipse",{cx:"0",cy:"0",rx:"35",ry:"75"}),i.jsx("ellipse",{cx:"0",cy:"0",rx:"15",ry:"75"}),i.jsx("ellipse",{cx:"0",cy:"0",rx:"75",ry:"25"}),i.jsx("ellipse",{cx:"0",cy:"0",rx:"75",ry:"45"})]}),i.jsx("path",{d:"M 0,0 L 0,-75 A 75,75 0 0,1 75,0 Z",fill:((s==null?void 0:s.active_alerts)??0)>0?"rgba(239,68,68,0.4)":"rgba(99,102,241,0.4)",style:{transformOrigin:"0px 0px",animation:`spin ${((s==null?void 0:s.active_alerts)??0)>0?1:Math.max(1.5,4-((s==null?void 0:s.pending_recovery_requests)??0)*.5)}s linear infinite`}}),i.jsx("circle",{cx:"0",cy:"0",r:"15",fill:"#131220",stroke:((s==null?void 0:s.active_alerts)??0)>0?"#ef4444":"#818cf8",strokeWidth:"2",filter:"url(#neon-glow)"}),i.jsx("text",{x:"0",y:"4",fill:((s==null?void 0:s.active_alerts)??0)>0?"#ef4444":"#818cf8",fontSize:"12",textAnchor:"middle",fontWeight:"800",children:((s==null?void 0:s.active_alerts)??0)>0?"⚠️":"SYS"})]}),i.jsx("polyline",{points:he.map((z,ce)=>`${ce*10},${220-z*1.5}`).join(" "),fill:"none",stroke:((s==null?void 0:s.active_alerts)??0)>0?"rgba(239,68,68,0.6)":"rgba(129,140,248,0.6)",strokeWidth:"2",filter:"url(#neon-glow)",strokeLinejoin:"round"})]})]})]})]}),C==="clickstream"&&i.jsx(lm,{}),C==="blockchain"&&i.jsx(dm,{}),C==="ip"&&i.jsx(xm,{}),C==="alerts"&&i.jsx(gm,{unauthLogs:Je,moduleLoading:Ee,formatDelhiTime:mr,fetchModuleData:()=>q(!0),handleAdminResolve:ae}),C==="users"&&i.jsx(ym,{usersList:$e,moduleLoading:Ee,fetchModuleData:()=>q(!0),API:at,headers:ct}),C==="recovery"&&i.jsxs("div",{className:"soc-full-card",children:[i.jsxs("div",{className:"card-header",children:[i.jsxs("h3",{children:["Emergency Recovery Control ",i.jsxs("span",{className:"count-badge",children:[H.length," requests"]})]})," ",i.jsx("button",{onClick:q,className:"soc-pill-btn",children:"↻"})]}),i.jsx("div",{className:"soc-list",children:Ee?i.jsx("p",{className:"empty-state",children:"Loading..."}):H.length===0?i.jsx("p",{className:"empty-state",children:"No pending requests."}):H.map(z=>i.jsxs("div",{className:"threat-card",children:[i.jsxs("div",{className:"t-head",children:[i.jsxs("span",{children:["ID: ",z.user_id]})," ",i.jsx("span",{className:`t-sev ${(z.status||"").toLowerCase()}`,children:z.status})]}),i.jsxs("p",{className:"t-msg",children:["Phone: ",z.phone," | Entered Name: ",z.name_entered," ",i.jsxs("span",{style:{color:z.name_match?"#10b981":"#ef4444"},children:["(",z.name_match?"Match":"Mismatch",")"]})," | DB Name: ",z.name_in_db]}),i.jsx("p",{className:"l-time",children:mr(z.timestamp)}),z.status==="PENDING"&&i.jsxs("div",{style:{marginTop:"10px",display:"flex",gap:"10px"},children:[i.jsx("button",{onClick:()=>le(z.request_id,"approve"),className:"t-resolve",style:{borderColor:"#10b981",color:"#10b981",margin:0},children:"✓ Approve"}),i.jsx("button",{onClick:()=>le(z.request_id,"reject"),className:"t-resolve",style:{borderColor:"#ef4444",color:"#ef4444",margin:0},children:"✕ Reject"})]})]},z.request_id))})]})]}),O&&i.jsx("div",{className:"soc-modal-overlay",style:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999},children:i.jsxs("div",{className:"soc-modal-content",style:{background:"#131220",border:"1px solid rgba(99,102,241,0.3)",padding:"24px",borderRadius:"16px",width:"350px",boxShadow:"0 10px 25px rgba(0,0,0,0.5)"},children:[i.jsx("h3",{style:{marginTop:0,marginBottom:"16px",color:"#fff",fontSize:"14px",borderBottom:"1px solid rgba(255,255,255,0.1)",paddingBottom:"12px"},children:"ENTER ADMIN SECURITY CODE TO RESOLVE ALERT:"}),i.jsxs("div",{style:{position:"relative",marginBottom:"20px"},children:[i.jsx("input",{type:w?"text":"password",value:S,onChange:z=>k(z.target.value),placeholder:"Security Code...",style:{width:"100%",padding:"12px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#fff",borderRadius:"8px",boxSizing:"border-box",outline:"none",fontFamily:w?"inherit":"caption"},autoFocus:!0,onKeyDown:z=>{z.key==="Enter"&&fe()}}),i.jsx("button",{onClick:()=>B(!w),style:{position:"absolute",right:"12px",top:"12px",background:"none",border:"none",color:"#9ca3af",cursor:"pointer",padding:0,fontSize:"16px"},title:w?"Hide Password":"Show Password",children:w?"👁️":"👁️‍🗨️"})]}),i.jsxs("div",{style:{display:"flex",gap:"10px",justifyContent:"flex-end"},children:[i.jsx("button",{onClick:()=>L(null),className:"soc-pill-btn danger",style:{margin:0},children:"Cancel"}),i.jsx("button",{onClick:fe,className:"soc-pill-btn",style:{margin:0,background:"rgba(99,102,241,0.2)",borderColor:"#6366f1",color:"#fff"},children:"Confirm"})]})]})}),i.jsx("style",{children:`
        .soc-app { background: #0b0a15; min-height: 100vh; width: 100%; color: #fff; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; padding: 24px; box-sizing: border-box; overflow-y: auto; }
        
        .soc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .soc-header-left { display: flex; align-items: center; gap: 16px; }
        .soc-logo { font-size: 32px; background: rgba(99, 102, 241, 0.2); width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 12px; }
        .soc-logo-img { width: 48px; height: 48px; object-fit: contain; }
        .fallback-logo::before { content: '🛡️'; }
        .soc-title-area h1 { font-size: 20px; font-weight: 800; margin: 0; letter-spacing: 0.5px; }
        .soc-title-area p { font-size: 11px; color: #8b5cf6; margin: 2px 0 0; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        
        .soc-header-right { display: flex; align-items: center; gap: 20px; }
        .admin-profile { display: flex; align-items: center; gap: 10px; }
        .admin-avatar { width: 36px; height: 36px; background: #6366f1; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px; color: #fff; box-shadow: 0 0 10px rgba(99,102,241,0.5); }
        .admin-info { display: flex; flex-direction: column; }
        .admin-name { font-size: 13px; font-weight: 700; color: #fff; line-height: 1.2; }
        .admin-role { font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; }
        
        .soc-global-actions { display: flex; gap: 12px; justify-content: flex-end; margin-bottom: 24px; }
        .soc-pill-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #ccc; padding: 10px 20px; border-radius: 20px; font-size: 13px; font-weight: 600; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .soc-pill-btn:hover { background: rgba(255,255,255,0.1); color: #fff; transform: translateY(-1px); }
        .soc-pill-btn.danger { color: #ef4444; border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.1); }
        .soc-pill-btn.danger.active { color: #10b981; border-color: rgba(16,185,129,0.3); background: rgba(16,185,129,0.1); }
        
        .soc-logout-btn { display: flex; align-items: center; gap: 8px; background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); color: #818cf8; padding: 8px 20px; border-radius: 20px; font-size: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; }
        .soc-logout-btn:hover { background: #6366f1; color: #fff; }
        
        .soc-modules-grid { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 30px; }
        .soc-tab { display: flex; align-items: center; justify-content: center; gap: 10px; background: #131220; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 14px 20px; cursor: pointer; transition: 0.3s; flex: 1; text-align: center; min-width: max-content; box-shadow: 0 4px 6px rgba(0,0,0,0.2); }
        .soc-tab:hover { background: rgba(255,255,255,0.05); border-color: rgba(99,102,241,0.3); transform: translateY(-2px); }
        .soc-tab.active { background: rgba(99,102,241,0.1); border-color: #6366f1; box-shadow: 0 4px 15px rgba(99,102,241,0.2); }
        .box-icon { font-size: 16px; display: flex; align-items: center; }
        .box-name { font-size: 13px; font-weight: 700; color: #9ca3af; transition: 0.3s; }
        .soc-tab.active .box-name { color: #fff; }

        .soc-main-body { display: flex; flex-direction: column; gap: 24px; flex: 1; }
        .count-badge { font-size: 10px; padding: 3px 8px; border-radius: 8px; background: rgba(255,255,255,0.1); color: #ccc; margin-left: 10px; vertical-align: middle; }
        
        .classic-stats-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 16px; margin-bottom: 24px; }
        .stat-card { background: #131220; border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.2); cursor: pointer; transition: 0.2s; }
        .stat-card:hover { border-color: rgba(99,102,241,0.3); transform: translateY(-2px); }
        .stat-card.active-stat { border-color: #6366f1; background: #161528; box-shadow: 0 8px 20px rgba(99,102,241,0.15); }
        .sc-icon-row { display: flex; align-items: center; gap: 8px; }
        .sc-icon { font-size: 16px; background: rgba(255,255,255,0.05); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; }
        .sc-body { display: flex; flex-direction: column; width: 100%; }
        .sc-val { font-size: 28px; font-weight: 800; color: #fff; line-height: 1; margin-bottom: 6px; }
        .sc-title { font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; }
        .sc-subtext { font-size: 10px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

        .list-head { font-size: 10px; font-weight: 700; color: #8b5cf6; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 8px; }
        .list-head span { opacity: 0.8; }
        
        .classic-panels-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; }

        .score-circle { width: 50px; height: 50px; }
        .circular-chart { display: block; margin: 0 auto; max-width: 100%; max-height: 250px; }
        .circle-bg { fill: none; stroke: rgba(255,255,255,0.05); stroke-width: 3.8; }
        .circle { fill: none; stroke-width: 2.8; stroke-linecap: round; animation: progress 1s ease-out forwards; }
        @keyframes progress { 0% { stroke-dasharray: 0 100; } }
        .circular-chart.green .circle { stroke: #10b981; }
        .percentage { fill: #fff; font-family: sans-serif; font-size: 10px; font-weight: 800; text-anchor: middle; }

        .cyber-flow-left path { animation: flow-dash 3s linear infinite; }
        .cyber-flow-left.fast path { animation-duration: 1.5s; }
        .cyber-flow-left path:nth-child(2) { animation-duration: 4s; animation-delay: 1s; }
        .cyber-flow-left path:nth-child(3) { animation-duration: 2.5s; animation-delay: 0.5s; }
        .cyber-flow-left path:nth-child(4) { animation-duration: 3.5s; animation-delay: 1.5s; }
        
        @keyframes flow-dash { 0% { stroke-dashoffset: 700; } 100% { stroke-dashoffset: 0; } }
        
        .spin-slow { transform-origin: 0px 0px; animation: spin 15s linear infinite; }
        .spin-slow-rev { transform-origin: 0px 0px; animation: spin-rev 20s linear infinite; }
        .spin-radar { transform-origin: 0px 0px; animation: spin 4s linear infinite; }
        .spin-slow.fast { animation-duration: 5s; }
        .spin-slow-rev.fast { animation-duration: 7s; }
        .spin-radar.fast { animation-duration: 1.5s; }
        
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes spin-rev { 100% { transform: rotate(-360deg); } }
        
        .mfd-grid { display: grid; grid-template-columns: 1fr 400px; gap: 24px; }
        .mfd-radar-card { background: #131220; border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 24px; display: flex; flex-direction: column; }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .card-header h3 { font-size: 14px; font-weight: 600; color: #fff; margin: 0; display: flex; align-items: center; }
        .legend { display: flex; gap: 16px; font-size: 11px; color: #9ca3af; }
        .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .dot.uncov { background: #374151; }
        .dot.cov { background: #6366f1; box-shadow: 0 0 10px #6366f1; }
        
        .radar-visual { flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px; }
        .radar-circle-bg { width: 300px; height: 300px; position: relative; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .r-ring { position: absolute; border: 1px dashed rgba(99,102,241,0.2); border-radius: 50%; }
        .r-ring.r1 { width: 100px; height: 100px; }
        .r-ring.r2 { width: 200px; height: 200px; }
        .r-ring.r3 { width: 300px; height: 300px; border-style: solid; border-color: rgba(99,102,241,0.1); background: radial-gradient(circle, transparent 40%, rgba(99,102,241,0.05) 100%); }
        .r-line { position: absolute; background: rgba(99,102,241,0.15); }
        .r-line.vert { width: 1px; height: 100%; }
        .r-line.horz { height: 1px; width: 100%; }
        .r-line.diag1 { width: 1px; height: 100%; transform: rotate(45deg); }
        .r-line.diag2 { width: 1px; height: 100%; transform: rotate(-45deg); }
        
        .radar-sweep { position: absolute; width: 150px; height: 150px; top: 0; left: 150px; background: conic-gradient(from 0deg, transparent 70%, rgba(99,102,241,0.4) 100%); transform-origin: 0% 100%; animation: radarSpin 4s linear infinite; border-right: 2px solid #818cf8; }
        @keyframes radarSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .blip { position: absolute; width: 6px; height: 6px; background: #818cf8; border-radius: 50%; box-shadow: 0 0 10px #818cf8; animation: blipFade 4s infinite; }
        .blip.b1 { top: 60px; left: 200px; animation-delay: 0.5s; }
        .blip.b2 { top: 220px; left: 80px; animation-delay: 2s; }
        .blip.b3 { top: 150px; left: 250px; animation-delay: 1s; }
        @keyframes blipFade { 0%, 10% { opacity: 1; transform: scale(1.5); } 20%, 100% { opacity: 0; transform: scale(1); } }
        
        .r-label { position: absolute; font-size: 10px; color: #9ca3af; font-weight: 500; text-align: center; width: 100px; }
        .r-label.l-top { top: -30px; left: 100px; }
        .r-label.l-right { right: -110px; top: 140px; text-align: left; }
        .r-label.l-bottom { bottom: -30px; left: 100px; }
        .r-label.l-left { left: -110px; top: 140px; text-align: right; }

        .mfd-side-column { display: flex; flex-direction: column; gap: 24px; }
        .risk-card, .customers-card { background: #131220; border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 24px; }
        .risk-total { font-size: 18px; font-weight: 700; color: #fff; }
        
        .progress-row { margin-bottom: 20px; }
        .pr-info { display: flex; justify-content: space-between; font-size: 12px; font-weight: 500; color: #d1d5db; margin-bottom: 8px; }
        .pr-bar { height: 6px; background: #1f2937; border-radius: 4px; overflow: hidden; }
        .pr-fill { height: 100%; border-radius: 4px; }
        .pr-fill.crit { background: linear-gradient(90deg, #991b1b, #ef4444); box-shadow: 0 0 10px rgba(239,68,68,0.5); }
        .pr-fill.high { background: linear-gradient(90deg, #b45309, #f59e0b); box-shadow: 0 0 10px rgba(245,158,11,0.5); }
        .pr-fill.med { background: linear-gradient(90deg, #854d0e, #eab308); }

        .soc-full-card { background: #131220; border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 24px; flex: 1; }
        .soc-list { display: flex; flex-direction: column; gap: 8px; max-height: 800px; overflow-y: auto; padding-right: 10px; }
        .soc-list::-webkit-scrollbar { width: 4px; }
        .soc-list::-webkit-scrollbar-thumb { background: #374151; border-radius: 4px; }
        .list-head { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; padding: 10px 16px; font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 8px; }
        .list-row { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; padding: 12px 16px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.02); border-radius: 12px; align-items: center; font-size: 12px; color: #d1d5db; transition: 0.2s; }
        .list-row:hover { background: rgba(255,255,255,0.05); }
        
        .soc-list-row { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(255,255,255,0.02); border-radius: 12px; margin-bottom: 8px; font-size: 12px; }
        .l-tag { padding: 4px 8px; border-radius: 6px; font-size: 10px; font-weight: 700; border: 1px solid; }
        .l-user { color: #f3f4f6; font-weight: 500; }
        .l-target { color: #9ca3af; }
        .l-time { color: #6b7280; font-family: monospace; }
        .l-id { color: #818cf8; font-family: monospace; }
        .l-hash { color: #555; font-family: monospace; font-size: 10px; }
        .c-green { color: #10b981; font-weight: 600; }
        .c-yellow { color: #f59e0b; font-weight: 600; }
        .c-red { color: #ef4444; font-weight: 600; }

        .threat-card { padding: 16px; background: rgba(239,68,68,0.05); border: 1px solid rgba(239,68,68,0.1); border-radius: 12px; margin-bottom: 10px; }
        .t-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 12px; font-weight: 700; color: #f3f4f6; }
        .t-sev { padding: 4px 10px; border-radius: 6px; font-size: 10px; text-transform: uppercase; }
        .t-sev.high { background: rgba(239,68,68,0.2); color: #ef4444; }
        .t-sev.medium { background: rgba(245,158,11,0.2); color: #f59e0b; }
        .t-sev.pending { background: rgba(245,158,11,0.2); color: #f59e0b; }
        .t-sev.approved { background: rgba(16,185,129,0.2); color: #10b981; }
        .t-sev.rejected { background: rgba(239,68,68,0.2); color: #ef4444; }
        .t-resolve { background: transparent; border: 1px solid #4b5563; color: #9ca3af; padding: 4px 12px; border-radius: 6px; font-size: 10px; font-weight: 600; cursor: pointer; margin-left: 10px; transition: 0.2s; }
        .t-resolve:hover { color: #fff; border-color: #fff; }
        .t-msg { font-size: 12px; color: #9ca3af; margin: 0 0 8px 0; }

        .empty-state { text-align: center; color: #6b7280; font-size: 12px; padding: 40px; }
        
        .soc-scan-banner { background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); padding: 12px 24px; border-radius: 12px; display: flex; align-items: center; gap: 24px; font-size: 12px; color: #10b981; }
        .soc-scan-banner.err { background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.3); color: #ef4444; }
        .banner-close { margin-left: auto; background: none; border: none; color: inherit; cursor: pointer; opacity: 0.7; }
        .banner-close:hover { opacity: 1; }
      `})]})}const vs="/logo.png";function wm(){const[s,a]=U.useState("login"),[c,d]=U.useState("user"),[p,f]=U.useState(""),[h,y]=U.useState(!1),[C,b]=U.useState(""),[N,T]=U.useState(""),[O,L]=U.useState(!1),[S,k]=U.useState(""),[w,B]=U.useState(null),[H,te]=U.useState(!1),[ne,xe]=U.useState(""),[Ne,ge]=U.useState(!1),[Fe,Be]=U.useState(!1),[Je,st]=U.useState(!1),[$e,Se]=U.useState(!1),[Ee,Me]=U.useState(""),[he,ve]=U.useState(""),[D,q]=U.useState([]),[$,v]=U.useState(null),[A,se]=U.useState(null),[re,le]=U.useState(null),ae=[{name:"Master Forensic Dashboard",icon:"🖥️",def:"A high-level view that allows the Admin to monitor the overall health and security of the entire system.",actions:["Global System Scan","Emergency Lockdown"]},{name:"Click-Stream Tracker",icon:"🖱️",def:'A detailed table that records every single "Click" and "Request" made by any user on the platform.',actions:["Start Recording","Analyze Behavior"]},{name:"Blockchain Ledger Viewer",icon:"⛓️",def:"A tool for the Admin to verify the immutable records of all file shares and access rights.",actions:["Verify Hash","Trace Transaction"]},{name:"IP-Geofencing Monitor",icon:"🌍",def:"A security map or list that flags login attempts from suspicious or unauthorized locations.",actions:["Add Blacklist IP","Update Firewall"]},{name:"Unauthorized Access Logs",icon:"⚠️",def:'A specialized report page that lists all failed attempts by "anonymous" users to access files.',actions:["Trace Origin","Export Evidence"]},{name:"User Management",icon:"👥",def:"An interface to manage user accounts and oversee system-wide security policies.",actions:["Suspend Account","Reset Token"]}],fe=[{name:"Encrypted File Vault",icon:"🔐",def:"Upload files where the system performs AES-256 encryption before data leaves the device.",actions:["Choose File","Encrypt & Upload"]},{name:"Permission Manager",icon:"🔑",def:"Grant or revoke access to files for specific users. Recorded permanently on the Blockchain.",actions:["Grant Access","Revoke Permission"]},{name:"Security Activity Feed",icon:"📜",def:"A Dashboard page where the user can see history of his own activity and who accessed their files.",actions:["Export Forensic Report","Clear History"]},{name:"Real-Time Alert Center",icon:"🚨",def:"A notification area that pops up alerts if an unauthorized user tries to click on private data.",actions:["Dismiss Alert","Block Source Device"]},{name:"Emergency Recovery Tool",icon:"🛠️",def:"Use your Master Key to recover data if you lose your account password.",actions:["Validate Master Key","Initiate Recovery"]}];U.useEffect(()=>{const W=localStorage.getItem("apc_token"),J=localStorage.getItem("apc_user"),de=localStorage.getItem("apc_role");W&&J&&(b(J),d(de),B(W),a("home"),f(fe[0].name))},[]);const ue=Ku.useRef({identity:C,token:w,role:c,view:s,activeTab:p});U.useEffect(()=>{ue.current={identity:C,token:w,role:c,view:s,activeTab:p}},[C,w,c,s,p]),U.useEffect(()=>{const W=K.interceptors.request.use(J=>{var Tt,Vn,sn;const{role:de,identity:ke,token:Ie,view:Ze,activeTab:Ke}=ue.current;if(de==="admin"||(Tt=J.url)!=null&&Tt.includes("track-click")||!["upload","encrypt","grant","revoke","resolve","recovery","decrypt","establish-link"].some(yr=>{var vr;return(vr=J.url)==null?void 0:vr.toLowerCase().includes(yr)}))return J;const Bt={user_id:ke||"ANONYMOUS",session_token:Ie||"NONE",event_type:"API_REQUEST",element_id:`${(Vn=J.method)==null?void 0:Vn.toUpperCase()} ${(sn=J.url)==null?void 0:sn.split("/").pop()}`,url_route:`/${Ze}/${Ke||""}`.replace(/\/+/g,"/")};return K.post(`${be}/track-click`,Bt).catch(()=>{}),J});return()=>K.interceptors.request.eject(W)},[]),U.useEffect(()=>{const W=de=>{var sn;const{role:ke,identity:Ie,token:Ze,view:Ke,activeTab:Ft}=ue.current;let Ae=de.target,Bt=0;for(;Ae&&Ae.tagName!=="BUTTON"&&Ae.tagName!=="DIV"&&Bt<3;)Ae.parentElement&&(Ae=Ae.parentElement),Bt++;const Tt=(((sn=Ae.innerText)==null?void 0:sn.trim())||Ae.getAttribute("aria-label")||Ae.id||Ae.tagName).substring(0,40);if(ke==="admin"&&!["BLOCKCHAIN","LEDGER","CLICK-STREAM","TRACKER","GEOFENCING","UNAUTHORIZED","LOGS","MANAGEMENT","MASTER","DASHBOARD","LOGIN"].some(br=>Tt.toUpperCase().includes(br)))return;const Vn={user_id:Ie||(ke==="admin"?"ADM-777":"ANONYMOUS"),session_token:Ze||"NONE",event_type:"CLICK",element_id:Tt,url_route:`/${Ke}/${Ft||""}`.replace(/\/+/g,"/")};K.post(`${be}/track-click`,Vn).catch(()=>{})};window.addEventListener("click",W);const J=K.interceptors.response.use(de=>de,de=>{var ke,Ie,Ze,Ke;return((ke=de.response)==null?void 0:ke.status)===403&&((Ke=(Ze=(Ie=de.response)==null?void 0:Ie.data)==null?void 0:Ze.message)!=null&&Ke.includes("GEOFENCE_BLOCK"))&&Be(!0),Promise.reject(de)});return()=>{window.removeEventListener("click",W),K.interceptors.response.eject(J)}},[]);const we=async()=>{try{const W=await K.get(`${be}/public-ledger`);q(W.data)}catch(W){console.error("Failed to fetch ledger files",W)}},He=async W=>{try{const J=await K.post(`${be}/hack-attempt`,{file_id:W});v({filename:J.data.filename||"UNKNOWN_FILE",owner:J.data.owner_display||"UNKNOWN"})}catch(J){console.error("Hack attempt log failed",J),v({filename:"UNKNOWN_FILE",owner:"UNKNOWN"})}};U.useEffect(()=>{Ne&&we()},[Ne]);const _t=W=>{localStorage.setItem("apc_token",W.token),localStorage.setItem("apc_role",W.role||"user"),localStorage.setItem("apc_user",W.identity),B(W.token),b(W.identity),d(W.role||"user"),a("home"),W.forceTab?f(W.forceTab):f(fe[0].name)},Sn=W=>{W.target.files&&se(W.target.files[0])},Yt=async()=>{if(!A)return alert("Please select a file first!");const W=new FormData;W.append("file",A);const J=localStorage.getItem("apc_token");try{const de=await K.post(`${be}/encrypt`,W,{headers:{"Content-Type":"multipart/form-data","x-access-token":J}});le(de.data),alert(`File AES-256 Encryption Complete. ID: ${de.data.file_id}`)}catch{alert("Encryption Failed. Ensure you are logged in.")}},rn=()=>{if(!re)return;const W=new Blob([re.encrypted_data],{type:"text/plain"}),J=window.URL.createObjectURL(W),de=document.createElement("a");de.href=J,de.download=`ENC_${(A==null?void 0:A.name)||"vault_data"}.enc`,de.click(),window.URL.revokeObjectURL(J)},En=async()=>{if(re)try{const W=await K.post(`${be}/decrypt`,{encrypted_data:re.encrypted_data,iv:re.iv}),J=atob(W.data.decrypted_data),de=new Array(J.length);for(let Ke=0;Ke<J.length;Ke++)de[Ke]=J.charCodeAt(Ke);const ke=new Uint8Array(de),Ie=new Blob([ke]),Ze=URL.createObjectURL(Ie);window.open(Ze,"_blank")}catch{alert("Decryption failed!")}},Cn=async W=>{var J,de;if(W.preventDefault(),!(!Ee||!he))try{const ke=await K.post(`${be}/request-recovery`,{name:Ee,masterKey:he});ke.status===200?(_t(ke.data),Se(!1),Me(""),ve("")):ke.status===202?alert("⏳ Your recovery request is still pending Admin approval. Please try again after Admin approves it."):ke.status===201&&(alert(`✅ Recovery Request sent to Admin queue!

Once the Admin approves your request, come back here and submit again to auto-login.`),Se(!1),Me(""),ve(""))}catch(ke){alert(((de=(J=ke.response)==null?void 0:J.data)==null?void 0:de.message)||"Invalid Master Key or Name. Please check and try again.")}},z=async W=>{var de,ke,Ie,Ze,Ke,Ft;if(W.preventDefault(),c==="admin"&&(s==="login"||s==="signup"))if(C==="ADM-777"&&N==="admin123"){_t({role:"admin",identity:"ADM-777",token:"admin-bypass"});return}else{y(!0);return}if(s==="signup"&&!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/.test(N)){alert("SECURITY RISK: Password must contain at least one uppercase letter, one lowercase letter, and one special character.");return}const J=s==="signup"?"/register":"/login";try{const Ae=await K.post(`${be}${J}`,{userID:C,password:N,legalName:S});s==="signup"?(xe(Ae.data.masterKey),te(!0)):_t(Ae.data)}catch(Ae){console.error("Auth Error:",Ae),((de=Ae.response)==null?void 0:de.status)===403?(Ze=(Ie=(ke=Ae.response)==null?void 0:ke.data)==null?void 0:Ie.message)!=null&&Ze.includes("LOCKDOWN")?st(!0):Be(!0):alert(((Ft=(Ke=Ae.response)==null?void 0:Ke.data)==null?void 0:Ft.message)||"Connection Failed! Is the backend server running?")}},ce=()=>{localStorage.removeItem("apc_token"),localStorage.removeItem("apc_role"),localStorage.removeItem("apc_user"),a("login"),b(""),T(""),B(null)},Gt=c==="admin"?ae:fe,Ut=Gt.find(W=>W.name===p)||Gt[0];if(h)return i.jsxs("div",{className:"denied-overlay",children:[i.jsx("div",{className:"cyber-grid-bg-red"}),i.jsxs("div",{className:"denied-card",children:[i.jsx("div",{className:"denied-icon",children:"🛑"}),i.jsx("h1",{className:"denied-title",children:"CRITICAL ACCESS VIOLATION"}),i.jsx("div",{className:"denied-divider"}),i.jsxs("p",{className:"denied-text",children:["Unauthorized identity detected. This terminal is reserved for ",i.jsx("span",{className:"highlight",children:"ADMINISTRATOR LEVEL 7"})," clearance only."]}),i.jsxs("div",{className:"denied-meta",children:[i.jsxs("p",{children:["TRACE ID: ",Math.random().toString(16).slice(2,10).toUpperCase()]}),i.jsx("p",{children:"STATUS: ATTEMPT LOGGED & ENCRYPTED"})]}),i.jsx("button",{onClick:()=>{y(!1),d("user")},className:"denied-btn",children:"RETURN TO USER GATEWAY"})]}),i.jsx("style",{children:`
          .denied-overlay { height: 100vh; background: #080000; display: flex; align-items: center; justify-content: center; font-family: sans-serif; position: relative; overflow: hidden; z-index: 9999; }
          .cyber-grid-bg-red { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px); background-size: 40px 40px; }
          .denied-card { z-index: 100; background: rgba(15, 0, 0, 0.95); border: 2px solid #ff0000; padding: 60px; border-radius: 40px; text-align: center; max-width: 480px; box-shadow: 0 0 50px rgba(255,0,0,0.2); border-bottom: 8px solid #ff0000; }
          .denied-icon { font-size: 60px; margin-bottom: 20px; animation: pulse 1.5s infinite; }
          .denied-title { color: #ff3333; font-weight: 900; letter-spacing: 2px; font-size: 24px; margin-bottom: 10px; }
          .denied-divider { height: 1px; background: #ff0000; width: 50px; margin: 20px auto; opacity: 0.5; }
          .denied-text { color: #888; line-height: 1.6; font-size: 14px; margin-bottom: 30px; }
          .highlight { color: #fff; font-weight: bold; }
          .denied-meta { background: #000; padding: 15px; border-radius: 12px; font-family: monospace; font-size: 10px; color: #555; text-align: left; margin-bottom: 30px; border: 1px solid #222; }
          .denied-btn { width: 100%; padding: 18px; border-radius: 20px; border: 2px solid #ff3333; background: transparent; color: #ff3333; font-weight: 900; cursor: pointer; transition: 0.3s; }
          .denied-btn:hover { background: #ff3333; color: #fff; }
          @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        `})]});if(s==="login"||s==="signup")return i.jsxs(i.Fragment,{children:[Fe&&i.jsxs("div",{className:"geofence-shield-overlay",children:[i.jsx("div",{className:"cyber-grid-red"}),i.jsx("div",{className:"cyber-grid-blue"}),i.jsx("div",{className:"laser-scanner-red"}),i.jsx("div",{className:"laser-scanner-blue"}),i.jsxs("div",{className:"shield-container",children:[i.jsx("div",{className:"shield-glow-ring"}),i.jsxs("div",{className:"shield-icon-wrap",children:[i.jsx("img",{src:vs,alt:"Security Logo",className:"shield-main-icon-img"}),i.jsx("div",{className:"shield-scanner-line"})]}),i.jsxs("div",{className:"shield-content",children:[i.jsx("h1",{className:"shield-title",children:"PERIMETER BREACH"}),i.jsxs("div",{className:"shield-separator",children:[i.jsx("div",{className:"sep-red"}),i.jsx("div",{className:"sep-blue"})]}),i.jsxs("p",{className:"shield-msg",children:[i.jsx("span",{className:"glitch-text","data-text":"ACCESS DENIED",children:"ACCESS DENIED"}),i.jsx("br",{}),"NODE LOCATION: ",i.jsx("span",{style:{color:"#ef4444"},children:"FOREIGN_ZONE"}),i.jsx("br",{}),"Your connection was intercepted by the Indian Geographic Firewall."]}),i.jsxs("div",{className:"forensic-meta",children:[i.jsxs("div",{className:"meta-item",children:[i.jsx("span",{className:"m-label",children:"PROTOCOL"}),i.jsx("span",{className:"m-val",children:"GEO-BLOCK"})]}),i.jsxs("div",{className:"meta-item",children:[i.jsx("span",{className:"m-label",children:"ORIGIN"}),i.jsx("span",{className:"m-val red",children:"BLOCKED"})]})]}),i.jsx("button",{className:"shield-dismiss-btn",onClick:()=>Be(!1),children:"ACKNOWLEDGE SECURITY PROTOCOL"})]})]})]}),Je&&i.jsxs("div",{className:"geofence-shield-overlay",style:{background:"#1a0505"},children:[i.jsx("div",{className:"cyber-grid-red"}),i.jsxs("div",{className:"shield-container",children:[i.jsx("div",{className:"shield-icon-wrap",style:{borderColor:"#ff0000",boxShadow:"0 0 50px rgba(255,0,0,0.5)"},children:i.jsx("span",{style:{fontSize:"60px",animation:"pulse 1.5s infinite"},children:"🔒"})}),i.jsxs("div",{className:"shield-content",children:[i.jsx("h1",{className:"shield-title",style:{color:"#ff0000",textShadow:"0 0 20px #ff0000"},children:"SYSTEM LOCKDOWN ACTIVE"}),i.jsx("div",{className:"shield-separator",children:i.jsx("div",{className:"sep-red",style:{width:"100%"}})}),i.jsxs("p",{className:"shield-msg",style:{color:"#fff",fontSize:"18px",fontWeight:"bold"},children:["Administrator has initiated an Emergency Lockdown.",i.jsx("br",{}),i.jsx("br",{}),i.jsx("span",{style:{color:"#ef4444"},children:"ALL LOGINS ARE TEMPORARILY DISABLED."})]}),i.jsx("button",{className:"shield-dismiss-btn",onClick:()=>st(!1),style:{borderColor:"#ff0000",color:"#ff0000",marginTop:"30px"},children:"CLOSE"})]})]})]}),Ne&&i.jsxs("div",{style:{position:"fixed",inset:0,zIndex:99999,background:"#080808",display:"flex",flexDirection:"column",fontFamily:"sans-serif"},children:[$&&i.jsxs("div",{style:{position:"absolute",top:"30px",left:"50%",transform:"translateX(-50%)",zIndex:100001,background:"#0a0000",border:"2px solid #ef4444",borderRadius:"20px",padding:"30px 40px",minWidth:"480px",boxShadow:"0 0 80px rgba(239,68,68,0.4)",textAlign:"center",animation:"shake 0.3s ease"},children:[i.jsx("div",{style:{fontSize:"40px",marginBottom:"10px"},children:"🚨"}),i.jsx("div",{style:{color:"#ef4444",fontSize:"16px",fontWeight:900,letterSpacing:"3px",marginBottom:"12px"},children:"INFILTRATION INTERCEPTED"}),i.jsxs("div",{style:{color:"#666",fontSize:"12px",lineHeight:2,fontWeight:600},children:["File ",i.jsxs("span",{style:{color:"#fff",fontWeight:800},children:["'",$.filename,"'"]})," targeted",i.jsx("br",{}),"Owner ",i.jsxs("span",{style:{color:"#ef4444",fontWeight:800},children:["#",$.owner]})," has been alerted",i.jsx("br",{}),i.jsx("span",{style:{color:"#333",fontSize:"11px"},children:"Admin has been notified. Attempt logged."})]}),i.jsx("button",{onClick:()=>v(null),style:{marginTop:"20px",background:"#ef4444",color:"#fff",border:"none",padding:"12px 32px",borderRadius:"14px",fontWeight:800,cursor:"pointer",fontSize:"11px",letterSpacing:"2px"},children:"ACKNOWLEDGE"})]}),i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"28px 48px",borderBottom:"1px solid #1a1a1a"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[i.jsx("span",{style:{fontSize:"22px"},children:"🌐"}),i.jsxs("div",{children:[i.jsx("div",{style:{color:"#2563eb",fontSize:"11px",fontWeight:900,letterSpacing:"3px"},children:"// LIVE NETWORK LEDGER"}),i.jsx("div",{style:{color:"#fff",fontSize:"22px",fontWeight:900,letterSpacing:"-0.5px"},children:"PUBLIC NODE DIRECTORY"})]}),i.jsxs("div",{style:{marginLeft:"24px",display:"flex",alignItems:"center",gap:"8px"},children:[i.jsx("span",{style:{width:"8px",height:"8px",borderRadius:"50%",background:"#2563eb",display:"inline-block",animation:"pulse 1.5s infinite"}}),i.jsxs("span",{style:{color:"#2563eb",fontSize:"10px",fontWeight:900,letterSpacing:"1px"},children:[D.length," NODES ONLINE"]})]})]}),i.jsx("button",{onClick:()=>{ge(!1),v(null)},style:{background:"#111",border:"1px solid #222",color:"#666",cursor:"pointer",fontSize:"18px",borderRadius:"14px",width:"42px",height:"42px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800},children:"✖"})]}),i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"150px 1fr 200px 160px",padding:"14px 48px",borderBottom:"1px solid #111",fontSize:"9px",color:"#2563eb",fontWeight:900,letterSpacing:"2px"},children:[i.jsx("span",{children:"NODE_ID"}),i.jsx("span",{children:"ENCRYPTED_FILENAME"}),i.jsx("span",{children:"STATUS"}),i.jsx("span",{style:{textAlign:"right"},children:"ACTION"})]}),i.jsx("div",{style:{flex:1,overflowY:"auto",padding:"12px 36px"},children:!D||D.length===0?i.jsx("div",{style:{textAlign:"center",color:"#333",marginTop:"80px",fontSize:"12px",fontWeight:700,letterSpacing:"2px"}}):D.map((W,J)=>{var de,ke,Ie;return i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"150px 1fr 200px 160px",alignItems:"center",padding:"20px 12px",borderRadius:"18px",marginBottom:"8px",background:"rgba(255,255,255,0.01)",border:"1px solid #111"},children:[i.jsx("span",{style:{color:"#2563eb",fontSize:"11px",fontFamily:"monospace",fontWeight:900},children:W.fake_id||"#UNKNOWN"}),i.jsxs("div",{children:[i.jsxs("div",{style:{color:"#fff",fontSize:"13px",fontWeight:700},children:["■".repeat(Math.min(((de=W.filename)==null?void 0:de.length)||8,12))," [ENCRYPTED]"]}),i.jsxs("div",{style:{color:"#333",fontSize:"10px",marginTop:"4px",fontWeight:700,letterSpacing:"1px"},children:["AES-256 • ",((Ie=(ke=W.filename)==null?void 0:ke.split(".").pop())==null?void 0:Ie.toUpperCase())||"BIN"]})]}),i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[i.jsx("span",{style:{width:"6px",height:"6px",borderRadius:"50%",background:"#2563eb",display:"inline-block"}}),i.jsx("span",{style:{color:"#2563eb",fontSize:"10px",fontWeight:900,letterSpacing:"1px"},children:"SECURED_NODE"})]}),i.jsx("div",{style:{display:"flex",justifyContent:"flex-end"},children:i.jsx("button",{onClick:()=>He(W.id),style:{background:"none",border:"1px solid #ef4444",color:"#ef4444",padding:"10px 20px",borderRadius:"14px",fontSize:"10px",fontWeight:800,cursor:"pointer",letterSpacing:"1px"},children:"INFILTRATE"})})]},W.id||J)})}),i.jsxs("div",{style:{padding:"18px 48px",borderTop:"1px solid #111",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[i.jsx("span",{style:{color:"#1f1f1f",fontSize:"10px",fontWeight:700,letterSpacing:"1px"},children:"AuthPrivacyChain V2 • Quantum-Secured Network"}),i.jsx("span",{style:{color:"#1f1f1f",fontSize:"10px",fontWeight:700,letterSpacing:"1px"},children:"All infiltration attempts are logged and reported"})]}),i.jsx("style",{children:`
              @keyframes shake { 0%,100%{transform:translateX(-50%)} 20%{transform:translateX(calc(-50% - 8px))} 40%{transform:translateX(calc(-50% + 8px))} 60%{transform:translateX(calc(-50% - 4px))} 80%{transform:translateX(calc(-50% + 4px))} }
              @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
            `})]}),i.jsxs("div",{className:"main-portal",children:[i.jsx("div",{className:"cyber-grid-bg"}),i.jsxs("button",{type:"button",className:"top-right-ledger-btn",onClick:()=>ge(!0),children:[i.jsx("span",{className:"pulse-dot"})," LIVE NETWORK LEDGER"]}),i.jsxs("div",{className:"cloud-container",children:[i.jsx("div",{className:"asset-cloud c1",children:"☁️"}),i.jsx("div",{className:"asset-cloud c2",children:"☁️"}),i.jsx("div",{className:"asset-cloud c3",children:"☁️"})]}),i.jsxs("div",{className:"auth-card",children:[i.jsx("div",{className:"logo-center-box",children:i.jsx("img",{src:vs,alt:"Brand Logo",className:"brand-logo-main"})}),i.jsxs("h1",{children:["AuthPrivacyChain ",i.jsx("span",{children:"V2"})]}),i.jsx("p",{className:"status-label",children:"QUANTUM GATEWAY ACTIVE"}),i.jsxs("div",{className:"toggle-switcher",children:[i.jsx("div",{className:`switch-pill ${c==="admin"?"pos-admin":"pos-user"}`}),i.jsx("button",{type:"button",className:c==="user"?"active":"",onClick:()=>{d("user"),b(""),T("")},children:"USER GATEWAY"}),i.jsx("button",{type:"button",className:c==="admin"?"active":"",onClick:()=>{d("admin"),b(""),T(""),a("login")},children:"ADMIN MODE"})]}),i.jsxs("form",{onSubmit:z,children:[s==="signup"&&i.jsxs("div",{className:"cyber-field",children:[i.jsx("label",{children:"FULL LEGAL IDENTITY"}),i.jsx("input",{type:"text",placeholder:"Enter Name...",required:!0,value:S,onChange:W=>k(W.target.value),autoComplete:"off"})]}),i.jsxs("div",{className:"cyber-field",children:[i.jsx("label",{children:c==="admin"?"ADMINISTRATOR TOKEN":s==="signup"?"PHONE NUMBER":"UNIQUE ID"}),i.jsx("input",{type:"text",placeholder:c==="admin"?"ADM-777":s==="signup"?"91XXXXXXXXXX":"Enter ID...",required:!0,value:C,onChange:W=>b(W.target.value),autoComplete:"off"})]}),i.jsxs("div",{className:"cyber-field",children:[i.jsx("label",{children:"ENCRYPTION PASSPHRASE"}),i.jsxs("div",{style:{position:"relative",display:"flex",alignItems:"center"},children:[i.jsx("input",{type:O?"text":"password",placeholder:"••••••••",required:!0,value:N,onChange:W=>T(W.target.value),autoComplete:"off",style:{flex:1,paddingRight:"40px"}}),i.jsx("button",{type:"button",onClick:()=>L(!O),style:{position:"absolute",right:"15px",background:"none",border:"none",color:"#6b7280",cursor:"pointer",fontSize:"14px",padding:0},children:O?"👁️‍🗨️":"👁️"})]})]}),i.jsx("button",{type:"submit",className:"cyber-btn",children:s==="login"?"ESTABLISH LINK":"CREATE ACCOUNT"}),i.jsx("div",{className:"auth-footer-links",children:c==="user"&&i.jsxs(i.Fragment,{children:[i.jsx("button",{type:"button",className:"signup-link",onClick:()=>{a(s==="login"?"signup":"login"),b(""),T("")},children:s==="login"?"// New here? Join the family.":"// Back to Login"}),i.jsx("button",{type:"button",className:"v1-shortcut",onClick:()=>Se(!0),children:"[ MASTER KEY ] QUICK ACCESS"})]})})]})]}),i.jsx("style",{children:`
            .main-portal { min-height: 100vh; background: #02040a; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden; font-family: sans-serif; }
            .cyber-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(37,99,235,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.12) 1px, transparent 1px); background-size: 50px 50px; z-index: 1; }
            .cloud-container { position: fixed; inset: 0; z-index: 5; pointer-events: none; }
            .asset-cloud { position: absolute; display: flex; align-items: center; justify-content: center; font-size: 280px; opacity: 0.8; user-select: none; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5)); z-index: 5; }
            .c1 { top: 5%; left: 5%; transform: rotate(-15deg); animation: float 12s infinite alternate ease-in-out; }
            .c2 { bottom: 10%; right: 8%; font-size: 350px; transform: rotate(10deg); animation: float 18s infinite alternate-reverse ease-in-out; }
            .c3 { top: 20%; right: 20%; font-size: 150px; opacity: 0.5; transform: rotate(5deg); animation: float 25s infinite alternate ease-in-out; }
            @keyframes float { from { transform: translate(0, 0) rotate(-5deg); } to { transform: translate(30px, -20px) rotate(5deg); } }
            .auth-card { width: 100%; max-width: 440px; background: rgba(10, 10, 10, 0.85); backdrop-filter: blur(25px); border: 1px solid rgba(255,255,255,0.1); border-radius: 44px; padding: 55px; z-index: 10; text-align: center; color: white; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
            .logo-center-box { display: flex; justify-content: center; margin-bottom: 20px; }
            .brand-logo-main { width: 90px; height: 90px; object-fit: contain; }
            h1 { font-size: 26px; font-weight: 900; margin: 0; } h1 span { color: #3b82f6; }
            .status-label { font-size: 9px; letter-spacing: 5px; color: #3b82f6; margin-bottom: 40px; font-weight: 900; }
            .toggle-switcher { display: flex; background: #000; padding: 5px; border-radius: 18px; margin-bottom: 35px; border: 1px solid rgba(255,255,255,0.04); position: relative; }
            .toggle-switcher button { flex: 1; padding: 12px; background: transparent; border: none; font-size: 10px; font-weight: 900; color: #4b5563; z-index: 2; cursor: pointer; }
            .toggle-switcher button.active { color: #fff; }
            .switch-pill { position: absolute; top: 5px; bottom: 5px; width: calc(50% - 5px); background: #2563eb; border-radius: 14px; transition: 0.5s; }
            .pos-admin { left: 50%; } .pos-user { left: 5px; }
            .cyber-field { text-align: left; margin-bottom: 22px; }
            .cyber-field label { display: block; font-size: 9px; font-weight: 800; color: #64748b; margin-bottom: 10px; margin-left: 15px; }
            .cyber-field input { width: 100%; padding: 18px 24px; border-radius: 20px; background: #000; border: 1px solid rgba(255,255,255,0.08); color: #fff; outline: none; box-sizing: border-box; }
            .cyber-btn { width: 100%; padding: 18px; border-radius: 20px; border: none; background: #fff; color: #000; font-weight: 900; cursor: pointer; font-size: 11px; }
            .auth-footer-links { margin-top: 25px; display: flex; flex-direction: column; gap: 12px; }
            .signup-link, .v1-shortcut { background: none; border: none; font-size: 10px; font-weight: 900; cursor: pointer; }
            .signup-link { color: #4b5563; } .v1-shortcut { color: #3b82f6; }
            .master-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; z-index: 1000; }
            .master-modal-card { background: #0a0a0a; border: 2px solid #2563eb; padding: 40px; border-radius: 30px; text-align: center; max-width: 400px; color: white; }
            .key-display { background: #000; color: #3b82f6; padding: 20px; font-family: monospace; border-radius: 10px; margin: 20px 0; border: 1px dashed #333; font-size: 18px; font-weight: bold; word-break: break-all; }
            .top-right-ledger-btn { position: absolute; top: 30px; right: 40px; background: transparent; border: none; color: #22c55e; padding: 12px 24px; font-weight: 900; cursor: pointer; z-index: 100; font-size: 15px; letter-spacing: 1px; display: flex; align-items: center; }
            .pulse-dot { display: inline-block; width: 12px; height: 12px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 10px #22c55e, 0 0 20px #22c55e; margin-right: 12px; animation: pulse-dot-anim 1.5s infinite; }
            @keyframes pulse-dot-anim { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
            
            .geofence-shield-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 10000000 !important; background: #000 !important; display: flex; align-items: center; justify-content: center; overflow: hidden; font-family: 'Inter', sans-serif; }
            .cyber-grid-red { position: absolute; inset: 0; background-image: linear-gradient(rgba(239, 68, 68, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.2) 1px, transparent 1px); background-size: 40px 40px; animation: grid-pulse-red 3s infinite alternate; z-index: 1; }
            .cyber-grid-blue { position: absolute; inset: 0; background-image: linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px); background-size: 45px 45px; animation: grid-pulse-blue 4s infinite alternate-reverse; z-index: 2; }
            @keyframes grid-pulse-red { from { opacity: 0.2; transform: scale(1); } to { opacity: 0.6; transform: scale(1.05); } }
            @keyframes grid-pulse-blue { from { opacity: 0.2; transform: scale(1); } to { opacity: 0.6; transform: scale(1.1); } }
            .laser-scanner-red { position: absolute; width: 200%; height: 2px; background: rgba(239, 68, 68, 0.8); box-shadow: 0 0 20px #ef4444; top: 30%; left: -50%; transform: rotate(-5deg); animation: laser-scan-v 4s infinite linear; z-index: 5; }
            .laser-scanner-blue { position: absolute; width: 200%; height: 2px; background: rgba(59, 130, 246, 0.8); box-shadow: 0 0 20px #3b82f6; top: 60%; left: -50%; transform: rotate(5deg); animation: laser-scan-v 5s infinite linear reverse; }
            @keyframes laser-scan-v { 0% { top: -10%; } 100% { top: 110%; } }
            .shield-container { position: relative; z-index: 30000000 !important; display: flex; flex-direction: column; align-items: center; gap: 30px; }
            .shield-glow-ring { position: absolute; width: 400px; height: 400px; border: 2px solid rgba(59, 130, 246, 0.1); border-radius: 50%; animation: ring-pulse 2s infinite; }
            @keyframes ring-pulse { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.5); opacity: 0; } }
            .shield-icon-wrap { position: relative; width: 120px; height: 120px; background: rgba(255,255,255,0.03); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 0 30px rgba(59,130,246,0.2); }
            .shield-main-icon-img { width: 80px; height: 80px; object-fit: contain; filter: drop-shadow(0 0 20px rgba(59,130,246,0.8)); }
            .shield-scanner-line { position: absolute; width: 100%; height: 2px; background: #3b82f6; box-shadow: 0 0 10px #3b82f6; top: 0; animation: scan-shield 2s infinite ease-in-out; }
            @keyframes scan-shield { 0%, 100% { top: 10%; } 50% { top: 90%; } }
            .shield-content { text-align: center; }
            .shield-title { font-size: 42px; font-weight: 900; letter-spacing: 4px; margin: 0; color: #fff; text-shadow: 0 0 10px rgba(255,255,255,0.3); }
            .shield-separator { display: flex; height: 4px; width: 100%; max-width: 300px; margin: 15px auto; }
            .sep-red { flex: 1; background: #ef4444; box-shadow: 0 0 10px #ef4444; }
            .sep-blue { flex: 1; background: #3b82f6; box-shadow: 0 0 10px #3b82f6; }
            .shield-msg { color: #888; font-size: 14px; line-height: 1.8; letter-spacing: 1px; }
            .glitch-text { font-size: 24px; font-weight: 900; color: #ef4444; position: relative; display: inline-block; }
            .glitch-text::before, .glitch-text::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000; }
            .glitch-text::before { left: 2px; text-shadow: -2px 0 #3b82f6; animation: glitch 2s infinite linear alternate-reverse; }
            .glitch-text::after { left: -2px; text-shadow: 2px 0 #ef4444; animation: glitch 3s infinite linear alternate-reverse; }
            @keyframes glitch { 0% { clip: rect(44px, 450px, 56px, 0); } 20% { clip: rect(12px, 450px, 89px, 0); } 40% { clip: rect(67px, 450px, 34px, 0); } 60% { clip: rect(89px, 450px, 12px, 0); } 80% { clip: rect(34px, 450px, 67px, 0); } 100% { clip: rect(56px, 450px, 44px, 0); } }
            .forensic-meta { display: flex; gap: 20px; justify-content: center; margin: 20px 0; }
            .meta-item { display: flex; flex-direction: column; background: rgba(255,255,255,0.02); padding: 10px 20px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); }
            .m-label { font-size: 9px; color: #555; font-weight: 800; letter-spacing: 1px; }
            .m-val { font-size: 12px; color: #fff; font-weight: 700; margin-top: 4px; }
            .m-val.red { color: #ef4444; }
            .shield-dismiss-btn { background: none; border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 12px 30px; border-radius: 4px; font-size: 11px; font-weight: 800; letter-spacing: 2px; cursor: pointer; transition: 0.3s; }
            .shield-dismiss-btn:hover { background: #fff; color: #000; box-shadow: 0 0 20px rgba(255,255,255,0.3); }

            @media (max-width: 768px) {
             .asset-cloud { display: none !important; }
             .auth-card { max-width: 90% !important; padding: 30px 20px !important; border-radius: 24px !important; margin: 20px auto; }
             .top-right-ledger-btn { position: relative !important; top: auto !important; right: auto !important; margin: 15px auto 0 !important; font-size: 11px !important; padding: 8px 16px !important; order: -1; }
             .main-portal { justify-content: flex-start !important; padding: 20px 10px !important; min-height: 100vh !important; }
             .toggle-switcher { margin-bottom: 20px !important; }
             .cyber-field { margin-bottom: 15px !important; }
             .cyber-field input { padding: 14px 18px !important; font-size: 13px !important; border-radius: 12px !important; }
             .cyber-btn { padding: 14px !important; font-size: 11px !important; border-radius: 12px !important; }
             
             .dash-container { flex-direction: column !important; height: auto !important; min-height: 100vh !important; overflow-y: auto !important; }
             .sidebar-cyber { width: 100% !important; border-right: none !important; border-bottom: 1px solid #1a1a1a !important; padding: 20px !important; box-sizing: border-box !important; }
             .sidebar-header { margin-bottom: 20px !important; }
             .main-content { padding: 20px 15px !important; box-sizing: border-box !important; width: 100% !important; }
             .module-title-big { font-size: 28px !important; margin-bottom: 10px !important; }
             .module-definition-big { font-size: 14px !important; }
             .forensic-grid { flex-direction: column !important; height: auto !important; gap: 20px !important; }
             .visualizer-box { min-height: 450px !important; border-radius: 24px !important; padding: 15px !important; width: 100% !important; box-sizing: border-box !important; }
             .telemetry-card { border-radius: 24px !important; padding: 20px !important; width: 100% !important; box-sizing: border-box !important; }
             .floating-dock-sleek { position: fixed !important; bottom: 15px !important; width: 92% !important; border-radius: 16px !important; }
             .dock-item-sleek { font-size: 18px !important; padding: 8px !important; }
             .shield-title { font-size: 24px !important; }
             .shield-container { width: 90% !important; gap: 15px !important; }
             .shield-icon-wrap { width: 80px !important; height: 80px !important; }
             .shield-main-icon-img { width: 50px !important; height: 50px !important; }
             .shield-msg { font-size: 13px !important; }
             .home-content-centered h1 { font-size: 24px !important; }
           }
          `})]}),H&&i.jsx("div",{className:"master-modal-overlay",onClick:()=>te(!1),children:i.jsxs("div",{className:"master-modal-card",onClick:W=>W.stopPropagation(),children:[i.jsx("div",{style:{fontSize:"40px",marginBottom:"12px"},children:"🔑"}),i.jsx("h2",{style:{margin:"0 0 8px",fontSize:"18px",fontWeight:900,letterSpacing:"1px"},children:"MASTER RECOVERY KEY"}),i.jsxs("p",{style:{fontSize:"11px",color:"#666",marginBottom:"20px",lineHeight:1.7},children:["Save this key securely. It is the ",i.jsx("strong",{style:{color:"#fff"},children:"ONLY"})," way to recover your account if you forget your password."]}),i.jsx("div",{className:"key-display",children:ne}),i.jsx("button",{className:"cyber-btn",style:{marginTop:"10px"},onClick:()=>{te(!1)},children:"I HAVE SAVED MY KEY"})]})}),$e&&i.jsx("div",{className:"master-modal-overlay",onClick:()=>Se(!1),children:i.jsxs("div",{className:"master-modal-card",style:{maxWidth:"460px",width:"90%",textAlign:"left"},onClick:W=>W.stopPropagation(),children:[i.jsxs("div",{style:{textAlign:"center",marginBottom:"28px"},children:[i.jsx("div",{style:{fontSize:"36px",marginBottom:"10px"},children:"🛡️"}),i.jsx("h2",{style:{margin:"0 0 6px",fontSize:"17px",fontWeight:900,letterSpacing:"2px",color:"#fff"},children:"MASTER KEY RECOVERY"}),i.jsxs("p",{style:{fontSize:"11px",color:"#555",lineHeight:1.7,margin:0},children:["Enter your legal name and recovery key.",i.jsx("br",{}),"Your request will be sent to the Admin queue for approval."]})]}),i.jsxs("form",{onSubmit:Cn,style:{display:"flex",flexDirection:"column",gap:"18px"},children:[i.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[i.jsx("label",{style:{fontSize:"9px",fontWeight:900,color:"#2563eb",letterSpacing:"2px",fontFamily:"monospace"},children:"LEGAL NAME"}),i.jsx("input",{type:"text",placeholder:"Enter your full registered name...",value:Ee,onChange:W=>Me(W.target.value),required:!0,style:{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.1)",padding:"14px 18px",borderRadius:"14px",color:"#fff",fontFamily:"monospace",fontSize:"14px",outline:"none",width:"100%",boxSizing:"border-box"}})]}),i.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[i.jsx("label",{style:{fontSize:"9px",fontWeight:900,color:"#2563eb",letterSpacing:"2px",fontFamily:"monospace"},children:"MASTER RECOVERY KEY"}),i.jsx("input",{type:"text",placeholder:"XXXX-XXXX-XXXX-XXXX",value:he,onChange:W=>ve(W.target.value),required:!0,style:{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.1)",padding:"14px 18px",borderRadius:"14px",color:"#fff",fontFamily:"monospace",fontSize:"14px",outline:"none",width:"100%",boxSizing:"border-box"}})]}),i.jsxs("div",{style:{background:"rgba(37,99,235,0.06)",border:"1px solid rgba(37,99,235,0.2)",borderRadius:"12px",padding:"14px 16px",fontSize:"11px",color:"#666",lineHeight:1.7},children:[i.jsx("span",{style:{color:"#2563eb",fontWeight:900},children:"HOW IT WORKS: "}),"Submit your request → Admin reviews & approves → Submit again to auto-login."]}),i.jsxs("div",{style:{display:"flex",gap:"12px",marginTop:"4px"},children:[i.jsx("button",{type:"button",onClick:()=>Se(!1),style:{flex:1,padding:"14px",borderRadius:"14px",background:"transparent",border:"1px solid rgba(255,255,255,0.1)",color:"#666",fontWeight:900,cursor:"pointer",fontSize:"11px",letterSpacing:"1px"},children:"CANCEL"}),i.jsx("button",{type:"submit",style:{flex:2,padding:"14px",borderRadius:"14px",background:"#2563eb",border:"none",color:"#fff",fontWeight:900,cursor:"pointer",fontSize:"11px",letterSpacing:"2px",fontFamily:"monospace"},children:"SEND RECOVERY REQUEST →"})]})]})]})})]});if(s==="home")return i.jsxs("div",{className:`home-original ${c==="user"?"user-home-animated":""}`,children:[i.jsx("div",{className:"home-glow"}),i.jsxs("div",{className:"home-content-centered",children:[i.jsx("div",{className:"logo-center-box",children:i.jsx("img",{src:vs,alt:"Brand Logo",className:"home-logo-img"})}),c==="user"?i.jsx("h1",{className:"animated-heading-user",style:{display:"flex",flexWrap:"wrap",justifyContent:"center"},children:"Initiating AuthPrivacyChain".split("").map((W,J)=>{const de=Math.floor(Math.random()*1200-600),ke=Math.floor(Math.random()*800-600),Ie=Math.floor(Math.random()*360-180),Ze=Math.random()*.8;return i.jsx("span",{className:"animated-letter",style:{display:"inline-block",whiteSpace:W===" "?"pre":"normal",animation:"fallAndForm 1.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",animationDelay:`${Ze}s`,transform:`translate(${de}px, ${ke}px) rotate(${Ie}deg)`,opacity:0},children:W},J)})}):i.jsx("h1",{children:"AuthPrivacyChain V2"}),i.jsxs("p",{className:"encryption-text",children:["Advanced Cloud Security powered by Blockchain ",i.jsx("br",{})," & AES-256 Encryption."]}),i.jsxs("div",{className:"home-btns-centered",children:[i.jsx("button",{onClick:()=>{a("admin_dash"),f(Gt[0].name)},className:"btn-dash",children:c==="user"?"Enter Cloud Vault":"Launch Dashboard"}),i.jsx("button",{onClick:ce,className:"btn-logout",children:"Logout"})]})]}),i.jsx("style",{children:`
          .home-original { height: 100vh; background: #000; display: flex; align-items: center; justify-content: center; text-align: center; color: white; font-family: sans-serif; position: relative; overflow: hidden; }
          .home-glow { position: absolute; top: 0; width: 100%; height: 50%; background: radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%); filter: blur(100px); }
          .home-content-centered { z-index: 10; display: flex; flex-direction: column; align-items: center; }
          .home-logo-img { width: 140px; margin-bottom: 20px; }
          h1 { font-size: 52px; font-weight: 800; letter-spacing: -2px; margin-bottom: 10px; }
          .encryption-text { font-size: 18px; color: #888; margin-bottom: 40px; }
          .home-btns-centered { display: flex; gap: 20px; justify-content: center; }
          .btn-dash { padding: 16px 40px; background: white; color: black; border-radius: 50px; font-weight: 700; border: none; cursor: pointer; }
          .btn-logout { padding: 16px 40px; border: 1px solid #333; color: #666; border-radius: 50px; background: none; cursor: pointer; }

          /* User side animation specific styling */
          .user-home-animated .logo-center-box {
            opacity: 0;
            transform: translateY(-800px) scale(0.3);
            animation: logoFallDrop 1.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            animation-delay: 2.8s;
          }
          
          .user-home-animated .animated-heading-user {
            font-size: 52px;
            font-weight: 800;
            letter-spacing: -2px;
            margin-bottom: 10px;
          }
          
          .user-home-animated .encryption-text {
            font-size: 18px;
            color: #888;
            margin-bottom: 40px;
            opacity: 0;
            animation: fadeInSubtitle 1.2s ease-out forwards;
            animation-delay: 1.6s;
          }
          
          .user-home-animated .home-btns-centered {
            display: flex;
            gap: 20px;
            justify-content: center;
            opacity: 0;
            transform: translateY(40px);
            animation: slideUpFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 2.1s;
          }

          @keyframes fallAndForm {
            0% {
              opacity: 0;
            }
            15% {
              opacity: 0.7;
            }
            100% {
              transform: translate(0, 0) rotate(0deg);
              opacity: 1;
            }
          }

          @keyframes logoFallDrop {
            0% {
              opacity: 0;
              transform: translateY(-800px) scale(0.3) rotate(-45deg);
            }
            45% {
              opacity: 1;
              transform: translateY(0) scale(1.1) rotate(5deg);
            }
            65% {
              transform: translateY(-25px) scale(0.95) rotate(-2deg);
            }
            80% {
              transform: translateY(8px) scale(1.02) rotate(1deg);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1) rotate(0deg);
            }
          }

          @keyframes fadeInSubtitle {
            to {
              opacity: 0.7;
            }
          }

          @keyframes slideUpFadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `})]});if(s==="admin_dash"){const W=ae.some(J=>J.name===p);return c==="user"&&W?i.jsxs("div",{className:"main-portal",children:[i.jsx("div",{className:"cyber-grid-bg"}),i.jsxs("div",{className:"auth-card access-denied-card",children:[i.jsx("div",{className:"denied-icon",children:"🚫"}),i.jsx("h1",{style:{color:"#ef4444"},children:"ACCESS DENIED"}),i.jsx("p",{className:"status-label",style:{color:"#ef4444"},children:"INSUFFICIENT CLEARANCE LEVEL"}),i.jsx("button",{onClick:()=>f(fe[0].name),className:"cyber-btn",style:{background:"#ef4444",color:"#fff"},children:"RETURN TO USER VAULT"})]})]}):c==="admin"?i.jsx(bm,{}):i.jsxs("div",{className:`dash-container ${c==="user"?"user-mode":"admin-mode"}`,style:c==="user"?{background:"linear-gradient(135deg, #FCFBF8 0%, #F4F1EA 50%, #EAE5DA 100%)",color:"#2D3436"}:{},children:[c==="admin"&&i.jsxs("aside",{className:"sidebar-cyber",children:[i.jsxs("div",{className:"sidebar-header",children:[i.jsx("img",{src:vs,alt:"Logo",className:"sidebar-logo"}),i.jsxs("div",{className:"sidebar-text",children:[i.jsx("h2",{children:"AuthPrivacyChain"}),i.jsx("p",{children:"SECURE NODE ACTIVE"})]})]}),i.jsx("nav",{className:"sidebar-nav",children:ae.map(J=>i.jsxs("button",{onClick:()=>f(J.name),className:p===J.name?"nav-item active":"nav-item",children:[i.jsx("span",{className:"icon",children:J.icon})," ",J.name]},J.name))}),i.jsx("button",{onClick:()=>a("home"),className:"btn-exit",children:"RETURN TO TERMINAL"})]}),i.jsxs("main",{className:"main-content",children:[i.jsxs("div",{className:"module-header-left",children:[i.jsx("p",{className:"module-status-big",children:"// STATUS: LIVE MONITORING"}),i.jsx("h1",{className:"module-title-big",children:p}),i.jsx("p",{className:"module-definition-big",children:Ut.def})]}),i.jsxs("div",{className:"forensic-grid",children:[i.jsxs("div",{className:"visualizer-box",children:[i.jsx("div",{className:"action-interface",children:c==="user"?i.jsx(nm,{activeTab:p,setActiveTab:f,userModules:fe,setView:a,handleFileChange:Sn,runFileEncryption:Yt,runDecryption:En,selectedFile:A,fileEncryptionResult:re,downloadEncryptedFile:rn}):i.jsxs("div",{className:"action-btn-group",children:[i.jsx("p",{style:{fontSize:"10px",color:"#444",marginBottom:"10px"},children:"Module Operations"}),Ut.actions.map(J=>i.jsx("button",{className:"cyber-action-btn",children:J},J))]})}),i.jsx("div",{className:"radar-circle"})]}),i.jsxs("div",{className:"telemetry-card",children:[i.jsx("p",{className:"telemetry-label",children:"System Telemetry"}),i.jsxs("div",{className:"telemetry-row",children:[i.jsx("span",{children:"LATENCY"}),i.jsx("span",{className:"val",children:"12ms"})]}),i.jsxs("div",{className:"telemetry-row",children:[i.jsx("span",{children:"PORT"}),i.jsx("span",{className:"val blue",children:"8080 (SSL)"})]}),i.jsxs("div",{className:"telemetry-row",children:[i.jsx("span",{children:"UPTIME"}),i.jsx("span",{className:"val",children:"99.9%"})]}),i.jsxs("div",{className:"telemetry-row",children:[i.jsx("span",{children:"SECURITY"}),i.jsx("span",{className:"val green",children:"REMOTE"})]})]})]}),c==="user"&&i.jsx("div",{className:"floating-dock-sleek",children:i.jsxs("div",{className:"dock-items-wrapper",children:[fe.map(J=>i.jsx("button",{onClick:()=>f(J.name),className:p===J.name?"dock-item-sleek active":"dock-item-sleek","aria-label":J.name,children:i.jsx("span",{className:"dock-icon-sleek",children:J.icon})},J.name)),i.jsx("div",{className:"dock-divider"}),i.jsx("button",{onClick:()=>a("home"),className:"dock-item-sleek exit-red",children:i.jsx("span",{className:"dock-icon-sleek",children:"✖"})})]})})]}),i.jsx("style",{children:`
          .dash-container { display: flex; height: 100vh; background: #080808; color: white; font-family: sans-serif; overflow: hidden; }
          .sidebar-cyber { width: 300px; background: #0c0c0c; border-right: 1px solid #1a1a1a; padding: 40px 20px; display: flex; flex-direction: column; }
          .sidebar-header { display: flex; align-items: center; gap: 15px; margin-bottom: 50px; }
          .sidebar-logo { width: 40px; }
          .sidebar-text h2 { font-size: 14px; margin: 0; }
          .sidebar-text p { font-size: 8px; color: #2563eb; margin: 0; font-weight: 900; }
          .nav-item { width: 100%; text-align: left; padding: 14px 20px; background: none; border: none; color: #666; font-size: 13px; font-weight: 600; cursor: pointer; border-radius: 12px; margin-bottom: 5px; display: flex; gap: 12px; align-items: center; }
          .nav-item.active { background: #2563eb; color: white; }
          .main-content { flex: 1; padding: 60px 80px; position: relative; display: flex; flex-direction: column; align-items: flex-start; }
          .module-header-left { text-align: left; margin-bottom: 40px; width: 100%; }
          .module-status-big { font-size: 14px; color: #2563eb; font-weight: 900; margin-bottom: 12px; letter-spacing: 2px; }
          .module-title-big { font-size: 48px; font-weight: 900; margin: 0 0 15px 0; letter-spacing: -1px; }
          .module-definition-big { color: #888; font-size: 18px; max-width: 600px; line-height: 1.5; }
          .forensic-grid { display: flex; gap: 30px; height: 70vh; width: 100%; max-width: 1600px; margin: 0 auto; align-items: stretch; }
          .visualizer-box { flex: 2.5; background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 40px; display: flex; align-items: flex-start; justify-content: flex-start; position: relative; overflow-y: auto; padding: 30px; }
          .telemetry-card { flex: 1; background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 40px; padding: 35px; height: 100%; box-sizing: border-box;}
          .floating-dock-sleek { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); width: 70%; max-width: 800px; background: rgba(10,10,10,0.85); backdrop-filter: blur(25px); border-radius: 24px; border: 1px solid rgba(255,255,255,0.05); padding: 6px; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
          .dock-items-wrapper { display: flex; justify-content: space-around; align-items: center; padding: 2px 10px; }
          .dock-item-sleek { background: none; border: none; font-size: 22px; cursor: pointer; opacity: 0.3; transition: 0.3s ease; padding: 10px; border-radius: 14px; }
          .dock-item-sleek:hover { opacity: 0.8; background: rgba(255,255,255,0.03); transform: translateY(-3px); }
          .dock-item-sleek.active { opacity: 1; transform: scale(1.1); filter: drop-shadow(0 0 10px #2563eb); background: rgba(37,99,235,0.1); }
          .dock-divider { width: 1px; height: 30px; background: rgba(255,255,255,0.1); margin: 0 5px; }
          .exit-red { color: #ef4444; opacity: 0.6; }
          .telemetry-label { font-size: 14px; font-weight: 800; margin-bottom: 25px; color: #2563eb; }
          .telemetry-row { display: flex; justify-content: space-between; font-size: 12px; padding: 15px 0; border-bottom: 1px solid #151515; color: #555; }
          .telemetry-row .val { color: #fff; font-weight: 900; }
          .cyber-action-btn { background: white; color: black; border: none; padding: 14px 28px; border-radius: 15px; font-weight: 800; cursor: pointer; margin: 8px; font-size: 13px; }
          .radar-circle { position: absolute; width: 300px; height: 300px; border: 1px solid rgba(37,99,235,0.1); border-radius: 50%; animation: radar 4s infinite linear; pointer-events: none; }
          @keyframes radar { 0% { transform: scale(0.6); opacity: 0; } 50% { opacity: 0.4; } 100% { transform: scale(1.8); opacity: 0; } }
          .btn-exit { margin-top: auto; padding: 15px; background: #111; color: #444; border: 1px solid #222; border-radius: 14px; font-size: 11px; font-weight: 800; cursor: pointer; }
          .geofence-shield-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100vw; height: 100vh; z-index: 2000000 !important; background: #000; display: flex; align-items: center; justify-content: center; overflow: hidden; font-family: 'Inter', sans-serif; }
          
          .cyber-grid-red { position: absolute; inset: 0; background-image: linear-gradient(rgba(239, 68, 68, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.2) 1px, transparent 1px); background-size: 40px 40px; animation: grid-pulse-red 3s infinite alternate; z-index: 1; }
          .cyber-grid-blue { position: absolute; inset: 0; background-image: linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px); background-size: 45px 45px; animation: grid-pulse-blue 4s infinite alternate-reverse; z-index: 2; }
          
          @keyframes grid-pulse-red { from { opacity: 0.2; transform: scale(1); } to { opacity: 0.6; transform: scale(1.05); } }
          @keyframes grid-pulse-blue { from { opacity: 0.2; transform: scale(1); } to { opacity: 0.6; transform: scale(1.1); } }

          .laser-scanner-red { position: absolute; width: 200%; height: 2px; background: rgba(239, 68, 68, 0.8); box-shadow: 0 0 20px #ef4444; top: 30%; left: -50%; transform: rotate(-5deg); animation: laser-scan-v 4s infinite linear; z-index: 5; }
          .laser-scanner-blue { position: absolute; width: 200%; height: 2px; background: rgba(59, 130, 246, 0.8); box-shadow: 0 0 20px #3b82f6; top: 60%; left: -50%; transform: rotate(5deg); animation: laser-scan-v 5s infinite linear reverse; }
          
          @keyframes laser-scan-v { 0% { top: -10%; } 100% { top: 110%; } }
          
          .shield-container { position: relative; z-index: 3000000 !important; display: flex; flex-direction: column; align-items: center; gap: 30px; }
          .shield-glow-ring { position: absolute; width: 400px; height: 400px; border: 2px solid rgba(59, 130, 246, 0.1); border-radius: 50%; animation: ring-pulse 2s infinite; }
          @keyframes ring-pulse { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.5); opacity: 0; } }
          
          .shield-icon-wrap { position: relative; width: 120px; height: 120px; background: rgba(255,255,255,0.03); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 0 30px rgba(59,130,246,0.2); }
          .shield-main-icon { font-size: 60px; filter: drop-shadow(0 0 10px rgba(59,130,246,0.5)); }
          .shield-scanner-line { position: absolute; width: 100%; height: 2px; background: #3b82f6; box-shadow: 0 0 10px #3b82f6; top: 0; animation: scan-shield 2s infinite ease-in-out; }
          @keyframes scan-shield { 0%, 100% { top: 10%; } 50% { top: 90%; } }
          
          .shield-content { text-align: center; }
          .shield-title { font-size: 42px; font-weight: 900; letter-spacing: 4px; margin: 0; color: #fff; text-shadow: 0 0 10px rgba(255,255,255,0.3); }
          .shield-separator { display: flex; height: 4px; width: 100%; max-width: 300px; margin: 15px auto; }
          .sep-red { flex: 1; background: #ef4444; box-shadow: 0 0 10px #ef4444; }
          .sep-blue { flex: 1; background: #3b82f6; box-shadow: 0 0 10px #3b82f6; }
          
          .shield-msg { color: #888; font-size: 14px; line-height: 1.8; letter-spacing: 1px; }
          .glitch-text { font-size: 24px; font-weight: 900; color: #ef4444; position: relative; display: inline-block; }
          .glitch-text::before, .glitch-text::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000; }
          .glitch-text::before { left: 2px; text-shadow: -2px 0 #3b82f6; animation: glitch 2s infinite linear alternate-reverse; }
          .glitch-text::after { left: -2px; text-shadow: 2px 0 #ef4444; animation: glitch 3s infinite linear alternate-reverse; }
          @keyframes glitch { 0% { clip: rect(44px, 450px, 56px, 0); } 20% { clip: rect(12px, 450px, 89px, 0); } 40% { clip: rect(67px, 450px, 34px, 0); } 60% { clip: rect(89px, 450px, 12px, 0); } 80% { clip: rect(34px, 450px, 67px, 0); } 100% { clip: rect(56px, 450px, 44px, 0); } }
          
          .forensic-meta { display: flex; gap: 20px; justify-content: center; margin: 20px 0; }
          .meta-item { display: flex; flex-direction: column; background: rgba(255,255,255,0.02); padding: 10px 20px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); }
          .m-label { font-size: 9px; color: #555; font-weight: 800; letter-spacing: 1px; }
          .m-val { font-size: 12px; color: #fff; font-weight: 700; margin-top: 4px; }
          .m-val.red { color: #ef4444; }
          
          .shield-dismiss-btn { background: none; border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 12px 30px; border-radius: 4px; font-size: 11px; font-weight: 800; letter-spacing: 2px; cursor: pointer; transition: 0.3s; }
          .shield-dismiss-btn:hover { background: #fff; color: #000; box-shadow: 0 0 20px rgba(255,255,255,0.3); }
        `})]})}return null}function km(s,a){return{w:s,h:a,x:Math.random()*s,y:Math.random()*a,vx:(Math.random()-.5)*1.5,vy:(Math.random()-.5)*1.5,radius:2,update(){this.x+=this.vx,this.y+=this.vy,(this.x<0||this.x>this.w)&&(this.vx*=-1),(this.y<0||this.y>this.h)&&(this.vy*=-1)},draw(d){d.beginPath(),d.arc(this.x,this.y,this.radius,0,Math.PI*2),d.fillStyle="#3b82f6",d.fill()}}}const jm=()=>{const s=U.useRef(null),[a,c]=U.useState(!1);return U.useEffect(()=>{let d,p=[];const f={x:null,y:null},y=setInterval(()=>{const T=document.querySelector(".main-portal"),O=document.querySelector(".home-original");if(!!(T||O)){a||c(!0);const S=T||O;S&&(S.style.setProperty("background","transparent","important"),S.style.setProperty("background-color","transparent","important")),document.querySelectorAll(".cyber-grid-bg, .home-glow, .cloud-container").forEach(k=>{k.style.display="none"})}else a&&c(!1)},100),C=()=>{if(!s.current)return;const T=s.current;T.width=window.innerWidth,T.height=window.innerHeight,p=[];const O=Math.floor(T.width*T.height/1e4);for(let L=0;L<Math.min(O,150);L++)p.push(km(T.width,T.height))},b=T=>{f.x=T.clientX,f.y=T.clientY},N=()=>{if(!s.current){d=requestAnimationFrame(N);return}const T=s.current,O=T.getContext("2d");O&&(O.clearRect(0,0,T.width,T.height),p.forEach((L,S)=>{L.update(),L.draw(O);for(let k=S+1;k<p.length;k++){const w=p[k],B=L.x-w.x,H=L.y-w.y,te=Math.sqrt(B*B+H*H);te<150&&(O.beginPath(),O.strokeStyle=`rgba(59, 130, 246, ${.5*(1-te/150)})`,O.lineWidth=1,O.moveTo(L.x,L.y),O.lineTo(w.x,w.y),O.stroke())}if(f.x!==null&&f.y!==null){const k=L.x-f.x,w=L.y-f.y,B=Math.sqrt(k*k+w*w);B<250&&(O.beginPath(),O.strokeStyle=`rgba(96, 165, 250, ${.9*(1-B/250)})`,O.lineWidth=1.5,O.moveTo(L.x,L.y),O.lineTo(f.x,f.y),O.stroke())}}),d=requestAnimationFrame(N))};return window.addEventListener("resize",C),window.addEventListener("mousemove",b),C(),N(),()=>{clearInterval(y),window.removeEventListener("resize",C),window.removeEventListener("mousemove",b),cancelAnimationFrame(d)}},[a]),i.jsxs(i.Fragment,{children:[i.jsx("style",{children:`
        body:has(.main-portal), body:has(.home-original) {
          background: linear-gradient(135deg, #000000 0%, #020818 50%, #0d1a55 100%) !important;
        }
        .particle-fixed-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          z-index: 9999;
          pointer-events: none;
        }
      `}),a&&i.jsx("div",{className:"particle-fixed-overlay",children:i.jsx("canvas",{ref:s})})]})};vf.createRoot(document.getElementById("root")).render(i.jsxs(Ku.StrictMode,{children:[i.jsx(wm,{}),i.jsx(jm,{})]}));
