let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

const addButton = document.getElementById("addJob");
const companyName = document.getElementById("company");
const companyRole = document.getElementById("role");
const listofJobs = document.getElementById("jobList");

addButton.addEventListener("click", function () {

  const company = companyName.value;
  const role = companyRole.value;

  if (company === "" || role === "") {
    alert("Please fill both fields");
    return;
  }

  const li = document.createElement("li");
  li.innerText = `${company} - ${role} `;

  const statusDropdown = document.createElement("select");

  ["Applied", "Interview", "Rejected"].forEach(status => {
    const option = document.createElement("option");
    option.value = status;
    option.innerText = status;
    statusDropdown.appendChild(option);
  });

  statusDropdown.value = "Applied";

  statusDropdown.addEventListener("change", function () {
    if (this.value === "Interview") {
      li.style.color = "green";
    } else if (this.value === "Rejected") {
      li.style.color = "red";
    } else {
      li.style.color = "black";
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", function () {
    li.remove();
  });

  li.appendChild(statusDropdown);
  li.appendChild(deleteBtn);
  listofJobs.appendChild(li);

  companyName.value = "";
  companyRole.value = "";
});
