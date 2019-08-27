'use strict';
import {fork} from 'child_process';

require('dotenv').config();

const appJobs = [
    {
        name: 'open',
        path: `${__dirname}\\bin\\app.js`,
    },
];

const setup = async () => {};
const forkJobs = appJobs;


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
