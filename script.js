const addButton = document.getElementById("addJob");
const companyName = document.getElementById("company");
const companyRole = document.getElementById("role");
const listofJobs = document.getElementById("jobList");

addButton.addEventListener("click",function(){
   
    const company =companyName.value;
    const role= companyRole.value;
     if(company==="" || role==="")
    {
      alert("Please fill both fields");
      return;
    }
    
  const li = document.createElement("li");
  li.innerText = company + " - " + role;

  listofJobs.appendChild(li);

  companyName.value = "";
  companyRole.value = "";
})


