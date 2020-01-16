import { updateTime, orderButton } from './utils.js';
var inputArray = [];
$(document).ready(function () {
	$.ajax("/api/employee", {
		type: "GET"
	}).then(function (data) {
		// console.log(data)

		$(document).on("click", "#view-employee", function (event) {
			// console.log(data);

			var userInput = inputArray.join('');
			var len = data.employee.length;
			// if (userInput === "") {
			// 	// console.log("Input a password please!")
			// 	alert("Input a password please!")
			// } else {
			for (var i = 0; i < len; i++) {
				var dataEmployeeID = data.employee[i].employee_id;
				var employeePosition = data.employee[i].employee_position;
				var id = data.employee[i].id
				// console.log(employeePosition)
				// console.log(userInput);
				if (userInput == dataEmployeeID) {
					if (employeePosition.indexOf("Manager") > -1) {
						$('#exampleModalLong2').modal("show");
						for (var i = 0; i < data.employee.length; i++) {
							var dataID = data.employee[i].id;
							var employeePosition = data.employee[i].employee_position;
							var employeeFirstName = data.employee[i].employee_firstName;
							var employeeLastName = data.employee[i].employee_lastName;
							// console.log(data.employee[i].employee_firstName);
							var allEmployee = $(".all-employee");
							// allEmployee.empty();
							var new_elem = `${dataID}. ${employeeFirstName} ${employeeLastName} (${employeePosition}) <button class='delete-employee' data-id='${dataID}'>DELETE</button><br>`;
							allEmployee.append(new_elem);
						}
					}
				}
			}
			// }
		})

		$(".create-form").on("submit", function (event) {
			event.preventDefault();
			var firstName = $("#first-name").val().trim();
			var lastName = $("#last-name").val().trim();
			var employeeID = $("#employee-id").val().trim();
			var checkResult = $('input[name="level"]:checked');
			var position = [];
			if (checkResult.length > 0) {
				checkResult.each(function () {
					var resultString = $(this).val();
					position.push(resultString);
				})
			};
			var newEmployee = {
				employee_position: position,
				employee_firstName: firstName,
				employee_lastName: lastName,
				employee_id: employeeID
			};
			$.ajax("/api/employee", {
				type: "POST",
				data: JSON.stringify(newEmployee),
				contentType: "application/json"
			}).then(function (result) {
				location.reload();
			})
		})

		$(document).on("click", "#button-submit", function (event) {

			var userInput = inputArray.join('');
			var len = data.employee.length;
			if (userInput === "") {
				// console.log("Input a password please!")
				alert("Input a password please!")
			} else {
				for (var i = 0; i < len; i++) {
					var dataEmployeeID = data.employee[i].employee_id;
					var employeePosition = data.employee[i].employee_position;
					var id = data.employee[i].id
					// console.log(employeePosition)
					if (userInput == dataEmployeeID) {
						if (employeePosition.indexOf("Manager") > -1) {
							window.location.assign("/admin");
						}
						if (employeePosition.indexOf("Cashier") > -1) {
							window.location.assign("/cashier");
						}
						// } else {
						// 	alert("Wrong password");
						// 	$(".employeeID").empty();
						// }
					}
					// } else if (userInput = !dataEmployeeID) {
					// 	alert("Wrong password")
					// 	$(".employeeID").empty();

					// }

				}
			}
		})

		$(document).on("click", "#create-employee", function (event) {
			// $('#exampleModalLong1').modal("show");
			var userInput = inputArray.join('');
			var len = data.employee.length;
			// if (userInput === "") {
			// 	// console.log("Input a password please!")
			// 	alert("Input a password please!")
			// } else {
			for (var i = 0; i < len; i++) {
				var dataEmployeeID = data.employee[i].employee_id;
				var employeePosition = data.employee[i].employee_position;
				var id = data.employee[i].id
				// console.log(employeePosition)
				// console.log(userInput);
				if (userInput == dataEmployeeID) {
					if (employeePosition.indexOf("Manager") > -1) {
						$('#exampleModalLong1').modal("show");
					} else {
						alert("Wrong password");
					}
				}
				// } else if (userInput = !dataEmployeeID) {
				// 	alert("Wrong password");
				// 	$(".employeeID").empty();

				// }
			}
			// }
		})
	})

	// keypad number buttons
	$(".number").on("click", function (event) {
		var value = $(this).data("value");
		var employeeID = $(".employeeID");
		inputArray.push(value);
		employeeID.append(value);
	})

	$(document).on("click", ".delete-employee", function (event) {
		var id = $(this).data("id");

		$.ajax("/api/employee/" + id, {
			type: "DELETE"
		}).then(function () {
			location.reload();
		})
	})

	$(document).on("click", "#button-clear", function (event) {
		$(".employeeID").empty();
	});

	orderButton();
	setInterval(updateTime, 1000);
	updateTime();
})