function showContent(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((section) => section.classList.remove("active"));

  // Show the selected section
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.classList.add("active");
  }
}

// Display the first section by default
document.addEventListener("DOMContentLoaded", () => {
  showContent("profile"); // Default to "Profile Information"
});

// address
const address = document.querySelector("#adr");
address.addEventListener("click", function () {
  console.log("hello");
  document.querySelector("#adr-form").style.display = "grid";
});

function appendAddress() {
  const addAddress = document.createElement("div");
  addAddress.className = "addlist";
  addAddress.innerHTML = `<div class="sec-1">
             <span>Home</span>
            <span><i class="ri-more-2-fill" onclick ="popup()" ></i></span>
          </div>
          <div class="sec-2">
            <div class="small-sec">
            <span>Name</span>
            <span>1234567890</span>
           </div>
            <p>Lorem ipsum dolor sit amet consectetur
              <br>adipisicing elit. Consequuntur, laudantium?</p>
            </div> `;
  savedAdr.appendChild(addAddress);
}
function popup() {
  const popOption = document.createElement("div");
  popOption.className = "popup";
  popOption.innerHTML = `
    <span class="close">Edit</span>
    <span class="close">Delete</span>`;
  popOption.style.display = "block";
  document.body.appendChild(popOption);
  console.log(popOption);
}
const savedAdr = document.querySelector(".adr-show");
if (savedAdr.children.length === 0) {
  appendAddress();
  console.log("empty");
} else {
  savedAdr.insertBefore(appendAddress(), savedAdr.firstChild);
}
const addressForm = document.querySelector("#adr-form");
addressForm.addEventListener(SubmitEvent, async function () {
  const name = addressForm.name.value;
  const phoneNumber = addressForm.phoneNumber.value;
  const pinCode = addressForm.pinCode.value;
  const locality = addressForm.locality.value;
  const address = addressForm.address.value;
  const city = addressForm.city.value;
  const state = addressForm.state.value;
  const landmark = addressForm.landmark.value;
  const altNumber = addressForm.altNumber.value;
  const home = addressForm.home.value;
  const work = addressForm.work.value;
  const data = {};
  if (name === "string" && name.length != 0 && name != null) {
    console.log("name is valid");
    data.name = name;
  }
  if (
    phoneNumber === "number" &&
    phoneNumber.length >= 10 &&
    phoneNumber != null
  ) {
    console.log("phone number is valid");
    data.phoneNumber = phoneNumber;
  }
  if (pinCode === "number" && pinCode.length >= 6 && phoneNumber != null) {
    console.log("pinCode  is valid");
    data.pinCode = pinCode;
  }
  if (locality === "string" && locality.length != 0 && locality != null) {
    console.log("locality is valid");
    data.locality = locality;
  }
  if (address === "string" && address.length != 0 && address != null) {
    console.log("Address is valid");
    data.address = address;
  }
  if (city === "string" && city.length != 0 && city != null) {
    console.log(" city is valid");
    data.city = city;
  }
  if (state === "string" && state.length != 0 && state != null) {
    console.log(" state is valid");
    data.state = state;
  }
  if (landmark === "string" && landmark.length != 0 && landmark != null) {
    console.log(" landmark is valid");
    data.landmark = landmark;
  }
  if (altNumber === "number" && altNumber.length >= 10 && altNumber != null) {
    console.log(" Number is valid");
    data.altNumber = altNumber;
  }
  if (home === "string" && home.length != 0 && home != null) {
    console.log(" home is valid");
    data.home = home;
  }
  if (work === "string" && work.length != 0 && landmark != null) {
    console.log(" work is valid");
    data.work = work;
  }
  try {
    const res = fetch("/data", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const resdata = await res.JSON();
      console.log("Data sent successfully", resdata);
    }
  } catch (error) {
    console.error("Error sending data:", error);
  }
});

function cancle() {
  const addressForm = document.querySelector("#adr-form");
  addressForm.style.display = "none";
}
