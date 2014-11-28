var todoController = function () {
	this.model;
	this.templateManager;
	this.template = "../../app/views/item.tpl";
	this.$container = $("#list-container");
};

todoController.prototype = {
	constructor : todoController,
	setModel : function (model) {
		this.model = model;
	},

	setTemplateManager : function (templateManager) {
		this.templateManager = templateManager;
	},

	loadData : function (callback) {
		var _this = this;
		this.model.loadData(function (response) {
			if (response)
				_this.render();
		});
	},

	addItem : function (item, callback) {
		this.model.addItem(item);
		this.render();
	},

	getId : function (callback) {
		return (this.model.collection.items.length + 1);
	},

	deleteItem : function (id) {
		var _this = this;
		this.model.deleteItem(id, function (response) {
			if (response)
				_this.render();
		});
	},

	editItem : function (id, name) {
		this.model.updateItem(id, name);
		this.render();
	},

	upItem : function (id) {
		var _this = this;
		this.model.upItem(id, function (response) {
			if (response)
				_this.render();
		});
	},

	downItem : function (id, callback) {
		var _this = this;
		this.model.downItem(id, function (response) {
			if (response)
				_this.render();
		});
	},

	render: function (callback) {
		var _this = this,
			items = this.model.collection.items;

		this.templateManager.getView(this.template, function (htmlData) {
			_this.$container.empty();
			$.each(items, function (index, item) {
				_this.templateManager.appendView(htmlData, _this.$container.attr('id'), item);
				if (index >= items.length) {
					if (callback)
						callback(true);
				}
			});
		});
	}
}