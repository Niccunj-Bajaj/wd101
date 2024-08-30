document.addEventListener("DOMContentLoaded", function () {
  let today = new Date();

  // Calculate the maximum date (18 years ago from today)
  let maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  // Calculate the minimum date (55 years ago from today)
  let minDate = new Date(
    today.getFullYear() - 55,
    today.getMonth(),
    today.getDate()
  );

  // Format the dates to YYYY-MM-DD
  let maxDateString = maxDate.toISOString().slice(0, 10);
  let minDateString = minDate.toISOString().slice(0, 10);

  // Set the min and max attributes on the input field
  document.getElementById("dob").setAttribute("min", minDateString);
  document.getElementById("dob").setAttribute("max", maxDateString);
});

let user_form = document.getElementById("user_form");

const retriveEntry = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let userEntries = retriveEntry();

const displayEntry = () => {
  const entries = retriveEntry();
  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td class = 'border px-4 py-2'>${entry.name}</td>`;
      const emailCell = `<td class = 'border px-4 py-2'>${entry.email}</td>`;
      const passwordCell = `<td class = 'border px-4 py-2'>${entry.password}</td>`;
      const dobCell = `<td class = 'border px-4 py-2'>${entry.dob}</td>`;
      const acceptCell = `<td class = 'border px-4 py-2'>${entry.accept}</td>`;

      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptCell}`;
      return row;
    })
    .join("\n");
  const table = `<table class = "table-auto w-full"><tr>
    <th class = "px-4 py-2">Name</th>
    <th class = "px-4 py-2">Email</th>
    <th class = "px-4 py-2">Password</th>
    <th class = "px-4 py-2">Dob</th>
    <th class = "px-4 py-2">Accepted terms?</th>
    </tr>${tableEntries}</table>`;
  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const saveUserform = (e) => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const accept = document.getElementById("accept").checked;

  const entry = {
    name,
    email,
    password,
    dob,
    accept,
  };

  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntry();
};

user_form.addEventListener("submit", saveUserform);
displayEntry();
