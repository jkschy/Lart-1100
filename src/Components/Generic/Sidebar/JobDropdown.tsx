import {Dropdown} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import Job from "../../../Models/Jobs/Job";
import JobRequirements from "../../../Models/Jobs/JobRequirements";
import Player from "../../../Models/Player";

const JobDropdown = (props: DropdownProps) => {
    const requirement = new JobRequirements("scramble", 3, 5, props.updatePlayer);
    const [jobs] = useState<Job[]>([new Job("Admin", 9, requirement), new Job("Intern", 11, requirement), new Job("Tutor", 7, requirement)]);
    const [gettingJob, setGettingJob] = useState<Job | undefined>();

    return <div>
            {!gettingJob ? <Dropdown>
                    <Dropdown.Button flat size={"xs"}>IT Assistant</Dropdown.Button>
                    <Dropdown.Menu onAction={(jobKey) => {
                        setGettingJob(jobs[parseInt(jobKey.toString())])
                    }}>
                        {jobs.map((job) => {
                            return <Dropdown.Item key={jobs.indexOf(job)} command={job.payString}>{job.name}</Dropdown.Item>
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                : <div>{gettingJob.element}</div>}
        </div>
}

interface DropdownProps {
    currentJob?: string,
    availableJobs?: string[]
    updatePlayer: React.Dispatch<React.SetStateAction<Player | undefined>>,
}

export default JobDropdown