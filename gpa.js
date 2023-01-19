window.onload = function() {
  document.getElementById("courseList").style.display = "none";
}


var courseList = [];

function addCourse() {

  var courseName = document.getElementById("courseName").value;
  var credits = document.getElementById("credits").value;
  var grade = document.getElementById("grade").value;

  // Validate the input
  if (!courseName) courseName = courseList.length + 1;
  if (!grade || !credits) {
    alert("Please enter grade and credits!");
    return;
  }
  if (credits < 1) {
    alert("Please enter a valid number of credits greater than 1!");
    return;
  }
  if (!(grade == "A+" || grade == "A" || grade == "B+" || grade == "B" || grade == "C+" || grade == "C" ||grade == "D+" || grade == "D" || grade == "F")) {
    alert("Invalid grade entered for course " + courseName);
    return;
  }
  var table = document.getElementById("courseList");
  var row = table.insertRow(-1);
  var nameCell = row.insertCell(0);
  nameCell.innerHTML = courseName;
  var creditsCell = row.insertCell(1);
  creditsCell.innerHTML = credits;
  var gradeCell = row.insertCell(2);
  gradeCell.innerHTML = grade;
  var deleteCell = row.insertCell(3);
  var deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("id", "buttonDel");
  deleteBtn.innerHTML = "X";
  deleteBtn.onclick = function() {
    deleteCourse(row);
  };
  deleteCell.appendChild(deleteBtn);
  courseList.push({ name: courseName, credits: credits, grade: grade });
  document.getElementById("courseList").style.display = "";
  calculateGPA();
  document.getElementById("courseName").value = "";
  document.getElementById("grade").value = "";
  document.getElementById("credits").value = "";
  document.getElementById("buttonAdd").style.background = "";
}

function changeTheColorOfButton() {
  var grade = document.getElementById("grade").value;
  var credits = document.getElementById("credits").value;
  if (grade != "" && credits != "" && credits > 0 && (grade == "A+" || grade == "A" || grade == "B+" || grade == "B" || grade == "C+" || grade == "C" ||grade == "D+" || grade == "D" || grade == "F")) {
     document.getElementById("buttonAdd").style.background = "green";
  } else {
    document.getElementById("buttonAdd").style.background = "";
  }
}

function calculateGPA() {
  if(courseList.length == 0) {
    document.getElementById("gpa").innerHTML = "No courses added";
    document.getElementById("courseList").style.display = "none";
    return;
  }
  var totalPoints = 0;
  var totalCredits = 0;
  for (var i = 0; i < courseList.length; i++) {
    var course = courseList[i];
    var credits = course.credits;
    totalCredits += parseInt(credits);
    switch (course.grade) {
      case "A+":
        totalPoints += 4 * credits;
        break;
      case "A":
        totalPoints += 3.7 * credits;
        break;
      case "B+":
        totalPoints += 3.5 * credits;
        break;
      case "B":
        totalPoints += 3 * credits;
        break;
      case "C+":
        totalPoints += 2.5 * credits;
        break;
      case "C":
        totalPoints += 2 * credits;
        break;
      case "D+":
        totalPoints += 1.5 * credits;
        break;
      case "D":
        totalPoints += 1 * credits;
        break;
      case "F":
        totalPoints += 0;
        break;
      default: totalPoints += 0;
    }
  }
  var gpa = totalPoints / totalCredits;
  document.getElementById("gpa").innerHTML = "GPA: " + gpa.toFixed(2);
}

  
function deleteCourse(row) {
  var table = document.getElementById("courseList");
  var index = row.rowIndex;
  table.deleteRow(index);
  courseList.splice(index-1, 1);
  calculateGPA();
}

  
