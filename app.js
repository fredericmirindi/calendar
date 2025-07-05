// Application State
let currentDate = new Date('2025-07-05');
let currentView = 'month';
let selectedDate = null;
let editingActivity = null;
let timerInterval = null;
let timerSeconds = 1500; // 25 minutes in seconds
let isTimerRunning = false;

// Sample Data
const appData = {
  "currentDate": "2025-07-05",
  "activities": [
    {
      "id": 1,
      "title": "Morning Meditation",
      "category": "Health",
      "date": "2025-07-05",
      "time": "07:00",
      "duration": 20,
      "priority": "high",
      "recurring": "daily",
      "completed": true,
      "color": "#10B981"
    },
    {
      "id": 2,
      "title": "Team Meeting",
      "category": "Work",
      "date": "2025-07-05",
      "time": "09:00",
      "duration": 60,
      "priority": "high",
      "location": "Conference Room A",
      "color": "#3B82F6"
    },
    {
      "id": 3,
      "title": "Gym Workout",
      "category": "Health",
      "date": "2025-07-05",
      "time": "18:00",
      "duration": 90,
      "priority": "medium",
      "color": "#10B981"
    },
    {
      "id": 4,
      "title": "Learn JavaScript",
      "category": "Learning",
      "date": "2025-07-06",
      "time": "14:00",
      "duration": 120,
      "priority": "medium",
      "color": "#8B5CF6"
    },
    {
      "id": 5,
      "title": "Family Dinner",
      "category": "Social",
      "date": "2025-07-06",
      "time": "19:00",
      "duration": 90,
      "priority": "high",
      "color": "#F59E0B"
    },
    {
      "id": 6,
      "title": "Project Planning",
      "category": "Work",
      "date": "2025-07-07",
      "time": "10:00",
      "duration": 180,
      "priority": "high",
      "color": "#3B82F6"
    },
    {
      "id": 7,
      "title": "Guitar Practice",
      "category": "Hobbies",
      "date": "2025-07-07",
      "time": "20:00",
      "duration": 45,
      "priority": "low",
      "recurring": "weekly",
      "color": "#EF4444"
    },
    {
      "id": 8,
      "title": "Doctor Appointment",
      "category": "Health",
      "date": "2025-07-08",
      "time": "11:00",
      "duration": 60,
      "priority": "high",
      "location": "Medical Center",
      "color": "#10B981"
    },
    {
      "id": 9,
      "title": "Book Reading",
      "category": "Learning",
      "date": "2025-07-08",
      "time": "21:00",
      "duration": 60,
      "priority": "medium",
      "recurring": "daily",
      "color": "#8B5CF6"
    },
    {
      "id": 10,
      "title": "Coffee with Sarah",
      "category": "Social",
      "date": "2025-07-09",
      "time": "15:00",
      "duration": 90,
      "priority": "medium",
      "location": "Blue Cafe",
      "color": "#F59E0B"
    }
  ],
  "habits": [
    {
      "id": 1,
      "name": "Drink 8 glasses of water",
      "category": "Health",
      "streak": 12,
      "target": 30,
      "completed_today": true
    },
    {
      "id": 2,
      "name": "Read for 30 minutes",
      "category": "Learning",
      "streak": 8,
      "target": 21,
      "completed_today": false
    },
    {
      "id": 3,
      "name": "Exercise",
      "category": "Health",
      "streak": 5,
      "target": 14,
      "completed_today": false
    },
    {
      "id": 4,
      "name": "Meditate",
      "category": "Health",
      "streak": 15,
      "target": 30,
      "completed_today": true
    }
  ],
  "goals": [
    {
      "id": 1,
      "title": "Learn Web Development",
      "category": "Learning",
      "progress": 65,
      "deadline": "2025-09-30",
      "priority": "high"
    },
    {
      "id": 2,
      "title": "Run 5K Marathon",
      "category": "Health",
      "progress": 40,
      "deadline": "2025-08-15",
      "priority": "medium"
    },
    {
      "id": 3,
      "title": "Read 24 Books This Year",
      "category": "Learning",
      "progress": 75,
      "deadline": "2025-12-31",
      "priority": "medium"
    }
  ],
  "categories": [
    {
      "name": "Work",
      "color": "#3B82F6",
      "icon": "💼"
    },
    {
      "name": "Health",
      "color": "#10B981",
      "icon": "🏃"
    },
    {
      "name": "Learning",
      "color": "#8B5CF6",
      "icon": "📚"
    },
    {
      "name": "Social",
      "color": "#F59E0B",
      "icon": "👥"
    },
    {
      "name": "Hobbies",
      "color": "#EF4444",
      "icon": "🎨"
    },
    {
      "name": "Personal",
      "color": "#06B6D4",
      "icon": "🏠"
    }
  ]
};

