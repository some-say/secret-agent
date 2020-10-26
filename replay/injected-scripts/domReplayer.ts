// NOTE: do not use node dependencies

import { IFrontendDomChangeEvent } from '~shared/interfaces/IDomChangeEvent';
import { IMouseEvent, IScrollRecord } from '~shared/interfaces/ISaSession';

const SHADOW_NODE_TYPE = 40;
const preserveElements = new Set<string>(['HTML', 'HEAD', 'BODY']);

let maxHighlightTop = -1;
let minHighlightTop = 10e3;
let lastHighlightNodes: number[] = [];
const domChangeList = [];

const replayNode = document.createElement('sa-replay');
replayNode.setAttribute('style', 'z-index:10000000;');
const replayShadow = replayNode.attachShadow({ mode: 'closed' });

console.log('DomReplayer loaded.');
// @ts-ignore
window.replayEvents = function replayEvents(changeEvents, resultNodeIds, mouseEvent, scrollEvent) {
  console.log(
    'Events: changes=%s, highlighted=%s, hasMouse=%s, hasScroll=%s',
    changeEvents?.length ?? 0,
    resultNodeIds?.length ?? 0,
    !!mouseEvent,
    !!scrollEvent,
  );
  if (changeEvents) applyDomChanges(changeEvents);
  if (resultNodeIds !== undefined) highlightNodes(resultNodeIds);
  if (mouseEvent) updateMouse(mouseEvent);
  if (scrollEvent) updateScroll(scrollEvent);
  if (mouseEvent || scrollEvent || resultNodeIds) {
    document.body.appendChild(replayNode);
  }
};

function cancelEvent(e: Event) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

document.addEventListener('click', cancelEvent, true);
document.addEventListener('submit', cancelEvent, true);

window.addEventListener('resize', () => {
  if (lastHighlightNodes) highlightNodes(lastHighlightNodes);
  if (lastMouseEvent) updateMouse(lastMouseEvent);
});

const replayers = new Map<string, DomReplayer>();

function applyDomChanges(changeEvents: IFrontendDomChangeEvent[]) {
  domChangeList.push(...changeEvents);
  if (!replayers.has(DomReplayer.MAIN_FRAME_PATH)) {
    replayers.set(
      DomReplayer.MAIN_FRAME_PATH,
      new DomReplayer(window, document, DomReplayer.MAIN_FRAME_PATH),
    );
  }

  while (domChangeList.length) {
    const changeEvent = domChangeList.shift();
    const { frameIdPath } = changeEvent;
    const replayer = replayers.get(frameIdPath || DomReplayer.MAIN_FRAME_PATH);
    try {
      if (replayer) replayer.replay(changeEvent);
      else console.log('iFrame Replayer not available!', frameIdPath);
    } catch (err) {
      console.log('ERROR applying change', changeEvent, err);
    }
  }
}

// HELPER FUNCTIONS ////////////////////

class DomReplayer {
  static MAIN_FRAME_PATH = 'main';
  readonly isLoaded: Promise<void>;
  readonly idMap = new Map<number, Node>();

  get isMainFrame() {
    return this.path === DomReplayer.MAIN_FRAME_PATH;
  }

  get document() {
    if (this.element instanceof HTMLDocument) return this.element;
    if (this.element instanceof HTMLObjectElement) {
      return this.element.getSVGDocument() ?? this.element.contentDocument;
    }
    if (this.element instanceof HTMLIFrameElement) return this.element.contentDocument;
  }

  constructor(
    readonly window: Window,
    readonly element: HTMLObjectElement | HTMLIFrameElement | HTMLDocument,
    readonly path: string,
  ) {
    this.isLoaded = new Promise(resolve => {
      if (document && document.addEventListener) {
        document.addEventListener('DOMContentLoaded', () => {
          console.log('DOMContentLoaded');
          resolve();
        });
      }
    });
  }

