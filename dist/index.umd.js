!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("@decafhub/decaf-client"),require("js-cookie"),require("react")):"function"==typeof define&&define.amd?define(["exports","@decafhub/decaf-client","js-cookie","react"],n):n((e||self).decafReact={},e.decafClient,e.jsCookie,e.react)}(this,function(e,n,t,i){function a(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=/*#__PURE__*/a(t),r=/*#__PURE__*/a(i),l=r.default.createContext({client:void 0,me:void 0,publicConfig:void 0});function s(e){return i.useEffect(function(){if(e.zendeskKey){var n=document.createElement("script");return n.src="https://static.zdassets.com/ekr/snippet.js?key="+e.zendeskKey,n.async=!0,n.id="ze-snippet",document.body.appendChild(n),window.zESettings=e.settings||{},function(){document.body.removeChild(n)}}},[e]),null}function c(e){return r.default.createElement("div",{className:"spinner-wrapper"},r.default.createElement("style",null,"\n    .spinner-wrapper {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      height: 100vh;\n      flex-direction: column;\n    }\n    .spinner-text {\n      color: "+(e.titleColor||"#255d91")+";\n    }\n    .spinner {\n      width: "+(e.size||"40px")+";\n      height: "+(e.size||"40px")+";\n      position: relative;\n      margin: 10px auto;\n    }\n\n    .double-bounce1,\n    .double-bounce2 {\n      width: 100%;\n      height: 100%;\n      border-radius: 50%;\n      background-color: "+(e.color||"#1890ff")+";\n      opacity: 0.6;\n      position: absolute;\n      top: 0;\n      left: 0;\n\n      -webkit-animation: sk-bounce 2s infinite ease-in-out;\n      animation: sk-bounce 2s infinite ease-in-out;\n    }\n\n    .double-bounce2 {\n      -webkit-animation-delay: -1s;\n      animation-delay: -1s;\n    }\n\n    @-webkit-keyframes sk-bounce {\n      0%,\n      100% {\n        -webkit-transform: scale(0);\n      }\n      50% {\n        -webkit-transform: scale(1);\n      }\n    }\n\n    @keyframes sk-bounce {\n      0%,\n      100% {\n        transform: scale(0);\n        -webkit-transform: scale(0);\n      }\n      50% {\n        transform: scale(1);\n        -webkit-transform: scale(1);\n      }\n    }\n  "),r.default.createElement("div",{className:"spinner"},r.default.createElement("div",{className:"double-bounce1"}),r.default.createElement("div",{className:"double-bounce2"})),e.title&&r.default.createElement("p",{className:"spinner-text"},e.title))}e.DecafApp=function(e){var t=r.default.useState(void 0),a=t[0],d=t[1],u=r.default.useState(void 0),f=u[0],m=u[1],p=r.default.useState(void 0),b=p[0],v=p[1],k=r.default.useState(!0),h=k[0],y=k[1];function w(){d(void 0),m(void 0),v(void 0),y(!1)}return i.useEffect(function(){var e,t=(e=function(){var e=o.default.get("ember_simple_auth-session");if(e)try{var n,t=JSON.parse(e);return null==t||null==(n=t.authenticated)?void 0:n.token}catch(e){return void console.error("Can not parse authentication information!")}}())?n.buildDecafClient("",{token:e}):void 0;t?Promise.all([t.barista.get("/me/"),t.barista.get("/conf/public/")]).then(function(e){var n=e[0],i=e[1];d(t),m(n.data),v(i.data),y(!1)}).catch(w):w()},[]),h?r.default.createElement(c,{title:"Please Wait..."}):void 0===a||void 0===f||void 0===b?(window.location.href="/webapps/waitress/production/?next="+window.location.href,null):r.default.createElement(l.Provider,{value:{client:a,me:f,publicConfig:b}},b.zendesk&&r.default.createElement(s,{zendeskKey:b.zendesk,settings:{contactForm:{fields:[{id:"name",prefill:{"*":f.fullname}},{id:"email",prefill:{"*":f.email}}]}}}),e.children)},e.DecafSpinner=c,e.ZendeskWidget=s,e.useDecaf=function(){return i.useContext(l)}});
//# sourceMappingURL=index.umd.js.map
