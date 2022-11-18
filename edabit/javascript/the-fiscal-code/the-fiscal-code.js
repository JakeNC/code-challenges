const months = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H", 7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T" }
const vowels = ["A", "E", "I", "O", "U"];

function fiscalCode(person) {
	return generateSurnameCode(person.surname) + generateNameCode(person.name) + generateDOBandGenderCode(person.dob, person.gender);
}

function groupChars(chars) {
    let c = chars.filter(item => !vowels.includes(item));
    let v = chars.filter(item => vowels.includes(item));
    let groupedChars = {
        o: chars,
        c: c,
        v: v
    };

	return groupedChars;
}

function generateSurnameCode(surname) {
    let groupedChars = groupChars(surname.toUpperCase().split(''));

    if (groupedChars.c.length >= 3) {
        return groupedChars.c.slice(0, 3).join('');
    } else {
        let code = groupedChars.c;
        code.push(groupedChars.v.slice(0, 3 - code.length));

        if (code.length < 3) {
            for (let i = code.length; i < 3; i++) {
                code.push('X');
            }
        }

        return code.join('');
    }
}

function generateNameCode(name) {
    let groupedChars = groupChars(name.toUpperCase().split(''));
    if (groupedChars.c.length == 3) {
        return groupedChars.c.slice(0, 3).join('');
    } else if (groupedChars.c.length > 3) {
        let code = [];
        code.push(groupedChars.c[0]);
        code.push(groupedChars.c[2]);
        code.push(groupedChars.c[3]);

        return code.join('');
    } else {
        let code = groupedChars.c;
        code.push(groupedChars.v.slice(0, 3 - code.length));

        if (code.length < 3) {
            for (let i = code.length; i < 3; i++) {
                code.push('X');
            }
        }

        return code.join('');
    }
}

function generateDOBandGenderCode(dob, gender) {
    let dmy = dob.split('/');
    let year = dmy[2].slice(-2);
    let month = months[dmy[1]];
    let day = parseInt(dmy[0]);

    if (gender == 'M') {
        if (day < 10) { 
            day = '0' + dmy[0] 
        }
    } else {
        day = 40 + day;
        day.toString;
    }

    return year + month + day;
}