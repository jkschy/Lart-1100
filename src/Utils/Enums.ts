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

const isPlayerInfo = (info: string) => {
    const infoType = PlayerInfoFromString(info);
    return !(infoType === undefined)
}

enum Karma {
    intelligence,
    popularity,
    integrity,
}

const KarmaFromString = (karma: string) => {
    return Karma[karma as keyof typeof Karma];
}

const isKarma = (karma: string) => {
    const karmaType = KarmaFromString(karma);
    return !(karmaType === undefined)
}

enum Majors {
    ComputerScience,
    Nursing,
    Engineering,
    Business,
}

const MajorFromString = (major: string) => {
    return Majors[major as keyof typeof Majors];
}

enum SpecialTrigger {
    Start,
    StatChange,
    KarmaChange,
    NewYear,
    JobChange,
    Bankrupt,
}

const SpecialTriggerFromString = (event: string) => {
    return SpecialTrigger[event as keyof typeof SpecialTrigger];
}

const isSpecialTrigger = (event: string) => {
    const specialTrigger = SpecialTriggerFromString(event);
    return !(specialTrigger === undefined);
}

export {ChoiceTypesFromString,
    ChoiceTypes,
    KarmaFromString,
    Karma,
    PlayerInfo,
    PlayerInfoFromString,
    Majors,
    MajorFromString,
    SpecialTriggerFromString,
    SpecialTrigger,
    isKarma,
    isPlayerInfo,
    isSpecialTrigger};