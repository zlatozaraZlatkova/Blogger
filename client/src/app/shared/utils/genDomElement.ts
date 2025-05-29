
export function genElements(tag: string, parent: HTMLElement, options: any): HTMLElement {

  const element = document.createElement(tag);
  
  if (options.id) {
    element.id = options.id;
  }

  if (options.src && element instanceof HTMLScriptElement) {
    element.src = options.src;
   
  }

  parent.appendChild(element);

  
  return element;
}

