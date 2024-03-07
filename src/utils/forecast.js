import request from "request";

const forecast = (location, callback) => {
    const url =
        "https://api.tomorrow.io/v4/weather/realtime?location=" +
        encodeURIComponent(location) +
        "&apikey=1znAELZDykkSILcYDIvZF09REOP7FJ1G";

    request({ url: url, json: true }, (err, res) => {
        if (err)
            callback(
                "No network connection. Please connect to a network and try again later!"
            );
        else if (res.statusCode == 400)
            callback(`Failed to get location ${location}. Try different term`);
        else {
            callback(null, res.body);
        }
    });
};

export { forecast };
