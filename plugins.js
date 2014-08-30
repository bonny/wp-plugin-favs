

var Plugins = Backbone.Collection.extend({

	url: "plugins.json",

	initialize: function() {

		this.on("reset", this.onReset);

		this.fetch({ reset: true });

	},

	onReset: function() {

	},

	// parse json add add slugs
	parse: function(models) {
		
		//var url = model.url;
		models = _.each(models, function(model) {

			var slug = model.url.replace("https://wordpress.org/plugins/", "");
			slug = _.str.rtrim(slug, "/");
			model.slug = slug;

		});

		return models;

	}

});

var NavView = Backbone.View.extend({

	initialize: function(options) {

		this.parent = options.parent;
		this.template = _.template( $("#tmpl-nav").html() );

	},

	render: function() {

		var tags = {};
		
		_.each(this.collection.pluck("tags"), function(subtags) {
			_.each(subtags, function(tag) {

				if ( ! _.has(tags, tag) ) {

					tags[tag] = {
						tag: tag,
						count: 0
					};

				}
				
				tags[tag].count++;				

			});
		});
		
		this.$el.html( this.template({
			tags: tags
		} ));

		return this;

	},

	// show all plugins matching a tag
	showTag: function(tag) {
		
		var plugins = this.collection.filter(function(plugin) {
			
			return _.indexOf(plugin.get("tags"), tag) !== -1;

		});

		var pluginsCollection = new Backbone.Collection;
		pluginsCollection.reset( plugins );
	
		new PluginView({
			collection: pluginsCollection,
			tag: tag
		}).render();

		this.render();

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

		this.router = new AppRouter({
			mainView: this
		});

		this.plugins.on("reset", this.nav.render, this.nav);

	},

	start: function() {
		
		console.log("start", this, this.nav);

	}

});

var AppRouter = Backbone.Router.extend({

	routes: {
		"plugins/:slug": "help",    // #help
		"plugin/:slug": "plugin",   // #search/kiwis
		"tag/:slug/": "tag"   		// #tag/database
	},

	initialize: function(options) {

		this.mainView = options.mainView;

	},

	tag: function(slug) {
		
		this.mainView.nav.showTag(slug);

	},

	plugin: function(slug) {
		console.log("view plugin", slug);
	}

});

var PluginView = Backbone.View.extend({
	
	el: ".js-plugins-output",

	initialize: function(options) {
	
		this.tag = options.tag;
		this.template = _.template( $("#tmpl-plugins").html() );

	},

	render: function() {
	
		console.log("Plugin View render");
		console.log("plugins", this.collection);

		this.$el.html( this.template({
			tag: this.tag,
			plugins: this.collection.toJSON()
		} ));


	}

});

var app = new MainView();

$(function() {

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
