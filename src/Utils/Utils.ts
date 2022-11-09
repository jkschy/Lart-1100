const grades = { A: 85, 'A-': 80, B: 70, 'B-': 65, 'C+': 60, C: 55, D: 50, F: '' }


export const randomNumberBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const toTitleCase = (string: string) => {
    return string.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
}

export const toLetterGrade = (gradeNum: number) => {
    let grade = 'F';
    Object.keys(grades).some((letter) => {
        if (gradeNum >= grades[letter as keyof typeof grades]) {
            grade = letter;
            return true;
        }
        return false;
    });
    return grade
}

export const shuffleArray = (array: Array<any>) => {
    return array.sort(() => 0.5 - Math.random());
}

export const removeItemFromArray = (array: Array<any>, item: any) => {
    const index = array.indexOf(item);
    if (index === -1) {
        return array;
    }

    array.splice(index, 1);
    return array
}

export const addItemToArrayLocation = (array: Array<any>, item: any, index: number) => {
    array.splice(index, 0, item);
    return array;
}

