let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

const addButton = document.getElementById("addJob");
const companyName = document.getElementById("company");
const companyRole = document.getElementById("role");
const listofJobs = document.getElementById("jobList");

function renderJob(job) {
  const li = document.createElement("li");
  li.innerText = `${job.company} - ${job.role} `;

  const statusDropdown = document.createElement("select");

  ["Applied", "Interview", "Rejected"].forEach(status => {
    const option = document.createElement("option");
    option.value = status;
    option.innerText = status;
    statusDropdown.appendChild(option);
  });

  statusDropdown.value = job.status;

  function applyColor() {
    if (statusDropdown.value === "Interview") {
      li.style.color = "green";
    } else if (statusDropdown.value === "Rejected") {
      li.style.color = "red";
    } else {
      li.style.color = "black";
    }
  }

  applyColor();

  statusDropdown.addEventListener("change", function () {
    job.status = this.value;
    localStorage.setItem("jobs", JSON.stringify(jobs));
    applyColor();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", function () {
    jobs = jobs.filter(j => j !== job);
    localStorage.setItem("jobs", JSON.stringify(jobs));
    li.remove();
  });

  li.appendChild(statusDropdown);
  li.appendChild(deleteBtn);
  listofJobs.appendChild(li);
}


jobs.forEach(job => {
  renderJob(job);
});


addButton.addEventListener("click", function () {

  const company = companyName.value;
  const role = companyRole.value;

  if (company === "" || role === "") {
    alert("Please fill both fields");
    return;
  }

  const job = {
    company: company,
    role: role,
    status: "Applied"
  };

  jobs.push(job);
  localStorage.setItem("jobs", JSON.stringify(jobs));

  renderJob(job);

  companyName.value = "";
  companyRole.value = "";
});
