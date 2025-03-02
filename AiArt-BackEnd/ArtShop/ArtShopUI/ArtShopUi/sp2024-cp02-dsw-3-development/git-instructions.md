# Basic GitHub Principles

## Before Starting Development on a Specific Feature
- **Create a Feature Branch**: Always create a new branch for each feature or bug fix. This helps keep your work isolated and manageable.
- **Naming Conventions**: Use meaningful and descriptive names for branches. Include the related Taiga ticket number and a brief description (e.g., `feature/T1234-add-login-functionality`).
- **Taiga board Updates**: Update the Taiga ticket status to reflect the progress (e.g., "In Progress") and assign the branch name to the ticket.
- **Sync with Main Repository**: Always pull the latest version of the main development branch (`development`) before creating your new branch to avoid conflicts.

## Before Merging to Development Branch
- **Sync with Development Branch**: Before opening a pull request, pull the latest changes from the `development` branch to ensure your feature branch is up to date.
- **Code Review**: Ensure at least one team member reviews your pull request. This can help catch errors and improve code quality.
- **Notification**: Once your pull request is approved and merged, notify the team to pull the latest changes into their working branches.

## Managing the Main Branch
- **Strict Control**: The `main` branch should only contain thoroughly tested and QA-verified features. This ensures that the `main` branch is always stable.
- **Deployment Timing**: Merging to `main` should coincide with major deployments after ensuring all new features are functioning as expected.

## Additional Note for QA Testing
- **Development branch**: The QA team will be using the development branch for testing the features. This means that all the features for which the development process have been finished must be merged to the development branch before the status of the ticket is moved to QA.

## Additional Best Practices
- **Commit Messages**: Write clear and concise commit messages that describe the changes made. This helps in understanding the history and reasoning behind changes.
- **Conflict Resolution**: If you encounter merge conflicts, resolve them promptly and seek assistance if needed. Always test the merged code thoroughly.
- **Documentation**: Maintain up-to-date documentation for the project. This includes README files, setup instructions, and any other relevant information.

By following these practices, we will have a more organized and efficient workflow, reducing the risk of issues and improving collaboration.


# Basic Git Commands

Here are some essential Git commands that you will need while working on the project.
## Configuration
- **Set your username**: 
  `git config --global user.name "Your Name"`

- **Set your email**: 
`git config --global user.email "you@example.com"`

- **Clone an existing repository**: 
`git clone https://github.com/user/repo.git`

- **Switch to a branch**: 
`git checkout <branch-name>`

- **Create and switch to a branch**: 
`git checkout -b <branch-name>`

- **Merge branch into the current branch**: 
`git merge <branch-name>`

- **Pull changes from the remote repository and merge**: 
`git pull origin <branch-name>`

- **Push changes to the remote repository**: 
`git push origin <branch-name>`

- **Create a pull request**: 
    - Push your branch to the remote repository:
    `git push origin <branch-name>`
    - Go to the GitHub repository.
    - Click the "Compare & pull request" button.
    - Add a title and description to your pull request.
    - Click "Create pull request".

- **View a commit history**: 
`git log`

- **View a specific  file's commit history**: 
`git log <filename>`

- **Undo the last commit (without deleting the changes)**: 
`git reset --soft HEAD~1`