// DOM Elements
const elements = {
  calendarGrid: document.getElementById('calendarGrid'),
  currentMonth: document.getElementById('currentMonth'),
  todayDate: document.getElementById('todayDate'),
  todayActivities: document.getElementById('todayActivities'),
  completedActivities: document.getElementById('completedActivities'),
  totalHours: document.getElementById('totalHours'),
  habitsList: document.getElementById('habitsList'),
  goalsList: document.getElementById('goalsList'),
  miniCalendar: document.getElementById('miniCalendar'),
  activityModal: document.getElementById('activityModal'),
  focusTimerModal: document.getElementById('focusTimerModal'),
  activityForm: document.getElementById('activityForm'),
  timerTime: document.getElementById('timerTime'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  todayBtn: document.getElementById('todayBtn'),
  addActivityBtn: document.getElementById('addActivityBtn'),
  themeToggle: document.getElementById('themeToggle'),
  categoryFilter: document.getElementById('categoryFilter'),
  viewBtns: document.querySelectorAll('.view-btn'),
  closeModal: document.getElementById('closeModal'),
  closeFocusTimer: document.getElementById('closeFocusTimer'),
  saveActivityBtn: document.getElementById('saveActivityBtn'),
  cancelBtn: document.getElementById('cancelBtn'),
  startTimer: document.getElementById('startTimer'),
  pauseTimer: document.getElementById('pauseTimer'),
  resetTimer: document.getElementById('resetTimer')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  renderCalendar();
  updateDashboard();
  renderHabits();
  renderGoals();
  renderMiniCalendar();
  updateCurrentMonthDisplay();
  updateTodayDateDisplay();
});

// Event Listeners
function initializeEventListeners() {
  // Navigation
  elements.prevBtn.addEventListener('click', navigatePrevious);
  elements.nextBtn.addEventListener('click', navigateNext);
  elements.todayBtn.addEventListener('click', goToToday);
  
  // View switching
  elements.viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => switchView(e.target.dataset.view));
  });
  
  // Modal controls
  elements.addActivityBtn.addEventListener('click', openAddActivityModal);
  elements.closeModal.addEventListener('click', closeActivityModal);
  elements.closeFocusTimer.addEventListener('click', closeFocusTimerModal);
  elements.saveActivityBtn.addEventListener('click', saveActivity);
  elements.cancelBtn.addEventListener('click', closeActivityModal);
  
  // Timer controls
  elements.startTimer.addEventListener('click', startFocusTimer);
  elements.pauseTimer.addEventListener('click', pauseFocusTimer);
  elements.resetTimer.addEventListener('click', resetFocusTimer);
  
  // Theme toggle
  elements.themeToggle.addEventListener('click', toggleTheme);
  
  // Category filter
  elements.categoryFilter.addEventListener('change', filterActivities);
  
  // Calendar double-click
  elements.calendarGrid.addEventListener('dblclick', handleCalendarDoubleClick);
  
  // Modal backdrop click
  elements.activityModal.addEventListener('click', (e) => {
    if (e.target === elements.activityModal) closeActivityModal();
  });
  
  elements.focusTimerModal.addEventListener('click', (e) => {
    if (e.target === elements.focusTimerModal) closeFocusTimerModal();
  });
  
  // Form submission
  elements.activityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveActivity();
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Calendar Functions
function renderCalendar() {
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  elements.calendarGrid.innerHTML = '';
  
  // Add day headers
  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayHeaders.forEach(day => {
    const dayHeader = document.createElement('div');
    dayHeader.className = 'calendar-day-header';
    dayHeader.textContent = day;
    dayHeader.style.cssText = `
      padding: var(--space-8);
      font-weight: var(--font-weight-bold);
      text-align: center;
      background: var(--color-secondary);
      border-right: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
    `;
    elements.calendarGrid.appendChild(dayHeader);
  });
  
  // Add calendar days
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    const dayElement = createDayElement(date);
    elements.calendarGrid.appendChild(dayElement);
  }
}

