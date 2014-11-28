QUnit.test("function upElement test" , function (assert) {
	expect(2);

	playlist = new PlayList();

	playlist.addElement(1,'The trooper');
	playlist.addElement(4,'One');
	playlist.addElement(8,'rocketman');
	playlist.addElement(123,'Mr. Jones');

	playlist.upElement(123, function (response) {
		if (response) {
			var items = playlist.getPlaylist();
			items.filter( function(item, index) {
				if (item.id == 123) {
					assert.ok(index, 2, 'Position should be 2');
					return;
				}
			}
		}
	});

	playlist.downElement(1, function (response) {
		if (response) {
			var items = playlist.getPlaylist();
			items.filter( function(item, index) {
				if (item.id == 1) {
					assert.equal(index, 0, 'Position should be 0');
					return;
				}
			}
		}
	});
});