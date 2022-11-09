import {Majors} from "../../Utils/Enums";
import {useEffect, useState} from "react";
import {Dropdown} from "@nextui-org/react";

const MajorsCarousel = (props: MajorsProps) => {
    const [major, setMajor] = useState(0);
    const majors = Object.keys(Majors).splice(0, Object.keys(Majors).length / 2)

    useEffect(() => {
        props.changeMajor(fromPascalCase(major.toString()))
    }, [major])

    const fromPascalCase = (value: string) => {
        return getMajorFromKey(value).toString().replaceAll(/([A-Z])/g, ' $1').trim();
    }

    const getMajorFromKey = (key: string) => {
        return Majors[key as keyof typeof Majors]
    }


    return <Dropdown>
        <Dropdown.Button>
            {fromPascalCase(major.toString())}
        </Dropdown.Button>
        <Dropdown.Menu onAction={(keys) => setMajor(getMajorFromKey(keys.toString()))}>
            {majors.map(major => {
            return <Dropdown.Item key={getMajorFromKey(major)}>{fromPascalCase(major)}</Dropdown.Item>})}
        </Dropdown.Menu>
    </Dropdown>
}

interface MajorsProps {
    changeMajor: (major: string) => void
}

export default MajorsCarousel