  replay(event: IFrontendDomChangeEvent) {
    const { action, textContent, nodeId } = event;
    if (action === 'newDocument') {
      this.onNewDocument(textContent);
      return;
    }

    if (action === 'location') {
      console.log('Location changed', event);
      if (!this.isMainFrame) {
        if (this.element instanceof HTMLObjectElement) {
          this.element.data = textContent;
        }
      } else {
        this.window.history.replaceState({}, 'Replay', textContent);
      }
      return;
    }

    const { nodeType, parentNodeId, tagName } = event;
    if (preserveElements.has(tagName)) {
      const elem = this.document.querySelector(tagName);
      if (!elem) {
        console.log('Preserved element doesnt exist!', tagName);
        return;
      }
      this.idMap.set(nodeId, elem);
      if (action === 'removed') {
        elem.innerHTML = '';
        for (const attr of elem.attributes) {
          elem.removeAttributeNS(attr.name, attr.namespaceURI);
          elem.removeAttribute(attr.name);
        }
        console.log('WARN: script trying to remove preserved node', event, elem);
        return;
      }
      if (action === 'added') {
        elem.innerHTML = '';
        if (event.attributes) {
          this.setNodeAttributes(elem, event);
        }
        if (event.properties) {
          this.setNodeProperties(elem, event);
        }
        return;
      }
    }
    if (nodeType === this.document.DOCUMENT_NODE) {
      this.idMap.set(nodeId, this.document);
    }
    if (nodeType === this.document.DOCUMENT_TYPE_NODE) {
      this.idMap.set(nodeId, this.document.doctype);
      return;
    }

    if (tagName && tagName.toLowerCase() === 'noscript') {
      if (!event.attributes) event.attributes = {};
      if (event.attributes.style) event.attributes.style += ';display:none';
      else event.attributes.style = 'display:none';
    }

    let node: Node;
    let parentNode: Node;
    try {
      parentNode = this.getNode(parentNodeId);
      if (!parentNode && !parentNodeId && action === 'added') {
        parentNode = this.document;
      }
      if (!parentNode && (action === 'added' || action === 'removed')) {
        console.log('WARN: parent node id not found', event);
        return;
      }

      node = this.deserializeNode(event, parentNode as Element);
      switch (action) {
        case 'added':
          let next: Node;
          if (!event.previousSiblingId) {
            (parentNode as Element).prepend(node);
          } else if (this.getNode(event.previousSiblingId)) {
            next = this.getNode(event.previousSiblingId).nextSibling;
            if (next) parentNode.insertBefore(node, next);
            else parentNode.appendChild(node);
          }
          if ((node as Element).tagName === 'IFRAME') {
            console.log('Added iframe!', nodeId);
            const frame = node as HTMLIFrameElement;
            const key = `${this.path}_${nodeId}`;
            replayers.set(key, new DomReplayer(frame.contentWindow, frame, key));
          }
          if ((node as Element).tagName === 'OBJECT') {
            console.log('Added object!', nodeId);
            const object = node as HTMLObjectElement;
            const key = `${this.path}_${nodeId}`;
            replayers.set(key, new DomReplayer(object.contentWindow, object, key));
          }
          break;
        case 'removed':
          parentNode.removeChild(node);
          break;
        case 'attribute':
          this.setNodeAttributes(node as Element, event);
          break;
        case 'property':
          this.setNodeProperties(node as Element, event);
          break;
        case 'text':
          node.textContent = textContent;
          break;
      }
    } catch (error) {
      console.log('ERROR applying action', error.stack, parentNode, node, event);
    }
  }

  onNewDocument(textContent: string) {
    const href = textContent;
    const newUrl = new URL(href);

    if (!this.isMainFrame) {
      if (this.element instanceof HTMLObjectElement) {
        this.element.data = textContent;
        return;
      }
      this.window.location.href = newUrl.href;
    }
    this.window?.scrollTo({ top: 0 });

    this.document.documentElement.innerHTML = '';
    while (this.document.documentElement.previousSibling) {
      const prev = this.document.documentElement.previousSibling;
      if (prev === this.document.doctype) break;
      prev.remove();
    }

    if (this.isMainFrame && this.window.location.origin === newUrl.origin) {
      this.window.history.replaceState({}, 'Replay', href);
    }
  }

