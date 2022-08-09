// set up clock

let today = new Date();
const dateDisplay = document.getElementById("date");
const timeDisplay = document.getElementById("time");

dateDisplay.textContent = getFormattedDate(today);

function getFormattedDate(dateobj, format = "en-GB") {
  return dateobj.toLocaleDateString(
    format, // locale
    {
      // options
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

function getFormattedTime(
  dateobj,
  format = "en-GB",
  options = { hour: "2-digit", minute: "2-digit", second: "2-digit" }
) {
  return dateobj.toLocaleTimeString(
    format, // locale
    options
  );
}

function tick() {
  const time = new Date();
  timeDisplay.textConent = getFormattedTime(time);

  if (time.getDate() !== today.getDate()) {
    today = time;
    dateDisplay.textContent = getFormattedDate(today);
  }
}
tick();
setInterval(tick, 1000);

// weather

//https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric`;

const weatherMount = document.getElementById("weather-mount");
weatherMount.innerHTML = `<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;

const city_name = "london, UK";
const API_key = "42d08d24aa2287eeb9badbbd8c4cac72";

// create the URL
const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`;
try {
  const response = await fetch(weatherEndpoint);
  if (!response.ok) throw response;

  const data = await response.json();

  renderWeather(data);
} catch (err) {
  console.log("🚀 ~ file: main.js ~ line 21 ~ err", err);

  weatherMount.innerHTML = ` <div class="alert alert-danger" role="alert">
      ${err.message}
    </div>`;
}

function renderWeather(data) {
  console.log(
    ":rocket: ~ file: main.js ~ line 38 ~ renderWeather ~ data",
    data
  );

  const {
    name,
    main: { temp },
    wind: { speed, deg },
  } = data;

  weatherMount.innerHTML = `
    <div class="card">
    <div class="card-body">
      <h2 class="card-title">${name}</h2>
      <dl>
        <dt>Temperature</dt>
        <dd>${temp}&deg;C</dd>
        <dt>Wind</dt>
        <dd>${speed}km per hour (direction: ${deg}&deg;)</dd>
      </dl>
    </div>
  </div>
    `;
}

//news

const newsMount = document.getElementById("news-mount");
newsMount.innerHTML = `<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;

const newsEndpoint = `https://gnews.io/api/v4/search?q=weather&lang=en&country=gb&token=78b47fd3df58d70d968615d583f0172c`;

try {
  const response2 = await fetch(newsEndpoint);
  if (!response2.ok) throw response2;

  const data = await response2.json();

  renderNews(data);
} catch (err) {
  console.log("🚀 ~ file: main.js ~ line 21 ~ err", err);

  newsMount.innerHTML = ` <div class="alert alert-danger" role="alert">
        ${err.message}
      </div>`;
}

function renderNews(data) {
  console.log(
    ":rocket: ~ file: main.js ~ line 38 ~ renderWeather ~ data",
    data
  );

  const { articles } = data;
  const { title, content, source } = articles[0];
  const { name } = source;

  newsMount.innerHTML = `
        <div class="card">
        <div class="card-body">
          <h2 class="card-title">${name}</h2>
          <dl>
            <dt>Articles</dt>
            <dd>${title}&deg;C</dd>
            <dt>Content</dt>
            <dd>${content}km per hour </dd>
          </dl>
        </div>
      </div>
        `;
}
