import React from "react";

export const APP_NAME = 'mewtter';

export const isLoggedIn = () => localStorage.getItem('token')!==null;

export const titleCase = (string) => {
    return string = string.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
};


export const getRelativeTime = (timeStamp) => {
        const  now = new Date(),
            secondsPast = (now.getTime() - timeStamp) / 1000;
        if (secondsPast < 60) {
            return parseInt(secondsPast) + 's';
        }
        if (secondsPast < 3600) {
            return parseInt(secondsPast / 60) + 'm';
        }
        if (secondsPast <= 86400) {
            return parseInt(secondsPast / 3600) + 'h';
        }
        if (secondsPast > 86400) {
            let day = timeStamp.getDate();
            let month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
            let year = timeStamp.getFullYear() === now.getFullYear() ? "" : " " + timeStamp.getFullYear();
            return day + " " + month + year;
        }
};

export const title =  <h2 style={{
    fontWeight: '700',
    color: '#009688'
}}>
    {APP_NAME}
</h2>;