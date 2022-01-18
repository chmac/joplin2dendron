# joplin2dendron

NOTE: This is **FYI-open-source code**. It's shared for your information, feel
free to use / fork / update it to your heart's content. But **do not expect free
support, bug fixes, or otherwise**.

## Usage

Helper to process imported Joplin notes in Dendron.

- Export all your Joplin notes like File > Export All > Markdown + Front Matter
- Import these notes into Dendron
  - As at 18 Jan 2022 you need to build Dendron from source on the
  `chore/import-frontmatter-on-markdown-import` branch. That should not be
  necessary after the pull request is merged and released.
  - Edit your `config.import.yml` file and add the snippet below.
- Clone this repo, run `yarn` to install dependencies, `yarn build` to build
- Run `node dist/index.js --dry-run --data-path ~/path/to/dendron/vault`
  - Be sure to commit your files before running this
  - Remove the `--dry-run` to have the script commit changes
  - Inspect the changes made and commit / revert appropriately

```yaml
importFrontmatter: true
frontmatterMapping:
  updated: joplin_updated
  created: joplin_created
```