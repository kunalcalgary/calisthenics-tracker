// Sample workout plan (your 30-day calisthenics plan condensed)
const workoutPlan = [
    { day: 1, title: "Week 1, Day 1 - Upper", exercises: ["Push-Ups: 3x10", "Tricep Dips: 3x12", "Plank-to-Shoulder-Tap: 3x20 taps"] },
    { day: 2, title: "Week 1, Day 2 - Lower", exercises: ["Air Squats: 3x15", "Lunges: 3x12/leg", "Calf Raises: 3x20"] },
    // Add more days here (simplified for brevity; full plan can be inserted)
    { day: 30, title: "Week 4, Day 5 - Recovery", exercises: ["Deep Squat Hold: 3x60s", "Hamstring Stretch: 2 min/side"] }
];

// Initialize
let currentDay = 1;
const savedProgress = JSON.parse(localStorage.getItem("progress")) || {};

function loadDay() {
    const today = workoutPlan.find(w => w.day === currentDay) || workoutPlan[0];
    document.getElementById("current-day").textContent = `${currentDay}/30`;
    document.getElementById("workout-display").querySelector("h2").textContent = today.title;
    const exerciseList = document.getElementById("exercise-list");
    exerciseList.innerHTML = "";
    today.exercises.forEach(ex => {
        const li = document.createElement("li");
        li.textContent = ex;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        li.appendChild(checkbox);
        exerciseList.appendChild(li);
    });
    document.getElementById("notes").value = savedProgress[currentDay]?.notes || "";
    document.getElementById("current-date").textContent = new Date().toLocaleDateString();
}

function saveProgress() {
    const notes = document.getElementById("notes").value;
    savedProgress[currentDay] = { notes };
    localStorage.setItem("progress", JSON.stringify(savedProgress));
    updateSummary();
}

function nextDay() {
    currentDay = currentDay < 30 ? currentDay + 1 : 1;
    loadDay();
}

function updateSummary() {
    const summary = Object.keys(savedProgress).map(day => `Day ${day}: ${savedProgress[day].notes}`).join("<br>");
    document.getElementById("summary-text").innerHTML = summary || "Start tracking to see your progress!";
}

// Load initial day
loadDay();
