import{buildDecafClient as e}from"@decafhub/decaf-client";import n from"js-cookie";import t,{useContext as i,useEffect as o}from"react";const a=t.createContext({client:void 0,me:void 0,publicConfig:void 0}),r=()=>i(a);function s(e){return o(()=>{if(!e.zendeskKey)return;const n=document.createElement("script");return n.src="https://static.zdassets.com/ekr/snippet.js?key="+e.zendeskKey,n.async=!0,n.id="ze-snippet",document.body.appendChild(n),window.zESettings=e.settings||{},()=>{document.body.removeChild(n)}},[e]),null}function c(e){return t.createElement("div",{className:"spinner-wrapper"},t.createElement("style",null,`\n    .spinner-wrapper {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      height: 100vh;\n      flex-direction: column;\n    }\n    .spinner-text {\n      color: ${e.titleColor||"#255d91"};\n    }\n    .spinner {\n      width: ${e.size||"40px"};\n      height: ${e.size||"40px"};\n      position: relative;\n      margin: 10px auto;\n    }\n\n    .double-bounce1,\n    .double-bounce2 {\n      width: 100%;\n      height: 100%;\n      border-radius: 50%;\n      background-color: ${e.color||"#1890ff"};\n      opacity: 0.6;\n      position: absolute;\n      top: 0;\n      left: 0;\n\n      -webkit-animation: sk-bounce 2s infinite ease-in-out;\n      animation: sk-bounce 2s infinite ease-in-out;\n    }\n\n    .double-bounce2 {\n      -webkit-animation-delay: -1s;\n      animation-delay: -1s;\n    }\n\n    @-webkit-keyframes sk-bounce {\n      0%,\n      100% {\n        -webkit-transform: scale(0);\n      }\n      50% {\n        -webkit-transform: scale(1);\n      }\n    }\n\n    @keyframes sk-bounce {\n      0%,\n      100% {\n        transform: scale(0);\n        -webkit-transform: scale(0);\n      }\n      50% {\n        transform: scale(1);\n        -webkit-transform: scale(1);\n      }\n    }\n  `),t.createElement("div",{className:"spinner"},t.createElement("div",{className:"double-bounce1"}),t.createElement("div",{className:"double-bounce2"})),e.title&&t.createElement("p",{className:"spinner-text"},e.title))}function l(i){const[r,l]=t.useState(void 0),[d,u]=t.useState(void 0),[m,p]=t.useState(void 0),[f,b]=t.useState(!0);function v(){l(void 0),u(void 0),p(void 0),b(!1)}return o(()=>{const t=function(){const t=function(){const e=n.get("ember_simple_auth-session");if(e)try{var t;const n=JSON.parse(e);return null==n||null==(t=n.authenticated)?void 0:t.token}catch(e){return void console.error("Can not parse authentication information!")}}();return t?e("",{token:t}):void 0}();t?Promise.all([t.barista.get("/me/"),t.barista.get("/conf/public/")]).then(([e,n])=>{l(t),u(e.data),p(n.data),b(!1)}).catch(v):v()},[]),f?t.createElement(c,{title:"Please Wait..."}):void 0===r||void 0===d||void 0===m?(window.location.href=`/webapps/waitress/production/?next=${window.location.href}`,null):t.createElement(a.Provider,{value:{client:r,me:d,publicConfig:m}},m.zendesk&&t.createElement(s,{zendeskKey:m.zendesk,settings:{contactForm:{fields:[{id:"name",prefill:{"*":d.fullname}},{id:"email",prefill:{"*":d.email}}]}}}),i.children)}export{l as DecafApp,c as DecafSpinner,s as ZendeskWidget,r as useDecaf};
//# sourceMappingURL=index.modern.js.map
