$(document).ready(function () {
	var tModel = new todoModel(),
		tController = new todoController();

	tController.setModel(tModel);
	tController.setTemplateManager(JPLoad);
	tController.loadData();

	//Add new Item
	$('#header').on('click', '.icon-plus', function (e) {
		var name = prompt('Set  a name'),
			item = {'id' : tController.getId(), 'name' : name};

		if (name.length > 0) {
			tController.addItem(item);
		}
	});

	//Delete selected Item(s)
	$('#header').on('click', '.icon-trash', function (e) {
		var clickedEl = $(this),
			itemId = -1;

		$('#list-container .item input[type="checkbox"]').each( function () {
			if (this.checked) {
				itemId = $(this).attr('data-index');
				tController.deleteItem(itemId);
			}
		});
	});
	
	//Delete item from item
	$('#list-container').on('click', '.icon-minus', function (e) {
		var itemId = $(this).closest('.item').attr('data-index');

		tController.deleteItem(itemId);
	});

	//Event for edit item.
	$('#list-container').on('click', '.icon-pencil', function (e) {
		var itemId = $(this).closest('.item').attr('data-index'),
			newName = prompt('Enter new name');
			
		tController.editItem(itemId, newName);
	});

	// 	//Event for Up an element
	$('#header').on('click', '.icon-up-circled2', function (e) {
		var clickedEl = $(this),
			itemId;
		$('#list-container .item input[type="checkbox"]').each( function () {
			if (this.checked) {
				itemId = $(this).attr('data-index');
				tController.upItem(itemId);
			}
		});
	});

	// 	//Event for Up an element
	$('#header').on('click', '.icon-down-circled2', function (e) {
		var clickedEl = $(this),
			itemId;
		$($('#list-container .item input[type="checkbox"]').get().reverse()).each( function () {
			if (this.checked) {
				itemId = $(this).attr('data-index');
				tController.downItem(itemId);
			}
		});
	});
});

// $(document).ready(function () {
// 	playlist = new PlayList('list-container');
// 	playlist.loadPlaylist();

// 	//Event for loading template for adding item
// 	$('#header').on('click', '.icon-plus', function (e) {
// 		playlist.loadTemplate('new-item','new-item',undefined);
// 	});
	
// 	//Event for closing new item dialog
// 	$('#new-item').on('click', '.close-new-item', function (e) {
// 		$(this).closest('#new-item').empty();
// 	});

// 	//Event for adding item.
// 	$('#new-item').on('click', '.add-item-button', function (e) {
// 		var clickedEl = $(this),
// 			nameContainer = clickedEl.siblings('.name'),
// 			nameText = nameContainer.val();
// 		playlist.addElement(undefined, nameText, function (response) {
// 			if (response) {
// 				nameContainer.val('');
// 				clickedEl.closest('#new-item').empty();		
// 			}
// 		});
// 	});

// 	//Event for Highlighting item
// 	$('#list-container').on('click', '.item input[type="checkbox"]', function (e) {
// 		var clickedEl = $(this),
// 			item = clickedEl.closest('.item');
			
// 		item.toggleClass('selected');
// 	});

// 	//Event for delete items
// 	$('#header').on('click', '.icon-trash', function (e) {
// 		var clickedEl = $(this),
// 			currentIndex;
// 		$('#list-container .item input[type="checkbox"]').each( function () {
// 			var checkBox = $(this);
// 			if (this.checked) {
// 				currentIndex = checkBox.attr('data-index');
// 				playlist.deleteElement(currentIndex, function (response) {
// 					checkBox.closest('.item').slideUp();
// 					checkBox.closest('.item').remove();
// 				});
// 			}
// 		});
// 	});

// 	//Event for Up an element
// 	$('#header').on('click', '.icon-up-circled2', function (e) {
// 		var clickedEl = $(this),
// 			currentIndex,
// 			checkBox,
// 			item;
// 		$('#list-container .item input[type="checkbox"]').each( function () {
// 			if (this.checked) {
// 				checkBox = $(this);
// 				item = checkBox.closest('.item');
// 				currentIndex = checkBox.attr('data-index');

// 				playlist.upElement(currentIndex, function (response) {
// 					item.insertBefore(item.prev());
// 					item.removeClass('selected');
// 				});
// 			}
// 		});
// 		$('#list-container .item input[type="checkbox"]').prop('checked', false);
// 	});

// 	//Event for Down an element
// 	$('#header').on('click', '.icon-down-circled2', function (e) {
// 		var clickedEl = $(this),
// 			currentIndex,
// 			checkBox,
// 			item;
// 		$('#list-container .item input[type="checkbox"]').each( function () {
// 			if (this.checked) {
// 				checkBox = $(this);
// 				item = checkBox.closest('.item');
// 				currentIndex = checkBox.attr('data-index');

// 				playlist.downElement(currentIndex, function (response) {
// 					item.insertAfter(item.next());
// 					item.removeClass('selected');
// 				});
// 			}
// 		});
// 		$('#list-container .item input[type="checkbox"]').prop('checked', false);
// 	});

// 	//Event for Delete an item from inside the said item
// 	$('#list-container').on('click', '.icon-minus', function (e) {
// 		var clickedEl = $(this),
// 			currentIndex = clickedEl.closest('.item').attr('data-index');
		
// 		playlist.deleteElement(currentIndex, function (response) {
// 			clickedEl.closest('.item').slideUp();
// 			clickedEl.closest('.item').remove();
// 		});
// 	});

// 	//Event for loading template for editing item
// 	$('#list-container').on('click', '.icon-pencil', function (e) {
// 		var itemId = $(this).closest('.item').attr('data-index');
// 		playlist.loadTemplate('edit','new-item',{'id' : itemId});
// 	});

// 	//Event for closing edit item dialog
// 	$('#new-item').on('click', '.close-edit-item', function (e) {
// 		$(this).closest('#new-item').empty();
// 	});

// 	//Event for adding item.
// 	$('#new-item').on('click', '.edit-item-button', function (e) {
// 		var clickedEl = $(this),
// 			nameContainer = clickedEl.siblings('.new-name'),
// 			newName = nameContainer.val(),
// 			itemId = clickedEl.closest('.edit-item').attr('data-index');
			
// 		playlist.editElement(itemId, newName, function (response) {
// 			if (response) {				
// 				$('.item[data-index="' + itemId +'"]').find('.name-item span').text(newName);
// 				nameContainer.val('');
// 				clickedEl.closest('#new-item').empty();		
// 			}
// 		});
// 	});
// });