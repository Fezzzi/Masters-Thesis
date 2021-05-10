# Computation Strategies

## Docker Computation Containers
#### About
This strategy spawns new ad-hoc container for each benchmarking task. The strategy is 
therefore available only for docker environments to ensure compatibility. Application's 
docker container spawns these containers using the `spawn-computation-container.sh` script 
which builds startup command that uses `docker-compose up` at its core.

Computation containers output content to the `cc-output` volume which is mapped into the 
`/src/output` path within these containers and is mounted into the main application's container 
as well. The main application is then responsible for validating, parsing and persisting 
the output to the `/src/benchmarks` volume which is shared with the host's file-system.


#### Instantiation script
The script accepts
a set of arguments which are used to customize the container's environment to comply to the 
requirements denoted by user's application. These arguments are passed from `node` as
a result of submitted form parsing.

```
OPTIONS
    -h
        Display this help message.

    -r [repoHttpsUrl]
        Url of the repository that is to be used within spawned container to access the code.

    -b [repoBranch]
        Branch of cloned repository to be used. Defaults to the primary branch remote’s HEAD points at.

    -p [path]
        Absolute path to the directory with the code.

    -i [image]
        Docker image to be used. Defaults to mcr.microsoft.com/dotnet/runtime:3.1
```

#### Container variants
 - **cc-git-docker** - Container checks out the code from remote repository using provided
 `https` clone string. Optionally, a `branch` to be checkout out can be specified as well.
