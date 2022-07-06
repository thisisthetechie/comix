# list of comix to retrieve
comix=(
    dilbert-classics
    garfield
    garfield-classics
    buckles
    calvinandhobbes
    bc
    peanuts
    beardo
    overthehedge
    andycapp
    marmaduke
    adult-children
    offthemark
    questionable-quotebook
    wizardofid
)

# Retrieve each comic and post to Slack
for comic in ${comix[@]}; do
    docker-compose run -e COMICNAME=$comic comix
done
