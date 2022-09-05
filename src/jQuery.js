window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements;
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") {
      elements = [createElements(selectorOrArrayOrTemplate)];
    } else {
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }
  function createElements(string) {
    const container = document.Element("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }
  const api = Object.create(jQuery.prototype);

  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArrayOrTemplate.oldApi,
  });
  return api;
};
jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  jQuery: true,
  addClass(className) {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      element.classList.add(className);
    }
    return this;
  },
  find(selector) {
    let array = [];
    for (let i = 0; i < elements.length; i++) {
      const elements2 = Array.from(elements[i].querySelectorAll(selector));
      array = array.concat(elements2);
    }
    array.oldApi = this;
    return jQuery(array);
  },
};
