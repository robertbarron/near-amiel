function PlayList ($id) {
	this.container = $id;
	this.api_url = '//nftest.local/data/playlist.json';
	this.items = [];
}

PlayList.prototype.loadPlaylist = function () {
	var _this = this,
		conter = 0;
	$.get(this.api_url, function( data ) {
		$.each(data.items, function (index, item) {
			_this.addElement(item.id, item.name);
		});
	});
	return true;
};

PlayList.prototype.addElement = function (id, name, callback) {
	var _this = this,
		id = (id !== undefined ) ? id : this.items.length,
		name = (name === undefined || name.length < 1) ? "(No name)" : name,
		item = {'id' : id, 'song-name': name};

	this.loadTemplate('item', this.container, item, 'append', function (response) {
		if (!response)
			return false;

		_this.items.push(item);
		if (callback)
			callback(true);

		return true;
	});
};

PlayList.prototype.loadTemplate = function (template, id, data, type, callback) {
	var template = '../../app/views/' + template + '.tpl';

	JPLoad.getTemplate(template, function (htmlData) {
		if (!htmlData) {
			callback(false);
			return;
		}
		if (type === 'append') {
			JPLoad.appendHTML(htmlData, id, data, function (response) {
				if (!response)
					return;
				if (callback)
					callback(true);
			});
		} else {
			JPLoad.loadTemplate(htmlData, id, data, function (response) {
				if (!response)
					return;
				if (callback)
					callback(true);
			});
		}
	});
};

PlayList.prototype.deleteElement = function (id, callback) {
	this.items = this.items.filter( function (item,index) {
		if (item.id != id)
			return item;
	});
	if (callback)
		callback(true);
};

PlayList.prototype.editElement = function (id, name, callback) {
	this.items = this.items.filter( function (item,index) {
		if (item.id == id)
			item.name = name;
		return item;
	});
	if (callback)
		callback(true);
};

PlayList.prototype.upElement = function (id, callback) {
	var index, item;
	for(var i = 0; i < this.items.length ; i++) {
		if (this.items[i].id == id) {
			item = this.items[i];
			this.items.splice(i,1);
			this.items.splice((i-1),0, item);

			callback(true);
			break;
		}
	}
};

PlayList.prototype.downElement = function (id, callback) {
	var index, item;
	for(var i = 0; i < this.items.length ; i++) {
		if (this.items[i].id == id) {
			item = this.items[i];
			this.items.splice(i,1);
			this.items.splice((i+1),0, item);

			callback(true);
			break;
		}
	}
};