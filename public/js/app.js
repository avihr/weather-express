const form = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.getElementById("pOne");
const messageTwo = document.getElementById("pTwo");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    messageTwo.textContent = "";

    messageOne.textContent = "Loading...";
    const location = input.value;

    fetch(`/weather?location=${location}`)
        .then((res) => {
            res.json().then((body) => {
                if (body.error) messageOne.textContent = body.error;
                else {
                    const responseLocation = body.weatherInfo.location.name;
                    messageOne.textContent = responseLocation;
                    const { temperature, precipitationProbability } =
                        body.weatherInfo.data.values;
                    messageTwo.textContent = `Sky is ${body.summary}. Temperature is ${temperature}C. There is ${precipitationProbability}% chance of rain`;
                }
            });
        })
        .catch((err) => {
            messageOne.textContent = err;
        })
        .finally(() => (input.value = ""));
});