  getNode(id: number) {
    if (id === null || id === undefined) return null;
    return this.idMap.get(id);
  }

  setNodeAttributes(node: Element, data: IFrontendDomChangeEvent) {
    if (!data.attributes) return;
    for (const [name, value] of Object.entries(data.attributes)) {
      const ns = data.attributeNamespaces ? data.attributeNamespaces[name] : null;
      try {
        if (name === 'xmlns' || name.startsWith('xmlns') || node.tagName === 'HTML') {
          node.setAttribute(name, value);
        } else {
          node.setAttributeNS(ns || null, name, value);
        }
      } catch (err) {
        if (
          !err.toString().includes('not a valid attribute name') &&
          !err.toString().includes('qualified name')
        )
          throw err;
      }
    }
  }

  setNodeProperties(node: Element, data: IFrontendDomChangeEvent) {
    if (!data.properties) return;
    for (const [name, value] of Object.entries(data.properties)) {
      if (name === 'sheet.cssRules') {
        const sheet = (node as HTMLStyleElement).sheet as CSSStyleSheet;
        for (let i = 0; i < sheet.cssRules.length; i += 1) {
          sheet.deleteRule(i);
        }
        for (const rule of value as string[]) {
          sheet.insertRule(rule);
        }
      }
      node[name] = value;
    }
  }

  deserializeNode(data: IFrontendDomChangeEvent, parent: Element): Node {
    if (data === null) return null;

    let node = this.getNode(data.nodeId);
    if (node) return node;

    if (parent && typeof parent.attachShadow === 'function' && data.nodeType === SHADOW_NODE_TYPE) {
      // NOTE: we just make all shadows open in replay
      node = parent.attachShadow({ mode: 'open' });
      this.idMap.set(data.nodeId, node);
      return node;
    }

    switch (data.nodeType) {
      case Node.COMMENT_NODE:
        node = this.document.createComment(data.textContent);
        break;

      case Node.TEXT_NODE:
        node = this.document.createTextNode(data.textContent);
        break;

      case Node.ELEMENT_NODE:
        if (!node) {
          if (data.namespaceUri) {
            node = this.document.createElementNS(data.namespaceUri, data.tagName);
          } else {
            node = this.document.createElement(data.tagName);
          }
        }
        this.setNodeAttributes(node as Element, data);
        if (data.textContent) {
          node.textContent = data.textContent;
        }

        break;
    }

    if (!node) throw new Error(`Unable to translate node! nodeType = ${data.nodeType}`);

    this.idMap.set(data.nodeId, node);

    return node;
  }
}

/////// / DOM HIGHLIGHTER ///////////////////////////////////////////////////////////////////////////

const styleElement = document.createElement('style');
styleElement.textContent = `
  sa-overflow-bar {
    width: 500px;
    background-color:#3498db;
    margin:0 auto; 
    height: 100%;
    box-shadow: 3px 0 0 0 #3498db;
    display:block;
  }
  
  sa-overflow {
    z-index:10000;
    display:block;
    width:100%; 
    height:8px; 
    position:fixed;
    pointer-events: none;
  }
  
  sa-highlight {
    z-index:10000;
    position:absolute;
    box-shadow: 1px 1px 3px 0 #3498db;
    border-radius:3px;
    border:1px solid #3498db;
    padding:5px;
    pointer-events: none;
  }
  
  sa-mouse-pointer {
    pointer-events: none;
    position: absolute;
    top: 0;
    z-index: 10000;
    left: 0;
    width: 20px;
    height: 20px;
    background: rgba(0,0,0,.4);
    border: 1px solid white;
    border-radius: 10px;
    margin: -10px 0 0 -10px;
    padding: 0;
    transition: background .2s, border-radius .2s, border-color .2s;
  }
  sa-mouse-pointer.button-1 {
    transition: none;
    background: rgba(0,0,0,0.9);
  }
  sa-mouse-pointer.button-2 {
    transition: none;
    border-color: rgba(0,0,255,0.9);
  }
  sa-mouse-pointer.button-3 {
    transition: none;
    border-radius: 4px;
  }
  sa-mouse-pointer.button-4 {
    transition: none;
    border-color: rgba(255,0,0,0.9);
  }
  sa-mouse-pointer.button-5 {
    transition: none;
    border-color: rgba(0,255,0,0.9);
  }
`;
replayShadow.appendChild(styleElement);