function createDayElement(date) {
  const dayElement = document.createElement('div');
  dayElement.className = 'calendar-day';
  dayElement.dataset.date = formatDate(date);
  
  const isToday = isSameDate(date, new Date());
  const isCurrentMonth = date.getMonth() === currentDate.getMonth();
  
  if (isToday) dayElement.classList.add('today');
  if (!isCurrentMonth) dayElement.classList.add('other-month');
  
  const dayNumber = document.createElement('div');
  dayNumber.className = 'day-number';
  dayNumber.textContent = date.getDate();
  dayElement.appendChild(dayNumber);
  
  const activitiesContainer = document.createElement('div');
  activitiesContainer.className = 'day-activities';
  
  const dayActivities = getActivitiesForDate(date);
  dayActivities.forEach(activity => {
    const activityElement = createActivityElement(activity);
    activitiesContainer.appendChild(activityElement);
  });
  
  dayElement.appendChild(activitiesContainer);
  
  // Add click handler
  dayElement.addEventListener('click', () => selectDate(date));
  
  return dayElement;
}

function createActivityElement(activity) {
  const activityElement = document.createElement('div');
  activityElement.className = `activity-item ${activity.priority}-priority`;
  activityElement.style.backgroundColor = activity.color;
  activityElement.style.color = 'white';
  activityElement.textContent = activity.title;
  activityElement.dataset.activityId = activity.id;
  
  if (activity.completed) {
    activityElement.classList.add('completed');
  }
  
  activityElement.addEventListener('click', (e) => {
    e.stopPropagation();
    openEditActivityModal(activity);
  });
  
  return activityElement;
}

function getActivitiesForDate(date) {
  const dateStr = formatDate(date);
  return appData.activities.filter(activity => activity.date === dateStr);
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function isSameDate(date1, date2) {
  return formatDate(date1) === formatDate(date2);
}

// Navigation Functions
function navigatePrevious() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
  updateCurrentMonthDisplay();
  renderMiniCalendar();
}

function navigateNext() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
  updateCurrentMonthDisplay();
  renderMiniCalendar();
}

function goToToday() {
  currentDate = new Date();
  renderCalendar();
  updateCurrentMonthDisplay();
  renderMiniCalendar();
  updateDashboard();
}

