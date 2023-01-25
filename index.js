const body = document.querySelector('body');
const author = document.querySelector('#author');
const crypto = document.querySelector('#crypto');
const cryptoTop = document.querySelector('#crypto-top');
const time = document.querySelector('#time');
const weather = document.querySelector('#weather');

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(response => response.json())
    .then(data => {
        console.log(data.urls.full);
        body.style.backgroundImage = `url(${data.urls.regular})`;
        author.textContent = `Author: ${data.user.name}`;
    })
    .catch(error => {
        console.log({error});
        console.log("Default image is set as background");
        body.style.backgroundImage = 'url(river.png)';
        author.textContent = `Default Background`;
    })

fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
    .then(response => {
        if (!response.ok) {
            throw(`${response.status} -> Error Occoured`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const cryptoImg = document.createElement('img');
        cryptoImg.setAttribute('src', data.image.small);
        cryptoTop.appendChild(cryptoImg);
        cryptoTop.innerHTML += `<span>${data.name}</span>`;

        crypto.innerHTML += `
            <div id="current">🎯: ₹${data.market_data.current_price.inr}</div>
            <div id="highest">🔺: ₹${data.market_data.high_24h.inr}</div>
            <div id="lowest">🔻: ₹${data.market_data.low_24h.inr}</div>
        `;
    })
    .catch(error => console.log(error));

function setTime() {
    const today = new Date();
    time.innerHTML = `${today.toLocaleTimeString("en-us", {timeStyle: "short"})}`;
}

setTime();

setInterval(setTime, 1000);

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weather.innerHTML = `
                <div>
                    <img src=${iconUrl} />
                    <p>${Math.round(data.main.temp)}ºC</p>
                </div>
                <p id='weather-city'>${data.name}</p>
            `;
        })

    console.log(position.coords.latitude, position.coords.longitude);
});