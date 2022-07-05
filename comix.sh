# list of comix to retrieve
comix=(
    dilbert
    dilbert-classics
    garfield
    buckles
    calvinandhobbes
    bc
    peanuts
    beardo
    overthehedge
)

# Retrieve each comic and post to Slack
for comic in ${comix[@]}; do
    docker-compose run -e COMICNAME=$comic comix
done