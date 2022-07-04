var e=require("@decafhub/decaf-client"),n=require("js-cookie"),t=require("react");function o(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=/*#__PURE__*/o(n),i=/*#__PURE__*/o(t),a=i.default.createContext({client:void 0,me:void 0,publicConfig:void 0});function l(e){var n=t.useState(),o=n[0],r=n[1],a=t.useRef();return t.useEffect(function(){return a.current&&clearInterval(a.current),a.current=window.setInterval(function(){fetch(e.basePath+"/version.json?t="+(new Date).getTime()).then(function(e){return e.json()}).then(function(n){n.version&&(r(n.version),e.currentVersion!==n.version&&(null==e.onNewVersion||e.onNewVersion(e.currentVersion,n.version)))}).catch(function(){console.error("DECAF Error: Can not fetch version information!")})},6e4),function(){clearInterval(a.current)}},[e]),e.onNewVersion||!o?null:i.default.createElement("div",null,o!==e.currentVersion&&i.default.createElement("div",{className:"version-modal"},i.default.createElement("style",null,"\n.version-modal {\n  background-color: rgba(0, 0, 0, 0.5);\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 9999;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.4em;\n}\n\n.version-modal-title {\n  text-align: center;\n  padding: 10px 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.version-modal-title h2 {\n  font-size: 1.5rem;\n  font-weight: bold;\n  color: white;\n  margin: 0;\n  margin-left: 10px;\n}\n\n.version-modal .version-modal-body {\n  display: flex;\n  flex-direction: column;\n  width: 50%;\n  background-color: #333;\n  border-radius: 5px;\n}\n\n.version-modal .version-modal-content {\n  padding: 5px 20px;\n}\n\n.version-modal .version-modal-footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  padding: 10px;\n  margin-top: 20px;\n}\n.version-modal .reload-btn {\n  background-color: #177ddc;\n  color: white;\n  border: none;\n  width: 150px;\n  padding: 10px;\n  cursor: pointer;\n}\n\n.version-modal .reload-btn:hover {\n  background-color: #095cb5;\n}\n\n.version-modal .cancel-btn {\n  background-color: #555;\n  color: white;\n  border: 1px solid #dfdfdf;\n  padding: 10px;\n  cursor: pointer;\n}\n\n.version-modal .cancel-btn:hover {\n  background-color: #444;\n}\n"),i.default.createElement("div",{className:"version-modal-body"},i.default.createElement("div",{className:"version-modal-title"},i.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"50",height:"50",viewBox:"0 0 24 24",fill:"#00c12c",className:"alert-status-icon"},i.default.createElement("path",{d:"M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z"})),i.default.createElement("h2",null,"New Version Available")),i.default.createElement("div",{className:"version-modal-content"},i.default.createElement("p",null,"A new version of your app is available. Please reload the page to update to the latest version."),i.default.createElement("span",null,"New version: ",i.default.createElement("b",{style:{marginRight:10}},o),"(Current version: ",i.default.createElement("b",null,e.currentVersion),")")),i.default.createElement("div",{className:"version-modal-footer"},i.default.createElement("button",{className:"cancel-btn",onClick:function(){return r(void 0)}},"Let me finish my work first. I will reload later."),i.default.createElement("button",{className:"reload-btn",onClick:function(){window.location.reload()}},"Reload")))))}function s(e){return t.useEffect(function(){if(e.zendeskKey){var n=document.createElement("script");return n.src="https://static.zdassets.com/ekr/snippet.js?key="+e.zendeskKey,n.async=!0,n.id="ze-snippet",document.body.appendChild(n),window.zESettings=e.settings||{},function(){document.body.removeChild(n)}}},[e]),null}function c(e){return i.default.createElement("div",{className:"spinner-wrapper"},i.default.createElement("style",null,"\n    .spinner-wrapper {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      height: 100vh;\n      flex-direction: column;\n    }\n    .spinner-text {\n      color: "+(e.titleColor||"#255d91")+";\n    }\n    .spinner {\n      width: "+(e.size||"40px")+";\n      height: "+(e.size||"40px")+";\n      position: relative;\n      margin: 10px auto;\n    }\n\n    .double-bounce1,\n    .double-bounce2 {\n      width: 100%;\n      height: 100%;\n      border-radius: 50%;\n      background-color: "+(e.color||"#1890ff")+";\n      opacity: 0.6;\n      position: absolute;\n      top: 0;\n      left: 0;\n\n      -webkit-animation: sk-bounce 2s infinite ease-in-out;\n      animation: sk-bounce 2s infinite ease-in-out;\n    }\n\n    .double-bounce2 {\n      -webkit-animation-delay: -1s;\n      animation-delay: -1s;\n    }\n\n    @-webkit-keyframes sk-bounce {\n      0%,\n      100% {\n        -webkit-transform: scale(0);\n      }\n      50% {\n        -webkit-transform: scale(1);\n      }\n    }\n\n    @keyframes sk-bounce {\n      0%,\n      100% {\n        transform: scale(0);\n        -webkit-transform: scale(0);\n      }\n      50% {\n        transform: scale(1);\n        -webkit-transform: scale(1);\n      }\n    }\n  "),i.default.createElement("div",{className:"spinner"},i.default.createElement("div",{className:"double-bounce1"}),i.default.createElement("div",{className:"double-bounce2"})),e.title&&i.default.createElement("p",{className:"spinner-text"},e.title))}exports.DecafApp=function(n){var o,d=i.default.useState(void 0),u=d[0],f=d[1],m=i.default.useState(void 0),p=m[0],v=m[1],b=i.default.useState(void 0),h=b[0],w=b[1],g=i.default.useState(!0),x=g[0],k=g[1],E=i.default.useRef();function y(){f(void 0),v(void 0),w(void 0),k(!1)}return t.useEffect(function(){var n,t=(n=function(){var e=r.default.get("ember_simple_auth-session");if(e)try{var n,t=JSON.parse(e);return null==t||null==(n=t.authenticated)?void 0:n.token}catch(e){return void console.error("Can not parse authentication information!")}}())?e.buildDecafClient("",{token:n}):void 0;t?Promise.all([t.barista.get("/me/"),t.barista.get("/conf/public/")]).then(function(e){var n=e[0],o=e[1];f(t),v(n.data),w(o.data),k(!1)}).catch(y):y()},[]),t.useEffect(function(){return u&&(E.current=window.setInterval(function(){u.barista.get("/me/").catch(function(e){var n=e.response;401!==n.status&&403!==n.status||y()})},6e4)),function(){window.clearInterval(E.current)}},[u]),x?i.default.createElement(c,{title:"Please Wait..."}):void 0===u||void 0===p||void 0===h?(window.location.href="/webapps/waitress/production/?next="+window.location.href+"&reason=session-expired",null):i.default.createElement(a.Provider,{value:{client:u,me:p,publicConfig:h}},(null==(o=n.config)?void 0:o.currentVersion)&&i.default.createElement(l,{basePath:n.config.basePath,currentVersion:n.config.currentVersion,onNewVersion:n.config.onNewVersion}),h.zendesk&&i.default.createElement(s,{zendeskKey:h.zendesk,settings:{contactForm:{fields:[{id:"name",prefill:{"*":p.fullname}},{id:"email",prefill:{"*":p.email}}]}}}),n.children)},exports.DecafSpinner=c,exports.ZendeskWidget=s,exports.useDecaf=function(){return t.useContext(a)};
//# sourceMappingURL=index.js.map
