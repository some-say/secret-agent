(window.webpackJsonp=window.webpackJsonp||[]).push([[194],{vu0Y:function(t,e,r){"use strict";e.a={name:"VueRemarkRoot",render:function(t){return t("div",null,this.$slots.default)}}},wpYB:function(t,e,r){"use strict";r.r(e);var o=r("Ow4o"),i=r("vu0Y"),a=r("pLV6");function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}a.a.config.optionMergeStrategies;var s={VueRemarkRoot:i.a},p=function(t){var e=t.options.components=t.options.components||{},r=t.options.computed=t.options.computed||{};Object.keys(s).forEach((function(t){"object"===n(s[t])&&"function"==typeof s[t].render||"function"==typeof s[t]&&"function"==typeof s[t].options.render?e[t]=s[t]:r[t]=function(){return s[t]}}))},d=a.a.config.optionMergeStrategies,u="__vueRemarkFrontMatter",c={excerpt:null,title:"Dialog"};var l=function(t){t.options[u]&&(t.options[u]=c),a.a.util.defineReactive(t.options,u,c),t.options.computed=d.computed({$frontmatter:function(){return t.options[u]}},t.options.computed)},v=Object(o.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("VueRemarkRoot",[r("h1",{attrs:{id:"dialog"}},[r("a",{attrs:{href:"#dialog","aria-hidden":"true"}},[t._v("#")]),t._v("Dialog")]),r("blockquote",[r("p",[t._v("Dialogs represent javascript alert, confirm and prompt informational messages.")])]),r("p",[t._v("The Dialog class is initiated from "),r("code",{pre:!0},[t._v("window.alert")]),t._v(", "),r("code",{pre:!0},[t._v("window.confirm")]),t._v(", and other dialog prompt calls in a webpage. Dialogs will block ALL execution of a webpage, so it is important to handle them by dismissing or taking appropriate action. To listen for dialogs, register a listener on each tab using "),r("code",{pre:!0},[t._v("tab.on('dialog', (dialog: Dialog) => ...<callback>)")]),t._v(".")]),r("h2",{attrs:{id:"properties"}},[r("a",{attrs:{href:"#properties","aria-hidden":"true"}},[t._v("#")]),t._v("Properties")]),r("h3",{attrs:{id:"url"}},[r("a",{attrs:{href:"#url","aria-hidden":"true"}},[t._v("#")]),t._v("url")]),r("p",[t._v("The url of the frame where this dialog was initiated.")]),r("h4",{attrs:{id:"returns-string"}},[r("a",{attrs:{href:"#returns-string","aria-hidden":"true"}},[t._v("#")]),r("strong",[t._v("Returns")]),r("code",{pre:!0},[t._v("string")])]),r("h3",{attrs:{id:"message"}},[r("a",{attrs:{href:"#message","aria-hidden":"true"}},[t._v("#")]),t._v("message")]),r("p",[t._v("The dialog message.")]),r("h4",{attrs:{id:"returns-string-1"}},[r("a",{attrs:{href:"#returns-string-1","aria-hidden":"true"}},[t._v("#")]),r("strong",[t._v("Returns")]),r("code",{pre:!0},[t._v("string")])]),r("h3",{attrs:{id:"type"}},[r("a",{attrs:{href:"#type","aria-hidden":"true"}},[t._v("#")]),t._v("type")]),r("p",[t._v("The type of dialog. Possible values are: 'alert', 'confirm', 'prompt' and 'beforeunload'.")]),r("h4",{attrs:{id:"returns-string-2"}},[r("a",{attrs:{href:"#returns-string-2","aria-hidden":"true"}},[t._v("#")]),r("strong",[t._v("Returns")]),r("code",{pre:!0},[t._v("string")])]),r("h3",{attrs:{id:"defaultprompt"}},[r("a",{attrs:{href:"#defaultprompt","aria-hidden":"true"}},[t._v("#")]),t._v("defaultPrompt")]),r("p",[t._v("Optional: The default dialog prompt")]),r("h4",{attrs:{id:"returns-string-3"}},[r("a",{attrs:{href:"#returns-string-3","aria-hidden":"true"}},[t._v("#")]),r("strong",[t._v("Returns")]),r("code",{pre:!0},[t._v("string")])]),r("h2",{attrs:{id:"methods"}},[r("a",{attrs:{href:"#methods","aria-hidden":"true"}},[t._v("#")]),t._v("Methods")]),r("h3",{attrs:{id:"dismissemaccept-prompttextem"}},[r("a",{attrs:{href:"#dismissemaccept-prompttextem","aria-hidden":"true"}},[t._v("#")]),t._v("dismiss"),r("em",[t._v("(accept[, promptText])")])]),r("p",[t._v("Dismiss the dialog with the given values.")]),r("h4",{attrs:{id:"arguments"}},[r("a",{attrs:{href:"#arguments","aria-hidden":"true"}},[t._v("#")]),r("strong",[t._v("Arguments")]),t._v(":")]),r("ul",[r("li",[t._v("accept "),r("code",{pre:!0},[t._v("boolean")]),t._v(". Whether to hit the accept button or cancel/reject (if applicable).")]),r("li",[t._v("promptText "),r("code",{pre:!0},[t._v("string")]),t._v(". Optional text to enter into a prompt field if present.")])]),r("h4",{attrs:{id:"returns-promisevoid"}},[r("a",{attrs:{href:"#returns-promisevoid","aria-hidden":"true"}},[t._v("#")]),r("strong",[t._v("Returns")]),r("code",{pre:!0},[t._v("Promise<void>")])])])}),[],!1,null,null,null);"function"==typeof p&&p(v),"function"==typeof l&&l(v);e.default=v.exports}}]);