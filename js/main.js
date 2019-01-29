$(document).ready(function () {

	// 1. Отправка формы
	$('#form-new-task').on('submit', function(e) {
		e.preventDefault();

		// 2. Принимать текст из поля с новым заданием
		var taskText = $('#addNewTask').val(); 
		// console.log(taskText);

		// 3. Генерировать новую задачу - подставить текст в разметку, и вывести его на экран
		var $taskHolder = $('<li class="list-group-item d-flex justify-content-between task-item">');
		var $taskTitle = $('<span class="task-title">').text(taskText);
		var $taskButtons = $('<div class="task-item__buttons"><button type="button" data-action="task-done" class="btn btn-light align-self-end gray"><i class="fas fa-check"></i></button><button type="button" data-action="task-delete" class="btn btn-light align-self-end gray"><i class="fas fa-times"></i></button></div>');

		$taskHolder.append($taskTitle).append($taskButtons);

		$('#listOfTasks').append($taskHolder);

		showNotify('new');
		toggleEmptyList();
		$('#addNewTask').val('');
	});

	// $('[data-action="delete-task"]').click(function() {
	// 	console.log('Клик по кнопке');
	// });

	// 4. Отрабатывать клик по кнопке удалить, удалять текущую задачу
	$('#listOfTasks').on('click', '[data-action="task-delete"]', function(e) {
		// console.log('Клик по кнопке Удалить');
		e.preventDefault();
		$(this).parents('.task-item').remove();
		showNotify('delete');
		toggleEmptyList();
	});

	// 5. Отмечать выполненные задачи
	$('#listOfTasks').on('click', '[data-action="task-done"]', function(e) {
		// console.log('Клик по кнопке Готово!');
		e.preventDefault();
		$(this).parents('.task-item').find('.task-title').toggleClass('task-title--done');
		showNotify('done');
	});

	// 6. Показывать нотификации при добавлении / удалении
	function showNotify(type) {
		var $notifyNew = $('<div class="alert alert-warning" role="alert">Задача добавлена!</div>'),
			$notifyDone = $('<div class="alert alert-success" role="alert">Задача выполнена!</div>'),
			$notifyDelete = $('<div class="alert alert-danger" role="alert">Задача удалена!</div>');
			$notifyError = $('<div class="alert alert-danger" role="alert">Ошибка! Нет такого дествия!</div>');

		switch (type) {
			case 'new':
				$notifyBlock = $notifyNew;
				break;
			case 'done':
				$notifyBlock = $notifyDone;
				// console.log('Задача выполнена!');
				break;
			case 'delete':
				$notifyBlock = $notifyDelete;
				// console.log('Задача удалена!');
				break;
			default:
				$notifyBlock = $notifyError;
				// console.log('Нет такого дествия');
				break;
		}

		// console.log('Задача добавлена!');
		$('#notifyHolder .alert').fadeOut();
		$notifyBlock.hide();
		$('#notifyHolder').append($notifyBlock);
		$notifyBlock.fadeIn();
		setTimeout(function() {
			$notifyBlock.fadeOut();
			setTimeout(function() {
				$notifyBlock.remove();
			}, 2000);
		}, 2000);
	}
	
	// 7. Показывать спец. блок - что список дел пуст - когда задач нет
	function toggleEmptyList() {
		if ($('#listOfTasks').children().length > 1) {
			console.log('HAVE TASKS');
			$('#emptyList').hide();
		} else {
			console.log('NO TASKS');
			$('#emptyList').show();
		}
	}

	// showNotify('new');
	// showNotify('done');
	// showNotify('delete');

});

