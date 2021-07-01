(() => {
  var __defProp = Object.defineProperty;
  var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };

  // ns-params:@params
  var breakpoint, dataConfig, params_default;
  var init_params = __esm(() => {
    breakpoint = 900;
    dataConfig = '\n{\n  "goalIconsDirPath" : "/images/goal-icons/",\n  "missingValueCode" : "NA",\n  "dataPaths": {"goals": "https://ohi-science.org/OHI-website/data/goalLabels.json"\n        ,"regions": "https://ohi-science.org/OHI-website/data/regions.topojson"\n        ,"scores": "https://ohi-science.org/OHI-website/data/scores.csv"\n        }\n}\n';
    params_default = {breakpoint, dataConfig};
  });

  // node_modules/d3-selection/src/namespaces.js
  var xhtml, namespaces_default;
  var init_namespaces = __esm(() => {
    xhtml = "http://www.w3.org/1999/xhtml";
    namespaces_default = {
      svg: "http://www.w3.org/2000/svg",
      xhtml,
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/"
    };
  });

  // node_modules/d3-selection/src/namespace.js
  function namespace_default(name) {
    var prefix = name += "", i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns")
      name = name.slice(i + 1);
    return namespaces_default.hasOwnProperty(prefix) ? {space: namespaces_default[prefix], local: name} : name;
  }
  var init_namespace = __esm(() => {
    init_namespaces();
  });

  // node_modules/d3-selection/src/creator.js
  function creatorInherit(name) {
    return function() {
      var document2 = this.ownerDocument, uri = this.namespaceURI;
      return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
    };
  }
  function creatorFixed(fullname) {
    return function() {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }
  function creator_default(name) {
    var fullname = namespace_default(name);
    return (fullname.local ? creatorFixed : creatorInherit)(fullname);
  }
  var init_creator = __esm(() => {
    init_namespace();
    init_namespaces();
  });

  // node_modules/d3-selection/src/selector.js
  function none() {
  }
  function selector_default(selector) {
    return selector == null ? none : function() {
      return this.querySelector(selector);
    };
  }
  var init_selector = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/select.js
  function select_default(select) {
    if (typeof select !== "function")
      select = selector_default(select);
    for (var groups2 = this._groups, m = groups2.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group2 = groups2[j], n = group2.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group2[i]) && (subnode = select.call(node, node.__data__, i, group2))) {
          if ("__data__" in node)
            subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }
    return new Selection(subgroups, this._parents);
  }
  var init_select = __esm(() => {
    init_selection();
    init_selector();
  });

  // node_modules/d3-selection/src/array.js
  function array(x2) {
    return x2 == null ? [] : Array.isArray(x2) ? x2 : Array.from(x2);
  }
  var init_array = __esm(() => {
  });

  // node_modules/d3-selection/src/selectorAll.js
  function empty() {
    return [];
  }
  function selectorAll_default(selector) {
    return selector == null ? empty : function() {
      return this.querySelectorAll(selector);
    };
  }
  var init_selectorAll = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/selectAll.js
  function arrayAll(select) {
    return function() {
      return array(select.apply(this, arguments));
    };
  }
  function selectAll_default(select) {
    if (typeof select === "function")
      select = arrayAll(select);
    else
      select = selectorAll_default(select);
    for (var groups2 = this._groups, m = groups2.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group2 = groups2[j], n = group2.length, node, i = 0; i < n; ++i) {
        if (node = group2[i]) {
          subgroups.push(select.call(node, node.__data__, i, group2));
          parents.push(node);
        }
      }
    }
    return new Selection(subgroups, parents);
  }
  var init_selectAll = __esm(() => {
    init_selection();
    init_array();
    init_selectorAll();
  });

  // node_modules/d3-selection/src/matcher.js
  function matcher_default(selector) {
    return function() {
      return this.matches(selector);
    };
  }
  function childMatcher(selector) {
    return function(node) {
      return node.matches(selector);
    };
  }
  var init_matcher = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/selectChild.js
  function childFind(match) {
    return function() {
      return find.call(this.children, match);
    };
  }
  function childFirst() {
    return this.firstElementChild;
  }
  function selectChild_default(match) {
    return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
  }
  var find;
  var init_selectChild = __esm(() => {
    init_matcher();
    find = Array.prototype.find;
  });

  // node_modules/d3-selection/src/selection/selectChildren.js
  function children() {
    return Array.from(this.children);
  }
  function childrenFilter(match) {
    return function() {
      return filter.call(this.children, match);
    };
  }
  function selectChildren_default(match) {
    return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
  }
  var filter;
  var init_selectChildren = __esm(() => {
    init_matcher();
    filter = Array.prototype.filter;
  });

  // node_modules/d3-selection/src/selection/filter.js
  function filter_default(match) {
    if (typeof match !== "function")
      match = matcher_default(match);
    for (var groups2 = this._groups, m = groups2.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group2 = groups2[j], n = group2.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group2[i]) && match.call(node, node.__data__, i, group2)) {
          subgroup.push(node);
        }
      }
    }
    return new Selection(subgroups, this._parents);
  }
  var init_filter = __esm(() => {
    init_selection();
    init_matcher();
  });

  // node_modules/d3-selection/src/selection/sparse.js
  function sparse_default(update) {
    return new Array(update.length);
  }
  var init_sparse = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/enter.js
  function enter_default() {
    return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
  }
  function EnterNode(parent, datum2) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum2;
  }
  var init_enter = __esm(() => {
    init_sparse();
    init_selection();
    EnterNode.prototype = {
      constructor: EnterNode,
      appendChild: function(child) {
        return this._parent.insertBefore(child, this._next);
      },
      insertBefore: function(child, next) {
        return this._parent.insertBefore(child, next);
      },
      querySelector: function(selector) {
        return this._parent.querySelector(selector);
      },
      querySelectorAll: function(selector) {
        return this._parent.querySelectorAll(selector);
      }
    };
  });

  // node_modules/d3-selection/src/constant.js
  function constant_default(x2) {
    return function() {
      return x2;
    };
  }
  var init_constant = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/data.js
  function bindIndex(parent, group2, enter, update, exit, data2) {
    var i = 0, node, groupLength = group2.length, dataLength = data2.length;
    for (; i < dataLength; ++i) {
      if (node = group2[i]) {
        node.__data__ = data2[i];
        update[i] = node;
      } else {
        enter[i] = new EnterNode(parent, data2[i]);
      }
    }
    for (; i < groupLength; ++i) {
      if (node = group2[i]) {
        exit[i] = node;
      }
    }
  }
  function bindKey(parent, group2, enter, update, exit, data2, key) {
    var i, node, nodeByKeyValue = new Map(), groupLength = group2.length, dataLength = data2.length, keyValues = new Array(groupLength), keyValue;
    for (i = 0; i < groupLength; ++i) {
      if (node = group2[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group2) + "";
        if (nodeByKeyValue.has(keyValue)) {
          exit[i] = node;
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
      }
    }
    for (i = 0; i < dataLength; ++i) {
      keyValue = key.call(parent, data2[i], i, data2) + "";
      if (node = nodeByKeyValue.get(keyValue)) {
        update[i] = node;
        node.__data__ = data2[i];
        nodeByKeyValue.delete(keyValue);
      } else {
        enter[i] = new EnterNode(parent, data2[i]);
      }
    }
    for (i = 0; i < groupLength; ++i) {
      if ((node = group2[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
        exit[i] = node;
      }
    }
  }
  function datum(node) {
    return node.__data__;
  }
  function data_default(value, key) {
    if (!arguments.length)
      return Array.from(this, datum);
    var bind = key ? bindKey : bindIndex, parents = this._parents, groups2 = this._groups;
    if (typeof value !== "function")
      value = constant_default(value);
    for (var m = groups2.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j], group2 = groups2[j], groupLength = group2.length, data2 = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data2.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
      bind(parent, group2, enterGroup, updateGroup, exitGroup, data2, key);
      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if (previous = enterGroup[i0]) {
          if (i0 >= i1)
            i1 = i0 + 1;
          while (!(next = updateGroup[i1]) && ++i1 < dataLength)
            ;
          previous._next = next || null;
        }
      }
    }
    update = new Selection(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }
  function arraylike(data2) {
    return typeof data2 === "object" && "length" in data2 ? data2 : Array.from(data2);
  }
  var init_data = __esm(() => {
    init_selection();
    init_enter();
    init_constant();
  });

  // node_modules/d3-selection/src/selection/exit.js
  function exit_default() {
    return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
  }
  var init_exit = __esm(() => {
    init_sparse();
    init_selection();
  });

  // node_modules/d3-selection/src/selection/join.js
  function join_default(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    if (typeof onenter === "function") {
      enter = onenter(enter);
      if (enter)
        enter = enter.selection();
    } else {
      enter = enter.append(onenter + "");
    }
    if (onupdate != null) {
      update = onupdate(update);
      if (update)
        update = update.selection();
    }
    if (onexit == null)
      exit.remove();
    else
      onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }
  var init_join = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/merge.js
  function merge_default(context) {
    var selection2 = context.selection ? context.selection() : context;
    for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge2 = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge2[i] = node;
        }
      }
    }
    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }
    return new Selection(merges, this._parents);
  }
  var init_merge = __esm(() => {
    init_selection();
  });

  // node_modules/d3-selection/src/selection/order.js
  function order_default() {
    for (var groups2 = this._groups, j = -1, m = groups2.length; ++j < m; ) {
      for (var group2 = groups2[j], i = group2.length - 1, next = group2[i], node; --i >= 0; ) {
        if (node = group2[i]) {
          if (next && node.compareDocumentPosition(next) ^ 4)
            next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }
    return this;
  }
  var init_order = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/sort.js
  function sort_default(compare) {
    if (!compare)
      compare = ascending;
    function compareNode(a2, b) {
      return a2 && b ? compare(a2.__data__, b.__data__) : !a2 - !b;
    }
    for (var groups2 = this._groups, m = groups2.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group2 = groups2[j], n = group2.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group2[i]) {
          sortgroup[i] = node;
        }
      }
      sortgroup.sort(compareNode);
    }
    return new Selection(sortgroups, this._parents).order();
  }
  function ascending(a2, b) {
    return a2 < b ? -1 : a2 > b ? 1 : a2 >= b ? 0 : NaN;
  }
  var init_sort = __esm(() => {
    init_selection();
  });

  // node_modules/d3-selection/src/selection/call.js
  function call_default() {
    var callback2 = arguments[0];
    arguments[0] = this;
    callback2.apply(null, arguments);
    return this;
  }
  var init_call = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/nodes.js
  function nodes_default() {
    return Array.from(this);
  }
  var init_nodes = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/node.js
  function node_default() {
    for (var groups2 = this._groups, j = 0, m = groups2.length; j < m; ++j) {
      for (var group2 = groups2[j], i = 0, n = group2.length; i < n; ++i) {
        var node = group2[i];
        if (node)
          return node;
      }
    }
    return null;
  }
  var init_node = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/size.js
  function size_default() {
    let size = 0;
    for (const node of this)
      ++size;
    return size;
  }
  var init_size = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/empty.js
  function empty_default() {
    return !this.node();
  }
  var init_empty = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/each.js
  function each_default(callback2) {
    for (var groups2 = this._groups, j = 0, m = groups2.length; j < m; ++j) {
      for (var group2 = groups2[j], i = 0, n = group2.length, node; i < n; ++i) {
        if (node = group2[i])
          callback2.call(node, node.__data__, i, group2);
      }
    }
    return this;
  }
  var init_each = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/attr.js
  function attrRemove(name) {
    return function() {
      this.removeAttribute(name);
    };
  }
  function attrRemoveNS(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }
  function attrConstant(name, value) {
    return function() {
      this.setAttribute(name, value);
    };
  }
  function attrConstantNS(fullname, value) {
    return function() {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }
  function attrFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null)
        this.removeAttribute(name);
      else
        this.setAttribute(name, v);
    };
  }
  function attrFunctionNS(fullname, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null)
        this.removeAttributeNS(fullname.space, fullname.local);
      else
        this.setAttributeNS(fullname.space, fullname.local, v);
    };
  }
  function attr_default(name, value) {
    var fullname = namespace_default(name);
    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
    }
    return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
  }
  var init_attr = __esm(() => {
    init_namespace();
  });

  // node_modules/d3-selection/src/window.js
  function window_default(node) {
    return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
  }
  var init_window = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/style.js
  function styleRemove(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }
  function styleConstant(name, value, priority) {
    return function() {
      this.style.setProperty(name, value, priority);
    };
  }
  function styleFunction(name, value, priority) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null)
        this.style.removeProperty(name);
      else
        this.style.setProperty(name, v, priority);
    };
  }
  function style_default(name, value, priority) {
    return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
  }
  function styleValue(node, name) {
    return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
  }
  var init_style = __esm(() => {
    init_window();
  });

  // node_modules/d3-selection/src/selection/property.js
  function propertyRemove(name) {
    return function() {
      delete this[name];
    };
  }
  function propertyConstant(name, value) {
    return function() {
      this[name] = value;
    };
  }
  function propertyFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null)
        delete this[name];
      else
        this[name] = v;
    };
  }
  function property_default(name, value) {
    return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
  }
  var init_property = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/classed.js
  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }
  function classList(node) {
    return node.classList || new ClassList(node);
  }
  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }
  function classedAdd(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n)
      list.add(names[i]);
  }
  function classedRemove(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n)
      list.remove(names[i]);
  }
  function classedTrue(names) {
    return function() {
      classedAdd(this, names);
    };
  }
  function classedFalse(names) {
    return function() {
      classedRemove(this, names);
    };
  }
  function classedFunction(names, value) {
    return function() {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }
  function classed_default(name, value) {
    var names = classArray(name + "");
    if (arguments.length < 2) {
      var list = classList(this.node()), i = -1, n = names.length;
      while (++i < n)
        if (!list.contains(names[i]))
          return false;
      return true;
    }
    return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
  }
  var init_classed = __esm(() => {
    ClassList.prototype = {
      add: function(name) {
        var i = this._names.indexOf(name);
        if (i < 0) {
          this._names.push(name);
          this._node.setAttribute("class", this._names.join(" "));
        }
      },
      remove: function(name) {
        var i = this._names.indexOf(name);
        if (i >= 0) {
          this._names.splice(i, 1);
          this._node.setAttribute("class", this._names.join(" "));
        }
      },
      contains: function(name) {
        return this._names.indexOf(name) >= 0;
      }
    };
  });

  // node_modules/d3-selection/src/selection/text.js
  function textRemove() {
    this.textContent = "";
  }
  function textConstant(value) {
    return function() {
      this.textContent = value;
    };
  }
  function textFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    };
  }
  function text_default(value) {
    return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
  }
  var init_text = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/html.js
  function htmlRemove() {
    this.innerHTML = "";
  }
  function htmlConstant(value) {
    return function() {
      this.innerHTML = value;
    };
  }
  function htmlFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    };
  }
  function html_default(value) {
    return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
  }
  var init_html = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/raise.js
  function raise() {
    if (this.nextSibling)
      this.parentNode.appendChild(this);
  }
  function raise_default() {
    return this.each(raise);
  }
  var init_raise = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/lower.js
  function lower() {
    if (this.previousSibling)
      this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }
  function lower_default() {
    return this.each(lower);
  }
  var init_lower = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/append.js
  function append_default(name) {
    var create2 = typeof name === "function" ? name : creator_default(name);
    return this.select(function() {
      return this.appendChild(create2.apply(this, arguments));
    });
  }
  var init_append = __esm(() => {
    init_creator();
  });

  // node_modules/d3-selection/src/selection/insert.js
  function constantNull() {
    return null;
  }
  function insert_default(name, before) {
    var create2 = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
    return this.select(function() {
      return this.insertBefore(create2.apply(this, arguments), select.apply(this, arguments) || null);
    });
  }
  var init_insert = __esm(() => {
    init_creator();
    init_selector();
  });

  // node_modules/d3-selection/src/selection/remove.js
  function remove() {
    var parent = this.parentNode;
    if (parent)
      parent.removeChild(this);
  }
  function remove_default() {
    return this.each(remove);
  }
  var init_remove = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/clone.js
  function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }
  function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }
  function clone_default(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }
  var init_clone = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/datum.js
  function datum_default(value) {
    return arguments.length ? this.property("__data__", value) : this.node().__data__;
  }
  var init_datum = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/on.js
  function contextListener(listener) {
    return function(event) {
      listener.call(this, event, this.__data__);
    };
  }
  function parseTypenames(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0)
        name = t.slice(i + 1), t = t.slice(0, i);
      return {type: t, name};
    });
  }
  function onRemove(typename) {
    return function() {
      var on = this.__on;
      if (!on)
        return;
      for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
        if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
        } else {
          on[++i] = o;
        }
      }
      if (++i)
        on.length = i;
      else
        delete this.__on;
    };
  }
  function onAdd(typename, value, options) {
    return function() {
      var on = this.__on, o, listener = contextListener(value);
      if (on)
        for (var j = 0, m = on.length; j < m; ++j) {
          if ((o = on[j]).type === typename.type && o.name === typename.name) {
            this.removeEventListener(o.type, o.listener, o.options);
            this.addEventListener(o.type, o.listener = listener, o.options = options);
            o.value = value;
            return;
          }
        }
      this.addEventListener(typename.type, listener, options);
      o = {type: typename.type, name: typename.name, value, listener, options};
      if (!on)
        this.__on = [o];
      else
        on.push(o);
    };
  }
  function on_default(typename, value, options) {
    var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
    if (arguments.length < 2) {
      var on = this.node().__on;
      if (on)
        for (var j = 0, m = on.length, o; j < m; ++j) {
          for (i = 0, o = on[j]; i < n; ++i) {
            if ((t = typenames[i]).type === o.type && t.name === o.name) {
              return o.value;
            }
          }
        }
      return;
    }
    on = value ? onAdd : onRemove;
    for (i = 0; i < n; ++i)
      this.each(on(typenames[i], value, options));
    return this;
  }
  var init_on = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/dispatch.js
  function dispatchEvent(node, type, params2) {
    var window2 = window_default(node), event = window2.CustomEvent;
    if (typeof event === "function") {
      event = new event(type, params2);
    } else {
      event = window2.document.createEvent("Event");
      if (params2)
        event.initEvent(type, params2.bubbles, params2.cancelable), event.detail = params2.detail;
      else
        event.initEvent(type, false, false);
    }
    node.dispatchEvent(event);
  }
  function dispatchConstant(type, params2) {
    return function() {
      return dispatchEvent(this, type, params2);
    };
  }
  function dispatchFunction(type, params2) {
    return function() {
      return dispatchEvent(this, type, params2.apply(this, arguments));
    };
  }
  function dispatch_default(type, params2) {
    return this.each((typeof params2 === "function" ? dispatchFunction : dispatchConstant)(type, params2));
  }
  var init_dispatch = __esm(() => {
    init_window();
  });

  // node_modules/d3-selection/src/selection/iterator.js
  function* iterator_default() {
    for (var groups2 = this._groups, j = 0, m = groups2.length; j < m; ++j) {
      for (var group2 = groups2[j], i = 0, n = group2.length, node; i < n; ++i) {
        if (node = group2[i])
          yield node;
      }
    }
  }
  var init_iterator = __esm(() => {
  });

  // node_modules/d3-selection/src/selection/index.js
  function Selection(groups2, parents) {
    this._groups = groups2;
    this._parents = parents;
  }
  function selection() {
    return new Selection([[document.documentElement]], root);
  }
  function selection_selection() {
    return this;
  }
  var root, selection_default;
  var init_selection = __esm(() => {
    init_select();
    init_selectAll();
    init_selectChild();
    init_selectChildren();
    init_filter();
    init_data();
    init_enter();
    init_exit();
    init_join();
    init_merge();
    init_order();
    init_sort();
    init_call();
    init_nodes();
    init_node();
    init_size();
    init_empty();
    init_each();
    init_attr();
    init_style();
    init_property();
    init_classed();
    init_text();
    init_html();
    init_raise();
    init_lower();
    init_append();
    init_insert();
    init_remove();
    init_clone();
    init_datum();
    init_on();
    init_dispatch();
    init_iterator();
    root = [null];
    Selection.prototype = selection.prototype = {
      constructor: Selection,
      select: select_default,
      selectAll: selectAll_default,
      selectChild: selectChild_default,
      selectChildren: selectChildren_default,
      filter: filter_default,
      data: data_default,
      enter: enter_default,
      exit: exit_default,
      join: join_default,
      merge: merge_default,
      selection: selection_selection,
      order: order_default,
      sort: sort_default,
      call: call_default,
      nodes: nodes_default,
      node: node_default,
      size: size_default,
      empty: empty_default,
      each: each_default,
      attr: attr_default,
      style: style_default,
      property: property_default,
      classed: classed_default,
      text: text_default,
      html: html_default,
      raise: raise_default,
      lower: lower_default,
      append: append_default,
      insert: insert_default,
      remove: remove_default,
      clone: clone_default,
      datum: datum_default,
      on: on_default,
      dispatch: dispatch_default,
      [Symbol.iterator]: iterator_default
    };
    selection_default = selection;
  });

  // node_modules/d3-selection/src/select.js
  function select_default2(selector) {
    return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
  }
  var init_select2 = __esm(() => {
    init_selection();
  });

  // node_modules/d3-selection/src/create.js
  function create_default(name) {
    return select_default2(creator_default(name).call(document.documentElement));
  }
  var init_create = __esm(() => {
    init_creator();
    init_select2();
  });

  // node_modules/d3-selection/src/local.js
  function local() {
    return new Local();
  }
  function Local() {
    this._ = "@" + (++nextId).toString(36);
  }
  var nextId;
  var init_local = __esm(() => {
    nextId = 0;
    Local.prototype = local.prototype = {
      constructor: Local,
      get: function(node) {
        var id3 = this._;
        while (!(id3 in node))
          if (!(node = node.parentNode))
            return;
        return node[id3];
      },
      set: function(node, value) {
        return node[this._] = value;
      },
      remove: function(node) {
        return this._ in node && delete node[this._];
      },
      toString: function() {
        return this._;
      }
    };
  });

  // node_modules/d3-selection/src/sourceEvent.js
  function sourceEvent_default(event) {
    let sourceEvent;
    while (sourceEvent = event.sourceEvent)
      event = sourceEvent;
    return event;
  }
  var init_sourceEvent = __esm(() => {
  });

  // node_modules/d3-selection/src/pointer.js
  function pointer_default(event, node) {
    event = sourceEvent_default(event);
    if (node === void 0)
      node = event.currentTarget;
    if (node) {
      var svg2 = node.ownerSVGElement || node;
      if (svg2.createSVGPoint) {
        var point6 = svg2.createSVGPoint();
        point6.x = event.clientX, point6.y = event.clientY;
        point6 = point6.matrixTransform(node.getScreenCTM().inverse());
        return [point6.x, point6.y];
      }
      if (node.getBoundingClientRect) {
        var rect = node.getBoundingClientRect();
        return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
      }
    }
    return [event.pageX, event.pageY];
  }
  var init_pointer = __esm(() => {
    init_sourceEvent();
  });

  // node_modules/d3-selection/src/pointers.js
  function pointers_default(events, node) {
    if (events.target) {
      events = sourceEvent_default(events);
      if (node === void 0)
        node = events.currentTarget;
      events = events.touches || [events];
    }
    return Array.from(events, (event) => pointer_default(event, node));
  }
  var init_pointers = __esm(() => {
    init_pointer();
    init_sourceEvent();
  });

  // node_modules/d3-selection/src/selectAll.js
  function selectAll_default2(selector) {
    return typeof selector === "string" ? new Selection([document.querySelectorAll(selector)], [document.documentElement]) : new Selection([array(selector)], root);
  }
  var init_selectAll2 = __esm(() => {
    init_array();
    init_selection();
  });

  // node_modules/d3-selection/src/index.js
  var src_exports = {};
  __export(src_exports, {
    create: () => create_default,
    creator: () => creator_default,
    local: () => local,
    matcher: () => matcher_default,
    namespace: () => namespace_default,
    namespaces: () => namespaces_default,
    pointer: () => pointer_default,
    pointers: () => pointers_default,
    select: () => select_default2,
    selectAll: () => selectAll_default2,
    selection: () => selection_default,
    selector: () => selector_default,
    selectorAll: () => selectorAll_default,
    style: () => styleValue,
    window: () => window_default
  });
  var init_src = __esm(() => {
    init_create();
    init_creator();
    init_local();
    init_matcher();
    init_namespace();
    init_namespaces();
    init_pointer();
    init_pointers();
    init_select2();
    init_selectAll2();
    init_selection();
    init_selector();
    init_selectorAll();
    init_style();
    init_window();
  });

  // node_modules/d3-color/src/define.js
  function define_default(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }
  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition)
      prototype[key] = definition[key];
    return prototype;
  }
  var init_define = __esm(() => {
  });

  // node_modules/d3-color/src/color.js
  function Color() {
  }
  function color_formatHex() {
    return this.rgb().formatHex();
  }
  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }
  function color_formatRgb() {
    return this.rgb().formatRgb();
  }
  function color(format2) {
    var m, l;
    format2 = (format2 + "").trim().toLowerCase();
    return (m = reHex.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format2)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format2)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format2)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format2)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
  }
  function rgbn(n) {
    return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
  }
  function rgba(r, g, b, a2) {
    if (a2 <= 0)
      r = g = b = NaN;
    return new Rgb(r, g, b, a2);
  }
  function rgbConvert(o) {
    if (!(o instanceof Color))
      o = color(o);
    if (!o)
      return new Rgb();
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }
  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }
  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }
  function rgb_formatHex() {
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
  }
  function rgb_formatRgb() {
    var a2 = this.opacity;
    a2 = isNaN(a2) ? 1 : Math.max(0, Math.min(1, a2));
    return (a2 === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a2 === 1 ? ")" : ", " + a2 + ")");
  }
  function hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
  }
  function hsla(h, s2, l, a2) {
    if (a2 <= 0)
      h = s2 = l = NaN;
    else if (l <= 0 || l >= 1)
      h = s2 = NaN;
    else if (s2 <= 0)
      h = NaN;
    return new Hsl(h, s2, l, a2);
  }
  function hslConvert(o) {
    if (o instanceof Hsl)
      return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color))
      o = color(o);
    if (!o)
      return new Hsl();
    if (o instanceof Hsl)
      return o;
    o = o.rgb();
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, min4 = Math.min(r, g, b), max4 = Math.max(r, g, b), h = NaN, s2 = max4 - min4, l = (max4 + min4) / 2;
    if (s2) {
      if (r === max4)
        h = (g - b) / s2 + (g < b) * 6;
      else if (g === max4)
        h = (b - r) / s2 + 2;
      else
        h = (r - g) / s2 + 4;
      s2 /= l < 0.5 ? max4 + min4 : 2 - max4 - min4;
      h *= 60;
    } else {
      s2 = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s2, l, o.opacity);
  }
  function hsl(h, s2, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s2, l, opacity == null ? 1 : opacity);
  }
  function Hsl(h, s2, l, opacity) {
    this.h = +h;
    this.s = +s2;
    this.l = +l;
    this.opacity = +opacity;
  }
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
  }
  var darker, brighter, reI, reN, reP, reHex, reRgbInteger, reRgbPercent, reRgbaInteger, reRgbaPercent, reHslPercent, reHslaPercent, named;
  var init_color = __esm(() => {
    init_define();
    darker = 0.7;
    brighter = 1 / darker;
    reI = "\\s*([+-]?\\d+)\\s*";
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
    reHex = /^#([0-9a-f]{3,8})$/;
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
    named = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074
    };
    define_default(Color, color, {
      copy: function(channels) {
        return Object.assign(new this.constructor(), this, channels);
      },
      displayable: function() {
        return this.rgb().displayable();
      },
      hex: color_formatHex,
      formatHex: color_formatHex,
      formatHsl: color_formatHsl,
      formatRgb: color_formatRgb,
      toString: color_formatRgb
    });
    define_default(Rgb, rgb, extend(Color, {
      brighter: function(k3) {
        k3 = k3 == null ? brighter : Math.pow(brighter, k3);
        return new Rgb(this.r * k3, this.g * k3, this.b * k3, this.opacity);
      },
      darker: function(k3) {
        k3 = k3 == null ? darker : Math.pow(darker, k3);
        return new Rgb(this.r * k3, this.g * k3, this.b * k3, this.opacity);
      },
      rgb: function() {
        return this;
      },
      displayable: function() {
        return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
      },
      hex: rgb_formatHex,
      formatHex: rgb_formatHex,
      formatRgb: rgb_formatRgb,
      toString: rgb_formatRgb
    }));
    define_default(Hsl, hsl, extend(Color, {
      brighter: function(k3) {
        k3 = k3 == null ? brighter : Math.pow(brighter, k3);
        return new Hsl(this.h, this.s, this.l * k3, this.opacity);
      },
      darker: function(k3) {
        k3 = k3 == null ? darker : Math.pow(darker, k3);
        return new Hsl(this.h, this.s, this.l * k3, this.opacity);
      },
      rgb: function() {
        var h = this.h % 360 + (this.h < 0) * 360, s2 = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s2, m1 = 2 * l - m2;
        return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
      },
      displayable: function() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
      },
      formatHsl: function() {
        var a2 = this.opacity;
        a2 = isNaN(a2) ? 1 : Math.max(0, Math.min(1, a2));
        return (a2 === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a2 === 1 ? ")" : ", " + a2 + ")");
      }
    }));
  });

  // node_modules/d3-color/src/math.js
  var radians, degrees;
  var init_math = __esm(() => {
    radians = Math.PI / 180;
    degrees = 180 / Math.PI;
  });

  // node_modules/d3-color/src/lab.js
  function labConvert(o) {
    if (o instanceof Lab)
      return new Lab(o.l, o.a, o.b, o.opacity);
    if (o instanceof Hcl)
      return hcl2lab(o);
    if (!(o instanceof Rgb))
      o = rgbConvert(o);
    var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y2 = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x2, z;
    if (r === g && g === b)
      x2 = z = y2;
    else {
      x2 = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
      z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
    }
    return new Lab(116 * y2 - 16, 500 * (x2 - y2), 200 * (y2 - z), o.opacity);
  }
  function lab(l, a2, b, opacity) {
    return arguments.length === 1 ? labConvert(l) : new Lab(l, a2, b, opacity == null ? 1 : opacity);
  }
  function Lab(l, a2, b, opacity) {
    this.l = +l;
    this.a = +a2;
    this.b = +b;
    this.opacity = +opacity;
  }
  function xyz2lab(t) {
    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
  }
  function lab2xyz(t) {
    return t > t1 ? t * t * t : t2 * (t - t0);
  }
  function lrgb2rgb(x2) {
    return 255 * (x2 <= 31308e-7 ? 12.92 * x2 : 1.055 * Math.pow(x2, 1 / 2.4) - 0.055);
  }
  function rgb2lrgb(x2) {
    return (x2 /= 255) <= 0.04045 ? x2 / 12.92 : Math.pow((x2 + 0.055) / 1.055, 2.4);
  }
  function hclConvert(o) {
    if (o instanceof Hcl)
      return new Hcl(o.h, o.c, o.l, o.opacity);
    if (!(o instanceof Lab))
      o = labConvert(o);
    if (o.a === 0 && o.b === 0)
      return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
    var h = Math.atan2(o.b, o.a) * degrees;
    return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
  }
  function hcl(h, c2, l, opacity) {
    return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c2, l, opacity == null ? 1 : opacity);
  }
  function Hcl(h, c2, l, opacity) {
    this.h = +h;
    this.c = +c2;
    this.l = +l;
    this.opacity = +opacity;
  }
  function hcl2lab(o) {
    if (isNaN(o.h))
      return new Lab(o.l, 0, 0, o.opacity);
    var h = o.h * radians;
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }
  var K, Xn, Yn, Zn, t0, t1, t2, t3;
  var init_lab = __esm(() => {
    init_define();
    init_color();
    init_math();
    K = 18;
    Xn = 0.96422;
    Yn = 1;
    Zn = 0.82521;
    t0 = 4 / 29;
    t1 = 6 / 29;
    t2 = 3 * t1 * t1;
    t3 = t1 * t1 * t1;
    define_default(Lab, lab, extend(Color, {
      brighter: function(k3) {
        return new Lab(this.l + K * (k3 == null ? 1 : k3), this.a, this.b, this.opacity);
      },
      darker: function(k3) {
        return new Lab(this.l - K * (k3 == null ? 1 : k3), this.a, this.b, this.opacity);
      },
      rgb: function() {
        var y2 = (this.l + 16) / 116, x2 = isNaN(this.a) ? y2 : y2 + this.a / 500, z = isNaN(this.b) ? y2 : y2 - this.b / 200;
        x2 = Xn * lab2xyz(x2);
        y2 = Yn * lab2xyz(y2);
        z = Zn * lab2xyz(z);
        return new Rgb(lrgb2rgb(3.1338561 * x2 - 1.6168667 * y2 - 0.4906146 * z), lrgb2rgb(-0.9787684 * x2 + 1.9161415 * y2 + 0.033454 * z), lrgb2rgb(0.0719453 * x2 - 0.2289914 * y2 + 1.4052427 * z), this.opacity);
      }
    }));
    define_default(Hcl, hcl, extend(Color, {
      brighter: function(k3) {
        return new Hcl(this.h, this.c, this.l + K * (k3 == null ? 1 : k3), this.opacity);
      },
      darker: function(k3) {
        return new Hcl(this.h, this.c, this.l - K * (k3 == null ? 1 : k3), this.opacity);
      },
      rgb: function() {
        return hcl2lab(this).rgb();
      }
    }));
  });

  // node_modules/d3-color/src/cubehelix.js
  function cubehelixConvert(o) {
    if (o instanceof Cubehelix)
      return new Cubehelix(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Rgb))
      o = rgbConvert(o);
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k3 = (E * (g - l) - C * bl) / D, s2 = Math.sqrt(k3 * k3 + bl * bl) / (E * l * (1 - l)), h = s2 ? Math.atan2(k3, bl) * degrees - 120 : NaN;
    return new Cubehelix(h < 0 ? h + 360 : h, s2, l, o.opacity);
  }
  function cubehelix(h, s2, l, opacity) {
    return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s2, l, opacity == null ? 1 : opacity);
  }
  function Cubehelix(h, s2, l, opacity) {
    this.h = +h;
    this.s = +s2;
    this.l = +l;
    this.opacity = +opacity;
  }
  var A, B, C, D, E, ED, EB, BC_DA;
  var init_cubehelix = __esm(() => {
    init_define();
    init_color();
    init_math();
    A = -0.14861;
    B = 1.78277;
    C = -0.29227;
    D = -0.90649;
    E = 1.97294;
    ED = E * D;
    EB = E * B;
    BC_DA = B * C - D * A;
    define_default(Cubehelix, cubehelix, extend(Color, {
      brighter: function(k3) {
        k3 = k3 == null ? brighter : Math.pow(brighter, k3);
        return new Cubehelix(this.h, this.s, this.l * k3, this.opacity);
      },
      darker: function(k3) {
        k3 = k3 == null ? darker : Math.pow(darker, k3);
        return new Cubehelix(this.h, this.s, this.l * k3, this.opacity);
      },
      rgb: function() {
        var h = isNaN(this.h) ? 0 : (this.h + 120) * radians, l = +this.l, a2 = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh3 = Math.cos(h), sinh3 = Math.sin(h);
        return new Rgb(255 * (l + a2 * (A * cosh3 + B * sinh3)), 255 * (l + a2 * (C * cosh3 + D * sinh3)), 255 * (l + a2 * (E * cosh3)), this.opacity);
      }
    }));
  });

  // node_modules/d3-color/src/index.js
  var init_src2 = __esm(() => {
    init_color();
    init_lab();
    init_cubehelix();
  });

  // node_modules/d3-interpolate/src/basis.js
  function basis(t13, v0, v1, v2, v3) {
    var t22 = t13 * t13, t32 = t22 * t13;
    return ((1 - 3 * t13 + 3 * t22 - t32) * v0 + (4 - 6 * t22 + 3 * t32) * v1 + (1 + 3 * t13 + 3 * t22 - 3 * t32) * v2 + t32 * v3) / 6;
  }
  function basis_default(values) {
    var n = values.length - 1;
    return function(t) {
      var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
      return basis((t - i / n) * n, v0, v1, v2, v3);
    };
  }
  var init_basis = __esm(() => {
  });

  // node_modules/d3-interpolate/src/basisClosed.js
  function basisClosed_default(values) {
    var n = values.length;
    return function(t) {
      var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
      return basis((t - i / n) * n, v0, v1, v2, v3);
    };
  }
  var init_basisClosed = __esm(() => {
    init_basis();
  });

  // node_modules/d3-interpolate/src/constant.js
  var constant_default2;
  var init_constant2 = __esm(() => {
    constant_default2 = (x2) => () => x2;
  });

  // node_modules/d3-interpolate/src/color.js
  function linear(a2, d) {
    return function(t) {
      return a2 + t * d;
    };
  }
  function exponential(a2, b, y2) {
    return a2 = Math.pow(a2, y2), b = Math.pow(b, y2) - a2, y2 = 1 / y2, function(t) {
      return Math.pow(a2 + t * b, y2);
    };
  }
  function hue(a2, b) {
    var d = b - a2;
    return d ? linear(a2, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant_default2(isNaN(a2) ? b : a2);
  }
  function gamma(y2) {
    return (y2 = +y2) === 1 ? nogamma : function(a2, b) {
      return b - a2 ? exponential(a2, b, y2) : constant_default2(isNaN(a2) ? b : a2);
    };
  }
  function nogamma(a2, b) {
    var d = b - a2;
    return d ? linear(a2, d) : constant_default2(isNaN(a2) ? b : a2);
  }
  var init_color2 = __esm(() => {
    init_constant2();
  });

  // node_modules/d3-interpolate/src/rgb.js
  function rgbSpline(spline) {
    return function(colors) {
      var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
      for (i = 0; i < n; ++i) {
        color2 = rgb(colors[i]);
        r[i] = color2.r || 0;
        g[i] = color2.g || 0;
        b[i] = color2.b || 0;
      }
      r = spline(r);
      g = spline(g);
      b = spline(b);
      color2.opacity = 1;
      return function(t) {
        color2.r = r(t);
        color2.g = g(t);
        color2.b = b(t);
        return color2 + "";
      };
    };
  }
  var rgb_default, rgbBasis, rgbBasisClosed;
  var init_rgb = __esm(() => {
    init_src2();
    init_basis();
    init_basisClosed();
    init_color2();
    rgb_default = function rgbGamma(y2) {
      var color2 = gamma(y2);
      function rgb2(start2, end) {
        var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
        return function(t) {
          start2.r = r(t);
          start2.g = g(t);
          start2.b = b(t);
          start2.opacity = opacity(t);
          return start2 + "";
        };
      }
      rgb2.gamma = rgbGamma;
      return rgb2;
    }(1);
    rgbBasis = rgbSpline(basis_default);
    rgbBasisClosed = rgbSpline(basisClosed_default);
  });

  // node_modules/d3-interpolate/src/numberArray.js
  function numberArray_default(a2, b) {
    if (!b)
      b = [];
    var n = a2 ? Math.min(b.length, a2.length) : 0, c2 = b.slice(), i;
    return function(t) {
      for (i = 0; i < n; ++i)
        c2[i] = a2[i] * (1 - t) + b[i] * t;
      return c2;
    };
  }
  function isNumberArray(x2) {
    return ArrayBuffer.isView(x2) && !(x2 instanceof DataView);
  }
  var init_numberArray = __esm(() => {
  });

  // node_modules/d3-interpolate/src/array.js
  function array_default(a2, b) {
    return (isNumberArray(b) ? numberArray_default : genericArray)(a2, b);
  }
  function genericArray(a2, b) {
    var nb = b ? b.length : 0, na = a2 ? Math.min(nb, a2.length) : 0, x2 = new Array(na), c2 = new Array(nb), i;
    for (i = 0; i < na; ++i)
      x2[i] = value_default(a2[i], b[i]);
    for (; i < nb; ++i)
      c2[i] = b[i];
    return function(t) {
      for (i = 0; i < na; ++i)
        c2[i] = x2[i](t);
      return c2;
    };
  }
  var init_array2 = __esm(() => {
    init_value();
    init_numberArray();
  });

  // node_modules/d3-interpolate/src/date.js
  function date_default(a2, b) {
    var d = new Date();
    return a2 = +a2, b = +b, function(t) {
      return d.setTime(a2 * (1 - t) + b * t), d;
    };
  }
  var init_date = __esm(() => {
  });

  // node_modules/d3-interpolate/src/number.js
  function number_default(a2, b) {
    return a2 = +a2, b = +b, function(t) {
      return a2 * (1 - t) + b * t;
    };
  }
  var init_number = __esm(() => {
  });

  // node_modules/d3-interpolate/src/object.js
  function object_default(a2, b) {
    var i = {}, c2 = {}, k3;
    if (a2 === null || typeof a2 !== "object")
      a2 = {};
    if (b === null || typeof b !== "object")
      b = {};
    for (k3 in b) {
      if (k3 in a2) {
        i[k3] = value_default(a2[k3], b[k3]);
      } else {
        c2[k3] = b[k3];
      }
    }
    return function(t) {
      for (k3 in i)
        c2[k3] = i[k3](t);
      return c2;
    };
  }
  var init_object = __esm(() => {
    init_value();
  });

  // node_modules/d3-interpolate/src/string.js
  function zero(b) {
    return function() {
      return b;
    };
  }
  function one(b) {
    return function(t) {
      return b(t) + "";
    };
  }
  function string_default(a2, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s2 = [], q = [];
    a2 = a2 + "", b = b + "";
    while ((am = reA.exec(a2)) && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) {
        bs = b.slice(bi, bs);
        if (s2[i])
          s2[i] += bs;
        else
          s2[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) {
        if (s2[i])
          s2[i] += bm;
        else
          s2[++i] = bm;
      } else {
        s2[++i] = null;
        q.push({i, x: number_default(am, bm)});
      }
      bi = reB.lastIndex;
    }
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s2[i])
        s2[i] += bs;
      else
        s2[++i] = bs;
    }
    return s2.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
      for (var i2 = 0, o; i2 < b; ++i2)
        s2[(o = q[i2]).i] = o.x(t);
      return s2.join("");
    });
  }
  var reA, reB;
  var init_string = __esm(() => {
    init_number();
    reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
    reB = new RegExp(reA.source, "g");
  });

  // node_modules/d3-interpolate/src/value.js
  function value_default(a2, b) {
    var t = typeof b, c2;
    return b == null || t === "boolean" ? constant_default2(b) : (t === "number" ? number_default : t === "string" ? (c2 = color(b)) ? (b = c2, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default)(a2, b);
  }
  var init_value = __esm(() => {
    init_src2();
    init_rgb();
    init_array2();
    init_date();
    init_number();
    init_object();
    init_string();
    init_constant2();
    init_numberArray();
  });

  // node_modules/d3-interpolate/src/discrete.js
  function discrete_default(range2) {
    var n = range2.length;
    return function(t) {
      return range2[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
    };
  }
  var init_discrete = __esm(() => {
  });

  // node_modules/d3-interpolate/src/hue.js
  function hue_default(a2, b) {
    var i = hue(+a2, +b);
    return function(t) {
      var x2 = i(t);
      return x2 - 360 * Math.floor(x2 / 360);
    };
  }
  var init_hue = __esm(() => {
    init_color2();
  });

  // node_modules/d3-interpolate/src/round.js
  function round_default(a2, b) {
    return a2 = +a2, b = +b, function(t) {
      return Math.round(a2 * (1 - t) + b * t);
    };
  }
  var init_round = __esm(() => {
  });

  // node_modules/d3-interpolate/src/transform/decompose.js
  function decompose_default(a2, b, c2, d, e3, f) {
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a2 * a2 + b * b))
      a2 /= scaleX, b /= scaleX;
    if (skewX = a2 * c2 + b * d)
      c2 -= a2 * skewX, d -= b * skewX;
    if (scaleY = Math.sqrt(c2 * c2 + d * d))
      c2 /= scaleY, d /= scaleY, skewX /= scaleY;
    if (a2 * d < b * c2)
      a2 = -a2, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
      translateX: e3,
      translateY: f,
      rotate: Math.atan2(b, a2) * degrees2,
      skewX: Math.atan(skewX) * degrees2,
      scaleX,
      scaleY
    };
  }
  var degrees2, identity;
  var init_decompose = __esm(() => {
    degrees2 = 180 / Math.PI;
    identity = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1
    };
  });

  // node_modules/d3-interpolate/src/transform/parse.js
  function parseCss(value) {
    const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
    return m.isIdentity ? identity : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
  }
  function parseSvg(value) {
    if (value == null)
      return identity;
    if (!svgNode)
      svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate()))
      return identity;
    value = value.matrix;
    return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
  }
  var svgNode;
  var init_parse = __esm(() => {
    init_decompose();
  });

  // node_modules/d3-interpolate/src/transform/index.js
  function interpolateTransform(parse, pxComma, pxParen, degParen) {
    function pop(s2) {
      return s2.length ? s2.pop() + " " : "";
    }
    function translate(xa, ya, xb, yb, s2, q) {
      if (xa !== xb || ya !== yb) {
        var i = s2.push("translate(", null, pxComma, null, pxParen);
        q.push({i: i - 4, x: number_default(xa, xb)}, {i: i - 2, x: number_default(ya, yb)});
      } else if (xb || yb) {
        s2.push("translate(" + xb + pxComma + yb + pxParen);
      }
    }
    function rotate(a2, b, s2, q) {
      if (a2 !== b) {
        if (a2 - b > 180)
          b += 360;
        else if (b - a2 > 180)
          a2 += 360;
        q.push({i: s2.push(pop(s2) + "rotate(", null, degParen) - 2, x: number_default(a2, b)});
      } else if (b) {
        s2.push(pop(s2) + "rotate(" + b + degParen);
      }
    }
    function skewX(a2, b, s2, q) {
      if (a2 !== b) {
        q.push({i: s2.push(pop(s2) + "skewX(", null, degParen) - 2, x: number_default(a2, b)});
      } else if (b) {
        s2.push(pop(s2) + "skewX(" + b + degParen);
      }
    }
    function scale(xa, ya, xb, yb, s2, q) {
      if (xa !== xb || ya !== yb) {
        var i = s2.push(pop(s2) + "scale(", null, ",", null, ")");
        q.push({i: i - 4, x: number_default(xa, xb)}, {i: i - 2, x: number_default(ya, yb)});
      } else if (xb !== 1 || yb !== 1) {
        s2.push(pop(s2) + "scale(" + xb + "," + yb + ")");
      }
    }
    return function(a2, b) {
      var s2 = [], q = [];
      a2 = parse(a2), b = parse(b);
      translate(a2.translateX, a2.translateY, b.translateX, b.translateY, s2, q);
      rotate(a2.rotate, b.rotate, s2, q);
      skewX(a2.skewX, b.skewX, s2, q);
      scale(a2.scaleX, a2.scaleY, b.scaleX, b.scaleY, s2, q);
      a2 = b = null;
      return function(t) {
        var i = -1, n = q.length, o;
        while (++i < n)
          s2[(o = q[i]).i] = o.x(t);
        return s2.join("");
      };
    };
  }
  var interpolateTransformCss, interpolateTransformSvg;
  var init_transform = __esm(() => {
    init_number();
    init_parse();
    interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
    interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
  });

  // node_modules/d3-interpolate/src/zoom.js
  function cosh(x2) {
    return ((x2 = Math.exp(x2)) + 1 / x2) / 2;
  }
  function sinh(x2) {
    return ((x2 = Math.exp(x2)) - 1 / x2) / 2;
  }
  function tanh(x2) {
    return ((x2 = Math.exp(2 * x2)) - 1) / (x2 + 1);
  }
  var epsilon2, zoom_default;
  var init_zoom = __esm(() => {
    epsilon2 = 1e-12;
    zoom_default = function zoomRho(rho, rho2, rho4) {
      function zoom(p02, p1) {
        var ux0 = p02[0], uy0 = p02[1], w0 = p02[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
        if (d2 < epsilon2) {
          S = Math.log(w1 / w0) / rho;
          i = function(t) {
            return [
              ux0 + t * dx,
              uy0 + t * dy,
              w0 * Math.exp(rho * t * S)
            ];
          };
        } else {
          var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
          S = (r1 - r0) / rho;
          i = function(t) {
            var s2 = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s2 + r0) - sinh(r0));
            return [
              ux0 + u * dx,
              uy0 + u * dy,
              w0 * coshr0 / cosh(rho * s2 + r0)
            ];
          };
        }
        i.duration = S * 1e3 * rho / Math.SQRT2;
        return i;
      }
      zoom.rho = function(_) {
        var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
        return zoomRho(_1, _2, _4);
      };
      return zoom;
    }(Math.SQRT2, 2, 4);
  });

  // node_modules/d3-interpolate/src/hsl.js
  function hsl2(hue2) {
    return function(start2, end) {
      var h = hue2((start2 = hsl(start2)).h, (end = hsl(end)).h), s2 = nogamma(start2.s, end.s), l = nogamma(start2.l, end.l), opacity = nogamma(start2.opacity, end.opacity);
      return function(t) {
        start2.h = h(t);
        start2.s = s2(t);
        start2.l = l(t);
        start2.opacity = opacity(t);
        return start2 + "";
      };
    };
  }
  var hsl_default, hslLong;
  var init_hsl = __esm(() => {
    init_src2();
    init_color2();
    hsl_default = hsl2(hue);
    hslLong = hsl2(nogamma);
  });

  // node_modules/d3-interpolate/src/lab.js
  function lab2(start2, end) {
    var l = nogamma((start2 = lab(start2)).l, (end = lab(end)).l), a2 = nogamma(start2.a, end.a), b = nogamma(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.l = l(t);
      start2.a = a2(t);
      start2.b = b(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  }
  var init_lab2 = __esm(() => {
    init_src2();
    init_color2();
  });

  // node_modules/d3-interpolate/src/hcl.js
  function hcl2(hue2) {
    return function(start2, end) {
      var h = hue2((start2 = hcl(start2)).h, (end = hcl(end)).h), c2 = nogamma(start2.c, end.c), l = nogamma(start2.l, end.l), opacity = nogamma(start2.opacity, end.opacity);
      return function(t) {
        start2.h = h(t);
        start2.c = c2(t);
        start2.l = l(t);
        start2.opacity = opacity(t);
        return start2 + "";
      };
    };
  }
  var hcl_default, hclLong;
  var init_hcl = __esm(() => {
    init_src2();
    init_color2();
    hcl_default = hcl2(hue);
    hclLong = hcl2(nogamma);
  });

  // node_modules/d3-interpolate/src/cubehelix.js
  function cubehelix2(hue2) {
    return function cubehelixGamma(y2) {
      y2 = +y2;
      function cubehelix3(start2, end) {
        var h = hue2((start2 = cubehelix(start2)).h, (end = cubehelix(end)).h), s2 = nogamma(start2.s, end.s), l = nogamma(start2.l, end.l), opacity = nogamma(start2.opacity, end.opacity);
        return function(t) {
          start2.h = h(t);
          start2.s = s2(t);
          start2.l = l(Math.pow(t, y2));
          start2.opacity = opacity(t);
          return start2 + "";
        };
      }
      cubehelix3.gamma = cubehelixGamma;
      return cubehelix3;
    }(1);
  }
  var cubehelix_default, cubehelixLong;
  var init_cubehelix2 = __esm(() => {
    init_src2();
    init_color2();
    cubehelix_default = cubehelix2(hue);
    cubehelixLong = cubehelix2(nogamma);
  });

  // node_modules/d3-interpolate/src/piecewise.js
  function piecewise(interpolate, values) {
    if (values === void 0)
      values = interpolate, interpolate = value_default;
    var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
    while (i < n)
      I[i] = interpolate(v, v = values[++i]);
    return function(t) {
      var i2 = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
      return I[i2](t - i2);
    };
  }
  var init_piecewise = __esm(() => {
    init_value();
  });

  // node_modules/d3-interpolate/src/quantize.js
  function quantize_default(interpolator, n) {
    var samples = new Array(n);
    for (var i = 0; i < n; ++i)
      samples[i] = interpolator(i / (n - 1));
    return samples;
  }
  var init_quantize = __esm(() => {
  });

  // node_modules/d3-interpolate/src/index.js
  var src_exports2 = {};
  __export(src_exports2, {
    interpolate: () => value_default,
    interpolateArray: () => array_default,
    interpolateBasis: () => basis_default,
    interpolateBasisClosed: () => basisClosed_default,
    interpolateCubehelix: () => cubehelix_default,
    interpolateCubehelixLong: () => cubehelixLong,
    interpolateDate: () => date_default,
    interpolateDiscrete: () => discrete_default,
    interpolateHcl: () => hcl_default,
    interpolateHclLong: () => hclLong,
    interpolateHsl: () => hsl_default,
    interpolateHslLong: () => hslLong,
    interpolateHue: () => hue_default,
    interpolateLab: () => lab2,
    interpolateNumber: () => number_default,
    interpolateNumberArray: () => numberArray_default,
    interpolateObject: () => object_default,
    interpolateRgb: () => rgb_default,
    interpolateRgbBasis: () => rgbBasis,
    interpolateRgbBasisClosed: () => rgbBasisClosed,
    interpolateRound: () => round_default,
    interpolateString: () => string_default,
    interpolateTransformCss: () => interpolateTransformCss,
    interpolateTransformSvg: () => interpolateTransformSvg,
    interpolateZoom: () => zoom_default,
    piecewise: () => piecewise,
    quantize: () => quantize_default
  });
  var init_src3 = __esm(() => {
    init_value();
    init_array2();
    init_basis();
    init_basisClosed();
    init_date();
    init_discrete();
    init_hue();
    init_number();
    init_numberArray();
    init_object();
    init_round();
    init_string();
    init_transform();
    init_zoom();
    init_rgb();
    init_hsl();
    init_lab2();
    init_hcl();
    init_cubehelix2();
    init_piecewise();
    init_quantize();
  });

  // node_modules/d3-array/src/ascending.js
  function ascending_default(a2, b) {
    return a2 == null || b == null ? NaN : a2 < b ? -1 : a2 > b ? 1 : a2 >= b ? 0 : NaN;
  }
  var init_ascending = __esm(() => {
  });

  // node_modules/d3-array/src/bisector.js
  function bisector_default(f) {
    let delta = f;
    let compare = f;
    if (f.length === 1) {
      delta = (d, x2) => f(d) - x2;
      compare = ascendingComparator(f);
    }
    function left2(a2, x2, lo, hi) {
      if (lo == null)
        lo = 0;
      if (hi == null)
        hi = a2.length;
      while (lo < hi) {
        const mid = lo + hi >>> 1;
        if (compare(a2[mid], x2) < 0)
          lo = mid + 1;
        else
          hi = mid;
      }
      return lo;
    }
    function right2(a2, x2, lo, hi) {
      if (lo == null)
        lo = 0;
      if (hi == null)
        hi = a2.length;
      while (lo < hi) {
        const mid = lo + hi >>> 1;
        if (compare(a2[mid], x2) > 0)
          hi = mid;
        else
          lo = mid + 1;
      }
      return lo;
    }
    function center2(a2, x2, lo, hi) {
      if (lo == null)
        lo = 0;
      if (hi == null)
        hi = a2.length;
      const i = left2(a2, x2, lo, hi - 1);
      return i > lo && delta(a2[i - 1], x2) > -delta(a2[i], x2) ? i - 1 : i;
    }
    return {left: left2, center: center2, right: right2};
  }
  function ascendingComparator(f) {
    return (d, x2) => ascending_default(f(d), x2);
  }
  var init_bisector = __esm(() => {
    init_ascending();
  });

  // node_modules/d3-array/src/number.js
  function number_default2(x2) {
    return x2 === null ? NaN : +x2;
  }
  function* numbers(values, valueof) {
    if (valueof === void 0) {
      for (let value of values) {
        if (value != null && (value = +value) >= value) {
          yield value;
        }
      }
    } else {
      let index2 = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index2, values)) != null && (value = +value) >= value) {
          yield value;
        }
      }
    }
  }
  var init_number2 = __esm(() => {
  });

  // node_modules/d3-array/src/bisect.js
  var ascendingBisect, bisectRight, bisectLeft, bisectCenter, bisect_default;
  var init_bisect = __esm(() => {
    init_ascending();
    init_bisector();
    init_number2();
    ascendingBisect = bisector_default(ascending_default);
    bisectRight = ascendingBisect.right;
    bisectLeft = ascendingBisect.left;
    bisectCenter = bisector_default(number_default2).center;
    bisect_default = bisectRight;
  });

  // node_modules/d3-array/src/count.js
  function count(values, valueof) {
    let count2 = 0;
    if (valueof === void 0) {
      for (let value of values) {
        if (value != null && (value = +value) >= value) {
          ++count2;
        }
      }
    } else {
      let index2 = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index2, values)) != null && (value = +value) >= value) {
          ++count2;
        }
      }
    }
    return count2;
  }
  var init_count = __esm(() => {
  });

  // node_modules/d3-array/src/cross.js
  function length(array3) {
    return array3.length | 0;
  }
  function empty2(length4) {
    return !(length4 > 0);
  }
  function arrayify(values) {
    return typeof values !== "object" || "length" in values ? values : Array.from(values);
  }
  function reducer(reduce2) {
    return (values) => reduce2(...values);
  }
  function cross(...values) {
    const reduce2 = typeof values[values.length - 1] === "function" && reducer(values.pop());
    values = values.map(arrayify);
    const lengths = values.map(length);
    const j = values.length - 1;
    const index2 = new Array(j + 1).fill(0);
    const product = [];
    if (j < 0 || lengths.some(empty2))
      return product;
    while (true) {
      product.push(index2.map((j2, i2) => values[i2][j2]));
      let i = j;
      while (++index2[i] === lengths[i]) {
        if (i === 0)
          return reduce2 ? product.map(reduce2) : product;
        index2[i--] = 0;
      }
    }
  }
  var init_cross = __esm(() => {
  });

  // node_modules/d3-array/src/cumsum.js
  function cumsum(values, valueof) {
    var sum3 = 0, index2 = 0;
    return Float64Array.from(values, valueof === void 0 ? (v) => sum3 += +v || 0 : (v) => sum3 += +valueof(v, index2++, values) || 0);
  }
  var init_cumsum = __esm(() => {
  });

  // node_modules/d3-array/src/descending.js
  function descending_default(a2, b) {
    return a2 == null || b == null ? NaN : b < a2 ? -1 : b > a2 ? 1 : b >= a2 ? 0 : NaN;
  }
  var init_descending = __esm(() => {
  });

  // node_modules/d3-array/src/variance.js
  function variance(values, valueof) {
    let count2 = 0;
    let delta;
    let mean2 = 0;
    let sum3 = 0;
    if (valueof === void 0) {
      for (let value of values) {
        if (value != null && (value = +value) >= value) {
          delta = value - mean2;
          mean2 += delta / ++count2;
          sum3 += delta * (value - mean2);
        }
      }
    } else {
      let index2 = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index2, values)) != null && (value = +value) >= value) {
          delta = value - mean2;
          mean2 += delta / ++count2;
          sum3 += delta * (value - mean2);
        }
      }
    }
    if (count2 > 1)
      return sum3 / (count2 - 1);
  }
  var init_variance = __esm(() => {
  });

  // node_modules/d3-array/src/deviation.js
  function deviation(values, valueof) {
    const v = variance(values, valueof);
    return v ? Math.sqrt(v) : v;
  }
  var init_deviation = __esm(() => {
    init_variance();
  });

  // node_modules/d3-array/src/extent.js
  function extent_default(values, valueof) {
    let min4;
    let max4;
    if (valueof === void 0) {
      for (const value of values) {
        if (value != null) {
          if (min4 === void 0) {
            if (value >= value)
              min4 = max4 = value;
          } else {
            if (min4 > value)
              min4 = value;
            if (max4 < value)
              max4 = value;
          }
        }
      }
    } else {
      let index2 = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index2, values)) != null) {
          if (min4 === void 0) {
            if (value >= value)
              min4 = max4 = value;
          } else {
            if (min4 > value)
              min4 = value;
            if (max4 < value)
              max4 = value;
          }
        }
      }
    }
    return [min4, max4];
  }
  var init_extent = __esm(() => {
  });

  // node_modules/d3-array/src/fsum.js
  function fsum(values, valueof) {
    const adder = new Adder();
    if (valueof === void 0) {
      for (let value of values) {
        if (value = +value) {
          adder.add(value);
        }
      }
    } else {
      let index2 = -1;
      for (let value of values) {
        if (value = +valueof(value, ++index2, values)) {
          adder.add(value);
        }
      }
    }
    return +adder;
  }
  function fcumsum(values, valueof) {
    const adder = new Adder();
    let index2 = -1;
    return Float64Array.from(values, valueof === void 0 ? (v) => adder.add(+v || 0) : (v) => adder.add(+valueof(v, ++index2, values) || 0));
  }
  var Adder;
  var init_fsum = __esm(() => {
    Adder = class {
      constructor() {
        this._partials = new Float64Array(32);
        this._n = 0;
      }
      add(x2) {
        const p = this._partials;
        let i = 0;
        for (let j = 0; j < this._n && j < 32; j++) {
          const y2 = p[j], hi = x2 + y2, lo = Math.abs(x2) < Math.abs(y2) ? x2 - (hi - y2) : y2 - (hi - x2);
          if (lo)
            p[i++] = lo;
          x2 = hi;
        }
        p[i] = x2;
        this._n = i + 1;
        return this;
      }
      valueOf() {
        const p = this._partials;
        let n = this._n, x2, y2, lo, hi = 0;
        if (n > 0) {
          hi = p[--n];
          while (n > 0) {
            x2 = hi;
            y2 = p[--n];
            hi = x2 + y2;
            lo = y2 - (hi - x2);
            if (lo)
              break;
          }
          if (n > 0 && (lo < 0 && p[n - 1] < 0 || lo > 0 && p[n - 1] > 0)) {
            y2 = lo * 2;
            x2 = hi + y2;
            if (y2 == x2 - hi)
              hi = x2;
          }
        }
        return hi;
      }
    };
  });

  // node_modules/internmap/src/index.js
  function intern_get({_intern, _key}, value) {
    const key = _key(value);
    return _intern.has(key) ? _intern.get(key) : value;
  }
  function intern_set({_intern, _key}, value) {
    const key = _key(value);
    if (_intern.has(key))
      return _intern.get(key);
    _intern.set(key, value);
    return value;
  }
  function intern_delete({_intern, _key}, value) {
    const key = _key(value);
    if (_intern.has(key)) {
      value = _intern.get(value);
      _intern.delete(key);
    }
    return value;
  }
  function keyof(value) {
    return value !== null && typeof value === "object" ? value.valueOf() : value;
  }
  var InternMap, InternSet;
  var init_src4 = __esm(() => {
    InternMap = class extends Map {
      constructor(entries, key = keyof) {
        super();
        Object.defineProperties(this, {_intern: {value: new Map()}, _key: {value: key}});
        if (entries != null)
          for (const [key2, value] of entries)
            this.set(key2, value);
      }
      get(key) {
        return super.get(intern_get(this, key));
      }
      has(key) {
        return super.has(intern_get(this, key));
      }
      set(key, value) {
        return super.set(intern_set(this, key), value);
      }
      delete(key) {
        return super.delete(intern_delete(this, key));
      }
    };
    InternSet = class extends Set {
      constructor(values, key = keyof) {
        super();
        Object.defineProperties(this, {_intern: {value: new Map()}, _key: {value: key}});
        if (values != null)
          for (const value of values)
            this.add(value);
      }
      has(value) {
        return super.has(intern_get(this, value));
      }
      add(value) {
        return super.add(intern_set(this, value));
      }
      delete(value) {
        return super.delete(intern_delete(this, value));
      }
    };
  });

  // node_modules/d3-array/src/identity.js
  function identity_default(x2) {
    return x2;
  }
  var init_identity = __esm(() => {
  });

  // node_modules/d3-array/src/group.js
  function group(values, ...keys) {
    return nest(values, identity_default, identity_default, keys);
  }
  function groups(values, ...keys) {
    return nest(values, Array.from, identity_default, keys);
  }
  function flatten(groups2, keys) {
    for (let i = 1, n = keys.length; i < n; ++i) {
      groups2 = groups2.flatMap((g) => g.pop().map(([key, value]) => [...g, key, value]));
    }
    return groups2;
  }
  function flatGroup(values, ...keys) {
    return flatten(groups(values, ...keys), keys);
  }
  function flatRollup(values, reduce2, ...keys) {
    return flatten(rollups(values, reduce2, ...keys), keys);
  }
  function rollup(values, reduce2, ...keys) {
    return nest(values, identity_default, reduce2, keys);
  }
  function rollups(values, reduce2, ...keys) {
    return nest(values, Array.from, reduce2, keys);
  }
  function index(values, ...keys) {
    return nest(values, identity_default, unique, keys);
  }
  function indexes(values, ...keys) {
    return nest(values, Array.from, unique, keys);
  }
  function unique(values) {
    if (values.length !== 1)
      throw new Error("duplicate key");
    return values[0];
  }
  function nest(values, map4, reduce2, keys) {
    return function regroup(values2, i) {
      if (i >= keys.length)
        return reduce2(values2);
      const groups2 = new InternMap();
      const keyof2 = keys[i++];
      let index2 = -1;
      for (const value of values2) {
        const key = keyof2(value, ++index2, values2);
        const group2 = groups2.get(key);
        if (group2)
          group2.push(value);
        else
          groups2.set(key, [value]);
      }
      for (const [key, values3] of groups2) {
        groups2.set(key, regroup(values3, i));
      }
      return map4(groups2);
    }(values, 0);
  }
  var init_group = __esm(() => {
    init_src4();
    init_identity();
  });

  // node_modules/d3-array/src/permute.js
  function permute_default(source, keys) {
    return Array.from(keys, (key) => source[key]);
  }
  var init_permute = __esm(() => {
  });

  // node_modules/d3-array/src/sort.js
  function sort(values, ...F) {
    if (typeof values[Symbol.iterator] !== "function")
      throw new TypeError("values is not iterable");
    values = Array.from(values);
    let [f = ascending_default] = F;
    if (f.length === 1 || F.length > 1) {
      const index2 = Uint32Array.from(values, (d, i) => i);
      if (F.length > 1) {
        F = F.map((f2) => values.map(f2));
        index2.sort((i, j) => {
          for (const f2 of F) {
            const c2 = ascending_default(f2[i], f2[j]);
            if (c2)
              return c2;
          }
        });
      } else {
        f = values.map(f);
        index2.sort((i, j) => ascending_default(f[i], f[j]));
      }
      return permute_default(values, index2);
    }
    return values.sort(f);
  }
  var init_sort2 = __esm(() => {
    init_ascending();
    init_permute();
  });

  // node_modules/d3-array/src/groupSort.js
  function groupSort(values, reduce2, key) {
    return (reduce2.length === 1 ? sort(rollup(values, reduce2, key), ([ak, av], [bk, bv]) => ascending_default(av, bv) || ascending_default(ak, bk)) : sort(group(values, key), ([ak, av], [bk, bv]) => reduce2(av, bv) || ascending_default(ak, bk))).map(([key2]) => key2);
  }
  var init_groupSort = __esm(() => {
    init_ascending();
    init_group();
    init_sort2();
  });

  // node_modules/d3-array/src/array.js
  var array2, slice, map;
  var init_array3 = __esm(() => {
    array2 = Array.prototype;
    slice = array2.slice;
    map = array2.map;
  });

  // node_modules/d3-array/src/constant.js
  function constant_default3(x2) {
    return function() {
      return x2;
    };
  }
  var init_constant3 = __esm(() => {
  });

  // node_modules/d3-array/src/ticks.js
  function ticks_default(start2, stop, count2) {
    var reverse2, i = -1, n, ticks, step2;
    stop = +stop, start2 = +start2, count2 = +count2;
    if (start2 === stop && count2 > 0)
      return [start2];
    if (reverse2 = stop < start2)
      n = start2, start2 = stop, stop = n;
    if ((step2 = tickIncrement(start2, stop, count2)) === 0 || !isFinite(step2))
      return [];
    if (step2 > 0) {
      let r0 = Math.round(start2 / step2), r1 = Math.round(stop / step2);
      if (r0 * step2 < start2)
        ++r0;
      if (r1 * step2 > stop)
        --r1;
      ticks = new Array(n = r1 - r0 + 1);
      while (++i < n)
        ticks[i] = (r0 + i) * step2;
    } else {
      step2 = -step2;
      let r0 = Math.round(start2 * step2), r1 = Math.round(stop * step2);
      if (r0 / step2 < start2)
        ++r0;
      if (r1 / step2 > stop)
        --r1;
      ticks = new Array(n = r1 - r0 + 1);
      while (++i < n)
        ticks[i] = (r0 + i) / step2;
    }
    if (reverse2)
      ticks.reverse();
    return ticks;
  }
  function tickIncrement(start2, stop, count2) {
    var step2 = (stop - start2) / Math.max(0, count2), power = Math.floor(Math.log(step2) / Math.LN10), error = step2 / Math.pow(10, power);
    return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
  }
  function tickStep(start2, stop, count2) {
    var step0 = Math.abs(stop - start2) / Math.max(0, count2), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
    if (error >= e10)
      step1 *= 10;
    else if (error >= e5)
      step1 *= 5;
    else if (error >= e2)
      step1 *= 2;
    return stop < start2 ? -step1 : step1;
  }
  var e10, e5, e2;
  var init_ticks = __esm(() => {
    e10 = Math.sqrt(50);
    e5 = Math.sqrt(10);
    e2 = Math.sqrt(2);
  });

  // node_modules/d3-array/src/nice.js
  function nice(start2, stop, count2) {
    let prestep;
    while (true) {
      const step2 = tickIncrement(start2, stop, count2);
      if (step2 === prestep || step2 === 0 || !isFinite(step2)) {
        return [start2, stop];
      } else if (step2 > 0) {
        start2 = Math.floor(start2 / step2) * step2;
        stop = Math.ceil(stop / step2) * step2;
      } else if (step2 < 0) {
        start2 = Math.ceil(start2 * step2) / step2;
        stop = Math.floor(stop * step2) / step2;
      }
      prestep = step2;
    }
  }
  var init_nice = __esm(() => {
    init_ticks();
  });

  // node_modules/d3-array/src/threshold/sturges.js
  function sturges_default(values) {
    return Math.ceil(Math.log(count(values)) / Math.LN2) + 1;
  }
  var init_sturges = __esm(() => {
    init_count();
  });

  // node_modules/d3-array/src/bin.js
  function bin_default() {
    var value = identity_default, domain = extent_default, threshold2 = sturges_default;
    function histogram(data2) {
      if (!Array.isArray(data2))
        data2 = Array.from(data2);
      var i, n = data2.length, x2, values = new Array(n);
      for (i = 0; i < n; ++i) {
        values[i] = value(data2[i], i, data2);
      }
      var xz = domain(values), x07 = xz[0], x13 = xz[1], tz = threshold2(values, x07, x13);
      if (!Array.isArray(tz)) {
        const max4 = x13, tn = +tz;
        if (domain === extent_default)
          [x07, x13] = nice(x07, x13, tn);
        tz = ticks_default(x07, x13, tn);
        if (tz[tz.length - 1] >= x13) {
          if (max4 >= x13 && domain === extent_default) {
            const step2 = tickIncrement(x07, x13, tn);
            if (isFinite(step2)) {
              if (step2 > 0) {
                x13 = (Math.floor(x13 / step2) + 1) * step2;
              } else if (step2 < 0) {
                x13 = (Math.ceil(x13 * -step2) + 1) / -step2;
              }
            }
          } else {
            tz.pop();
          }
        }
      }
      var m = tz.length;
      while (tz[0] <= x07)
        tz.shift(), --m;
      while (tz[m - 1] > x13)
        tz.pop(), --m;
      var bins = new Array(m + 1), bin;
      for (i = 0; i <= m; ++i) {
        bin = bins[i] = [];
        bin.x0 = i > 0 ? tz[i - 1] : x07;
        bin.x1 = i < m ? tz[i] : x13;
      }
      for (i = 0; i < n; ++i) {
        x2 = values[i];
        if (x2 != null && x07 <= x2 && x2 <= x13) {
          bins[bisect_default(tz, x2, 0, m)].push(data2[i]);
        }
      }
      return bins;
    }
    histogram.value = function(_) {
      return arguments.length ? (value = typeof _ === "function" ? _ : constant_default3(_), histogram) : value;
    };
    histogram.domain = function(_) {
      return arguments.length ? (domain = typeof _ === "function" ? _ : constant_default3([_[0], _[1]]), histogram) : domain;
    };
    histogram.thresholds = function(_) {
      return arguments.length ? (threshold2 = typeof _ === "function" ? _ : Array.isArray(_) ? constant_default3(slice.call(_)) : constant_default3(_), histogram) : threshold2;
    };
    return histogram;
  }
  var init_bin = __esm(() => {
    init_array3();
    init_bisect();
    init_constant3();
    init_extent();
    init_identity();
    init_nice();
    init_ticks();
    init_sturges();
  });

  // node_modules/d3-array/src/max.js
  function max(values, valueof) {
    let max4;
    if (valueof === void 0) {
      for (const value of values) {
        if (value != null && (max4 < value || max4 === void 0 && value >= value)) {
          max4 = value;
        }
      }
    } else {
      let index2 = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index2, values)) != null && (max4 < value || max4 === void 0 && value >= value)) {
          max4 = value;
        }
      }
    }
    return max4;
  }
  var init_max = __esm(() => {
  });

  // node_modules/d3-array/src/min.js
  function min(values, valueof) {
    let min4;
    if (valueof === void 0) {
      for (const value of values) {
        if (value != null && (min4 > value || min4 === void 0 && value >= value)) {
          min4 = value;
        }
      }
    } else {
      let index2 = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index2, values)) != null && (min4 > value || min4 === void 0 && value >= value)) {
          min4 = value;
        }
      }
    }
    return min4;
  }
  var init_min = __esm(() => {
  });

  // node_modules/d3-array/src/quickselect.js
  function quickselect(array3, k3, left2 = 0, right2 = array3.length - 1, compare = ascending_default) {
    while (right2 > left2) {
      if (right2 - left2 > 600) {
        const n = right2 - left2 + 1;
        const m = k3 - left2 + 1;
        const z = Math.log(n);
        const s2 = 0.5 * Math.exp(2 * z / 3);
        const sd = 0.5 * Math.sqrt(z * s2 * (n - s2) / n) * (m - n / 2 < 0 ? -1 : 1);
        const newLeft = Math.max(left2, Math.floor(k3 - m * s2 / n + sd));
        const newRight = Math.min(right2, Math.floor(k3 + (n - m) * s2 / n + sd));
        quickselect(array3, k3, newLeft, newRight, compare);
      }
      const t = array3[k3];
      let i = left2;
      let j = right2;
      swap(array3, left2, k3);
      if (compare(array3[right2], t) > 0)
        swap(array3, left2, right2);
      while (i < j) {
        swap(array3, i, j), ++i, --j;
        while (compare(array3[i], t) < 0)
          ++i;
        while (compare(array3[j], t) > 0)
          --j;
      }
      if (compare(array3[left2], t) === 0)
        swap(array3, left2, j);
      else
        ++j, swap(array3, j, right2);
      if (j <= k3)
        left2 = j + 1;
      if (k3 <= j)
        right2 = j - 1;
    }
    return array3;
  }
  function swap(array3, i, j) {
    const t = array3[i];
    array3[i] = array3[j];
    array3[j] = t;
  }
  var init_quickselect = __esm(() => {
    init_ascending();
  });

  // node_modules/d3-array/src/quantile.js
  function quantile(values, p, valueof) {
    values = Float64Array.from(numbers(values, valueof));
    if (!(n = values.length))
      return;
    if ((p = +p) <= 0 || n < 2)
      return min(values);
    if (p >= 1)
      return max(values);
    var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = max(quickselect(values, i0).subarray(0, i0 + 1)), value1 = min(values.subarray(i0 + 1));
    return value0 + (value1 - value0) * (i - i0);
  }
  function quantileSorted(values, p, valueof = number_default2) {
    if (!(n = values.length))
      return;
    if ((p = +p) <= 0 || n < 2)
      return +valueof(values[0], 0, values);
    if (p >= 1)
      return +valueof(values[n - 1], n - 1, values);
    var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = +valueof(values[i0], i0, values), value1 = +valueof(values[i0 + 1], i0 + 1, values);
    return value0 + (value1 - value0) * (i - i0);
  }
  var init_quantile = __esm(() => {
    init_max();
    init_min();
    init_quickselect();
    init_number2();
  });

  // node_modules/d3-array/src/threshold/freedmanDiaconis.js
  function freedmanDiaconis_default(values, min4, max4) {
    return Math.ceil((max4 - min4) / (2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(count(values), -1 / 3)));
  }
  var init_freedmanDiaconis = __esm(() => {
    init_count();
    init_quantile();
  });

  // node_modules/d3-array/src/threshold/scott.js
  function scott_default(values, min4, max4) {
    return Math.ceil((max4 - min4) / (3.5 * deviation(values) * Math.pow(count(values), -1 / 3)));
  }
  var init_scott = __esm(() => {
    init_count();
    init_deviation();
  });

  // node_modules/d3-array/src/maxIndex.js
  function maxIndex(values, valueof) {
    let max4;
    let maxIndex2 = -1;
    let index2 = -1;
    if (valueof === void 0) {
      for (const value of values) {
        ++index2;
        if (value != null && (max4 < value || max4 === void 0 && value >= value)) {
          max4 = value, maxIndex2 = index2;
        }
      }
    } else {
      for (let value of values) {
        if ((value = valueof(value, ++index2, values)) != null && (max4 < value || max4 === void 0 && value >= value)) {
          max4 = value, maxIndex2 = index2;
        }
      }
    }
    return maxIndex2;
  }
  var init_maxIndex = __esm(() => {
  });

  // node_modules/d3-array/src/mean.js
  function mean(values, valueof) {
    let count2 = 0;
    let sum3 = 0;
    if (valueof === void 0) {
      for (let value of values) {
        if (value != null && (value = +value) >= value) {
          ++count2, sum3 += value;
        }
      }
    } else {
      let index2 = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index2, values)) != null && (value = +value) >= value) {
          ++count2, sum3 += value;
        }
      }
    }
    if (count2)
      return sum3 / count2;
  }
  var init_mean = __esm(() => {
  });

  // node_modules/d3-array/src/median.js
  function median_default(values, valueof) {
    return quantile(values, 0.5, valueof);
  }
  var init_median = __esm(() => {
    init_quantile();
  });

  // node_modules/d3-array/src/merge.js
  function* flatten2(arrays) {
    for (const array3 of arrays) {
      yield* array3;
    }
  }
  function merge(arrays) {
    return Array.from(flatten2(arrays));
  }
  var init_merge2 = __esm(() => {
  });

  // node_modules/d3-array/src/minIndex.js
  function minIndex(values, valueof) {
    let min4;
    let minIndex2 = -1;
    let index2 = -1;
    if (valueof === void 0) {
      for (const value of values) {
        ++index2;
        if (value != null && (min4 > value || min4 === void 0 && value >= value)) {
          min4 = value, minIndex2 = index2;
        }
      }
    } else {
      for (let value of values) {
        if ((value = valueof(value, ++index2, values)) != null && (min4 > value || min4 === void 0 && value >= value)) {
          min4 = value, minIndex2 = index2;
        }
      }
    }
    return minIndex2;
  }
  var init_minIndex = __esm(() => {
  });

  // node_modules/d3-array/src/mode.js
  function mode_default(values, valueof) {
    const counts = new InternMap();
    if (valueof === void 0) {
      for (let value of values) {
        if (value != null && value >= value) {
          counts.set(value, (counts.get(value) || 0) + 1);
        }
      }
    } else {
      let index2 = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index2, values)) != null && value >= value) {
          counts.set(value, (counts.get(value) || 0) + 1);
        }
      }
    }
    let modeValue;
    let modeCount = 0;
    for (const [value, count2] of counts) {
      if (count2 > modeCount) {
        modeCount = count2;
        modeValue = value;
      }
    }
    return modeValue;
  }
  var init_mode = __esm(() => {
    init_src4();
  });

  // node_modules/d3-array/src/pairs.js
  function pairs(values, pairof = pair) {
    const pairs2 = [];
    let previous;
    let first = false;
    for (const value of values) {
      if (first)
        pairs2.push(pairof(previous, value));
      previous = value;
      first = true;
    }
    return pairs2;
  }
  function pair(a2, b) {
    return [a2, b];
  }
  var init_pairs = __esm(() => {
  });

  // node_modules/d3-array/src/range.js
  function range_default(start2, stop, step2) {
    start2 = +start2, stop = +stop, step2 = (n = arguments.length) < 2 ? (stop = start2, start2 = 0, 1) : n < 3 ? 1 : +step2;
    var i = -1, n = Math.max(0, Math.ceil((stop - start2) / step2)) | 0, range2 = new Array(n);
    while (++i < n) {
      range2[i] = start2 + i * step2;
    }
    return range2;
  }
  var init_range = __esm(() => {
  });

  // node_modules/d3-array/src/least.js
  function least(values, compare = ascending_default) {
    let min4;
    let defined = false;
    if (compare.length === 1) {
      let minValue;
      for (const element of values) {
        const value = compare(element);
        if (defined ? ascending_default(value, minValue) < 0 : ascending_default(value, value) === 0) {
          min4 = element;
          minValue = value;
          defined = true;
        }
      }
    } else {
      for (const value of values) {
        if (defined ? compare(value, min4) < 0 : compare(value, value) === 0) {
          min4 = value;
          defined = true;
        }
      }
    }
    return min4;
  }
  var init_least = __esm(() => {
    init_ascending();
  });

  // node_modules/d3-array/src/leastIndex.js
  function leastIndex(values, compare = ascending_default) {
    if (compare.length === 1)
      return minIndex(values, compare);
    let minValue;
    let min4 = -1;
    let index2 = -1;
    for (const value of values) {
      ++index2;
      if (min4 < 0 ? compare(value, value) === 0 : compare(value, minValue) < 0) {
        minValue = value;
        min4 = index2;
      }
    }
    return min4;
  }
  var init_leastIndex = __esm(() => {
    init_ascending();
    init_minIndex();
  });

  // node_modules/d3-array/src/greatest.js
  function greatest(values, compare = ascending_default) {
    let max4;
    let defined = false;
    if (compare.length === 1) {
      let maxValue;
      for (const element of values) {
        const value = compare(element);
        if (defined ? ascending_default(value, maxValue) > 0 : ascending_default(value, value) === 0) {
          max4 = element;
          maxValue = value;
          defined = true;
        }
      }
    } else {
      for (const value of values) {
        if (defined ? compare(value, max4) > 0 : compare(value, value) === 0) {
          max4 = value;
          defined = true;
        }
      }
    }
    return max4;
  }
  var init_greatest = __esm(() => {
    init_ascending();
  });

  // node_modules/d3-array/src/greatestIndex.js
  function greatestIndex(values, compare = ascending_default) {
    if (compare.length === 1)
      return maxIndex(values, compare);
    let maxValue;
    let max4 = -1;
    let index2 = -1;
    for (const value of values) {
      ++index2;
      if (max4 < 0 ? compare(value, value) === 0 : compare(value, maxValue) > 0) {
        maxValue = value;
        max4 = index2;
      }
    }
    return max4;
  }
  var init_greatestIndex = __esm(() => {
    init_ascending();
    init_maxIndex();
  });

  // node_modules/d3-array/src/scan.js
  function scan(values, compare) {
    const index2 = leastIndex(values, compare);
    return index2 < 0 ? void 0 : index2;
  }
  var init_scan = __esm(() => {
    init_leastIndex();
  });

  // node_modules/d3-array/src/shuffle.js
  function shuffler(random) {
    return function shuffle(array3, i0 = 0, i1 = array3.length) {
      let m = i1 - (i0 = +i0);
      while (m) {
        const i = random() * m-- | 0, t = array3[m + i0];
        array3[m + i0] = array3[i + i0];
        array3[i + i0] = t;
      }
      return array3;
    };
  }
  var shuffle_default;
  var init_shuffle = __esm(() => {
    shuffle_default = shuffler(Math.random);
  });

  // node_modules/d3-array/src/sum.js
  function sum(values, valueof) {
    let sum3 = 0;
    if (valueof === void 0) {
      for (let value of values) {
        if (value = +value) {
          sum3 += value;
        }
      }
    } else {
      let index2 = -1;
      for (let value of values) {
        if (value = +valueof(value, ++index2, values)) {
          sum3 += value;
        }
      }
    }
    return sum3;
  }
  var init_sum = __esm(() => {
  });

  // node_modules/d3-array/src/transpose.js
  function transpose_default(matrix) {
    if (!(n = matrix.length))
      return [];
    for (var i = -1, m = min(matrix, length2), transpose = new Array(m); ++i < m; ) {
      for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n; ) {
        row[j] = matrix[j][i];
      }
    }
    return transpose;
  }
  function length2(d) {
    return d.length;
  }
  var init_transpose = __esm(() => {
    init_min();
  });

  // node_modules/d3-array/src/zip.js
  function zip_default() {
    return transpose_default(arguments);
  }
  var init_zip = __esm(() => {
    init_transpose();
  });

  // node_modules/d3-array/src/every.js
  function every(values, test) {
    if (typeof test !== "function")
      throw new TypeError("test is not a function");
    let index2 = -1;
    for (const value of values) {
      if (!test(value, ++index2, values)) {
        return false;
      }
    }
    return true;
  }
  var init_every = __esm(() => {
  });

  // node_modules/d3-array/src/some.js
  function some(values, test) {
    if (typeof test !== "function")
      throw new TypeError("test is not a function");
    let index2 = -1;
    for (const value of values) {
      if (test(value, ++index2, values)) {
        return true;
      }
    }
    return false;
  }
  var init_some = __esm(() => {
  });

  // node_modules/d3-array/src/filter.js
  function filter2(values, test) {
    if (typeof test !== "function")
      throw new TypeError("test is not a function");
    const array3 = [];
    let index2 = -1;
    for (const value of values) {
      if (test(value, ++index2, values)) {
        array3.push(value);
      }
    }
    return array3;
  }
  var init_filter2 = __esm(() => {
  });

  // node_modules/d3-array/src/map.js
  function map2(values, mapper) {
    if (typeof values[Symbol.iterator] !== "function")
      throw new TypeError("values is not iterable");
    if (typeof mapper !== "function")
      throw new TypeError("mapper is not a function");
    return Array.from(values, (value, index2) => mapper(value, index2, values));
  }
  var init_map = __esm(() => {
  });

  // node_modules/d3-array/src/reduce.js
  function reduce(values, reducer2, value) {
    if (typeof reducer2 !== "function")
      throw new TypeError("reducer is not a function");
    const iterator = values[Symbol.iterator]();
    let done, next, index2 = -1;
    if (arguments.length < 3) {
      ({done, value} = iterator.next());
      if (done)
        return;
      ++index2;
    }
    while ({done, value: next} = iterator.next(), !done) {
      value = reducer2(value, next, ++index2, values);
    }
    return value;
  }
  var init_reduce = __esm(() => {
  });

  // node_modules/d3-array/src/reverse.js
  function reverse(values) {
    if (typeof values[Symbol.iterator] !== "function")
      throw new TypeError("values is not iterable");
    return Array.from(values).reverse();
  }
  var init_reverse = __esm(() => {
  });

  // node_modules/d3-array/src/difference.js
  function difference(values, ...others) {
    values = new Set(values);
    for (const other of others) {
      for (const value of other) {
        values.delete(value);
      }
    }
    return values;
  }
  var init_difference = __esm(() => {
  });

  // node_modules/d3-array/src/disjoint.js
  function disjoint(values, other) {
    const iterator = other[Symbol.iterator](), set4 = new Set();
    for (const v of values) {
      if (set4.has(v))
        return false;
      let value, done;
      while ({value, done} = iterator.next()) {
        if (done)
          break;
        if (Object.is(v, value))
          return false;
        set4.add(value);
      }
    }
    return true;
  }
  var init_disjoint = __esm(() => {
  });

  // node_modules/d3-array/src/set.js
  function set(values) {
    return values instanceof Set ? values : new Set(values);
  }
  var init_set = __esm(() => {
  });

  // node_modules/d3-array/src/intersection.js
  function intersection(values, ...others) {
    values = new Set(values);
    others = others.map(set);
    out:
      for (const value of values) {
        for (const other of others) {
          if (!other.has(value)) {
            values.delete(value);
            continue out;
          }
        }
      }
    return values;
  }
  var init_intersection = __esm(() => {
    init_set();
  });

  // node_modules/d3-array/src/superset.js
  function superset(values, other) {
    const iterator = values[Symbol.iterator](), set4 = new Set();
    for (const o of other) {
      if (set4.has(o))
        continue;
      let value, done;
      while ({value, done} = iterator.next()) {
        if (done)
          return false;
        set4.add(value);
        if (Object.is(o, value))
          break;
      }
    }
    return true;
  }
  var init_superset = __esm(() => {
  });

  // node_modules/d3-array/src/subset.js
  function subset(values, other) {
    return superset(other, values);
  }
  var init_subset = __esm(() => {
    init_superset();
  });

  // node_modules/d3-array/src/union.js
  function union(...others) {
    const set4 = new Set();
    for (const other of others) {
      for (const o of other) {
        set4.add(o);
      }
    }
    return set4;
  }
  var init_union = __esm(() => {
  });

  // node_modules/d3-array/src/index.js
  var src_exports3 = {};
  __export(src_exports3, {
    Adder: () => Adder,
    InternMap: () => InternMap,
    InternSet: () => InternSet,
    ascending: () => ascending_default,
    bin: () => bin_default,
    bisect: () => bisect_default,
    bisectCenter: () => bisectCenter,
    bisectLeft: () => bisectLeft,
    bisectRight: () => bisectRight,
    bisector: () => bisector_default,
    count: () => count,
    cross: () => cross,
    cumsum: () => cumsum,
    descending: () => descending_default,
    deviation: () => deviation,
    difference: () => difference,
    disjoint: () => disjoint,
    every: () => every,
    extent: () => extent_default,
    fcumsum: () => fcumsum,
    filter: () => filter2,
    flatGroup: () => flatGroup,
    flatRollup: () => flatRollup,
    fsum: () => fsum,
    greatest: () => greatest,
    greatestIndex: () => greatestIndex,
    group: () => group,
    groupSort: () => groupSort,
    groups: () => groups,
    histogram: () => bin_default,
    index: () => index,
    indexes: () => indexes,
    intersection: () => intersection,
    least: () => least,
    leastIndex: () => leastIndex,
    map: () => map2,
    max: () => max,
    maxIndex: () => maxIndex,
    mean: () => mean,
    median: () => median_default,
    merge: () => merge,
    min: () => min,
    minIndex: () => minIndex,
    mode: () => mode_default,
    nice: () => nice,
    pairs: () => pairs,
    permute: () => permute_default,
    quantile: () => quantile,
    quantileSorted: () => quantileSorted,
    quickselect: () => quickselect,
    range: () => range_default,
    reduce: () => reduce,
    reverse: () => reverse,
    rollup: () => rollup,
    rollups: () => rollups,
    scan: () => scan,
    shuffle: () => shuffle_default,
    shuffler: () => shuffler,
    some: () => some,
    sort: () => sort,
    subset: () => subset,
    sum: () => sum,
    superset: () => superset,
    thresholdFreedmanDiaconis: () => freedmanDiaconis_default,
    thresholdScott: () => scott_default,
    thresholdSturges: () => sturges_default,
    tickIncrement: () => tickIncrement,
    tickStep: () => tickStep,
    ticks: () => ticks_default,
    transpose: () => transpose_default,
    union: () => union,
    variance: () => variance,
    zip: () => zip_default
  });
  var init_src5 = __esm(() => {
    init_bisect();
    init_ascending();
    init_bisector();
    init_count();
    init_cross();
    init_cumsum();
    init_descending();
    init_deviation();
    init_extent();
    init_fsum();
    init_group();
    init_groupSort();
    init_bin();
    init_freedmanDiaconis();
    init_scott();
    init_sturges();
    init_max();
    init_maxIndex();
    init_mean();
    init_median();
    init_merge2();
    init_min();
    init_minIndex();
    init_mode();
    init_nice();
    init_pairs();
    init_permute();
    init_quantile();
    init_quickselect();
    init_range();
    init_least();
    init_leastIndex();
    init_greatest();
    init_greatestIndex();
    init_scan();
    init_shuffle();
    init_sum();
    init_ticks();
    init_transpose();
    init_variance();
    init_zip();
    init_every();
    init_some();
    init_filter2();
    init_map();
    init_reduce();
    init_reverse();
    init_sort2();
    init_difference();
    init_disjoint();
    init_intersection();
    init_subset();
    init_superset();
    init_union();
    init_src4();
  });

  // node_modules/d3-scale/src/init.js
  function initRange(domain, range2) {
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        this.range(domain);
        break;
      default:
        this.range(range2).domain(domain);
        break;
    }
    return this;
  }
  function initInterpolator(domain, interpolator) {
    switch (arguments.length) {
      case 0:
        break;
      case 1: {
        if (typeof domain === "function")
          this.interpolator(domain);
        else
          this.range(domain);
        break;
      }
      default: {
        this.domain(domain);
        if (typeof interpolator === "function")
          this.interpolator(interpolator);
        else
          this.range(interpolator);
        break;
      }
    }
    return this;
  }
  var init_init = __esm(() => {
  });

  // node_modules/d3-scale/src/ordinal.js
  function ordinal() {
    var index2 = new InternMap(), domain = [], range2 = [], unknown = implicit;
    function scale(d) {
      let i = index2.get(d);
      if (i === void 0) {
        if (unknown !== implicit)
          return unknown;
        index2.set(d, i = domain.push(d) - 1);
      }
      return range2[i % range2.length];
    }
    scale.domain = function(_) {
      if (!arguments.length)
        return domain.slice();
      domain = [], index2 = new InternMap();
      for (const value of _) {
        if (index2.has(value))
          continue;
        index2.set(value, domain.push(value) - 1);
      }
      return scale;
    };
    scale.range = function(_) {
      return arguments.length ? (range2 = Array.from(_), scale) : range2.slice();
    };
    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };
    scale.copy = function() {
      return ordinal(domain, range2).unknown(unknown);
    };
    initRange.apply(scale, arguments);
    return scale;
  }
  var implicit;
  var init_ordinal = __esm(() => {
    init_src5();
    init_init();
    implicit = Symbol("implicit");
  });

  // node_modules/d3-scale/src/band.js
  function band() {
    var scale = ordinal().unknown(void 0), domain = scale.domain, ordinalRange = scale.range, r0 = 0, r1 = 1, step2, bandwidth, round2 = false, paddingInner = 0, paddingOuter = 0, align = 0.5;
    delete scale.unknown;
    function rescale() {
      var n = domain().length, reverse2 = r1 < r0, start2 = reverse2 ? r1 : r0, stop = reverse2 ? r0 : r1;
      step2 = (stop - start2) / Math.max(1, n - paddingInner + paddingOuter * 2);
      if (round2)
        step2 = Math.floor(step2);
      start2 += (stop - start2 - step2 * (n - paddingInner)) * align;
      bandwidth = step2 * (1 - paddingInner);
      if (round2)
        start2 = Math.round(start2), bandwidth = Math.round(bandwidth);
      var values = range_default(n).map(function(i) {
        return start2 + step2 * i;
      });
      return ordinalRange(reverse2 ? values.reverse() : values);
    }
    scale.domain = function(_) {
      return arguments.length ? (domain(_), rescale()) : domain();
    };
    scale.range = function(_) {
      return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
    };
    scale.rangeRound = function(_) {
      return [r0, r1] = _, r0 = +r0, r1 = +r1, round2 = true, rescale();
    };
    scale.bandwidth = function() {
      return bandwidth;
    };
    scale.step = function() {
      return step2;
    };
    scale.round = function(_) {
      return arguments.length ? (round2 = !!_, rescale()) : round2;
    };
    scale.padding = function(_) {
      return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
    };
    scale.paddingInner = function(_) {
      return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
    };
    scale.paddingOuter = function(_) {
      return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
    };
    scale.align = function(_) {
      return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
    };
    scale.copy = function() {
      return band(domain(), [r0, r1]).round(round2).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
    };
    return initRange.apply(rescale(), arguments);
  }
  function pointish(scale) {
    var copy3 = scale.copy;
    scale.padding = scale.paddingOuter;
    delete scale.paddingInner;
    delete scale.paddingOuter;
    scale.copy = function() {
      return pointish(copy3());
    };
    return scale;
  }
  function point() {
    return pointish(band.apply(null, arguments).paddingInner(1));
  }
  var init_band = __esm(() => {
    init_src5();
    init_init();
    init_ordinal();
  });

  // node_modules/d3-scale/src/constant.js
  function constants(x2) {
    return function() {
      return x2;
    };
  }
  var init_constant4 = __esm(() => {
  });

  // node_modules/d3-scale/src/number.js
  function number(x2) {
    return +x2;
  }
  var init_number3 = __esm(() => {
  });

  // node_modules/d3-scale/src/continuous.js
  function identity2(x2) {
    return x2;
  }
  function normalize(a2, b) {
    return (b -= a2 = +a2) ? function(x2) {
      return (x2 - a2) / b;
    } : constants(isNaN(b) ? NaN : 0.5);
  }
  function clamper(a2, b) {
    var t;
    if (a2 > b)
      t = a2, a2 = b, b = t;
    return function(x2) {
      return Math.max(a2, Math.min(b, x2));
    };
  }
  function bimap(domain, range2, interpolate) {
    var d0 = domain[0], d1 = domain[1], r0 = range2[0], r1 = range2[1];
    if (d1 < d0)
      d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
    else
      d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
    return function(x2) {
      return r0(d0(x2));
    };
  }
  function polymap(domain, range2, interpolate) {
    var j = Math.min(domain.length, range2.length) - 1, d = new Array(j), r = new Array(j), i = -1;
    if (domain[j] < domain[0]) {
      domain = domain.slice().reverse();
      range2 = range2.slice().reverse();
    }
    while (++i < j) {
      d[i] = normalize(domain[i], domain[i + 1]);
      r[i] = interpolate(range2[i], range2[i + 1]);
    }
    return function(x2) {
      var i2 = bisect_default(domain, x2, 1, j) - 1;
      return r[i2](d[i2](x2));
    };
  }
  function copy(source, target) {
    return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
  }
  function transformer() {
    var domain = unit, range2 = unit, interpolate = value_default, transform, untransform, unknown, clamp = identity2, piecewise2, output, input;
    function rescale() {
      var n = Math.min(domain.length, range2.length);
      if (clamp !== identity2)
        clamp = clamper(domain[0], domain[n - 1]);
      piecewise2 = n > 2 ? polymap : bimap;
      output = input = null;
      return scale;
    }
    function scale(x2) {
      return x2 == null || isNaN(x2 = +x2) ? unknown : (output || (output = piecewise2(domain.map(transform), range2, interpolate)))(transform(clamp(x2)));
    }
    scale.invert = function(y2) {
      return clamp(untransform((input || (input = piecewise2(range2, domain.map(transform), number_default)))(y2)));
    };
    scale.domain = function(_) {
      return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
    };
    scale.range = function(_) {
      return arguments.length ? (range2 = Array.from(_), rescale()) : range2.slice();
    };
    scale.rangeRound = function(_) {
      return range2 = Array.from(_), interpolate = round_default, rescale();
    };
    scale.clamp = function(_) {
      return arguments.length ? (clamp = _ ? true : identity2, rescale()) : clamp !== identity2;
    };
    scale.interpolate = function(_) {
      return arguments.length ? (interpolate = _, rescale()) : interpolate;
    };
    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };
    return function(t, u) {
      transform = t, untransform = u;
      return rescale();
    };
  }
  function continuous() {
    return transformer()(identity2, identity2);
  }
  var unit;
  var init_continuous = __esm(() => {
    init_src5();
    init_src3();
    init_constant4();
    init_number3();
    unit = [0, 1];
  });

  // node_modules/d3-format/src/formatDecimal.js
  function formatDecimal_default(x2) {
    return Math.abs(x2 = Math.round(x2)) >= 1e21 ? x2.toLocaleString("en").replace(/,/g, "") : x2.toString(10);
  }
  function formatDecimalParts(x2, p) {
    if ((i = (x2 = p ? x2.toExponential(p - 1) : x2.toExponential()).indexOf("e")) < 0)
      return null;
    var i, coefficient = x2.slice(0, i);
    return [
      coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
      +x2.slice(i + 1)
    ];
  }
  var init_formatDecimal = __esm(() => {
  });

  // node_modules/d3-format/src/exponent.js
  function exponent_default(x2) {
    return x2 = formatDecimalParts(Math.abs(x2)), x2 ? x2[1] : NaN;
  }
  var init_exponent = __esm(() => {
    init_formatDecimal();
  });

  // node_modules/d3-format/src/formatGroup.js
  function formatGroup_default(grouping, thousands) {
    return function(value, width) {
      var i = value.length, t = [], j = 0, g = grouping[0], length4 = 0;
      while (i > 0 && g > 0) {
        if (length4 + g + 1 > width)
          g = Math.max(1, width - length4);
        t.push(value.substring(i -= g, i + g));
        if ((length4 += g + 1) > width)
          break;
        g = grouping[j = (j + 1) % grouping.length];
      }
      return t.reverse().join(thousands);
    };
  }
  var init_formatGroup = __esm(() => {
  });

  // node_modules/d3-format/src/formatNumerals.js
  function formatNumerals_default(numerals) {
    return function(value) {
      return value.replace(/[0-9]/g, function(i) {
        return numerals[+i];
      });
    };
  }
  var init_formatNumerals = __esm(() => {
  });

  // node_modules/d3-format/src/formatSpecifier.js
  function formatSpecifier(specifier) {
    if (!(match = re.exec(specifier)))
      throw new Error("invalid format: " + specifier);
    var match;
    return new FormatSpecifier({
      fill: match[1],
      align: match[2],
      sign: match[3],
      symbol: match[4],
      zero: match[5],
      width: match[6],
      comma: match[7],
      precision: match[8] && match[8].slice(1),
      trim: match[9],
      type: match[10]
    });
  }
  function FormatSpecifier(specifier) {
    this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
    this.align = specifier.align === void 0 ? ">" : specifier.align + "";
    this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
    this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
    this.zero = !!specifier.zero;
    this.width = specifier.width === void 0 ? void 0 : +specifier.width;
    this.comma = !!specifier.comma;
    this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
    this.trim = !!specifier.trim;
    this.type = specifier.type === void 0 ? "" : specifier.type + "";
  }
  var re;
  var init_formatSpecifier = __esm(() => {
    re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
    formatSpecifier.prototype = FormatSpecifier.prototype;
    FormatSpecifier.prototype.toString = function() {
      return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
    };
  });

  // node_modules/d3-format/src/formatTrim.js
  function formatTrim_default(s2) {
    out:
      for (var n = s2.length, i = 1, i0 = -1, i1; i < n; ++i) {
        switch (s2[i]) {
          case ".":
            i0 = i1 = i;
            break;
          case "0":
            if (i0 === 0)
              i0 = i;
            i1 = i;
            break;
          default:
            if (!+s2[i])
              break out;
            if (i0 > 0)
              i0 = 0;
            break;
        }
      }
    return i0 > 0 ? s2.slice(0, i0) + s2.slice(i1 + 1) : s2;
  }
  var init_formatTrim = __esm(() => {
  });

  // node_modules/d3-format/src/formatPrefixAuto.js
  function formatPrefixAuto_default(x2, p) {
    var d = formatDecimalParts(x2, p);
    if (!d)
      return x2 + "";
    var coefficient = d[0], exponent = d[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
    return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x2, Math.max(0, p + i - 1))[0];
  }
  var prefixExponent;
  var init_formatPrefixAuto = __esm(() => {
    init_formatDecimal();
  });

  // node_modules/d3-format/src/formatRounded.js
  function formatRounded_default(x2, p) {
    var d = formatDecimalParts(x2, p);
    if (!d)
      return x2 + "";
    var coefficient = d[0], exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  }
  var init_formatRounded = __esm(() => {
    init_formatDecimal();
  });

  // node_modules/d3-format/src/formatTypes.js
  var formatTypes_default;
  var init_formatTypes = __esm(() => {
    init_formatDecimal();
    init_formatPrefixAuto();
    init_formatRounded();
    formatTypes_default = {
      "%": (x2, p) => (x2 * 100).toFixed(p),
      b: (x2) => Math.round(x2).toString(2),
      c: (x2) => x2 + "",
      d: formatDecimal_default,
      e: (x2, p) => x2.toExponential(p),
      f: (x2, p) => x2.toFixed(p),
      g: (x2, p) => x2.toPrecision(p),
      o: (x2) => Math.round(x2).toString(8),
      p: (x2, p) => formatRounded_default(x2 * 100, p),
      r: formatRounded_default,
      s: formatPrefixAuto_default,
      X: (x2) => Math.round(x2).toString(16).toUpperCase(),
      x: (x2) => Math.round(x2).toString(16)
    };
  });

  // node_modules/d3-format/src/identity.js
  function identity_default2(x2) {
    return x2;
  }
  var init_identity2 = __esm(() => {
  });

  // node_modules/d3-format/src/locale.js
  function locale_default(locale3) {
    var group2 = locale3.grouping === void 0 || locale3.thousands === void 0 ? identity_default2 : formatGroup_default(map3.call(locale3.grouping, Number), locale3.thousands + ""), currencyPrefix = locale3.currency === void 0 ? "" : locale3.currency[0] + "", currencySuffix = locale3.currency === void 0 ? "" : locale3.currency[1] + "", decimal = locale3.decimal === void 0 ? "." : locale3.decimal + "", numerals = locale3.numerals === void 0 ? identity_default2 : formatNumerals_default(map3.call(locale3.numerals, String)), percent = locale3.percent === void 0 ? "%" : locale3.percent + "", minus = locale3.minus === void 0 ? "\u2212" : locale3.minus + "", nan = locale3.nan === void 0 ? "NaN" : locale3.nan + "";
    function newFormat(specifier) {
      specifier = formatSpecifier(specifier);
      var fill = specifier.fill, align = specifier.align, sign4 = specifier.sign, symbol = specifier.symbol, zero2 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
      if (type === "n")
        comma = true, type = "g";
      else if (!formatTypes_default[type])
        precision === void 0 && (precision = 12), trim = true, type = "g";
      if (zero2 || fill === "0" && align === "=")
        zero2 = true, fill = "0", align = "=";
      var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
      var formatType = formatTypes_default[type], maybeSuffix = /[defgprs%]/.test(type);
      precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
      function format2(value) {
        var valuePrefix = prefix, valueSuffix = suffix, i, n, c2;
        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value;
          var valueNegative = value < 0 || 1 / value < 0;
          value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
          if (trim)
            value = formatTrim_default(value);
          if (valueNegative && +value === 0 && sign4 !== "+")
            valueNegative = false;
          valuePrefix = (valueNegative ? sign4 === "(" ? sign4 : minus : sign4 === "-" || sign4 === "(" ? "" : sign4) + valuePrefix;
          valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign4 === "(" ? ")" : "");
          if (maybeSuffix) {
            i = -1, n = value.length;
            while (++i < n) {
              if (c2 = value.charCodeAt(i), 48 > c2 || c2 > 57) {
                valueSuffix = (c2 === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        }
        if (comma && !zero2)
          value = group2(value, Infinity);
        var length4 = valuePrefix.length + value.length + valueSuffix.length, padding = length4 < width ? new Array(width - length4 + 1).join(fill) : "";
        if (comma && zero2)
          value = group2(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
        switch (align) {
          case "<":
            value = valuePrefix + value + valueSuffix + padding;
            break;
          case "=":
            value = valuePrefix + padding + value + valueSuffix;
            break;
          case "^":
            value = padding.slice(0, length4 = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length4);
            break;
          default:
            value = padding + valuePrefix + value + valueSuffix;
            break;
        }
        return numerals(value);
      }
      format2.toString = function() {
        return specifier + "";
      };
      return format2;
    }
    function formatPrefix2(specifier, value) {
      var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e3 = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k3 = Math.pow(10, -e3), prefix = prefixes[8 + e3 / 3];
      return function(value2) {
        return f(k3 * value2) + prefix;
      };
    }
    return {
      format: newFormat,
      formatPrefix: formatPrefix2
    };
  }
  var map3, prefixes;
  var init_locale = __esm(() => {
    init_exponent();
    init_formatGroup();
    init_formatNumerals();
    init_formatSpecifier();
    init_formatTrim();
    init_formatTypes();
    init_formatPrefixAuto();
    init_identity2();
    map3 = Array.prototype.map;
    prefixes = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  });

  // node_modules/d3-format/src/defaultLocale.js
  function defaultLocale(definition) {
    locale = locale_default(definition);
    format = locale.format;
    formatPrefix = locale.formatPrefix;
    return locale;
  }
  var locale, format, formatPrefix;
  var init_defaultLocale = __esm(() => {
    init_locale();
    defaultLocale({
      thousands: ",",
      grouping: [3],
      currency: ["$", ""]
    });
  });

  // node_modules/d3-format/src/precisionFixed.js
  function precisionFixed_default(step2) {
    return Math.max(0, -exponent_default(Math.abs(step2)));
  }
  var init_precisionFixed = __esm(() => {
    init_exponent();
  });

  // node_modules/d3-format/src/precisionPrefix.js
  function precisionPrefix_default(step2, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3 - exponent_default(Math.abs(step2)));
  }
  var init_precisionPrefix = __esm(() => {
    init_exponent();
  });

  // node_modules/d3-format/src/precisionRound.js
  function precisionRound_default(step2, max4) {
    step2 = Math.abs(step2), max4 = Math.abs(max4) - step2;
    return Math.max(0, exponent_default(max4) - exponent_default(step2)) + 1;
  }
  var init_precisionRound = __esm(() => {
    init_exponent();
  });

  // node_modules/d3-format/src/index.js
  var init_src6 = __esm(() => {
    init_defaultLocale();
    init_formatSpecifier();
    init_precisionFixed();
    init_precisionPrefix();
    init_precisionRound();
  });

  // node_modules/d3-scale/src/tickFormat.js
  function tickFormat(start2, stop, count2, specifier) {
    var step2 = tickStep(start2, stop, count2), precision;
    specifier = formatSpecifier(specifier == null ? ",f" : specifier);
    switch (specifier.type) {
      case "s": {
        var value = Math.max(Math.abs(start2), Math.abs(stop));
        if (specifier.precision == null && !isNaN(precision = precisionPrefix_default(step2, value)))
          specifier.precision = precision;
        return formatPrefix(specifier, value);
      }
      case "":
      case "e":
      case "g":
      case "p":
      case "r": {
        if (specifier.precision == null && !isNaN(precision = precisionRound_default(step2, Math.max(Math.abs(start2), Math.abs(stop)))))
          specifier.precision = precision - (specifier.type === "e");
        break;
      }
      case "f":
      case "%": {
        if (specifier.precision == null && !isNaN(precision = precisionFixed_default(step2)))
          specifier.precision = precision - (specifier.type === "%") * 2;
        break;
      }
    }
    return format(specifier);
  }
  var init_tickFormat = __esm(() => {
    init_src5();
    init_src6();
  });

  // node_modules/d3-scale/src/linear.js
  function linearish(scale) {
    var domain = scale.domain;
    scale.ticks = function(count2) {
      var d = domain();
      return ticks_default(d[0], d[d.length - 1], count2 == null ? 10 : count2);
    };
    scale.tickFormat = function(count2, specifier) {
      var d = domain();
      return tickFormat(d[0], d[d.length - 1], count2 == null ? 10 : count2, specifier);
    };
    scale.nice = function(count2) {
      if (count2 == null)
        count2 = 10;
      var d = domain();
      var i0 = 0;
      var i1 = d.length - 1;
      var start2 = d[i0];
      var stop = d[i1];
      var prestep;
      var step2;
      var maxIter = 10;
      if (stop < start2) {
        step2 = start2, start2 = stop, stop = step2;
        step2 = i0, i0 = i1, i1 = step2;
      }
      while (maxIter-- > 0) {
        step2 = tickIncrement(start2, stop, count2);
        if (step2 === prestep) {
          d[i0] = start2;
          d[i1] = stop;
          return domain(d);
        } else if (step2 > 0) {
          start2 = Math.floor(start2 / step2) * step2;
          stop = Math.ceil(stop / step2) * step2;
        } else if (step2 < 0) {
          start2 = Math.ceil(start2 * step2) / step2;
          stop = Math.floor(stop * step2) / step2;
        } else {
          break;
        }
        prestep = step2;
      }
      return scale;
    };
    return scale;
  }
  function linear2() {
    var scale = continuous();
    scale.copy = function() {
      return copy(scale, linear2());
    };
    initRange.apply(scale, arguments);
    return linearish(scale);
  }
  var init_linear = __esm(() => {
    init_src5();
    init_continuous();
    init_init();
    init_tickFormat();
  });

  // node_modules/d3-scale/src/identity.js
  function identity3(domain) {
    var unknown;
    function scale(x2) {
      return x2 == null || isNaN(x2 = +x2) ? unknown : x2;
    }
    scale.invert = scale;
    scale.domain = scale.range = function(_) {
      return arguments.length ? (domain = Array.from(_, number), scale) : domain.slice();
    };
    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };
    scale.copy = function() {
      return identity3(domain).unknown(unknown);
    };
    domain = arguments.length ? Array.from(domain, number) : [0, 1];
    return linearish(scale);
  }
  var init_identity3 = __esm(() => {
    init_linear();
    init_number3();
  });

  // node_modules/d3-scale/src/nice.js
  function nice2(domain, interval2) {
    domain = domain.slice();
    var i0 = 0, i1 = domain.length - 1, x07 = domain[i0], x13 = domain[i1], t;
    if (x13 < x07) {
      t = i0, i0 = i1, i1 = t;
      t = x07, x07 = x13, x13 = t;
    }
    domain[i0] = interval2.floor(x07);
    domain[i1] = interval2.ceil(x13);
    return domain;
  }
  var init_nice2 = __esm(() => {
  });

  // node_modules/d3-scale/src/log.js
  function transformLog(x2) {
    return Math.log(x2);
  }
  function transformExp(x2) {
    return Math.exp(x2);
  }
  function transformLogn(x2) {
    return -Math.log(-x2);
  }
  function transformExpn(x2) {
    return -Math.exp(-x2);
  }
  function pow10(x2) {
    return isFinite(x2) ? +("1e" + x2) : x2 < 0 ? 0 : x2;
  }
  function powp(base) {
    return base === 10 ? pow10 : base === Math.E ? Math.exp : function(x2) {
      return Math.pow(base, x2);
    };
  }
  function logp(base) {
    return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), function(x2) {
      return Math.log(x2) / base;
    });
  }
  function reflect(f) {
    return function(x2) {
      return -f(-x2);
    };
  }
  function loggish(transform) {
    var scale = transform(transformLog, transformExp), domain = scale.domain, base = 10, logs, pows;
    function rescale() {
      logs = logp(base), pows = powp(base);
      if (domain()[0] < 0) {
        logs = reflect(logs), pows = reflect(pows);
        transform(transformLogn, transformExpn);
      } else {
        transform(transformLog, transformExp);
      }
      return scale;
    }
    scale.base = function(_) {
      return arguments.length ? (base = +_, rescale()) : base;
    };
    scale.domain = function(_) {
      return arguments.length ? (domain(_), rescale()) : domain();
    };
    scale.ticks = function(count2) {
      var d = domain(), u = d[0], v = d[d.length - 1], r;
      if (r = v < u)
        i = u, u = v, v = i;
      var i = logs(u), j = logs(v), p, k3, t, n = count2 == null ? 10 : +count2, z = [];
      if (!(base % 1) && j - i < n) {
        i = Math.floor(i), j = Math.ceil(j);
        if (u > 0)
          for (; i <= j; ++i) {
            for (k3 = 1, p = pows(i); k3 < base; ++k3) {
              t = p * k3;
              if (t < u)
                continue;
              if (t > v)
                break;
              z.push(t);
            }
          }
        else
          for (; i <= j; ++i) {
            for (k3 = base - 1, p = pows(i); k3 >= 1; --k3) {
              t = p * k3;
              if (t < u)
                continue;
              if (t > v)
                break;
              z.push(t);
            }
          }
        if (z.length * 2 < n)
          z = ticks_default(u, v, n);
      } else {
        z = ticks_default(i, j, Math.min(j - i, n)).map(pows);
      }
      return r ? z.reverse() : z;
    };
    scale.tickFormat = function(count2, specifier) {
      if (specifier == null)
        specifier = base === 10 ? ".0e" : ",";
      if (typeof specifier !== "function")
        specifier = format(specifier);
      if (count2 === Infinity)
        return specifier;
      if (count2 == null)
        count2 = 10;
      var k3 = Math.max(1, base * count2 / scale.ticks().length);
      return function(d) {
        var i = d / pows(Math.round(logs(d)));
        if (i * base < base - 0.5)
          i *= base;
        return i <= k3 ? specifier(d) : "";
      };
    };
    scale.nice = function() {
      return domain(nice2(domain(), {
        floor: function(x2) {
          return pows(Math.floor(logs(x2)));
        },
        ceil: function(x2) {
          return pows(Math.ceil(logs(x2)));
        }
      }));
    };
    return scale;
  }
  function log() {
    var scale = loggish(transformer()).domain([1, 10]);
    scale.copy = function() {
      return copy(scale, log()).base(scale.base());
    };
    initRange.apply(scale, arguments);
    return scale;
  }
  var init_log = __esm(() => {
    init_src5();
    init_src6();
    init_nice2();
    init_continuous();
    init_init();
  });

  // node_modules/d3-scale/src/symlog.js
  function transformSymlog(c2) {
    return function(x2) {
      return Math.sign(x2) * Math.log1p(Math.abs(x2 / c2));
    };
  }
  function transformSymexp(c2) {
    return function(x2) {
      return Math.sign(x2) * Math.expm1(Math.abs(x2)) * c2;
    };
  }
  function symlogish(transform) {
    var c2 = 1, scale = transform(transformSymlog(c2), transformSymexp(c2));
    scale.constant = function(_) {
      return arguments.length ? transform(transformSymlog(c2 = +_), transformSymexp(c2)) : c2;
    };
    return linearish(scale);
  }
  function symlog() {
    var scale = symlogish(transformer());
    scale.copy = function() {
      return copy(scale, symlog()).constant(scale.constant());
    };
    return initRange.apply(scale, arguments);
  }
  var init_symlog = __esm(() => {
    init_linear();
    init_continuous();
    init_init();
  });

  // node_modules/d3-scale/src/pow.js
  function transformPow(exponent) {
    return function(x2) {
      return x2 < 0 ? -Math.pow(-x2, exponent) : Math.pow(x2, exponent);
    };
  }
  function transformSqrt(x2) {
    return x2 < 0 ? -Math.sqrt(-x2) : Math.sqrt(x2);
  }
  function transformSquare(x2) {
    return x2 < 0 ? -x2 * x2 : x2 * x2;
  }
  function powish(transform) {
    var scale = transform(identity2, identity2), exponent = 1;
    function rescale() {
      return exponent === 1 ? transform(identity2, identity2) : exponent === 0.5 ? transform(transformSqrt, transformSquare) : transform(transformPow(exponent), transformPow(1 / exponent));
    }
    scale.exponent = function(_) {
      return arguments.length ? (exponent = +_, rescale()) : exponent;
    };
    return linearish(scale);
  }
  function pow() {
    var scale = powish(transformer());
    scale.copy = function() {
      return copy(scale, pow()).exponent(scale.exponent());
    };
    initRange.apply(scale, arguments);
    return scale;
  }
  function sqrt() {
    return pow.apply(null, arguments).exponent(0.5);
  }
  var init_pow = __esm(() => {
    init_linear();
    init_continuous();
    init_init();
  });

  // node_modules/d3-scale/src/radial.js
  function square(x2) {
    return Math.sign(x2) * x2 * x2;
  }
  function unsquare(x2) {
    return Math.sign(x2) * Math.sqrt(Math.abs(x2));
  }
  function radial() {
    var squared = continuous(), range2 = [0, 1], round2 = false, unknown;
    function scale(x2) {
      var y2 = unsquare(squared(x2));
      return isNaN(y2) ? unknown : round2 ? Math.round(y2) : y2;
    }
    scale.invert = function(y2) {
      return squared.invert(square(y2));
    };
    scale.domain = function(_) {
      return arguments.length ? (squared.domain(_), scale) : squared.domain();
    };
    scale.range = function(_) {
      return arguments.length ? (squared.range((range2 = Array.from(_, number)).map(square)), scale) : range2.slice();
    };
    scale.rangeRound = function(_) {
      return scale.range(_).round(true);
    };
    scale.round = function(_) {
      return arguments.length ? (round2 = !!_, scale) : round2;
    };
    scale.clamp = function(_) {
      return arguments.length ? (squared.clamp(_), scale) : squared.clamp();
    };
    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };
    scale.copy = function() {
      return radial(squared.domain(), range2).round(round2).clamp(squared.clamp()).unknown(unknown);
    };
    initRange.apply(scale, arguments);
    return linearish(scale);
  }
  var init_radial = __esm(() => {
    init_continuous();
    init_init();
    init_linear();
    init_number3();
  });

  // node_modules/d3-scale/src/quantile.js
  function quantile2() {
    var domain = [], range2 = [], thresholds = [], unknown;
    function rescale() {
      var i = 0, n = Math.max(1, range2.length);
      thresholds = new Array(n - 1);
      while (++i < n)
        thresholds[i - 1] = quantileSorted(domain, i / n);
      return scale;
    }
    function scale(x2) {
      return x2 == null || isNaN(x2 = +x2) ? unknown : range2[bisect_default(thresholds, x2)];
    }
    scale.invertExtent = function(y2) {
      var i = range2.indexOf(y2);
      return i < 0 ? [NaN, NaN] : [
        i > 0 ? thresholds[i - 1] : domain[0],
        i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
      ];
    };
    scale.domain = function(_) {
      if (!arguments.length)
        return domain.slice();
      domain = [];
      for (let d of _)
        if (d != null && !isNaN(d = +d))
          domain.push(d);
      domain.sort(ascending_default);
      return rescale();
    };
    scale.range = function(_) {
      return arguments.length ? (range2 = Array.from(_), rescale()) : range2.slice();
    };
    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };
    scale.quantiles = function() {
      return thresholds.slice();
    };
    scale.copy = function() {
      return quantile2().domain(domain).range(range2).unknown(unknown);
    };
    return initRange.apply(scale, arguments);
  }
  var init_quantile2 = __esm(() => {
    init_src5();
    init_init();
  });

  // node_modules/d3-scale/src/quantize.js
  function quantize() {
    var x07 = 0, x13 = 1, n = 1, domain = [0.5], range2 = [0, 1], unknown;
    function scale(x2) {
      return x2 != null && x2 <= x2 ? range2[bisect_default(domain, x2, 0, n)] : unknown;
    }
    function rescale() {
      var i = -1;
      domain = new Array(n);
      while (++i < n)
        domain[i] = ((i + 1) * x13 - (i - n) * x07) / (n + 1);
      return scale;
    }
    scale.domain = function(_) {
      return arguments.length ? ([x07, x13] = _, x07 = +x07, x13 = +x13, rescale()) : [x07, x13];
    };
    scale.range = function(_) {
      return arguments.length ? (n = (range2 = Array.from(_)).length - 1, rescale()) : range2.slice();
    };
    scale.invertExtent = function(y2) {
      var i = range2.indexOf(y2);
      return i < 0 ? [NaN, NaN] : i < 1 ? [x07, domain[0]] : i >= n ? [domain[n - 1], x13] : [domain[i - 1], domain[i]];
    };
    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : scale;
    };
    scale.thresholds = function() {
      return domain.slice();
    };
    scale.copy = function() {
      return quantize().domain([x07, x13]).range(range2).unknown(unknown);
    };
    return initRange.apply(linearish(scale), arguments);
  }
  var init_quantize2 = __esm(() => {
    init_src5();
    init_linear();
    init_init();
  });

  // node_modules/d3-scale/src/threshold.js
  function threshold() {
    var domain = [0.5], range2 = [0, 1], unknown, n = 1;
    function scale(x2) {
      return x2 != null && x2 <= x2 ? range2[bisect_default(domain, x2, 0, n)] : unknown;
    }
    scale.domain = function(_) {
      return arguments.length ? (domain = Array.from(_), n = Math.min(domain.length, range2.length - 1), scale) : domain.slice();
    };
    scale.range = function(_) {
      return arguments.length ? (range2 = Array.from(_), n = Math.min(domain.length, range2.length - 1), scale) : range2.slice();
    };
    scale.invertExtent = function(y2) {
      var i = range2.indexOf(y2);
      return [domain[i - 1], domain[i]];
    };
    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };
    scale.copy = function() {
      return threshold().domain(domain).range(range2).unknown(unknown);
    };
    return initRange.apply(scale, arguments);
  }
  var init_threshold = __esm(() => {
    init_src5();
    init_init();
  });

  // node_modules/d3-time/src/interval.js
  function newInterval(floori, offseti, count2, field) {
    function interval2(date2) {
      return floori(date2 = arguments.length === 0 ? new Date() : new Date(+date2)), date2;
    }
    interval2.floor = function(date2) {
      return floori(date2 = new Date(+date2)), date2;
    };
    interval2.ceil = function(date2) {
      return floori(date2 = new Date(date2 - 1)), offseti(date2, 1), floori(date2), date2;
    };
    interval2.round = function(date2) {
      var d0 = interval2(date2), d1 = interval2.ceil(date2);
      return date2 - d0 < d1 - date2 ? d0 : d1;
    };
    interval2.offset = function(date2, step2) {
      return offseti(date2 = new Date(+date2), step2 == null ? 1 : Math.floor(step2)), date2;
    };
    interval2.range = function(start2, stop, step2) {
      var range2 = [], previous;
      start2 = interval2.ceil(start2);
      step2 = step2 == null ? 1 : Math.floor(step2);
      if (!(start2 < stop) || !(step2 > 0))
        return range2;
      do
        range2.push(previous = new Date(+start2)), offseti(start2, step2), floori(start2);
      while (previous < start2 && start2 < stop);
      return range2;
    };
    interval2.filter = function(test) {
      return newInterval(function(date2) {
        if (date2 >= date2)
          while (floori(date2), !test(date2))
            date2.setTime(date2 - 1);
      }, function(date2, step2) {
        if (date2 >= date2) {
          if (step2 < 0)
            while (++step2 <= 0) {
              while (offseti(date2, -1), !test(date2)) {
              }
            }
          else
            while (--step2 >= 0) {
              while (offseti(date2, 1), !test(date2)) {
              }
            }
        }
      });
    };
    if (count2) {
      interval2.count = function(start2, end) {
        t02.setTime(+start2), t12.setTime(+end);
        floori(t02), floori(t12);
        return Math.floor(count2(t02, t12));
      };
      interval2.every = function(step2) {
        step2 = Math.floor(step2);
        return !isFinite(step2) || !(step2 > 0) ? null : !(step2 > 1) ? interval2 : interval2.filter(field ? function(d) {
          return field(d) % step2 === 0;
        } : function(d) {
          return interval2.count(0, d) % step2 === 0;
        });
      };
    }
    return interval2;
  }
  var t02, t12;
  var init_interval = __esm(() => {
    t02 = new Date();
    t12 = new Date();
  });

  // node_modules/d3-time/src/millisecond.js
  var millisecond, millisecond_default, milliseconds;
  var init_millisecond = __esm(() => {
    init_interval();
    millisecond = newInterval(function() {
    }, function(date2, step2) {
      date2.setTime(+date2 + step2);
    }, function(start2, end) {
      return end - start2;
    });
    millisecond.every = function(k3) {
      k3 = Math.floor(k3);
      if (!isFinite(k3) || !(k3 > 0))
        return null;
      if (!(k3 > 1))
        return millisecond;
      return newInterval(function(date2) {
        date2.setTime(Math.floor(date2 / k3) * k3);
      }, function(date2, step2) {
        date2.setTime(+date2 + step2 * k3);
      }, function(start2, end) {
        return (end - start2) / k3;
      });
    };
    millisecond_default = millisecond;
    milliseconds = millisecond.range;
  });

  // node_modules/d3-time/src/duration.js
  var durationSecond, durationMinute, durationHour, durationDay, durationWeek, durationMonth, durationYear;
  var init_duration = __esm(() => {
    durationSecond = 1e3;
    durationMinute = durationSecond * 60;
    durationHour = durationMinute * 60;
    durationDay = durationHour * 24;
    durationWeek = durationDay * 7;
    durationMonth = durationDay * 30;
    durationYear = durationDay * 365;
  });

  // node_modules/d3-time/src/second.js
  var second, second_default, seconds;
  var init_second = __esm(() => {
    init_interval();
    init_duration();
    second = newInterval(function(date2) {
      date2.setTime(date2 - date2.getMilliseconds());
    }, function(date2, step2) {
      date2.setTime(+date2 + step2 * durationSecond);
    }, function(start2, end) {
      return (end - start2) / durationSecond;
    }, function(date2) {
      return date2.getUTCSeconds();
    });
    second_default = second;
    seconds = second.range;
  });

  // node_modules/d3-time/src/minute.js
  var minute, minute_default, minutes;
  var init_minute = __esm(() => {
    init_interval();
    init_duration();
    minute = newInterval(function(date2) {
      date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond);
    }, function(date2, step2) {
      date2.setTime(+date2 + step2 * durationMinute);
    }, function(start2, end) {
      return (end - start2) / durationMinute;
    }, function(date2) {
      return date2.getMinutes();
    });
    minute_default = minute;
    minutes = minute.range;
  });

  // node_modules/d3-time/src/hour.js
  var hour, hour_default, hours;
  var init_hour = __esm(() => {
    init_interval();
    init_duration();
    hour = newInterval(function(date2) {
      date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond - date2.getMinutes() * durationMinute);
    }, function(date2, step2) {
      date2.setTime(+date2 + step2 * durationHour);
    }, function(start2, end) {
      return (end - start2) / durationHour;
    }, function(date2) {
      return date2.getHours();
    });
    hour_default = hour;
    hours = hour.range;
  });

  // node_modules/d3-time/src/day.js
  var day, day_default, days;
  var init_day = __esm(() => {
    init_interval();
    init_duration();
    day = newInterval((date2) => date2.setHours(0, 0, 0, 0), (date2, step2) => date2.setDate(date2.getDate() + step2), (start2, end) => (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute) / durationDay, (date2) => date2.getDate() - 1);
    day_default = day;
    days = day.range;
  });

  // node_modules/d3-time/src/week.js
  function weekday(i) {
    return newInterval(function(date2) {
      date2.setDate(date2.getDate() - (date2.getDay() + 7 - i) % 7);
      date2.setHours(0, 0, 0, 0);
    }, function(date2, step2) {
      date2.setDate(date2.getDate() + step2 * 7);
    }, function(start2, end) {
      return (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute) / durationWeek;
    });
  }
  var sunday, monday, tuesday, wednesday, thursday, friday, saturday, sundays, mondays, tuesdays, wednesdays, thursdays, fridays, saturdays;
  var init_week = __esm(() => {
    init_interval();
    init_duration();
    sunday = weekday(0);
    monday = weekday(1);
    tuesday = weekday(2);
    wednesday = weekday(3);
    thursday = weekday(4);
    friday = weekday(5);
    saturday = weekday(6);
    sundays = sunday.range;
    mondays = monday.range;
    tuesdays = tuesday.range;
    wednesdays = wednesday.range;
    thursdays = thursday.range;
    fridays = friday.range;
    saturdays = saturday.range;
  });

  // node_modules/d3-time/src/month.js
  var month, month_default, months;
  var init_month = __esm(() => {
    init_interval();
    month = newInterval(function(date2) {
      date2.setDate(1);
      date2.setHours(0, 0, 0, 0);
    }, function(date2, step2) {
      date2.setMonth(date2.getMonth() + step2);
    }, function(start2, end) {
      return end.getMonth() - start2.getMonth() + (end.getFullYear() - start2.getFullYear()) * 12;
    }, function(date2) {
      return date2.getMonth();
    });
    month_default = month;
    months = month.range;
  });

  // node_modules/d3-time/src/year.js
  var year, year_default, years;
  var init_year = __esm(() => {
    init_interval();
    year = newInterval(function(date2) {
      date2.setMonth(0, 1);
      date2.setHours(0, 0, 0, 0);
    }, function(date2, step2) {
      date2.setFullYear(date2.getFullYear() + step2);
    }, function(start2, end) {
      return end.getFullYear() - start2.getFullYear();
    }, function(date2) {
      return date2.getFullYear();
    });
    year.every = function(k3) {
      return !isFinite(k3 = Math.floor(k3)) || !(k3 > 0) ? null : newInterval(function(date2) {
        date2.setFullYear(Math.floor(date2.getFullYear() / k3) * k3);
        date2.setMonth(0, 1);
        date2.setHours(0, 0, 0, 0);
      }, function(date2, step2) {
        date2.setFullYear(date2.getFullYear() + step2 * k3);
      });
    };
    year_default = year;
    years = year.range;
  });

  // node_modules/d3-time/src/utcMinute.js
  var utcMinute, utcMinute_default, utcMinutes;
  var init_utcMinute = __esm(() => {
    init_interval();
    init_duration();
    utcMinute = newInterval(function(date2) {
      date2.setUTCSeconds(0, 0);
    }, function(date2, step2) {
      date2.setTime(+date2 + step2 * durationMinute);
    }, function(start2, end) {
      return (end - start2) / durationMinute;
    }, function(date2) {
      return date2.getUTCMinutes();
    });
    utcMinute_default = utcMinute;
    utcMinutes = utcMinute.range;
  });

  // node_modules/d3-time/src/utcHour.js
  var utcHour, utcHour_default, utcHours;
  var init_utcHour = __esm(() => {
    init_interval();
    init_duration();
    utcHour = newInterval(function(date2) {
      date2.setUTCMinutes(0, 0, 0);
    }, function(date2, step2) {
      date2.setTime(+date2 + step2 * durationHour);
    }, function(start2, end) {
      return (end - start2) / durationHour;
    }, function(date2) {
      return date2.getUTCHours();
    });
    utcHour_default = utcHour;
    utcHours = utcHour.range;
  });

  // node_modules/d3-time/src/utcDay.js
  var utcDay, utcDay_default, utcDays;
  var init_utcDay = __esm(() => {
    init_interval();
    init_duration();
    utcDay = newInterval(function(date2) {
      date2.setUTCHours(0, 0, 0, 0);
    }, function(date2, step2) {
      date2.setUTCDate(date2.getUTCDate() + step2);
    }, function(start2, end) {
      return (end - start2) / durationDay;
    }, function(date2) {
      return date2.getUTCDate() - 1;
    });
    utcDay_default = utcDay;
    utcDays = utcDay.range;
  });

  // node_modules/d3-time/src/utcWeek.js
  function utcWeekday(i) {
    return newInterval(function(date2) {
      date2.setUTCDate(date2.getUTCDate() - (date2.getUTCDay() + 7 - i) % 7);
      date2.setUTCHours(0, 0, 0, 0);
    }, function(date2, step2) {
      date2.setUTCDate(date2.getUTCDate() + step2 * 7);
    }, function(start2, end) {
      return (end - start2) / durationWeek;
    });
  }
  var utcSunday, utcMonday, utcTuesday, utcWednesday, utcThursday, utcFriday, utcSaturday, utcSundays, utcMondays, utcTuesdays, utcWednesdays, utcThursdays, utcFridays, utcSaturdays;
  var init_utcWeek = __esm(() => {
    init_interval();
    init_duration();
    utcSunday = utcWeekday(0);
    utcMonday = utcWeekday(1);
    utcTuesday = utcWeekday(2);
    utcWednesday = utcWeekday(3);
    utcThursday = utcWeekday(4);
    utcFriday = utcWeekday(5);
    utcSaturday = utcWeekday(6);
    utcSundays = utcSunday.range;
    utcMondays = utcMonday.range;
    utcTuesdays = utcTuesday.range;
    utcWednesdays = utcWednesday.range;
    utcThursdays = utcThursday.range;
    utcFridays = utcFriday.range;
    utcSaturdays = utcSaturday.range;
  });

  // node_modules/d3-time/src/utcMonth.js
  var utcMonth, utcMonth_default, utcMonths;
  var init_utcMonth = __esm(() => {
    init_interval();
    utcMonth = newInterval(function(date2) {
      date2.setUTCDate(1);
      date2.setUTCHours(0, 0, 0, 0);
    }, function(date2, step2) {
      date2.setUTCMonth(date2.getUTCMonth() + step2);
    }, function(start2, end) {
      return end.getUTCMonth() - start2.getUTCMonth() + (end.getUTCFullYear() - start2.getUTCFullYear()) * 12;
    }, function(date2) {
      return date2.getUTCMonth();
    });
    utcMonth_default = utcMonth;
    utcMonths = utcMonth.range;
  });

  // node_modules/d3-time/src/utcYear.js
  var utcYear, utcYear_default, utcYears;
  var init_utcYear = __esm(() => {
    init_interval();
    utcYear = newInterval(function(date2) {
      date2.setUTCMonth(0, 1);
      date2.setUTCHours(0, 0, 0, 0);
    }, function(date2, step2) {
      date2.setUTCFullYear(date2.getUTCFullYear() + step2);
    }, function(start2, end) {
      return end.getUTCFullYear() - start2.getUTCFullYear();
    }, function(date2) {
      return date2.getUTCFullYear();
    });
    utcYear.every = function(k3) {
      return !isFinite(k3 = Math.floor(k3)) || !(k3 > 0) ? null : newInterval(function(date2) {
        date2.setUTCFullYear(Math.floor(date2.getUTCFullYear() / k3) * k3);
        date2.setUTCMonth(0, 1);
        date2.setUTCHours(0, 0, 0, 0);
      }, function(date2, step2) {
        date2.setUTCFullYear(date2.getUTCFullYear() + step2 * k3);
      });
    };
    utcYear_default = utcYear;
    utcYears = utcYear.range;
  });

  // node_modules/d3-time/src/ticks.js
  function ticker(year2, month2, week, day2, hour2, minute2) {
    const tickIntervals = [
      [second_default, 1, durationSecond],
      [second_default, 5, 5 * durationSecond],
      [second_default, 15, 15 * durationSecond],
      [second_default, 30, 30 * durationSecond],
      [minute2, 1, durationMinute],
      [minute2, 5, 5 * durationMinute],
      [minute2, 15, 15 * durationMinute],
      [minute2, 30, 30 * durationMinute],
      [hour2, 1, durationHour],
      [hour2, 3, 3 * durationHour],
      [hour2, 6, 6 * durationHour],
      [hour2, 12, 12 * durationHour],
      [day2, 1, durationDay],
      [day2, 2, 2 * durationDay],
      [week, 1, durationWeek],
      [month2, 1, durationMonth],
      [month2, 3, 3 * durationMonth],
      [year2, 1, durationYear]
    ];
    function ticks(start2, stop, count2) {
      const reverse2 = stop < start2;
      if (reverse2)
        [start2, stop] = [stop, start2];
      const interval2 = count2 && typeof count2.range === "function" ? count2 : tickInterval(start2, stop, count2);
      const ticks2 = interval2 ? interval2.range(start2, +stop + 1) : [];
      return reverse2 ? ticks2.reverse() : ticks2;
    }
    function tickInterval(start2, stop, count2) {
      const target = Math.abs(stop - start2) / count2;
      const i = bisector_default(([, , step3]) => step3).right(tickIntervals, target);
      if (i === tickIntervals.length)
        return year2.every(tickStep(start2 / durationYear, stop / durationYear, count2));
      if (i === 0)
        return millisecond_default.every(Math.max(tickStep(start2, stop, count2), 1));
      const [t, step2] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
      return t.every(step2);
    }
    return [ticks, tickInterval];
  }
  var utcTicks, utcTickInterval, timeTicks, timeTickInterval;
  var init_ticks2 = __esm(() => {
    init_src5();
    init_duration();
    init_millisecond();
    init_second();
    init_minute();
    init_hour();
    init_day();
    init_week();
    init_month();
    init_year();
    init_utcMinute();
    init_utcHour();
    init_utcDay();
    init_utcWeek();
    init_utcMonth();
    init_utcYear();
    [utcTicks, utcTickInterval] = ticker(utcYear_default, utcMonth_default, utcSunday, utcDay_default, utcHour_default, utcMinute_default);
    [timeTicks, timeTickInterval] = ticker(year_default, month_default, sunday, day_default, hour_default, minute_default);
  });

  // node_modules/d3-time/src/index.js
  var init_src7 = __esm(() => {
    init_second();
    init_minute();
    init_hour();
    init_day();
    init_week();
    init_month();
    init_year();
    init_utcMinute();
    init_utcHour();
    init_utcDay();
    init_utcWeek();
    init_utcMonth();
    init_utcYear();
    init_ticks2();
  });

  // node_modules/d3-time-format/src/locale.js
  function localDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date2 = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
      date2.setFullYear(d.y);
      return date2;
    }
    return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
  }
  function utcDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date2 = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
      date2.setUTCFullYear(d.y);
      return date2;
    }
    return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
  }
  function newDate(y2, m, d) {
    return {y: y2, m, d, H: 0, M: 0, S: 0, L: 0};
  }
  function formatLocale(locale3) {
    var locale_dateTime = locale3.dateTime, locale_date = locale3.date, locale_time = locale3.time, locale_periods = locale3.periods, locale_weekdays = locale3.days, locale_shortWeekdays = locale3.shortDays, locale_months = locale3.months, locale_shortMonths = locale3.shortMonths;
    var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
    var formats = {
      a: formatShortWeekday,
      A: formatWeekday,
      b: formatShortMonth,
      B: formatMonth,
      c: null,
      d: formatDayOfMonth,
      e: formatDayOfMonth,
      f: formatMicroseconds,
      g: formatYearISO,
      G: formatFullYearISO,
      H: formatHour24,
      I: formatHour12,
      j: formatDayOfYear,
      L: formatMilliseconds,
      m: formatMonthNumber,
      M: formatMinutes,
      p: formatPeriod,
      q: formatQuarter,
      Q: formatUnixTimestamp,
      s: formatUnixTimestampSeconds,
      S: formatSeconds,
      u: formatWeekdayNumberMonday,
      U: formatWeekNumberSunday,
      V: formatWeekNumberISO,
      w: formatWeekdayNumberSunday,
      W: formatWeekNumberMonday,
      x: null,
      X: null,
      y: formatYear,
      Y: formatFullYear,
      Z: formatZone,
      "%": formatLiteralPercent
    };
    var utcFormats = {
      a: formatUTCShortWeekday,
      A: formatUTCWeekday,
      b: formatUTCShortMonth,
      B: formatUTCMonth,
      c: null,
      d: formatUTCDayOfMonth,
      e: formatUTCDayOfMonth,
      f: formatUTCMicroseconds,
      g: formatUTCYearISO,
      G: formatUTCFullYearISO,
      H: formatUTCHour24,
      I: formatUTCHour12,
      j: formatUTCDayOfYear,
      L: formatUTCMilliseconds,
      m: formatUTCMonthNumber,
      M: formatUTCMinutes,
      p: formatUTCPeriod,
      q: formatUTCQuarter,
      Q: formatUnixTimestamp,
      s: formatUnixTimestampSeconds,
      S: formatUTCSeconds,
      u: formatUTCWeekdayNumberMonday,
      U: formatUTCWeekNumberSunday,
      V: formatUTCWeekNumberISO,
      w: formatUTCWeekdayNumberSunday,
      W: formatUTCWeekNumberMonday,
      x: null,
      X: null,
      y: formatUTCYear,
      Y: formatUTCFullYear,
      Z: formatUTCZone,
      "%": formatLiteralPercent
    };
    var parses = {
      a: parseShortWeekday,
      A: parseWeekday,
      b: parseShortMonth,
      B: parseMonth,
      c: parseLocaleDateTime,
      d: parseDayOfMonth,
      e: parseDayOfMonth,
      f: parseMicroseconds,
      g: parseYear,
      G: parseFullYear,
      H: parseHour24,
      I: parseHour24,
      j: parseDayOfYear,
      L: parseMilliseconds,
      m: parseMonthNumber,
      M: parseMinutes,
      p: parsePeriod,
      q: parseQuarter,
      Q: parseUnixTimestamp,
      s: parseUnixTimestampSeconds,
      S: parseSeconds,
      u: parseWeekdayNumberMonday,
      U: parseWeekNumberSunday,
      V: parseWeekNumberISO,
      w: parseWeekdayNumberSunday,
      W: parseWeekNumberMonday,
      x: parseLocaleDate,
      X: parseLocaleTime,
      y: parseYear,
      Y: parseFullYear,
      Z: parseZone,
      "%": parseLiteralPercent
    };
    formats.x = newFormat(locale_date, formats);
    formats.X = newFormat(locale_time, formats);
    formats.c = newFormat(locale_dateTime, formats);
    utcFormats.x = newFormat(locale_date, utcFormats);
    utcFormats.X = newFormat(locale_time, utcFormats);
    utcFormats.c = newFormat(locale_dateTime, utcFormats);
    function newFormat(specifier, formats2) {
      return function(date2) {
        var string = [], i = -1, j = 0, n = specifier.length, c2, pad3, format2;
        if (!(date2 instanceof Date))
          date2 = new Date(+date2);
        while (++i < n) {
          if (specifier.charCodeAt(i) === 37) {
            string.push(specifier.slice(j, i));
            if ((pad3 = pads[c2 = specifier.charAt(++i)]) != null)
              c2 = specifier.charAt(++i);
            else
              pad3 = c2 === "e" ? " " : "0";
            if (format2 = formats2[c2])
              c2 = format2(date2, pad3);
            string.push(c2);
            j = i + 1;
          }
        }
        string.push(specifier.slice(j, i));
        return string.join("");
      };
    }
    function newParse(specifier, Z) {
      return function(string) {
        var d = newDate(1900, void 0, 1), i = parseSpecifier(d, specifier, string += "", 0), week, day2;
        if (i != string.length)
          return null;
        if ("Q" in d)
          return new Date(d.Q);
        if ("s" in d)
          return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
        if (Z && !("Z" in d))
          d.Z = 0;
        if ("p" in d)
          d.H = d.H % 12 + d.p * 12;
        if (d.m === void 0)
          d.m = "q" in d ? d.q : 0;
        if ("V" in d) {
          if (d.V < 1 || d.V > 53)
            return null;
          if (!("w" in d))
            d.w = 1;
          if ("Z" in d) {
            week = utcDate(newDate(d.y, 0, 1)), day2 = week.getUTCDay();
            week = day2 > 4 || day2 === 0 ? utcMonday.ceil(week) : utcMonday(week);
            week = utcDay_default.offset(week, (d.V - 1) * 7);
            d.y = week.getUTCFullYear();
            d.m = week.getUTCMonth();
            d.d = week.getUTCDate() + (d.w + 6) % 7;
          } else {
            week = localDate(newDate(d.y, 0, 1)), day2 = week.getDay();
            week = day2 > 4 || day2 === 0 ? monday.ceil(week) : monday(week);
            week = day_default.offset(week, (d.V - 1) * 7);
            d.y = week.getFullYear();
            d.m = week.getMonth();
            d.d = week.getDate() + (d.w + 6) % 7;
          }
        } else if ("W" in d || "U" in d) {
          if (!("w" in d))
            d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
          day2 = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
          d.m = 0;
          d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day2 + 5) % 7 : d.w + d.U * 7 - (day2 + 6) % 7;
        }
        if ("Z" in d) {
          d.H += d.Z / 100 | 0;
          d.M += d.Z % 100;
          return utcDate(d);
        }
        return localDate(d);
      };
    }
    function parseSpecifier(d, specifier, string, j) {
      var i = 0, n = specifier.length, m = string.length, c2, parse;
      while (i < n) {
        if (j >= m)
          return -1;
        c2 = specifier.charCodeAt(i++);
        if (c2 === 37) {
          c2 = specifier.charAt(i++);
          parse = parses[c2 in pads ? specifier.charAt(i++) : c2];
          if (!parse || (j = parse(d, string, j)) < 0)
            return -1;
        } else if (c2 != string.charCodeAt(j++)) {
          return -1;
        }
      }
      return j;
    }
    function parsePeriod(d, string, i) {
      var n = periodRe.exec(string.slice(i));
      return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }
    function parseShortWeekday(d, string, i) {
      var n = shortWeekdayRe.exec(string.slice(i));
      return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }
    function parseWeekday(d, string, i) {
      var n = weekdayRe.exec(string.slice(i));
      return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }
    function parseShortMonth(d, string, i) {
      var n = shortMonthRe.exec(string.slice(i));
      return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }
    function parseMonth(d, string, i) {
      var n = monthRe.exec(string.slice(i));
      return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }
    function parseLocaleDateTime(d, string, i) {
      return parseSpecifier(d, locale_dateTime, string, i);
    }
    function parseLocaleDate(d, string, i) {
      return parseSpecifier(d, locale_date, string, i);
    }
    function parseLocaleTime(d, string, i) {
      return parseSpecifier(d, locale_time, string, i);
    }
    function formatShortWeekday(d) {
      return locale_shortWeekdays[d.getDay()];
    }
    function formatWeekday(d) {
      return locale_weekdays[d.getDay()];
    }
    function formatShortMonth(d) {
      return locale_shortMonths[d.getMonth()];
    }
    function formatMonth(d) {
      return locale_months[d.getMonth()];
    }
    function formatPeriod(d) {
      return locale_periods[+(d.getHours() >= 12)];
    }
    function formatQuarter(d) {
      return 1 + ~~(d.getMonth() / 3);
    }
    function formatUTCShortWeekday(d) {
      return locale_shortWeekdays[d.getUTCDay()];
    }
    function formatUTCWeekday(d) {
      return locale_weekdays[d.getUTCDay()];
    }
    function formatUTCShortMonth(d) {
      return locale_shortMonths[d.getUTCMonth()];
    }
    function formatUTCMonth(d) {
      return locale_months[d.getUTCMonth()];
    }
    function formatUTCPeriod(d) {
      return locale_periods[+(d.getUTCHours() >= 12)];
    }
    function formatUTCQuarter(d) {
      return 1 + ~~(d.getUTCMonth() / 3);
    }
    return {
      format: function(specifier) {
        var f = newFormat(specifier += "", formats);
        f.toString = function() {
          return specifier;
        };
        return f;
      },
      parse: function(specifier) {
        var p = newParse(specifier += "", false);
        p.toString = function() {
          return specifier;
        };
        return p;
      },
      utcFormat: function(specifier) {
        var f = newFormat(specifier += "", utcFormats);
        f.toString = function() {
          return specifier;
        };
        return f;
      },
      utcParse: function(specifier) {
        var p = newParse(specifier += "", true);
        p.toString = function() {
          return specifier;
        };
        return p;
      }
    };
  }
  function pad(value, fill, width) {
    var sign4 = value < 0 ? "-" : "", string = (sign4 ? -value : value) + "", length4 = string.length;
    return sign4 + (length4 < width ? new Array(width - length4 + 1).join(fill) + string : string);
  }
  function requote(s2) {
    return s2.replace(requoteRe, "\\$&");
  }
  function formatRe(names) {
    return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
  }
  function formatLookup(names) {
    return new Map(names.map((name, i) => [name.toLowerCase(), i]));
  }
  function parseWeekdayNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.w = +n[0], i + n[0].length) : -1;
  }
  function parseWeekdayNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.u = +n[0], i + n[0].length) : -1;
  }
  function parseWeekNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.U = +n[0], i + n[0].length) : -1;
  }
  function parseWeekNumberISO(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.V = +n[0], i + n[0].length) : -1;
  }
  function parseWeekNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.W = +n[0], i + n[0].length) : -1;
  }
  function parseFullYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 4));
    return n ? (d.y = +n[0], i + n[0].length) : -1;
  }
  function parseYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), i + n[0].length) : -1;
  }
  function parseZone(d, string, i) {
    var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
    return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
  }
  function parseQuarter(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
  }
  function parseMonthNumber(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
  }
  function parseDayOfMonth(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.d = +n[0], i + n[0].length) : -1;
  }
  function parseDayOfYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
  }
  function parseHour24(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.H = +n[0], i + n[0].length) : -1;
  }
  function parseMinutes(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.M = +n[0], i + n[0].length) : -1;
  }
  function parseSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.S = +n[0], i + n[0].length) : -1;
  }
  function parseMilliseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.L = +n[0], i + n[0].length) : -1;
  }
  function parseMicroseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 6));
    return n ? (d.L = Math.floor(n[0] / 1e3), i + n[0].length) : -1;
  }
  function parseLiteralPercent(d, string, i) {
    var n = percentRe.exec(string.slice(i, i + 1));
    return n ? i + n[0].length : -1;
  }
  function parseUnixTimestamp(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.Q = +n[0], i + n[0].length) : -1;
  }
  function parseUnixTimestampSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.s = +n[0], i + n[0].length) : -1;
  }
  function formatDayOfMonth(d, p) {
    return pad(d.getDate(), p, 2);
  }
  function formatHour24(d, p) {
    return pad(d.getHours(), p, 2);
  }
  function formatHour12(d, p) {
    return pad(d.getHours() % 12 || 12, p, 2);
  }
  function formatDayOfYear(d, p) {
    return pad(1 + day_default.count(year_default(d), d), p, 3);
  }
  function formatMilliseconds(d, p) {
    return pad(d.getMilliseconds(), p, 3);
  }
  function formatMicroseconds(d, p) {
    return formatMilliseconds(d, p) + "000";
  }
  function formatMonthNumber(d, p) {
    return pad(d.getMonth() + 1, p, 2);
  }
  function formatMinutes(d, p) {
    return pad(d.getMinutes(), p, 2);
  }
  function formatSeconds(d, p) {
    return pad(d.getSeconds(), p, 2);
  }
  function formatWeekdayNumberMonday(d) {
    var day2 = d.getDay();
    return day2 === 0 ? 7 : day2;
  }
  function formatWeekNumberSunday(d, p) {
    return pad(sunday.count(year_default(d) - 1, d), p, 2);
  }
  function dISO(d) {
    var day2 = d.getDay();
    return day2 >= 4 || day2 === 0 ? thursday(d) : thursday.ceil(d);
  }
  function formatWeekNumberISO(d, p) {
    d = dISO(d);
    return pad(thursday.count(year_default(d), d) + (year_default(d).getDay() === 4), p, 2);
  }
  function formatWeekdayNumberSunday(d) {
    return d.getDay();
  }
  function formatWeekNumberMonday(d, p) {
    return pad(monday.count(year_default(d) - 1, d), p, 2);
  }
  function formatYear(d, p) {
    return pad(d.getFullYear() % 100, p, 2);
  }
  function formatYearISO(d, p) {
    d = dISO(d);
    return pad(d.getFullYear() % 100, p, 2);
  }
  function formatFullYear(d, p) {
    return pad(d.getFullYear() % 1e4, p, 4);
  }
  function formatFullYearISO(d, p) {
    var day2 = d.getDay();
    d = day2 >= 4 || day2 === 0 ? thursday(d) : thursday.ceil(d);
    return pad(d.getFullYear() % 1e4, p, 4);
  }
  function formatZone(d) {
    var z = d.getTimezoneOffset();
    return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
  }
  function formatUTCDayOfMonth(d, p) {
    return pad(d.getUTCDate(), p, 2);
  }
  function formatUTCHour24(d, p) {
    return pad(d.getUTCHours(), p, 2);
  }
  function formatUTCHour12(d, p) {
    return pad(d.getUTCHours() % 12 || 12, p, 2);
  }
  function formatUTCDayOfYear(d, p) {
    return pad(1 + utcDay_default.count(utcYear_default(d), d), p, 3);
  }
  function formatUTCMilliseconds(d, p) {
    return pad(d.getUTCMilliseconds(), p, 3);
  }
  function formatUTCMicroseconds(d, p) {
    return formatUTCMilliseconds(d, p) + "000";
  }
  function formatUTCMonthNumber(d, p) {
    return pad(d.getUTCMonth() + 1, p, 2);
  }
  function formatUTCMinutes(d, p) {
    return pad(d.getUTCMinutes(), p, 2);
  }
  function formatUTCSeconds(d, p) {
    return pad(d.getUTCSeconds(), p, 2);
  }
  function formatUTCWeekdayNumberMonday(d) {
    var dow = d.getUTCDay();
    return dow === 0 ? 7 : dow;
  }
  function formatUTCWeekNumberSunday(d, p) {
    return pad(utcSunday.count(utcYear_default(d) - 1, d), p, 2);
  }
  function UTCdISO(d) {
    var day2 = d.getUTCDay();
    return day2 >= 4 || day2 === 0 ? utcThursday(d) : utcThursday.ceil(d);
  }
  function formatUTCWeekNumberISO(d, p) {
    d = UTCdISO(d);
    return pad(utcThursday.count(utcYear_default(d), d) + (utcYear_default(d).getUTCDay() === 4), p, 2);
  }
  function formatUTCWeekdayNumberSunday(d) {
    return d.getUTCDay();
  }
  function formatUTCWeekNumberMonday(d, p) {
    return pad(utcMonday.count(utcYear_default(d) - 1, d), p, 2);
  }
  function formatUTCYear(d, p) {
    return pad(d.getUTCFullYear() % 100, p, 2);
  }
  function formatUTCYearISO(d, p) {
    d = UTCdISO(d);
    return pad(d.getUTCFullYear() % 100, p, 2);
  }
  function formatUTCFullYear(d, p) {
    return pad(d.getUTCFullYear() % 1e4, p, 4);
  }
  function formatUTCFullYearISO(d, p) {
    var day2 = d.getUTCDay();
    d = day2 >= 4 || day2 === 0 ? utcThursday(d) : utcThursday.ceil(d);
    return pad(d.getUTCFullYear() % 1e4, p, 4);
  }
  function formatUTCZone() {
    return "+0000";
  }
  function formatLiteralPercent() {
    return "%";
  }
  function formatUnixTimestamp(d) {
    return +d;
  }
  function formatUnixTimestampSeconds(d) {
    return Math.floor(+d / 1e3);
  }
  var pads, numberRe, percentRe, requoteRe;
  var init_locale2 = __esm(() => {
    init_src7();
    pads = {"-": "", _: " ", "0": "0"};
    numberRe = /^\s*\d+/;
    percentRe = /^%/;
    requoteRe = /[\\^$*+?|[\]().{}]/g;
  });

  // node_modules/d3-time-format/src/defaultLocale.js
  function defaultLocale2(definition) {
    locale2 = formatLocale(definition);
    timeFormat = locale2.format;
    timeParse = locale2.parse;
    utcFormat = locale2.utcFormat;
    utcParse = locale2.utcParse;
    return locale2;
  }
  var locale2, timeFormat, timeParse, utcFormat, utcParse;
  var init_defaultLocale2 = __esm(() => {
    init_locale2();
    defaultLocale2({
      dateTime: "%x, %X",
      date: "%-m/%-d/%Y",
      time: "%-I:%M:%S %p",
      periods: ["AM", "PM"],
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    });
  });

  // node_modules/d3-time-format/src/index.js
  var init_src8 = __esm(() => {
    init_defaultLocale2();
  });

  // node_modules/d3-scale/src/time.js
  function date(t) {
    return new Date(t);
  }
  function number2(t) {
    return t instanceof Date ? +t : +new Date(+t);
  }
  function calendar(ticks, tickInterval, year2, month2, week, day2, hour2, minute2, second2, format2) {
    var scale = continuous(), invert = scale.invert, domain = scale.domain;
    var formatMillisecond = format2(".%L"), formatSecond = format2(":%S"), formatMinute = format2("%I:%M"), formatHour = format2("%I %p"), formatDay = format2("%a %d"), formatWeek = format2("%b %d"), formatMonth = format2("%B"), formatYear3 = format2("%Y");
    function tickFormat2(date2) {
      return (second2(date2) < date2 ? formatMillisecond : minute2(date2) < date2 ? formatSecond : hour2(date2) < date2 ? formatMinute : day2(date2) < date2 ? formatHour : month2(date2) < date2 ? week(date2) < date2 ? formatDay : formatWeek : year2(date2) < date2 ? formatMonth : formatYear3)(date2);
    }
    scale.invert = function(y2) {
      return new Date(invert(y2));
    };
    scale.domain = function(_) {
      return arguments.length ? domain(Array.from(_, number2)) : domain().map(date);
    };
    scale.ticks = function(interval2) {
      var d = domain();
      return ticks(d[0], d[d.length - 1], interval2 == null ? 10 : interval2);
    };
    scale.tickFormat = function(count2, specifier) {
      return specifier == null ? tickFormat2 : format2(specifier);
    };
    scale.nice = function(interval2) {
      var d = domain();
      if (!interval2 || typeof interval2.range !== "function")
        interval2 = tickInterval(d[0], d[d.length - 1], interval2 == null ? 10 : interval2);
      return interval2 ? domain(nice2(d, interval2)) : scale;
    };
    scale.copy = function() {
      return copy(scale, calendar(ticks, tickInterval, year2, month2, week, day2, hour2, minute2, second2, format2));
    };
    return scale;
  }
  function time() {
    return initRange.apply(calendar(timeTicks, timeTickInterval, year_default, month_default, sunday, day_default, hour_default, minute_default, second_default, timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
  }
  var init_time = __esm(() => {
    init_src7();
    init_src8();
    init_continuous();
    init_init();
    init_nice2();
  });

  // node_modules/d3-scale/src/utcTime.js
  function utcTime() {
    return initRange.apply(calendar(utcTicks, utcTickInterval, utcYear_default, utcMonth_default, utcSunday, utcDay_default, utcHour_default, utcMinute_default, second_default, utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
  }
  var init_utcTime = __esm(() => {
    init_src7();
    init_src8();
    init_time();
    init_init();
  });

  // node_modules/d3-scale/src/sequential.js
  function transformer2() {
    var x07 = 0, x13 = 1, t03, t13, k10, transform, interpolator = identity2, clamp = false, unknown;
    function scale(x2) {
      return x2 == null || isNaN(x2 = +x2) ? unknown : interpolator(k10 === 0 ? 0.5 : (x2 = (transform(x2) - t03) * k10, clamp ? Math.max(0, Math.min(1, x2)) : x2));
    }
    scale.domain = function(_) {
      return arguments.length ? ([x07, x13] = _, t03 = transform(x07 = +x07), t13 = transform(x13 = +x13), k10 = t03 === t13 ? 0 : 1 / (t13 - t03), scale) : [x07, x13];
    };
    scale.clamp = function(_) {
      return arguments.length ? (clamp = !!_, scale) : clamp;
    };
    scale.interpolator = function(_) {
      return arguments.length ? (interpolator = _, scale) : interpolator;
    };
    function range2(interpolate) {
      return function(_) {
        var r0, r1;
        return arguments.length ? ([r0, r1] = _, interpolator = interpolate(r0, r1), scale) : [interpolator(0), interpolator(1)];
      };
    }
    scale.range = range2(value_default);
    scale.rangeRound = range2(round_default);
    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };
    return function(t) {
      transform = t, t03 = t(x07), t13 = t(x13), k10 = t03 === t13 ? 0 : 1 / (t13 - t03);
      return scale;
    };
  }
  function copy2(source, target) {
    return target.domain(source.domain()).interpolator(source.interpolator()).clamp(source.clamp()).unknown(source.unknown());
  }
  function sequential() {
    var scale = linearish(transformer2()(identity2));
    scale.copy = function() {
      return copy2(scale, sequential());
    };
    return initInterpolator.apply(scale, arguments);
  }
  function sequentialLog() {
    var scale = loggish(transformer2()).domain([1, 10]);
    scale.copy = function() {
      return copy2(scale, sequentialLog()).base(scale.base());
    };
    return initInterpolator.apply(scale, arguments);
  }
  function sequentialSymlog() {
    var scale = symlogish(transformer2());
    scale.copy = function() {
      return copy2(scale, sequentialSymlog()).constant(scale.constant());
    };
    return initInterpolator.apply(scale, arguments);
  }
  function sequentialPow() {
    var scale = powish(transformer2());
    scale.copy = function() {
      return copy2(scale, sequentialPow()).exponent(scale.exponent());
    };
    return initInterpolator.apply(scale, arguments);
  }
  function sequentialSqrt() {
    return sequentialPow.apply(null, arguments).exponent(0.5);
  }
  var init_sequential = __esm(() => {
    init_src3();
    init_continuous();
    init_init();
    init_linear();
    init_log();
    init_symlog();
    init_pow();
  });

  // node_modules/d3-scale/src/sequentialQuantile.js
  function sequentialQuantile() {
    var domain = [], interpolator = identity2;
    function scale(x2) {
      if (x2 != null && !isNaN(x2 = +x2))
        return interpolator((bisect_default(domain, x2, 1) - 1) / (domain.length - 1));
    }
    scale.domain = function(_) {
      if (!arguments.length)
        return domain.slice();
      domain = [];
      for (let d of _)
        if (d != null && !isNaN(d = +d))
          domain.push(d);
      domain.sort(ascending_default);
      return scale;
    };
    scale.interpolator = function(_) {
      return arguments.length ? (interpolator = _, scale) : interpolator;
    };
    scale.range = function() {
      return domain.map((d, i) => interpolator(i / (domain.length - 1)));
    };
    scale.quantiles = function(n) {
      return Array.from({length: n + 1}, (_, i) => quantile(domain, i / n));
    };
    scale.copy = function() {
      return sequentialQuantile(interpolator).domain(domain);
    };
    return initInterpolator.apply(scale, arguments);
  }
  var init_sequentialQuantile = __esm(() => {
    init_src5();
    init_continuous();
    init_init();
  });

  // node_modules/d3-scale/src/diverging.js
  function transformer3() {
    var x07 = 0, x13 = 0.5, x2 = 1, s2 = 1, t03, t13, t22, k10, k21, interpolator = identity2, transform, clamp = false, unknown;
    function scale(x3) {
      return isNaN(x3 = +x3) ? unknown : (x3 = 0.5 + ((x3 = +transform(x3)) - t13) * (s2 * x3 < s2 * t13 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x3)) : x3));
    }
    scale.domain = function(_) {
      return arguments.length ? ([x07, x13, x2] = _, t03 = transform(x07 = +x07), t13 = transform(x13 = +x13), t22 = transform(x2 = +x2), k10 = t03 === t13 ? 0 : 0.5 / (t13 - t03), k21 = t13 === t22 ? 0 : 0.5 / (t22 - t13), s2 = t13 < t03 ? -1 : 1, scale) : [x07, x13, x2];
    };
    scale.clamp = function(_) {
      return arguments.length ? (clamp = !!_, scale) : clamp;
    };
    scale.interpolator = function(_) {
      return arguments.length ? (interpolator = _, scale) : interpolator;
    };
    function range2(interpolate) {
      return function(_) {
        var r0, r1, r2;
        return arguments.length ? ([r0, r1, r2] = _, interpolator = piecewise(interpolate, [r0, r1, r2]), scale) : [interpolator(0), interpolator(0.5), interpolator(1)];
      };
    }
    scale.range = range2(value_default);
    scale.rangeRound = range2(round_default);
    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };
    return function(t) {
      transform = t, t03 = t(x07), t13 = t(x13), t22 = t(x2), k10 = t03 === t13 ? 0 : 0.5 / (t13 - t03), k21 = t13 === t22 ? 0 : 0.5 / (t22 - t13), s2 = t13 < t03 ? -1 : 1;
      return scale;
    };
  }
  function diverging() {
    var scale = linearish(transformer3()(identity2));
    scale.copy = function() {
      return copy2(scale, diverging());
    };
    return initInterpolator.apply(scale, arguments);
  }
  function divergingLog() {
    var scale = loggish(transformer3()).domain([0.1, 1, 10]);
    scale.copy = function() {
      return copy2(scale, divergingLog()).base(scale.base());
    };
    return initInterpolator.apply(scale, arguments);
  }
  function divergingSymlog() {
    var scale = symlogish(transformer3());
    scale.copy = function() {
      return copy2(scale, divergingSymlog()).constant(scale.constant());
    };
    return initInterpolator.apply(scale, arguments);
  }
  function divergingPow() {
    var scale = powish(transformer3());
    scale.copy = function() {
      return copy2(scale, divergingPow()).exponent(scale.exponent());
    };
    return initInterpolator.apply(scale, arguments);
  }
  function divergingSqrt() {
    return divergingPow.apply(null, arguments).exponent(0.5);
  }
  var init_diverging = __esm(() => {
    init_src3();
    init_continuous();
    init_init();
    init_linear();
    init_log();
    init_sequential();
    init_symlog();
    init_pow();
  });

  // node_modules/d3-scale/src/index.js
  var src_exports4 = {};
  __export(src_exports4, {
    scaleBand: () => band,
    scaleDiverging: () => diverging,
    scaleDivergingLog: () => divergingLog,
    scaleDivergingPow: () => divergingPow,
    scaleDivergingSqrt: () => divergingSqrt,
    scaleDivergingSymlog: () => divergingSymlog,
    scaleIdentity: () => identity3,
    scaleImplicit: () => implicit,
    scaleLinear: () => linear2,
    scaleLog: () => log,
    scaleOrdinal: () => ordinal,
    scalePoint: () => point,
    scalePow: () => pow,
    scaleQuantile: () => quantile2,
    scaleQuantize: () => quantize,
    scaleRadial: () => radial,
    scaleSequential: () => sequential,
    scaleSequentialLog: () => sequentialLog,
    scaleSequentialPow: () => sequentialPow,
    scaleSequentialQuantile: () => sequentialQuantile,
    scaleSequentialSqrt: () => sequentialSqrt,
    scaleSequentialSymlog: () => sequentialSymlog,
    scaleSqrt: () => sqrt,
    scaleSymlog: () => symlog,
    scaleThreshold: () => threshold,
    scaleTime: () => time,
    scaleUtc: () => utcTime,
    tickFormat: () => tickFormat
  });
  var init_src9 = __esm(() => {
    init_band();
    init_identity3();
    init_linear();
    init_log();
    init_symlog();
    init_ordinal();
    init_pow();
    init_radial();
    init_quantile2();
    init_quantize2();
    init_threshold();
    init_time();
    init_utcTime();
    init_sequential();
    init_sequentialQuantile();
    init_diverging();
    init_tickFormat();
  });

  // node_modules/d3-axis/src/identity.js
  function identity_default3(x2) {
    return x2;
  }
  var init_identity4 = __esm(() => {
  });

  // node_modules/d3-axis/src/axis.js
  function translateX(x2) {
    return "translate(" + x2 + ",0)";
  }
  function translateY(y2) {
    return "translate(0," + y2 + ")";
  }
  function number3(scale) {
    return (d) => +scale(d);
  }
  function center(scale, offset) {
    offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
    if (scale.round())
      offset = Math.round(offset);
    return (d) => +scale(d) + offset;
  }
  function entering() {
    return !this.__axis;
  }
  function axis(orient, scale) {
    var tickArguments = [], tickValues = null, tickFormat2 = null, tickSizeInner = 6, tickSizeOuter = 6, tickPadding = 3, offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5, k3 = orient === top || orient === left ? -1 : 1, x2 = orient === left || orient === right ? "x" : "y", transform = orient === top || orient === bottom ? translateX : translateY;
    function axis2(context) {
      var values = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues, format2 = tickFormat2 == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity_default3 : tickFormat2, spacing = Math.max(tickSizeInner, 0) + tickPadding, range2 = scale.range(), range0 = +range2[0] + offset, range1 = +range2[range2.length - 1] + offset, position = (scale.bandwidth ? center : number3)(scale.copy(), offset), selection2 = context.selection ? context.selection() : context, path2 = selection2.selectAll(".domain").data([null]), tick = selection2.selectAll(".tick").data(values, scale).order(), tickExit = tick.exit(), tickEnter = tick.enter().append("g").attr("class", "tick"), line = tick.select("line"), text = tick.select("text");
      path2 = path2.merge(path2.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor"));
      tick = tick.merge(tickEnter);
      line = line.merge(tickEnter.append("line").attr("stroke", "currentColor").attr(x2 + "2", k3 * tickSizeInner));
      text = text.merge(tickEnter.append("text").attr("fill", "currentColor").attr(x2, k3 * spacing).attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));
      if (context !== selection2) {
        path2 = path2.transition(context);
        tick = tick.transition(context);
        line = line.transition(context);
        text = text.transition(context);
        tickExit = tickExit.transition(context).attr("opacity", epsilon).attr("transform", function(d) {
          return isFinite(d = position(d)) ? transform(d + offset) : this.getAttribute("transform");
        });
        tickEnter.attr("opacity", epsilon).attr("transform", function(d) {
          var p = this.parentNode.__axis;
          return transform((p && isFinite(p = p(d)) ? p : position(d)) + offset);
        });
      }
      tickExit.remove();
      path2.attr("d", orient === left || orient === right ? tickSizeOuter ? "M" + k3 * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k3 * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1 : tickSizeOuter ? "M" + range0 + "," + k3 * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k3 * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1);
      tick.attr("opacity", 1).attr("transform", function(d) {
        return transform(position(d) + offset);
      });
      line.attr(x2 + "2", k3 * tickSizeInner);
      text.attr(x2, k3 * spacing).text(format2);
      selection2.filter(entering).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");
      selection2.each(function() {
        this.__axis = position;
      });
    }
    axis2.scale = function(_) {
      return arguments.length ? (scale = _, axis2) : scale;
    };
    axis2.ticks = function() {
      return tickArguments = Array.from(arguments), axis2;
    };
    axis2.tickArguments = function(_) {
      return arguments.length ? (tickArguments = _ == null ? [] : Array.from(_), axis2) : tickArguments.slice();
    };
    axis2.tickValues = function(_) {
      return arguments.length ? (tickValues = _ == null ? null : Array.from(_), axis2) : tickValues && tickValues.slice();
    };
    axis2.tickFormat = function(_) {
      return arguments.length ? (tickFormat2 = _, axis2) : tickFormat2;
    };
    axis2.tickSize = function(_) {
      return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis2) : tickSizeInner;
    };
    axis2.tickSizeInner = function(_) {
      return arguments.length ? (tickSizeInner = +_, axis2) : tickSizeInner;
    };
    axis2.tickSizeOuter = function(_) {
      return arguments.length ? (tickSizeOuter = +_, axis2) : tickSizeOuter;
    };
    axis2.tickPadding = function(_) {
      return arguments.length ? (tickPadding = +_, axis2) : tickPadding;
    };
    axis2.offset = function(_) {
      return arguments.length ? (offset = +_, axis2) : offset;
    };
    return axis2;
  }
  function axisTop(scale) {
    return axis(top, scale);
  }
  function axisRight(scale) {
    return axis(right, scale);
  }
  function axisBottom(scale) {
    return axis(bottom, scale);
  }
  function axisLeft(scale) {
    return axis(left, scale);
  }
  var top, right, bottom, left, epsilon;
  var init_axis = __esm(() => {
    init_identity4();
    top = 1;
    right = 2;
    bottom = 3;
    left = 4;
    epsilon = 1e-6;
  });

  // node_modules/d3-axis/src/index.js
  var src_exports5 = {};
  __export(src_exports5, {
    axisBottom: () => axisBottom,
    axisLeft: () => axisLeft,
    axisRight: () => axisRight,
    axisTop: () => axisTop
  });
  var init_src10 = __esm(() => {
    init_axis();
  });

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/data-viz/legend.js
  function legend({
    color: color2,
    title,
    tickSize = 6,
    width = 320,
    height = 44 + tickSize,
    marginTop = 18,
    marginRight = 0,
    marginBottom = 16 + tickSize,
    marginLeft = 0,
    ticks = width / 64,
    tickFormat: tickFormat2,
    tickValues,
    titleClass = "title"
  } = {}) {
    if (!color2) {
      console.log("A color (D3 color scale function) is required to create a legend");
      return;
    }
    function ramp(color3, n = 256) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      d3.select(canvas).attr("width", n).attr("height", 1);
      for (let i = 0; i < n; ++i) {
        context.fillStyle = color3(i / (n - 1));
        context.fillRect(i, 0, 1, 1);
      }
      return canvas;
    }
    const svg2 = d3.create("svg").attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height]).style("overflow", "visible").style("display", "block");
    let tickAdjust = (g) => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);
    let x2;
    if (color2.interpolate) {
      const n = Math.min(color2.domain().length, color2.range().length);
      x2 = color2.copy().rangeRound(d3.quantize(d3.interpolate(marginLeft, width - marginRight), n));
      svg2.append("image").attr("x", marginLeft).attr("y", marginTop).attr("width", width - marginLeft - marginRight).attr("height", height - marginTop - marginBottom).attr("preserveAspectRatio", "none").attr("xlink:href", ramp(color2.copy().domain(d3.quantize(d3.interpolate(0, 1), n))).toDataURL());
    } else if (color2.interpolator) {
      x2 = Object.assign(color2.copy().interpolator(d3.interpolateRound(marginLeft, width - marginRight)), {range() {
        return [marginLeft, width - marginRight];
      }});
      svg2.append("image").attr("x", marginLeft).attr("y", marginTop).attr("width", width - marginLeft - marginRight).attr("height", height - marginTop - marginBottom).attr("preserveAspectRatio", "none").attr("xlink:href", ramp(color2.interpolator()).toDataURL());
      if (!x2.ticks) {
        if (tickValues === void 0) {
          const n = Math.round(ticks + 1);
          tickValues = d3.range(n).map((i) => d3.quantile(color2.domain(), i / (n - 1)));
        }
        if (typeof tickFormat2 !== "function") {
          tickFormat2 = d3.format(tickFormat2 === void 0 ? ",f" : tickFormat2);
        }
      }
    } else if (color2.invertExtent) {
      const thresholds = color2.thresholds ? color2.thresholds() : color2.quantiles ? color2.quantiles() : color2.domain();
      const thresholdFormat = tickFormat2 === void 0 ? (d) => d : typeof tickFormat2 === "string" ? d3.format(tickFormat2) : tickFormat2;
      x2 = d3.scaleLinear().domain([-1, color2.range().length - 1]).rangeRound([marginLeft, width - marginRight]);
      svg2.append("g").selectAll("rect").data(color2.range()).join("rect").attr("x", (d, i) => x2(i - 1)).attr("y", marginTop).attr("width", (d, i) => x2(i) - x2(i - 1)).attr("height", height - marginTop - marginBottom).attr("fill", (d) => d);
      tickValues = d3.range(thresholds.length);
      tickFormat2 = (i) => thresholdFormat(thresholds[i], i);
    } else {
      x2 = d3.scaleBand().domain(color2.domain()).rangeRound([marginLeft, width - marginRight]);
      svg2.append("g").selectAll("rect").data(color2.domain()).join("rect").attr("x", x2).attr("y", marginTop).attr("width", Math.max(0, x2.bandwidth() - 1)).attr("height", height - marginTop - marginBottom).attr("fill", color2);
      tickAdjust = () => {
      };
    }
    svg2.append("g").attr("transform", `translate(0,${height - marginBottom})`).call(d3.axisBottom(x2).ticks(ticks, typeof tickFormat2 === "string" ? tickFormat2 : void 0).tickFormat(typeof tickFormat2 === "function" ? tickFormat2 : void 0).tickSize(tickSize).tickValues(tickValues)).call(tickAdjust).call((g) => g.select(".domain").remove()).call((g) => g.append("text").attr("x", marginLeft).attr("y", marginTop + marginBottom - height - 18).attr("fill", "currentColor").attr("text-anchor", "start").attr("class", titleClass).text(title));
    return svg2.node();
  }
  var d3, legend_default;
  var init_legend = __esm(() => {
    d3 = Object.assign({}, (init_src(), src_exports), (init_src3(), src_exports2), (init_src9(), src_exports4), (init_src10(), src_exports5));
    legend_default = legend;
  });

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/data-viz/colorScale.js
  var d32, reds, blues, redAndBlues, missingValueColour, minScore, maxScore, rangeScore, numSteps, step, getLegendColor, getLegend, colorScale_default;
  var init_colorScale = __esm(() => {
    init_legend();
    d32 = Object.assign({}, (init_src9(), src_exports4), (init_src5(), src_exports3));
    reds = [
      "#8a0032",
      "#A50026",
      "#A50026",
      "#D73027",
      "#F46D43",
      "#FDAE61",
      "#FEE090",
      "#FEE090"
    ];
    blues = ["#ABD9E9", "#4575B4", "#313695"];
    redAndBlues = reds.concat(blues);
    missingValueColour = "#9CA3AF";
    minScore = 0;
    maxScore = 100;
    rangeScore = maxScore - minScore;
    numSteps = redAndBlues.length - 1;
    step = rangeScore / numSteps;
    getLegendColor = d32.scaleLinear().domain(d32.range(minScore, maxScore + step, step)).range(redAndBlues).unknown(missingValueColour);
    getLegend = function(titleClass = "title") {
      return legend_default({
        color: getLegendColor,
        title: "Ocean Health Index Score",
        tickSize: 2,
        width: 330,
        height: 50,
        titleClass
      });
    };
    colorScale_default = Object.freeze({getLegend, getLegendColor});
  });

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/data-viz/regionTooltip.js
  function regionTooltip({
    containerSelector = "body",
    displayProperty = "grid",
    circleRadius: circleRadius2 = 15,
    fontSize = 14,
    offsetX = 7,
    offsetY = -15,
    classes = {
      tooltip: "region-tooltip"
    }
  } = {}) {
    const tooltip = d33.select(containerSelector).append("div").attr("class", classes.tooltip);
    hide();
    const tooltipRegionText = tooltip.append("span");
    const tooltipSvg = tooltip.append("svg").attr("preserveAspectRatio", "xMidYMid").attr("height", circleRadius2 * 2).attr("width", circleRadius2 * 2);
    const tooltipScoreCircle = tooltipSvg.append("circle").attr("r", circleRadius2).attr("cx", circleRadius2).attr("cy", circleRadius2);
    const tooltipScoreText = tooltipSvg.append("text").attr("x", circleRadius2).attr("y", circleRadius2).attr("font-size", fontSize).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("fill", "black");
    function update(text, num, color2) {
      const displayNumber = num ? Math.round(num) : "NA";
      tooltipRegionText.text(text);
      tooltipScoreText.text(displayNumber);
      tooltipScoreCircle.attr("fill", color2);
      tooltip.style("display", displayProperty).style("opacity", 1);
    }
    function hide(event, feature2) {
      tooltip.style("opacity", 0).style("display", "none");
    }
    function reposition(x2, y2, addTooltipHeight = false, addHalfTooltipWidth = false) {
      let tooltipDimensions = null;
      if (addTooltipHeight || addHalfTooltipWidth) {
        tooltipDimensions = tooltip.node().getBoundingClientRect();
      }
      if (addTooltipHeight) {
        y2 -= tooltipDimensions.height;
      }
      if (addHalfTooltipWidth) {
        x2 -= tooltipDimensions.width * 0.5;
      }
      tooltip.style("left", x2 + offsetX + "px").style("top", y2 + offsetY + "px");
    }
    return Object.freeze({
      update,
      hide,
      reposition
    });
  }
  var d33, regionTooltip_default;
  var init_regionTooltip = __esm(() => {
    d33 = Object.assign({}, (init_src(), src_exports));
    regionTooltip_default = regionTooltip;
  });

  // node_modules/d3-dispatch/src/dispatch.js
  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t))
        throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch(_);
  }
  function Dispatch(_) {
    this._ = _;
  }
  function parseTypenames2(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0)
        name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t))
        throw new Error("unknown type: " + t);
      return {type: t, name};
    });
  }
  function get(type, name) {
    for (var i = 0, n = type.length, c2; i < n; ++i) {
      if ((c2 = type[i]).name === name) {
        return c2.value;
      }
    }
  }
  function set2(type, name, callback2) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }
    if (callback2 != null)
      type.push({name, value: callback2});
    return type;
  }
  var noop, dispatch_default2;
  var init_dispatch2 = __esm(() => {
    noop = {value: () => {
    }};
    Dispatch.prototype = dispatch.prototype = {
      constructor: Dispatch,
      on: function(typename, callback2) {
        var _ = this._, T = parseTypenames2(typename + "", _), t, i = -1, n = T.length;
        if (arguments.length < 2) {
          while (++i < n)
            if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name)))
              return t;
          return;
        }
        if (callback2 != null && typeof callback2 !== "function")
          throw new Error("invalid callback: " + callback2);
        while (++i < n) {
          if (t = (typename = T[i]).type)
            _[t] = set2(_[t], typename.name, callback2);
          else if (callback2 == null)
            for (t in _)
              _[t] = set2(_[t], typename.name, null);
        }
        return this;
      },
      copy: function() {
        var copy3 = {}, _ = this._;
        for (var t in _)
          copy3[t] = _[t].slice();
        return new Dispatch(copy3);
      },
      call: function(type, that) {
        if ((n = arguments.length - 2) > 0)
          for (var args = new Array(n), i = 0, n, t; i < n; ++i)
            args[i] = arguments[i + 2];
        if (!this._.hasOwnProperty(type))
          throw new Error("unknown type: " + type);
        for (t = this._[type], i = 0, n = t.length; i < n; ++i)
          t[i].value.apply(that, args);
      },
      apply: function(type, that, args) {
        if (!this._.hasOwnProperty(type))
          throw new Error("unknown type: " + type);
        for (var t = this._[type], i = 0, n = t.length; i < n; ++i)
          t[i].value.apply(that, args);
      }
    };
    dispatch_default2 = dispatch;
  });

  // node_modules/d3-dispatch/src/index.js
  var init_src11 = __esm(() => {
    init_dispatch2();
  });

  // node_modules/d3-drag/src/noevent.js
  function nopropagation(event) {
    event.stopImmediatePropagation();
  }
  function noevent_default(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
  var nonpassive, nonpassivecapture;
  var init_noevent = __esm(() => {
    nonpassive = {passive: false};
    nonpassivecapture = {capture: true, passive: false};
  });

  // node_modules/d3-drag/src/nodrag.js
  function nodrag_default(view) {
    var root3 = view.document.documentElement, selection2 = select_default2(view).on("dragstart.drag", noevent_default, nonpassivecapture);
    if ("onselectstart" in root3) {
      selection2.on("selectstart.drag", noevent_default, nonpassivecapture);
    } else {
      root3.__noselect = root3.style.MozUserSelect;
      root3.style.MozUserSelect = "none";
    }
  }
  function yesdrag(view, noclick) {
    var root3 = view.document.documentElement, selection2 = select_default2(view).on("dragstart.drag", null);
    if (noclick) {
      selection2.on("click.drag", noevent_default, nonpassivecapture);
      setTimeout(function() {
        selection2.on("click.drag", null);
      }, 0);
    }
    if ("onselectstart" in root3) {
      selection2.on("selectstart.drag", null);
    } else {
      root3.style.MozUserSelect = root3.__noselect;
      delete root3.__noselect;
    }
  }
  var init_nodrag = __esm(() => {
    init_src();
    init_noevent();
  });

  // node_modules/d3-drag/src/constant.js
  var constant_default4;
  var init_constant5 = __esm(() => {
    constant_default4 = (x2) => () => x2;
  });

  // node_modules/d3-drag/src/event.js
  function DragEvent(type, {
    sourceEvent,
    subject,
    target,
    identifier,
    active,
    x: x2,
    y: y2,
    dx,
    dy,
    dispatch: dispatch2
  }) {
    Object.defineProperties(this, {
      type: {value: type, enumerable: true, configurable: true},
      sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
      subject: {value: subject, enumerable: true, configurable: true},
      target: {value: target, enumerable: true, configurable: true},
      identifier: {value: identifier, enumerable: true, configurable: true},
      active: {value: active, enumerable: true, configurable: true},
      x: {value: x2, enumerable: true, configurable: true},
      y: {value: y2, enumerable: true, configurable: true},
      dx: {value: dx, enumerable: true, configurable: true},
      dy: {value: dy, enumerable: true, configurable: true},
      _: {value: dispatch2}
    });
  }
  var init_event = __esm(() => {
    DragEvent.prototype.on = function() {
      var value = this._.on.apply(this._, arguments);
      return value === this._ ? this : value;
    };
  });

  // node_modules/d3-drag/src/drag.js
  function defaultFilter(event) {
    return !event.ctrlKey && !event.button;
  }
  function defaultContainer() {
    return this.parentNode;
  }
  function defaultSubject(event, d) {
    return d == null ? {x: event.x, y: event.y} : d;
  }
  function defaultTouchable() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
  }
  function drag_default() {
    var filter3 = defaultFilter, container = defaultContainer, subject = defaultSubject, touchable = defaultTouchable, gestures = {}, listeners = dispatch_default2("start", "drag", "end"), active = 0, mousedownx, mousedowny, mousemoving, touchending, clickDistance2 = 0;
    function drag(selection2) {
      selection2.on("mousedown.drag", mousedowned).filter(touchable).on("touchstart.drag", touchstarted).on("touchmove.drag", touchmoved, nonpassive).on("touchend.drag touchcancel.drag", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }
    function mousedowned(event, d) {
      if (touchending || !filter3.call(this, event, d))
        return;
      var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
      if (!gesture)
        return;
      select_default2(event.view).on("mousemove.drag", mousemoved, nonpassivecapture).on("mouseup.drag", mouseupped, nonpassivecapture);
      nodrag_default(event.view);
      nopropagation(event);
      mousemoving = false;
      mousedownx = event.clientX;
      mousedowny = event.clientY;
      gesture("start", event);
    }
    function mousemoved(event) {
      noevent_default(event);
      if (!mousemoving) {
        var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
        mousemoving = dx * dx + dy * dy > clickDistance2;
      }
      gestures.mouse("drag", event);
    }
    function mouseupped(event) {
      select_default2(event.view).on("mousemove.drag mouseup.drag", null);
      yesdrag(event.view, mousemoving);
      noevent_default(event);
      gestures.mouse("end", event);
    }
    function touchstarted(event, d) {
      if (!filter3.call(this, event, d))
        return;
      var touches = event.changedTouches, c2 = container.call(this, event, d), n = touches.length, i, gesture;
      for (i = 0; i < n; ++i) {
        if (gesture = beforestart(this, c2, event, d, touches[i].identifier, touches[i])) {
          nopropagation(event);
          gesture("start", event, touches[i]);
        }
      }
    }
    function touchmoved(event) {
      var touches = event.changedTouches, n = touches.length, i, gesture;
      for (i = 0; i < n; ++i) {
        if (gesture = gestures[touches[i].identifier]) {
          noevent_default(event);
          gesture("drag", event, touches[i]);
        }
      }
    }
    function touchended(event) {
      var touches = event.changedTouches, n = touches.length, i, gesture;
      if (touchending)
        clearTimeout(touchending);
      touchending = setTimeout(function() {
        touchending = null;
      }, 500);
      for (i = 0; i < n; ++i) {
        if (gesture = gestures[touches[i].identifier]) {
          nopropagation(event);
          gesture("end", event, touches[i]);
        }
      }
    }
    function beforestart(that, container2, event, d, identifier, touch) {
      var dispatch2 = listeners.copy(), p = pointer_default(touch || event, container2), dx, dy, s2;
      if ((s2 = subject.call(that, new DragEvent("beforestart", {
        sourceEvent: event,
        target: drag,
        identifier,
        active,
        x: p[0],
        y: p[1],
        dx: 0,
        dy: 0,
        dispatch: dispatch2
      }), d)) == null)
        return;
      dx = s2.x - p[0] || 0;
      dy = s2.y - p[1] || 0;
      return function gesture(type, event2, touch2) {
        var p02 = p, n;
        switch (type) {
          case "start":
            gestures[identifier] = gesture, n = active++;
            break;
          case "end":
            delete gestures[identifier], --active;
          case "drag":
            p = pointer_default(touch2 || event2, container2), n = active;
            break;
        }
        dispatch2.call(type, that, new DragEvent(type, {
          sourceEvent: event2,
          subject: s2,
          target: drag,
          identifier,
          active: n,
          x: p[0] + dx,
          y: p[1] + dy,
          dx: p[0] - p02[0],
          dy: p[1] - p02[1],
          dispatch: dispatch2
        }), d);
      };
    }
    drag.filter = function(_) {
      return arguments.length ? (filter3 = typeof _ === "function" ? _ : constant_default4(!!_), drag) : filter3;
    };
    drag.container = function(_) {
      return arguments.length ? (container = typeof _ === "function" ? _ : constant_default4(_), drag) : container;
    };
    drag.subject = function(_) {
      return arguments.length ? (subject = typeof _ === "function" ? _ : constant_default4(_), drag) : subject;
    };
    drag.touchable = function(_) {
      return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default4(!!_), drag) : touchable;
    };
    drag.on = function() {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? drag : value;
    };
    drag.clickDistance = function(_) {
      return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
    };
    return drag;
  }
  var init_drag = __esm(() => {
    init_src11();
    init_src();
    init_nodrag();
    init_noevent();
    init_constant5();
    init_event();
  });

  // node_modules/d3-drag/src/index.js
  var src_exports6 = {};
  __export(src_exports6, {
    drag: () => drag_default,
    dragDisable: () => nodrag_default,
    dragEnable: () => yesdrag
  });
  var init_src12 = __esm(() => {
    init_drag();
    init_nodrag();
  });

  // node_modules/d3-geo/src/math.js
  function acos(x2) {
    return x2 > 1 ? 0 : x2 < -1 ? pi : Math.acos(x2);
  }
  function asin(x2) {
    return x2 > 1 ? halfPi : x2 < -1 ? -halfPi : Math.asin(x2);
  }
  function haversin(x2) {
    return (x2 = sin(x2 / 2)) * x2;
  }
  var epsilon3, epsilon22, pi, halfPi, quarterPi, tau, degrees3, radians2, abs, atan, atan2, cos, ceil, exp, hypot, log2, pow2, sin, sign, sqrt2, tan;
  var init_math2 = __esm(() => {
    epsilon3 = 1e-6;
    epsilon22 = 1e-12;
    pi = Math.PI;
    halfPi = pi / 2;
    quarterPi = pi / 4;
    tau = pi * 2;
    degrees3 = 180 / pi;
    radians2 = pi / 180;
    abs = Math.abs;
    atan = Math.atan;
    atan2 = Math.atan2;
    cos = Math.cos;
    ceil = Math.ceil;
    exp = Math.exp;
    hypot = Math.hypot;
    log2 = Math.log;
    pow2 = Math.pow;
    sin = Math.sin;
    sign = Math.sign || function(x2) {
      return x2 > 0 ? 1 : x2 < 0 ? -1 : 0;
    };
    sqrt2 = Math.sqrt;
    tan = Math.tan;
  });

  // node_modules/d3-geo/src/noop.js
  function noop2() {
  }
  var init_noop = __esm(() => {
  });

  // node_modules/d3-geo/src/stream.js
  function streamGeometry(geometry, stream) {
    if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
      streamGeometryType[geometry.type](geometry, stream);
    }
  }
  function streamLine(coordinates2, stream, closed) {
    var i = -1, n = coordinates2.length - closed, coordinate;
    stream.lineStart();
    while (++i < n)
      coordinate = coordinates2[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
    stream.lineEnd();
  }
  function streamPolygon(coordinates2, stream) {
    var i = -1, n = coordinates2.length;
    stream.polygonStart();
    while (++i < n)
      streamLine(coordinates2[i], stream, 1);
    stream.polygonEnd();
  }
  function stream_default(object3, stream) {
    if (object3 && streamObjectType.hasOwnProperty(object3.type)) {
      streamObjectType[object3.type](object3, stream);
    } else {
      streamGeometry(object3, stream);
    }
  }
  var streamObjectType, streamGeometryType;
  var init_stream = __esm(() => {
    streamObjectType = {
      Feature: function(object3, stream) {
        streamGeometry(object3.geometry, stream);
      },
      FeatureCollection: function(object3, stream) {
        var features = object3.features, i = -1, n = features.length;
        while (++i < n)
          streamGeometry(features[i].geometry, stream);
      }
    };
    streamGeometryType = {
      Sphere: function(object3, stream) {
        stream.sphere();
      },
      Point: function(object3, stream) {
        object3 = object3.coordinates;
        stream.point(object3[0], object3[1], object3[2]);
      },
      MultiPoint: function(object3, stream) {
        var coordinates2 = object3.coordinates, i = -1, n = coordinates2.length;
        while (++i < n)
          object3 = coordinates2[i], stream.point(object3[0], object3[1], object3[2]);
      },
      LineString: function(object3, stream) {
        streamLine(object3.coordinates, stream, 0);
      },
      MultiLineString: function(object3, stream) {
        var coordinates2 = object3.coordinates, i = -1, n = coordinates2.length;
        while (++i < n)
          streamLine(coordinates2[i], stream, 0);
      },
      Polygon: function(object3, stream) {
        streamPolygon(object3.coordinates, stream);
      },
      MultiPolygon: function(object3, stream) {
        var coordinates2 = object3.coordinates, i = -1, n = coordinates2.length;
        while (++i < n)
          streamPolygon(coordinates2[i], stream);
      },
      GeometryCollection: function(object3, stream) {
        var geometries = object3.geometries, i = -1, n = geometries.length;
        while (++i < n)
          streamGeometry(geometries[i], stream);
      }
    };
  });

  // node_modules/d3-geo/src/area.js
  function areaRingStart() {
    areaStream.point = areaPointFirst;
  }
  function areaRingEnd() {
    areaPoint(lambda00, phi00);
  }
  function areaPointFirst(lambda, phi) {
    areaStream.point = areaPoint;
    lambda00 = lambda, phi00 = phi;
    lambda *= radians2, phi *= radians2;
    lambda0 = lambda, cosPhi0 = cos(phi = phi / 2 + quarterPi), sinPhi0 = sin(phi);
  }
  function areaPoint(lambda, phi) {
    lambda *= radians2, phi *= radians2;
    phi = phi / 2 + quarterPi;
    var dLambda = lambda - lambda0, sdLambda = dLambda >= 0 ? 1 : -1, adLambda = sdLambda * dLambda, cosPhi = cos(phi), sinPhi = sin(phi), k3 = sinPhi0 * sinPhi, u = cosPhi0 * cosPhi + k3 * cos(adLambda), v = k3 * sdLambda * sin(adLambda);
    areaRingSum.add(atan2(v, u));
    lambda0 = lambda, cosPhi0 = cosPhi, sinPhi0 = sinPhi;
  }
  function area_default(object3) {
    areaSum = new Adder();
    stream_default(object3, areaStream);
    return areaSum * 2;
  }
  var areaRingSum, areaSum, lambda00, phi00, lambda0, cosPhi0, sinPhi0, areaStream;
  var init_area = __esm(() => {
    init_src5();
    init_math2();
    init_noop();
    init_stream();
    areaRingSum = new Adder();
    areaSum = new Adder();
    areaStream = {
      point: noop2,
      lineStart: noop2,
      lineEnd: noop2,
      polygonStart: function() {
        areaRingSum = new Adder();
        areaStream.lineStart = areaRingStart;
        areaStream.lineEnd = areaRingEnd;
      },
      polygonEnd: function() {
        var areaRing = +areaRingSum;
        areaSum.add(areaRing < 0 ? tau + areaRing : areaRing);
        this.lineStart = this.lineEnd = this.point = noop2;
      },
      sphere: function() {
        areaSum.add(tau);
      }
    };
  });

  // node_modules/d3-geo/src/cartesian.js
  function spherical(cartesian3) {
    return [atan2(cartesian3[1], cartesian3[0]), asin(cartesian3[2])];
  }
  function cartesian(spherical3) {
    var lambda = spherical3[0], phi = spherical3[1], cosPhi = cos(phi);
    return [cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi)];
  }
  function cartesianDot(a2, b) {
    return a2[0] * b[0] + a2[1] * b[1] + a2[2] * b[2];
  }
  function cartesianCross(a2, b) {
    return [a2[1] * b[2] - a2[2] * b[1], a2[2] * b[0] - a2[0] * b[2], a2[0] * b[1] - a2[1] * b[0]];
  }
  function cartesianAddInPlace(a2, b) {
    a2[0] += b[0], a2[1] += b[1], a2[2] += b[2];
  }
  function cartesianScale(vector, k3) {
    return [vector[0] * k3, vector[1] * k3, vector[2] * k3];
  }
  function cartesianNormalizeInPlace(d) {
    var l = sqrt2(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
    d[0] /= l, d[1] /= l, d[2] /= l;
  }
  var init_cartesian = __esm(() => {
    init_math2();
  });

  // node_modules/d3-geo/src/bounds.js
  function boundsPoint(lambda, phi) {
    ranges.push(range = [lambda02 = lambda, lambda1 = lambda]);
    if (phi < phi0)
      phi0 = phi;
    if (phi > phi1)
      phi1 = phi;
  }
  function linePoint(lambda, phi) {
    var p = cartesian([lambda * radians2, phi * radians2]);
    if (p0) {
      var normal = cartesianCross(p0, p), equatorial = [normal[1], -normal[0], 0], inflection = cartesianCross(equatorial, normal);
      cartesianNormalizeInPlace(inflection);
      inflection = spherical(inflection);
      var delta = lambda - lambda2, sign4 = delta > 0 ? 1 : -1, lambdai = inflection[0] * degrees3 * sign4, phii, antimeridian = abs(delta) > 180;
      if (antimeridian ^ (sign4 * lambda2 < lambdai && lambdai < sign4 * lambda)) {
        phii = inflection[1] * degrees3;
        if (phii > phi1)
          phi1 = phii;
      } else if (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (sign4 * lambda2 < lambdai && lambdai < sign4 * lambda)) {
        phii = -inflection[1] * degrees3;
        if (phii < phi0)
          phi0 = phii;
      } else {
        if (phi < phi0)
          phi0 = phi;
        if (phi > phi1)
          phi1 = phi;
      }
      if (antimeridian) {
        if (lambda < lambda2) {
          if (angle(lambda02, lambda) > angle(lambda02, lambda1))
            lambda1 = lambda;
        } else {
          if (angle(lambda, lambda1) > angle(lambda02, lambda1))
            lambda02 = lambda;
        }
      } else {
        if (lambda1 >= lambda02) {
          if (lambda < lambda02)
            lambda02 = lambda;
          if (lambda > lambda1)
            lambda1 = lambda;
        } else {
          if (lambda > lambda2) {
            if (angle(lambda02, lambda) > angle(lambda02, lambda1))
              lambda1 = lambda;
          } else {
            if (angle(lambda, lambda1) > angle(lambda02, lambda1))
              lambda02 = lambda;
          }
        }
      }
    } else {
      ranges.push(range = [lambda02 = lambda, lambda1 = lambda]);
    }
    if (phi < phi0)
      phi0 = phi;
    if (phi > phi1)
      phi1 = phi;
    p0 = p, lambda2 = lambda;
  }
  function boundsLineStart() {
    boundsStream.point = linePoint;
  }
  function boundsLineEnd() {
    range[0] = lambda02, range[1] = lambda1;
    boundsStream.point = boundsPoint;
    p0 = null;
  }
  function boundsRingPoint(lambda, phi) {
    if (p0) {
      var delta = lambda - lambda2;
      deltaSum.add(abs(delta) > 180 ? delta + (delta > 0 ? 360 : -360) : delta);
    } else {
      lambda002 = lambda, phi002 = phi;
    }
    areaStream.point(lambda, phi);
    linePoint(lambda, phi);
  }
  function boundsRingStart() {
    areaStream.lineStart();
  }
  function boundsRingEnd() {
    boundsRingPoint(lambda002, phi002);
    areaStream.lineEnd();
    if (abs(deltaSum) > epsilon3)
      lambda02 = -(lambda1 = 180);
    range[0] = lambda02, range[1] = lambda1;
    p0 = null;
  }
  function angle(lambda04, lambda12) {
    return (lambda12 -= lambda04) < 0 ? lambda12 + 360 : lambda12;
  }
  function rangeCompare(a2, b) {
    return a2[0] - b[0];
  }
  function rangeContains(range2, x2) {
    return range2[0] <= range2[1] ? range2[0] <= x2 && x2 <= range2[1] : x2 < range2[0] || range2[1] < x2;
  }
  function bounds_default(feature2) {
    var i, n, a2, b, merged, deltaMax, delta;
    phi1 = lambda1 = -(lambda02 = phi0 = Infinity);
    ranges = [];
    stream_default(feature2, boundsStream);
    if (n = ranges.length) {
      ranges.sort(rangeCompare);
      for (i = 1, a2 = ranges[0], merged = [a2]; i < n; ++i) {
        b = ranges[i];
        if (rangeContains(a2, b[0]) || rangeContains(a2, b[1])) {
          if (angle(a2[0], b[1]) > angle(a2[0], a2[1]))
            a2[1] = b[1];
          if (angle(b[0], a2[1]) > angle(a2[0], a2[1]))
            a2[0] = b[0];
        } else {
          merged.push(a2 = b);
        }
      }
      for (deltaMax = -Infinity, n = merged.length - 1, i = 0, a2 = merged[n]; i <= n; a2 = b, ++i) {
        b = merged[i];
        if ((delta = angle(a2[1], b[0])) > deltaMax)
          deltaMax = delta, lambda02 = b[0], lambda1 = a2[1];
      }
    }
    ranges = range = null;
    return lambda02 === Infinity || phi0 === Infinity ? [[NaN, NaN], [NaN, NaN]] : [[lambda02, phi0], [lambda1, phi1]];
  }
  var lambda02, phi0, lambda1, phi1, lambda2, lambda002, phi002, p0, deltaSum, ranges, range, boundsStream;
  var init_bounds = __esm(() => {
    init_src5();
    init_area();
    init_cartesian();
    init_math2();
    init_stream();
    boundsStream = {
      point: boundsPoint,
      lineStart: boundsLineStart,
      lineEnd: boundsLineEnd,
      polygonStart: function() {
        boundsStream.point = boundsRingPoint;
        boundsStream.lineStart = boundsRingStart;
        boundsStream.lineEnd = boundsRingEnd;
        deltaSum = new Adder();
        areaStream.polygonStart();
      },
      polygonEnd: function() {
        areaStream.polygonEnd();
        boundsStream.point = boundsPoint;
        boundsStream.lineStart = boundsLineStart;
        boundsStream.lineEnd = boundsLineEnd;
        if (areaRingSum < 0)
          lambda02 = -(lambda1 = 180), phi0 = -(phi1 = 90);
        else if (deltaSum > epsilon3)
          phi1 = 90;
        else if (deltaSum < -epsilon3)
          phi0 = -90;
        range[0] = lambda02, range[1] = lambda1;
      },
      sphere: function() {
        lambda02 = -(lambda1 = 180), phi0 = -(phi1 = 90);
      }
    };
  });

  // node_modules/d3-geo/src/centroid.js
  function centroidPoint(lambda, phi) {
    lambda *= radians2, phi *= radians2;
    var cosPhi = cos(phi);
    centroidPointCartesian(cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi));
  }
  function centroidPointCartesian(x2, y2, z) {
    ++W0;
    X0 += (x2 - X0) / W0;
    Y0 += (y2 - Y0) / W0;
    Z0 += (z - Z0) / W0;
  }
  function centroidLineStart() {
    centroidStream.point = centroidLinePointFirst;
  }
  function centroidLinePointFirst(lambda, phi) {
    lambda *= radians2, phi *= radians2;
    var cosPhi = cos(phi);
    x0 = cosPhi * cos(lambda);
    y0 = cosPhi * sin(lambda);
    z0 = sin(phi);
    centroidStream.point = centroidLinePoint;
    centroidPointCartesian(x0, y0, z0);
  }
  function centroidLinePoint(lambda, phi) {
    lambda *= radians2, phi *= radians2;
    var cosPhi = cos(phi), x2 = cosPhi * cos(lambda), y2 = cosPhi * sin(lambda), z = sin(phi), w2 = atan2(sqrt2((w2 = y0 * z - z0 * y2) * w2 + (w2 = z0 * x2 - x0 * z) * w2 + (w2 = x0 * y2 - y0 * x2) * w2), x0 * x2 + y0 * y2 + z0 * z);
    W1 += w2;
    X1 += w2 * (x0 + (x0 = x2));
    Y1 += w2 * (y0 + (y0 = y2));
    Z1 += w2 * (z0 + (z0 = z));
    centroidPointCartesian(x0, y0, z0);
  }
  function centroidLineEnd() {
    centroidStream.point = centroidPoint;
  }
  function centroidRingStart() {
    centroidStream.point = centroidRingPointFirst;
  }
  function centroidRingEnd() {
    centroidRingPoint(lambda003, phi003);
    centroidStream.point = centroidPoint;
  }
  function centroidRingPointFirst(lambda, phi) {
    lambda003 = lambda, phi003 = phi;
    lambda *= radians2, phi *= radians2;
    centroidStream.point = centroidRingPoint;
    var cosPhi = cos(phi);
    x0 = cosPhi * cos(lambda);
    y0 = cosPhi * sin(lambda);
    z0 = sin(phi);
    centroidPointCartesian(x0, y0, z0);
  }
  function centroidRingPoint(lambda, phi) {
    lambda *= radians2, phi *= radians2;
    var cosPhi = cos(phi), x2 = cosPhi * cos(lambda), y2 = cosPhi * sin(lambda), z = sin(phi), cx = y0 * z - z0 * y2, cy = z0 * x2 - x0 * z, cz = x0 * y2 - y0 * x2, m = hypot(cx, cy, cz), w2 = asin(m), v = m && -w2 / m;
    X2.add(v * cx);
    Y2.add(v * cy);
    Z2.add(v * cz);
    W1 += w2;
    X1 += w2 * (x0 + (x0 = x2));
    Y1 += w2 * (y0 + (y0 = y2));
    Z1 += w2 * (z0 + (z0 = z));
    centroidPointCartesian(x0, y0, z0);
  }
  function centroid_default(object3) {
    W0 = W1 = X0 = Y0 = Z0 = X1 = Y1 = Z1 = 0;
    X2 = new Adder();
    Y2 = new Adder();
    Z2 = new Adder();
    stream_default(object3, centroidStream);
    var x2 = +X2, y2 = +Y2, z = +Z2, m = hypot(x2, y2, z);
    if (m < epsilon22) {
      x2 = X1, y2 = Y1, z = Z1;
      if (W1 < epsilon3)
        x2 = X0, y2 = Y0, z = Z0;
      m = hypot(x2, y2, z);
      if (m < epsilon22)
        return [NaN, NaN];
    }
    return [atan2(y2, x2) * degrees3, asin(z / m) * degrees3];
  }
  var W0, W1, X0, Y0, Z0, X1, Y1, Z1, X2, Y2, Z2, lambda003, phi003, x0, y0, z0, centroidStream;
  var init_centroid = __esm(() => {
    init_src5();
    init_math2();
    init_noop();
    init_stream();
    centroidStream = {
      sphere: noop2,
      point: centroidPoint,
      lineStart: centroidLineStart,
      lineEnd: centroidLineEnd,
      polygonStart: function() {
        centroidStream.lineStart = centroidRingStart;
        centroidStream.lineEnd = centroidRingEnd;
      },
      polygonEnd: function() {
        centroidStream.lineStart = centroidLineStart;
        centroidStream.lineEnd = centroidLineEnd;
      }
    };
  });

  // node_modules/d3-geo/src/constant.js
  function constant_default5(x2) {
    return function() {
      return x2;
    };
  }
  var init_constant6 = __esm(() => {
  });

  // node_modules/d3-geo/src/compose.js
  function compose_default(a2, b) {
    function compose(x2, y2) {
      return x2 = a2(x2, y2), b(x2[0], x2[1]);
    }
    if (a2.invert && b.invert)
      compose.invert = function(x2, y2) {
        return x2 = b.invert(x2, y2), x2 && a2.invert(x2[0], x2[1]);
      };
    return compose;
  }
  var init_compose = __esm(() => {
  });

  // node_modules/d3-geo/src/rotation.js
  function rotationIdentity(lambda, phi) {
    return [abs(lambda) > pi ? lambda + Math.round(-lambda / tau) * tau : lambda, phi];
  }
  function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
    return (deltaLambda %= tau) ? deltaPhi || deltaGamma ? compose_default(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma)) : rotationLambda(deltaLambda) : deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma) : rotationIdentity;
  }
  function forwardRotationLambda(deltaLambda) {
    return function(lambda, phi) {
      return lambda += deltaLambda, [lambda > pi ? lambda - tau : lambda < -pi ? lambda + tau : lambda, phi];
    };
  }
  function rotationLambda(deltaLambda) {
    var rotation = forwardRotationLambda(deltaLambda);
    rotation.invert = forwardRotationLambda(-deltaLambda);
    return rotation;
  }
  function rotationPhiGamma(deltaPhi, deltaGamma) {
    var cosDeltaPhi = cos(deltaPhi), sinDeltaPhi = sin(deltaPhi), cosDeltaGamma = cos(deltaGamma), sinDeltaGamma = sin(deltaGamma);
    function rotation(lambda, phi) {
      var cosPhi = cos(phi), x2 = cos(lambda) * cosPhi, y2 = sin(lambda) * cosPhi, z = sin(phi), k3 = z * cosDeltaPhi + x2 * sinDeltaPhi;
      return [
        atan2(y2 * cosDeltaGamma - k3 * sinDeltaGamma, x2 * cosDeltaPhi - z * sinDeltaPhi),
        asin(k3 * cosDeltaGamma + y2 * sinDeltaGamma)
      ];
    }
    rotation.invert = function(lambda, phi) {
      var cosPhi = cos(phi), x2 = cos(lambda) * cosPhi, y2 = sin(lambda) * cosPhi, z = sin(phi), k3 = z * cosDeltaGamma - y2 * sinDeltaGamma;
      return [
        atan2(y2 * cosDeltaGamma + z * sinDeltaGamma, x2 * cosDeltaPhi + k3 * sinDeltaPhi),
        asin(k3 * cosDeltaPhi - x2 * sinDeltaPhi)
      ];
    };
    return rotation;
  }
  function rotation_default(rotate) {
    rotate = rotateRadians(rotate[0] * radians2, rotate[1] * radians2, rotate.length > 2 ? rotate[2] * radians2 : 0);
    function forward(coordinates2) {
      coordinates2 = rotate(coordinates2[0] * radians2, coordinates2[1] * radians2);
      return coordinates2[0] *= degrees3, coordinates2[1] *= degrees3, coordinates2;
    }
    forward.invert = function(coordinates2) {
      coordinates2 = rotate.invert(coordinates2[0] * radians2, coordinates2[1] * radians2);
      return coordinates2[0] *= degrees3, coordinates2[1] *= degrees3, coordinates2;
    };
    return forward;
  }
  var init_rotation = __esm(() => {
    init_compose();
    init_math2();
    rotationIdentity.invert = rotationIdentity;
  });

  // node_modules/d3-geo/src/circle.js
  function circleStream(stream, radius, delta, direction, t03, t13) {
    if (!delta)
      return;
    var cosRadius = cos(radius), sinRadius = sin(radius), step2 = direction * delta;
    if (t03 == null) {
      t03 = radius + direction * tau;
      t13 = radius - step2 / 2;
    } else {
      t03 = circleRadius(cosRadius, t03);
      t13 = circleRadius(cosRadius, t13);
      if (direction > 0 ? t03 < t13 : t03 > t13)
        t03 += direction * tau;
    }
    for (var point6, t = t03; direction > 0 ? t > t13 : t < t13; t -= step2) {
      point6 = spherical([cosRadius, -sinRadius * cos(t), -sinRadius * sin(t)]);
      stream.point(point6[0], point6[1]);
    }
  }
  function circleRadius(cosRadius, point6) {
    point6 = cartesian(point6), point6[0] -= cosRadius;
    cartesianNormalizeInPlace(point6);
    var radius = acos(-point6[1]);
    return ((-point6[2] < 0 ? -radius : radius) + tau - epsilon3) % tau;
  }
  function circle_default() {
    var center2 = constant_default5([0, 0]), radius = constant_default5(90), precision = constant_default5(6), ring, rotate, stream = {point: point6};
    function point6(x2, y2) {
      ring.push(x2 = rotate(x2, y2));
      x2[0] *= degrees3, x2[1] *= degrees3;
    }
    function circle2() {
      var c2 = center2.apply(this, arguments), r = radius.apply(this, arguments) * radians2, p = precision.apply(this, arguments) * radians2;
      ring = [];
      rotate = rotateRadians(-c2[0] * radians2, -c2[1] * radians2, 0).invert;
      circleStream(stream, r, p, 1);
      c2 = {type: "Polygon", coordinates: [ring]};
      ring = rotate = null;
      return c2;
    }
    circle2.center = function(_) {
      return arguments.length ? (center2 = typeof _ === "function" ? _ : constant_default5([+_[0], +_[1]]), circle2) : center2;
    };
    circle2.radius = function(_) {
      return arguments.length ? (radius = typeof _ === "function" ? _ : constant_default5(+_), circle2) : radius;
    };
    circle2.precision = function(_) {
      return arguments.length ? (precision = typeof _ === "function" ? _ : constant_default5(+_), circle2) : precision;
    };
    return circle2;
  }
  var init_circle = __esm(() => {
    init_cartesian();
    init_constant6();
    init_math2();
    init_rotation();
  });

  // node_modules/d3-geo/src/clip/buffer.js
  function buffer_default() {
    var lines2 = [], line;
    return {
      point: function(x2, y2, m) {
        line.push([x2, y2, m]);
      },
      lineStart: function() {
        lines2.push(line = []);
      },
      lineEnd: noop2,
      rejoin: function() {
        if (lines2.length > 1)
          lines2.push(lines2.pop().concat(lines2.shift()));
      },
      result: function() {
        var result = lines2;
        lines2 = [];
        line = null;
        return result;
      }
    };
  }
  var init_buffer = __esm(() => {
    init_noop();
  });

  // node_modules/d3-geo/src/pointEqual.js
  function pointEqual_default(a2, b) {
    return abs(a2[0] - b[0]) < epsilon3 && abs(a2[1] - b[1]) < epsilon3;
  }
  var init_pointEqual = __esm(() => {
    init_math2();
  });

  // node_modules/d3-geo/src/clip/rejoin.js
  function Intersection(point6, points2, other, entry) {
    this.x = point6;
    this.z = points2;
    this.o = other;
    this.e = entry;
    this.v = false;
    this.n = this.p = null;
  }
  function rejoin_default(segments, compareIntersection2, startInside, interpolate, stream) {
    var subject = [], clip = [], i, n;
    segments.forEach(function(segment) {
      if ((n2 = segment.length - 1) <= 0)
        return;
      var n2, p02 = segment[0], p1 = segment[n2], x2;
      if (pointEqual_default(p02, p1)) {
        if (!p02[2] && !p1[2]) {
          stream.lineStart();
          for (i = 0; i < n2; ++i)
            stream.point((p02 = segment[i])[0], p02[1]);
          stream.lineEnd();
          return;
        }
        p1[0] += 2 * epsilon3;
      }
      subject.push(x2 = new Intersection(p02, segment, null, true));
      clip.push(x2.o = new Intersection(p02, null, x2, false));
      subject.push(x2 = new Intersection(p1, segment, null, false));
      clip.push(x2.o = new Intersection(p1, null, x2, true));
    });
    if (!subject.length)
      return;
    clip.sort(compareIntersection2);
    link(subject);
    link(clip);
    for (i = 0, n = clip.length; i < n; ++i) {
      clip[i].e = startInside = !startInside;
    }
    var start2 = subject[0], points2, point6;
    while (1) {
      var current = start2, isSubject = true;
      while (current.v)
        if ((current = current.n) === start2)
          return;
      points2 = current.z;
      stream.lineStart();
      do {
        current.v = current.o.v = true;
        if (current.e) {
          if (isSubject) {
            for (i = 0, n = points2.length; i < n; ++i)
              stream.point((point6 = points2[i])[0], point6[1]);
          } else {
            interpolate(current.x, current.n.x, 1, stream);
          }
          current = current.n;
        } else {
          if (isSubject) {
            points2 = current.p.z;
            for (i = points2.length - 1; i >= 0; --i)
              stream.point((point6 = points2[i])[0], point6[1]);
          } else {
            interpolate(current.x, current.p.x, -1, stream);
          }
          current = current.p;
        }
        current = current.o;
        points2 = current.z;
        isSubject = !isSubject;
      } while (!current.v);
      stream.lineEnd();
    }
  }
  function link(array3) {
    if (!(n = array3.length))
      return;
    var n, i = 0, a2 = array3[0], b;
    while (++i < n) {
      a2.n = b = array3[i];
      b.p = a2;
      a2 = b;
    }
    a2.n = b = array3[0];
    b.p = a2;
  }
  var init_rejoin = __esm(() => {
    init_pointEqual();
    init_math2();
  });

  // node_modules/d3-geo/src/polygonContains.js
  function longitude(point6) {
    return abs(point6[0]) <= pi ? point6[0] : sign(point6[0]) * ((abs(point6[0]) + pi) % tau - pi);
  }
  function polygonContains_default(polygon, point6) {
    var lambda = longitude(point6), phi = point6[1], sinPhi = sin(phi), normal = [sin(lambda), -cos(lambda), 0], angle4 = 0, winding = 0;
    var sum3 = new Adder();
    if (sinPhi === 1)
      phi = halfPi + epsilon3;
    else if (sinPhi === -1)
      phi = -halfPi - epsilon3;
    for (var i = 0, n = polygon.length; i < n; ++i) {
      if (!(m = (ring = polygon[i]).length))
        continue;
      var ring, m, point0 = ring[m - 1], lambda04 = longitude(point0), phi03 = point0[1] / 2 + quarterPi, sinPhi03 = sin(phi03), cosPhi03 = cos(phi03);
      for (var j = 0; j < m; ++j, lambda04 = lambda12, sinPhi03 = sinPhi1, cosPhi03 = cosPhi1, point0 = point1) {
        var point1 = ring[j], lambda12 = longitude(point1), phi12 = point1[1] / 2 + quarterPi, sinPhi1 = sin(phi12), cosPhi1 = cos(phi12), delta = lambda12 - lambda04, sign4 = delta >= 0 ? 1 : -1, absDelta = sign4 * delta, antimeridian = absDelta > pi, k3 = sinPhi03 * sinPhi1;
        sum3.add(atan2(k3 * sign4 * sin(absDelta), cosPhi03 * cosPhi1 + k3 * cos(absDelta)));
        angle4 += antimeridian ? delta + sign4 * tau : delta;
        if (antimeridian ^ lambda04 >= lambda ^ lambda12 >= lambda) {
          var arc = cartesianCross(cartesian(point0), cartesian(point1));
          cartesianNormalizeInPlace(arc);
          var intersection2 = cartesianCross(normal, arc);
          cartesianNormalizeInPlace(intersection2);
          var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection2[2]);
          if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
            winding += antimeridian ^ delta >= 0 ? 1 : -1;
          }
        }
      }
    }
    return (angle4 < -epsilon3 || angle4 < epsilon3 && sum3 < -epsilon22) ^ winding & 1;
  }
  var init_polygonContains = __esm(() => {
    init_src5();
    init_cartesian();
    init_math2();
  });

  // node_modules/d3-geo/src/clip/index.js
  function clip_default(pointVisible, clipLine, interpolate, start2) {
    return function(sink) {
      var line = clipLine(sink), ringBuffer = buffer_default(), ringSink = clipLine(ringBuffer), polygonStarted = false, polygon, segments, ring;
      var clip = {
        point: point6,
        lineStart,
        lineEnd,
        polygonStart: function() {
          clip.point = pointRing;
          clip.lineStart = ringStart;
          clip.lineEnd = ringEnd;
          segments = [];
          polygon = [];
        },
        polygonEnd: function() {
          clip.point = point6;
          clip.lineStart = lineStart;
          clip.lineEnd = lineEnd;
          segments = merge(segments);
          var startInside = polygonContains_default(polygon, start2);
          if (segments.length) {
            if (!polygonStarted)
              sink.polygonStart(), polygonStarted = true;
            rejoin_default(segments, compareIntersection, startInside, interpolate, sink);
          } else if (startInside) {
            if (!polygonStarted)
              sink.polygonStart(), polygonStarted = true;
            sink.lineStart();
            interpolate(null, null, 1, sink);
            sink.lineEnd();
          }
          if (polygonStarted)
            sink.polygonEnd(), polygonStarted = false;
          segments = polygon = null;
        },
        sphere: function() {
          sink.polygonStart();
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
          sink.polygonEnd();
        }
      };
      function point6(lambda, phi) {
        if (pointVisible(lambda, phi))
          sink.point(lambda, phi);
      }
      function pointLine(lambda, phi) {
        line.point(lambda, phi);
      }
      function lineStart() {
        clip.point = pointLine;
        line.lineStart();
      }
      function lineEnd() {
        clip.point = point6;
        line.lineEnd();
      }
      function pointRing(lambda, phi) {
        ring.push([lambda, phi]);
        ringSink.point(lambda, phi);
      }
      function ringStart() {
        ringSink.lineStart();
        ring = [];
      }
      function ringEnd() {
        pointRing(ring[0][0], ring[0][1]);
        ringSink.lineEnd();
        var clean = ringSink.clean(), ringSegments = ringBuffer.result(), i, n = ringSegments.length, m, segment, point7;
        ring.pop();
        polygon.push(ring);
        ring = null;
        if (!n)
          return;
        if (clean & 1) {
          segment = ringSegments[0];
          if ((m = segment.length - 1) > 0) {
            if (!polygonStarted)
              sink.polygonStart(), polygonStarted = true;
            sink.lineStart();
            for (i = 0; i < m; ++i)
              sink.point((point7 = segment[i])[0], point7[1]);
            sink.lineEnd();
          }
          return;
        }
        if (n > 1 && clean & 2)
          ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
        segments.push(ringSegments.filter(validSegment));
      }
      return clip;
    };
  }
  function validSegment(segment) {
    return segment.length > 1;
  }
  function compareIntersection(a2, b) {
    return ((a2 = a2.x)[0] < 0 ? a2[1] - halfPi - epsilon3 : halfPi - a2[1]) - ((b = b.x)[0] < 0 ? b[1] - halfPi - epsilon3 : halfPi - b[1]);
  }
  var init_clip = __esm(() => {
    init_buffer();
    init_rejoin();
    init_math2();
    init_polygonContains();
    init_src5();
  });

  // node_modules/d3-geo/src/clip/antimeridian.js
  function clipAntimeridianLine(stream) {
    var lambda04 = NaN, phi03 = NaN, sign0 = NaN, clean;
    return {
      lineStart: function() {
        stream.lineStart();
        clean = 1;
      },
      point: function(lambda12, phi12) {
        var sign1 = lambda12 > 0 ? pi : -pi, delta = abs(lambda12 - lambda04);
        if (abs(delta - pi) < epsilon3) {
          stream.point(lambda04, phi03 = (phi03 + phi12) / 2 > 0 ? halfPi : -halfPi);
          stream.point(sign0, phi03);
          stream.lineEnd();
          stream.lineStart();
          stream.point(sign1, phi03);
          stream.point(lambda12, phi03);
          clean = 0;
        } else if (sign0 !== sign1 && delta >= pi) {
          if (abs(lambda04 - sign0) < epsilon3)
            lambda04 -= sign0 * epsilon3;
          if (abs(lambda12 - sign1) < epsilon3)
            lambda12 -= sign1 * epsilon3;
          phi03 = clipAntimeridianIntersect(lambda04, phi03, lambda12, phi12);
          stream.point(sign0, phi03);
          stream.lineEnd();
          stream.lineStart();
          stream.point(sign1, phi03);
          clean = 0;
        }
        stream.point(lambda04 = lambda12, phi03 = phi12);
        sign0 = sign1;
      },
      lineEnd: function() {
        stream.lineEnd();
        lambda04 = phi03 = NaN;
      },
      clean: function() {
        return 2 - clean;
      }
    };
  }
  function clipAntimeridianIntersect(lambda04, phi03, lambda12, phi12) {
    var cosPhi03, cosPhi1, sinLambda0Lambda1 = sin(lambda04 - lambda12);
    return abs(sinLambda0Lambda1) > epsilon3 ? atan((sin(phi03) * (cosPhi1 = cos(phi12)) * sin(lambda12) - sin(phi12) * (cosPhi03 = cos(phi03)) * sin(lambda04)) / (cosPhi03 * cosPhi1 * sinLambda0Lambda1)) : (phi03 + phi12) / 2;
  }
  function clipAntimeridianInterpolate(from, to, direction, stream) {
    var phi;
    if (from == null) {
      phi = direction * halfPi;
      stream.point(-pi, phi);
      stream.point(0, phi);
      stream.point(pi, phi);
      stream.point(pi, 0);
      stream.point(pi, -phi);
      stream.point(0, -phi);
      stream.point(-pi, -phi);
      stream.point(-pi, 0);
      stream.point(-pi, phi);
    } else if (abs(from[0] - to[0]) > epsilon3) {
      var lambda = from[0] < to[0] ? pi : -pi;
      phi = direction * lambda / 2;
      stream.point(-lambda, phi);
      stream.point(0, phi);
      stream.point(lambda, phi);
    } else {
      stream.point(to[0], to[1]);
    }
  }
  var antimeridian_default;
  var init_antimeridian = __esm(() => {
    init_clip();
    init_math2();
    antimeridian_default = clip_default(function() {
      return true;
    }, clipAntimeridianLine, clipAntimeridianInterpolate, [-pi, -halfPi]);
  });

  // node_modules/d3-geo/src/clip/circle.js
  function circle_default2(radius) {
    var cr = cos(radius), delta = 6 * radians2, smallRadius = cr > 0, notHemisphere = abs(cr) > epsilon3;
    function interpolate(from, to, direction, stream) {
      circleStream(stream, radius, delta, direction, from, to);
    }
    function visible(lambda, phi) {
      return cos(lambda) * cos(phi) > cr;
    }
    function clipLine(stream) {
      var point0, c0, v0, v00, clean;
      return {
        lineStart: function() {
          v00 = v0 = false;
          clean = 1;
        },
        point: function(lambda, phi) {
          var point1 = [lambda, phi], point22, v = visible(lambda, phi), c2 = smallRadius ? v ? 0 : code(lambda, phi) : v ? code(lambda + (lambda < 0 ? pi : -pi), phi) : 0;
          if (!point0 && (v00 = v0 = v))
            stream.lineStart();
          if (v !== v0) {
            point22 = intersect2(point0, point1);
            if (!point22 || pointEqual_default(point0, point22) || pointEqual_default(point1, point22))
              point1[2] = 1;
          }
          if (v !== v0) {
            clean = 0;
            if (v) {
              stream.lineStart();
              point22 = intersect2(point1, point0);
              stream.point(point22[0], point22[1]);
            } else {
              point22 = intersect2(point0, point1);
              stream.point(point22[0], point22[1], 2);
              stream.lineEnd();
            }
            point0 = point22;
          } else if (notHemisphere && point0 && smallRadius ^ v) {
            var t;
            if (!(c2 & c0) && (t = intersect2(point1, point0, true))) {
              clean = 0;
              if (smallRadius) {
                stream.lineStart();
                stream.point(t[0][0], t[0][1]);
                stream.point(t[1][0], t[1][1]);
                stream.lineEnd();
              } else {
                stream.point(t[1][0], t[1][1]);
                stream.lineEnd();
                stream.lineStart();
                stream.point(t[0][0], t[0][1], 3);
              }
            }
          }
          if (v && (!point0 || !pointEqual_default(point0, point1))) {
            stream.point(point1[0], point1[1]);
          }
          point0 = point1, v0 = v, c0 = c2;
        },
        lineEnd: function() {
          if (v0)
            stream.lineEnd();
          point0 = null;
        },
        clean: function() {
          return clean | (v00 && v0) << 1;
        }
      };
    }
    function intersect2(a2, b, two) {
      var pa = cartesian(a2), pb = cartesian(b);
      var n1 = [1, 0, 0], n2 = cartesianCross(pa, pb), n2n2 = cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
      if (!determinant)
        return !two && a2;
      var c1 = cr * n2n2 / determinant, c2 = -cr * n1n2 / determinant, n1xn2 = cartesianCross(n1, n2), A6 = cartesianScale(n1, c1), B3 = cartesianScale(n2, c2);
      cartesianAddInPlace(A6, B3);
      var u = n1xn2, w2 = cartesianDot(A6, u), uu = cartesianDot(u, u), t22 = w2 * w2 - uu * (cartesianDot(A6, A6) - 1);
      if (t22 < 0)
        return;
      var t = sqrt2(t22), q = cartesianScale(u, (-w2 - t) / uu);
      cartesianAddInPlace(q, A6);
      q = spherical(q);
      if (!two)
        return q;
      var lambda04 = a2[0], lambda12 = b[0], phi03 = a2[1], phi12 = b[1], z;
      if (lambda12 < lambda04)
        z = lambda04, lambda04 = lambda12, lambda12 = z;
      var delta2 = lambda12 - lambda04, polar = abs(delta2 - pi) < epsilon3, meridian = polar || delta2 < epsilon3;
      if (!polar && phi12 < phi03)
        z = phi03, phi03 = phi12, phi12 = z;
      if (meridian ? polar ? phi03 + phi12 > 0 ^ q[1] < (abs(q[0] - lambda04) < epsilon3 ? phi03 : phi12) : phi03 <= q[1] && q[1] <= phi12 : delta2 > pi ^ (lambda04 <= q[0] && q[0] <= lambda12)) {
        var q1 = cartesianScale(u, (-w2 + t) / uu);
        cartesianAddInPlace(q1, A6);
        return [q, spherical(q1)];
      }
    }
    function code(lambda, phi) {
      var r = smallRadius ? radius : pi - radius, code2 = 0;
      if (lambda < -r)
        code2 |= 1;
      else if (lambda > r)
        code2 |= 2;
      if (phi < -r)
        code2 |= 4;
      else if (phi > r)
        code2 |= 8;
      return code2;
    }
    return clip_default(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-pi, radius - pi]);
  }
  var init_circle2 = __esm(() => {
    init_cartesian();
    init_circle();
    init_math2();
    init_pointEqual();
    init_clip();
  });

  // node_modules/d3-geo/src/clip/line.js
  function line_default(a2, b, x07, y07, x13, y13) {
    var ax = a2[0], ay = a2[1], bx = b[0], by = b[1], t03 = 0, t13 = 1, dx = bx - ax, dy = by - ay, r;
    r = x07 - ax;
    if (!dx && r > 0)
      return;
    r /= dx;
    if (dx < 0) {
      if (r < t03)
        return;
      if (r < t13)
        t13 = r;
    } else if (dx > 0) {
      if (r > t13)
        return;
      if (r > t03)
        t03 = r;
    }
    r = x13 - ax;
    if (!dx && r < 0)
      return;
    r /= dx;
    if (dx < 0) {
      if (r > t13)
        return;
      if (r > t03)
        t03 = r;
    } else if (dx > 0) {
      if (r < t03)
        return;
      if (r < t13)
        t13 = r;
    }
    r = y07 - ay;
    if (!dy && r > 0)
      return;
    r /= dy;
    if (dy < 0) {
      if (r < t03)
        return;
      if (r < t13)
        t13 = r;
    } else if (dy > 0) {
      if (r > t13)
        return;
      if (r > t03)
        t03 = r;
    }
    r = y13 - ay;
    if (!dy && r < 0)
      return;
    r /= dy;
    if (dy < 0) {
      if (r > t13)
        return;
      if (r > t03)
        t03 = r;
    } else if (dy > 0) {
      if (r < t03)
        return;
      if (r < t13)
        t13 = r;
    }
    if (t03 > 0)
      a2[0] = ax + t03 * dx, a2[1] = ay + t03 * dy;
    if (t13 < 1)
      b[0] = ax + t13 * dx, b[1] = ay + t13 * dy;
    return true;
  }
  var init_line = __esm(() => {
  });

  // node_modules/d3-geo/src/clip/rectangle.js
  function clipRectangle(x07, y07, x13, y13) {
    function visible(x2, y2) {
      return x07 <= x2 && x2 <= x13 && y07 <= y2 && y2 <= y13;
    }
    function interpolate(from, to, direction, stream) {
      var a2 = 0, a1 = 0;
      if (from == null || (a2 = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoint(from, to) < 0 ^ direction > 0) {
        do
          stream.point(a2 === 0 || a2 === 3 ? x07 : x13, a2 > 1 ? y13 : y07);
        while ((a2 = (a2 + direction + 4) % 4) !== a1);
      } else {
        stream.point(to[0], to[1]);
      }
    }
    function corner(p, direction) {
      return abs(p[0] - x07) < epsilon3 ? direction > 0 ? 0 : 3 : abs(p[0] - x13) < epsilon3 ? direction > 0 ? 2 : 1 : abs(p[1] - y07) < epsilon3 ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
    }
    function compareIntersection2(a2, b) {
      return comparePoint(a2.x, b.x);
    }
    function comparePoint(a2, b) {
      var ca = corner(a2, 1), cb = corner(b, 1);
      return ca !== cb ? ca - cb : ca === 0 ? b[1] - a2[1] : ca === 1 ? a2[0] - b[0] : ca === 2 ? a2[1] - b[1] : b[0] - a2[0];
    }
    return function(stream) {
      var activeStream = stream, bufferStream = buffer_default(), segments, polygon, ring, x__, y__, v__, x_, y_, v_, first, clean;
      var clipStream = {
        point: point6,
        lineStart,
        lineEnd,
        polygonStart,
        polygonEnd
      };
      function point6(x2, y2) {
        if (visible(x2, y2))
          activeStream.point(x2, y2);
      }
      function polygonInside() {
        var winding = 0;
        for (var i = 0, n = polygon.length; i < n; ++i) {
          for (var ring2 = polygon[i], j = 1, m = ring2.length, point7 = ring2[0], a0, a1, b0 = point7[0], b1 = point7[1]; j < m; ++j) {
            a0 = b0, a1 = b1, point7 = ring2[j], b0 = point7[0], b1 = point7[1];
            if (a1 <= y13) {
              if (b1 > y13 && (b0 - a0) * (y13 - a1) > (b1 - a1) * (x07 - a0))
                ++winding;
            } else {
              if (b1 <= y13 && (b0 - a0) * (y13 - a1) < (b1 - a1) * (x07 - a0))
                --winding;
            }
          }
        }
        return winding;
      }
      function polygonStart() {
        activeStream = bufferStream, segments = [], polygon = [], clean = true;
      }
      function polygonEnd() {
        var startInside = polygonInside(), cleanInside = clean && startInside, visible2 = (segments = merge(segments)).length;
        if (cleanInside || visible2) {
          stream.polygonStart();
          if (cleanInside) {
            stream.lineStart();
            interpolate(null, null, 1, stream);
            stream.lineEnd();
          }
          if (visible2) {
            rejoin_default(segments, compareIntersection2, startInside, interpolate, stream);
          }
          stream.polygonEnd();
        }
        activeStream = stream, segments = polygon = ring = null;
      }
      function lineStart() {
        clipStream.point = linePoint2;
        if (polygon)
          polygon.push(ring = []);
        first = true;
        v_ = false;
        x_ = y_ = NaN;
      }
      function lineEnd() {
        if (segments) {
          linePoint2(x__, y__);
          if (v__ && v_)
            bufferStream.rejoin();
          segments.push(bufferStream.result());
        }
        clipStream.point = point6;
        if (v_)
          activeStream.lineEnd();
      }
      function linePoint2(x2, y2) {
        var v = visible(x2, y2);
        if (polygon)
          ring.push([x2, y2]);
        if (first) {
          x__ = x2, y__ = y2, v__ = v;
          first = false;
          if (v) {
            activeStream.lineStart();
            activeStream.point(x2, y2);
          }
        } else {
          if (v && v_)
            activeStream.point(x2, y2);
          else {
            var a2 = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))], b = [x2 = Math.max(clipMin, Math.min(clipMax, x2)), y2 = Math.max(clipMin, Math.min(clipMax, y2))];
            if (line_default(a2, b, x07, y07, x13, y13)) {
              if (!v_) {
                activeStream.lineStart();
                activeStream.point(a2[0], a2[1]);
              }
              activeStream.point(b[0], b[1]);
              if (!v)
                activeStream.lineEnd();
              clean = false;
            } else if (v) {
              activeStream.lineStart();
              activeStream.point(x2, y2);
              clean = false;
            }
          }
        }
        x_ = x2, y_ = y2, v_ = v;
      }
      return clipStream;
    };
  }
  var clipMax, clipMin;
  var init_rectangle = __esm(() => {
    init_math2();
    init_buffer();
    init_line();
    init_rejoin();
    init_src5();
    clipMax = 1e9;
    clipMin = -clipMax;
  });

  // node_modules/d3-geo/src/clip/extent.js
  function extent_default2() {
    var x07 = 0, y07 = 0, x13 = 960, y13 = 500, cache, cacheStream, clip;
    return clip = {
      stream: function(stream) {
        return cache && cacheStream === stream ? cache : cache = clipRectangle(x07, y07, x13, y13)(cacheStream = stream);
      },
      extent: function(_) {
        return arguments.length ? (x07 = +_[0][0], y07 = +_[0][1], x13 = +_[1][0], y13 = +_[1][1], cache = cacheStream = null, clip) : [[x07, y07], [x13, y13]];
      }
    };
  }
  var init_extent2 = __esm(() => {
    init_rectangle();
  });

  // node_modules/d3-geo/src/length.js
  function lengthLineStart() {
    lengthStream.point = lengthPointFirst;
    lengthStream.lineEnd = lengthLineEnd;
  }
  function lengthLineEnd() {
    lengthStream.point = lengthStream.lineEnd = noop2;
  }
  function lengthPointFirst(lambda, phi) {
    lambda *= radians2, phi *= radians2;
    lambda03 = lambda, sinPhi02 = sin(phi), cosPhi02 = cos(phi);
    lengthStream.point = lengthPoint;
  }
  function lengthPoint(lambda, phi) {
    lambda *= radians2, phi *= radians2;
    var sinPhi = sin(phi), cosPhi = cos(phi), delta = abs(lambda - lambda03), cosDelta = cos(delta), sinDelta = sin(delta), x2 = cosPhi * sinDelta, y2 = cosPhi02 * sinPhi - sinPhi02 * cosPhi * cosDelta, z = sinPhi02 * sinPhi + cosPhi02 * cosPhi * cosDelta;
    lengthSum.add(atan2(sqrt2(x2 * x2 + y2 * y2), z));
    lambda03 = lambda, sinPhi02 = sinPhi, cosPhi02 = cosPhi;
  }
  function length_default(object3) {
    lengthSum = new Adder();
    stream_default(object3, lengthStream);
    return +lengthSum;
  }
  var lengthSum, lambda03, sinPhi02, cosPhi02, lengthStream;
  var init_length = __esm(() => {
    init_src5();
    init_math2();
    init_noop();
    init_stream();
    lengthStream = {
      sphere: noop2,
      point: noop2,
      lineStart: lengthLineStart,
      lineEnd: noop2,
      polygonStart: noop2,
      polygonEnd: noop2
    };
  });

  // node_modules/d3-geo/src/distance.js
  function distance_default(a2, b) {
    coordinates[0] = a2;
    coordinates[1] = b;
    return length_default(object);
  }
  var coordinates, object;
  var init_distance = __esm(() => {
    init_length();
    coordinates = [null, null];
    object = {type: "LineString", coordinates};
  });

  // node_modules/d3-geo/src/contains.js
  function containsGeometry(geometry, point6) {
    return geometry && containsGeometryType.hasOwnProperty(geometry.type) ? containsGeometryType[geometry.type](geometry, point6) : false;
  }
  function containsPoint(coordinates2, point6) {
    return distance_default(coordinates2, point6) === 0;
  }
  function containsLine(coordinates2, point6) {
    var ao, bo, ab;
    for (var i = 0, n = coordinates2.length; i < n; i++) {
      bo = distance_default(coordinates2[i], point6);
      if (bo === 0)
        return true;
      if (i > 0) {
        ab = distance_default(coordinates2[i], coordinates2[i - 1]);
        if (ab > 0 && ao <= ab && bo <= ab && (ao + bo - ab) * (1 - Math.pow((ao - bo) / ab, 2)) < epsilon22 * ab)
          return true;
      }
      ao = bo;
    }
    return false;
  }
  function containsPolygon(coordinates2, point6) {
    return !!polygonContains_default(coordinates2.map(ringRadians), pointRadians(point6));
  }
  function ringRadians(ring) {
    return ring = ring.map(pointRadians), ring.pop(), ring;
  }
  function pointRadians(point6) {
    return [point6[0] * radians2, point6[1] * radians2];
  }
  function contains_default(object3, point6) {
    return (object3 && containsObjectType.hasOwnProperty(object3.type) ? containsObjectType[object3.type] : containsGeometry)(object3, point6);
  }
  var containsObjectType, containsGeometryType;
  var init_contains = __esm(() => {
    init_polygonContains();
    init_distance();
    init_math2();
    containsObjectType = {
      Feature: function(object3, point6) {
        return containsGeometry(object3.geometry, point6);
      },
      FeatureCollection: function(object3, point6) {
        var features = object3.features, i = -1, n = features.length;
        while (++i < n)
          if (containsGeometry(features[i].geometry, point6))
            return true;
        return false;
      }
    };
    containsGeometryType = {
      Sphere: function() {
        return true;
      },
      Point: function(object3, point6) {
        return containsPoint(object3.coordinates, point6);
      },
      MultiPoint: function(object3, point6) {
        var coordinates2 = object3.coordinates, i = -1, n = coordinates2.length;
        while (++i < n)
          if (containsPoint(coordinates2[i], point6))
            return true;
        return false;
      },
      LineString: function(object3, point6) {
        return containsLine(object3.coordinates, point6);
      },
      MultiLineString: function(object3, point6) {
        var coordinates2 = object3.coordinates, i = -1, n = coordinates2.length;
        while (++i < n)
          if (containsLine(coordinates2[i], point6))
            return true;
        return false;
      },
      Polygon: function(object3, point6) {
        return containsPolygon(object3.coordinates, point6);
      },
      MultiPolygon: function(object3, point6) {
        var coordinates2 = object3.coordinates, i = -1, n = coordinates2.length;
        while (++i < n)
          if (containsPolygon(coordinates2[i], point6))
            return true;
        return false;
      },
      GeometryCollection: function(object3, point6) {
        var geometries = object3.geometries, i = -1, n = geometries.length;
        while (++i < n)
          if (containsGeometry(geometries[i], point6))
            return true;
        return false;
      }
    };
  });

  // node_modules/d3-geo/src/graticule.js
  function graticuleX(y07, y13, dy) {
    var y2 = range_default(y07, y13 - epsilon3, dy).concat(y13);
    return function(x2) {
      return y2.map(function(y3) {
        return [x2, y3];
      });
    };
  }
  function graticuleY(x07, x13, dx) {
    var x2 = range_default(x07, x13 - epsilon3, dx).concat(x13);
    return function(y2) {
      return x2.map(function(x3) {
        return [x3, y2];
      });
    };
  }
  function graticule() {
    var x13, x07, X13, X03, y13, y07, Y13, Y03, dx = 10, dy = dx, DX = 90, DY = 360, x2, y2, X, Y, precision = 2.5;
    function graticule2() {
      return {type: "MultiLineString", coordinates: lines2()};
    }
    function lines2() {
      return range_default(ceil(X03 / DX) * DX, X13, DX).map(X).concat(range_default(ceil(Y03 / DY) * DY, Y13, DY).map(Y)).concat(range_default(ceil(x07 / dx) * dx, x13, dx).filter(function(x3) {
        return abs(x3 % DX) > epsilon3;
      }).map(x2)).concat(range_default(ceil(y07 / dy) * dy, y13, dy).filter(function(y3) {
        return abs(y3 % DY) > epsilon3;
      }).map(y2));
    }
    graticule2.lines = function() {
      return lines2().map(function(coordinates2) {
        return {type: "LineString", coordinates: coordinates2};
      });
    };
    graticule2.outline = function() {
      return {
        type: "Polygon",
        coordinates: [
          X(X03).concat(Y(Y13).slice(1), X(X13).reverse().slice(1), Y(Y03).reverse().slice(1))
        ]
      };
    };
    graticule2.extent = function(_) {
      if (!arguments.length)
        return graticule2.extentMinor();
      return graticule2.extentMajor(_).extentMinor(_);
    };
    graticule2.extentMajor = function(_) {
      if (!arguments.length)
        return [[X03, Y03], [X13, Y13]];
      X03 = +_[0][0], X13 = +_[1][0];
      Y03 = +_[0][1], Y13 = +_[1][1];
      if (X03 > X13)
        _ = X03, X03 = X13, X13 = _;
      if (Y03 > Y13)
        _ = Y03, Y03 = Y13, Y13 = _;
      return graticule2.precision(precision);
    };
    graticule2.extentMinor = function(_) {
      if (!arguments.length)
        return [[x07, y07], [x13, y13]];
      x07 = +_[0][0], x13 = +_[1][0];
      y07 = +_[0][1], y13 = +_[1][1];
      if (x07 > x13)
        _ = x07, x07 = x13, x13 = _;
      if (y07 > y13)
        _ = y07, y07 = y13, y13 = _;
      return graticule2.precision(precision);
    };
    graticule2.step = function(_) {
      if (!arguments.length)
        return graticule2.stepMinor();
      return graticule2.stepMajor(_).stepMinor(_);
    };
    graticule2.stepMajor = function(_) {
      if (!arguments.length)
        return [DX, DY];
      DX = +_[0], DY = +_[1];
      return graticule2;
    };
    graticule2.stepMinor = function(_) {
      if (!arguments.length)
        return [dx, dy];
      dx = +_[0], dy = +_[1];
      return graticule2;
    };
    graticule2.precision = function(_) {
      if (!arguments.length)
        return precision;
      precision = +_;
      x2 = graticuleX(y07, y13, 90);
      y2 = graticuleY(x07, x13, precision);
      X = graticuleX(Y03, Y13, 90);
      Y = graticuleY(X03, X13, precision);
      return graticule2;
    };
    return graticule2.extentMajor([[-180, -90 + epsilon3], [180, 90 - epsilon3]]).extentMinor([[-180, -80 - epsilon3], [180, 80 + epsilon3]]);
  }
  function graticule10() {
    return graticule()();
  }
  var init_graticule = __esm(() => {
    init_src5();
    init_math2();
  });

  // node_modules/d3-geo/src/interpolate.js
  function interpolate_default(a2, b) {
    var x07 = a2[0] * radians2, y07 = a2[1] * radians2, x13 = b[0] * radians2, y13 = b[1] * radians2, cy0 = cos(y07), sy0 = sin(y07), cy1 = cos(y13), sy1 = sin(y13), kx0 = cy0 * cos(x07), ky0 = cy0 * sin(x07), kx1 = cy1 * cos(x13), ky1 = cy1 * sin(x13), d = 2 * asin(sqrt2(haversin(y13 - y07) + cy0 * cy1 * haversin(x13 - x07))), k3 = sin(d);
    var interpolate = d ? function(t) {
      var B3 = sin(t *= d) / k3, A6 = sin(d - t) / k3, x2 = A6 * kx0 + B3 * kx1, y2 = A6 * ky0 + B3 * ky1, z = A6 * sy0 + B3 * sy1;
      return [
        atan2(y2, x2) * degrees3,
        atan2(z, sqrt2(x2 * x2 + y2 * y2)) * degrees3
      ];
    } : function() {
      return [x07 * degrees3, y07 * degrees3];
    };
    interpolate.distance = d;
    return interpolate;
  }
  var init_interpolate = __esm(() => {
    init_math2();
  });

  // node_modules/d3-geo/src/identity.js
  var identity_default4;
  var init_identity5 = __esm(() => {
    identity_default4 = (x2) => x2;
  });

  // node_modules/d3-geo/src/path/area.js
  function areaRingStart2() {
    areaStream2.point = areaPointFirst2;
  }
  function areaPointFirst2(x2, y2) {
    areaStream2.point = areaPoint2;
    x00 = x02 = x2, y00 = y02 = y2;
  }
  function areaPoint2(x2, y2) {
    areaRingSum2.add(y02 * x2 - x02 * y2);
    x02 = x2, y02 = y2;
  }
  function areaRingEnd2() {
    areaPoint2(x00, y00);
  }
  var areaSum2, areaRingSum2, x00, y00, x02, y02, areaStream2, area_default2;
  var init_area2 = __esm(() => {
    init_src5();
    init_math2();
    init_noop();
    areaSum2 = new Adder();
    areaRingSum2 = new Adder();
    areaStream2 = {
      point: noop2,
      lineStart: noop2,
      lineEnd: noop2,
      polygonStart: function() {
        areaStream2.lineStart = areaRingStart2;
        areaStream2.lineEnd = areaRingEnd2;
      },
      polygonEnd: function() {
        areaStream2.lineStart = areaStream2.lineEnd = areaStream2.point = noop2;
        areaSum2.add(abs(areaRingSum2));
        areaRingSum2 = new Adder();
      },
      result: function() {
        var area = areaSum2 / 2;
        areaSum2 = new Adder();
        return area;
      }
    };
    area_default2 = areaStream2;
  });

  // node_modules/d3-geo/src/path/bounds.js
  function boundsPoint2(x2, y2) {
    if (x2 < x03)
      x03 = x2;
    if (x2 > x1)
      x1 = x2;
    if (y2 < y03)
      y03 = y2;
    if (y2 > y1)
      y1 = y2;
  }
  var x03, y03, x1, y1, boundsStream2, bounds_default2;
  var init_bounds2 = __esm(() => {
    init_noop();
    x03 = Infinity;
    y03 = x03;
    x1 = -x03;
    y1 = x1;
    boundsStream2 = {
      point: boundsPoint2,
      lineStart: noop2,
      lineEnd: noop2,
      polygonStart: noop2,
      polygonEnd: noop2,
      result: function() {
        var bounds = [[x03, y03], [x1, y1]];
        x1 = y1 = -(y03 = x03 = Infinity);
        return bounds;
      }
    };
    bounds_default2 = boundsStream2;
  });

  // node_modules/d3-geo/src/path/centroid.js
  function centroidPoint2(x2, y2) {
    X02 += x2;
    Y02 += y2;
    ++Z02;
  }
  function centroidLineStart2() {
    centroidStream2.point = centroidPointFirstLine;
  }
  function centroidPointFirstLine(x2, y2) {
    centroidStream2.point = centroidPointLine;
    centroidPoint2(x04 = x2, y04 = y2);
  }
  function centroidPointLine(x2, y2) {
    var dx = x2 - x04, dy = y2 - y04, z = sqrt2(dx * dx + dy * dy);
    X12 += z * (x04 + x2) / 2;
    Y12 += z * (y04 + y2) / 2;
    Z12 += z;
    centroidPoint2(x04 = x2, y04 = y2);
  }
  function centroidLineEnd2() {
    centroidStream2.point = centroidPoint2;
  }
  function centroidRingStart2() {
    centroidStream2.point = centroidPointFirstRing;
  }
  function centroidRingEnd2() {
    centroidPointRing(x002, y002);
  }
  function centroidPointFirstRing(x2, y2) {
    centroidStream2.point = centroidPointRing;
    centroidPoint2(x002 = x04 = x2, y002 = y04 = y2);
  }
  function centroidPointRing(x2, y2) {
    var dx = x2 - x04, dy = y2 - y04, z = sqrt2(dx * dx + dy * dy);
    X12 += z * (x04 + x2) / 2;
    Y12 += z * (y04 + y2) / 2;
    Z12 += z;
    z = y04 * x2 - x04 * y2;
    X22 += z * (x04 + x2);
    Y22 += z * (y04 + y2);
    Z22 += z * 3;
    centroidPoint2(x04 = x2, y04 = y2);
  }
  var X02, Y02, Z02, X12, Y12, Z12, X22, Y22, Z22, x002, y002, x04, y04, centroidStream2, centroid_default2;
  var init_centroid2 = __esm(() => {
    init_math2();
    X02 = 0;
    Y02 = 0;
    Z02 = 0;
    X12 = 0;
    Y12 = 0;
    Z12 = 0;
    X22 = 0;
    Y22 = 0;
    Z22 = 0;
    centroidStream2 = {
      point: centroidPoint2,
      lineStart: centroidLineStart2,
      lineEnd: centroidLineEnd2,
      polygonStart: function() {
        centroidStream2.lineStart = centroidRingStart2;
        centroidStream2.lineEnd = centroidRingEnd2;
      },
      polygonEnd: function() {
        centroidStream2.point = centroidPoint2;
        centroidStream2.lineStart = centroidLineStart2;
        centroidStream2.lineEnd = centroidLineEnd2;
      },
      result: function() {
        var centroid = Z22 ? [X22 / Z22, Y22 / Z22] : Z12 ? [X12 / Z12, Y12 / Z12] : Z02 ? [X02 / Z02, Y02 / Z02] : [NaN, NaN];
        X02 = Y02 = Z02 = X12 = Y12 = Z12 = X22 = Y22 = Z22 = 0;
        return centroid;
      }
    };
    centroid_default2 = centroidStream2;
  });

  // node_modules/d3-geo/src/path/context.js
  function PathContext(context) {
    this._context = context;
  }
  var init_context = __esm(() => {
    init_math2();
    init_noop();
    PathContext.prototype = {
      _radius: 4.5,
      pointRadius: function(_) {
        return this._radius = _, this;
      },
      polygonStart: function() {
        this._line = 0;
      },
      polygonEnd: function() {
        this._line = NaN;
      },
      lineStart: function() {
        this._point = 0;
      },
      lineEnd: function() {
        if (this._line === 0)
          this._context.closePath();
        this._point = NaN;
      },
      point: function(x2, y2) {
        switch (this._point) {
          case 0: {
            this._context.moveTo(x2, y2);
            this._point = 1;
            break;
          }
          case 1: {
            this._context.lineTo(x2, y2);
            break;
          }
          default: {
            this._context.moveTo(x2 + this._radius, y2);
            this._context.arc(x2, y2, this._radius, 0, tau);
            break;
          }
        }
      },
      result: noop2
    };
  });

  // node_modules/d3-geo/src/path/measure.js
  function lengthPointFirst2(x2, y2) {
    lengthStream2.point = lengthPoint2;
    x003 = x05 = x2, y003 = y05 = y2;
  }
  function lengthPoint2(x2, y2) {
    x05 -= x2, y05 -= y2;
    lengthSum2.add(sqrt2(x05 * x05 + y05 * y05));
    x05 = x2, y05 = y2;
  }
  var lengthSum2, lengthRing, x003, y003, x05, y05, lengthStream2, measure_default;
  var init_measure = __esm(() => {
    init_src5();
    init_math2();
    init_noop();
    lengthSum2 = new Adder();
    lengthStream2 = {
      point: noop2,
      lineStart: function() {
        lengthStream2.point = lengthPointFirst2;
      },
      lineEnd: function() {
        if (lengthRing)
          lengthPoint2(x003, y003);
        lengthStream2.point = noop2;
      },
      polygonStart: function() {
        lengthRing = true;
      },
      polygonEnd: function() {
        lengthRing = null;
      },
      result: function() {
        var length4 = +lengthSum2;
        lengthSum2 = new Adder();
        return length4;
      }
    };
    measure_default = lengthStream2;
  });

  // node_modules/d3-geo/src/path/string.js
  function PathString() {
    this._string = [];
  }
  function circle(radius) {
    return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
  }
  var init_string2 = __esm(() => {
    PathString.prototype = {
      _radius: 4.5,
      _circle: circle(4.5),
      pointRadius: function(_) {
        if ((_ = +_) !== this._radius)
          this._radius = _, this._circle = null;
        return this;
      },
      polygonStart: function() {
        this._line = 0;
      },
      polygonEnd: function() {
        this._line = NaN;
      },
      lineStart: function() {
        this._point = 0;
      },
      lineEnd: function() {
        if (this._line === 0)
          this._string.push("Z");
        this._point = NaN;
      },
      point: function(x2, y2) {
        switch (this._point) {
          case 0: {
            this._string.push("M", x2, ",", y2);
            this._point = 1;
            break;
          }
          case 1: {
            this._string.push("L", x2, ",", y2);
            break;
          }
          default: {
            if (this._circle == null)
              this._circle = circle(this._radius);
            this._string.push("M", x2, ",", y2, this._circle);
            break;
          }
        }
      },
      result: function() {
        if (this._string.length) {
          var result = this._string.join("");
          this._string = [];
          return result;
        } else {
          return null;
        }
      }
    };
  });

  // node_modules/d3-geo/src/path/index.js
  function path_default(projection2, context) {
    var pointRadius = 4.5, projectionStream, contextStream;
    function path2(object3) {
      if (object3) {
        if (typeof pointRadius === "function")
          contextStream.pointRadius(+pointRadius.apply(this, arguments));
        stream_default(object3, projectionStream(contextStream));
      }
      return contextStream.result();
    }
    path2.area = function(object3) {
      stream_default(object3, projectionStream(area_default2));
      return area_default2.result();
    };
    path2.measure = function(object3) {
      stream_default(object3, projectionStream(measure_default));
      return measure_default.result();
    };
    path2.bounds = function(object3) {
      stream_default(object3, projectionStream(bounds_default2));
      return bounds_default2.result();
    };
    path2.centroid = function(object3) {
      stream_default(object3, projectionStream(centroid_default2));
      return centroid_default2.result();
    };
    path2.projection = function(_) {
      return arguments.length ? (projectionStream = _ == null ? (projection2 = null, identity_default4) : (projection2 = _).stream, path2) : projection2;
    };
    path2.context = function(_) {
      if (!arguments.length)
        return context;
      contextStream = _ == null ? (context = null, new PathString()) : new PathContext(context = _);
      if (typeof pointRadius !== "function")
        contextStream.pointRadius(pointRadius);
      return path2;
    };
    path2.pointRadius = function(_) {
      if (!arguments.length)
        return pointRadius;
      pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
      return path2;
    };
    return path2.projection(projection2).context(context);
  }
  var init_path = __esm(() => {
    init_identity5();
    init_stream();
    init_area2();
    init_bounds2();
    init_centroid2();
    init_context();
    init_measure();
    init_string2();
  });

  // node_modules/d3-geo/src/transform.js
  function transform_default(methods) {
    return {
      stream: transformer4(methods)
    };
  }
  function transformer4(methods) {
    return function(stream) {
      var s2 = new TransformStream();
      for (var key in methods)
        s2[key] = methods[key];
      s2.stream = stream;
      return s2;
    };
  }
  function TransformStream() {
  }
  var init_transform2 = __esm(() => {
    TransformStream.prototype = {
      constructor: TransformStream,
      point: function(x2, y2) {
        this.stream.point(x2, y2);
      },
      sphere: function() {
        this.stream.sphere();
      },
      lineStart: function() {
        this.stream.lineStart();
      },
      lineEnd: function() {
        this.stream.lineEnd();
      },
      polygonStart: function() {
        this.stream.polygonStart();
      },
      polygonEnd: function() {
        this.stream.polygonEnd();
      }
    };
  });

  // node_modules/d3-geo/src/projection/fit.js
  function fit(projection2, fitBounds, object3) {
    var clip = projection2.clipExtent && projection2.clipExtent();
    projection2.scale(150).translate([0, 0]);
    if (clip != null)
      projection2.clipExtent(null);
    stream_default(object3, projection2.stream(bounds_default2));
    fitBounds(bounds_default2.result());
    if (clip != null)
      projection2.clipExtent(clip);
    return projection2;
  }
  function fitExtent(projection2, extent, object3) {
    return fit(projection2, function(b) {
      var w2 = extent[1][0] - extent[0][0], h = extent[1][1] - extent[0][1], k3 = Math.min(w2 / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])), x2 = +extent[0][0] + (w2 - k3 * (b[1][0] + b[0][0])) / 2, y2 = +extent[0][1] + (h - k3 * (b[1][1] + b[0][1])) / 2;
      projection2.scale(150 * k3).translate([x2, y2]);
    }, object3);
  }
  function fitSize(projection2, size, object3) {
    return fitExtent(projection2, [[0, 0], size], object3);
  }
  function fitWidth(projection2, width, object3) {
    return fit(projection2, function(b) {
      var w2 = +width, k3 = w2 / (b[1][0] - b[0][0]), x2 = (w2 - k3 * (b[1][0] + b[0][0])) / 2, y2 = -k3 * b[0][1];
      projection2.scale(150 * k3).translate([x2, y2]);
    }, object3);
  }
  function fitHeight(projection2, height, object3) {
    return fit(projection2, function(b) {
      var h = +height, k3 = h / (b[1][1] - b[0][1]), x2 = -k3 * b[0][0], y2 = (h - k3 * (b[1][1] + b[0][1])) / 2;
      projection2.scale(150 * k3).translate([x2, y2]);
    }, object3);
  }
  var init_fit = __esm(() => {
    init_stream();
    init_bounds2();
  });

  // node_modules/d3-geo/src/projection/resample.js
  function resample_default(project, delta2) {
    return +delta2 ? resample(project, delta2) : resampleNone(project);
  }
  function resampleNone(project) {
    return transformer4({
      point: function(x2, y2) {
        x2 = project(x2, y2);
        this.stream.point(x2[0], x2[1]);
      }
    });
  }
  function resample(project, delta2) {
    function resampleLineTo(x07, y07, lambda04, a0, b0, c0, x13, y13, lambda12, a1, b1, c1, depth, stream) {
      var dx = x13 - x07, dy = y13 - y07, d2 = dx * dx + dy * dy;
      if (d2 > 4 * delta2 && depth--) {
        var a2 = a0 + a1, b = b0 + b1, c2 = c0 + c1, m = sqrt2(a2 * a2 + b * b + c2 * c2), phi2 = asin(c2 /= m), lambda22 = abs(abs(c2) - 1) < epsilon3 || abs(lambda04 - lambda12) < epsilon3 ? (lambda04 + lambda12) / 2 : atan2(b, a2), p = project(lambda22, phi2), x2 = p[0], y2 = p[1], dx2 = x2 - x07, dy2 = y2 - y07, dz = dy * dx2 - dx * dy2;
        if (dz * dz / d2 > delta2 || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
          resampleLineTo(x07, y07, lambda04, a0, b0, c0, x2, y2, lambda22, a2 /= m, b /= m, c2, depth, stream);
          stream.point(x2, y2);
          resampleLineTo(x2, y2, lambda22, a2, b, c2, x13, y13, lambda12, a1, b1, c1, depth, stream);
        }
      }
    }
    return function(stream) {
      var lambda004, x004, y004, a00, b00, c00, lambda04, x07, y07, a0, b0, c0;
      var resampleStream = {
        point: point6,
        lineStart,
        lineEnd,
        polygonStart: function() {
          stream.polygonStart();
          resampleStream.lineStart = ringStart;
        },
        polygonEnd: function() {
          stream.polygonEnd();
          resampleStream.lineStart = lineStart;
        }
      };
      function point6(x2, y2) {
        x2 = project(x2, y2);
        stream.point(x2[0], x2[1]);
      }
      function lineStart() {
        x07 = NaN;
        resampleStream.point = linePoint2;
        stream.lineStart();
      }
      function linePoint2(lambda, phi) {
        var c2 = cartesian([lambda, phi]), p = project(lambda, phi);
        resampleLineTo(x07, y07, lambda04, a0, b0, c0, x07 = p[0], y07 = p[1], lambda04 = lambda, a0 = c2[0], b0 = c2[1], c0 = c2[2], maxDepth, stream);
        stream.point(x07, y07);
      }
      function lineEnd() {
        resampleStream.point = point6;
        stream.lineEnd();
      }
      function ringStart() {
        lineStart();
        resampleStream.point = ringPoint;
        resampleStream.lineEnd = ringEnd;
      }
      function ringPoint(lambda, phi) {
        linePoint2(lambda004 = lambda, phi), x004 = x07, y004 = y07, a00 = a0, b00 = b0, c00 = c0;
        resampleStream.point = linePoint2;
      }
      function ringEnd() {
        resampleLineTo(x07, y07, lambda04, a0, b0, c0, x004, y004, lambda004, a00, b00, c00, maxDepth, stream);
        resampleStream.lineEnd = lineEnd;
        lineEnd();
      }
      return resampleStream;
    };
  }
  var maxDepth, cosMinDistance;
  var init_resample = __esm(() => {
    init_cartesian();
    init_math2();
    init_transform2();
    maxDepth = 16;
    cosMinDistance = cos(30 * radians2);
  });

  // node_modules/d3-geo/src/projection/index.js
  function transformRotate(rotate) {
    return transformer4({
      point: function(x2, y2) {
        var r = rotate(x2, y2);
        return this.stream.point(r[0], r[1]);
      }
    });
  }
  function scaleTranslate(k3, dx, dy, sx, sy) {
    function transform(x2, y2) {
      x2 *= sx;
      y2 *= sy;
      return [dx + k3 * x2, dy - k3 * y2];
    }
    transform.invert = function(x2, y2) {
      return [(x2 - dx) / k3 * sx, (dy - y2) / k3 * sy];
    };
    return transform;
  }
  function scaleTranslateRotate(k3, dx, dy, sx, sy, alpha) {
    if (!alpha)
      return scaleTranslate(k3, dx, dy, sx, sy);
    var cosAlpha = cos(alpha), sinAlpha = sin(alpha), a2 = cosAlpha * k3, b = sinAlpha * k3, ai = cosAlpha / k3, bi = sinAlpha / k3, ci = (sinAlpha * dy - cosAlpha * dx) / k3, fi = (sinAlpha * dx + cosAlpha * dy) / k3;
    function transform(x2, y2) {
      x2 *= sx;
      y2 *= sy;
      return [a2 * x2 - b * y2 + dx, dy - b * x2 - a2 * y2];
    }
    transform.invert = function(x2, y2) {
      return [sx * (ai * x2 - bi * y2 + ci), sy * (fi - bi * x2 - ai * y2)];
    };
    return transform;
  }
  function projection(project) {
    return projectionMutator(function() {
      return project;
    })();
  }
  function projectionMutator(projectAt) {
    var project, k3 = 150, x2 = 480, y2 = 250, lambda = 0, phi = 0, deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, alpha = 0, sx = 1, sy = 1, theta = null, preclip = antimeridian_default, x07 = null, y07, x13, y13, postclip = identity_default4, delta2 = 0.5, projectResample, projectTransform, projectRotateTransform, cache, cacheStream;
    function projection2(point6) {
      return projectRotateTransform(point6[0] * radians2, point6[1] * radians2);
    }
    function invert(point6) {
      point6 = projectRotateTransform.invert(point6[0], point6[1]);
      return point6 && [point6[0] * degrees3, point6[1] * degrees3];
    }
    projection2.stream = function(stream) {
      return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
    };
    projection2.preclip = function(_) {
      return arguments.length ? (preclip = _, theta = void 0, reset()) : preclip;
    };
    projection2.postclip = function(_) {
      return arguments.length ? (postclip = _, x07 = y07 = x13 = y13 = null, reset()) : postclip;
    };
    projection2.clipAngle = function(_) {
      return arguments.length ? (preclip = +_ ? circle_default2(theta = _ * radians2) : (theta = null, antimeridian_default), reset()) : theta * degrees3;
    };
    projection2.clipExtent = function(_) {
      return arguments.length ? (postclip = _ == null ? (x07 = y07 = x13 = y13 = null, identity_default4) : clipRectangle(x07 = +_[0][0], y07 = +_[0][1], x13 = +_[1][0], y13 = +_[1][1]), reset()) : x07 == null ? null : [[x07, y07], [x13, y13]];
    };
    projection2.scale = function(_) {
      return arguments.length ? (k3 = +_, recenter()) : k3;
    };
    projection2.translate = function(_) {
      return arguments.length ? (x2 = +_[0], y2 = +_[1], recenter()) : [x2, y2];
    };
    projection2.center = function(_) {
      return arguments.length ? (lambda = _[0] % 360 * radians2, phi = _[1] % 360 * radians2, recenter()) : [lambda * degrees3, phi * degrees3];
    };
    projection2.rotate = function(_) {
      return arguments.length ? (deltaLambda = _[0] % 360 * radians2, deltaPhi = _[1] % 360 * radians2, deltaGamma = _.length > 2 ? _[2] % 360 * radians2 : 0, recenter()) : [deltaLambda * degrees3, deltaPhi * degrees3, deltaGamma * degrees3];
    };
    projection2.angle = function(_) {
      return arguments.length ? (alpha = _ % 360 * radians2, recenter()) : alpha * degrees3;
    };
    projection2.reflectX = function(_) {
      return arguments.length ? (sx = _ ? -1 : 1, recenter()) : sx < 0;
    };
    projection2.reflectY = function(_) {
      return arguments.length ? (sy = _ ? -1 : 1, recenter()) : sy < 0;
    };
    projection2.precision = function(_) {
      return arguments.length ? (projectResample = resample_default(projectTransform, delta2 = _ * _), reset()) : sqrt2(delta2);
    };
    projection2.fitExtent = function(extent, object3) {
      return fitExtent(projection2, extent, object3);
    };
    projection2.fitSize = function(size, object3) {
      return fitSize(projection2, size, object3);
    };
    projection2.fitWidth = function(width, object3) {
      return fitWidth(projection2, width, object3);
    };
    projection2.fitHeight = function(height, object3) {
      return fitHeight(projection2, height, object3);
    };
    function recenter() {
      var center2 = scaleTranslateRotate(k3, 0, 0, sx, sy, alpha).apply(null, project(lambda, phi)), transform = scaleTranslateRotate(k3, x2 - center2[0], y2 - center2[1], sx, sy, alpha);
      rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma);
      projectTransform = compose_default(project, transform);
      projectRotateTransform = compose_default(rotate, projectTransform);
      projectResample = resample_default(projectTransform, delta2);
      return reset();
    }
    function reset() {
      cache = cacheStream = null;
      return projection2;
    }
    return function() {
      project = projectAt.apply(this, arguments);
      projection2.invert = project.invert && invert;
      return recenter();
    };
  }
  var transformRadians;
  var init_projection = __esm(() => {
    init_antimeridian();
    init_circle2();
    init_rectangle();
    init_compose();
    init_identity5();
    init_math2();
    init_rotation();
    init_transform2();
    init_fit();
    init_resample();
    transformRadians = transformer4({
      point: function(x2, y2) {
        this.stream.point(x2 * radians2, y2 * radians2);
      }
    });
  });

  // node_modules/d3-geo/src/projection/conic.js
  function conicProjection(projectAt) {
    var phi03 = 0, phi12 = pi / 3, m = projectionMutator(projectAt), p = m(phi03, phi12);
    p.parallels = function(_) {
      return arguments.length ? m(phi03 = _[0] * radians2, phi12 = _[1] * radians2) : [phi03 * degrees3, phi12 * degrees3];
    };
    return p;
  }
  var init_conic = __esm(() => {
    init_math2();
    init_projection();
  });

  // node_modules/d3-geo/src/projection/cylindricalEqualArea.js
  function cylindricalEqualAreaRaw(phi03) {
    var cosPhi03 = cos(phi03);
    function forward(lambda, phi) {
      return [lambda * cosPhi03, sin(phi) / cosPhi03];
    }
    forward.invert = function(x2, y2) {
      return [x2 / cosPhi03, asin(y2 * cosPhi03)];
    };
    return forward;
  }
  var init_cylindricalEqualArea = __esm(() => {
    init_math2();
  });

  // node_modules/d3-geo/src/projection/conicEqualArea.js
  function conicEqualAreaRaw(y07, y13) {
    var sy0 = sin(y07), n = (sy0 + sin(y13)) / 2;
    if (abs(n) < epsilon3)
      return cylindricalEqualAreaRaw(y07);
    var c2 = 1 + sy0 * (2 * n - sy0), r0 = sqrt2(c2) / n;
    function project(x2, y2) {
      var r = sqrt2(c2 - 2 * n * sin(y2)) / n;
      return [r * sin(x2 *= n), r0 - r * cos(x2)];
    }
    project.invert = function(x2, y2) {
      var r0y = r0 - y2, l = atan2(x2, abs(r0y)) * sign(r0y);
      if (r0y * n < 0)
        l -= pi * sign(x2) * sign(r0y);
      return [l / n, asin((c2 - (x2 * x2 + r0y * r0y) * n * n) / (2 * n))];
    };
    return project;
  }
  function conicEqualArea_default() {
    return conicProjection(conicEqualAreaRaw).scale(155.424).center([0, 33.6442]);
  }
  var init_conicEqualArea = __esm(() => {
    init_math2();
    init_conic();
    init_cylindricalEqualArea();
  });

  // node_modules/d3-geo/src/projection/albers.js
  function albers_default() {
    return conicEqualArea_default().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-0.6, 38.7]);
  }
  var init_albers = __esm(() => {
    init_conicEqualArea();
  });

  // node_modules/d3-geo/src/projection/albersUsa.js
  function multiplex(streams) {
    var n = streams.length;
    return {
      point: function(x2, y2) {
        var i = -1;
        while (++i < n)
          streams[i].point(x2, y2);
      },
      sphere: function() {
        var i = -1;
        while (++i < n)
          streams[i].sphere();
      },
      lineStart: function() {
        var i = -1;
        while (++i < n)
          streams[i].lineStart();
      },
      lineEnd: function() {
        var i = -1;
        while (++i < n)
          streams[i].lineEnd();
      },
      polygonStart: function() {
        var i = -1;
        while (++i < n)
          streams[i].polygonStart();
      },
      polygonEnd: function() {
        var i = -1;
        while (++i < n)
          streams[i].polygonEnd();
      }
    };
  }
  function albersUsa_default() {
    var cache, cacheStream, lower48 = albers_default(), lower48Point, alaska2 = conicEqualArea_default().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), alaskaPoint, hawaii = conicEqualArea_default().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), hawaiiPoint, point6, pointStream = {point: function(x2, y2) {
      point6 = [x2, y2];
    }};
    function albersUsa(coordinates2) {
      var x2 = coordinates2[0], y2 = coordinates2[1];
      return point6 = null, (lower48Point.point(x2, y2), point6) || (alaskaPoint.point(x2, y2), point6) || (hawaiiPoint.point(x2, y2), point6);
    }
    albersUsa.invert = function(coordinates2) {
      var k3 = lower48.scale(), t = lower48.translate(), x2 = (coordinates2[0] - t[0]) / k3, y2 = (coordinates2[1] - t[1]) / k3;
      return (y2 >= 0.12 && y2 < 0.234 && x2 >= -0.425 && x2 < -0.214 ? alaska2 : y2 >= 0.166 && y2 < 0.234 && x2 >= -0.214 && x2 < -0.115 ? hawaii : lower48).invert(coordinates2);
    };
    albersUsa.stream = function(stream) {
      return cache && cacheStream === stream ? cache : cache = multiplex([lower48.stream(cacheStream = stream), alaska2.stream(stream), hawaii.stream(stream)]);
    };
    albersUsa.precision = function(_) {
      if (!arguments.length)
        return lower48.precision();
      lower48.precision(_), alaska2.precision(_), hawaii.precision(_);
      return reset();
    };
    albersUsa.scale = function(_) {
      if (!arguments.length)
        return lower48.scale();
      lower48.scale(_), alaska2.scale(_ * 0.35), hawaii.scale(_);
      return albersUsa.translate(lower48.translate());
    };
    albersUsa.translate = function(_) {
      if (!arguments.length)
        return lower48.translate();
      var k3 = lower48.scale(), x2 = +_[0], y2 = +_[1];
      lower48Point = lower48.translate(_).clipExtent([[x2 - 0.455 * k3, y2 - 0.238 * k3], [x2 + 0.455 * k3, y2 + 0.238 * k3]]).stream(pointStream);
      alaskaPoint = alaska2.translate([x2 - 0.307 * k3, y2 + 0.201 * k3]).clipExtent([[x2 - 0.425 * k3 + epsilon3, y2 + 0.12 * k3 + epsilon3], [x2 - 0.214 * k3 - epsilon3, y2 + 0.234 * k3 - epsilon3]]).stream(pointStream);
      hawaiiPoint = hawaii.translate([x2 - 0.205 * k3, y2 + 0.212 * k3]).clipExtent([[x2 - 0.214 * k3 + epsilon3, y2 + 0.166 * k3 + epsilon3], [x2 - 0.115 * k3 - epsilon3, y2 + 0.234 * k3 - epsilon3]]).stream(pointStream);
      return reset();
    };
    albersUsa.fitExtent = function(extent, object3) {
      return fitExtent(albersUsa, extent, object3);
    };
    albersUsa.fitSize = function(size, object3) {
      return fitSize(albersUsa, size, object3);
    };
    albersUsa.fitWidth = function(width, object3) {
      return fitWidth(albersUsa, width, object3);
    };
    albersUsa.fitHeight = function(height, object3) {
      return fitHeight(albersUsa, height, object3);
    };
    function reset() {
      cache = cacheStream = null;
      return albersUsa;
    }
    return albersUsa.scale(1070);
  }
  var init_albersUsa = __esm(() => {
    init_math2();
    init_albers();
    init_conicEqualArea();
    init_fit();
  });

  // node_modules/d3-geo/src/projection/azimuthal.js
  function azimuthalRaw(scale) {
    return function(x2, y2) {
      var cx = cos(x2), cy = cos(y2), k3 = scale(cx * cy);
      if (k3 === Infinity)
        return [2, 0];
      return [
        k3 * cy * sin(x2),
        k3 * sin(y2)
      ];
    };
  }
  function azimuthalInvert(angle4) {
    return function(x2, y2) {
      var z = sqrt2(x2 * x2 + y2 * y2), c2 = angle4(z), sc = sin(c2), cc = cos(c2);
      return [
        atan2(x2 * sc, z * cc),
        asin(z && y2 * sc / z)
      ];
    };
  }
  var init_azimuthal = __esm(() => {
    init_math2();
  });

  // node_modules/d3-geo/src/projection/azimuthalEqualArea.js
  function azimuthalEqualArea_default() {
    return projection(azimuthalEqualAreaRaw).scale(124.75).clipAngle(180 - 1e-3);
  }
  var azimuthalEqualAreaRaw;
  var init_azimuthalEqualArea = __esm(() => {
    init_math2();
    init_azimuthal();
    init_projection();
    azimuthalEqualAreaRaw = azimuthalRaw(function(cxcy) {
      return sqrt2(2 / (1 + cxcy));
    });
    azimuthalEqualAreaRaw.invert = azimuthalInvert(function(z) {
      return 2 * asin(z / 2);
    });
  });

  // node_modules/d3-geo/src/projection/azimuthalEquidistant.js
  function azimuthalEquidistant_default() {
    return projection(azimuthalEquidistantRaw).scale(79.4188).clipAngle(180 - 1e-3);
  }
  var azimuthalEquidistantRaw;
  var init_azimuthalEquidistant = __esm(() => {
    init_math2();
    init_azimuthal();
    init_projection();
    azimuthalEquidistantRaw = azimuthalRaw(function(c2) {
      return (c2 = acos(c2)) && c2 / sin(c2);
    });
    azimuthalEquidistantRaw.invert = azimuthalInvert(function(z) {
      return z;
    });
  });

  // node_modules/d3-geo/src/projection/mercator.js
  function mercatorRaw(lambda, phi) {
    return [lambda, log2(tan((halfPi + phi) / 2))];
  }
  function mercator_default() {
    return mercatorProjection(mercatorRaw).scale(961 / tau);
  }
  function mercatorProjection(project) {
    var m = projection(project), center2 = m.center, scale = m.scale, translate = m.translate, clipExtent = m.clipExtent, x07 = null, y07, x13, y13;
    m.scale = function(_) {
      return arguments.length ? (scale(_), reclip()) : scale();
    };
    m.translate = function(_) {
      return arguments.length ? (translate(_), reclip()) : translate();
    };
    m.center = function(_) {
      return arguments.length ? (center2(_), reclip()) : center2();
    };
    m.clipExtent = function(_) {
      return arguments.length ? (_ == null ? x07 = y07 = x13 = y13 = null : (x07 = +_[0][0], y07 = +_[0][1], x13 = +_[1][0], y13 = +_[1][1]), reclip()) : x07 == null ? null : [[x07, y07], [x13, y13]];
    };
    function reclip() {
      var k3 = pi * scale(), t = m(rotation_default(m.rotate()).invert([0, 0]));
      return clipExtent(x07 == null ? [[t[0] - k3, t[1] - k3], [t[0] + k3, t[1] + k3]] : project === mercatorRaw ? [[Math.max(t[0] - k3, x07), y07], [Math.min(t[0] + k3, x13), y13]] : [[x07, Math.max(t[1] - k3, y07)], [x13, Math.min(t[1] + k3, y13)]]);
    }
    return reclip();
  }
  var init_mercator = __esm(() => {
    init_math2();
    init_rotation();
    init_projection();
    mercatorRaw.invert = function(x2, y2) {
      return [x2, 2 * atan(exp(y2)) - halfPi];
    };
  });

  // node_modules/d3-geo/src/projection/conicConformal.js
  function tany(y2) {
    return tan((halfPi + y2) / 2);
  }
  function conicConformalRaw(y07, y13) {
    var cy0 = cos(y07), n = y07 === y13 ? sin(y07) : log2(cy0 / cos(y13)) / log2(tany(y13) / tany(y07)), f = cy0 * pow2(tany(y07), n) / n;
    if (!n)
      return mercatorRaw;
    function project(x2, y2) {
      if (f > 0) {
        if (y2 < -halfPi + epsilon3)
          y2 = -halfPi + epsilon3;
      } else {
        if (y2 > halfPi - epsilon3)
          y2 = halfPi - epsilon3;
      }
      var r = f / pow2(tany(y2), n);
      return [r * sin(n * x2), f - r * cos(n * x2)];
    }
    project.invert = function(x2, y2) {
      var fy = f - y2, r = sign(n) * sqrt2(x2 * x2 + fy * fy), l = atan2(x2, abs(fy)) * sign(fy);
      if (fy * n < 0)
        l -= pi * sign(x2) * sign(fy);
      return [l / n, 2 * atan(pow2(f / r, 1 / n)) - halfPi];
    };
    return project;
  }
  function conicConformal_default() {
    return conicProjection(conicConformalRaw).scale(109.5).parallels([30, 30]);
  }
  var init_conicConformal = __esm(() => {
    init_math2();
    init_conic();
    init_mercator();
  });

  // node_modules/d3-geo/src/projection/equirectangular.js
  function equirectangularRaw(lambda, phi) {
    return [lambda, phi];
  }
  function equirectangular_default() {
    return projection(equirectangularRaw).scale(152.63);
  }
  var init_equirectangular = __esm(() => {
    init_projection();
    equirectangularRaw.invert = equirectangularRaw;
  });

  // node_modules/d3-geo/src/projection/conicEquidistant.js
  function conicEquidistantRaw(y07, y13) {
    var cy0 = cos(y07), n = y07 === y13 ? sin(y07) : (cy0 - cos(y13)) / (y13 - y07), g = cy0 / n + y07;
    if (abs(n) < epsilon3)
      return equirectangularRaw;
    function project(x2, y2) {
      var gy = g - y2, nx = n * x2;
      return [gy * sin(nx), g - gy * cos(nx)];
    }
    project.invert = function(x2, y2) {
      var gy = g - y2, l = atan2(x2, abs(gy)) * sign(gy);
      if (gy * n < 0)
        l -= pi * sign(x2) * sign(gy);
      return [l / n, g - sign(n) * sqrt2(x2 * x2 + gy * gy)];
    };
    return project;
  }
  function conicEquidistant_default() {
    return conicProjection(conicEquidistantRaw).scale(131.154).center([0, 13.9389]);
  }
  var init_conicEquidistant = __esm(() => {
    init_math2();
    init_conic();
    init_equirectangular();
  });

  // node_modules/d3-geo/src/projection/equalEarth.js
  function equalEarthRaw(lambda, phi) {
    var l = asin(M * sin(phi)), l2 = l * l, l6 = l2 * l2 * l2;
    return [
      lambda * cos(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))),
      l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2))
    ];
  }
  function equalEarth_default() {
    return projection(equalEarthRaw).scale(177.158);
  }
  var A1, A2, A3, A4, M, iterations;
  var init_equalEarth = __esm(() => {
    init_projection();
    init_math2();
    A1 = 1.340264;
    A2 = -0.081106;
    A3 = 893e-6;
    A4 = 3796e-6;
    M = sqrt2(3) / 2;
    iterations = 12;
    equalEarthRaw.invert = function(x2, y2) {
      var l = y2, l2 = l * l, l6 = l2 * l2 * l2;
      for (var i = 0, delta, fy, fpy; i < iterations; ++i) {
        fy = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)) - y2;
        fpy = A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2);
        l -= delta = fy / fpy, l2 = l * l, l6 = l2 * l2 * l2;
        if (abs(delta) < epsilon22)
          break;
      }
      return [
        M * x2 * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)) / cos(l),
        asin(sin(l) / M)
      ];
    };
  });

  // node_modules/d3-geo/src/projection/gnomonic.js
  function gnomonicRaw(x2, y2) {
    var cy = cos(y2), k3 = cos(x2) * cy;
    return [cy * sin(x2) / k3, sin(y2) / k3];
  }
  function gnomonic_default() {
    return projection(gnomonicRaw).scale(144.049).clipAngle(60);
  }
  var init_gnomonic = __esm(() => {
    init_math2();
    init_azimuthal();
    init_projection();
    gnomonicRaw.invert = azimuthalInvert(atan);
  });

  // node_modules/d3-geo/src/projection/identity.js
  function identity_default5() {
    var k3 = 1, tx = 0, ty = 0, sx = 1, sy = 1, alpha = 0, ca, sa, x07 = null, y07, x13, y13, kx3 = 1, ky2 = 1, transform = transformer4({
      point: function(x2, y2) {
        var p = projection2([x2, y2]);
        this.stream.point(p[0], p[1]);
      }
    }), postclip = identity_default4, cache, cacheStream;
    function reset() {
      kx3 = k3 * sx;
      ky2 = k3 * sy;
      cache = cacheStream = null;
      return projection2;
    }
    function projection2(p) {
      var x2 = p[0] * kx3, y2 = p[1] * ky2;
      if (alpha) {
        var t = y2 * ca - x2 * sa;
        x2 = x2 * ca + y2 * sa;
        y2 = t;
      }
      return [x2 + tx, y2 + ty];
    }
    projection2.invert = function(p) {
      var x2 = p[0] - tx, y2 = p[1] - ty;
      if (alpha) {
        var t = y2 * ca + x2 * sa;
        x2 = x2 * ca - y2 * sa;
        y2 = t;
      }
      return [x2 / kx3, y2 / ky2];
    };
    projection2.stream = function(stream) {
      return cache && cacheStream === stream ? cache : cache = transform(postclip(cacheStream = stream));
    };
    projection2.postclip = function(_) {
      return arguments.length ? (postclip = _, x07 = y07 = x13 = y13 = null, reset()) : postclip;
    };
    projection2.clipExtent = function(_) {
      return arguments.length ? (postclip = _ == null ? (x07 = y07 = x13 = y13 = null, identity_default4) : clipRectangle(x07 = +_[0][0], y07 = +_[0][1], x13 = +_[1][0], y13 = +_[1][1]), reset()) : x07 == null ? null : [[x07, y07], [x13, y13]];
    };
    projection2.scale = function(_) {
      return arguments.length ? (k3 = +_, reset()) : k3;
    };
    projection2.translate = function(_) {
      return arguments.length ? (tx = +_[0], ty = +_[1], reset()) : [tx, ty];
    };
    projection2.angle = function(_) {
      return arguments.length ? (alpha = _ % 360 * radians2, sa = sin(alpha), ca = cos(alpha), reset()) : alpha * degrees3;
    };
    projection2.reflectX = function(_) {
      return arguments.length ? (sx = _ ? -1 : 1, reset()) : sx < 0;
    };
    projection2.reflectY = function(_) {
      return arguments.length ? (sy = _ ? -1 : 1, reset()) : sy < 0;
    };
    projection2.fitExtent = function(extent, object3) {
      return fitExtent(projection2, extent, object3);
    };
    projection2.fitSize = function(size, object3) {
      return fitSize(projection2, size, object3);
    };
    projection2.fitWidth = function(width, object3) {
      return fitWidth(projection2, width, object3);
    };
    projection2.fitHeight = function(height, object3) {
      return fitHeight(projection2, height, object3);
    };
    return projection2;
  }
  var init_identity6 = __esm(() => {
    init_rectangle();
    init_identity5();
    init_transform2();
    init_fit();
    init_math2();
  });

  // node_modules/d3-geo/src/projection/naturalEarth1.js
  function naturalEarth1Raw(lambda, phi) {
    var phi2 = phi * phi, phi4 = phi2 * phi2;
    return [
      lambda * (0.8707 - 0.131979 * phi2 + phi4 * (-0.013791 + phi4 * (3971e-6 * phi2 - 1529e-6 * phi4))),
      phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 5916e-6 * phi4)))
    ];
  }
  function naturalEarth1_default() {
    return projection(naturalEarth1Raw).scale(175.295);
  }
  var init_naturalEarth1 = __esm(() => {
    init_projection();
    init_math2();
    naturalEarth1Raw.invert = function(x2, y2) {
      var phi = y2, i = 25, delta;
      do {
        var phi2 = phi * phi, phi4 = phi2 * phi2;
        phi -= delta = (phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 5916e-6 * phi4))) - y2) / (1.007226 + phi2 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi2 - 5916e-6 * 11 * phi4)));
      } while (abs(delta) > epsilon3 && --i > 0);
      return [
        x2 / (0.8707 + (phi2 = phi * phi) * (-0.131979 + phi2 * (-0.013791 + phi2 * phi2 * phi2 * (3971e-6 - 1529e-6 * phi2)))),
        phi
      ];
    };
  });

  // node_modules/d3-geo/src/projection/orthographic.js
  function orthographicRaw(x2, y2) {
    return [cos(y2) * sin(x2), sin(y2)];
  }
  function orthographic_default() {
    return projection(orthographicRaw).scale(249.5).clipAngle(90 + epsilon3);
  }
  var init_orthographic = __esm(() => {
    init_math2();
    init_azimuthal();
    init_projection();
    orthographicRaw.invert = azimuthalInvert(asin);
  });

  // node_modules/d3-geo/src/projection/stereographic.js
  function stereographicRaw(x2, y2) {
    var cy = cos(y2), k3 = 1 + cos(x2) * cy;
    return [cy * sin(x2) / k3, sin(y2) / k3];
  }
  function stereographic_default() {
    return projection(stereographicRaw).scale(250).clipAngle(142);
  }
  var init_stereographic = __esm(() => {
    init_math2();
    init_azimuthal();
    init_projection();
    stereographicRaw.invert = azimuthalInvert(function(z) {
      return 2 * atan(z);
    });
  });

  // node_modules/d3-geo/src/projection/transverseMercator.js
  function transverseMercatorRaw(lambda, phi) {
    return [log2(tan((halfPi + phi) / 2)), -lambda];
  }
  function transverseMercator_default() {
    var m = mercatorProjection(transverseMercatorRaw), center2 = m.center, rotate = m.rotate;
    m.center = function(_) {
      return arguments.length ? center2([-_[1], _[0]]) : (_ = center2(), [_[1], -_[0]]);
    };
    m.rotate = function(_) {
      return arguments.length ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
    };
    return rotate([0, 0, 90]).scale(159.155);
  }
  var init_transverseMercator = __esm(() => {
    init_math2();
    init_mercator();
    transverseMercatorRaw.invert = function(x2, y2) {
      return [-y2, 2 * atan(exp(x2)) - halfPi];
    };
  });

  // node_modules/d3-geo/src/index.js
  var src_exports7 = {};
  __export(src_exports7, {
    geoAlbers: () => albers_default,
    geoAlbersUsa: () => albersUsa_default,
    geoArea: () => area_default,
    geoAzimuthalEqualArea: () => azimuthalEqualArea_default,
    geoAzimuthalEqualAreaRaw: () => azimuthalEqualAreaRaw,
    geoAzimuthalEquidistant: () => azimuthalEquidistant_default,
    geoAzimuthalEquidistantRaw: () => azimuthalEquidistantRaw,
    geoBounds: () => bounds_default,
    geoCentroid: () => centroid_default,
    geoCircle: () => circle_default,
    geoClipAntimeridian: () => antimeridian_default,
    geoClipCircle: () => circle_default2,
    geoClipExtent: () => extent_default2,
    geoClipRectangle: () => clipRectangle,
    geoConicConformal: () => conicConformal_default,
    geoConicConformalRaw: () => conicConformalRaw,
    geoConicEqualArea: () => conicEqualArea_default,
    geoConicEqualAreaRaw: () => conicEqualAreaRaw,
    geoConicEquidistant: () => conicEquidistant_default,
    geoConicEquidistantRaw: () => conicEquidistantRaw,
    geoContains: () => contains_default,
    geoDistance: () => distance_default,
    geoEqualEarth: () => equalEarth_default,
    geoEqualEarthRaw: () => equalEarthRaw,
    geoEquirectangular: () => equirectangular_default,
    geoEquirectangularRaw: () => equirectangularRaw,
    geoGnomonic: () => gnomonic_default,
    geoGnomonicRaw: () => gnomonicRaw,
    geoGraticule: () => graticule,
    geoGraticule10: () => graticule10,
    geoIdentity: () => identity_default5,
    geoInterpolate: () => interpolate_default,
    geoLength: () => length_default,
    geoMercator: () => mercator_default,
    geoMercatorRaw: () => mercatorRaw,
    geoNaturalEarth1: () => naturalEarth1_default,
    geoNaturalEarth1Raw: () => naturalEarth1Raw,
    geoOrthographic: () => orthographic_default,
    geoOrthographicRaw: () => orthographicRaw,
    geoPath: () => path_default,
    geoProjection: () => projection,
    geoProjectionMutator: () => projectionMutator,
    geoRotation: () => rotation_default,
    geoStereographic: () => stereographic_default,
    geoStereographicRaw: () => stereographicRaw,
    geoStream: () => stream_default,
    geoTransform: () => transform_default,
    geoTransverseMercator: () => transverseMercator_default,
    geoTransverseMercatorRaw: () => transverseMercatorRaw
  });
  var init_src13 = __esm(() => {
    init_area();
    init_bounds();
    init_centroid();
    init_circle();
    init_antimeridian();
    init_circle2();
    init_extent2();
    init_rectangle();
    init_contains();
    init_distance();
    init_graticule();
    init_interpolate();
    init_length();
    init_path();
    init_albers();
    init_albersUsa();
    init_azimuthalEqualArea();
    init_azimuthalEquidistant();
    init_conicConformal();
    init_conicEqualArea();
    init_conicEquidistant();
    init_equalEarth();
    init_equirectangular();
    init_gnomonic();
    init_identity6();
    init_projection();
    init_mercator();
    init_naturalEarth1();
    init_orthographic();
    init_stereographic();
    init_transverseMercator();
    init_rotation();
    init_stream();
    init_transform2();
  });

  // node_modules/d3-timer/src/timer.js
  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }
  function clearNow() {
    clockNow = 0;
  }
  function Timer() {
    this._call = this._time = this._next = null;
  }
  function timer(callback2, delay2, time2) {
    var t = new Timer();
    t.restart(callback2, delay2, time2);
    return t;
  }
  function timerFlush() {
    now();
    ++frame;
    var t = taskHead, e3;
    while (t) {
      if ((e3 = clockNow - t._time) >= 0)
        t._call.call(void 0, e3);
      t = t._next;
    }
    --frame;
  }
  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout = 0;
    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }
  function poke() {
    var now2 = clock.now(), delay2 = now2 - clockLast;
    if (delay2 > pokeDelay)
      clockSkew -= delay2, clockLast = now2;
  }
  function nap() {
    var t03, t13 = taskHead, t22, time2 = Infinity;
    while (t13) {
      if (t13._call) {
        if (time2 > t13._time)
          time2 = t13._time;
        t03 = t13, t13 = t13._next;
      } else {
        t22 = t13._next, t13._next = null;
        t13 = t03 ? t03._next = t22 : taskHead = t22;
      }
    }
    taskTail = t03;
    sleep(time2);
  }
  function sleep(time2) {
    if (frame)
      return;
    if (timeout)
      timeout = clearTimeout(timeout);
    var delay2 = time2 - clockNow;
    if (delay2 > 24) {
      if (time2 < Infinity)
        timeout = setTimeout(wake, time2 - clock.now() - clockSkew);
      if (interval)
        interval = clearInterval(interval);
    } else {
      if (!interval)
        clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }
  var frame, timeout, interval, pokeDelay, taskHead, taskTail, clockLast, clockNow, clockSkew, clock, setFrame;
  var init_timer = __esm(() => {
    frame = 0;
    timeout = 0;
    interval = 0;
    pokeDelay = 1e3;
    clockLast = 0;
    clockNow = 0;
    clockSkew = 0;
    clock = typeof performance === "object" && performance.now ? performance : Date;
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
      setTimeout(f, 17);
    };
    Timer.prototype = timer.prototype = {
      constructor: Timer,
      restart: function(callback2, delay2, time2) {
        if (typeof callback2 !== "function")
          throw new TypeError("callback is not a function");
        time2 = (time2 == null ? now() : +time2) + (delay2 == null ? 0 : +delay2);
        if (!this._next && taskTail !== this) {
          if (taskTail)
            taskTail._next = this;
          else
            taskHead = this;
          taskTail = this;
        }
        this._call = callback2;
        this._time = time2;
        sleep();
      },
      stop: function() {
        if (this._call) {
          this._call = null;
          this._time = Infinity;
          sleep();
        }
      }
    };
  });

  // node_modules/d3-timer/src/timeout.js
  function timeout_default(callback2, delay2, time2) {
    var t = new Timer();
    delay2 = delay2 == null ? 0 : +delay2;
    t.restart((elapsed) => {
      t.stop();
      callback2(elapsed + delay2);
    }, delay2, time2);
    return t;
  }
  var init_timeout = __esm(() => {
    init_timer();
  });

  // node_modules/d3-timer/src/index.js
  var init_src14 = __esm(() => {
    init_timer();
    init_timeout();
  });

  // node_modules/d3-transition/src/transition/schedule.js
  function schedule_default(node, name, id3, index2, group2, timing) {
    var schedules = node.__transition;
    if (!schedules)
      node.__transition = {};
    else if (id3 in schedules)
      return;
    create(node, id3, {
      name,
      index: index2,
      group: group2,
      on: emptyOn,
      tween: emptyTween,
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null,
      state: CREATED
    });
  }
  function init2(node, id3) {
    var schedule = get2(node, id3);
    if (schedule.state > CREATED)
      throw new Error("too late; already scheduled");
    return schedule;
  }
  function set3(node, id3) {
    var schedule = get2(node, id3);
    if (schedule.state > STARTED)
      throw new Error("too late; already running");
    return schedule;
  }
  function get2(node, id3) {
    var schedule = node.__transition;
    if (!schedule || !(schedule = schedule[id3]))
      throw new Error("transition not found");
    return schedule;
  }
  function create(node, id3, self) {
    var schedules = node.__transition, tween;
    schedules[id3] = self;
    self.timer = timer(schedule, 0, self.time);
    function schedule(elapsed) {
      self.state = SCHEDULED;
      self.timer.restart(start2, self.delay, self.time);
      if (self.delay <= elapsed)
        start2(elapsed - self.delay);
    }
    function start2(elapsed) {
      var i, j, n, o;
      if (self.state !== SCHEDULED)
        return stop();
      for (i in schedules) {
        o = schedules[i];
        if (o.name !== self.name)
          continue;
        if (o.state === STARTED)
          return timeout_default(start2);
        if (o.state === RUNNING) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("interrupt", node, node.__data__, o.index, o.group);
          delete schedules[i];
        } else if (+i < id3) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("cancel", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }
      }
      timeout_default(function() {
        if (self.state === STARTED) {
          self.state = RUNNING;
          self.timer.restart(tick, self.delay, self.time);
          tick(elapsed);
        }
      });
      self.state = STARTING;
      self.on.call("start", node, node.__data__, self.index, self.group);
      if (self.state !== STARTING)
        return;
      self.state = STARTED;
      tween = new Array(n = self.tween.length);
      for (i = 0, j = -1; i < n; ++i) {
        if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
          tween[++j] = o;
        }
      }
      tween.length = j + 1;
    }
    function tick(elapsed) {
      var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1), i = -1, n = tween.length;
      while (++i < n) {
        tween[i].call(node, t);
      }
      if (self.state === ENDING) {
        self.on.call("end", node, node.__data__, self.index, self.group);
        stop();
      }
    }
    function stop() {
      self.state = ENDED;
      self.timer.stop();
      delete schedules[id3];
      for (var i in schedules)
        return;
      delete node.__transition;
    }
  }
  var emptyOn, emptyTween, CREATED, SCHEDULED, STARTING, STARTED, RUNNING, ENDING, ENDED;
  var init_schedule = __esm(() => {
    init_src11();
    init_src14();
    emptyOn = dispatch_default2("start", "end", "cancel", "interrupt");
    emptyTween = [];
    CREATED = 0;
    SCHEDULED = 1;
    STARTING = 2;
    STARTED = 3;
    RUNNING = 4;
    ENDING = 5;
    ENDED = 6;
  });

  // node_modules/d3-transition/src/interrupt.js
  function interrupt_default(node, name) {
    var schedules = node.__transition, schedule, active, empty3 = true, i;
    if (!schedules)
      return;
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule = schedules[i]).name !== name) {
        empty3 = false;
        continue;
      }
      active = schedule.state > STARTING && schedule.state < ENDING;
      schedule.state = ENDED;
      schedule.timer.stop();
      schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
      delete schedules[i];
    }
    if (empty3)
      delete node.__transition;
  }
  var init_interrupt = __esm(() => {
    init_schedule();
  });

  // node_modules/d3-transition/src/selection/interrupt.js
  function interrupt_default2(name) {
    return this.each(function() {
      interrupt_default(this, name);
    });
  }
  var init_interrupt2 = __esm(() => {
    init_interrupt();
  });

  // node_modules/d3-transition/src/transition/tween.js
  function tweenRemove(id3, name) {
    var tween0, tween1;
    return function() {
      var schedule = set3(this, id3), tween = schedule.tween;
      if (tween !== tween0) {
        tween1 = tween0 = tween;
        for (var i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1 = tween1.slice();
            tween1.splice(i, 1);
            break;
          }
        }
      }
      schedule.tween = tween1;
    };
  }
  function tweenFunction(id3, name, value) {
    var tween0, tween1;
    if (typeof value !== "function")
      throw new Error();
    return function() {
      var schedule = set3(this, id3), tween = schedule.tween;
      if (tween !== tween0) {
        tween1 = (tween0 = tween).slice();
        for (var t = {name, value}, i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1[i] = t;
            break;
          }
        }
        if (i === n)
          tween1.push(t);
      }
      schedule.tween = tween1;
    };
  }
  function tween_default(name, value) {
    var id3 = this._id;
    name += "";
    if (arguments.length < 2) {
      var tween = get2(this.node(), id3).tween;
      for (var i = 0, n = tween.length, t; i < n; ++i) {
        if ((t = tween[i]).name === name) {
          return t.value;
        }
      }
      return null;
    }
    return this.each((value == null ? tweenRemove : tweenFunction)(id3, name, value));
  }
  function tweenValue(transition2, name, value) {
    var id3 = transition2._id;
    transition2.each(function() {
      var schedule = set3(this, id3);
      (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    });
    return function(node) {
      return get2(node, id3).value[name];
    };
  }
  var init_tween = __esm(() => {
    init_schedule();
  });

  // node_modules/d3-transition/src/transition/interpolate.js
  function interpolate_default2(a2, b) {
    var c2;
    return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c2 = color(b)) ? (b = c2, rgb_default) : string_default)(a2, b);
  }
  var init_interpolate2 = __esm(() => {
    init_src2();
    init_src3();
  });

  // node_modules/d3-transition/src/transition/attr.js
  function attrRemove2(name) {
    return function() {
      this.removeAttribute(name);
    };
  }
  function attrRemoveNS2(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }
  function attrConstant2(name, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
      var string0 = this.getAttribute(name);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
  }
  function attrConstantNS2(fullname, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
      var string0 = this.getAttributeNS(fullname.space, fullname.local);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
  }
  function attrFunction2(name, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null)
        return void this.removeAttribute(name);
      string0 = this.getAttribute(name);
      string1 = value1 + "";
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }
  function attrFunctionNS2(fullname, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null)
        return void this.removeAttributeNS(fullname.space, fullname.local);
      string0 = this.getAttributeNS(fullname.space, fullname.local);
      string1 = value1 + "";
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }
  function attr_default2(name, value) {
    var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default2;
    return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i, value));
  }
  var init_attr2 = __esm(() => {
    init_src3();
    init_src();
    init_tween();
    init_interpolate2();
  });

  // node_modules/d3-transition/src/transition/attrTween.js
  function attrInterpolate(name, i) {
    return function(t) {
      this.setAttribute(name, i.call(this, t));
    };
  }
  function attrInterpolateNS(fullname, i) {
    return function(t) {
      this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
    };
  }
  function attrTweenNS(fullname, value) {
    var t03, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0)
        t03 = (i0 = i) && attrInterpolateNS(fullname, i);
      return t03;
    }
    tween._value = value;
    return tween;
  }
  function attrTween(name, value) {
    var t03, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0)
        t03 = (i0 = i) && attrInterpolate(name, i);
      return t03;
    }
    tween._value = value;
    return tween;
  }
  function attrTween_default(name, value) {
    var key = "attr." + name;
    if (arguments.length < 2)
      return (key = this.tween(key)) && key._value;
    if (value == null)
      return this.tween(key, null);
    if (typeof value !== "function")
      throw new Error();
    var fullname = namespace_default(name);
    return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
  }
  var init_attrTween = __esm(() => {
    init_src();
  });

  // node_modules/d3-transition/src/transition/delay.js
  function delayFunction(id3, value) {
    return function() {
      init2(this, id3).delay = +value.apply(this, arguments);
    };
  }
  function delayConstant(id3, value) {
    return value = +value, function() {
      init2(this, id3).delay = value;
    };
  }
  function delay_default(value) {
    var id3 = this._id;
    return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id3, value)) : get2(this.node(), id3).delay;
  }
  var init_delay = __esm(() => {
    init_schedule();
  });

  // node_modules/d3-transition/src/transition/duration.js
  function durationFunction(id3, value) {
    return function() {
      set3(this, id3).duration = +value.apply(this, arguments);
    };
  }
  function durationConstant(id3, value) {
    return value = +value, function() {
      set3(this, id3).duration = value;
    };
  }
  function duration_default(value) {
    var id3 = this._id;
    return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id3, value)) : get2(this.node(), id3).duration;
  }
  var init_duration2 = __esm(() => {
    init_schedule();
  });

  // node_modules/d3-transition/src/transition/ease.js
  function easeConstant(id3, value) {
    if (typeof value !== "function")
      throw new Error();
    return function() {
      set3(this, id3).ease = value;
    };
  }
  function ease_default(value) {
    var id3 = this._id;
    return arguments.length ? this.each(easeConstant(id3, value)) : get2(this.node(), id3).ease;
  }
  var init_ease = __esm(() => {
    init_schedule();
  });

  // node_modules/d3-transition/src/transition/easeVarying.js
  function easeVarying(id3, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (typeof v !== "function")
        throw new Error();
      set3(this, id3).ease = v;
    };
  }
  function easeVarying_default(value) {
    if (typeof value !== "function")
      throw new Error();
    return this.each(easeVarying(this._id, value));
  }
  var init_easeVarying = __esm(() => {
    init_schedule();
  });

  // node_modules/d3-transition/src/transition/filter.js
  function filter_default2(match) {
    if (typeof match !== "function")
      match = matcher_default(match);
    for (var groups2 = this._groups, m = groups2.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group2 = groups2[j], n = group2.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group2[i]) && match.call(node, node.__data__, i, group2)) {
          subgroup.push(node);
        }
      }
    }
    return new Transition(subgroups, this._parents, this._name, this._id);
  }
  var init_filter3 = __esm(() => {
    init_src();
    init_transition2();
  });

  // node_modules/d3-transition/src/transition/merge.js
  function merge_default2(transition2) {
    if (transition2._id !== this._id)
      throw new Error();
    for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge2 = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge2[i] = node;
        }
      }
    }
    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }
    return new Transition(merges, this._parents, this._name, this._id);
  }
  var init_merge3 = __esm(() => {
    init_transition2();
  });

  // node_modules/d3-transition/src/transition/on.js
  function start(name) {
    return (name + "").trim().split(/^|\s+/).every(function(t) {
      var i = t.indexOf(".");
      if (i >= 0)
        t = t.slice(0, i);
      return !t || t === "start";
    });
  }
  function onFunction(id3, name, listener) {
    var on0, on1, sit = start(name) ? init2 : set3;
    return function() {
      var schedule = sit(this, id3), on = schedule.on;
      if (on !== on0)
        (on1 = (on0 = on).copy()).on(name, listener);
      schedule.on = on1;
    };
  }
  function on_default2(name, listener) {
    var id3 = this._id;
    return arguments.length < 2 ? get2(this.node(), id3).on.on(name) : this.each(onFunction(id3, name, listener));
  }
  var init_on2 = __esm(() => {
    init_schedule();
  });

  // node_modules/d3-transition/src/transition/remove.js
  function removeFunction(id3) {
    return function() {
      var parent = this.parentNode;
      for (var i in this.__transition)
        if (+i !== id3)
          return;
      if (parent)
        parent.removeChild(this);
    };
  }
  function remove_default2() {
    return this.on("end.remove", removeFunction(this._id));
  }
  var init_remove2 = __esm(() => {
  });

  // node_modules/d3-transition/src/transition/select.js
  function select_default3(select) {
    var name = this._name, id3 = this._id;
    if (typeof select !== "function")
      select = selector_default(select);
    for (var groups2 = this._groups, m = groups2.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group2 = groups2[j], n = group2.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group2[i]) && (subnode = select.call(node, node.__data__, i, group2))) {
          if ("__data__" in node)
            subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
          schedule_default(subgroup[i], name, id3, i, subgroup, get2(node, id3));
        }
      }
    }
    return new Transition(subgroups, this._parents, name, id3);
  }
  var init_select3 = __esm(() => {
    init_src();
    init_transition2();
    init_schedule();
  });

  // node_modules/d3-transition/src/transition/selectAll.js
  function selectAll_default3(select) {
    var name = this._name, id3 = this._id;
    if (typeof select !== "function")
      select = selectorAll_default(select);
    for (var groups2 = this._groups, m = groups2.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group2 = groups2[j], n = group2.length, node, i = 0; i < n; ++i) {
        if (node = group2[i]) {
          for (var children2 = select.call(node, node.__data__, i, group2), child, inherit2 = get2(node, id3), k3 = 0, l = children2.length; k3 < l; ++k3) {
            if (child = children2[k3]) {
              schedule_default(child, name, id3, k3, children2, inherit2);
            }
          }
          subgroups.push(children2);
          parents.push(node);
        }
      }
    }
    return new Transition(subgroups, parents, name, id3);
  }
  var init_selectAll3 = __esm(() => {
    init_src();
    init_transition2();
    init_schedule();
  });

  // node_modules/d3-transition/src/transition/selection.js
  function selection_default2() {
    return new Selection2(this._groups, this._parents);
  }
  var Selection2;
  var init_selection2 = __esm(() => {
    init_src();
    Selection2 = selection_default.prototype.constructor;
  });

  // node_modules/d3-transition/src/transition/style.js
  function styleNull(name, interpolate) {
    var string00, string10, interpolate0;
    return function() {
      var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
    };
  }
  function styleRemove2(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }
  function styleConstant2(name, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
      var string0 = styleValue(this, name);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
  }
  function styleFunction2(name, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
      var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
      if (value1 == null)
        string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }
  function styleMaybeRemove(id3, name) {
    var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
    return function() {
      var schedule = set3(this, id3), on = schedule.on, listener = schedule.value[key] == null ? remove2 || (remove2 = styleRemove2(name)) : void 0;
      if (on !== on0 || listener0 !== listener)
        (on1 = (on0 = on).copy()).on(event, listener0 = listener);
      schedule.on = on1;
    };
  }
  function style_default2(name, value, priority) {
    var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default2;
    return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove2(name)) : typeof value === "function" ? this.styleTween(name, styleFunction2(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i, value), priority).on("end.style." + name, null);
  }
  var init_style2 = __esm(() => {
    init_src3();
    init_src();
    init_schedule();
    init_tween();
    init_interpolate2();
  });

  // node_modules/d3-transition/src/transition/styleTween.js
  function styleInterpolate(name, i, priority) {
    return function(t) {
      this.style.setProperty(name, i.call(this, t), priority);
    };
  }
  function styleTween(name, value, priority) {
    var t, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0)
        t = (i0 = i) && styleInterpolate(name, i, priority);
      return t;
    }
    tween._value = value;
    return tween;
  }
  function styleTween_default(name, value, priority) {
    var key = "style." + (name += "");
    if (arguments.length < 2)
      return (key = this.tween(key)) && key._value;
    if (value == null)
      return this.tween(key, null);
    if (typeof value !== "function")
      throw new Error();
    return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
  }
  var init_styleTween = __esm(() => {
  });

  // node_modules/d3-transition/src/transition/text.js
  function textConstant2(value) {
    return function() {
      this.textContent = value;
    };
  }
  function textFunction2(value) {
    return function() {
      var value1 = value(this);
      this.textContent = value1 == null ? "" : value1;
    };
  }
  function text_default2(value) {
    return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
  }
  var init_text2 = __esm(() => {
    init_tween();
  });

  // node_modules/d3-transition/src/transition/textTween.js
  function textInterpolate(i) {
    return function(t) {
      this.textContent = i.call(this, t);
    };
  }
  function textTween(value) {
    var t03, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0)
        t03 = (i0 = i) && textInterpolate(i);
      return t03;
    }
    tween._value = value;
    return tween;
  }
  function textTween_default(value) {
    var key = "text";
    if (arguments.length < 1)
      return (key = this.tween(key)) && key._value;
    if (value == null)
      return this.tween(key, null);
    if (typeof value !== "function")
      throw new Error();
    return this.tween(key, textTween(value));
  }
  var init_textTween = __esm(() => {
  });

  // node_modules/d3-transition/src/transition/transition.js
  function transition_default() {
    var name = this._name, id0 = this._id, id1 = newId();
    for (var groups2 = this._groups, m = groups2.length, j = 0; j < m; ++j) {
      for (var group2 = groups2[j], n = group2.length, node, i = 0; i < n; ++i) {
        if (node = group2[i]) {
          var inherit2 = get2(node, id0);
          schedule_default(node, name, id1, i, group2, {
            time: inherit2.time + inherit2.delay + inherit2.duration,
            delay: 0,
            duration: inherit2.duration,
            ease: inherit2.ease
          });
        }
      }
    }
    return new Transition(groups2, this._parents, name, id1);
  }
  var init_transition = __esm(() => {
    init_transition2();
    init_schedule();
  });

  // node_modules/d3-transition/src/transition/end.js
  function end_default() {
    var on0, on1, that = this, id3 = that._id, size = that.size();
    return new Promise(function(resolve, reject) {
      var cancel = {value: reject}, end = {value: function() {
        if (--size === 0)
          resolve();
      }};
      that.each(function() {
        var schedule = set3(this, id3), on = schedule.on;
        if (on !== on0) {
          on1 = (on0 = on).copy();
          on1._.cancel.push(cancel);
          on1._.interrupt.push(cancel);
          on1._.end.push(end);
        }
        schedule.on = on1;
      });
      if (size === 0)
        resolve();
    });
  }
  var init_end = __esm(() => {
    init_schedule();
  });

  // node_modules/d3-transition/src/transition/index.js
  function Transition(groups2, parents, name, id3) {
    this._groups = groups2;
    this._parents = parents;
    this._name = name;
    this._id = id3;
  }
  function transition(name) {
    return selection_default().transition(name);
  }
  function newId() {
    return ++id2;
  }
  var id2, selection_prototype;
  var init_transition2 = __esm(() => {
    init_src();
    init_attr2();
    init_attrTween();
    init_delay();
    init_duration2();
    init_ease();
    init_easeVarying();
    init_filter3();
    init_merge3();
    init_on2();
    init_remove2();
    init_select3();
    init_selectAll3();
    init_selection2();
    init_style2();
    init_styleTween();
    init_text2();
    init_textTween();
    init_transition();
    init_tween();
    init_end();
    id2 = 0;
    selection_prototype = selection_default.prototype;
    Transition.prototype = transition.prototype = {
      constructor: Transition,
      select: select_default3,
      selectAll: selectAll_default3,
      selectChild: selection_prototype.selectChild,
      selectChildren: selection_prototype.selectChildren,
      filter: filter_default2,
      merge: merge_default2,
      selection: selection_default2,
      transition: transition_default,
      call: selection_prototype.call,
      nodes: selection_prototype.nodes,
      node: selection_prototype.node,
      size: selection_prototype.size,
      empty: selection_prototype.empty,
      each: selection_prototype.each,
      on: on_default2,
      attr: attr_default2,
      attrTween: attrTween_default,
      style: style_default2,
      styleTween: styleTween_default,
      text: text_default2,
      textTween: textTween_default,
      remove: remove_default2,
      tween: tween_default,
      delay: delay_default,
      duration: duration_default,
      ease: ease_default,
      easeVarying: easeVarying_default,
      end: end_default,
      [Symbol.iterator]: selection_prototype[Symbol.iterator]
    };
  });

  // node_modules/d3-ease/src/cubic.js
  function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  }
  var init_cubic = __esm(() => {
  });

  // node_modules/d3-ease/src/index.js
  var init_src15 = __esm(() => {
    init_cubic();
  });

  // node_modules/d3-transition/src/selection/transition.js
  function inherit(node, id3) {
    var timing;
    while (!(timing = node.__transition) || !(timing = timing[id3])) {
      if (!(node = node.parentNode)) {
        throw new Error(`transition ${id3} not found`);
      }
    }
    return timing;
  }
  function transition_default2(name) {
    var id3, timing;
    if (name instanceof Transition) {
      id3 = name._id, name = name._name;
    } else {
      id3 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
    }
    for (var groups2 = this._groups, m = groups2.length, j = 0; j < m; ++j) {
      for (var group2 = groups2[j], n = group2.length, node, i = 0; i < n; ++i) {
        if (node = group2[i]) {
          schedule_default(node, name, id3, i, group2, timing || inherit(node, id3));
        }
      }
    }
    return new Transition(groups2, this._parents, name, id3);
  }
  var defaultTiming;
  var init_transition3 = __esm(() => {
    init_transition2();
    init_schedule();
    init_src15();
    init_src14();
    defaultTiming = {
      time: null,
      delay: 0,
      duration: 250,
      ease: cubicInOut
    };
  });

  // node_modules/d3-transition/src/selection/index.js
  var init_selection3 = __esm(() => {
    init_src();
    init_interrupt2();
    init_transition3();
    selection_default.prototype.interrupt = interrupt_default2;
    selection_default.prototype.transition = transition_default2;
  });

  // node_modules/d3-transition/src/active.js
  function active_default(node, name) {
    var schedules = node.__transition, schedule, i;
    if (schedules) {
      name = name == null ? null : name + "";
      for (i in schedules) {
        if ((schedule = schedules[i]).state > SCHEDULED && schedule.name === name) {
          return new Transition([[node]], root2, name, +i);
        }
      }
    }
    return null;
  }
  var root2;
  var init_active = __esm(() => {
    init_transition2();
    init_schedule();
    root2 = [null];
  });

  // node_modules/d3-transition/src/index.js
  var src_exports8 = {};
  __export(src_exports8, {
    active: () => active_default,
    interrupt: () => interrupt_default,
    transition: () => transition
  });
  var init_src16 = __esm(() => {
    init_selection3();
    init_transition2();
    init_active();
    init_interrupt();
  });

  // node_modules/d3-geo-projection/src/math.js
  function sinci(x2) {
    return x2 ? x2 / Math.sin(x2) : 1;
  }
  function asin2(x2) {
    return x2 > 1 ? halfPi2 : x2 < -1 ? -halfPi2 : Math.asin(x2);
  }
  function acos2(x2) {
    return x2 > 1 ? 0 : x2 < -1 ? pi2 : Math.acos(x2);
  }
  function sqrt3(x2) {
    return x2 > 0 ? Math.sqrt(x2) : 0;
  }
  function tanh2(x2) {
    x2 = exp2(2 * x2);
    return (x2 - 1) / (x2 + 1);
  }
  function sinh2(x2) {
    return (exp2(x2) - exp2(-x2)) / 2;
  }
  function cosh2(x2) {
    return (exp2(x2) + exp2(-x2)) / 2;
  }
  function arsinh(x2) {
    return log3(x2 + sqrt3(x2 * x2 + 1));
  }
  function arcosh(x2) {
    return log3(x2 + sqrt3(x2 * x2 - 1));
  }
  var abs2, atan3, atan22, cos2, exp2, floor, log3, max2, min2, pow3, round, sign2, sin2, tan2, epsilon4, epsilon23, pi2, halfPi2, quarterPi2, sqrt1_2, sqrt22, sqrtPi, tau2, degrees4, radians3;
  var init_math3 = __esm(() => {
    abs2 = Math.abs;
    atan3 = Math.atan;
    atan22 = Math.atan2;
    cos2 = Math.cos;
    exp2 = Math.exp;
    floor = Math.floor;
    log3 = Math.log;
    max2 = Math.max;
    min2 = Math.min;
    pow3 = Math.pow;
    round = Math.round;
    sign2 = Math.sign || function(x2) {
      return x2 > 0 ? 1 : x2 < 0 ? -1 : 0;
    };
    sin2 = Math.sin;
    tan2 = Math.tan;
    epsilon4 = 1e-6;
    epsilon23 = 1e-12;
    pi2 = Math.PI;
    halfPi2 = pi2 / 2;
    quarterPi2 = pi2 / 4;
    sqrt1_2 = Math.SQRT1_2;
    sqrt22 = sqrt3(2);
    sqrtPi = sqrt3(pi2);
    tau2 = pi2 * 2;
    degrees4 = 180 / pi2;
    radians3 = pi2 / 180;
  });

  // node_modules/d3-geo-projection/src/airy.js
  function airyRaw(beta) {
    var tanBeta_2 = tan2(beta / 2), b = 2 * log3(cos2(beta / 2)) / (tanBeta_2 * tanBeta_2);
    function forward(x2, y2) {
      var cosx = cos2(x2), cosy = cos2(y2), siny = sin2(y2), cosz = cosy * cosx, k3 = -((1 - cosz ? log3((1 + cosz) / 2) / (1 - cosz) : -0.5) + b / (1 + cosz));
      return [k3 * cosy * sin2(x2), k3 * siny];
    }
    forward.invert = function(x2, y2) {
      var r = sqrt3(x2 * x2 + y2 * y2), z = -beta / 2, i = 50, delta;
      if (!r)
        return [0, 0];
      do {
        var z_2 = z / 2, cosz_2 = cos2(z_2), sinz_2 = sin2(z_2), tanz_2 = sinz_2 / cosz_2, lnsecz_2 = -log3(abs2(cosz_2));
        z -= delta = (2 / tanz_2 * lnsecz_2 - b * tanz_2 - r) / (-lnsecz_2 / (sinz_2 * sinz_2) + 1 - b / (2 * cosz_2 * cosz_2)) * (cosz_2 < 0 ? 0.7 : 1);
      } while (abs2(delta) > epsilon4 && --i > 0);
      var sinz = sin2(z);
      return [atan22(x2 * sinz, r * cos2(z)), asin2(y2 * sinz / r)];
    };
    return forward;
  }
  function airy_default() {
    var beta = halfPi2, m = projectionMutator(airyRaw), p = m(beta);
    p.radius = function(_) {
      return arguments.length ? m(beta = _ * radians3) : beta * degrees4;
    };
    return p.scale(179.976).clipAngle(147);
  }
  var init_airy = __esm(() => {
    init_src13();
    init_math3();
  });

  // node_modules/d3-geo-projection/src/aitoff.js
  function aitoffRaw(x2, y2) {
    var cosy = cos2(y2), sincia = sinci(acos2(cosy * cos2(x2 /= 2)));
    return [2 * cosy * sin2(x2) * sincia, sin2(y2) * sincia];
  }
  function aitoff_default() {
    return projection(aitoffRaw).scale(152.63);
  }
  var init_aitoff = __esm(() => {
    init_src13();
    init_math3();
    aitoffRaw.invert = function(x2, y2) {
      if (x2 * x2 + 4 * y2 * y2 > pi2 * pi2 + epsilon4)
        return;
      var x13 = x2, y13 = y2, i = 25;
      do {
        var sinx = sin2(x13), sinx_2 = sin2(x13 / 2), cosx_2 = cos2(x13 / 2), siny = sin2(y13), cosy = cos2(y13), sin_2y = sin2(2 * y13), sin2y = siny * siny, cos2y = cosy * cosy, sin2x_2 = sinx_2 * sinx_2, c2 = 1 - cos2y * cosx_2 * cosx_2, e3 = c2 ? acos2(cosy * cosx_2) * sqrt3(f = 1 / c2) : f = 0, f, fx = 2 * e3 * cosy * sinx_2 - x2, fy = e3 * siny - y2, dxdx = f * (cos2y * sin2x_2 + e3 * cosy * cosx_2 * sin2y), dxdy = f * (0.5 * sinx * sin_2y - e3 * 2 * siny * sinx_2), dydx = f * 0.25 * (sin_2y * sinx_2 - e3 * siny * cos2y * sinx), dydy = f * (sin2y * cosx_2 + e3 * sin2x_2 * cosy), z = dxdy * dydx - dydy * dxdx;
        if (!z)
          break;
        var dx = (fy * dxdy - fx * dydy) / z, dy = (fx * dydx - fy * dxdx) / z;
        x13 -= dx, y13 -= dy;
      } while ((abs2(dx) > epsilon4 || abs2(dy) > epsilon4) && --i > 0);
      return [x13, y13];
    };
  });

  // node_modules/d3-geo-projection/src/armadillo.js
  function armadilloRaw(phi03) {
    var sinPhi03 = sin2(phi03), cosPhi03 = cos2(phi03), sPhi0 = phi03 >= 0 ? 1 : -1, tanPhi0 = tan2(sPhi0 * phi03), k3 = (1 + sinPhi03 - cosPhi03) / 2;
    function forward(lambda, phi) {
      var cosPhi = cos2(phi), cosLambda = cos2(lambda /= 2);
      return [
        (1 + cosPhi) * sin2(lambda),
        (sPhi0 * phi > -atan22(cosLambda, tanPhi0) - 1e-3 ? 0 : -sPhi0 * 10) + k3 + sin2(phi) * cosPhi03 - (1 + cosPhi) * sinPhi03 * cosLambda
      ];
    }
    forward.invert = function(x2, y2) {
      var lambda = 0, phi = 0, i = 50;
      do {
        var cosLambda = cos2(lambda), sinLambda = sin2(lambda), cosPhi = cos2(phi), sinPhi = sin2(phi), A6 = 1 + cosPhi, fx = A6 * sinLambda - x2, fy = k3 + sinPhi * cosPhi03 - A6 * sinPhi03 * cosLambda - y2, dxdLambda = A6 * cosLambda / 2, dxdPhi = -sinLambda * sinPhi, dydLambda = sinPhi03 * A6 * sinLambda / 2, dydPhi = cosPhi03 * cosPhi + sinPhi03 * cosLambda * sinPhi, denominator = dxdPhi * dydLambda - dydPhi * dxdLambda, dLambda = (fy * dxdPhi - fx * dydPhi) / denominator / 2, dPhi = (fx * dydLambda - fy * dxdLambda) / denominator;
        if (abs2(dPhi) > 2)
          dPhi /= 2;
        lambda -= dLambda, phi -= dPhi;
      } while ((abs2(dLambda) > epsilon4 || abs2(dPhi) > epsilon4) && --i > 0);
      return sPhi0 * phi > -atan22(cos2(lambda), tanPhi0) - 1e-3 ? [lambda * 2, phi] : null;
    };
    return forward;
  }
  function armadillo_default() {
    var phi03 = 20 * radians3, sPhi0 = phi03 >= 0 ? 1 : -1, tanPhi0 = tan2(sPhi0 * phi03), m = projectionMutator(armadilloRaw), p = m(phi03), stream_ = p.stream;
    p.parallel = function(_) {
      if (!arguments.length)
        return phi03 * degrees4;
      tanPhi0 = tan2((sPhi0 = (phi03 = _ * radians3) >= 0 ? 1 : -1) * phi03);
      return m(phi03);
    };
    p.stream = function(stream) {
      var rotate = p.rotate(), rotateStream = stream_(stream), sphereStream = (p.rotate([0, 0]), stream_(stream)), precision = p.precision();
      p.rotate(rotate);
      rotateStream.sphere = function() {
        sphereStream.polygonStart(), sphereStream.lineStart();
        for (var lambda = sPhi0 * -180; sPhi0 * lambda < 180; lambda += sPhi0 * 90)
          sphereStream.point(lambda, sPhi0 * 90);
        if (phi03)
          while (sPhi0 * (lambda -= 3 * sPhi0 * precision) >= -180) {
            sphereStream.point(lambda, sPhi0 * -atan22(cos2(lambda * radians3 / 2), tanPhi0) * degrees4);
          }
        sphereStream.lineEnd(), sphereStream.polygonEnd();
      };
      return rotateStream;
    };
    return p.scale(218.695).center([0, 28.0974]);
  }
  var init_armadillo = __esm(() => {
    init_src13();
    init_math3();
  });

  // node_modules/d3-geo-projection/src/august.js
  function augustRaw(lambda, phi) {
    var tanPhi = tan2(phi / 2), k3 = sqrt3(1 - tanPhi * tanPhi), c2 = 1 + k3 * cos2(lambda /= 2), x2 = sin2(lambda) * k3 / c2, y2 = tanPhi / c2, x22 = x2 * x2, y22 = y2 * y2;
    return [
      4 / 3 * x2 * (3 + x22 - 3 * y22),
      4 / 3 * y2 * (3 + 3 * x22 - y22)
    ];
  }
  function august_default() {
    return projection(augustRaw).scale(66.1603);
  }
  var init_august = __esm(() => {
    init_src13();
    init_math3();
    augustRaw.invert = function(x2, y2) {
      x2 *= 3 / 8, y2 *= 3 / 8;
      if (!x2 && abs2(y2) > 1)
        return null;
      var x22 = x2 * x2, y22 = y2 * y2, s2 = 1 + x22 + y22, sin3Eta = sqrt3((s2 - sqrt3(s2 * s2 - 4 * y2 * y2)) / 2), eta = asin2(sin3Eta) / 3, xi = sin3Eta ? arcosh(abs2(y2 / sin3Eta)) / 3 : arsinh(abs2(x2)) / 3, cosEta = cos2(eta), coshXi = cosh2(xi), d = coshXi * coshXi - cosEta * cosEta;
      return [
        sign2(x2) * 2 * atan22(sinh2(xi) * cosEta, 0.25 - d),
        sign2(y2) * 2 * atan22(coshXi * sin2(eta), 0.25 + d)
      ];
    };
  });

  // node_modules/d3-geo-projection/src/baker.js
  function bakerRaw(lambda, phi) {
    var phi03 = abs2(phi);
    return phi03 < quarterPi2 ? [lambda, log3(tan2(quarterPi2 + phi / 2))] : [lambda * cos2(phi03) * (2 * sqrt22 - 1 / sin2(phi03)), sign2(phi) * (2 * sqrt22 * (phi03 - quarterPi2) - log3(tan2(phi03 / 2)))];
  }
  function baker_default() {
    return projection(bakerRaw).scale(112.314);
  }
  var sqrt8, phi02;
  var init_baker = __esm(() => {
    init_src13();
    init_math3();
    sqrt8 = sqrt3(8);
    phi02 = log3(1 + sqrt22);
    bakerRaw.invert = function(x2, y2) {
      if ((y07 = abs2(y2)) < phi02)
        return [x2, 2 * atan3(exp2(y2)) - halfPi2];
      var phi = quarterPi2, i = 25, delta, y07;
      do {
        var cosPhi_2 = cos2(phi / 2), tanPhi_2 = tan2(phi / 2);
        phi -= delta = (sqrt8 * (phi - quarterPi2) - log3(tanPhi_2) - y07) / (sqrt8 - cosPhi_2 * cosPhi_2 / (2 * tanPhi_2));
      } while (abs2(delta) > epsilon23 && --i > 0);
      return [x2 / (cos2(phi) * (sqrt8 - 1 / sin2(phi))), sign2(y2) * phi];
    };
  });

  // node_modules/d3-geo-projection/src/berghaus.js
  function berghausRaw(lobes8) {
    var k3 = 2 * pi2 / lobes8;
    function forward(lambda, phi) {
      var p = azimuthalEquidistantRaw(lambda, phi);
      if (abs2(lambda) > halfPi2) {
        var theta = atan22(p[1], p[0]), r = sqrt3(p[0] * p[0] + p[1] * p[1]), theta0 = k3 * round((theta - halfPi2) / k3) + halfPi2, alpha = atan22(sin2(theta -= theta0), 2 - cos2(theta));
        theta = theta0 + asin2(pi2 / r * sin2(alpha)) - alpha;
        p[0] = r * cos2(theta);
        p[1] = r * sin2(theta);
      }
      return p;
    }
    forward.invert = function(x2, y2) {
      var r = sqrt3(x2 * x2 + y2 * y2);
      if (r > halfPi2) {
        var theta = atan22(y2, x2), theta0 = k3 * round((theta - halfPi2) / k3) + halfPi2, s2 = theta > theta0 ? -1 : 1, A6 = r * cos2(theta0 - theta), cotAlpha = 1 / tan2(s2 * acos2((A6 - pi2) / sqrt3(pi2 * (pi2 - 2 * A6) + r * r)));
        theta = theta0 + 2 * atan3((cotAlpha + s2 * sqrt3(cotAlpha * cotAlpha - 3)) / 3);
        x2 = r * cos2(theta), y2 = r * sin2(theta);
      }
      return azimuthalEquidistantRaw.invert(x2, y2);
    };
    return forward;
  }
  function berghaus_default() {
    var lobes8 = 5, m = projectionMutator(berghausRaw), p = m(lobes8), projectionStream = p.stream, epsilon8 = 0.01, cr = -cos2(epsilon8 * radians3), sr = sin2(epsilon8 * radians3);
    p.lobes = function(_) {
      return arguments.length ? m(lobes8 = +_) : lobes8;
    };
    p.stream = function(stream) {
      var rotate = p.rotate(), rotateStream = projectionStream(stream), sphereStream = (p.rotate([0, 0]), projectionStream(stream));
      p.rotate(rotate);
      rotateStream.sphere = function() {
        sphereStream.polygonStart(), sphereStream.lineStart();
        for (var i = 0, delta = 360 / lobes8, delta0 = 2 * pi2 / lobes8, phi = 90 - 180 / lobes8, phi03 = halfPi2; i < lobes8; ++i, phi -= delta, phi03 -= delta0) {
          sphereStream.point(atan22(sr * cos2(phi03), cr) * degrees4, asin2(sr * sin2(phi03)) * degrees4);
          if (phi < -90) {
            sphereStream.point(-90, -180 - phi - epsilon8);
            sphereStream.point(-90, -180 - phi + epsilon8);
          } else {
            sphereStream.point(90, phi + epsilon8);
            sphereStream.point(90, phi - epsilon8);
          }
        }
        sphereStream.lineEnd(), sphereStream.polygonEnd();
      };
      return rotateStream;
    };
    return p.scale(87.8076).center([0, 17.1875]).clipAngle(180 - 1e-3);
  }
  var init_berghaus = __esm(() => {
    init_src13();
    init_math3();
  });

  // node_modules/d3-geo-projection/src/hammer.js
  function hammerRaw(A6, B3) {
    if (arguments.length < 2)
      B3 = A6;
    if (B3 === 1)
      return azimuthalEqualAreaRaw;
    if (B3 === Infinity)
      return hammerQuarticAuthalicRaw;
    function forward(lambda, phi) {
      var coordinates2 = azimuthalEqualAreaRaw(lambda / B3, phi);
      coordinates2[0] *= A6;
      return coordinates2;
    }
    forward.invert = function(x2, y2) {
      var coordinates2 = azimuthalEqualAreaRaw.invert(x2 / A6, y2);
      coordinates2[0] *= B3;
      return coordinates2;
    };
    return forward;
  }
  function hammerQuarticAuthalicRaw(lambda, phi) {
    return [
      lambda * cos2(phi) / cos2(phi /= 2),
      2 * sin2(phi)
    ];
  }
  function hammer_default() {
    var B3 = 2, m = projectionMutator(hammerRaw), p = m(B3);
    p.coefficient = function(_) {
      if (!arguments.length)
        return B3;
      return m(B3 = +_);
    };
    return p.scale(169.529);
  }
  var init_hammer = __esm(() => {
    init_src13();
    init_math3();
    hammerQuarticAuthalicRaw.invert = function(x2, y2) {
      var phi = 2 * asin2(y2 / 2);
      return [
        x2 * cos2(phi / 2) / cos2(phi),
        phi
      ];
    };
  });

  // node_modules/d3-geo-projection/src/newton.js
  function solve(f, y2, x2) {
    var steps = 100, delta, f0, f1;
    x2 = x2 === void 0 ? 0 : +x2;
    y2 = +y2;
    do {
      f0 = f(x2);
      f1 = f(x2 + epsilon4);
      if (f0 === f1)
        f1 = f0 + epsilon4;
      x2 -= delta = -1 * epsilon4 * (f0 - y2) / (f0 - f1);
    } while (steps-- > 0 && abs2(delta) > epsilon4);
    return steps < 0 ? NaN : x2;
  }
  function solve2d(f, MAX_ITERATIONS, eps) {
    if (MAX_ITERATIONS === void 0)
      MAX_ITERATIONS = 40;
    if (eps === void 0)
      eps = epsilon23;
    return function(x2, y2, a2, b) {
      var err2, da, db;
      a2 = a2 === void 0 ? 0 : +a2;
      b = b === void 0 ? 0 : +b;
      for (var i = 0; i < MAX_ITERATIONS; i++) {
        var p = f(a2, b), tx = p[0] - x2, ty = p[1] - y2;
        if (abs2(tx) < eps && abs2(ty) < eps)
          break;
        var h = tx * tx + ty * ty;
        if (h > err2) {
          a2 -= da /= 2;
          b -= db /= 2;
          continue;
        }
        err2 = h;
        var ea = (a2 > 0 ? -1 : 1) * eps, eb = (b > 0 ? -1 : 1) * eps, pa = f(a2 + ea, b), pb = f(a2, b + eb), dxa = (pa[0] - p[0]) / ea, dya = (pa[1] - p[1]) / ea, dxb = (pb[0] - p[0]) / eb, dyb = (pb[1] - p[1]) / eb, D2 = dyb * dxa - dya * dxb, l = (abs2(D2) < 0.5 ? 0.5 : 1) / D2;
        da = (ty * dxb - tx * dyb) * l;
        db = (tx * dya - ty * dxa) * l;
        a2 += da;
        b += db;
        if (abs2(da) < eps && abs2(db) < eps)
          break;
      }
      return [a2, b];
    };
  }
  var init_newton = __esm(() => {
    init_math3();
  });

  // node_modules/d3-geo-projection/src/bertin.js
  function bertin1953Raw() {
    var hammer = hammerRaw(1.68, 2), fu = 1.4, k3 = 12;
    function forward(lambda, phi) {
      if (lambda + phi < -fu) {
        var u = (lambda - phi + 1.6) * (lambda + phi + fu) / 8;
        lambda += u;
        phi -= 0.8 * u * sin2(phi + pi2 / 2);
      }
      var r = hammer(lambda, phi);
      var d = (1 - cos2(lambda * phi)) / k3;
      if (r[1] < 0) {
        r[0] *= 1 + d;
      }
      if (r[1] > 0) {
        r[1] *= 1 + d / 1.5 * r[0] * r[0];
      }
      return r;
    }
    forward.invert = solve2d(forward);
    return forward;
  }
  function bertin_default() {
    return projection(bertin1953Raw()).rotate([-16.5, -42]).scale(176.57).center([7.93, 0.09]);
  }
  var init_bertin = __esm(() => {
    init_src13();
    init_hammer();
    init_math3();
    init_newton();
  });

  // node_modules/d3-geo-projection/src/mollweide.js
  function mollweideBromleyTheta(cp, phi) {
    var cpsinPhi = cp * sin2(phi), i = 30, delta;
    do
      phi -= delta = (phi + sin2(phi) - cpsinPhi) / (1 + cos2(phi));
    while (abs2(delta) > epsilon4 && --i > 0);
    return phi / 2;
  }
  function mollweideBromleyRaw(cx, cy, cp) {
    function forward(lambda, phi) {
      return [cx * lambda * cos2(phi = mollweideBromleyTheta(cp, phi)), cy * sin2(phi)];
    }
    forward.invert = function(x2, y2) {
      return y2 = asin2(y2 / cy), [x2 / (cx * cos2(y2)), asin2((2 * y2 + sin2(2 * y2)) / cp)];
    };
    return forward;
  }
  function mollweide_default() {
    return projection(mollweideRaw).scale(169.529);
  }
  var mollweideRaw;
  var init_mollweide = __esm(() => {
    init_src13();
    init_math3();
    mollweideRaw = mollweideBromleyRaw(sqrt22 / halfPi2, sqrt22, pi2);
  });

  // node_modules/d3-geo-projection/src/boggs.js
  function boggsRaw(lambda, phi) {
    var theta = mollweideBromleyTheta(pi2, phi);
    return [k * lambda / (1 / cos2(phi) + w / cos2(theta)), (phi + sqrt22 * sin2(theta)) / k];
  }
  function boggs_default() {
    return projection(boggsRaw).scale(160.857);
  }
  var k, w;
  var init_boggs = __esm(() => {
    init_src13();
    init_mollweide();
    init_math3();
    k = 2.00276;
    w = 1.11072;
    boggsRaw.invert = function(x2, y2) {
      var ky2 = k * y2, theta = y2 < 0 ? -quarterPi2 : quarterPi2, i = 25, delta, phi;
      do {
        phi = ky2 - sqrt22 * sin2(theta);
        theta -= delta = (sin2(2 * theta) + 2 * theta - pi2 * sin2(phi)) / (2 * cos2(2 * theta) + 2 + pi2 * cos2(phi) * sqrt22 * cos2(theta));
      } while (abs2(delta) > epsilon4 && --i > 0);
      phi = ky2 - sqrt22 * sin2(theta);
      return [x2 * (1 / cos2(phi) + w / cos2(theta)) / k, phi];
    };
  });

  // node_modules/d3-geo-projection/src/parallel1.js
  function parallel1_default(projectAt) {
    var phi03 = 0, m = projectionMutator(projectAt), p = m(phi03);
    p.parallel = function(_) {
      return arguments.length ? m(phi03 = _ * radians3) : phi03 * degrees4;
    };
    return p;
  }
  var init_parallel1 = __esm(() => {
    init_src13();
    init_math3();
  });

  // node_modules/d3-geo-projection/src/sinusoidal.js
  function sinusoidalRaw(lambda, phi) {
    return [lambda * cos2(phi), phi];
  }
  function sinusoidal_default() {
    return projection(sinusoidalRaw).scale(152.63);
  }
  var init_sinusoidal = __esm(() => {
    init_src13();
    init_math3();
    sinusoidalRaw.invert = function(x2, y2) {
      return [x2 / cos2(y2), y2];
    };
  });

  // node_modules/d3-geo-projection/src/bonne.js
  function bonneRaw(phi03) {
    if (!phi03)
      return sinusoidalRaw;
    var cotPhi0 = 1 / tan2(phi03);
    function forward(lambda, phi) {
      var rho = cotPhi0 + phi03 - phi, e3 = rho ? lambda * cos2(phi) / rho : rho;
      return [rho * sin2(e3), cotPhi0 - rho * cos2(e3)];
    }
    forward.invert = function(x2, y2) {
      var rho = sqrt3(x2 * x2 + (y2 = cotPhi0 - y2) * y2), phi = cotPhi0 + phi03 - rho;
      return [rho / cos2(phi) * atan22(x2, y2), phi];
    };
    return forward;
  }
  function bonne_default() {
    return parallel1_default(bonneRaw).scale(123.082).center([0, 26.1441]).parallel(45);
  }
  var init_bonne = __esm(() => {
    init_parallel1();
    init_math3();
    init_sinusoidal();
  });

  // node_modules/d3-geo-projection/src/bottomley.js
  function bottomleyRaw(sinPsi) {
    function forward(lambda, phi) {
      var rho = halfPi2 - phi, eta = rho ? lambda * sinPsi * sin2(rho) / rho : rho;
      return [rho * sin2(eta) / sinPsi, halfPi2 - rho * cos2(eta)];
    }
    forward.invert = function(x2, y2) {
      var x13 = x2 * sinPsi, y13 = halfPi2 - y2, rho = sqrt3(x13 * x13 + y13 * y13), eta = atan22(x13, y13);
      return [(rho ? rho / sin2(rho) : 1) * eta / sinPsi, halfPi2 - rho];
    };
    return forward;
  }
  function bottomley_default() {
    var sinPsi = 0.5, m = projectionMutator(bottomleyRaw), p = m(sinPsi);
    p.fraction = function(_) {
      return arguments.length ? m(sinPsi = +_) : sinPsi;
    };
    return p.scale(158.837);
  }
  var init_bottomley = __esm(() => {
    init_src13();
    init_math3();
  });

  // node_modules/d3-geo-projection/src/bromley.js
  function bromley_default() {
    return projection(bromleyRaw).scale(152.63);
  }
  var bromleyRaw;
  var init_bromley = __esm(() => {
    init_src13();
    init_math3();
    init_mollweide();
    bromleyRaw = mollweideBromleyRaw(1, 4 / pi2, pi2);
  });

  // node_modules/d3-geo-projection/src/chamberlin.js
  function distance(dPhi, c1, s1, c2, s2, dLambda) {
    var cosdLambda = cos2(dLambda), r;
    if (abs2(dPhi) > 1 || abs2(dLambda) > 1) {
      r = acos2(s1 * s2 + c1 * c2 * cosdLambda);
    } else {
      var sindPhi = sin2(dPhi / 2), sindLambda = sin2(dLambda / 2);
      r = 2 * asin2(sqrt3(sindPhi * sindPhi + c1 * c2 * sindLambda * sindLambda));
    }
    return abs2(r) > epsilon4 ? [r, atan22(c2 * sin2(dLambda), c1 * s2 - s1 * c2 * cosdLambda)] : [0, 0];
  }
  function angle2(b, c2, a2) {
    return acos2((b * b + c2 * c2 - a2 * a2) / (2 * b * c2));
  }
  function longitude2(lambda) {
    return lambda - 2 * pi2 * floor((lambda + pi2) / (2 * pi2));
  }
  function chamberlinRaw(p02, p1, p2) {
    var points2 = [
      [p02[0], p02[1], sin2(p02[1]), cos2(p02[1])],
      [p1[0], p1[1], sin2(p1[1]), cos2(p1[1])],
      [p2[0], p2[1], sin2(p2[1]), cos2(p2[1])]
    ];
    for (var a2 = points2[2], b, i = 0; i < 3; ++i, a2 = b) {
      b = points2[i];
      a2.v = distance(b[1] - a2[1], a2[3], a2[2], b[3], b[2], b[0] - a2[0]);
      a2.point = [0, 0];
    }
    var beta0 = angle2(points2[0].v[0], points2[2].v[0], points2[1].v[0]), beta1 = angle2(points2[0].v[0], points2[1].v[0], points2[2].v[0]), beta2 = pi2 - beta0;
    points2[2].point[1] = 0;
    points2[0].point[0] = -(points2[1].point[0] = points2[0].v[0] / 2);
    var mean2 = [
      points2[2].point[0] = points2[0].point[0] + points2[2].v[0] * cos2(beta0),
      2 * (points2[0].point[1] = points2[1].point[1] = points2[2].v[0] * sin2(beta0))
    ];
    function forward(lambda, phi) {
      var sinPhi = sin2(phi), cosPhi = cos2(phi), v = new Array(3), i2;
      for (i2 = 0; i2 < 3; ++i2) {
        var p = points2[i2];
        v[i2] = distance(phi - p[1], p[3], p[2], cosPhi, sinPhi, lambda - p[0]);
        if (!v[i2][0])
          return p.point;
        v[i2][1] = longitude2(v[i2][1] - p.v[1]);
      }
      var point6 = mean2.slice();
      for (i2 = 0; i2 < 3; ++i2) {
        var j = i2 == 2 ? 0 : i2 + 1;
        var a3 = angle2(points2[i2].v[0], v[i2][0], v[j][0]);
        if (v[i2][1] < 0)
          a3 = -a3;
        if (!i2) {
          point6[0] += v[i2][0] * cos2(a3);
          point6[1] -= v[i2][0] * sin2(a3);
        } else if (i2 == 1) {
          a3 = beta1 - a3;
          point6[0] -= v[i2][0] * cos2(a3);
          point6[1] -= v[i2][0] * sin2(a3);
        } else {
          a3 = beta2 - a3;
          point6[0] += v[i2][0] * cos2(a3);
          point6[1] += v[i2][0] * sin2(a3);
        }
      }
      point6[0] /= 3, point6[1] /= 3;
      return point6;
    }
    return forward;
  }
  function pointRadians2(p) {
    return p[0] *= radians3, p[1] *= radians3, p;
  }
  function chamberlinAfrica() {
    return chamberlin([0, 22], [45, 22], [22.5, -22]).scale(380).center([22.5, 2]);
  }
  function chamberlin(p02, p1, p2) {
    var c2 = centroid_default({type: "MultiPoint", coordinates: [p02, p1, p2]}), R = [-c2[0], -c2[1]], r = rotation_default(R), f = chamberlinRaw(pointRadians2(r(p02)), pointRadians2(r(p1)), pointRadians2(r(p2)));
    f.invert = solve2d(f);
    var p = projection(f).rotate(R), center2 = p.center;
    delete p.rotate;
    p.center = function(_) {
      return arguments.length ? center2(r(_)) : r.invert(center2());
    };
    return p.clipAngle(90);
  }
  var init_chamberlin = __esm(() => {
    init_src13();
    init_math3();
    init_newton();
  });

  // node_modules/d3-geo-projection/src/collignon.js
  function collignonRaw(lambda, phi) {
    var alpha = sqrt3(1 - sin2(phi));
    return [2 / sqrtPi * lambda * alpha, sqrtPi * (1 - alpha)];
  }
  function collignon_default() {
    return projection(collignonRaw).scale(95.6464).center([0, 30]);
  }
  var init_collignon = __esm(() => {
    init_src13();
    init_math3();
    collignonRaw.invert = function(x2, y2) {
      var lambda = (lambda = y2 / sqrtPi - 1) * lambda;
      return [lambda > 0 ? x2 * sqrt3(pi2 / lambda) / 2 : 0, asin2(1 - lambda)];
    };
  });

  // node_modules/d3-geo-projection/src/craig.js
  function craigRaw(phi03) {
    var tanPhi0 = tan2(phi03);
    function forward(lambda, phi) {
      return [lambda, (lambda ? lambda / sin2(lambda) : 1) * (sin2(phi) * cos2(lambda) - tanPhi0 * cos2(phi))];
    }
    forward.invert = tanPhi0 ? function(x2, y2) {
      if (x2)
        y2 *= sin2(x2) / x2;
      var cosLambda = cos2(x2);
      return [x2, 2 * atan22(sqrt3(cosLambda * cosLambda + tanPhi0 * tanPhi0 - y2 * y2) - cosLambda, tanPhi0 - y2)];
    } : function(x2, y2) {
      return [x2, asin2(x2 ? y2 * tan2(x2) / x2 : y2)];
    };
    return forward;
  }
  function craig_default() {
    return parallel1_default(craigRaw).scale(249.828).clipAngle(90);
  }
  var init_craig = __esm(() => {
    init_math3();
    init_parallel1();
  });

  // node_modules/d3-geo-projection/src/craster.js
  function crasterRaw(lambda, phi) {
    return [sqrt32 * lambda * (2 * cos2(2 * phi / 3) - 1) / sqrtPi, sqrt32 * sqrtPi * sin2(phi / 3)];
  }
  function craster_default() {
    return projection(crasterRaw).scale(156.19);
  }
  var sqrt32;
  var init_craster = __esm(() => {
    init_src13();
    init_math3();
    sqrt32 = sqrt3(3);
    crasterRaw.invert = function(x2, y2) {
      var phi = 3 * asin2(y2 / (sqrt32 * sqrtPi));
      return [sqrtPi * x2 / (sqrt32 * (2 * cos2(2 * phi / 3) - 1)), phi];
    };
  });

  // node_modules/d3-geo-projection/src/cylindricalEqualArea.js
  function cylindricalEqualAreaRaw2(phi03) {
    var cosPhi03 = cos2(phi03);
    function forward(lambda, phi) {
      return [lambda * cosPhi03, sin2(phi) / cosPhi03];
    }
    forward.invert = function(x2, y2) {
      return [x2 / cosPhi03, asin2(y2 * cosPhi03)];
    };
    return forward;
  }
  function cylindricalEqualArea_default() {
    return parallel1_default(cylindricalEqualAreaRaw2).parallel(38.58).scale(195.044);
  }
  var init_cylindricalEqualArea2 = __esm(() => {
    init_math3();
    init_parallel1();
  });

  // node_modules/d3-geo-projection/src/cylindricalStereographic.js
  function cylindricalStereographicRaw(phi03) {
    var cosPhi03 = cos2(phi03);
    function forward(lambda, phi) {
      return [lambda * cosPhi03, (1 + cosPhi03) * tan2(phi / 2)];
    }
    forward.invert = function(x2, y2) {
      return [x2 / cosPhi03, atan3(y2 / (1 + cosPhi03)) * 2];
    };
    return forward;
  }
  function cylindricalStereographic_default() {
    return parallel1_default(cylindricalStereographicRaw).scale(124.75);
  }
  var init_cylindricalStereographic = __esm(() => {
    init_math3();
    init_parallel1();
  });

  // node_modules/d3-geo-projection/src/eckert1.js
  function eckert1Raw(lambda, phi) {
    var alpha = sqrt3(8 / (3 * pi2));
    return [
      alpha * lambda * (1 - abs2(phi) / pi2),
      alpha * phi
    ];
  }
  function eckert1_default() {
    return projection(eckert1Raw).scale(165.664);
  }
  var init_eckert1 = __esm(() => {
    init_src13();
    init_math3();
    eckert1Raw.invert = function(x2, y2) {
      var alpha = sqrt3(8 / (3 * pi2)), phi = y2 / alpha;
      return [
        x2 / (alpha * (1 - abs2(phi) / pi2)),
        phi
      ];
    };
  });

  // node_modules/d3-geo-projection/src/eckert2.js
  function eckert2Raw(lambda, phi) {
    var alpha = sqrt3(4 - 3 * sin2(abs2(phi)));
    return [
      2 / sqrt3(6 * pi2) * lambda * alpha,
      sign2(phi) * sqrt3(2 * pi2 / 3) * (2 - alpha)
    ];
  }
  function eckert2_default() {
    return projection(eckert2Raw).scale(165.664);
  }
  var init_eckert2 = __esm(() => {
    init_src13();
    init_math3();
    eckert2Raw.invert = function(x2, y2) {
      var alpha = 2 - abs2(y2) / sqrt3(2 * pi2 / 3);
      return [
        x2 * sqrt3(6 * pi2) / (2 * alpha),
        sign2(y2) * asin2((4 - alpha * alpha) / 3)
      ];
    };
  });

  // node_modules/d3-geo-projection/src/eckert3.js
  function eckert3Raw(lambda, phi) {
    var k3 = sqrt3(pi2 * (4 + pi2));
    return [
      2 / k3 * lambda * (1 + sqrt3(1 - 4 * phi * phi / (pi2 * pi2))),
      4 / k3 * phi
    ];
  }
  function eckert3_default() {
    return projection(eckert3Raw).scale(180.739);
  }
  var init_eckert3 = __esm(() => {
    init_src13();
    init_math3();
    eckert3Raw.invert = function(x2, y2) {
      var k3 = sqrt3(pi2 * (4 + pi2)) / 2;
      return [
        x2 * k3 / (1 + sqrt3(1 - y2 * y2 * (4 + pi2) / (4 * pi2))),
        y2 * k3 / 2
      ];
    };
  });

  // node_modules/d3-geo-projection/src/eckert4.js
  function eckert4Raw(lambda, phi) {
    var k3 = (2 + halfPi2) * sin2(phi);
    phi /= 2;
    for (var i = 0, delta = Infinity; i < 10 && abs2(delta) > epsilon4; i++) {
      var cosPhi = cos2(phi);
      phi -= delta = (phi + sin2(phi) * (cosPhi + 2) - k3) / (2 * cosPhi * (1 + cosPhi));
    }
    return [
      2 / sqrt3(pi2 * (4 + pi2)) * lambda * (1 + cos2(phi)),
      2 * sqrt3(pi2 / (4 + pi2)) * sin2(phi)
    ];
  }
  function eckert4_default() {
    return projection(eckert4Raw).scale(180.739);
  }
  var init_eckert4 = __esm(() => {
    init_src13();
    init_math3();
    eckert4Raw.invert = function(x2, y2) {
      var A6 = y2 * sqrt3((4 + pi2) / pi2) / 2, k3 = asin2(A6), c2 = cos2(k3);
      return [
        x2 / (2 / sqrt3(pi2 * (4 + pi2)) * (1 + c2)),
        asin2((k3 + A6 * (c2 + 2)) / (2 + halfPi2))
      ];
    };
  });

  // node_modules/d3-geo-projection/src/eckert5.js
  function eckert5Raw(lambda, phi) {
    return [
      lambda * (1 + cos2(phi)) / sqrt3(2 + pi2),
      2 * phi / sqrt3(2 + pi2)
    ];
  }
  function eckert5_default() {
    return projection(eckert5Raw).scale(173.044);
  }
  var init_eckert5 = __esm(() => {
    init_src13();
    init_math3();
    eckert5Raw.invert = function(x2, y2) {
      var k3 = sqrt3(2 + pi2), phi = y2 * k3 / 2;
      return [
        k3 * x2 / (1 + cos2(phi)),
        phi
      ];
    };
  });

  // node_modules/d3-geo-projection/src/eckert6.js
  function eckert6Raw(lambda, phi) {
    var k3 = (1 + halfPi2) * sin2(phi);
    for (var i = 0, delta = Infinity; i < 10 && abs2(delta) > epsilon4; i++) {
      phi -= delta = (phi + sin2(phi) - k3) / (1 + cos2(phi));
    }
    k3 = sqrt3(2 + pi2);
    return [
      lambda * (1 + cos2(phi)) / k3,
      2 * phi / k3
    ];
  }
  function eckert6_default() {
    return projection(eckert6Raw).scale(173.044);
  }
  var init_eckert6 = __esm(() => {
    init_src13();
    init_math3();
    eckert6Raw.invert = function(x2, y2) {
      var j = 1 + halfPi2, k3 = sqrt3(j / 2);
      return [
        x2 * 2 * k3 / (1 + cos2(y2 *= k3)),
        asin2((y2 + sin2(y2)) / j)
      ];
    };
  });

  // node_modules/d3-geo-projection/src/eisenlohr.js
  function eisenlohrRaw(lambda, phi) {
    var s0 = sin2(lambda /= 2), c0 = cos2(lambda), k3 = sqrt3(cos2(phi)), c1 = cos2(phi /= 2), t = sin2(phi) / (c1 + sqrt22 * c0 * k3), c2 = sqrt3(2 / (1 + t * t)), v = sqrt3((sqrt22 * c1 + (c0 + s0) * k3) / (sqrt22 * c1 + (c0 - s0) * k3));
    return [
      eisenlohrK * (c2 * (v - 1 / v) - 2 * log3(v)),
      eisenlohrK * (c2 * t * (v + 1 / v) - 2 * atan3(t))
    ];
  }
  function eisenlohr_default() {
    return projection(eisenlohrRaw).scale(62.5271);
  }
  var eisenlohrK;
  var init_eisenlohr = __esm(() => {
    init_src13();
    init_august();
    init_math3();
    eisenlohrK = 3 + 2 * sqrt22;
    eisenlohrRaw.invert = function(x2, y2) {
      if (!(p = augustRaw.invert(x2 / 1.2, y2 * 1.065)))
        return null;
      var lambda = p[0], phi = p[1], i = 20, p;
      x2 /= eisenlohrK, y2 /= eisenlohrK;
      do {
        var _0 = lambda / 2, _1 = phi / 2, s0 = sin2(_0), c0 = cos2(_0), s1 = sin2(_1), c1 = cos2(_1), cos1 = cos2(phi), k3 = sqrt3(cos1), t = s1 / (c1 + sqrt22 * c0 * k3), t22 = t * t, c2 = sqrt3(2 / (1 + t22)), v0 = sqrt22 * c1 + (c0 + s0) * k3, v1 = sqrt22 * c1 + (c0 - s0) * k3, v2 = v0 / v1, v = sqrt3(v2), vm1v = v - 1 / v, vp1v = v + 1 / v, fx = c2 * vm1v - 2 * log3(v) - x2, fy = c2 * t * vp1v - 2 * atan3(t) - y2, deltatDeltaLambda = s1 && sqrt1_2 * k3 * s0 * t22 / s1, deltatDeltaPhi = (sqrt22 * c0 * c1 + k3) / (2 * (c1 + sqrt22 * c0 * k3) * (c1 + sqrt22 * c0 * k3) * k3), deltacDeltat = -0.5 * t * c2 * c2 * c2, deltacDeltaLambda = deltacDeltat * deltatDeltaLambda, deltacDeltaPhi = deltacDeltat * deltatDeltaPhi, A6 = (A6 = 2 * c1 + sqrt22 * k3 * (c0 - s0)) * A6 * v, deltavDeltaLambda = (sqrt22 * c0 * c1 * k3 + cos1) / A6, deltavDeltaPhi = -(sqrt22 * s0 * s1) / (k3 * A6), deltaxDeltaLambda = vm1v * deltacDeltaLambda - 2 * deltavDeltaLambda / v + c2 * (deltavDeltaLambda + deltavDeltaLambda / v2), deltaxDeltaPhi = vm1v * deltacDeltaPhi - 2 * deltavDeltaPhi / v + c2 * (deltavDeltaPhi + deltavDeltaPhi / v2), deltayDeltaLambda = t * vp1v * deltacDeltaLambda - 2 * deltatDeltaLambda / (1 + t22) + c2 * vp1v * deltatDeltaLambda + c2 * t * (deltavDeltaLambda - deltavDeltaLambda / v2), deltayDeltaPhi = t * vp1v * deltacDeltaPhi - 2 * deltatDeltaPhi / (1 + t22) + c2 * vp1v * deltatDeltaPhi + c2 * t * (deltavDeltaPhi - deltavDeltaPhi / v2), denominator = deltaxDeltaPhi * deltayDeltaLambda - deltayDeltaPhi * deltaxDeltaLambda;
        if (!denominator)
          break;
        var deltaLambda = (fy * deltaxDeltaPhi - fx * deltayDeltaPhi) / denominator, deltaPhi = (fx * deltayDeltaLambda - fy * deltaxDeltaLambda) / denominator;
        lambda -= deltaLambda;
        phi = max2(-halfPi2, min2(halfPi2, phi - deltaPhi));
      } while ((abs2(deltaLambda) > epsilon4 || abs2(deltaPhi) > epsilon4) && --i > 0);
      return abs2(abs2(phi) - halfPi2) < epsilon4 ? [0, phi] : i && [lambda, phi];
    };
  });

  // node_modules/d3-geo-projection/src/fahey.js
  function faheyRaw(lambda, phi) {
    var t = tan2(phi / 2);
    return [lambda * faheyK * sqrt3(1 - t * t), (1 + faheyK) * t];
  }
  function fahey_default() {
    return projection(faheyRaw).scale(137.152);
  }
  var faheyK;
  var init_fahey = __esm(() => {
    init_src13();
    init_math3();
    faheyK = cos2(35 * radians3);
    faheyRaw.invert = function(x2, y2) {
      var t = y2 / (1 + faheyK);
      return [x2 && x2 / (faheyK * sqrt3(1 - t * t)), 2 * atan3(t)];
    };
  });

  // node_modules/d3-geo-projection/src/foucaut.js
  function foucautRaw(lambda, phi) {
    var k3 = phi / 2, cosk = cos2(k3);
    return [2 * lambda / sqrtPi * cos2(phi) * cosk * cosk, sqrtPi * tan2(k3)];
  }
  function foucaut_default() {
    return projection(foucautRaw).scale(135.264);
  }
  var init_foucaut = __esm(() => {
    init_src13();
    init_math3();
    foucautRaw.invert = function(x2, y2) {
      var k3 = atan3(y2 / sqrtPi), cosk = cos2(k3), phi = 2 * k3;
      return [x2 * sqrtPi / 2 / (cos2(phi) * cosk * cosk), phi];
    };
  });

  // node_modules/d3-geo-projection/src/foucautSinusoidal.js
  function foucautSinusoidalRaw(alpha) {
    var beta = 1 - alpha, equatorial = raw(pi2, 0)[0] - raw(-pi2, 0)[0], polar = raw(0, halfPi2)[1] - raw(0, -halfPi2)[1], ratio = sqrt3(2 * polar / equatorial);
    function raw(lambda, phi) {
      var cosphi = cos2(phi), sinphi = sin2(phi);
      return [
        cosphi / (beta + alpha * cosphi) * lambda,
        beta * phi + alpha * sinphi
      ];
    }
    function forward(lambda, phi) {
      var p = raw(lambda, phi);
      return [p[0] * ratio, p[1] / ratio];
    }
    function forwardMeridian(phi) {
      return forward(0, phi)[1];
    }
    forward.invert = function(x2, y2) {
      var phi = solve(forwardMeridian, y2), lambda = x2 / ratio * (alpha + beta / cos2(phi));
      return [lambda, phi];
    };
    return forward;
  }
  function foucautSinusoidal_default() {
    var alpha = 0.5, m = projectionMutator(foucautSinusoidalRaw), p = m(alpha);
    p.alpha = function(_) {
      return arguments.length ? m(alpha = +_) : alpha;
    };
    return p.scale(168.725);
  }
  var init_foucautSinusoidal = __esm(() => {
    init_src13();
    init_math3();
    init_newton();
  });

  // node_modules/d3-geo-projection/src/gilbert.js
  function gilbertForward(point6) {
    return [point6[0] / 2, asin2(tan2(point6[1] / 2 * radians3)) * degrees4];
  }
  function gilbertInvert(point6) {
    return [point6[0] * 2, 2 * atan3(sin2(point6[1] * radians3)) * degrees4];
  }
  function gilbert_default(projectionType) {
    if (projectionType == null)
      projectionType = orthographic_default;
    var projection2 = projectionType(), equirectangular = equirectangular_default().scale(degrees4).precision(0).clipAngle(null).translate([0, 0]);
    function gilbert(point6) {
      return projection2(gilbertForward(point6));
    }
    if (projection2.invert)
      gilbert.invert = function(point6) {
        return gilbertInvert(projection2.invert(point6));
      };
    gilbert.stream = function(stream) {
      var s1 = projection2.stream(stream), s0 = equirectangular.stream({
        point: function(lambda, phi) {
          s1.point(lambda / 2, asin2(tan2(-phi / 2 * radians3)) * degrees4);
        },
        lineStart: function() {
          s1.lineStart();
        },
        lineEnd: function() {
          s1.lineEnd();
        },
        polygonStart: function() {
          s1.polygonStart();
        },
        polygonEnd: function() {
          s1.polygonEnd();
        }
      });
      s0.sphere = s1.sphere;
      return s0;
    };
    function property(name) {
      gilbert[name] = function() {
        return arguments.length ? (projection2[name].apply(projection2, arguments), gilbert) : projection2[name]();
      };
    }
    gilbert.rotate = function(_) {
      return arguments.length ? (equirectangular.rotate(_), gilbert) : equirectangular.rotate();
    };
    gilbert.center = function(_) {
      return arguments.length ? (projection2.center(gilbertForward(_)), gilbert) : gilbertInvert(projection2.center());
    };
    property("angle");
    property("clipAngle");
    property("clipExtent");
    property("fitExtent");
    property("fitHeight");
    property("fitSize");
    property("fitWidth");
    property("scale");
    property("translate");
    property("precision");
    return gilbert.scale(249.5);
  }
  var init_gilbert = __esm(() => {
    init_src13();
    init_math3();
  });

  // node_modules/d3-geo-projection/src/gingery.js
  function gingeryRaw(rho, n) {
    var k3 = 2 * pi2 / n, rho2 = rho * rho;
    function forward(lambda, phi) {
      var p = azimuthalEquidistantRaw(lambda, phi), x2 = p[0], y2 = p[1], r2 = x2 * x2 + y2 * y2;
      if (r2 > rho2) {
        var r = sqrt3(r2), theta = atan22(y2, x2), theta0 = k3 * round(theta / k3), alpha = theta - theta0, rhoCosAlpha = rho * cos2(alpha), k_ = (rho * sin2(alpha) - alpha * sin2(rhoCosAlpha)) / (halfPi2 - rhoCosAlpha), s_ = gingeryLength(alpha, k_), e3 = (pi2 - rho) / gingeryIntegrate(s_, rhoCosAlpha, pi2);
        x2 = r;
        var i = 50, delta;
        do {
          x2 -= delta = (rho + gingeryIntegrate(s_, rhoCosAlpha, x2) * e3 - r) / (s_(x2) * e3);
        } while (abs2(delta) > epsilon4 && --i > 0);
        y2 = alpha * sin2(x2);
        if (x2 < halfPi2)
          y2 -= k_ * (x2 - halfPi2);
        var s2 = sin2(theta0), c2 = cos2(theta0);
        p[0] = x2 * c2 - y2 * s2;
        p[1] = x2 * s2 + y2 * c2;
      }
      return p;
    }
    forward.invert = function(x2, y2) {
      var r2 = x2 * x2 + y2 * y2;
      if (r2 > rho2) {
        var r = sqrt3(r2), theta = atan22(y2, x2), theta0 = k3 * round(theta / k3), dTheta = theta - theta0;
        x2 = r * cos2(dTheta);
        y2 = r * sin2(dTheta);
        var x_halfPi = x2 - halfPi2, sinx = sin2(x2), alpha = y2 / sinx, delta = x2 < halfPi2 ? Infinity : 0, i = 10;
        while (true) {
          var rhosinAlpha = rho * sin2(alpha), rhoCosAlpha = rho * cos2(alpha), sinRhoCosAlpha = sin2(rhoCosAlpha), halfPi_RhoCosAlpha = halfPi2 - rhoCosAlpha, k_ = (rhosinAlpha - alpha * sinRhoCosAlpha) / halfPi_RhoCosAlpha, s_ = gingeryLength(alpha, k_);
          if (abs2(delta) < epsilon23 || !--i)
            break;
          alpha -= delta = (alpha * sinx - k_ * x_halfPi - y2) / (sinx - x_halfPi * 2 * (halfPi_RhoCosAlpha * (rhoCosAlpha + alpha * rhosinAlpha * cos2(rhoCosAlpha) - sinRhoCosAlpha) - rhosinAlpha * (rhosinAlpha - alpha * sinRhoCosAlpha)) / (halfPi_RhoCosAlpha * halfPi_RhoCosAlpha));
        }
        r = rho + gingeryIntegrate(s_, rhoCosAlpha, x2) * (pi2 - rho) / gingeryIntegrate(s_, rhoCosAlpha, pi2);
        theta = theta0 + alpha;
        x2 = r * cos2(theta);
        y2 = r * sin2(theta);
      }
      return azimuthalEquidistantRaw.invert(x2, y2);
    };
    return forward;
  }
  function gingeryLength(alpha, k3) {
    return function(x2) {
      var y_ = alpha * cos2(x2);
      if (x2 < halfPi2)
        y_ -= k3;
      return sqrt3(1 + y_ * y_);
    };
  }
  function gingeryIntegrate(f, a2, b) {
    var n = 50, h = (b - a2) / n, s2 = f(a2) + f(b);
    for (var i = 1, x2 = a2; i < n; ++i)
      s2 += 2 * f(x2 += h);
    return s2 * 0.5 * h;
  }
  function gingery_default() {
    var n = 6, rho = 30 * radians3, cRho = cos2(rho), sRho = sin2(rho), m = projectionMutator(gingeryRaw), p = m(rho, n), stream_ = p.stream, epsilon8 = 0.01, cr = -cos2(epsilon8 * radians3), sr = sin2(epsilon8 * radians3);
    p.radius = function(_) {
      if (!arguments.length)
        return rho * degrees4;
      cRho = cos2(rho = _ * radians3);
      sRho = sin2(rho);
      return m(rho, n);
    };
    p.lobes = function(_) {
      if (!arguments.length)
        return n;
      return m(rho, n = +_);
    };
    p.stream = function(stream) {
      var rotate = p.rotate(), rotateStream = stream_(stream), sphereStream = (p.rotate([0, 0]), stream_(stream));
      p.rotate(rotate);
      rotateStream.sphere = function() {
        sphereStream.polygonStart(), sphereStream.lineStart();
        for (var i = 0, delta = 2 * pi2 / n, phi = 0; i < n; ++i, phi -= delta) {
          sphereStream.point(atan22(sr * cos2(phi), cr) * degrees4, asin2(sr * sin2(phi)) * degrees4);
          sphereStream.point(atan22(sRho * cos2(phi - delta / 2), cRho) * degrees4, asin2(sRho * sin2(phi - delta / 2)) * degrees4);
        }
        sphereStream.lineEnd(), sphereStream.polygonEnd();
      };
      return rotateStream;
    };
    return p.rotate([90, -40]).scale(91.7095).clipAngle(180 - 1e-3);
  }
  var init_gingery = __esm(() => {
    init_src13();
    init_math3();
  });

  // node_modules/d3-geo-projection/src/ginzburgPolyconic.js
  function ginzburgPolyconic_default(a2, b, c2, d, e3, f, g, h) {
    if (arguments.length < 8)
      h = 0;
    function forward(lambda, phi) {
      if (!phi)
        return [a2 * lambda / pi2, 0];
      var phi2 = phi * phi, xB = a2 + phi2 * (b + phi2 * (c2 + phi2 * d)), yB = phi * (e3 - 1 + phi2 * (f - h + phi2 * g)), m = (xB * xB + yB * yB) / (2 * yB), alpha = lambda * asin2(xB / m) / pi2;
      return [m * sin2(alpha), phi * (1 + phi2 * h) + m * (1 - cos2(alpha))];
    }
    forward.invert = function(x2, y2) {
      var lambda = pi2 * x2 / a2, phi = y2, deltaLambda, deltaPhi, i = 50;
      do {
        var phi2 = phi * phi, xB = a2 + phi2 * (b + phi2 * (c2 + phi2 * d)), yB = phi * (e3 - 1 + phi2 * (f - h + phi2 * g)), p = xB * xB + yB * yB, q = 2 * yB, m = p / q, m2 = m * m, dAlphadLambda = asin2(xB / m) / pi2, alpha = lambda * dAlphadLambda, xB2 = xB * xB, dxBdPhi = (2 * b + phi2 * (4 * c2 + phi2 * 6 * d)) * phi, dyBdPhi = e3 + phi2 * (3 * f + phi2 * 5 * g), dpdPhi = 2 * (xB * dxBdPhi + yB * (dyBdPhi - 1)), dqdPhi = 2 * (dyBdPhi - 1), dmdPhi = (dpdPhi * q - p * dqdPhi) / (q * q), cosAlpha = cos2(alpha), sinAlpha = sin2(alpha), mcosAlpha = m * cosAlpha, msinAlpha = m * sinAlpha, dAlphadPhi = lambda / pi2 * (1 / sqrt3(1 - xB2 / m2)) * (dxBdPhi * m - xB * dmdPhi) / m2, fx = msinAlpha - x2, fy = phi * (1 + phi2 * h) + m - mcosAlpha - y2, deltaxDeltaPhi = dmdPhi * sinAlpha + mcosAlpha * dAlphadPhi, deltaxDeltaLambda = mcosAlpha * dAlphadLambda, deltayDeltaPhi = 1 + dmdPhi - (dmdPhi * cosAlpha - msinAlpha * dAlphadPhi), deltayDeltaLambda = msinAlpha * dAlphadLambda, denominator = deltaxDeltaPhi * deltayDeltaLambda - deltayDeltaPhi * deltaxDeltaLambda;
        if (!denominator)
          break;
        lambda -= deltaLambda = (fy * deltaxDeltaPhi - fx * deltayDeltaPhi) / denominator;
        phi -= deltaPhi = (fx * deltayDeltaLambda - fy * deltaxDeltaLambda) / denominator;
      } while ((abs2(deltaLambda) > epsilon4 || abs2(deltaPhi) > epsilon4) && --i > 0);
      return [lambda, phi];
    };
    return forward;
  }
  var init_ginzburgPolyconic = __esm(() => {
    init_math3();
  });

  // node_modules/d3-geo-projection/src/ginzburg4.js
  function ginzburg4_default() {
    return projection(ginzburg4Raw).scale(149.995);
  }
  var ginzburg4Raw;
  var init_ginzburg4 = __esm(() => {
    init_src13();
    init_ginzburgPolyconic();
    ginzburg4Raw = ginzburgPolyconic_default(2.8284, -1.6988, 0.75432, -0.18071, 1.76003, -0.38914, 0.042555);
  });

  // node_modules/d3-geo-projection/src/ginzburg5.js
  function ginzburg5_default() {
    return projection(ginzburg5Raw).scale(153.93);
  }
  var ginzburg5Raw;
  var init_ginzburg5 = __esm(() => {
    init_src13();
    init_ginzburgPolyconic();
    ginzburg5Raw = ginzburgPolyconic_default(2.583819, -0.835827, 0.170354, -0.038094, 1.543313, -0.411435, 0.082742);
  });

  // node_modules/d3-geo-projection/src/ginzburg6.js
  function ginzburg6_default() {
    return projection(ginzburg6Raw).scale(130.945);
  }
  var ginzburg6Raw;
  var init_ginzburg6 = __esm(() => {
    init_src13();
    init_ginzburgPolyconic();
    init_math3();
    ginzburg6Raw = ginzburgPolyconic_default(5 / 6 * pi2, -0.62636, -0.0344, 0, 1.3493, -0.05524, 0, 0.045);
  });

  // node_modules/d3-geo-projection/src/ginzburg8.js
  function ginzburg8Raw(lambda, phi) {
    var lambda22 = lambda * lambda, phi2 = phi * phi;
    return [
      lambda * (1 - 0.162388 * phi2) * (0.87 - 952426e-9 * lambda22 * lambda22),
      phi * (1 + phi2 / 12)
    ];
  }
  function ginzburg8_default() {
    return projection(ginzburg8Raw).scale(131.747);
  }
  var init_ginzburg8 = __esm(() => {
    init_src13();
    init_math3();
    ginzburg8Raw.invert = function(x2, y2) {
      var lambda = x2, phi = y2, i = 50, delta;
      do {
        var phi2 = phi * phi;
        phi -= delta = (phi * (1 + phi2 / 12) - y2) / (1 + phi2 / 4);
      } while (abs2(delta) > epsilon4 && --i > 0);
      i = 50;
      x2 /= 1 - 0.162388 * phi2;
      do {
        var lambda4 = (lambda4 = lambda * lambda) * lambda4;
        lambda -= delta = (lambda * (0.87 - 952426e-9 * lambda4) - x2) / (0.87 - 476213e-8 * lambda4);
      } while (abs2(delta) > epsilon4 && --i > 0);
      return [lambda, phi];
    };
  });

  // node_modules/d3-geo-projection/src/ginzburg9.js
  function ginzburg9_default() {
    return projection(ginzburg9Raw).scale(131.087);
  }
  var ginzburg9Raw;
  var init_ginzburg9 = __esm(() => {
    init_src13();
    init_ginzburgPolyconic();
    ginzburg9Raw = ginzburgPolyconic_default(2.6516, -0.76534, 0.19123, -0.047094, 1.36289, -0.13965, 0.031762);
  });

  // node_modules/d3-geo-projection/src/square.js
  function square_default(project) {
    var dx = project(halfPi2, 0)[0] - project(-halfPi2, 0)[0];
    function projectSquare(lambda, phi) {
      var s2 = lambda > 0 ? -0.5 : 0.5, point6 = project(lambda + s2 * pi2, phi);
      point6[0] -= s2 * dx;
      return point6;
    }
    if (project.invert)
      projectSquare.invert = function(x2, y2) {
        var s2 = x2 > 0 ? -0.5 : 0.5, location = project.invert(x2 + s2 * dx, y2), lambda = location[0] - s2 * pi2;
        if (lambda < -pi2)
          lambda += 2 * pi2;
        else if (lambda > pi2)
          lambda -= 2 * pi2;
        location[0] = lambda;
        return location;
      };
    return projectSquare;
  }
  var init_square = __esm(() => {
    init_math3();
  });

  // node_modules/d3-geo-projection/src/gringorten.js
  function gringortenRaw(lambda, phi) {
    var sLambda = sign2(lambda), sPhi = sign2(phi), cosPhi = cos2(phi), x2 = cos2(lambda) * cosPhi, y2 = sin2(lambda) * cosPhi, z = sin2(sPhi * phi);
    lambda = abs2(atan22(y2, z));
    phi = asin2(x2);
    if (abs2(lambda - halfPi2) > epsilon4)
      lambda %= halfPi2;
    var point6 = gringortenHexadecant(lambda > pi2 / 4 ? halfPi2 - lambda : lambda, phi);
    if (lambda > pi2 / 4)
      z = point6[0], point6[0] = -point6[1], point6[1] = -z;
    return point6[0] *= sLambda, point6[1] *= -sPhi, point6;
  }
  function gringortenHexadecant(lambda, phi) {
    if (phi === halfPi2)
      return [0, 0];
    var sinPhi = sin2(phi), r = sinPhi * sinPhi, r2 = r * r, j = 1 + r2, k3 = 1 + 3 * r2, q = 1 - r2, z = asin2(1 / sqrt3(j)), v = q + r * j * z, p2 = (1 - sinPhi) / v, p = sqrt3(p2), a2 = p2 * j, a3 = sqrt3(a2), h = p * q, x2, i;
    if (lambda === 0)
      return [0, -(h + r * a3)];
    var cosPhi = cos2(phi), secPhi = 1 / cosPhi, drdPhi = 2 * sinPhi * cosPhi, dvdPhi = (-3 * r + z * k3) * drdPhi, dp2dPhi = (-v * cosPhi - (1 - sinPhi) * dvdPhi) / (v * v), dpdPhi = 0.5 * dp2dPhi / p, dhdPhi = q * dpdPhi - 2 * r * p * drdPhi, dra2dPhi = r * j * dp2dPhi + p2 * k3 * drdPhi, mu = -secPhi * drdPhi, nu = -secPhi * dra2dPhi, zeta = -2 * secPhi * dhdPhi, lambda12 = 4 * lambda / pi2, delta;
    if (lambda > 0.222 * pi2 || phi < pi2 / 4 && lambda > 0.175 * pi2) {
      x2 = (h + r * sqrt3(a2 * (1 + r2) - h * h)) / (1 + r2);
      if (lambda > pi2 / 4)
        return [x2, x2];
      var x13 = x2, x07 = 0.5 * x2;
      x2 = 0.5 * (x07 + x13), i = 50;
      do {
        var g = sqrt3(a2 - x2 * x2), f = x2 * (zeta + mu * g) + nu * asin2(x2 / a3) - lambda12;
        if (!f)
          break;
        if (f < 0)
          x07 = x2;
        else
          x13 = x2;
        x2 = 0.5 * (x07 + x13);
      } while (abs2(x13 - x07) > epsilon4 && --i > 0);
    } else {
      x2 = epsilon4, i = 25;
      do {
        var x22 = x2 * x2, g2 = sqrt3(a2 - x22), zetaMug = zeta + mu * g2, f2 = x2 * zetaMug + nu * asin2(x2 / a3) - lambda12, df = zetaMug + (nu - mu * x22) / g2;
        x2 -= delta = g2 ? f2 / df : 0;
      } while (abs2(delta) > epsilon4 && --i > 0);
    }
    return [x2, -h - r * sqrt3(a2 - x2 * x2)];
  }
  function gringortenHexadecantInvert(x2, y2) {
    var x07 = 0, x13 = 1, r = 0.5, i = 50;
    while (true) {
      var r2 = r * r, sinPhi = sqrt3(r), z = asin2(1 / sqrt3(1 + r2)), v = 1 - r2 + r * (1 + r2) * z, p2 = (1 - sinPhi) / v, p = sqrt3(p2), a2 = p2 * (1 + r2), h = p * (1 - r2), g2 = a2 - x2 * x2, g = sqrt3(g2), y07 = y2 + h + r * g;
      if (abs2(x13 - x07) < epsilon23 || --i === 0 || y07 === 0)
        break;
      if (y07 > 0)
        x07 = r;
      else
        x13 = r;
      r = 0.5 * (x07 + x13);
    }
    if (!i)
      return null;
    var phi = asin2(sinPhi), cosPhi = cos2(phi), secPhi = 1 / cosPhi, drdPhi = 2 * sinPhi * cosPhi, dvdPhi = (-3 * r + z * (1 + 3 * r2)) * drdPhi, dp2dPhi = (-v * cosPhi - (1 - sinPhi) * dvdPhi) / (v * v), dpdPhi = 0.5 * dp2dPhi / p, dhdPhi = (1 - r2) * dpdPhi - 2 * r * p * drdPhi, zeta = -2 * secPhi * dhdPhi, mu = -secPhi * drdPhi, nu = -secPhi * (r * (1 + r2) * dp2dPhi + p2 * (1 + 3 * r2) * drdPhi);
    return [pi2 / 4 * (x2 * (zeta + mu * g) + nu * asin2(x2 / sqrt3(a2))), phi];
  }
  function gringorten_default() {
    return projection(square_default(gringortenRaw)).scale(239.75);
  }
  var init_gringorten = __esm(() => {
    init_src13();
    init_math3();
    init_square();
    gringortenRaw.invert = function(x2, y2) {
      if (abs2(x2) > 1)
        x2 = sign2(x2) * 2 - x2;
      if (abs2(y2) > 1)
        y2 = sign2(y2) * 2 - y2;
      var sx = sign2(x2), sy = sign2(y2), x07 = -sx * x2, y07 = -sy * y2, t = y07 / x07 < 1, p = gringortenHexadecantInvert(t ? y07 : x07, t ? x07 : y07), lambda = p[0], phi = p[1], cosPhi = cos2(phi);
      if (t)
        lambda = -halfPi2 - lambda;
      return [sx * (atan22(sin2(lambda) * cosPhi, -sin2(phi)) + pi2), sy * asin2(cos2(lambda) * cosPhi)];
    };
  });

  // node_modules/d3-geo-projection/src/elliptic.js
  function ellipticJi(u, v, m) {
    var a2, b, c2;
    if (!u) {
      b = ellipticJ(v, 1 - m);
      return [
        [0, b[0] / b[1]],
        [1 / b[1], 0],
        [b[2] / b[1], 0]
      ];
    }
    a2 = ellipticJ(u, m);
    if (!v)
      return [[a2[0], 0], [a2[1], 0], [a2[2], 0]];
    b = ellipticJ(v, 1 - m);
    c2 = b[1] * b[1] + m * a2[0] * a2[0] * b[0] * b[0];
    return [
      [a2[0] * b[2] / c2, a2[1] * a2[2] * b[0] * b[1] / c2],
      [a2[1] * b[1] / c2, -a2[0] * a2[2] * b[0] * b[2] / c2],
      [a2[2] * b[1] * b[2] / c2, -m * a2[0] * a2[1] * b[0] / c2]
    ];
  }
  function ellipticJ(u, m) {
    var ai, b, phi, t, twon;
    if (m < epsilon4) {
      t = sin2(u);
      b = cos2(u);
      ai = m * (u - t * b) / 4;
      return [
        t - ai * b,
        b + ai * t,
        1 - m * t * t / 2,
        u - ai
      ];
    }
    if (m >= 1 - epsilon4) {
      ai = (1 - m) / 4;
      b = cosh2(u);
      t = tanh2(u);
      phi = 1 / b;
      twon = b * sinh2(u);
      return [
        t + ai * (twon - u) / (b * b),
        phi - ai * t * phi * (twon - u),
        phi + ai * t * phi * (twon + u),
        2 * atan3(exp2(u)) - halfPi2 + ai * (twon - u) / b
      ];
    }
    var a2 = [1, 0, 0, 0, 0, 0, 0, 0, 0], c2 = [sqrt3(m), 0, 0, 0, 0, 0, 0, 0, 0], i = 0;
    b = sqrt3(1 - m);
    twon = 1;
    while (abs2(c2[i] / a2[i]) > epsilon4 && i < 8) {
      ai = a2[i++];
      c2[i] = (ai - b) / 2;
      a2[i] = (ai + b) / 2;
      b = sqrt3(ai * b);
      twon *= 2;
    }
    phi = twon * a2[i] * u;
    do {
      t = c2[i] * sin2(b = phi) / a2[i];
      phi = (asin2(t) + phi) / 2;
    } while (--i);
    return [sin2(phi), t = cos2(phi), t / cos2(phi - b), phi];
  }
  function ellipticFi(phi, psi, m) {
    var r = abs2(phi), i = abs2(psi), sinhPsi = sinh2(i);
    if (r) {
      var cscPhi = 1 / sin2(r), cotPhi2 = 1 / (tan2(r) * tan2(r)), b = -(cotPhi2 + m * (sinhPsi * sinhPsi * cscPhi * cscPhi) - 1 + m), c2 = (m - 1) * cotPhi2, cotLambda2 = (-b + sqrt3(b * b - 4 * c2)) / 2;
      return [
        ellipticF(atan3(1 / sqrt3(cotLambda2)), m) * sign2(phi),
        ellipticF(atan3(sqrt3((cotLambda2 / cotPhi2 - 1) / m)), 1 - m) * sign2(psi)
      ];
    }
    return [
      0,
      ellipticF(atan3(sinhPsi), 1 - m) * sign2(psi)
    ];
  }
  function ellipticF(phi, m) {
    if (!m)
      return phi;
    if (m === 1)
      return log3(tan2(phi / 2 + quarterPi2));
    var a2 = 1, b = sqrt3(1 - m), c2 = sqrt3(m);
    for (var i = 0; abs2(c2) > epsilon4; i++) {
      if (phi % pi2) {
        var dPhi = atan3(b * tan2(phi) / a2);
        if (dPhi < 0)
          dPhi += pi2;
        phi += dPhi + ~~(phi / pi2) * pi2;
      } else
        phi += phi;
      c2 = (a2 + b) / 2;
      b = sqrt3(a2 * b);
      c2 = ((a2 = c2) - b) / 2;
    }
    return phi / (pow3(2, i) * a2);
  }
  var init_elliptic = __esm(() => {
    init_math3();
  });

  // node_modules/d3-geo-projection/src/guyou.js
  function guyouRaw(lambda, phi) {
    var k_ = (sqrt22 - 1) / (sqrt22 + 1), k3 = sqrt3(1 - k_ * k_), K4 = ellipticF(halfPi2, k3 * k3), f = -1, psi = log3(tan2(pi2 / 4 + abs2(phi) / 2)), r = exp2(f * psi) / sqrt3(k_), at = guyouComplexAtan(r * cos2(f * lambda), r * sin2(f * lambda)), t = ellipticFi(at[0], at[1], k3 * k3);
    return [-t[1], (phi >= 0 ? 1 : -1) * (0.5 * K4 - t[0])];
  }
  function guyouComplexAtan(x2, y2) {
    var x22 = x2 * x2, y_1 = y2 + 1, t = 1 - x22 - y2 * y2;
    return [
      0.5 * ((x2 >= 0 ? halfPi2 : -halfPi2) - atan22(t, 2 * x2)),
      -0.25 * log3(t * t + 4 * x22) + 0.5 * log3(y_1 * y_1 + x22)
    ];
  }
  function guyouComplexDivide(a2, b) {
    var denominator = b[0] * b[0] + b[1] * b[1];
    return [
      (a2[0] * b[0] + a2[1] * b[1]) / denominator,
      (a2[1] * b[0] - a2[0] * b[1]) / denominator
    ];
  }
  function guyou_default() {
    return projection(square_default(guyouRaw)).scale(151.496);
  }
  var init_guyou = __esm(() => {
    init_src13();
    init_elliptic();
    init_math3();
    init_square();
    guyouRaw.invert = function(x2, y2) {
      var k_ = (sqrt22 - 1) / (sqrt22 + 1), k3 = sqrt3(1 - k_ * k_), K4 = ellipticF(halfPi2, k3 * k3), f = -1, j = ellipticJi(0.5 * K4 - y2, -x2, k3 * k3), tn = guyouComplexDivide(j[0], j[1]), lambda = atan22(tn[1], tn[0]) / f;
      return [
        lambda,
        2 * atan3(exp2(0.5 / f * log3(k_ * tn[0] * tn[0] + k_ * tn[1] * tn[1]))) - halfPi2
      ];
    };
  });

  // node_modules/d3-geo-projection/src/hammerRetroazimuthal.js
  function hammerRetroazimuthalRaw(phi03) {
    var sinPhi03 = sin2(phi03), cosPhi03 = cos2(phi03), rotate = hammerRetroazimuthalRotation(phi03);
    rotate.invert = hammerRetroazimuthalRotation(-phi03);
    function forward(lambda, phi) {
      var p = rotate(lambda, phi);
      lambda = p[0], phi = p[1];
      var sinPhi = sin2(phi), cosPhi = cos2(phi), cosLambda = cos2(lambda), z = acos2(sinPhi03 * sinPhi + cosPhi03 * cosPhi * cosLambda), sinz = sin2(z), K4 = abs2(sinz) > epsilon4 ? z / sinz : 1;
      return [
        K4 * cosPhi03 * sin2(lambda),
        (abs2(lambda) > halfPi2 ? K4 : -K4) * (sinPhi03 * cosPhi - cosPhi03 * sinPhi * cosLambda)
      ];
    }
    forward.invert = function(x2, y2) {
      var rho = sqrt3(x2 * x2 + y2 * y2), sinz = -sin2(rho), cosz = cos2(rho), a2 = rho * cosz, b = -y2 * sinz, c2 = rho * sinPhi03, d = sqrt3(a2 * a2 + b * b - c2 * c2), phi = atan22(a2 * c2 + b * d, b * c2 - a2 * d), lambda = (rho > halfPi2 ? -1 : 1) * atan22(x2 * sinz, rho * cos2(phi) * cosz + y2 * sin2(phi) * sinz);
      return rotate.invert(lambda, phi);
    };
    return forward;
  }
  function hammerRetroazimuthalRotation(phi03) {
    var sinPhi03 = sin2(phi03), cosPhi03 = cos2(phi03);
    return function(lambda, phi) {
      var cosPhi = cos2(phi), x2 = cos2(lambda) * cosPhi, y2 = sin2(lambda) * cosPhi, z = sin2(phi);
      return [
        atan22(y2, x2 * cosPhi03 - z * sinPhi03),
        asin2(z * cosPhi03 + x2 * sinPhi03)
      ];
    };
  }
  function hammerRetroazimuthal_default() {
    var phi03 = 0, m = projectionMutator(hammerRetroazimuthalRaw), p = m(phi03), rotate_ = p.rotate, stream_ = p.stream, circle2 = circle_default();
    p.parallel = function(_) {
      if (!arguments.length)
        return phi03 * degrees4;
      var r = p.rotate();
      return m(phi03 = _ * radians3).rotate(r);
    };
    p.rotate = function(_) {
      if (!arguments.length)
        return _ = rotate_.call(p), _[1] += phi03 * degrees4, _;
      rotate_.call(p, [_[0], _[1] - phi03 * degrees4]);
      circle2.center([-_[0], -_[1]]);
      return p;
    };
    p.stream = function(stream) {
      stream = stream_(stream);
      stream.sphere = function() {
        stream.polygonStart();
        var epsilon8 = 0.01, ring = circle2.radius(90 - epsilon8)().coordinates[0], n = ring.length - 1, i = -1, p2;
        stream.lineStart();
        while (++i < n)
          stream.point((p2 = ring[i])[0], p2[1]);
        stream.lineEnd();
        ring = circle2.radius(90 + epsilon8)().coordinates[0];
        n = ring.length - 1;
        stream.lineStart();
        while (--i >= 0)
          stream.point((p2 = ring[i])[0], p2[1]);
        stream.lineEnd();
        stream.polygonEnd();
      };
      return stream;
    };
    return p.scale(79.4187).parallel(45).clipAngle(180 - 1e-3);
  }
  var init_hammerRetroazimuthal = __esm(() => {
    init_src13();
    init_math3();
  });

  // node_modules/d3-geo-projection/src/healpix.js
  function healpixRaw(H) {
    var phi03 = healpixParallel * radians3, dx = collignonRaw(pi2, phi03)[0] - collignonRaw(-pi2, phi03)[0], y07 = healpixLambert(0, phi03)[1], y13 = collignonRaw(0, phi03)[1], dy1 = sqrtPi - y13, k3 = tau2 / H, w2 = 4 / tau2, h = y07 + dy1 * dy1 * 4 / tau2;
    function forward(lambda, phi) {
      var point6, phi2 = abs2(phi);
      if (phi2 > phi03) {
        var i = min2(H - 1, max2(0, floor((lambda + pi2) / k3)));
        lambda += pi2 * (H - 1) / H - i * k3;
        point6 = collignonRaw(lambda, phi2);
        point6[0] = point6[0] * tau2 / dx - tau2 * (H - 1) / (2 * H) + i * tau2 / H;
        point6[1] = y07 + (point6[1] - y13) * 4 * dy1 / tau2;
        if (phi < 0)
          point6[1] = -point6[1];
      } else {
        point6 = healpixLambert(lambda, phi);
      }
      point6[0] *= w2, point6[1] /= h;
      return point6;
    }
    forward.invert = function(x2, y2) {
      x2 /= w2, y2 *= h;
      var y22 = abs2(y2);
      if (y22 > y07) {
        var i = min2(H - 1, max2(0, floor((x2 + pi2) / k3)));
        x2 = (x2 + pi2 * (H - 1) / H - i * k3) * dx / tau2;
        var point6 = collignonRaw.invert(x2, 0.25 * (y22 - y07) * tau2 / dy1 + y13);
        point6[0] -= pi2 * (H - 1) / H - i * k3;
        if (y2 < 0)
          point6[1] = -point6[1];
        return point6;
      }
      return healpixLambert.invert(x2, y2);
    };
    return forward;
  }
  function sphereTop(x2, i) {
    return [x2, i & 1 ? 90 - epsilon4 : healpixParallel];
  }
  function sphereBottom(x2, i) {
    return [x2, i & 1 ? -90 + epsilon4 : -healpixParallel];
  }
  function sphereNudge(d) {
    return [d[0] * (1 - epsilon4), d[1]];
  }
  function sphere(step2) {
    var c2 = [].concat(range_default(-180, 180 + step2 / 2, step2).map(sphereTop), range_default(180, -180 - step2 / 2, -step2).map(sphereBottom));
    return {
      type: "Polygon",
      coordinates: [step2 === 180 ? c2.map(sphereNudge) : c2]
    };
  }
  function healpix_default() {
    var H = 4, m = projectionMutator(healpixRaw), p = m(H), stream_ = p.stream;
    p.lobes = function(_) {
      return arguments.length ? m(H = +_) : H;
    };
    p.stream = function(stream) {
      var rotate = p.rotate(), rotateStream = stream_(stream), sphereStream = (p.rotate([0, 0]), stream_(stream));
      p.rotate(rotate);
      rotateStream.sphere = function() {
        stream_default(sphere(180 / H), sphereStream);
      };
      return rotateStream;
    };
    return p.scale(239.75);
  }
  var K2, healpixParallel, healpixLambert;
  var init_healpix = __esm(() => {
    init_src5();
    init_src13();
    init_collignon();
    init_cylindricalEqualArea2();
    init_math3();
    K2 = 3;
    healpixParallel = asin2(1 - 1 / K2) * degrees4;
    healpixLambert = cylindricalEqualAreaRaw2(0);
  });

  // node_modules/d3-geo-projection/src/hill.js
  function hillRaw(K4) {
    var L = 1 + K4, sinBt = sin2(1 / L), Bt = asin2(sinBt), A6 = 2 * sqrt3(pi2 / (B3 = pi2 + 4 * Bt * L)), B3, rho0 = 0.5 * A6 * (L + sqrt3(K4 * (2 + K4))), K22 = K4 * K4, L2 = L * L;
    function forward(lambda, phi) {
      var t = 1 - sin2(phi), rho, omega;
      if (t && t < 2) {
        var theta = halfPi2 - phi, i = 25, delta;
        do {
          var sinTheta = sin2(theta), cosTheta = cos2(theta), Bt_Bt1 = Bt + atan22(sinTheta, L - cosTheta), C2 = 1 + L2 - 2 * L * cosTheta;
          theta -= delta = (theta - K22 * Bt - L * sinTheta + C2 * Bt_Bt1 - 0.5 * t * B3) / (2 * L * sinTheta * Bt_Bt1);
        } while (abs2(delta) > epsilon23 && --i > 0);
        rho = A6 * sqrt3(C2);
        omega = lambda * Bt_Bt1 / pi2;
      } else {
        rho = A6 * (K4 + t);
        omega = lambda * Bt / pi2;
      }
      return [
        rho * sin2(omega),
        rho0 - rho * cos2(omega)
      ];
    }
    forward.invert = function(x2, y2) {
      var rho2 = x2 * x2 + (y2 -= rho0) * y2, cosTheta = (1 + L2 - rho2 / (A6 * A6)) / (2 * L), theta = acos2(cosTheta), sinTheta = sin2(theta), Bt_Bt1 = Bt + atan22(sinTheta, L - cosTheta);
      return [
        asin2(x2 / sqrt3(rho2)) * pi2 / Bt_Bt1,
        asin2(1 - 2 * (theta - K22 * Bt - L * sinTheta + (1 + L2 - 2 * L * cosTheta) * Bt_Bt1) / B3)
      ];
    };
    return forward;
  }
  function hill_default() {
    var K4 = 1, m = projectionMutator(hillRaw), p = m(K4);
    p.ratio = function(_) {
      return arguments.length ? m(K4 = +_) : K4;
    };
    return p.scale(167.774).center([0, 18.67]);
  }
  var init_hill = __esm(() => {
    init_src13();
    init_math3();
  });

  // node_modules/d3-geo-projection/src/sinuMollweide.js
  function sinuMollweideRaw(lambda, phi) {
    return phi > -sinuMollweidePhi ? (lambda = mollweideRaw(lambda, phi), lambda[1] += sinuMollweideY, lambda) : sinusoidalRaw(lambda, phi);
  }
  function sinuMollweide_default() {
    return projection(sinuMollweideRaw).rotate([-20, -55]).scale(164.263).center([0, -5.4036]);
  }
  var sinuMollweidePhi, sinuMollweideY;
  var init_sinuMollweide = __esm(() => {
    init_src13();
    init_mollweide();
    init_sinusoidal();
    sinuMollweidePhi = 0.7109889596207567;
    sinuMollweideY = 0.0528035274542;
    sinuMollweideRaw.invert = function(x2, y2) {
      return y2 > -sinuMollweidePhi ? mollweideRaw.invert(x2, y2 - sinuMollweideY) : sinusoidalRaw.invert(x2, y2);
    };
  });

  // node_modules/d3-geo-projection/src/homolosine.js
  function homolosineRaw(lambda, phi) {
    return abs2(phi) > sinuMollweidePhi ? (lambda = mollweideRaw(lambda, phi), lambda[1] -= phi > 0 ? sinuMollweideY : -sinuMollweideY, lambda) : sinusoidalRaw(lambda, phi);
  }
  function homolosine_default() {
    return projection(homolosineRaw).scale(152.63);
  }
  var init_homolosine = __esm(() => {
    init_src13();
    init_math3();
    init_mollweide();
    init_sinusoidal();
    init_sinuMollweide();
    homolosineRaw.invert = function(x2, y2) {
      return abs2(y2) > sinuMollweidePhi ? mollweideRaw.invert(x2, y2 + (y2 > 0 ? sinuMollweideY : -sinuMollweideY)) : sinusoidalRaw.invert(x2, y2);
    };
  });

  // node_modules/d3-geo-projection/src/hufnagel.js
  function hufnagelRaw(a2, b, psiMax, ratio) {
    var k3 = sqrt3(4 * pi2 / (2 * psiMax + (1 + a2 - b / 2) * sin2(2 * psiMax) + (a2 + b) / 2 * sin2(4 * psiMax) + b / 2 * sin2(6 * psiMax))), c2 = sqrt3(ratio * sin2(psiMax) * sqrt3((1 + a2 * cos2(2 * psiMax) + b * cos2(4 * psiMax)) / (1 + a2 + b))), M2 = psiMax * mapping(1);
    function radius(psi) {
      return sqrt3(1 + a2 * cos2(2 * psi) + b * cos2(4 * psi));
    }
    function mapping(t) {
      var psi = t * psiMax;
      return (2 * psi + (1 + a2 - b / 2) * sin2(2 * psi) + (a2 + b) / 2 * sin2(4 * psi) + b / 2 * sin2(6 * psi)) / psiMax;
    }
    function inversemapping(psi) {
      return radius(psi) * sin2(psi);
    }
    var forward = function(lambda, phi) {
      var psi = psiMax * solve(mapping, M2 * sin2(phi) / psiMax, phi / pi2);
      if (isNaN(psi))
        psi = psiMax * sign2(phi);
      var kr2 = k3 * radius(psi);
      return [kr2 * c2 * lambda / pi2 * cos2(psi), kr2 / c2 * sin2(psi)];
    };
    forward.invert = function(x2, y2) {
      var psi = solve(inversemapping, y2 * c2 / k3);
      return [
        x2 * pi2 / (cos2(psi) * k3 * c2 * radius(psi)),
        asin2(psiMax * mapping(psi / psiMax) / M2)
      ];
    };
    if (psiMax === 0) {
      k3 = sqrt3(ratio / pi2);
      forward = function(lambda, phi) {
        return [lambda * k3, sin2(phi) / k3];
      };
      forward.invert = function(x2, y2) {
        return [x2 / k3, asin2(y2 * k3)];
      };
    }
    return forward;
  }
  function hufnagel_default() {
    var a2 = 1, b = 0, psiMax = 45 * radians3, ratio = 2, mutate = projectionMutator(hufnagelRaw), projection2 = mutate(a2, b, psiMax, ratio);
    projection2.a = function(_) {
      return arguments.length ? mutate(a2 = +_, b, psiMax, ratio) : a2;
    };
    projection2.b = function(_) {
      return arguments.length ? mutate(a2, b = +_, psiMax, ratio) : b;
    };
    projection2.psiMax = function(_) {
      return arguments.length ? mutate(a2, b, psiMax = +_ * radians3, ratio) : psiMax * degrees4;
    };
    projection2.ratio = function(_) {
      return arguments.length ? mutate(a2, b, psiMax, ratio = +_) : ratio;
    };
    return projection2.scale(180.739);
  }
  var init_hufnagel = __esm(() => {
    init_src13();
    init_math3();
    init_newton();
  });

  // node_modules/d3-geo-projection/src/integrate.js
  function adsimp(f, a2, b, fa, fm, fb, V0, tol, maxdepth, depth, state) {
    if (state.nanEncountered) {
      return NaN;
    }
    var h, f1, f2, sl, sr, s2, m, V1, V2, err;
    h = b - a2;
    f1 = f(a2 + h * 0.25);
    f2 = f(b - h * 0.25);
    if (isNaN(f1)) {
      state.nanEncountered = true;
      return;
    }
    if (isNaN(f2)) {
      state.nanEncountered = true;
      return;
    }
    sl = h * (fa + 4 * f1 + fm) / 12;
    sr = h * (fm + 4 * f2 + fb) / 12;
    s2 = sl + sr;
    err = (s2 - V0) / 15;
    if (depth > maxdepth) {
      state.maxDepthCount++;
      return s2 + err;
    } else if (Math.abs(err) < tol) {
      return s2 + err;
    } else {
      m = a2 + h * 0.5;
      V1 = adsimp(f, a2, m, fa, f1, fm, sl, tol * 0.5, maxdepth, depth + 1, state);
      if (isNaN(V1)) {
        state.nanEncountered = true;
        return NaN;
      }
      V2 = adsimp(f, m, b, fm, f2, fb, sr, tol * 0.5, maxdepth, depth + 1, state);
      if (isNaN(V2)) {
        state.nanEncountered = true;
        return NaN;
      }
      return V1 + V2;
    }
  }
  function integrate(f, a2, b, tol, maxdepth) {
    var state = {
      maxDepthCount: 0,
      nanEncountered: false
    };
    if (tol === void 0) {
      tol = 1e-8;
    }
    if (maxdepth === void 0) {
      maxdepth = 20;
    }
    var fa = f(a2);
    var fm = f(0.5 * (a2 + b));
    var fb = f(b);
    var V0 = (fa + 4 * fm + fb) * (b - a2) / 6;
    var result = adsimp(f, a2, b, fa, fm, fb, V0, tol, maxdepth, 1, state);
    return result;
  }
  var init_integrate = __esm(() => {
  });

  // node_modules/d3-geo-projection/src/hyperelliptical.js
  function hyperellipticalRaw(alpha, k3, gamma2) {
    function elliptic(f) {
      return alpha + (1 - alpha) * pow3(1 - pow3(f, k3), 1 / k3);
    }
    function z(f) {
      return integrate(elliptic, 0, f, 1e-4);
    }
    var G = 1 / z(1), n = 1e3, m = (1 + 1e-8) * G, approx = [];
    for (var i = 0; i <= n; i++)
      approx.push(z(i / n) * m);
    function Y(sinphi) {
      var rmin = 0, rmax = n, r = n >> 1;
      do {
        if (approx[r] > sinphi)
          rmax = r;
        else
          rmin = r;
        r = rmin + rmax >> 1;
      } while (r > rmin);
      var u = approx[r + 1] - approx[r];
      if (u)
        u = (sinphi - approx[r + 1]) / u;
      return (r + 1 + u) / n;
    }
    var ratio = 2 * Y(1) / pi2 * G / gamma2;
    var forward = function(lambda, phi) {
      var y2 = Y(abs2(sin2(phi))), x2 = elliptic(y2) * lambda;
      y2 /= ratio;
      return [x2, phi >= 0 ? y2 : -y2];
    };
    forward.invert = function(x2, y2) {
      var phi;
      y2 *= ratio;
      if (abs2(y2) < 1)
        phi = sign2(y2) * asin2(z(abs2(y2)) * G);
      return [x2 / elliptic(abs2(y2)), phi];
    };
    return forward;
  }
  function hyperelliptical_default() {
    var alpha = 0, k3 = 2.5, gamma2 = 1.183136, m = projectionMutator(hyperellipticalRaw), p = m(alpha, k3, gamma2);
    p.alpha = function(_) {
      return arguments.length ? m(alpha = +_, k3, gamma2) : alpha;
    };
    p.k = function(_) {
      return arguments.length ? m(alpha, k3 = +_, gamma2) : k3;
    };
    p.gamma = function(_) {
      return arguments.length ? m(alpha, k3, gamma2 = +_) : gamma2;
    };
    return p.scale(152.63);
  }
  var init_hyperelliptical = __esm(() => {
    init_src13();
    init_math3();
    init_integrate();
  });

  // node_modules/d3-geo-projection/src/interrupted/index.js
  function pointEqual(a2, b) {
    return abs2(a2[0] - b[0]) < epsilon4 && abs2(a2[1] - b[1]) < epsilon4;
  }
  function interpolateLine(coordinates2, m) {
    var i = -1, n = coordinates2.length, p02 = coordinates2[0], p1, dx, dy, resampled = [];
    while (++i < n) {
      p1 = coordinates2[i];
      dx = (p1[0] - p02[0]) / m;
      dy = (p1[1] - p02[1]) / m;
      for (var j = 0; j < m; ++j)
        resampled.push([p02[0] + j * dx, p02[1] + j * dy]);
      p02 = p1;
    }
    resampled.push(p1);
    return resampled;
  }
  function interpolateSphere(lobes8) {
    var coordinates2 = [], lobe, lambda04, phi03, phi12, lambda22, phi2, i, n = lobes8[0].length;
    for (i = 0; i < n; ++i) {
      lobe = lobes8[0][i];
      lambda04 = lobe[0][0], phi03 = lobe[0][1], phi12 = lobe[1][1];
      lambda22 = lobe[2][0], phi2 = lobe[2][1];
      coordinates2.push(interpolateLine([
        [lambda04 + epsilon4, phi03 + epsilon4],
        [lambda04 + epsilon4, phi12 - epsilon4],
        [lambda22 - epsilon4, phi12 - epsilon4],
        [lambda22 - epsilon4, phi2 + epsilon4]
      ], 30));
    }
    for (i = lobes8[1].length - 1; i >= 0; --i) {
      lobe = lobes8[1][i];
      lambda04 = lobe[0][0], phi03 = lobe[0][1], phi12 = lobe[1][1];
      lambda22 = lobe[2][0], phi2 = lobe[2][1];
      coordinates2.push(interpolateLine([
        [lambda22 - epsilon4, phi2 - epsilon4],
        [lambda22 - epsilon4, phi12 + epsilon4],
        [lambda04 + epsilon4, phi12 + epsilon4],
        [lambda04 + epsilon4, phi03 - epsilon4]
      ], 30));
    }
    return {
      type: "Polygon",
      coordinates: [merge(coordinates2)]
    };
  }
  function interrupted_default(project, lobes8, inverse2) {
    var sphere2, bounds;
    function forward(lambda, phi) {
      var sign4 = phi < 0 ? -1 : 1, lobe = lobes8[+(phi < 0)];
      for (var i = 0, n = lobe.length - 1; i < n && lambda > lobe[i][2][0]; ++i)
        ;
      var p2 = project(lambda - lobe[i][1][0], phi);
      p2[0] += project(lobe[i][1][0], sign4 * phi > sign4 * lobe[i][0][1] ? lobe[i][0][1] : phi)[0];
      return p2;
    }
    if (inverse2) {
      forward.invert = inverse2(forward);
    } else if (project.invert) {
      forward.invert = function(x2, y2) {
        var bound = bounds[+(y2 < 0)], lobe = lobes8[+(y2 < 0)];
        for (var i = 0, n = bound.length; i < n; ++i) {
          var b = bound[i];
          if (b[0][0] <= x2 && x2 < b[1][0] && b[0][1] <= y2 && y2 < b[1][1]) {
            var p2 = project.invert(x2 - project(lobe[i][1][0], 0)[0], y2);
            p2[0] += lobe[i][1][0];
            return pointEqual(forward(p2[0], p2[1]), [x2, y2]) ? p2 : null;
          }
        }
      };
    }
    var p = projection(forward), stream_ = p.stream;
    p.stream = function(stream) {
      var rotate = p.rotate(), rotateStream = stream_(stream), sphereStream = (p.rotate([0, 0]), stream_(stream));
      p.rotate(rotate);
      rotateStream.sphere = function() {
        stream_default(sphere2, sphereStream);
      };
      return rotateStream;
    };
    p.lobes = function(_) {
      if (!arguments.length)
        return lobes8.map(function(lobe) {
          return lobe.map(function(l) {
            return [
              [l[0][0] * degrees4, l[0][1] * degrees4],
              [l[1][0] * degrees4, l[1][1] * degrees4],
              [l[2][0] * degrees4, l[2][1] * degrees4]
            ];
          });
        });
      sphere2 = interpolateSphere(_);
      lobes8 = _.map(function(lobe) {
        return lobe.map(function(l) {
          return [
            [l[0][0] * radians3, l[0][1] * radians3],
            [l[1][0] * radians3, l[1][1] * radians3],
            [l[2][0] * radians3, l[2][1] * radians3]
          ];
        });
      });
      bounds = lobes8.map(function(lobe) {
        return lobe.map(function(l) {
          var x07 = project(l[0][0], l[0][1])[0], x13 = project(l[2][0], l[2][1])[0], y07 = project(l[1][0], l[0][1])[1], y13 = project(l[1][0], l[1][1])[1], t;
          if (y07 > y13)
            t = y07, y07 = y13, y13 = t;
          return [[x07, y07], [x13, y13]];
        });
      });
      return p;
    };
    if (lobes8 != null)
      p.lobes(lobes8);
    return p;
  }
  var init_interrupted = __esm(() => {
    init_src5();
    init_src13();
    init_math3();
  });

  // node_modules/d3-geo-projection/src/interrupted/boggs.js
  function boggs_default2() {
    return interrupted_default(boggsRaw, lobes).scale(160.857);
  }
  var lobes;
  var init_boggs2 = __esm(() => {
    init_boggs();
    init_interrupted();
    lobes = [[
      [[-180, 0], [-100, 90], [-40, 0]],
      [[-40, 0], [30, 90], [180, 0]]
    ], [
      [[-180, 0], [-160, -90], [-100, 0]],
      [[-100, 0], [-60, -90], [-20, 0]],
      [[-20, 0], [20, -90], [80, 0]],
      [[80, 0], [140, -90], [180, 0]]
    ]];
  });

  // node_modules/d3-geo-projection/src/interrupted/homolosine.js
  function homolosine_default2() {
    return interrupted_default(homolosineRaw, lobes2).scale(152.63);
  }
  var lobes2;
  var init_homolosine2 = __esm(() => {
    init_homolosine();
    init_interrupted();
    lobes2 = [[
      [[-180, 0], [-100, 90], [-40, 0]],
      [[-40, 0], [30, 90], [180, 0]]
    ], [
      [[-180, 0], [-160, -90], [-100, 0]],
      [[-100, 0], [-60, -90], [-20, 0]],
      [[-20, 0], [20, -90], [80, 0]],
      [[80, 0], [140, -90], [180, 0]]
    ]];
  });

  // node_modules/d3-geo-projection/src/interrupted/mollweide.js
  function mollweide_default2() {
    return interrupted_default(mollweideRaw, lobes3).scale(169.529);
  }
  var lobes3;
  var init_mollweide2 = __esm(() => {
    init_mollweide();
    init_interrupted();
    lobes3 = [[
      [[-180, 0], [-100, 90], [-40, 0]],
      [[-40, 0], [30, 90], [180, 0]]
    ], [
      [[-180, 0], [-160, -90], [-100, 0]],
      [[-100, 0], [-60, -90], [-20, 0]],
      [[-20, 0], [20, -90], [80, 0]],
      [[80, 0], [140, -90], [180, 0]]
    ]];
  });

  // node_modules/d3-geo-projection/src/interrupted/mollweideHemispheres.js
  function mollweideHemispheres_default() {
    return interrupted_default(mollweideRaw, lobes4).scale(169.529).rotate([20, 0]);
  }
  var lobes4;
  var init_mollweideHemispheres = __esm(() => {
    init_mollweide();
    init_interrupted();
    lobes4 = [[
      [[-180, 0], [-90, 90], [0, 0]],
      [[0, 0], [90, 90], [180, 0]]
    ], [
      [[-180, 0], [-90, -90], [0, 0]],
      [[0, 0], [90, -90], [180, 0]]
    ]];
  });

  // node_modules/d3-geo-projection/src/interrupted/sinuMollweide.js
  function sinuMollweide_default2() {
    return interrupted_default(sinuMollweideRaw, lobes5, solve2d).rotate([-20, -55]).scale(164.263).center([0, -5.4036]);
  }
  var lobes5;
  var init_sinuMollweide2 = __esm(() => {
    init_sinuMollweide();
    init_interrupted();
    init_newton();
    lobes5 = [[
      [[-180, 35], [-30, 90], [0, 35]],
      [[0, 35], [30, 90], [180, 35]]
    ], [
      [[-180, -10], [-102, -90], [-65, -10]],
      [[-65, -10], [5, -90], [77, -10]],
      [[77, -10], [103, -90], [180, -10]]
    ]];
  });

  // node_modules/d3-geo-projection/src/interrupted/sinusoidal.js
  function sinusoidal_default2() {
    return interrupted_default(sinusoidalRaw, lobes6).scale(152.63).rotate([-20, 0]);
  }
  var lobes6;
  var init_sinusoidal2 = __esm(() => {
    init_sinusoidal();
    init_interrupted();
    lobes6 = [[
      [[-180, 0], [-110, 90], [-40, 0]],
      [[-40, 0], [0, 90], [40, 0]],
      [[40, 0], [110, 90], [180, 0]]
    ], [
      [[-180, 0], [-110, -90], [-40, 0]],
      [[-40, 0], [0, -90], [40, 0]],
      [[40, 0], [110, -90], [180, 0]]
    ]];
  });

  // node_modules/d3-geo-projection/src/kavrayskiy7.js
  function kavrayskiy7Raw(lambda, phi) {
    return [3 / tau2 * lambda * sqrt3(pi2 * pi2 / 3 - phi * phi), phi];
  }
  function kavrayskiy7_default() {
    return projection(kavrayskiy7Raw).scale(158.837);
  }
  var init_kavrayskiy7 = __esm(() => {
    init_src13();
    init_math3();
    kavrayskiy7Raw.invert = function(x2, y2) {
      return [tau2 / 3 * x2 / sqrt3(pi2 * pi2 / 3 - y2 * y2), y2];
    };
  });

  // node_modules/d3-geo-projection/src/lagrange.js
  function lagrangeRaw(n) {
    function forward(lambda, phi) {
      if (abs2(abs2(phi) - halfPi2) < epsilon4)
        return [0, phi < 0 ? -2 : 2];
      var sinPhi = sin2(phi), v = pow3((1 + sinPhi) / (1 - sinPhi), n / 2), c2 = 0.5 * (v + 1 / v) + cos2(lambda *= n);
      return [
        2 * sin2(lambda) / c2,
        (v - 1 / v) / c2
      ];
    }
    forward.invert = function(x2, y2) {
      var y07 = abs2(y2);
      if (abs2(y07 - 2) < epsilon4)
        return x2 ? null : [0, sign2(y2) * halfPi2];
      if (y07 > 2)
        return null;
      x2 /= 2, y2 /= 2;
      var x22 = x2 * x2, y22 = y2 * y2, t = 2 * y2 / (1 + x22 + y22);
      t = pow3((1 + t) / (1 - t), 1 / n);
      return [
        atan22(2 * x2, 1 - x22 - y22) / n,
        asin2((t - 1) / (t + 1))
      ];
    };
    return forward;
  }
  function lagrange_default() {
    var n = 0.5, m = projectionMutator(lagrangeRaw), p = m(n);
    p.spacing = function(_) {
      return arguments.length ? m(n = +_) : n;
    };
    return p.scale(124.75);
  }
  var init_lagrange = __esm(() => {
    init_src13();
    init_math3();
  });

  // node_modules/d3-geo-projection/src/larrivee.js
  function larriveeRaw(lambda, phi) {
    return [
      lambda * (1 + sqrt3(cos2(phi))) / 2,
      phi / (cos2(phi / 2) * cos2(lambda / 6))
    ];
  }
  function larrivee_default() {
    return projection(larriveeRaw).scale(97.2672);
  }
  var pi_sqrt2;
  var init_larrivee = __esm(() => {
    init_src13();
    init_math3();
    pi_sqrt2 = pi2 / sqrt22;
    larriveeRaw.invert = function(x2, y2) {
      var x07 = abs2(x2), y07 = abs2(y2), lambda = epsilon4, phi = halfPi2;
      if (y07 < pi_sqrt2)
        phi *= y07 / pi_sqrt2;
      else
        lambda += 6 * acos2(pi_sqrt2 / y07);
      for (var i = 0; i < 25; i++) {
        var sinPhi = sin2(phi), sqrtcosPhi = sqrt3(cos2(phi)), sinPhi_2 = sin2(phi / 2), cosPhi_2 = cos2(phi / 2), sinLambda_6 = sin2(lambda / 6), cosLambda_6 = cos2(lambda / 6), f0 = 0.5 * lambda * (1 + sqrtcosPhi) - x07, f1 = phi / (cosPhi_2 * cosLambda_6) - y07, df0dPhi = sqrtcosPhi ? -0.25 * lambda * sinPhi / sqrtcosPhi : 0, df0dLambda = 0.5 * (1 + sqrtcosPhi), df1dPhi = (1 + 0.5 * phi * sinPhi_2 / cosPhi_2) / (cosPhi_2 * cosLambda_6), df1dLambda = phi / cosPhi_2 * (sinLambda_6 / 6) / (cosLambda_6 * cosLambda_6), denom = df0dPhi * df1dLambda - df1dPhi * df0dLambda, dPhi = (f0 * df1dLambda - f1 * df0dLambda) / denom, dLambda = (f1 * df0dPhi - f0 * df1dPhi) / denom;
        phi -= dPhi;
        lambda -= dLambda;
        if (abs2(dPhi) < epsilon4 && abs2(dLambda) < epsilon4)
          break;
      }
      return [x2 < 0 ? -lambda : lambda, y2 < 0 ? -phi : phi];
    };
  });

  // node_modules/d3-geo-projection/src/laskowski.js
  function laskowskiRaw(lambda, phi) {
    var lambda22 = lambda * lambda, phi2 = phi * phi;
    return [
      lambda * (0.975534 + phi2 * (-0.119161 + lambda22 * -0.0143059 + phi2 * -0.0547009)),
      phi * (1.00384 + lambda22 * (0.0802894 + phi2 * -0.02855 + lambda22 * 199025e-9) + phi2 * (0.0998909 + phi2 * -0.0491032))
    ];
  }
  function laskowski_default() {
    return projection(laskowskiRaw).scale(139.98);
  }
  var init_laskowski = __esm(() => {
    init_src13();
    init_math3();
    laskowskiRaw.invert = function(x2, y2) {
      var lambda = sign2(x2) * pi2, phi = y2 / 2, i = 50;
      do {
        var lambda22 = lambda * lambda, phi2 = phi * phi, lambdaPhi = lambda * phi, fx = lambda * (0.975534 + phi2 * (-0.119161 + lambda22 * -0.0143059 + phi2 * -0.0547009)) - x2, fy = phi * (1.00384 + lambda22 * (0.0802894 + phi2 * -0.02855 + lambda22 * 199025e-9) + phi2 * (0.0998909 + phi2 * -0.0491032)) - y2, deltaxDeltaLambda = 0.975534 - phi2 * (0.119161 + 3 * lambda22 * 0.0143059 + phi2 * 0.0547009), deltaxDeltaPhi = -lambdaPhi * (2 * 0.119161 + 4 * 0.0547009 * phi2 + 2 * 0.0143059 * lambda22), deltayDeltaLambda = lambdaPhi * (2 * 0.0802894 + 4 * 199025e-9 * lambda22 + 2 * -0.02855 * phi2), deltayDeltaPhi = 1.00384 + lambda22 * (0.0802894 + 199025e-9 * lambda22) + phi2 * (3 * (0.0998909 - 0.02855 * lambda22) - 5 * 0.0491032 * phi2), denominator = deltaxDeltaPhi * deltayDeltaLambda - deltayDeltaPhi * deltaxDeltaLambda, deltaLambda = (fy * deltaxDeltaPhi - fx * deltayDeltaPhi) / denominator, deltaPhi = (fx * deltayDeltaLambda - fy * deltaxDeltaLambda) / denominator;
        lambda -= deltaLambda, phi -= deltaPhi;
      } while ((abs2(deltaLambda) > epsilon4 || abs2(deltaPhi) > epsilon4) && --i > 0);
      return i && [lambda, phi];
    };
  });

  // node_modules/d3-geo-projection/src/littrow.js
  function littrowRaw(lambda, phi) {
    return [
      sin2(lambda) / cos2(phi),
      tan2(phi) * cos2(lambda)
    ];
  }
  function littrow_default() {
    return projection(littrowRaw).scale(144.049).clipAngle(90 - 1e-3);
  }
  var init_littrow = __esm(() => {
    init_src13();
    init_math3();
    littrowRaw.invert = function(x2, y2) {
      var x22 = x2 * x2, y22 = y2 * y2, y2_1 = y22 + 1, x2_y2_1 = x22 + y2_1, cosPhi = x2 ? sqrt1_2 * sqrt3((x2_y2_1 - sqrt3(x2_y2_1 * x2_y2_1 - 4 * x22)) / x22) : 1 / sqrt3(y2_1);
      return [
        asin2(x2 * cosPhi),
        sign2(y2) * acos2(cosPhi)
      ];
    };
  });

  // node_modules/d3-geo-projection/src/loximuthal.js
  function loximuthalRaw(phi03) {
    var cosPhi03 = cos2(phi03), tanPhi0 = tan2(quarterPi2 + phi03 / 2);
    function forward(lambda, phi) {
      var y2 = phi - phi03, x2 = abs2(y2) < epsilon4 ? lambda * cosPhi03 : abs2(x2 = quarterPi2 + phi / 2) < epsilon4 || abs2(abs2(x2) - halfPi2) < epsilon4 ? 0 : lambda * y2 / log3(tan2(x2) / tanPhi0);
      return [x2, y2];
    }
    forward.invert = function(x2, y2) {
      var lambda, phi = y2 + phi03;
      return [
        abs2(y2) < epsilon4 ? x2 / cosPhi03 : abs2(lambda = quarterPi2 + phi / 2) < epsilon4 || abs2(abs2(lambda) - halfPi2) < epsilon4 ? 0 : x2 * log3(tan2(lambda) / tanPhi0) / y2,
        phi
      ];
    };
    return forward;
  }
  function loximuthal_default() {
    return parallel1_default(loximuthalRaw).parallel(40).scale(158.837);
  }
  var init_loximuthal = __esm(() => {
    init_parallel1();
    init_math3();
  });

  // node_modules/d3-geo-projection/src/miller.js
  function millerRaw(lambda, phi) {
    return [lambda, 1.25 * log3(tan2(quarterPi2 + 0.4 * phi))];
  }
  function miller_default() {
    return projection(millerRaw).scale(108.318);
  }
  var init_miller = __esm(() => {
    init_src13();
    init_math3();
    millerRaw.invert = function(x2, y2) {
      return [x2, 2.5 * atan3(exp2(0.8 * y2)) - 0.625 * pi2];
    };
  });

  // node_modules/d3-geo-projection/src/modifiedStereographic.js
  function modifiedStereographicRaw(C2) {
    var m = C2.length - 1;
    function forward(lambda, phi) {
      var cosPhi = cos2(phi), k3 = 2 / (1 + cosPhi * cos2(lambda)), zr = k3 * cosPhi * sin2(lambda), zi = k3 * sin2(phi), i = m, w2 = C2[i], ar = w2[0], ai = w2[1], t;
      while (--i >= 0) {
        w2 = C2[i];
        ar = w2[0] + zr * (t = ar) - zi * ai;
        ai = w2[1] + zr * ai + zi * t;
      }
      ar = zr * (t = ar) - zi * ai;
      ai = zr * ai + zi * t;
      return [ar, ai];
    }
    forward.invert = function(x2, y2) {
      var i = 20, zr = x2, zi = y2;
      do {
        var j = m, w2 = C2[j], ar = w2[0], ai = w2[1], br = 0, bi = 0, t;
        while (--j >= 0) {
          w2 = C2[j];
          br = ar + zr * (t = br) - zi * bi;
          bi = ai + zr * bi + zi * t;
          ar = w2[0] + zr * (t = ar) - zi * ai;
          ai = w2[1] + zr * ai + zi * t;
        }
        br = ar + zr * (t = br) - zi * bi;
        bi = ai + zr * bi + zi * t;
        ar = zr * (t = ar) - zi * ai - x2;
        ai = zr * ai + zi * t - y2;
        var denominator = br * br + bi * bi, deltar, deltai;
        zr -= deltar = (ar * br + ai * bi) / denominator;
        zi -= deltai = (ai * br - ar * bi) / denominator;
      } while (abs2(deltar) + abs2(deltai) > epsilon4 * epsilon4 && --i > 0);
      if (i) {
        var rho = sqrt3(zr * zr + zi * zi), c2 = 2 * atan3(rho * 0.5), sinc = sin2(c2);
        return [atan22(zr * sinc, rho * cos2(c2)), rho ? asin2(zi * sinc / rho) : 0];
      }
    };
    return forward;
  }
  function modifiedStereographicAlaska() {
    return modifiedStereographic(alaska, [152, -64]).scale(1400).center([-160.908, 62.4864]).clipAngle(30).angle(7.8);
  }
  function modifiedStereographicGs48() {
    return modifiedStereographic(gs48, [95, -38]).scale(1e3).clipAngle(55).center([-96.5563, 38.8675]);
  }
  function modifiedStereographicGs50() {
    return modifiedStereographic(gs50, [120, -45]).scale(359.513).clipAngle(55).center([-117.474, 53.0628]);
  }
  function modifiedStereographicMiller() {
    return modifiedStereographic(miller, [-20, -18]).scale(209.091).center([20, 16.7214]).clipAngle(82);
  }
  function modifiedStereographicLee() {
    return modifiedStereographic(lee, [165, 10]).scale(250).clipAngle(130).center([-165, -10]);
  }
  function modifiedStereographic(coefficients, rotate) {
    var p = projection(modifiedStereographicRaw(coefficients)).rotate(rotate).clipAngle(90), r = rotation_default(rotate), center2 = p.center;
    delete p.rotate;
    p.center = function(_) {
      return arguments.length ? center2(r(_)) : r.invert(center2());
    };
    return p;
  }
  var alaska, gs48, gs50, miller, lee;
  var init_modifiedStereographic = __esm(() => {
    init_src13();
    init_math3();
    alaska = [[0.9972523, 0], [52513e-7, -41175e-7], [74606e-7, 48125e-7], [-0.0153783, -0.1968253], [0.0636871, -0.1408027], [0.3660976, -0.2937382]];
    gs48 = [[0.98879, 0], [0, 0], [-0.050909, 0], [0, 0], [0.075528, 0]];
    gs50 = [[0.984299, 0], [0.0211642, 37608e-7], [-0.1036018, -0.0575102], [-0.0329095, -0.0320119], [0.0499471, 0.1223335], [0.026046, 0.0899805], [7388e-7, -0.1435792], [75848e-7, -0.1334108], [-0.0216473, 0.0776645], [-0.0225161, 0.0853673]];
    miller = [[0.9245, 0], [0, 0], [0.01943, 0]];
    lee = [[0.721316, 0], [0, 0], [-881625e-8, -617325e-8]];
  });

  // node_modules/d3-geo-projection/src/mtFlatPolarParabolic.js
  function mtFlatPolarParabolicRaw(lambda, phi) {
    var theta = asin2(7 * sin2(phi) / (3 * sqrt6));
    return [
      sqrt6 * lambda * (2 * cos2(2 * theta / 3) - 1) / sqrt7,
      9 * sin2(theta / 3) / sqrt7
    ];
  }
  function mtFlatPolarParabolic_default() {
    return projection(mtFlatPolarParabolicRaw).scale(164.859);
  }
  var sqrt6, sqrt7;
  var init_mtFlatPolarParabolic = __esm(() => {
    init_src13();
    init_math3();
    sqrt6 = sqrt3(6);
    sqrt7 = sqrt3(7);
    mtFlatPolarParabolicRaw.invert = function(x2, y2) {
      var theta = 3 * asin2(y2 * sqrt7 / 9);
      return [
        x2 * sqrt7 / (sqrt6 * (2 * cos2(2 * theta / 3) - 1)),
        asin2(sin2(theta) * 3 * sqrt6 / 7)
      ];
    };
  });

  // node_modules/d3-geo-projection/src/mtFlatPolarQuartic.js
  function mtFlatPolarQuarticRaw(lambda, phi) {
    var k3 = (1 + sqrt1_2) * sin2(phi), theta = phi;
    for (var i = 0, delta; i < 25; i++) {
      theta -= delta = (sin2(theta / 2) + sin2(theta) - k3) / (0.5 * cos2(theta / 2) + cos2(theta));
      if (abs2(delta) < epsilon4)
        break;
    }
    return [
      lambda * (1 + 2 * cos2(theta) / cos2(theta / 2)) / (3 * sqrt22),
      2 * sqrt3(3) * sin2(theta / 2) / sqrt3(2 + sqrt22)
    ];
  }
  function mtFlatPolarQuartic_default() {
    return projection(mtFlatPolarQuarticRaw).scale(188.209);
  }
  var init_mtFlatPolarQuartic = __esm(() => {
    init_src13();
    init_math3();
    mtFlatPolarQuarticRaw.invert = function(x2, y2) {
      var sinTheta_2 = y2 * sqrt3(2 + sqrt22) / (2 * sqrt3(3)), theta = 2 * asin2(sinTheta_2);
      return [
        3 * sqrt22 * x2 / (1 + 2 * cos2(theta) / cos2(theta / 2)),
        asin2((sinTheta_2 + sin2(theta)) / (1 + sqrt1_2))
      ];
    };
  });

  // node_modules/d3-geo-projection/src/mtFlatPolarSinusoidal.js
  function mtFlatPolarSinusoidalRaw(lambda, phi) {
    var A6 = sqrt3(6 / (4 + pi2)), k3 = (1 + pi2 / 4) * sin2(phi), theta = phi / 2;
    for (var i = 0, delta; i < 25; i++) {
      theta -= delta = (theta / 2 + sin2(theta) - k3) / (0.5 + cos2(theta));
      if (abs2(delta) < epsilon4)
        break;
    }
    return [
      A6 * (0.5 + cos2(theta)) * lambda / 1.5,
      A6 * theta
    ];
  }
  function mtFlatPolarSinusoidal_default() {
    return projection(mtFlatPolarSinusoidalRaw).scale(166.518);
  }
  var init_mtFlatPolarSinusoidal = __esm(() => {
    init_src13();
    init_math3();
    mtFlatPolarSinusoidalRaw.invert = function(x2, y2) {
      var A6 = sqrt3(6 / (4 + pi2)), theta = y2 / A6;
      if (abs2(abs2(theta) - halfPi2) < epsilon4)
        theta = theta < 0 ? -halfPi2 : halfPi2;
      return [
        1.5 * x2 / (A6 * (0.5 + cos2(theta))),
        asin2((theta / 2 + sin2(theta)) / (1 + pi2 / 4))
      ];
    };
  });

  // node_modules/d3-geo-projection/src/naturalEarth2.js
  function naturalEarth2Raw(lambda, phi) {
    var phi2 = phi * phi, phi4 = phi2 * phi2, phi6 = phi2 * phi4;
    return [
      lambda * (0.84719 - 0.13063 * phi2 + phi6 * phi6 * (-0.04515 + 0.05494 * phi2 - 0.02326 * phi4 + 331e-5 * phi6)),
      phi * (1.01183 + phi4 * phi4 * (-0.02625 + 0.01926 * phi2 - 396e-5 * phi4))
    ];
  }
  function naturalEarth2_default() {
    return projection(naturalEarth2Raw).scale(175.295);
  }
  var init_naturalEarth2 = __esm(() => {
    init_src13();
    init_math3();
    naturalEarth2Raw.invert = function(x2, y2) {
      var phi = y2, i = 25, delta, phi2, phi4, phi6;
      do {
        phi2 = phi * phi;
        phi4 = phi2 * phi2;
        phi -= delta = (phi * (1.01183 + phi4 * phi4 * (-0.02625 + 0.01926 * phi2 - 396e-5 * phi4)) - y2) / (1.01183 + phi4 * phi4 * (9 * -0.02625 + 11 * 0.01926 * phi2 + 13 * -396e-5 * phi4));
      } while (abs2(delta) > epsilon23 && --i > 0);
      phi2 = phi * phi;
      phi4 = phi2 * phi2;
      phi6 = phi2 * phi4;
      return [
        x2 / (0.84719 - 0.13063 * phi2 + phi6 * phi6 * (-0.04515 + 0.05494 * phi2 - 0.02326 * phi4 + 331e-5 * phi6)),
        phi
      ];
    };
  });

  // node_modules/d3-geo-projection/src/nellHammer.js
  function nellHammerRaw(lambda, phi) {
    return [
      lambda * (1 + cos2(phi)) / 2,
      2 * (phi - tan2(phi / 2))
    ];
  }
  function nellHammer_default() {
    return projection(nellHammerRaw).scale(152.63);
  }
  var init_nellHammer = __esm(() => {
    init_src13();
    init_math3();
    nellHammerRaw.invert = function(x2, y2) {
      var p = y2 / 2;
      for (var i = 0, delta = Infinity; i < 10 && abs2(delta) > epsilon4; ++i) {
        var c2 = cos2(y2 / 2);
        y2 -= delta = (y2 - tan2(y2 / 2) - p) / (1 - 0.5 / (c2 * c2));
      }
      return [
        2 * x2 / (1 + cos2(y2)),
        y2
      ];
    };
  });

  // node_modules/d3-geo-projection/src/interrupted/quarticAuthalic.js
  function quarticAuthalic_default() {
    return interrupted_default(hammerRaw(Infinity), lobes7).rotate([20, 0]).scale(152.63);
  }
  var lobes7;
  var init_quarticAuthalic = __esm(() => {
    init_hammer();
    init_interrupted();
    lobes7 = [[
      [[-180, 0], [-90, 90], [0, 0]],
      [[0, 0], [90, 90], [180, 0]]
    ], [
      [[-180, 0], [-90, -90], [0, 0]],
      [[0, 0], [90, -90], [180, 0]]
    ]];
  });

  // node_modules/d3-geo-projection/src/nicolosi.js
  function nicolosiRaw(lambda, phi) {
    var sinPhi = sin2(phi), q = cos2(phi), s2 = sign2(lambda);
    if (lambda === 0 || abs2(phi) === halfPi2)
      return [0, phi];
    else if (phi === 0)
      return [lambda, 0];
    else if (abs2(lambda) === halfPi2)
      return [lambda * q, halfPi2 * sinPhi];
    var b = pi2 / (2 * lambda) - 2 * lambda / pi2, c2 = 2 * phi / pi2, d = (1 - c2 * c2) / (sinPhi - c2);
    var b2 = b * b, d2 = d * d, b2d2 = 1 + b2 / d2, d2b2 = 1 + d2 / b2;
    var M2 = (b * sinPhi / d - b / 2) / b2d2, N = (d2 * sinPhi / b2 + d / 2) / d2b2, m = M2 * M2 + q * q / b2d2, n = N * N - (d2 * sinPhi * sinPhi / b2 + d * sinPhi - 1) / d2b2;
    return [
      halfPi2 * (M2 + sqrt3(m) * s2),
      halfPi2 * (N + sqrt3(n < 0 ? 0 : n) * sign2(-phi * b) * s2)
    ];
  }
  function nicolosi_default() {
    return projection(nicolosiRaw).scale(127.267);
  }
  var init_nicolosi = __esm(() => {
    init_src13();
    init_math3();
    init_newton();
    nicolosiRaw.invert = function(x2, y2) {
      x2 /= halfPi2;
      y2 /= halfPi2;
      var x22 = x2 * x2, y22 = y2 * y2, x2y2 = x22 + y22, pi22 = pi2 * pi2;
      return [
        x2 ? (x2y2 - 1 + sqrt3((1 - x2y2) * (1 - x2y2) + 4 * x22)) / (2 * x2) * halfPi2 : 0,
        solve(function(phi) {
          return x2y2 * (pi2 * sin2(phi) - 2 * phi) * pi2 + 4 * phi * phi * (y2 - sin2(phi)) + 2 * pi2 * phi - pi22 * y2;
        }, 0)
      ];
    };
  });

  // node_modules/d3-geo-projection/src/patterson.js
  function pattersonRaw(lambda, phi) {
    var phi2 = phi * phi;
    return [
      lambda,
      phi * (pattersonK1 + phi2 * phi2 * (pattersonK2 + phi2 * (pattersonK3 + pattersonK4 * phi2)))
    ];
  }
  function patterson_default() {
    return projection(pattersonRaw).scale(139.319);
  }
  var pattersonK1, pattersonK2, pattersonK3, pattersonK4, pattersonC1, pattersonC2, pattersonC3, pattersonC4, pattersonYmax;
  var init_patterson = __esm(() => {
    init_src13();
    init_math3();
    pattersonK1 = 1.0148;
    pattersonK2 = 0.23185;
    pattersonK3 = -0.14499;
    pattersonK4 = 0.02406;
    pattersonC1 = pattersonK1;
    pattersonC2 = 5 * pattersonK2;
    pattersonC3 = 7 * pattersonK3;
    pattersonC4 = 9 * pattersonK4;
    pattersonYmax = 1.790857183;
    pattersonRaw.invert = function(x2, y2) {
      if (y2 > pattersonYmax)
        y2 = pattersonYmax;
      else if (y2 < -pattersonYmax)
        y2 = -pattersonYmax;
      var yc = y2, delta;
      do {
        var y22 = yc * yc;
        yc -= delta = (yc * (pattersonK1 + y22 * y22 * (pattersonK2 + y22 * (pattersonK3 + pattersonK4 * y22))) - y2) / (pattersonC1 + y22 * y22 * (pattersonC2 + y22 * (pattersonC3 + pattersonC4 * y22)));
      } while (abs2(delta) > epsilon4);
      return [x2, yc];
    };
  });

  // node_modules/d3-geo-projection/src/polyconic.js
  function polyconicRaw(lambda, phi) {
    if (abs2(phi) < epsilon4)
      return [lambda, 0];
    var tanPhi = tan2(phi), k3 = lambda * sin2(phi);
    return [
      sin2(k3) / tanPhi,
      phi + (1 - cos2(k3)) / tanPhi
    ];
  }
  function polyconic_default() {
    return projection(polyconicRaw).scale(103.74);
  }
  var init_polyconic = __esm(() => {
    init_src13();
    init_math3();
    polyconicRaw.invert = function(x2, y2) {
      if (abs2(y2) < epsilon4)
        return [x2, 0];
      var k3 = x2 * x2 + y2 * y2, phi = y2 * 0.5, i = 10, delta;
      do {
        var tanPhi = tan2(phi), secPhi = 1 / cos2(phi), j = k3 - 2 * y2 * phi + phi * phi;
        phi -= delta = (tanPhi * j + 2 * (phi - y2)) / (2 + j * secPhi * secPhi + 2 * (phi - y2) * tanPhi);
      } while (abs2(delta) > epsilon4 && --i > 0);
      tanPhi = tan2(phi);
      return [
        (abs2(y2) < abs2(phi + 1 / tanPhi) ? asin2(x2 * tanPhi) : sign2(y2) * sign2(x2) * (acos2(abs2(x2 * tanPhi)) + halfPi2)) / sin2(phi),
        phi
      ];
    };
  });

  // node_modules/d3-geo-projection/src/polyhedral/matrix.js
  function matrix_default(a2, b) {
    var u = subtract(a2[1], a2[0]), v = subtract(b[1], b[0]), phi = angle3(u, v), s2 = length3(u) / length3(v);
    return multiply([
      1,
      0,
      a2[0][0],
      0,
      1,
      a2[0][1]
    ], multiply([
      s2,
      0,
      0,
      0,
      s2,
      0
    ], multiply([
      cos2(phi),
      sin2(phi),
      0,
      -sin2(phi),
      cos2(phi),
      0
    ], [
      1,
      0,
      -b[0][0],
      0,
      1,
      -b[0][1]
    ])));
  }
  function inverse(m) {
    var k3 = 1 / (m[0] * m[4] - m[1] * m[3]);
    return [
      k3 * m[4],
      -k3 * m[1],
      k3 * (m[1] * m[5] - m[2] * m[4]),
      -k3 * m[3],
      k3 * m[0],
      k3 * (m[2] * m[3] - m[0] * m[5])
    ];
  }
  function multiply(a2, b) {
    return [
      a2[0] * b[0] + a2[1] * b[3],
      a2[0] * b[1] + a2[1] * b[4],
      a2[0] * b[2] + a2[1] * b[5] + a2[2],
      a2[3] * b[0] + a2[4] * b[3],
      a2[3] * b[1] + a2[4] * b[4],
      a2[3] * b[2] + a2[4] * b[5] + a2[5]
    ];
  }
  function subtract(a2, b) {
    return [a2[0] - b[0], a2[1] - b[1]];
  }
  function length3(v) {
    return sqrt3(v[0] * v[0] + v[1] * v[1]);
  }
  function angle3(a2, b) {
    return atan22(a2[0] * b[1] - a2[1] * b[0], a2[0] * b[0] + a2[1] * b[1]);
  }
  var init_matrix = __esm(() => {
    init_math3();
  });

  // node_modules/d3-geo-projection/src/polyhedral/index.js
  function polyhedral_default(root3, face) {
    recurse(root3, {transform: null});
    function recurse(node, parent) {
      node.edges = faceEdges(node.face);
      if (parent.face) {
        var shared = node.shared = sharedEdge(node.face, parent.face), m = matrix_default(shared.map(parent.project), shared.map(node.project));
        node.transform = parent.transform ? multiply(parent.transform, m) : m;
        var edges = parent.edges;
        for (var i = 0, n = edges.length; i < n; ++i) {
          if (pointEqual2(shared[0], edges[i][1]) && pointEqual2(shared[1], edges[i][0]))
            edges[i] = node;
          if (pointEqual2(shared[0], edges[i][0]) && pointEqual2(shared[1], edges[i][1]))
            edges[i] = node;
        }
        edges = node.edges;
        for (i = 0, n = edges.length; i < n; ++i) {
          if (pointEqual2(shared[0], edges[i][0]) && pointEqual2(shared[1], edges[i][1]))
            edges[i] = parent;
          if (pointEqual2(shared[0], edges[i][1]) && pointEqual2(shared[1], edges[i][0]))
            edges[i] = parent;
        }
      } else {
        node.transform = parent.transform;
      }
      if (node.children) {
        node.children.forEach(function(child) {
          recurse(child, node);
        });
      }
      return node;
    }
    function forward(lambda, phi) {
      var node = face(lambda, phi), point6 = node.project([lambda * degrees4, phi * degrees4]), t;
      if (t = node.transform) {
        return [
          t[0] * point6[0] + t[1] * point6[1] + t[2],
          -(t[3] * point6[0] + t[4] * point6[1] + t[5])
        ];
      }
      point6[1] = -point6[1];
      return point6;
    }
    if (hasInverse(root3))
      forward.invert = function(x2, y2) {
        var coordinates2 = faceInvert(root3, [x2, -y2]);
        return coordinates2 && (coordinates2[0] *= radians3, coordinates2[1] *= radians3, coordinates2);
      };
    function faceInvert(node, coordinates2) {
      var invert = node.project.invert, t = node.transform, point6 = coordinates2;
      if (t) {
        t = inverse(t);
        point6 = [
          t[0] * point6[0] + t[1] * point6[1] + t[2],
          t[3] * point6[0] + t[4] * point6[1] + t[5]
        ];
      }
      if (invert && node === faceDegrees(p = invert(point6)))
        return p;
      var p, children2 = node.children;
      for (var i = 0, n = children2 && children2.length; i < n; ++i) {
        if (p = faceInvert(children2[i], coordinates2))
          return p;
      }
    }
    function faceDegrees(coordinates2) {
      return face(coordinates2[0] * radians3, coordinates2[1] * radians3);
    }
    var proj = projection(forward), stream_ = proj.stream;
    proj.stream = function(stream) {
      var rotate = proj.rotate(), rotateStream = stream_(stream), sphereStream = (proj.rotate([0, 0]), stream_(stream));
      proj.rotate(rotate);
      rotateStream.sphere = function() {
        sphereStream.polygonStart();
        sphereStream.lineStart();
        outline(sphereStream, root3);
        sphereStream.lineEnd();
        sphereStream.polygonEnd();
      };
      return rotateStream;
    };
    return proj.angle(-30);
  }
  function outline(stream, node, parent) {
    var point6, edges = node.edges, n = edges.length, edge, multiPoint = {type: "MultiPoint", coordinates: node.face}, notPoles = node.face.filter(function(d) {
      return abs2(d[1]) !== 90;
    }), b = bounds_default({type: "MultiPoint", coordinates: notPoles}), inside = false, j = -1, dx = b[1][0] - b[0][0];
    var c2 = dx === 180 || dx === 360 ? [(b[0][0] + b[1][0]) / 2, (b[0][1] + b[1][1]) / 2] : centroid_default(multiPoint);
    if (parent)
      while (++j < n) {
        if (edges[j] === parent)
          break;
      }
    ++j;
    for (var i = 0; i < n; ++i) {
      edge = edges[(i + j) % n];
      if (Array.isArray(edge)) {
        if (!inside) {
          stream.point((point6 = interpolate_default(edge[0], c2)(epsilon4))[0], point6[1]);
          inside = true;
        }
        stream.point((point6 = interpolate_default(edge[1], c2)(epsilon4))[0], point6[1]);
      } else {
        inside = false;
        if (edge !== parent)
          outline(stream, edge, node);
      }
    }
  }
  function pointEqual2(a2, b) {
    return a2 && b && a2[0] === b[0] && a2[1] === b[1];
  }
  function sharedEdge(a2, b) {
    var x2, y2, n = a2.length, found = null;
    for (var i = 0; i < n; ++i) {
      x2 = a2[i];
      for (var j = b.length; --j >= 0; ) {
        y2 = b[j];
        if (x2[0] === y2[0] && x2[1] === y2[1]) {
          if (found)
            return [found, x2];
          found = x2;
        }
      }
    }
  }
  function faceEdges(face) {
    var n = face.length, edges = [];
    for (var a2 = face[n - 1], i = 0; i < n; ++i)
      edges.push([a2, a2 = face[i]]);
    return edges;
  }
  function hasInverse(node) {
    return node.project.invert || node.children && node.children.some(hasInverse);
  }
  var init_polyhedral = __esm(() => {
    init_src13();
    init_math3();
    init_matrix();
  });

  // node_modules/d3-geo-projection/src/polyhedral/octahedron.js
  var octahedron, octahedron_default;
  var init_octahedron = __esm(() => {
    octahedron = [
      [0, 90],
      [-90, 0],
      [0, 0],
      [90, 0],
      [180, 0],
      [0, -90]
    ];
    octahedron_default = [
      [0, 2, 1],
      [0, 3, 2],
      [5, 1, 2],
      [5, 2, 3],
      [0, 1, 4],
      [0, 4, 3],
      [5, 4, 1],
      [5, 3, 4]
    ].map(function(face) {
      return face.map(function(i) {
        return octahedron[i];
      });
    });
  });

  // node_modules/d3-geo-projection/src/polyhedral/butterfly.js
  function butterfly_default(faceProjection) {
    faceProjection = faceProjection || function(face) {
      var c2 = centroid_default({type: "MultiPoint", coordinates: face});
      return gnomonic_default().scale(1).translate([0, 0]).rotate([-c2[0], -c2[1]]);
    };
    var faces = octahedron_default.map(function(face) {
      return {face, project: faceProjection(face)};
    });
    [-1, 0, 0, 1, 0, 1, 4, 5].forEach(function(d, i) {
      var node = faces[d];
      node && (node.children || (node.children = [])).push(faces[i]);
    });
    return polyhedral_default(faces[0], function(lambda, phi) {
      return faces[lambda < -pi2 / 2 ? phi < 0 ? 6 : 4 : lambda < 0 ? phi < 0 ? 2 : 0 : lambda < pi2 / 2 ? phi < 0 ? 3 : 1 : phi < 0 ? 7 : 5];
    }).angle(-30).scale(101.858).center([0, 45]);
  }
  var init_butterfly = __esm(() => {
    init_src13();
    init_math3();
    init_polyhedral();
    init_octahedron();
  });

  // node_modules/d3-geo-projection/src/polyhedral/collignon.js
  function collignonK(a2, b) {
    var p = collignonRaw(a2, b);
    return [p[0] * kx, p[1]];
  }
  function collignon_default2(faceProjection) {
    faceProjection = faceProjection || function(face) {
      var c2 = centroid_default({type: "MultiPoint", coordinates: face});
      return projection(collignonK).translate([0, 0]).scale(1).rotate(c2[1] > 0 ? [-c2[0], 0] : [180 - c2[0], 180]);
    };
    var faces = octahedron_default.map(function(face) {
      return {face, project: faceProjection(face)};
    });
    [-1, 0, 0, 1, 0, 1, 4, 5].forEach(function(d, i) {
      var node = faces[d];
      node && (node.children || (node.children = [])).push(faces[i]);
    });
    return polyhedral_default(faces[0], function(lambda, phi) {
      return faces[lambda < -pi2 / 2 ? phi < 0 ? 6 : 4 : lambda < 0 ? phi < 0 ? 2 : 0 : lambda < pi2 / 2 ? phi < 0 ? 3 : 1 : phi < 0 ? 7 : 5];
    }).angle(-30).scale(121.906).center([0, 48.5904]);
  }
  var kx;
  var init_collignon2 = __esm(() => {
    init_src13();
    init_collignon();
    init_math3();
    init_polyhedral();
    init_octahedron();
    kx = 2 / sqrt3(3);
    collignonK.invert = function(x2, y2) {
      return collignonRaw.invert(x2 / kx, y2);
    };
  });

  // node_modules/d3-geo-projection/src/polyhedral/waterman.js
  function waterman_default(faceProjection) {
    faceProjection = faceProjection || function(face2) {
      var c2 = face2.length === 6 ? centroid_default({type: "MultiPoint", coordinates: face2}) : face2[0];
      return gnomonic_default().scale(1).translate([0, 0]).rotate([-c2[0], -c2[1]]);
    };
    var w5 = octahedron_default.map(function(face2) {
      var xyz = face2.map(cartesian2), n = xyz.length, a2 = xyz[n - 1], b, hexagon = [];
      for (var i = 0; i < n; ++i) {
        b = xyz[i];
        hexagon.push(spherical2([
          a2[0] * 0.9486832980505138 + b[0] * 0.31622776601683794,
          a2[1] * 0.9486832980505138 + b[1] * 0.31622776601683794,
          a2[2] * 0.9486832980505138 + b[2] * 0.31622776601683794
        ]), spherical2([
          b[0] * 0.9486832980505138 + a2[0] * 0.31622776601683794,
          b[1] * 0.9486832980505138 + a2[1] * 0.31622776601683794,
          b[2] * 0.9486832980505138 + a2[2] * 0.31622776601683794
        ]));
        a2 = b;
      }
      return hexagon;
    });
    var cornerNormals = [];
    var parents = [-1, 0, 0, 1, 0, 1, 4, 5];
    w5.forEach(function(hexagon, j) {
      var face2 = octahedron_default[j], n = face2.length, normals = cornerNormals[j] = [];
      for (var i = 0; i < n; ++i) {
        w5.push([
          face2[i],
          hexagon[(i * 2 + 2) % (2 * n)],
          hexagon[(i * 2 + 1) % (2 * n)]
        ]);
        parents.push(j);
        normals.push(cross2(cartesian2(hexagon[(i * 2 + 2) % (2 * n)]), cartesian2(hexagon[(i * 2 + 1) % (2 * n)])));
      }
    });
    var faces = w5.map(function(face2) {
      return {
        project: faceProjection(face2),
        face: face2
      };
    });
    parents.forEach(function(d, i) {
      var parent = faces[d];
      parent && (parent.children || (parent.children = [])).push(faces[i]);
    });
    function face(lambda, phi) {
      var cosphi = cos2(phi), p = [cosphi * cos2(lambda), cosphi * sin2(lambda), sin2(phi)];
      var hexagon = lambda < -pi2 / 2 ? phi < 0 ? 6 : 4 : lambda < 0 ? phi < 0 ? 2 : 0 : lambda < pi2 / 2 ? phi < 0 ? 3 : 1 : phi < 0 ? 7 : 5;
      var n = cornerNormals[hexagon];
      return faces[dot(n[0], p) < 0 ? 8 + 3 * hexagon : dot(n[1], p) < 0 ? 8 + 3 * hexagon + 1 : dot(n[2], p) < 0 ? 8 + 3 * hexagon + 2 : hexagon];
    }
    return polyhedral_default(faces[0], face).angle(-30).scale(110.625).center([0, 45]);
  }
  function dot(a2, b) {
    for (var i = 0, n = a2.length, s2 = 0; i < n; ++i)
      s2 += a2[i] * b[i];
    return s2;
  }
  function cross2(a2, b) {
    return [
      a2[1] * b[2] - a2[2] * b[1],
      a2[2] * b[0] - a2[0] * b[2],
      a2[0] * b[1] - a2[1] * b[0]
    ];
  }
  function spherical2(cartesian3) {
    return [
      atan22(cartesian3[1], cartesian3[0]) * degrees4,
      asin2(max2(-1, min2(1, cartesian3[2]))) * degrees4
    ];
  }
  function cartesian2(coordinates2) {
    var lambda = coordinates2[0] * radians3, phi = coordinates2[1] * radians3, cosphi = cos2(phi);
    return [
      cosphi * cos2(lambda),
      cosphi * sin2(lambda),
      sin2(phi)
    ];
  }
  var init_waterman = __esm(() => {
    init_src13();
    init_math3();
    init_polyhedral();
    init_octahedron();
  });

  // node_modules/d3-geo-projection/src/noop.js
  var noop_default;
  var init_noop2 = __esm(() => {
    noop_default = () => {
    };
  });

  // node_modules/d3-geo-projection/src/project/clockwise.js
  function clockwise_default(ring) {
    if ((n = ring.length) < 4)
      return false;
    var i = 0, n, area = ring[n - 1][1] * ring[0][0] - ring[n - 1][0] * ring[0][1];
    while (++i < n)
      area += ring[i - 1][1] * ring[i][0] - ring[i - 1][0] * ring[i][1];
    return area <= 0;
  }
  var init_clockwise = __esm(() => {
  });

  // node_modules/d3-geo-projection/src/project/contains.js
  function contains_default2(ring, point6) {
    var x2 = point6[0], y2 = point6[1], contains = false;
    for (var i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
      var pi5 = ring[i], xi = pi5[0], yi = pi5[1], pj = ring[j], xj = pj[0], yj = pj[1];
      if (yi > y2 ^ yj > y2 && x2 < (xj - xi) * (y2 - yi) / (yj - yi) + xi)
        contains = !contains;
    }
    return contains;
  }
  var init_contains2 = __esm(() => {
  });

  // node_modules/d3-geo-projection/src/project/index.js
  function project_default(object3, projection2) {
    var stream = projection2.stream, project;
    if (!stream)
      throw new Error("invalid projection");
    switch (object3 && object3.type) {
      case "Feature":
        project = projectFeature;
        break;
      case "FeatureCollection":
        project = projectFeatureCollection;
        break;
      default:
        project = projectGeometry;
        break;
    }
    return project(object3, stream);
  }
  function projectFeatureCollection(o, stream) {
    return {
      type: "FeatureCollection",
      features: o.features.map(function(f) {
        return projectFeature(f, stream);
      })
    };
  }
  function projectFeature(o, stream) {
    return {
      type: "Feature",
      id: o.id,
      properties: o.properties,
      geometry: projectGeometry(o.geometry, stream)
    };
  }
  function projectGeometryCollection(o, stream) {
    return {
      type: "GeometryCollection",
      geometries: o.geometries.map(function(o2) {
        return projectGeometry(o2, stream);
      })
    };
  }
  function projectGeometry(o, stream) {
    if (!o)
      return null;
    if (o.type === "GeometryCollection")
      return projectGeometryCollection(o, stream);
    var sink;
    switch (o.type) {
      case "Point":
        sink = sinkPoint;
        break;
      case "MultiPoint":
        sink = sinkPoint;
        break;
      case "LineString":
        sink = sinkLine;
        break;
      case "MultiLineString":
        sink = sinkLine;
        break;
      case "Polygon":
        sink = sinkPolygon;
        break;
      case "MultiPolygon":
        sink = sinkPolygon;
        break;
      case "Sphere":
        sink = sinkPolygon;
        break;
      default:
        return null;
    }
    stream_default(o, stream(sink));
    return sink.result();
  }
  var points, lines, sinkPoint, sinkLine, sinkPolygon;
  var init_project = __esm(() => {
    init_src13();
    init_noop2();
    init_clockwise();
    init_contains2();
    points = [];
    lines = [];
    sinkPoint = {
      point: function(x2, y2) {
        points.push([x2, y2]);
      },
      result: function() {
        var result = !points.length ? null : points.length < 2 ? {type: "Point", coordinates: points[0]} : {type: "MultiPoint", coordinates: points};
        points = [];
        return result;
      }
    };
    sinkLine = {
      lineStart: noop_default,
      point: function(x2, y2) {
        points.push([x2, y2]);
      },
      lineEnd: function() {
        if (points.length)
          lines.push(points), points = [];
      },
      result: function() {
        var result = !lines.length ? null : lines.length < 2 ? {type: "LineString", coordinates: lines[0]} : {type: "MultiLineString", coordinates: lines};
        lines = [];
        return result;
      }
    };
    sinkPolygon = {
      polygonStart: noop_default,
      lineStart: noop_default,
      point: function(x2, y2) {
        points.push([x2, y2]);
      },
      lineEnd: function() {
        var n = points.length;
        if (n) {
          do
            points.push(points[0].slice());
          while (++n < 4);
          lines.push(points), points = [];
        }
      },
      polygonEnd: noop_default,
      result: function() {
        if (!lines.length)
          return null;
        var polygons = [], holes = [];
        lines.forEach(function(ring) {
          if (clockwise_default(ring))
            polygons.push([ring]);
          else
            holes.push(ring);
        });
        holes.forEach(function(hole) {
          var point6 = hole[0];
          polygons.some(function(polygon) {
            if (contains_default2(polygon[0], point6)) {
              polygon.push(hole);
              return true;
            }
          }) || polygons.push([hole]);
        });
        lines = [];
        return !polygons.length ? null : polygons.length > 1 ? {type: "MultiPolygon", coordinates: polygons} : {type: "Polygon", coordinates: polygons[0]};
      }
    };
  });

  // node_modules/d3-geo-projection/src/quincuncial/index.js
  function quincuncial_default(project) {
    var dx = project(halfPi2, 0)[0] - project(-halfPi2, 0)[0];
    function projectQuincuncial(lambda, phi) {
      var t = abs2(lambda) < halfPi2, p = project(t ? lambda : lambda > 0 ? lambda - pi2 : lambda + pi2, phi), x2 = (p[0] - p[1]) * sqrt1_2, y2 = (p[0] + p[1]) * sqrt1_2;
      if (t)
        return [x2, y2];
      var d = dx * sqrt1_2, s2 = x2 > 0 ^ y2 > 0 ? -1 : 1;
      return [s2 * x2 - sign2(y2) * d, s2 * y2 - sign2(x2) * d];
    }
    if (project.invert)
      projectQuincuncial.invert = function(x07, y07) {
        var x2 = (x07 + y07) * sqrt1_2, y2 = (y07 - x07) * sqrt1_2, t = abs2(x2) < 0.5 * dx && abs2(y2) < 0.5 * dx;
        if (!t) {
          var d = dx * sqrt1_2, s2 = x2 > 0 ^ y2 > 0 ? -1 : 1, x13 = -s2 * x07 + (y2 > 0 ? 1 : -1) * d, y13 = -s2 * y07 + (x2 > 0 ? 1 : -1) * d;
          x2 = (-x13 - y13) * sqrt1_2;
          y2 = (x13 - y13) * sqrt1_2;
        }
        var p = project.invert(x2, y2);
        if (!t)
          p[0] += x2 > 0 ? pi2 : -pi2;
        return p;
      };
    return projection(projectQuincuncial).rotate([-90, -90, 45]).clipAngle(180 - 1e-3);
  }
  var init_quincuncial = __esm(() => {
    init_src13();
    init_math3();
  });

  // node_modules/d3-geo-projection/src/quincuncial/gringorten.js
  function gringorten_default2() {
    return quincuncial_default(gringortenRaw).scale(176.423);
  }
  var init_gringorten2 = __esm(() => {
    init_gringorten();
    init_quincuncial();
  });

  // node_modules/d3-geo-projection/src/quincuncial/peirce.js
  function peirce_default() {
    return quincuncial_default(guyouRaw).scale(111.48);
  }
  var init_peirce = __esm(() => {
    init_guyou();
    init_quincuncial();
  });

  // node_modules/d3-geo-projection/src/quantize.js
  function quantize_default2(input, digits) {
    if (!(0 <= (digits = +digits) && digits <= 20))
      throw new Error("invalid digits");
    function quantizePoint(input2) {
      var n = input2.length, i = 2, output2 = new Array(n);
      output2[0] = +input2[0].toFixed(digits);
      output2[1] = +input2[1].toFixed(digits);
      while (i < n)
        output2[i] = input2[i], ++i;
      return output2;
    }
    function quantizePoints(input2) {
      return input2.map(quantizePoint);
    }
    function quantizePointsNoDuplicates(input2) {
      var point0 = quantizePoint(input2[0]);
      var output2 = [point0];
      for (var i = 1; i < input2.length; i++) {
        var point6 = quantizePoint(input2[i]);
        if (point6.length > 2 || point6[0] != point0[0] || point6[1] != point0[1]) {
          output2.push(point6);
          point0 = point6;
        }
      }
      if (output2.length === 1 && input2.length > 1) {
        output2.push(quantizePoint(input2[input2.length - 1]));
      }
      return output2;
    }
    function quantizePolygon(input2) {
      return input2.map(quantizePointsNoDuplicates);
    }
    function quantizeGeometry(input2) {
      if (input2 == null)
        return input2;
      var output2;
      switch (input2.type) {
        case "GeometryCollection":
          output2 = {type: "GeometryCollection", geometries: input2.geometries.map(quantizeGeometry)};
          break;
        case "Point":
          output2 = {type: "Point", coordinates: quantizePoint(input2.coordinates)};
          break;
        case "MultiPoint":
          output2 = {type: input2.type, coordinates: quantizePoints(input2.coordinates)};
          break;
        case "LineString":
          output2 = {type: input2.type, coordinates: quantizePointsNoDuplicates(input2.coordinates)};
          break;
        case "MultiLineString":
        case "Polygon":
          output2 = {type: input2.type, coordinates: quantizePolygon(input2.coordinates)};
          break;
        case "MultiPolygon":
          output2 = {type: "MultiPolygon", coordinates: input2.coordinates.map(quantizePolygon)};
          break;
        default:
          return input2;
      }
      if (input2.bbox != null)
        output2.bbox = input2.bbox;
      return output2;
    }
    function quantizeFeature(input2) {
      var output2 = {type: "Feature", properties: input2.properties, geometry: quantizeGeometry(input2.geometry)};
      if (input2.id != null)
        output2.id = input2.id;
      if (input2.bbox != null)
        output2.bbox = input2.bbox;
      return output2;
    }
    if (input != null)
      switch (input.type) {
        case "Feature":
          return quantizeFeature(input);
        case "FeatureCollection": {
          var output = {type: "FeatureCollection", features: input.features.map(quantizeFeature)};
          if (input.bbox != null)
            output.bbox = input.bbox;
          return output;
        }
        default:
          return quantizeGeometry(input);
      }
    return input;
  }
  var init_quantize3 = __esm(() => {
  });

  // node_modules/d3-geo-projection/src/rectangularPolyconic.js
  function rectangularPolyconicRaw(phi03) {
    var sinPhi03 = sin2(phi03);
    function forward(lambda, phi) {
      var A6 = sinPhi03 ? tan2(lambda * sinPhi03 / 2) / sinPhi03 : lambda / 2;
      if (!phi)
        return [2 * A6, -phi03];
      var E2 = 2 * atan3(A6 * sin2(phi)), cotPhi = 1 / tan2(phi);
      return [
        sin2(E2) * cotPhi,
        phi + (1 - cos2(E2)) * cotPhi - phi03
      ];
    }
    forward.invert = function(x2, y2) {
      if (abs2(y2 += phi03) < epsilon4)
        return [sinPhi03 ? 2 * atan3(sinPhi03 * x2 / 2) / sinPhi03 : x2, 0];
      var k3 = x2 * x2 + y2 * y2, phi = 0, i = 10, delta;
      do {
        var tanPhi = tan2(phi), secPhi = 1 / cos2(phi), j = k3 - 2 * y2 * phi + phi * phi;
        phi -= delta = (tanPhi * j + 2 * (phi - y2)) / (2 + j * secPhi * secPhi + 2 * (phi - y2) * tanPhi);
      } while (abs2(delta) > epsilon4 && --i > 0);
      var E2 = x2 * (tanPhi = tan2(phi)), A6 = tan2(abs2(y2) < abs2(phi + 1 / tanPhi) ? asin2(E2) * 0.5 : acos2(E2) * 0.5 + pi2 / 4) / sin2(phi);
      return [
        sinPhi03 ? 2 * atan3(sinPhi03 * A6) / sinPhi03 : 2 * A6,
        phi
      ];
    };
    return forward;
  }
  function rectangularPolyconic_default() {
    return parallel1_default(rectangularPolyconicRaw).scale(131.215);
  }
  var init_rectangularPolyconic = __esm(() => {
    init_math3();
    init_parallel1();
  });

  // node_modules/d3-geo-projection/src/robinson.js
  function robinsonRaw(lambda, phi) {
    var i = min2(18, abs2(phi) * 36 / pi2), i0 = floor(i), di = i - i0, ax = (k3 = K3[i0])[0], ay = k3[1], bx = (k3 = K3[++i0])[0], by = k3[1], cx = (k3 = K3[min2(19, ++i0)])[0], cy = k3[1], k3;
    return [
      lambda * (bx + di * (cx - ax) / 2 + di * di * (cx - 2 * bx + ax) / 2),
      sign2(phi) * (by + di * (cy - ay) / 2 + di * di * (cy - 2 * by + ay) / 2)
    ];
  }
  function robinson_default() {
    return projection(robinsonRaw).scale(152.63);
  }
  var K3;
  var init_robinson = __esm(() => {
    init_src13();
    init_math3();
    K3 = [
      [0.9986, -0.062],
      [1, 0],
      [0.9986, 0.062],
      [0.9954, 0.124],
      [0.99, 0.186],
      [0.9822, 0.248],
      [0.973, 0.31],
      [0.96, 0.372],
      [0.9427, 0.434],
      [0.9216, 0.4958],
      [0.8962, 0.5571],
      [0.8679, 0.6176],
      [0.835, 0.6769],
      [0.7986, 0.7346],
      [0.7597, 0.7903],
      [0.7186, 0.8435],
      [0.6732, 0.8936],
      [0.6213, 0.9394],
      [0.5722, 0.9761],
      [0.5322, 1]
    ];
    K3.forEach(function(d) {
      d[1] *= 1.593415793900743;
    });
    robinsonRaw.invert = function(x2, y2) {
      var phi = y2 * 90, i = min2(18, abs2(phi / 5)), i0 = max2(0, floor(i));
      do {
        var ay = K3[i0][1], by = K3[i0 + 1][1], cy = K3[min2(19, i0 + 2)][1], u = cy - ay, v = cy - 2 * by + ay, t = 2 * (abs2(y2) - by) / u, c2 = v / u, di = t * (1 - c2 * t * (1 - 2 * c2 * t));
        if (di >= 0 || i0 === 1) {
          phi = (y2 >= 0 ? 5 : -5) * (di + i);
          var j = 50, delta;
          do {
            i = min2(18, abs2(phi) / 5);
            i0 = floor(i);
            di = i - i0;
            ay = K3[i0][1];
            by = K3[i0 + 1][1];
            cy = K3[min2(19, i0 + 2)][1];
            phi -= (delta = sign2(y2) * (by + di * (cy - ay) / 2 + di * di * (cy - 2 * by + ay) / 2) - y2) * degrees4;
          } while (abs2(delta) > epsilon23 && --j > 0);
          break;
        }
      } while (--i0 >= 0);
      var ax = K3[i0][0], bx = K3[i0 + 1][0], cx = K3[min2(19, i0 + 2)][0];
      return [
        x2 / (bx + di * (cx - ax) / 2 + di * di * (cx - 2 * bx + ax) / 2),
        phi * radians3
      ];
    };
  });

  // node_modules/d3-geo-projection/src/satellite.js
  function satelliteVerticalRaw(P) {
    function forward(lambda, phi) {
      var cosPhi = cos2(phi), k3 = (P - 1) / (P - cosPhi * cos2(lambda));
      return [
        k3 * cosPhi * sin2(lambda),
        k3 * sin2(phi)
      ];
    }
    forward.invert = function(x2, y2) {
      var rho2 = x2 * x2 + y2 * y2, rho = sqrt3(rho2), sinc = (P - sqrt3(1 - rho2 * (P + 1) / (P - 1))) / ((P - 1) / rho + rho / (P - 1));
      return [
        atan22(x2 * sinc, rho * sqrt3(1 - sinc * sinc)),
        rho ? asin2(y2 * sinc / rho) : 0
      ];
    };
    return forward;
  }
  function satelliteRaw(P, omega) {
    var vertical = satelliteVerticalRaw(P);
    if (!omega)
      return vertical;
    var cosOmega = cos2(omega), sinOmega = sin2(omega);
    function forward(lambda, phi) {
      var coordinates2 = vertical(lambda, phi), y2 = coordinates2[1], A6 = y2 * sinOmega / (P - 1) + cosOmega;
      return [
        coordinates2[0] * cosOmega / A6,
        y2 / A6
      ];
    }
    forward.invert = function(x2, y2) {
      var k3 = (P - 1) / (P - 1 - y2 * sinOmega);
      return vertical.invert(k3 * x2, k3 * y2 * cosOmega);
    };
    return forward;
  }
  function satellite_default() {
    var distance2 = 2, omega = 0, m = projectionMutator(satelliteRaw), p = m(distance2, omega);
    p.distance = function(_) {
      if (!arguments.length)
        return distance2;
      return m(distance2 = +_, omega);
    };
    p.tilt = function(_) {
      if (!arguments.length)
        return omega * degrees4;
      return m(distance2, omega = _ * radians3);
    };
    return p.scale(432.147).clipAngle(acos2(1 / distance2) * degrees4 - 1e-6);
  }
  var init_satellite = __esm(() => {
    init_src13();
    init_math3();
  });

  // node_modules/d3-geo-projection/src/stitch.js
  function nonempty(coordinates2) {
    return coordinates2.length > 0;
  }
  function quantize2(x2) {
    return Math.floor(x2 * epsilonInverse) / epsilonInverse;
  }
  function normalizePoint(y2) {
    return y2 === y06 || y2 === y12 ? [0, y2] : [x06, quantize2(y2)];
  }
  function clampPoint(p) {
    var x2 = p[0], y2 = p[1], clamped = false;
    if (x2 <= x0e)
      x2 = x06, clamped = true;
    else if (x2 >= x1e)
      x2 = x12, clamped = true;
    if (y2 <= y0e)
      y2 = y06, clamped = true;
    else if (y2 >= y1e)
      y2 = y12, clamped = true;
    return clamped ? [x2, y2] : p;
  }
  function clampPoints(points2) {
    return points2.map(clampPoint);
  }
  function extractFragments(rings, polygon, fragments) {
    for (var j = 0, m = rings.length; j < m; ++j) {
      var ring = rings[j].slice();
      fragments.push({index: -1, polygon, ring});
      for (var i = 0, n = ring.length; i < n; ++i) {
        var point6 = ring[i], x2 = point6[0], y2 = point6[1];
        if (x2 <= x0e || x2 >= x1e || y2 <= y0e || y2 >= y1e) {
          ring[i] = clampPoint(point6);
          for (var k3 = i + 1; k3 < n; ++k3) {
            var pointk = ring[k3], xk = pointk[0], yk = pointk[1];
            if (xk > x0e && xk < x1e && yk > y0e && yk < y1e)
              break;
          }
          if (k3 === i + 1)
            continue;
          if (i) {
            var fragmentBefore = {index: -1, polygon, ring: ring.slice(0, i + 1)};
            fragmentBefore.ring[fragmentBefore.ring.length - 1] = normalizePoint(y2);
            fragments[fragments.length - 1] = fragmentBefore;
          } else
            fragments.pop();
          if (k3 >= n)
            break;
          fragments.push({index: -1, polygon, ring: ring = ring.slice(k3 - 1)});
          ring[0] = normalizePoint(ring[0][1]);
          i = -1;
          n = ring.length;
        }
      }
    }
  }
  function stitchFragments(fragments) {
    var i, n = fragments.length;
    var fragmentByStart = {}, fragmentByEnd = {}, fragment, start2, startFragment, end, endFragment;
    for (i = 0; i < n; ++i) {
      fragment = fragments[i];
      start2 = fragment.ring[0];
      end = fragment.ring[fragment.ring.length - 1];
      if (start2[0] === end[0] && start2[1] === end[1]) {
        fragment.polygon.push(fragment.ring);
        fragments[i] = null;
        continue;
      }
      fragment.index = i;
      fragmentByStart[start2] = fragmentByEnd[end] = fragment;
    }
    for (i = 0; i < n; ++i) {
      fragment = fragments[i];
      if (fragment) {
        start2 = fragment.ring[0];
        end = fragment.ring[fragment.ring.length - 1];
        startFragment = fragmentByEnd[start2];
        endFragment = fragmentByStart[end];
        delete fragmentByStart[start2];
        delete fragmentByEnd[end];
        if (start2[0] === end[0] && start2[1] === end[1]) {
          fragment.polygon.push(fragment.ring);
          continue;
        }
        if (startFragment) {
          delete fragmentByEnd[start2];
          delete fragmentByStart[startFragment.ring[0]];
          startFragment.ring.pop();
          fragments[startFragment.index] = null;
          fragment = {index: -1, polygon: startFragment.polygon, ring: startFragment.ring.concat(fragment.ring)};
          if (startFragment === endFragment) {
            fragment.polygon.push(fragment.ring);
          } else {
            fragment.index = n++;
            fragments.push(fragmentByStart[fragment.ring[0]] = fragmentByEnd[fragment.ring[fragment.ring.length - 1]] = fragment);
          }
        } else if (endFragment) {
          delete fragmentByStart[end];
          delete fragmentByEnd[endFragment.ring[endFragment.ring.length - 1]];
          fragment.ring.pop();
          fragment = {index: n++, polygon: endFragment.polygon, ring: fragment.ring.concat(endFragment.ring)};
          fragments[endFragment.index] = null;
          fragments.push(fragmentByStart[fragment.ring[0]] = fragmentByEnd[fragment.ring[fragment.ring.length - 1]] = fragment);
        } else {
          fragment.ring.push(fragment.ring[0]);
          fragment.polygon.push(fragment.ring);
        }
      }
    }
  }
  function stitchFeature(input) {
    var output = {type: "Feature", geometry: stitchGeometry(input.geometry)};
    if (input.id != null)
      output.id = input.id;
    if (input.bbox != null)
      output.bbox = input.bbox;
    if (input.properties != null)
      output.properties = input.properties;
    return output;
  }
  function stitchGeometry(input) {
    if (input == null)
      return input;
    var output, fragments, i, n;
    switch (input.type) {
      case "GeometryCollection":
        output = {type: "GeometryCollection", geometries: input.geometries.map(stitchGeometry)};
        break;
      case "Point":
        output = {type: "Point", coordinates: clampPoint(input.coordinates)};
        break;
      case "MultiPoint":
      case "LineString":
        output = {type: input.type, coordinates: clampPoints(input.coordinates)};
        break;
      case "MultiLineString":
        output = {type: "MultiLineString", coordinates: input.coordinates.map(clampPoints)};
        break;
      case "Polygon": {
        var polygon = [];
        extractFragments(input.coordinates, polygon, fragments = []);
        stitchFragments(fragments);
        output = {type: "Polygon", coordinates: polygon};
        break;
      }
      case "MultiPolygon": {
        fragments = [], i = -1, n = input.coordinates.length;
        var polygons = new Array(n);
        while (++i < n)
          extractFragments(input.coordinates[i], polygons[i] = [], fragments);
        stitchFragments(fragments);
        output = {type: "MultiPolygon", coordinates: polygons.filter(nonempty)};
        break;
      }
      default:
        return input;
    }
    if (input.bbox != null)
      output.bbox = input.bbox;
    return output;
  }
  function stitch_default(input) {
    if (input == null)
      return input;
    switch (input.type) {
      case "Feature":
        return stitchFeature(input);
      case "FeatureCollection": {
        var output = {type: "FeatureCollection", features: input.features.map(stitchFeature)};
        if (input.bbox != null)
          output.bbox = input.bbox;
        return output;
      }
      default:
        return stitchGeometry(input);
    }
  }
  var epsilon5, epsilonInverse, x06, x0e, x12, x1e, y06, y0e, y12, y1e;
  var init_stitch = __esm(() => {
    epsilon5 = 1e-4;
    epsilonInverse = 1e4;
    x06 = -180;
    x0e = x06 + epsilon5;
    x12 = 180;
    x1e = x12 - epsilon5;
    y06 = -90;
    y0e = y06 + epsilon5;
    y12 = 90;
    y1e = y12 - epsilon5;
  });

  // node_modules/d3-geo-projection/src/times.js
  function timesRaw(lambda, phi) {
    var t = tan2(phi / 2), s2 = sin2(quarterPi2 * t);
    return [
      lambda * (0.74482 - 0.34588 * s2 * s2),
      1.70711 * t
    ];
  }
  function times_default() {
    return projection(timesRaw).scale(146.153);
  }
  var init_times = __esm(() => {
    init_src13();
    init_math3();
    timesRaw.invert = function(x2, y2) {
      var t = y2 / 1.70711, s2 = sin2(quarterPi2 * t);
      return [
        x2 / (0.74482 - 0.34588 * s2 * s2),
        2 * atan3(t)
      ];
    };
  });

  // node_modules/d3-geo-projection/src/twoPoint.js
  function twoPoint_default(raw, p02, p1) {
    var i = interpolate_default(p02, p1), o = i(0.5), a2 = rotation_default([-o[0], -o[1]])(p02), b = i.distance / 2, y2 = -asin2(sin2(a2[1] * radians3) / sin2(b)), R = [-o[0], -o[1], -(a2[0] > 0 ? pi2 - y2 : y2) * degrees4], p = projection(raw(b)).rotate(R), r = rotation_default(R), center2 = p.center;
    delete p.rotate;
    p.center = function(_) {
      return arguments.length ? center2(r(_)) : r.invert(center2());
    };
    return p.clipAngle(90);
  }
  var init_twoPoint = __esm(() => {
    init_src13();
    init_math3();
  });

  // node_modules/d3-geo-projection/src/twoPointAzimuthal.js
  function twoPointAzimuthalRaw(d) {
    var cosd = cos2(d);
    function forward(lambda, phi) {
      var coordinates2 = gnomonicRaw(lambda, phi);
      coordinates2[0] *= cosd;
      return coordinates2;
    }
    forward.invert = function(x2, y2) {
      return gnomonicRaw.invert(x2 / cosd, y2);
    };
    return forward;
  }
  function twoPointAzimuthalUsa() {
    return twoPointAzimuthal([-158, 21.5], [-77, 39]).clipAngle(60).scale(400);
  }
  function twoPointAzimuthal(p02, p1) {
    return twoPoint_default(twoPointAzimuthalRaw, p02, p1);
  }
  var init_twoPointAzimuthal = __esm(() => {
    init_src13();
    init_math3();
    init_twoPoint();
  });

  // node_modules/d3-geo-projection/src/twoPointEquidistant.js
  function twoPointEquidistantRaw(z02) {
    if (!(z02 *= 2))
      return azimuthalEquidistantRaw;
    var lambdaa = -z02 / 2, lambdab = -lambdaa, z022 = z02 * z02, tanLambda0 = tan2(lambdab), S = 0.5 / sin2(lambdab);
    function forward(lambda, phi) {
      var za = acos2(cos2(phi) * cos2(lambda - lambdaa)), zb = acos2(cos2(phi) * cos2(lambda - lambdab)), ys = phi < 0 ? -1 : 1;
      za *= za, zb *= zb;
      return [
        (za - zb) / (2 * z02),
        ys * sqrt3(4 * z022 * zb - (z022 - za + zb) * (z022 - za + zb)) / (2 * z02)
      ];
    }
    forward.invert = function(x2, y2) {
      var y22 = y2 * y2, cosza = cos2(sqrt3(y22 + (t = x2 + lambdaa) * t)), coszb = cos2(sqrt3(y22 + (t = x2 + lambdab) * t)), t, d;
      return [
        atan22(d = cosza - coszb, t = (cosza + coszb) * tanLambda0),
        (y2 < 0 ? -1 : 1) * acos2(sqrt3(t * t + d * d) * S)
      ];
    };
    return forward;
  }
  function twoPointEquidistantUsa() {
    return twoPointEquidistant([-158, 21.5], [-77, 39]).clipAngle(130).scale(122.571);
  }
  function twoPointEquidistant(p02, p1) {
    return twoPoint_default(twoPointEquidistantRaw, p02, p1);
  }
  var init_twoPointEquidistant = __esm(() => {
    init_src13();
    init_math3();
    init_twoPoint();
  });

  // node_modules/d3-geo-projection/src/vanDerGrinten.js
  function vanDerGrintenRaw(lambda, phi) {
    if (abs2(phi) < epsilon4)
      return [lambda, 0];
    var sinTheta = abs2(phi / halfPi2), theta = asin2(sinTheta);
    if (abs2(lambda) < epsilon4 || abs2(abs2(phi) - halfPi2) < epsilon4)
      return [0, sign2(phi) * pi2 * tan2(theta / 2)];
    var cosTheta = cos2(theta), A6 = abs2(pi2 / lambda - lambda / pi2) / 2, A22 = A6 * A6, G = cosTheta / (sinTheta + cosTheta - 1), P = G * (2 / sinTheta - 1), P2 = P * P, P2_A2 = P2 + A22, G_P2 = G - P2, Q = A22 + G;
    return [
      sign2(lambda) * pi2 * (A6 * G_P2 + sqrt3(A22 * G_P2 * G_P2 - P2_A2 * (G * G - P2))) / P2_A2,
      sign2(phi) * pi2 * (P * Q - A6 * sqrt3((A22 + 1) * P2_A2 - Q * Q)) / P2_A2
    ];
  }
  function vanDerGrinten_default() {
    return projection(vanDerGrintenRaw).scale(79.4183);
  }
  var init_vanDerGrinten = __esm(() => {
    init_src13();
    init_math3();
    vanDerGrintenRaw.invert = function(x2, y2) {
      if (abs2(y2) < epsilon4)
        return [x2, 0];
      if (abs2(x2) < epsilon4)
        return [0, halfPi2 * sin2(2 * atan3(y2 / pi2))];
      var x22 = (x2 /= pi2) * x2, y22 = (y2 /= pi2) * y2, x2_y2 = x22 + y22, z = x2_y2 * x2_y2, c1 = -abs2(y2) * (1 + x2_y2), c2 = c1 - 2 * y22 + x22, c3 = -2 * c1 + 1 + 2 * y22 + z, d = y22 / c3 + (2 * c2 * c2 * c2 / (c3 * c3 * c3) - 9 * c1 * c2 / (c3 * c3)) / 27, a1 = (c1 - c2 * c2 / (3 * c3)) / c3, m1 = 2 * sqrt3(-a1 / 3), theta1 = acos2(3 * d / (a1 * m1)) / 3;
      return [
        pi2 * (x2_y2 - 1 + sqrt3(1 + 2 * (x22 - y22) + z)) / (2 * x2),
        sign2(y2) * pi2 * (-m1 * cos2(theta1 + pi2 / 3) - c2 / (3 * c3))
      ];
    };
  });

  // node_modules/d3-geo-projection/src/vanDerGrinten2.js
  function vanDerGrinten2Raw(lambda, phi) {
    if (abs2(phi) < epsilon4)
      return [lambda, 0];
    var sinTheta = abs2(phi / halfPi2), theta = asin2(sinTheta);
    if (abs2(lambda) < epsilon4 || abs2(abs2(phi) - halfPi2) < epsilon4)
      return [0, sign2(phi) * pi2 * tan2(theta / 2)];
    var cosTheta = cos2(theta), A6 = abs2(pi2 / lambda - lambda / pi2) / 2, A22 = A6 * A6, x13 = cosTheta * (sqrt3(1 + A22) - A6 * cosTheta) / (1 + A22 * sinTheta * sinTheta);
    return [
      sign2(lambda) * pi2 * x13,
      sign2(phi) * pi2 * sqrt3(1 - x13 * (2 * A6 + x13))
    ];
  }
  function vanDerGrinten2_default() {
    return projection(vanDerGrinten2Raw).scale(79.4183);
  }
  var init_vanDerGrinten2 = __esm(() => {
    init_src13();
    init_math3();
    vanDerGrinten2Raw.invert = function(x2, y2) {
      if (!x2)
        return [0, halfPi2 * sin2(2 * atan3(y2 / pi2))];
      var x13 = abs2(x2 / pi2), A6 = (1 - x13 * x13 - (y2 /= pi2) * y2) / (2 * x13), A22 = A6 * A6, B3 = sqrt3(A22 + 1);
      return [
        sign2(x2) * pi2 * (B3 - A6),
        sign2(y2) * halfPi2 * sin2(2 * atan22(sqrt3((1 - 2 * A6 * x13) * (A6 + B3) - x13), sqrt3(B3 + A6 + x13)))
      ];
    };
  });

  // node_modules/d3-geo-projection/src/vanDerGrinten3.js
  function vanDerGrinten3Raw(lambda, phi) {
    if (abs2(phi) < epsilon4)
      return [lambda, 0];
    var sinTheta = phi / halfPi2, theta = asin2(sinTheta);
    if (abs2(lambda) < epsilon4 || abs2(abs2(phi) - halfPi2) < epsilon4)
      return [0, pi2 * tan2(theta / 2)];
    var A6 = (pi2 / lambda - lambda / pi2) / 2, y13 = sinTheta / (1 + cos2(theta));
    return [
      pi2 * (sign2(lambda) * sqrt3(A6 * A6 + 1 - y13 * y13) - A6),
      pi2 * y13
    ];
  }
  function vanDerGrinten3_default() {
    return projection(vanDerGrinten3Raw).scale(79.4183);
  }
  var init_vanDerGrinten3 = __esm(() => {
    init_src13();
    init_math3();
    vanDerGrinten3Raw.invert = function(x2, y2) {
      if (!y2)
        return [x2, 0];
      var y13 = y2 / pi2, A6 = (pi2 * pi2 * (1 - y13 * y13) - x2 * x2) / (2 * pi2 * x2);
      return [
        x2 ? pi2 * (sign2(x2) * sqrt3(A6 * A6 + 1) - A6) : 0,
        halfPi2 * sin2(2 * atan3(y13))
      ];
    };
  });

  // node_modules/d3-geo-projection/src/vanDerGrinten4.js
  function vanDerGrinten4Raw(lambda, phi) {
    if (!phi)
      return [lambda, 0];
    var phi03 = abs2(phi);
    if (!lambda || phi03 === halfPi2)
      return [0, phi];
    var B3 = phi03 / halfPi2, B22 = B3 * B3, C2 = (8 * B3 - B22 * (B22 + 2) - 5) / (2 * B22 * (B3 - 1)), C22 = C2 * C2, BC = B3 * C2, B_C2 = B22 + C22 + 2 * BC, B_3C = B3 + 3 * C2, lambda04 = lambda / halfPi2, lambda12 = lambda04 + 1 / lambda04, D2 = sign2(abs2(lambda) - halfPi2) * sqrt3(lambda12 * lambda12 - 4), D22 = D2 * D2, F = B_C2 * (B22 + C22 * D22 - 1) + (1 - B22) * (B22 * (B_3C * B_3C + 4 * C22) + 12 * BC * C22 + 4 * C22 * C22), x13 = (D2 * (B_C2 + C22 - 1) + 2 * sqrt3(F)) / (4 * B_C2 + D22);
    return [
      sign2(lambda) * halfPi2 * x13,
      sign2(phi) * halfPi2 * sqrt3(1 + D2 * abs2(x13) - x13 * x13)
    ];
  }
  function vanDerGrinten4_default() {
    return projection(vanDerGrinten4Raw).scale(127.16);
  }
  var init_vanDerGrinten4 = __esm(() => {
    init_src13();
    init_math3();
    vanDerGrinten4Raw.invert = function(x2, y2) {
      var delta;
      if (!x2 || !y2)
        return [x2, y2];
      var sy = sign2(y2);
      y2 = abs2(y2) / pi2;
      var x13 = sign2(x2) * x2 / halfPi2, D2 = (x13 * x13 - 1 + 4 * y2 * y2) / abs2(x13), D22 = D2 * D2, B3 = y2 * (2 - (y2 > 0.5 ? min2(y2, abs2(x2)) : 0)), r = x2 * x2 + y2 * y2, i = 50;
      do {
        var B22 = B3 * B3, C2 = (8 * B3 - B22 * (B22 + 2) - 5) / (2 * B22 * (B3 - 1)), C_ = (3 * B3 - B22 * B3 - 10) / (2 * B22 * B3), C22 = C2 * C2, BC = B3 * C2, B_C = B3 + C2, B_C2 = B_C * B_C, B_3C = B3 + 3 * C2, F = B_C2 * (B22 + C22 * D22 - 1) + (1 - B22) * (B22 * (B_3C * B_3C + 4 * C22) + C22 * (12 * BC + 4 * C22)), F_ = -2 * B_C * (4 * BC * C22 + (1 - 4 * B22 + 3 * B22 * B22) * (1 + C_) + C22 * (-6 + 14 * B22 - D22 + (-8 + 8 * B22 - 2 * D22) * C_) + BC * (-8 + 12 * B22 + (-10 + 10 * B22 - D22) * C_)), sqrtF = sqrt3(F), f = D2 * (B_C2 + C22 - 1) + 2 * sqrtF - x13 * (4 * B_C2 + D22), f_ = D2 * (2 * C2 * C_ + 2 * B_C * (1 + C_)) + F_ / sqrtF - 8 * B_C * (D2 * (-1 + C22 + B_C2) + 2 * sqrtF) * (1 + C_) / (D22 + 4 * B_C2);
        B3 -= delta = f / f_;
      } while (delta * r * r > epsilon4 && --i > 0);
      return [
        sign2(x2) * (sqrt3(D2 * D2 + 4) + D2) * pi2 / 4,
        sy * halfPi2 * B3
      ];
    };
  });

  // node_modules/d3-geo-projection/src/wagner.js
  function wagnerFormula(cx, cy, m1, m2, n) {
    function forward(lambda, phi) {
      var s2 = m1 * sin2(m2 * phi), c0 = sqrt3(1 - s2 * s2), c1 = sqrt3(2 / (1 + c0 * cos2(lambda *= n)));
      return [
        cx * c0 * c1 * sin2(lambda),
        cy * s2 * c1
      ];
    }
    forward.invert = function(x2, y2) {
      var t13 = x2 / cx, t22 = y2 / cy, p = sqrt3(t13 * t13 + t22 * t22), c2 = 2 * asin2(p / 2);
      return [
        atan22(x2 * tan2(c2), cx * p) / n,
        p && asin2(y2 * sin2(c2) / (cy * m1 * p)) / m2
      ];
    };
    return forward;
  }
  function wagnerRaw(poleline, parallels, inflation, ratio) {
    var phi12 = pi2 / 3;
    poleline = max2(poleline, epsilon4);
    parallels = max2(parallels, epsilon4);
    poleline = min2(poleline, halfPi2);
    parallels = min2(parallels, pi2 - epsilon4);
    inflation = max2(inflation, 0);
    inflation = min2(inflation, 100 - epsilon4);
    ratio = max2(ratio, epsilon4);
    var vinflation = inflation / 100 + 1;
    var vratio = ratio / 100;
    var m2 = acos2(vinflation * cos2(phi12)) / phi12, m1 = sin2(poleline) / sin2(m2 * halfPi2), n = parallels / pi2, k3 = sqrt3(vratio * sin2(poleline / 2) / sin2(parallels / 2)), cx = k3 / sqrt3(n * m1 * m2), cy = 1 / (k3 * sqrt3(n * m1 * m2));
    return wagnerFormula(cx, cy, m1, m2, n);
  }
  function wagner() {
    var poleline = 65 * radians3, parallels = 60 * radians3, inflation = 20, ratio = 200, mutate = projectionMutator(wagnerRaw), projection2 = mutate(poleline, parallels, inflation, ratio);
    projection2.poleline = function(_) {
      return arguments.length ? mutate(poleline = +_ * radians3, parallels, inflation, ratio) : poleline * degrees4;
    };
    projection2.parallels = function(_) {
      return arguments.length ? mutate(poleline, parallels = +_ * radians3, inflation, ratio) : parallels * degrees4;
    };
    projection2.inflation = function(_) {
      return arguments.length ? mutate(poleline, parallels, inflation = +_, ratio) : inflation;
    };
    projection2.ratio = function(_) {
      return arguments.length ? mutate(poleline, parallels, inflation, ratio = +_) : ratio;
    };
    return projection2.scale(163.775);
  }
  function wagner7() {
    return wagner().poleline(65).parallels(60).inflation(0).ratio(200).scale(172.633);
  }
  var init_wagner = __esm(() => {
    init_src13();
    init_math3();
  });

  // node_modules/d3-geo-projection/src/wagner4.js
  function wagner4_default() {
    return projection(wagner4Raw).scale(176.84);
  }
  var A5, B2, wagner4Raw;
  var init_wagner4 = __esm(() => {
    init_src13();
    init_math3();
    init_mollweide();
    A5 = 4 * pi2 + 3 * sqrt3(3);
    B2 = 2 * sqrt3(2 * pi2 * sqrt3(3) / A5);
    wagner4Raw = mollweideBromleyRaw(B2 * sqrt3(3) / pi2, B2, A5 / 6);
  });

  // node_modules/d3-geo-projection/src/wagner6.js
  function wagner6Raw(lambda, phi) {
    return [lambda * sqrt3(1 - 3 * phi * phi / (pi2 * pi2)), phi];
  }
  function wagner6_default() {
    return projection(wagner6Raw).scale(152.63);
  }
  var init_wagner6 = __esm(() => {
    init_src13();
    init_math3();
    wagner6Raw.invert = function(x2, y2) {
      return [x2 / sqrt3(1 - 3 * y2 * y2 / (pi2 * pi2)), y2];
    };
  });

  // node_modules/d3-geo-projection/src/wiechel.js
  function wiechelRaw(lambda, phi) {
    var cosPhi = cos2(phi), sinPhi = cos2(lambda) * cosPhi, sin1_Phi = 1 - sinPhi, cosLambda = cos2(lambda = atan22(sin2(lambda) * cosPhi, -sin2(phi))), sinLambda = sin2(lambda);
    cosPhi = sqrt3(1 - sinPhi * sinPhi);
    return [
      sinLambda * cosPhi - cosLambda * sin1_Phi,
      -cosLambda * cosPhi - sinLambda * sin1_Phi
    ];
  }
  function wiechel_default() {
    return projection(wiechelRaw).rotate([0, -90, 45]).scale(124.75).clipAngle(180 - 1e-3);
  }
  var init_wiechel = __esm(() => {
    init_src13();
    init_math3();
    wiechelRaw.invert = function(x2, y2) {
      var w2 = (x2 * x2 + y2 * y2) / -2, k3 = sqrt3(-w2 * (2 + w2)), b = y2 * w2 + x2 * k3, a2 = x2 * w2 - y2 * k3, D2 = sqrt3(a2 * a2 + b * b);
      return [
        atan22(k3 * b, D2 * (1 + w2)),
        D2 ? -asin2(k3 * a2 / D2) : 0
      ];
    };
  });

  // node_modules/d3-geo-projection/src/winkel3.js
  function winkel3Raw(lambda, phi) {
    var coordinates2 = aitoffRaw(lambda, phi);
    return [
      (coordinates2[0] + lambda / halfPi2) / 2,
      (coordinates2[1] + phi) / 2
    ];
  }
  function winkel3_default() {
    return projection(winkel3Raw).scale(158.837);
  }
  var init_winkel3 = __esm(() => {
    init_src13();
    init_aitoff();
    init_math3();
    winkel3Raw.invert = function(x2, y2) {
      var lambda = x2, phi = y2, i = 25;
      do {
        var cosphi = cos2(phi), sinphi = sin2(phi), sin_2phi = sin2(2 * phi), sin2phi = sinphi * sinphi, cos2phi = cosphi * cosphi, sinlambda = sin2(lambda), coslambda_2 = cos2(lambda / 2), sinlambda_2 = sin2(lambda / 2), sin2lambda_2 = sinlambda_2 * sinlambda_2, C2 = 1 - cos2phi * coslambda_2 * coslambda_2, E2 = C2 ? acos2(cosphi * coslambda_2) * sqrt3(F = 1 / C2) : F = 0, F, fx = 0.5 * (2 * E2 * cosphi * sinlambda_2 + lambda / halfPi2) - x2, fy = 0.5 * (E2 * sinphi + phi) - y2, dxdlambda = 0.5 * F * (cos2phi * sin2lambda_2 + E2 * cosphi * coslambda_2 * sin2phi) + 0.5 / halfPi2, dxdphi = F * (sinlambda * sin_2phi / 4 - E2 * sinphi * sinlambda_2), dydlambda = 0.125 * F * (sin_2phi * sinlambda_2 - E2 * sinphi * cos2phi * sinlambda), dydphi = 0.5 * F * (sin2phi * coslambda_2 + E2 * sin2lambda_2 * cosphi) + 0.5, denominator = dxdphi * dydlambda - dydphi * dxdlambda, dlambda = (fy * dxdphi - fx * dydphi) / denominator, dphi = (fx * dydlambda - fy * dxdlambda) / denominator;
        lambda -= dlambda, phi -= dphi;
      } while ((abs2(dlambda) > epsilon4 || abs2(dphi) > epsilon4) && --i > 0);
      return [lambda, phi];
    };
  });

  // node_modules/d3-geo-projection/src/index.js
  var src_exports9 = {};
  __export(src_exports9, {
    geoAiry: () => airy_default,
    geoAiryRaw: () => airyRaw,
    geoAitoff: () => aitoff_default,
    geoAitoffRaw: () => aitoffRaw,
    geoArmadillo: () => armadillo_default,
    geoArmadilloRaw: () => armadilloRaw,
    geoAugust: () => august_default,
    geoAugustRaw: () => augustRaw,
    geoBaker: () => baker_default,
    geoBakerRaw: () => bakerRaw,
    geoBerghaus: () => berghaus_default,
    geoBerghausRaw: () => berghausRaw,
    geoBertin1953: () => bertin_default,
    geoBertin1953Raw: () => bertin1953Raw,
    geoBoggs: () => boggs_default,
    geoBoggsRaw: () => boggsRaw,
    geoBonne: () => bonne_default,
    geoBonneRaw: () => bonneRaw,
    geoBottomley: () => bottomley_default,
    geoBottomleyRaw: () => bottomleyRaw,
    geoBromley: () => bromley_default,
    geoBromleyRaw: () => bromleyRaw,
    geoChamberlin: () => chamberlin,
    geoChamberlinAfrica: () => chamberlinAfrica,
    geoChamberlinRaw: () => chamberlinRaw,
    geoCollignon: () => collignon_default,
    geoCollignonRaw: () => collignonRaw,
    geoCraig: () => craig_default,
    geoCraigRaw: () => craigRaw,
    geoCraster: () => craster_default,
    geoCrasterRaw: () => crasterRaw,
    geoCylindricalEqualArea: () => cylindricalEqualArea_default,
    geoCylindricalEqualAreaRaw: () => cylindricalEqualAreaRaw2,
    geoCylindricalStereographic: () => cylindricalStereographic_default,
    geoCylindricalStereographicRaw: () => cylindricalStereographicRaw,
    geoEckert1: () => eckert1_default,
    geoEckert1Raw: () => eckert1Raw,
    geoEckert2: () => eckert2_default,
    geoEckert2Raw: () => eckert2Raw,
    geoEckert3: () => eckert3_default,
    geoEckert3Raw: () => eckert3Raw,
    geoEckert4: () => eckert4_default,
    geoEckert4Raw: () => eckert4Raw,
    geoEckert5: () => eckert5_default,
    geoEckert5Raw: () => eckert5Raw,
    geoEckert6: () => eckert6_default,
    geoEckert6Raw: () => eckert6Raw,
    geoEisenlohr: () => eisenlohr_default,
    geoEisenlohrRaw: () => eisenlohrRaw,
    geoFahey: () => fahey_default,
    geoFaheyRaw: () => faheyRaw,
    geoFoucaut: () => foucaut_default,
    geoFoucautRaw: () => foucautRaw,
    geoFoucautSinusoidal: () => foucautSinusoidal_default,
    geoFoucautSinusoidalRaw: () => foucautSinusoidalRaw,
    geoGilbert: () => gilbert_default,
    geoGingery: () => gingery_default,
    geoGingeryRaw: () => gingeryRaw,
    geoGinzburg4: () => ginzburg4_default,
    geoGinzburg4Raw: () => ginzburg4Raw,
    geoGinzburg5: () => ginzburg5_default,
    geoGinzburg5Raw: () => ginzburg5Raw,
    geoGinzburg6: () => ginzburg6_default,
    geoGinzburg6Raw: () => ginzburg6Raw,
    geoGinzburg8: () => ginzburg8_default,
    geoGinzburg8Raw: () => ginzburg8Raw,
    geoGinzburg9: () => ginzburg9_default,
    geoGinzburg9Raw: () => ginzburg9Raw,
    geoGringorten: () => gringorten_default,
    geoGringortenQuincuncial: () => gringorten_default2,
    geoGringortenRaw: () => gringortenRaw,
    geoGuyou: () => guyou_default,
    geoGuyouRaw: () => guyouRaw,
    geoHammer: () => hammer_default,
    geoHammerRaw: () => hammerRaw,
    geoHammerRetroazimuthal: () => hammerRetroazimuthal_default,
    geoHammerRetroazimuthalRaw: () => hammerRetroazimuthalRaw,
    geoHealpix: () => healpix_default,
    geoHealpixRaw: () => healpixRaw,
    geoHill: () => hill_default,
    geoHillRaw: () => hillRaw,
    geoHomolosine: () => homolosine_default,
    geoHomolosineRaw: () => homolosineRaw,
    geoHufnagel: () => hufnagel_default,
    geoHufnagelRaw: () => hufnagelRaw,
    geoHyperelliptical: () => hyperelliptical_default,
    geoHyperellipticalRaw: () => hyperellipticalRaw,
    geoInterrupt: () => interrupted_default,
    geoInterruptedBoggs: () => boggs_default2,
    geoInterruptedHomolosine: () => homolosine_default2,
    geoInterruptedMollweide: () => mollweide_default2,
    geoInterruptedMollweideHemispheres: () => mollweideHemispheres_default,
    geoInterruptedQuarticAuthalic: () => quarticAuthalic_default,
    geoInterruptedSinuMollweide: () => sinuMollweide_default2,
    geoInterruptedSinusoidal: () => sinusoidal_default2,
    geoKavrayskiy7: () => kavrayskiy7_default,
    geoKavrayskiy7Raw: () => kavrayskiy7Raw,
    geoLagrange: () => lagrange_default,
    geoLagrangeRaw: () => lagrangeRaw,
    geoLarrivee: () => larrivee_default,
    geoLarriveeRaw: () => larriveeRaw,
    geoLaskowski: () => laskowski_default,
    geoLaskowskiRaw: () => laskowskiRaw,
    geoLittrow: () => littrow_default,
    geoLittrowRaw: () => littrowRaw,
    geoLoximuthal: () => loximuthal_default,
    geoLoximuthalRaw: () => loximuthalRaw,
    geoMiller: () => miller_default,
    geoMillerRaw: () => millerRaw,
    geoModifiedStereographic: () => modifiedStereographic,
    geoModifiedStereographicAlaska: () => modifiedStereographicAlaska,
    geoModifiedStereographicGs48: () => modifiedStereographicGs48,
    geoModifiedStereographicGs50: () => modifiedStereographicGs50,
    geoModifiedStereographicLee: () => modifiedStereographicLee,
    geoModifiedStereographicMiller: () => modifiedStereographicMiller,
    geoModifiedStereographicRaw: () => modifiedStereographicRaw,
    geoMollweide: () => mollweide_default,
    geoMollweideRaw: () => mollweideRaw,
    geoMtFlatPolarParabolic: () => mtFlatPolarParabolic_default,
    geoMtFlatPolarParabolicRaw: () => mtFlatPolarParabolicRaw,
    geoMtFlatPolarQuartic: () => mtFlatPolarQuartic_default,
    geoMtFlatPolarQuarticRaw: () => mtFlatPolarQuarticRaw,
    geoMtFlatPolarSinusoidal: () => mtFlatPolarSinusoidal_default,
    geoMtFlatPolarSinusoidalRaw: () => mtFlatPolarSinusoidalRaw,
    geoNaturalEarth2: () => naturalEarth2_default,
    geoNaturalEarth2Raw: () => naturalEarth2Raw,
    geoNellHammer: () => nellHammer_default,
    geoNellHammerRaw: () => nellHammerRaw,
    geoNicolosi: () => nicolosi_default,
    geoNicolosiRaw: () => nicolosiRaw,
    geoPatterson: () => patterson_default,
    geoPattersonRaw: () => pattersonRaw,
    geoPeirceQuincuncial: () => peirce_default,
    geoPolyconic: () => polyconic_default,
    geoPolyconicRaw: () => polyconicRaw,
    geoPolyhedral: () => polyhedral_default,
    geoPolyhedralButterfly: () => butterfly_default,
    geoPolyhedralCollignon: () => collignon_default2,
    geoPolyhedralWaterman: () => waterman_default,
    geoProject: () => project_default,
    geoQuantize: () => quantize_default2,
    geoQuincuncial: () => quincuncial_default,
    geoRectangularPolyconic: () => rectangularPolyconic_default,
    geoRectangularPolyconicRaw: () => rectangularPolyconicRaw,
    geoRobinson: () => robinson_default,
    geoRobinsonRaw: () => robinsonRaw,
    geoSatellite: () => satellite_default,
    geoSatelliteRaw: () => satelliteRaw,
    geoSinuMollweide: () => sinuMollweide_default,
    geoSinuMollweideRaw: () => sinuMollweideRaw,
    geoSinusoidal: () => sinusoidal_default,
    geoSinusoidalRaw: () => sinusoidalRaw,
    geoStitch: () => stitch_default,
    geoTimes: () => times_default,
    geoTimesRaw: () => timesRaw,
    geoTwoPointAzimuthal: () => twoPointAzimuthal,
    geoTwoPointAzimuthalRaw: () => twoPointAzimuthalRaw,
    geoTwoPointAzimuthalUsa: () => twoPointAzimuthalUsa,
    geoTwoPointEquidistant: () => twoPointEquidistant,
    geoTwoPointEquidistantRaw: () => twoPointEquidistantRaw,
    geoTwoPointEquidistantUsa: () => twoPointEquidistantUsa,
    geoVanDerGrinten: () => vanDerGrinten_default,
    geoVanDerGrinten2: () => vanDerGrinten2_default,
    geoVanDerGrinten2Raw: () => vanDerGrinten2Raw,
    geoVanDerGrinten3: () => vanDerGrinten3_default,
    geoVanDerGrinten3Raw: () => vanDerGrinten3Raw,
    geoVanDerGrinten4: () => vanDerGrinten4_default,
    geoVanDerGrinten4Raw: () => vanDerGrinten4Raw,
    geoVanDerGrintenRaw: () => vanDerGrintenRaw,
    geoWagner: () => wagner,
    geoWagner4: () => wagner4_default,
    geoWagner4Raw: () => wagner4Raw,
    geoWagner6: () => wagner6_default,
    geoWagner6Raw: () => wagner6Raw,
    geoWagner7: () => wagner7,
    geoWagnerRaw: () => wagnerRaw,
    geoWiechel: () => wiechel_default,
    geoWiechelRaw: () => wiechelRaw,
    geoWinkel3: () => winkel3_default,
    geoWinkel3Raw: () => winkel3Raw
  });
  var init_src17 = __esm(() => {
    init_airy();
    init_aitoff();
    init_armadillo();
    init_august();
    init_baker();
    init_berghaus();
    init_bertin();
    init_boggs();
    init_bonne();
    init_bottomley();
    init_bromley();
    init_chamberlin();
    init_collignon();
    init_craig();
    init_craster();
    init_cylindricalEqualArea2();
    init_cylindricalStereographic();
    init_eckert1();
    init_eckert2();
    init_eckert3();
    init_eckert4();
    init_eckert5();
    init_eckert6();
    init_eisenlohr();
    init_fahey();
    init_foucaut();
    init_foucautSinusoidal();
    init_gilbert();
    init_gingery();
    init_ginzburg4();
    init_ginzburg5();
    init_ginzburg6();
    init_ginzburg8();
    init_ginzburg9();
    init_gringorten();
    init_guyou();
    init_hammer();
    init_hammerRetroazimuthal();
    init_healpix();
    init_hill();
    init_homolosine();
    init_hufnagel();
    init_hyperelliptical();
    init_interrupted();
    init_boggs2();
    init_homolosine2();
    init_mollweide2();
    init_mollweideHemispheres();
    init_sinuMollweide2();
    init_sinusoidal2();
    init_kavrayskiy7();
    init_lagrange();
    init_larrivee();
    init_laskowski();
    init_littrow();
    init_loximuthal();
    init_miller();
    init_modifiedStereographic();
    init_mollweide();
    init_mtFlatPolarParabolic();
    init_mtFlatPolarQuartic();
    init_mtFlatPolarSinusoidal();
    init_naturalEarth2();
    init_nellHammer();
    init_quarticAuthalic();
    init_nicolosi();
    init_patterson();
    init_polyconic();
    init_polyhedral();
    init_butterfly();
    init_collignon2();
    init_waterman();
    init_project();
    init_gringorten2();
    init_peirce();
    init_quantize3();
    init_quincuncial();
    init_rectangularPolyconic();
    init_robinson();
    init_satellite();
    init_sinuMollweide();
    init_sinusoidal();
    init_stitch();
    init_times();
    init_twoPointAzimuthal();
    init_twoPointEquidistant();
    init_vanDerGrinten();
    init_vanDerGrinten2();
    init_vanDerGrinten3();
    init_vanDerGrinten4();
    init_wagner();
    init_wagner4();
    init_wagner6();
    init_wiechel();
    init_winkel3();
  });

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/data-viz/globe.js
  function globe({
    container,
    featureData,
    scoreValues,
    width = 600,
    height = 500,
    sens = 0.15,
    propertyKeys = {
      type: "rgn_typ",
      id: "rgn_id",
      name: "rgn_nam"
    },
    featureTypes = {
      land: ["land", "land-disputed", "land-noeez"],
      water: ["fao", "eez-ccamlr"],
      region: ["eez", "eez-disputed", "eez-inland"]
    },
    classes = {
      globe: "globe",
      water: "globe__water",
      land: "globe__land",
      region: "globe__region",
      focused: "globe__region--focused",
      button: "globe__button"
    }
  } = {}) {
    if (!featureData) {
      console.log("Feature data is required to render the globe.");
      return;
    }
    if (!container) {
      console.log("A container is required to render the globe");
      return;
    }
    const projectionSphere = d34.geoOrthographic().scale(245).rotate([0, 0]).translate([width / 2, height / 2]).clipAngle(90);
    const projectionFlat = d34.geoMollweide().scale(165).translate([width / 2, height / 2]).precision(0.1);
    let projection2 = projectionSphere;
    globeIcon = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M17.36,2.64L15.95,4.06C17.26,5.37 18,7.14 18,9A7,7 0 0,1 11,16C9.15,16 7.37,15.26 6.06,13.95L4.64,15.36C6.08,16.8 7.97,17.71 10,17.93V20H6V22H16V20H12V17.94C16.55,17.43 20,13.58 20,9C20,6.62 19.05,4.33 17.36,2.64M11,3.5A5.5,5.5 0 0,0 5.5,9A5.5,5.5 0 0,0 11,14.5A5.5,5.5 0 0,0 16.5,9A5.5,5.5 0 0,0 11,3.5M11,5.5C12.94,5.5 14.5,7.07 14.5,9A3.5,3.5 0 0,1 11,12.5A3.5,3.5 0 0,1 7.5,9A3.5,3.5 0 0,1 11,5.5Z" />
    </svg>`;
    flatIcon = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M20.5,3L20.34,3.03L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21L3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19.03 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3M10,5.47L14,6.87V18.53L10,17.13V5.47M5,6.46L8,5.45V17.15L5,18.31V6.46M19,17.54L16,18.55V6.86L19,5.7V17.54Z" />
    </svg>`;
    const switchProjButton = document.createElement("button");
    switchProjButton.classList = classes.button;
    switchProjButton.innerHTML = flatIcon;
    switchProjButton.onclick = toggleProjection;
    container.appendChild(switchProjButton);
    let path2 = d34.geoPath().projection(projection2);
    container.classList.add(classes.globe);
    const tooltip = regionTooltip_default();
    const svg2 = d34.select(container).append("svg").attr("preserveAspectRatio", "xMidYMid").attr("viewBox", [0, 0, width, height]);
    const sphere2 = svg2.append("path").datum({type: "Sphere"}).attr("class", classes.water).attr("d", path2).call(d34.drag().subject(getSubject).on("drag", rotatePolygons));
    const world = svg2.selectAll(null).data(featureData).join("path").attr("d", path2).attr("class", getClass).call(d34.drag().subject(getSubject).on("drag", rotatePolygons));
    let regionSelection = d34.selectAll("." + classes.region);
    regionSelection.on("click", focusRegion).on("mouseover", function(event, feature2) {
      const text = feature2 && feature2.properties ? feature2.properties[propertyKeys.name] : null;
      const num = getScore(feature2);
      const color2 = getColour(feature2);
      tooltip.update(text, num, color2);
    }).on("mousemove", function(event, feature2) {
      tooltip.reposition(event.pageX, event.pageY);
    }).on("mouseout", tooltip.hide);
    updateScores(scoreValues);
    function toggleProjection() {
      if (projection2 == projectionSphere) {
        projection2 = projectionFlat;
        switchProjButton.innerHTML = globeIcon;
      } else {
        projection2 = projectionSphere;
        switchProjButton.innerHTML = flatIcon;
      }
      let path3 = d34.geoPath().projection(projection2);
      sphere2.attr("d", path3);
      world.attr("d", path3);
    }
    function updateScores(newScoreValues) {
      scoreValues = newScoreValues;
      regionSelection.attr("fill", getColour);
    }
    function getClass(feature2) {
      const type = getType(feature2);
      return classes[type];
    }
    function getColour(feature2) {
      const score = getScore(feature2);
      return colorScale_default.getLegendColor(score);
    }
    function getScore(feature2) {
      if (!feature2) {
        return null;
      }
      const id3 = feature2.properties[propertyKeys.id];
      const score = scoreValues ? scoreValues[id3] : null;
      return score;
    }
    function getType(feature2) {
      const subtype = feature2.properties[propertyKeys.type];
      for (const [key, subtypes] of Object.entries(featureTypes)) {
        if (subtypes.includes(subtype)) {
          return key;
        }
      }
    }
    function isRegion(feature2) {
      return getType(feature2) === "region";
    }
    function getSubject() {
      if (projection2 == projectionFlat) {
        return;
      }
      const r = projection2.rotate();
      const x2 = r[0] / sens;
      const y2 = -r[1] / sens;
      return {x: x2, y: y2};
    }
    function rotatePolygons(event) {
      if (projection2 == projectionFlat) {
        return;
      }
      var rotate = projection2.rotate();
      projection2.rotate([event.x * sens, -event.y * sens, rotate[2]]);
      world.attr("d", path2);
      removeFocus();
    }
    function removeFocus() {
      svg2.selectAll("." + classes.focused).classed(classes.focused, focused = false);
    }
    function focusRegion(event, feature2) {
      const focusedRegion = feature2;
      const focusedRegionId = feature2.properties[propertyKeys.id];
      const p = d34.geoCentroid(focusedRegion);
      removeFocus();
      world.classed(classes.focused, function(feature3, i) {
        return feature3.properties[propertyKeys.id] == focusedRegionId ? focused = feature3 : false;
      });
      if (projection2 == projectionFlat) {
        return;
      }
      d34.transition().duration(1e3).tween("rotate", function() {
        var r = d34.interpolate(projection2.rotate(), [-p[0], -p[1]]);
        return function(t) {
          projection2.rotate(r(t));
          world.attr("d", path2);
        };
      });
    }
    ;
    function focusRegionById(id3) {
      var feature2 = world.filter(function(feature3, i) {
        return feature3.properties && feature3.properties[propertyKeys.id] ? feature3.properties[propertyKeys.id] == id3 : false;
      });
      if (!feature2.empty()) {
        focusRegion(null, feature2.data()[0]);
      }
    }
    return Object.freeze({
      focusRegionById,
      removeFocus,
      updateScores
    });
  }
  var d34, globe_default;
  var init_globe = __esm(() => {
    init_regionTooltip();
    init_colorScale();
    d34 = Object.assign({}, (init_src12(), src_exports6), (init_src(), src_exports), (init_src13(), src_exports7), (init_src16(), src_exports8), (init_src3(), src_exports2), (init_src17(), src_exports9));
    globe_default = globe;
  });

  // node_modules/topojson-client/src/identity.js
  function identity_default6(x2) {
    return x2;
  }
  var init_identity7 = __esm(() => {
  });

  // node_modules/topojson-client/src/transform.js
  function transform_default2(transform) {
    if (transform == null)
      return identity_default6;
    var x07, y07, kx3 = transform.scale[0], ky2 = transform.scale[1], dx = transform.translate[0], dy = transform.translate[1];
    return function(input, i) {
      if (!i)
        x07 = y07 = 0;
      var j = 2, n = input.length, output = new Array(n);
      output[0] = (x07 += input[0]) * kx3 + dx;
      output[1] = (y07 += input[1]) * ky2 + dy;
      while (j < n)
        output[j] = input[j], ++j;
      return output;
    };
  }
  var init_transform3 = __esm(() => {
    init_identity7();
  });

  // node_modules/topojson-client/src/bbox.js
  var init_bbox = __esm(() => {
    init_transform3();
  });

  // node_modules/topojson-client/src/reverse.js
  function reverse_default(array3, n) {
    var t, j = array3.length, i = j - n;
    while (i < --j)
      t = array3[i], array3[i++] = array3[j], array3[j] = t;
  }
  var init_reverse2 = __esm(() => {
  });

  // node_modules/topojson-client/src/feature.js
  function feature_default(topology, o) {
    if (typeof o === "string")
      o = topology.objects[o];
    return o.type === "GeometryCollection" ? {type: "FeatureCollection", features: o.geometries.map(function(o2) {
      return feature(topology, o2);
    })} : feature(topology, o);
  }
  function feature(topology, o) {
    var id3 = o.id, bbox = o.bbox, properties = o.properties == null ? {} : o.properties, geometry = object2(topology, o);
    return id3 == null && bbox == null ? {type: "Feature", properties, geometry} : bbox == null ? {type: "Feature", id: id3, properties, geometry} : {type: "Feature", id: id3, bbox, properties, geometry};
  }
  function object2(topology, o) {
    var transformPoint = transform_default2(topology.transform), arcs = topology.arcs;
    function arc(i, points2) {
      if (points2.length)
        points2.pop();
      for (var a2 = arcs[i < 0 ? ~i : i], k3 = 0, n = a2.length; k3 < n; ++k3) {
        points2.push(transformPoint(a2[k3], k3));
      }
      if (i < 0)
        reverse_default(points2, n);
    }
    function point6(p) {
      return transformPoint(p);
    }
    function line(arcs2) {
      var points2 = [];
      for (var i = 0, n = arcs2.length; i < n; ++i)
        arc(arcs2[i], points2);
      if (points2.length < 2)
        points2.push(points2[0]);
      return points2;
    }
    function ring(arcs2) {
      var points2 = line(arcs2);
      while (points2.length < 4)
        points2.push(points2[0]);
      return points2;
    }
    function polygon(arcs2) {
      return arcs2.map(ring);
    }
    function geometry(o2) {
      var type = o2.type, coordinates2;
      switch (type) {
        case "GeometryCollection":
          return {type, geometries: o2.geometries.map(geometry)};
        case "Point":
          coordinates2 = point6(o2.coordinates);
          break;
        case "MultiPoint":
          coordinates2 = o2.coordinates.map(point6);
          break;
        case "LineString":
          coordinates2 = line(o2.arcs);
          break;
        case "MultiLineString":
          coordinates2 = o2.arcs.map(line);
          break;
        case "Polygon":
          coordinates2 = polygon(o2.arcs);
          break;
        case "MultiPolygon":
          coordinates2 = o2.arcs.map(polygon);
          break;
        default:
          return null;
      }
      return {type, coordinates: coordinates2};
    }
    return geometry(o);
  }
  var init_feature = __esm(() => {
    init_reverse2();
    init_transform3();
  });

  // node_modules/topojson-client/src/stitch.js
  var init_stitch2 = __esm(() => {
  });

  // node_modules/topojson-client/src/mesh.js
  var init_mesh = __esm(() => {
    init_feature();
    init_stitch2();
  });

  // node_modules/topojson-client/src/merge.js
  var init_merge4 = __esm(() => {
    init_feature();
    init_stitch2();
  });

  // node_modules/topojson-client/src/bisect.js
  var init_bisect2 = __esm(() => {
  });

  // node_modules/topojson-client/src/neighbors.js
  var init_neighbors = __esm(() => {
    init_bisect2();
  });

  // node_modules/topojson-client/src/untransform.js
  var init_untransform = __esm(() => {
    init_identity7();
  });

  // node_modules/topojson-client/src/quantize.js
  var init_quantize4 = __esm(() => {
    init_bbox();
    init_untransform();
  });

  // node_modules/topojson-client/src/index.js
  var init_src18 = __esm(() => {
    init_bbox();
    init_feature();
    init_mesh();
    init_merge4();
    init_neighbors();
    init_quantize4();
    init_transform3();
    init_untransform();
  });

  // node_modules/d3-fetch/src/blob.js
  function responseBlob(response) {
    if (!response.ok)
      throw new Error(response.status + " " + response.statusText);
    return response.blob();
  }
  function blob_default(input, init3) {
    return fetch(input, init3).then(responseBlob);
  }
  var init_blob = __esm(() => {
  });

  // node_modules/d3-fetch/src/buffer.js
  function responseArrayBuffer(response) {
    if (!response.ok)
      throw new Error(response.status + " " + response.statusText);
    return response.arrayBuffer();
  }
  function buffer_default2(input, init3) {
    return fetch(input, init3).then(responseArrayBuffer);
  }
  var init_buffer2 = __esm(() => {
  });

  // node_modules/d3-dsv/src/dsv.js
  function objectConverter(columns) {
    return new Function("d", "return {" + columns.map(function(name, i) {
      return JSON.stringify(name) + ": d[" + i + '] || ""';
    }).join(",") + "}");
  }
  function customConverter(columns, f) {
    var object3 = objectConverter(columns);
    return function(row, i) {
      return f(object3(row), i, columns);
    };
  }
  function inferColumns(rows) {
    var columnSet = Object.create(null), columns = [];
    rows.forEach(function(row) {
      for (var column in row) {
        if (!(column in columnSet)) {
          columns.push(columnSet[column] = column);
        }
      }
    });
    return columns;
  }
  function pad2(value, width) {
    var s2 = value + "", length4 = s2.length;
    return length4 < width ? new Array(width - length4 + 1).join(0) + s2 : s2;
  }
  function formatYear2(year2) {
    return year2 < 0 ? "-" + pad2(-year2, 6) : year2 > 9999 ? "+" + pad2(year2, 6) : pad2(year2, 4);
  }
  function formatDate(date2) {
    var hours2 = date2.getUTCHours(), minutes2 = date2.getUTCMinutes(), seconds2 = date2.getUTCSeconds(), milliseconds2 = date2.getUTCMilliseconds();
    return isNaN(date2) ? "Invalid Date" : formatYear2(date2.getUTCFullYear(), 4) + "-" + pad2(date2.getUTCMonth() + 1, 2) + "-" + pad2(date2.getUTCDate(), 2) + (milliseconds2 ? "T" + pad2(hours2, 2) + ":" + pad2(minutes2, 2) + ":" + pad2(seconds2, 2) + "." + pad2(milliseconds2, 3) + "Z" : seconds2 ? "T" + pad2(hours2, 2) + ":" + pad2(minutes2, 2) + ":" + pad2(seconds2, 2) + "Z" : minutes2 || hours2 ? "T" + pad2(hours2, 2) + ":" + pad2(minutes2, 2) + "Z" : "");
  }
  function dsv_default(delimiter) {
    var reFormat = new RegExp('["' + delimiter + "\n\r]"), DELIMITER = delimiter.charCodeAt(0);
    function parse(text, f) {
      var convert, columns, rows = parseRows(text, function(row, i) {
        if (convert)
          return convert(row, i - 1);
        columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
      });
      rows.columns = columns || [];
      return rows;
    }
    function parseRows(text, f) {
      var rows = [], N = text.length, I = 0, n = 0, t, eof = N <= 0, eol = false;
      if (text.charCodeAt(N - 1) === NEWLINE)
        --N;
      if (text.charCodeAt(N - 1) === RETURN)
        --N;
      function token() {
        if (eof)
          return EOF;
        if (eol)
          return eol = false, EOL;
        var i, j = I, c2;
        if (text.charCodeAt(j) === QUOTE) {
          while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE)
            ;
          if ((i = I) >= N)
            eof = true;
          else if ((c2 = text.charCodeAt(I++)) === NEWLINE)
            eol = true;
          else if (c2 === RETURN) {
            eol = true;
            if (text.charCodeAt(I) === NEWLINE)
              ++I;
          }
          return text.slice(j + 1, i - 1).replace(/""/g, '"');
        }
        while (I < N) {
          if ((c2 = text.charCodeAt(i = I++)) === NEWLINE)
            eol = true;
          else if (c2 === RETURN) {
            eol = true;
            if (text.charCodeAt(I) === NEWLINE)
              ++I;
          } else if (c2 !== DELIMITER)
            continue;
          return text.slice(j, i);
        }
        return eof = true, text.slice(j, N);
      }
      while ((t = token()) !== EOF) {
        var row = [];
        while (t !== EOL && t !== EOF)
          row.push(t), t = token();
        if (f && (row = f(row, n++)) == null)
          continue;
        rows.push(row);
      }
      return rows;
    }
    function preformatBody(rows, columns) {
      return rows.map(function(row) {
        return columns.map(function(column) {
          return formatValue(row[column]);
        }).join(delimiter);
      });
    }
    function format2(rows, columns) {
      if (columns == null)
        columns = inferColumns(rows);
      return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
    }
    function formatBody(rows, columns) {
      if (columns == null)
        columns = inferColumns(rows);
      return preformatBody(rows, columns).join("\n");
    }
    function formatRows(rows) {
      return rows.map(formatRow).join("\n");
    }
    function formatRow(row) {
      return row.map(formatValue).join(delimiter);
    }
    function formatValue(value) {
      return value == null ? "" : value instanceof Date ? formatDate(value) : reFormat.test(value += "") ? '"' + value.replace(/"/g, '""') + '"' : value;
    }
    return {
      parse,
      parseRows,
      format: format2,
      formatBody,
      formatRows,
      formatRow,
      formatValue
    };
  }
  var EOL, EOF, QUOTE, NEWLINE, RETURN;
  var init_dsv = __esm(() => {
    EOL = {};
    EOF = {};
    QUOTE = 34;
    NEWLINE = 10;
    RETURN = 13;
  });

  // node_modules/d3-dsv/src/csv.js
  var csv, csvParse, csvParseRows, csvFormat, csvFormatBody, csvFormatRows, csvFormatRow, csvFormatValue;
  var init_csv = __esm(() => {
    init_dsv();
    csv = dsv_default(",");
    csvParse = csv.parse;
    csvParseRows = csv.parseRows;
    csvFormat = csv.format;
    csvFormatBody = csv.formatBody;
    csvFormatRows = csv.formatRows;
    csvFormatRow = csv.formatRow;
    csvFormatValue = csv.formatValue;
  });

  // node_modules/d3-dsv/src/tsv.js
  var tsv, tsvParse, tsvParseRows, tsvFormat, tsvFormatBody, tsvFormatRows, tsvFormatRow, tsvFormatValue;
  var init_tsv = __esm(() => {
    init_dsv();
    tsv = dsv_default("	");
    tsvParse = tsv.parse;
    tsvParseRows = tsv.parseRows;
    tsvFormat = tsv.format;
    tsvFormatBody = tsv.formatBody;
    tsvFormatRows = tsv.formatRows;
    tsvFormatRow = tsv.formatRow;
    tsvFormatValue = tsv.formatValue;
  });

  // node_modules/d3-dsv/src/index.js
  var init_src19 = __esm(() => {
    init_dsv();
    init_csv();
    init_tsv();
  });

  // node_modules/d3-fetch/src/text.js
  function responseText(response) {
    if (!response.ok)
      throw new Error(response.status + " " + response.statusText);
    return response.text();
  }
  function text_default3(input, init3) {
    return fetch(input, init3).then(responseText);
  }
  var init_text3 = __esm(() => {
  });

  // node_modules/d3-fetch/src/dsv.js
  function dsvParse(parse) {
    return function(input, init3, row) {
      if (arguments.length === 2 && typeof init3 === "function")
        row = init3, init3 = void 0;
      return text_default3(input, init3).then(function(response) {
        return parse(response, row);
      });
    };
  }
  function dsv(delimiter, input, init3, row) {
    if (arguments.length === 3 && typeof init3 === "function")
      row = init3, init3 = void 0;
    var format2 = dsv_default(delimiter);
    return text_default3(input, init3).then(function(response) {
      return format2.parse(response, row);
    });
  }
  var csv2, tsv2;
  var init_dsv2 = __esm(() => {
    init_src19();
    init_text3();
    csv2 = dsvParse(csvParse);
    tsv2 = dsvParse(tsvParse);
  });

  // node_modules/d3-fetch/src/image.js
  function image_default(input, init3) {
    return new Promise(function(resolve, reject) {
      var image = new Image();
      for (var key in init3)
        image[key] = init3[key];
      image.onerror = reject;
      image.onload = function() {
        resolve(image);
      };
      image.src = input;
    });
  }
  var init_image = __esm(() => {
  });

  // node_modules/d3-fetch/src/json.js
  function responseJson(response) {
    if (!response.ok)
      throw new Error(response.status + " " + response.statusText);
    if (response.status === 204 || response.status === 205)
      return;
    return response.json();
  }
  function json_default(input, init3) {
    return fetch(input, init3).then(responseJson);
  }
  var init_json = __esm(() => {
  });

  // node_modules/d3-fetch/src/xml.js
  function parser(type) {
    return (input, init3) => text_default3(input, init3).then((text) => new DOMParser().parseFromString(text, type));
  }
  var xml_default, html, svg;
  var init_xml = __esm(() => {
    init_text3();
    xml_default = parser("application/xml");
    html = parser("text/html");
    svg = parser("image/svg+xml");
  });

  // node_modules/d3-fetch/src/index.js
  var src_exports10 = {};
  __export(src_exports10, {
    blob: () => blob_default,
    buffer: () => buffer_default2,
    csv: () => csv2,
    dsv: () => dsv,
    html: () => html,
    image: () => image_default,
    json: () => json_default,
    svg: () => svg,
    text: () => text_default3,
    tsv: () => tsv2,
    xml: () => xml_default
  });
  var init_src20 = __esm(() => {
    init_blob();
    init_buffer2();
    init_dsv2();
    init_image();
    init_json();
    init_text3();
    init_xml();
  });

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/data-viz/data.js
  function data({
    goalIconsDirPath = "/images/goal-icons/",
    missingValueCode = "NA",
    dataPaths = {
      scores: "scores.csv",
      regions: "regions.topojson",
      goals: "goalLabels.json"
    }
  } = dataBundleConfig) {
    if (!dataPaths || !dataPaths.scores || !dataPaths.regions) {
      console.log("Error: Path to data is required for OHIData to load data.");
      return;
    }
    async function importJSON(path2) {
      let response = await fetch(path2);
      let data2 = await response.json();
      return data2;
    }
    async function importCSV(path2) {
      let data2 = await d35.csv(path2).then((data3) => data3);
      return data2;
    }
    async function importSVG(path2) {
      const parser2 = new DOMParser();
      let response = await fetch(path2);
      let svg2 = await response.text();
      svg2 = svg2 && svg2.startsWith("<svg") ? svg2 : null;
      svg2 = svg2 ? parser2.parseFromString(svg2, "image/svg+xml").documentElement : null;
      return svg2;
    }
    async function attachGoalIcons(goalLabels) {
      if (!goalLabels) {
        return;
      }
      for (const goalLabel of goalLabels) {
        if (goalLabel.icon) {
          let dirPath = goalIconsDirPath || "";
          if (dirPath) {
            dirPath += dirPath.endsWith("/") ? "" : "/";
          }
          const fullIconPath = dirPath + goalLabel.icon;
          const svgEl = await importSVG(fullIconPath);
          goalLabel.icon = svgEl;
        }
      }
    }
    async function importData() {
      const features = await importJSON(dataPaths.regions);
      const scores = await importCSV(dataPaths.scores);
      let goalLabels = await importJSON(dataPaths.goals);
      await attachGoalIcons(goalLabels);
      return {goalLabels, features, scores};
    }
    function processData(data2) {
      const topoFeatureName = Object.keys(data2.features.objects)[0];
      const featureData = feature_default(data2.features, data2.features.objects[topoFeatureName]).features;
      data2.features = featureData;
      data2.years = [...new Set(data2.scores.map((row) => row.scenario))];
      data2.goalCodes = [...new Set(data2.scores.map((row) => row.goal))];
      regionIds = [...new Set(data2.scores.map((row) => row.region_id))];
      data2.dimensions = [...new Set(data2.scores.map((row) => row.dimension))];
      data2.regionLabels = {};
      regionIds.forEach(function(region) {
        const regionData = data2.scores.find(function(d) {
          return d.region_id === region;
        });
        data2.regionLabels[regionData.region_id] = regionData.region_name;
      });
      let groupedData = {};
      data2.dimensions.forEach(function(dimension) {
        groupedData[dimension] = {};
        const dimensionData = data2.scores.filter(function(d) {
          return d.dimension === dimension;
        });
        data2.years.forEach(function(year2) {
          groupedData[dimension][year2] = {};
          const dimensionYearData = dimensionData.filter(function(d) {
            return d.scenario === year2;
          });
          data2.goalCodes.forEach(function(goal) {
            groupedData[dimension][year2][goal] = {};
            const dimensionYearGoalData = dimensionYearData.filter(function(d) {
              return d.goal === goal;
            });
            regionIds.forEach(function(region) {
              const regionData = dimensionYearGoalData.find(function(d) {
                return d.region_id === region;
              });
              if (regionData && regionData.value && regionData.value !== missingValueCode) {
                groupedData[dimension][year2][goal][region] = Number(regionData.value);
              }
            });
          });
        });
      });
      data2.scores = groupedData;
      return data2;
    }
    async function getData() {
      const rawData = await importData();
      const processedData = await processData(rawData);
      return processedData;
    }
    return getData();
  }
  var d35, dataBundleConfig, data_default2;
  var init_data2 = __esm(() => {
    init_src18();
    init_params();
    d35 = Object.assign({}, (init_src20(), src_exports10));
    dataBundleConfig = {};
    if (params_default.dataConfig) {
      dataBundleConfig = JSON.parse(params_default.dataConfig);
    }
    data_default2 = data;
  });

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/utility.js
  var utility, utility_default;
  var init_utility = __esm(() => {
    utility = function() {
      const debounce = (func, delay2, immediate) => {
        let timerId;
        return (...args) => {
          const boundFunc = func.bind(this, ...args);
          clearTimeout(timerId);
          if (immediate && !timerId) {
            boundFunc();
          }
          const calleeFunc = immediate ? () => {
            timerId = null;
          } : boundFunc;
          timerId = setTimeout(calleeFunc, delay2);
        };
      };
      return Object.freeze({
        debounce
      });
    }();
    utility_default = utility;
  });

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/data-viz/numberSlider.js
  function numberSlider({
    min: min4 = 0,
    max: max4 = 100,
    step: step2 = 10,
    startValue = 50,
    handleSize = 14,
    classes = {
      slider: "number-slider",
      values: "number-slider__values",
      label: "number-slider__label",
      value: "number-slider__value",
      background: "number-slider__background",
      progress: "number-slider__progress",
      tickMarks: "number-slider__ticks",
      tickMark: "number-slider__tick"
    }
  } = {}) {
    let minLabel = null;
    let maxLabel = null;
    let valueLabel = null;
    let progressEl = null;
    let tickMarksEl = null;
    let inputEl = null;
    let slider = createSliderHTML();
    window.addEventListener("resize", updateValuePosition);
    function createSliderHTML() {
      const slider2 = document.createElement("div");
      slider2.classList.add(classes.slider);
      minLabel = document.createElement("div");
      minLabel.innerHTML = min4;
      minLabel.classList.add(classes.label);
      maxLabel = document.createElement("div");
      maxLabel.innerHTML = max4;
      maxLabel.classList.add(classes.label);
      valueLabel = document.createElement("div");
      valueLabel.innerHTML = startValue;
      valueLabel.classList.add(classes.value);
      var labelContainer = document.createElement("div");
      labelContainer.classList.add(classes.values);
      labelContainer.append(minLabel, maxLabel, valueLabel);
      var background = document.createElement("div");
      background.classList.add(classes.background);
      progressEl = document.createElement("div");
      progressEl.classList.add(classes.progress);
      tickMarksEl = document.createElement("div");
      tickMarksEl.classList.add(classes.tickMarks);
      inputEl = document.createElement("input");
      inputEl.type = "range";
      inputEl.min = min4;
      inputEl.max = max4;
      inputEl.value = startValue;
      slider2.append(labelContainer, background, progressEl, tickMarksEl, inputEl);
      setTicks();
      setTimeout(() => {
        update();
      }, 1);
      inputEl.oninput = selectNumber;
      return slider2;
    }
    function selectNumber() {
      const changeEvent = new CustomEvent("update", {detail: inputEl.value});
      slider.dispatchEvent(changeEvent);
      update();
    }
    function update() {
      updateValue();
      updateValuePosition();
      updateLabels();
      updateProgress();
    }
    function updateValue() {
      valueLabel.innerHTML = "<div>" + inputEl.value + "</div>";
    }
    function updateValuePosition() {
      const percent = getSliderPercent.call(this);
      const sliderWidth = inputEl.getBoundingClientRect().width;
      const valueWidth = valueLabel.getBoundingClientRect().width;
      let left2 = percent * (sliderWidth - handleSize) + handleSize / 2 - valueWidth / 2;
      left2 = Math.min(left2, sliderWidth - valueWidth);
      left2 = inputEl.value === inputEl.min ? 0 : left2;
      valueLabel.style.left = left2 + "px";
    }
    function updateLabels() {
      const valueRect = valueLabel.getBoundingClientRect();
      const minLabelRect = minLabel.getBoundingClientRect();
      const maxLabelRect = maxLabel.getBoundingClientRect();
      const minLabelDelta = valueRect.left - minLabelRect.left;
      const maxLabelDelta = maxLabelRect.left - valueRect.left;
      const deltaThreshold = 32;
      if (minLabelDelta < deltaThreshold)
        minLabel.classList.add("hidden");
      else
        minLabel.classList.remove("hidden");
      if (maxLabelDelta < deltaThreshold)
        maxLabel.classList.add("hidden");
      else
        maxLabel.classList.remove("hidden");
    }
    function updateProgress() {
      const percent = getSliderPercent.call(this);
      progressEl.style.width = percent * 100 + "%";
    }
    function getSliderPercent() {
      const range2 = inputEl.max - inputEl.min;
      const absValue = inputEl.value - inputEl.min;
      return absValue / range2;
    }
    function setTicks() {
      const spacing = parseFloat(step2);
      const sliderRange = inputEl.max - inputEl.min;
      const tickCount = sliderRange / spacing + 1;
      for (let ii = 0; ii < tickCount; ii++) {
        let tick = document.createElement("span");
        tick.className = classes.tickMark;
        tickMarksEl.appendChild(tick);
      }
    }
    return slider;
  }
  var numberSlider_default;
  var init_numberSlider = __esm(() => {
    numberSlider_default = numberSlider;
  });

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/data-viz/dropdown.js
  function enhancedDropdown({
    placeholderText = "Select one",
    classes = {
      dropdown: "dropdown",
      input: "dropdown__input",
      inputActive: "dropdown__input--active",
      placeholder: "dropdown__placeholder",
      placeholderText: "dropdown__placeholder-text",
      list: "dropdown__list",
      listHidden: "dropdown__list--hidden",
      item: "dropdown__item",
      childItem: "dropdown__item--child",
      subtext: "dropdown__subtext",
      itemIcon: "dropdown__icon"
    },
    data: data2 = [],
    selected = null
  } = {}) {
    data2 = data2.map((a2) => ({...a2}));
    const dropdown = document.createElement("div");
    dropdown.classList = classes.dropdown;
    const input = createInput();
    const list = createList();
    dropdown.append(input, list);
    function createInput() {
      const input2 = document.createElement("div");
      input2.classList = classes.input;
      input2.addEventListener("click", toggleDropdown);
      const placeholder = document.createElement("div");
      placeholder.classList = classes.placeholder;
      const placeholderTextEl = document.createElement("span");
      placeholderTextEl.textContent = getLabelById(selected) || placeholderText;
      placeholderTextEl.classList = classes.placeholderText;
      placeholder.appendChild(placeholderTextEl);
      input2.appendChild(placeholder);
      return input2;
    }
    ;
    function createList() {
      const list2 = document.createElement("ul");
      list2.classList.add(classes.list, classes.listHidden);
      data2.forEach((item) => {
        let {
          id: id3,
          label,
          subtext,
          parent,
          icon
        } = item;
        const option = document.createElement("li");
        option.classList = classes.item;
        const labelEl = document.createElement("span");
        labelEl.textContent = label;
        option.appendChild(labelEl);
        if (icon) {
          const itemIcon = icon.cloneNode(true);
          itemIcon.classList.add(classes.itemIcon);
          option.prepend(itemIcon);
        }
        if (subtext) {
          const subtextEl = document.createElement("span");
          subtextEl.classList = classes.subtext;
          subtextEl.textContent = `(${subtext})`;
          option.appendChild(subtextEl);
        }
        if (parent) {
          option.classList.add(classes.childItem);
        }
        option.addEventListener("click", function() {
          selectOption(item);
        });
        list2.appendChild(option);
        item.listItemEl = option;
      });
      return list2;
    }
    ;
    function getItemById(id3) {
      return data2.find((item) => item.id === id3);
    }
    function getLabelById(id3) {
      let label = null;
      const selectedItem = getItemById(id3);
      if (selectedItem) {
        label = selectedItem.label;
      }
      return label;
    }
    function toggleDropdown() {
      list.classList.toggle(classes.listHidden);
      input.classList.toggle(classes.inputActive);
    }
    ;
    function selectOption(item) {
      if (!item.id) {
        return;
      }
      if (!item.label) {
        item.label = getLabelById(id);
        if (!item.label) {
          return;
        }
      }
      let selectedHTML = item.listItemEl.cloneNode(true);
      if (item.parent && !item.icon) {
        const parent = getItemById(item.parent);
        if (parent && parent.listItemEl) {
          let parentHTML = parent.listItemEl.cloneNode(true);
          const textEl = parentHTML.getElementsByTagName("span")[0];
          textEl.innerHTML += ":&nbsp";
          parentHTML.appendChild(selectedHTML.childNodes[0]);
          selectedHTML = parentHTML;
        }
      }
      const placeholderTextEl = input.querySelector("." + classes.placeholderText);
      placeholderTextEl.innerHTML = selectedHTML.innerHTML;
      const changeEvent = new CustomEvent("update", {
        detail: {
          id: item.id,
          label: item.label
        }
      });
      dropdown.dispatchEvent(changeEvent);
      toggleDropdown();
    }
    ;
    return dropdown;
  }
  var dropdown_default;
  var init_dropdown = __esm(() => {
    dropdown_default = enhancedDropdown;
  });

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/data-viz/globalScores.js
  var globalScores_exports = {};
  __export(globalScores_exports, {
    default: () => globalScores_default
  });
  async function globalScores({
    container = null,
    classes = {
      globalScores: "global-scores",
      globeContainer: "global-scores__globe",
      descriptionContainer: "global-scores__description",
      descriptionText: "global-scores__description-text",
      controls: "global-scores__controls",
      control: "global-scores__control",
      legend: "global-scores__legend",
      label: "global-scores__label"
    }
  } = {}) {
    if (!container) {
      console.log("A container is required to render a global scores visualization.");
      return;
    }
    const ohiData = await data_default2();
    container.classList.add(classes.globalScores);
    const descriptionContainer = document.createElement("div");
    const descriptionPara = document.createElement("p");
    descriptionPara.classList.add(classes.descriptionText);
    descriptionContainer.appendChild(descriptionPara);
    descriptionContainer.classList.add(classes.descriptionContainer);
    const controls = document.createElement("div");
    controls.classList.add(classes.controls);
    const globeContainer = document.createElement("div");
    globeContainer.classList.add(classes.globeContainer);
    const legendContainer = document.createElement("div");
    legendContainer.classList.add(classes.legend);
    const legend2 = colorScale_default.getLegend(classes.label);
    legendContainer.appendChild(legend2);
    container.append(controls, descriptionContainer, globeContainer, legendContainer);
    let myGlobe = globe_default({
      container: globeContainer,
      featureData: ohiData.features
    });
    const maxYear = Math.max(...ohiData.years);
    const minYear = Math.min(...ohiData.years);
    let selections = {
      dimension: "score",
      year: maxYear.toString(),
      goal: "Index"
    };
    const updateGlobe = utility_default.debounce(function() {
      let scoreValues = ohiData.scores[selections.dimension][selections.year][selections.goal];
      myGlobe.updateScores(scoreValues);
    }, 200);
    createControls();
    updateGlobe();
    updateDescription();
    function updateDescription() {
      const selectedGoal = ohiData.goalLabels.find(function(goal) {
        return goal.id === selections.goal;
      });
      const descriptionText = selectedGoal ? selectedGoal.description : null;
      if (descriptionText) {
        descriptionPara.innerHTML = descriptionText + " <a href='#'>Learn more</a>";
      } else {
        descriptionPara.innerHTML = "";
      }
    }
    function createControls() {
      const yearControl = document.createElement("div");
      yearControl.classList = classes.control;
      const yearLabel = document.createElement("span");
      yearLabel.classList = classes.label;
      const goalControl = yearControl.cloneNode(true);
      const goalLabel = yearLabel.cloneNode(true);
      yearControl.appendChild(yearLabel);
      goalControl.appendChild(goalLabel);
      yearLabel.innerText = "Year";
      goalLabel.innerText = "Goal";
      controls.append(goalControl, yearControl);
      const yearSlider = numberSlider_default({
        min: minYear,
        max: maxYear,
        step: 1,
        startValue: maxYear
      });
      yearSlider.addEventListener("update", function(e3) {
        selections.year = e3.detail.toString();
        updateGlobe();
      });
      yearControl.appendChild(yearSlider);
      const goalsInput = dropdown_default({
        data: ohiData.goalLabels,
        selected: selections.goal
      });
      goalsInput.addEventListener("update", function(e3) {
        selections.goal = e3.detail.id;
        updateGlobe();
        updateDescription();
      });
      goalControl.appendChild(goalsInput);
    }
  }
  var d36, globalScores_default;
  var init_globalScores = __esm(() => {
    init_colorScale();
    init_globe();
    init_data2();
    init_utility();
    init_numberSlider();
    init_dropdown();
    d36 = Object.assign({}, (init_src(), src_exports));
    globalScores_default = globalScores;
  });

  // node_modules/d3-path/src/path.js
  function Path() {
    this._x0 = this._y0 = this._x1 = this._y1 = null;
    this._ = "";
  }
  function path() {
    return new Path();
  }
  var pi3, tau3, epsilon6, tauEpsilon, path_default2;
  var init_path2 = __esm(() => {
    pi3 = Math.PI;
    tau3 = 2 * pi3;
    epsilon6 = 1e-6;
    tauEpsilon = tau3 - epsilon6;
    Path.prototype = path.prototype = {
      constructor: Path,
      moveTo: function(x2, y2) {
        this._ += "M" + (this._x0 = this._x1 = +x2) + "," + (this._y0 = this._y1 = +y2);
      },
      closePath: function() {
        if (this._x1 !== null) {
          this._x1 = this._x0, this._y1 = this._y0;
          this._ += "Z";
        }
      },
      lineTo: function(x2, y2) {
        this._ += "L" + (this._x1 = +x2) + "," + (this._y1 = +y2);
      },
      quadraticCurveTo: function(x13, y13, x2, y2) {
        this._ += "Q" + +x13 + "," + +y13 + "," + (this._x1 = +x2) + "," + (this._y1 = +y2);
      },
      bezierCurveTo: function(x13, y13, x2, y2, x3, y3) {
        this._ += "C" + +x13 + "," + +y13 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x3) + "," + (this._y1 = +y3);
      },
      arcTo: function(x13, y13, x2, y2, r) {
        x13 = +x13, y13 = +y13, x2 = +x2, y2 = +y2, r = +r;
        var x07 = this._x1, y07 = this._y1, x21 = x2 - x13, y21 = y2 - y13, x01 = x07 - x13, y01 = y07 - y13, l01_2 = x01 * x01 + y01 * y01;
        if (r < 0)
          throw new Error("negative radius: " + r);
        if (this._x1 === null) {
          this._ += "M" + (this._x1 = x13) + "," + (this._y1 = y13);
        } else if (!(l01_2 > epsilon6))
          ;
        else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon6) || !r) {
          this._ += "L" + (this._x1 = x13) + "," + (this._y1 = y13);
        } else {
          var x20 = x2 - x07, y20 = y2 - y07, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi3 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
          if (Math.abs(t01 - 1) > epsilon6) {
            this._ += "L" + (x13 + t01 * x01) + "," + (y13 + t01 * y01);
          }
          this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x13 + t21 * x21) + "," + (this._y1 = y13 + t21 * y21);
        }
      },
      arc: function(x2, y2, r, a0, a1, ccw) {
        x2 = +x2, y2 = +y2, r = +r, ccw = !!ccw;
        var dx = r * Math.cos(a0), dy = r * Math.sin(a0), x07 = x2 + dx, y07 = y2 + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
        if (r < 0)
          throw new Error("negative radius: " + r);
        if (this._x1 === null) {
          this._ += "M" + x07 + "," + y07;
        } else if (Math.abs(this._x1 - x07) > epsilon6 || Math.abs(this._y1 - y07) > epsilon6) {
          this._ += "L" + x07 + "," + y07;
        }
        if (!r)
          return;
        if (da < 0)
          da = da % tau3 + tau3;
        if (da > tauEpsilon) {
          this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x2 - dx) + "," + (y2 - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x07) + "," + (this._y1 = y07);
        } else if (da > epsilon6) {
          this._ += "A" + r + "," + r + ",0," + +(da >= pi3) + "," + cw + "," + (this._x1 = x2 + r * Math.cos(a1)) + "," + (this._y1 = y2 + r * Math.sin(a1));
        }
      },
      rect: function(x2, y2, w2, h) {
        this._ += "M" + (this._x0 = this._x1 = +x2) + "," + (this._y0 = this._y1 = +y2) + "h" + +w2 + "v" + +h + "h" + -w2 + "Z";
      },
      toString: function() {
        return this._;
      }
    };
    path_default2 = path;
  });

  // node_modules/d3-path/src/index.js
  var init_src21 = __esm(() => {
    init_path2();
  });

  // node_modules/d3-shape/src/constant.js
  function constant_default6(x2) {
    return function constant() {
      return x2;
    };
  }
  var init_constant7 = __esm(() => {
  });

  // node_modules/d3-shape/src/math.js
  function acos3(x2) {
    return x2 > 1 ? 0 : x2 < -1 ? pi4 : Math.acos(x2);
  }
  function asin3(x2) {
    return x2 >= 1 ? halfPi3 : x2 <= -1 ? -halfPi3 : Math.asin(x2);
  }
  var abs3, atan23, cos3, max3, min3, sin3, sqrt4, epsilon7, pi4, halfPi3, tau4;
  var init_math4 = __esm(() => {
    abs3 = Math.abs;
    atan23 = Math.atan2;
    cos3 = Math.cos;
    max3 = Math.max;
    min3 = Math.min;
    sin3 = Math.sin;
    sqrt4 = Math.sqrt;
    epsilon7 = 1e-12;
    pi4 = Math.PI;
    halfPi3 = pi4 / 2;
    tau4 = 2 * pi4;
  });

  // node_modules/d3-shape/src/arc.js
  function arcInnerRadius(d) {
    return d.innerRadius;
  }
  function arcOuterRadius(d) {
    return d.outerRadius;
  }
  function arcStartAngle(d) {
    return d.startAngle;
  }
  function arcEndAngle(d) {
    return d.endAngle;
  }
  function arcPadAngle(d) {
    return d && d.padAngle;
  }
  function intersect(x07, y07, x13, y13, x2, y2, x3, y3) {
    var x10 = x13 - x07, y10 = y13 - y07, x32 = x3 - x2, y32 = y3 - y2, t = y32 * x10 - x32 * y10;
    if (t * t < epsilon7)
      return;
    t = (x32 * (y07 - y2) - y32 * (x07 - x2)) / t;
    return [x07 + t * x10, y07 + t * y10];
  }
  function cornerTangents(x07, y07, x13, y13, r1, rc, cw) {
    var x01 = x07 - x13, y01 = y07 - y13, lo = (cw ? rc : -rc) / sqrt4(x01 * x01 + y01 * y01), ox = lo * y01, oy = -lo * x01, x11 = x07 + ox, y11 = y07 + oy, x10 = x13 + ox, y10 = y13 + oy, x004 = (x11 + x10) / 2, y004 = (y11 + y10) / 2, dx = x10 - x11, dy = y10 - y11, d2 = dx * dx + dy * dy, r = r1 - rc, D2 = x11 * y10 - x10 * y11, d = (dy < 0 ? -1 : 1) * sqrt4(max3(0, r * r * d2 - D2 * D2)), cx0 = (D2 * dy - dx * d) / d2, cy0 = (-D2 * dx - dy * d) / d2, cx1 = (D2 * dy + dx * d) / d2, cy1 = (-D2 * dx + dy * d) / d2, dx0 = cx0 - x004, dy0 = cy0 - y004, dx1 = cx1 - x004, dy1 = cy1 - y004;
    if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1)
      cx0 = cx1, cy0 = cy1;
    return {
      cx: cx0,
      cy: cy0,
      x01: -ox,
      y01: -oy,
      x11: cx0 * (r1 / r - 1),
      y11: cy0 * (r1 / r - 1)
    };
  }
  function arc_default() {
    var innerRadius = arcInnerRadius, outerRadius = arcOuterRadius, cornerRadius = constant_default6(0), padRadius = null, startAngle = arcStartAngle, endAngle = arcEndAngle, padAngle = arcPadAngle, context = null;
    function arc() {
      var buffer, r, r0 = +innerRadius.apply(this, arguments), r1 = +outerRadius.apply(this, arguments), a0 = startAngle.apply(this, arguments) - halfPi3, a1 = endAngle.apply(this, arguments) - halfPi3, da = abs3(a1 - a0), cw = a1 > a0;
      if (!context)
        context = buffer = path_default2();
      if (r1 < r0)
        r = r1, r1 = r0, r0 = r;
      if (!(r1 > epsilon7))
        context.moveTo(0, 0);
      else if (da > tau4 - epsilon7) {
        context.moveTo(r1 * cos3(a0), r1 * sin3(a0));
        context.arc(0, 0, r1, a0, a1, !cw);
        if (r0 > epsilon7) {
          context.moveTo(r0 * cos3(a1), r0 * sin3(a1));
          context.arc(0, 0, r0, a1, a0, cw);
        }
      } else {
        var a01 = a0, a11 = a1, a00 = a0, a10 = a1, da0 = da, da1 = da, ap = padAngle.apply(this, arguments) / 2, rp = ap > epsilon7 && (padRadius ? +padRadius.apply(this, arguments) : sqrt4(r0 * r0 + r1 * r1)), rc = min3(abs3(r1 - r0) / 2, +cornerRadius.apply(this, arguments)), rc0 = rc, rc1 = rc, t03, t13;
        if (rp > epsilon7) {
          var p02 = asin3(rp / r0 * sin3(ap)), p1 = asin3(rp / r1 * sin3(ap));
          if ((da0 -= p02 * 2) > epsilon7)
            p02 *= cw ? 1 : -1, a00 += p02, a10 -= p02;
          else
            da0 = 0, a00 = a10 = (a0 + a1) / 2;
          if ((da1 -= p1 * 2) > epsilon7)
            p1 *= cw ? 1 : -1, a01 += p1, a11 -= p1;
          else
            da1 = 0, a01 = a11 = (a0 + a1) / 2;
        }
        var x01 = r1 * cos3(a01), y01 = r1 * sin3(a01), x10 = r0 * cos3(a10), y10 = r0 * sin3(a10);
        if (rc > epsilon7) {
          var x11 = r1 * cos3(a11), y11 = r1 * sin3(a11), x004 = r0 * cos3(a00), y004 = r0 * sin3(a00), oc;
          if (da < pi4 && (oc = intersect(x01, y01, x004, y004, x11, y11, x10, y10))) {
            var ax = x01 - oc[0], ay = y01 - oc[1], bx = x11 - oc[0], by = y11 - oc[1], kc = 1 / sin3(acos3((ax * bx + ay * by) / (sqrt4(ax * ax + ay * ay) * sqrt4(bx * bx + by * by))) / 2), lc = sqrt4(oc[0] * oc[0] + oc[1] * oc[1]);
            rc0 = min3(rc, (r0 - lc) / (kc - 1));
            rc1 = min3(rc, (r1 - lc) / (kc + 1));
          }
        }
        if (!(da1 > epsilon7))
          context.moveTo(x01, y01);
        else if (rc1 > epsilon7) {
          t03 = cornerTangents(x004, y004, x01, y01, r1, rc1, cw);
          t13 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
          context.moveTo(t03.cx + t03.x01, t03.cy + t03.y01);
          if (rc1 < rc)
            context.arc(t03.cx, t03.cy, rc1, atan23(t03.y01, t03.x01), atan23(t13.y01, t13.x01), !cw);
          else {
            context.arc(t03.cx, t03.cy, rc1, atan23(t03.y01, t03.x01), atan23(t03.y11, t03.x11), !cw);
            context.arc(0, 0, r1, atan23(t03.cy + t03.y11, t03.cx + t03.x11), atan23(t13.cy + t13.y11, t13.cx + t13.x11), !cw);
            context.arc(t13.cx, t13.cy, rc1, atan23(t13.y11, t13.x11), atan23(t13.y01, t13.x01), !cw);
          }
        } else
          context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);
        if (!(r0 > epsilon7) || !(da0 > epsilon7))
          context.lineTo(x10, y10);
        else if (rc0 > epsilon7) {
          t03 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
          t13 = cornerTangents(x01, y01, x004, y004, r0, -rc0, cw);
          context.lineTo(t03.cx + t03.x01, t03.cy + t03.y01);
          if (rc0 < rc)
            context.arc(t03.cx, t03.cy, rc0, atan23(t03.y01, t03.x01), atan23(t13.y01, t13.x01), !cw);
          else {
            context.arc(t03.cx, t03.cy, rc0, atan23(t03.y01, t03.x01), atan23(t03.y11, t03.x11), !cw);
            context.arc(0, 0, r0, atan23(t03.cy + t03.y11, t03.cx + t03.x11), atan23(t13.cy + t13.y11, t13.cx + t13.x11), cw);
            context.arc(t13.cx, t13.cy, rc0, atan23(t13.y11, t13.x11), atan23(t13.y01, t13.x01), !cw);
          }
        } else
          context.arc(0, 0, r0, a10, a00, cw);
      }
      context.closePath();
      if (buffer)
        return context = null, buffer + "" || null;
    }
    arc.centroid = function() {
      var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2, a2 = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi4 / 2;
      return [cos3(a2) * r, sin3(a2) * r];
    };
    arc.innerRadius = function(_) {
      return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant_default6(+_), arc) : innerRadius;
    };
    arc.outerRadius = function(_) {
      return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant_default6(+_), arc) : outerRadius;
    };
    arc.cornerRadius = function(_) {
      return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant_default6(+_), arc) : cornerRadius;
    };
    arc.padRadius = function(_) {
      return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant_default6(+_), arc) : padRadius;
    };
    arc.startAngle = function(_) {
      return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant_default6(+_), arc) : startAngle;
    };
    arc.endAngle = function(_) {
      return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant_default6(+_), arc) : endAngle;
    };
    arc.padAngle = function(_) {
      return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant_default6(+_), arc) : padAngle;
    };
    arc.context = function(_) {
      return arguments.length ? (context = _ == null ? null : _, arc) : context;
    };
    return arc;
  }
  var init_arc = __esm(() => {
    init_src21();
    init_constant7();
    init_math4();
  });

  // node_modules/d3-shape/src/array.js
  function array_default2(x2) {
    return typeof x2 === "object" && "length" in x2 ? x2 : Array.from(x2);
  }
  var slice2;
  var init_array4 = __esm(() => {
    slice2 = Array.prototype.slice;
  });

  // node_modules/d3-shape/src/curve/linear.js
  function Linear(context) {
    this._context = context;
  }
  function linear_default(context) {
    return new Linear(context);
  }
  var init_linear2 = __esm(() => {
    Linear.prototype = {
      areaStart: function() {
        this._line = 0;
      },
      areaEnd: function() {
        this._line = NaN;
      },
      lineStart: function() {
        this._point = 0;
      },
      lineEnd: function() {
        if (this._line || this._line !== 0 && this._point === 1)
          this._context.closePath();
        this._line = 1 - this._line;
      },
      point: function(x2, y2) {
        x2 = +x2, y2 = +y2;
        switch (this._point) {
          case 0:
            this._point = 1;
            this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
            break;
          case 1:
            this._point = 2;
          default:
            this._context.lineTo(x2, y2);
            break;
        }
      }
    };
  });

  // node_modules/d3-shape/src/point.js
  function x(p) {
    return p[0];
  }
  function y(p) {
    return p[1];
  }
  var init_point = __esm(() => {
  });

  // node_modules/d3-shape/src/line.js
  function line_default2(x2, y2) {
    var defined = constant_default6(true), context = null, curve = linear_default, output = null;
    x2 = typeof x2 === "function" ? x2 : x2 === void 0 ? x : constant_default6(x2);
    y2 = typeof y2 === "function" ? y2 : y2 === void 0 ? y : constant_default6(y2);
    function line(data2) {
      var i, n = (data2 = array_default2(data2)).length, d, defined0 = false, buffer;
      if (context == null)
        output = curve(buffer = path_default2());
      for (i = 0; i <= n; ++i) {
        if (!(i < n && defined(d = data2[i], i, data2)) === defined0) {
          if (defined0 = !defined0)
            output.lineStart();
          else
            output.lineEnd();
        }
        if (defined0)
          output.point(+x2(d, i, data2), +y2(d, i, data2));
      }
      if (buffer)
        return output = null, buffer + "" || null;
    }
    line.x = function(_) {
      return arguments.length ? (x2 = typeof _ === "function" ? _ : constant_default6(+_), line) : x2;
    };
    line.y = function(_) {
      return arguments.length ? (y2 = typeof _ === "function" ? _ : constant_default6(+_), line) : y2;
    };
    line.defined = function(_) {
      return arguments.length ? (defined = typeof _ === "function" ? _ : constant_default6(!!_), line) : defined;
    };
    line.curve = function(_) {
      return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
    };
    line.context = function(_) {
      return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
    };
    return line;
  }
  var init_line2 = __esm(() => {
    init_src21();
    init_array4();
    init_constant7();
    init_linear2();
    init_point();
  });

  // node_modules/d3-shape/src/area.js
  function area_default3(x07, y07, y13) {
    var x13 = null, defined = constant_default6(true), context = null, curve = linear_default, output = null;
    x07 = typeof x07 === "function" ? x07 : x07 === void 0 ? x : constant_default6(+x07);
    y07 = typeof y07 === "function" ? y07 : y07 === void 0 ? constant_default6(0) : constant_default6(+y07);
    y13 = typeof y13 === "function" ? y13 : y13 === void 0 ? y : constant_default6(+y13);
    function area(data2) {
      var i, j, k3, n = (data2 = array_default2(data2)).length, d, defined0 = false, buffer, x0z = new Array(n), y0z = new Array(n);
      if (context == null)
        output = curve(buffer = path_default2());
      for (i = 0; i <= n; ++i) {
        if (!(i < n && defined(d = data2[i], i, data2)) === defined0) {
          if (defined0 = !defined0) {
            j = i;
            output.areaStart();
            output.lineStart();
          } else {
            output.lineEnd();
            output.lineStart();
            for (k3 = i - 1; k3 >= j; --k3) {
              output.point(x0z[k3], y0z[k3]);
            }
            output.lineEnd();
            output.areaEnd();
          }
        }
        if (defined0) {
          x0z[i] = +x07(d, i, data2), y0z[i] = +y07(d, i, data2);
          output.point(x13 ? +x13(d, i, data2) : x0z[i], y13 ? +y13(d, i, data2) : y0z[i]);
        }
      }
      if (buffer)
        return output = null, buffer + "" || null;
    }
    function arealine() {
      return line_default2().defined(defined).curve(curve).context(context);
    }
    area.x = function(_) {
      return arguments.length ? (x07 = typeof _ === "function" ? _ : constant_default6(+_), x13 = null, area) : x07;
    };
    area.x0 = function(_) {
      return arguments.length ? (x07 = typeof _ === "function" ? _ : constant_default6(+_), area) : x07;
    };
    area.x1 = function(_) {
      return arguments.length ? (x13 = _ == null ? null : typeof _ === "function" ? _ : constant_default6(+_), area) : x13;
    };
    area.y = function(_) {
      return arguments.length ? (y07 = typeof _ === "function" ? _ : constant_default6(+_), y13 = null, area) : y07;
    };
    area.y0 = function(_) {
      return arguments.length ? (y07 = typeof _ === "function" ? _ : constant_default6(+_), area) : y07;
    };
    area.y1 = function(_) {
      return arguments.length ? (y13 = _ == null ? null : typeof _ === "function" ? _ : constant_default6(+_), area) : y13;
    };
    area.lineX0 = area.lineY0 = function() {
      return arealine().x(x07).y(y07);
    };
    area.lineY1 = function() {
      return arealine().x(x07).y(y13);
    };
    area.lineX1 = function() {
      return arealine().x(x13).y(y07);
    };
    area.defined = function(_) {
      return arguments.length ? (defined = typeof _ === "function" ? _ : constant_default6(!!_), area) : defined;
    };
    area.curve = function(_) {
      return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
    };
    area.context = function(_) {
      return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
    };
    return area;
  }
  var init_area3 = __esm(() => {
    init_src21();
    init_array4();
    init_constant7();
    init_linear2();
    init_line2();
    init_point();
  });

  // node_modules/d3-shape/src/descending.js
  function descending_default2(a2, b) {
    return b < a2 ? -1 : b > a2 ? 1 : b >= a2 ? 0 : NaN;
  }
  var init_descending2 = __esm(() => {
  });

  // node_modules/d3-shape/src/identity.js
  function identity_default7(d) {
    return d;
  }
  var init_identity8 = __esm(() => {
  });

  // node_modules/d3-shape/src/pie.js
  function pie_default() {
    var value = identity_default7, sortValues = descending_default2, sort2 = null, startAngle = constant_default6(0), endAngle = constant_default6(tau4), padAngle = constant_default6(0);
    function pie(data2) {
      var i, n = (data2 = array_default2(data2)).length, j, k3, sum3 = 0, index2 = new Array(n), arcs = new Array(n), a0 = +startAngle.apply(this, arguments), da = Math.min(tau4, Math.max(-tau4, endAngle.apply(this, arguments) - a0)), a1, p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)), pa = p * (da < 0 ? -1 : 1), v;
      for (i = 0; i < n; ++i) {
        if ((v = arcs[index2[i] = i] = +value(data2[i], i, data2)) > 0) {
          sum3 += v;
        }
      }
      if (sortValues != null)
        index2.sort(function(i2, j2) {
          return sortValues(arcs[i2], arcs[j2]);
        });
      else if (sort2 != null)
        index2.sort(function(i2, j2) {
          return sort2(data2[i2], data2[j2]);
        });
      for (i = 0, k3 = sum3 ? (da - n * pa) / sum3 : 0; i < n; ++i, a0 = a1) {
        j = index2[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k3 : 0) + pa, arcs[j] = {
          data: data2[j],
          index: i,
          value: v,
          startAngle: a0,
          endAngle: a1,
          padAngle: p
        };
      }
      return arcs;
    }
    pie.value = function(_) {
      return arguments.length ? (value = typeof _ === "function" ? _ : constant_default6(+_), pie) : value;
    };
    pie.sortValues = function(_) {
      return arguments.length ? (sortValues = _, sort2 = null, pie) : sortValues;
    };
    pie.sort = function(_) {
      return arguments.length ? (sort2 = _, sortValues = null, pie) : sort2;
    };
    pie.startAngle = function(_) {
      return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant_default6(+_), pie) : startAngle;
    };
    pie.endAngle = function(_) {
      return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant_default6(+_), pie) : endAngle;
    };
    pie.padAngle = function(_) {
      return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant_default6(+_), pie) : padAngle;
    };
    return pie;
  }
  var init_pie = __esm(() => {
    init_array4();
    init_constant7();
    init_descending2();
    init_identity8();
    init_math4();
  });

  // node_modules/d3-shape/src/curve/radial.js
  function Radial(curve) {
    this._curve = curve;
  }
  function curveRadial(curve) {
    function radial2(context) {
      return new Radial(curve(context));
    }
    radial2._curve = curve;
    return radial2;
  }
  var curveRadialLinear;
  var init_radial2 = __esm(() => {
    init_linear2();
    curveRadialLinear = curveRadial(linear_default);
    Radial.prototype = {
      areaStart: function() {
        this._curve.areaStart();
      },
      areaEnd: function() {
        this._curve.areaEnd();
      },
      lineStart: function() {
        this._curve.lineStart();
      },
      lineEnd: function() {
        this._curve.lineEnd();
      },
      point: function(a2, r) {
        this._curve.point(r * Math.sin(a2), r * -Math.cos(a2));
      }
    };
  });

  // node_modules/d3-shape/src/lineRadial.js
  function lineRadial(l) {
    var c2 = l.curve;
    l.angle = l.x, delete l.x;
    l.radius = l.y, delete l.y;
    l.curve = function(_) {
      return arguments.length ? c2(curveRadial(_)) : c2()._curve;
    };
    return l;
  }
  function lineRadial_default() {
    return lineRadial(line_default2().curve(curveRadialLinear));
  }
  var init_lineRadial = __esm(() => {
    init_radial2();
    init_line2();
  });

  // node_modules/d3-shape/src/areaRadial.js
  function areaRadial_default() {
    var a2 = area_default3().curve(curveRadialLinear), c2 = a2.curve, x07 = a2.lineX0, x13 = a2.lineX1, y07 = a2.lineY0, y13 = a2.lineY1;
    a2.angle = a2.x, delete a2.x;
    a2.startAngle = a2.x0, delete a2.x0;
    a2.endAngle = a2.x1, delete a2.x1;
    a2.radius = a2.y, delete a2.y;
    a2.innerRadius = a2.y0, delete a2.y0;
    a2.outerRadius = a2.y1, delete a2.y1;
    a2.lineStartAngle = function() {
      return lineRadial(x07());
    }, delete a2.lineX0;
    a2.lineEndAngle = function() {
      return lineRadial(x13());
    }, delete a2.lineX1;
    a2.lineInnerRadius = function() {
      return lineRadial(y07());
    }, delete a2.lineY0;
    a2.lineOuterRadius = function() {
      return lineRadial(y13());
    }, delete a2.lineY1;
    a2.curve = function(_) {
      return arguments.length ? c2(curveRadial(_)) : c2()._curve;
    };
    return a2;
  }
  var init_areaRadial = __esm(() => {
    init_radial2();
    init_area3();
    init_lineRadial();
  });

  // node_modules/d3-shape/src/pointRadial.js
  function pointRadial_default(x2, y2) {
    return [(y2 = +y2) * Math.cos(x2 -= Math.PI / 2), y2 * Math.sin(x2)];
  }
  var init_pointRadial = __esm(() => {
  });

  // node_modules/d3-shape/src/link/index.js
  function linkSource(d) {
    return d.source;
  }
  function linkTarget(d) {
    return d.target;
  }
  function link2(curve) {
    var source = linkSource, target = linkTarget, x2 = x, y2 = y, context = null;
    function link3() {
      var buffer, argv = slice2.call(arguments), s2 = source.apply(this, argv), t = target.apply(this, argv);
      if (!context)
        context = buffer = path_default2();
      curve(context, +x2.apply(this, (argv[0] = s2, argv)), +y2.apply(this, argv), +x2.apply(this, (argv[0] = t, argv)), +y2.apply(this, argv));
      if (buffer)
        return context = null, buffer + "" || null;
    }
    link3.source = function(_) {
      return arguments.length ? (source = _, link3) : source;
    };
    link3.target = function(_) {
      return arguments.length ? (target = _, link3) : target;
    };
    link3.x = function(_) {
      return arguments.length ? (x2 = typeof _ === "function" ? _ : constant_default6(+_), link3) : x2;
    };
    link3.y = function(_) {
      return arguments.length ? (y2 = typeof _ === "function" ? _ : constant_default6(+_), link3) : y2;
    };
    link3.context = function(_) {
      return arguments.length ? (context = _ == null ? null : _, link3) : context;
    };
    return link3;
  }
  function curveHorizontal(context, x07, y07, x13, y13) {
    context.moveTo(x07, y07);
    context.bezierCurveTo(x07 = (x07 + x13) / 2, y07, x07, y13, x13, y13);
  }
  function curveVertical(context, x07, y07, x13, y13) {
    context.moveTo(x07, y07);
    context.bezierCurveTo(x07, y07 = (y07 + y13) / 2, x13, y07, x13, y13);
  }
  function curveRadial2(context, x07, y07, x13, y13) {
    var p02 = pointRadial_default(x07, y07), p1 = pointRadial_default(x07, y07 = (y07 + y13) / 2), p2 = pointRadial_default(x13, y07), p3 = pointRadial_default(x13, y13);
    context.moveTo(p02[0], p02[1]);
    context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
  }
  function linkHorizontal() {
    return link2(curveHorizontal);
  }
  function linkVertical() {
    return link2(curveVertical);
  }
  function linkRadial() {
    var l = link2(curveRadial2);
    l.angle = l.x, delete l.x;
    l.radius = l.y, delete l.y;
    return l;
  }
  var init_link = __esm(() => {
    init_src21();
    init_array4();
    init_constant7();
    init_point();
    init_pointRadial();
  });

  // node_modules/d3-shape/src/symbol/circle.js
  var circle_default3;
  var init_circle3 = __esm(() => {
    init_math4();
    circle_default3 = {
      draw: function(context, size) {
        var r = Math.sqrt(size / pi4);
        context.moveTo(r, 0);
        context.arc(0, 0, r, 0, tau4);
      }
    };
  });

  // node_modules/d3-shape/src/symbol/cross.js
  var cross_default;
  var init_cross2 = __esm(() => {
    cross_default = {
      draw: function(context, size) {
        var r = Math.sqrt(size / 5) / 2;
        context.moveTo(-3 * r, -r);
        context.lineTo(-r, -r);
        context.lineTo(-r, -3 * r);
        context.lineTo(r, -3 * r);
        context.lineTo(r, -r);
        context.lineTo(3 * r, -r);
        context.lineTo(3 * r, r);
        context.lineTo(r, r);
        context.lineTo(r, 3 * r);
        context.lineTo(-r, 3 * r);
        context.lineTo(-r, r);
        context.lineTo(-3 * r, r);
        context.closePath();
      }
    };
  });

  // node_modules/d3-shape/src/symbol/diamond.js
  var tan30, tan30_2, diamond_default;
  var init_diamond = __esm(() => {
    tan30 = Math.sqrt(1 / 3);
    tan30_2 = tan30 * 2;
    diamond_default = {
      draw: function(context, size) {
        var y2 = Math.sqrt(size / tan30_2), x2 = y2 * tan30;
        context.moveTo(0, -y2);
        context.lineTo(x2, 0);
        context.lineTo(0, y2);
        context.lineTo(-x2, 0);
        context.closePath();
      }
    };
  });

  // node_modules/d3-shape/src/symbol/star.js
  var ka, kr, kx2, ky, star_default;
  var init_star = __esm(() => {
    init_math4();
    ka = 0.8908130915292852;
    kr = Math.sin(pi4 / 10) / Math.sin(7 * pi4 / 10);
    kx2 = Math.sin(tau4 / 10) * kr;
    ky = -Math.cos(tau4 / 10) * kr;
    star_default = {
      draw: function(context, size) {
        var r = Math.sqrt(size * ka), x2 = kx2 * r, y2 = ky * r;
        context.moveTo(0, -r);
        context.lineTo(x2, y2);
        for (var i = 1; i < 5; ++i) {
          var a2 = tau4 * i / 5, c2 = Math.cos(a2), s2 = Math.sin(a2);
          context.lineTo(s2 * r, -c2 * r);
          context.lineTo(c2 * x2 - s2 * y2, s2 * x2 + c2 * y2);
        }
        context.closePath();
      }
    };
  });

  // node_modules/d3-shape/src/symbol/square.js
  var square_default2;
  var init_square2 = __esm(() => {
    square_default2 = {
      draw: function(context, size) {
        var w2 = Math.sqrt(size), x2 = -w2 / 2;
        context.rect(x2, x2, w2, w2);
      }
    };
  });

  // node_modules/d3-shape/src/symbol/triangle.js
  var sqrt33, triangle_default;
  var init_triangle = __esm(() => {
    sqrt33 = Math.sqrt(3);
    triangle_default = {
      draw: function(context, size) {
        var y2 = -Math.sqrt(size / (sqrt33 * 3));
        context.moveTo(0, y2 * 2);
        context.lineTo(-sqrt33 * y2, -y2);
        context.lineTo(sqrt33 * y2, -y2);
        context.closePath();
      }
    };
  });

  // node_modules/d3-shape/src/symbol/wye.js
  var c, s, k2, a, wye_default;
  var init_wye = __esm(() => {
    c = -0.5;
    s = Math.sqrt(3) / 2;
    k2 = 1 / Math.sqrt(12);
    a = (k2 / 2 + 1) * 3;
    wye_default = {
      draw: function(context, size) {
        var r = Math.sqrt(size / a), x07 = r / 2, y07 = r * k2, x13 = x07, y13 = r * k2 + r, x2 = -x13, y2 = y13;
        context.moveTo(x07, y07);
        context.lineTo(x13, y13);
        context.lineTo(x2, y2);
        context.lineTo(c * x07 - s * y07, s * x07 + c * y07);
        context.lineTo(c * x13 - s * y13, s * x13 + c * y13);
        context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
        context.lineTo(c * x07 + s * y07, c * y07 - s * x07);
        context.lineTo(c * x13 + s * y13, c * y13 - s * x13);
        context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
        context.closePath();
      }
    };
  });

  // node_modules/d3-shape/src/symbol.js
  function symbol_default(type, size) {
    var context = null;
    type = typeof type === "function" ? type : constant_default6(type || circle_default3);
    size = typeof size === "function" ? size : constant_default6(size === void 0 ? 64 : +size);
    function symbol() {
      var buffer;
      if (!context)
        context = buffer = path_default2();
      type.apply(this, arguments).draw(context, +size.apply(this, arguments));
      if (buffer)
        return context = null, buffer + "" || null;
    }
    symbol.type = function(_) {
      return arguments.length ? (type = typeof _ === "function" ? _ : constant_default6(_), symbol) : type;
    };
    symbol.size = function(_) {
      return arguments.length ? (size = typeof _ === "function" ? _ : constant_default6(+_), symbol) : size;
    };
    symbol.context = function(_) {
      return arguments.length ? (context = _ == null ? null : _, symbol) : context;
    };
    return symbol;
  }
  var symbols;
  var init_symbol = __esm(() => {
    init_src21();
    init_circle3();
    init_cross2();
    init_diamond();
    init_star();
    init_square2();
    init_triangle();
    init_wye();
    init_constant7();
    symbols = [
      circle_default3,
      cross_default,
      diamond_default,
      square_default2,
      star_default,
      triangle_default,
      wye_default
    ];
  });

  // node_modules/d3-shape/src/noop.js
  function noop_default2() {
  }
  var init_noop3 = __esm(() => {
  });

  // node_modules/d3-shape/src/curve/basis.js
  function point2(that, x2, y2) {
    that._context.bezierCurveTo((2 * that._x0 + that._x1) / 3, (2 * that._y0 + that._y1) / 3, (that._x0 + 2 * that._x1) / 3, (that._y0 + 2 * that._y1) / 3, (that._x0 + 4 * that._x1 + x2) / 6, (that._y0 + 4 * that._y1 + y2) / 6);
  }
  function Basis(context) {
    this._context = context;
  }
  function basis_default2(context) {
    return new Basis(context);
  }
  var init_basis2 = __esm(() => {
    Basis.prototype = {
      areaStart: function() {
        this._line = 0;
      },
      areaEnd: function() {
        this._line = NaN;
      },
      lineStart: function() {
        this._x0 = this._x1 = this._y0 = this._y1 = NaN;
        this._point = 0;
      },
      lineEnd: function() {
        switch (this._point) {
          case 3:
            point2(this, this._x1, this._y1);
          case 2:
            this._context.lineTo(this._x1, this._y1);
            break;
        }
        if (this._line || this._line !== 0 && this._point === 1)
          this._context.closePath();
        this._line = 1 - this._line;
      },
      point: function(x2, y2) {
        x2 = +x2, y2 = +y2;
        switch (this._point) {
          case 0:
            this._point = 1;
            this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            this._point = 3;
            this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
          default:
            point2(this, x2, y2);
            break;
        }
        this._x0 = this._x1, this._x1 = x2;
        this._y0 = this._y1, this._y1 = y2;
      }
    };
  });

  // node_modules/d3-shape/src/curve/basisClosed.js
  function BasisClosed(context) {
    this._context = context;
  }
  function basisClosed_default2(context) {
    return new BasisClosed(context);
  }
  var init_basisClosed2 = __esm(() => {
    init_noop3();
    init_basis2();
    BasisClosed.prototype = {
      areaStart: noop_default2,
      areaEnd: noop_default2,
      lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
        this._point = 0;
      },
      lineEnd: function() {
        switch (this._point) {
          case 1: {
            this._context.moveTo(this._x2, this._y2);
            this._context.closePath();
            break;
          }
          case 2: {
            this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
            this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
            this._context.closePath();
            break;
          }
          case 3: {
            this.point(this._x2, this._y2);
            this.point(this._x3, this._y3);
            this.point(this._x4, this._y4);
            break;
          }
        }
      },
      point: function(x2, y2) {
        x2 = +x2, y2 = +y2;
        switch (this._point) {
          case 0:
            this._point = 1;
            this._x2 = x2, this._y2 = y2;
            break;
          case 1:
            this._point = 2;
            this._x3 = x2, this._y3 = y2;
            break;
          case 2:
            this._point = 3;
            this._x4 = x2, this._y4 = y2;
            this._context.moveTo((this._x0 + 4 * this._x1 + x2) / 6, (this._y0 + 4 * this._y1 + y2) / 6);
            break;
          default:
            point2(this, x2, y2);
            break;
        }
        this._x0 = this._x1, this._x1 = x2;
        this._y0 = this._y1, this._y1 = y2;
      }
    };
  });

  // node_modules/d3-shape/src/curve/basisOpen.js
  function BasisOpen(context) {
    this._context = context;
  }
  function basisOpen_default(context) {
    return new BasisOpen(context);
  }
  var init_basisOpen = __esm(() => {
    init_basis2();
    BasisOpen.prototype = {
      areaStart: function() {
        this._line = 0;
      },
      areaEnd: function() {
        this._line = NaN;
      },
      lineStart: function() {
        this._x0 = this._x1 = this._y0 = this._y1 = NaN;
        this._point = 0;
      },
      lineEnd: function() {
        if (this._line || this._line !== 0 && this._point === 3)
          this._context.closePath();
        this._line = 1 - this._line;
      },
      point: function(x2, y2) {
        x2 = +x2, y2 = +y2;
        switch (this._point) {
          case 0:
            this._point = 1;
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            this._point = 3;
            var x07 = (this._x0 + 4 * this._x1 + x2) / 6, y07 = (this._y0 + 4 * this._y1 + y2) / 6;
            this._line ? this._context.lineTo(x07, y07) : this._context.moveTo(x07, y07);
            break;
          case 3:
            this._point = 4;
          default:
            point2(this, x2, y2);
            break;
        }
        this._x0 = this._x1, this._x1 = x2;
        this._y0 = this._y1, this._y1 = y2;
      }
    };
  });

  // node_modules/d3-shape/src/curve/bump.js
  function bumpX(context) {
    return new Bump(context, true);
  }
  function bumpY(context) {
    return new Bump(context, false);
  }
  var Bump;
  var init_bump = __esm(() => {
    Bump = class {
      constructor(context, x2) {
        this._context = context;
        this._x = x2;
      }
      areaStart() {
        this._line = 0;
      }
      areaEnd() {
        this._line = NaN;
      }
      lineStart() {
        this._point = 0;
      }
      lineEnd() {
        if (this._line || this._line !== 0 && this._point === 1)
          this._context.closePath();
        this._line = 1 - this._line;
      }
      point(x2, y2) {
        x2 = +x2, y2 = +y2;
        switch (this._point) {
          case 0: {
            this._point = 1;
            if (this._line)
              this._context.lineTo(x2, y2);
            else
              this._context.moveTo(x2, y2);
            break;
          }
          case 1:
            this._point = 2;
          default: {
            if (this._x)
              this._context.bezierCurveTo(this._x0 = (this._x0 + x2) / 2, this._y0, this._x0, y2, x2, y2);
            else
              this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y2) / 2, x2, this._y0, x2, y2);
            break;
          }
        }
        this._x0 = x2, this._y0 = y2;
      }
    };
  });

  // node_modules/d3-shape/src/curve/bundle.js
  function Bundle(context, beta) {
    this._basis = new Basis(context);
    this._beta = beta;
  }
  var bundle_default;
  var init_bundle = __esm(() => {
    init_basis2();
    Bundle.prototype = {
      lineStart: function() {
        this._x = [];
        this._y = [];
        this._basis.lineStart();
      },
      lineEnd: function() {
        var x2 = this._x, y2 = this._y, j = x2.length - 1;
        if (j > 0) {
          var x07 = x2[0], y07 = y2[0], dx = x2[j] - x07, dy = y2[j] - y07, i = -1, t;
          while (++i <= j) {
            t = i / j;
            this._basis.point(this._beta * x2[i] + (1 - this._beta) * (x07 + t * dx), this._beta * y2[i] + (1 - this._beta) * (y07 + t * dy));
          }
        }
        this._x = this._y = null;
        this._basis.lineEnd();
      },
      point: function(x2, y2) {
        this._x.push(+x2);
        this._y.push(+y2);
      }
    };
    bundle_default = function custom(beta) {
      function bundle(context) {
        return beta === 1 ? new Basis(context) : new Bundle(context, beta);
      }
      bundle.beta = function(beta2) {
        return custom(+beta2);
      };
      return bundle;
    }(0.85);
  });

  // node_modules/d3-shape/src/curve/cardinal.js
  function point3(that, x2, y2) {
    that._context.bezierCurveTo(that._x1 + that._k * (that._x2 - that._x0), that._y1 + that._k * (that._y2 - that._y0), that._x2 + that._k * (that._x1 - x2), that._y2 + that._k * (that._y1 - y2), that._x2, that._y2);
  }
  function Cardinal(context, tension) {
    this._context = context;
    this._k = (1 - tension) / 6;
  }
  var cardinal_default;
  var init_cardinal = __esm(() => {
    Cardinal.prototype = {
      areaStart: function() {
        this._line = 0;
      },
      areaEnd: function() {
        this._line = NaN;
      },
      lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
        this._point = 0;
      },
      lineEnd: function() {
        switch (this._point) {
          case 2:
            this._context.lineTo(this._x2, this._y2);
            break;
          case 3:
            point3(this, this._x1, this._y1);
            break;
        }
        if (this._line || this._line !== 0 && this._point === 1)
          this._context.closePath();
        this._line = 1 - this._line;
      },
      point: function(x2, y2) {
        x2 = +x2, y2 = +y2;
        switch (this._point) {
          case 0:
            this._point = 1;
            this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
            break;
          case 1:
            this._point = 2;
            this._x1 = x2, this._y1 = y2;
            break;
          case 2:
            this._point = 3;
          default:
            point3(this, x2, y2);
            break;
        }
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
      }
    };
    cardinal_default = function custom2(tension) {
      function cardinal(context) {
        return new Cardinal(context, tension);
      }
      cardinal.tension = function(tension2) {
        return custom2(+tension2);
      };
      return cardinal;
    }(0);
  });

  // node_modules/d3-shape/src/curve/cardinalClosed.js
  function CardinalClosed(context, tension) {
    this._context = context;
    this._k = (1 - tension) / 6;
  }
  var cardinalClosed_default;
  var init_cardinalClosed = __esm(() => {
    init_noop3();
    init_cardinal();
    CardinalClosed.prototype = {
      areaStart: noop_default2,
      areaEnd: noop_default2,
      lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
        this._point = 0;
      },
      lineEnd: function() {
        switch (this._point) {
          case 1: {
            this._context.moveTo(this._x3, this._y3);
            this._context.closePath();
            break;
          }
          case 2: {
            this._context.lineTo(this._x3, this._y3);
            this._context.closePath();
            break;
          }
          case 3: {
            this.point(this._x3, this._y3);
            this.point(this._x4, this._y4);
            this.point(this._x5, this._y5);
            break;
          }
        }
      },
      point: function(x2, y2) {
        x2 = +x2, y2 = +y2;
        switch (this._point) {
          case 0:
            this._point = 1;
            this._x3 = x2, this._y3 = y2;
            break;
          case 1:
            this._point = 2;
            this._context.moveTo(this._x4 = x2, this._y4 = y2);
            break;
          case 2:
            this._point = 3;
            this._x5 = x2, this._y5 = y2;
            break;
          default:
            point3(this, x2, y2);
            break;
        }
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
      }
    };
    cardinalClosed_default = function custom3(tension) {
      function cardinal(context) {
        return new CardinalClosed(context, tension);
      }
      cardinal.tension = function(tension2) {
        return custom3(+tension2);
      };
      return cardinal;
    }(0);
  });

  // node_modules/d3-shape/src/curve/cardinalOpen.js
  function CardinalOpen(context, tension) {
    this._context = context;
    this._k = (1 - tension) / 6;
  }
  var cardinalOpen_default;
  var init_cardinalOpen = __esm(() => {
    init_cardinal();
    CardinalOpen.prototype = {
      areaStart: function() {
        this._line = 0;
      },
      areaEnd: function() {
        this._line = NaN;
      },
      lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
        this._point = 0;
      },
      lineEnd: function() {
        if (this._line || this._line !== 0 && this._point === 3)
          this._context.closePath();
        this._line = 1 - this._line;
      },
      point: function(x2, y2) {
        x2 = +x2, y2 = +y2;
        switch (this._point) {
          case 0:
            this._point = 1;
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            this._point = 3;
            this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
            break;
          case 3:
            this._point = 4;
          default:
            point3(this, x2, y2);
            break;
        }
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
      }
    };
    cardinalOpen_default = function custom4(tension) {
      function cardinal(context) {
        return new CardinalOpen(context, tension);
      }
      cardinal.tension = function(tension2) {
        return custom4(+tension2);
      };
      return cardinal;
    }(0);
  });

  // node_modules/d3-shape/src/curve/catmullRom.js
  function point4(that, x2, y2) {
    var x13 = that._x1, y13 = that._y1, x22 = that._x2, y22 = that._y2;
    if (that._l01_a > epsilon7) {
      var a2 = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n = 3 * that._l01_a * (that._l01_a + that._l12_a);
      x13 = (x13 * a2 - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
      y13 = (y13 * a2 - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
    }
    if (that._l23_a > epsilon7) {
      var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m = 3 * that._l23_a * (that._l23_a + that._l12_a);
      x22 = (x22 * b + that._x1 * that._l23_2a - x2 * that._l12_2a) / m;
      y22 = (y22 * b + that._y1 * that._l23_2a - y2 * that._l12_2a) / m;
    }
    that._context.bezierCurveTo(x13, y13, x22, y22, that._x2, that._y2);
  }
  function CatmullRom(context, alpha) {
    this._context = context;
    this._alpha = alpha;
  }
  var catmullRom_default;
  var init_catmullRom = __esm(() => {
    init_math4();
    init_cardinal();
    CatmullRom.prototype = {
      areaStart: function() {
        this._line = 0;
      },
      areaEnd: function() {
        this._line = NaN;
      },
      lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
        this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
      },
      lineEnd: function() {
        switch (this._point) {
          case 2:
            this._context.lineTo(this._x2, this._y2);
            break;
          case 3:
            this.point(this._x2, this._y2);
            break;
        }
        if (this._line || this._line !== 0 && this._point === 1)
          this._context.closePath();
        this._line = 1 - this._line;
      },
      point: function(x2, y2) {
        x2 = +x2, y2 = +y2;
        if (this._point) {
          var x23 = this._x2 - x2, y23 = this._y2 - y2;
          this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
        }
        switch (this._point) {
          case 0:
            this._point = 1;
            this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            this._point = 3;
          default:
            point4(this, x2, y2);
            break;
        }
        this._l01_a = this._l12_a, this._l12_a = this._l23_a;
        this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
      }
    };
    catmullRom_default = function custom5(alpha) {
      function catmullRom(context) {
        return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
      }
      catmullRom.alpha = function(alpha2) {
        return custom5(+alpha2);
      };
      return catmullRom;
    }(0.5);
  });

  // node_modules/d3-shape/src/curve/catmullRomClosed.js
  function CatmullRomClosed(context, alpha) {
    this._context = context;
    this._alpha = alpha;
  }
  var catmullRomClosed_default;
  var init_catmullRomClosed = __esm(() => {
    init_cardinalClosed();
    init_noop3();
    init_catmullRom();
    CatmullRomClosed.prototype = {
      areaStart: noop_default2,
      areaEnd: noop_default2,
      lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
        this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
      },
      lineEnd: function() {
        switch (this._point) {
          case 1: {
            this._context.moveTo(this._x3, this._y3);
            this._context.closePath();
            break;
          }
          case 2: {
            this._context.lineTo(this._x3, this._y3);
            this._context.closePath();
            break;
          }
          case 3: {
            this.point(this._x3, this._y3);
            this.point(this._x4, this._y4);
            this.point(this._x5, this._y5);
            break;
          }
        }
      },
      point: function(x2, y2) {
        x2 = +x2, y2 = +y2;
        if (this._point) {
          var x23 = this._x2 - x2, y23 = this._y2 - y2;
          this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
        }
        switch (this._point) {
          case 0:
            this._point = 1;
            this._x3 = x2, this._y3 = y2;
            break;
          case 1:
            this._point = 2;
            this._context.moveTo(this._x4 = x2, this._y4 = y2);
            break;
          case 2:
            this._point = 3;
            this._x5 = x2, this._y5 = y2;
            break;
          default:
            point4(this, x2, y2);
            break;
        }
        this._l01_a = this._l12_a, this._l12_a = this._l23_a;
        this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
      }
    };
    catmullRomClosed_default = function custom6(alpha) {
      function catmullRom(context) {
        return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
      }
      catmullRom.alpha = function(alpha2) {
        return custom6(+alpha2);
      };
      return catmullRom;
    }(0.5);
  });

  // node_modules/d3-shape/src/curve/catmullRomOpen.js
  function CatmullRomOpen(context, alpha) {
    this._context = context;
    this._alpha = alpha;
  }
  var catmullRomOpen_default;
  var init_catmullRomOpen = __esm(() => {
    init_cardinalOpen();
    init_catmullRom();
    CatmullRomOpen.prototype = {
      areaStart: function() {
        this._line = 0;
      },
      areaEnd: function() {
        this._line = NaN;
      },
      lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
        this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
      },
      lineEnd: function() {
        if (this._line || this._line !== 0 && this._point === 3)
          this._context.closePath();
        this._line = 1 - this._line;
      },
      point: function(x2, y2) {
        x2 = +x2, y2 = +y2;
        if (this._point) {
          var x23 = this._x2 - x2, y23 = this._y2 - y2;
          this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
        }
        switch (this._point) {
          case 0:
            this._point = 1;
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            this._point = 3;
            this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
            break;
          case 3:
            this._point = 4;
          default:
            point4(this, x2, y2);
            break;
        }
        this._l01_a = this._l12_a, this._l12_a = this._l23_a;
        this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
      }
    };
    catmullRomOpen_default = function custom7(alpha) {
      function catmullRom(context) {
        return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
      }
      catmullRom.alpha = function(alpha2) {
        return custom7(+alpha2);
      };
      return catmullRom;
    }(0.5);
  });

  // node_modules/d3-shape/src/curve/linearClosed.js
  function LinearClosed(context) {
    this._context = context;
  }
  function linearClosed_default(context) {
    return new LinearClosed(context);
  }
  var init_linearClosed = __esm(() => {
    init_noop3();
    LinearClosed.prototype = {
      areaStart: noop_default2,
      areaEnd: noop_default2,
      lineStart: function() {
        this._point = 0;
      },
      lineEnd: function() {
        if (this._point)
          this._context.closePath();
      },
      point: function(x2, y2) {
        x2 = +x2, y2 = +y2;
        if (this._point)
          this._context.lineTo(x2, y2);
        else
          this._point = 1, this._context.moveTo(x2, y2);
      }
    };
  });

  // node_modules/d3-shape/src/curve/monotone.js
  function sign3(x2) {
    return x2 < 0 ? -1 : 1;
  }
  function slope3(that, x2, y2) {
    var h0 = that._x1 - that._x0, h1 = x2 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p = (s0 * h1 + s1 * h0) / (h0 + h1);
    return (sign3(s0) + sign3(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
  }
  function slope2(that, t) {
    var h = that._x1 - that._x0;
    return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
  }
  function point5(that, t03, t13) {
    var x07 = that._x0, y07 = that._y0, x13 = that._x1, y13 = that._y1, dx = (x13 - x07) / 3;
    that._context.bezierCurveTo(x07 + dx, y07 + dx * t03, x13 - dx, y13 - dx * t13, x13, y13);
  }
  function MonotoneX(context) {
    this._context = context;
  }
  function MonotoneY(context) {
    this._context = new ReflectContext(context);
  }
  function ReflectContext(context) {
    this._context = context;
  }
  function monotoneX(context) {
    return new MonotoneX(context);
  }
  function monotoneY(context) {
    return new MonotoneY(context);
  }
  var init_monotone = __esm(() => {
    MonotoneX.prototype = {
      areaStart: function() {
        this._line = 0;
      },
      areaEnd: function() {
        this._line = NaN;
      },
      lineStart: function() {
        this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
        this._point = 0;
      },
      lineEnd: function() {
        switch (this._point) {
          case 2:
            this._context.lineTo(this._x1, this._y1);
            break;
          case 3:
            point5(this, this._t0, slope2(this, this._t0));
            break;
        }
        if (this._line || this._line !== 0 && this._point === 1)
          this._context.closePath();
        this._line = 1 - this._line;
      },
      point: function(x2, y2) {
        var t13 = NaN;
        x2 = +x2, y2 = +y2;
        if (x2 === this._x1 && y2 === this._y1)
          return;
        switch (this._point) {
          case 0:
            this._point = 1;
            this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            this._point = 3;
            point5(this, slope2(this, t13 = slope3(this, x2, y2)), t13);
            break;
          default:
            point5(this, this._t0, t13 = slope3(this, x2, y2));
            break;
        }
        this._x0 = this._x1, this._x1 = x2;
        this._y0 = this._y1, this._y1 = y2;
        this._t0 = t13;
      }
    };
    (MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x2, y2) {
      MonotoneX.prototype.point.call(this, y2, x2);
    };
    ReflectContext.prototype = {
      moveTo: function(x2, y2) {
        this._context.moveTo(y2, x2);
      },
      closePath: function() {
        this._context.closePath();
      },
      lineTo: function(x2, y2) {
        this._context.lineTo(y2, x2);
      },
      bezierCurveTo: function(x13, y13, x2, y2, x3, y3) {
        this._context.bezierCurveTo(y13, x13, y2, x2, y3, x3);
      }
    };
  });

  // node_modules/d3-shape/src/curve/natural.js
  function Natural(context) {
    this._context = context;
  }
  function controlPoints(x2) {
    var i, n = x2.length - 1, m, a2 = new Array(n), b = new Array(n), r = new Array(n);
    a2[0] = 0, b[0] = 2, r[0] = x2[0] + 2 * x2[1];
    for (i = 1; i < n - 1; ++i)
      a2[i] = 1, b[i] = 4, r[i] = 4 * x2[i] + 2 * x2[i + 1];
    a2[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x2[n - 1] + x2[n];
    for (i = 1; i < n; ++i)
      m = a2[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
    a2[n - 1] = r[n - 1] / b[n - 1];
    for (i = n - 2; i >= 0; --i)
      a2[i] = (r[i] - a2[i + 1]) / b[i];
    b[n - 1] = (x2[n] + a2[n - 1]) / 2;
    for (i = 0; i < n - 1; ++i)
      b[i] = 2 * x2[i + 1] - a2[i + 1];
    return [a2, b];
  }
  function natural_default(context) {
    return new Natural(context);
  }
  var init_natural = __esm(() => {
    Natural.prototype = {
      areaStart: function() {
        this._line = 0;
      },
      areaEnd: function() {
        this._line = NaN;
      },
      lineStart: function() {
        this._x = [];
        this._y = [];
      },
      lineEnd: function() {
        var x2 = this._x, y2 = this._y, n = x2.length;
        if (n) {
          this._line ? this._context.lineTo(x2[0], y2[0]) : this._context.moveTo(x2[0], y2[0]);
          if (n === 2) {
            this._context.lineTo(x2[1], y2[1]);
          } else {
            var px = controlPoints(x2), py = controlPoints(y2);
            for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
              this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x2[i1], y2[i1]);
            }
          }
        }
        if (this._line || this._line !== 0 && n === 1)
          this._context.closePath();
        this._line = 1 - this._line;
        this._x = this._y = null;
      },
      point: function(x2, y2) {
        this._x.push(+x2);
        this._y.push(+y2);
      }
    };
  });

  // node_modules/d3-shape/src/curve/step.js
  function Step(context, t) {
    this._context = context;
    this._t = t;
  }
  function step_default(context) {
    return new Step(context, 0.5);
  }
  function stepBefore(context) {
    return new Step(context, 0);
  }
  function stepAfter(context) {
    return new Step(context, 1);
  }
  var init_step = __esm(() => {
    Step.prototype = {
      areaStart: function() {
        this._line = 0;
      },
      areaEnd: function() {
        this._line = NaN;
      },
      lineStart: function() {
        this._x = this._y = NaN;
        this._point = 0;
      },
      lineEnd: function() {
        if (0 < this._t && this._t < 1 && this._point === 2)
          this._context.lineTo(this._x, this._y);
        if (this._line || this._line !== 0 && this._point === 1)
          this._context.closePath();
        if (this._line >= 0)
          this._t = 1 - this._t, this._line = 1 - this._line;
      },
      point: function(x2, y2) {
        x2 = +x2, y2 = +y2;
        switch (this._point) {
          case 0:
            this._point = 1;
            this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
            break;
          case 1:
            this._point = 2;
          default: {
            if (this._t <= 0) {
              this._context.lineTo(this._x, y2);
              this._context.lineTo(x2, y2);
            } else {
              var x13 = this._x * (1 - this._t) + x2 * this._t;
              this._context.lineTo(x13, this._y);
              this._context.lineTo(x13, y2);
            }
            break;
          }
        }
        this._x = x2, this._y = y2;
      }
    };
  });

  // node_modules/d3-shape/src/offset/none.js
  function none_default(series, order) {
    if (!((n = series.length) > 1))
      return;
    for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
      s0 = s1, s1 = series[order[i]];
      for (j = 0; j < m; ++j) {
        s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
      }
    }
  }
  var init_none = __esm(() => {
  });

  // node_modules/d3-shape/src/order/none.js
  function none_default2(series) {
    var n = series.length, o = new Array(n);
    while (--n >= 0)
      o[n] = n;
    return o;
  }
  var init_none2 = __esm(() => {
  });

  // node_modules/d3-shape/src/stack.js
  function stackValue(d, key) {
    return d[key];
  }
  function stackSeries(key) {
    const series = [];
    series.key = key;
    return series;
  }
  function stack_default() {
    var keys = constant_default6([]), order = none_default2, offset = none_default, value = stackValue;
    function stack(data2) {
      var sz = Array.from(keys.apply(this, arguments), stackSeries), i, n = sz.length, j = -1, oz;
      for (const d of data2) {
        for (i = 0, ++j; i < n; ++i) {
          (sz[i][j] = [0, +value(d, sz[i].key, j, data2)]).data = d;
        }
      }
      for (i = 0, oz = array_default2(order(sz)); i < n; ++i) {
        sz[oz[i]].index = i;
      }
      offset(sz, oz);
      return sz;
    }
    stack.keys = function(_) {
      return arguments.length ? (keys = typeof _ === "function" ? _ : constant_default6(Array.from(_)), stack) : keys;
    };
    stack.value = function(_) {
      return arguments.length ? (value = typeof _ === "function" ? _ : constant_default6(+_), stack) : value;
    };
    stack.order = function(_) {
      return arguments.length ? (order = _ == null ? none_default2 : typeof _ === "function" ? _ : constant_default6(Array.from(_)), stack) : order;
    };
    stack.offset = function(_) {
      return arguments.length ? (offset = _ == null ? none_default : _, stack) : offset;
    };
    return stack;
  }
  var init_stack = __esm(() => {
    init_array4();
    init_constant7();
    init_none();
    init_none2();
  });

  // node_modules/d3-shape/src/offset/expand.js
  function expand_default(series, order) {
    if (!((n = series.length) > 0))
      return;
    for (var i, n, j = 0, m = series[0].length, y2; j < m; ++j) {
      for (y2 = i = 0; i < n; ++i)
        y2 += series[i][j][1] || 0;
      if (y2)
        for (i = 0; i < n; ++i)
          series[i][j][1] /= y2;
    }
    none_default(series, order);
  }
  var init_expand = __esm(() => {
    init_none();
  });

  // node_modules/d3-shape/src/offset/diverging.js
  function diverging_default(series, order) {
    if (!((n = series.length) > 0))
      return;
    for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
      for (yp = yn = 0, i = 0; i < n; ++i) {
        if ((dy = (d = series[order[i]][j])[1] - d[0]) > 0) {
          d[0] = yp, d[1] = yp += dy;
        } else if (dy < 0) {
          d[1] = yn, d[0] = yn += dy;
        } else {
          d[0] = 0, d[1] = dy;
        }
      }
    }
  }
  var init_diverging2 = __esm(() => {
  });

  // node_modules/d3-shape/src/offset/silhouette.js
  function silhouette_default(series, order) {
    if (!((n = series.length) > 0))
      return;
    for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
      for (var i = 0, y2 = 0; i < n; ++i)
        y2 += series[i][j][1] || 0;
      s0[j][1] += s0[j][0] = -y2 / 2;
    }
    none_default(series, order);
  }
  var init_silhouette = __esm(() => {
    init_none();
  });

  // node_modules/d3-shape/src/offset/wiggle.js
  function wiggle_default(series, order) {
    if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0))
      return;
    for (var y2 = 0, j = 1, s0, m, n; j < m; ++j) {
      for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
        var si = series[order[i]], sij0 = si[j][1] || 0, sij1 = si[j - 1][1] || 0, s3 = (sij0 - sij1) / 2;
        for (var k3 = 0; k3 < i; ++k3) {
          var sk = series[order[k3]], skj0 = sk[j][1] || 0, skj1 = sk[j - 1][1] || 0;
          s3 += skj0 - skj1;
        }
        s1 += sij0, s2 += s3 * sij0;
      }
      s0[j - 1][1] += s0[j - 1][0] = y2;
      if (s1)
        y2 -= s2 / s1;
    }
    s0[j - 1][1] += s0[j - 1][0] = y2;
    none_default(series, order);
  }
  var init_wiggle = __esm(() => {
    init_none();
  });

  // node_modules/d3-shape/src/order/appearance.js
  function appearance_default(series) {
    var peaks = series.map(peak);
    return none_default2(series).sort(function(a2, b) {
      return peaks[a2] - peaks[b];
    });
  }
  function peak(series) {
    var i = -1, j = 0, n = series.length, vi, vj = -Infinity;
    while (++i < n)
      if ((vi = +series[i][1]) > vj)
        vj = vi, j = i;
    return j;
  }
  var init_appearance = __esm(() => {
    init_none2();
  });

  // node_modules/d3-shape/src/order/ascending.js
  function ascending_default2(series) {
    var sums = series.map(sum2);
    return none_default2(series).sort(function(a2, b) {
      return sums[a2] - sums[b];
    });
  }
  function sum2(series) {
    var s2 = 0, i = -1, n = series.length, v;
    while (++i < n)
      if (v = +series[i][1])
        s2 += v;
    return s2;
  }
  var init_ascending2 = __esm(() => {
    init_none2();
  });

  // node_modules/d3-shape/src/order/descending.js
  function descending_default3(series) {
    return ascending_default2(series).reverse();
  }
  var init_descending3 = __esm(() => {
    init_ascending2();
  });

  // node_modules/d3-shape/src/order/insideOut.js
  function insideOut_default(series) {
    var n = series.length, i, j, sums = series.map(sum2), order = appearance_default(series), top2 = 0, bottom2 = 0, tops = [], bottoms = [];
    for (i = 0; i < n; ++i) {
      j = order[i];
      if (top2 < bottom2) {
        top2 += sums[j];
        tops.push(j);
      } else {
        bottom2 += sums[j];
        bottoms.push(j);
      }
    }
    return bottoms.reverse().concat(tops);
  }
  var init_insideOut = __esm(() => {
    init_appearance();
    init_ascending2();
  });

  // node_modules/d3-shape/src/order/reverse.js
  function reverse_default2(series) {
    return none_default2(series).reverse();
  }
  var init_reverse3 = __esm(() => {
    init_none2();
  });

  // node_modules/d3-shape/src/index.js
  var src_exports11 = {};
  __export(src_exports11, {
    arc: () => arc_default,
    area: () => area_default3,
    areaRadial: () => areaRadial_default,
    curveBasis: () => basis_default2,
    curveBasisClosed: () => basisClosed_default2,
    curveBasisOpen: () => basisOpen_default,
    curveBumpX: () => bumpX,
    curveBumpY: () => bumpY,
    curveBundle: () => bundle_default,
    curveCardinal: () => cardinal_default,
    curveCardinalClosed: () => cardinalClosed_default,
    curveCardinalOpen: () => cardinalOpen_default,
    curveCatmullRom: () => catmullRom_default,
    curveCatmullRomClosed: () => catmullRomClosed_default,
    curveCatmullRomOpen: () => catmullRomOpen_default,
    curveLinear: () => linear_default,
    curveLinearClosed: () => linearClosed_default,
    curveMonotoneX: () => monotoneX,
    curveMonotoneY: () => monotoneY,
    curveNatural: () => natural_default,
    curveStep: () => step_default,
    curveStepAfter: () => stepAfter,
    curveStepBefore: () => stepBefore,
    line: () => line_default2,
    lineRadial: () => lineRadial_default,
    linkHorizontal: () => linkHorizontal,
    linkRadial: () => linkRadial,
    linkVertical: () => linkVertical,
    pie: () => pie_default,
    pointRadial: () => pointRadial_default,
    radialArea: () => areaRadial_default,
    radialLine: () => lineRadial_default,
    stack: () => stack_default,
    stackOffsetDiverging: () => diverging_default,
    stackOffsetExpand: () => expand_default,
    stackOffsetNone: () => none_default,
    stackOffsetSilhouette: () => silhouette_default,
    stackOffsetWiggle: () => wiggle_default,
    stackOrderAppearance: () => appearance_default,
    stackOrderAscending: () => ascending_default2,
    stackOrderDescending: () => descending_default3,
    stackOrderInsideOut: () => insideOut_default,
    stackOrderNone: () => none_default2,
    stackOrderReverse: () => reverse_default2,
    symbol: () => symbol_default,
    symbolCircle: () => circle_default3,
    symbolCross: () => cross_default,
    symbolDiamond: () => diamond_default,
    symbolSquare: () => square_default2,
    symbolStar: () => star_default,
    symbolTriangle: () => triangle_default,
    symbolWye: () => wye_default,
    symbols: () => symbols
  });
  var init_src22 = __esm(() => {
    init_arc();
    init_area3();
    init_line2();
    init_pie();
    init_areaRadial();
    init_lineRadial();
    init_pointRadial();
    init_link();
    init_symbol();
    init_circle3();
    init_cross2();
    init_diamond();
    init_square2();
    init_star();
    init_triangle();
    init_wye();
    init_basisClosed2();
    init_basisOpen();
    init_basis2();
    init_bump();
    init_bundle();
    init_cardinalClosed();
    init_cardinalOpen();
    init_cardinal();
    init_catmullRomClosed();
    init_catmullRomOpen();
    init_catmullRom();
    init_linearClosed();
    init_linear2();
    init_monotone();
    init_natural();
    init_step();
    init_stack();
    init_expand();
    init_diverging2();
    init_none();
    init_silhouette();
    init_wiggle();
    init_appearance();
    init_ascending2();
    init_descending3();
    init_insideOut();
    init_none2();
    init_reverse3();
  });

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/data-viz/aster.js
  function aster({
    container,
    data: data2,
    meanScore,
    legend: legend2 = true,
    width = 500,
    height = 500,
    radius = Math.min(width, height) / 2,
    innerRadius = 0.3 * radius,
    missingValueCode = "NA",
    classes = {
      aster: "aster",
      plot: "aster__plot",
      solidArc: "aster__solid-arc",
      solidArcDimmed: "aster__solid-arc--dimmed",
      outlineArc: "aster__outline-arc",
      meanScore: "aster__mean-score",
      list: "aster__legend-list",
      item: "aster__legend-item",
      itemDimmed: "aster__legend-item--dimmed",
      icon: "aster__legend-icon"
    }
  } = {}) {
    if (!container) {
      console.log("A container is required to render the aster plot.");
      return;
    }
    if (!data2) {
      console.log("Data is required to render the aster plot.");
      return;
    }
    const pie = d37.pie().sort(null).value(function(d) {
      return d.width || d.width === 0 ? d.width : 1;
    });
    const arc = d37.arc().innerRadius(innerRadius).outerRadius(function(d) {
      return (radius - innerRadius) * (d.data.score / 100) + innerRadius;
    });
    const outlineArc = d37.arc().innerRadius(innerRadius).outerRadius(radius);
    const svg2 = d37.select(container).classed(classes.aster, true).append("svg").classed(classes.plot, true).attr("preserveAspectRatio", "xMidYMid").attr("viewBox", [0, 0, width, height]);
    const group2 = svg2.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    let arcs = null;
    let outerPath = null;
    let legendList = null;
    let legendItems = null;
    let middleText = null;
    updateData(data2, meanScore);
    function updateData(newData, newMeanScore) {
      data2 = newData;
      meanScore = newMeanScore;
      const pieData = pie(data2);
      arcs = group2.selectAll("." + classes.solidArc).data(pieData).join("path").attr("d", arc).attr("fill", function(d) {
        return d.data.color;
      }).attr("class", classes.solidArc).on("mouseover", highlightCategory).on("mouseout", resetHighlight);
      outerPath = group2.selectAll("." + classes.outlineArc).data(pieData).join("path").attr("d", outlineArc).attr("fill", "none").attr("class", classes.outlineArc);
      if (meanScore || meanScore === 0) {
        updateScore(meanScore);
      }
      if (legend2) {
        createLegend(data2);
      }
    }
    function updateScore(score, color2) {
      if (typeof score == "number") {
        score = Math.round(score);
      }
      middleText = group2.selectAll("." + classes.meanScore).data([score]).join("svg:text").text((d) => d).attr("class", classes.meanScore).attr("dy", ".35em").attr("text-anchor", "middle");
      if (color2) {
        middleText.attr("fill", color2);
      } else {
        middleText.attr("fill", "currentColor");
      }
    }
    function highlightCategory(event, hoveredDatum) {
      hoveredDatum = hoveredDatum.data || hoveredDatum;
      let score = hoveredDatum.score;
      if (score || score === 0) {
        updateScore(score, hoveredDatum.color);
      } else {
        updateScore(missingValueCode);
      }
      function IDMismatched(d) {
        return hoveredDatum.id !== (d.id || d.data.id);
      }
      arcs.classed(classes.solidArcDimmed, IDMismatched);
      legendItems.classed(classes.itemDimmed, IDMismatched);
    }
    function resetHighlight(event, hoveredDatum) {
      arcs.classed(classes.solidArcDimmed, false);
      legendItems.classed(classes.itemDimmed, false);
      if (meanScore || meanScore === 0) {
        updateScore(meanScore);
      } else {
        updateScore(null);
      }
    }
    function createLegend(data3) {
      if (!legendList) {
        legendList = d37.select(container).append("ul").attr("class", classes.list);
      }
      legendItems = legendList.selectAll("." + classes.item).data(data3).join("li").attr("class", classes.item).html(createLegendItem).style("color", (d) => d.color).on("mouseover", highlightCategory).on("mouseout", resetHighlight);
    }
    function createLegendItem(goal) {
      const item = document.createElement("div");
      if (goal.icon) {
        const icon = goal.icon.cloneNode(true);
        icon.classList = classes.icon;
        item.append(icon);
      }
      const label = document.createElement("span");
      label.innerText = goal.label;
      item.append(label);
      return item.innerHTML;
    }
    return Object.freeze({
      updateData
    });
  }
  var d37, aster_default;
  var init_aster = __esm(() => {
    d37 = Object.assign({}, (init_src(), src_exports), (init_src22(), src_exports11));
    aster_default = aster;
  });

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/data-viz/regionAster.js
  var regionAster_exports = {};
  __export(regionAster_exports, {
    default: () => regionAster_default
  });
  async function regionAster({
    container = null,
    regionId = null,
    classes = {
      regionAster: "region-aster",
      plot: "region-aster__plot",
      controls: "region-aster__controls",
      control: "region-aster__control",
      label: "region-aster__label"
    }
  } = {}) {
    if (!container) {
      console.log("A container is required to render the region aster visualization");
      return;
    }
    if (!regionId) {
      console.log("A region ID must be set when creating a region aster visualization");
      return;
    }
    const ohiData = await data_default2();
    const maxYear = Math.max(...ohiData.years);
    const minYear = Math.min(...ohiData.years);
    const selections = {
      year: maxYear.toString(),
      dimension: "score",
      region: regionId
    };
    container.classList.add(classes.regionAster);
    const plotContainer = document.createElement("div");
    plotContainer.classList = classes.plot;
    const controls = document.createElement("div");
    controls.classList = classes.controls;
    container.append(plotContainer, controls);
    let data2 = getAsterData();
    const asterPlot = aster_default({
      container: plotContainer,
      data: data2.arcs,
      meanScore: data2.meanScore
    });
    createYearSlider();
    function updateAsterPlot() {
      let data3 = getAsterData();
      asterPlot.updateData(data3.arcs, data3.meanScore);
    }
    function getAsterData() {
      let arcs = [];
      const yearDimensionData = ohiData.scores[selections.dimension][selections.year];
      const meanScore = yearDimensionData["Index"][selections.region];
      ohiData.goalLabels.forEach(function(goalLabel, index2) {
        if (!goalLabel.parent && goalLabel.id !== "Index") {
          const d = {
            id: goalLabel.id,
            label: goalLabel.label,
            score: yearDimensionData[goalLabel.id][selections.region],
            color: goalLabel.color,
            icon: goalLabel.icon
          };
          arcs.push(d);
        }
      });
      return {arcs, meanScore};
    }
    function createYearSlider() {
      const yearControl = document.createElement("div");
      yearControl.classList = classes.control;
      const yearLabel = document.createElement("span");
      yearLabel.classList = classes.label;
      yearControl.appendChild(yearLabel);
      yearLabel.innerText = "Year";
      controls.append(yearControl);
      const yearSlider = numberSlider_default({
        min: minYear,
        max: maxYear,
        step: 1,
        startValue: maxYear
      });
      yearSlider.addEventListener("update", function(e3) {
        selections.year = e3.detail.toString();
        updateAsterPlot();
      });
      yearControl.appendChild(yearSlider);
    }
  }
  var d38, regionAster_default;
  var init_regionAster = __esm(() => {
    init_data2();
    init_aster();
    init_numberSlider();
    d38 = Object.assign({}, (init_src(), src_exports));
    regionAster_default = regionAster;
  });

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/data-viz/barChart.js
  function barChart({
    container = null,
    data: data2 = null,
    width = 700,
    height = 150,
    minY = "auto",
    maxY = "auto",
    domainPaddingY = 3,
    barPadding = 0.2,
    colorFunction = null,
    margin = {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    },
    classes = {
      barChart: "bar-chart",
      plot: "bar-chart__plot",
      bar: "bar-chart__bar",
      barHighlighted: "bar-chart__bar--highlight"
    }
  } = {}) {
    if (!container) {
      console.log("A container is required to render a bar chart.");
      return;
    }
    if (!data2) {
      console.log("Data is required to render a bar chart.");
      return;
    }
    let minRange = minY;
    let maxRange = maxY;
    if (minY === "auto") {
      minRange = d39.min(data2, (d) => d.value);
    }
    if (maxY === "auto") {
      maxRange = d39.max(data2, (d) => d.value);
    }
    if (domainPaddingY) {
      minRange -= domainPaddingY;
      maxRange += domainPaddingY;
    }
    const y2 = d39.scaleLinear().domain([minRange, maxRange]).nice().range([height - margin.bottom, margin.top]);
    const x2 = d39.scaleBand().domain(d39.range(data2.length)).range([margin.left, width - margin.right]).padding(barPadding);
    const svg2 = d39.select(container).classed(classes.barChart, true).append("svg").classed(classes.plot, true).attr("preserveAspectRatio", "xMidYMid").attr("viewBox", [0, 0, width, height]);
    const group2 = svg2.append("g");
    let bars = null;
    const tooltip = regionTooltip_default({
      offsetY: -10,
      offsetX: 0
    });
    updateData(data2);
    function updateData(newData) {
      bars = group2.selectAll("rect").data(data2).join("rect").classed(classes.bar, true).attr("x", (d, i) => x2(i)).attr("y", (d) => y2(d.value)).attr("height", (d) => y2(minRange) - y2(d.value)).attr("width", x2.bandwidth()).on("mouseover", function(event, d) {
        let color2 = colorFunction ? colorFunction(d.value) : "grey";
        tooltip.update(d.label, d.value, color2);
        const rectDims = this.getBoundingClientRect();
        const x3 = rectDims.left;
        const y3 = rectDims.top + document.documentElement.scrollTop;
        console.log(rectDims);
        tooltip.reposition(x3, y3, true, true);
      }).on("mouseout", tooltip.hide);
    }
    function focusBar(id3) {
      bars.classed(classes.barHighlighted, function(d, i) {
        return d.id === id3;
      });
    }
    return Object.freeze({
      updateData,
      focusBar
    });
  }
  var d39, barChart_default;
  var init_barChart = __esm(() => {
    init_regionTooltip();
    d39 = Object.assign({}, (init_src(), src_exports), (init_src5(), src_exports3), (init_src9(), src_exports4));
    barChart_default = barChart;
  });

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/data-viz/regionRankChart.js
  var regionRankChart_exports = {};
  __export(regionRankChart_exports, {
    default: () => regionRankChart_default
  });
  async function regionRankChart({
    container = null,
    regionId = null,
    classes = {
      regionRankChart: "region-rank-chart"
    }
  } = {}) {
    if (!container) {
      console.log("A container is required to render the region rank chart visualization");
      return;
    }
    if (!regionId) {
      console.log("A region ID must be set when creating a region rank chart visualization");
      return;
    }
    container.classList.add(classes.regionRankChart);
    const ohiData = await data_default2();
    const maxYear = Math.max(...ohiData.years);
    const minYear = Math.min(...ohiData.years);
    const selections = {
      year: maxYear.toString(),
      dimension: "score",
      region: regionId,
      goal: "Index"
    };
    const barChartData = getBarChartData();
    function getBarChartData() {
      const yearDimensionData = ohiData.scores[selections.dimension][selections.year][selections.goal];
      let barChartData2 = [];
      for (const [regionId2, score] of Object.entries(yearDimensionData)) {
        barChartData2.push({
          id: regionId2,
          label: ohiData.regionLabels[regionId2],
          value: score
        });
      }
      barChartData2.sort(function(a2, b) {
        return b.value - a2.value;
      });
      return barChartData2;
    }
    const rankChart = barChart_default({
      container,
      data: barChartData,
      colorFunction: colorScale_default.getLegendColor
    });
    rankChart.focusBar(regionId);
    return rankChart;
  }
  var regionRankChart_default;
  var init_regionRankChart = __esm(() => {
    init_data2();
    init_barChart();
    init_colorScale();
    regionRankChart_default = regionRankChart;
  });

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/partials/nav/nav.js
  init_params();

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/partials/nav/MenuItem.js
  var MenuItem = function(domNode, menuObj) {
    if (typeof popupObj !== "object") {
      popupObj = false;
    }
    this.domNode = domNode;
    this.menu = menuObj;
    this.popupMenu = false;
    this.isMenubarItem = false;
    this.keyCode = Object.freeze({
      TAB: 9,
      RETURN: 13,
      ESC: 27,
      SPACE: 32,
      PAGEUP: 33,
      PAGEDOWN: 34,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    });
  };
  MenuItem.prototype.init = function() {
    this.domNode.tabIndex = -1;
    this.domNode.addEventListener("keydown", this.handleKeydown.bind(this));
    this.domNode.addEventListener("click", this.handleClick.bind(this));
    this.domNode.addEventListener("focus", this.handleFocus.bind(this));
    this.domNode.addEventListener("blur", this.handleBlur.bind(this));
    this.domNode.addEventListener("mouseover", this.handleMouseover.bind(this));
    this.domNode.addEventListener("mouseout", this.handleMouseout.bind(this));
    var nextElement = this.domNode.nextElementSibling;
    if (nextElement && nextElement.tagName === "UL") {
      this.popupMenu = new PopupMenu(nextElement, this);
      this.popupMenu.init();
    }
  };
  MenuItem.prototype.isExpanded = function() {
    return this.domNode.getAttribute("aria-expanded") === "true";
  };
  MenuItem.prototype.handleKeydown = function(event) {
    var tgt = event.currentTarget, char = event.key, flag = false, clickEvent;
    function isPrintableCharacter(str) {
      return str.length === 1 && str.match(/\S/);
    }
    switch (event.keyCode) {
      case this.keyCode.SPACE:
      case this.keyCode.RETURN:
        if (this.popupMenu) {
          this.popupMenu.open();
          this.popupMenu.setFocusToFirstItem();
        } else {
          try {
            clickEvent = new MouseEvent("click", {
              view: window,
              bubbles: true,
              cancelable: true
            });
          } catch (err) {
            if (document.createEvent) {
              clickEvent = document.createEvent("MouseEvents");
              clickEvent.initEvent("click", true, true);
            }
          }
          tgt.dispatchEvent(clickEvent);
        }
        flag = true;
        break;
      case this.keyCode.UP:
        this.menu.setFocusToPreviousItem(this);
        flag = true;
        break;
      case this.keyCode.DOWN:
        this.menu.setFocusToNextItem(this);
        flag = true;
        break;
      case this.keyCode.LEFT:
        this.menu.setFocusToController("previous", true);
        this.menu.close(true);
        flag = true;
        break;
      case this.keyCode.RIGHT:
        if (this.popupMenu) {
          this.popupMenu.open();
          this.popupMenu.setFocusToFirstItem();
        } else {
          this.menu.setFocusToController("next", true);
          this.menu.close(true);
        }
        flag = true;
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
      case this.keyCode.ESC:
        this.menu.setFocusToController();
        this.menu.close(true);
        flag = true;
        break;
      case this.keyCode.TAB:
        this.menu.setFocusToController();
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
  MenuItem.prototype.setExpanded = function(value) {
    if (value) {
      this.domNode.setAttribute("aria-expanded", "true");
    } else {
      this.domNode.setAttribute("aria-expanded", "false");
    }
  };
  MenuItem.prototype.handleClick = function(event) {
    this.menu.setFocusToController();
    this.menu.close(true);
  };
  MenuItem.prototype.handleFocus = function(event) {
    this.menu.hasFocus = true;
  };
  MenuItem.prototype.handleBlur = function(event) {
    this.menu.hasFocus = false;
    setTimeout(this.menu.close.bind(this.menu, false), this.menu.controller.menu.delay);
  };
  MenuItem.prototype.handleMouseover = function(event) {
    if (this.menu.controller.menu.isMobile) {
      return;
    }
    this.menu.hasHover = true;
    this.menu.open();
    if (this.popupMenu) {
      this.popupMenu.hasHover = true;
      this.popupMenu.open();
    }
  };
  MenuItem.prototype.handleMouseout = function(event) {
    if (this.menu.controller.menu.isMobile) {
      return;
    }
    if (this.popupMenu) {
      this.popupMenu.hasHover = false;
      this.popupMenu.close(true);
    }
    this.menu.hasHover = false;
    setTimeout(this.menu.close.bind(this.menu, false), this.menu.controller.menu.delay);
  };
  var MenuItem_default = MenuItem;

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/partials/nav/PopupMenu.js
  var PopupMenu2 = function(domNode, controllerObj) {
    var elementChildren, msgPrefix = "PopupMenu constructor argument domNode ";
    if (!domNode instanceof Element) {
      throw new TypeError(msgPrefix + "is not a DOM Element.");
    }
    if (domNode.childElementCount === 0) {
      throw new Error(msgPrefix + "has no element children.");
    }
    var childElement = domNode.firstElementChild;
    while (childElement) {
      var menuitem = childElement.firstElementChild;
      if (menuitem && menuitem === "A") {
        throw new Error(msgPrefix + "has descendant elements that are not A elements.");
      }
      childElement = childElement.nextElementSibling;
    }
    this.isMenubar = false;
    this.domNode = domNode;
    this.controller = controllerObj;
    this.menuitems = [];
    this.firstChars = [];
    this.firstItem = null;
    this.lastItem = null;
    this.hasFocus = false;
    this.hasHover = false;
  };
  PopupMenu2.prototype.init = function() {
    var childElement, menuElement, menuItem, textContent, numItems, label;
    this.domNode.addEventListener("mouseover", this.handleMouseover.bind(this));
    this.domNode.addEventListener("mouseout", this.handleMouseout.bind(this));
    childElement = this.domNode.firstElementChild;
    while (childElement) {
      menuElement = childElement.firstElementChild;
      if (menuElement && menuElement.tagName === "A") {
        menuItem = new MenuItem_default(menuElement, this);
        menuItem.init();
        this.menuitems.push(menuItem);
        textContent = menuElement.textContent.trim();
        this.firstChars.push(textContent.substring(0, 1).toLowerCase());
      }
      childElement = childElement.nextElementSibling;
    }
    numItems = this.menuitems.length;
    if (numItems > 0) {
      this.firstItem = this.menuitems[0];
      this.lastItem = this.menuitems[numItems - 1];
    }
  };
  PopupMenu2.prototype.handleMouseover = function(event) {
    if (this.controller.menu.isMobile) {
      return;
    }
    this.hasHover = true;
  };
  PopupMenu2.prototype.handleMouseout = function(event) {
    if (this.controller.menu.isMobile) {
      return;
    }
    this.hasHover = false;
    setTimeout(this.close.bind(this, false), 1);
  };
  PopupMenu2.prototype.setFocusToController = function(command, flag) {
    if (typeof command !== "string") {
      command = "";
    }
    function setFocusToMenubarItem(controller, close) {
      while (controller) {
        if (controller.isMenubarItem) {
          controller.domNode.focus();
          return controller;
        } else {
          if (close) {
            controller.menu.close(true);
          }
          controller.hasFocus = false;
        }
        controller = controller.menu.controller;
      }
      return false;
    }
    if (command === "") {
      if (this.controller && this.controller.domNode) {
        this.controller.domNode.focus();
      }
      return;
    }
    if (!this.controller.isMenubarItem) {
      this.controller.domNode.focus();
      this.close();
      if (command === "next") {
        var menubarItem = setFocusToMenubarItem(this.controller, false);
        if (menubarItem) {
          menubarItem.menu.setFocusToNextItem(menubarItem, flag);
        }
      }
    } else {
      if (command === "previous") {
        this.controller.menu.setFocusToPreviousItem(this.controller, flag);
      } else if (command === "next") {
        this.controller.menu.setFocusToNextItem(this.controller, flag);
      }
    }
  };
  PopupMenu2.prototype.setFocusToFirstItem = function() {
    this.firstItem.domNode.focus();
  };
  PopupMenu2.prototype.setFocusToLastItem = function() {
    this.lastItem.domNode.focus();
  };
  PopupMenu2.prototype.setFocusToPreviousItem = function(currentItem) {
    var index2;
    if (currentItem === this.firstItem) {
      this.lastItem.domNode.focus();
    } else {
      index2 = this.menuitems.indexOf(currentItem);
      this.menuitems[index2 - 1].domNode.focus();
    }
  };
  PopupMenu2.prototype.setFocusToNextItem = function(currentItem) {
    var index2;
    if (currentItem === this.lastItem) {
      this.firstItem.domNode.focus();
    } else {
      index2 = this.menuitems.indexOf(currentItem);
      this.menuitems[index2 + 1].domNode.focus();
    }
  };
  PopupMenu2.prototype.setFocusByFirstCharacter = function(currentItem, char) {
    var start2, index2, char = char.toLowerCase();
    start2 = this.menuitems.indexOf(currentItem) + 1;
    if (start2 === this.menuitems.length) {
      start2 = 0;
    }
    index2 = this.getIndexFirstChars(start2, char);
    if (index2 === -1) {
      index2 = this.getIndexFirstChars(0, char);
    }
    if (index2 > -1) {
      this.menuitems[index2].domNode.focus();
    }
  };
  PopupMenu2.prototype.getIndexFirstChars = function(startIndex, char) {
    for (var i = startIndex; i < this.firstChars.length; i++) {
      if (char === this.firstChars[i]) {
        return i;
      }
    }
    return -1;
  };
  PopupMenu2.prototype.open = function() {
    const positionProperty = this.controller.menu.isMobile ? "unset" : "absolute";
    var rect = this.controller.domNode.getBoundingClientRect();
    if (!this.controller.isMenubarItem) {
      this.domNode.parentNode.style.position = "relative";
      this.domNode.style.display = "block";
      this.domNode.style.position = positionProperty;
      this.domNode.style.left = rect.width + "px";
      this.domNode.style.zIndex = 100;
    } else {
      this.domNode.style.display = "block";
      this.domNode.style.position = positionProperty;
      this.domNode.style.top = rect.height - 1 + "px";
      this.domNode.style.zIndex = 100;
    }
    this.controller.setExpanded(true);
    this.controller.menu.setExpanded();
  };
  PopupMenu2.prototype.close = function(force) {
    var controllerHasHover = this.controller.hasHover;
    var hasFocus = this.hasFocus;
    for (var i = 0; i < this.menuitems.length; i++) {
      var mi = this.menuitems[i];
      if (mi.popupMenu) {
        hasFocus = hasFocus | mi.popupMenu.hasFocus;
      }
    }
    if (!this.controller.isMenubarItem) {
      controllerHasHover = false;
    }
    if (force || !hasFocus && !this.hasHover && !controllerHasHover) {
      this.domNode.style.display = "none";
      this.domNode.style.zIndex = 0;
      this.controller.setExpanded(false);
    }
    this.controller.menu.setExpanded();
  };
  var PopupMenu_default = PopupMenu2;

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/partials/nav/MenubarItem.js
  var MenubarItem = function(domNode, menuObj) {
    this.menu = menuObj;
    this.domNode = domNode;
    this.popupMenu = false;
    this.hasFocus = false;
    this.hasHover = false;
    this.isMenubarItem = true;
    this.keyCode = Object.freeze({
      TAB: 9,
      RETURN: 13,
      ESC: 27,
      SPACE: 32,
      PAGEUP: 33,
      PAGEDOWN: 34,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    });
  };
  MenubarItem.prototype.init = function() {
    this.domNode.tabIndex = -1;
    this.domNode.addEventListener("keydown", this.handleKeydown.bind(this));
    this.domNode.addEventListener("focus", this.handleFocus.bind(this));
    this.domNode.addEventListener("blur", this.handleBlur.bind(this));
    this.domNode.addEventListener("mouseover", this.handleMouseover.bind(this));
    this.domNode.addEventListener("mouseout", this.handleMouseout.bind(this));
    this.domNode.addEventListener("click", this.handleClick.bind(this));
    var nextElement = this.domNode.nextElementSibling;
    if (nextElement && nextElement.tagName === "UL") {
      this.popupMenu = new PopupMenu_default(nextElement, this);
      this.popupMenu.init();
    }
  };
  MenubarItem.prototype.handleKeydown = function(event) {
    var tgt = event.currentTarget, char = event.key, flag = false, clickEvent;
    function isPrintableCharacter(str) {
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
  MenubarItem.prototype.setExpanded = function(value) {
    if (value) {
      this.isExpanded = true;
      this.domNode.setAttribute("aria-expanded", "true");
    } else {
      this.isExpanded = false;
      this.domNode.setAttribute("aria-expanded", "false");
    }
  };
  MenubarItem.prototype.handleFocus = function(event) {
    this.menu.hasFocus = true;
  };
  MenubarItem.prototype.handleBlur = function(event) {
    this.menu.hasFocus = false;
  };
  MenubarItem.prototype.handleMouseover = function(event) {
    if (!this.popupMenu) {
      return;
    }
    if (this.menu.isMobile) {
      return;
    }
    this.hasHover = true;
    setTimeout(this.popupMenu.open.bind(this.popupMenu, false), this.menu.delay);
  };
  MenubarItem.prototype.handleMouseout = function(event) {
    if (!this.popupMenu) {
      return;
    }
    if (this.menu.isMobile) {
      return;
    }
    this.hasHover = false;
    setTimeout(this.popupMenu.close.bind(this.popupMenu, false), this.menu.delay);
  };
  MenubarItem.prototype.handleClick = function(event) {
    if (!this.popupMenu) {
      return;
    }
    if (!this.menu.isMobile) {
      return;
    }
    if (this.isExpanded) {
      this.popupMenu.close();
    } else {
      this.menu.closeAllPopups();
      this.popupMenu.open();
      event.stopPropagation();
      event.preventDefault();
    }
  };
  var MenubarItem_default = MenubarItem;

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/partials/nav/Menubar.js
  var Menubar = function(domNode) {
    var elementChildren, msgPrefix = "Menubar constructor argument menubarNode ";
    if (!domNode instanceof Element) {
      throw new TypeError(msgPrefix + "is not a DOM Element.");
    }
    if (domNode.childElementCount === 0) {
      throw new Error(msgPrefix + "has no element children.");
    }
    e = domNode.firstElementChild;
    while (e) {
      var menubarItem = e.firstElementChild;
      if (e && menubarItem && menubarItem.tagName !== "A") {
        throw new Error(msgPrefix + "has child elements are not A elements.");
      }
      e = e.nextElementSibling;
    }
    this.isMenubar = true;
    this.domNode = domNode;
    this.menubarItems = [];
    this.firstChars = [];
    this.firstItem = null;
    this.lastItem = null;
    this.hasFocus = false;
    this.hasHover = false;
    this.isMobile = false;
    this.delay = 200;
  };
  Menubar.prototype.init = function() {
    var menubarItem, childElement, menuElement, textContent, numItems;
    elem = this.domNode.firstElementChild;
    while (elem) {
      var menuElement = elem.firstElementChild;
      if (elem && menuElement && menuElement.tagName === "A") {
        menubarItem = new MenubarItem_default(menuElement, this);
        menubarItem.init();
        this.menubarItems.push(menubarItem);
        textContent = menuElement.textContent.trim();
        this.firstChars.push(textContent.substring(0, 1).toLowerCase());
      }
      elem = elem.nextElementSibling;
    }
    numItems = this.menubarItems.length;
    if (numItems > 0) {
      this.firstItem = this.menubarItems[0];
      this.lastItem = this.menubarItems[numItems - 1];
    }
    this.firstItem.domNode.tabIndex = 0;
  };
  Menubar.prototype.setFocusToItem = function(newItem2) {
    var flag = false;
    for (var i = 0; i < this.menubarItems.length; i++) {
      var mbi = this.menubarItems[i];
      if (mbi.domNode.tabIndex == 0) {
        flag = mbi.domNode.getAttribute("aria-expanded") === "true";
      }
      mbi.domNode.tabIndex = -1;
      if (mbi.popupMenu) {
        mbi.popupMenu.close();
      }
    }
    newItem2.domNode.focus();
    newItem2.domNode.tabIndex = 0;
    if (flag && newItem2.popupMenu) {
      newItem2.popupMenu.open();
    }
  };
  Menubar.prototype.setFocusToFirstItem = function(flag) {
    this.setFocusToItem(this.firstItem);
  };
  Menubar.prototype.setFocusToLastItem = function(flag) {
    this.setFocusToItem(this.lastItem);
  };
  Menubar.prototype.setFocusToPreviousItem = function(currentItem) {
    var index2;
    if (currentItem === this.firstItem) {
      newItem = this.lastItem;
    } else {
      index2 = this.menubarItems.indexOf(currentItem);
      newItem = this.menubarItems[index2 - 1];
    }
    this.setFocusToItem(newItem);
  };
  Menubar.prototype.setFocusToNextItem = function(currentItem) {
    var index2;
    if (currentItem === this.lastItem) {
      newItem = this.firstItem;
    } else {
      index2 = this.menubarItems.indexOf(currentItem);
      newItem = this.menubarItems[index2 + 1];
    }
    this.setFocusToItem(newItem);
  };
  Menubar.prototype.setFocusByFirstCharacter = function(currentItem, char) {
    var start2, index2, char = char.toLowerCase();
    var flag = currentItem.domNode.getAttribute("aria-expanded") === "true";
    start2 = this.menubarItems.indexOf(currentItem) + 1;
    if (start2 === this.menubarItems.length) {
      start2 = 0;
    }
    index2 = this.getIndexFirstChars(start2, char);
    if (index2 === -1) {
      index2 = this.getIndexFirstChars(0, char);
    }
    if (index2 > -1) {
      this.setFocusToItem(this.menubarItems[index2]);
    }
  };
  Menubar.prototype.getIndexFirstChars = function(startIndex, char) {
    for (var i = startIndex; i < this.firstChars.length; i++) {
      if (char === this.firstChars[i]) {
        return i;
      }
    }
    return -1;
  };
  Menubar.prototype.closeAllPopups = function() {
    this.menubarItems.forEach(function(item) {
      if (item.popupMenu) {
        item.popupMenu.close();
      }
    });
  };
  Menubar.prototype.setExpanded = function() {
    var allPopupsClosed = true;
    this.menubarItems.forEach(function(item) {
      if (item.isExpanded) {
        allPopupsClosed = false;
      }
    });
    if (allPopupsClosed) {
      this.domNode.classList.remove("nav__menu--expanded");
    } else {
      this.domNode.classList.add("nav__menu--expanded");
    }
  };
  var Menubar_default = Menubar;

  // ns-hugo:/home/runner/work/OHI-website/OHI-website/assets/js/partials/nav/nav.js
  var breakpoint2 = breakpoint || 700;
  var menubarEl = null;
  var menuToggle = null;
  var menubar = null;
  var delay = 10;
  var throttled = false;
  function init() {
    menubarEl = document.getElementById("main-menu");
    menuToggle = document.getElementById("menu-button");
    menubar = new Menubar_default(menubarEl, breakpoint2);
    menubar.init();
    menuToggle.addEventListener("click", toggleMenu);
    checkIfMobile();
    window.addEventListener("resize", function() {
      if (!throttled) {
        checkIfMobile();
        throttled = true;
        setTimeout(function() {
          throttled = false;
        }, delay);
      }
    });
  }
  function checkIfMobile() {
    if (window.innerWidth < breakpoint2) {
      if (menubar.isMobile === false) {
        hideMenubar();
      }
      menubar.isMobile = true;
    } else {
      if (menubar.isMobile === true) {
        showMenubar();
        menubar.closeAllPopups();
      }
      menubar.isMobile = false;
    }
  }
  function toggleMenu() {
    if (menubarEl.style.visibility === "hidden") {
      showMenubar();
    } else {
      menubar.closeAllPopups();
      hideMenubar();
    }
  }
  function hideMenubar() {
    menuToggle.setAttribute("aria-expanded", false);
    menuToggle.setAttribute("aria-label", "Show main menu");
    menubarEl.style.transition = "500ms opacity";
    menubarEl.style.opacity = "0";
    setTimeout(() => {
      menubarEl.style.width = "0px";
      menubarEl.style.margin = "0 0 0 -50px";
      menubarEl.style.visibility = "hidden";
    }, 500);
  }
  function showMenubar() {
    menuToggle.setAttribute("aria-expanded", true);
    menuToggle.setAttribute("aria-label", "Hide main menu");
    menubarEl.style.opacity = "1";
    menubarEl.style.width = "100%";
    menubarEl.style.margin = "0";
    menubarEl.style.visibility = "visible";
  }
  var nav_default = {init};

  // <stdin>
  async function callback() {
    nav_default.init();
    const scoresGlobeEls = document.querySelectorAll(".global-scores");
    if (scoresGlobeEls) {
      Promise.resolve().then(() => (init_globalScores(), globalScores_exports)).then(function(globalScores2) {
        scoresGlobeEls.forEach(function(scoresGlobeEl) {
          globalScores2.default({
            container: scoresGlobeEl
          });
        });
      });
    }
    const regionAsterEls = document.querySelectorAll(".region-aster");
    if (regionAsterEls) {
      Promise.resolve().then(() => (init_regionAster(), regionAster_exports)).then(function(regionAster2) {
        regionAsterEls.forEach(function(regionAsterEl) {
          regionAster2.default({
            container: regionAsterEl,
            regionId: regionAsterEl.dataset.regionId
          });
        });
      });
    }
    const regionRankChartEls = document.querySelectorAll(".region-rank-chart");
    if (regionRankChartEls) {
      Promise.resolve().then(() => (init_regionRankChart(), regionRankChart_exports)).then(function(regionRankChart2) {
        regionRankChartEls.forEach(function(regionRankChartEl) {
          regionRankChart2.default({
            container: regionRankChartEl,
            regionId: regionRankChartEl.dataset.regionId
          });
        });
      });
    }
  }
  if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
})();
