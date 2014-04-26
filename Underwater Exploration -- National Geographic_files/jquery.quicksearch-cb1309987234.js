jQuery(function ($) {
    $.fn.quicksearch = function (target, opt) {

        var timeout, cache, rowcache, jq_results, val = '',
            e = this,
            options = $.extend({
                delay: 100,
                selector: null,
                stripeRows: null,
                loader: null,
                noResults: '',
                bind: 'keyup',
                onBefore: function () {
                    return;
                },
                onAfter: function () {
                    return;
                },
                show: function () {
                    this.style.display = "";
                },
                hide: function () {
                    this.style.display = "none";
                }
            }, opt);

        this.go = function () {

            var i = 0,
                noresults = true,
                vals = val.toLowerCase().split(' ');

            var rowcache_length = rowcache.length;
            for (var i = 0; i < rowcache_length; i++) {
                if (this.test(vals, cache[i]) || val == "") {
                    options.show.apply(rowcache[i]);
                    noresults = false;
                } else {
                    options.hide.apply(rowcache[i]);
                }
            }

            if (noresults) {
                this.results(false);
            } else {
                this.results(true);
                this.stripe();
            }

            this.loader(false);
            options.onAfter();

            return this;
        };

        this.stripe = function () {

            if (typeof options.stripeRows === "object" && options.stripeRows !== null) {
                var joined = options.stripeRows.join(' ');
                var stripeRows_length = options.stripeRows.length;

                jq_results.not(':hidden').each(function (i) {
                    $(this).removeClass(joined).addClass(options.stripeRows[i % stripeRows_length]);
                });
            }

            return this;
        };

        this.strip_html = function (input) {
            var output = input.replace(new RegExp('<[^<]+\>', 'g'), "").removeDiacritics();
            output = $.trim(output.toLowerCase());
            return output;
        };

        this.results = function (bool) {
            if (typeof options.noResults === "string" && options.noResults !== "") {
                if (bool) {
                    $(options.noResults).hide();
                } else {
                    $(options.noResults).show();
                }
            }
            return this;
        };

        this.loader = function (bool) {
            if (typeof options.loader === "string" && options.loader !== "") {
                (bool) ? $(options.loader).show() : $(options.loader).hide();
            }
            return this;
        };

        this.test = function (vals, t) {
			t = (t === undefined) ? '' : t;
            for (var i = 0; i < vals.length; i += 1) {
                if (t.indexOf(vals[i]) === -1) {
                    return false;
                }
            }
            return true;
        };

        this.cache = function () {

            jq_results = $(target);

            if (typeof options.noResults === "string" && options.noResults !== "") {
                jq_results = jq_results.not(options.noResults);
            }

            var t = (typeof options.selector === "string") ? jq_results.find(options.selector) : $(target).not(options.noResults);
            cache = t.map(function () {
                return e.strip_html(this.innerHTML);
            });

            rowcache = jq_results.map(function () {
                return this;
            });

            return this.go();
        };

        this.trigger = function () {
            this.loader(true);
            options.onBefore();

            window.clearTimeout(timeout);
            timeout = window.setTimeout(function () {
                e.go();
            }, options.delay);

            return this;
        };

        this.cache();
        this.results(true);
        this.stripe();
        this.loader(false);

        return this.each(function () {
            $(this).bind(options.bind, function () {
                val = $(this).val();
                e.trigger();
            });
        });

    };

    $.fn.highlight = function (pat) {
        function innerHighlight(node, pat) {
            var skip = 0;
            if (node.nodeType == 3) {
                var pos = node.data.toUpperCase().removeDiacritics().indexOf(pat);
                if (pos >= 0) {
                    var spannode = document.createElement('span');
                    spannode.className = 'highlight';
                    var middlebit = node.splitText(pos);
                    var endbit = middlebit.splitText(pat.length);
                    var middleclone = middlebit.cloneNode(true);
                    spannode.appendChild(middleclone);
                    middlebit.parentNode.replaceChild(spannode, middlebit);
                    skip = 1;
                }
            } else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
                for (var i = 0; i < node.childNodes.length; ++i) {
                    i += innerHighlight(node.childNodes[i], pat);
                }
            }
            return skip;
        }
        return this.each(function () {
            innerHighlight(this, pat.toUpperCase());
        });
    };
    $.fn.removeHighlight = function () {
        return this.find("span.highlight").each(function () {
            this.parentNode.firstChild.nodeName;
            with(this.parentNode) {
                replaceChild(this.firstChild, this);
                normalize();
            }
        }).end();
    };

    String.prototype.removeDiacritics = function () {
        var diacritics = [
            [RegExp('[\\300-\\306]', 'g'), 'A'],
            [RegExp('[\\340-\\346]', 'g'), 'a'],
            [RegExp('[\\310-\\313]', 'g'), 'E'],
            [RegExp('[\\350-\\353]', 'g'), 'e'],
            [RegExp('[\\314-\\317]', 'g'), 'I'],
            [RegExp('[\\354-\\357]', 'g'), 'i'],
            [RegExp('[\\322-\\330]', 'g'), 'O'],
            [RegExp('[\\362-\\370]', 'g'), 'o'],
            [RegExp('[\\331-\\334]', 'g'), 'U'],
            [RegExp('[\\371-\\374]', 'g'), 'u'],
            [RegExp('[\\321]', 'g'), 'N'],
            [RegExp('[\\361]', 'g'), 'n'],
            [RegExp('[\\307]', 'g'), 'C'],
            [RegExp('[\\347]', 'g'), 'c']
        ];
        var s = this;
        for (var i = 0; i < diacritics.length; i++) {
            if (diacritics[i][0]) {
                s = s.replace(diacritics[i][0], diacritics[i][1]);
            }
        }
        return s;
    }

});