import "ts-jest"
import { EventArgs } from "../../src/DSEvent";
import ProtectedDSEvent from "../../src/ProtectedDSEvent";

describe("DSEvent Test", () => {

    it("Won't throw error when set to not throw", () => {
        const event = new ProtectedDSEvent("abc", false);
        expect(() => event.raise(null, new EventArgs())).not.toThrow();
        expect(() => event.clear()).not.toThrow();
    })
    it("Method raise() has been protected by password", () => {
        const PWD = "abc";
        const event = new ProtectedDSEvent(PWD, true);

        expect(() => event.raise(null, new EventArgs)).toThrow();
        expect(() => event.raise(null, new EventArgs, PWD)).not.toThrow();
    });

    it("Method clear() has been protected by password", () => {
        const PWD = "abc";
        const event = new ProtectedDSEvent(PWD, true);
        let calledTime = 0;
        event.add(() => calledTime++);
        event.add(() => calledTime++);

        expect(() => event.clear()).toThrow();
        event.raise(null, new EventArgs(), PWD);
        event.raise(null, new EventArgs(), PWD);
        expect(calledTime).toBe(4);

        expect(() => event.clear(PWD)).not.toThrow();
        event.raise(null, new EventArgs(), PWD);
        expect(calledTime).toBe(4);

    });

});