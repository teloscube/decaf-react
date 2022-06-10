import{buildDecafClient as n}from"@decafhub/decaf-client";import e from"js-cookie";import t,{useContext as o,useState as i,useRef as r,useEffect as a}from"react";var l=t.createContext({client:void 0,me:void 0,publicConfig:void 0}),c=function(){return o(l)};function s(n){var e=i(),o=e[0],l=e[1],c=r();return a(function(){return c.current&&clearInterval(c.current),c.current=window.setInterval(function(){fetch(n.publicURL+"/version.json?t="+(new Date).getTime()).then(function(n){return n.json()}).then(function(e){l(e.version),n.currentVersion!==e.version&&(null==n.onNewVersion||n.onNewVersion(n.currentVersion,e.version))}).catch(function(){console.error("DECAF Error: Can not fetch version information!")})},6e4),function(){clearInterval(c.current)}},[n]),n.onNewVersion||!o?null:t.createElement("div",null,o!==n.currentVersion&&t.createElement("div",{className:"version-modal"},t.createElement("style",null,"\n.version-modal {\n  background-color: rgba(0, 0, 0, 0.5);\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 9999;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.4em;\n}\n\n.version-modal-title {\n  text-align: center;\n  padding: 10px 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.version-modal-title h2 {\n  font-size: 1.5rem;\n  font-weight: bold;\n  color: white;\n  margin: 0;\n  margin-left: 10px;\n}\n\n.version-modal .version-modal-body {\n  display: flex;\n  flex-direction: column;\n  width: 50%;\n  background-color: #333;\n  border-radius: 5px;\n}\n\n.version-modal .version-modal-content {\n  padding: 5px 20px;\n}\n\n.version-modal .version-modal-footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  padding: 10px;\n  margin-top: 20px;\n}\n.version-modal .reload-btn {\n  background-color: #177ddc;\n  color: white;\n  border: none;\n  width: 150px;\n  padding: 10px;\n  cursor: pointer;\n}\n\n.version-modal .reload-btn:hover {\n  background-color: #095cb5;\n}\n\n.version-modal .cancel-btn {\n  background-color: #333;\n  color: white;\n  border: none;\n  padding: 10px;\n  cursor: pointer;\n}\n\n.version-modal .cancel-btn:hover {\n  background-color: #444;\n}\n"),t.createElement("div",{className:"version-modal-body"},t.createElement("div",{className:"version-modal-title"},t.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"50",height:"50",viewBox:"0 0 24 24",fill:"#00c12c",className:"alert-status-icon"},t.createElement("path",{d:"M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z"})),t.createElement("h2",null,"New Version Available")),t.createElement("div",{className:"version-modal-content"},t.createElement("p",null,"A new version of your app is available. Please reload the page to update to the latest version."),t.createElement("span",null,"New version: ",t.createElement("b",{style:{marginRight:10}},o),"(Current version: ",t.createElement("b",null,n.currentVersion),")")),t.createElement("div",{className:"version-modal-footer"},t.createElement("button",{className:"cancel-btn",onClick:function(){return l(void 0)}},"Cancel"),t.createElement("button",{className:"reload-btn",onClick:window.location.reload},"Reload")))))}function d(n){return a(function(){if(n.zendeskKey){var e=document.createElement("script");return e.src="https://static.zdassets.com/ekr/snippet.js?key="+n.zendeskKey,e.async=!0,e.id="ze-snippet",document.body.appendChild(e),window.zESettings=n.settings||{},function(){document.body.removeChild(e)}}},[n]),null}function u(n){return t.createElement("div",{className:"spinner-wrapper"},t.createElement("style",null,"\n    .spinner-wrapper {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      height: 100vh;\n      flex-direction: column;\n    }\n    .spinner-text {\n      color: "+(n.titleColor||"#255d91")+";\n    }\n    .spinner {\n      width: "+(n.size||"40px")+";\n      height: "+(n.size||"40px")+";\n      position: relative;\n      margin: 10px auto;\n    }\n\n    .double-bounce1,\n    .double-bounce2 {\n      width: 100%;\n      height: 100%;\n      border-radius: 50%;\n      background-color: "+(n.color||"#1890ff")+";\n      opacity: 0.6;\n      position: absolute;\n      top: 0;\n      left: 0;\n\n      -webkit-animation: sk-bounce 2s infinite ease-in-out;\n      animation: sk-bounce 2s infinite ease-in-out;\n    }\n\n    .double-bounce2 {\n      -webkit-animation-delay: -1s;\n      animation-delay: -1s;\n    }\n\n    @-webkit-keyframes sk-bounce {\n      0%,\n      100% {\n        -webkit-transform: scale(0);\n      }\n      50% {\n        -webkit-transform: scale(1);\n      }\n    }\n\n    @keyframes sk-bounce {\n      0%,\n      100% {\n        transform: scale(0);\n        -webkit-transform: scale(0);\n      }\n      50% {\n        transform: scale(1);\n        -webkit-transform: scale(1);\n      }\n    }\n  "),t.createElement("div",{className:"spinner"},t.createElement("div",{className:"double-bounce1"}),t.createElement("div",{className:"double-bounce2"})),n.title&&t.createElement("p",{className:"spinner-text"},n.title))}function m(o){var i,r=t.useState(void 0),c=r[0],m=r[1],p=t.useState(void 0),v=p[0],f=p[1],b=t.useState(void 0),h=b[0],g=b[1],w=t.useState(!0),k=w[0],x=w[1];function E(){m(void 0),f(void 0),g(void 0),x(!1)}return a(function(){var t,o=(t=function(){var n=e.get("ember_simple_auth-session");if(n)try{var t,o=JSON.parse(n);return null==o||null==(t=o.authenticated)?void 0:t.token}catch(n){return void console.error("Can not parse authentication information!")}}())?n("",{token:t}):void 0;o?Promise.all([o.barista.get("/me/"),o.barista.get("/conf/public/")]).then(function(n){var e=n[0],t=n[1];m(o),f(e.data),g(t.data),x(!1)}).catch(E):E()},[]),k?t.createElement(u,{title:"Please Wait..."}):void 0===c||void 0===v||void 0===h?(window.location.href="/webapps/waitress/production/?next="+window.location.href,null):t.createElement(l.Provider,{value:{client:c,me:v,publicConfig:h}},(null==(i=o.config)?void 0:i.currentVersion)&&t.createElement(s,{publicURL:o.config.publicURL,currentVersion:o.config.currentVersion,onNewVersion:o.config.onNewVersion}),h.zendesk&&t.createElement(d,{zendeskKey:h.zendesk,settings:{contactForm:{fields:[{id:"name",prefill:{"*":v.fullname}},{id:"email",prefill:{"*":v.email}}]}}}),o.children)}export{m as DecafApp,u as DecafSpinner,d as ZendeskWidget,c as useDecaf};
//# sourceMappingURL=index.module.js.map
