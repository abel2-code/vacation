let form = document.getElementById("form");
let locationField = document.getElementById("location");
let descriptionField = document.getElementById("job_description");
let fullTime = document.getElementById("full_time");
let partTime = document.getElementById("part_time");
let all = document.getElementById("all");
let jobType = false;

form.onsubmit = (e) => {
  e.preventDefault();

  // check to see if at least one field is filled
  if (locationField.value.trim() || descriptionField.value.trim()) {
    if (fullTime.checked) jobType = true;
    if (partTime.checked) jobType = false;
    if (all.check) jobType = false;

    let description = descriptionField.value;
    let theLocation = locationField.value;

    axios
      .get(
        `https://jobs.github.com/positions.json?description=${description}&location=${theLocation}&full_time=${jobType}`
      )
      .then((res) => {
        let jobs = res.data;
        console.log("made it to the response");
        jobs.map((job) => {
          console.log(job);
          let jobLogo = job.company_logo,
            jobDescription = truncate(job.description, 100),
            jobType = job.type,
            title = job.title,
            howToApply = job.how_to_apply;

          makeCard(jobLogo, jobDescription, jobType, title, howToApply);
        });
      });
  }
};

// check for length and truncate if necessary
function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

// make a card for a job
function makeCard(logo, description, type, title, howToApply) {
  console.log("we made it to makeCard");
  let card = document.createElement("div");
  card.innerHTML = `
  <h1>${title}</h1>
  <img width="300px" src=${logo} alt="company logo" />
  <h3>${type}</h3>
  <div class="details" style="display: none">
  <p>${description}</p>
  <p>${howToApply}</p>
  </div>
  <button class="description_button">Job Description</button>
  `;

  document.getElementById("cards_container").appendChild(card);
}

onclick = (e) => {
  if (e.target.matches("button.decsription_button")) {
    console.log("found the button");
    let jobStyle = e.target.parentElement.getElementByClassName("details").style
      .display;

    if (jobStyle == "none") jobStyle = "block";
    else jobStyle = "none";
  }
};
