QUnit.test("AddElements" , function (assert) {
	expect(2);

	playlist = new PlayList();
	playlist.addElement(1,"unforgiven");
	playlist.editElement(1, "The Unforgiven");
	var list = playlist.getPlaylist();
	assert.equal(list[0].name, "The Unforgiven", "Song\'s new name should be The Unforgiven");

	playlist.addElement(123, 'Ace of Spades');
	playlist.addElement(2, 'One');
	playlist.addElement(4, 'Bohemian Rhapsody');
	playlist.addElement(45665, 'Do Evolution');
	playlist.addElement(978, 'Enter Sandman');

	playlist.editElement(978,'The Memory Remains');

	var updatedList = playlist.getPlaylist();
	for (i = 0 ; i < updatedList.length ; i++) {
		if (updatedList[i].id === 978) {
			assert.equal(updatedList[i].name, "The Memory Remains", "Song\'s new name should be The Memory Remains");
		}
	}
});


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