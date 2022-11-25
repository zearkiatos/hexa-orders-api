import keys from "@Api/utils/keys";

describe("Suite test for keys utils", () => {
    test("Should create a new key", () => {
        const newKey = keys.createGuid();

        expect(newKey).toHaveLength(36);
    });
});