import "ts-jest"
import DSObject from "../../src/DSObject";
import dsEquals from "../../src/dsEquals";

import DSEvent, { EventArgs } from "../../src/DSEvent"
describe("DSEvent Test", () => {

    it("Could execute", () => {
        const event = new DSEvent();
        let called = false;
        event.add(() => {
            called = true;
        });
        event.raise(null, new EventArgs());
        expect(called).toBeTruthy()
    });

    it("10000 Listener Performance Test", () => {

        // Add event handlers just cost little time(ignorable).
        const eventFor10000Test = new DSEvent();
        for (let i = 0; i < 10000; i++) {
            eventFor10000Test.add(() => {
                //Do Nothing
            });
        }

        eventFor10000Test.raise(new DSObject(), new EventArgs());
    });


    it("Transport Event Args Correctly", () => {
        const event = new DSEvent();
        const _e = new EventArgs();
        const sender = new DSObject();
        let receivedEventArgs;
        let receivedSender;
        event.add((s, e) => {
            receivedSender = s;
            receivedEventArgs = e;
        });
        event.raise(sender, _e);

        expect(dsEquals(_e, receivedEventArgs)).toBeTruthy();
        expect(dsEquals(sender, receivedSender)).toBeTruthy();
    })

    it("Remove handler", () => {
        const event = new DSEvent();
        let flag = false;

        const callback = () => {
            flag = !flag;
        };

        event.add(callback);
        event.raise(null, new EventArgs());

        expect(flag).toBeTruthy()

        event.remove(callback);
        event.raise(null, new EventArgs());
        expect(flag).toBeTruthy()
    });
});