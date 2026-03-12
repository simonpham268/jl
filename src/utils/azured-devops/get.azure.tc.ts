import { getTestCaseFromApi } from "./azure";

const generate = async () => {
    const testCaseId = Number(process.argv[2]);

    if (!testCaseId) {
        console.error("Please provide test case id");
        process.exit(1);
    }
    await getTestCaseFromApi(testCaseId);
}

generate();