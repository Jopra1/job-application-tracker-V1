let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

const addButton = document.getElementById("addJob");
const companyName = document.getElementById("company");
const companyRole = document.getElementById("role");
const listofJobs = document.getElementById("jobList");

/* -------------------------
   BACKEND CALL
-------------------------- */
async function fetchAdvice(status) {
  const response = await fetch("http://127.0.0.1:8000/advice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ job_status: status })
  });

  return response.json();
}

/* -------------------------
   RENDER JOB
-------------------------- */
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

  const adviceText = document.createElement("p");
  adviceText.style.fontSize = "0.9em";
  adviceText.style.color = "#555";
  adviceText.style.marginTop = "5px";

  statusDropdown.addEventListener("change", async function () {
    job.status = this.value;
    localStorage.setItem("jobs", JSON.stringify(jobs));
    applyColor();

    adviceText.innerText = "Thinking... 🤔";

    try {
      const response = await fetch("http://127.0.0.1:8000/advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ job_status: job.status })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      adviceText.innerText = `💡 Advice: ${data.action} - ${data.reason}`;
    } catch (error) {
      console.error("Error fetching advice:", error);
      adviceText.innerText = "Could not load advice.";
    }
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
  li.appendChild(adviceText);
  listofJobs.appendChild(li);
}

/* -------------------------
   INITIAL LOAD
-------------------------- */
jobs.forEach(job => {
  renderJob(job);
});

/* -------------------------
   ADD JOB
-------------------------- */
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
