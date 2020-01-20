export const formatTime = (input, includeSeconds = true) => {
    let cutoff = includeSeconds ? 8 : 5;

    return new Date(input * 1000).toISOString().substr(11, cutoff);
}

export const convertFormattedTimeToSeconds = (input) => {
    if(!input) return 0;

    const splitInput = input.split(':');

    return (+splitInput[0]) * 60 * 60 + (+splitInput[1]) * 60 + (+splitInput[2]);
}