# Masters-Thesis
Master's thesis at MFF UK

### About
The aim of the thesis is to implement a tool to automate the repetitive
operations and provide a suitable visualization of the measured results.
The tool will be implemented as Node server with two clients, one standard
React and one React native.

The clients of the application will focus on visualization of benchmarks received
from the server. They will also provide a means for the user to upload .NET code
for benchmarking.

The server will then spawn docker containers and perform provided code benchmarking,
or use external service for that. Finally, server will compose possible `etw`
results with any other artifacts and parse them into custom structure recognized
by the clients.

### Build status
**develop**  \
![develop](https://github.com/Fezzzi/Masters-Thesis/actions/workflows/main.yml/badge.svg?branch=develop)

#### [More documentation 🠖](./docs/readme.md)
