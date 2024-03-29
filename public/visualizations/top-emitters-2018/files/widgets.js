!(function () {
  let t;
  Function &&
    Function.prototype &&
    Function.prototype.bind &&
    (/MSIE [678]/.test(navigator.userAgent) ||
      !(function e(t, n, i) {
        function r(s, a) {
          if (!n[s]) {
            if (!t[s]) {
              const c = typeof require === 'function' && require;
              if (!a && c) return c(s, !0);
              if (o) return o(s, !0);
              const u = new Error(`Cannot find module '${s}'`);
              throw ((u.code = 'MODULE_NOT_FOUND'), u);
            }
            const l = (n[s] = { exports: {} });
            t[s][0].call(
              l.exports,
              function (e) {
                const n = t[s][1][e];
                return r(n || e);
              },
              l,
              l.exports,
              e,
              t,
              n,
              i
            );
          }
          return n[s].exports;
        }
        for (
          var o = typeof require === 'function' && require, s = 0;
          s < i.length;
          s++
        ) {
          r(i[s]);
        }
        return r;
      }(
        {
          1: [
            function (e, n, i) {
              (function () {
                function e(t) {
                  return (
                    typeof t === 'function' ||
                    (typeof t === 'object' && t !== null)
                  );
                }
                function i(t) {
                  return typeof t === 'function';
                }
                function r(t) {
                  return typeof t === 'object' && t !== null;
                }
                function o() {}
                function s() {
                  return function () {
                    process.nextTick(l);
                  };
                }
                function a() {
                  let t = 0,
                    e = new U(l),
                    n = document.createTextNode('');
                  return (
                    e.observe(n, { characterData: !0 }),
                    function () {
                      n.data = t = ++t % 2;
                    }
                  );
                }
                function c() {
                  const t = new MessageChannel();
                  return (
                    (t.port1.onmessage = l),
                    function () {
                      t.port2.postMessage(0);
                    }
                  );
                }
                function u() {
                  return function () {
                    setTimeout(l, 1);
                  };
                }
                function l() {
                  for (let t = 0; O > t; t += 2) {
                    let e = q[t],
                      n = q[t + 1];
                    e(n), (q[t] = void 0), (q[t + 1] = void 0);
                  }
                  O = 0;
                }
                function d() {}
                function h() {
                  return new TypeError(
                    'You cannot resolve a promise with itself'
                  );
                }
                function f() {
                  return new TypeError(
                    'A promises callback cannot return that same promise.'
                  );
                }
                function p(t) {
                  try {
                    return t.then;
                  } catch (e) {
                    return (G.error = e), G;
                  }
                }
                function m(t, e, n, i) {
                  try {
                    t.call(e, n, i);
                  } catch (r) {
                    return r;
                  }
                }
                function g(t, e, n) {
                  H(function (t) {
                    let i = !1,
                      r = m(
                        n,
                        e,
                        function (n) {
                          i || ((i = !0), e !== n ? w(t, n) : _(t, n));
                        },
                        function (e) {
                          i || ((i = !0), E(t, e));
                        },
                        `Settle: ${t._label || ' unknown promise'}`
                      );
                    !i && r && ((i = !0), E(t, r));
                  }, t);
                }
                function v(t, e) {
                  e._state === z
                    ? _(t, e._result)
                    : t._state === B
                      ? E(t, e._result)
                      : A(
                        e,
                        void 0,
                        function (e) {
                          w(t, e);
                        },
                        function (e) {
                          E(t, e);
                        }
                      );
                }
                function y(t, e) {
                  if (e.constructor === t.constructor) v(t, e);
                  else {
                    const n = p(e);
                    n === G
                      ? E(t, G.error)
                      : void 0 === n
                        ? _(t, e)
                        : i(n)
                          ? g(t, e, n)
                          : _(t, e);
                  }
                }
                function w(t, n) {
                  t === n ? E(t, h()) : e(n) ? y(t, n) : _(t, n);
                }
                function b(t) {
                  t._onerror && t._onerror(t._result), T(t);
                }
                function _(t, e) {
                  t._state === F &&
                    ((t._result = e),
                      (t._state = z),
                      t._subscribers.length === 0 || H(T, t));
                }
                function E(t, e) {
                  t._state === F && ((t._state = B), (t._result = e), H(b, t));
                }
                function A(t, e, n, i) {
                  let r = t._subscribers,
                    o = r.length;
                  (t._onerror = null),
                  (r[o] = e),
                  (r[o + z] = n),
                  (r[o + B] = i),
                  o === 0 && t._state && H(T, t);
                }
                function T(t) {
                  let e = t._subscribers,
                    n = t._state;
                  if (e.length !== 0) {
                    for (var i, r, o = t._result, s = 0; s < e.length; s += 3) {
                      (i = e[s]), (r = e[s + n]), i ? S(n, i, r, o) : r(o);
                    }
                    t._subscribers.length = 0;
                  }
                }
                function x() {
                  this.error = null;
                }
                function I(t, e) {
                  try {
                    return t(e);
                  } catch (n) {
                    return (V.error = n), V;
                  }
                }
                function S(t, e, n, r) {
                  let o,
                    s,
                    a,
                    c,
                    u = i(n);
                  if (u) {
                    if (
                      ((o = I(n, r)),
                        o === V
                          ? ((c = !0), (s = o.error), (o = null))
                          : (a = !0),
                        e === o)
                    ) {
                      return void E(e, f());
                    }
                  } else (o = r), (a = !0);
                  e._state !== F ||
                    (u && a
                      ? w(e, o)
                      : c
                        ? E(e, s)
                        : t === z
                          ? _(e, o)
                          : t === B && E(e, o));
                }
                function D(t, e) {
                  try {
                    e(
                      function (e) {
                        w(t, e);
                      },
                      function (e) {
                        E(t, e);
                      }
                    );
                  } catch (n) {
                    E(t, n);
                  }
                }
                function N(t, e, n, i) {
                  (this._instanceConstructor = t),
                  (this.promise = new t(d, i)),
                  (this._abortOnReject = n),
                  this._validateInput(e)
                    ? ((this._input = e),
                      (this.length = e.length),
                      (this._remaining = e.length),
                      this._init(),
                      this.length === 0
                        ? _(this.promise, this._result)
                        : ((this.length = this.length || 0),
                          this._enumerate(),
                          this._remaining === 0 &&
                              _(this.promise, this._result)))
                    : E(this.promise, this._validationError());
                }
                function C() {
                  throw new TypeError(
                    'You must pass a resolver function as the first argument to the promise constructor'
                  );
                }
                function P() {
                  throw new TypeError(
                    "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
                  );
                }
                function R(t) {
                  (this._id = X++),
                  (this._state = void 0),
                  (this._result = void 0),
                  (this._subscribers = []),
                  d !== t &&
                      (i(t) || C(), this instanceof R || P(), D(this, t));
                }
                let L;
                L = Array.isArray
                  ? Array.isArray
                  : function (t) {
                    return (
                      Object.prototype.toString.call(t) === '[object Array]'
                    );
                  };
                var k,
                  M = L,
                  O =
                    (Date.now ||
                      function () {
                        return new Date().getTime();
                      },
                      Object.create ||
                      function (t) {
                        if (arguments.length > 1) {
                          throw new Error('Second argument not supported');
                        }
                        if (typeof t !== 'object') {
                          throw new TypeError('Argument must be an object');
                        }
                        return (o.prototype = t), new o();
                      },
                      0),
                  H = function (t, e) {
                    (q[O] = t), (q[O + 1] = e), (O += 2), O === 2 && k();
                  },
                  W = typeof window !== 'undefined' ? window : {},
                  U = W.MutationObserver || W.WebKitMutationObserver,
                  j =
                    typeof Uint8ClampedArray !== 'undefined' &&
                    typeof importScripts !== 'undefined' &&
                    typeof MessageChannel !== 'undefined',
                  q = new Array(1e3);
                k =
                  typeof process !== 'undefined' &&
                  {}.toString.call(process) === '[object process]'
                    ? s()
                    : U
                      ? a()
                      : j
                        ? c()
                        : u();
                var F = void 0,
                  z = 1,
                  B = 2,
                  G = new x(),
                  V = new x();
                (N.prototype._validateInput = function (t) {
                  return M(t);
                }),
                (N.prototype._validationError = function () {
                  return new Error('Array Methods must be provided an Array');
                }),
                (N.prototype._init = function () {
                  this._result = new Array(this.length);
                });
                const $ = N;
                (N.prototype._enumerate = function () {
                  for (
                    let t = this.length,
                      e = this.promise,
                      n = this._input,
                      i = 0;
                    e._state === F && t > i;
                    i++
                  ) {
                    this._eachEntry(n[i], i);
                  }
                }),
                (N.prototype._eachEntry = function (t, e) {
                  const n = this._instanceConstructor;
                  r(t)
                    ? t.constructor === n && t._state !== F
                      ? ((t._onerror = null),
                        this._settledAt(t._state, e, t._result))
                      : this._willSettleAt(n.resolve(t), e)
                    : (this._remaining--,
                      (this._result[e] = this._makeResult(z, e, t)));
                }),
                (N.prototype._settledAt = function (t, e, n) {
                  const i = this.promise;
                  i._state === F &&
                      (this._remaining--,
                        this._abortOnReject && t === B
                          ? E(i, n)
                          : (this._result[e] = this._makeResult(t, e, n))),
                  this._remaining === 0 && _(i, this._result);
                }),
                (N.prototype._makeResult = function (t, e, n) {
                  return n;
                }),
                (N.prototype._willSettleAt = function (t, e) {
                  const n = this;
                  A(
                    t,
                    void 0,
                    function (t) {
                      n._settledAt(z, e, t);
                    },
                    function (t) {
                      n._settledAt(B, e, t);
                    }
                  );
                });
                var J = function (t, e) {
                    return new $(this, t, !0, e).promise;
                  },
                  K = function (t, e) {
                    function n(t) {
                      w(o, t);
                    }
                    function i(t) {
                      E(o, t);
                    }
                    var r = this,
                      o = new r(d, e);
                    if (!M(t)) {
                      return (
                        E(o, new TypeError('You must pass an array to race.')),
                        o
                      );
                    }
                    for (
                      let s = t.length, a = 0;
                      o._state === F && s > a;
                      a++
                    ) {
                      A(r.resolve(t[a]), void 0, n, i);
                    }
                    return o;
                  },
                  Y = function (t, e) {
                    const n = this;
                    if (t && typeof t === 'object' && t.constructor === n) {
                      return t;
                    }
                    const i = new n(d, e);
                    return w(i, t), i;
                  },
                  Q = function (t, e) {
                    let n = this,
                      i = new n(d, e);
                    return E(i, t), i;
                  },
                  X = 0,
                  Z = R;
                (R.all = J),
                (R.race = K),
                (R.resolve = Y),
                (R.reject = Q),
                (R.prototype = {
                  constructor: R,
                  then(t, e) {
                    let n = this,
                      i = n._state;
                    if ((i === z && !t) || (i === B && !e)) return this;
                    let r = new this.constructor(d),
                      o = n._result;
                    if (i) {
                      const s = arguments[i - 1];
                      H(function () {
                        S(i, r, s, o);
                      });
                    } else A(n, r, t, e);
                    return r;
                  },
                  catch(t) {
                    return this.then(null, t);
                  }
                });
                let tt = function () {
                    let t;
                    t =
                      typeof global !== 'undefined'
                        ? global
                        : typeof window !== 'undefined' && window.document
                          ? window
                          : self;
                    const e =
                      'Promise' in t &&
                      'resolve' in t.Promise &&
                      'reject' in t.Promise &&
                      'all' in t.Promise &&
                      'race' in t.Promise &&
                      (function () {
                        let e;
                        return (
                          new t.Promise(function (t) {
                            e = t;
                          }),
                          i(e)
                        );
                      }());
                    e || (t.Promise = Z);
                  },
                  et = { Promise: Z, polyfill: tt };
                typeof t === 'function' && t.amd
                  ? t(function () {
                    return et;
                  })
                  : typeof n !== 'undefined' && n.exports
                    ? (n.exports = et)
                    : typeof this !== 'undefined' && (this.ES6Promise = et);
              }.call(this));
            },
            {}
          ],
          2: [
            function (t, e, n) {
              function i(t, e) {
                let n;
                return (
                  (e = e || s),
                  (n =
                    e.requestAnimationFrame ||
                    e.webkitRequestAnimationFrame ||
                    e.mozRequestAnimationFrame ||
                    e.msRequestAnimationFrame ||
                    e.oRequestAnimationFrame ||
                    function () {
                      e.setTimeout(function () {
                        t(+new Date());
                      }, 1e3 / 60);
                    })(t)
                );
              }
              function r(t, e) {
                return Math.sin((Math.PI / 2) * e) * t;
              }
              function o(t, e, n, r, o) {
                function s() {
                  let c = +new Date(),
                    u = c - a,
                    l = Math.min(u / n, 1),
                    d = r ? r(e, l) : e * l,
                    h = l == 1;
                  t(d, h), h || i(s, o);
                }
                var a = +new Date();
                i(s);
              }
              var s = t(15);
              e.exports = { animate: o, requestAnimationFrame: i, easeOut: r };
            },
            { 15: 15 }
          ],
          3: [
            function (t, e, n) {
              function i() {
                return a.builtUrl(u);
              }
              function r(t) {
                return t === 'dark' ? 'dark' : 'light';
              }
              function o(t, e, n) {
                let i,
                  o;
                return (
                  (n = r(n)),
                  (i = s.isRtlLang(e) ? 'rtl' : 'ltr'),
                  (o = [t, c.css, n, i, 'css'].join('.')),
                  `${a.base()}/css/${o}`
                );
              }
              var s = t(22),
                a = t(40),
                c = t(80),
                u = 'embed/timeline.css';
              e.exports = {
                tweet: o.bind(null, 'tweet'),
                timeline: i,
                video: o.bind(null, 'video')
              };
            },
            { 22: 22, 40: 40, 80: 80 }
          ],
          4: [
            function (t, e, n) {
              function i(t) {
                return { success: !0, resp: t };
              }
              e.exports = i;
            },
            {}
          ],
          5: [
            function (t, e, n) {
              function i() {
                return l + d++;
              }
              function r(t, e, n, r) {
                let l,
                  d,
                  h;
                return (
                  (r = r || i()),
                  (l = s.fullPath(['callbacks', r])),
                  (d = o.createElement('script')),
                  (h = new a()),
                  (e = c.aug({}, e, {
                    callback: l,
                    suppress_response_codes: !0
                  })),
                  s.set(['callbacks', r], function (t) {
                    let e,
                      i;
                    (e = n(t || !1)),
                    (t = e.resp),
                    (i = e.success),
                    i ? h.resolve(t) : h.reject(t),
                    (d.onload = d.onreadystatechange = null),
                    d.parentNode && d.parentNode.removeChild(d),
                    s.unset(['callbacks', r]);
                  }),
                  (d.onerror = function () {
                    h.reject(new Error(`failed to fetch ${d.src}`));
                  }),
                  (d.src = u.url(t, e)),
                  (d.async = 'async'),
                  o.body.appendChild(d),
                  h.promise
                );
              }
              var o = t(12),
                s = t(19),
                a = t(68),
                c = t(77),
                u = t(71),
                l = 'cb',
                d = 0;
              e.exports = { fetch: r };
            },
            { 12: 12, 19: 19, 68: 68, 71: 71, 77: 77 }
          ],
          6: [
            function (t, e, n) {
              function i(t) {
                let e,
                  n;
                return (
                  (e = t.headers && t.headers.status),
                  (n = t && !t.error && e === 200),
                  !n &&
                    t.headers &&
                    t.headers.message &&
                    r.warn(t.headers.message),
                  { success: n, resp: t }
                );
              }
              var r = t(65);
              e.exports = i;
            },
            { 65: 65 }
          ],
          7: [
            function (t, e, n) {
              function i(t) {
                return new RegExp(`\\b${t}\\b`, 'g');
              }
              function r(t, e) {
                return t.classList
                  ? void t.classList.add(e)
                  : void (i(e).test(t.className) || (t.className += ` ${e}`));
              }
              function o(t, e) {
                return t.classList
                  ? void t.classList.remove(e)
                  : void (t.className = t.className.replace(i(e), ' '));
              }
              function s(t, e, n) {
                return void 0 === n && t.classList && t.classList.toggle
                  ? t.classList.toggle(e, n)
                  : (n ? r(t, e) : o(t, e), n);
              }
              function a(t, e, n) {
                return t.classList && c(t, e)
                  ? (o(t, e), void r(t, n))
                  : void (t.className = t.className.replace(i(e), n));
              }
              function c(t, e) {
                return t.classList
                  ? t.classList.contains(e)
                  : i(e).test(t.className);
              }
              e.exports = {
                add: r,
                remove: o,
                replace: a,
                toggle: s,
                present: c
              };
            },
            {}
          ],
          8: [
            function (t, e, n) {
              function i(t) {
                const e = t.getAttribute('data-twitter-event-id');
                return e || (t.setAttribute('data-twitter-event-id', ++m), m);
              }
              function r(t, e, n) {
                let i = 0,
                  r = (t && t.length) || 0;
                for (i = 0; r > i; i++) t[i].call(e, n, e);
              }
              function o(t, e, n) {
                for (
                  var i = n || t.target || t.srcElement,
                    s = i.className.split(' '),
                    a = 0,
                    c = s.length;
                  c > a;
                  a++
                ) {
                  r(e[`.${s[a]}`], i, t);
                }
                r(e[i.tagName], i, t),
                t.cease ||
                    (i !== this &&
                      o.call(this, t, e, i.parentElement || i.parentNode));
              }
              function s(t, e, n, i) {
                function r(i) {
                  o.call(t, i, n[e]);
                }
                a(t, r, e, i), t.addEventListener(e, r, !1);
              }
              function a(t, e, n, i) {
                t.id &&
                  ((g[t.id] = g[t.id] || []),
                    g[t.id].push({ el: t, listener: e, type: n, rootId: i }));
              }
              function c(t) {
                const e = g[t];
                e &&
                  (e.forEach(function (t) {
                    t.el.removeEventListener(t.type, t.listener, !1),
                    delete p[t.rootId];
                  }),
                    delete g[t]);
              }
              function u(t, e, n, r) {
                const o = i(t);
                (p[o] = p[o] || {}),
                p[o][e] || ((p[o][e] = {}), s(t, e, p[o], o)),
                (p[o][e][n] = p[o][e][n] || []),
                p[o][e][n].push(r);
              }
              function l(t, e, n) {
                let r = i(e),
                  s = p[r] && p[r];
                o.call(e, { target: n }, s[t]);
              }
              function d(t) {
                return f(t), h(t), !1;
              }
              function h(t) {
                t && t.preventDefault
                  ? t.preventDefault()
                  : (t.returnValue = !1);
              }
              function f(t) {
                t && (t.cease = !0) && t.stopPropagation
                  ? t.stopPropagation()
                  : (t.cancelBubble = !0);
              }
              var p = {},
                m = -1,
                g = {};
              e.exports = {
                stop: d,
                stopPropagation: f,
                preventDefault: h,
                delegate: u,
                simulate: l,
                removeDelegatesForWidget: c
              };
            },
            {}
          ],
          9: [
            function (t, e, n) {
              function i(t) {
                const e = t.charAt(0);
                return e === '.'
                  ? function (e) {
                    const n = e.className ? e.className.split(/\s+/) : [];
                    return o.contains(n, t.slice(1));
                  }
                  : e === '#'
                    ? function (e) {
                      return e.id === t.slice(1);
                    }
                    : function (e) {
                      return e.tagName === t.toUpperCase();
                    };
              }
              function r(t, e, n) {
                let s;
                if (e) {
                  return (
                    (n = n || (e && e.ownerDocument)),
                    (s = o.isType('function', t) ? t : i(t)),
                    e === n
                      ? s(e)
                        ? e
                        : void 0
                      : s(e)
                        ? e
                        : r(s, e.parentNode, n)
                  );
                }
              }
              var o = t(77);
              e.exports = { closest: r };
            },
            { 77: 77 }
          ],
          10: [
            function (t, e, n) {
              function i(t) {
                return (t = t || o), t.getSelection && t.getSelection();
              }
              function r(t) {
                const e = i(t);
                return e ? e.toString() : '';
              }
              var o = t(15);
              e.exports = { getSelection: i, getSelectedText: r };
            },
            { 15: 15 }
          ],
          11: [
            function (t, e, n) {
              function i(t) {
                return t && t.nodeType === 1
                  ? t.offsetWidth || i(t.parentNode)
                  : 0;
              }
              e.exports = { effectiveWidth: i };
            },
            {}
          ],
          12: [
            function (t, e, n) {
              e.exports = document;
            },
            {}
          ],
          13: [
            function (t, e, n) {
              e.exports = location;
            },
            {}
          ],
          14: [
            function (t, e, n) {
              e.exports = navigator;
            },
            {}
          ],
          15: [
            function (t, e, n) {
              e.exports = window;
            },
            {}
          ],
          16: [
            function (t, e, n) {
              function i(t, e, n) {
                (e.ready = t.then.bind(t)),
                n &&
                    Array.isArray(e[n]) &&
                    (e[n].forEach(t.then.bind(t)), delete e[n]);
              }
              e.exports = { exposeReadyPromise: i };
            },
            {}
          ],
          17: [
            function (t, e, n) {
              function i(t) {
                return a.isType('string', t)
                  ? t.split('.')
                  : a.isType('array', t)
                    ? t
                    : [];
              }
              function r(t, e) {
                let n = i(e),
                  r = n.slice(0, -1);
                return r.reduce(function (t, e, n) {
                  if (((t[e] = t[e] || {}), !a.isObject(t[e]))) {
                    throw new Error(
                      `${r
                        .slice(0, n + 1)
                        .join('.')} is already defined with a value.`
                    );
                  }
                  return t[e];
                }, t);
              }
              function o(t, e) {
                (e = e || s),
                (e[t] = e[t] || {}),
                Object.defineProperty(this, 'base', { value: e[t] }),
                Object.defineProperty(this, 'name', { value: t });
              }
              var s = t(15),
                a = t(77);
              a.aug(o.prototype, {
                get(t) {
                  const e = i(t);
                  return e.reduce(function (t, e) {
                    return a.isObject(t) ? t[e] : void 0;
                  }, this.base);
                },
                set(t, e, n) {
                  let o = i(t),
                    s = r(this.base, t),
                    a = o.slice(-1);
                  return n && a in s ? s[a] : (s[a] = e);
                },
                init(t, e) {
                  return this.set(t, e, !0);
                },
                unset(t) {
                  let e = i(t),
                    n = this.get(e.slice(0, -1));
                  n && delete n[e.slice(-1)];
                },
                aug(t) {
                  let e = this.get(t),
                    n = a.toRealArray(arguments).slice(1);
                  if (
                    ((e = typeof e !== 'undefined' ? e : {}),
                      n.unshift(e),
                      !n.every(a.isObject))
                  ) {
                    throw new Error('Cannot augment non-object.');
                  }
                  return this.set(t, a.aug.apply(null, n));
                },
                call(t) {
                  let e = this.get(t),
                    n = a.toRealArray(arguments).slice(1);
                  if (!a.isType('function', e)) {
                    throw new Error(`Function ${t}does not exist.`);
                  }
                  return e(...n);
                },
                fullPath(t) {
                  const e = i(t);
                  return e.unshift(this.name), e.join('.');
                }
              }),
              (e.exports = o);
            },
            { 15: 15, 77: 77 }
          ],
          18: [
            function (t, e, n) {
              function i(t) {
                let e,
                  n,
                  i,
                  r = 0;
                for (
                  o = {}, t = t || s, e = t.getElementsByTagName('meta');
                  (n = e[r]);
                  r++
                ) {
                  /^twitter:/.test(n.name) &&
                    ((i = n.name.replace(/^twitter:/, '')), (o[i] = n.content));
                }
              }
              function r(t) {
                return o[t];
              }
              var o,
                s = t(12);
              i(), (e.exports = { init: i, val: r });
            },
            { 12: 12 }
          ],
          19: [
            function (t, e, n) {
              const i = t(17);
              e.exports = new i('__twttr');
            },
            { 17: 17 }
          ],
          20: [
            function (t, e, n) {
              const i = t(17);
              e.exports = new i('twttr');
            },
            { 17: 17 }
          ],
          21: [
            function (t, e, n) {
              e.exports = [
                'hi',
                'zh-cn',
                'fr',
                'zh-tw',
                'msa',
                'fil',
                'fi',
                'sv',
                'pl',
                'ja',
                'ko',
                'de',
                'it',
                'pt',
                'es',
                'ru',
                'id',
                'tr',
                'da',
                'no',
                'nl',
                'hu',
                'fa',
                'ar',
                'ur',
                'he',
                'th',
                'cs',
                'uk',
                'vi',
                'ro',
                'bn'
              ];
            },
            {}
          ],
          22: [
            function (t, e, n) {
              function i(t) {
                return (t = String(t).toLowerCase()), r.contains(o, t);
              }
              var r = t(77),
                o = ['ar', 'fa', 'he', 'ur'];
              e.exports = { isRtlLang: i };
            },
            { 77: 77 }
          ],
          23: [
            function (t, e, n) {
              function i(t) {
                let e = ~s.host.indexOf('poptip.com')
                    ? 'https://poptip.com'
                    : s.href,
                  n = `original_referer=${e}`;
                return [t, n].join(t.indexOf('?') == -1 ? '?' : '&');
              }
              function r(t) {
                let e,
                  n;
                t.altKey ||
                  t.metaKey ||
                  t.shiftKey ||
                  ((e = c.closest(function (t) {
                    return t.tagName === 'A' || t.tagName === 'AREA';
                  }, t.target)),
                    e &&
                    l.isIntentURL(e.href) &&
                    ((n = i(e.href)),
                      (n = n.replace(/^http[:]/, 'https:')),
                      (n = n.replace(/^\/\//, 'https://')),
                      u.open(n, e),
                      a.preventDefault(t)));
              }
              function o(t) {
                t.addEventListener('click', r, !1);
              }
              var s = t(13),
                a = t(8),
                c = t(9),
                u = t(49),
                l = t(73);
              e.exports = { attachTo: o };
            },
            { 13: 13, 49: 49, 73: 73, 8: 8, 9: 9 }
          ],
          24: [
            function (t, e, n) {
              function i(t) {
                const e = [];
                return (
                  h.forIn(t, function (t, n) {
                    e.push(`${t}=${n}`);
                  }),
                  e.join(',')
                );
              }
              function r() {
                return f + d.generate();
              }
              function o(t, e) {
                function n(t) {
                  return Math.round(t / 2);
                }
                return t > e
                  ? { coordinate: 0, size: e }
                  : { coordinate: n(e) - n(t), size: t };
              }
              function s(t, e, n) {
                let r,
                  s;
                (e = a.parse(e)),
                (n = n || {}),
                (r = o(e.width, n.width || p)),
                (e.left = r.coordinate),
                (e.width = r.size),
                (s = o(e.height, n.height || m)),
                (e.top = s.coordinate),
                (e.height = s.size),
                (this.win = t),
                (this.features = i(e));
              }
              var a,
                c = t(15),
                u = t(66),
                l = t(73),
                d = t(75),
                h = t(77),
                f = 'intent_',
                p = c.screen.width,
                m = c.screen.height;
              (a = new u().defaults({
                width: 550,
                height: 520,
                personalbar: '0',
                toolbar: '0',
                location: '1',
                scrollbars: '1',
                resizable: '1'
              })),
              (s.prototype.open = function (t) {
                return l.isTwitterURL(t)
                  ? ((this.name = r()),
                    (this.popup = this.win.open(t, this.name, this.features)),
                    this)
                  : void 0;
              }),
              (s.open = function (t, e) {
                const n = new s(c, e);
                return n.open(t);
              }),
              (e.exports = s);
            },
            { 15: 15, 66: 66, 73: 73, 75: 75, 77: 77 }
          ],
          25: [
            function (t, e, n) {
              function i(t) {
                u[t] = +new Date();
              }
              function r(t) {
                return u[t] ? +new Date() - u[t] : null;
              }
              function o(t, e, n, i, o) {
                const a = r(e);
                a && s(t, n, i, a, o);
              }
              function s(t, e, n, i, r) {
                let o,
                  s = void 0 === r ? l : r;
                100 * Math.random() > s ||
                  ((n = c.aug(n || {}, { duration_ms: i })),
                    (o = { page: e, component: 'performance', action: t }),
                    a.clientEvent(o, n, !0));
              }
              var a = t(35),
                c = t(77),
                u = {},
                l = 1;
              e.exports = { start: i, end: r, track: s, endAndTrack: o };
            },
            { 35: 35, 77: 77 }
          ],
          26: [
            function (t, e, n) {
              function i(t) {
                if (!t) throw new Error('JsonRpcClient requires a dispatcher');
                (this.idIterator = 0),
                (this.dispatcher = t),
                (this.idPrefix = String(+new Date()) + a++);
              }
              function r(t) {
                const e = { jsonrpc: s, method: t };
                return (
                  arguments.length > 1 &&
                    (e.params = [].slice.call(arguments, 1)),
                  e
                );
              }
              var o = t(69),
                s = '2.0',
                a = 0;
              (i.prototype._generateId = function () {
                return this.idPrefix + this.idIterator++;
              }),
              (i.prototype.notify = function () {
                this.dispatcher.send(r(...arguments));
              }),
              (i.prototype.request = function () {
                const t = r(...arguments);
                return (
                  (t.id = this._generateId()),
                  this.dispatcher.send(t).then(function (t) {
                    return 'result' in t ? t.result : o.reject(t.error);
                  })
                );
              }),
              (e.exports = i);
            },
            { 69: 69 }
          ],
          27: [
            function (t, e, n) {
              e.exports = {
                PARSE_ERROR: { code: -32700, message: 'Parse error' },
                INVALID_REQUEST: { code: -32600, message: 'Invalid Request' },
                INVALID_PARAMS: { code: -32602, message: 'Invalid params' },
                METHOD_NOT_FOUND: { code: -32601, message: 'Method not found' },
                INTERNAL_ERROR: { code: -32603, message: 'Internal error' }
              };
            },
            {}
          ],
          28: [
            function (t, e, n) {
              function i(t) {
                this.registry = t || {};
              }
              function r(t) {
                return h.isType('string', t) ? JSON.parse(t) : t;
              }
              function o(t) {
                let e,
                  n,
                  i;
                return h.isObject(t)
                  ? ((e = t.jsonrpc === m),
                    (n = h.isType('string', t.method)),
                    (i = !('id' in t) || s(t.id)),
                    e && n && i)
                  : !1;
              }
              function s(t) {
                let e,
                  n,
                  i;
                return (
                  (e = h.isType('string', t)),
                  (n = h.isType('number', t)),
                  (i = t === null),
                  e || n || i
                );
              }
              function a(t) {
                return h.isObject(t) && !h.isType('function', t);
              }
              function c(t, e) {
                return { jsonrpc: m, id: t, result: e };
              }
              function u(t, e) {
                return { jsonrpc: m, id: s(t) ? t : null, error: e };
              }
              function l(t) {
                return f.all(t).then(function (t) {
                  return (
                    (t = t.filter(function (t) {
                      return void 0 !== t;
                    })),
                    t.length ? t : void 0
                  );
                });
              }
              var d = t(27),
                h = t(77),
                f = t(69),
                p = t(70),
                m = '2.0';
              (i.prototype._invoke = function (t, e) {
                let n,
                  i,
                  r;
                (n = this.registry[t.method]),
                (i = t.params || []),
                (i = h.isType('array', i) ? i : [i]);
                try {
                  r = n.apply(e.source || null, i);
                } catch (o) {
                  r = f.reject(o.message);
                }
                return p.isPromise(r) ? r : f.resolve(r);
              }),
              (i.prototype._processRequest = function (t, e) {
                function n(e) {
                  return c(t.id, e);
                }
                function i() {
                  return u(t.id, d.INTERNAL_ERROR);
                }
                let r;
                return o(t)
                  ? ((r =
                        'params' in t && !a(t.params)
                          ? f.resolve(u(t.id, d.INVALID_PARAMS))
                          : this.registry[t.method]
                            ? this._invoke(t, { source: e }).then(n, i)
                            : f.resolve(u(t.id, d.METHOD_NOT_FOUND))),
                    t.id != null ? r : f.resolve())
                  : f.resolve(u(t.id, d.INVALID_REQUEST));
              }),
              (i.prototype.attachReceiver = function (t) {
                return t.attachTo(this), this;
              }),
              (i.prototype.bind = function (t, e) {
                return (this.registry[t] = e), this;
              }),
              (i.prototype.receive = function (t, e) {
                let n,
                  i,
                  o,
                  s = this;
                try {
                  t = r(t);
                } catch (a) {
                  return f.resolve(u(null, d.PARSE_ERROR));
                }
                return (
                  (e = e || null),
                  (n = h.isType('array', t)),
                  (i = n ? t : [t]),
                  (o = i.map(function (t) {
                    return s._processRequest(t, e);
                  })),
                  n ? l(o) : o[0]
                );
              }),
              (e.exports = i);
            },
            { 27: 27, 69: 69, 70: 70, 77: 77 }
          ],
          29: [
            function (t, e, n) {
              function i(t, e, n) {
                let i;
                t &&
                  t.postMessage &&
                  (m
                    ? (i = (n || '') + JSON.stringify(e))
                    : n
                      ? ((i = {}), (i[n] = e))
                      : (i = e),
                    t.postMessage(i, '*'));
              }
              function r(t) {
                return f.isType('string', t) ? t : 'JSONRPC';
              }
              function o(t, e) {
                return e
                  ? f.isType('string', t) && t.indexOf(e) === 0
                    ? t.substring(e.length)
                    : t[e]
                      ? t[e]
                      : void 0
                  : t;
              }
              function s(t, e) {
                const n = t.document;
                (this.filter = r(e)),
                (this.server = null),
                (this.isTwitterFrame = p.isTwitterURL(n.location.href)),
                t.addEventListener('message', this._onMessage.bind(this), !1);
              }
              function a(t, e) {
                (this.pending = {}),
                (this.target = t),
                (this.isTwitterHost = p.isTwitterURL(u.href)),
                (this.filter = r(e)),
                l.addEventListener('message', this._onMessage.bind(this), !1);
              }
              function c(t) {
                return arguments.length > 0 && (m = !!t), m;
              }
              var u = t(13),
                l = t(15),
                d = t(68),
                h = t(60),
                f = t(77),
                p = t(73),
                m = h.ie9();
              f.aug(s.prototype, {
                _onMessage(t) {
                  let e,
                    n = this;
                  this.server &&
                    (!this.isTwitterFrame || p.isTwitterURL(t.origin)) &&
                    ((e = o(t.data, this.filter)),
                      e &&
                      this.server.receive(e, t.source).then(function (e) {
                        e && i(t.source, e, n.filter);
                      }));
                },
                attachTo(t) {
                  this.server = t;
                },
                detach() {
                  this.server = null;
                }
              }),
              f.aug(a.prototype, {
                _processResponse(t) {
                  const e = this.pending[t.id];
                  e && (e.resolve(t), delete this.pending[t.id]);
                },
                _onMessage(t) {
                  let e;
                  if (
                    (!this.isTwitterHost || p.isTwitterURL(t.origin)) &&
                      (e = o(t.data, this.filter))
                  ) {
                    if (f.isType('string', e)) {
                      try {
                        e = JSON.parse(e);
                      } catch (n) {
                        return;
                      }
                    }
                    (e = f.isType('array', e) ? e : [e]),
                    e.forEach(this._processResponse.bind(this));
                  }
                },
                send(t) {
                  const e = new d();
                  return (
                    t.id ? (this.pending[t.id] = e) : e.resolve(),
                    i(this.target, t, this.filter),
                    e.promise
                  );
                }
              }),
              (e.exports = {
                Receiver: s,
                Dispatcher: a,
                _stringifyPayload: c
              });
            },
            { 13: 13, 15: 15, 60: 60, 68: 68, 73: 73, 77: 77 }
          ],
          30: [
            function (t, e, n) {
              function i(t, e, n, i) {
                let s,
                  u = this;
                (this.readyDeferred = new o()),
                (this.attrs = t || {}),
                (this.styles = e || {}),
                (this.appender =
                    n ||
                    function (t) {
                      r.body.appendChild(t);
                    }),
                (this.layout =
                    i ||
                    function (t) {
                      return c.resolve(t());
                    }),
                (this.frame = s = a(this.attrs, this.styles)),
                (s.onreadystatechange = s.onload = this.getCallback(
                  this.onLoad
                )),
                this.layout(function () {
                  u.appender(s);
                });
              }
              var r = t(12),
                o = t(68),
                s = t(60),
                a = t(63),
                c = t(69),
                u = t(19),
                l = 0;
              (i.prototype.getCallback = function (t) {
                let e = this,
                  n = !1;
                return function () {
                  n || ((n = !0), t.call(e));
                };
              }),
              (i.prototype.registerCallback = function (t) {
                const e = `cb${l++}`;
                return u.set(['sandbox', e], t), e;
              }),
              (i.prototype.onLoad = function () {
                try {
                  this.document = this.frame.contentWindow.document;
                } catch (t) {
                  return void this.setDocDomain();
                }
                this.writeStandardsDoc(), this.readyDeferred.resolve(this);
              }),
              (i.prototype.ready = function () {
                return this.readyDeferred.promise;
              }),
              (i.prototype.setDocDomain = function () {
                let t = this,
                  e = a(this.attrs, this.styles),
                  n = this.registerCallback(this.getCallback(this.onLoad));
                (e.src = [
                  'javascript:',
                  'document.write("");',
                  'try { window.parent.document; }',
                  'catch (e) {',
                  `document.domain="${r.domain}";`,
                  '}',
                  `window.parent.${u.fullPath(['sandbox', n])}();`
                ].join('')),
                this.layout(function () {
                  t.frame.parentNode.removeChild(t.frame),
                  (t.frame = null),
                  t.appender ? t.appender(e) : r.body.appendChild(e),
                  (t.frame = e);
                });
              }),
              (i.prototype.writeStandardsDoc = function () {
                if (s.anyIE() && !s.cspEnabled()) {
                  const t = [
                    '<!DOCTYPE html>',
                    '<html>',
                    '<head>',
                    '<scr',
                    'ipt>',
                    'try { window.parent.document; }',
                    `catch (e) {document.domain="${r.domain}";}`,
                    '</scr',
                    'ipt>',
                    '</head>',
                    '<body></body>',
                    '</html>'
                  ].join('');
                  this.document.write(t), this.document.close();
                }
              }),
              (e.exports = i);
            },
            { 12: 12, 19: 19, 60: 60, 63: 63, 68: 68, 69: 69 }
          ],
          31: [
            function (t, e, n) {
              function i() {
                let t,
                  e;
                (y = {}),
                s ||
                    ((t = a.body.offsetHeight),
                      (e = a.body.offsetWidth),
                      (t != b || e != w) &&
                      (v.forEach(function (t) {
                        t.dispatchFrameResize(w, b);
                      }),
                        (b = t),
                        (w = e)));
              }
              function r(t) {
                let e;
                return t.id
                  ? t.id
                  : (e = t.getAttribute('data-twttr-id'))
                    ? e
                    : ((e = `twttr-sandbox-${g++}`),
                      t.setAttribute('data-twttr-id', e),
                      e);
              }
              function o(t, e) {
                const n = this;
                l.apply(this, [t, e]),
                (this._resizeHandlers = []),
                (v = v.filter(function (t) {
                  const e = t._frame.parentElement;
                  return (
                    e ||
                        f.async(function () {
                          p.removeDelegatesForWidget(t._frame.id);
                        }),
                    e
                  );
                })),
                v.push(this),
                this._win.addEventListener(
                  'resize',
                  function () {
                    n.dispatchFrameResize();
                  },
                  !1
                );
              }
              var s,
                a = t(12),
                c = t(15),
                u = t(30),
                l = t(32),
                d = t(60),
                h = t(69),
                f = t(77),
                p = t(8),
                m = t(7),
                g = 0,
                v = [],
                y = {},
                w = 0,
                b = 0;
              c.addEventListener('resize', i, !1),
              (o.prototype = new l()),
              f.aug(o.prototype, {
                _addStyleSheet(t, e, n) {
                  function i() {
                    const t = o._head.children[0];
                    return t
                      ? o._head.insertBefore(s, t)
                      : o._head.appendChild(s);
                  }
                  function r() {
                    return o._head.appendChild(s);
                  }
                  var o = this,
                    s = this._doc.createElement('link');
                  return (
                    (s.type = 'text/css'),
                    (s.rel = 'stylesheet'),
                    (s.href = t),
                    n && (s.onload = n),
                    this.layout(e ? i : r)
                  );
                },
                dispatchFrameResize() {
                  let t = this._frame.parentNode,
                    e = r(t),
                    n = y[e];
                  (s = !0),
                  this._resizeHandlers.length &&
                        (n ||
                          (n = y[e] = {
                            w: this._frame.offsetWidth,
                            h: this._frame.offsetHeight
                          }),
                          (this._frameWidth != n.w || this._frameHeight != n.h) &&
                          ((this._frameWidth = n.w),
                            (this._frameHeight = n.h),
                            this._resizeHandlers.forEach(function (t) {
                              t(n.w, n.h);
                            }),
                            c.setTimeout(function () {
                              y = {};
                            }, 50)));
                },
                addClass(t) {
                  const e = this._doc.documentElement;
                  return this.layout(function () {
                    m.add(e, t);
                  });
                },
                prependStyleSheet(t, e) {
                  return this._addStyleSheet(t, !0, e);
                },
                appendStyleSheet(t, e) {
                  return this._addStyleSheet(t, !1, e);
                },
                removeStyleSheet(t) {
                  let e,
                    n = this;
                  return (
                    (e = `link[rel="stylesheet"][href="${t}"]`),
                    this.layout(function () {
                      const t = n._doc.querySelector(e);
                      return t && n._head.removeChild(t);
                    })
                  );
                },
                appendCss(t) {
                  let e,
                    n = this;
                  return d.cspEnabled()
                    ? h.reject('CSP enabled; cannot embed inline styles.')
                    : ((e = this._doc.createElement('style')),
                      (e.type = 'text/css'),
                      e.styleSheet
                        ? (e.styleSheet.cssText = t)
                        : e.appendChild(this._doc.createTextNode(t)),
                      this.layout(function () {
                        return n._head.appendChild(e);
                      }));
                },
                style(t, e) {
                  const n = this;
                  return this.layout(function () {
                    e && (n._frame.style.cssText = ''),
                    f.forIn(t, function (t, e) {
                      n._frame.style[t] = e;
                    });
                  });
                },
                onresize(t) {
                  this._resizeHandlers.push(t);
                },
                width(t) {
                  return (
                    void 0 !== t && (this._frame.style.width = `${t}px`),
                    d.ios()
                      ? Math.min(
                        this._frame.parentNode.offsetWidth,
                        this._frame.offsetWidth
                      )
                      : this._frame.offsetWidth
                  );
                },
                height(t) {
                  return (
                    void 0 !== t && (this._frame.height = t),
                    this._frame.offsetHeight
                  );
                },
                contentHeight() {
                  return this._doc.body.firstChild.offsetHeight;
                },
                hasContent() {
                  return !!this._doc.body.firstChild;
                },
                resizeToContent() {
                  const t = this;
                  return this.layout(function () {
                    return t.height(t.contentHeight());
                  });
                }
              }),
              (o.createSandbox = function (t, e, n, i) {
                const r = new u(t, e, n, i);
                return r.ready().then(function (t) {
                  return new o(t.frame, t.layout);
                });
              }),
              (e.exports = o);
            },
            {
              12: 12,
              15: 15,
              30: 30,
              32: 32,
              60: 60,
              69: 69,
              7: 7,
              77: 77,
              8: 8
            }
          ],
          32: [
            function (t, e, n) {
              function i(t, e) {
                t &&
                  ((this._frame = t),
                    (this._win = t.contentWindow),
                    (this._doc = this._win.document),
                    (this._body = this._doc.body),
                    (this._head = this._body.parentNode.children[0]),
                    (this.layout = e),
                    (this.root = this._doc.documentElement),
                    (this.root.className = 'SandboxRoot'));
              }
              let r = t(30),
                o = t(77);
              o.aug(i.prototype, {
                createElement(t) {
                  return this._doc.createElement(t);
                },
                createDocumentFragment() {
                  return this._doc.createDocumentFragment();
                },
                appendChild(t) {
                  const e = this;
                  return this.layout(function () {
                    return e._body.appendChild(t);
                  });
                },
                setBaseTarget(t) {
                  let e = this,
                    n = this._doc.createElement('base');
                  return (
                    (n.target = t),
                    this.layout(function () {
                      return e._head.appendChild(n);
                    })
                  );
                },
                setTitle(t) {
                  t && (this._frame.title = t);
                },
                element() {
                  return this._frame;
                },
                document() {
                  return this._doc;
                }
              }),
              (i.createSandbox = function (t, e, n, o) {
                const s = new r(t, e, n, o);
                return s.ready().then(function (t) {
                  return new i(t.frame, t.layout);
                });
              }),
              (e.exports = i);
            },
            { 30: 30, 77: 77 }
          ],
          33: [
            function (t, e, n) {
              function i() {
                return l.formatGenericEventData('syndicated_impression', {});
              }
              function r() {
                c('tweet');
              }
              function o() {
                c('timeline');
              }
              function s() {
                c('video');
              }
              function a() {
                c('partnertweet');
              }
              function c(t) {
                d.isHostPageSensitive() ||
                  h[t] ||
                  ((h[t] = !0),
                    u.scribe(
                      l.formatClientEventNamespace({
                        page: t,
                        action: 'impression'
                      }),
                      i(),
                      l.AUDIENCE_ENDPOINT
                    ));
              }
              var u = t(35),
                l = t(36),
                d = t(72),
                h = {};
              e.exports = {
                scribeAudienceImpression: c,
                scribePartnerTweetAudienceImpression: a,
                scribeTweetAudienceImpression: r,
                scribeTimelineAudienceImpression: o,
                scribeVideoAudienceImpression: s
              };
            },
            { 35: 35, 36: 36, 72: 72 }
          ],
          34: [
            function (t, e, n) {
              function i() {
                return x
                  ? I.promise
                  : (m
                    .createSandbox(
                      { id: 'rufous-sandbox' },
                      { display: 'none' }
                    )
                    .then(function (t) {
                      (h = t), (l = c()), (d = u()), I.resolve([l, d]);
                    }),
                    (x = !0),
                    I.promise);
              }
              function r(t, e) {
                let n,
                  i,
                  r;
                w.isObject(t) &&
                  w.isObject(e) &&
                  ((r = y.flattenClientEventPayload(t, e)),
                    (n = l.firstChild),
                    (n.value = +(+n.value || r.dnt || 0)),
                    (i = h.createElement('input')),
                    (i.type = 'hidden'),
                    (i.name = 'l'),
                    (i.value = y.stringify(r)),
                    l.appendChild(i));
              }
              function o(t, e, n) {
                let i = !w.isObject(t),
                  o = e ? !w.isObject(e) : !1;
                i ||
                  o ||
                  I.promise.then(function () {
                    r(
                      y.formatClientEventNamespace(t),
                      y.formatClientEventData(e, n)
                    );
                  });
              }
              function s() {
                return I.promise.then(function () {
                  if (l.children.length <= 2) return v.reject();
                  const t = v
                    .all([h.appendChild(l), h.appendChild(d)])
                    .then(function (t) {
                      let e = t[0],
                        n = t[1];
                      return (
                        n.addEventListener('load', function () {
                          a(e, n)(), b.get('events').trigger('logFlushed');
                        }),
                        e.submit(),
                        t
                      );
                    });
                  return (l = c()), (d = u()), t;
                });
              }
              function a(t, e) {
                return function () {
                  const n = t.parentNode;
                  n && (n.removeChild(t), n.removeChild(e));
                };
              }
              function c() {
                let t = h.createElement('form'),
                  e = h.createElement('input'),
                  n = h.createElement('input');
                return (
                  T++,
                  (t.action = y.CLIENT_EVENT_ENDPOINT),
                  (t.method = 'POST'),
                  (t.target = E + T),
                  (t.id = A + T),
                  (e.type = 'hidden'),
                  (e.name = 'dnt'),
                  (e.value = p.enabled()),
                  (n.type = 'hidden'),
                  (n.name = 'tfw_redirect'),
                  (n.value = y.RUFOUS_REDIRECT),
                  t.appendChild(e),
                  t.appendChild(n),
                  t
                );
              }
              function u() {
                const t = E + T;
                return f(
                  { id: t, name: t, width: 0, height: 0, border: 0 },
                  { display: 'none' },
                  h.document()
                );
              }
              var l,
                d,
                h,
                f = t(63),
                p = t(59),
                m = t(32),
                g = t(68),
                v = t(69),
                y = t(36),
                w = t(77),
                b = t(20),
                _ = `${Math.floor(1e3 * Math.random())}_`,
                E = `rufous-frame-${_}-`,
                A = `rufous-form-${_}-`,
                T = 0,
                x = !1,
                I = new g();
              e.exports = { clientEvent: o, flush: s, init: i };
            },
            { 20: 20, 32: 32, 36: 36, 59: 59, 63: 63, 68: 68, 69: 69, 77: 77 }
          ],
          35: [
            function (t, e, n) {
              function i(t, e, n) {
                return r(t, e, n, 2);
              }
              function r(t, e, n, i) {
                let r = !p.isObject(t),
                  o = e ? !p.isObject(e) : !1;
                r ||
                  o ||
                  s(
                    f.formatClientEventNamespace(t),
                    f.formatClientEventData(e, n, i),
                    f.CLIENT_EVENT_ENDPOINT
                  );
              }
              function o(t, e, n, i) {
                const o = f.extractTermsFromDOM(t.target || t.srcElement);
                (o.action = i || 'click'), r(o, e, n);
              }
              function s(t, e, n) {
                let i,
                  r;
                n &&
                  p.isObject(t) &&
                  p.isObject(e) &&
                  ((i = f.flattenClientEventPayload(t, e)),
                    (r = { l: f.stringify(i) }),
                    i.dnt && (r.dnt = 1),
                    l(h.url(n, r)));
              }
              function a(t, e, n, i) {
                let r,
                  o = !p.isObject(t),
                  s = e ? !p.isObject(e) : !1;
                if (!o && !s) {
                  return (
                    (r = f.flattenClientEventPayload(
                      f.formatClientEventNamespace(t),
                      f.formatClientEventData(e, n, i)
                    )),
                    c(r)
                  );
                }
              }
              function c(t) {
                return g.push(t), g;
              }
              function u() {
                let t,
                  e,
                  n = h.url(f.CLIENT_EVENT_ENDPOINT, { dnt: 0, l: '' }),
                  i = encodeURIComponent(n).length;
                return (
                  g.length > 1 &&
                    a(
                      {
                        page: 'widgets_js',
                        component: 'scribe_pixel',
                        action: 'batch_log'
                      },
                      {}
                    ),
                  (t = g),
                  (g = []),
                  (e = t.reduce(function (e, n, r) {
                    let o,
                      s,
                      a = e.length,
                      c = a && e[a - 1],
                      u = r + 1 == t.length;
                    return (
                      u &&
                        n.event_namespace &&
                        n.event_namespace.action == 'batch_log' &&
                        (n.message = [`entries:${r}`, `requests:${a}`].join(
                          '/'
                        )),
                      (o = f.stringify(n)),
                      (s = encodeURIComponent(o).length + 3),
                      i + s > m
                        ? e
                        : ((!c || c.urlLength + s > m) &&
                            ((c = { urlLength: i, items: [] }), e.push(c)),
                          (c.urlLength += s),
                          c.items.push(o),
                          e)
                    );
                  }, [])),
                  e.map(function (t) {
                    const e = { l: t.items };
                    return (
                      d.enabled() && (e.dnt = 1),
                      l(h.url(f.CLIENT_EVENT_ENDPOINT, e))
                    );
                  })
                );
              }
              function l(t) {
                const e = new Image();
                return (e.src = t);
              }
              var d = t(59),
                h = t(71),
                f = t(36),
                p = t(77),
                m = 2083,
                g = [];
              e.exports = {
                _enqueueRawObject: c,
                scribe: s,
                clientEvent: r,
                clientEvent2: i,
                enqueueClientEvent: a,
                flushClientEvents: u,
                interaction: o
              };
            },
            { 36: 36, 59: 59, 71: 71, 77: 77 }
          ],
          36: [
            function (t, e, n) {
              function i(t, e) {
                let n;
                return (
                  (e = e || {}),
                  t && t.nodeType === Node.ELEMENT_NODE
                    ? ((n = t.getAttribute('data-scribe')) &&
                        n.split(' ').forEach(function (t) {
                          let n = t.trim().split(':'),
                            i = n[0],
                            r = n[1];
                          i && r && !e[i] && (e[i] = r);
                        }),
                      i(t.parentNode, e))
                    : e
                );
              }
              function r(t) {
                return d.aug({ client: 'tfw' }, t || {});
              }
              function o(t, e, n) {
                const i = (t && t.widget_origin) || u.referrer;
                return (
                  (t = s('tfw_client_event', t, i)),
                  (t.client_version = p),
                  (t.format_version = void 0 !== n ? n : 1),
                  e || (t.widget_origin = i),
                  t
                );
              }
              function s(t, e, n) {
                return (
                  (e = e || {}),
                  d.aug({}, e, {
                    _category_: t,
                    triggered_on: e.triggered_on || +new Date(),
                    dnt: l.enabled(n)
                  })
                );
              }
              function a(t, e) {
                return d.aug({}, e, { event_namespace: t });
              }
              function c(t) {
                let e,
                  n = Array.prototype.toJSON;
                return (
                  delete Array.prototype.toJSON,
                  (e = JSON.stringify(t)),
                  n && (Array.prototype.toJSON = n),
                  e
                );
              }
              var u = t(12),
                l = t(59),
                d = t(77),
                h = t(79),
                f = t(19),
                p = h.version,
                m =
                  f.get('endpoints.rufous') ||
                  'https://syndication.twitter.com/i/jot',
                g =
                  f.get('endpoints.rufousAudience') ||
                  'https://syndication.twitter.com/i/jot/syndication',
                v =
                  f.get('endpoints.rufousRedirect') ||
                  'https://platform.twitter.com/jot.html';
              e.exports = {
                extractTermsFromDOM: i,
                flattenClientEventPayload: a,
                formatGenericEventData: s,
                formatClientEventData: o,
                formatClientEventNamespace: r,
                stringify: c,
                AUDIENCE_ENDPOINT: g,
                CLIENT_EVENT_ENDPOINT: m,
                RUFOUS_REDIRECT: v
              };
            },
            { 12: 12, 19: 19, 59: 59, 77: 77, 79: 79 }
          ],
          37: [
            function (t, e, n) {
              function i(t, e, n, i) {
                return (
                  (t = t || []),
                  (n = n || {}),
                  function () {
                    let r,
                      o,
                      c,
                      l,
                      d = Array.prototype.slice.apply(arguments, [0, t.length]),
                      h = Array.prototype.slice.apply(arguments, [t.length]);
                    return (
                      h.forEach(function (t) {
                        return t
                          ? t.nodeType === 1
                            ? void (c = t)
                            : s.isType('function', t)
                              ? void (r = t)
                              : void (s.isType('object', t) && (o = t))
                          : void 0;
                      }),
                      d.length != t.length || h.length === 0
                        ? (r &&
                            s.async(function () {
                              r(!1);
                            }),
                          a.reject('Not enough parameters'))
                        : c
                          ? ((o = s.aug(o || {}, n)),
                            (o.targetEl = c),
                            t.forEach(function (t) {
                              o[t] = d.shift();
                            }),
                            (l = new e(o)),
                            u.doLayout(),
                            l.render(),
                            i && i(),
                            r &&
                            l.completed().then(r, function () {
                              r(!1);
                            }),
                            l.completed())
                          : (r &&
                            s.async(function () {
                              r(!1);
                            }),
                            a.reject('No target specified'))
                    );
                  }
                );
              }
              function r(t) {
                let e;
                (t.linkColor = t.linkColor || t.previewParams.link_color),
                (t.theme = t.theme || t.previewParams.theme),
                (t.height = t.height || t.previewParams.height),
                (e = new p(t)),
                (this.render = e.render.bind(e)),
                (this.completed = e.completed.bind(e));
              }
              var o = t(15),
                s = t(77),
                a = t(69),
                c = t(73),
                u = t(46),
                l = t(52),
                d = t(48),
                h = t(47),
                f = t(53),
                p = t(51),
                m = i(['url'], l, { type: 'share' }),
                g = i(['hashtag'], l, { type: 'hashtag' }),
                v = i(['screenName'], l, { type: 'mention' }),
                y = i(['screenName'], d),
                w = i(['tweetId'], h, {}, h.fetchAndRender),
                b = i(['tweetId'], f, {}, f.fetchAndRender),
                _ = i(['widgetId'], p),
                E = i(['previewParams'], r),
                A = {
                  createShareButton: m,
                  createMentionButton: v,
                  createHashtagButton: g,
                  createFollowButton: y,
                  createTweet: w,
                  createVideo: b,
                  createTweetEmbed: w,
                  createTimeline: _
                };
              c.isTwitterURL(o.location.href) && (A.createTimelinePreview = E),
              (e.exports = A);
            },
            {
              15: 15,
              46: 46,
              47: 47,
              48: 48,
              51: 51,
              52: 52,
              53: 53,
              69: 69,
              73: 73,
              77: 77
            }
          ],
          38: [
            function (t, e, n) {
              function i(t, e) {
                const n = u.connect({
                  src: t,
                  iframe: {
                    name: e,
                    style:
                      'position:absolute;top:-9999em;width:10px;height:10px'
                  }
                });
                return (
                  l(n).expose({
                    trigger(t, e, n) {
                      e = e || {};
                      const i = e.region;
                      delete e.region,
                      f.get('events').trigger(t, {
                        target: d.find(n),
                        data: e,
                        region: i,
                        type: t
                      });
                    },
                    initXPHub() {
                      o(!0);
                    }
                  }),
                  n
                );
              }
              function r(t) {
                return t ? h.secureHubId : h.contextualHubId;
              }
              function o(t) {
                let e = `${c.base(
                    t
                  )}/widgets/hub.f15fe2cd70788a40560e69fa17341d5e.html`,
                  n = r(t);
                if (!a.getElementById(n)) return i(e, n);
              }
              function s(t, e) {
                const n = u.connect({
                  window: { width: 550, height: 450 },
                  src: t
                });
                l(n).expose({
                  trigger(t, n) {
                    f.get('events').trigger(t, {
                      target: e,
                      region: 'intent',
                      type: t,
                      data: n
                    });
                  }
                });
              }
              var a = t(12),
                c = t(40),
                u = t(88),
                l = t(87),
                d = t(46),
                h = t(78),
                f = t(20);
              e.exports = { init: o, openIntent: s };
            },
            { 12: 12, 20: 20, 40: 40, 46: 46, 78: 78, 87: 87, 88: 88 }
          ],
          39: [
            function (t, e, n) {
              function i() {
                return o !== o.top
                  ? r.request(d).then(function (t) {
                    s.rootDocumentLocation(t.url), t.dnt && a.setOn();
                  })
                  : void 0;
              }
              var r,
                o = t(15),
                s = t(57),
                a = t(59),
                c = t(28),
                u = t(26),
                l = t(29),
                d = 'twttr.private.requestArticleUrl',
                h = 'twttr.article';
              o === o.top
                ? new c()
                  .attachReceiver(new l.Receiver(o, h))
                  .bind(d, function () {
                    return {
                      url: s.rootDocumentLocation(),
                      dnt: a.enabled()
                    };
                  })
                : (r = new u(new l.Dispatcher(o.top, h))),
              (e.exports = { requestArticleUrl: i });
            },
            { 15: 15, 26: 26, 28: 28, 29: 29, 57: 57, 59: 59 }
          ],
          40: [
            function (t, e, n) {
              function i(t, e) {
                let n,
                  i = u[t];
                return t === 'embed/timeline.css' &&
                  c.contains(o.href, 'localhost.twitter.com')
                  ? '/node_modules/syndication-templates/lib/css/index.css'
                  : ((n = a.retina() ? '2x' : 'default'),
                    e && (n += '.rtl'),
                    `${r()}/${i[n]}`);
              }
              function r(t) {
                const e = s.get('host');
                return `${l(t)}://${e}`;
              }
              var o = t(13),
                s = t(19),
                a = t(60),
                c = t(77),
                u = {
                  'embed/timeline.css': {
                    default:
                      'embed/timeline.bb90bc33d9656b090e6a0f0247348a85.default.css',
                    '2x':
                      'embed/timeline.bb90bc33d9656b090e6a0f0247348a85.2x.css',
                    gif:
                      'embed/timeline.bb90bc33d9656b090e6a0f0247348a85.gif.css',
                    'default.rtl':
                      'embed/timeline.bb90bc33d9656b090e6a0f0247348a85.default.rtl.css',
                    '2x.rtl':
                      'embed/timeline.bb90bc33d9656b090e6a0f0247348a85.2x.rtl.css',
                    'gif.rtl':
                      'embed/timeline.bb90bc33d9656b090e6a0f0247348a85.gif.rtl.css'
                  }
                },
                l = (function () {
                  return /^http\:$/.test(o.protocol)
                    ? function (t) {
                      return t ? 'https' : 'http';
                    }
                    : function () {
                      return 'https';
                    };
                }());
              e.exports = { builtUrl: i, base: r };
            },
            { 13: 13, 19: 19, 60: 60, 77: 77 }
          ],
          41: [
            function (t, e, n) {
              let i = t(13),
                r = t(19),
                o = t(77),
                s = t(5),
                a = t(4),
                c = t(6),
                u = {},
                l = o.aug(
                  {
                    tweets: 'https://syndication.twitter.com/tweets.json',
                    timeline:
                      'https://cdn.syndication.twimg.com/widgets/timelines/',
                    timelinePoll:
                      'https://syndication.twitter.com/widgets/timelines/paged/',
                    timelinePreview:
                      'https://syndication.twitter.com/widgets/timelines/preview/',
                    videos: 'https://syndication.twitter.com/widgets/video/'
                  },
                  r.get('endpoints') || {}
                );
              (u.tweets = function (t) {
                const e = { ids: t.ids.join(','), lang: t.lang, new_html: !0 };
                return s.fetch(l.tweets, e, a);
              }),
              (u.videos = function (t) {
                return s.fetch(
                  l.videos,
                  { ids: t.ids.join(','), lang: t.lang },
                  a
                );
              }),
              (u.timeline = function (t) {
                let e = `tl_${t.id}_${t.instanceId}`,
                  n = 9e5,
                  r = Math.floor(+new Date() / n),
                  a = {
                    lang: t.lang,
                    t: r,
                    domain: i.host,
                    dnt: t.dnt,
                    override_type: t.overrideType,
                    override_id: t.overrideId,
                    override_name: t.overrideName,
                    override_owner_id: t.overrideOwnerId,
                    override_owner_name: t.overrideOwnerName,
                    with_replies: t.withReplies
                  };
                return o.compact(a), s.fetch(l.timeline + t.id, a, c, e);
              }),
              (u.timelinePoll = function (t) {
                let e =
                      t.sinceId || t.maxId || t.maxPosition || t.minPosition,
                  n = `tlPoll_${t.id}_${t.instanceId}_${e}`,
                  r = {
                    lang: t.lang,
                    since_id: t.sinceId,
                    max_id: t.maxId,
                    min_position: t.minPosition,
                    max_position: t.maxPosition,
                    domain: i.host,
                    dnt: t.dnt,
                    override_type: t.overrideType,
                    override_id: t.overrideId,
                    override_name: t.overrideName,
                    override_owner_id: t.overrideOwnerId,
                    override_owner_name: t.overrideOwnerName,
                    with_replies: t.withReplies
                  };
                return o.compact(r), s.fetch(l.timelinePoll + t.id, r, c, n);
              }),
              (u.timelinePreview = function (t) {
                return s.fetch(l.timelinePreview, t.params, c);
              }),
              (e.exports = u);
            },
            { 13: 13, 19: 19, 4: 4, 5: 5, 6: 6, 77: 77 }
          ],
          42: [
            function (t, e, n) {
              function i() {
                let t = 36e5,
                  e = s.combined(o)._;
                return void 0 !== r
                  ? r
                  : ((r = !1),
                    e && /^\d+$/.test(e) && (r = +new Date() - parseInt(e) < t),
                    r);
              }
              var r,
                o = t(13),
                s = t(67);
              e.exports = { isDynamicWidget: i };
            },
            { 13: 13, 67: 67 }
          ],
          43: [
            function (t, e, n) {
              function i(t, e) {
                return t == 2 || (t == 3 && +e === 0);
              }
              function r(t) {
                const e = t.split(' ');
                (this.url = decodeURIComponent(e[0].trim())),
                (this.width = +e[1].replace(/w$/, '').trim());
              }
              function o(t, e, n) {
                let i,
                  o,
                  s,
                  a;
                if (
                  ((t = f.devicePixelRatio ? t * f.devicePixelRatio : t),
                    (o = e.split(',').map(function (t) {
                      return new r(t.trim());
                    })),
                    n)
                ) {
                  for (a = 0; a < o.length; a++) o[a].url === n && (i = o[a]);
                }
                return (
                  (s = o.reduce(function (e, n) {
                    return n.width < e.width && n.width >= t ? n : e;
                  }, o[0])),
                  i && i.width > s.width ? i : s
                );
              }
              function s(t, e) {
                let n,
                  i = t.getAttribute('data-srcset'),
                  r = t.src;
                i && ((n = o(e, i, r)), (t.src = n.url));
              }
              function a(t, e) {
                (e = void 0 !== e ? !!e : m.retina()),
                p
                  .toRealArray(t.getElementsByTagName('IMG'))
                  .forEach(function (t) {
                    let n =
                          t.getAttribute('data-src-1x') ||
                          t.getAttribute('src'),
                      i = t.getAttribute('data-src-2x');
                    e && i ? (t.src = i) : n && (t.src = n);
                  });
              }
              function c(t, e, n, r) {
                let o = 0,
                  a = t.querySelector('.multi-photo'),
                  c = a && +a.getAttribute('data-photo-count');
                if (t) {
                  return (
                    p
                      .toRealArray(t.querySelectorAll('.NaturalImage-image'))
                      .forEach(function (t) {
                        r(function () {
                          s(t, e);
                        });
                      }),
                    p
                      .toRealArray(t.querySelectorAll('.CroppedImage-image'))
                      .forEach(function (t) {
                        r(function () {
                          s(t, e / 2);
                        });
                      }),
                    (m.ios() || m.android()) &&
                      p
                        .toRealArray(t.querySelectorAll('.FilledIframe'))
                        .forEach(function (t) {
                          r(function () {
                            l(t, {
                              width: t.offsetWidth,
                              height: t.offsetHeight
                            });
                          });
                        }),
                    p
                      .toRealArray(t.querySelectorAll('.autosized-media'))
                      .forEach(function (t) {
                        const i = u(
                          t.getAttribute('data-width'),
                          t.getAttribute('data-height'),
                          e,
                          n
                        );
                        r(function () {
                          s(t, e),
                          (t.width = i.width),
                          (t.height = i.height),
                          l(t, i);
                        }),
                        (o = i.height > o ? i.height : o);
                      }),
                    p
                      .toRealArray(t.querySelectorAll('img.cropped-media'))
                      .forEach(function (t) {
                        let a,
                          l,
                          d,
                          h = e - 12,
                          f = t.parentNode,
                          p = t.getAttribute('data-crop-x') || 0,
                          m = t.getAttribute('data-crop-y') || 0,
                          g = i(c, t.getAttribute('data-image-index')),
                          b = Math.floor(h / 2 - v),
                          _ = Math.floor(b / (g ? y : w));
                        g || (_ -= v / 2),
                        (d = u(
                          t.getAttribute('data-width'),
                          t.getAttribute('data-height'),
                          b,
                          n,
                          b,
                          _
                        )),
                        (a = d.width - b - p),
                        (l = d.height - _ - m),
                        a < 0 && Math.max(0, (p += a)),
                        l < 0 && Math.max(0, (m += l)),
                        r(function () {
                          s(t, b),
                          (t.width = d.width),
                          (t.height = d.height),
                          (f.style.width = `${b - 1}px`),
                          (f.style.height = `${_}px`),
                          p &&
                                (t.style.marginLeft = `-${Math.floor(
                                  (d.width * p) / 100
                                )}px`),
                          m &&
                                (t.style.marginTop = `-${Math.floor(
                                  (d.height * m) / 100
                                )}px`);
                        }),
                        (o = d.height * (g ? 2 : 1) > o ? d.height : o);
                      }),
                    o
                  );
                }
              }
              function u(t, e, n, i, r, o) {
                return (
                  (n = n || t),
                  (i = i || e),
                  (r = r || 0),
                  (o = o || 0),
                  t > n && ((e *= n / t), (t = n)),
                  e > i && ((t *= i / e), (e = i)),
                  r > t && ((e *= r / t), (t = r)),
                  o > e && ((t *= o / e), (e = o)),
                  { width: Math.floor(t), height: Math.floor(e) }
                );
              }
              function l(t, e) {
                function n() {
                  const t = { name: 'tfw:resize', dimensions: e };
                  r.postMessage(t, '*');
                }
                let i,
                  r,
                  o,
                  s,
                  a;
                t &&
                  ((r = t.contentWindow),
                    (i = t.ownerDocument && t.ownerDocument.defaultView),
                    (o = m.ios() || m.android()),
                    (s = g.isTwitterURL(t.src)),
                    (a = r && m.canPostMessage(r)),
                    o &&
                    s &&
                    a &&
                    (n(),
                      i &&
                      i.addEventListener(
                        'message',
                        function (t) {
                          t.data === 'tfw:requestsize' && n();
                        },
                        !1
                      )));
              }
              function d(t, e, n, i) {
                p.toRealArray(t.querySelectorAll(e)).forEach(function (t) {
                  let e =
                      t.getAttribute('style') || t.getAttribute('data-style'),
                    r = i.test(e) && RegExp.$1;
                  r && (t.setAttribute('data-csp-fix', !0), (t.style[n] = r));
                });
              }
              function h(t) {
                m.cspEnabled() &&
                  (d(t, '.MediaCard-widthConstraint', 'maxWidth', b),
                    d(t, '.MediaCard-mediaContainer', 'paddingBottom', A),
                    d(t, '.CroppedImage-image', 'top', _),
                    d(t, '.CroppedImage-image', 'left', E));
              }
              var f = t(15),
                p = t(77),
                m = t(60),
                g = t(73),
                v = 6,
                y = 8 / 9,
                w = 16 / 9,
                b = /max-width:\s*([\d\.]+px)/,
                _ = /top:\s*(\-?[\d\.]+%)/,
                E = /left:\s*(\-?[\d\.]+%)/,
                A = /padding-bottom:\s*([\d\.]+%)/;
              e.exports = {
                scaleDimensions: u,
                retinize: a,
                constrainMedia: c,
                fixMediaCardLayout: h,
                __setSrcFromSet: s
              };
            },
            { 15: 15, 60: 60, 73: 73, 77: 77 }
          ],
          44: [
            function (t, e, n) {
              let i = t(71),
                r = t(73);
              e.exports = function (t, e) {
                return function (n) {
                  let o,
                    s,
                    a = 'data-tw-params';
                  if (n && r.isTwitterURL(n.href) && !n.getAttribute(a)) {
                    if ((n.setAttribute(a, !0), typeof e === 'function')) {
                      o = e.call(this, n);
                      for (s in o) o.hasOwnProperty(s) && (t[s] = o[s]);
                    }
                    n.href = i.url(n.href, t);
                  }
                };
              };
            },
            { 71: 71, 73: 73 }
          ],
          45: [
            function (t, e, n) {
              function i() {
                new s()
                  .attachReceiver(new a.Receiver(r, 'twttr.resize'))
                  .bind('twttr.private.resizeButton', function (t) {
                    let e = u(this),
                      n = e && e.id,
                      i = n && o.findInstance(n),
                      r = c.asInt(t.width),
                      s = c.asInt(t.height);
                    i && r && s && i.setInitialSize(r, s);
                  });
              }
              var r = t(15),
                o = t(46),
                s = t(28),
                a = t(29),
                c = t(74),
                u = t(62);
              e.exports = i;
            },
            { 15: 15, 28: 28, 29: 29, 46: 46, 62: 62, 74: 74 }
          ],
          46: [
            function (t, e, n) {
              function i(t) {
                let e;
                t &&
                  (t.ownerDocument
                    ? ((this.srcEl = t),
                      (this.classAttr = t.className.split(' ')))
                    : ((this.srcOb = t), (this.classAttr = [])),
                    (e = this.params()),
                    (this.id = this.generateId()),
                    this.setLanguage(),
                    (this.related = e.related || this.dataAttr('related')),
                    (this.partner =
                    e.partner || this.dataAttr('partner') || y.val('partner')),
                    (this.styleAttr = []),
                    (this.targetEl = t.targetEl),
                    g.asBoolean(e.dnt || this.dataAttr('dnt')) && w.setOn(),
                    (x[this.id] = this),
                    (this.completeDeferred = new d()),
                    this.completed().then(function (t) {
                      t &&
                      t != a.body &&
                      E.get('events').trigger('rendered', { target: t });
                    }));
              }
              function r() {
                I.forEach(function (t) {
                  t();
                }),
                i.doLayout();
              }
              function o(t) {
                return t ? (t.lang ? t.lang : o(t.parentNode)) : void 0;
              }
              var s,
                a = t(12),
                c = t(15),
                u = t(40),
                l = t(25),
                d = t(68),
                h = t(63),
                f = t(64),
                p = t(69),
                m = t(71),
                g = t(74),
                v = t(77),
                y = t(18),
                w = t(59),
                b = t(65),
                _ = t(57),
                E = t(20),
                A = t(21),
                T = 0,
                x = {},
                I = [],
                S = new f(),
                D = 'data-twttr-rendered';
              v.aug(i.prototype, {
                setLanguage(t) {
                  let e;
                  return (
                    t ||
                      (t =
                        this.params().lang ||
                        this.dataAttr('lang') ||
                        o(this.srcEl)),
                    (t = t && t.toLowerCase())
                      ? v.contains(A, t)
                        ? (this.lang = t)
                        : ((e = t.replace(/[\-_].*/, '')),
                          v.contains(A, e)
                            ? (this.lang = e)
                            : void (this.lang = 'en'))
                      : (this.lang = 'en')
                  );
                },
                ringo(t, e, n) {
                  return (
                    (n = n || /\{\{([\w_]+)\}\}/g),
                    t.replace(n, function (t, n) {
                      return void 0 !== e[n] ? e[n] : t;
                    })
                  );
                },
                makeIframeSource() {
                  if (this.iframeSource) {
                    const t = m.encode(this.widgetUrlParams());
                    return [
                      u.base(),
                      '/',
                      this.ringo(this.iframeSource, { lang: this.lang }),
                      '#',
                      t
                    ].join('');
                  }
                },
                add(t) {
                  x[this.id] = t;
                },
                create(t, e) {
                  let n,
                    i = this;
                  return (
                    (e[D] = !0),
                    (n = h(
                      v.aug(
                        {
                          id: this.id,
                          src: t,
                          class: this.classAttr.join(' ')
                        },
                        e
                      ),
                      { position: 'absolute', visibility: 'hidden' },
                      this.targetEl && this.targetEl.ownerDocument
                    )),
                    this.srcEl
                      ? this.layout(function () {
                        return i.srcEl.parentNode.replaceChild(n, i.srcEl), n;
                      })
                      : this.targetEl
                        ? this.layout(function () {
                          return i.targetEl.appendChild(n), n;
                        })
                        : p.reject('Did not append widget')
                  );
                },
                setInitialSize(t, e) {
                  let n = this,
                    i = this.element;
                  return i
                    ? void this.layout(function () {
                      (n.width = t),
                      (n.height = e),
                      (i.style.width = `${t}px`),
                      (i.style.height = `${e}px`),
                      (i.style.position = 'static'),
                      (i.style.visibility = 'visible');
                    }).then(function () {
                      n.completeDeferred.resolve(i);
                    })
                    : !1;
                },
                params() {
                  let t,
                    e;
                  return (
                    this.srcOb
                      ? (e = this.srcOb)
                      : ((t =
                          this.srcEl &&
                          this.srcEl.href &&
                          this.srcEl.href.split('?')[1]),
                        (e = t ? m.decode(t) : {})),
                    (this.params = function () {
                      return e;
                    }),
                    e
                  );
                },
                widgetUrlParams() {
                  return {};
                },
                dataAttr(t) {
                  return this.srcEl && this.srcEl.getAttribute(`data-${t}`);
                },
                attr(t) {
                  return this.srcEl && this.srcEl.getAttribute(t);
                },
                layout(t) {
                  return S.enqueue(t);
                },
                generateId() {
                  return (
                    (this.srcEl && this.srcEl.id) || `twitter-widget-${T++}`
                  );
                },
                completed() {
                  return this.completeDeferred
                    ? this.completeDeferred.promise
                    : void 0;
                }
              }),
              (i.afterLoad = function (t) {
                I.push(t);
              }),
              (i.doLayout = function () {
                S.exec();
              }),
              (i.doLayoutAsync = function () {
                S.delayedExec();
              }),
              (i.init = function (t) {
                s = t;
              }),
              (i.reset = function () {
                x = {};
              }),
              (i.findInstance = function (t) {
                return t && x[t] ? x[t] : null;
              }),
              (i.find = function (t) {
                const e = i.findInstance(t);
                return (e && e.element) || null;
              }),
              (i.embed = function (t) {
                let e = [],
                  n = [],
                  o = [];
                g.isArray(t) || (t = [t || a]),
                b.time('sandboxes'),
                t.forEach(function (t) {
                  v.forIn(s, function (n, i) {
                    const r = t.querySelectorAll(n);
                    v.toRealArray(r).forEach(function (t) {
                      let n;
                      t.getAttribute(D) ||
                            (t.setAttribute(D, 'true'),
                              (n = new i(t)),
                              e.push(n),
                              o.push(n.sandboxCreated));
                    });
                  });
                }),
                p.all(o).then(function () {
                  b.timeEnd('sandboxes');
                }),
                i.doLayout(),
                e.forEach(function (t) {
                  n.push(t.completed()), t.render();
                }),
                p
                  .all(n)
                  .then(function (t) {
                    (t = t.filter(function (t) {
                      return t;
                    })),
                    t.length &&
                            (E.get('events').trigger('loaded', { widgets: t }),
                              b.timeEnd('load'));
                  })
                  .then(i.trackRender),
                i.doLayoutAsync(),
                r();
              }),
              (i.trackRender = function () {
                l.endAndTrack('render', 'widgets-js-load', 'page', {
                  widget_origin: _.rootDocumentLocation(),
                  widget_frame: _.isFramed() && _.currentDocumentLocation()
                });
              }),
              c.setInterval(function () {
                i.doLayout();
              }, 500),
              (e.exports = i);
            },
            {
              12: 12,
              15: 15,
              18: 18,
              20: 20,
              21: 21,
              25: 25,
              40: 40,
              57: 57,
              59: 59,
              63: 63,
              64: 64,
              65: 65,
              68: 68,
              69: 69,
              71: 71,
              74: 74,
              77: 77
            }
          ],
          47: [
            function (t, e, n) {
              function i(t, e) {
                let n = t.querySelector('blockquote.subject'),
                  i = t.querySelector('blockquote.reply'),
                  r = n && n.getAttribute('data-tweet-id'),
                  o = i && i.getAttribute('data-tweet-id'),
                  s = {},
                  a = {};
                r &&
                  ((s[r] = { item_type: 0 }),
                    A.clientEvent(
                      {
                        page: 'tweet',
                        section: 'subject',
                        component: 'tweet',
                        action: 'results'
                      },
                      w.aug({}, e, { item_ids: [r], item_details: s }),
                      !0
                    ),
                    E.scribeTweetAudienceImpression(),
                    o &&
                    ((a[o] = { item_type: 0 }),
                      A.clientEvent(
                        {
                          page: 'tweet',
                          section: 'conversation',
                          component: 'tweet',
                          action: 'results'
                        },
                        w.aug({}, e, {
                          item_ids: [o],
                          item_details: a,
                          associations: {
                            4: { association_id: r, association_type: 4 }
                          }
                        }),
                        !0
                      )));
              }
              function r(t, e) {
                const n = {};
                t &&
                  ((n[t] = { item_type: 0 }),
                    A.clientEvent(
                      {
                        page: 'tweet',
                        section: 'subject',
                        component: 'rawembedcode',
                        action: 'no_results'
                      },
                      {
                        widget_origin: x.rootDocumentLocation(),
                        widget_frame: x.isFramed() && x.currentDocumentLocation(),
                        message: e,
                        item_ids: [t],
                        item_details: n
                      },
                      !0
                    ),
                    E.scribeTweetAudienceImpression());
              }
              function o(t, e, n, i) {
                (P[t] = P[t] || []), P[t].push({ s: n, f: i, lang: e });
              }
              function s(t) {
                if (t) {
                  let e,
                    n,
                    i;
                  d.apply(this, [t]),
                  (e = this.params()),
                  (n = this.srcEl && this.srcEl.getElementsByTagName('A')),
                  (i = n && n[n.length - 1]),
                  (this.hideThread =
                      (e.conversation || this.dataAttr('conversation')) ==
                        'none' || w.contains(this.classAttr, 'tw-hide-thread')),
                  (this.hideCard =
                      (e.cards || this.dataAttr('cards')) == 'hidden' ||
                      w.contains(this.classAttr, 'tw-hide-media')),
                  (e.align || this.attr('align')) == 'left' ||
                    w.contains(this.classAttr, 'tw-align-left')
                    ? (this.align = 'left')
                    : (e.align || this.attr('align')) == 'right' ||
                        w.contains(this.classAttr, 'tw-align-right')
                      ? (this.align = 'right')
                      : ((e.align || this.attr('align')) == 'center' ||
                          w.contains(this.classAttr, 'tw-align-center')) &&
                        ((this.align = 'center'),
                          this.containerWidth >
                          this.dimensions.MIN_WIDTH * (1 / 0.7) &&
                          this.width > 0.7 * this.containerWidth &&
                          (this.width = 0.7 * this.containerWidth)),
                  (this.narrow =
                      e.narrow || this.width <= this.dimensions.NARROW_WIDTH),
                  this.narrow && this.classAttr.push('var-narrow'),
                  (this.tweetId = e.tweetId || (i && b.status(i.href)));
                }
              }
              var a = t(3),
                c = t(15),
                u = t(10),
                l = t(46),
                d = t(50),
                h = t(56),
                f = t(44),
                p = t(7),
                m = t(9),
                g = t(25),
                v = t(69),
                y = t(70),
                w = t(77),
                b = t(73),
                _ = t(41),
                E = t(33),
                A = t(34),
                T = t(43),
                x = t(57),
                I = t(81),
                S = t(20),
                D = t(8),
                N = t(35),
                C = 'tweetembed',
                P = {},
                R = [];
              (s.prototype = new d()),
              w.aug(s.prototype, {
                renderedClassNames: 'twitter-tweet twitter-tweet-rendered',
                dimensions: {
                  DEFAULT_HEIGHT: '0',
                  DEFAULT_WIDTH: '500',
                  NARROW_WIDTH: '350',
                  maxHeight: '375',
                  FULL_BLEED_PHOTO_MAX_HEIGHT: '600',
                  MIN_WIDTH: '220',
                  MIN_HEIGHT: '0',
                  MARGIN: '10px 0',
                  WIDE_MEDIA_PADDING: 32,
                  NARROW_MEDIA_PADDING: 32,
                  BORDERS: 0
                },
                linkColorSelectors: ['a', 'a:visited'],
                linkStateColorSelectors: ['a:hover', 'a:focus', 'a:active'],
                bgColorSelectors: [],
                borderColorSelectors: [],
                styleSheetUrl: a.tweet,
                addSiteStylesPrefix(t) {
                  return t;
                },
                onStyleSheetLoad() {
                  const t = this;
                  this.sandbox.hasContent() &&
                      (l.doLayoutAsync(),
                        this.sandbox.resizeToContent().then(function (e) {
                          t.height = e;
                        }));
                },
                scribeCardShown(t) {
                  let e,
                    n;
                  (e = { page: 'tweet', component: 'card', action: 'shown' }),
                  (n = {
                    card_details: {
                      card_name: t.getAttribute('data-card-name')
                    }
                  }),
                  N.clientEvent2(e, n, !1);
                },
                loadCardCss(t) {
                  function e() {
                    r &&
                        (l.doLayoutAsync(),
                          n.sandbox.resizeToContent().then(function (t) {
                            n.height = t;
                          }));
                  }
                  var n = this,
                    i = t && t.getAttribute('data-css'),
                    r = !1;
                  i &&
                      (w
                        .toRealArray(t.querySelectorAll('img'))
                        .forEach(function (t) {
                          t.addEventListener('load', e, !1);
                        }),
                        this.sandbox.prependStyleSheet(i, function () {
                          p.add(t, 'is-ready'),
                          n.scribeCardShown(t),
                          l.doLayoutAsync(),
                          n.sandbox.resizeToContent().then(function (t) {
                            (r = !0), (n.height = t);
                          });
                        }));
                },
                create(t) {
                  let e,
                    n,
                    r,
                    o = this,
                    s = this.sandbox.createElement('div');
                  return (
                    (s.innerHTML = t),
                    (e = s.children[0] || !1)
                      ? (this.theme == 'dark' &&
                            this.classAttr.push('thm-dark'),
                        this.linkColor && this.addSiteStyles(),
                        p.present(e, 'media-forward') &&
                            ((this.fullBleedPhoto = !0),
                              (this.dimensions.maxHeight = this.dimensions.FULL_BLEED_PHOTO_MAX_HEIGHT)),
                        (n = e.querySelector('.GifPlayer')),
                        n &&
                            (this.gifPlayer = new I({
                              rootEl: n,
                              videoEl: n.querySelector('.GifPlayer-video'),
                              playButtonEl: n.querySelector(
                                '.GifPlayer-playButton'
                              ),
                              fallbackUrl: this.extractPermalinkUrl(
                                this.getTweetElement(e)
                              )
                            })),
                        T.retinize(e),
                        T.fixMediaCardLayout(e),
                        (e.id = this.id),
                        (e.className += ` ${this.classAttr.join(' ')}`),
                        (e.lang = this.lang),
                        this.sandbox.setTitle(
                          e.getAttribute('data-iframe-title') || 'Tweet'
                        ),
                        this.loadCardCss(e.querySelector('.PrerenderedCard')),
                        this.sandbox.appendChild(e).then(function () {
                          o.renderedDeferred.resolve(o.sandbox);
                        }),
                        (r = this.layout(function () {
                          (o.predefinedWidth = o.width),
                          (o.width = o.sandbox.width(o.width)),
                          o.collapseRegions();
                        })),
                        r.then(function () {
                          o.constrainMedia(e, o.contentWidth(o.width)),
                          o.setNarrow().then(function () {
                            o.layout(function () {
                              o.completeDeferred.resolve(
                                o.sandbox.element()
                              );
                            });
                          });
                        }),
                        i(e, this.baseScribeData(), this.partner),
                        e)
                      : void 0
                  );
                },
                render() {
                  let t = this,
                    e = '',
                    n = this.tweetId;
                  return n
                    ? (this.hideCard && (e += 'c'),
                      this.hideThread && (e += 't'),
                      e && (n += `-${e}`),
                      this.rendered().then(function (e) {
                        const n = t.srcEl;
                        n &&
                            n.parentNode &&
                            t.layout(function () {
                              n && n.parentNode && n.parentNode.removeChild(n);
                            }),
                        t.align == 'center'
                          ? e.style({
                            margin: '7px auto',
                            cssFloat: 'none'
                          })
                          : t.align &&
                                (t.width == t.dimensions.DEFAULT_WIDTH &&
                                  (t.predefinedWidth = t.width =
                                    t.dimensions.NARROW_WIDTH),
                                  e.style({ cssFloat: t.align })),
                        t.sandbox
                          .resizeToContent()
                          .then(function (e) {
                            return (
                              (t.height = e),
                              l.doLayoutAsync(),
                              t.sandbox.resizeToContent().then(function (e) {
                                t.height = e;
                              })
                            );
                          })
                          .then(function () {
                            e.onresize(t.handleResize.bind(t));
                          }),
                        e.style({
                          position: 'static',
                          visibility: 'visible'
                        }),
                        l.doLayoutAsync();
                      }),
                      o(
                        n,
                        this.lang,
                        function (e) {
                          t.ready().then(function () {
                            (t.element = t.create(e)),
                            t.readTimestampTranslations(),
                            t.updateTimeStamps(),
                            t.bindIntentHandlers(),
                            t.bindUIHandlers(),
                            t.bindPermalinkHandler(),
                            l.doLayoutAsync();
                          });
                        },
                        function () {
                          r(t.tweetId, t.partner),
                          t.completeDeferred.resolve(t.srcEl);
                        }
                      ),
                      R.push(this.completed()),
                      this.completed().then(
                        this.scribePerformance.bind(this)
                      ),
                      this.completed())
                    : (this.completeDeferred.resolve(this.srcEl),
                      this.completed());
                },
                bindPermalinkHandler() {
                  const t = this;
                  D.delegate(this.element, 'click', 'A', function (t) {
                    D.stopPropagation(t);
                  }),
                  D.delegate(
                    this.element,
                    'click',
                    '.twitter-tweet',
                    function (e) {
                      const n = t.getTweetElement();
                      u.getSelectedText(t.sandbox._win) ||
                            (t.openPermalink(n),
                              t.scribePermalinkClick(n, e),
                              D.stopPropagation(e));
                    }
                  );
                },
                scribePermalinkClick(t, e) {
                  const n = this.createScribeData(t);
                  N.interaction(e, n, !1);
                },
                getTweetElement(t) {
                  let e;
                  return (
                    (t = t || this.element),
                    t
                      ? ((e = t.querySelectorAll('blockquote.tweet')),
                        e[e.length - 1])
                      : void 0
                  );
                },
                extractPermalinkUrl(t) {
                  const e = t && t.cite;
                  return b.isStatus(e) && e;
                },
                openPermalink(t) {
                  const e = this.extractPermalinkUrl(t);
                  e && c.open(e);
                },
                scribePerformance() {
                  g.endAndTrack(
                    'render',
                    'widgets-js-load',
                    'tweet',
                    this.baseScribeData()
                  );
                },
                addUrlParams(t) {
                  let e = this,
                    n = {
                      related: this.related,
                      partner: this.partner,
                      original_referer: x.rootDocumentLocation(),
                      tw_p: C
                    };
                  return (
                    (this.addUrlParams = f(n, function (t) {
                      const n = m.closest('.tweet', t, e.element);
                      return { tw_i: n.getAttribute('data-tweet-id') };
                    })),
                    this.addUrlParams(t)
                  );
                },
                baseScribeData() {
                  return {
                    widget_origin: x.rootDocumentLocation(),
                    widget_frame: x.isFramed() && x.currentDocumentLocation(),
                    message: this.partner
                  };
                },
                handleResize(t) {
                  const e = this;
                  t != this.width &&
                      ((this.width = t),
                        this.setNarrow(),
                        this.constrainMedia(this.element, this.contentWidth(t)),
                        this.collapseRegions(),
                        this.sandbox.resizeToContent().then(function (t) {
                          (e.height = t),
                          S.get('events').trigger('resize', {
                            target: e.sandbox.element()
                          });
                        }),
                        l.doLayoutAsync());
                },
                readTimestampTranslations() {
                  let t = this.element,
                    e = 'data-dt-',
                    n = t.getAttribute(`${e}months`) || '';
                  this.datetime = new h(
                    w.compact({
                      phrases: {
                        AM: t.getAttribute(`${e}am`),
                        PM: t.getAttribute(`${e}pm`)
                      },
                      months: n.split('|'),
                      formats: { full: t.getAttribute(`${e}full`) }
                    })
                  );
                },
                updateTimeStamps() {
                  let t = this.element.querySelector('.long-permalink'),
                    e = t.getAttribute('data-datetime'),
                    n = e && this.datetime.localTimeStamp(e),
                    i = t.getElementsByTagName('TIME')[0];
                  n &&
                      (this.layout(function () {
                        return i && i.innerHTML
                          ? void (i.innerHTML = n)
                          : void (t.innerHTML = n);
                      }, 'Update Timestamp'),
                        l.doLayoutAsync());
                }
              }),
              (s.fetchAndRender = function () {
                function t(t) {
                  w.forIn(t, function (t, e) {
                    const n = i[t];
                    n.forEach(function (t) {
                      t.s && t.s.call(this, e);
                    }),
                    delete i[t];
                  }),
                  l.doLayout(),
                  w.forIn(i, function (t, e) {
                    e.forEach(function (e) {
                      e.f && e.f.call(this, t);
                    });
                  }),
                  l.doLayout();
                }
                var e,
                  n,
                  i = P,
                  r = [];
                if (((P = {}), i.keys)) r = i.keys();
                else for (e in i) i.hasOwnProperty(e) && r.push(e);
                r.length &&
                    (A.init(),
                      (n = i[r[0]][0].lang),
                      y.always(_.tweets({ ids: r.sort(), lang: n }), t),
                      v.all(R).then(function () {
                        A.flush();
                      }),
                      (R = []));
              }),
              l.afterLoad(s.fetchAndRender),
              (e.exports = s);
            },
            {
              10: 10,
              15: 15,
              20: 20,
              25: 25,
              3: 3,
              33: 33,
              34: 34,
              35: 35,
              41: 41,
              43: 43,
              44: 44,
              46: 46,
              50: 50,
              56: 56,
              57: 57,
              69: 69,
              7: 7,
              70: 70,
              73: 73,
              77: 77,
              8: 8,
              81: 81,
              9: 9
            }
          ],
          48: [
            function (t, e, n) {
              function i(t) {
                if (t) {
                  let e,
                    n,
                    i,
                    r;
                  s.apply(this, [t]),
                  (e = this.params()),
                  (n = e.size || this.dataAttr('size')),
                  (i = e.showScreenName || this.dataAttr('show-screen-name')),
                  (r = e.count || this.dataAttr('count')),
                  this.classAttr.push('twitter-follow-button'),
                  (this.showScreenName = i != 'false'),
                  (this.showCount = !(
                    e.showCount === !1 ||
                      this.dataAttr('show-count') == 'false'
                  )),
                  r == 'none' && (this.showCount = !1),
                  (this.explicitWidth =
                      e.width || this.dataAttr('width') || ''),
                  (this.screenName =
                      e.screen_name ||
                      e.screenName ||
                      a.screenName(this.attr('href'))),
                  (this.preview =
                      e.preview || this.dataAttr('preview') || ''),
                  (this.align = e.align || this.dataAttr('align') || ''),
                  (this.size = n == 'large' ? 'l' : 'm');
                }
              }
              var r = t(59),
                o = t(77),
                s = t(46),
                a = t(73),
                c = t(69);
              (i.prototype = new s()),
              o.aug(i.prototype, {
                iframeSource:
                    'widgets/follow_button.0b0ceee8fa9e1bde648efd58520a750f.{{lang}}.html',
                widgetUrlParams() {
                  return o.compact({
                    screen_name: this.screenName,
                    lang: this.lang,
                    show_count: this.showCount,
                    show_screen_name: this.showScreenName,
                    align: this.align,
                    id: this.id,
                    preview: this.preview,
                    size: this.size,
                    partner: this.partner,
                    dnt: r.enabled(),
                    _: +new Date()
                  });
                },
                render() {
                  if (!this.screenName) {
                    return c.reject('Missing Screen Name');
                  }
                  let t = this,
                    e = this.makeIframeSource(),
                    n = this.create(e, {
                      title: 'Twitter Follow Button'
                    }).then(function (e) {
                      return (t.element = e);
                    });
                  return n;
                }
              }),
              (e.exports = i);
            },
            { 46: 46, 59: 59, 69: 69, 73: 73, 77: 77 }
          ],
          49: [
            function (t, e, n) {
              function i(t) {
                p.open(t);
              }
              function r(e, n) {
                const i = t(38);
                i.openIntent(e, n);
              }
              function o(t, e) {
                if (f.isTwitterURL(t)) {
                  if (g.get('eventsHub') && e) {
                    const n = new s(c.generateId(), e);
                    c.add(n),
                    r(t, e),
                    m.get('events').trigger('click', {
                      target: e,
                      region: 'intent',
                      type: 'click',
                      data: {}
                    });
                  } else i(t);
                }
              }
              function s(t, e) {
                (this.id = t), (this.element = this.srcEl = e);
              }
              function a(t) {
                (this.srcEl = []), (this.element = t);
              }
              var c,
                u = t(12),
                l = t(46),
                d = t(77),
                h = t(69),
                f = t(73),
                p = t(24),
                m = t(20),
                g = t(19);
              (a.prototype = new l()),
              d.aug(a.prototype, {
                render() {
                  return (c = this), h.resolve(u.body);
                }
              }),
              (a.open = o),
              (e.exports = a);
            },
            {
              12: 12,
              19: 19,
              20: 20,
              24: 24,
              38: 38,
              46: 46,
              69: 69,
              73: 73,
              77: 77
            }
          ],
          50: [
            function (t, e, n) {
              function i() {
                (s =
                  r.VALID_COLOR.test(h.val('widgets:link-color')) && RegExp.$1),
                (c =
                    r.VALID_COLOR.test(h.val('widgets:border-color')) &&
                    RegExp.$1),
                (a = h.val('widgets:theme'));
              }
              function r(t) {
                if (t) {
                  let e,
                    n = this;
                  (this.readyDeferred = new E()),
                  (this.renderedDeferred = new E()),
                  l.apply(this, [t]),
                  (e = this.params()),
                  (this.targetEl =
                      (this.srcEl && this.srcEl.parentNode) ||
                      e.targetEl ||
                      u.body),
                  (this.predefinedWidth =
                      r.VALID_UNIT.test(e.width || this.attr('width')) &&
                      RegExp.$1),
                  this.layout(function () {
                    return (n.containerWidth = w.effectiveWidth(n.targetEl));
                  }).then(function (t) {
                    const i =
                        n.predefinedWidth || t || n.dimensions.DEFAULT_WIDTH;
                    (n.height =
                        r.VALID_UNIT.test(e.height || n.attr('height')) &&
                        RegExp.$1),
                    (n.width = Math.max(
                      n.dimensions.MIN_WIDTH,
                      Math.min(i, n.dimensions.DEFAULT_WIDTH)
                    ));
                  }),
                  r.VALID_COLOR.test(
                    e.linkColor || this.dataAttr('link-color')
                  )
                    ? (this.linkColor = RegExp.$1)
                    : (this.linkColor = s),
                  r.VALID_COLOR.test(
                    e.borderColor || this.dataAttr('border-color')
                  )
                    ? (this.borderColor = RegExp.$1)
                    : (this.borderColor = c),
                  (this.theme = e.theme || this.attr('data-theme') || a),
                  (this.theme = /(dark|light)/.test(this.theme)
                    ? this.theme
                    : ''),
                  this.classAttr.push(A.touch() ? 'is-touch' : 'not-touch'),
                  A.ie9() && this.classAttr.push('ie9'),
                  (this.sandboxCreated = b
                    .createSandbox(
                      {
                        class: this.renderedClassNames,
                        id: this.id,
                        allowfullscreen: ''
                      },
                      { position: 'absolute', visibility: 'hidden' },
                      function (t) {
                        n.modifyFrame && (t = n.modifyFrame(t)),
                        n.srcEl
                          ? n.targetEl.insertBefore(t, n.srcEl)
                          : n.targetEl.appendChild(t);
                      },
                      this.layout
                    )
                    .then(function (t) {
                      n.setupSandbox(t), new m(t.element().contentWindow);
                    })),
                  this.rendered().then(function (t) {
                    n.applyVisibleSandboxStyles(t);
                  });
                }
              }
              function o(t, e) {
                return t + e;
              }
              var s,
                a,
                c,
                u = t(12),
                l = t(46),
                d = t(49),
                h = t(18),
                f = t(43),
                p = t(35),
                m = t(83),
                g = t(7),
                v = t(9),
                y = t(8),
                w = t(11),
                b = t(31),
                _ = t(54),
                E = t(68),
                A = t(60),
                T = t(69),
                x = t(73),
                I = t(74),
                S = t(77),
                D = t(70),
                N = [
                  '.timeline-header h1.summary',
                  '.timeline-header h1.summary a:link',
                  '.timeline-header h1.summary a:visited'
                ],
                C = { TWEET: 0, RETWEET: 10 };
              (r.prototype = new l()),
              S.aug(r.prototype, {
                dimensions: {},
                linkColorSelectors: [
                  '.customisable',
                  '.customisable:link',
                  '.customisable:visited'
                ],
                linkStateColorSelectors: [
                  '.customisable:hover',
                  '.customisable:focus',
                  '.customisable:active',
                  '.customisable-highlight:hover',
                  '.customisable-highlight:focus',
                  'a:hover .customisable-highlight',
                  'a:focus .customisable-highlight'
                ],
                bgColorSelectors: ['a:hover .ic-mask', 'a:focus .ic-mask'],
                borderColorSelectors: ['.customisable-border'],
                styleSheetUrl() {
                  throw new Error('must set styleSheetUrl');
                },
                onStyleSheetLoad() {},
                setupSandbox(t) {
                  let e,
                    n,
                    i = this;
                  (this.sandbox = t),
                  A.ios() && g.add(this.sandbox.root, 'env-ios'),
                  (e = this.styleSheetUrl(this.lang, this.theme)),
                  (n = this.onStyleSheetLoad.bind(this)),
                  D.some([
                    i.applyInitialSandboxStyles(t),
                    t.appendCss('.SandboxRoot { display:none }'),
                    t.setBaseTarget('_blank'),
                    t.appendStyleSheet(e, n)
                  ]).then(function () {
                    i.readyDeferred.resolve(t);
                  });
                },
                ready() {
                  return this.readyDeferred.promise;
                },
                rendered() {
                  return this.renderedDeferred.promise;
                },
                contentWidth(t) {
                  let e = this.dimensions,
                    n = this.borderless ? 0 : e.BORDERS,
                    i = this.fullBleedPhoto
                      ? 0
                      : this.chromeless && this.narrow
                        ? e.NARROW_MEDIA_PADDING_CL
                        : this.chromeless
                          ? e.WIDE_MEDIA_PADDING_CL
                          : this.narrow
                            ? e.NARROW_MEDIA_PADDING
                            : e.WIDE_MEDIA_PADDING;
                  return (t || this.width) - (i + n);
                },
                applyInitialSandboxStyles(t) {
                  const e = this;
                  return t.style(
                    {
                      border: 'none',
                      maxWidth: '100%',
                      minWidth: `${e.dimensions.MIN_WIDTH}px`,
                      margin: e.dimensions.MARGIN,
                      padding: '0',
                      display: 'block',
                      position: 'absolute',
                      visibility: 'hidden'
                    },
                    !0
                  );
                },
                applyVisibleSandboxStyles(t) {
                  return t.style({
                    position: 'static',
                    visibility: 'visible'
                  });
                },
                addSiteStylesPrefix(t) {
                  return (this.theme == 'dark' ? '.thm-dark ' : '') + t;
                },
                addSiteStyles() {
                  let t = [],
                    e = this.addSiteStylesPrefix.bind(this);
                  return (
                    this.headingStyle &&
                        t.push(`${N.map(e).join(',')}{${this.headingStyle}}`),
                    this.linkColor &&
                        (t.push(
                          `${this.linkColorSelectors.map(e).join(',')}{color:${
                            this.linkColor
                          }}`
                        ),
                          t.push(
                            `${this.bgColorSelectors
                              .map(e)
                              .join(',')}{background-color:${this.linkColor}}`
                          ),
                          t.push(
                            `${this.linkStateColorSelectors
                              .map(e)
                              .join(',')}{color:${_.lighten(
                              this.linkColor,
                              0.2
                            )}}`
                          )),
                    this.borderColor &&
                        t.push(
                          `${this.borderColorSelectors
                            .map(e)
                            .concat(
                              this.theme == 'dark'
                                ? ['.thm-dark.customisable-border']
                                : []
                            )
                            .join(',')}{border-color:${this.borderColor}}`
                        ),
                    t.length ? this.sandbox.appendCss(t.join('')) : void 0
                  );
                },
                setNarrow() {
                  let t = this,
                    e = this.narrow;
                  return (
                    (this.narrow = this.width < this.dimensions.NARROW_WIDTH),
                    e != this.narrow
                      ? this.layout(function () {
                        g.toggle(t.sandbox.root, 'env-narrow', t.narrow),
                        g.toggle(t.element, 'var-narrow', t.narrow);
                      })
                      : T.resolve(this.narrow)
                  );
                },
                createScribeData(t) {
                  const e = S.aug({}, this.baseScribeData(), {
                    item_ids: [],
                    item_details: this.extractTweetScribeDetails(t)
                  });
                  return (
                    S.forIn(e.item_details, function (t) {
                      e.item_ids.push(t);
                    }),
                    e
                  );
                },
                bindUIHandlers() {
                  const t = this.element;
                  y.delegate(
                    t,
                    'click',
                    '.MediaCard-dismissNsfw',
                    function () {
                      const e = v.closest('.MediaCard', this, t);
                      g.remove(e, 'is-nsfw');
                    }
                  );
                },
                bindIntentHandlers() {
                  function t(t) {
                    let i = v.closest('.tweet', this, n),
                      r = e.createScribeData(i);
                    p.interaction(t, r, !0);
                  }
                  var e = this,
                    n = this.element;
                  y.delegate(n, 'click', 'A', t),
                  y.delegate(n, 'click', 'BUTTON', t),
                  y.delegate(n, 'click', '.profile', function () {
                    e.addUrlParams(this);
                  }),
                  y.delegate(n, 'click', '.follow-button', function (t) {
                    let n;
                    t.altKey ||
                          t.metaKey ||
                          t.shiftKey ||
                          A.ios() ||
                          A.android() ||
                          I.asBoolean(this.getAttribute('data-age-gate')) ||
                          ((n = x.intentForFollowURL(this.href, !0)),
                            n &&
                            (d.open(n, e.sandbox.element()),
                              y.preventDefault(t)));
                  }),
                  y.delegate(n, 'click', '.web-intent', function (t) {
                    e.addUrlParams(this),
                    t.altKey ||
                            t.metaKey ||
                            t.shiftKey ||
                            (d.open(this.href, e.sandbox.element()),
                              y.preventDefault(t));
                  });
                },
                baseScribeData() {
                  return {};
                },
                extractTweetScribeDetails(t) {
                  let e,
                    n,
                    i = {};
                  return t
                    ? ((e = t.getAttribute('data-tweet-id')),
                      (n = t.getAttribute('data-rendered-tweet-id') || e),
                      n == e
                        ? (i[n] = { item_type: C.TWEET })
                        : e &&
                            (i[n] = {
                              item_type: C.RETWEET,
                              target_type: C.TWEET,
                              target_id: e
                            }),
                      i)
                    : i;
                },
                constrainMedia(t, e) {
                  return f.constrainMedia(
                    t || this.element,
                    e || this.contentWidth(),
                    this.dimensions.maxHeight,
                    this.layout
                  );
                },
                collapseRegions() {
                  const t = this;
                  S.toRealArray(
                    this.element.querySelectorAll('.collapsible-container')
                  ).forEach(function (e) {
                    let n,
                      i,
                      r = S.toRealArray(e.children),
                      s = r.length && e.offsetWidth,
                      a =
                          r.length &&
                          r.map(function (t) {
                            return t.offsetWidth;
                          }),
                      c = r.length;
                    if (r.length) {
                      for (; c > 0;) {
                        if ((c--, (n = a.reduce(o, 0)), !s || !n)) return;
                        if (s > n) return;
                        (i = r[c].getAttribute('data-collapsed-class')),
                        i &&
                              (g.add(t.element, i), (a[c] = r[c].offsetWidth));
                      }
                    }
                  });
                }
              }),
              (r.VALID_UNIT = /^([0-9]+)( ?px)?$/),
              (r.VALID_COLOR = /^(#(?:[0-9a-f]{3}|[0-9a-f]{6}))$/i),
              i(),
              (e.exports = r);
            },
            {
              11: 11,
              12: 12,
              18: 18,
              31: 31,
              35: 35,
              43: 43,
              46: 46,
              49: 49,
              54: 54,
              60: 60,
              68: 68,
              69: 69,
              7: 7,
              70: 70,
              73: 73,
              74: 74,
              77: 77,
              8: 8,
              83: 83,
              9: 9
            }
          ],
          51: [
            function (t, e, n) {
              function i(t) {
                if (t) {
                  let e,
                    n,
                    i,
                    r,
                    o,
                    s,
                    c,
                    u;
                  a.apply(this, [t]),
                  (e = this.params()),
                  (n = (e.chrome || this.dataAttr('chrome') || '').split(
                    ' '
                  )),
                  (this.preview = e.previewParams),
                  (this.widgetId = e.widgetId || this.dataAttr('widget-id')),
                  (this.instanceId = ++z),
                  (this.cursors = { maxPosition: 0, minPosition: 0 }),
                  (r = e.screenName || this.dataAttr('screen-name')) ||
                    (o = e.userId || this.dataAttr('user-id'))
                    ? (this.override = {
                      overrideType: 'user',
                      overrideId: o,
                      overrideName: r,
                      withReplies: y.asBoolean(
                        e.showReplies || this.dataAttr('show-replies')
                      )
                        ? 'true'
                        : 'false'
                    })
                    : (r =
                          e.favoritesScreenName ||
                          this.dataAttr('favorites-screen-name')) ||
                        (o =
                          e.favoritesUserId ||
                          this.dataAttr('favorites-user-id'))
                      ? (this.override = {
                        overrideType: 'favorites',
                        overrideId: o,
                        overrideName: r
                      })
                      : ((r =
                          e.listOwnerScreenName ||
                          this.dataAttr('list-owner-screen-name')) ||
                          (o =
                            e.listOwnerId || this.dataAttr('list-owner-id'))) &&
                        ((s = e.listId || this.dataAttr('list-id')) ||
                          (c = e.listSlug || this.dataAttr('list-slug')))
                        ? (this.override = {
                          overrideType: 'list',
                          overrideOwnerId: o,
                          overrideOwnerName: r,
                          overrideId: s,
                          overrideName: c
                        })
                        : (u =
                          e.customTimelineId ||
                          this.dataAttr('custom-timeline-id'))
                          ? (this.override = {
                            overrideType: 'custom',
                            overrideId: u
                          })
                          : (this.override = {}),
                  (this.tweetLimit = y.asInt(
                    e.tweetLimit || this.dataAttr('tweet-limit')
                  )),
                  (this.staticTimeline = this.tweetLimit > 0),
                  n.length &&
                      ((i = w.contains(n, 'none')),
                        (this.chromeless = i || w.contains(n, 'transparent')),
                        (this.headerless = i || w.contains(n, 'noheader')),
                        (this.footerless = i || w.contains(n, 'nofooter')),
                        (this.borderless = i || w.contains(n, 'noborders')),
                        (this.noscrollbar = w.contains(n, 'noscrollbar'))),
                  (this.headingStyle = g.sanitize(
                    e.headingStyle || this.dataAttr('heading-style'),
                    void 0,
                    !0
                  )),
                  this.classAttr.push('twitter-timeline-rendered'),
                  (this.ariaPolite =
                      e.ariaPolite || this.dataAttr('aria-polite'));
                }
              }
              var r = t(15),
                o = t(3),
                s = t(46),
                a = t(50),
                c = t(56),
                u = t(2),
                l = t(25),
                d = t(41),
                h = t(43),
                f = t(33),
                p = t(34),
                m = t(44),
                g = t(55),
                v = t(60),
                y = t(74),
                w = t(77),
                b = t(8),
                _ = t(7),
                E = t(9),
                A = t(59),
                T = t(57),
                x = t(20),
                I = t(19),
                S = { CLIENT_SIDE_USER: 0, CLIENT_SIDE_APP: 2 },
                D = '.timeline',
                N = '.new-tweets-bar',
                C = '.timeline-header',
                P = '.timeline-footer',
                R = '.stream',
                L = '.h-feed',
                k = '.tweet',
                M = '.detail-expander',
                O = '.expand',
                H = '.permalink',
                W = '.no-more-pane',
                U = 'expanded',
                j = 'pending-scroll-in',
                q = 'pending-new-tweet-display',
                F = 'pending-new-tweet',
                z = 0;
              (i.prototype = new a()),
              w.aug(i.prototype, {
                renderedClassNames:
                    'twitter-timeline twitter-timeline-rendered',
                dimensions: {
                  DEFAULT_HEIGHT: '600',
                  DEFAULT_WIDTH: '520',
                  NARROW_WIDTH: '320',
                  maxHeight: '375',
                  MIN_WIDTH: '180',
                  MIN_HEIGHT: '200',
                  MARGIN: '0',
                  WIDE_MEDIA_PADDING: 81,
                  NARROW_MEDIA_PADDING: 16,
                  WIDE_MEDIA_PADDING_CL: 60,
                  NARROW_MEDIA_PADDING_CL: 12,
                  BORDERS: 2
                },
                styleSheetUrl: o.timeline,
                create(t) {
                  let e,
                    n,
                    i,
                    r,
                    o = this,
                    s = this.sandbox.createElement('div'),
                    a = [];
                  return (
                    (s.innerHTML = t.body),
                    (e = s.children[0] || !1)
                      ? (this.reconfigure(t.config),
                        this.discardStaticOverflow(e),
                        this.sandbox.setTitle(
                          e.getAttribute('data-iframe-title') || 'Timeline'
                        ),
                        h.retinize(e),
                        this.constrainMedia(e),
                        (this.searchQuery = e.getAttribute(
                          'data-search-query'
                        )),
                        (this.profileId = e.getAttribute('data-profile-id')),
                        (this.timelineType = e.getAttribute(
                          'data-timeline-type'
                        )),
                        (r = this.getTweetDetails(s.querySelector(L))),
                        w.forIn(r, function (t) {
                          a.push(t);
                        }),
                        (i = this.baseScribeData()),
                        (i.item_ids = a),
                        (i.item_details = r),
                        this.timelineType &&
                            p.clientEvent(
                              {
                                page: `${this.timelineType}_timeline`,
                                component: 'timeline',
                                element: 'initial',
                                action: a.length ? 'results' : 'no_results'
                              },
                              i,
                              !0
                            ),
                        p.clientEvent(
                          {
                            page: 'timeline',
                            component: 'timeline',
                            element: 'initial',
                            action: a.length ? 'results' : 'no_results'
                          },
                          i,
                          !0
                        ),
                        f.scribeTimelineAudienceImpression(),
                        p.flush(),
                        this.ariaPolite == 'assertive' &&
                            ((n = e.querySelector(N)),
                              n.setAttribute('aria-polite', 'assertive')),
                        (e.id = this.id),
                        (e.className += ` ${this.classAttr.join(' ')}`),
                        (e.lang = this.lang),
                        this.ready().then(function (t) {
                          t.appendChild(e).then(function () {
                            o.renderedDeferred.resolve(o.sandbox);
                          }),
                          t.style({ display: 'inline-block' }),
                          o
                            .layout(function () {
                              o.srcEl &&
                                    o.srcEl.parentNode &&
                                    o.srcEl.parentNode.removeChild(o.srcEl),
                              (o.predefinedWidth = o.width),
                              (o.predefinedHeight = o.height),
                              (o.width = t.width(o.width)),
                              (o.height = t.height(o.height));
                            })
                            .then(function () {
                              o.setNarrow(),
                              o.sandbox.onresize(o.handleResize.bind(o)),
                              o.completeDeferred.resolve(
                                o.sandbox.element()
                              );
                            });
                        }),
                        e)
                      : void 0
                  );
                },
                render() {
                  const t = this;
                  return this.preview || this.widgetId
                    ? (this.rendered().then(
                      this.staticTimeline
                        ? function (t) {
                          t.resizeToContent(), s.doLayoutAsync();
                        }
                        : function () {
                          t.recalculateStreamHeight(), s.doLayoutAsync();
                        }
                    ),
                      this.preview
                        ? this.getPreviewTimeline()
                        : this.getTimeline(),
                      this.completed().then(
                        this.scribePerformance.bind(this)
                      ),
                      this.completed())
                    : (this.completeDeferred.reject(400), this.completed());
                },
                scribePerformance() {
                  l.endAndTrack(
                    'render',
                    'widgets-js-load',
                    'timeline',
                    this.baseScribeData()
                  );
                },
                getPreviewTimeline() {
                  function t(t) {
                    n.ready().then(function () {
                      (n.element = n.create(t)),
                      n.readTranslations(),
                      n.bindInteractions(),
                      n.updateCursors(t.headers, { initial: !0 }),
                      s.doLayoutAsync();
                    });
                  }
                  function e(t) {
                    return t && t.headers
                      ? void n.completeDeferred.reject(t.headers.status)
                      : void n.completeDeferred.resolve(n.srcEl);
                  }
                  var n = this;
                  d.timelinePreview({ params: this.preview }).then(t, e);
                },
                getTimeline() {
                  function t(t) {
                    n.ready().then(function () {
                      (n.element = n.create(t)),
                      n.readTranslations(),
                      n.bindInteractions(),
                      n.updateTimeStamps(),
                      n.updateCursors(t.headers, { initial: !0 }),
                      t.headers.xPolling &&
                            /\d/.test(t.headers.xPolling) &&
                            (n.pollInterval = 1e3 * t.headers.xPolling),
                      n.staticTimeline || n.schedulePolling(),
                      s.doLayoutAsync();
                    });
                  }
                  function e(t) {
                    return t && t.headers
                      ? void n.completeDeferred.reject(t.headers.status)
                      : void n.completeDeferred.resolve(n.srcEl);
                  }
                  var n = this;
                  p.init(),
                  d
                    .timeline(
                      w.aug(
                        {
                          id: this.widgetId,
                          instanceId: this.instanceId,
                          dnt: A.enabled(),
                          lang: this.lang
                        },
                        this.override
                      )
                    )
                    .then(t, e);
                },
                reconfigure(t) {
                  (this.lang = t.lang),
                  this.theme || (this.theme = t.theme),
                  this.theme == 'dark' && this.classAttr.push('thm-dark'),
                  this.chromeless && this.classAttr.push('var-chromeless'),
                  this.borderless && this.classAttr.push('var-borderless'),
                  this.headerless && this.classAttr.push('var-headerless'),
                  this.footerless && this.classAttr.push('var-footerless'),
                  this.staticTimeline && this.classAttr.push('var-static'),
                  !this.linkColor &&
                        t.linkColor &&
                        a.VALID_COLOR.test(t.linkColor) &&
                        (this.linkColor = RegExp.$1),
                  !this.height &&
                        a.VALID_UNIT.test(t.height) &&
                        (this.height = RegExp.$1),
                  (this.height = Math.max(
                    this.dimensions.MIN_HEIGHT,
                    this.height
                      ? this.height
                      : this.dimensions.DEFAULT_HEIGHT
                  )),
                  this.preview && this.classAttr.push('var-preview'),
                  (this.narrow =
                        this.width <= this.dimensions.NARROW_WIDTH),
                  this.narrow && this.classAttr.push('var-narrow'),
                  this.addSiteStyles();
                },
                getTweetDetails(t) {
                  let e,
                    n = this,
                    i = {};
                  return (
                    (e = (t && t.children) || []),
                    w.toRealArray(e).forEach(function (t) {
                      w.aug(i, n.extractTweetScribeDetails(t));
                    }),
                    i
                  );
                },
                baseScribeData() {
                  return {
                    widget_id: this.widgetId,
                    widget_origin: T.rootDocumentLocation(),
                    widget_frame: T.isFramed() && T.currentDocumentLocation(),
                    message: this.partner,
                    query: this.searchQuery,
                    profile_id: this.profileId
                  };
                },
                bindInteractions() {
                  let t = this,
                    e = this.element,
                    n = !0;
                  this.bindIntentHandlers(),
                  this.bindUIHandlers(),
                  b.delegate(e, 'click', '.load-tweets', function (e) {
                    n && ((n = !1), t.forceLoad(), b.stop(e));
                  }),
                  b.delegate(
                    e,
                    'click',
                    '.display-sensitive-image',
                    function (n) {
                      t.showNSFW(E.closest(k, this, e)), b.stop(n);
                    }
                  ),
                  b.delegate(e, 'mouseover', D, function () {
                    t.mouseOver = !0;
                  }),
                  b.delegate(e, 'mouseout', D, function () {
                    t.mouseOver = !1;
                  }),
                  b.delegate(e, 'mouseover', N, function () {
                    t.mouseOverNotifier = !0;
                  }),
                  b.delegate(e, 'mouseout', N, function () {
                    (t.mouseOverNotifier = !1),
                    r.setTimeout(function () {
                      t.hideNewTweetNotifier();
                    }, 3e3);
                  }),
                  this.staticTimeline ||
                        (b.delegate(e, 'click', O, function (n) {
                          n.altKey ||
                            n.metaKey ||
                            n.shiftKey ||
                            (t.toggleExpando(E.closest(k, this, e)), b.stop(n));
                        }),
                          b.delegate(e, 'click', 'A', function (t) {
                            b.stopPropagation(t);
                          }),
                          b.delegate(e, 'click', '.with-expansion', function (e) {
                            t.toggleExpando(this), b.stop(e);
                          }),
                          b.delegate(e, 'click', '.load-more', function () {
                            t.loadMore();
                          }),
                          b.delegate(e, 'click', N, function () {
                            t.scrollToTop(), t.hideNewTweetNotifier(!0);
                          }));
                },
                scrollToTop() {
                  const t = this.element.querySelector(R);
                  (t.scrollTop = 0), t.focus();
                },
                update() {
                  let t = this,
                    e = this.element.querySelector(L),
                    n = e && e.children[0],
                    i = n && n.getAttribute('data-tweet-id');
                  this.updateTimeStamps(),
                  this.requestTweets(i, !0, function (e) {
                    e.childNodes.length > 0 && t.insertNewTweets(e);
                  });
                },
                loadMore() {
                  let t = this,
                    e = w.toRealArray(this.element.querySelectorAll(k)).pop(),
                    n = e && e.getAttribute('data-tweet-id');
                  this.requestTweets(n, !1, function (e) {
                    let i = t.element.querySelector(W),
                      r = e.childNodes[0];
                    return (
                      (i.style.cssText = ''),
                      r &&
                          r.getAttribute('data-tweet-id') == n &&
                          e.removeChild(r),
                      e.childNodes.length > 0
                        ? void t.appendTweets(e)
                        : (_.add(t.element, 'no-more'), void i.focus())
                    );
                  });
                },
                forceLoad() {
                  let t = this,
                    e = !!this.element.querySelectorAll(L).length;
                  this.requestTweets(1, !0, function (n) {
                    n.childNodes.length &&
                        (t[e ? 'insertNewTweets' : 'appendTweets'](n),
                          _.add(t.element, 'has-tweets'));
                  });
                },
                schedulePolling(t) {
                  const e = this;
                  this.pollInterval !== null &&
                      ((t =
                        I.get('timeline.pollInterval') ||
                        t ||
                        this.pollInterval ||
                        1e4),
                        t > -1 &&
                        r.setTimeout(function () {
                          e.isUpdating || e.update(), e.schedulePolling();
                        }, t));
                },
                updateCursors(t, e) {
                  (e || {}).initial
                    ? ((this.cursors.maxPosition = t.maxPosition),
                      (this.cursors.minPosition = t.minPosition))
                    : (e || {}).newer
                      ? (this.cursors.maxPosition =
                          t.maxPosition || this.cursors.maxPosition)
                      : (this.cursors.minPosition =
                          t.minPosition || this.cursors.minPosition);
                },
                requestTweets(t, e, n) {
                  function i(t) {
                    if (((o.isUpdating = !1), t && t.headers)) {
                      if (t.headers.status == '404') {
                        return void (o.pollInterval = null);
                      }
                      if (t.headers.status == '503') {
                        return void (o.pollInterval *= 1.5);
                      }
                    }
                  }
                  function r(t) {
                    let i,
                      r,
                      s = o.sandbox.createDocumentFragment(),
                      a = o.sandbox.createElement('ol'),
                      c = [];
                    if (
                      ((o.isUpdating = !1),
                        o.updateCursors(t.headers, { newer: e }),
                        t &&
                          t.headers &&
                          t.headers.xPolling &&
                          /\d+/.test(t.headers.xPolling) &&
                          (o.pollInterval = 1e3 * t.headers.xPolling),
                        t && void 0 !== t.body)
                    ) {
                      if (
                        ((a.innerHTML = t.body),
                          a.children[0] && a.children[0].tagName != 'LI')
                      ) {
                        return;
                      }
                      for (
                        r = o.getTweetDetails(a),
                        w.forIn(r, function (t) {
                          c.push(t);
                        }),
                        c.length &&
                              ((i = o.baseScribeData()),
                                (i.item_ids = c),
                                (i.item_details = r),
                                (i.event_initiator = e
                                  ? S.CLIENT_SIDE_APP
                                  : S.CLIENT_SIDE_USER),
                                o.timelineType &&
                                p.clientEvent(
                                  {
                                    page: `${o.timelineType}_timeline`,
                                    component: 'timeline',
                                    element: 'initial',
                                    action: c.length ? 'results' : 'no_results'
                                  },
                                  i,
                                  !0
                                ),
                                p.clientEvent(
                                  {
                                    page: 'timeline',
                                    component: 'timeline',
                                    element: e ? 'newer' : 'older',
                                    action: 'results'
                                  },
                                  i,
                                  !0
                                ),
                                p.flush()),
                        h.retinize(a),
                        o.constrainMedia(a);
                        a.children[0];

                      ) {
                        s.appendChild(a.children[0]);
                      }
                      n(s);
                    }
                  }
                  var o = this,
                    s = {
                      id: this.widgetId,
                      instanceId: this.instanceId,
                      screenName: this.widgetScreenName,
                      userId: this.widgetUserId,
                      withReplies: this.widgetShowReplies,
                      dnt: A.enabled(),
                      lang: this.lang
                    };
                  e && this.cursors.maxPosition
                    ? (s.minPosition = this.cursors.maxPosition)
                    : !e && this.cursors.minPosition
                      ? (s.maxPosition = this.cursors.minPosition)
                      : e
                        ? (s.sinceId = t)
                        : (s.maxId = t),
                  d.timelinePoll(w.aug(s, this.override)).then(r, i);
                },
                insertNewTweets(t) {
                  let e,
                    n = this,
                    i = this.element.querySelector(R),
                    o = i.querySelector(L),
                    s = o.offsetHeight;
                  return (
                    o.insertBefore(t, o.firstChild),
                    (e = o.offsetHeight - s),
                    x.get('events').trigger('timelineUpdated', {
                      target: this.sandbox.element(),
                      region: 'newer'
                    }),
                    i.scrollTop > 40 || this.mouseIsOver()
                      ? ((i.scrollTop += e),
                        this.updateTimeStamps(),
                        void this.showNewTweetNotifier())
                      : (_.remove(this.element, j),
                        (o.style.cssText = `margin-top: -${e}px`),
                        r.setTimeout(function () {
                          (i.scrollTop = 0),
                          _.add(n.element, j),
                          v.cssTransitions()
                            ? (o.style.cssText = '')
                            : u.animate(
                              function (t) {
                                e > t
                                  ? (o.style.cssText = `margin-top: -${e -
                                            t}px`)
                                  : (o.style.cssText = '');
                              },
                              e,
                              500,
                              u.easeOut
                            );
                        }, 500),
                        this.updateTimeStamps(),
                        void (
                          this.timelineType != 'custom' && this.gcTweets(50)
                        ))
                  );
                },
                appendTweets(t) {
                  const e = this.element.querySelector(L);
                  e.appendChild(t),
                  this.updateTimeStamps(),
                  x.get('events').trigger('timelineUpdated', {
                    target: this.sandbox.element(),
                    region: 'older'
                  });
                },
                gcTweets(t) {
                  let e,
                    n = this.element.querySelector(L),
                    i = n.children.length;
                  for (t = t || 50; i > t && (e = n.children[i - 1]); i--) {
                    n.removeChild(e);
                  }
                },
                showNewTweetNotifier() {
                  let t = this,
                    e = this.element.querySelector(N),
                    n = e.children[0];
                  (e.style.cssText = ''),
                  e.removeChild(n),
                  e.appendChild(n),
                  _.add(this.element, q),
                  r.setTimeout(function () {
                    _.add(t.element, F);
                  }, 10),
                  (this.newNoticeDisplayTime = +new Date()),
                  r.setTimeout(function () {
                    t.hideNewTweetNotifier();
                  }, 5e3);
                },
                hideNewTweetNotifier(t) {
                  const e = this;
                  (t || !this.mouseOverNotifier) &&
                      (_.remove(this.element, F),
                        r.setTimeout(function () {
                          _.remove(e.element, q);
                        }, 500));
                },
                discardStaticOverflow(t) {
                  let e,
                    n = t.querySelector(L);
                  if (this.staticTimeline) {
                    for (
                      this.height = 0;
                      (e = n.children[this.tweetLimit]);

                    ) {
                      n.removeChild(e);
                    }
                  }
                },
                hideStreamScrollBar() {
                  let t,
                    e = this.element.querySelector(R),
                    n = this.element.querySelector(L);
                  (e.style.width = ''),
                  (t = this.element.offsetWidth - n.offsetWidth),
                  t > 0 &&
                        (e.style.width = `${this.element.offsetWidth + t}px`);
                },
                readTranslations() {
                  let t = this.element,
                    e = 'data-dt-';
                  this.datetime = new c(
                    w.compact({
                      phrases: {
                        now: t.getAttribute(`${e}now`),
                        s: t.getAttribute(`${e}s`),
                        m: t.getAttribute(`${e}m`),
                        h: t.getAttribute(`${e}h`),
                        second: t.getAttribute(`${e}second`),
                        seconds: t.getAttribute(`${e}seconds`),
                        minute: t.getAttribute(`${e}minute`),
                        minutes: t.getAttribute(`${e}minutes`),
                        hour: t.getAttribute(`${e}hour`),
                        hours: t.getAttribute(`${e}hours`)
                      },
                      months: t.getAttribute(`${e}months`).split('|'),
                      formats: {
                        abbr: t.getAttribute(`${e}abbr`),
                        shortdate: t.getAttribute(`${e}short`),
                        longdate: t.getAttribute(`${e}long`)
                      }
                    })
                  );
                },
                updateTimeStamps() {
                  for (
                    var t,
                      e,
                      n,
                      i,
                      r = this.element.querySelectorAll(H),
                      o = 0;
                    (t = r[o]);
                    o++
                  ) {
                    (n = t.getAttribute('data-datetime')),
                    (i = n && this.datetime.timeAgo(n, this.i18n)),
                    (e = t.getElementsByTagName('TIME')[0]),
                    i &&
                          (e && e.innerHTML
                            ? (e.innerHTML = i)
                            : (t.innerHTML = i));
                  }
                },
                mouseIsOver() {
                  return this.mouseOver;
                },
                addUrlParams(t) {
                  let e = this,
                    n = {
                      tw_w: this.widgetId,
                      related: this.related,
                      partner: this.partner,
                      query: this.searchQuery,
                      profile_id: this.profileId,
                      original_referer: T.rootDocumentLocation(),
                      tw_p: 'embeddedtimeline'
                    };
                  return (
                    (this.addUrlParams = m(n, function (t) {
                      const n = E.closest(k, t, e.element);
                      return n && { tw_i: n.getAttribute('data-tweet-id') };
                    })),
                    this.addUrlParams(t)
                  );
                },
                showNSFW(t) {
                  let e,
                    n,
                    i,
                    r,
                    o,
                    s,
                    a = t.querySelector('.nsfw'),
                    c = 0;
                  a &&
                      ((n = h.scaleDimensions(
                        a.getAttribute('data-width'),
                        a.getAttribute('data-height'),
                        this.contentWidth(),
                        a.getAttribute('data-height')
                      )),
                        (e = !!(r = a.getAttribute('data-player'))),
                        e
                          ? (o = this.sandbox.createElement('iframe'))
                          : ((o = this.sandbox.createElement('img')),
                            (r = a.getAttribute(
                              v.retina() ? 'data-image-2x' : 'data-image'
                            )),
                            (o.alt = a.getAttribute('data-alt')),
                            (s = this.sandbox.createElement('a')),
                            (s.href = a.getAttribute('data-href')),
                            s.appendChild(o)),
                        (o.title = a.getAttribute('data-title')),
                        (o.src = r),
                        (o.width = n.width),
                        (o.height = n.height),
                        (i = E.closest(M, a, t)),
                        (c = n.height - a.offsetHeight),
                        a.parentNode.replaceChild(e ? o : s, a),
                        (i.style.cssText = `height:${i.offsetHeight + c}px`));
                },
                toggleExpando(t) {
                  let e,
                    n,
                    i = t.querySelector(M),
                    r = i && i.children[0],
                    o = r && r.getAttribute('data-expanded-media'),
                    a = 0,
                    c = t.querySelector(O),
                    u = c && c.getElementsByTagName('B')[0],
                    l = u && (u.innerText || u.textContent);
                  if (u) {
                    if (
                      (this.layout(function () {
                        (u.innerHTML = c.getAttribute('data-toggled-text')),
                        c.setAttribute('data-toggled-text', l);
                      }),
                        _.present(t, U))
                    ) {
                      return (
                        this.layout(function () {
                          _.remove(t, U);
                        }),
                        i
                          ? (this.layout(function () {
                            (i.style.cssText = ''), (r.innerHTML = '');
                          }),
                            void s.doLayout())
                          : void s.doLayout()
                      );
                    }
                    o &&
                        ((e = this.sandbox.createElement('DIV')),
                          (e.innerHTML = o),
                          h.retinize(e),
                          (a = this.constrainMedia(e)),
                          this.layout(function () {
                            r.appendChild(e);
                          })),
                    i &&
                          this.layout(function () {
                            (n = Math.max(r.offsetHeight, a)),
                            (i.style.cssText = `height:${n}px`);
                          }),
                    this.layout(function () {
                      _.add(t, U);
                    }),
                    s.doLayout();
                  }
                },
                recalculateStreamHeight(t) {
                  let e = this,
                    n = this.element.querySelector(C),
                    i = this.element.querySelector(P),
                    r = this.element.querySelector(R);
                  this.layout(function () {
                    let o = n.offsetHeight + (i ? i.offsetHeight : 0),
                      s = t || e.sandbox.height();
                    (r.style.cssText = `height:${s - o - 2}px`),
                    e.noscrollbar && e.hideStreamScrollBar();
                  });
                },
                handleResize(t, e) {
                  let n = this,
                    i = Math.min(
                      this.dimensions.DEFAULT_WIDTH,
                      Math.max(
                        this.dimensions.MIN_WIDTH,
                        Math.min(
                          this.predefinedWidth ||
                              this.dimensions.DEFAULT_WIDTH,
                          t
                        )
                      )
                    );
                  (i != this.width || e != this.height) &&
                      ((this.width = i),
                        (this.height = e),
                        this.setNarrow(),
                        this.constrainMedia(this.element, this.contentWidth(i)),
                        this.staticTimeline
                          ? this.layout(function () {
                            (n.height = n.element.offsetHeight),
                            n.sandbox.height(n.height),
                            x.get('events').trigger('resize', {
                              target: n.sandbox.element()
                            });
                          })
                          : (this.recalculateStreamHeight(e),
                            x.get('events').trigger('resize', {
                              target: this.sandbox.element()
                            })),
                        s.doLayoutAsync());
                }
              }),
              (e.exports = i);
            },
            {
              15: 15,
              19: 19,
              2: 2,
              20: 20,
              25: 25,
              3: 3,
              33: 33,
              34: 34,
              41: 41,
              43: 43,
              44: 44,
              46: 46,
              50: 50,
              55: 55,
              56: 56,
              57: 57,
              59: 59,
              60: 60,
              7: 7,
              74: 74,
              77: 77,
              8: 8,
              9: 9
            }
          ],
          52: [
            function (t, e, n) {
              function i(t) {
                s.apply(this, [t]);
                let e = this.params(),
                  n = e.count || this.dataAttr('count'),
                  i = e.size || this.dataAttr('size'),
                  r = u.getScreenNameFromPage(),
                  o = `${e.shareWithRetweet ||
                    this.dataAttr('share-with-retweet') ||
                    a.val('share-with-retweet')}`;
                this.classAttr.push('twitter-tweet-button'),
                e.type == 'hashtag' ||
                  c.contains(this.classAttr, 'twitter-hashtag-button')
                  ? ((this.type = 'hashtag'),
                    this.classAttr.push('twitter-hashtag-button'))
                  : e.type == 'mention' ||
                      c.contains(this.classAttr, 'twitter-mention-button')
                    ? ((this.type = 'mention'),
                      this.classAttr.push('twitter-mention-button'))
                    : this.classAttr.push('twitter-share-button'),
                (this.text = e.text || this.dataAttr('text')),
                this.text &&
                    /\+/.test(this.text) &&
                    !/ /.test(this.text) &&
                    (this.text = this.text.replace(/\+/g, ' ')),
                (this.counturl = e.counturl || this.dataAttr('counturl')),
                (this.searchlink =
                    e.searchlink || this.dataAttr('searchlink')),
                (this.button_hashtag = l.hashTag(
                  e.button_hashtag ||
                      e.hashtag ||
                      this.dataAttr('button-hashtag'),
                  !1
                )),
                (this.size = i == 'large' ? 'l' : 'm'),
                (this.align = e.align || this.dataAttr('align') || ''),
                (this.via = e.via || this.dataAttr('via')),
                (this.hashtags = e.hashtags || this.dataAttr('hashtags')),
                (this.screen_name = l.screenName(
                  e.screen_name ||
                      e.screenName ||
                      this.dataAttr('button-screen-name')
                )),
                (this.url = e.url || this.dataAttr('url')),
                this.type
                  ? ((this.count = 'none'),
                    (this.shareWithRetweet = 'never'),
                    r &&
                        (this.related = this.related
                          ? `${r},${this.related}`
                          : r))
                  : ((this.text = this.text || h),
                    (this.url = this.url || u.getCanonicalURL() || f),
                    (this.count = c.contains(p, n) ? n : 'horizontal'),
                    (this.via = this.via || r),
                    o &&
                        c.contains(m, o) &&
                        (this.shareWithRetweet = o.replace('-', '_')));
              }
              var r = t(12),
                o = t(13),
                s = t(46),
                a = t(18),
                c = t(77),
                u = t(76),
                l = t(73),
                d = t(59),
                h = r.title,
                f = o.href,
                p = ['vertical', 'horizontal', 'none'],
                m = [
                  'never',
                  'publisher-first',
                  'publisher-only',
                  'author-first',
                  'author-only'
                ];
              (i.prototype = new s()),
              c.aug(i.prototype, {
                iframeSource:
                    'widgets/tweet_button.c197f64a14a7434e6e58ca9722b54406.{{lang}}.html',
                widgetUrlParams() {
                  return c.compact({
                    text: this.text,
                    url: this.url,
                    via: this.via,
                    related: this.related,
                    count: this.count,
                    lang: this.lang,
                    counturl: this.counturl,
                    searchlink: this.searchlink,
                    placeid: this.placeid,
                    original_referer: o.href,
                    id: this.id,
                    size: this.size,
                    type: this.type,
                    screen_name: this.screen_name,
                    share_with_retweet: this.shareWithRetweet,
                    button_hashtag: this.button_hashtag,
                    hashtags: this.hashtags,
                    align: this.align,
                    partner: this.partner,
                    dnt: d.enabled(),
                    _: +new Date()
                  });
                },
                render() {
                  let t,
                    e = this,
                    n = this.makeIframeSource();
                  return (
                    this.count &&
                        this.classAttr.push(`twitter-count-${this.count}`),
                    (t = this.create(n, {
                      title: 'Twitter Tweet Button'
                    }).then(function (t) {
                      return (e.element = t);
                    }))
                  );
                }
              }),
              (e.exports = i);
            },
            { 12: 12, 13: 13, 18: 18, 46: 46, 59: 59, 73: 73, 76: 76, 77: 77 }
          ],
          53: [
            function (t, e, n) {
              function i(t, e, n, i) {
                (b[t] = b[t] || []), b[t].push({ s: n, f: i, lang: e });
              }
              function r(t, e) {
                const n = {};
                (n[t] = { item_type: 0 }),
                v.clientEvent(
                  { page: 'video', component: 'tweet', action: 'results' },
                  f.aug({}, e, { item_ids: [t], item_details: n }),
                  !0
                ),
                g.scribeVideoAudienceImpression();
              }
              function o(t, e) {
                const n = {};
                (n[t] = { item_type: 0 }),
                v.clientEvent(
                  {
                    page: 'video',
                    component: 'rawembedcode',
                    action: 'no_results'
                  },
                  {
                    widget_origin: p.rootDocumentLocation(),
                    widget_frame: p.isFramed() && p.currentDocumentLocation(),
                    message: e,
                    item_ids: [t],
                    item_details: n
                  },
                  !0
                ),
                g.scribeVideoAudienceImpression();
              }
              function s(t) {
                if (t) {
                  u.apply(this, [t]);
                  let e = this.srcEl && this.srcEl.getElementsByTagName('A'),
                    n = e && e[e.length - 1],
                    i = this.params();
                  (this.hideStatus =
                    (i.status || this.dataAttr('status')) === 'hidden'),
                  (this.tweetId = i.tweetId || (n && y.status(n.href)));
                }
              }
              var a = t(3),
                c = t(46),
                u = t(50),
                l = t(56),
                d = t(69),
                h = t(70),
                f = t(77),
                p = t(57),
                m = t(41),
                g = t(33),
                v = t(34),
                y = t(73),
                w = t(12),
                b = {},
                _ = [];
              (s.prototype = new u()),
              f.aug(s.prototype, {
                renderedClassNames: 'twitter-video twitter-video-rendered',
                videoPlayer: !0,
                dimensions: {
                  DEFAULT_HEIGHT: '0',
                  DEFAULT_WIDTH: '0',
                  maxHeight: '500',
                  MIN_WIDTH: '320',
                  MIN_HEIGHT: '180',
                  MARGIN: '10px 0',
                  WIDE_MEDIA_PADDING: 0,
                  NARROW_MEDIA_PADDING: 0,
                  BORDERS: 0
                },
                styleSheetUrl: a.video,
                applyVisibleSandboxStyles(t) {
                  return t.style({ visibility: 'visible' });
                },
                applyInitialSandboxStyles(t) {
                  return t.style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    visiblity: 'hidden'
                  });
                },
                modifyFrame(t) {
                  return (
                    (this.constrainingWrapper = w.createElement('div')),
                    (this.constrainingWrapper.style.minWidth = `${this.dimensions.MIN_WIDTH}px`),
                    (this.constrainingWrapper.style.margin = this.dimensions.MARGIN),
                    (this.wrapper = w.createElement('div')),
                    (this.wrapper.style.position = 'relative'),
                    (this.wrapper.style.height = 0),
                    this.constrainingWrapper.appendChild(this.wrapper),
                    this.wrapper.appendChild(t),
                    this.constrainingWrapper
                  );
                },
                create(t) {
                  let e,
                    n,
                    i = this,
                    o = this.sandbox.createElement('div');
                  if (((o.innerHTML = t), (e = o.children[0]))) {
                    (n = e.children[0]),
                    (this.playerConfig = JSON.parse(
                      e.getAttribute('data-player-config')
                    )),
                    this.sandbox.setTitle(
                      e.getAttribute('data-iframe-title') || 'Video'
                    ),
                    this.sandbox.appendChild(e).then(function () {
                      i.renderedDeferred.resolve(i.sandbox),
                      i.completeDeferred.resolve(i.sandbox.element());
                    });
                    let s = n.getAttribute('data-width'),
                      a = n.getAttribute('data-height'),
                      c = s / a,
                      u = `${(1 / c) * 100}%`;
                    return (
                      this.layout(function () {
                        (i.wrapper.style.paddingBottom = u),
                        (i.constrainingWrapper.style.maxWidth = `${parseInt(
                          i.dimensions.maxHeight,
                          10
                        ) * c}px`);
                      }),
                      r(this.tweetId, this.baseScribeData()),
                      e
                    );
                  }
                },
                render() {
                  const t = this;
                  return this.tweetId
                    ? (this.rendered().then(function () {
                      const e = t.srcEl;
                      e &&
                            e.parentNode &&
                            t.layout(function () {
                              e.parentNode.removeChild(e);
                            });
                    }),
                      i(
                        this.tweetId,
                        this.lang,
                        function (e) {
                          t.ready().then(function () {
                            (t.element = t.create(e)),
                            t.readTimestampTranslations(),
                            t.writePlayerConfig();
                          });
                        },
                        function () {
                          o(t.tweetId, t.partner),
                          t.completeDeferred.resolve(t.srcEl);
                        }
                      ),
                      _.push(this.completed()),
                      this.completed())
                    : (this.completeDeferred.resolve(this.srcEl),
                      this.completed());
                },
                baseScribeData() {
                  return {
                    widget_origin: p.rootDocumentLocation(),
                    widget_frame: p.isFramed() && p.currentDocumentLocation(),
                    message: this.partner
                  };
                },
                readTimestampTranslations() {
                  let t = this.element,
                    e = 'data-dt-',
                    n = t.getAttribute(`${e}months`) || '';
                  this.datetime = new l(
                    f.compact({
                      phrases: {
                        AM: t.getAttribute(`${e}am`),
                        PM: t.getAttribute(`${e}pm`)
                      },
                      months: n.split('|'),
                      formats: { full: t.getAttribute(`${e}full`) }
                    })
                  );
                },
                getTimestamp() {
                  let t = this.element.getAttribute('data-datetime'),
                    e = t && this.datetime.localTimeStamp(t);
                  return { local: e };
                },
                writePlayerConfig() {
                  (this.playerConfig.statusTimestamp = this.getTimestamp()),
                  (this.playerConfig.hideStatus = this.hideStatus),
                  this.element.setAttribute(
                    'data-player-config',
                    JSON.stringify(this.playerConfig)
                  );
                }
              }),
              (s.fetchAndRender = function () {
                function t(t) {
                  f.forIn(t, function (t, n) {
                    const i = e[t];
                    i.forEach(function (t) {
                      t.s && t.s.call(this, n);
                    }),
                    delete e[t];
                  }),
                  f.forIn(e, function (t, e) {
                    e.forEach(function (e) {
                      e.f && e.f.call(this, t);
                    });
                  });
                }
                var e = b,
                  n = [];
                b = {};
                for (const i in e) e.hasOwnProperty(i) && n.push(i);
                n.length &&
                    (h.always(
                      m.videos({ ids: n.sort(), lang: e[n[0]][0].lang }),
                      t
                    ),
                      d.all(_),
                      (_ = []));
              }),
              c.afterLoad(s.fetchAndRender),
              (e.exports = s);
            },
            {
              12: 12,
              3: 3,
              33: 33,
              34: 34,
              41: 41,
              46: 46,
              50: 50,
              56: 56,
              57: 57,
              69: 69,
              70: 70,
              73: 73,
              77: 77
            }
          ],
          54: [
            function (t, e, n) {
              function i(t) {
                return c.parseInt(t, 16);
              }
              function r(t) {
                return u.isType('string', t)
                  ? ((t = t.replace(l, '')), (t += t.length === 3 ? t : ''))
                  : null;
              }
              function o(t, e) {
                let n,
                  o,
                  s,
                  a;
                return (
                  (t = r(t)),
                  (e = e || 0),
                  t
                    ? ((n = e < 0 ? 0 : 255),
                      (e = e < 0 ? -Math.max(e, -1) : Math.min(e, 1)),
                      (o = i(t.substring(0, 2))),
                      (s = i(t.substring(2, 4))),
                      (a = i(t.substring(4, 6))),
                      `#${(
                        16777216 +
                        65536 * (Math.round((n - o) * e) + o) +
                        256 * (Math.round((n - s) * e) + s) +
                        (Math.round((n - a) * e) + a)
                      )
                        .toString(16)
                        .slice(1)}`)
                    : void 0
                );
              }
              function s(t, e) {
                return o(t, -e);
              }
              function a(t, e) {
                return o(t, e);
              }
              var c = t(15),
                u = t(77),
                l = /^#/;
              e.exports = { darken: s, lighten: a };
            },
            { 15: 15, 77: 77 }
          ],
          55: [
            function (t, e, n) {
              e.exports = {
                sanitize(t, e, n) {
                  let i,
                    r = /^[\w ,%\/"'\-_#]+$/,
                    o =
                      t &&
                      t.split(';').map(function (t) {
                        return t
                          .split(':')
                          .slice(0, 2)
                          .map(function (t) {
                            return t.trim();
                          });
                      }),
                    s = 0,
                    a = [],
                    c = n ? '!important' : '';
                  for (
                    e = e || /^(font|text\-|letter\-|color|line\-)[\w\-]*$/;
                    o && (i = o[s]);
                    s++
                  ) {
                    i[0].match(e) && i[1].match(r) && a.push(i.join(':') + c);
                  }
                  return a.join(';');
                }
              };
            },
            {}
          ],
          56: [
            function (t, e, n) {
              function i(t) {
                return t < 10 ? `0${t}` : t;
              }
              function r(t) {
                function e(t, e) {
                  return (
                    n && n[t] && (t = n[t]),
                    t.replace(/%\{([\w_]+)\}/g, function (t, n) {
                      return void 0 !== e[n] ? e[n] : t;
                    })
                  );
                }
                var n = t && t.phrases,
                  o = (t && t.months) || c,
                  s = (t && t.formats) || u;
                (this.timeAgo = function (t) {
                  let n,
                    i = r.parseDate(t),
                    a = +new Date(),
                    c = a - i;
                  return i
                    ? isNaN(c) || 2 * l > c
                      ? e('now')
                      : d > c
                        ? ((n = Math.floor(c / l)),
                          e(s.abbr, {
                            number: n,
                            symbol: e(p, {
                              abbr: e('s'),
                              expanded: e(n > 1 ? 'seconds' : 'second')
                            })
                          }))
                        : h > c
                          ? ((n = Math.floor(c / d)),
                            e(s.abbr, {
                              number: n,
                              symbol: e(p, {
                                abbr: e('m'),
                                expanded: e(n > 1 ? 'minutes' : 'minute')
                              })
                            }))
                          : f > c
                            ? ((n = Math.floor(c / h)),
                              e(s.abbr, {
                                number: n,
                                symbol: e(p, {
                                  abbr: e('h'),
                                  expanded: e(n > 1 ? 'hours' : 'hour')
                                })
                              }))
                            : 365 * f > c
                              ? e(s.shortdate, {
                                day: i.getDate(),
                                month: e(o[i.getMonth()])
                              })
                              : e(s.longdate, {
                                day: i.getDate(),
                                month: e(o[i.getMonth()]),
                                year: i
                                  .getFullYear()
                                  .toString()
                                  .slice(2)
                              })
                    : '';
                }),
                (this.localTimeStamp = function (t) {
                  let n = r.parseDate(t),
                    a = n && n.getHours();
                  return n
                    ? e(s.full, {
                      day: n.getDate(),
                      month: e(o[n.getMonth()]),
                      year: n.getFullYear(),
                      hours24: i(a),
                      hours12: a < 13 ? a || '12' : a - 12,
                      minutes: i(n.getMinutes()),
                      seconds: i(n.getSeconds()),
                      amPm: e(a < 12 ? 'AM' : 'PM')
                    })
                    : '';
                });
              }
              var o = /(\d{4})-?(\d{2})-?(\d{2})T(\d{2}):?(\d{2}):?(\d{2})(Z|[\+\-]\d{2}:?\d{2})/,
                s = /[a-z]{3,4} ([a-z]{3}) (\d{1,2}) (\d{1,2}):(\d{2}):(\d{2}) ([\+\-]\d{2}:?\d{2}) (\d{4})/i,
                a = /^\d+$/,
                c = [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec'
                ],
                u = {
                  abbr: '%{number}%{symbol}',
                  shortdate: '%{day} %{month}',
                  longdate: '%{day} %{month} %{year}',
                  full:
                    '%{hours12}:%{minutes} %{amPm} - %{day} %{month} %{year}'
                },
                l = 1e3,
                d = 60 * l,
                h = 60 * d,
                f = 24 * h,
                p = '<abbr title="%{expanded}">%{abbr}</abbr>';
              (r.parseDate = function (t) {
                let e,
                  n,
                  i = t || '',
                  r = i.toString();
                return (e = (function () {
                  let t;
                  return a.test(r)
                    ? parseInt(r, 10)
                    : (t = r.match(s))
                      ? Date.UTC(t[7], c.indexOf(t[1]), t[2], t[3], t[4], t[5])
                      : (t = r.match(o))
                        ? Date.UTC(t[1], t[2] - 1, t[3], t[4], t[5], t[6])
                        : void 0;
                }()))
                  ? ((n = new Date(e)), !isNaN(n.getTime()) && n)
                  : !1;
              }),
              (e.exports = r);
            },
            {}
          ],
          57: [
            function (t, e, n) {
              function i(t) {
                return t && c.isType('string', t) && (u = t), u;
              }
              function r() {
                return l;
              }
              function o() {
                return u !== l;
              }
              var s = t(13),
                a = t(76),
                c = t(77),
                u = a.getCanonicalURL() || s.href,
                l = u;
              e.exports = {
                isFramed: o,
                rootDocumentLocation: i,
                currentDocumentLocation: r
              };
            },
            { 13: 13, 76: 76, 77: 77 }
          ],
          58: [
            function (t, e, n) {
              function i() {
                u = 1;
                for (let t = 0, e = l.length; e > t; t++) l[t]();
              }
              var r,
                o,
                s,
                a = t(12),
                c = t(15),
                u = 0,
                l = [],
                d = !1,
                h = a.createElement('a');
              /^loade|c/.test(a.readyState) && (u = 1),
              a.addEventListener &&
                  a.addEventListener(
                    'DOMContentLoaded',
                    (o = function () {
                      a.removeEventListener('DOMContentLoaded', o, d), i();
                    }),
                    d
                  ),
              h.doScroll &&
                  a.attachEvent(
                    'onreadystatechange',
                    (r = function () {
                      /^c/.test(a.readyState) &&
                        (a.detachEvent('onreadystatechange', r), i());
                    })
                  ),
              (s = h.doScroll
                ? function (t) {
                  c.self != c.top
                    ? u
                      ? t()
                      : l.push(t)
                    : !(function () {
                      try {
                        h.doScroll('left');
                      } catch (e) {
                        return setTimeout(function () {
                          s(t);
                        }, 50);
                      }
                      t();
                    }());
                }
                : function (t) {
                  u ? t() : l.push(t);
                }),
              (e.exports = s);
            },
            { 12: 12, 15: 15 }
          ],
          59: [
            function (t, e, n) {
              function i() {
                h = !0;
              }
              function r(t, e) {
                return h
                  ? !0
                  : l.asBoolean(d.val('dnt'))
                    ? !0
                    : !a || (a.doNotTrack != 1 && a.msDoNotTrack != 1)
                      ? u.isUrlSensitive(e || s.host)
                        ? !0
                        : c.isFramed() && u.isUrlSensitive(c.rootDocumentLocation())
                          ? !0
                          : ((t = f.test(t || o.referrer) && RegExp.$1),
                            t && u.isUrlSensitive(t) ? !0 : !1)
                      : !0;
              }
              var o = t(12),
                s = t(13),
                a = t(14),
                c = t(57),
                u = t(72),
                l = t(74),
                d = t(18),
                h = !1,
                f = /https?:\/\/([^\/]+).*/i;
              e.exports = { setOn: i, enabled: r };
            },
            { 12: 12, 13: 13, 14: 14, 18: 18, 57: 57, 72: 72, 74: 74 }
          ],
          60: [
            function (t, e, n) {
              function i(t) {
                return (
                  (t = t || g),
                  t.devicePixelRatio
                    ? t.devicePixelRatio >= 1.5
                    : t.matchMedia
                      ? t.matchMedia('only screen and (min-resolution: 144dpi)')
                        .matches
                      : !1
                );
              }
              function r(t) {
                return (t = t || A), /(Trident|MSIE \d)/.test(t);
              }
              function o(t) {
                return (t = t || A), /MSIE 9/.test(t);
              }
              function s(t) {
                return (t = t || A), /(iPad|iPhone|iPod)/.test(t);
              }
              function a(t) {
                return (
                  (t = t || A), /^Mozilla\/5\.0 \(Linux; (U; )?Android/.test(t)
                );
              }
              function c() {
                return T;
              }
              function u(t, e) {
                return (
                  (t = t || g),
                  (e = e || A),
                  t.postMessage && !(r(e) && t.opener)
                );
              }
              function l(t) {
                t = t || m;
                try {
                  return (
                    !!t.plugins['Shockwave Flash'] ||
                    !!new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                  );
                } catch (e) {
                  return !1;
                }
              }
              function d(t, e, n) {
                return (
                  (t = t || g),
                  (e = e || m),
                  (n = n || A),
                  'ontouchstart' in t ||
                    /Opera Mini/.test(n) ||
                    e.msMaxTouchPoints > 0
                );
              }
              function h() {
                const t = p.body.style;
                return (
                  void 0 !== t.transition ||
                  void 0 !== t.webkitTransition ||
                  void 0 !== t.mozTransition ||
                  void 0 !== t.oTransition ||
                  void 0 !== t.msTransition
                );
              }
              function f() {
                return !!(
                  g.Promise &&
                  g.Promise.resolve &&
                  g.Promise.reject &&
                  g.Promise.all &&
                  g.Promise.race &&
                  (function () {
                    let t;
                    return (
                      new g.Promise(function (e) {
                        t = e;
                      }),
                      b.isType('function', t)
                    );
                  }())
                );
              }
              var p = t(12),
                m = t(14),
                g = t(15),
                v = t(58),
                y = t(65),
                w = t(74),
                b = t(77),
                _ = t(18),
                E = t(19),
                A = m.userAgent,
                T = !1,
                x = !1,
                I = 'twitter-csp-test';
              E.set('verifyCSP', function (t) {
                const e = p.getElementById(I);
                (x = !0), (T = !!t), e && e.parentNode.removeChild(e);
              }),
              v(function () {
                let t;
                return w.asBoolean(_.val('widgets:csp'))
                  ? (T = !0)
                  : ((t = p.createElement('script')),
                    (t.id = I),
                    (t.text = `${E.fullPath('verifyCSP')}(false);`),
                    p.body.appendChild(t),
                    void g.setTimeout(function () {
                      x ||
                          (y.warn(
                            'TWITTER: Content Security Policy restrictions may be applied to your site. Add <meta name="twitter:widgets:csp" content="on"> to supress this warning.'
                          ),
                            y.warn(
                              'TWITTER: Please note: Not all embedded timeline and embedded Tweet functionality is supported when CSP is applied.'
                            ));
                    }, 5e3));
              }),
              (e.exports = {
                retina: i,
                anyIE: r,
                ie9: o,
                ios: s,
                android: a,
                cspEnabled: c,
                flashEnabled: l,
                canPostMessage: u,
                touch: d,
                cssTransitions: h,
                hasPromiseSupport: f
              });
            },
            {
              12: 12,
              14: 14,
              15: 15,
              18: 18,
              19: 19,
              58: 58,
              65: 65,
              74: 74,
              77: 77
            }
          ],
          61: [
            function (t, e, n) {
              let i = t(77),
                r = {
                  bind(t, e) {
                    return (
                      (this._handlers = this._handlers || {}),
                      (this._handlers[t] = this._handlers[t] || []),
                      this._handlers[t].push(e)
                    );
                  },
                  unbind(t, e) {
                    if (this._handlers[t]) {
                      if (e) {
                        const n = this._handlers[t].indexOf(e);
                        n >= 0 && this._handlers[t].splice(n, 1);
                      } else this._handlers[t] = [];
                    }
                  },
                  trigger(t, e) {
                    const n = this._handlers && this._handlers[t];
                    (e = e || {}),
                    (e.type = t),
                    n &&
                        n.forEach(function (t) {
                          i.async(t.bind(this, e));
                        });
                  }
                };
              e.exports = { Emitter: r };
            },
            { 77: 77 }
          ],
          62: [
            function (t, e, n) {
              function i(t) {
                for (
                  var e, n = r.getElementsByTagName('iframe'), i = 0;
                  (e = n[i]);
                  i++
                ) {
                  if (e.contentWindow === t) return e;
                }
              }
              var r = t(12);
              e.exports = i;
            },
            { 12: 12 }
          ],
          63: [
            function (t, e, n) {
              let i = t(12),
                r = t(77);
              e.exports = function (t, e, n) {
                let o;
                if (((n = n || i), (t = t || {}), (e = e || {}), t.name)) {
                  try {
                    o = n.createElement(`<iframe name="${t.name}"></iframe>`);
                  } catch (s) {
                    (o = n.createElement('iframe')), (o.name = t.name);
                  }
                  delete t.name;
                } else o = n.createElement('iframe');
                return (
                  t.id && ((o.id = t.id), delete t.id),
                  (o.allowtransparency = 'true'),
                  (o.scrolling = 'no'),
                  o.setAttribute('frameBorder', 0),
                  o.setAttribute('allowTransparency', !0),
                  r.forIn(t, function (t, e) {
                    o.setAttribute(t, e);
                  }),
                  r.forIn(e, function (t, e) {
                    o.style[t] = e;
                  }),
                  o
                );
              };
            },
            { 12: 12, 77: 77 }
          ],
          64: [
            function (t, e, n) {
              function i() {}
              let r,
                o = t(15),
                s = t(68),
                a = [];
              (i.prototype.enqueue = function (t, e) {
                const n = new s();
                return a.push({ action: t, deferred: n, note: e }), n.promise;
              }),
              (i.prototype.exec = function () {
                let t,
                  e = a;
                if (e.length) {
                  for (a = []; e.length;) {
                    (t = e.shift()),
                    t && t.action
                      ? t.deferred.resolve(t.action())
                      : t.deferred.reject();
                  }
                }
              }),
              (i.prototype.delayedExec = function () {
                r && o.clearTimeout(r), (r = o.setTimeout(this.exec, 100));
              }),
              (e.exports = i);
            },
            { 15: 15, 68: 68 }
          ],
          65: [
            function (t, e, n) {
              function i() {
                u('info', h.toRealArray(arguments));
              }
              function r() {
                u('warn', h.toRealArray(arguments));
              }
              function o() {
                u('error', h.toRealArray(arguments));
              }
              function s(t) {
                m && (p[t] = c());
              }
              function a(t) {
                let e;
                m &&
                  (p[t]
                    ? ((e = c()), i('_twitter', t, e - p[t]))
                    : o('timeEnd() called before time() for id: ', t));
              }
              function c() {
                return (d.performance && +d.performance.now()) || +new Date();
              }
              function u(t, e) {
                if (d[f] && d[f][t]) {
                  switch (e.length) {
                    case 1:
                      d[f][t](e[0]);
                      break;
                    case 2:
                      d[f][t](e[0], e[1]);
                      break;
                    case 3:
                      d[f][t](e[0], e[1], e[2]);
                      break;
                    case 4:
                      d[f][t](e[0], e[1], e[2], e[3]);
                      break;
                    case 5:
                      d[f][t](e[0], e[1], e[2], e[3], e[4]);
                      break;
                    default:
                      e.length !== 0 &&
                        d[f].warn &&
                        d[f].warn(`too many params passed to logger.${t}`);
                  }
                }
              }
              var l = t(13),
                d = t(15),
                h = t(77),
                f = ['con', 'sole'].join(''),
                p = {},
                m = h.contains(l.href, 'tw_debug=true');
              e.exports = { info: i, warn: r, error: o, time: s, timeEnd: a };
            },
            { 13: 13, 15: 15, 77: 77 }
          ],
          66: [
            function (t, e, n) {
              function i(t) {
                return function (e) {
                  return o.hasValue(e[t]);
                };
              }
              function r() {
                (this.assertions = []), (this._defaults = {});
              }
              var o = t(74),
                s = t(77);
              (r.prototype.assert = function (t, e) {
                return (
                  this.assertions.push({ fn: t, msg: e || 'assertion failed' }),
                  this
                );
              }),
              (r.prototype.defaults = function (t) {
                return (this._defaults = t || this._defaults), this;
              }),
              (r.prototype.require = function (t) {
                const e = this;
                return (
                  (t = Array.isArray(t) ? t : s.toRealArray(arguments)),
                  t.forEach(function (t) {
                    e.assert(i(t), `required: ${t}`);
                  }),
                  this
                );
              }),
              (r.prototype.parse = function (t) {
                let e,
                  n;
                if (
                  ((e = s.aug({}, this._defaults, t || {})),
                    (n = this.assertions.reduce(function (t, n) {
                      return n.fn(e) || t.push(n.msg), t;
                    }, [])),
                    n.length > 0)
                ) {
                  throw new Error(n.join('\n'));
                }
                return e;
              }),
              (e.exports = r);
            },
            { 74: 74, 77: 77 }
          ],
          67: [
            function (t, e, n) {
              let i,
                r,
                o,
                s = t(71);
              (i = function (t) {
                const e = t.search.substr(1);
                return s.decode(e);
              }),
              (r = function (t) {
                let e = t.href,
                  n = e.indexOf('#'),
                  i = n < 0 ? '' : e.substring(n + 1);
                return s.decode(i);
              }),
              (o = function (t) {
                let e,
                  n = {},
                  o = i(t),
                  s = r(t);
                for (e in o) o.hasOwnProperty(e) && (n[e] = o[e]);
                for (e in s) s.hasOwnProperty(e) && (n[e] = s[e]);
                return n;
              }),
              (e.exports = { combined: o, fromQuery: i, fromFragment: r });
            },
            { 71: 71 }
          ],
          68: [
            function (t, e, n) {
              function i() {
                const t = this;
                this.promise = new r(function (e, n) {
                  (t.resolve = e), (t.reject = n);
                });
              }
              var r = t(69);
              e.exports = i;
            },
            { 69: 69 }
          ],
          69: [
            function (t, e, n) {
              let i = t(1).Promise,
                r = t(15),
                o = t(60);
              e.exports = o.hasPromiseSupport() ? r.Promise : i;
            },
            { 1: 1, 15: 15, 60: 60 }
          ],
          70: [
            function (t, e, n) {
              function i(t, e) {
                return t.then(e, e);
              }
              function r(t) {
                let e;
                return (
                  (t = t || []),
                  (e = t.length),
                  (t = t.filter(o)),
                  e
                    ? e !== t.length
                      ? s.reject('non-Promise passed to .some')
                      : new s(function (e, n) {
                        function i() {
                          (r += 1), r === t.length && n();
                        }
                        var r = 0;
                        t.forEach(function (t) {
                          t.then(e, i);
                        });
                      })
                    : s.reject('no promises passed to .some')
                );
              }
              function o(t) {
                return t instanceof s;
              }
              var s = t(69);
              e.exports = { always: i, some: r, isPromise: o };
            },
            { 69: 69 }
          ],
          71: [
            function (t, e, n) {
              function i(t) {
                return encodeURIComponent(t)
                  .replace(/\+/g, '%2B')
                  .replace(/'/g, '%27');
              }
              function r(t) {
                return decodeURIComponent(t);
              }
              function o(t) {
                const e = [];
                return (
                  l.forIn(t, function (t, n) {
                    const r = i(t);
                    l.isType('array', n) || (n = [n]),
                    n.forEach(function (t) {
                      u.hasValue(t) && e.push(`${r}=${i(t)}`);
                    });
                  }),
                  e.sort().join('&')
                );
              }
              function s(t) {
                let e,
                  n = {};
                return t
                  ? ((e = t.split('&')),
                    e.forEach(function (t) {
                      let e = t.split('='),
                        i = r(e[0]),
                        o = r(e[1]);
                      return e.length == 2
                        ? l.isType('array', n[i])
                          ? void n[i].push(o)
                          : i in n
                            ? ((n[i] = [n[i]]), void n[i].push(o))
                            : void (n[i] = o)
                        : void 0;
                    }),
                    n)
                  : {};
              }
              function a(t, e) {
                const n = o(e);
                return n.length > 0
                  ? l.contains(t, '?')
                    ? `${t}&${o(e)}`
                    : `${t}?${o(e)}`
                  : t;
              }
              function c(t) {
                const e = t && t.split('?');
                return e.length == 2 ? s(e[1]) : {};
              }
              var u = t(74),
                l = t(77);
              e.exports = {
                url: a,
                decodeURL: c,
                decode: s,
                encode: o,
                encodePart: i,
                decodePart: r
              };
            },
            { 74: 74, 77: 77 }
          ],
          72: [
            function (t, e, n) {
              function i(t) {
                return t in a ? a[t] : (a[t] = s.test(t));
              }
              function r() {
                return i(o.host);
              }
              var o = t(13),
                s = /^[^#?]*\.(gov|mil)(:\d+)?([#?].*)?$/i,
                a = {};
              e.exports = { isUrlSensitive: i, isHostPageSensitive: r };
            },
            { 13: 13 }
          ],
          73: [
            function (t, e, n) {
              function i(t) {
                return (
                  typeof t === 'string' && m.test(t) && RegExp.$1.length <= 20
                );
              }
              function r(t) {
                return i(t) ? RegExp.$1 : void 0;
              }
              function o(t, e) {
                const n = p.decodeURL(t);
                return (
                  (e = e || !1),
                  (n.screen_name = r(t)),
                  n.screen_name
                    ? p.url(
                      `https://twitter.com/intent/${e ? 'follow' : 'user'}`,
                      n
                    )
                    : void 0
                );
              }
              function s(t) {
                return o(t, !0);
              }
              function a(t) {
                return typeof t === 'string' && w.test(t);
              }
              function c(t, e) {
                return (
                  (e = void 0 === e ? !0 : e),
                  a(t) ? (e ? '#' : '') + RegExp.$1 : void 0
                );
              }
              function u(t) {
                return typeof t === 'string' && g.test(t);
              }
              function l(t) {
                return u(t) && RegExp.$1;
              }
              function d(t) {
                return v.test(t);
              }
              function h(t) {
                return y.test(t);
              }
              function f(t) {
                return b.test(t);
              }
              var p = t(71),
                m = /(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?(?:\/intent\/(?:follow|user)\/?\?screen_name=|(?:\/#!)?\/))@?([\w]+)(?:\?|&|$)/i,
                g = /(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?\/(?:#!\/)?[\w_]+\/status(?:es)?\/)(\d+)/i,
                v = /^http(s?):\/\/(\w+\.)*twitter\.com([\:\/]|$)/i,
                y = /^http(s?):\/\/pbs\.twimg\.com\//,
                w = /^#?([^.,<>!\s\/#\-\(\)\'\"]+)$/,
                b = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/;

              e.exports = {
                isHashTag: a,
                hashTag: c,
                isScreenName: i,
                screenName: r,
                isStatus: u,
                status: l,
                intentForProfileURL: o,
                intentForFollowURL: s,
                isTwitterURL: d,
                isTwimgURL: h,
                isIntentURL: f,
                regexen: { profile: m }
              };
            },
            { 71: 71 }
          ],
          74: [
            function (t, e, n) {
              function i(t) {
                return void 0 !== t && t !== null && t !== '';
              }
              function r(t) {
                return s(t) && t % 1 === 0;
              }
              function o(t) {
                return s(t) && !r(t);
              }
              function s(t) {
                return i(t) && !isNaN(t);
              }
              function a(t) {
                return i(t) && h.toType(t) == 'array';
              }
              function c(t) {
                if (!i(t)) return !1;
                switch (t) {
                  case '1':
                  case 'on':
                  case 'ON':
                  case 'true':
                  case 'TRUE':
                  case 'yes':
                  case 'YES':
                    return !0;
                  case '0':
                  case 'off':
                  case 'OFF':
                  case 'false':
                  case 'FALSE':
                  case 'no':
                  case 'NO':
                    return !1;
                  default:
                    return !!t;
                }
              }
              function u(t) {
                return s(t) ? t : void 0;
              }
              function l(t) {
                return o(t) ? t : void 0;
              }
              function d(t) {
                return r(t) ? t : void 0;
              }
              var h = t(77);
              e.exports = {
                hasValue: i,
                isInt: r,
                isFloat: o,
                isNumber: s,
                isArray: a,
                asInt: d,
                asFloat: l,
                asNumber: u,
                asBoolean: c
              };
            },
            { 77: 77 }
          ],
          75: [
            function (t, e, n) {
              function i() {
                return (
                  String(+new Date()) + Math.floor(1e5 * Math.random()) + r++
                );
              }
              var r = 0;
              e.exports = { generate: i };
            },
            {}
          ],
          76: [
            function (t, e, n) {
              function i(t, e) {
                let n,
                  i;
                return (
                  (e = e || a),
                  /^https?:\/\//.test(t)
                    ? t
                    : /^\/\//.test(t)
                      ? e.protocol + t
                      : ((n = e.host + (e.port.length ? `:${e.port}` : '')),
                        t.indexOf('/') !== 0 &&
                        ((i = e.pathname.split('/')),
                          i.pop(),
                          i.push(t),
                          (t = `/${i.join('/')}`)),
                        [e.protocol, '//', n, t].join(''))
                );
              }
              function r() {
                for (
                  var t, e = s.getElementsByTagName('link'), n = 0;
                  (t = e[n]);
                  n++
                ) {
                  if (t.rel == 'canonical') return i(t.href);
                }
              }
              function o() {
                for (
                  var t,
                    e,
                    n,
                    i = s.getElementsByTagName('a'),
                    r = s.getElementsByTagName('link'),
                    o = [i, r],
                    a = 0,
                    u = 0,
                    l = /\bme\b/;
                  (t = o[a]);
                  a++
                ) {
                  for (u = 0; (e = t[u]); u++) {
                    if (l.test(e.rel) && (n = c.screenName(e.href))) return n;
                  }
                }
              }
              var s = t(12),
                a = t(13),
                c = t(73);
              e.exports = {
                absolutize: i,
                getCanonicalURL: r,
                getScreenNameFromPage: o
              };
            },
            { 12: 12, 13: 13, 73: 73 }
          ],
          77: [
            function (t, e, n) {
              function i(t) {
                return (
                  d(arguments)
                    .slice(1)
                    .forEach(function (e) {
                      o(e, function (e, n) {
                        t[e] = n;
                      });
                    }),
                  t
                );
              }
              function r(t) {
                return (
                  o(t, function (e, n) {
                    c(n) && (r(n), u(n) && delete t[e]),
                    (void 0 === n || n === null || n === '') && delete t[e];
                  }),
                  t
                );
              }
              function o(t, e) {
                for (const n in t) {
                  (!t.hasOwnProperty || t.hasOwnProperty(n)) && e(n, t[n]);
                }
                return t;
              }
              function s(t) {
                return {}.toString
                  .call(t)
                  .match(/\s([a-zA-Z]+)/)[1]
                  .toLowerCase();
              }
              function a(t, e) {
                return t == s(e);
              }
              function c(t) {
                return t === Object(t);
              }
              function u(t) {
                if (!c(t)) return !1;
                if (Object.keys) return !Object.keys(t).length;
                for (const e in t) if (t.hasOwnProperty(e)) return !1;
                return !0;
              }
              function l(t, e) {
                f.setTimeout(function () {
                  t.call(e || null);
                }, 0);
              }
              function d(t) {
                return Array.prototype.slice.call(t);
              }
              function h(t, e) {
                return t && t.indexOf ? t.indexOf(e) > -1 : !1;
              }
              var f = t(15);
              e.exports = {
                aug: i,
                async: l,
                compact: r,
                contains: h,
                forIn: o,
                isObject: c,
                isEmptyObject: u,
                toType: s,
                isType: a,
                toRealArray: d
              };
            },
            { 15: 15 }
          ],
          78: [
            function (t, e, n) {
              function i() {
                if (o) return o;
                if (u.isDynamicWidget()) {
                  let t,
                    e = 0,
                    n = c.parent.frames.length;
                  try {
                    if ((o = c.parent.frames[h])) return o;
                  } catch (i) {}
                  if (l.anyIE()) {
                    for (; n > e; e++) {
                      try {
                        if (
                          ((t = c.parent.frames[e]),
                            t && typeof t.openIntent === 'function')
                        ) {
                          return (o = t);
                        }
                      } catch (i) {}
                    }
                  }
                }
              }
              function r() {
                let t,
                  e,
                  n,
                  o,
                  a,
                  l,
                  d = {};
                if (
                  ((typeof arguments[0]).toLowerCase() === 'function'
                    ? (d.success = arguments[0])
                    : (d = arguments[0]),
                    (t = d.success || function () {}),
                    (e = d.timeout || function () {}),
                    (n = d.nohub || function () {}),
                    (o = d.complete || function () {}),
                    (a = void 0 !== d.attempt ? d.attempt : m),
                    !u.isDynamicWidget() || s)
                ) {
                  return n(), o(), !1;
                }
                (l = i()), a--;
                try {
                  if (l && l.trigger) return t(l), void o();
                } catch (h) {}
                return a <= 0
                  ? ((s = !0), e(), void o())
                  : +new Date() - f > p * m
                    ? ((s = !0), void n())
                    : void c.setTimeout(function () {
                      r({
                        success: t,
                        timeout: e,
                        nohub: n,
                        attempt: a,
                        complete: o
                      });
                    }, p);
              }
              var o,
                s,
                a = t(13),
                c = t(15),
                u = t(42),
                l = t(60),
                d = 'twttrHubFrameSecure',
                h = a.protocol == 'http:' ? 'twttrHubFrame' : d,
                f = +new Date(),
                p = 100,
                m = 20;
              e.exports = { withHub: r, contextualHubId: h, secureHubId: d };
            },
            { 13: 13, 15: 15, 42: 42, 60: 60 }
          ],
          79: [
            function (t, e, n) {
              e.exports = {
                version:
                  '92b1c2a6225add1bfef7d68a56eae7e27434157b:1433890390298'
              };
            },
            {}
          ],
          80: [
            function (t, e, n) {
              e.exports = { css: '57bcdf05dce6947403d3f6192b55469a' };
            },
            {}
          ],
          81: [
            function (t, e, n) {
              function i(t) {
                (t = r.parse(t)),
                (this.rootEl = t.rootEl),
                (this.videoEl = t.videoEl),
                (this.playButtonEl = t.playButtonEl),
                (this.fallbackUrl = t.fallbackUrl),
                (this.player = new u({
                  videoEl: this.videoEl,
                  loop: !0,
                  autoplay: !1
                })),
                this._attachClickListener();
              }
              var r,
                o = t(7),
                s = t(8),
                a = t(15),
                c = t(66),
                u = t(82);
              (r = new c()
                .require('rootEl', 'videoEl', 'playButtonEl')
                .defaults({ fallbackUrl: null })),
              (i.prototype._attachClickListener = function () {
                function t(t) {
                  s.stopPropagation(t), e._togglePlayer();
                }
                var e = this;
                this.videoEl.addEventListener('click', t, !1),
                this.playButtonEl.addEventListener('click', t, !1);
              }),
              (i.prototype._togglePlayer = function () {
                return this.player.hasPlayableSource()
                  ? (this.player.toggle(),
                    void o.toggle(
                      this.rootEl,
                      'is-playing',
                      !this.player.isPaused()
                    ))
                  : void (this.fallbackUrl && a.open(this.fallbackUrl));
              }),
              (e.exports = i);
            },
            { 15: 15, 66: 66, 7: 7, 8: 8, 82: 82 }
          ],
          82: [
            function (t, e, n) {
              function i(t) {
                let e;
                (t = r.parse(t)),
                (this.videoEl = t.videoEl),
                'loop' in t && (this.videoEl.loop = t.loop),
                'autoplay' in t && (this.videoEl.autoplay = t.autoplay),
                'poster' in t && (this.videoEl.poster = t.poster),
                (e = a.toRealArray(this.videoEl.querySelectorAll('source'))),
                (this.sourceTypes = e.map(function (t) {
                  return t.type;
                }));
              }
              var r,
                o = t(12),
                s = t(66),
                a = t(77);
              (r = new s().require('videoEl')),
              (i.prototype.isPaused = function () {
                return this.videoEl.paused;
              }),
              (i.prototype.play = function () {
                return this.videoEl.play(), this;
              }),
              (i.prototype.pause = function () {
                return this.videoEl.pause(), this;
              }),
              (i.prototype.toggle = function () {
                return this.videoEl.paused ? this.play() : this.pause();
              }),
              (i.prototype.addSource = function (t, e) {
                const n = o.createElement('source');
                return (
                  (n.src = t),
                  (n.type = e),
                  this.sourceTypes.push(e),
                  this.videoEl.appendChild(n),
                  this
                );
              }),
              (i.prototype.hasPlayableSource = function () {
                const t = this.videoEl;
                return t.canPlayType
                  ? this.sourceTypes.reduce(function (e, n) {
                    return e || !!t.canPlayType(n).replace('no', '');
                  }, !1)
                  : !1;
              }),
              (i.prototype.setDimensions = function (t, e) {
                return (
                  (this.videoEl.width = t), (this.videoEl.height = e), this
                );
              }),
              (e.exports = i);
            },
            { 12: 12, 66: 66, 77: 77 }
          ],
          83: [
            function (t, e, n) {
              function i(t, e) {
                return t && t.getAttribute
                  ? t.getAttribute(`data-${e}`)
                  : void 0;
              }
              function r(t, e) {
                return {
                  element: t.element || v,
                  action: t.action || y,
                  page: o(e) ? 'video' : void 0
                };
              }
              function o(t) {
                return d.closest('.embedded-video', t);
              }
              function s(t) {
                let e = d.closest('.tweet', t),
                  n = !e && d.closest('.EmbeddedTweet', t);
                return n && (e = n.querySelector('.tweet.subject')), e;
              }
              function a(t) {
                return JSON.parse(i(o(t), 'player-config'));
              }
              function c(t, e) {
                let n,
                  r,
                  a,
                  c = o(e);
                return (
                  c
                    ? (n = l.aug(
                      {
                        item_type: m,
                        card_type: g,
                        id: i(c, 'tweet-id'),
                        card_name: i(c, 'card-name'),
                        publisher_id: i(c, 'publisher-id'),
                        content_id: i(c, 'content-id')
                      },
                      t.itemData || {}
                    ))
                    : ((r = d.closest('.cards-multimedia', e)),
                      (a = s(e)),
                      (n = l.aug(
                        {
                          item_type: m,
                          card_type: g,
                          id: i(a, 'tweet-id'),
                          card_name: i(r, 'card-name'),
                          publisher_id: i(r, 'publisher-id'),
                          content_id: i(r, 'video-content-id')
                        },
                        t.itemData || {}
                      ))),
                  { items: [n] }
                );
              }
              function u(t) {
                const e = this;
                (this.global = t),
                (this.server = new h()
                  .attachReceiver(new p.Receiver(t, ''))
                  .bind('scribe', function (t) {
                    e.scribe(t, this);
                  })
                  .bind('requestPlayerConfig', function () {
                    return e.requestPlayerConfig(this);
                  }));
              }
              var l = t(77),
                d = t(9),
                h = t(28),
                f = t(35),
                p = t(29),
                m = 0,
                g = 6,
                v = 'amplify_player',
                y = 'undefined';
              (u.prototype.findIframeByWindow = function (t) {
                for (
                  let e = this.global.document.getElementsByTagName('iframe'),
                    n = e.length,
                    i = 0;
                  n > i;
                  i++
                ) {
                  if (e[i].contentWindow == t) return e[i];
                }
              }),
              (u.prototype.requestPlayerConfig = function (t) {
                const e = this.findIframeByWindow(t);
                if (e) return a(e);
              }),
              (u.prototype.scribe = function (t, e) {
                let n,
                  i,
                  o,
                  s;
                (n = t && t.customScribe),
                (i = this.findIframeByWindow(e)),
                n &&
                      i &&
                      ((o = r(n, i)), (s = c(n, i)), f.clientEvent2(o, s, !0));
              }),
              (e.exports = u);
            },
            { 28: 28, 29: 29, 35: 35, 77: 77, 9: 9 }
          ],
          84: [
            function (t, e, n) {
              !(function () {
                let e = t(12),
                  n = t(39),
                  i = t(58),
                  r = t(65),
                  o = t(25),
                  s = t(46),
                  a = t(48),
                  c = t(52),
                  u = t(47),
                  l = t(51),
                  d = t(53),
                  h = t(49),
                  f = t(37),
                  p = t(61),
                  m = t(38),
                  g = t(23),
                  v = t(20),
                  y = t(19),
                  w = t(16),
                  b = t(68),
                  _ = t(45);
                if (
                  (y.init('host', 'platform.twitter.com'),
                    o.start('widgets-js-load'),
                    n.requestArticleUrl(),
                    _(),
                    y.get('widgets.loaded'))
                ) {
                  return v.call('widgets.load'), !1;
                }
                if (y.get('widgets.init')) return !1;
                y.set('widgets.init', !0), v.set('init', !0);
                const E = new b();
                w.exposeReadyPromise(E.promise, v.base, '_e'),
                v.set('events', {
                  bind(t, e) {
                    E.promise.then(function (n) {
                      n.events.bind(t, e);
                    });
                  }
                }),
                i(function () {
                  function t() {
                    y.set('eventsHub', m.init()), m.init(!0);
                  }
                  let n,
                    i = {
                      'a.twitter-share-button': c,
                      'a.twitter-mention-button': c,
                      'a.twitter-hashtag-button': c,
                      'a.twitter-follow-button': a,
                      'blockquote.twitter-tweet': u,
                      'a.twitter-timeline': l,
                      'div.twitter-timeline': l,
                      'blockquote.twitter-video': d,
                      body: h
                    },
                    o = y.get('eventsHub') ? v.get('events') : {};
                  v.aug('widgets', f, {
                    load(t) {
                      r.time('load'),
                      s.init(i),
                      s.embed(t),
                      y.set('widgets.loaded', !0);
                    }
                  }),
                  v.aug('events', o, p.Emitter),
                  (n = v.get('events.bind')),
                  v.set('events.bind', function (e, i) {
                    t(), (this.bind = n), this.bind(e, i);
                  }),
                  E.resolve(v.base),
                  g.attachTo(e),
                  v.call('widgets.load');
                });
              }());
            },
            {
              12: 12,
              16: 16,
              19: 19,
              20: 20,
              23: 23,
              25: 25,
              37: 37,
              38: 38,
              39: 39,
              45: 45,
              46: 46,
              47: 47,
              48: 48,
              49: 49,
              51: 51,
              52: 52,
              53: 53,
              58: 58,
              61: 61,
              65: 65,
              68: 68
            }
          ],
          85: [
            function (t, e, n) {
              function i() {}
              let r = t(77),
                o = t(61);
              r.aug(i.prototype, o.Emitter, {
                transportMethod: '',
                init() {},
                send(t) {
                  let e;
                  this._ready
                    ? this._performSend(t)
                    : (e = this.bind('ready', function () {
                      this.unbind('ready', e), this._performSend(t);
                    }));
                },
                ready() {
                  this.trigger('ready', this), (this._ready = !0);
                },
                isReady() {
                  return !!this._ready;
                },
                receive(t) {
                  this.trigger('message', t);
                }
              }),
              (e.exports = { Connection: i });
            },
            { 61: 61, 77: 77 }
          ],
          86: [
            function (t, e, n) {
              function i(t, e) {
                let n = e || Math.floor(100 * Math.random()),
                  i = [
                    `<object id="xdflashshim${n}" name="xdflashshim${n}"`,
                    'type="application/x-shockwave-flash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"',
                    'width="1" height="1" style="position:absolute;left:-9999px;top:-9999px;">',
                    `<param name="movie" value="${t}&debug=${r.__XDDEBUG__}">`,
                    '<param name="wmode" value="window">',
                    '<param name="allowscriptaccess" value="always">',
                    '</object>'
                  ].join(' ');
                return i;
              }
              var r = t(15);
              e.exports = { object: i };
            },
            { 15: 15 }
          ],
          87: [
            function (t, e, n) {
              function i(t) {
                return (JSON.parse || JSON.decode)(t);
              }
              function r(t) {
                this.con = t;
              }
              function o() {
                this.id = o.id++;
              }
              let s = t(77),
                a = t(61);
              s.aug(r.prototype, {
                expose(t) {
                  this.con.bind('message', this._handleRequest(t));
                },
                call(t) {
                  let e,
                    n = this;
                  return (
                    this._requests ||
                      ((this._requests = {}),
                        this.con.bind('message', function (t) {
                          let e;
                          try {
                            t = i(t);
                          } catch (r) {
                            return;
                          }
                          t.callback &&
                          typeof t.id === 'number' &&
                          (e = n._requests[t.id]) &&
                          (t.error
                            ? e.trigger('error', t)
                            : e.trigger('success', t),
                            delete n._requests[t.id]);
                        })),
                    (e = new o()),
                    (this._requests[e.id] = e),
                    e.send(
                      this.con,
                      t,
                      Array.prototype.slice.call(arguments, 1)
                    )
                  );
                },
                _handleRequest(t) {
                  const e = this;
                  return function (n) {
                    let r,
                      o;
                    try {
                      n = i(n);
                    } catch (s) {
                      return;
                    }
                    n.callback ||
                      (typeof n.id === 'number' &&
                        typeof t[n.method] === 'function' &&
                        ((o = e._responseCallbacks(n.id)),
                          (r = t[n.method](...n.params.concat(o))),
                          typeof r !== 'undefined' && o[0](r)));
                  };
                },
                _responseCallbacks(t) {
                  const e = this.con;
                  return [
                    function (n) {
                      e.send(
                        JSON.stringify({ id: t, result: n, callback: !0 })
                      );
                    },
                    function n(i) {
                      e.send(JSON.stringify({ id: t, error: n, callback: i }));
                    }
                  ];
                }
              }),
              (o.id = 0),
              s.aug(o.prototype, a.Emitter, {
                send(t, e, n) {
                  return (
                    t.send(
                      JSON.stringify({ id: this.id, method: e, params: n })
                    ),
                    this
                  );
                },
                success(t) {
                  return this.bind('success', t), this;
                },
                error(t) {
                  return this.bind('error', t), this;
                }
              }),
              (e.exports = function (t) {
                return new r(t);
              });
            },
            { 61: 61, 77: 77 }
          ],
          88: [
            function (t, e, n) {
              function i() {}
              function r(t) {
                (this.transportMethod = 'PostMessage'),
                (this.options = t),
                this._createChild();
              }
              function o(t) {
                (this.transportMethod = 'Flash'),
                (this.options = t),
                (this.token = Math.random()
                  .toString(16)
                  .substring(2)),
                this._setup();
              }
              function s(t) {
                (this.transportMethod = 'Fallback'),
                (this.options = t),
                this._createChild();
              }
              let a,
                c = t(12),
                u = t(15),
                l = t(85),
                d = t(77),
                h = t(60),
                f = t(24),
                p = '__ready__',
                m = 0;
              (i.prototype = new l.Connection()),
              d.aug(i.prototype, {
                _createChild() {
                  this.options.window
                    ? this._createWindow()
                    : this._createIframe();
                },
                _createIframe() {
                  function t() {
                    (o.child = e.contentWindow), o._ready || o.init();
                  }
                  var e,
                    n,
                    i,
                    r,
                    o = this,
                    s = {
                      allowTransparency: !0,
                      frameBorder: '0',
                      scrolling: 'no',
                      tabIndex: '0',
                      name: this._name()
                    },
                    l = d.aug(d.aug({}, s), this.options.iframe);
                  u.postMessage
                    ? (a || (a = c.createElement('iframe')),
                      (e = a.cloneNode(!1)))
                    : (e = c.createElement(`<iframe name="${l.name}">`)),
                  (e.id = l.name),
                  d.forIn(l, function (t, n) {
                    t != 'style' && e.setAttribute(t, n);
                  }),
                  (r = e.getAttribute('style')),
                  r && typeof r.cssText !== 'undefined'
                    ? (r.cssText = l.style)
                    : (e.style.cssText = l.style),
                  e.addEventListener('load', t, !1),
                  (e.src = this._source()),
                  (n = this.options.appendTo)
                    ? n.appendChild(e)
                    : (i = this.options.replace)
                      ? ((n = i.parentNode), n && n.replaceChild(e, i))
                      : c.body.insertBefore(e, c.body.firstChild);
                },
                _createWindow() {
                  const t = f.open(this._source()).popup;
                  t && t.focus(), (this.child = t), this.init();
                },
                _source() {
                  return this.options.src;
                },
                _name() {
                  let t = `_xd_${m++}`;
                  return (
                    u.parent && u.parent != u && u.name && (t = u.name + t), t
                  );
                }
              }),
              (r.prototype = new i()),
              d.aug(r.prototype, {
                init() {
                  function t(t) {
                    t.source === e.child &&
                        (e._ready || t.data !== p
                          ? e.receive(t.data)
                          : e.ready());
                  }
                  var e = this;
                  u.addEventListener('message', t, !1);
                },
                _performSend(t) {
                  this.child.postMessage(t, this.options.src);
                }
              }),
              (o.prototype = new i()),
              d.aug(o.prototype, {
                _setup() {
                  let e = this,
                    n = t(86);
                  u[`__xdcb${e.token}`] = {
                    receive(t) {
                      e._ready || t !== p ? e.receive(t) : e.ready();
                    },
                    loaded() {}
                  };
                  const i = c.createElement('div');
                  (i.innerHTML = n.object(
                    `https://platform.twitter.com/xd/ft.swf?&token=${
                      e.token
                    }&parent=true&callback=__xdcb${
                      e.token
                    }&xdomain=${e._host()}`,
                    e.token
                  )),
                  c.body.insertBefore(i, c.body.firstChild),
                  (e.proxy = i.firstChild),
                  e._createChild();
                },
                init() {},
                _performSend(t) {
                  this.proxy.send(t);
                },
                _host() {
                  return this.options.src
                    .replace(/https?:\/\//, '')
                    .split(/(:|\/)/)[0];
                },
                _source() {
                  return `${this.options.src +
                      (this.options.src.match(/\?/)
                        ? '&'
                        : '?')}xd_token=${u.escape(this.token)}`;
                }
              }),
              (s.prototype = new i()),
              d.aug(s.prototype, {
                init() {},
                _performSend() {}
              }),
              (e.exports = {
                connect(t) {
                  return !h.canPostMessage() || (h.anyIE() && t.window)
                    ? h.anyIE() && h.flashEnabled()
                      ? new o(t)
                      : new s(t)
                    : new r(t);
                }
              });
            },
            { 12: 12, 15: 15, 24: 24, 60: 60, 77: 77, 85: 85, 86: 86 }
          ]
        },
        {},
        [84]
      )));
}());