const highlightElements: any[] = [];

const overflowBar = `<sa-overflow-bar>&nbsp;</sa-overflow-bar>`;

const showMoreUp = document.createElement('sa-overflow');
showMoreUp.setAttribute('style', 'top:0;');
showMoreUp.innerHTML = overflowBar;

const showMoreDown = document.createElement('sa-overflow');
showMoreDown.setAttribute('style', 'bottom:0;');
showMoreDown.innerHTML = overflowBar;

function buildHover() {
  const hoverNode = document.createElement('sa-highlight');

  highlightElements.push(hoverNode);
  replayShadow.appendChild(hoverNode);
  return hoverNode;
}

function highlightNodes(nodeIds: number[]) {
  lastHighlightNodes = nodeIds;
  const length = nodeIds ? nodeIds.length : 0;
  try {
    minHighlightTop = 10e3;
    maxHighlightTop = -1;
    for (let i = 0; i < length; i += 1) {
      const node = replayers.get(null).idMap.get(nodeIds[i]);
      const hoverNode = i >= highlightElements.length ? buildHover() : highlightElements[i];
      if (!node) {
        highlightElements[i].remove();
        continue;
      }
      const element = node.nodeType === node.TEXT_NODE ? node.parentElement : (node as Element);
      const bounds = element.getBoundingClientRect();
      bounds.x += window.scrollX;
      bounds.y += window.scrollY;
      hoverNode.style.width = `${bounds.width}px`;
      hoverNode.style.height = `${bounds.height}px`;
      hoverNode.style.top = `${bounds.top - 5}px`;
      hoverNode.style.left = `${bounds.left - 5}px`;

      if (bounds.y > maxHighlightTop) maxHighlightTop = bounds.y;
      if (bounds.y + bounds.height < minHighlightTop) minHighlightTop = bounds.y + bounds.height;
      replayShadow.appendChild(hoverNode);
    }

    checkOverflows();
    for (let i = length; i < highlightElements.length; i += 1) {
      highlightElements[i].remove();
    }
  } catch (err) {
    console.log(err);
  }
}

function checkOverflows() {
  if (maxHighlightTop > window.innerHeight + window.scrollY) {
    replayShadow.appendChild(showMoreDown);
  } else {
    showMoreDown.remove();
  }

  if (minHighlightTop < window.scrollY) {
    replayShadow.appendChild(showMoreUp);
  } else {
    showMoreUp.remove();
  }
}

document.addEventListener('scroll', () => checkOverflows());

/////// mouse ///////
let lastMouseEvent: IMouseEvent;
const mouse = document.createElement('sa-mouse-pointer');
replayShadow.appendChild(mouse);

function updateMouse(mouseEvent: IMouseEvent) {
  lastMouseEvent = mouseEvent;
  if (mouseEvent.pageX !== undefined) {
    mouse.style.left = `${mouseEvent.pageX}px`;
    mouse.style.top = `${mouseEvent.pageY}px`;
  }
  if (mouseEvent.buttons !== undefined) {
    for (let i = 0; i < 5; i += 1) {
      mouse.classList.toggle(`button-${i}`, (mouseEvent.buttons & (1 << i)) !== 0);
    }
  }
}

// // other events /////

function updateScroll(scrollEvent: IScrollRecord) {
  window.scroll({
    behavior: 'auto',
    top: scrollEvent.scrollY,
    left: scrollEvent.scrollX,
  });
}
