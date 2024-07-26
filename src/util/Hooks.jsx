export const calculateAge = (birthdate) => {
    if (!birthdate) return 0;
    // Calculate the difference in milliseconds between the current date and the provided date of birth
    let diff_ms = Date.now() - birthdate.getTime();
    // Create a new Date object representing the difference in milliseconds and store it in the variable age_dt (age Date object)
    let age_dt = new Date(diff_ms);

    // Calculate the absolute value of the difference in years between the age Date object and the year 1970 (UNIX epoch)
    console.log(Math.abs(age_dt.getUTCFullYear() - 1970));
    return Math.abs(age_dt.getUTCFullYear() - 1970);
};