import { describe, expect, it } from "vitest";
import Dice from "components/Dice.vue";
import { mount } from "@vue/test-utils";
describe("Doggie Search", () => {
  it("Mounts correctly", async () => {
    let wrapper = mount(Dice, {});
    expect(wrapper).toBeTruthy();
  });

  it("Emits 'roll' on click", async () => {
    let wrapper = mount(Dice, {});
    const diceButton = wrapper.find(".test");
    await diceButton.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("roll");
  });
});
