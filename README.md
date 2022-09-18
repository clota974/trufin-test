# Killian Clotagatide : Heavy Backend test for TruFin

## Files
This repository contains the following : 
* docker-compose.yml
* README.md
* frontend/
* backend/

To run the project, you need to run `docker-compose up --build -d` which will build the Typescript files on backend.

React page will be shown at http://0.0.0.0:8080

## Mechanism

On first visit, enter the hash you want to calculate. 
It will start calculating the hashes... Once you think it is done, come back to the page, and enter the hash again, it will show the response (from server cache).

### Reset

To reset server cache run `echo 'flush_all' | nc localhost 11211`

### Troubleshoot

According to the platform you might need to modify `./frontend/.env` host.

## Testing & improvements

Basic testing has been included in both back and frontend.
File structure is rather stable on the long run although some code may need some more comments