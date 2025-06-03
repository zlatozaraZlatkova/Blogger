
export function genElements(tag: string, parent: HTMLElement, options: any): HTMLElement {
  const element = document.createElement(tag);
  
  if (options.id) {
    element.id = options.id;
  }

  if (options.className) {
    element.className = options.className;
  }

  if (element instanceof HTMLScriptElement) {
    if (options.src) {
      element.src = options.src;
    }

    if (options.async) {
      element.async = options.async;
    }

    if (options.defer) {
      element.defer = options.defer;
    }
  }

  
  parent.appendChild(element);
  
  return element;
}