function switchView(view) {
  currentView = view;
  elements.viewBtns.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-view="${view}"]`).classList.add('active');
  
  // For demo purposes, we'll just update the calendar
  // In a real app, you'd have different rendering logic for each view
  renderCalendar();
}

// Modal Functions
function openAddActivityModal() {
  editingActivity = null;
  document.getElementById('modalTitle').textContent = 'Add New Activity';
  elements.activityForm.reset();
  
  if (selectedDate) {
    document.getElementById('activityDate').value = formatDate(selectedDate);
  }
  
  elements.activityModal.classList.add('active');
  document.getElementById('activityTitle').focus();
}

function openEditActivityModal(activity) {
  editingActivity = activity;
  document.getElementById('modalTitle').textContent = 'Edit Activity';
  
  // Populate form with activity data
  document.getElementById('activityTitle').value = activity.title;
  document.getElementById('activityCategory').value = activity.category;
  document.getElementById('activityDate').value = activity.date;
  document.getElementById('activityTime').value = activity.time;
  document.getElementById('activityDuration').value = activity.duration;
  document.getElementById('activityPriority').value = activity.priority;
  document.getElementById('activityLocation').value = activity.location || '';
  document.getElementById('activityNotes').value = activity.notes || '';
  document.getElementById('activityRecurring').checked = !!activity.recurring;
  
  elements.activityModal.classList.add('active');
}

function closeActivityModal() {
  elements.activityModal.classList.remove('active');
  editingActivity = null;
}

function saveActivity() {
  const formData = new FormData(elements.activityForm);
  const activityData = {
    title: document.getElementById('activityTitle').value,
    category: document.getElementById('activityCategory').value,
    date: document.getElementById('activityDate').value,
    time: document.getElementById('activityTime').value,
    duration: parseInt(document.getElementById('activityDuration').value),
    priority: document.getElementById('activityPriority').value,
    location: document.getElementById('activityLocation').value,
    notes: document.getElementById('activityNotes').value,
    recurring: document.getElementById('activityRecurring').checked ? 'custom' : null,
    color: getCategoryColor(document.getElementById('activityCategory').value)
  };
  
  if (editingActivity) {
    // Update existing activity
    Object.assign(editingActivity, activityData);
  } else {
    // Add new activity
    activityData.id = Date.now(); // Simple ID generation
    appData.activities.push(activityData);
  }
  
  closeActivityModal();
  renderCalendar();
  updateDashboard();
  renderMiniCalendar();
}

function getCategoryColor(category) {
  const categoryData = appData.categories.find(cat => cat.name === category);
  return categoryData ? categoryData.color : '#3B82F6';
}

// Dashboard Functions
function updateDashboard() {
  const today = formatDate(new Date());
  const todayActivities = appData.activities.filter(activity => activity.date === today);
  const completedToday = todayActivities.filter(activity => activity.completed);
  const totalMinutes = todayActivities.reduce((sum, activity) => sum + activity.duration, 0);
  
  elements.todayActivities.textContent = todayActivities.length;
  elements.completedActivities.textContent = completedToday.length;
  elements.totalHours.textContent = `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
}

function updateTodayDateDisplay() {
  const today = new Date();
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  elements.todayDate.textContent = today.toLocaleDateString('en-US', options);
}

function updateCurrentMonthDisplay() {
  const options = { year: 'numeric', month: 'long' };
  elements.currentMonth.textContent = currentDate.toLocaleDateString('en-US', options);
}

// Habits Functions
function renderHabits() {
  elements.habitsList.innerHTML = '';
  
  appData.habits.forEach(habit => {
    const habitElement = document.createElement('div');
    habitElement.className = 'habit-item';
    habitElement.innerHTML = `
      <div class="habit-info">
        <div class="habit-name">${habit.name}</div>
        <div class="habit-progress">${habit.streak}/${habit.target} days</div>
      </div>
      <div class="habit-streak">${habit.streak} 🔥</div>
      <div class="habit-checkbox ${habit.completed_today ? 'completed' : ''}" 
           data-habit-id="${habit.id}"></div>
    `;
    
    const checkbox = habitElement.querySelector('.habit-checkbox');
    checkbox.addEventListener('click', () => toggleHabit(habit.id));
    
    elements.habitsList.appendChild(habitElement);
  });
}

function toggleHabit(habitId) {
  const habit = appData.habits.find(h => h.id === habitId);
  if (habit) {
    habit.completed_today = !habit.completed_today;
    if (habit.completed_today) {
      habit.streak++;
    } else {
      habit.streak = Math.max(0, habit.streak - 1);
    }
    renderHabits();
  }
}

