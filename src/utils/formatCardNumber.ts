export const formatCardNumber = (str: string) => {
    if (str === '') {
        return;
    }
    const cardNumber = str.replace(/\D/g, '');

    // Split the card number into groups of 4 digits
    const groups = cardNumber.match(/.{1,4}/g);

    // Join the groups with a space separator
    return groups.join(' ');
};
