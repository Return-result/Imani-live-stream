define("./workbox-e05acd6a.js", ["exports"], function (t) {
  "use strict";
  try {
    self["workbox:core:5.1.3"] && _();
  } catch (t) {}
  const e = (t, ...e) => {
    let s = t;
    return e.length > 0 && (s += " :: " + JSON.stringify(e)), s;
  };
  class s extends Error {
    constructor(t, s) {
      super(e(t, s)), (this.name = t), (this.details = s);
    }
  }
  try {
    self["workbox:routing:5.1.3"] && _();
  } catch (t) {}
  const n = (t) => (t && "object" == typeof t ? t : { handle: t });
  class i {
    constructor(t, e, s = "GET") {
      (this.handler = n(e)), (this.match = t), (this.method = s);
    }
  }
  class r extends i {
    constructor(t, e, s) {
      super(
        ({ url: e }) => {
          const s = t.exec(e.href);
          if (s && (e.origin === location.origin || 0 === s.index))
            return s.slice(1);
        },
        e,
        s
      );
    }
  }
  const a = (t) =>
    new URL(String(t), location.href).href.replace(
      new RegExp("^" + location.origin),
      ""
    );
  class c {
    constructor() {
      this.t = new Map();
    }
    get routes() {
      return this.t;
    }
    addFetchListener() {
      self.addEventListener("fetch", (t) => {
        const { request: e } = t,
          s = this.handleRequest({ request: e, event: t });
        s && t.respondWith(s);
      });
    }
    addCacheListener() {
      self.addEventListener("message", (t) => {
        if (t.data && "CACHE_URLS" === t.data.type) {
          const { payload: e } = t.data,
            s = Promise.all(
              e.urlsToCache.map((t) => {
                "string" == typeof t && (t = [t]);
                const e = new Request(...t);
                return this.handleRequest({ request: e });
              })
            );
          t.waitUntil(s),
            t.ports && t.ports[0] && s.then(() => t.ports[0].postMessage(!0));
        }
      });
    }
    handleRequest({ request: t, event: e }) {
      const s = new URL(t.url, location.href);
      if (!s.protocol.startsWith("http")) return;
      const { params: n, route: i } = this.findMatchingRoute({
        url: s,
        request: t,
        event: e,
      });
      let r,
        a = i && i.handler;
      if ((!a && this.s && (a = this.s), a)) {
        try {
          r = a.handle({ url: s, request: t, event: e, params: n });
        } catch (t) {
          r = Promise.reject(t);
        }
        return (
          r instanceof Promise &&
            this.i &&
            (r = r.catch((n) =>
              this.i.handle({ url: s, request: t, event: e })
            )),
          r
        );
      }
    }
    findMatchingRoute({ url: t, request: e, event: s }) {
      const n = this.t.get(e.method) || [];
      for (const i of n) {
        let n;
        const r = i.match({ url: t, request: e, event: s });
        if (r)
          return (
            (n = r),
            ((Array.isArray(r) && 0 === r.length) ||
              (r.constructor === Object && 0 === Object.keys(r).length) ||
              "boolean" == typeof r) &&
              (n = void 0),
            { route: i, params: n }
          );
      }
      return {};
    }
    setDefaultHandler(t) {
      this.s = n(t);
    }
    setCatchHandler(t) {
      this.i = n(t);
    }
    registerRoute(t) {
      this.t.has(t.method) || this.t.set(t.method, []),
        this.t.get(t.method).push(t);
    }
    unregisterRoute(t) {
      if (!this.t.has(t.method))
        throw new s("unregister-route-but-not-found-with-method", {
          method: t.method,
        });
      const e = this.t.get(t.method).indexOf(t);
      if (!(e > -1)) throw new s("unregister-route-route-not-registered");
      this.t.get(t.method).splice(e, 1);
    }
  }
  let o;
  const h = () => (
    o || ((o = new c()), o.addFetchListener(), o.addCacheListener()), o
  );
  const u = {
      googleAnalytics: "googleAnalytics",
      precache: "precache-v2",
      prefix: "workbox",
      runtime: "runtime",
      suffix: "undefined" != typeof registration ? registration.scope : "",
    },
    l = (t) =>
      [u.prefix, t, u.suffix].filter((t) => t && t.length > 0).join("-"),
    f = (t) => {
      ((t) => {
        for (const e of Object.keys(u)) t(e);
      })((e) => {
        "string" == typeof t[e] && (u[e] = t[e]);
      });
    },
    w = (t) => t || l(u.precache),
    d = (t) => t || l(u.runtime);
  function p(t) {
    t.then(() => {});
  }
  const y = new Set();
  class g {
    constructor(t, e, { onupgradeneeded: s, onversionchange: n } = {}) {
      (this.o = null),
        (this.h = t),
        (this.u = e),
        (this.l = s),
        (this.p = n || (() => this.close()));
    }
    get db() {
      return this.o;
    }
    async open() {
      if (!this.o)
        return (
          (this.o = await new Promise((t, e) => {
            let s = !1;
            setTimeout(() => {
              (s = !0),
                e(new Error("The open request was blocked and timed out"));
            }, this.OPEN_TIMEOUT);
            const n = indexedDB.open(this.h, this.u);
            (n.onerror = () => e(n.error)),
              (n.onupgradeneeded = (t) => {
                s
                  ? (n.transaction.abort(), n.result.close())
                  : "function" == typeof this.l && this.l(t);
              }),
              (n.onsuccess = () => {
                const e = n.result;
                s ? e.close() : ((e.onversionchange = this.p.bind(this)), t(e));
              });
          })),
          this
        );
    }
    async getKey(t, e) {
      return (await this.getAllKeys(t, e, 1))[0];
    }
    async getAll(t, e, s) {
      return await this.getAllMatching(t, { query: e, count: s });
    }
    async getAllKeys(t, e, s) {
      return (
        await this.getAllMatching(t, { query: e, count: s, includeKeys: !0 })
      ).map((t) => t.key);
    }
    async getAllMatching(
      t,
      {
        index: e,
        query: s = null,
        direction: n = "next",
        count: i,
        includeKeys: r = !1,
      } = {}
    ) {
      return await this.transaction([t], "readonly", (a, c) => {
        const o = a.objectStore(t),
          h = e ? o.index(e) : o,
          u = [],
          l = h.openCursor(s, n);
        l.onsuccess = () => {
          const t = l.result;
          t
            ? (u.push(r ? t : t.value),
              i && u.length >= i ? c(u) : t.continue())
            : c(u);
        };
      });
    }
    async transaction(t, e, s) {
      return (
        await this.open(),
        await new Promise((n, i) => {
          const r = this.o.transaction(t, e);
          (r.onabort = () => i(r.error)),
            (r.oncomplete = () => n()),
            s(r, (t) => n(t));
        })
      );
    }
    async g(t, e, s, ...n) {
      return await this.transaction([e], s, (s, i) => {
        const r = s.objectStore(e),
          a = r[t].apply(r, n);
        a.onsuccess = () => i(a.result);
      });
    }
    close() {
      this.o && (this.o.close(), (this.o = null));
    }
  }
  g.prototype.OPEN_TIMEOUT = 2e3;
  const m = {
    readonly: ["get", "count", "getKey", "getAll", "getAllKeys"],
    readwrite: ["add", "put", "clear", "delete"],
  };
  for (const [t, e] of Object.entries(m))
    for (const s of e)
      s in IDBObjectStore.prototype &&
        (g.prototype[s] = async function (e, ...n) {
          return await this.g(s, e, t, ...n);
        });
  try {
    self["workbox:expiration:5.1.3"] && _();
  } catch (t) {}
  const R = (t) => {
    const e = new URL(t, location.href);
    return (e.hash = ""), e.href;
  };
  class q {
    constructor(t) {
      (this.m = t),
        (this.o = new g("workbox-expiration", 1, {
          onupgradeneeded: (t) => this.R(t),
        }));
    }
    R(t) {
      const e = t.target.result.createObjectStore("cache-entries", {
        keyPath: "id",
      });
      e.createIndex("cacheName", "cacheName", { unique: !1 }),
        e.createIndex("timestamp", "timestamp", { unique: !1 }),
        (async (t) => {
          await new Promise((e, s) => {
            const n = indexedDB.deleteDatabase(t);
            (n.onerror = () => {
              s(n.error);
            }),
              (n.onblocked = () => {
                s(new Error("Delete blocked"));
              }),
              (n.onsuccess = () => {
                e();
              });
          });
        })(this.m);
    }
    async setTimestamp(t, e) {
      const s = {
        url: (t = R(t)),
        timestamp: e,
        cacheName: this.m,
        id: this.q(t),
      };
      await this.o.put("cache-entries", s);
    }
    async getTimestamp(t) {
      return (await this.o.get("cache-entries", this.q(t))).timestamp;
    }
    async expireEntries(t, e) {
      const s = await this.o.transaction(
          "cache-entries",
          "readwrite",
          (s, n) => {
            const i = s
                .objectStore("cache-entries")
                .index("timestamp")
                .openCursor(null, "prev"),
              r = [];
            let a = 0;
            i.onsuccess = () => {
              const s = i.result;
              if (s) {
                const n = s.value;
                n.cacheName === this.m &&
                  ((t && n.timestamp < t) || (e && a >= e)
                    ? r.push(s.value)
                    : a++),
                  s.continue();
              } else n(r);
            };
          }
        ),
        n = [];
      for (const t of s)
        await this.o.delete("cache-entries", t.id), n.push(t.url);
      return n;
    }
    q(t) {
      return this.m + "|" + R(t);
    }
  }
  class v {
    constructor(t, e = {}) {
      (this.v = !1),
        (this.U = !1),
        (this.L = e.maxEntries),
        (this.N = e.maxAgeSeconds),
        (this.m = t),
        (this._ = new q(t));
    }
    async expireEntries() {
      if (this.v) return void (this.U = !0);
      this.v = !0;
      const t = this.N ? Date.now() - 1e3 * this.N : 0,
        e = await this._.expireEntries(t, this.L),
        s = await self.caches.open(this.m);
      for (const t of e) await s.delete(t);
      (this.v = !1), this.U && ((this.U = !1), p(this.expireEntries()));
    }
    async updateTimestamp(t) {
      await this._.setTimestamp(t, Date.now());
    }
    async isURLExpired(t) {
      if (this.N) {
        return (await this._.getTimestamp(t)) < Date.now() - 1e3 * this.N;
      }
      return !1;
    }
    async delete() {
      (this.U = !1), await this._.expireEntries(1 / 0);
    }
  }
  const U = (t, e) => t.filter((t) => e in t),
    L = async ({ request: t, mode: e, plugins: s = [] }) => {
      const n = U(s, "cacheKeyWillBeUsed");
      let i = t;
      for (const t of n)
        (i = await t.cacheKeyWillBeUsed.call(t, { mode: e, request: i })),
          "string" == typeof i && (i = new Request(i));
      return i;
    },
    x = async ({
      cacheName: t,
      request: e,
      event: s,
      matchOptions: n,
      plugins: i = [],
    }) => {
      const r = await self.caches.open(t),
        a = await L({ plugins: i, request: e, mode: "read" });
      let c = await r.match(a, n);
      for (const e of i)
        if ("cachedResponseWillBeUsed" in e) {
          const i = e.cachedResponseWillBeUsed;
          c = await i.call(e, {
            cacheName: t,
            event: s,
            matchOptions: n,
            cachedResponse: c,
            request: a,
          });
        }
      return c;
    },
    N = async ({
      cacheName: t,
      request: e,
      response: n,
      event: i,
      plugins: r = [],
      matchOptions: c,
    }) => {
      const o = await L({ plugins: r, request: e, mode: "write" });
      if (!n) throw new s("cache-put-with-no-response", { url: a(o.url) });
      const h = await (async ({
        request: t,
        response: e,
        event: s,
        plugins: n = [],
      }) => {
        let i = e,
          r = !1;
        for (const e of n)
          if ("cacheWillUpdate" in e) {
            r = !0;
            const n = e.cacheWillUpdate;
            if (
              ((i = await n.call(e, { request: t, response: i, event: s })), !i)
            )
              break;
          }
        return r || (i = i && 200 === i.status ? i : void 0), i || null;
      })({ event: i, plugins: r, response: n, request: o });
      if (!h) return;
      const u = await self.caches.open(t),
        l = U(r, "cacheDidUpdate"),
        f =
          l.length > 0
            ? await x({ cacheName: t, matchOptions: c, request: o })
            : null;
      try {
        await u.put(o, h);
      } catch (t) {
        throw (
          ("QuotaExceededError" === t.name &&
            (await (async function () {
              for (const t of y) await t();
            })()),
          t)
        );
      }
      for (const e of l)
        await e.cacheDidUpdate.call(e, {
          cacheName: t,
          event: i,
          oldResponse: f,
          newResponse: h,
          request: o,
        });
    },
    b = x,
    E = async ({ request: t, fetchOptions: e, event: n, plugins: i = [] }) => {
      if (
        ("string" == typeof t && (t = new Request(t)),
        n instanceof FetchEvent && n.preloadResponse)
      ) {
        const t = await n.preloadResponse;
        if (t) return t;
      }
      const r = U(i, "fetchDidFail"),
        a = r.length > 0 ? t.clone() : null;
      try {
        for (const e of i)
          if ("requestWillFetch" in e) {
            const s = e.requestWillFetch,
              i = t.clone();
            t = await s.call(e, { request: i, event: n });
          }
      } catch (t) {
        throw new s("plugin-error-request-will-fetch", { thrownError: t });
      }
      const c = t.clone();
      try {
        let s;
        s = "navigate" === t.mode ? await fetch(t) : await fetch(t, e);
        for (const t of i)
          "fetchDidSucceed" in t &&
            (s = await t.fetchDidSucceed.call(t, {
              event: n,
              request: c,
              response: s,
            }));
        return s;
      } catch (t) {
        for (const e of r)
          await e.fetchDidFail.call(e, {
            error: t,
            event: n,
            originalRequest: a.clone(),
            request: c.clone(),
          });
        throw t;
      }
    };
  try {
    self["workbox:strategies:5.1.3"] && _();
  } catch (t) {}
  let K;
  async function M(t, e) {
    const s = t.clone(),
      n = {
        headers: new Headers(s.headers),
        status: s.status,
        statusText: s.statusText,
      },
      i = e ? e(n) : n,
      r = (function () {
        if (void 0 === K) {
          const t = new Response("");
          if ("body" in t)
            try {
              new Response(t.body), (K = !0);
            } catch (t) {
              K = !1;
            }
          K = !1;
        }
        return K;
      })()
        ? s.body
        : await s.blob();
    return new Response(r, i);
  }
  try {
    self["workbox:precaching:5.1.3"] && _();
  } catch (t) {}
  function O(t) {
    if (!t) throw new s("add-to-cache-list-unexpected-type", { entry: t });
    if ("string" == typeof t) {
      const e = new URL(t, location.href);
      return { cacheKey: e.href, url: e.href };
    }
    const { revision: e, url: n } = t;
    if (!n) throw new s("add-to-cache-list-unexpected-type", { entry: t });
    if (!e) {
      const t = new URL(n, location.href);
      return { cacheKey: t.href, url: t.href };
    }
    const i = new URL(n, location.href),
      r = new URL(n, location.href);
    return (
      i.searchParams.set("__WB_REVISION__", e),
      { cacheKey: i.href, url: r.href }
    );
  }
  class D {
    constructor(t) {
      (this.m = w(t)),
        (this.K = new Map()),
        (this.M = new Map()),
        (this.O = new Map());
    }
    addToCacheList(t) {
      const e = [];
      for (const n of t) {
        "string" == typeof n
          ? e.push(n)
          : n && void 0 === n.revision && e.push(n.url);
        const { cacheKey: t, url: i } = O(n),
          r = "string" != typeof n && n.revision ? "reload" : "default";
        if (this.K.has(i) && this.K.get(i) !== t)
          throw new s("add-to-cache-list-conflicting-entries", {
            firstEntry: this.K.get(i),
            secondEntry: t,
          });
        if ("string" != typeof n && n.integrity) {
          if (this.O.has(t) && this.O.get(t) !== n.integrity)
            throw new s("add-to-cache-list-conflicting-integrities", {
              url: i,
            });
          this.O.set(t, n.integrity);
        }
        if ((this.K.set(i, t), this.M.set(i, r), e.length > 0)) {
          const t = `Workbox is precaching URLs without revision info: ${e.join(
            ", "
          )}\nThis is generally NOT safe tho we will use it here`;
          console.warn(t);
        }
      }
    }
    async install({ event: t, plugins: e } = {}) {
      const s = [],
        n = [],
        i = await self.caches.open(this.m),
        r = await i.keys(),
        a = new Set(r.map((t) => t.url));
      for (const [t, e] of this.K)
        a.has(e) ? n.push(t) : s.push({ cacheKey: e, url: t });
      const c = s.map(({ cacheKey: s, url: n }) => {
        const i = this.O.get(s),
          r = this.M.get(n);
        return this.D({
          cacheKey: s,
          cacheMode: r,
          event: t,
          integrity: i,
          plugins: e,
          url: n,
        });
      });
      await Promise.all(c);
      return { updatedURLs: s.map((t) => t.url), notUpdatedURLs: n };
    }
    async activate() {
      const t = await self.caches.open(this.m),
        e = await t.keys(),
        s = new Set(this.K.values()),
        n = [];
      for (const i of e) s.has(i.url) || (await t.delete(i), n.push(i.url));
      return { deletedURLs: n };
    }
    async D({
      cacheKey: t,
      url: e,
      cacheMode: n,
      event: i,
      plugins: r,
      integrity: a,
    }) {
      const c = new Request(e, {
        integrity: a,
        cache: n,
        credentials: "same-origin",
      });
      let o,
        h = await E({ event: i, plugins: r, request: c });
      for (const t of r || []) "cacheWillUpdate" in t && (o = t);
      if (
        !(o
          ? await o.cacheWillUpdate({ event: i, request: c, response: h })
          : h.status < 400)
      )
        throw new s("bad-precaching-response", { url: e, status: h.status });
      h.redirected && (h = await M(h)),
        await N({
          event: i,
          plugins: r,
          response: h,
          request: t === e ? c : new Request(t),
          cacheName: this.m,
          matchOptions: { ignoreSearch: !0 },
        });
    }
    getURLsToCacheKeys() {
      return this.K;
    }
    getCachedURLs() {
      return [...this.K.keys()];
    }
    getCacheKeyForURL(t) {
      const e = new URL(t, location.href);
      return this.K.get(e.href);
    }
    async matchPrecache(t) {
      const e = t instanceof Request ? t.url : t,
        s = this.getCacheKeyForURL(e);
      if (s) {
        return (await self.caches.open(this.m)).match(s);
      }
    }
    createHandler(t = !0) {
      return async ({ request: e }) => {
        try {
          const t = await this.matchPrecache(e);
          if (t) return t;
          throw new s("missing-precache-entry", {
            cacheName: this.m,
            url: e instanceof Request ? e.url : e,
          });
        } catch (s) {
          if (t) return fetch(e);
          throw s;
        }
      };
    }
    createHandlerBoundToURL(t, e = !0) {
      if (!this.getCacheKeyForURL(t))
        throw new s("non-precached-url", { url: t });
      const n = this.createHandler(e),
        i = new Request(t);
      return () => n({ request: i });
    }
  }
  let T;
  const P = () => (T || (T = new D()), T);
  const C = (t, e) => {
    const s = P().getURLsToCacheKeys();
    for (const n of (function* (
      t,
      {
        ignoreURLParametersMatching: e,
        directoryIndex: s,
        cleanURLs: n,
        urlManipulation: i,
      } = {}
    ) {
      const r = new URL(t, location.href);
      (r.hash = ""), yield r.href;
      const a = (function (t, e = []) {
        for (const s of [...t.searchParams.keys()])
          e.some((t) => t.test(s)) && t.searchParams.delete(s);
        return t;
      })(r, e);
      if ((yield a.href, s && a.pathname.endsWith("/"))) {
        const t = new URL(a.href);
        (t.pathname += s), yield t.href;
      }
      if (n) {
        const t = new URL(a.href);
        (t.pathname += ".html"), yield t.href;
      }
      if (i) {
        const t = i({ url: r });
        for (const e of t) yield e.href;
      }
    })(t, e)) {
      const t = s.get(n);
      if (t) return t;
    }
  };
  let k = !1;
  function A(t) {
    k ||
      ((({
        ignoreURLParametersMatching: t = [/^utm_/],
        directoryIndex: e = "index.html",
        cleanURLs: s = !0,
        urlManipulation: n,
      } = {}) => {
        const i = w();
        self.addEventListener("fetch", (r) => {
          const a = C(r.request.url, {
            cleanURLs: s,
            directoryIndex: e,
            ignoreURLParametersMatching: t,
            urlManipulation: n,
          });
          if (!a) return;
          let c = self.caches
            .open(i)
            .then((t) => t.match(a))
            .then((t) => t || fetch(a));
          r.respondWith(c);
        });
      })(t),
      (k = !0));
  }
  const S = [],
    j = {
      get: () => S,
      add(t) {
        S.push(...t);
      },
    },
    B = (t) => {
      const e = P(),
        s = j.get();
      t.waitUntil(
        e.install({ event: t, plugins: s }).catch((t) => {
          throw t;
        })
      );
    },
    F = (t) => {
      const e = P();
      t.waitUntil(e.activate());
    };
  (t.CacheFirst = class {
    constructor(t = {}) {
      (this.m = d(t.cacheName)),
        (this.T = t.plugins || []),
        (this.P = t.fetchOptions),
        (this.C = t.matchOptions);
    }
    async handle({ event: t, request: e }) {
      "string" == typeof e && (e = new Request(e));
      let n,
        i = await b({
          cacheName: this.m,
          request: e,
          event: t,
          matchOptions: this.C,
          plugins: this.T,
        });
      if (!i)
        try {
          i = await this.k(e, t);
        } catch (t) {
          n = t;
        }
      if (!i) throw new s("no-response", { url: e.url, error: n });
      return i;
    }
    async k(t, e) {
      const s = await E({
          request: t,
          event: e,
          fetchOptions: this.P,
          plugins: this.T,
        }),
        n = s.clone(),
        i = N({
          cacheName: this.m,
          request: t,
          response: n,
          event: e,
          plugins: this.T,
        });
      if (e)
        try {
          e.waitUntil(i);
        } catch (t) {}
      return s;
    }
  }),
    (t.ExpirationPlugin = class {
      constructor(t = {}) {
        var e;
        (this.cachedResponseWillBeUsed = async ({
          event: t,
          request: e,
          cacheName: s,
          cachedResponse: n,
        }) => {
          if (!n) return null;
          const i = this.A(n),
            r = this.S(s);
          p(r.expireEntries());
          const a = r.updateTimestamp(e.url);
          if (t)
            try {
              t.waitUntil(a);
            } catch (t) {}
          return i ? n : null;
        }),
          (this.cacheDidUpdate = async ({ cacheName: t, request: e }) => {
            const s = this.S(t);
            await s.updateTimestamp(e.url), await s.expireEntries();
          }),
          (this.j = t),
          (this.N = t.maxAgeSeconds),
          (this.B = new Map()),
          t.purgeOnQuotaError &&
            ((e = () => this.deleteCacheAndMetadata()), y.add(e));
      }
      S(t) {
        if (t === d()) throw new s("expire-custom-caches-only");
        let e = this.B.get(t);
        return e || ((e = new v(t, this.j)), this.B.set(t, e)), e;
      }
      A(t) {
        if (!this.N) return !0;
        const e = this.F(t);
        if (null === e) return !0;
        return e >= Date.now() - 1e3 * this.N;
      }
      F(t) {
        if (!t.headers.has("date")) return null;
        const e = t.headers.get("date"),
          s = new Date(e).getTime();
        return isNaN(s) ? null : s;
      }
      async deleteCacheAndMetadata() {
        for (const [t, e] of this.B)
          await self.caches.delete(t), await e.delete();
        this.B = new Map();
      }
    }),
    (t.precacheAndRoute = function (t, e) {
      !(function (t) {
        P().addToCacheList(t),
          t.length > 0 &&
            (self.addEventListener("install", B),
            self.addEventListener("activate", F));
      })(t),
        A(e);
    }),
    (t.registerRoute = function (t, e, n) {
      let a;
      if ("string" == typeof t) {
        const s = new URL(t, location.href);
        a = new i(({ url: t }) => t.href === s.href, e, n);
      } else if (t instanceof RegExp) a = new r(t, e, n);
      else if ("function" == typeof t) a = new i(t, e, n);
      else {
        if (!(t instanceof i))
          throw new s("unsupported-route-type", {
            moduleName: "workbox-routing",
            funcName: "registerRoute",
            paramName: "capture",
          });
        a = t;
      }
      return h().registerRoute(a), a;
    }),
    (t.setCacheNameDetails = function (t) {
      f(t);
    });
});
//# sourceMappingURL=workbox-e05acd6a.js.map
