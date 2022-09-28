enum ChoiceTypes {
    twoChoice,
    fourChoice,
    numberInput,
    slider,
}

const ChoiceTypesFromString = (type: string) => {
    return ChoiceTypes[type as keyof typeof ChoiceTypes];
}

enum PlayerInfo {
    money,
    time,
    gpa,
    major
}

const PlayerInfoFromString = (info: string) => {
    return PlayerInfo[info as keyof typeof PlayerInfo];
}

enum Karma {
    intelligence,
    popularity,
    integrity,
}

const KarmaFromString = (karma: string) => {
    return Karma[karma as keyof typeof Karma];
}

export {ChoiceTypesFromString, ChoiceTypes, KarmaFromString, Karma, PlayerInfo, PlayerInfoFromString};