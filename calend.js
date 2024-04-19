const calendario = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const todayBtn = document.querySelector(".today-btn");
const gotoBtn = document.querySelector(".goto-btn");
const dateInput = document.querySelector(".date-input");

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let daysHTML = ""; // Cambiado el nombre de la variable para evitar conflictos con la variable global

  for (let x = day; x > 0; x--) {
    const prevDate = new Date(year, month, prevDays - x + 1);
    daysHTML += `<div class="day prev-date" data-date="${prevDate.toISOString().slice(0, 10)}">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    const currentDate = new Date(year, month, i);
    daysHTML += `<div class="day" data-date="${currentDate.toISOString().slice(0, 10)}">${i}</div>`;
  }

  for (let j = 1; j <= nextDays; j++) {
    const nextDate = new Date(year, month + 1, j);
    daysHTML += `<div class="day next-date" data-date="${nextDate.toISOString().slice(0, 10)}">${j}</div>`;
  }
  daysContainer.innerHTML = daysHTML; // Cambiado el nombre de la variable para evitar conflictos con la variable global

  // Manejo del clic en los días del calendario
  const days = document.querySelectorAll('.day');
  days.forEach(day => {
    day.addEventListener('click', () => {
      const appointmentDateInput = document.getElementById('appointmentDate');
      const selectedDate = day.dataset.date;
      appointmentDateInput.value = selectedDate;
    });
  });
}

function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Fecha Inválida");
}

function addDataToList() {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const birthdate = document.getElementById('birthdate').value;
  const appointmentDate = document.getElementById('appointmentDate').value;
  const email = document.getElementById('email').value;

  // Enviar datos al servidor
  fetch('/guardar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      age: age,
      gender: gender,
      birthdate: birthdate,
      appointmentDate: appointmentDate,
      email: email
    }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Evento registrado en el calendario:', data);
    alert('Evento registrado en el calendario');
  })
  .catch(error => {
    console.error('Error al registrar evento en el calendario:', error);
    alert('Error al registrar evento en el calendario');
  });
}

document.getElementById('userDataForm').addEventListener('submit', async function(e) {
  e.preventDefault(); 

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const birthdate = document.getElementById('birthdate').value;
  const appointmentDate = document.getElementById('appointmentDate').value;
  const email = document.getElementById('email').value;

  const eventDescription = `
  Nombre: ${name}
  Edad: ${age}
  Sexo: ${gender}
  Fecha de Nacimiento: ${birthdate}
  Fecha de Cita: ${appointmentDate}
  Correo Electrónico: ${email}
`;

  // Enviar correo utilizando EmailJS
  try {
    const data = {
      name: name,
      age: age,
      gender: gender,
      birthdate: birthdate,
      appointmentDate: appointmentDate,
      email: email
    };
    const response = await emailjs.send('service_bbulvs9', 'template_6ygtkt9', data);
    console.log('Correo enviado correctamente:', response);
    alert('Correo enviado correctamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    alert('Error al enviar el correo');
  }

  // Crear evento en Google Calendar
  try {
    const event = await createEvent(eventDescription, appointmentDate);
    console.log('Evento creado:', event);
    alert('Evento creado correctamente en Google Calendar');
  } catch (error) {
    console.error('Error al crear el evento:', error);
    alert('Error al crear el evento en Google Calendar');
  }

  this.reset(); 
});

async function createEvent(description, dateTime) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'sc.json', 
      scopes: 'https://www.googleapis.com/auth/calendar', 
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const event = await calendar.events.insert({
      calendarId: '437565732739-677a31t7rol9hqo1en3dq8dhblm8qtbt.apps.googleusercontent.com',
      resource: {
        summary: 'Nuevo Evento',
        description: description,
        start: {
          dateTime: dateTime,
        },
        end: {
          dateTime: dateTime,
        },
      },
    });
    return event.data;
  } catch (error) {
    console.error('Error al crear el evento en Google Calendar:', error.message);
    throw error;
  }
}