// Goals Functions
function renderGoals() {
  elements.goalsList.innerHTML = '';
  
  appData.goals.forEach(goal => {
    const goalElement = document.createElement('div');
    goalElement.className = 'goal-item';
    goalElement.innerHTML = `
      <div class="goal-header">
        <div class="goal-title">${goal.title}</div>
        <div class="goal-progress-text">${goal.progress}%</div>
      </div>
      <div class="goal-progress-bar">
        <div class="goal-progress-fill" style="width: ${goal.progress}%"></div>
      </div>
      <div class="goal-deadline">Due: ${new Date(goal.deadline).toLocaleDateString()}</div>
    `;
    
    elements.goalsList.appendChild(goalElement);
  });
}

// Mini Calendar Functions
function renderMiniCalendar() {
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  elements.miniCalendar.innerHTML = '';
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    const dayElement = document.createElement('div');
    dayElement.className = 'mini-calendar-day';
    dayElement.textContent = date.getDate();
    
    const isToday = isSameDate(date, new Date());
    const hasActivities = getActivitiesForDate(date).length > 0;
    
    if (isToday) dayElement.classList.add('today');
    if (hasActivities) dayElement.classList.add('has-activity');
    
    dayElement.addEventListener('click', () => {
      currentDate = new Date(date);
      renderCalendar();
      updateCurrentMonthDisplay();
      renderMiniCalendar();
    });
    
    elements.miniCalendar.appendChild(dayElement);
  }
}

// Focus Timer Functions
function startFocusTimer() {
  if (!isTimerRunning) {
    isTimerRunning = true;
    elements.focusTimerModal.classList.add('active');
    document.querySelector('.timer-circle').classList.add('active');
    
    timerInterval = setInterval(() => {
      timerSeconds--;
      updateTimerDisplay();
      
      if (timerSeconds <= 0) {
        resetFocusTimer();
        alert('Focus session completed! Great job! 🎉');
      }
    }, 1000);
  }
}

function pauseFocusTimer() {
  if (isTimerRunning) {
    isTimerRunning = false;
    clearInterval(timerInterval);
    document.querySelector('.timer-circle').classList.remove('active');
  }
}

function resetFocusTimer() {
  isTimerRunning = false;
  clearInterval(timerInterval);
  timerSeconds = 1500; // Reset to 25 minutes
  updateTimerDisplay();
  document.querySelector('.timer-circle').classList.remove('active');
}

function updateTimerDisplay() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  elements.timerTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function closeFocusTimerModal() {
  elements.focusTimerModal.classList.remove('active');
}

// Theme Functions
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-color-scheme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-color-scheme', newTheme);
  
  const icon = elements.themeToggle.querySelector('i');
  icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Utility Functions
function selectDate(date) {
  selectedDate = date;
  document.querySelectorAll('.calendar-day').forEach(day => {
    day.classList.remove('selected');
  });
  document.querySelector(`[data-date="${formatDate(date)}"]`).classList.add('selected');
}

function handleCalendarDoubleClick(e) {
  const dayElement = e.target.closest('.calendar-day');
  if (dayElement) {
    const date = new Date(dayElement.dataset.date);
    selectDate(date);
    openAddActivityModal();
  }
}

function filterActivities() {
  const selectedCategory = elements.categoryFilter.value;
  const activityElements = document.querySelectorAll('.activity-item');
  
  activityElements.forEach(element => {
    const activityId = parseInt(element.dataset.activityId);
    const activity = appData.activities.find(a => a.id === activityId);
    
    if (!selectedCategory || activity.category === selectedCategory) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  });
}

function handleKeyboardShortcuts(e) {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case 'n':
        e.preventDefault();
        openAddActivityModal();
        break;
      case 't':
        e.preventDefault();
        goToToday();
        break;
      case 'f':
        e.preventDefault();
        startFocusTimer();
        break;
    }
  }
  
  if (e.key === 'Escape') {
    closeActivityModal();
    closeFocusTimerModal();
  }
}

// Initialize timer display
updateTimerDisplay();