import { universities, programmes } from "./data.js";

const showButton = document.getElementById("showDialog");
const resultDialog = document.getElementById("resultDialog");

// inputs
const studentName = document.getElementById("name");
const aggregate = document.getElementById("aggregate");
const studentLocation = document.getElementById("location");
const career = document.getElementById("career");
const scholarship = document.getElementById("scholarship");

// output
const nameOutput = document.getElementById("nameOutput");
const outputArea = document.querySelector("output");

// match inputted values
function getProgrammesByCriteria(aggregate, career, location, scholarship) {
  const filteredProgrammes = programmes.filter((programme) => {
    return (
      programme.aggregate >= aggregate &&
      programme.career === career &&
      programme.universities.some((universityName) => {
        const university = universities.find(
          (uni) => uni.name === universityName
        );
        return (
          university &&
          university.location === location &&
          university.scholarship === scholarship
        );
      })
    );
  });

  const matchingUniversities = filteredProgrammes.map((programme) => {
    const universitiesMatchingCriteria = programme.universities.filter(
      (universityName) => {
        const university = universities.find(
          (uni) => uni.name === universityName
        );
        return (
          university &&
          university.location === location &&
          university.scholarship === scholarship
        );
      }
    );
    return {
      name: programme.name,
      aggregate: programme.aggregate,
      universities: universitiesMatchingCriteria,
    };
  });

  return matchingUniversities;
}

const result = () => {
  nameOutput.textContent = `${studentName.value}`;
  outputArea.innerHTML = "";

  const isScholarship = scholarship.value === "yes";
  const programmes = getProgrammesByCriteria(
    aggregate.value,
    career.value,
    studentLocation.value,
    isScholarship
  );

  if (programmes.length !== 0) {
    programmes.map((programme) => {
      const name = document.createElement("h4");
      const nameText = document.createTextNode(
        `Programme Name: ${programme.name}`
      );
      name.appendChild(nameText);

      const list = document.createElement("ul");
      const cutoff = document.createElement("li");
      const cutoffText = document.createTextNode(
        `Cut-Off: ${programme.aggregate}`
      );
      cutoff.appendChild(cutoffText);

      const universities = document.createElement("li");
      const uniText = document.createTextNode(
        `University(ies): ${programme.universities.join(" | ")}`
      );
      universities.appendChild(uniText);

      list.appendChild(cutoff).appendChild(universities);

      // final output
      outputArea.appendChild(name);

      outputArea.appendChild(list).appendChild(document.createElement("br"));
    });
  } else {
    outputArea.textContent = "No Matching Programme Found";
  }
};

showButton.addEventListener("click", () => {
  if (!studentName.value) {
    alert("Please enter your name");
  } else if (!aggregate.value) {
    alert("Please enter an aggregate");
  } else if (aggregate.value > 54 || aggregate.value < 6) {
    alert("Aggregate should ba a number from 6 - 54");
  } else {
    result();
    resultDialog.showModal();
  }
});
