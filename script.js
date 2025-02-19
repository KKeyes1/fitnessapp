// Initialize workouts array from localStorage or empty array
let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

// DOM Elements
const workoutForm = document.getElementById('workoutForm');
const workoutList = document.getElementById('workoutList');
const totalWorkoutsElement = document.getElementById('totalWorkouts');
const totalMinutesElement = document.getElementById('totalMinutes');
const totalCaloriesElement = document.getElementById('totalCalories');

// Update statistics
function updateStats() {
    totalWorkoutsElement.textContent = workouts.length;
    totalMinutesElement.textContent = workouts.reduce((total, workout) => total + parseInt(workout.duration), 0);
    totalCaloriesElement.textContent = workouts.reduce((total, workout) => total + parseInt(workout.calories), 0);
}

// Save workouts to localStorage
function saveWorkouts() {
    localStorage.setItem('workouts', JSON.stringify(workouts));
    updateStats();
}

// Add new workout
workoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const workout = {
        id: Date.now(),
        type: document.getElementById('workoutType').value,
        duration: document.getElementById('duration').value,
        calories: document.getElementById('calories').value,
        date: document.getElementById('date').value
    };

    workouts.push(workout);
    saveWorkouts();
    displayWorkouts();
    workoutForm.reset();
});

// Display workouts
function displayWorkouts() {
    workoutList.innerHTML = '';
    
    // Sort workouts by date (most recent first)
    workouts.sort((a, b) => new Date(b.date) - new Date(a.date));

    workouts.forEach(workout => {
        const workoutElement = document.createElement('div');
        workoutElement.classList.add('workout-item');
        
        workoutElement.innerHTML = `
            <div>
                <strong>${workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}</strong> - 
                ${workout.date} | 
                ${workout.duration} minutes | 
                ${workout.calories} calories
            </div>
            <button class="delete-btn" onclick="deleteWorkout(${workout.id})">Delete</button>
        `;
        
        workoutList.appendChild(workoutElement);
    });
}

// Delete workout
function deleteWorkout(id) {
    workouts = workouts.filter(workout => workout.id !== id);
    saveWorkouts();
    displayWorkouts();
}

// Set today's date as default in the date input
document.getElementById('date').valueAsDate = new Date();

// Initial display
displayWorkouts();
updateStats(); 