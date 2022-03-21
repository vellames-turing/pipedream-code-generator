This is on a very very early development stage

To create an action run node ./src/app.mjs
The following params are mandatory

action = Is the type of action you want to execute, for now, only "action" is available, in the future, "source" and "app" will be implemented
appName = Your app name
actionKey = You action key
PIPEDREAM_DIR = Directory of the pipedream repository

Example:
node ./src/app.mjs --action=action --appName=google_tasks --actionKey=create-task --PIPEDREAM_DIR=/Users/cassianovellames/Documents/Code/Pipedream/pipedream