# Workflow Guideline

## Git

Pick an issue from the backlog located in the [trello board](https://trello.com/b/NOxprzji/kanban) for our product.

Checkout your new branch from the master branch and name your branch according to following syntax:

<b>PUM03-XYZ</b>, where XYZ is the issue number.

code example: <code>git checkout -b PUM03-XYZ</code>

When committing changes to the branch your commit message should be structured in following way:

<b>PUM03-XYZ: Message</b>

code example: <code>git commit -m "PUM03-XYZ: Message"</code>

When you're done with the issue & have gotten your code reviewed, merge the branch into master and delete the feature branch.
After this you can move the trello card into the testing column.
