const addButton = document.getElementById("addJob");
const companyName = document.getElementById("company");
const companyRole = document.getElementById("role");
const listofJobs = document.getElementById("jobList");
const statusSelect = document.getElementById("status");

addButton.addEventListener("click", function () {

  const company = companyName.value;
  const role = companyRole.value;
  const status = statusSelect.value;

  if (company === "" || role === "") {
    alert("Please fill both fields");
    return;
  }

  const li = document.createElement("li");

  // set text FIRST
  li.innerText = `${company} - ${role} (${status}) `;

  // color logic
  if (status === "Interview") {
    li.style.color = "green";
  } else if (status === "Rejected") {
    li.style.color = "red";
  }

  // delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", function () {
    li.remove();
  });

  li.appendChild(deleteBtn);
  listofJobs.appendChild(li);

  companyName.value = "";
  companyRole.value = "";
});



