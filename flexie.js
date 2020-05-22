var Flexie = (function (H, R) {
	function O(a) {
		if (a) a = a.replace(Ha, E).replace(Ia, E);
		return a;
	}
	function ia(a, d) {
		a = 'on' + a;
		var c = H[a];
		H[a] =
			typeof H[a] !== 'function'
				? d
				: function () {
						c && c();
						d();
				  };
	}
	function ja(a) {
		var d = a.nodeName.toLowerCase();
		if (a.id) d += '#' + a.id;
		else if (a.FLX_DOM_ID) d += '[' + ka + "='" + a.FLX_DOM_ID + "']";
		return d;
	}
	function ca(a) {
		if (!a.FLX_DOM_ID) {
			da += 1;
			a.FLX_DOM_ID = da;
			a.setAttribute(ka, a.FLX_DOM_ID);
		}
	}
	function Ja(a) {
		var d,
			c,
			b,
			e,
			f = /\s?,\s?/,
			g,
			h,
			k,
			i = {},
			n = {},
			r,
			p,
			j,
			l,
			m,
			o,
			y,
			v;
		g = function (s, w, q, A) {
			var z, C, I;
			s = { selector: O(s), properties: [] };
			z = 0;
			for (C = w.properties.length; z < C; z++) {
				I = w.properties[z];
				s.properties.push({
					property: O(I.property),
					value: O(I.value),
				});
			}
			if (q && A) s[q] = A;
			return s;
		};
		h = function (s, w, q, A) {
			var z = q && A ? i[s] : n[s],
				C,
				I,
				P,
				L,
				t;
			if (z) {
				C = 0;
				for (I = w.properties.length; C < I; C++) {
					P = w.properties[C];
					L = 0;
					for (t = z.properties.length; L < t; L++) {
						s = z.properties[L];
						if (P.property === s.property) return false;
					}
					z.properties.push(P);
				}
				if (q && A) z[q] = A;
			} else if (q && A) i[s] = g(s, w, q, A);
			else n[s] = g(s, w, x, x);
		};
		r = 0;
		for (p = a.length; r < p; r++) {
			j = a[r];
			d = O(j.selector).replace(f, ',').split(f);
			l = 0;
			for (m = d.length; l < m; l++) {
				o = O(d[l]);
				c = j.properties;
				y = 0;
				for (v = c.length; y < v; y++) {
					e = c[y];
					b = O(e.property);
					e = O(e.value);
					if (b) {
						b = b.replace('box-', E);
						switch (b) {
							case 'display':
								e === 'box' && h(o, j, x, x);
								break;
							case 'orient':
							case 'align':
							case 'direction':
							case 'pack':
								h(o, j, x, x);
								break;
							case 'flex':
							case 'flex-group':
							case 'ordinal-group':
								h(o, j, b, e);
						}
					}
				}
			}
		}
		for (k in n) n.hasOwnProperty(k) && B.push(n[k]);
		for (k in i) i.hasOwnProperty(k) && la.push(i[k]);
		return { boxes: B, children: la };
	}
	function ma(a, d, c) {
		var b,
			e,
			f = [],
			g,
			h,
			k,
			i,
			n,
			r,
			p;
		g = 0;
		for (h = c.length; g < h; g++) {
			k = c[g];
			if (k.selector) {
				b = d(k.selector);
				b = b[0] ? b : [b];
				if (b[0]) {
					i = 0;
					for (n = b.length; i < n; i++) {
						r = b[i];
						if (r.nodeName !== na)
							switch (r.nodeName.toLowerCase()) {
								case 'script':
								case 'style':
								case 'link':
									break;
								default:
									if (r.parentNode === a) {
										ca(r);
										e = {};
										for (p in k)
											if (k.hasOwnProperty(p))
												e[p] = k[p];
										e.match = r;
										f.push(e);
									}
							}
					}
				}
			} else {
				ca(k);
				f.push({ match: k, selector: ja(k) });
			}
		}
		return f;
	}
	function oa(a, d, c) {
		c = c.replace(c.charAt(0), c.charAt(0).toUpperCase());
		c = a['offset' + c] || 0;
		var b, e, f;
		if (c) {
			b = 0;
			for (e = d.length; b < e; b++) {
				f = parseFloat(a.currentStyle[d[b]]);
				isNaN(f) || (c -= f);
			}
		}
		return c;
	}
	function pa(a, d) {
		var c,
			b,
			e = a.currentStyle && a.currentStyle[d],
			f = a.style;
		if (!qa.test(e) && Ka.test(e)) {
			c = f.left;
			b = a.runtimeStyle.left;
			a.runtimeStyle.left = a.currentStyle.left;
			f.left = e || 0;
			e = f.pixelLeft + 'px';
			f.left = c || 0;
			a.runtimeStyle.left = b;
		}
		return e;
	}
	function D(a, d, c) {
		if (a !== na) {
			if (H.getComputedStyle) a = H.getComputedStyle(a, x)[d];
			else if (La.test(d)) {
				var b = a && a.currentStyle ? a.currentStyle[d] : 0;
				if (!qa.test(b)) {
					if (b === 'auto' || b === 'medium') {
						switch (d) {
							case 'width':
								b = [ra, sa, ta, ua];
								b = oa(a, b, d);
								break;
							case 'height':
								b = [ea, va, wa, xa];
								b = oa(a, b, d);
								break;
							default:
								b = pa(a, d);
						}
						a = b;
					} else a = pa(a, d);
					b = a;
				}
				a = b;
			} else a = a.currentStyle[d];
			if (c) {
				a = parseInt(a, 10);
				if (isNaN(a)) a = 0;
			}
			return a;
		}
	}
	function Ma(a) {
		return a.innerWidth || a.clientWidth;
	}
	function Na(a) {
		return a.innerHeight || a.clientHeight;
	}
	function fa(a, d, c, b) {
		var e = [],
			f,
			g,
			h;
		f = 0;
		for (g = ya.length; f < g; f++) {
			h = ya[f];
			e.push((b ? h : E) + d + ':' + (!b ? h : E) + c);
		}
		a.style.cssText += e.join(';');
		return a;
	}
	function M(a, d, c) {
		var b = a && a[0] ? a : [a],
			e,
			f;
		e = 0;
		for (f = b.length; e < f; e++)
			if ((a = b[e]) && a.style) a.style[d] = c ? c + 'px' : E;
	}
	function Oa(a) {
		var d, c, b, e, f;
		a = a
			.replace(Pa, function (g, h) {
				return '%' + h;
			})
			.replace(/\s|\>|\+|\~/g, '%')
			.split(/%/g);
		d = { _id: 100, _class: 10, _tag: 1 };
		b = c = 0;
		for (e = a.length; b < e; b++) {
			f = a[b];
			if (/#/.test(f)) c += d._id;
			else if (/\.|\[|\:/.test(f)) c += d._class;
			else if (/[a-zA-Z]+/.test(f)) c += d._tag;
		}
		return c;
	}
	function Qa(a, d, c) {
		d = [];
		var b,
			e = (c ? 'ordinal' : 'flex') + 'Specificity',
			f,
			g,
			h,
			k,
			i,
			n;
		f = 0;
		for (g = a.length; f < g; f++) {
			h = a[f];
			if ((!c && h.flex) || (c && h['ordinal-group'])) {
				h[e] = h[e] || Oa(h.selector);
				b = U;
				k = 0;
				for (i = d.length; k < i; k++) {
					n = d[k];
					if (n.match === h.match) {
						if (n[e] < h[e]) d[g] = h;
						return U;
					}
				}
				b || d.push(h);
			}
		}
		return d;
	}
	function Z(a, d, c) {
		var b = {},
			e = [],
			f = 0,
			g,
			h,
			k,
			i,
			n,
			r,
			p,
			j;
		a = Qa(a, d, c);
		h = 0;
		for (k = d.length; h < k; h++) {
			i = d[h];
			n = 0;
			for (r = a.length; n < r; n++) {
				p = a[n];
				if (c) {
					g = p['ordinal-group'] || '1';
					if (p.match === i) {
						p.match.setAttribute('data-ordinal-group', g);
						b[g] = b[g] || [];
						b[g].push(p);
					}
				} else {
					g = p.flex || '0';
					if (
						p.match === i &&
						(!p[g] || (p[g] && parseInt(p[g], 10) <= 1))
					) {
						f += parseInt(g, 10);
						b[g] = b[g] || [];
						b[g].push(p);
					}
				}
			}
			if (c && !i.getAttribute('data-ordinal-group')) {
				g = '1';
				i.setAttribute('data-ordinal-group', g);
				b[g] = b[g] || [];
				b[g].push({ match: i });
			}
		}
		for (j in b) b.hasOwnProperty(j) && e.push(j);
		e.sort(function (l, m) {
			return m - l;
		});
		return { keys: e, groups: b, total: f };
	}
	function Ra() {
		if (!za) {
			var a,
				d,
				c,
				b,
				e = R.body,
				f = R.documentElement,
				g;
			ia('resize', function () {
				g && window.clearTimeout(g);
				g = window.setTimeout(function () {
					c =
						H.innerWidth ||
						f.innerWidth ||
						f.clientWidth ||
						e.clientWidth;
					b =
						H.innerHeight ||
						f.innerHeight ||
						f.clientHeight ||
						e.clientHeight;
					if (a !== c || d !== b) {
						J.updateInstance(x, x);
						a = c;
						d = b;
					}
				}, 250);
			});
			za = u;
		}
	}
	function Aa(a) {
		var d, c, b, e, f;
		d = 0;
		for (c = a.length; d < c; d++) {
			b = a[d];
			e = b.style.width;
			f = b.style.height;
			b.style.cssText = E;
			b.style.width = e;
			b.style.height = f;
		}
	}
	function Y(a, d) {
		var c = [],
			b,
			e,
			f;
		e = 0;
		for (f = d.length; e < f; e++)
			if ((b = d[e]))
				switch (b.nodeName.toLowerCase()) {
					case 'script':
					case 'style':
					case 'link':
						break;
					default:
						if (b.nodeType === 1) c.push(b);
						else if (
							b.nodeType === 3 &&
							(b.isElementContentWhitespace || Sa.test(b.data))
						) {
							a.removeChild(b);
							e--;
						}
				}
		return c;
	}
	function Ba(a) {
		var d = 0;
		a = a.parentNode;
		for (var c; a.FLX_DOM_ID; ) {
			c = B[a.FLX_DOM_ID];
			c = Z(c.children, Y(a, a.childNodes), x);
			d += c.total;
			c = u;
			a = a.parentNode;
		}
		return { nested: c, flex: d };
	}
	function Ta(a, d) {
		var c = a.target;
		if (!c.FLX_DOM_ID) c.FLX_DOM_ID = c.FLX_DOM_ID || ++da;
		if (!a.nodes) a.nodes = Y(c, c.childNodes);
		if (!a.selector) {
			a.selector = ja(c);
			c.setAttribute($, u);
		}
		if (!a.properties) a.properties = [];
		if (!a.children) a.children = ma(c, T, Y(c, c.childNodes));
		if (!a.nested) a.nested = a.selector + ' [' + $ + ']';
		a.target = c;
		a._instance = d;
		return a;
	}
	var J = {},
		da = 0,
		ka = 'data-flexie-id',
		$ = 'data-flexie-parent',
		Q,
		Ca,
		V = {
			NW: { s: '*.Dom.select' },
			DOMAssistant: { s: '*.$', m: '*.DOMReady' },
			Prototype: {
				s: '$$',
				m: 'document.observe',
				p: 'dom:loaded',
				c: 'document',
			},
			YAHOO: {
				s: '*.util.Selector.query',
				m: '*.util.Event.onDOMReady',
				c: '*.util.Event',
			},
			MooTools: { s: '$$', m: 'window.addEvent', p: 'domready' },
			Sizzle: { s: '*' },
			jQuery: { s: '*', m: '*(document).ready' },
			dojo: { s: '*.query', m: '*.addOnLoad' },
		},
		T,
		qa = /^-?\d+(?:px)?$/i,
		Ka = /^-?\d/,
		La = /width|height|margin|padding|border/,
		Ua = /(msie) ([\w.]+)/,
		Va = /\t|\n|\r/g,
		Wa = /^max\-([a-z]+)/,
		Xa = /^https?:\/\//i,
		Ha = /^\s\s*/,
		Ia = /\s\s*$/,
		Sa = /^\s*$/,
		Pa = /\s?(\#|\.|\[|\:(\:)?[^first\-(line|letter)|before|after]+)/g,
		E = '',
		Da = ' ',
		aa = '$1',
		sa = 'paddingRight',
		va = 'paddingBottom',
		ra = 'paddingLeft',
		ea = 'paddingTop',
		ua = 'borderRightWidth',
		xa = 'borderBottomWidth',
		ta = 'borderLeftWidth',
		wa = 'borderTopWidth',
		ya = ' -o- -moz- -ms- -webkit- -khtml- '.split(Da),
		Ya = {
			orient: 'horizontal',
			align: 'stretch',
			direction: 'inherit',
			pack: 'start',
		},
		B = [],
		la = [],
		ga,
		za,
		u = true,
		U = false,
		x = null,
		na,
		W = {
			IE: (function () {
				var a,
					d = Ua.exec(H.navigator.userAgent.toLowerCase());
				if (d) a = parseInt(d[2], 10);
				return a;
			})(),
		},
		Ea;
	Ea = (function () {
		function a(j) {
			return j.replace(k, function (l, m, o) {
				var y, v;
				l = o.split(',');
				o = 0;
				for (y = l.length; o < y; o++) {
					v = l[o];
					v.replace(i, aa)
						.replace(n, aa)
						.replace(p, aa)
						.replace(r, Da);
				}
				return m + l.join(',');
			});
		}
		function d() {
			if (H.XMLHttpRequest) return new H.XMLHttpRequest();
			try {
				return new H.ActiveXObject('Microsoft.XMLHTTP');
			} catch (j) {
				return x;
			}
		}
		function c(j) {
			var l = d();
			l.open('GET', j, U);
			l.send();
			l = l.status === 200 ? l.responseText : E;
			if (j === window.location.href) {
				j = l;
				l = /<style[^<>]*>([^<>]*)<\/style[\s]?>/gim;
				for (var m = l.exec(j), o = []; m; ) {
					(m = m[1]) && o.push(m);
					m = l.exec(j);
				}
				l = o.join('\n\n');
			}
			return l;
		}
		function b(j, l) {
			if (j) {
				if (Xa.test(j))
					return l.substring(0, l.indexOf('/', 8)) ===
						j.substring(0, j.indexOf('/', 8))
						? j
						: x;
				if (j.charAt(0) === '/')
					return l.substring(0, l.indexOf('/', 8)) + j;
				var m = l.split('?')[0];
				if (j.charAt(0) !== '?' && m.charAt(m.length - 1) !== '/')
					m = m.substring(0, m.lastIndexOf('/') + 1);
				return m + j;
			}
		}
		function e(j) {
			if (j)
				return c(j)
					.replace(f, E)
					.replace(g, function (l, m, o, y, v, s) {
						l = e(b(o || v, j));
						return s ? '@media ' + s + ' {' + l + '}' : l;
					})
					.replace(h, function (l, m, o, y) {
						o = o || E;
						return m ? l : ' url(' + o + b(y, j, true) + o + ') ';
					});
			return E;
		}
		var f = /(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)\s*?/g,
			g = /@import\s*(?:(?:(?:url\(\s*(['"]?)(.*)\1)\s*\))|(?:(['"])(.*)\3))\s*([^;]*);/g,
			h = /(behavior\s*?:\s*)?\burl\(\s*(["']?)(?!data:)([^"')]+)\2\s*\)/g,
			k = /((?:^|(?:\s*\})+)(?:\s*@media[^\{]+\{)?)\s*([^\{]*?[\[:][^{]+)/g,
			i = /([(\[+~])\s+/g,
			n = /\s+([)\]+~])/g,
			r = /\s+/g,
			p = /^\s*((?:[\S\s]*\S)?)\s*$/;
		return function () {
			var j,
				l = [],
				m,
				o;
			m = R.getElementsByTagName('BASE');
			var y = m.length > 0 ? m[0].href : R.location.href,
				v = R.styleSheets,
				s,
				w;
			m = 0;
			for (o = v.length; m < o; m++) {
				j = v[m];
				j != x && l.push(j);
			}
			l.push(window.location);
			m = 0;
			for (o = l.length; m < o; m++)
				if ((j = l[m])) {
					if ((j = b(j.href, y))) s = a(e(j));
					if (s) {
						w = s;
						j = [];
						v = void 0;
						var q = void 0,
							A = void 0;
						q = void 0;
						A = void 0;
						var z = void 0,
							C = void 0,
							I = void 0,
							P = void 0;
						z = void 0;
						w = w.replace(Va, E);
						w = w.replace(/\s?(\{|\:|\})\s?/g, aa);
						v = w.split('}');
						for (I in v)
							if (v.hasOwnProperty(I))
								if ((w = v[I])) {
									q = [w, '}'].join(E);
									if (
										(A = /(\@media[^\{]+\{)?(.*)\{(.*)\}/.exec(
											q
										)) &&
										A[3]
									) {
										q = A[2];
										A = A[3].split(';');
										C = [];
										for (P in A)
											if (A.hasOwnProperty(P)) {
												z = A[P];
												z = z.split(':');
												z.length &&
													z[1] &&
													C.push({
														property: z[0],
														value: z[1],
													});
											}
										q &&
											C.length &&
											j.push({
												selector: q,
												properties: C,
											});
									}
								}
						w = j;
						w = Ja(w);
					}
				}
			l = w;
			var L, t, F, G;
			I = {};
			var N;
			P = '[' + $ + ']';
			var K, X, S, ha, ba, Fa, Ga;
			if (l) {
				q = 0;
				for (A = l.boxes.length; q < A; q++) {
					F = l.boxes[q];
					F.selector = O(F.selector);
					s = F.selector;
					m = F.properties;
					o = y = w = j = v = x;
					C = 0;
					for (z = m.length; C < z; C++) {
						G = m[C];
						L = O(G.property);
						t = O(G.value);
						if (L) {
							L = L.replace('box-', E);
							switch (L) {
								case 'display':
									if (t === 'box') o = t;
									break;
								case 'orient':
									y = t;
									break;
								case 'align':
									w = t;
									break;
								case 'direction':
									j = t;
									break;
								case 'pack':
									v = t;
							}
						}
					}
					L = T;
					F = L(F.selector);
					F = F[0] ? F : [F];
					C = 0;
					for (z = F.length; C < z; C++) {
						t = F[C];
						if (t.nodeType) {
							ca(t);
							G = ma(t, L, l.children);
							N = s + ' ' + P;
							G = {
								target: t,
								selector: s,
								properties: m,
								children: G,
								display: o,
								orient: y,
								align: w,
								direction: j,
								pack: v,
								nested: N,
							};
							if ((N = I[t.FLX_DOM_ID]))
								for (K in G) {
									if (G.hasOwnProperty(K)) {
										t = G[K];
										switch (K) {
											case 'selector':
												if (t && !RegExp(t).test(N[K]))
													N[K] += ', ' + t;
												break;
											case 'children':
												X = 0;
												for (
													S = G[K].length;
													X < S;
													X++
												) {
													ha = G[K][X];
													t = U;
													ba = 0;
													for (
														Fa = N[K].length;
														ba < Fa;
														ba++
													) {
														Ga = N[K][ba];
														if (
															ha.match
																.FLX_DOM_ID ===
															Ga.match.FLX_DOM_ID
														)
															t = u;
													}
													t || N[K].push(ha);
												}
												break;
											default:
												if (t) N[K] = t;
										}
									}
								}
							else {
								N = I;
								X = t.FLX_DOM_ID;
								S = void 0;
								for (S in G)
									if (G.hasOwnProperty(S))
										G[S] = G[S] || Ya[S];
								N[X] = G;
								I[t.FLX_DOM_ID].target.setAttribute($, u);
							}
						}
					}
				}
				ga = T(P);
				B = {};
				q = 0;
				for (A = ga.length; q < A; q++) {
					t = ga[q];
					B[t.FLX_DOM_ID] = I[t.FLX_DOM_ID];
				}
				for (K in B)
					if (B.hasOwnProperty(K)) {
						F = B[K];
						F.display === 'box' && new J.box(F);
					}
			}
		};
	})();
	J.box = function (a) {
		return this.renderModel(a);
	};
	J.box.prototype = {
		properties: {
			boxModel: function (a, d, c) {
				var b, e, f, g, h;
				a.style.display = 'block';
				if (W.IE === 8) a.style.overflow = 'hidden';
				if (!c.cleared) {
					d = c.selector.split(/\s?,\s?/);
					b = R.styleSheets;
					b = b[b.length - 1];
					e = 'padding-top:' + (D(a, ea, x) || '0.1px;');
					f = 0;
					for (g = d.length; f < g; f++) {
						h = d[f];
						if (b.addRule)
							if (W.IE < 8) {
								a.style.zoom = '1';
								if (W.IE === 6)
									b.addRule(
										h.replace(/\>|\+|\~/g, ''),
										e + 'zoom:1;',
										0
									);
								else
									W.IE === 7 &&
										b.addRule(
											h,
											e + 'display:inline-block;',
											0
										);
							} else {
								b.addRule(h, e, 0);
								b.addRule(
									h + ':before',
									"content: '.';display: block;height: 0;overflow: hidden",
									0
								);
								b.addRule(
									h + ':after',
									"content: '.';display: block;height: 0;overflow: hidden;clear:both;",
									0
								);
							}
						else if (b.insertRule) {
							b.insertRule(h + '{' + e + '}', 0);
							b.insertRule(
								h +
									":after{content: '.';display: block;height: 0;overflow: hidden;clear:both;}",
								0
							);
						}
					}
					c.cleared = u;
				}
			},
			boxDirection: function (a, d, c) {
				var b, e, f;
				if (
					(c.direction === 'reverse' && !c.reversed) ||
					(c.direction === 'normal' && c.reversed)
				) {
					d = d.reverse();
					b = 0;
					for (e = d.length; b < e; b++) {
						f = d[b];
						a.appendChild(f);
					}
					a = T(c.nested);
					b = 0;
					for (e = a.length; b < e; b++) {
						d = a[b];
						if ((d = B[d.FLX_DOM_ID]) && d.direction === 'inherit')
							d.direction = c.direction;
					}
					c.reversed = !c.reversed;
				}
			},
			boxOrient: function (a, d, c) {
				var b, e, f, g;
				a = {
					pos: 'marginLeft',
					opp: 'marginRight',
					dim: 'width',
					out: 'offsetWidth',
					func: Ma,
					pad: [ra, sa, ta, ua],
				};
				b = {
					pos: 'marginTop',
					opp: 'marginBottom',
					dim: 'height',
					out: 'offsetHeight',
					func: Na,
					pad: [ea, va, wa, xa],
				};
				if (!Q) {
					e = 0;
					for (f = d.length; e < f; e++) {
						g = d[e];
						g.style[W.IE >= 9 ? 'cssFloat' : 'styleFloat'] = 'left';
						if (
							c.orient === 'vertical' ||
							c.orient === 'block-axis'
						)
							g.style.clear = 'left';
						if (W.IE === 6) g.style.display = 'inline';
					}
				}
				switch (c.orient) {
					case 'vertical':
					case 'block-axis':
						this.props = b;
						this.anti = a;
						break;
					default:
						this.props = a;
						this.anti = b;
				}
			},
			boxOrdinalGroup: function (a, d, c) {
				var b, e;
				if (d.length) {
					b = function (f) {
						f = f.keys;
						f = c.reversed ? f : f.reverse();
						var g, h, k, i, n, r;
						g = 0;
						for (h = f.length; g < h; g++) {
							k = f[g];
							i = 0;
							for (n = d.length; i < n; i++) {
								r = d[i];
								k === r.getAttribute('data-ordinal-group') &&
									a.appendChild(r);
							}
						}
					};
					e = Z(c.children, d, u);
					e.keys.length > 1 && b(e);
				}
			},
			boxFlex: function (a, d, c) {
				var b = this,
					e,
					f,
					g,
					h;
				if (d.length) {
					e = function (k) {
						var i = k.groups;
						k = k.keys;
						var n, r, p, j, l, m, o, y, v, s;
						r = 0;
						for (p = k.length; r < p; r++) {
							j = k[r];
							l = 0;
							for (m = i[j].length; l < m; l++) {
								o = i[j][l];
								n = x;
								y = 0;
								for (v = o.properties.length; y < v; y++) {
									s = o.properties[y];
									if (Wa.test(s.property))
										n = parseFloat(s.value);
								}
								if (!n || o.match[b.props.out] > n)
									M(o.match, b.props.pos, x);
							}
						}
					};
					f = function (k) {
						var i = 0,
							n,
							r,
							p,
							j,
							l,
							m;
						n = 0;
						for (r = d.length; n < r; n++) {
							p = d[n];
							i += D(p, b.props.dim, u);
							j = 0;
							for (l = b.props.pad.length; j < l; j++) {
								m = b.props.pad[j];
								i += D(p, m, u);
							}
							i += D(p, b.props.pos, u);
							i += D(p, b.props.opp, u);
						}
						i = a[b.props.out] - i;
						n = 0;
						for (r = b.props.pad.length; n < r; n++) {
							m = b.props.pad[n];
							i -= D(a, m, u);
						}
						return { whitespace: i, ration: i / k.total };
					};
					g = function (k, i) {
						var n = k.groups,
							r = k.keys,
							p,
							j,
							l = i.ration,
							m,
							o,
							y,
							v,
							s,
							w,
							q;
						o = 0;
						for (y = r.length; o < y; o++) {
							v = r[o];
							m = l * v;
							s = 0;
							for (w = n[v].length; s < w; s++) {
								q = n[v][s];
								if (q.match) {
									p = q.match.getAttribute('data-flex');
									j = q.match.getAttribute(
										'data-specificity'
									);
									if (!p || j <= q.flexSpecificity) {
										q.match.setAttribute('data-flex', v);
										q.match.setAttribute(
											'data-specificity',
											q.flexSpecificity
										);
										p = D(q.match, b.props.dim, u);
										p = Math.max(0, p + m);
										M(q.match, b.props.dim, p);
									}
								}
							}
						}
					};
					h = Z(c.children, d, x);
					if (h.total) {
						c.hasFlex = u;
						e(h);
						c = f(h);
						g(h, c);
					}
				}
			},
			boxAlign: function (a, d, c) {
				var b, e;
				b = Ba(a);
				var f, g, h, k, i;
				if (
					!Q &&
					!b.flex &&
					(c.orient === 'vertical' || c.orient === 'block-axis')
				) {
					a: {
						b = this.anti.dim;
						f = a.parentNode;
						if (f.FLX_DOM_ID) {
							f = B[f.FLX_DOM_ID];
							g = 0;
							for (h = f.properties.length; g < h; g++) {
								k = f.properties[g];
								if (RegExp(b).test(k.property)) {
									b = U;
									break a;
								}
							}
						}
						b = void 0;
					}
					b || M(a, this.anti.dim, x);
					M(d, this.anti.dim, x);
				}
				b = a[this.anti.out];
				f = 0;
				for (g = this.anti.pad.length; f < g; f++) {
					h = this.anti.pad[f];
					b -= D(a, h, u);
				}
				switch (c.align) {
					case 'start':
						break;
					case 'end':
						f = 0;
						for (g = d.length; f < g; f++) {
							i = d[f];
							e = b - i[this.anti.out];
							e -= D(i, this.anti.opp, u);
							M(i, this.anti.pos, e);
						}
						break;
					case 'center':
						f = 0;
						for (g = d.length; f < g; f++) {
							i = d[f];
							e = (b - i[this.anti.out]) / 2;
							M(i, this.anti.pos, e);
						}
						break;
					default:
						f = 0;
						for (g = d.length; f < g; f++) {
							i = d[f];
							switch (i.nodeName.toLowerCase()) {
								case 'button':
								case 'input':
								case 'select':
									break;
								default:
									c = e = 0;
									for (k = this.anti.pad.length; c < k; c++) {
										h = this.anti.pad[c];
										e += D(i, h, u);
										e += D(a, h, u);
									}
									i.style[this.anti.dim] = '100%';
									M(i, this.anti.dim, x);
									e = b;
									e -= D(i, this.anti.pos, u);
									c = 0;
									for (k = this.anti.pad.length; c < k; c++) {
										h = this.anti.pad[c];
										e -= D(i, h, u);
									}
									e -= D(i, this.anti.opp, u);
									e = Math.max(0, e);
									M(i, this.anti.dim, e);
							}
						}
				}
			},
			boxPack: function (a, d, c) {
				var b = 0,
					e = 0,
					f = 0,
					g;
				g = d.length - 1;
				var h, k, i;
				h = 0;
				for (k = d.length; h < k; h++) {
					e = d[h];
					b += e[this.props.out];
					b += D(e, this.props.pos, u);
					b += D(e, this.props.opp, u);
				}
				e = D(d[0], this.props.pos, u);
				b = a[this.props.out] - b;
				h = 0;
				for (k = this.props.pad.length; h < k; h++) {
					i = this.props.pad[h];
					b -= D(a, i, u);
				}
				if (b < 0) b = Math.max(0, b);
				switch (c.pack) {
					case 'end':
						M(d[0], this.props.pos, f + e + b);
						break;
					case 'center':
						if (f) f /= 2;
						M(d[0], this.props.pos, f + e + Math.floor(b / 2));
						break;
					case 'justify':
						c = Math.floor((f + b) / g);
						g = c * g - b;
						for (h = d.length - 1; h; ) {
							e = d[h];
							f = c;
							if (g) {
								f++;
								g++;
							}
							f = D(e, this.props.pos, u) + f;
							M(e, this.props.pos, f);
							h--;
						}
				}
				a.style.overflow = '';
			},
		},
		setup: function (a, d, c) {
			var b, e;
			if (!(!a || !d || !c))
				if (Q && Q.partialSupport) {
					b = Z(c.children, d, x);
					e = Ba(a);
					d = Y(a, a.childNodes);
					this.properties.boxOrient.call(this, a, d, c);
					if (!b.total || !T(c.nested).length) {
						if (
							c.align === 'stretch' &&
							!Q.boxAlignStretch &&
							(!e.nested || !e.flex)
						)
							this.properties.boxAlign.call(this, a, d, c);
						c.pack === 'justify' &&
							!Q.boxPackJustify &&
							!b.total &&
							this.properties.boxPack.call(this, a, d, c);
					}
				} else if (!Q)
					for (b in this.properties)
						if (this.properties.hasOwnProperty(b)) {
							d = this.properties[b];
							d.call(this, a, Y(a, a.childNodes), c);
						}
		},
		trackDOM: function (a) {
			Ra(this, a);
		},
		updateModel: function (a) {
			var d = a.target,
				c = a.nodes;
			Aa(c);
			if (a.flexMatrix || a.ordinalMatrix) {
				var b, e, f;
				if (a.flexMatrix) {
					b = 0;
					for (e = a.children.length; b < e; b++) {
						f = a.children[b];
						f.flex = a.flexMatrix[b];
					}
				}
				if (a.ordinalMatrix) {
					b = 0;
					for (e = a.children.length; b < e; b++) {
						f = a.children[b];
						f['ordinal-group'] = a.ordinalMatrix[b];
					}
				}
			}
			this.setup(d, c, a);
			this.bubbleUp(d, a);
		},
		renderModel: function (a) {
			var d = this,
				c = a.target,
				b = c.childNodes;
			if (!c.length && !b) return false;
			a = Ta(a, this);
			d.updateModel(a);
			H.setTimeout(function () {
				d.trackDOM(a);
			}, 0);
			return d;
		},
		bubbleUp: function (a, d) {
			for (var c, b = d.target.parentNode; b; ) {
				if ((c = B[b.FLX_DOM_ID])) {
					Aa(c.nodes);
					this.setup(c.target, c.nodes, c);
				}
				b = b.parentNode;
			}
		},
	};
	J.updateInstance = function (a, d) {
		var c, b;
		if (a)
			if ((c = B[a.FLX_DOM_ID])) c._instance.updateModel(c);
			else new J.box(d);
		else
			for (b in B)
				if (B.hasOwnProperty(b)) {
					c = B[b];
					c._instance.updateModel(c);
				}
	};
	J.getInstance = function (a) {
		return B[a.FLX_DOM_ID];
	};
	J.destroyInstance = function (a) {
		var d, c, b, e, f;
		d = function (g) {
			g.target.FLX_DOM_ID = x;
			g.target.style.cssText = E;
			c = 0;
			for (b = g.children.length; c < b; c++) {
				e = g.children[c];
				e.match.style.cssText = E;
			}
		};
		if (a) (a = B[a.FLX_DOM_ID]) && d(a);
		else {
			for (f in B) B.hasOwnProperty(f) && d(B[f]);
			B = [];
		}
	};
	J.flexboxSupport = function () {
		var a = {},
			d,
			c = R.createElement('flxbox'),
			b,
			e,
			f;
		c.style.width = c.style.height = '100px';
		c.innerHTML =
			'<b style="margin: 0; padding: 0; display:block; width: 10px; height:50px"></b><b style="margin: 0; padding: 0; display:block; width: 10px; height:50px"></b><b style="margin: 0; padding: 0; display:block; width: 10px; height:50px"></b>';
		fa(c, 'display', 'box', x);
		fa(c, 'box-align', 'stretch', u);
		fa(c, 'box-pack', 'justify', u);
		R.body.appendChild(c);
		d = c.firstChild.offsetHeight;
		b = {
			boxAlignStretch: function () {
				return d === 100;
			},
			boxPackJustify: function () {
				var g = 0,
					h,
					k;
				h = 0;
				for (k = c.childNodes.length; h < k; h++)
					g += c.childNodes[h].offsetLeft;
				return g === 135;
			},
		};
		for (f in b)
			if (b.hasOwnProperty(f)) {
				e = b[f];
				e = e();
				if (!e) a.partialSupport = u;
				a[f] = e;
			}
		R.body.removeChild(c);
		return ~c.style.display.indexOf('box') ? a : U;
	};
	J.init = function () {
		J.flexboxSupported = Q = J.flexboxSupport();
		if ((!Q || Q.partialSupport) && T) Ea();
	};
	J.version = '1.0.3';
	(function (a) {
		if (!Ca) {
			var d, c, b;
			for (c in V)
				if (V.hasOwnProperty(c)) {
					b = V[c];
					if (H[c] && !d)
						if ((d = eval(b.s.replace('*', c)))) {
							Ca = c;
							break;
						}
				}
			T = d;
		}
		var e, f;
		for (f in V)
			if (V.hasOwnProperty(f)) {
				b = V[f];
				if (H[f] && !e && b.m) {
					e = eval(b.m.replace('*', f));
					d = b.c ? eval(b.c.replace('*', f)) : H;
					c = [];
					if (e && d) {
						b.p && c.push(b.p);
						c.push(a);
						e.apply(d, c);
						break;
					}
				}
			}
		e || ia('load', a);
	})(J.init);
	return J;
})(this, document);
