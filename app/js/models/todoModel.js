var todoModel = function () {
	this.collection = [];
};

todoModel.prototype = {
	constructor : todoModel,
	
	getItem: function (id, callback) {
		return this.collection.filter(function (item, index) {
			if (item.id == id) {
				return item;
			}
		});
	},

	getData: function (callback) {
		return this.collection;
	},

	loadData: function (callback) {
		var _this = this;

		$.get('//nftest.local/data/playlist.json', function (data) {
			_this.collection = data;
			if (callback)
				callback(_this);
		});
	},

	saveData: function (data, callback) {
		var _this = this;
		$.post('source', data, function (response) {
			if (callback) {
				callback(_this);
			}
		});
	},
	addItem : function (item) {
		var dataLength = this.collection.items.length;
		this.collection.items.push(item);
	},

	updateItem : function (id, name) {
		this.collection.items = this.collection.items.filter(function (item, index) {
			if (item.id == id) {
				item.name = name;
			}
			return item;
		});
	},

	deleteItem : function (id, callback) {
		var dataLength = this.collection.items.length;
		this.collection.items = this.collection.items.filter(function (item, index) {
			if (item.id != id) {
				return item;
			}
		});
		if (dataLength > this.collection.items.length)
			callback(true);
		else
			callback(false);
	},

	upItem : function (id, callback) {
		var items = this.collection.items,
			index, item;
		if (items[0].id == id){
			callback(false);
			return;
		}
		for(var i = 0; i < items.length ; i++) {
			if (items[i].id == id) {
				item = items[i];
				items.splice(i,1);
				items.splice((i-1),0, item);
				this.collection.items = items;
				callback(true);
				break;
			}
		}
	},

	downItem : function (id, callback) {
		var items = this.collection.items,
			index, item;
		if (items[items.length-1].id == id) {
			callback(false);
			return;
		}
		for(var i = 0; i < items.length ; i++) {
			if (items[i].id == id) {
				item = items[i];
				items.splice(i,1);
				items.splice((i+1),0, item);
				this.collection.items = items;
				callback(true);
				break;
			}
		}
	}
};