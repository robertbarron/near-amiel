QUnit.test("function deleteElement test" , function (assert) {
	expect(1);

	playlist = new PlayList();

	playlist.addElement(1,'The trooper');
	playlist.addElement(4,'One');
	playlist.addElement(8,'rocketman');
	playlist.addElement(123,'Mr. Jones');

	playlist.deleteElement(123, function (response) {
		if (response) {
			assert.equal(playlist.getPlaylist().length,3, 'playlist length should be 3');
		}
	});
});