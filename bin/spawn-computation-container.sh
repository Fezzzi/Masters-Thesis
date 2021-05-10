#!/bin/bash

while getopts hr:b:p:i: flag
do
  case "${flag}" in
    h)
      echo "SPAWN COMPUTATION CONTAINER"
      echo "    Locally spawns docker container for benchmark computations."
      echo ""
      echo "OPTIONS"
      echo "    -h"
      echo "        Display this help message."
      echo ""
      echo "    -r [repoHttpsUrl]"
      echo "        Url of the repository that is to be used within spawned container to access the code."
      echo ""
      echo "    -b [repoBranch]"
      echo "        Branch of cloned repository to be used. Defaults to the primary branch remote’s HEAD points at."
      echo ""
      echo "    -p [path]"
      echo "        Absolute path to the directory with the code."
      echo ""
      echo "    -i [image]"
      echo "        Docker image to be used. Defaults to mcr.microsoft.com/dotnet/runtime:3.1"
      exit 0
      ;;
    r)
      repoHttpsUrl=${OPTARG};;
    b)
      repoBranch=${OPTARG};;
    p)
      path=${OPTARG};;
    i)
      image=${OPTARG};;
    *);;
  esac
done

# Validate required arguments
if [ -z "$repoHttpsUrl" ] && [ -z "$path" ]; then
  echo "You need to provide either repository url or absolute path to the code. See help (-h) for more information." 1>&2
  exit 0
elif [ -n "$repoHttpsUrl" ] && [ -n "$path" ]; then
  echo "You cannot provide both repository url and absolute path at the same time. See help (-h) for more information." 1>&2
  exit 0
fi

# Begin construction of command that starts the computation container
command="cd cc-"
if [ -n "$repoHttpsUrl" ]; then
  command="${command}git-docker"
else
  command="${command}local-docker"
fi

# Provide default docker image if needed
if [ -z "$image" ]; then
  image="mcr.microsoft.com/dotnet/sdk:5.0"
fi

command="$command && IMAGE=$image"

if [ -n "$repoHttpsUrl" ]; then
  cloneCmd="git clone $repoHttpsUrl ./code --no-tags --single-branch"

  if [ -n "$repoBranch" ]; then
    cloneCmd="$cloneCmd --branch $repoBranch"
  fi
  command="$command CLONE_CMD=\"$cloneCmd\""
else
  command="$command PATH=$path"
fi

command="$command COMPOSE_PROJECT_NAME=\"masters-thesis\" docker-compose up -d --build"

cd "$(dirname "$0")" || echo "Failed checking out $(dirname "$0") directory"
echo "Executing start-up command '${command}'..."
eval "$command"
