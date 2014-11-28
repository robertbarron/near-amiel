QUnit.test("function addElements test" , function (assert) {
	expect(1);

	playlist = new PlayList();

	playlist.addElement(1,'Song Name');
	assert.equal(playlist.getPlaylist().length, 1);
});