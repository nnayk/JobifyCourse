const createJob = async (req,res) =>
{
    res.send("created job...");
}

const deleteJob = async (req,res) =>
{
    res.send("deleted job...");
}

const getAllJobs = async (req,res) =>
{
    res.send("got all jobs...");
}

const updateJob = async (req,res) =>
{
    res.send("updated job...");
}

const showStats = async (req,res) =>
{
    res.send("showed stats...");
}

export {createJob,deleteJob,getAllJobs,updateJob,showStats};