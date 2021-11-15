(window.webpackJsonp=window.webpackJsonp||[]).push([[196],{"1/S4":function(e,r,t){"use strict";t.r(r);var s=t("Ow4o"),o=t("vu0Y"),n=t("pLV6");function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}n.a.config.optionMergeStrategies;var i={VueRemarkRoot:o.a},u=function(e){var r=e.options.components=e.options.components||{},t=e.options.computed=e.options.computed||{};Object.keys(i).forEach((function(e){"object"===a(i[e])&&"function"==typeof i[e].render||"function"==typeof i[e]&&"function"==typeof i[e].options.render?r[e]=i[e]:t[e]=function(){return i[e]}}))},d=n.a.config.optionMergeStrategies,c="__vueRemarkFrontMatter",p={excerpt:null,title:"Resource"};var h=function(e){e.options[c]&&(e.options[c]=p),n.a.util.defineReactive(e.options,c,p),e.options.computed=d.computed({$frontmatter:function(){return e.options[c]}},e.options.computed)},v=Object(s.a)({},(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("VueRemarkRoot",[t("h1",{attrs:{id:"resource"}},[t("a",{attrs:{href:"#resource","aria-hidden":"true"}},[e._v("#")]),e._v("Resource")]),t("blockquote",[t("p",[e._v("Resources are all network assets loaded to render a page, including CSS, Javascript, Fonts, Web Sockets, XHR/Fetch Requests, and more.")])]),t("p",[e._v("The Resource class is returned from "),t("code",{pre:!0},[e._v("window.waitForResource")]),e._v(" calls. It is used to dynamically load portions of a Resource on demand.")]),t("p",[e._v("If an obtained Resource is a Websocket, a "),t("code",{pre:!0},[e._v("WebsocketResource")]),e._v(" is returned.")]),t("h2",{attrs:{id:"properties"}},[t("a",{attrs:{href:"#properties","aria-hidden":"true"}},[e._v("#")]),e._v("Properties")]),t("h3",{attrs:{id:"request"}},[t("a",{attrs:{href:"#request","aria-hidden":"true"}},[e._v("#")]),e._v("request")]),t("p",[e._v("Retrieve the network request used to retrieve this resource.")]),t("h4",{attrs:{id:"returns-resourcerequest"}},[t("a",{attrs:{href:"#returns-resourcerequest","aria-hidden":"true"}},[e._v("#")]),t("strong",[e._v("Returns")]),t("a",{attrs:{href:"/docs/advanced/resource-request"}},[t("code",{pre:!0},[e._v("ResourceRequest")])])]),t("h3",{attrs:{id:"response"}},[t("a",{attrs:{href:"#response","aria-hidden":"true"}},[e._v("#")]),e._v("response")]),t("p",[e._v("Retrieve the network request used to retrieve this resource.")]),t("h4",{attrs:{id:"returns-resourceresponse"}},[t("a",{attrs:{href:"#returns-resourceresponse","aria-hidden":"true"}},[e._v("#")]),t("strong",[e._v("Returns")]),t("a",{attrs:{href:"/docs/advanced/resource-response"}},[t("code",{pre:!0},[e._v("ResourceResponse")])])]),t("h3",{attrs:{id:"url"}},[t("a",{attrs:{href:"#url","aria-hidden":"true"}},[e._v("#")]),e._v("url")]),t("p",[e._v("The requested url")]),t("h3",{attrs:{id:"documenturl"}},[t("a",{attrs:{href:"#documenturl","aria-hidden":"true"}},[e._v("#")]),e._v("documentUrl")]),t("p",[e._v("The document (if applicable) that requested this resource.")]),t("h4",{attrs:{id:"returns-string"}},[t("a",{attrs:{href:"#returns-string","aria-hidden":"true"}},[e._v("#")]),t("strong",[e._v("Returns")]),t("code",{pre:!0},[e._v("string")])]),t("h4",{attrs:{id:"returns-string-1"}},[t("a",{attrs:{href:"#returns-string-1","aria-hidden":"true"}},[e._v("#")]),t("strong",[e._v("Returns")]),t("code",{pre:!0},[e._v("string")])]),t("h3",{attrs:{id:"type"}},[t("a",{attrs:{href:"#type","aria-hidden":"true"}},[e._v("#")]),e._v("type")]),t("p",[e._v("The type of resource. Possible values are:\n"),t("code",{pre:!0},[e._v("Document, Redirect, Websocket, Ico, Preflight, Script, Stylesheet, Xhr, Fetch, Image, Media, Font, Text Track, Event Source, Manifest, Signed Exchange, Ping, CSP Violation Report, Other")])]),t("h4",{attrs:{id:"returns-resourcetype"}},[t("a",{attrs:{href:"#returns-resourcetype","aria-hidden":"true"}},[e._v("#")]),t("strong",[e._v("Returns")]),t("code",{pre:!0},[e._v("ResourceType")])]),t("h3",{attrs:{id:"isredirect"}},[t("a",{attrs:{href:"#isredirect","aria-hidden":"true"}},[e._v("#")]),e._v("isRedirect")]),t("p",[e._v("Was this request redirected")]),t("h4",{attrs:{id:"returns-boolean"}},[t("a",{attrs:{href:"#returns-boolean","aria-hidden":"true"}},[e._v("#")]),t("strong",[e._v("Returns")]),t("code",{pre:!0},[e._v("boolean")])]),t("h3",{attrs:{id:"data"}},[t("a",{attrs:{href:"#data","aria-hidden":"true"}},[e._v("#")]),e._v("data")]),t("p",[e._v("Load the underlying buffer returned by this network response.")]),t("h4",{attrs:{id:"returns-promisebuffer"}},[t("a",{attrs:{href:"#returns-promisebuffer","aria-hidden":"true"}},[e._v("#")]),t("strong",[e._v("Returns")]),t("code",{pre:!0},[e._v("Promise<Buffer>")])]),t("h2",{attrs:{id:"methods"}},[t("a",{attrs:{href:"#methods","aria-hidden":"true"}},[e._v("#")]),e._v("Methods")]),t("h3",{attrs:{id:"textemem"}},[t("a",{attrs:{href:"#textemem","aria-hidden":"true"}},[e._v("#")]),e._v("text"),t("em",[e._v("()")])]),t("p",[e._v("Convert the returned resource body to a string.")]),t("h4",{attrs:{id:"returns-promisestring"}},[t("a",{attrs:{href:"#returns-promisestring","aria-hidden":"true"}},[e._v("#")]),t("strong",[e._v("Returns")]),t("code",{pre:!0},[e._v("Promise<string>")])]),t("h3",{attrs:{id:"jsonemem"}},[t("a",{attrs:{href:"#jsonemem","aria-hidden":"true"}},[e._v("#")]),e._v("json"),t("em",[e._v("()")])]),t("p",[e._v("Convert the returned resource body into json.")]),t("h4",{attrs:{id:"returns-promisejson"}},[t("a",{attrs:{href:"#returns-promisejson","aria-hidden":"true"}},[e._v("#")]),t("strong",[e._v("Returns")]),t("code",{pre:!0},[e._v("Promise<json>")])])])}),[],!1,null,null,null);"function"==typeof u&&u(v),"function"==typeof h&&h(v);r.default=v.exports},vu0Y:function(e,r,t){"use strict";r.a={name:"VueRemarkRoot",render:function(e){return e("div",null,this.$slots.default)}}}}]);