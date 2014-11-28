QUnit.test("function downElement test" , function (assert) {
	expect(2);

	playlist = new PlayList();

	playlist.addElement(1,'The trooper');
	playlist.addElement(4,'One');
	playlist.addElement(8,'rocketman');
	playlist.addElement(123,'Mr. Jones');

	playlist.downElement(4, function (response) {
		if (response) {
			var items = playlist.getPlaylist();
			items.filter( function(item, index) {
				if (item.id == 4) {
					assert.equal(index, 2, 'Position should be 2');
					return;
				}
			}
		}
	});

	playlist.downElement(4, function (response) {
		if (response) {
			var items = playlist.getPlaylist();
			items.filter( function(item, index) {
				if (item.id == 123) {
					assert.equal(index, 3, 'Position should be 3');
					return;
				}
			}
		}
	});
});