'use strict';
import {fork} from 'child_process';

require('dotenv').config();

const mqttJobs = [
    {
        name: 'open',
        path: `${__dirname}\\bin\\app.js`,
    },
];

const setup = async () => {};
const forkJobs = mqttJobs;

// setup MySQL DB and table.

// fork new child process if any child process is closed
const forkNew = (jobConfig) => {
    let jobTofork = forkJobs.find((job) => job.name === jobConfig.name);
    jobTofork.process = fork(jobTofork.path);
    jobTofork.process.on('close', () => {
        forkNew(jobTofork);
    });
};

setup()
    .then(async () => {
        forkJobs.forEach((job) => {
            job.process = fork(job.path);
            job.process.on('close', () => {
                forkNew(job);
            });
        });
    })
    .catch((error) => {});
