import "ts-jest"
import { Ref } from "../../src"
import { GettingEventArgs } from "../../src/Ref";
it("Getter & Setter", () => {
    const ref = new Ref<boolean>(false);
    expect(ref.value).toBeFalsy();
    ref.value = true;
    expect(ref.value).toBeTruthy();
})

it("Event has been raised", () => {
    const ref = new Ref<number>(2401);
    let gettingReceived = false;
    let settingReceived = false;
    ref.getting.add((e) => {
        gettingReceived = true;
    });
    ref.setting.add((e) => {
        settingReceived = true;
    });

    ref.value++;
    expect(gettingReceived).toBeTruthy();
    expect(settingReceived).toBeTruthy();
})

it("Can modify the behaviour of getting event", () => {
    const ref = new Ref<number>(2401);

    ref.getting.add((s, e) => {
        e.value = 50
    })
    expect(ref.value).toBe(50)

    ref.getting.clear()
    ref.getting.add((s, e) => {
        e.prevent = true;
    })
    expect(() => {
        ref.value
    }).toThrow()
})

it("Can modify the behaviour of setting event", () => {
    const ref = new Ref<number>(2401);

    ref.setting.add((s, e) => {
        e.newValue += 1
    })
    ref.value = 300;
    expect(ref.value).toBe(301)

    ref.setting.clear()
    ref.setting.add((s, e) => {
        e.prevent = true;
    })

    expect(() => {
        ref.value = 5
    }).not.toThrow()
})