const specialCharacters: Array<string> = ['!', '@', '£', '#', '$', '%', '^', '&', '*'];

function isNotEmpty(str: string): boolean {
    return str.length !== 0;
}

function isOfValidLength(str: string, minLength: number, maxLength: number): boolean {
    return str.length >= minLength && str.length <= maxLength;
}

function containsSpecialCharacter(str: string): boolean {
    for (let char of specialCharacters) {
        if (str.includes(char)) {
            return true;
        }
    }

    return false;
}

function isValidName(name: string): boolean {
    return isOfValidLength(name, 2, 25);
}

function isValidPassword(pwd: string): boolean {
    return isOfValidLength(pwd, 8, 40) && containsSpecialCharacter(pwd);
}

export {
    isValidName,
    isValidPassword
}