
let selector = selector => document.querySelector(selector);

let formInputs = document.getElementsByClassName('input');
let icons = document.getElementsByClassName('icon');
let addBtn = selector('#signUpBtn');
let usersList = selector('#users-list');
let login = selector('#login');
let email = selector('#email');
let password = selector('#pass');

let usersArray = [];
let userIndex;

let loginCheck = /^[a-zA-Z]{4,16}$/;
let emailCheck = /^\S{1,}@\D{1,}\.\D{2,}$/;
let passCheck = /^\w{8,15}\_*\.*$/;

selector('#login').addEventListener('input', function () {
	let testLogin = loginCheck.test(this.value);
	if (testLogin) {
		this.style.border = '2px solid green';
		selector('.name-success').style.display = 'block';
		selector('.name-error').style.display = 'none';
		selector('.modal-gName').style.display = 'none';
	} else {
		this.style.border = '2px solid red';
		selector('.name-error').style.display = 'block';
		selector('.name-success').style.display = 'none';
		selector('.modal-gName').style.display = 'block';
	}
})



selector('#email').addEventListener('input', function () {
	let testEmail = emailCheck.test(this.value);
	if (testEmail) {
		this.style.border = '2px solid green';
		selector('.email-success').style.display = 'block';
		selector('.email-error').style.display = 'none';
		selector('.modal-email').style.display = 'none';
	} else {
		this.style.border = '2px solid red';
		selector('.email-error').style.display = 'block';
		selector('.email-success').style.display = 'none';
		selector('.modal-email').style.display = 'block';
	}
})

selector('#pass').addEventListener('input', function () {
	let testPassword = passCheck.test(this.value);
	if (testPassword) {
		this.style.border = '2px solid green';
		selector('.pass-success').style.display = 'block';
		selector('.pass-error').style.display = 'none';
		selector('.modal-pass').style.display = 'none';
	} else {
		this.style.border = '2px solid red';
		selector('.pass-error').style.display = 'block';
		selector('.pass-success').style.display = 'none';
		selector('.modal-pass').style.display = 'block';
	}
})


signupForm.addEventListener('input', function () {
	if (
		loginCheck.test(login.value) &&
		emailCheck.test(email.value) &&
		passCheck.test(password.value)) {
		signUpBtn.removeAttribute('disabled', 'disabled');
	} else {
		signUpBtn.setAttribute('disabled', 'disabled');
	}
})




function addUser(e) {
	// e.preventDefault();
	let user = {
		login: login.value,
		password: password.value,
		email: email.value
	}
	usersArray.push(user);
	cleareInputs();
	render();
}

function cleareInputs() {
	for (let i = 0; i < formInputs.length; i++) {
		formInputs[i].style.border = '2px solid #000';
		formInputs[i].value = '';
	}
	for (let j = 0; j < icons.length; j++) {
		icons[j].style.display = 'none';
	}
	signUpBtn.setAttribute('disabled', 'disabled');
}

function render() {
	usersList.innerHTML = '';
	for (let i = 0; i < usersArray.length; i++) {
		let row = document.createElement('tr');
		row.innerHTML = `
		<td>${i+1}</td>
		<td>${usersArray[i].login}</td>
		<td>${usersArray[i].password}</td>
		<td>${usersArray[i].email}</td>
		<td><input type='button' class = 'editBtn btn edit' id = 'editBtn' name = 'edit' value = 'Edit'></td>
		<td><input type='button' class = 'deleteBtn btn delete' id = 'deleteBtn' name = 'delete' value = 'Delete'></td>`;
		usersList.appendChild(row);
	}
}

usersList.addEventListener('click', function (e) {
	if (e.target.classList.contains('delete')) {
		e.target.parentElement.parentElement.style.opacity = 0;
		deleteUser(e.target);
	}

	if (e.target.classList.contains('edit')) {
		editUser(e.target);
	}
});

function deleteUser(element) {
	item = element.parentElement.previousElementSibling.previousElementSibling.textContent;
	usersArray.forEach((user, index) => {
		if (user.email === item) {
			usersArray.splice(index, 1);
		}
	});
	setTimeout(() => {
		element.parentElement.parentElement.remove();
		render()
	}, 300);
}


function editUser(element) {
	item = element.parentElement.previousElementSibling.textContent;
	usersArray.forEach((user, index) => {
		if (user.email === item) {
			login.value = user.login;
			password.value = user.password;
			email.value = user.email;
			userIndex = index;
			addBtn.value = "Edit user";
		}
	});
}

function saveEditUser() {
	const editedUser = {
		login: login.value,
		password: password.value,
		email: email.value
	}
	usersArray.splice(userIndex, 1, editedUser);
	addBtn.value = "Add user";
	render();
}

document.addEventListener('DOMContentLoaded', () => {
	addBtn.addEventListener('click', function (e) {
		e.preventDefault();
		if (login.value && password.value && email.value) {
			if (addBtn.value === 'Add user') {
				addUser()
			} else {
				saveEditUser();
			}
			cleareInputs();
		}
	});
});
