QUnit.test("function loadPlaylist test" , function (assert) {
	expect(3);

	playlist = new PlayList();

	playlist.loadPlaylist();
	assert.notEqual(null,playlist.getPlaylist().length, 'This should have elements');
	assert.notEqual(undefined,playlist.getPlaylist().length, 'This should have elements');
	assert.notEqual(0,playlist.getPlaylist().length, 'This should have elements');
});