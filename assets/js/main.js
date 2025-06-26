/*
	Eventually by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function () {
	"use strict";

	const $body = document.querySelector("body");

	// Polyfills

	// classList polyfill
	!function () {
		if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

		function DOMTokenList(el) {
			this.el = el;
			const classes = el.className.replace(/^\s+|\s+$/g, "").split(/\s+/);
			for (let i = 0; i < classes.length; i++) this.push(classes[i]);
		}

		DOMTokenList.prototype = [];
		DOMTokenList.prototype.add = function (token) {
			if (!this.contains(token)) {
				this.push(token);
				this.el.className = this.toString();
			}
		};
		DOMTokenList.prototype.contains = function (token) {
			return this.el.className.indexOf(token) !== -1;
		};
		DOMTokenList.prototype.remove = function (token) {
			const index = this.indexOf(token);
			if (index !== -1) {
				this.splice(index, 1);
				this.el.className = this.toString();
			}
		};
		DOMTokenList.prototype.toString = function () {
			return this.join(" ");
		};
		window.DOMTokenList = DOMTokenList;

		Object.defineProperty(Element.prototype, "classList", {
			get: function () {
				return new DOMTokenList(this);
			}
		});
	}();

	// canUse utility
	window.canUse = function (p) {
		if (!window._canUse) window._canUse = document.createElement("div");
		const e = window._canUse.style;
		const up = p.charAt(0).toUpperCase() + p.slice(1);
		return p in e || `Moz${up}` in e || `Webkit${up}` in e || `O${up}` in e || `ms${up}` in e;
	};

	// Fallback for addEventListener
	(function () {
		if ("addEventListener" in window) return;
		window.addEventListener = function (type, fn) {
			window.attachEvent("on" + type, fn);
		};
	})();

	// Remove preload class on load
	window.addEventListener("load", function () {
		window.setTimeout(function () {
			$body.classList.remove("is-preload");
		}, 100);
	});

	// Background slideshow
	(function () {
		const settings = {
			images: {
				"images/bg01.jpg": "center",
				"images/bg02.jpg": "center",
				"images/bg03.jpg": "center"
			},
			delay: 6000
		};

		let pos = 0;
		const $wrapper = document.createElement("div");
		$wrapper.id = "bg";
		$body.appendChild($wrapper);

		const $bgs = [];

		for (const [url, align] of Object.entries(settings.images)) {
			const $bg = document.createElement("div");
			$bg.style.backgroundImage = `url("${url}")`;
			$bg.style.backgroundPosition = align;
			$wrapper.appendChild($bg);
			$bgs.push($bg);
		}

		if ($bgs.length === 0) return;

		$bgs[pos].classList.add("visible", "top");

		if ($bgs.length === 1 || !canUse("transition")) return;

		setInterval(() => {
			const lastPos = pos;
			pos = (pos + 1) % $bgs.length;

			$bgs[lastPos].classList.remove("top");
			$bgs[pos].classList.add("visible", "top");

			setTimeout(() => {
				$bgs[lastPos].classList.remove("visible");
			}, settings.delay / 2);
		}, settings.delay);
	})();
})();
