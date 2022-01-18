import Files, { File } from "nonplain";
import { Command } from "commander";
import * as path from "path";
import * as dayjs from "dayjs";

const program = new Command();

program
  .requiredOption(
    "-d --data-path <path>",
    "Path to the dendron folder to transform."
  )
  .option(
    "--dry-run",
    "Show the operations without actually changing any files."
  );

program.parse(process.argv);

const options = program.opts();

const DATA_PATH = options.dataPath as string;
const DRY_RUN = options.dryRun;

const transformFile = (file: File) => {
  const { body, metadata: oldMetadata } = file;
  const { joplin_updated, joplin_created, ...rest } = oldMetadata;
  if (
    typeof joplin_created === "undefined" ||
    typeof joplin_updated === "undefined"
  ) {
    return file;
  }

  const created = dayjs(joplin_created).valueOf();
  const updated = dayjs(joplin_updated).valueOf();

  const metadata = { ...rest, created, updated };

  return { body, metadata };
};

const writeUpdatedFile = (file: File) => {
  const {
    metadata: {
      file: { dir, base },
    },
  } = file;
  const filepath = path.join(dir, base);
  file.write(filepath, { encoding: "utf8" });
};

const start = async () => {
  console.log("Starting #tKPTz4");
  const files = new Files().load(path.join(DATA_PATH, "/*.md"));

  files.transform(transformFile);

  if (!DRY_RUN) {
    const instances = files.collectInstances();
    for (const instance of instances) {
      writeUpdatedFile(instance);
    }
  } else {
    // Figure out how to show changes
    console.log(`Showing changes hasn't been implemented yet. #uPVimn`);
  }

  console.log("Finished. #xFn630");
};

start().catch((error) => {
  console.error("FATAL ERROR. Program will exit. #ahct8l");
  console.error(error);
  process.exit(1);
});
