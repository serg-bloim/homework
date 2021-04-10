npm install live-server
PATH=$(npm bin):$PATH;
cd docs
live-server --mount=/homework:./ --open=homework/