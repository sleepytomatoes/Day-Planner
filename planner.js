
  const startingTime = 9;
  let currentMilitaryHour;
  
  getMilitaryHour();
  renderDate();
  renderRows(startingTime, currentMilitaryHour);
  renderNotes();

  // this function generates military time using javascripts getTime and setHours methods
  function getMilitaryHour () {
    const todayRightNow = new Date();
    msSinceMidnight = todayRightNow.getTime() - todayRightNow.setHours(0,0,0,0);
    currentMilitaryHour = msSinceMidnight / 3600000;
  }

  // this function uses date-fns to render and format the current date at the top of the page
  function renderDate () {
    const currentDay = $('#currentDay');
    const formattedDate = moment().format('MMMM Do YYYY')
    currentDay.text(formattedDate);
  }

  // this function dynamically creates a row for each hour in the work day using the object literal method
  function renderRows (startingTime, militaryHour) {
    const subContainer = $('.sub-container');
    for (i=0; i < 9; i++) {
      const rowHTML = `
    <div class="row-container">
    <div class="small-column time-column">
    ${formatTime(startingTime, i)}
    </div>
      <div class="medium-column"> 
        <textarea id="row-${i}" class="input-field ${getColorCode(militaryHour, getMilitaryTime(startingTime, i))}"></textarea>
      </div>
      <div class="small-column button-column">
        <button type="submit" id="button-${i}" onclick="saveNote(${i})" class="button">Save <i class="fa fa-chevron-circle-right"></i></button>
      </div>
    </div>
    `
    // appends rows to subcontainer
    subContainer.append(rowHTML);
    }
  }
  
  // this function sets up the variable storedNote to hold the value of each individual note to be utilized in localStorage
  function renderNotes () {
    for (i=0; i < 9; i++) {
      const storedNote = localStorage.getItem(`#row-${i}`);
      if (storedNote) {
        const rowInput = $(`#row-${i}`);
        console.log(storedNote, rowInput);
        rowInput.val(storedNote);
      }
    }
  }

  // this function formats our times to reflect AM and PM respectively
  function formatTime (startingTime, i) {
    const newTime = startingTime + i;
    if (newTime <= 11) {
      return `${newTime}:00AM`;
    } else if (newTime > 11) {
      return `${militaryToStandard(newTime)}:00PM`
    }
  }

// this function uses military time as a starting point from which to reflect standard time
  function militaryToStandard (newTime) {
    if (newTime > 12) {
      return newTime - 12;
    } else if (newTime = 12) {
      return newTime;
  }
}

// this function compares the current time to the time reflected in each row, and assigns the classes past, present, and future accordingly
  function getColorCode (currentHour, rowHour) {
    const currentHourInteger = Math.floor(currentHour)
    if (currentHourInteger > rowHour) {
      return "past";
    } else if (currentHourInteger < rowHour) { 
      return "future";
    } else if (currentHourInteger === rowHour) {
      return "present";
    }
  }
  
  // this function generates military time using the incrementation of i
  function getMilitaryTime (startingTime, i) {
    const newTime = startingTime + i;
    return newTime;
  }

  // this function takes the value of an individual row and saves it to local storage
  function saveNote (i) {
    const rowInputText = $(`#row-${i}`).val();
    localStorage.setItem(`#row-${i}`, rowInputText);
  }