# Contributing to drupal-decoupled

Thanks for taking the time to contribute! 🎉

This monorepo uses [Lerna](https://lerna.js.org) as a task runner,
[Changesets](https://github.com/changesets/changesets) to manage the
versioning and releases and [Yarn Classic](https://classic.yarnpkg.com/lang/en/)
as the package manager to handle dependencies.

## Packages being tracked

All packages inside the [packages folder](https://github.com/octahedroid/drupal-decoupled/tree/main/packages)
are being tracked and need to follow the versioning and release process
described below.

Packages and files that are outside the `packages` folder are not
being tracked and warnings that the Changesets bot
will generate on your Pull Request can be safely ignored.

Whenever you add a new package or make changes to an existing one,
you need to follow the steps below to ensure that the changes are
properly versioned and released.

> [!IMPORTANT]
> You don't need to manually update the versions of each package
> inside the `packages` folder, the Changesets CLI will take care
> of that for you.

## Creating Snapshots

To create snapshot releases on Pull Requests, you need to:

1. Commit your changes.
2. Run the Changesets CLI to bump the version of the package you're working on
```bash
yarn changeset
```

This will trigger a interactive flow to select if the changes you're doing are
considered `patch`, `minor`, `major` changes and then it will ask you for
a summary of these changes. This summary will be included in the next github
release if merged.

3. Commit the new file that was generated under the `.changeset` folder.
4. Push your changes to the feature branch you're working on.
5. Add the `snapshot` label to the pull request. If you don't add a changeset
file the triggered action will fail.
6. Wait for the action to add a comment with a link to your most recent snapshot.

This will publish a `package-name@preview-shortsha-timestamp` package; without
creating tags nor releases. Also this won't touch the `latest` tag on NPM.

## Creating a new Release

The Changesets workflow to release packages work as follows:

1. You open a Pull Request.
2. Include a changeset summary and commit the generated file under the `.changeset`
folder to your feature branch.
```bash
yarn changeset
```
This will trigger a interactive flow to select if the changes you're doing are
considered `patch`, `minor`, `major` changes and then it will ask you for a summary
of these changes. This summary will be included in the next github release if merged.

3. Your Pull Request gets merged to `main`.
4. A new Pull Request is opened by the [Changesets action](https://github.com/changesets/action)
to consolidate all changes that will be included in the next release.
5. Once it's time to create the new release, merge the Pull Request created by the
changeset github action on step 4. This merge will trigger the [Changesets action](https://github.com/changesets/action)
again and will:
    - Create a new tag for each package that has a version bump.
    - Create a new Github Release including the packages that have a version bump.
    - Push the packages to NPM and mark each of them as "latest".

---

## Additional resources

- Lerna Documentation: https://lerna.js.org/docs/introduction
- Changesets Documentation: https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md
