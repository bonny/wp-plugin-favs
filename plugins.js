
/*
plugins = collection?
*/

var Plugins = Backbone.Collection.extend({

	url: "plugins.json",

	initialize: function() {

		this.on("reset", this.onReset);

		this.fetch({ reset: true });

	},

	onReset: function() {

	}

});

var NavView = Backbone.View.extend({

	initialize: function(options) {

		this.parent = options.parent;
		this.template = _.template( $("#tmpl-nav").html() );

	},

	render: function() {
			
		this.$el.html( this.template({
			collection: this.collection.toJSON()
		} ));

		return this;

	}

});

var MainView = Backbone.View.extend({
	
	initialize: function(options) {

		this.plugins = new Plugins({
			parent: this
		});
		
		this.nav = new NavView({
			el: ".js-nav",
			collection: this.plugins,
			parent: this
		});

		this.plugins.on("reset", this.nav.render, this.nav);

	},

	start: function() {
		
		console.log("start", this, this.nav);

	}

});

var AppRouter = Backbone.Router.extend({

	routes: {
		"help":                 "help",    // #help
		"search/:query":        "search",  // #search/kiwis
		"search/:query/p:page": "search"   // #search/kiwis/p7
	},

	help: function() {
		console.log("help yo");
	}

});

var app = new MainView({});

$(function() {

	new AppRouter();
	Backbone.history.start({pushState: false});

});

//app.start();

/*
apa


*/

/*

$pluginsOutput = $(".js-plugins-output");
$pluginsOutputOverview = $(".js-plugins-output-overview");

var plugins = $.getJSON("plugins.json", function(r) {
	
	//console.log("json loaded", r);

});

function output() {

	var html = "";
	$.each(plugins, function() {
		
		html += "\n<h2>" + this.headline + "</h2>";
		html += "\n<ul class='overview'>";
		console.log("this.plugins", this.plugins);
		$.each(this.plugins, function(key, val) {
			html += "\n<li>\n" + key + ":" + val + "\n</li>";
		});
		
		html += "\n</ul>";
	});

	$pluginsOutputOverview.html(html);


	var html = "";

	$.each(plugins, function() {

		html += "\n<h2>" + this.headline + "</h2>";
		html += "\n<ul class='grid'>";
		
		$.each(this.slugs, function() {
			html += "\n<li>\n<div class='wordpress-widget' data-slug='" + this + "'></div>\n</li>";
		});
		
		html += "\n</ul>";
	});

	$pluginsOutput.html(html);

}

*/
