# Development

## Working on the library

The best option is to install Galette on your project(s) and symlink the project's `node_modules/@galette/[package]` to
a local clone of the Galette Git repository.

1. Clone Galette.
   ```
   git clone git@github.com:kametventures/galette.git
   ```

2. Go on your project's directory. (We assume Galette is already a dependency)
   ```
   cd node_modules/@galette
   
   rm -rf core && ln -s /path/to/galette/git/core core
   ```
   
   **Important:** replace `/path/to/galette/git` in the example above with the path on your own machine.
   
3. Start Galette's watcher so that your updates in the `core/src` directory are compiled and available for your
   project.
   ```
   cd /path/to/galette/git/core
   
   yarn install
   yarn run build --watch
   ```
