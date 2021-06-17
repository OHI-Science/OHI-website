import PopupMenu from './PopupMenu.js'

/*
*   Adapted from: https://www.w3.org/TR/wai-aria-practices-1.1/examples/menubar/menubar-1/menubar-1.html
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
var MenubarItem = function (domNode, menuObj) {

  this.menu = menuObj;
  this.domNode = domNode;
  this.popupMenu = false;

  this.hasFocus = false;
  this.hasHover = false;

  this.isMenubarItem = true;

  this.keyCode = Object.freeze({
    'TAB': 9,
    'RETURN': 13,
    'ESC': 27,
    'SPACE': 32,
    'PAGEUP': 33,
    'PAGEDOWN': 34,
    'END': 35,
    'HOME': 36,
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40
  });
};

MenubarItem.prototype.init = function () {
  this.domNode.tabIndex = -1;

  this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
  this.domNode.addEventListener('focus', this.handleFocus.bind(this));
  this.domNode.addEventListener('blur', this.handleBlur.bind(this));
  this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
  this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));
  this.domNode.addEventListener('click', this.handleClick.bind(this));

  // Initialize pop up menus

  var nextElement = this.domNode.nextElementSibling;

  if (nextElement && nextElement.tagName === 'UL') {
    this.popupMenu = new PopupMenu(nextElement, this);
    this.popupMenu.init();
  }

};

MenubarItem.prototype.handleKeydown = function (event) {

  var tgt = event.currentTarget,
    char = event.key,
    flag = false,
    clickEvent;

  function isPrintableCharacter (str) {
    return str.length === 1 && str.match(/\S/);
  }

  switch (event.keyCode) {
    case this.keyCode.SPACE:
    case this.keyCode.RETURN:
    case this.keyCode.DOWN:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToFirstItem();
        flag = true;
      }
      break;

    case this.keyCode.LEFT:
      this.menu.setFocusToPreviousItem(this);
      flag = true;
      break;

    case this.keyCode.RIGHT:
      this.menu.setFocusToNextItem(this);
      flag = true;
      break;

    case this.keyCode.UP:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToLastItem();
        flag = true;
      }
      break;

    case this.keyCode.HOME:
    case this.keyCode.PAGEUP:
      this.menu.setFocusToFirstItem();
      flag = true;
      break;

    case this.keyCode.END:
    case this.keyCode.PAGEDOWN:
      this.menu.setFocusToLastItem();
      flag = true;
      break;

    case this.keyCode.TAB:
      if (this.popupMenu) {
        this.popupMenu.close(true);
      }
      break;

    case this.keyCode.ESC:
      if (this.popupMenu) {
        this.popupMenu.close(true);
      }
      break;

    default:
      if (isPrintableCharacter(char)) {
        this.menu.setFocusByFirstCharacter(this, char);
        flag = true;
      }
      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

MenubarItem.prototype.setExpanded = function (value) {
  if (value) {
    this.isExpanded = true;
    this.domNode.setAttribute('aria-expanded', 'true');
  }
  else {
    this.isExpanded = false;
    this.domNode.setAttribute('aria-expanded', 'false');
  }
};

MenubarItem.prototype.handleFocus = function (event) {
  this.menu.hasFocus = true;
};

MenubarItem.prototype.handleBlur = function (event) {
  this.menu.hasFocus = false;
};

MenubarItem.prototype.handleMouseover = function (event) {
  if (!this.popupMenu) {
    return
  }
  // hover is for the desktop version of the menu only
  if (this.menu.isMobile) {
    return
  }
  this.hasHover = true;
  setTimeout(this.popupMenu.open.bind(this.popupMenu, false), this.menu.delay);
};

MenubarItem.prototype.handleMouseout = function (event) {
  if (!this.popupMenu) {
    return
  }
  // hover is for the desktop version of the menu only
  if (this.menu.isMobile) {
    return
  }
  this.hasHover = false;
  setTimeout(this.popupMenu.close.bind(this.popupMenu, false), this.menu.delay);
};

MenubarItem.prototype.handleClick = function (event) {
  if (!this.popupMenu) {
    return
  }
  // Click (or touch) should only work on the mobile version of the menu
  if (!this.menu.isMobile) {
    return
  }
  // Only one popup should be open at a time on mobile
  if (this.isExpanded) {
    this.popupMenu.close();
  } else {
    this.menu.closeAllPopups();
    this.popupMenu.open();
    event.stopPropagation();
    event.preventDefault();
  }
};

export default MenubarItem